import { useState, useMemo } from 'react'
import { dailyTips, categoryMeta } from '../data/dailyTips.js'
import FavoriteButton from '../components/FavoriteButton.jsx'
import { usePro } from '../context/ProContext.jsx'

const FREE_PER_CATEGORY = 5

export default function TipLibrary({ onNavigate }) {
  const { isPro } = usePro()
  const [filter, setFilter] = useState('all')

  const categories = ['all', ...Object.keys(categoryMeta)]

  const visibleTips = useMemo(() => {
    let tips = filter === 'all' ? dailyTips : dailyTips.filter((t) => t.category === filter)
    if (!isPro) {
      const grouped = {}
      tips.forEach((t) => {
        grouped[t.category] = grouped[t.category] || []
        if (grouped[t.category].length < FREE_PER_CATEGORY) grouped[t.category].push(t)
      })
      tips = Object.values(grouped).flat()
    }
    return tips
  }, [filter, isPro])

  const hiddenCount = dailyTips.length - (isPro ? dailyTips.length : visibleTips.length + (filter !== 'all' ? 0 : 0))

  return (
    <div className="page-section">
      <div className="mb-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 bg-blush/60 text-pink-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-blush-dark/30">
          💡 Tip Library
        </div>
        <h1 className="section-heading">
          {isPro ? `All ${dailyTips.length} wellness tips` : `${visibleTips.length} of ${dailyTips.length} tips`}
        </h1>
        <p className="section-sub max-w-xl">
          Bite-sized, evidence-informed habits across hydration, sleep, movement, mood, skin care, nutrition, and mindset.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8 animate-fade-up" style={{ animationDelay: '80ms' }}>
        {categories.map((c) => {
          const meta = categoryMeta[c]
          const active = filter === c
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                active
                  ? c === 'all'
                    ? 'bg-pink-500 text-white border-pink-500 shadow-soft'
                    : `${meta.accent} ${meta.text} border-current shadow-soft`
                  : 'bg-white text-neutral-500 border-neutral-200 hover:border-blush'
              }`}
            >
              {c === 'all' ? '✨ All' : `${meta.label}`}
            </button>
          )
        })}
      </div>

      {/* Tip grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleTips.map((tip, i) => {
          const meta = categoryMeta[tip.category]
          return (
            <div
              key={tip.id}
              className={`relative rounded-3xl p-5 bg-gradient-to-br ${meta.color} border border-white/80 shadow-soft hover:shadow-soft-hover hover:-translate-y-0.5 transition-all duration-300 animate-fade-up`}
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="absolute top-3 right-3">
                <FavoriteButton id={`tip:${tip.id}`} label={tip.title} size="sm" />
              </div>
              <div className="text-3xl mb-2">{tip.icon}</div>
              <span className={`badge ${meta.accent} ${meta.text} mb-2`}>{meta.label}</span>
              <h3 className="font-semibold text-neutral-800 text-sm mt-2 mb-1.5 leading-tight pr-8">{tip.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{tip.body}</p>
            </div>
          )
        })}
      </div>

      {/* Pro upsell */}
      {!isPro && (
        <div className="mt-12 pro-card p-6 sm:p-8 rounded-3xl text-center animate-fade-up">
          <div className="text-4xl mb-3 animate-sparkle inline-block">✨</div>
          <h3 className="text-xl font-bold text-neutral-800 mb-2">
            Unlock the full library with <span className="text-gradient-pro">Quill Pro</span>
          </h3>
          <p className="text-sm text-neutral-500 max-w-md mx-auto mb-5 leading-relaxed">
            {dailyTips.length - visibleTips.length}+ more tips, full category access, and unlimited favorites.
          </p>
          <button
            onClick={() => onNavigate?.('pro')}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 text-white font-semibold text-sm shadow-soft-lg hover:shadow-soft-hover transition-all duration-200 hover:-translate-y-0.5"
          >
            See Pro features →
          </button>
        </div>
      )}
    </div>
  )
}
