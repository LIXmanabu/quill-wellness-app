import { useState, useMemo } from 'react'
import { dailyTips, categoryMeta } from '../data/dailyTips.js'
import FavoriteButton from '../components/FavoriteButton.jsx'
import { usePro } from '../context/ProContext.jsx'
import SplitText from '../components/interactive/SplitText.jsx'
import Reveal from '../components/interactive/Reveal.jsx'
import Marquee from '../components/interactive/Marquee.jsx'
import SpotlightCard from '../components/interactive/SpotlightCard.jsx'
import MagneticButton from '../components/interactive/MagneticButton.jsx'

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

  return (
    <div className="bg-cream">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12">
        <div className="border-b border-ink/15 pb-3 mb-10 flex items-center justify-between">
          <span className="editorial-label">Chapter 06 · Almanac</span>
          <span className="editorial-label">{isPro ? `${dailyTips.length} tips` : `${visibleTips.length} of ${dailyTips.length}`}</span>
        </div>
        <h1 className="font-display text-[14vw] sm:text-[10vw] lg:text-[8vw] text-ink leading-[0.9] tracking-tight">
          <SplitText byChar stagger={28}>The daily</SplitText>
          <br />
          <span className="display-italic text-clay"><SplitText byChar stagger={28} startDelay={500}>almanac.</SplitText></span>
        </h1>
        <Reveal delay={1200} className="mt-8 max-w-md">
          <p className="text-lg text-ink-soft leading-relaxed">
            Bite-sized, evidence-informed habits across hydration, sleep, movement, mood, skin care, nutrition, and mindset.
          </p>
        </Reveal>
      </section>

      {/* Marquee */}
      <section className="bg-ink text-cream py-4 border-y border-ink overflow-hidden">
        <Marquee
          items={Object.values(categoryMeta).map((c) => c.label)}
          separator="✺"
          speed="slow"
          itemClassName="font-display text-2xl sm:text-3xl"
          separatorClassName="text-clay text-xl"
        />
      </section>

      {/* Category filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal>
          <p className="editorial-label mb-4">Filter by category</p>
          <div className="flex flex-wrap gap-2 mb-12 border-b border-ink/10 pb-6">
            {categories.map((c) => {
              const meta = categoryMeta[c]
              const active = filter === c
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-4 py-2 text-xs font-medium tracking-wide border transition-all ${
                    active
                      ? 'bg-ink text-cream border-ink'
                      : 'bg-cream-light text-ink-soft border-ink/20 hover:border-ink hover:text-ink'
                  }`}
                >
                  {c === 'all' ? 'All tips' : meta.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Tip grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
          {visibleTips.map((tip, i) => {
            const meta = categoryMeta[tip.category]
            return (
              <Reveal key={tip.id} delay={i * 20} className="h-full">
                <SpotlightCard className="bg-cream-light p-6 h-full relative group hover:bg-bone transition-colors">
                  <div className="absolute top-4 right-4">
                    <FavoriteButton id={`tip:${tip.id}`} label={tip.title} size="sm" />
                  </div>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="editorial-num text-2xl text-clay">{String(i + 1).padStart(3, '0')}</span>
                    <span className="editorial-label">{meta.label}</span>
                  </div>
                  <h3 className="font-display text-2xl text-ink leading-tight pr-6">{tip.title}</h3>
                  <p className="text-sm text-ink-soft mt-3 leading-relaxed">{tip.body}</p>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>

        {/* Pro upsell */}
        {!isPro && (
          <Reveal>
            <SpotlightCard className="mt-12 pro-card p-8 sm:p-12 text-center">
              <span className="editorial-label text-gold-dark">Pro Edition</span>
              <h3 className="font-display text-4xl sm:text-5xl text-ink mt-3 leading-tight">
                {dailyTips.length - visibleTips.length}+ more <span className="display-italic text-clay">tips await.</span>
              </h3>
              <p className="text-sm text-ink-soft max-w-md mx-auto mt-4 mb-6 leading-relaxed">
                Unlock the full library, all categories, and unlimited favorites with Quill Pro.
              </p>
              <MagneticButton onClick={() => onNavigate?.('pro')} className="btn-ink">
                See Pro features <span className="display-italic">→</span>
              </MagneticButton>
            </SpotlightCard>
          </Reveal>
        )}
      </section>
    </div>
  )
}
