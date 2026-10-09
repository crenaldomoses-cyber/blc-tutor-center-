import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site, whatsappLink } from '../data/site'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-blc-cream/90 backdrop-blur-md shadow-blcsoft' : 'bg-transparent'
      }`}
    >
      <nav className="container-site flex items-center justify-between h-[74px]">
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <img
            src="/images/logo.jpeg"
            alt="BLC Tutor Center logo"
            className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-blcsoft"
          />
          <span className="leading-none">
            <span className="block font-head font-extrabold text-blc-navy text-lg tracking-wide">
              {site.name}
            </span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {site.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-semibold no-underline transition-colors ${
                  isActive
                    ? 'text-blc-red'
                    : 'text-blc-navy/80 hover:text-blc-navy hover:bg-blc-navy/5'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-primary ml-2 text-sm py-2.5">
            Enquire
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`block h-0.5 w-6 bg-blc-navy transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-blc-navy transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-blc-navy transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 bg-blc-cream/95 backdrop-blur-md ${
          open ? 'max-h-96 shadow-blc' : 'max-h-0'
        }`}
      >
        <div className="container-site py-4 flex flex-col gap-1">
          {site.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `px-4 py-3 rounded-2xl font-semibold no-underline ${
                  isActive ? 'bg-blc-navy text-white' : 'text-blc-navy hover:bg-blc-navy/5'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-primary mt-2">
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
