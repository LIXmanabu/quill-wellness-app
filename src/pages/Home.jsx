import { useUser } from '../context/UserContext.jsx'
import { usePro } from '../context/ProContext.jsx'
import DailyTipCard from '../components/DailyTipCard.jsx'

const previewCards = [
  {
    key: 'sport',
    icon: '⚡',
    title: 'Sport & Fitness',
    description: 'Beginner-friendly routines for legs, glutes, core, and more — designed for you.',
    gradient: 'from-peach/60 to-blush/60',
    accent: 'text-orange-600',
    goal: 'fitness',
  },
  {
    key: 'body',
    icon: '🌸',
    title: 'Body Map',
    description: 'Tap any body area for personalised wellness tips, self-care suggestions, and gentle guidance.',
    gradient: 'from-blush/60 to-lavender/60',
    accent: 'text-pink-600',
    goal: 'body',
  },
  {
    key: 'skincare',
    icon: '✨',
    title: 'Skin Care',
    description: 'Morning, evening, and skin-type routines — gentle, beginner-safe steps for every skin.',
    gradient: 'from-lavender/60 to-cream-dark/60',
    accent: 'text-purple-600',
    goal: 'glow',
  },
  {
    key: 'wellness',
    icon: '🌿',
    title: 'Wellness',
    description: 'Stress relief, better sleep, cramp care, and hydration — calm, evidence-based self-care.',
    gradient: 'from-sage/60 to-lavender/60',
    accent: 'text-green-700',
    goal: 'calm',
  },
  {
    key: 'tips',
    icon: '💡',
    title: 'Daily Tips',
    description: 'A fresh wellness tip every day — hydration, mood, movement, sleep, mindset.',
    gradient: 'from-sky-100 to-blush/40',
    accent: 'text-sky-600',
    goal: 'calm',
  },
  {
    key: 'diet',
    icon: '🥗',
    title: 'Diet & pH',
    description: 'Science-based diets for fat loss, muscle, longevity, and more — plus a pH self check-in.',
    gradient: 'from-peach/60 to-orange-100',
    accent: 'text-orange-700',
    goal: 'eat',
  },
]

const goalGreeting = {
  glow: { line: 'A little extra glow today? You\'re in the right place.', primary: 'skincare', primaryLabel: 'Today\'s Skin Routine ✨' },
  fitness: { line: 'Ready to move? Let\'s pick something that feels good.', primary: 'sport', primaryLabel: 'Today\'s Workout ⚡' },
  calm: { line: 'Take a breath. Let\'s find your calm.', primary: 'wellness', primaryLabel: 'Stress Relief 🌿' },
  body: { line: 'Your body is the only one you get. Let\'s understand it.', primary: 'body', primaryLabel: 'Open Body Map 🌸' },
  eat: { line: 'Fuel that actually fits your goals.', primary: 'diet', primaryLabel: 'See Diets 🥗' },
}

