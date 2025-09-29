import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import 'leaflet/dist/leaflet.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'WalkaboutSD - Discover San Diego on Foot',
    template: '%s | WalkaboutSD'
  },
  description: 'Discover San Diego\'s hidden gems with expert local walking guides. Authentic neighborhood experiences, self-guided tours, and insider tips for exploring America\'s Finest City.',
  keywords: ['San Diego walking tours', 'neighborhood guides', 'La Jolla walks', 'Balboa Park tours', 'local experiences'],
  authors: [{ name: 'WalkaboutSD' }],
  creator: 'WalkaboutSD',
  publisher: 'WalkaboutSD',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#2563eb',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://walkaboutsd.com',
    siteName: 'WalkaboutSD',
    title: 'WalkaboutSD - Discover San Diego on Foot',
    description: 'Expert local walking guides and authentic neighborhood experiences in San Diego',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WalkaboutSD - San Diego Walking Tours'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@walkaboutsd',
    creator: '@walkaboutsd',
    title: 'WalkaboutSD - Discover San Diego on Foot',
    description: 'Expert local walking guides and authentic neighborhood experiences in San Diego',
    images: ['/og-image.jpg']
  },
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}