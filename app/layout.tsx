import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import ChatWidget from '@/components/layout/ChatWidget'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://interactxp.in'),
  title: {
    default: 'InteractXP: Real-Time Business Software & Event Technology',
    template: '%s | InteractXP',
  },
  description:
    'InteractXP builds real-time interactive software, event technology, and Relay, a communication platform that connects your business systems directly to Telegram and Microsoft Teams.',
  keywords: [
    'InteractXP',
    'Relay',
    'real-time business software',
    'event technology',
    'AI photobooth',
    'Telegram business integration',
    'Microsoft Teams integration',
    'interactive event systems',
    'HTML5 games',
    'software development India',
  ],
  authors: [{ name: 'InteractXP', url: 'https://interactxp.in' }],
  creator: 'InteractXP',
  publisher: 'Inter Tech Interact Pvt. Ltd.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://interactxp.in',
    siteName: 'InteractXP',
    title: 'InteractXP: Real-Time Business Software & Event Technology',
    description:
      'We build real-time interactive systems, event technology, and Relay: your business, delivered to your chat.',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'InteractXP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InteractXP: Real-Time Business Software & Event Technology',
    description:
      'We build real-time interactive systems, event technology, and Relay: your business, delivered to your chat.',
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: 'https://interactxp.in',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#050d1a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'InteractXP',
              legalName: 'Inter Tech Interact Pvt. Ltd.',
              url: 'https://interactxp.in',
              logo: 'https://interactxp.in/images/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'ritwik@interactxp.in',
                contactType: 'customer support',
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IN',
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="font-body bg-brand-navy text-white antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
