import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'InteractXP: Real-Time Business Software & Event Technology',
  description:
    'InteractXP builds software that connects businesses to people in real time. We develop event technology, AI photobooths, interactive systems, and Relay, our real-time business communication platform.',
  alternates: { canonical: 'https://interactxp.in' },
  openGraph: {
    title: 'InteractXP: Real-Time Business Software & Event Technology',
    description:
      'Real-time interactive systems, event technology, and Relay: your business, delivered to your chat.',
    url: 'https://interactxp.in',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
}

const industries = [
  'Ecommerce',
  'Digital Agencies',
  'Event Companies',
  'Retail',
  'Marketing Agencies',
  'Internal Enterprise',
]

const products = [
  {
    tag: 'Product',
    name: 'Relay',
    tagline: 'Your business. In your chat.',
    description:
      'Relay connects your business systems directly to Telegram and Microsoft Teams. Real-time notifications, data on demand, and remote actions, without opening a dashboard.',
    href: '/relay',
    cta: 'Explore Relay',
    accent: '#22d3ee',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 14L10 8L16 14L10 20L4 14Z" fill="#22d3ee" opacity="0.7"/>
        <path d="M12 14L18 8L24 14L18 20L12 14Z" fill="#22d3ee"/>
      </svg>
    ),
  },
  {
    tag: 'Product',
    name: 'AI Photobooth',
    tagline: 'Photography, transformed by AI.',
    description:
      'Real-time AI photo experiences for events and brand activations. Available as physical booth installations or iPad-based systems. Every image, unique.',
    href: '/photobooth',
    cta: 'Explore Photobooth',
    accent: '#f59e0b',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="7" width="22" height="17" rx="3" stroke="#f59e0b" strokeWidth="1.5"/>
        <circle cx="14" cy="15" r="4.5" stroke="#f59e0b" strokeWidth="1.5"/>
        <path d="M10 7L11.5 4H16.5L18 7" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="15" r="2" fill="#f59e0b"/>
      </svg>
    ),
  },
  {
    tag: 'Experience',
    name: 'AR Experiences',
    tagline: 'The real world, augmented.',
    description:
      'Marker-based WebAR experiences that run in any mobile browser, no app required. Built for events, brand activations, and educational installations.',
    href: '/ar',
    cta: 'Explore AR',
    accent: '#818cf8',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="#818cf8" strokeWidth="1.5"/>
        <rect x="17" y="3" width="8" height="8" rx="1.5" stroke="#818cf8" strokeWidth="1.5"/>
        <rect x="3" y="17" width="8" height="8" rx="1.5" stroke="#818cf8" strokeWidth="1.5"/>
        <path d="M17 21h8M21 17v8" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="21" cy="21" r="2" fill="#818cf8" opacity="0.4"/>
      </svg>
    ),
  },
]

