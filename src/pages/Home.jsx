const previewCards = [
  {
    key: 'sport',
    icon: '⚡',
    title: 'Sport & Fitness',
    description: 'Beginner-friendly routines for legs, glutes, core, and more — designed for you.',
    gradient: 'from-peach/60 to-blush/60',
    accent: 'text-orange-600',
  },
  {
    key: 'body',
    icon: '🌸',
    title: 'Body Map',
    description: 'Tap any body area for personalised wellness tips, self-care suggestions, and gentle guidance.',
    gradient: 'from-blush/60 to-lavender/60',
    accent: 'text-pink-600',
  },
  {
    key: 'skincare',
    icon: '✨',
    title: 'Skin Care',
    description: 'Morning, evening, and skin-type routines — gentle, beginner-safe steps for every skin.',
    gradient: 'from-lavender/60 to-cream-dark/60',
    accent: 'text-purple-600',
  },
  {
    key: 'wellness',
    icon: '🌿',
    title: 'Wellness',
    description: 'Stress relief, better sleep, cramp care, and hydration — calm, evidence-based self-care.',
    gradient: 'from-sage/60 to-lavender/60',
    accent: 'text-green-700',
  },
  {
    key: 'wellness',
    icon: '💧',
    title: 'Daily Tips',
    description: 'Small daily habits that build long-term wellbeing — hydration, movement, rest, and mood.',
    gradient: 'from-sky-100 to-blush/40',
    accent: 'text-sky-600',
  },
]

export default function Home({ onNavigate }) {
  return (
    <div className="page-section">
      {/* Hero */}
      <section className="text-center py-16 sm:py-24 px-4 animate-fade-up">
        <div className="inline-flex items-center gap-2 bg-blush/60 text-pink-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-blush-dark/30">
          🌸 Your wellness companion
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-800 leading-tight mb-6">
          Feel good from the{' '}
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            inside out
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-neutral-500 max-w-xl mx-auto leading-relaxed mb-10">
          Your simple guide for fitness, wellness, skin care, and body confidence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('body')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold text-sm shadow-soft-lg hover:shadow-soft-hover transition-all duration-200 hover:-translate-y-0.5"
          >
            Explore Body Map ✨
          </button>
          <button
            onClick={() => onNavigate('wellness')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white border border-blush text-pink-600 font-semibold text-sm hover:bg-blush/30 transition-all duration-200"
          >
            Wellness Tips 🌿
          </button>
        </div>
      </section>

      {/* Feature strip */}
      <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-16 animate-fade-up" style={{ animationDelay: '100ms' }}>
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

      {/* Section heading */}
      <div className="mb-6" style={{ animationDelay: '150ms' }}>
        <h2 className="section-heading">Explore the app</h2>
        <p className="section-sub">Everything you need in one place — tap any card to get started.</p>
      </div>

      {/* Preview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {previewCards.map((card, i) => (
          <button
            key={`${card.key}-${i}`}
            onClick={() => onNavigate(card.key)}
            className={`card-solid p-6 text-left group hover:shadow-soft-hover hover:-translate-y-1 transition-all duration-300 animate-fade-up`}
            style={{ animationDelay: `${200 + i * 60}ms` }}
          >
            <div className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
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
        ))}
      </div>

      {/* Bottom disclaimer strip */}
      <div className="mt-16 p-5 rounded-3xl bg-blush/20 border border-blush/40 text-center animate-fade-up" style={{ animationDelay: '600ms' }}>
        <p className="text-sm text-neutral-500 leading-relaxed">
          <span className="font-medium text-neutral-700">Wellness, not medical advice.</span>{' '}
          Quill provides general self-care information. For health concerns, always talk to a doctor, dermatologist, or trusted adult.
        </p>
      </div>
    </div>
  )
}
