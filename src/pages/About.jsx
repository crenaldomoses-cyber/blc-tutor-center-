import { Link } from 'react-router-dom'
import LazyImage from '../components/LazyImage'
import Reveal from '../components/Reveal'
import PageHeader from '../components/PageHeader'
import { site } from '../data/site'
import { photoById } from '../data/gallery'

const teamPhoto = photoById['tutor-team']
const outingPhotos = ['waterfall-teens', 'climbing-wall', 'camp-group-photo'].map((id) => photoById[id])

const valueDetail = {
  Learning: 'Impaq-aligned tutoring that meets each learner where they are and builds real understanding.',
  Respect: 'A safe, respectful environment where every learner and tutor is valued.',
  Growth: 'Confidence, character and academic progress — one step at a time.',
}

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A bridge to lifelong confidence"
        subtitle="BLC Tutor Center is a home-education tutor centre on the Bluff in Durban, guiding learners from Grade 1 to Matric through the Impaq curriculum."
      />

      <section className="container-site py-14 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-3 bg-blc-bluepale rounded-[34px] rotate-2" />
            <LazyImage
              src="/images/science-group.jpeg"
              alt="BLC learners working together"
              className="relative rounded-[28px] w-full h-[360px] object-cover shadow-blc"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <span className="eyebrow">Who we are</span>
          <h2 className="mt-3 text-3xl font-extrabold text-blc-navy">Small groups, big encouragement</h2>
          <div className="mt-4 space-y-4 text-blc-slate leading-relaxed">
            <p>
              We're a tutor centre — not a school — providing a safe, secure and caring environment
              where children can learn and grow. We facilitate teaching, mark assessments and capture
              marks according to Impaq standards, giving home-schooling families the structure and
              support they need.
            </p>
            <p>
              Where it helps, we keep groups small and focused so every learner gets real attention.
              Beyond the books, our learners take part in science experiments, STEM builds, crafts and
              swimming — because confidence grows through doing.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/programmes" className="btn-navy">Programmes & fees</Link>
            <Link to="/enrol" className="btn-ghost">How to enrol</Link>
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="bg-white/60 border-y border-blc-navy/5 py-16">
        <div className="container-site">
          <Reveal className="text-center max-w-xl mx-auto">
            <span className="eyebrow">What we stand for</span>
            <h2 className="mt-3 text-3xl font-extrabold text-blc-navy">Learning · Respect · Growth</h2>
          </Reveal>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {site.values.map((v, i) => (
              <Reveal key={v} delay={i * 90}>
                <div className="card h-full p-7 text-center">
                  <div className="mx-auto h-14 w-14 rounded-full bg-blc-navy text-white flex items-center justify-center font-head text-xl font-bold">
                    {v[0]}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-blc-navy">{v}</h3>
                  <p className="mt-2 text-sm text-blc-slate leading-relaxed">{valueDetail[v]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team & beyond the classroom */}
      <section className="container-site py-16 grid md:grid-cols-2 gap-12 items-center">
        <Reveal className="md:order-2">
          <div className="relative">
            <div className="absolute -inset-3 bg-blc-red/10 rounded-[34px] -rotate-2" />
            <LazyImage
              src={teamPhoto.src}
              alt="The BLC tutor team in the centre"
              className="relative rounded-[28px] w-full h-[360px] object-cover shadow-blc"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <span className="eyebrow">Our tutors</span>
          <h2 className="mt-3 text-3xl font-extrabold text-blc-navy">A team that knows every learner</h2>
          <p className="mt-4 text-blc-slate leading-relaxed">
            Our tutors work side by side with learners every day, in lessons, on outings and at every
            celebration in between. Hikes, team-building camps and waterfall trips give learners the
            chance to grow in confidence outside the classroom too.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {outingPhotos.map((p) => (
              <LazyImage
                key={p.id}
                src={p.thumb}
                alt={p.caption}
                className="rounded-2xl w-full h-28 object-cover shadow-blcsoft"
              />
            ))}
          </div>
          <Link to="/gallery?c=outings" className="link-underline mt-5 inline-block">
            See our outings →
          </Link>
        </Reveal>
      </section>

      {/* Facts */}
      <section className="container-site py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { k: 'Grades 1–12', v: 'Every phase supported' },
            { k: 'Impaq', v: 'Curriculum we facilitate' },
            { k: 'Est. 2020', v: `Reg ${site.regNo}` },
            { k: 'Bluff, Durban', v: '150 Maxwell Avenue' },
          ].map((f, i) => (
            <Reveal key={f.k} delay={i * 70}>
              <div className="card p-6 text-center h-full">
                <div className="font-head text-xl font-extrabold text-blc-red">{f.k}</div>
                <div className="mt-1 text-sm text-blc-slate">{f.v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
