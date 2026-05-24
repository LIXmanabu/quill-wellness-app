import { useState } from 'react'

export default function RoutineCard({ data, delay = 0 }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="card-solid overflow-hidden transition-all duration-300 hover:shadow-soft-hover hover:-translate-y-1 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Card header */}
      <div className="bg-gradient-to-r from-blush/40 to-lavender/40 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{data.icon}</span>
          <div>
            <span className={`badge ${data.tagColor} text-xs mb-1`}>{data.tag}</span>
            <h3 className="font-semibold text-neutral-800 text-base">{data.title}</h3>
          </div>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-8 h-8 rounded-xl bg-white/70 hover:bg-white transition-colors flex items-center justify-center text-neutral-500 text-sm"
          aria-label={expanded ? 'Collapse' : 'Expand'}
        >
          {expanded ? '↑' : '↓'}
        </button>
      </div>

      {/* Short description */}
      <div className="px-6 pt-4 pb-3">
        <p className="text-sm text-neutral-500 leading-relaxed">{data.description}</p>
      </div>

      {/* Expandable steps */}
      <div className={`overflow-hidden transition-all duration-400 ${expanded ? 'max-h-[600px]' : 'max-h-0'}`}>
        <div className="px-6 pb-5">
          <ol className="space-y-4 mt-2">
            {data.steps.map((step) => (
              <li key={step.step} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blush flex items-center justify-center text-xs font-semibold text-pink-700">
                  {step.step}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-800 text-sm">{step.name}</p>
                  <p className="text-sm text-neutral-500 mt-0.5 leading-relaxed">{step.description}</p>
                  {step.productType && (
                    <span className="inline-block mt-1.5 text-xs bg-lavender/60 text-purple-700 px-2.5 py-0.5 rounded-full">
                      {step.productType}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {/* Disclaimer */}
          <p className="mt-5 text-xs text-neutral-400 italic border-t border-blush/30 pt-3 leading-relaxed">
            {data.disclaimer}
          </p>
        </div>
      </div>

      {/* View steps button (always visible when collapsed) */}
      {!expanded && (
        <div className="px-6 pb-5">
          <button
            onClick={() => setExpanded(true)}
            className="w-full py-2.5 rounded-2xl bg-blush/50 hover:bg-blush text-pink-700 text-sm font-medium transition-all duration-200 hover:shadow-soft"
          >
            View Steps →
          </button>
        </div>
      )}
    </div>
  )
}
