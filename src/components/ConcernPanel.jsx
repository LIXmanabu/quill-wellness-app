import { useState } from 'react'

export default function ConcernPanel({ region, data, onClose }) {
  const [openConcern, setOpenConcern] = useState(0)

  if (!data) return null

  const concern = data.concerns[openConcern]

  return (
    <div className="animate-slide-in-right fixed right-0 top-16 bottom-0 w-full sm:w-96 bg-white/95 backdrop-blur-md shadow-soft-lg z-40 flex flex-col border-l border-blush/40">
      {/* Panel header */}
      <div className={`flex items-center justify-between px-5 py-4 border-b border-blush/30 ${data.color || 'bg-blush/20'}`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{data.icon}</span>
          <div>
            <h2 className="font-semibold text-neutral-800 text-lg leading-tight">{data.label}</h2>
            <p className="text-xs text-neutral-500 mt-0.5">Wellness & self-care tips</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-blush/50 transition-colors text-neutral-500 hover:text-neutral-700"
          aria-label="Close panel"
        >
          ✕
        </button>
      </div>

      {/* Concern tabs */}
      {data.concerns.length > 1 && (
        <div className="px-5 py-3 flex gap-2 flex-wrap border-b border-blush/20 bg-blush/10">
          {data.concerns.map((c, i) => (
            <button
              key={i}
              onClick={() => setOpenConcern(i)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                openConcern === i
                  ? 'bg-blush-dark text-pink-800 shadow-soft'
                  : 'bg-white/70 text-neutral-600 hover:bg-blush/40'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      )}

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto panel-scroll px-5 py-5">
        <div className="animate-fade-up">
          <h3 className="font-semibold text-neutral-800 text-base mb-4">{concern.title}</h3>

          {/* Suggestions list */}
          <ul className="space-y-3">
            {concern.suggestions.map((suggestion, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blush flex items-center justify-center text-xs text-pink-700 font-medium">
                  {i + 1}
                </span>
                <p className="text-sm text-neutral-700 leading-relaxed">{suggestion}</p>
              </li>
            ))}
          </ul>

          {/* Safety note for this concern */}
          {concern.safetyNote && (
            <div className="mt-5 p-3 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-2">
                <span className="text-sm mt-0.5">⚠️</span>
                <p className="text-xs text-amber-800 leading-relaxed">{concern.safetyNote}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="px-5 py-4 border-t border-blush/30 bg-blush/10">
        <p className="text-xs text-neutral-500 italic leading-relaxed">
          {data.generalDisclaimer || 'These are general wellness suggestions, not medical advice. If symptoms are severe, persistent, or worsening, please seek medical advice.'}
        </p>
      </div>
    </div>
  )
}
