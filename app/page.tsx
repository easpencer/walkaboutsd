import { EnhancedHero } from '@/components/EnhancedHero'
import { EnhancedNeighborhoods } from '@/components/EnhancedNeighborhoods'
import { PopularWalks } from '@/components/PopularWalks'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { PricingPlans } from '@/components/PricingPlans'
import { InstagramFeed } from '@/components/InstagramFeed'
import { Newsletter } from '@/components/Newsletter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WalkaboutSD - Discover San Diego on Foot | Local Walking Tours & Guides',
  description: 'Explore San Diego\'s best neighborhoods with expert local guides. Self-guided tours, audio guides, and insider tips for La Jolla, Balboa Park, Coronado, and more.',
  openGraph: {
    title: 'WalkaboutSD - Discover San Diego on Foot',
    description: 'Expert local walking guides and authentic neighborhood experiences in San Diego',
    url: 'https://walkaboutsd.com',
    images: [
      {
        url: '/images/hero-san-diego.jpg',
        width: 1200,
        height: 630,
        alt: 'Beautiful San Diego coastline view'
      }
    ]
  }
}

export default function HomePage() {
  return (
    <>
      <EnhancedHero />
      <EnhancedNeighborhoods />
      <PopularWalks />
      <WhyChooseUs />
      <PricingPlans />
      <InstagramFeed />
      <Newsletter />
    </>
  )
}