import { Metadata } from 'next'
import { EnhancedHero } from '@/components/EnhancedHero'
import { FeaturedNeighborhoods } from '@/components/FeaturedNeighborhoods'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { PopularWalks } from '@/components/PopularWalks'
import { Newsletter } from '@/components/Newsletter'
import { InstagramFeed } from '@/components/InstagramFeed'

export const metadata: Metadata = {
  title: 'WalkAboutSD - Discover San Diego Through Walking Adventures',
  description: 'Experience America\'s Finest City through immersive walking tours. Explore 15+ neighborhoods, 50+ guided routes, and discover hidden gems in San Diego.',
  openGraph: {
    title: 'WalkAboutSD - Discover San Diego Through Walking Adventures',
    description: 'Experience America\'s Finest City through immersive walking tours.',
    url: 'https://walkaboutsd.com',
    images: [
      {
        url: '/images/hero-main.jpg',
        width: 1200,
        height: 630,
        alt: 'San Diego walking tours'
      }
    ]
  },
  keywords: ['San Diego walking tours', 'guided walks', 'neighborhood exploration', 'La Jolla', 'Balboa Park', 'Gaslamp Quarter'],
}

export default function HomePage() {
  return (
    <>
      <EnhancedHero />
      <FeaturedNeighborhoods />
      <WhyChooseUs />
      <PopularWalks />
      <InstagramFeed />
      <Newsletter />
    </>
  )
}
