import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Relay: Your Business, In Your Chat',
  description:
    'Relay connects your business systems directly to Telegram and Microsoft Teams. Get real-time notifications, request live data, and trigger remote actions, without ever opening a dashboard.',
  alternates: { canonical: 'https://interactxp.in/relay' },
  openGraph: {
    title: 'Relay by InteractXP: Your Business, Delivered to Your Chat',
    description:
      'Real-time bridge between your business systems and Telegram or Microsoft Teams. Notifications, insights, and controls, delivered instantly.',
    url: 'https://interactxp.in/relay',
    images: [{ url: '/images/relay-hero.png', width: 1200, height: 630, alt: 'Meet Relay' }],
  },
}

const relayJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Relay',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Telegram, Microsoft Teams',
  description:
    'A real-time communication layer that connects business systems to chat platforms like Telegram and Microsoft Teams.',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStoreOnly',
    price: '0',
    priceCurrency: 'INR',
  },
  author: {
    '@type': 'Organization',
    name: 'InteractXP',
    url: 'https://interactxp.in',
  },
}

const features = [
  {
    title: 'Real-Time Notifications',
    description: 'Get notified the instant important events occur: new orders, system alerts, customer activity, generated reports.',
    examples: ['New orders', 'System alerts', 'Customer activity', 'Reports generated'],
    color: '#22d3ee',
  },
  {
    title: 'Ask Questions',
    description: 'Request live data directly from your chat. Relay fetches information and responds immediately.',
    examples: ['revenue today', 'order status', 'system health', 'live analytics'],
    color: '#22d3ee',
  },
  {
    title: 'Remote Actions',
    description: 'Perform system actions safely from chat without needing to access any dashboard.',
    examples: ['Enable maintenance', 'Trigger reports', 'Update system state', 'Send alerts'],
    color: '#22d3ee',
  },
]

const platforms = [
  { name: 'Telegram', status: 'Live', color: '#22d3ee' },
  { name: 'Microsoft Teams', status: 'Live', color: '#22d3ee' },
  { name: 'Discord', status: 'Live', color: '#22d3ee' },
  { name: 'WhatsApp', status: 'Coming Soon', color: '#64748b' },
]

const audiences = [
  'Business owners',
  'Ecommerce operators',
  'Technical teams',
  'Agencies',
  'Operations teams',
]

