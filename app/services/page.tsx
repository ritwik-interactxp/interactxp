import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Services: Event Technology, AR, TouchDesigner & Custom Software',
  description:
    'InteractXP builds event technology, AR experiences, HTML5 games, lighting control systems, digital platforms, and custom software. Featured work includes NEOM Sindalah.',
  alternates: { canonical: 'https://interactxp.in/services' },
  openGraph: {
    title: 'InteractXP Services: AR, TouchDesigner, Event Tech & Custom Software',
    description:
      'From AR marker experiences to lighting control for NEOM Sindalah, we build interactive technology that leaves an impression.',
    url: 'https://interactxp.in/services',
  },
}

const services = [
  {
    number: '01',
    name: 'Event Technology',
    description:
      'We develop software and hardware systems for physical and digital events. From interactive kiosks to game-based brand engagement and live event systems.',
    examples: ['Interactive kiosks', 'Game-based brand engagement', 'Live event systems', 'Hardware-integrated installations'],
  },
  {
    number: '02',
    name: 'Augmented Reality (AR)',
    description:
      'We build marker-based and markerless AR experiences for events, brand activations, and educational installations. Works on any modern mobile browser. No app required.',
    examples: ['Marker-based AR', 'WebAR experiences', 'Educational AR', 'Brand activation AR'],
  },
  {
    number: '03',
    name: 'TouchDesigner & Lighting Systems',
    description:
      'We design real-time generative visuals and lighting control systems using TouchDesigner. From architectural lighting to responsive installations, we build systems that react to sound, data, and interaction.',
    examples: ['Architectural lighting design', 'Generative visual systems', 'Real-time reactive installations', 'Show control & automation'],
  },
  {
    number: '04',
    name: 'HTML5 Games',
    description:
      'Lightweight, high-performance browser games for marketing campaigns, events, and web experiences. No app installs, runs everywhere.',
    examples: ['Marketing campaign games', 'Event engagement games', 'Interactive web experiences', 'Brand gamification'],
  },
  {
    number: '05',
    name: 'Digital Event Platforms',
    description:
      'Custom platforms for online events, brand engagement, and interactive digital experiences built to your specific requirements.',
    examples: ['Online event platforms', 'Brand engagement hubs', 'Interactive digital experiences', 'Virtual activations'],
  },
  {
    number: '06',
    name: 'Custom Software',
    description:
      'Tailored software solutions built around your specific business requirements: real-time systems, integrations, and business tools.',
    examples: ['Real-time systems', 'Business integrations', 'Internal tools', 'Bespoke applications'],
  },
]

const planets = [
  { name: 'Mercury', file: 'mercury.webp' },
  { name: 'Mars', file: 'mars.webp' },
  { name: 'Jupiter', file: 'jupiter.webp' },
  { name: 'Uranus', file: 'uranus.webp' },
  { name: 'Neptune', file: 'neptune.webp' },
]

