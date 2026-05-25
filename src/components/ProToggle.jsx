import { usePro } from '../context/ProContext.jsx'

const tiers = ['free', 'pro', 'max']
const labels = { free: 'Free', pro: 'Pro', max: 'Max' }

export default function ProToggle() {
  const { tier, setTier } = usePro()
  const index = tiers.indexOf(tier)

  return (
    <div
      role="radiogroup"
      aria-label="Plan tier"
      className={`relative inline-flex items-center select-none border transition-all duration-300 ${
        tier === 'max'
          ? 'bg-cream-light border-gold-dark'
          : tier === 'pro'
            ? 'bg-ink text-cream border-ink'
            : 'bg-cream-light text-ink border-ink/20'
      }`}
    >
      <span className="relative flex items-center h-8 w-[135px]">
        {/* Sliding indicator */}
        <span
          className={`absolute top-0 bottom-0 w-[45px] transition-all duration-300 ease-out ${
            tier === 'max' ? 'bg-gold' : tier === 'pro' ? 'bg-gold' : 'bg-ink/10'
          }`}
          style={{ left: `${index * 45}px` }}
        />
        {tiers.map((t) => {
          const active = tier === t
          return (
            <button
              key={t}
              role="radio"
              aria-checked={active}
              onClick={() => setTier(t)}
              className={`relative z-10 w-[45px] h-8 text-center text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                active
                  ? t === 'pro' || t === 'max' ? 'text-ink' : 'text-ink'
                  : tier === 'pro' ? 'text-cream/40' : 'text-ink-softer'
              }`}
            >
              {labels[t]}
            </button>
          )
        })}
      </span>
    </div>
  )
}
