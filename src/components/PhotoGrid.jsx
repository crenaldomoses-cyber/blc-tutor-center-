import { useState } from 'react'
import LazyImage from './LazyImage'
import Lightbox from './Lightbox'

// Masonry photo grid; clicking a photo opens it in the lightbox.
export default function PhotoGrid({ photos, className = 'columns-2 md:columns-3 lg:columns-4' }) {
  const [open, setOpen] = useState(null)

  return (
    <>
      <div className={`${className} gap-4 [&>*]:mb-4`}>
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setOpen(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-blc shadow-blcsoft bg-blc-bluepale focus:outline-none focus-visible:ring-2 focus-visible:ring-blc-red focus-visible:ring-offset-2"
            aria-label={`View photo: ${p.caption}`}
          >
            <LazyImage
              src={p.thumb}
              alt={p.caption}
              width={p.w}
              height={p.h}
              className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blc-navydeep/85 to-transparent p-3 pt-8 text-left text-white text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
              {p.caption}
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </>
  )
}
