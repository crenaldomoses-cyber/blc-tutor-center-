import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PageHeader from '../components/PageHeader'
import PhotoGrid from '../components/PhotoGrid'
import { photos, galleryCategories } from '../data/gallery'

export default function Gallery() {
  // Filter lives in the URL (?c=matric) so a category can be linked to directly.
  const [params, setParams] = useSearchParams()
  const active = params.get('c') || 'all'

  const shown = useMemo(
    () => (active === 'all' ? photos : photos.filter((p) => p.category === active)),
    [active],
  )

  const tabs = [{ key: 'all', label: 'All photos' }, ...galleryCategories]
  const countFor = (key) => (key === 'all' ? photos.length : photos.filter((p) => p.category === key).length)

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Life at BLC"
        subtitle="Lessons, practicals, outings and celebrations: a look at what our learners and tutors get up to."
      />

      <section className="container-site py-12">
        <Reveal>
          <div role="tablist" aria-label="Photo categories" className="flex flex-wrap justify-center gap-2">
            {tabs.map((t) => {
              const isActive = active === t.key
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setParams(t.key === 'all' ? {} : { c: t.key }, { replace: true })}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blc-navy text-white shadow-blcsoft'
                      : 'bg-white text-blc-navy border border-blc-navy/10 hover:border-blc-navy/40'
                  }`}
                >
                  {t.label}
                  <span className={`ml-2 text-xs ${isActive ? 'text-white/70' : 'text-blc-slate'}`}>
                    {countFor(t.key)}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-10">
          {/* key resets the grid (and any open lightbox) when the filter changes */}
          <PhotoGrid key={active} photos={shown} />
        </div>

        <Reveal className="mt-14 text-center">
          <h3 className="text-2xl font-extrabold text-blc-navy">Want your child to be part of it?</h3>
          <p className="mt-2 text-blc-slate">Spaces are limited to keep our groups small.</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link to="/enrol" className="btn-primary">Enrol your child</Link>
            <Link to="/programmes" className="btn-ghost">Programmes & fees</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
