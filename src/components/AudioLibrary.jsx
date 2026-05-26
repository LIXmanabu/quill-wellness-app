import { useState, useEffect, useRef, useCallback } from 'react'
import Reveal from './interactive/Reveal.jsx'
import TierBadge from './TierBadge.jsx'

/**
 * Six sounds, six genuinely different Web Audio node graphs.
 *
 * Each sound is its own factory — multiple layers of typed noise, sine
 * harmonics, stereo panning, LFO modulation, impulse scheduling, and
 * convolver reverb. Nothing is just "noise + filter".
 *
 * Architecture credits: Paul Kellet pink-noise, Audiokinetic's
 * layered rain technique, and the slee1005/rain shimmer approach.
 */

const sounds = [
  { id: 'rain',     label: 'Rain on roof', cat: 'Sleep', desc: 'Pink-noise body + high-frequency shimmer + random droplets in stereo', accent: '#5A6B5D', factory: 'rain'    },
  { id: 'ocean',    label: 'Ocean waves',  cat: 'Sleep', desc: 'Brown-noise base with slow 8-second swells and high spray on top',     accent: '#6BAEEF', factory: 'ocean'   },
  { id: 'fire',     label: 'Fireplace',    cat: 'Focus', desc: 'Low brown rumble + irregular sharp crackles in stereo',                accent: '#C8654A', factory: 'fire'    },
  { id: 'bowl',     label: 'Singing bowl', cat: 'Focus', desc: 'Three sine harmonics with slow tremolo — Tibetan meditation drone',     accent: '#D4A744', factory: 'bowl'    },
  { id: 'forest',   label: 'Forest dawn',  cat: 'Focus', desc: 'Soft pink-noise wind + occasional synthesised bird chirps',             accent: '#3D4A40', factory: 'forest'  },
  { id: 'wind',     label: 'Wind in trees', cat: 'Sleep', desc: 'High-passed pink noise with slow LFO sweeping the cutoff',             accent: '#9B8E82', factory: 'wind'    },
]

const breathPatterns = [
  { id: 'box',      label: 'Box breathing', phases: [['Inhale', 4], ['Hold', 4], ['Exhale', 4], ['Hold', 4]], desc: 'Used by Navy SEALs to calm the nervous system fast.' },
  { id: '478',      label: '4-7-8',         phases: [['Inhale', 4], ['Hold', 7], ['Exhale', 8], ['Pause', 0]], desc: 'Dr. Andrew Weil\'s sleep-onset technique.' },
  { id: 'coherent', label: 'Coherent',      phases: [['Inhale', 6], ['Exhale', 6], ['', 0], ['', 0]], desc: '6-second breaths — peak heart-rate variability.' },
]

// ════════════════════════════════════════════════════════════════
// Noise buffer fillers
// ════════════════════════════════════════════════════════════════

function fillWhite(data) {
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
}

function fillPink(data) {
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
  for (let i = 0; i < data.length; i++) {
    const w = Math.random() * 2 - 1
    b0 = 0.99886 * b0 + w * 0.0555179
    b1 = 0.99332 * b1 + w * 0.0750759
    b2 = 0.96900 * b2 + w * 0.1538520
    b3 = 0.86650 * b3 + w * 0.3104856
    b4 = 0.55000 * b4 + w * 0.5329522
    b5 = -0.7616 * b5 - w * 0.0168980
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11
    b6 = w * 0.115926
  }
}

function fillBrown(data, gain = 3.5) {
  let last = 0
  for (let i = 0; i < data.length; i++) {
    const w = Math.random() * 2 - 1
    last = (last + 0.02 * w) / 1.02
    data[i] = last * gain
  }
}

// Reusable: build a looped noise source
function noiseSource(ctx, seconds, filler) {
  const buf = ctx.createBuffer(1, seconds * ctx.sampleRate, ctx.sampleRate)
  filler(buf.getChannelData(0))
  const src = ctx.createBufferSource()
  src.buffer = buf
  src.loop = true
  return src
}

// Reusable: convolver reverb with synthetic impulse response
function makeReverb(ctx, seconds, decay) {
  const length = ctx.sampleRate * seconds
  const ir = ctx.createBuffer(2, length, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const data = ir.getChannelData(ch)
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay)
    }
  }
  const conv = ctx.createConvolver()
  conv.buffer = ir
  return conv
}

// ════════════════════════════════════════════════════════════════
// Sound factories — each returns { master, stop }
// ════════════════════════════════════════════════════════════════

