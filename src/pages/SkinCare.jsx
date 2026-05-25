import RoutineCard from '../components/RoutineCard.jsx'
import { skincareData } from '../data/skincareData.js'
import { usePro } from '../context/ProContext.jsx'
import { useUser } from '../context/UserContext.jsx'

const ingredients = [
  { name: 'Niacinamide', icon: '✨', good: 'Redness, large pores, oil control', strength: '2–5%', notes: 'Plays well with everything. Start with 5% am or pm.' },
  { name: 'Hyaluronic acid', icon: '💧', good: 'Hydration, plumping', strength: 'Any %', notes: 'Apply to damp skin, seal with moisturizer.' },
  { name: 'Retinoids', icon: '🌙', good: 'Acne, fine lines, texture', strength: 'Start 0.025%', notes: 'PM only. Build up slowly. Always SPF next day.' },
  { name: 'Vitamin C', icon: '🍊', good: 'Brightness, dullness, sun damage', strength: '10–20% L-ascorbic', notes: 'AM only, before SPF. Store dark & cool.' },
  { name: 'Salicylic acid', icon: '🌊', good: 'Blackheads, congested pores', strength: '0.5–2%', notes: 'Oil-soluble — gets into pores. 2–3x/week max for beginners.' },
  { name: 'Ceramides', icon: '🛡️', good: 'Barrier repair, sensitive skin', strength: 'Any', notes: 'Pair with retinoids/acids to rebuild the barrier.' },
]

const weeklyPlan = [
  { day: 'Mon', am: 'Cleanse → Vitamin C → SPF', pm: 'Cleanse → Moisturize' },
  { day: 'Tue', am: 'Cleanse → Niacinamide → SPF', pm: 'Cleanse → Retinoid (low) → Moisturize' },
  { day: 'Wed', am: 'Cleanse → SPF', pm: 'Cleanse → Hydrating mask → Moisturize' },
  { day: 'Thu', am: 'Cleanse → Vitamin C → SPF', pm: 'Cleanse → Moisturize' },
  { day: 'Fri', am: 'Cleanse → Niacinamide → SPF', pm: 'Cleanse → Retinoid (low) → Moisturize' },
  { day: 'Sat', am: 'Cleanse → SPF', pm: 'Cleanse → BHA (salicylic) → Moisturize' },
  { day: 'Sun', am: 'Cleanse → SPF', pm: 'Cleanse → Moisturize only (rest day)' },
]

export default function SkinCare({ onNavigate }) {
  const { isPro } = usePro()
  const { profile } = useUser()
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

      {/* Pro: Ingredient deep-dive + weekly plan */}
      {isPro ? (
        <>
          <section className="mt-12 animate-fade-up">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-semibold text-neutral-800">Ingredient deep-dive</h2>
              <span className="pro-badge">Pro</span>
            </div>
            <p className="text-sm text-neutral-500 mb-6">The actives that actually do something — what they target, how to use them safely.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ingredients.map((ing, i) => (
                <div key={ing.name} className="pro-card p-5 rounded-3xl animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{ing.icon}</span>
                    <h3 className="font-bold text-neutral-800 text-base">{ing.name}</h3>
                  </div>
                  <p className="text-xs text-neutral-400 uppercase tracking-wider font-bold mb-1">Good for</p>
                  <p className="text-sm text-neutral-600 mb-3 leading-relaxed">{ing.good}</p>
                  <p className="text-xs text-amber-700 font-semibold mb-2">{ing.strength}</p>
                  <p className="text-xs text-neutral-500 leading-relaxed italic">{ing.notes}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 animate-fade-up">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-semibold text-neutral-800">Your weekly skincare plan</h2>
              <span className="pro-badge">Pro</span>
            </div>
            <p className="text-sm text-neutral-500 mb-6">
              A balanced 7-day rotation that uses active ingredients without overdoing it.
              {profile.skinType && profile.skinType !== 'unsure' && (
                <> Tuned for <span className="font-semibold text-neutral-700">{profile.skinType}</span> skin.</>
              )}
            </p>
            <div className="pro-card rounded-3xl overflow-hidden">
              <div className="hidden md:grid md:grid-cols-[80px_1fr_1fr] gap-4 px-5 py-3 bg-amber-50/50 text-xs font-bold uppercase tracking-wider text-amber-800 border-b border-amber-100">
                <div>Day</div>
                <div>☀️ Morning</div>
                <div>🌙 Evening</div>
              </div>
              {weeklyPlan.map((d) => (
                <div key={d.day} className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-2 md:gap-4 px-5 py-4 border-b border-neutral-100 last:border-b-0 text-sm">
                  <div className="font-bold text-neutral-700">{d.day}</div>
                  <div className="text-neutral-600">{d.am}</div>
                  <div className="text-neutral-600">{d.pm}</div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-pink-50 border border-amber-200/60 animate-fade-up">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🧪</div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Pro feature</p>
              <h3 className="font-bold text-neutral-800 mb-1">Ingredient deep-dives + weekly plan</h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                Niacinamide, retinoids, vitamin C, BHA — what they target, when to use them, and how to layer them without irritation.
                Plus a 7-day rotation tailored to your skin type.
              </p>
              <button onClick={() => onNavigate?.('pro')} className="text-xs font-semibold text-amber-700 hover:underline">
                Unlock with Pro →
              </button>
            </div>
          </div>
        </section>
      )}

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