const services = [
  {
    name: 'Event Technology',
    desc: 'Interactive kiosks, game-based brand engagement, and live event systems for physical and digital experiences.',
  },
  {
    name: 'HTML5 Games',
    desc: 'Lightweight, high-performance browser games for marketing campaigns, events, and interactive web experiences.',
  },
  {
    name: 'Digital Event Platforms',
    desc: 'Custom platforms for online events, brand engagement, and interactive digital experiences.',
  },
  {
    name: 'Custom Software',
    desc: 'Tailored software solutions built around your specific business requirements and workflows.',
  },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
          <div className="absolute inset-0 bg-gradient-radial from-cyan-950/20 via-transparent to-transparent" />
          <div
            className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: '#22d3ee' }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-8"
            style={{ background: '#f59e0b' }}
          />

          <div className="relative max-w-6xl mx-auto px-6 py-24">
            <div className="max-w-4xl">
              <div className="section-label mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Software. Events. Real Time.
              </div>

              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                We build software that connects{' '}
                <span style={{ color: '#22d3ee' }} className="text-glow-cyan">
                  businesses
                </span>{' '}
                to people.
              </h1>

              <p className="text-slate-400 text-xl leading-relaxed max-w-2xl mb-10">
                From real-time communication platforms to AI-powered event experiences,
                InteractXP builds technology that reduces friction between information and action.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
                  Try Live Demo
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link href="/relay" className="btn-secondary text-base px-8 py-3.5">
                  Explore Relay
                </Link>
                <Link href="/services" className="btn-secondary text-base px-8 py-3.5">
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="section-label mb-6">What We Do</div>
                <h2 className="font-display text-4xl font-bold mb-6 leading-tight">
                  Real-time systems,<br />built around people.
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  InteractXP is a software development company focused on building real-time interactive systems. We don&apos;t build generic tools. We build systems that actively bring information to the people who need it.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Most business systems are built around dashboards. We build systems around people. Our goal is simple: reduce friction between information and action.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Event-based advertising technology',
                  'HTML5 interactive games',
                  'Digital event platforms',
                  'Custom software development',
                  'Hardware-integrated event systems',
                  'Real-time communication platforms',
                ].map((item) => (
                  <div key={item} className="card-dark rounded-xl p-4">
                    <div className="w-1.5 h-1.5 rounded-full mb-3" style={{ background: '#22d3ee' }} />
                    <p className="text-sm text-slate-300 leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="section-label mx-auto mb-6">Our Products</div>
              <h2 className="font-display text-4xl font-bold">
                Built for real problems.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="card-dark rounded-2xl p-8 group hover:border-opacity-60 transition-all duration-300"
                  style={{ borderColor: `${product.accent}20` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: `${product.accent}10`, border: `1px solid ${product.accent}20` }}
                  >
                    {product.icon}
                  </div>
                  <div className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: product.accent }}>
                    {product.tag}
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-sm font-medium mb-4" style={{ color: product.accent }}>
                    {product.tagline}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    {product.description}
                  </p>
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                    style={{ color: product.accent }}
                  >
                    {product.cta}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Relay Feature Spotlight */}
        <section className="py-24 border-t border-brand-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-cyan-950/15 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="section-label mx-auto mb-6">Featured Product</div>
              <h2 className="font-display text-4xl font-bold mb-4">Meet Relay</h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                A real-time bridge between your business and your chat.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-cyan-900/40 glow-cyan">
              <Image
                src="/images/relay-hero.png"
                alt="Relay, a real-time bridge between your business systems and chat platforms like Telegram and Microsoft Teams"
                width={1200}
                height={630}
                className="w-full"
                priority
              />
            </div>

            <div className="mt-8 text-center flex flex-wrap justify-center gap-4">
              <Link href="/demo" className="btn-primary px-10 py-4 text-base">
                Try Live Demo
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/relay" className="btn-secondary px-10 py-4 text-base">
                Learn More About Relay
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <div className="section-label mb-6">Services</div>
                <h2 className="font-display text-4xl font-bold mb-6">
                  We build what events and businesses need.
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  Beyond our products, InteractXP delivers custom event technology and software development tailored to specific business requirements.
                </p>
                <Link href="/services" className="btn-secondary">
                  View All Services
                </Link>
              </div>
              <div className="space-y-4">
                {services.map((s, i) => (
                  <div key={s.name} className="card-dark rounded-xl p-5 flex gap-4">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5 font-mono text-xs font-bold"
                      style={{ background: 'rgba(34,211,238,0.1)', color: '#22d3ee' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-1">{s.name}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NEOM + TouchDesigner Credential */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* NEOM */}
              <div className="relative rounded-2xl overflow-hidden" style={{background: 'linear-gradient(135deg, rgba(10,22,40,0.95), rgba(15,31,61,0.95))', border: '1px solid rgba(34,211,238,0.15)'}}>
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src="/images/neom/marble-entrance.jpg"
                    alt="A NEOM Sindalah building entrance at night with an internally lit marble pillar."
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10" style={{background: '#22d3ee'}} />
                <div className="relative p-8">
                  <div className="section-label mb-4">Featured Work</div>
                  <h3 className="font-display text-2xl font-bold mb-3">NEOM Sindalah</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    We designed and deployed a distributed real-time lighting control system across NEOM&apos;s Sindalah Island development in Saudi Arabia. Unity tablet, networked TouchDesigner runtimes, MQTT bus, 42 LED-illuminated towers.
                  </p>
                  <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors" style={{color: '#22d3ee'}}>
                    View our work
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </div>
              </div>

              {/* TouchDesigner */}
              <div className="card-dark rounded-2xl p-8">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.15)'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">TouchDesigner Experts</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We are highly proficient in TouchDesigner and design a wide range of real-time visual and lighting effects, from data-driven generative art to full show control systems for architectural and live event environments.
                </p>
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
                <span
                  key={ind}
                  className="px-5 py-2.5 rounded-full text-sm text-slate-300 font-medium"
                  style={{ border: '1px solid rgba(30,45,71,0.8)', background: 'rgba(10,22,40,0.5)' }}
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="font-display text-5xl font-bold mb-6">
              Ready to bring your<br />business closer?
            </h2>
            <p className="text-slate-400 text-xl mb-10 max-w-xl mx-auto">
              Explore Relay, or get in touch to discuss your project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo" className="btn-primary text-base px-10 py-4">
                Try Live Demo
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/relay" className="btn-secondary text-base px-10 py-4">
                Explore Relay
              </Link>
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
