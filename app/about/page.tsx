import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'About: Inter Tech Interact Pvt. Ltd.',
  description:
    'InteractXP is the brand identity of Inter Tech Interact Pvt. Ltd. We build real-time interactive systems, event technology, and software that connects businesses, technology, and people.',
  alternates: { canonical: 'https://interactxp.in/about' },
  openGraph: {
    title: 'About InteractXP: Inter Tech Interact Pvt. Ltd.',
    description:
      'We build real-time interactive systems, event technology, and software that connects businesses, technology, and people.',
    url: 'https://interactxp.in/about',
  },
}

const focuses = [
  {
    title: 'Real-Time Systems',
    description: 'We specialize in software that delivers information and enables action without delay.',
  },
  {
    title: 'Communication-Driven Software',
    description: 'Our systems bring information to the people who need it, not the other way around.',
  },
  {
    title: 'Interactive Technology',
    description: 'We build experiences that engage, from AI photobooths to browser games to event platforms.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5" style={{ background: '#22d3ee' }} />

          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="section-label mb-6">About</div>
              <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-8">
                We are not a generic<br />software agency.
              </h1>
              <p className="text-slate-400 text-xl leading-relaxed mb-4">
                InteractXP is the brand identity of Inter Tech Interact Pvt. Ltd. We build software systems that connect businesses, technology, and people.
              </p>
              <p className="text-slate-400 text-xl leading-relaxed">
                Our work focuses on real-time interaction. We specialize in systems that deliver information instantly and enable meaningful engagement.
              </p>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-20 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card-dark rounded-2xl p-6">
                <p className="text-xs font-mono tracking-widest uppercase text-slate-600 mb-3">Brand</p>
                <p className="font-display text-xl font-bold text-white">InteractXP</p>
              </div>
              <div className="card-dark rounded-2xl p-6">
                <p className="text-xs font-mono tracking-widest uppercase text-slate-600 mb-3">Legal Entity</p>
                <p className="font-display text-xl font-bold text-white">Inter Tech Interact Pvt. Ltd.</p>
              </div>
              <div className="card-dark rounded-2xl p-6">
                <p className="text-xs font-mono tracking-widest uppercase text-slate-600 mb-3">Location</p>
                <p className="font-display text-xl font-bold text-white">India</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Focus */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <div className="section-label mb-6">Our Focus</div>
                <h2 className="font-display text-4xl font-bold mb-6">
                  Built around one core idea.
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  Most business systems are built around dashboards. We build systems around people. Every product and service we build traces back to one goal: reduce friction between information and action.
                </p>
              </div>
              <div className="space-y-4">
                {focuses.map((f) => (
                  <div key={f.title} className="card-dark rounded-xl p-6">
                    <div className="w-1.5 h-1.5 rounded-full mb-4" style={{ background: '#22d3ee' }} />
                    <h3 className="font-display font-bold mb-2">{f.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vision: Relay */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="section-label mx-auto mb-8">Our Vision</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              A world where businesses operate through conversation instead of dashboards.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Relay is our long-term vision made real. It represents where we believe business operations are heading, and where we&apos;re already building.
            </p>
            <Link href="/relay" className="btn-primary px-10 py-4 text-base">
              Explore Relay
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-brand-border">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="font-display text-4xl font-bold mb-6">Get in touch</h2>
            <p className="text-slate-400 text-xl mb-10">
              We&apos;re always open to talking about new projects, products, or partnerships.
            </p>
            <Link href="/contact" className="btn-primary px-10 py-4 text-base">
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
