import { useState } from 'react'
import { useUser } from '../context/UserContext.jsx'
import { usePro } from '../context/ProContext.jsx'

const FREE_LIMIT = 3

export default function FavoriteButton({ id, label, size = 'md', onUpsell }) {
  const { isFavorite, toggleFavorite, profile } = useUser()
  const { isPro } = usePro()
  const [showHint, setShowHint] = useState(false)
  const fav = isFavorite(id)

  const reachedLimit = !isPro && !fav && profile.favorites.length >= FREE_LIMIT

  function handle(e) {
    e.stopPropagation()
    e.preventDefault()
    if (reachedLimit) {
      setShowHint(true)
      onUpsell?.()
      setTimeout(() => setShowHint(false), 2400)
      return
    }
    toggleFavorite(id)
  }

  const sizeClasses = size === 'sm' ? 'w-8 h-8 text-base' : 'w-10 h-10 text-lg'

  return (
    <div className="relative inline-flex">
      <button
        onClick={handle}
        aria-label={fav ? `Remove ${label || 'item'} from favorites` : `Save ${label || 'item'}`}
        aria-pressed={fav}
        className={`${sizeClasses} rounded-full flex items-center justify-center transition-all duration-200 ${
          fav
            ? 'bg-pink-100 text-pink-600 shadow-soft scale-100'
            : reachedLimit
              ? 'bg-neutral-100 text-neutral-400 hover:bg-amber-50 hover:text-amber-600'
              : 'bg-white/80 text-neutral-400 hover:bg-pink-50 hover:text-pink-500 hover:scale-110'
        }`}
      >
        <span className={fav ? 'animate-pop-in' : ''}>{fav ? '💖' : '🤍'}</span>
      </button>

      {showHint && (
        <div className="absolute top-full right-0 mt-2 z-20 w-56 p-3 rounded-2xl bg-white shadow-soft-lg border border-amber-200 animate-pop-in">
          <p className="text-xs font-semibold text-amber-700 mb-1">
            ✨ Free plan: {FREE_LIMIT} favorites max
          </p>
          <p className="text-xs text-neutral-500 leading-snug">
            Upgrade to Pro for unlimited saved tips, routines, and plans.
          </p>
        </div>
      )}
    </div>
  )
}
