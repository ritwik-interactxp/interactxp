import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Planets AR: WebAR Experience by InteractXP',
  description:
    'Experience the solar system in augmented reality. Print or display a planet marker, open the AR experience on your phone, and watch the planet come to life. No app required.',
  alternates: { canonical: 'https://interactxp.in/ar' },
  openGraph: {
    title: 'Planets AR: WebAR Experience by InteractXP',
    description:
      'Scan a planet marker with your phone and see it appear in augmented reality. No app required, runs in your mobile browser.',
    url: 'https://interactxp.in/ar',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
}

const arJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'InteractXP Planets AR',
  description: 'Marker-based WebAR experience: scan planet cards to see them in augmented reality.',
  url: 'https://planetsar.pages.dev/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Any modern mobile browser',
  author: { '@type': 'Organization', name: 'InteractXP', url: 'https://interactxp.in' },
}

const planets = [
  {
    name: 'Mercury',
    file: 'mercury.webp',
    color: '#c4a882',
    fact: 'Closest planet to the Sun. Surface covered in craters.',
  },
  {
    name: 'Mars',
    file: 'mars.webp',
    color: '#c1440e',
    fact: 'The Red Planet. Home to Olympus Mons, the largest volcano in the solar system.',
  },
  {
    name: 'Jupiter',
    file: 'jupiter.webp',
    color: '#c88b3a',
    fact: 'Largest planet in our solar system. The Great Red Spot is a storm older than 350 years.',
  },
  {
    name: 'Uranus',
    file: 'uranus.webp',
    color: '#7de8e8',
    fact: 'Rotates on its side. Its rings are nearly vertical.',
  },
  {
    name: 'Neptune',
    file: 'neptune.webp',
    color: '#4b70dd',
    fact: 'Farthest planet from the Sun. Winds reach speeds of 2,100 km/h.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Open on your phone',
    desc: 'Visit this page or go directly to the AR experience on your mobile device. It works on any modern Android or iOS browser. No app needed.',
  },
  {
    number: '02',
    title: 'Allow camera access',
    desc: 'When prompted, allow the browser to access your camera. This is required for AR to work and is only used locally on your device.',
  },
  {
    number: '03',
    title: 'Point at a marker',
    desc: 'Display a planet card on a screen or print it out. Hold your phone camera steady over the marker, keep it well-lit and flat.',
  },
  {
    number: '04',
    title: 'Watch it appear',
    desc: 'The planet will appear in 3D on top of the marker in real time. Move your phone around to see it from different angles.',
  },
]

export default function ARPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(arJsonLd) }}
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[85vh] flex items-center pt-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          {/* Space glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5" style={{ background: '#4b70dd' }} />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-8" style={{ background: '#7de8e8' }} />

          <div className="relative max-w-6xl mx-auto px-6 py-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-8" style={{ color: '#22d3ee', border: '1px solid rgba(34,211,238,0.2)', background: 'rgba(34,211,238,0.05)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                WebAR Experience
              </div>

              <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
                The solar system.<br />
                <span style={{ color: '#22d3ee' }} className="text-glow-cyan">In your room.</span>
              </h1>
              <p className="text-slate-400 text-xl leading-relaxed max-w-2xl mb-10">
                Point your phone at any planet marker below and watch it appear in 3D augmented reality, right where you&apos;re standing. No app download required.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://planetsar.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base px-8 py-4"
                >
                  Launch AR Experience
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#markers" className="btn-secondary text-base px-8 py-4">
                  View Markers
                </a>
              </div>
              <p className="text-slate-600 text-sm mt-4">
                Best experienced on a mobile device · Works in Chrome, Safari, Firefox
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="section-label mx-auto mb-6">How It Works</div>
              <h2 className="font-display text-4xl font-bold">Four steps to augmented reality</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={step.number} className="relative">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-px -translate-x-1/2 z-0" style={{ background: 'linear-gradient(to right, rgba(34,211,238,0.3), rgba(34,211,238,0.05))' }} />
                  )}
                  <div className="card-dark rounded-2xl p-6 relative z-10 h-full">
                    <div className="font-mono text-2xl font-bold mb-4" style={{ color: '#22d3ee' }}>
                      {step.number}
                    </div>
                    <h3 className="font-display font-bold mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Planet Markers */}
        <section id="markers" className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="section-label mx-auto mb-6">AR Markers</div>
              <h2 className="font-display text-4xl font-bold mb-4">
                Choose your planet
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Display any card on your screen and point your phone camera at it. Or print them out for a physical installation.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {planets.map((planet) => (
                <div
                  key={planet.name}
                  className="card-dark rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: `${planet.color}20` }}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={`/images/ar-markers/${planet.file}`}
                      alt={`${planet.name} AR marker: scan with your phone camera to see ${planet.name} in augmented reality`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-display font-bold text-sm mb-1" style={{ color: planet.color }}>
                      {planet.name}
                    </p>
                    <p className="text-xs text-slate-500 leading-snug">{planet.fact}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tip box */}
            <div className="card-dark rounded-2xl p-6 flex gap-4 items-start max-w-3xl mx-auto">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.15)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="#22d3ee" strokeWidth="1.5"/>
                  <path d="M8 7v4M8 5v.5" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="font-display font-semibold text-sm mb-1">Tips for the best experience</p>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Keep the marker flat and well-lit, avoid glare and shadows</li>
                  <li>• Hold your phone steady for 1–2 seconds while it locks onto the marker</li>
                  <li>• Works best on a white background, printed cards perform better than screen display</li>
                  <li>• Keep the marker fully visible, don&apos;t cover the edges</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What is WebAR */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="section-label mb-6">About This Technology</div>
                <h2 className="font-display text-4xl font-bold mb-6 leading-tight">
                  WebAR: augmented reality without the app store.
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Traditional AR requires downloading a dedicated app. WebAR runs entirely in the mobile browser, users just open a link and they&apos;re in the experience.
                </p>
                <p className="text-slate-400 leading-relaxed mb-8">
                  This makes it ideal for events, brand activations, and educational installations where friction needs to be zero. No installation. No accounts. Just scan and experience.
                </p>
                <Link href="/contact" className="btn-secondary px-8 py-3">
                  Build an AR experience with us
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'No app required', desc: 'Runs in any modern mobile browser: Chrome, Safari, Firefox.' },
                  { label: 'Marker-based tracking', desc: 'Anchors 3D content to physical or displayed image markers.' },
                  { label: 'Fully customisable', desc: 'We build custom AR experiences for your brand, event, or product.' },
                  { label: 'Works at scale', desc: 'Deploy to thousands of users with just a link or QR code.' },
                ].map((item) => (
                  <div key={item.label} className="card-dark rounded-xl p-5 flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#22d3ee' }} />
                    <div>
                      <p className="font-display font-semibold text-sm mb-1">{item.label}</p>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="font-display text-5xl font-bold mb-6">
              Want AR at your next event?
            </h2>
            <p className="text-slate-400 text-xl mb-10 max-w-xl mx-auto">
              We build custom WebAR experiences for brand activations, events, and educational installations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://planetsar.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-10 py-4"
              >
                Try the Demo
              </a>
              <Link href="/contact" className="btn-secondary text-base px-10 py-4">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
