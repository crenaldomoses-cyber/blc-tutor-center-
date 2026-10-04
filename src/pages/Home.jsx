import { Link } from 'react-router-dom'
import LazyImage from '../components/LazyImage'
import Reveal from '../components/Reveal'
import { site, whatsappLink } from '../data/site'
import PhotoGrid from '../components/PhotoGrid'
import { gradeTiers, whyBlc } from '../data/programs'
import { photoById } from '../data/gallery'

// Hand-picked highlights for the home page; the rest live on /gallery.
const highlights = [
  'waterfall-group',
  'hospitality-plated-starter',
  'circuits-lesson',
  'graduation-caps',
  'matric-class-2026',
  'tug-of-war',
  'outdoor-reading',
  'popsicle-catapults',
].map((id) => photoById[id])

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        {/* soft brand backdrop */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blc-bluepale via-blc-cream to-blc-cream" />
        <div className="absolute -z-10 -top-24 -right-24 h-96 w-96 rounded-full bg-blc-red/10 blur-3xl" />
        <div className="absolute -z-10 top-40 -left-24 h-80 w-80 rounded-full bg-blc-navy/10 blur-3xl" />

        <div className="container-site pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal>
              <span className="eyebrow">Bluff · Durban · Grades 1–12</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blc-navy leading-[1.05]">
                Where learners<br />
                <span className="text-blc-red">cross the bridge</span><br />
                to confidence.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-lg text-blc-slate max-w-md leading-relaxed">
                {site.name} is a caring {site.curriculum}-curriculum tutor centre supporting
                home-schooled learners in small, focused groups — {site.tagline.toLowerCase()}.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/enrol" className="btn-primary">Enrol your child</Link>
                <Link to="/programmes" className="btn-ghost">See programmes & fees</Link>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-blc-navy/70">
                {site.values.map((v, i) => (
                  <span key={v} className="flex items-center gap-2">
                    {i > 0 && <span className="text-blc-red">·</span>}
                    {v}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Hero image collage */}
          <Reveal delay={200} className="relative">
            <div className="relative">
              <div className="absolute -inset-4 bg-white/60 rounded-[38px] -rotate-3 shadow-blc" />
              <LazyImage
                src="/images/science-experiments.jpeg"
                alt="Learners doing a hands-on science experiment at BLC"
                className="relative rounded-[32px] w-full h-[380px] object-cover shadow-blc"
              />
              <div className="absolute -bottom-6 -left-6 card px-5 py-4 flex items-center gap-3 animate-floaty">
                <img src="/images/logo.jpeg" alt="" className="h-11 w-11 rounded-full object-cover" />
                <div className="leading-tight">
                  <div className="font-head font-bold text-blc-navy">Impaq curriculum</div>
                  <div className="text-xs text-blc-slate">Facilitated with care</div>
                </div>
              </div>
              <div className="absolute -top-5 -right-3 card px-4 py-3 text-center hidden sm:block">
                <div className="font-head text-2xl font-extrabold text-blc-red">1–12</div>
                <div className="text-[11px] uppercase tracking-wide text-blc-slate">All grades</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- WHY BLC ---------- */}
      <section className="container-site py-16">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Why families choose us</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-blc-navy">
            More than tutoring — a place to grow.
          </h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyBlc.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="card h-full p-6 hover:-translate-y-1 transition-transform duration-300">
                <div className="h-12 w-12 rounded-2xl bg-blc-bluepale flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-blc-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-blc-slate leading-relaxed">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- GRADE TIERS ---------- */}
      <section className="bg-white/60 py-20 border-y border-blc-navy/5">
        <div className="container-site">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Programmes</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-blc-navy">
                Support for every phase
              </h2>
            </div>
            <Link to="/programmes" className="link-underline">View full fees →</Link>
          </Reveal>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gradeTiers.map((tier, i) => (
              <Reveal key={tier.key} delay={i * 70}>
                <div className="card h-full p-6 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blc-red">
                      {tier.phase}
                    </span>
                  </div>
                  <h3 className="mt-1 text-2xl font-extrabold text-blc-navy">{tier.grades}</h3>
                  <p className="mt-3 text-sm text-blc-slate flex-1 leading-relaxed">{tier.blurb}</p>
                  <div className="mt-5 pt-4 border-t border-blc-navy/10 flex items-end justify-between">
                    <span className="text-xs text-blc-slate">{tier.hours}</span>
                    <span className="font-head font-extrabold text-blc-navy">
                      {tier.fee}<span className="text-xs font-body text-blc-slate">/mo</span>
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- GALLERY ---------- */}
      <section className="container-site py-20">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Life at BLC</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-blc-navy">
            Learning you can see and feel
          </h2>
          <p className="mt-3 text-blc-slate">
            From science practicals and hospitality service to waterfall hikes and the Matric Dance, our learners do more than read about the world — they explore it.
          </p>
        </Reveal>

        <div className="mt-12">
          <PhotoGrid photos={highlights} className="columns-2 md:columns-3 lg:columns-4" />
        </div>

        <Reveal className="mt-8 text-center">
          <Link to="/gallery" className="btn-navy">See the full gallery</Link>
        </Reveal>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="container-site pb-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-blc-navy text-white px-8 py-14 md:px-16 text-center shadow-blc">
            <div className="absolute -top-16 -right-10 h-64 w-64 rounded-full bg-blc-red/25 blur-3xl" />
            <div className="absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-blc-green/20 blur-3xl" />
            <div className="relative">
              <span className="value-arc text-blc-greensoft text-xs font-bold uppercase">
                {site.values.join('  ·  ')}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold max-w-2xl mx-auto leading-tight">
                Ready to give your child the confidence to thrive?
              </h2>
              <p className="mt-4 text-white/75 max-w-xl mx-auto">
                Spaces are limited to keep our groups small. Enquire today and we'll walk you
                through enrolment.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-primary">
                  Enquire on WhatsApp
                </a>
                <Link to="/enrol" className="btn bg-white text-blc-navy hover:bg-blc-cream">
                  How to enrol
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
