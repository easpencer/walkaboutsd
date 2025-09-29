import { Metadata } from 'next'
import { NeighborhoodListing } from '@/components/NeighborhoodListing'
import { ExploreHero } from '@/components/ExploreHero'
import { NeighborhoodFilters } from '@/components/NeighborhoodFilters'

export const metadata: Metadata = {
  title: 'Explore San Diego Neighborhoods | WalkaboutSD',
  description: 'Discover 15+ unique San Diego neighborhoods with guided walking tours. From La Jolla\'s coastal elegance to North Park\'s hipster culture - find your perfect walk.',
  openGraph: {
    title: 'Explore San Diego Neighborhoods | WalkaboutSD',
    description: 'Discover 15+ unique San Diego neighborhoods with guided walking tours. From coastal elegance to hipster culture.',
    url: 'https://walkaboutsd.com/explore',
    images: [
      {
        url: '/images/explore-neighborhoods.jpg',
        width: 1200,
        height: 630,
        alt: 'San Diego neighborhood collage'
      }
    ]
  },
  keywords: ['San Diego neighborhoods', 'walking tours', 'local guides', 'La Jolla', 'Balboa Park', 'Coronado', 'North Park'],
}

export default function ExplorePage() {
  return (
    <div className="min-h-screen">
      <ExploreHero />
      <NeighborhoodFilters />
      <NeighborhoodListing />
    </div>
  )
}