const industries = [
  'Ecommerce', 'Digital Agencies', 'Event Companies',
  'Retail', 'Marketing Agencies', 'Internal Enterprise Systems',
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="max-w-6xl mx-auto px-6">
            <div className="section-label mb-6">Services</div>
            <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl">
              We build what events and businesses actually need.
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed max-w-2xl">
              From AR experiences and TouchDesigner lighting systems to real-time software and interactive games, InteractXP delivers technology that leaves an impression.
            </p>
          </div>
        </section>

        {/* NEOM Credential Banner */}
        <section className="pb-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative rounded-2xl overflow-hidden p-8 md:p-10" style={{background: 'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(15,31,61,0.95) 100%)', border: '1px solid rgba(34,211,238,0.2)'}}>
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10" style={{background: '#22d3ee'}} />
              <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="section-label mb-4">Featured Work</div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                    NEOM Sindalah, Saudi Arabia
                  </h2>
                  <p className="text-slate-300 leading-relaxed max-w-2xl">
                    We designed and deployed the lighting control software for the Sindalah island development, letting the venue team control architectural lighting across the island from a single tablet. Designed, built, and deployed on-site in three weeks.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="card-dark rounded-xl px-6 py-4 text-center">
                    <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mb-1">Role</p>
                    <p className="font-display font-bold text-white">Lighting control software</p>
                    <p className="text-xs text-slate-500 mt-1">Designed &amp; deployed on-site</p>
                  </div>
                </div>
              </div>
              {/* NEOM photo gallery */}
              <div className="relative mt-8 grid md:grid-cols-3 gap-3">
                <div className="rounded-xl overflow-hidden aspect-[4/3]" style={{ border: '1px solid rgba(34,211,238,0.15)' }}>
                  <Image
                    src="/images/neom/marble-entrance.jpg"
                    alt="A NEOM Sindalah building entrance at night with a back-lit marble pillar glowing from within."
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden aspect-[4/3]" style={{ border: '1px solid rgba(34,211,238,0.15)' }}>
                  <Image
                    src="/images/neom/tower-pink.jpg"
                    alt="A marble obelisk on Sindalah Island lit in deep pink from the inside."
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden aspect-[4/3]" style={{ border: '1px solid rgba(34,211,238,0.15)' }}>
                  <Image
                    src="/images/neom/vault-construction.jpg"
                    alt="A high-end storefront at the Sindalah development with warm architectural lighting along the planter edge."
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TouchDesigner callout */}
        <section className="py-6">
          <div className="max-w-6xl mx-auto px-6">
            <div className="card-dark rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.15)'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-display font-bold text-white mb-1">TouchDesigner Experts</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We are highly proficient in TouchDesigner and can design a wide range of real-time visual and lighting effects, from data-driven generative art to full show control systems for architectural and event environments.
                </p>
              </div>
              <Link href="/contact" className="btn-secondary whitespace-nowrap flex-shrink-0 text-sm">
                Discuss a Project
              </Link>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 border-t border-brand-border mt-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="section-label mb-10">What We Build</div>
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.number} className="card-dark rounded-2xl p-8 md:p-10">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <div className="flex items-baseline gap-4 mb-4">
                        <span className="font-mono text-sm text-slate-600">{service.number}</span>
                        <h2 className="font-display text-2xl font-bold">{service.name}</h2>
                      </div>
                      <p className="text-slate-400 leading-relaxed">{service.description}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono tracking-widest uppercase text-slate-600 mb-3">Examples</p>
                      <ul className="space-y-2">
                        {service.examples.map((ex) => (
                          <li key={ex} className="flex items-center gap-2 text-sm text-slate-300">
                            <span className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AR Demo Section */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <div className="section-label mb-6">AR Experience Demo</div>
                <h2 className="font-display text-4xl font-bold mb-6 leading-tight">
                  Planets AR:<br />scan a marker, see space.
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  This is a live example of our marker-based WebAR technology. Print or display any planet card below, then open the experience on your phone and point your camera at the marker.
                </p>
                <p className="text-slate-400 leading-relaxed mb-8">
                  No app installation required. Runs entirely in the mobile browser using WebAR.
                </p>
                <a
                  href="https://planetsar.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-4 text-base inline-flex"
                >
                  Launch AR Experience
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-2">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <p className="text-xs text-slate-600 mt-3">Open on a mobile device for the full AR experience</p>
              </div>

              {/* Planet markers grid */}
              <div>
                <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mb-4">AR Markers: point your camera at these</p>
                <div className="grid grid-cols-3 gap-3">
                  {planets.map((planet) => (
                    <div key={planet.name} className="card-dark rounded-xl overflow-hidden group">
                      <div className="aspect-square relative">
                        <Image
                          src={`/images/ar-markers/${planet.file}`}
                          alt={`${planet.name} AR marker: scan with your phone to see ${planet.name} in augmented reality`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                  {/* Try it card */}
                  <a
                    href="https://planetsar.pages.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-dark rounded-xl aspect-square flex flex-col items-center justify-center gap-2 hover:border-cyan-900/60 transition-all duration-200 group"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M15 10l-4 4L6 9m14 3a8 8 0 11-16 0 8 8 0 0116 0z" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className="text-xs text-center font-mono" style={{color: '#22d3ee'}}>Try Live</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Past Work */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="section-label mx-auto mb-6">Past Work</div>
              <h2 className="font-display text-4xl font-bold mb-4">Deployed in the field.</h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                A small selection of recent installations and activations. Client names withheld; happy to discuss in private.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Boat installation */}
              <div className="card-dark rounded-2xl overflow-hidden">
                <div className="aspect-video bg-black">
                  <video
                    src="/videos/boat-installation.mp4"
                    poster="/images/work/boat-poster.jpg"
                    autoPlay muted loop playsInline preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-mono tracking-widest uppercase mb-2" style={{color: '#22d3ee'}}>Mall Installation &middot; Dual Screen</div>
                  <h3 className="font-display text-xl font-bold mb-2">Themed Boat Racing</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    A pirate-themed open-water boat racing experience deployed as a dual-screen physical installation in a luxury retail venue. Custom ship&apos;s-wheel controllers, checkpoint racing, AI-navigated obstacles. Built in Unity.
                  </p>
                </div>
              </div>

              {/* Batak */}
              <div className="card-dark rounded-2xl overflow-hidden">
                <div className="aspect-video bg-black">
                  <video
                    src="/videos/batak-installation.mp4"
                    poster="/images/work/batak-poster.jpg"
                    autoPlay muted loop playsInline preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-mono tracking-widest uppercase mb-2" style={{color: '#22d3ee'}}>Hardware-Integrated Installation</div>
                  <h3 className="font-display text-xl font-bold mb-2">Batak Reaction Wall</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Wall-mounted reaction game deployed at public venues and brand activations. We built the software, integration, and installation design; physical button hardware co-developed with an embedded engineer. Multiple deployments across events.
                  </p>
                </div>
              </div>

              {/* Daikin cricket */}
              <div className="card-dark rounded-2xl overflow-hidden">
                <div className="aspect-video bg-black">
                  <video
                    src="/videos/daikin-cricket.mp4"
                    poster="/images/work/daikin-poster.jpg"
                    autoPlay muted loop playsInline preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-mono tracking-widest uppercase mb-2" style={{color: '#22d3ee'}}>Sponsor Activation &middot; Multi-Player</div>
                  <h3 className="font-display text-xl font-bold mb-2">Multi-Player Cricket Activation</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    A cricket-themed competitive activation built for an IPL franchise sponsor. Three players competing simultaneously on custom controllers, branded scoring, on-site event deployment.
                  </p>
                </div>
              </div>

              {/* AR Treasure Hunt */}
              <div className="card-dark rounded-2xl overflow-hidden">
                <div className="aspect-video bg-black">
                  <video
                    src="/videos/ar-treasure-hunt.mp4"
                    poster="/images/work/ar-treasure-hunt-poster.jpg"
                    autoPlay muted loop playsInline preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-mono tracking-widest uppercase mb-2" style={{color: '#22d3ee'}}>WebAR &middot; Branded Game</div>
                  <h3 className="font-display text-xl font-bold mb-2">AR Treasure Hunt</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    A Vuforia-based AR experience with a persistent leaderboard. Players scan markers around a venue to score points; the score climbs in real time. Hand-illustrated treasure-map aesthetic, deployed for a brand activation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-20 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="section-label mx-auto mb-4">Industries</div>
              <h2 className="font-display text-3xl font-bold">Who we work with</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((ind) => (
                <span key={ind} className="px-5 py-2.5 rounded-full text-sm text-slate-300 font-medium" style={{border: '1px solid rgba(30,45,71,0.8)', background: 'rgba(10,22,40,0.5)'}}>
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="font-display text-4xl font-bold mb-6">Have a project in mind?</h2>
            <p className="text-slate-400 text-xl mb-10 max-w-xl mx-auto">
              Tell us what you need. We&apos;ll tell you how we can build it.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-base px-10 py-4">Contact Us</Link>
              <Link href="/about" className="btn-secondary text-base px-10 py-4">About InteractXP</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
