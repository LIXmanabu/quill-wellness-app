import { useEffect } from 'react'

const difficultyConfig = {
  Beginner: { bg: 'bg-sage', text: 'text-green-800', dot: '🟢' },
  Intermediate: { bg: 'bg-peach', text: 'text-orange-800', dot: '🟡' },
  Advanced: { bg: 'bg-blush', text: 'text-pink-800', dot: '🔴' },
  'All Levels': { bg: 'bg-lavender', text: 'text-purple-800', dot: '💜' },
}

export default function InfoModal({ data, onClose }) {
  // Close on Escape key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const diff = difficultyConfig[data.difficulty] || difficultyConfig['All Levels']

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/30 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full sm:max-w-lg bg-white rounded-4xl shadow-soft-lg animate-fade-up max-h-[90vh] overflow-y-auto panel-scroll">
        {/* Modal header */}
        <div className="sticky top-0 bg-gradient-to-r from-blush/50 to-lavender/40 px-6 py-5 rounded-t-4xl flex items-center justify-between border-b border-blush/30">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{data.icon}</span>
            <div>
              <h2 className="font-semibold text-neutral-800 text-lg">{data.title} Routine</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`badge ${diff.bg} ${diff.text} text-xs`}>
                  {data.difficulty}
                </span>
                <span className="text-xs text-neutral-500">⏱ {data.duration}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/80 transition-colors text-neutral-500 text-lg"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal body */}
        <div className="px-6 py-5 space-y-5">
          {/* Description */}
          <p className="text-sm text-neutral-600 leading-relaxed">{data.description}</p>

          {/* Warm-up */}
          {data.warmup && (
            <div className="p-4 rounded-2xl bg-sage/40 border border-green-200">
              <p className="text-xs font-semibold text-green-800 uppercase tracking-wide mb-1">Warm-up</p>
              <p className="text-sm text-neutral-700">{data.warmup}</p>
            </div>
          )}

          {/* Exercises */}
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Exercises</p>
            <ol className="space-y-4">
              {data.exercises.map((ex, i) => (
                <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-blush/20 border border-blush/40">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blush flex items-center justify-center text-sm font-semibold text-pink-700">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-800 text-sm">{ex.name}</p>
                    <p className="text-xs text-pink-600 font-medium mt-0.5">{ex.reps}</p>
                    <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">💡 {ex.tip}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Cool-down */}
          {data.cooldown && (
            <div className="p-4 rounded-2xl bg-lavender/40 border border-purple-200">
              <p className="text-xs font-semibold text-purple-800 uppercase tracking-wide mb-1">Cool-down</p>
              <p className="text-sm text-neutral-700">{data.cooldown}</p>
            </div>
          )}

          {/* Safety note */}
          {data.safetyNote && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-2">
                <span className="text-base">⚠️</span>
                <p className="text-xs text-amber-800 leading-relaxed">{data.safetyNote}</p>
              </div>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-blush hover:bg-blush-dark text-pink-700 font-medium text-sm transition-all duration-200 hover:shadow-soft"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
