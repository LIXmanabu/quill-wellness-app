import WellnessCard from '../components/WellnessCard.jsx'
import { wellnessData } from '../data/wellnessData.js'

export default function Wellness() {
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
