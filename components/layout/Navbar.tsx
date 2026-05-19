'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const nav = [
  { label: 'Relay', href: '/relay' },
  { label: 'Demo', href: '/demo' },
  { label: 'AI Photobooth', href: '/photobooth' },
  { label: 'AR', href: '/ar' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-navy/95 backdrop-blur-md border-b border-brand-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo: same pattern as Footer */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(34,211,238,0.15)'}}>
            <svg width="22" height="22" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(100,100) scale(0.88) translate(-311,-88)">
                <path d="M227.897 77.1942C227.897 167.812 347.873 178.887 394.25 107.4C377.78 161.434 327.037 175.53 304.52 175.53C174.124 175.53 179.84 0 282.34 0C381.143 4.6987 362.324 142.975 276.291 116.125L272.594 66.453L299.143 54.3706L296.118 97.3301C321.66 97.3301 327.037 74.5079 327.037 62.7625C327.037 43.4747 307.052 23.4437 285.028 22.3396C257.999 20.9844 227.897 43.7202 227.897 77.1942Z" fill="url(#navGrad1)"/>
                <path d="M270.911 41.9526L272.594 61.4187L299.143 48.3294V41.9526H270.911Z" fill="url(#navGrad2)"/>
              </g>
              <defs>
                <linearGradient id="navGrad1" x1="228" y1="17" x2="368" y2="153" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#01FFFF"/>
                  <stop offset="1" stopColor="#001FFE"/>
                </linearGradient>
                <linearGradient id="navGrad2" x1="228" y1="17" x2="368" y2="153" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#01FFFF"/>
                  <stop offset="1" stopColor="#001FFE"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            Interact<span style={{color: '#22d3ee'}}>XP</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg text-sm font-body transition-all duration-200 ${
                pathname === item.href
                  ? 'text-white bg-white/5'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/contact" className="btn-secondary text-sm px-5 py-2">
            Contact
          </Link>
          <Link href="/relay" className="btn-primary text-sm px-5 py-2">
            Get Relay
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M5 5L15 15M15 5L5 15" strokeLinecap="round"/>
            ) : (
              <path d="M3 7h14M3 12h14" strokeLinecap="round"/>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-brand-border bg-brand-navy/98 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-3 pt-3 border-t border-brand-border">
              <Link href="/contact" className="btn-secondary text-sm flex-1 justify-center py-2">Contact</Link>
              <Link href="/relay" className="btn-primary text-sm flex-1 justify-center py-2">Get Relay</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
