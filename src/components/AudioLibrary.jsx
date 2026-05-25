import { useState, useEffect, useRef, useCallback } from 'react'
import Reveal from './interactive/Reveal.jsx'
import TierBadge from './TierBadge.jsx'

/**
 * All sounds are generated on the fly via the Web Audio API — no audio
 * files to ship, no licensing, works fully offline. Each "sound" is a
 * shaped noise generator with a specific filter profile that mimics the
 * named ambient texture.
 */

const sounds = [
  { id: 'rain', label: 'Soft rain', cat: 'Sleep', desc: 'Filtered brown noise — like steady rain on glass', accent: '#5A6B5D', cutoff: 600, type: 'brown' },
  { id: 'ocean', label: 'Ocean shore', cat: 'Sleep', desc: 'Slow swelling white noise — waves rolling in', accent: '#6BAEEF', cutoff: 800, type: 'wave' },
  { id: 'fan', label: 'Fan / white noise', cat: 'Sleep', desc: 'Steady wide-band hum — classic baby-sleep trick', accent: '#9B8E82', cutoff: 4000, type: 'white' },
  { id: 'forest', label: 'Forest hush', cat: 'Focus', desc: 'High-pass noise with gentle warble — leaves in wind', accent: '#3D4A40', cutoff: 1800, type: 'pink' },
  { id: 'fireplace', label: 'Fireplace', cat: 'Focus', desc: 'Low brown noise with crackles — winter evening', accent: '#C8654A', cutoff: 400, type: 'brown' },
  { id: 'cafe', label: 'Café murmur', cat: 'Focus', desc: 'Mid-band noise — the classic deep-work backdrop', accent: '#B08A2E', cutoff: 1200, type: 'pink' },
]

const breathPatterns = [
  { id: 'box', label: 'Box breathing', phases: [['Inhale', 4], ['Hold', 4], ['Exhale', 4], ['Hold', 4]], desc: 'Used by Navy SEALs to calm the nervous system fast.' },
  { id: '478', label: '4-7-8', phases: [['Inhale', 4], ['Hold', 7], ['Exhale', 8], ['Pause', 0]], desc: 'Dr. Andrew Weil\'s sleep-onset technique.' },
  { id: 'coherent', label: 'Coherent', phases: [['Inhale', 6], ['Exhale', 6], ['', 0], ['', 0]], desc: '6-second breaths — peak heart-rate variability.' },
]

// ─── Noise generators using Web Audio ─────────────────────────────
function createNoiseSource(ctx, type) {
  const bufferSize = 2 * ctx.sampleRate
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  if (type === 'white') {
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
  } else if (type === 'pink') {
    // Paul Kellet pink noise approximation
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11
      b6 = white * 0.115926
    }
  } else if (type === 'brown') {
    let last = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      last = (last + 0.02 * white) / 1.02
      data[i] = last * 3.5
    }
  } else if (type === 'wave') {
    // Slow LFO-modulated brown noise → ocean swells
    let last = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      last = (last + 0.02 * white) / 1.02
      const swell = 0.4 + 0.6 * (Math.sin(i / (ctx.sampleRate * 1.5)) * 0.5 + 0.5)
      data[i] = last * 3 * swell
    }
  }

  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.loop = true
  return source
}

export default function AudioLibrary() {
  const [playingId, setPlayingId] = useState(null)
  const [volume, setVolume] = useState(0.4)
  const ctxRef = useRef(null)
  const nodesRef = useRef(null)

  const stop = useCallback(() => {
    if (nodesRef.current) {
      try {
        nodesRef.current.gain.gain.setValueAtTime(0.0001, ctxRef.current.currentTime)
        nodesRef.current.source.stop(ctxRef.current.currentTime + 0.05)
      } catch {}
      nodesRef.current = null
    }
    setPlayingId(null)
  }, [])

  function play(sound) {
    if (playingId === sound.id) {
      stop()
      return
    }
    stop()
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    const ctx = ctxRef.current
    if (ctx.state === 'suspended') ctx.resume()

    const source = createNoiseSource(ctx, sound.type)
    const filter = ctx.createBiquadFilter()
    filter.type = sound.cutoff < 2000 ? 'lowpass' : 'bandpass'
    filter.frequency.value = sound.cutoff
    filter.Q.value = 0.7

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.6)

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    source.start()

    nodesRef.current = { source, gain, filter }
    setPlayingId(sound.id)
  }

  // Live volume update
  useEffect(() => {
    if (nodesRef.current && ctxRef.current) {
      try {
        nodesRef.current.gain.gain.linearRampToValueAtTime(volume, ctxRef.current.currentTime + 0.2)
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
            Six audio textures generated live in your browser — no streaming, no files, no tracking. Plus three breathwork patterns with a visual timer.
          </p>
        </div>
      </Reveal>

      {/* SOUND GRID */}
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
                {active && (
                  <div className="mt-3 flex gap-0.5 items-end h-4">
                    {[...Array(20)].map((_, i) => (
                      <span
                        key={i}
                        className="flex-1 bg-gold"
                        style={{
                          height: `${30 + Math.sin(Date.now() / 200 + i) * 30 + 30}%`,
                          animation: `pulse-soft ${0.6 + (i % 3) * 0.2}s ease-in-out infinite`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* Volume + mini player */}
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

      {/* BREATHWORK */}
      <Reveal>
        <h3 className="font-display text-3xl text-ink mt-12 mb-5 leading-tight">Breathwork timer</h3>
      </Reveal>
      <Breathwork />
    </section>
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
  // Circle scale: inhale → big, exhale → small, hold → stay
  const targetScale = phaseLabel === 'Inhale' ? 1
    : phaseLabel === 'Exhale' ? 0.45
    : phaseLabel === 'Hold' && phaseIdx === 1 ? 1 // hold full
    : phaseLabel === 'Hold' ? 0.45 // hold empty (after exhale)
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
          {/* Breathing circle */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer ring (max size reference) */}
            <span className="absolute inset-0 border border-cream/15 rounded-full" />
            {/* Animated circle */}
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
            {/* Center text */}
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

          {/* Controls */}
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
