import { usePro } from '../context/ProContext.jsx'

export default function ProToggle() {
  const { isPro, togglePro } = usePro()

  return (
    <button
      onClick={togglePro}
      aria-pressed={isPro}
      aria-label={isPro ? 'Switch to Free mode' : 'Switch to Pro mode'}
      className={`group relative inline-flex items-center select-none border transition-all duration-300 ${
        isPro
          ? 'bg-ink text-cream border-ink'
          : 'bg-cream-light text-ink border-ink/20 hover:border-ink'
      }`}
    >
      {/* Sliding indicator */}
      <span className="relative flex items-center h-8 w-[90px]">
        <span
          className={`absolute top-0 bottom-0 w-[45px] transition-all duration-300 ease-out ${
            isPro ? 'left-[45px] bg-gold' : 'left-0 bg-ink/10'
          }`}
        />
        <span className={`relative z-10 w-1/2 text-center text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
          !isPro ? 'text-ink' : 'text-cream/40'
        }`}>
          Free
        </span>
        <span className={`relative z-10 w-1/2 text-center text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
          isPro ? 'text-ink' : 'text-ink-softer'
        }`}>
          Pro
        </span>
      </span>
    </button>
  )
}
