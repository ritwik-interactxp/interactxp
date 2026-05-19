import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'AI Photobooth: Real-Time AI Photo Experiences for Events',
  description:
    'InteractXP AI Photobooth uses real-time AI to transform photos into branded, shareable content. Available as physical installations or iPad-based systems for events, brand activations, and exhibitions.',
  alternates: { canonical: 'https://interactxp.in/photobooth' },
  openGraph: {
    title: 'AI Photobooth by InteractXP: Real-Time AI Photo Experiences',
    description: 'Real-time AI photo experiences for events and brand activations. Physical booths or iPad-based. Every image, unique.',
    url: 'https://interactxp.in/photobooth',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
}

const photoboothJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'InteractXP AI Photobooth',
  description: 'AI-powered photobooth system for events and brand activations with real-time AI transformations.',
  brand: { '@type': 'Brand', name: 'InteractXP' },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStoreOnly',
    seller: { '@type': 'Organization', name: 'InteractXP' },
  },
}

const filters = [
  'Character transformations', 'Cinematic styles', 'Cartoon & illustrated',
  'Futuristic looks', 'Brand-themed outputs', 'Background replacement',
  'Face enhancements', 'Creative visual effects',
]

const platforms = [
  { name: 'Physical Booth', desc: 'Complete dedicated hardware unit with camera, lighting, touchscreen, AI processing, and sharing.', icon: '🖥️' },
  { name: 'iPad & Tablet', desc: 'Lightweight portable system for exhibitions, pop-ups, and brand counters. No large hardware needed.', icon: '📱' },
  { name: 'Touch Kiosk', desc: 'Self-contained kiosk installations for retail environments and permanent activations.', icon: '🖐️' },
  { name: 'Custom Installations', desc: 'Tailored hardware and software configurations for unique event requirements.', icon: '⚙️' },
]


