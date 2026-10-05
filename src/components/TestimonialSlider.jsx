import { useCallback, useEffect, useRef, useState } from 'react'
import { testimonials, testimonialDisclaimer } from '../data/testimonials'

const initials = (name) => name.split(' ').map((w) => w[0]).join('')

// Full testimonial in a modal dialog.
function StoryModal({ story, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-title"
      className="fixed inset-0 z-[60] bg-blc-navydeep/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full sm:max-w-2xl max-h-[90vh] flex flex-col rounded-t-blclg sm:rounded-blclg shadow-blc">
        <div className="flex items-start justify-between gap-4 p-6 sm:p-8 pb-4 border-b border-blc-navy/10">
          <div>
            <span className="eyebrow">What our parents say</span>
            <h3 id="story-title" className="mt-2 text-2xl font-extrabold text-blc-navy leading-snug">
              {story.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 h-10 w-10 rounded-full bg-blc-bluepale text-blc-navy text-2xl flex items-center justify-center hover:bg-blc-navy hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto p-6 sm:p-8 pt-5 space-y-4 text-blc-slate leading-relaxed">
          {story.body.map((para) => (
            <p key={para.slice(0, 40)} className="m-0">{para}</p>
          ))}
          <p className="m-0 pt-2 font-head text-lg font-bold text-blc-navy">
            {story.name}, <span className="text-blc-red">BLC Parent</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialSlider() {
  const track = useRef(null)
  const [active, setActive] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [pages, setPages] = useState(testimonials.length)
  const [story, setStory] = useState(null)
  const closeStory = useCallback(() => setStory(null), [])

  const step = () => {
    const el = track.current
    const card = el?.firstElementChild
    if (!card) return 0
    return card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || 0)
  }

  const onScroll = () => {
    const el = track.current
    const s = step()
    if (!el || !s) return
    // With 2–3 cards in view, only (count - perView + 1) start positions exist.
    setPages(testimonials.length - Math.round(el.clientWidth / s) + 1)
    setActive(Math.round(el.scrollLeft / s))
    setAtStart(el.scrollLeft < 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }

  useEffect(() => {
    onScroll()
    window.addEventListener('resize', onScroll)
    return () => window.removeEventListener('resize', onScroll)
  }, [])

  const scrollTo = (i) => track.current?.scrollTo({ left: i * step(), behavior: 'smooth' })
  const nudge = (dir) => track.current?.scrollBy({ left: dir * step(), behavior: 'smooth' })

  const arrow =
    'h-11 w-11 rounded-full border-2 border-blc-navy/15 text-blc-navy text-xl flex items-center justify-center transition-colors hover:bg-blc-navy hover:text-white hover:border-blc-navy disabled:opacity-30 disabled:pointer-events-none'

  return (
    <div>
      <div
        ref={track}
        onScroll={onScroll}
        aria-label="Parent testimonials"
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth scroll-px-5 sm:scroll-px-0 pb-4 -mx-5 px-5 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t, i) => (
          <article
            key={t.id}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${testimonials.length}`}
            className="snap-start shrink-0 w-[86%] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] card p-7 flex flex-col"
          >
            <span aria-hidden="true" className="font-head text-6xl leading-none text-blc-green">“</span>
            <h3 className="mt-1 text-lg font-bold text-blc-navy leading-snug">{t.title}</h3>
            <blockquote className="mt-3 m-0 flex-1 text-blc-slate leading-relaxed">
              {t.highlight}
            </blockquote>
            <div className="mt-6 pt-5 border-t border-blc-navy/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-full bg-blc-navy text-white flex items-center justify-center font-head font-bold text-sm">
                  {initials(t.name)}
                </span>
                <span className="leading-tight">
                  <span className="block font-semibold text-blc-navy">{t.name}</span>
                  <span className="block text-xs text-blc-slate">BLC Parent</span>
                </span>
              </div>
              <button
                onClick={() => setStory(t)}
                className="text-sm font-semibold text-blc-red hover:text-blc-navy transition-colors whitespace-nowrap"
              >
                Read story →
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex gap-2" role="group" aria-label="Choose testimonial">
          {testimonials.slice(0, pages).map((t, i) => (
            <button
              key={t.id}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              className={`h-2.5 rounded-full transition-all ${
                i === active ? 'w-7 bg-blc-red' : 'w-2.5 bg-blc-navy/20 hover:bg-blc-navy/40'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => nudge(-1)} disabled={atStart} aria-label="Previous testimonial" className={arrow}>‹</button>
          <button onClick={() => nudge(1)} disabled={atEnd} aria-label="Next testimonial" className={arrow}>›</button>
        </div>
      </div>

      <p className="mt-6 text-xs text-blc-slate/80 leading-relaxed max-w-3xl">{testimonialDisclaimer}</p>

      {story && <StoryModal story={story} onClose={closeStory} />}
    </div>
  )
}
