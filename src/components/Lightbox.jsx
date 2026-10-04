import { useCallback, useEffect, useRef, useState } from 'react'

// Full-screen photo viewer. Keyboard (← → Esc), swipe and click-outside to close.
export default function Lightbox({ photos, index, onClose, onIndex }) {
  const photo = photos[index]
  const count = photos.length
  const closeRef = useRef(null)
  const touchX = useRef(null)
  const [loadedSrc, setLoadedSrc] = useState(null)

  const go = useCallback(
    (step) => onIndex((index + step + count) % count),
    [index, count, onIndex],
  )

  // Keyboard controls, scroll lock and focus restore.
  useEffect(() => {
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  // Preload neighbours so next/prev feel instant.
  useEffect(() => {
    ;[1, -1].forEach((s) => {
      const img = new Image()
      img.src = photos[(index + s + count) % count].src
    })
  }, [index, count, photos])

  if (!photo) return null
  const loaded = loadedSrc === photo.src

  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  const navBtn =
    'absolute top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/25 text-white text-2xl flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[60] bg-blc-navydeep/95 backdrop-blur-sm flex flex-col animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between px-5 py-4 text-white/80 text-sm">
        <span className="font-semibold tabular-nums">
          {index + 1} / {count}
        </span>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close photo viewer"
          className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/25 text-white text-2xl flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          ×
        </button>
      </div>

      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-20"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Thumbnail shows instantly underneath while the full image loads. */}
        <img
          key={photo.src}
          src={loaded ? photo.src : photo.thumb}
          alt={photo.caption}
          className={`max-h-full max-w-full object-contain rounded-blc shadow-blc transition-[filter] duration-300 ${
            loaded ? '' : 'blur-sm'
          }`}
        />
        <img src={photo.src} alt="" className="hidden" onLoad={() => setLoadedSrc(photo.src)} />

        {count > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous photo" className={`${navBtn} left-3 hidden sm:flex`}>
              ‹
            </button>
            <button onClick={() => go(1)} aria-label="Next photo" className={`${navBtn} right-3 hidden sm:flex`}>
              ›
            </button>
          </>
        )}
      </div>

      <p className="px-5 py-5 text-center text-white font-semibold" aria-live="polite">
        {photo.caption}
      </p>
    </div>
  )
}