function makeRain(ctx) {
  // Pink-noise body (mid-frequencies)
  const pink = noiseSource(ctx, 8, fillPink)
  const pinkLP = ctx.createBiquadFilter()
  pinkLP.type = 'lowpass'
  pinkLP.frequency.value = 3500
  pinkLP.Q.value = 0.5
  const pinkGain = ctx.createGain()
  pinkGain.gain.value = 1.2

  // High-frequency shimmer (white noise, >6kHz)
  const white = noiseSource(ctx, 8, fillWhite)
  const whiteHP = ctx.createBiquadFilter()
  whiteHP.type = 'highpass'
  whiteHP.frequency.value = 6000
  const whiteGain = ctx.createGain()
  whiteGain.gain.value = 0.35

  // Stereo widening — pan each layer slightly opposite
  const pinkPan = ctx.createStereoPanner()
  pinkPan.pan.value = -0.15
  const whitePan = ctx.createStereoPanner()
  whitePan.pan.value = 0.2

  pink.connect(pinkLP).connect(pinkGain).connect(pinkPan)
  white.connect(whiteHP).connect(whiteGain).connect(whitePan)

  // Slow amplitude breathing (LFO at 0.12 Hz)
  const amLFO = ctx.createOscillator()
  amLFO.frequency.value = 0.12
  const amDepth = ctx.createGain()
  amDepth.gain.value = 0.18
  const amOffset = ctx.createConstantSource()
  amOffset.offset.value = 1
  amLFO.connect(amDepth)

  const amGain = ctx.createGain()
  amGain.gain.value = 1
  amOffset.connect(amGain.gain)
  amDepth.connect(amGain.gain)
  amOffset.start()
  amLFO.start()

  // Soft reverb for spatial depth
  const reverb = makeReverb(ctx, 1.5, 2)
  const wet = ctx.createGain()
  wet.gain.value = 0.15

  const master = ctx.createGain()
  pinkPan.connect(amGain)
  whitePan.connect(amGain)
  amGain.connect(master)
  amGain.connect(reverb).connect(wet).connect(master)

  pink.start()
  white.start()

  return {
    master,
    stop() {
      try { pink.stop(); white.stop(); amLFO.stop(); amOffset.stop() } catch {}
    },
  }
}

function makeOcean(ctx) {
  // Brown noise body — the rumble
  const brown = noiseSource(ctx, 8, (d) => fillBrown(d, 3.5))
  const brownLP = ctx.createBiquadFilter()
  brownLP.type = 'lowpass'
  brownLP.frequency.value = 700
  const brownGain = ctx.createGain()
  brownGain.gain.value = 1.4

  // High spray hiss
  const white = noiseSource(ctx, 8, fillWhite)
  const whiteHP = ctx.createBiquadFilter()
  whiteHP.type = 'highpass'
  whiteHP.frequency.value = 3500
  const whiteGain = ctx.createGain()
  whiteGain.gain.value = 0.15

  // Big slow swell LFO — gain pulses every ~8 seconds
  const swellLFO = ctx.createOscillator()
  swellLFO.frequency.value = 0.125 // 8 second cycle
  const swellDepth = ctx.createGain()
  swellDepth.gain.value = 0.55
  const swellOffset = ctx.createConstantSource()
  swellOffset.offset.value = 0.6
  swellLFO.connect(swellDepth)

  const swellGain = ctx.createGain()
  swellGain.gain.value = 0
  swellOffset.connect(swellGain.gain)
  swellDepth.connect(swellGain.gain)
  swellOffset.start()
  swellLFO.start()

  brown.connect(brownLP).connect(brownGain).connect(swellGain)
  white.connect(whiteHP).connect(whiteGain).connect(swellGain)

  const reverb = makeReverb(ctx, 2.5, 1.5)
  const wet = ctx.createGain()
  wet.gain.value = 0.2

  const master = ctx.createGain()
  swellGain.connect(master)
  swellGain.connect(reverb).connect(wet).connect(master)

  brown.start()
  white.start()

  return {
    master,
    stop() {
      try { brown.stop(); white.stop(); swellLFO.stop(); swellOffset.stop() } catch {}
    },
  }
}

