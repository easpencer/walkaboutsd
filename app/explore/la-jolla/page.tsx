import { Metadata } from 'next'
import { NeighborhoodHero } from '@/components/NeighborhoodHero'
import { InteractiveLeafletMap } from '@/components/InteractiveLeafletMap'
import { WalkRoutes } from '@/components/WalkRoutes'
import { LocalSpots } from '@/components/LocalSpots'
import { PhotoGallery } from '@/components/PhotoGallery'
import { PracticalInfo } from '@/components/PracticalInfo'
import { RelatedNeighborhoods } from '@/components/RelatedNeighborhoods'

export const metadata: Metadata = {
  title: 'La Jolla Walking Tours & Coastal Walks | WalkaboutSD',
  description: 'Explore La Jolla\'s stunning coastline, hidden coves, and sea lions on expert-guided walks. Discover tide pools, luxury shopping, and the best photo spots in San Diego.',
  openGraph: {
    title: 'La Jolla Walking Tours & Coastal Walks | WalkaboutSD',
    description: 'Explore stunning coastline, hidden coves, and sea lions on expert-guided walks through La Jolla.',
    url: 'https://walkaboutsd.com/explore/la-jolla',
    images: [
      {
        url: '/images/la-jolla-cove.jpg',
        width: 1200,
        height: 630,
        alt: 'La Jolla Cove with sea lions and coastal views'
      }
    ]
  },
  keywords: ['La Jolla walks', 'coastal tours', 'sea lions', 'tide pools', 'La Jolla Cove', 'San Diego beaches'],
}

const laJollaData = {
  name: 'La Jolla',
  title: 'Coastal Elegance',
  description: 'Discover the jewel of San Diego\'s coastline where dramatic cliffs meet pristine beaches, sea lions bask in the sun, and tide pools reveal hidden treasures.',
  heroImage: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=1920&q=80',
  highlights: [
    'Stunning coastal views and hidden coves',
    'Sea lion colonies at La Jolla Cove',
    'World-class tide pools and marine life',
    'Upscale shopping and dining scene',
    'Historic La Jolla Playhouse',
    'Children\'s Pool and harbor seals'
  ],
  quickFacts: {
    walkingTime: '45-90 minutes',
    difficulty: 'Easy',
    bestTime: 'Year-round, early morning or late afternoon',
    parking: 'Metered street parking, arrive early',
    publicTransit: 'Bus Route 30 from downtown',
    kidFriendly: true
  }
}

export default function LaJollaPage() {
  return (
    <div className="min-h-screen">
      <NeighborhoodHero neighborhood={laJollaData} />

      {/* Interactive Map Section */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">
              Interactive Walking Map
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore your route with our interactive map featuring real-time navigation, waypoint details, and local insights.
            </p>
          </div>
          <InteractiveLeafletMap
            neighborhood="la-jolla"
            center={[32.8507, -117.2713]}
            zoom={14}
            className="h-[600px] w-full"
          />
        </div>
      </section>

      <WalkRoutes neighborhoodId="la-jolla" />
      <PhotoGallery neighborhoodId="la-jolla" />
      <LocalSpots neighborhoodId="la-jolla" />
      <PracticalInfo neighborhood={laJollaData} />
      <RelatedNeighborhoods currentNeighborhood="la-jolla" />
    </div>
  )
}