export default function PhotoboothPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(photoboothJsonLd) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center pt-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ background: '#f59e0b' }} />
          <div className="relative max-w-6xl mx-auto px-6 py-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-8" style={{ color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.05)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#f59e0b' }} />
                InteractXP Product
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">AI Photobooth</h1>
              <p className="font-display text-xl md:text-2xl mb-4" style={{ color: '#f59e0b' }}>
                AI-powered photobooths for physical and digital experiences.
              </p>
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-10">
                Real-time AI transforms photos into interactive, branded, and shareable content. Available as physical installations or tablet-based systems.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-display font-semibold text-base transition-all duration-200 hover:brightness-110" style={{ background: '#f59e0b', color: '#050d1a' }}>
                  Request a Demo
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-display font-semibold text-base transition-all duration-200 hover:bg-amber-500/10" style={{ border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* LIVE DEPLOYMENTS */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-6" style={{ color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.05)' }}>Live Deployments</div>
              <h2 className="font-display text-4xl font-bold mb-4">Deployed at airports and events.</h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Our AI photobooths have served travellers and event attendees at major Indian airport hubs and brand activations across India. Two recent deployments shown below.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-dark rounded-2xl overflow-hidden">
                <div className="aspect-video bg-black">
                  <video
                    src="/videos/photobooth-airport.mp4"
                    poster="/images/work/photobooth-airport-poster.jpg"
                    autoPlay muted loop playsInline preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: '#f59e0b' }}>Airport Activation</div>
                  <h3 className="font-display text-xl font-bold mb-2">Themed AI Portraits</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    A traveller picks one of three location-themed AI styles, the photobooth captures their photo, and AI generates a stylised portrait composited into the chosen scene. Live at a major Indian airport hub.
                  </p>
                </div>
              </div>
              <div className="card-dark rounded-2xl overflow-hidden">
                <div className="aspect-video bg-black">
                  <video
                    src="/videos/photobooth-pledge.mp4"
                    poster="/images/work/photobooth-pledge-poster.jpg"
                    autoPlay muted loop playsInline preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: '#f59e0b' }}>Outdoor Brand Kiosk</div>
                  <h3 className="font-display text-xl font-bold mb-2">Themed Pledge Kiosk</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    A touchscreen kiosk captures attendee details and photo, then composites the participant into a campaign-branded result. Built for outdoor, high-traffic activations.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <Link href="/contact" className="btn-secondary px-8 py-3">
                Request a Private Demo
              </Link>
            </div>
          </div>
        </section>

        {/* What it is */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-6" style={{ color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.05)' }}>Overview</div>
                <h2 className="font-display text-4xl font-bold mb-6">Not a photobooth.<br />An AI experience.</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  InteractXP Photobooth is an AI-driven photo system designed for events, brand activations, and interactive installations. It combines camera hardware, AI processing, and custom software to create photo experiences beyond traditional photobooths.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  These are not static overlays. The AI generates new visuals based on the person. Each output feels unique. Users become participants, not just subjects.
                </p>
              </div>
              <div className="card-dark rounded-2xl p-8" style={{ borderColor: 'rgba(245,158,11,0.15)' }}>
                <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mb-6">Experience flow</p>
                <div className="space-y-4">
                  {[
                    { step: '01', label: 'Walk up', desc: 'User approaches the photobooth' },
                    { step: '02', label: 'Take photo', desc: 'Camera captures the image' },
                    { step: '03', label: 'Select AI style', desc: 'Choose from AI filter options' },
                    { step: '04', label: 'Receive image', desc: 'AI-generated result in seconds' },
                    { step: '05', label: 'Share instantly', desc: 'QR code, email, or download' },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-4">
                      <span className="font-mono text-xs pt-0.5" style={{ color: '#f59e0b' }}>{s.step}</span>
                      <div>
                        <p className="font-semibold text-sm text-white">{s.label}</p>
                        <p className="text-xs text-slate-500">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Filters */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-6" style={{ color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.05)' }}>AI Processing</div>
              <h2 className="font-display text-4xl font-bold mb-4">Real-time AI transformations</h2>
              <p className="text-slate-400 max-w-xl mx-auto">Every filter is powered by AI, not static overlays. The result is unique to each person.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {filters.map((f) => (
                <div key={f} className="card-dark rounded-xl p-4 flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#f59e0b' }} />
                  <span className="text-sm text-slate-300">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-6" style={{ color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.05)' }}>Hardware</div>
              <h2 className="font-display text-4xl font-bold">Available on every platform</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {platforms.map((p) => (
                <div key={p.name} className="card-dark rounded-2xl p-6">
                  <div className="text-3xl mb-4">{p.icon}</div>
                  <h3 className="font-display font-bold mb-2">{p.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sharing + Branding */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="card-dark rounded-2xl p-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-6" style={{ color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.05)' }}>Instant Sharing</div>
                <h3 className="font-display text-2xl font-bold mb-4">Photos, delivered immediately</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">Users receive their AI-generated image instantly. No app required.</p>
                <div className="flex flex-wrap gap-3">
                  {['QR Code', 'Email', 'Download Link'].map((m) => (
                    <span key={m} className="px-4 py-2 rounded-full text-sm font-medium" style={{ color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.05)' }}>{m}</span>
                  ))}
                </div>
              </div>
              <div className="card-dark rounded-2xl p-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-6" style={{ color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.05)' }}>Brand Customization</div>
                <h3 className="font-display text-2xl font-bold mb-4">Every image, branded</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">Photobooths are fully customized per client: brand-specific AI styles, logo integration, and campaign-specific outputs.</p>
                <div className="space-y-2">
                  {['Brand-specific AI styles', 'Logo integration', 'Campaign-specific outputs'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full" style={{ background: '#f59e0b' }} />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="font-display text-5xl font-bold mb-6">Bring AI experiences<br />to your next event.</h2>
            <p className="text-slate-400 text-xl mb-10">Contact us to discuss your event requirements.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 rounded-lg font-display font-semibold text-base transition-all duration-200 hover:brightness-110" style={{ background: '#f59e0b', color: '#050d1a' }}>
                Request a Demo
              </Link>
              <Link href="/services" className="btn-secondary text-base px-10 py-4">View All Services</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