function makeFire(ctx) {
  // Low brown rumble
  const brown = noiseSource(ctx, 8, (d) => fillBrown(d, 3.0))
  const brownLP = ctx.createBiquadFilter()
  brownLP.type = 'lowpass'
  brownLP.frequency.value = 500
  const brownGain = ctx.createGain()
  brownGain.gain.value = 1.0
  brown.connect(brownLP).connect(brownGain)

  // Crackle generator — scheduled noise bursts
  const crackleGain = ctx.createGain()
  crackleGain.gain.value = 1.0
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate)
  fillWhite(noiseBuffer.getChannelData(0))

  let scheduling = true
  function scheduleCrackle() {
    if (!scheduling) return
    const src = ctx.createBufferSource()
    src.buffer = noiseBuffer
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 1500 + Math.random() * 2500
    bp.Q.value = 1.5 + Math.random() * 1.5
    const g = ctx.createGain()
    const now = ctx.currentTime
    const peak = 0.4 + Math.random() * 0.5
    g.gain.setValueAtTime(0, now)
    g.gain.linearRampToValueAtTime(peak, now + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.05 + Math.random() * 0.1)
    const pan = ctx.createStereoPanner()
    pan.pan.value = (Math.random() - 0.5) * 1.6
    src.connect(bp).connect(g).connect(pan).connect(crackleGain)
    src.start(now)
    src.stop(now + 0.2)
    // Schedule next crackle 50-400ms ahead
    setTimeout(scheduleCrackle, 50 + Math.random() * 350)
  }
  scheduleCrackle()

  const master = ctx.createGain()
  brownGain.connect(master)
  crackleGain.connect(master)

  brown.start()

  return {
    master,
    stop() {
      scheduling = false
      try { brown.stop() } catch {}
    },
  }
}

function makeBowl(ctx) {
  // Tibetan singing bowl — fundamental + 2x + 3x harmonics, slow tremolo
  const fundamental = 256 // C4
  const harmonics = [1, 2.01, 3.02, 4.05] // slight detune for natural beating
  const sources = []
  const baseGain = [0.4, 0.25, 0.15, 0.08]

  const sumGain = ctx.createGain()
  sumGain.gain.value = 0.6

  harmonics.forEach((mult, i) => {
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = fundamental * mult
    const g = ctx.createGain()
    g.gain.value = 0
    // Slow attack
    g.gain.setValueAtTime(0.0001, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(baseGain[i], ctx.currentTime + 2.5)
    osc.connect(g).connect(sumGain)
    osc.start()
    sources.push(osc)
  })

  // Slow tremolo LFO (0.3 Hz)
  const tremLFO = ctx.createOscillator()
  tremLFO.frequency.value = 0.3
  const tremDepth = ctx.createGain()
  tremDepth.gain.value = 0.15
  const tremOffset = ctx.createConstantSource()
  tremOffset.offset.value = 0.85
  tremLFO.connect(tremDepth)
  const tremGain = ctx.createGain()
  tremGain.gain.value = 0
  tremOffset.connect(tremGain.gain)
  tremDepth.connect(tremGain.gain)
  tremOffset.start()
  tremLFO.start()
  sumGain.connect(tremGain)

  const reverb = makeReverb(ctx, 4, 1.5)
  const wet = ctx.createGain()
  wet.gain.value = 0.45

  const master = ctx.createGain()
  tremGain.connect(master)
  tremGain.connect(reverb).connect(wet).connect(master)

  return {
    master,
    stop() {
      const now = ctx.currentTime
      sources.forEach((s) => {
        try {
          s.stop(now + 0.3)
        } catch {}
      })
      try { tremLFO.stop(); tremOffset.stop() } catch {}
    },
  }
}

function makeForest(ctx) {
  // Soft pink-noise wind base
  const pink = noiseSource(ctx, 8, fillPink)
  const pinkBP = ctx.createBiquadFilter()
  pinkBP.type = 'bandpass'
  pinkBP.frequency.value = 1200
  pinkBP.Q.value = 0.6
  const pinkGain = ctx.createGain()
  pinkGain.gain.value = 0.7
  pink.connect(pinkBP).connect(pinkGain)

  // Bird chirp generator — sine sweeps
  const birdGain = ctx.createGain()
  birdGain.gain.value = 0.35

  let scheduling = true
  function scheduleBird() {
    if (!scheduling) return
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    const startFreq = 1800 + Math.random() * 2200
    const endFreq = startFreq + (Math.random() - 0.5) * 1000
    const now = ctx.currentTime
    const duration = 0.06 + Math.random() * 0.15
    osc.frequency.setValueAtTime(startFreq, now)
    osc.frequency.exponentialRampToValueAtTime(Math.max(200, endFreq), now + duration)

    const g = ctx.createGain()
    g.gain.setValueAtTime(0, now)
    g.gain.linearRampToValueAtTime(0.6, now + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration)
    const pan = ctx.createStereoPanner()
    pan.pan.value = (Math.random() - 0.5) * 1.8

    osc.connect(g).connect(pan).connect(birdGain)
    osc.start(now)
    osc.stop(now + duration + 0.05)

    // Occasionally chirp twice quickly (like a sparrow call)
    if (Math.random() < 0.4) {
      const osc2 = ctx.createOscillator()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(startFreq * (0.9 + Math.random() * 0.2), now + duration + 0.05)
      const g2 = ctx.createGain()
      g2.gain.setValueAtTime(0, now + duration + 0.05)
      g2.gain.linearRampToValueAtTime(0.5, now + duration + 0.07)
      g2.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.05 + duration)
      osc2.connect(g2).connect(pan).connect(birdGain)
      osc2.start(now + duration + 0.05)
      osc2.stop(now + duration * 2 + 0.1)
    }

    setTimeout(scheduleBird, 1500 + Math.random() * 4000)
  }
  // First bird after a small delay
  setTimeout(scheduleBird, 800)

  const reverb = makeReverb(ctx, 2, 2)
  const wet = ctx.createGain()
  wet.gain.value = 0.25

  const master = ctx.createGain()
  pinkGain.connect(master)
  birdGain.connect(master)
  birdGain.connect(reverb).connect(wet).connect(master)

  pink.start()

  return {
    master,
    stop() {
      scheduling = false
      try { pink.stop() } catch {}
    },
  }
}

