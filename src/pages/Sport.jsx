import ExerciseCard from '../components/ExerciseCard.jsx'
import { sportData } from '../data/sportData.js'

export default function Sport() {
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
