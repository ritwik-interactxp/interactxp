'use client'

import Link from 'next/link'

const links = {
  Products: [
    { label: 'Relay', href: '/relay' },
    { label: 'AI Photobooth', href: '/photobooth' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-navy">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(34,211,238,0.15)'}}>
                <svg width="22" height="22" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(100,100) scale(0.88) translate(-311,-88)">
                    <path d="M227.897 77.1942C227.897 167.812 347.873 178.887 394.25 107.4C377.78 161.434 327.037 175.53 304.52 175.53C174.124 175.53 179.84 0 282.34 0C381.143 4.6987 362.324 142.975 276.291 116.125L272.594 66.453L299.143 54.3706L296.118 97.3301C321.66 97.3301 327.037 74.5079 327.037 62.7625C327.037 43.4747 307.052 23.4437 285.028 22.3396C257.999 20.9844 227.897 43.7202 227.897 77.1942Z" fill="url(#footGrad1)"/>
                    <path d="M270.911 41.9526L272.594 61.4187L299.143 48.3294V41.9526H270.911Z" fill="url(#footGrad2)"/>
                  </g>
                  <defs>
                    <linearGradient id="footGrad1" x1="228" y1="17" x2="368" y2="153" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#01FFFF"/>
                      <stop offset="1" stopColor="#001FFE"/>
                    </linearGradient>
                    <linearGradient id="footGrad2" x1="228" y1="17" x2="368" y2="153" gradientUnits="userSpaceOnUse">
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
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-4">
              We build real-time interactive systems, event technology, and software that connects businesses to people.
            </p>
            <p className="text-slate-600 text-xs">Inter Tech Interact Pvt. Ltd.</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {['🇮🇳 India', '🇦🇪 UAE', '🇬🇧 UK', '🇺🇸 USA', '🇨🇦 Canada'].map((country) => (
                <span key={country} className="text-xs text-slate-600">{country}</span>
              ))}</div>
            <a href="mailto:ritwik@interactxp.in" className="text-sm mt-2 block transition-colors" style={{color: '#22d3ee'}}>
              ritwik@interactxp.in
            </a>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h3 className="font-display font-semibold text-xs tracking-widest uppercase text-slate-500 mb-4">
                {group}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-brand-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Inter Tech Interact Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">🇮🇳 India &nbsp;·&nbsp; 🇦🇪 UAE &nbsp;·&nbsp; 🇬🇧 UK &nbsp;·&nbsp; 🇺🇸 USA &nbsp;·&nbsp; 🇨🇦 Canada</p>
        </div>
      </div>
    </footer>
  )
}
