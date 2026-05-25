import ExerciseCard from '../components/ExerciseCard.jsx'
import { sportData } from '../data/sportData.js'
import { usePro } from '../context/ProContext.jsx'

const proPlans = [
  { week: 'Week 1', focus: 'Form & rhythm', notes: 'Master technique at lower volume — 3 sessions, 20 min each. Rest days are non-negotiable.' },
  { week: 'Week 2', focus: 'Progressive overload', notes: 'Add 2 reps per set or 5 seconds to holds. Sleep 8h+. Track perceived effort 1–10.' },
  { week: 'Week 3', focus: 'Peak & deload', notes: 'Push harder days 1–4, then ease off day 5–7. Recovery is when you actually adapt.' },
]

export default function Sport({ onNavigate }) {
  const { isPro } = usePro()

  return (
    <div className="page-section">
      {/* Page header */}
      <div className="mb-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 bg-peach/60 text-orange-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-peach-dark/30">
          ⚡ Sport & Fitness
        </div>
        <h1 className="section-heading">Move your body, love your body</h1>
        <p className="section-sub max-w-xl">
          Beginner-safe routines built around common fitness goals. No gym needed — just you, your body, and a little space.
        </p>
      </div>

      {/* Exercise cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sportData.map((item, i) => (
          <ExerciseCard key={item.id} data={item} delay={i * 60} />
        ))}
      </div>

      {/* Pro section: 3-week progression */}
      {isPro ? (
        <section className="mt-12 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold text-neutral-800">3-week progression plan</h2>
            <span className="pro-badge">Pro</span>
          </div>
          <p className="text-sm text-neutral-500 mb-6">A structured framework for any of the routines above. Repeat the cycle every 3 weeks.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {proPlans.map((p, i) => (
              <div key={p.week} className="pro-card p-6 rounded-3xl animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1">{p.week}</p>
                <h3 className="font-bold text-neutral-800 text-base mb-2">{p.focus}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{p.notes}</p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-pink-50 border border-amber-200/60 animate-fade-up">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📅</div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Pro feature</p>
              <h3 className="font-bold text-neutral-800 mb-1">3-week progression plans</h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                Structured cycles that build strength week by week — instead of guessing what to do next session.
              </p>
              <button onClick={() => onNavigate?.('pro')} className="text-xs font-semibold text-amber-700 hover:underline">
                Unlock with Pro →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Safety footer */}
      <div className="mt-12 p-5 rounded-3xl bg-amber-50 border border-amber-200 animate-fade-up" style={{ animationDelay: '500ms' }}>
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0">⚠️</span>
          <div>
            <p className="font-semibold text-amber-800 text-sm mb-1">Fitness safety reminder</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              Always warm up before and cool down after exercise. Listen to your body — rest when you need to.
              Avoid overtraining: muscle soreness is normal, but sharp pain is not. Rest days are part of your progress, not a break from it.
              If you are new to exercise or have any health concerns, check with a doctor before starting a new routine.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
