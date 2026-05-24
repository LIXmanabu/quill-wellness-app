import RoutineCard from '../components/RoutineCard.jsx'
import { skincareData } from '../data/skincareData.js'

export default function SkinCare() {
  const dailyRoutines = skincareData.filter((r) => ['morning', 'evening'].includes(r.id))
  const skinTypeRoutines = skincareData.filter((r) => !['morning', 'evening'].includes(r.id))

  return (
    <div className="page-section">
      {/* Page header */}
      <div className="mb-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 bg-lavender/60 text-purple-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-lavender-dark/30">
          ✨ Skin Care
        </div>
        <h1 className="section-heading">Simple routines, healthy skin</h1>
        <p className="section-sub max-w-xl">
          Beginner-safe skincare steps for every skin type. Less is more — a consistent gentle routine is better than complicated one you cannot keep up with.
        </p>
      </div>

      {/* Beginner tips strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 animate-fade-up" style={{ animationDelay: '80ms' }}>
        {[
          { icon: '🧪', title: 'Patch test first', text: 'Test new products on your inner arm before applying to your face.' },
          { icon: '⏳', title: 'One at a time', text: 'Introduce products one by one — wait 1 week before adding the next.' },
          { icon: '☀️', title: 'SPF is everything', text: 'Daily sunscreen is the single best thing you can do for skin health.' },
        ].map((tip) => (
          <div key={tip.title} className="card-solid p-5 flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{tip.icon}</span>
            <div>
              <p className="font-semibold text-neutral-800 text-sm">{tip.title}</p>
              <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{tip.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Daily routines */}
      <h2 className="text-lg font-semibold text-neutral-700 mb-4 animate-fade-up" style={{ animationDelay: '120ms' }}>
        Daily Routines
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {dailyRoutines.map((r, i) => (
          <RoutineCard key={r.id} data={r} delay={140 + i * 60} />
        ))}
      </div>

      {/* Skin type routines */}
      <h2 className="text-lg font-semibold text-neutral-700 mb-4 animate-fade-up" style={{ animationDelay: '280ms' }}>
        By Skin Type
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skinTypeRoutines.map((r, i) => (
          <RoutineCard key={r.id} data={r} delay={300 + i * 60} />
        ))}
      </div>

      {/* Disclaimer footer */}
      <div className="mt-12 p-5 rounded-3xl bg-lavender/30 border border-lavender animate-fade-up" style={{ animationDelay: '600ms' }}>
        <p className="text-sm text-neutral-600 leading-relaxed">
          <span className="font-semibold text-purple-700">Skincare reminder:</span> Everyone&apos;s skin is different.
          What works for one person may not work for another. If you experience persistent irritation, breakouts, or skin concerns,
          a dermatologist can give you personalised guidance.
        </p>
      </div>
    </div>
  )
}