export default function Home({ onNavigate }) {
  const { profile } = useUser()
  const { isPro } = usePro()
  const isReturning = profile.dismissedOnboarding && (profile.name || profile.goal)
  const greeting = goalGreeting[profile.goal]

  // Pick personalized recommended cards: matching goal first
  const recommendedCards = profile.goal
    ? [...previewCards.filter((c) => c.goal === profile.goal), ...previewCards.filter((c) => c.goal !== profile.goal)]
    : previewCards

  return (
    <div className="page-section">
      {/* Hero */}
      <section className="relative text-center py-16 sm:py-24 px-4 mb-4 overflow-hidden">
        {/* Animated background blobs */}
        <div className="hero-bg-blob bg-blush/40 w-80 h-80 top-0 -left-20 animate-float-slow" />
        <div className="hero-bg-blob bg-lavender/40 w-96 h-96 -top-10 -right-20 animate-float-reverse" />
        <div className="hero-bg-blob bg-sage/30 w-64 h-64 bottom-0 left-1/3 animate-float" />
        {isPro && (
          <>
            <div className="hero-bg-blob bg-amber-200/40 w-72 h-72 top-20 right-1/4 animate-float" />
            <span className="absolute top-12 left-10 text-2xl animate-sparkle" aria-hidden>✨</span>
            <span className="absolute top-32 right-16 text-xl animate-sparkle" style={{ animationDelay: '1s' }} aria-hidden>✨</span>
            <span className="absolute bottom-20 left-1/4 text-lg animate-sparkle" style={{ animationDelay: '1.6s' }} aria-hidden>✨</span>
          </>
        )}

        <div className="relative animate-fade-up">
          <div className={`inline-flex items-center gap-2 ${isPro ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-blush/60 text-pink-700 border-blush-dark/30'} text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border`}>
            {isPro ? <>✨ Pro mode active</> : <>🌸 Your wellness companion</>}
          </div>

          {isReturning ? (
            <>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-800 leading-tight mb-4">
                Welcome back{profile.name && <>, <span className={isPro ? 'text-gradient-pro' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 bg-clip-text text-transparent'}>{profile.name}</span></>} 💖
              </h1>
              <p className="text-lg sm:text-xl text-neutral-500 max-w-xl mx-auto leading-relaxed mb-10">
                {greeting?.line || 'Pick where you want to start today.'}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-800 leading-tight mb-6">
                Feel good from the{' '}
                <span className={isPro ? 'text-gradient-pro' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 bg-clip-text text-transparent'}>
                  inside out
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-neutral-500 max-w-xl mx-auto leading-relaxed mb-10">
                Your simple guide for fitness, wellness, skin care, and body confidence.
              </p>
            </>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {greeting ? (
              <button
                onClick={() => onNavigate(greeting.primary)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold text-sm shadow-soft-lg hover:shadow-soft-hover transition-all duration-200 hover:-translate-y-0.5"
              >
                {greeting.primaryLabel}
              </button>
            ) : (
              <button
                onClick={() => onNavigate('body')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold text-sm shadow-soft-lg hover:shadow-soft-hover transition-all duration-200 hover:-translate-y-0.5"
              >
                Explore Body Map ✨
              </button>
            )}
            <button
              onClick={() => onNavigate(isPro ? 'tips' : 'wellness')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white border border-blush text-pink-600 font-semibold text-sm hover:bg-blush/30 transition-all duration-200"
            >
              {isPro ? 'Tip Library 💡' : 'Wellness Tips 🌿'}
            </button>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-12 animate-fade-up" style={{ animationDelay: '100ms' }}>
        {[
          { icon: '🎯', text: 'Beginner-friendly' },
          { icon: '💜', text: 'Body-positive' },
          { icon: '🔒', text: 'No login needed' },
        ].map((f) => (
          <div key={f.text} className="flex flex-col items-center gap-1.5 text-center">
            <span className="text-2xl">{f.icon}</span>
            <span className="text-xs text-neutral-500 font-medium">{f.text}</span>
          </div>
        ))}
      </div>

      {/* Daily tip — featured */}
      <div className="mb-12 animate-fade-up" style={{ animationDelay: '150ms' }}>
        <DailyTipCard onNavigateLibrary={() => onNavigate('tips')} />
      </div>

      {/* Personalized recommendation banner */}
      {profile.goal && (
        <div className="mb-8 p-5 rounded-3xl bg-gradient-to-r from-blush/30 to-lavender/30 border border-blush/40 animate-fade-up" style={{ animationDelay: '180ms' }}>
          <p className="text-xs font-bold uppercase tracking-wider text-pink-700 mb-1">For you</p>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Based on your goal — <span className="font-semibold text-neutral-800">{goalLabel(profile.goal)}</span> — we&apos;ve put your most-relevant section first below.
          </p>
        </div>
      )}

      {/* Section heading */}
      <div className="mb-6">
        <h2 className="section-heading">Explore the app</h2>
        <p className="section-sub">Everything you need in one place — tap any card to get started.</p>
      </div>

      {/* Preview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {recommendedCards.map((card, i) => {
          const isRecommended = profile.goal && card.goal === profile.goal
          return (
            <button
              key={`${card.key}-${i}`}
              onClick={() => onNavigate(card.key)}
              className={`relative card-solid p-6 text-left group hover:shadow-soft-hover hover:-translate-y-1 transition-all duration-300 animate-fade-up ${
                isRecommended ? 'ring-2 ring-pink-300 ring-offset-2 ring-offset-cream' : ''
              }`}
              style={{ animationDelay: `${200 + i * 60}ms` }}
            >
              {isRecommended && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-pink-500 text-white text-[10px] font-bold uppercase tracking-wider animate-pop-in">
                  For you
                </span>
              )}
              <div className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                {card.icon}
              </div>
              <h3 className={`font-semibold text-neutral-800 text-base mb-2 group-hover:${card.accent} transition-colors`}>
                {card.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{card.description}</p>
              <span className={`inline-block mt-4 text-xs font-semibold ${card.accent}`}>
                Explore →
              </span>
            </button>
          )
        })}
      </div>

      {/* Pro upsell strip */}
      {!isPro && (
        <div className="mt-12 pro-card p-6 sm:p-8 rounded-3xl animate-fade-up" style={{ animationDelay: '600ms' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="text-5xl animate-float">👑</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-neutral-800 mb-1">
                Want a richer Quill experience?
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Unlock 60+ tips, ingredient deep-dives, 3-week plans, guided breathing, and premium animations with Pro.
              </p>
            </div>
            <button
              onClick={() => onNavigate('pro')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 text-white font-semibold text-sm shadow-soft-lg hover:shadow-soft-hover transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              See Pro →
            </button>
          </div>
        </div>
      )}

      {/* Bottom disclaimer strip */}
      <div className="mt-12 p-5 rounded-3xl bg-blush/20 border border-blush/40 text-center animate-fade-up" style={{ animationDelay: '700ms' }}>
        <p className="text-sm text-neutral-500 leading-relaxed">
          <span className="font-medium text-neutral-700">Wellness, not medical advice.</span>{' '}
          Quill provides general self-care information. For health concerns, always talk to a doctor, dermatologist, or trusted adult.
        </p>
      </div>
    </div>
  )
}

function goalLabel(g) {
  return ({
    glow: 'glow & confidence',
    fitness: 'move & feel strong',
    calm: 'stress less, sleep better',
    body: 'understand your body',
    eat: 'eat smarter',
  })[g] || g
}
