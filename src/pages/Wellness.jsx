import { useEffect, useState, useRef } from 'react'
import WellnessCard from '../components/WellnessCard.jsx'
import { wellnessData } from '../data/wellnessData.js'
import { usePro } from '../context/ProContext.jsx'

const techniques = [
  { id: 'box', name: 'Box breathing', desc: 'Even and calming. Used by Navy SEALs and pilots.', phases: [['Inhale', 4], ['Hold', 4], ['Exhale', 4], ['Hold', 4]] },
  { id: '478', name: '4-7-8', desc: 'Activates the parasympathetic nervous system — for falling asleep.', phases: [['Inhale', 4], ['Hold', 7], ['Exhale', 8]] },
  { id: 'coherent', name: 'Coherent (5-5)', desc: 'Slow 6 breaths/min — balances heart rhythm.', phases: [['Inhale', 5], ['Exhale', 5]] },
]

function BreathingExercise() {
  const [techId, setTechId] = useState('box')
  const [running, setRunning] = useState(false)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [count, setCount] = useState(0)
  const [round, setRound] = useState(0)
  const intervalRef = useRef(null)

  const tech = techniques.find((t) => t.id === techId)
  const [phaseLabel, phaseSecs] = tech.phases[phaseIdx]

  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      setCount((c) => {
        if (c + 1 >= phaseSecs) {
          setPhaseIdx((p) => {
            const next = p + 1
            if (next >= tech.phases.length) {
              setRound((r) => r + 1)
              return 0
            }
            return next
          })
          return 0
        }
        return c + 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running, phaseSecs, tech.phases.length])

  function start() {
    setPhaseIdx(0)
    setCount(0)
    setRound(0)
    setRunning(true)
  }

  function stop() {
    setRunning(false)
    setPhaseIdx(0)
    setCount(0)
  }

  // Visual circle scale based on phase
  const isInhale = phaseLabel === 'Inhale'
  const isExhale = phaseLabel === 'Exhale'
  const scale = running
    ? isInhale
      ? 1 + (count / phaseSecs) * 0.6
      : isExhale
        ? 1.6 - (count / phaseSecs) * 0.6
        : phaseLabel === 'Hold' && phaseIdx === 1 ? 1.6 : 1
    : 1

  return (
    <div className="pro-card rounded-3xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-2">
        <h3 className="font-bold text-neutral-800 text-lg">Guided breathing</h3>
        <span className="pro-badge">Pro</span>
      </div>
      <p className="text-sm text-neutral-500 mb-5">Pick a technique. Breathe with the circle.</p>

      {/* Technique selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {techniques.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTechId(t.id); stop() }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              techId === t.id
                ? 'bg-gradient-to-r from-amber-300 to-pink-300 text-amber-900 shadow-soft'
                : 'bg-white border border-neutral-200 text-neutral-500 hover:border-amber-200'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <p className="text-sm text-neutral-600 mb-6 italic">{tech.desc}</p>

      {/* Animated breathing circle */}
      <div className="flex flex-col items-center justify-center py-8 mb-4">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200/60 via-pink-200/60 to-purple-200/60 transition-transform duration-1000 ease-in-out"
            style={{ transform: `scale(${scale})` }}
          />
          <div className="relative text-center">
            <p className="text-3xl font-bold text-neutral-800 mb-1">{running ? phaseLabel : 'Ready'}</p>
            <p className="text-4xl font-bold text-amber-700 tabular-nums">
              {running ? phaseSecs - count : phaseSecs}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-neutral-400">
          {running ? `Round ${round + 1}` : 'Tap start to begin'}
        </p>
        {running ? (
          <button
            onClick={stop}
            className="px-5 py-2.5 rounded-2xl bg-neutral-100 text-neutral-600 font-semibold text-sm hover:bg-neutral-200 transition-colors"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={start}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-pink-400 text-white font-semibold text-sm shadow-soft hover:shadow-soft-hover transition-all hover:-translate-y-0.5"
          >
            ▶ Start
          </button>
        )}
      </div>
    </div>
  )
}

export default function Wellness({ onNavigate }) {
  const { isPro } = usePro()

  return (
    <div className="page-section">
      {/* Page header */}
      <div className="mb-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 bg-sage/70 text-green-800 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-sage-dark/40">
          🌿 Wellness
        </div>
        <h1 className="section-heading">Care for your whole self</h1>
        <p className="section-sub max-w-xl">
          Gentle, evidence-informed self-care for the things that affect everyday life — stress, sleep, energy, pain, and more.
        </p>
      </div>

      {/* Wellness cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {wellnessData.map((item, i) => (
          <WellnessCard key={item.id} data={item} delay={i * 60} />
        ))}
      </div>

      {/* Pro: Guided breathing */}
      {isPro ? (
        <section className="mt-12 animate-fade-up">
          <BreathingExercise />
        </section>
      ) : (
        <section className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-pink-50 border border-amber-200/60 animate-fade-up">
          <div className="flex items-start gap-4">
            <div className="text-3xl animate-pulse-soft">🧘</div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Pro feature</p>
              <h3 className="font-bold text-neutral-800 mb-1">Guided breathing exercises</h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                Box, 4-7-8, and coherent breathing — with a visual circle that paces you. Calms anxiety in under 2 minutes.
              </p>
              <button onClick={() => onNavigate?.('pro')} className="text-xs font-semibold text-amber-700 hover:underline">
                Unlock with Pro →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* General disclaimer */}
      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-sage/30 to-lavender/30 border border-sage/50 animate-fade-up" style={{ animationDelay: '600ms' }}>
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">💜</span>
          <div>
            <p className="font-semibold text-neutral-800 mb-1 text-sm">A kind reminder</p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              These suggestions are general self-care tips — they are not medical advice and do not replace professional help.
              If you are struggling with your mental health, physical health, or just need someone to talk to, please reach out to a trusted adult, doctor, or counsellor.
              You deserve support.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
