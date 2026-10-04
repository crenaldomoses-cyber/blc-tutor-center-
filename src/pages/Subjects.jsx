import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import LazyImage from '../components/LazyImage'
import PageHeader from '../components/PageHeader'
import { subjects } from '../data/programs'
import { whatsappLink } from '../data/site'
import { photoById } from '../data/gallery'

const hospitalityPhotos = [
  'hospitality-plated-starter',
  'hospitality-tea-service',
  'hospitality-soup-service',
].map((id) => photoById[id])

function SubjectCard({ name, tone }) {
  const tones = {
    core: 'bg-blc-navy text-white',
    elective: 'bg-white text-blc-navy border border-blc-navy/10',
  }
  return (
    <div className={`rounded-2xl px-5 py-4 font-semibold shadow-blcsoft ${tones[tone]}`}>
      {name}
    </div>
  )
}

export default function Subjects() {
  return (
    <>
      <PageHeader
        eyebrow="FET Phase · Grade 10 – 12"
        title="Subjects offered"
        subtitle="A broad choice of core and elective subjects to build the National Senior Certificate that fits your learner's future."
      />

      <section className="container-site py-14">
        {/* Core */}
        <Reveal>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-extrabold text-blc-navy">Languages & Core</h2>
            <span className="h-px flex-1 bg-blc-navy/10" />
          </div>
        </Reveal>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.core.map((s, i) => (
            <Reveal key={s} delay={i * 50}><SubjectCard name={s} tone="core" /></Reveal>
          ))}
        </div>

        {/* Electives */}
        <Reveal className="mt-14">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-extrabold text-blc-navy">Elective Subjects</h2>
            <span className="h-px flex-1 bg-blc-navy/10" />
          </div>
        </Reveal>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.electives.map((s, i) => (
            <Reveal key={s} delay={i * 50}><SubjectCard name={s} tone="elective" /></Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <ul className="space-y-2 list-none p-0 m-0">
            {subjects.electiveNotes.map((n) => (
              <li key={n} className="flex gap-3 text-sm text-blc-slate">
                <span className="text-blc-red font-bold">!</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Hospitality spotlight */}
        <Reveal className="mt-14">
          <div className="card p-7 md:p-9 grid md:grid-cols-[1fr_1.4fr] gap-8 items-center">
            <div>
              <span className="eyebrow">Elective spotlight</span>
              <h3 className="mt-2 text-2xl font-extrabold text-blc-navy">Hospitality Studies</h3>
              <p className="mt-3 text-sm text-blc-slate leading-relaxed">
                Hospitality learners put theory into practice with full table-service practicals:
                setting the table, plating and serving each course, assessed just as they would be
                in the industry.
              </p>
              <Link to="/gallery?c=hospitality" className="link-underline mt-4 inline-block">
                See the practicals →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {hospitalityPhotos.map((p) => (
                <LazyImage
                  key={p.id}
                  src={p.thumb}
                  alt={p.caption}
                  className="rounded-2xl w-full h-44 sm:h-56 object-cover shadow-blcsoft"
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Outside list note */}
        <Reveal className="mt-12">
          <div className="card p-7 bg-blc-cream2">
            <h3 className="text-lg font-bold text-blc-navy">Need a subject not listed?</h3>
            <p className="mt-2 text-sm text-blc-slate leading-relaxed max-w-3xl">
              Learners may register for subjects outside our tutor list as self-study. BLC will still
              print and provide tasks, tests and exams, and facilitate uploading and marking through
              Impaq. Any external facilitator required is arranged and paid for by the parent.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={whatsappLink('Hi BLC! I have a question about subject choices.')} target="_blank" rel="noreferrer" className="btn-primary">
                Ask about subjects
              </a>
              <Link to="/enrol" className="btn-ghost">Enrol now</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
