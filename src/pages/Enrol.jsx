import Reveal from '../components/Reveal'
import PageHeader from '../components/PageHeader'
import TestimonialSlider from '../components/TestimonialSlider'
import { site, whatsappLink } from '../data/site'
import { enrolDocs } from '../data/programs'

const steps = [
  { n: 1, t: 'Enquire', d: 'Message us on WhatsApp or call to check availability and book a chat.' },
  { n: 2, t: 'Apply', d: 'Complete the BLC application form and gather the required documents below.' },
  { n: 3, t: 'Secure the space', d: 'Pay the once-off R500 administration fee to reserve your learner’s place.' },
  { n: 4, t: 'Start learning', d: 'Register with Impaq (we can help) and begin — welcome to BLC!' },
]

export default function Enrol() {
  return (
    <>
      <PageHeader
        eyebrow="Enrolment"
        title="Enrol at BLC Tutor Center"
        subtitle="A simple, supported process. We're with you every step — from your first question to your child's first day."
      />

      {/* Steps */}
      <section className="container-site py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="card h-full p-6">
                <div className="h-10 w-10 rounded-full bg-blc-red text-white flex items-center justify-center font-head font-bold">
                  {s.n}
                </div>
                <h3 className="mt-4 font-bold text-blc-navy">{s.t}</h3>
                <p className="mt-2 text-sm text-blc-slate leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Docs + Contact */}
      <section className="container-site pb-8 grid lg:grid-cols-2 gap-6">
        <Reveal>
          <div className="card p-8 h-full">
            <h2 className="text-2xl font-extrabold text-blc-navy">Documents to bring</h2>
            <p className="mt-2 text-sm text-blc-slate">
              Applications can only be processed once we have all of the following:
            </p>
            <ul className="mt-5 space-y-3 list-none p-0 m-0">
              {enrolDocs.map((d) => (
                <li key={d} className="flex gap-3 items-start">
                  <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-blc-bluepale text-blc-navy flex items-center justify-center text-sm font-bold">
                    ✓
                  </span>
                  <span className="text-sm text-blc-slate">{d}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-blc-slate/80 leading-relaxed">
              A once-off, non-refundable administration fee of R500 is payable before a new learner
              starts; no space is held until it is paid.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="card p-8 h-full bg-blc-navy text-white">
            <h2 className="text-2xl font-extrabold">Get in touch</h2>
            <p className="mt-2 text-white/75 text-sm">
              The quickest way to reach us is WhatsApp. We'd love to hear from you.
            </p>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-white/60 uppercase text-xs tracking-wide">Phone</dt>
                <dd className="mt-0.5"><a href={`tel:${site.phoneIntl}`} className="no-underline text-white font-semibold">{site.phone}</a></dd>
              </div>
              <div>
                <dt className="text-white/60 uppercase text-xs tracking-wide">Email</dt>
                <dd className="mt-0.5"><a href={`mailto:${site.email}`} className="no-underline text-white font-semibold break-all">{site.email}</a></dd>
              </div>
              <div>
                <dt className="text-white/60 uppercase text-xs tracking-wide">Visit us</dt>
                <dd className="mt-0.5 text-white/90">
                  {site.address.line1}, {site.address.line2}, {site.address.city}, {site.address.code}
                </dd>
              </div>
            </dl>
            <a href={whatsappLink('Hi BLC! I would like to enrol my child. Please can you send me the application form?')} target="_blank" rel="noreferrer" className="btn-primary mt-7 w-full">
              Start on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="container-site py-14">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">What our parents say</span>
          <h2 className="mt-3 text-3xl font-extrabold text-blc-navy">Hear from BLC families</h2>
        </Reveal>
        <Reveal delay={100} className="mt-8">
          <TestimonialSlider />
        </Reveal>
      </section>

      {/* Map */}
      <section className="container-site pb-4">
        <Reveal>
          <div className="overflow-hidden rounded-blclg shadow-blcsoft border border-blc-navy/5">
            <iframe
              title="BLC Tutor Center location"
              width="100%"
              height="340"
              loading="lazy"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`}
            />
          </div>
        </Reveal>
      </section>
    </>
  )
}