export default function RelayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(relayJsonLd) }}
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[85vh] flex items-center pt-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="absolute inset-0 bg-gradient-radial from-cyan-950/20 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5" style={{ background: '#22d3ee' }} />

          <div className="relative max-w-6xl mx-auto px-6 py-24">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-8" style={{ color: '#22d3ee', border: '1px solid rgba(34,211,238,0.2)', background: 'rgba(34,211,238,0.05)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                InteractXP Product
              </div>

              <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight mb-6" style={{ color: '#22d3ee' }} >
                Relay
              </h1>
              <p className="font-display text-2xl md:text-3xl font-medium text-white mb-4">
                Your business. In your chat.
              </p>
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                Relay connects your business systems directly to Telegram and Microsoft Teams, enabling real-time visibility and control without ever opening a dashboard.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/demo" className="btn-primary px-10 py-4 text-base">
                  Try Live Demo
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link href="/contact" className="btn-secondary px-10 py-4 text-base">
                  Request Access
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="rounded-2xl overflow-hidden glow-cyan" style={{ border: '1px solid rgba(34,211,238,0.15)' }}>
              <Image
                src="/images/relay-hero.png"
                alt="Relay architecture: connecting business systems like ecommerce, analytics, and internal tools to Telegram and Microsoft Teams via a secure real-time bridge"
                width={1200}
                height={630}
                className="w-full"
                priority
              />
            </div>
          </div>
        </section>

        {/* What Relay Is */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="section-label mb-6">What Relay Is</div>
                <h2 className="font-display text-4xl font-bold mb-6 leading-tight">
                  Conversation-first<br />business operations.
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Relay is a communication layer that connects business systems to chat platforms. It delivers real-time events, allows users to request live information, and enables remote interaction with systems.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Relay replaces dashboard-centric workflows with conversation-centric workflows. You don&apos;t check your business. Your business updates you.
                </p>
              </div>

              {/* Flow diagram */}
              <div className="card-dark rounded-2xl p-8">
                <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mb-6">How it works</p>
                <div className="space-y-4">
                  {[
                    { from: 'Your System', to: 'Relay', to2: 'Your Chat', label: 'Events & Data flow out' },
                    { from: 'Your Chat', to: 'Relay', to2: 'Your System', label: 'Commands flow back in' },
                  ].map((flow, i) => (
                    <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(34,211,238,0.03)', border: '1px solid rgba(34,211,238,0.08)' }}>
                      <p className="text-xs text-slate-500 mb-3">{flow.label}</p>
                      <div className="flex items-center gap-2 font-mono text-sm">
                        <span className="px-3 py-1 rounded text-white" style={{ background: 'rgba(255,255,255,0.05)' }}>{flow.from}</span>
                        <span style={{ color: '#22d3ee' }}>→</span>
                        <span className="px-3 py-1 rounded font-bold" style={{ color: '#22d3ee', background: 'rgba(34,211,238,0.1)' }}>{flow.to}</span>
                        <span style={{ color: '#22d3ee' }}>→</span>
                        <span className="px-3 py-1 rounded text-white" style={{ background: 'rgba(255,255,255,0.05)' }}>{flow.to2}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-brand-border">
                  <p className="text-xs text-slate-500 font-mono mb-2">Secure two-way bridge</p>
                  <p className="text-sm text-slate-300">All communication passes through Relay&apos;s secure processing layer. Your systems stay protected.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="section-label mx-auto mb-6">Capabilities</div>
              <h2 className="font-display text-4xl font-bold">What Relay enables</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={f.title} className="card-dark rounded-2xl p-8 relative">
                  <div className="font-mono text-xs text-slate-600 mb-4">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="font-display text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{f.description}</p>
                  <div className="space-y-2">
                    {f.examples.map((ex) => (
                      <div key={ex} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full" style={{ background: f.color }} />
                        <span className="font-mono text-xs text-slate-400">{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Output */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="section-label mx-auto mb-6">Sample Output</div>
              <h2 className="font-display text-4xl font-bold mb-4">A real report, generated in chat.</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Here is what an end user sees when they request a compiled report from Relay: a chat conversation, a formatted PDF, and an AI-generated executive summary. Built as a demo for enterprise health-surveillance reporting, with simulated data.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden card-dark" style={{ border: '1px solid rgba(34,211,238,0.15)' }}>
                <Image
                  src="/images/work/relay-bot-preview.png"
                  alt="Relay Telegram bot interface showing a Generate Full Report button and the start of a compiled surveillance report."
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold mb-4">What you get in chat</h3>
                <ul className="space-y-3 mb-8">
                  {[
                    'A single button: "Generate Full Report + PDF".',
                    'Inline compiled output streaming back into the chat.',
                    'A formatted PDF attachment, downloadable in one tap.',
                    'An AI-written executive summary, key findings, and critical alerts.',
                    'Auto-flagged anomalies and recommended actions, derived from the underlying data.',
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#22d3ee' }} />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/files/relay-sample-report.pdf"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-display font-semibold text-sm transition-all duration-200 hover:brightness-110"
                  style={{ background: 'rgba(34,211,238,0.1)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.3)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v9M3 6l4 4 4-4M1 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Download sample PDF
                </a>
                <p className="text-xs text-slate-500 mt-4">Three-page PDF, ~10 KB. Demo only, all data simulated.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo CTA */}
        <section className="py-16 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="rounded-2xl p-10 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.95), rgba(15,31,61,0.95))', border: '1px solid rgba(34,211,238,0.2)' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full blur-3xl opacity-10" style={{ background: '#22d3ee' }} />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-6" style={{ color: '#22d3ee', border: '1px solid rgba(34,211,238,0.2)', background: 'rgba(34,211,238,0.05)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Interactive Demo
                </div>
                <h3 className="font-display text-3xl font-bold mb-4">See Relay in action</h3>
                <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                  Place a real order, process it, and watch Relay ping your bot instantly. No signup required.
                </p>
                <Link href="/demo" className="btn-primary px-10 py-4 text-base">
                  Try Live Demo
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="section-label mx-auto mb-6">Platforms</div>
              <h2 className="font-display text-4xl font-bold mb-4">Supported chat platforms</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {platforms.map((p) => (
                <div key={p.name} className="card-dark rounded-xl p-6 text-center">
                  <div className="font-display font-bold mb-2">{p.name}</div>
                  <span
                    className="text-xs font-mono px-2 py-1 rounded-full"
                    style={{
                      color: p.color,
                      background: `${p.color}15`,
                      border: `1px solid ${p.color}25`,
                    }}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Relay Exists */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="section-label mx-auto mb-8">Philosophy</div>
            <h2 className="font-display text-5xl font-bold mb-8 leading-tight">
              Dashboards require attention.<br />
              <span style={{ color: '#22d3ee' }}>Relay brings information to you.</span>
            </h2>
            <p className="text-slate-400 text-xl leading-relaxed mb-6">
              You don&apos;t check your business.
            </p>
            <p className="text-xl font-semibold text-white">Your business updates you.</p>
          </div>
        </section>

        {/* Who It&apos;s For */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="section-label mb-6">Who It&apos;s For</div>
                <h2 className="font-display text-4xl font-bold mb-6">
                  For anyone who needs<br />real-time awareness.
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  Relay is designed for people who run things. If you need to know what&apos;s happening in your business without being tied to a screen, Relay is built for you.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {audiences.map((a) => (
                  <span
                    key={a}
                    className="px-5 py-2.5 rounded-full text-sm text-slate-300 font-medium"
                    style={{ border: '1px solid rgba(34,211,238,0.15)', background: 'rgba(34,211,238,0.03)' }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="font-display text-5xl font-bold mb-6">
              Ready to stop checking dashboards?
            </h2>
            <p className="text-slate-400 text-xl mb-10">
              Request access to Relay or contact us to learn more.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo" className="btn-primary text-base px-10 py-4">
                Try Live Demo
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/contact" className="btn-secondary text-base px-10 py-4">
                Request Access
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
