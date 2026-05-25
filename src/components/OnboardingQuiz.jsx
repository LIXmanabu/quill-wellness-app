import { useState } from 'react'
import { useUser } from '../context/UserContext.jsx'

const skinTypes = [
  { id: 'dry', label: 'Dry', icon: '🌵', desc: 'Tight, sometimes flaky' },
  { id: 'oily', label: 'Oily', icon: '✨', desc: 'Shiny T-zone, larger pores' },
  { id: 'combo', label: 'Combination', icon: '🌗', desc: 'Oily T-zone, dry cheeks' },
  { id: 'sensitive', label: 'Sensitive', icon: '🌸', desc: 'Reacts easily, redness' },
  { id: 'normal', label: 'Normal', icon: '🌼', desc: 'Balanced, rarely fussy' },
  { id: 'unsure', label: 'Not sure', icon: '🤔', desc: "We'll help you find out" },
]

const goals = [
  { id: 'glow', label: 'Glow & confidence', icon: '✨', color: 'from-pink-100 to-blush/60' },
  { id: 'fitness', label: 'Move & feel strong', icon: '⚡', color: 'from-orange-100 to-peach/60' },
  { id: 'calm', label: 'Stress less, sleep better', icon: '🌿', color: 'from-sage/60 to-lavender/60' },
  { id: 'body', label: 'Understand my body', icon: '🌸', color: 'from-blush/60 to-lavender/60' },
  { id: 'eat', label: 'Eat smarter', icon: '🥗', color: 'from-peach/60 to-orange-100' },
]

const times = [
  { id: '5', label: '5 min/day', desc: 'Quick & simple' },
  { id: '15', label: '15 min/day', desc: 'A real routine' },
  { id: '30', label: '30+ min/day', desc: 'I love self-care' },
]

export default function OnboardingQuiz({ onClose }) {
  const { completeOnboarding } = useUser()
  const [step, setStep] = useState(0)
  const [data, setData] = useState({ name: '', skinType: '', goal: '', timePerDay: '' })

  const steps = [
    {
      title: "Welcome to Quill 🌸",
      sub: "Let's set you up in 30 seconds. First — what should we call you?",
      content: (
        <div className="space-y-3">
          <input
            type="text"
            autoFocus
            placeholder="Your name or nickname"
            value={data.name}
            onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
            onKeyDown={(e) => e.key === 'Enter' && data.name.trim() && setStep(1)}
            className="w-full px-5 py-4 rounded-2xl border-2 border-blush/40 bg-white text-base text-neutral-800 placeholder-neutral-400 focus:border-pink-400 focus:outline-none transition-colors"
            maxLength={20}
          />
          <button
            onClick={() => setData((d) => ({ ...d, name: '' })) || setStep(1)}
            className="text-xs text-neutral-400 hover:text-neutral-600 underline"
          >
            Skip — keep it anonymous
          </button>
        </div>
      ),
      canAdvance: true,
    },
    {
      title: data.name ? `Hi ${data.name} 💖` : 'Nice to meet you 💖',
      sub: "What's your skin type? (You can change this later.)",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {skinTypes.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setData((d) => ({ ...d, skinType: s.id }))
                setTimeout(() => setStep(2), 200)
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                data.skinType === s.id
                  ? 'border-pink-400 bg-blush/30 shadow-soft'
                  : 'border-blush/30 bg-white hover:border-blush'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{s.icon}</span>
                <span className="font-semibold text-sm text-neutral-800">{s.label}</span>
              </div>
              <p className="text-xs text-neutral-500 leading-snug">{s.desc}</p>
            </button>
          ))}
        </div>
      ),
      canAdvance: !!data.skinType,
    },
    {
      title: 'What matters most to you right now?',
      sub: "We'll tailor your home page to this. Pick one — change it anytime.",
      content: (
        <div className="space-y-2">
          {goals.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                setData((d) => ({ ...d, goal: g.id }))
                setTimeout(() => setStep(3), 200)
              }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                data.goal === g.id
                  ? 'border-pink-400 shadow-soft'
                  : 'border-blush/30 hover:border-blush'
              } bg-gradient-to-r ${g.color}`}
            >
              <span className="text-2xl">{g.icon}</span>
              <span className="font-semibold text-sm text-neutral-800">{g.label}</span>
            </button>
          ))}
        </div>
      ),
      canAdvance: !!data.goal,
    },
    {
      title: 'How much time can you give Quill?',
      sub: 'Honest answers get better suggestions. No pressure either way.',
      content: (
        <div className="space-y-2">
          {times.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setData((d) => ({ ...d, timePerDay: t.id }))
                setTimeout(() => {
                  completeOnboarding({ ...data, timePerDay: t.id })
                  onClose()
                }, 250)
              }}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                data.timePerDay === t.id
                  ? 'border-pink-400 bg-blush/30 shadow-soft'
                  : 'border-blush/30 bg-white hover:border-blush'
              }`}
            >
              <span className="font-semibold text-sm text-neutral-800">{t.label}</span>
              <span className="text-xs text-neutral-500">{t.desc}</span>
            </button>
          ))}
        </div>
      ),
      canAdvance: !!data.timePerDay,
    },
  ]

  const current = steps[step]
  const progress = ((step + 1) / steps.length) * 100

  function handleSkip() {
    completeOnboarding(data)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-blush/60 via-lavender/60 to-cream/80 backdrop-blur-xl" />

      {/* Floating decorative blobs */}
      <div className="hero-bg-blob bg-blush/40 w-72 h-72 top-10 left-10 animate-float-slow" />
      <div className="hero-bg-blob bg-lavender/40 w-80 h-80 bottom-10 right-10 animate-float-reverse" />

      {/* Modal */}
      <div className="relative w-full max-w-md card-solid p-6 sm:p-8 animate-pop-in">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2 text-xs text-neutral-400">
            <span>Step {step + 1} of {steps.length}</span>
            <button onClick={handleSkip} className="hover:text-neutral-600 underline">
              Skip for now
            </button>
          </div>
          <div className="h-1.5 rounded-full bg-blush/30 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div key={step} className="animate-fade-up">
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">{current.title}</h2>
          <p className="text-sm text-neutral-500 mb-6 leading-relaxed">{current.sub}</p>
          {current.content}
        </div>

        {/* Footer nav (only for step 0 + step needing manual advance) */}
        {step === 0 && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={() => setStep(1)}
              disabled={!data.name.trim()}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white text-sm font-semibold shadow-soft hover:shadow-soft-hover transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          </div>
        )}

        {step > 0 && (
          <div className="mt-5 flex justify-between text-xs">
            <button onClick={() => setStep(step - 1)} className="text-neutral-400 hover:text-neutral-600">
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
