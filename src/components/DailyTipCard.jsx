import { getTipOfDay, categoryMeta } from '../data/dailyTips.js'
import FavoriteButton from './FavoriteButton.jsx'

export default function DailyTipCard({ onNavigateLibrary }) {
  const tip = getTipOfDay()
  const meta = categoryMeta[tip.category]
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })

  return (
    <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br ${meta.color} border border-white/80 shadow-soft-lg`}>
      {/* Decorative sparkle */}
      <span className="absolute top-3 right-3 text-2xl opacity-50 animate-sparkle" aria-hidden>✨</span>

      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className={`text-[11px] font-bold uppercase tracking-wider ${meta.text} mb-1`}>
            Tip of the day · {today}
          </p>
          <span className={`badge ${meta.accent} ${meta.text}`}>
            {meta.label}
          </span>
        </div>
        <FavoriteButton id={`tip:${tip.id}`} label={tip.title} size="sm" />
      </div>

      <div className="flex items-start gap-4">
        <div className="text-5xl flex-shrink-0 animate-float">{tip.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-neutral-800 mb-2 leading-tight">{tip.title}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{tip.body}</p>
        </div>
      </div>

      {onNavigateLibrary && (
        <button
          onClick={onNavigateLibrary}
          className={`mt-5 inline-flex items-center gap-1.5 text-xs font-semibold ${meta.text} hover:underline`}
        >
          Browse all tips →
        </button>
      )}
    </div>
  )
}