function makeWind(ctx) {
  // High-passed pink noise with slow LFO sweeping the cutoff for "gusts"
  const pink = noiseSource(ctx, 8, fillPink)
  const hp = ctx.createBiquadFilter()
  hp.type = 'highpass'
  hp.frequency.value = 600
  hp.Q.value = 0.7

  // Cutoff LFO — sweeps 400 to 1600 Hz over 12 seconds
  const cutLFO = ctx.createOscillator()
  cutLFO.frequency.value = 0.08
  const cutDepth = ctx.createGain()
  cutDepth.gain.value = 600
  const cutOffset = ctx.createConstantSource()
  cutOffset.offset.value = 1000
  cutLFO.connect(cutDepth)
  cutOffset.connect(hp.frequency)
  cutDepth.connect(hp.frequency)
  cutOffset.start()
  cutLFO.start()

  // Amplitude LFO for "gusts"
  const ampLFO = ctx.createOscillator()
  ampLFO.frequency.value = 0.15
  const ampDepth = ctx.createGain()
  ampDepth.gain.value = 0.35
  const ampOffset = ctx.createConstantSource()
  ampOffset.offset.value = 0.7
  ampLFO.connect(ampDepth)
  const ampGain = ctx.createGain()
  ampGain.gain.value = 0
  ampOffset.connect(ampGain.gain)
  ampDepth.connect(ampGain.gain)
  ampOffset.start()
  ampLFO.start()

  // Slow stereo panning sweep
  const panner = ctx.createStereoPanner()
  const panLFO = ctx.createOscillator()
  panLFO.frequency.value = 0.07
  const panDepth = ctx.createGain()
  panDepth.gain.value = 0.6
  panLFO.connect(panDepth)
  panDepth.connect(panner.pan)
  panLFO.start()

  pink.connect(hp).connect(ampGain).connect(panner)

  const master = ctx.createGain()
  panner.connect(master)

  pink.start()

  return {
    master,
    stop() {
      try { pink.stop(); cutLFO.stop(); cutOffset.stop(); ampLFO.stop(); ampOffset.stop(); panLFO.stop() } catch {}
    },
  }
}

const factories = {
  rain: makeRain,
  ocean: makeOcean,
  fire: makeFire,
  bowl: makeBowl,
  forest: makeForest,
  wind: makeWind,
}

// ════════════════════════════════════════════════════════════════

