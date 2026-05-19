import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-mono text-sm text-slate-600 mb-4">404</p>
          <h1 className="font-display text-5xl font-bold mb-6">Page not found.</h1>
          <p className="text-slate-400 text-xl mb-10">The page you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="btn-primary px-8 py-4">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
