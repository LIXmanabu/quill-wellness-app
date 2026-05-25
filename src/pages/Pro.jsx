import { usePro } from '../context/ProContext.jsx'

const features = [
  { icon: '💖', title: 'Unlimited favorites', free: '3 max', pro: 'Unlimited', proOnly: false },
  { icon: '💡', title: 'Full tip library', free: '~5 per category', pro: 'All 60+ tips', proOnly: false },
  { icon: '✨', title: 'Personalized home', free: 'Generic', pro: 'Goal-tailored', proOnly: false },
  { icon: '🧪', title: 'Ingredient deep-dives', free: '—', pro: 'Included', proOnly: true },
  { icon: '📅', title: 'Weekly skincare planner', free: '—', pro: 'AM / PM / Weekly', proOnly: true },
  { icon: '💪', title: 'Progression plans', free: 'Single routine', pro: '3-week plans per goal', proOnly: true },
  { icon: '🧘', title: 'Guided breathing', free: '—', pro: 'Box, 4-7-8, coherent', proOnly: true },
  { icon: '🥗', title: 'Meal plan templates', free: 'Diet overview', pro: '7-day templates', proOnly: true },
  { icon: '🌸', title: 'Body Map: related areas', free: 'Single region', pro: 'Cross-referenced tips', proOnly: true },
  { icon: '🎨', title: 'Premium visuals', free: '—', pro: 'Animated UI, gradients, sparkles', proOnly: true },
]

const testimonials = [
  { name: 'Maya, 17', quote: 'I actually open Quill every morning now. The daily tip + my saved routines are everything.', avatar: '🌸' },
  { name: 'Anya, 21', quote: 'The pH check-in helped me notice I was massively underdrinking water. Genuinely changed my afternoons.', avatar: '✨' },
  { name: 'Lila, 19', quote: 'Love that it doesn\'t shame me. Other wellness apps feel like punishment — this one feels like a friend.', avatar: '💖' },
]

