import { useState, useEffect, useRef, useCallback } from 'react'
import Reveal from './interactive/Reveal.jsx'
import TierBadge from './TierBadge.jsx'

/**
 * Real ambient audio streamed from Mixkit's free-sound-effects CDN.
 * Each sound is a loop-able preview MP3 served from a CloudFront edge.
 * HTMLAudioElement is used directly (no Web Audio decode) so cross-origin
 * playback works without CORS preflight.
 *
 * Mixkit License: free to use in personal and commercial projects.
 * https://mixkit.co/license/
 */

const M = (id) => `https://assets.mixkit.co/active_storage/sfx/${id}/${id}-preview.mp3`

const sounds = [
  { id: 'rain',   label: 'Rain on roof',   cat: 'Sleep', desc: 'Light steady rain on a quiet street',  url: M(1253), accent: '#5A6B5D' },
  { id: 'ocean',  label: 'Ocean waves',    cat: 'Sleep', desc: 'Sea waves rolling in to shore',         url: M(1196), accent: '#6BAEEF' },
  { id: 'fire',   label: 'Fireplace',      cat: 'Focus', desc: 'Wood crackling in a hearth',            url: M(1330), accent: '#C8654A' },
  { id: 'forest', label: 'Forest birds',   cat: 'Focus', desc: 'Soft birdsong in an open forest',       url: M(1210), accent: '#3D4A40' },
  { id: 'wind',   label: 'Wind in trees',  cat: 'Sleep', desc: 'Steady breeze through leaves',          url: M(2658), accent: '#9B8E82' },
  { id: 'stream', label: 'Mountain stream',cat: 'Focus', desc: 'Flowing water in a quiet creek',        url: M(3126), accent: '#D4A744' },
]

const breathPatterns = [
  { id: 'box',      label: 'Box breathing', phases: [['Inhale', 4], ['Hold', 4], ['Exhale', 4], ['Hold', 4]], desc: 'Used by Navy SEALs to calm the nervous system fast.' },
  { id: '478',      label: '4-7-8',         phases: [['Inhale', 4], ['Hold', 7], ['Exhale', 8], ['Pause', 0]], desc: 'Dr. Andrew Weil\'s sleep-onset technique.' },
  { id: 'coherent', label: 'Coherent',      phases: [['Inhale', 6], ['Exhale', 6], ['', 0], ['', 0]], desc: '6-second breaths — peak heart-rate variability.' },
]

// Smoothly ramp an audio element's volume over `durationMs`
function fade(audio, target, durationMs, onDone) {
  if (!audio) return
  const start = audio.volume
  const steps = Math.max(8, Math.floor(durationMs / 30))
  const stepTime = durationMs / steps
  let i = 0
  const id = setInterval(() => {
    i++
    const t = i / steps
    const v = start + (target - start) * t
    try { audio.volume = Math.max(0, Math.min(1, v)) } catch {}
    if (i >= steps) {
      clearInterval(id)
      if (onDone) onDone()
    }
  }, stepTime)
  return id
}

export default function AudioLibrary() {
  const [playingId, setPlayingId] = useState(null)
  const [loadingId, setLoadingId] = useState(null)
  const [volume, setVolume] = useState(0.6)
  const [error, setError] = useState(null)
  const audioRef = useRef(null) // currently active <Audio>
  const fadeIdRef = useRef(null)

  const stop = useCallback((cb) => {
    const audio = audioRef.current
    if (!audio) { if (cb) cb(); return }
    if (fadeIdRef.current) clearInterval(fadeIdRef.current)
    audioRef.current = null
    setPlayingId(null)
    fadeIdRef.current = fade(audio, 0, 400, () => {
      try { audio.pause(); audio.src = '' } catch {}
      if (cb) cb()
    })
  }, [])

  async function play(sound) {
    setError(null)

    // Toggle off if clicking the active one
    if (playingId === sound.id) {
      stop()
      return
    }

    // Fade old out, start new one in parallel
    const old = audioRef.current
    if (old) {
      if (fadeIdRef.current) clearInterval(fadeIdRef.current)
      audioRef.current = null
      fade(old, 0, 350, () => {
        try { old.pause(); old.src = '' } catch {}
      })
    }

    setLoadingId(sound.id)
    setPlayingId(null)

    const audio = new Audio(sound.url)
    audio.crossOrigin = 'anonymous'
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0

    try {
      // play() returns a Promise that rejects if autoplay blocked
      await audio.play()
      audioRef.current = audio
      setPlayingId(sound.id)
      setLoadingId(null)
      fadeIdRef.current = fade(audio, volume, 700)
    } catch (err) {
      setLoadingId(null)
      setError(`Couldn't start "${sound.label}". ${err.message || ''}`)
      console.error('AudioLibrary:', err)
    }
  }

  // Apply live volume changes to whatever is playing
  useEffect(() => {
    if (audioRef.current && !fadeIdRef.current) {
      try { audioRef.current.volume = volume } catch {}
    }
  }, [volume])

  // Clean up on unmount
  useEffect(() => () => {
    const a = audioRef.current
    if (a) try { a.pause(); a.src = '' } catch {}
  }, [])

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
            Six high-quality ambient loops streamed from Mixkit's free library. Plus three breathwork patterns with a visual timer. Headphones recommended.
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
            const loading = loadingId === s.id
            return (
              <button
                key={s.id}
                onClick={() => play(s)}
                disabled={loading}
                className={`text-left p-5 transition-all ${active ? 'bg-ink text-cream' : 'bg-cream-light hover:bg-bone'} ${loading ? 'opacity-70' : ''}`}
                data-cursor-label={active ? 'stop' : loading ? 'loading' : 'play'}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`editorial-label ${active ? 'text-gold' : ''}`}>{s.cat}</span>
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-base display-italic ${active ? 'bg-gold text-ink' : loading ? 'border border-clay text-clay animate-pulse-soft' : 'border border-ink/20'}`}
                    style={active ? {} : !loading ? { color: s.accent } : {}}
                  >
                    {active ? '❚❚' : loading ? '◐' : '▶'}
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
            <button onClick={() => stop()} className="text-xs text-ink-soft hover:text-clay display-italic">stop</button>
          </div>
        </Reveal>
      )}

      <p className="text-[10px] text-ink-softer italic mt-2 mb-12">
        Audio loops via <a href="https://mixkit.co/free-sound-effects/" target="_blank" rel="noopener noreferrer" className="underline hover:text-clay">Mixkit free sound library</a> · royalty-free under the Mixkit License.
      </p>

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
