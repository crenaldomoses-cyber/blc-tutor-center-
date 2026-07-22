import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PageHeader from '../components/PageHeader'
import { gradeTiers, feeNotes } from '../data/programs'
import { whatsappLink } from '../data/site'

export default function Programmes() {
  return (
    <>
      <PageHeader
        eyebrow="Programmes & Fees"
        title="Find the right fit for your learner"
        subtitle="Monthly fees for 2026, payable in advance (January – December). Small groups across every phase, Grade 1 to Matric."
      />

      <section className="container-site py-14">
        <div className="grid gap-5 lg:grid-cols-2">
          {gradeTiers.map((tier, i) => (
            <Reveal key={tier.key} delay={i * 60}>
              <div className="card p-7 h-full flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="sm:w-40 shrink-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-blc-red">
                    {tier.phase}
                  </span>
                  <div className="font-head text-2xl font-extrabold text-blc-navy">{tier.grades}</div>
                  <div className="mt-2 font-head text-3xl font-extrabold text-blc-navy">
                    {tier.fee}
                    <span className="text-sm font-body font-semibold text-blc-slate">/month</span>
                  </div>
                  {tier.note && (
                    <div className="mt-1 text-xs text-blc-red font-semibold">{tier.note}</div>
                  )}
                </div>
                <div className="flex-1 sm:border-l sm:border-blc-navy/10 sm:pl-6">
                  <p className="text-sm text-blc-slate leading-relaxed">{tier.blurb}</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-blc-navy bg-blc-bluepale px-3 py-1.5 rounded-full">
                    🕒 {tier.hours}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Fee notes */}
        <Reveal className="mt-10">
          <div className="card p-7 bg-blc-cream2">
            <h3 className="text-lg font-bold text-blc-navy">Good to know</h3>
            <ul className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-3 list-none p-0 m-0">
              {feeNotes.map((note) => (
                <li key={note} className="flex gap-3 text-sm text-blc-slate">
                  <span className="text-blc-green font-bold mt-0.5">✓</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-blc-slate/80 leading-relaxed">
              Please note: BLC is a tutor centre, not a school. We facilitate the Impaq curriculum and
              manage assessments to Impaq standards; Impaq registration and fees are separate and paid
              directly to Impaq. Full terms are provided in the application pack.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10 text-center">
          <h3 className="text-2xl font-extrabold text-blc-navy">Not sure which programme fits?</h3>
          <p className="mt-2 text-blc-slate">We're happy to help you choose. Reach out anytime.</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-primary">Ask a question</a>
            <Link to="/enrol" className="btn-ghost">Start enrolment</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