export default function Pro({ onNavigate }) {
  const { isPro, togglePro } = usePro()

  return (
    <div className="page-section">
      {/* Hero */}
      <div className="relative text-center py-12 px-4 mb-10 overflow-hidden rounded-4xl bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50 border border-amber-200/50">
        {/* Blobs */}
        <div className="hero-bg-blob bg-amber-200/40 w-64 h-64 -top-20 -left-20 animate-float-slow" />
        <div className="hero-bg-blob bg-pink-200/40 w-72 h-72 -bottom-24 -right-24 animate-float-reverse" />
        <div className="hero-bg-blob bg-purple-200/30 w-56 h-56 top-10 right-10 animate-float" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur border border-amber-200 mb-6 animate-pop-in">
            <span className="animate-sparkle">✨</span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Quill Pro</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-800 leading-tight mb-4 animate-fade-up">
            Self-care that{' '}
            <span className="text-gradient-pro">grows with you</span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 max-w-lg mx-auto mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Deeper guides, personalized plans, premium visuals — built for people who want wellness that lasts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: '200ms' }}>
            {isPro ? (
              <>
                <div className="px-6 py-3 rounded-2xl bg-white text-amber-700 font-semibold text-sm border-2 border-amber-300 shadow-soft">
                  ✨ Pro is active
                </div>
                <button
                  onClick={togglePro}
                  className="px-6 py-3 rounded-2xl bg-white border border-neutral-200 text-neutral-600 font-medium text-sm hover:bg-neutral-50 transition-colors"
                >
                  Switch back to Free
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={togglePro}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 text-white font-semibold text-sm shadow-soft-lg hover:shadow-soft-hover transition-all duration-200 hover:-translate-y-0.5"
                >
                  Try Pro free — no signup ✨
                </button>
                <button
                  onClick={() => onNavigate?.('home')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white border border-neutral-200 text-neutral-600 font-medium text-sm hover:bg-neutral-50 transition-colors"
                >
                  Stay on Free
                </button>
              </>
            )}
          </div>

          <p className="text-xs text-neutral-400 mt-4">
            Prototype mockup — toggle anytime, no billing.
          </p>
        </div>
      </div>

      {/* Pricing card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {/* Free */}
        <div className="card-solid p-6 sm:p-8 animate-fade-up">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Free</p>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-4xl font-bold text-neutral-800">£0</span>
            <span className="text-sm text-neutral-400">/ forever</span>
          </div>
          <p className="text-sm text-neutral-500 mb-5 leading-relaxed">
            Everything you need to start a gentle wellness habit.
          </p>
          <ul className="space-y-2.5">
            {['Body map (all 13 regions)', 'Core sport routines', 'Daily skincare basics', '3 saved favorites', '5 tips per category', 'Diet & pH guide'].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pro */}
        <div className="pro-card p-6 sm:p-8 rounded-3xl animate-fade-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Pro</p>
            <span className="pro-badge">Best value</span>
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-4xl font-bold text-neutral-800">£4.99</span>
            <span className="text-sm text-neutral-400">/ month</span>
          </div>
          <p className="text-xs text-neutral-400 mb-4 line-through">Or £39/year — save 35%</p>
          <p className="text-sm text-neutral-500 mb-5 leading-relaxed">
            Everything in Free, plus the depth and personalization that builds long-term habits.
          </p>
          <ul className="space-y-2.5">
            {['Unlimited favorites + collections', 'All 60+ wellness tips', 'Ingredient & science deep-dives', '3-week progression plans', 'Guided breathing exercises', '7-day meal plan templates', 'Premium animated UI'].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                <span className="text-amber-500 mt-0.5">✨</span>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Feature comparison */}
      <div className="mb-12 animate-fade-up">
        <h2 className="section-heading">What's different in Pro?</h2>
        <p className="section-sub">Side-by-side, so you know exactly what you're getting.</p>

        <div className="card-solid overflow-hidden">
          <div className="hidden sm:grid sm:grid-cols-[1.5fr_1fr_1fr] gap-4 px-6 py-4 bg-blush/20 border-b border-blush/30 text-xs font-bold uppercase tracking-wider text-neutral-500">
            <div>Feature</div>
            <div className="text-center">Free</div>
            <div className="text-center">Pro</div>
          </div>
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`grid grid-cols-[2fr_1fr_1fr] sm:grid-cols-[1.5fr_1fr_1fr] gap-3 sm:gap-4 px-4 sm:px-6 py-4 border-b border-neutral-100 last:border-b-0 text-sm items-center ${
                f.proOnly ? 'bg-amber-50/30' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{f.icon}</span>
                <span className="font-medium text-neutral-800">{f.title}</span>
              </div>
              <div className="text-center text-neutral-400 text-xs sm:text-sm">{f.free}</div>
              <div className="text-center text-amber-700 font-semibold text-xs sm:text-sm">{f.pro}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-12">
        <h2 className="section-heading">What people say</h2>
        <p className="section-sub">Real-world prototype reviews from early testers.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="card-solid p-6 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-3xl mb-3">{t.avatar}</div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4 italic">"{t.quote}"</p>
              <p className="text-xs font-semibold text-neutral-500">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <h2 className="section-heading">FAQ</h2>
        <div className="space-y-3">
          {[
            { q: 'Is this a real subscription?', a: 'No — Quill is a prototype. The toggle is a UX mockup so you can experience what a Pro experience would feel like.' },
            { q: 'Do you store my data?', a: 'Everything stays in your browser via localStorage. No account, no servers, no tracking.' },
            { q: 'Can I cancel anytime?', a: 'In the real product, yes — monthly with no commitment. Here, just flip the toggle in the navbar.' },
            { q: 'Is Pro content medically reviewed?', a: 'All content is general wellness guidance, evidence-informed but not medical advice. Always speak to a professional for specific concerns.' },
          ].map((item) => (
            <details key={item.q} className="group card-solid p-5 cursor-pointer">
              <summary className="font-semibold text-neutral-800 text-sm flex items-center justify-between list-none">
                {item.q}
                <span className="text-neutral-400 group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-blush/40 via-lavender/40 to-amber-100/40 border border-blush/50">
        <h3 className="text-2xl font-bold text-neutral-800 mb-3">
          Ready to feel the difference?
        </h3>
        <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6 leading-relaxed">
          Try Pro for a session — no signup, no card. Toggle back any time.
        </p>
        {!isPro && (
          <button
            onClick={togglePro}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 text-white font-semibold text-sm shadow-soft-lg hover:shadow-soft-hover transition-all duration-200 hover:-translate-y-0.5"
          >
            ✨ Enable Pro
          </button>
        )}
      </div>
    </div>
  )
}
