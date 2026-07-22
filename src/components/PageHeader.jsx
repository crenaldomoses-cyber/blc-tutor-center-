import Reveal from './Reveal'

// Consistent hero band for interior pages.
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blc-bluepale to-blc-cream">
      <div className="absolute -z-0 -top-20 -right-16 h-72 w-72 rounded-full bg-blc-red/10 blur-3xl" />
      <div className="container-site relative pt-16 pb-14 md:pt-20 md:pb-16 text-center">
        <Reveal>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-blc-navy leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg text-blc-slate max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
