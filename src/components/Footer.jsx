import { Link } from 'react-router-dom'
import { site, whatsappLink } from '../data/site'

export default function Footer() {
  return (
    <footer className="bg-blc-navydeep text-white/80 mt-24">
      <div className="container-site py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.jpeg"
              alt="BLC Tutor Center"
              className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20"
            />
            <div className="font-head font-extrabold text-white text-lg">{site.name}</div>
          </div>
          <p className="mt-4 text-sm max-w-sm leading-relaxed text-white/70">
            {site.description}
          </p>
          <div className="mt-4 flex gap-2 text-[11px] font-semibold uppercase tracking-wider">
            {site.values.map((v) => (
              <span key={v} className="px-3 py-1 rounded-full bg-white/10">{v}</span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm list-none p-0 m-0">
            {site.nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="no-underline text-white/70 hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Visit / Contact</h4>
          <address className="not-italic text-sm space-y-2 text-white/70">
            <p className="m-0">{site.address.line1}<br />{site.address.line2}<br />{site.address.city}, {site.address.code}</p>
            <p className="m-0">
              <a href={`tel:${site.phoneIntl}`} className="no-underline text-white/80 hover:text-white">{site.phone}</a>
            </p>
            <p className="m-0">
              <a href={`mailto:${site.email}`} className="no-underline text-white/80 hover:text-white break-all">{site.email}</a>
            </p>
          </address>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-primary mt-4 text-sm py-2.5">
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site py-5 flex flex-col sm:flex-row gap-2 justify-between text-xs text-white/50">
          <p className="m-0">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="m-0">Reg No. {site.regNo} · Venue No. {site.venueNo}</p>
        </div>
      </div>
    </footer>
  )
}
