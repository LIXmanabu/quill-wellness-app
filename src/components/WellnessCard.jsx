import { useState } from 'react'

export default function WellnessCard({ data, delay = 0 }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`card-solid p-6 transition-all duration-300 hover:shadow-soft-hover hover:-translate-y-1 animate-fade-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${data.color} flex items-center justify-center text-xl flex-shrink-0`}>
            {data.icon}
          </div>
          <h3 className="font-semibold text-neutral-800 text-base leading-tight">{data.title}</h3>
        </div>
      </div>

      {/* Short description */}
      <p className="text-sm text-neutral-500 mb-4 leading-relaxed">{data.shortDescription}</p>

      {/* Suggestions — collapsed on mobile, expandable */}
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[500px]' : 'max-h-0 md:max-h-[500px]'}`}>
        <ul className="space-y-2 mb-4">
          {data.suggestions.map((suggestion, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blush-dark" />
              <p className="text-sm text-neutral-600 leading-relaxed">{suggestion}</p>
            </li>
          ))}
        </ul>

        {/* Disclaimer */}
        <p className="text-xs text-neutral-400 italic border-t border-blush/30 pt-3 leading-relaxed">
          {data.disclaimer}
        </p>
      </div>

      {/* Mobile expand toggle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="md:hidden mt-2 text-xs font-medium text-pink-500 hover:text-pink-700 transition-colors flex items-center gap-1"
      >
        {expanded ? 'Show less ↑' : 'Show tips ↓'}
      </button>
    </div>
  )
}