export default function AudioLibrary() {
  const [playingId, setPlayingId] = useState(null)
  const [volume, setVolume] = useState(0.6)
  const [error, setError] = useState(null)
  const ctxRef = useRef(null)
  const handleRef = useRef(null)

  const stop = useCallback(() => {
    const h = handleRef.current
    if (h && ctxRef.current) {
      const ctx = ctxRef.current
      const now = ctx.currentTime
      try {
        h.master.gain.cancelScheduledValues(now)
        h.master.gain.setValueAtTime(h.master.gain.value, now)
        h.master.gain.linearRampToValueAtTime(0.0001, now + 0.4)
      } catch {}
      setTimeout(() => {
        try { h.stop() } catch {}
      }, 500)
      handleRef.current = null
    }
    setPlayingId(null)
  }, [])

  async function play(sound) {
    if (playingId === sound.id) {
      stop()
      return
    }
    setError(null)
    stop()

    try {
      if (!ctxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext
        if (!Ctx) {
          setError('Your browser doesn\'t support Web Audio.')
          return
        }
        ctxRef.current = new Ctx()
      }
      const ctx = ctxRef.current
      if (ctx.state === 'suspended') await ctx.resume()

      const factory = factories[sound.factory]
      if (!factory) {
        setError(`No factory for ${sound.id}`)
        return
      }

      // small delay so the previous fade-out can finish cleanly
      await new Promise((r) => setTimeout(r, 50))

      const handle = factory(ctx)
      handle.master.gain.value = 0.0001
      const now = ctx.currentTime
      handle.master.gain.setValueAtTime(0.0001, now)
      handle.master.gain.linearRampToValueAtTime(volume, now + 0.8)
      handle.master.connect(ctx.destination)

      handleRef.current = handle
      setPlayingId(sound.id)
    } catch (err) {
      setError(err.message || 'Audio failed to start.')
      console.error('AudioLibrary:', err)
    }
  }

  useEffect(() => {
    if (handleRef.current && ctxRef.current) {
      try {
        const now = ctxRef.current.currentTime
        handleRef.current.master.gain.cancelScheduledValues(now)
        handleRef.current.master.gain.setValueAtTime(handleRef.current.master.gain.value, now)
        handleRef.current.master.gain.linearRampToValueAtTime(volume, now + 0.2)
      } catch {}
    }
  }, [volume])

  useEffect(() => () => stop(), [stop])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="audio-library">
      <Reveal>
        <div className="mb-10 pb-4 border-b border-ink/15">
          <span className="editorial-label flex items-center gap-2">
            Section · Sounds &amp; breathwork <TierBadge />
          </span>
          <h2 className="font-display text-5xl sm:text-6xl text-ink mt-2 leading-none">
            Sounds for the <span className="display-italic text-clay">moment.</span>
          </h2>
          <p className="text-sm text-ink-soft mt-3 max-w-xl">
            Six distinct audio textures, each its own synthesised graph — rain with droplets, ocean with swells, fire with crackles, singing-bowl harmonics, forest birds, wind gusts. Headphones recommended.
          </p>
        </div>
      </Reveal>

      {error && (
        <Reveal>
          <div className="mb-6 p-4 border border-clay/30 bg-clay-paler text-sm text-clay-dark">
            {error}
          </div>
        </Reveal>
      )}

      <Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-ink/15 border border-ink/15 mb-6">
          {sounds.map((s) => {
            const active = playingId === s.id
            return (
              <button
                key={s.id}
                onClick={() => play(s)}
                className={`text-left p-5 transition-all ${active ? 'bg-ink text-cream' : 'bg-cream-light hover:bg-bone'}`}
                data-cursor-label={active ? 'stop' : 'play'}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`editorial-label ${active ? 'text-gold' : ''}`}>{s.cat}</span>
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-base display-italic ${active ? 'bg-gold text-ink' : 'border border-ink/20'}`}
                    style={active ? {} : { color: s.accent }}
                  >
                    {active ? '❚❚' : '▶'}
                  </span>
                </div>
                <p className="font-display text-2xl leading-tight">{s.label}</p>
                <p className={`text-xs mt-2 leading-snug ${active ? 'text-cream/70' : 'text-ink-soft'}`}>{s.desc}</p>
                {active && <ActiveEqualizer />}
              </button>
            )
          })}
        </div>
      </Reveal>

      {playingId && (
        <Reveal>
          <div className="border border-ink/15 bg-bone p-4 mb-6 flex items-center gap-4 flex-wrap">
            <span className="editorial-label">Now playing</span>
            <span className="font-display text-lg text-ink">{sounds.find((s) => s.id === playingId).label}</span>
            <div className="flex items-center gap-3 flex-1 min-w-[200px]">
              <span className="text-xs text-ink-soft">Volume</span>
              <input
                type="range" min="0" max="1" step="0.05"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 accent-ink"
              />
              <span className="num-display text-xs text-ink-soft w-8 text-right">{Math.round(volume * 100)}</span>
            </div>
            <button onClick={stop} className="text-xs text-ink-soft hover:text-clay display-italic">stop</button>
          </div>
        </Reveal>
      )}

      <Reveal>
        <h3 className="font-display text-3xl text-ink mt-12 mb-5 leading-tight">Breathwork timer</h3>
      </Reveal>
      <Breathwork />
    </section>
  )
}

function ActiveEqualizer() {
  return (
    <div className="mt-3 flex gap-0.5 items-end h-4">
      {[...Array(16)].map((_, i) => (
        <span
          key={i}
          className="flex-1 bg-gold rounded-sm"
          style={{
            animation: `eq-bar 0.${4 + (i % 5)}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.05}s`,
            height: '60%',
            transformOrigin: 'bottom',
          }}
        />
      ))}
    </div>
  )
}

function Breathwork() {
  const [patternId, setPatternId] = useState('box')
  const [running, setRunning] = useState(false)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [cycles, setCycles] = useState(0)
  const intervalRef = useRef(null)

  const pattern = breathPatterns.find((p) => p.id === patternId)
  const activePhases = pattern.phases.filter(([, dur]) => dur > 0)
  const currentPhase = activePhases[phaseIdx]

  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current)
      return
    }
    setSecondsLeft(currentPhase[1])
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setPhaseIdx((idx) => {
            const next = (idx + 1) % activePhases.length
            if (next === 0) setCycles((c) => c + 1)
            return next
          })
          return activePhases[(phaseIdx + 1) % activePhases.length][1]
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running, phaseIdx, patternId])

  function start() {
    setPhaseIdx(0)
    setSecondsLeft(activePhases[0][1])
    setCycles(0)
    setRunning(true)
  }
  function stop() {
    setRunning(false)
    setPhaseIdx(0)
    setCycles(0)
  }

  const phaseLabel = currentPhase[0]
  const targetScale = phaseLabel === 'Inhale' ? 1
    : phaseLabel === 'Exhale' ? 0.45
    : phaseLabel === 'Hold' && phaseIdx === 1 ? 1
    : phaseLabel === 'Hold' ? 0.45
    : 0.7

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <Reveal className="lg:col-span-5">
        <div className="border border-ink/15 bg-cream-light p-5 space-y-2">
          {breathPatterns.map((p) => (
            <button
              key={p.id}
              onClick={() => { setPatternId(p.id); stop() }}
              className={`w-full text-left p-4 border transition-all ${
                patternId === p.id
                  ? 'bg-ink text-cream border-ink'
                  : 'bg-cream border-ink/15 hover:border-ink'
              }`}
            >
              <p className="font-display text-xl">{p.label}</p>
              <p className={`text-xs mt-1 ${patternId === p.id ? 'text-cream/70' : 'text-ink-soft'}`}>{p.desc}</p>
              <p className={`num-display text-xs mt-2 ${patternId === p.id ? 'text-gold' : 'text-clay'}`}>
                {p.phases.filter(([, d]) => d > 0).map(([label, dur]) => `${label} ${dur}s`).join(' · ')}
              </p>
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal className="lg:col-span-7" delay={80}>
        <div className="border border-ink/15 bg-ink text-cream p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <span className="absolute inset-0 border border-cream/15 rounded-full" />
            <span
              className="absolute rounded-full border-2 border-gold transition-transform"
              style={{
                width: '100%',
                height: '100%',
                transform: `scale(${running ? targetScale : 0.7})`,
                transitionDuration: running ? `${currentPhase[1]}s` : '0.4s',
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                background: 'radial-gradient(circle, rgba(212,167,68,0.15), transparent 70%)',
              }}
            />
            <div className="relative z-10 text-center">
              {running ? (
                <>
                  <p className="display-italic text-base text-gold">{phaseLabel}</p>
                  <p className="num-display text-7xl text-cream leading-none mt-1">{secondsLeft}</p>
                </>
              ) : (
                <p className="font-display text-2xl text-cream">Press start</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6">
            {running ? (
              <button onClick={stop} className="inline-flex items-center gap-2 px-6 py-3 bg-cream text-ink text-sm font-medium hover:bg-cream-light transition-colors">
                Stop
              </button>
            ) : (
              <button onClick={start} className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-ink text-sm font-medium hover:bg-gold-light transition-colors">
                Start <span className="display-italic">→</span>
              </button>
            )}
            <p className="text-xs text-cream/60">
              <span className="num-display text-cream text-base">{cycles}</span> cycles complete
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
