import { useState } from 'react'
import InfoModal from './InfoModal.jsx'

const difficultyConfig = {
  Beginner: { bg: 'bg-sage text-green-800', label: '🟢 Beginner' },
  Intermediate: { bg: 'bg-peach text-orange-800', label: '🟡 Intermediate' },
  Advanced: { bg: 'bg-blush text-pink-800', label: '🔴 Advanced' },
  'All Levels': { bg: 'bg-lavender text-purple-800', label: '💜 All Levels' },
}

export default function ExerciseCard({ data, delay = 0 }) {
  const [modalOpen, setModalOpen] = useState(false)
  const diff = difficultyConfig[data.difficulty] || difficultyConfig['All Levels']

  return (
    <>
      <div
        className="card-solid p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-soft-hover hover:-translate-y-1 animate-fade-up"
        style={{ animationDelay: `${delay}ms` }}
      >
        {/* Card top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blush to-lavender flex items-center justify-center text-2xl flex-shrink-0">
              {data.icon}
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800 text-base">{data.title}</h3>
              <span className={`badge ${diff.bg} text-xs mt-1`}>{diff.label}</span>
            </div>
          </div>
          <span className="text-xs text-neutral-400 flex-shrink-0 mt-1">⏱ {data.duration}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-500 leading-relaxed">{data.description}</p>

        {/* Exercise preview list */}
        <ul className="space-y-2">
          {data.exercises.slice(0, 3).map((ex, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blush-dark flex-shrink-0" />
              <span className="text-sm text-neutral-700 font-medium">{ex.name}</span>
              <span className="text-xs text-neutral-400 ml-auto flex-shrink-0">{ex.reps}</span>
            </li>
          ))}
        </ul>

        {/* View Routine button */}
        <button
          onClick={() => setModalOpen(true)}
          className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-blush to-lavender hover:from-blush-dark hover:to-lavender-dark text-pink-700 text-sm font-semibold transition-all duration-200 hover:shadow-soft mt-auto"
        >
          View Routine →
        </button>
      </div>

      {/* Full routine modal */}
      {modalOpen && <InfoModal data={data} onClose={() => setModalOpen(false)} />}
    </>
  )
}
