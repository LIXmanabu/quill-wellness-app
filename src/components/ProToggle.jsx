import { usePro } from '../context/ProContext.jsx'

export default function ProToggle({ compact = false }) {
  const { isPro, togglePro } = usePro()

  return (
    <button
      onClick={togglePro}
      aria-pressed={isPro}
      aria-label={isPro ? 'Switch to Free mode' : 'Switch to Pro mode'}
      className={`group relative inline-flex items-center gap-2 rounded-full border transition-all duration-300 select-none ${
        isPro
          ? 'border-amber-300 bg-gradient-to-r from-amber-100 via-pink-100 to-purple-100 shadow-[0_0_18px_rgba(252,211,77,0.45)]'
          : 'border-blush/60 bg-white hover:bg-blush/20'
      } ${compact ? 'p-1 pr-3' : 'p-1.5 pr-3.5'}`}
    >
      {/* Sliding pill */}
      <span className="relative flex items-center bg-white/70 backdrop-blur rounded-full p-0.5 h-7 w-[88px]">
        <span
          className={`absolute top-0.5 bottom-0.5 w-[42px] rounded-full transition-all duration-300 ease-out ${
            isPro
              ? 'left-[44px] bg-gradient-to-r from-amber-300 to-pink-300 shadow-sm'
              : 'left-0.5 bg-pink-200'
          }`}
        />
        <span
          className={`relative z-10 w-1/2 text-center text-[10px] font-bold uppercase tracking-wider transition-colors ${
            !isPro ? 'text-pink-700' : 'text-neutral-400'
          }`}
        >
          Free
        </span>
        <span
          className={`relative z-10 w-1/2 text-center text-[10px] font-bold uppercase tracking-wider transition-colors ${
            isPro ? 'text-amber-800' : 'text-neutral-400'
          }`}
        >
          Pro
        </span>
      </span>

      {/* Crown / sparkle indicator */}
      <span
        className={`text-base transition-all duration-300 ${
          isPro ? 'opacity-100 scale-100 animate-sparkle' : 'opacity-40 scale-90'
        }`}
        aria-hidden
      >
        ✨
      </span>
    </button>
  )
}
