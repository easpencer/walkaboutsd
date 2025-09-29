export interface WalkRoute {
  id: string
  title: string
  neighborhood: string
  description: string
  duration: number // minutes
  distance: number // miles
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  rating: number
  reviews: number
  highlights: Array<{
    icon: string
    text: string
  }>
  waypoints: Array<{
    id: string
    title: string
    description: string
    type: 'viewpoint' | 'beach' | 'park' | 'cafe' | 'shop' | 'historic' | 'art'
    coordinates?: [number, number] // [lat, lng]
  }>
  photos: Array<{
    url: string
    alt: string
    caption: string
  }>
  featured: boolean
  tags: string[]
  seoKeywords: string[]
}

export const walkRoutes: WalkRoute[] = [
  {
    id: 'la-jolla-coastal',
    title: 'La Jolla Coastal Walk',
    neighborhood: 'La Jolla',
    description: 'Discover hidden coves, sea lions, and stunning ocean views on this iconic coastal route through La Jolla\'s most beautiful spots.',
    duration: 75,
    distance: 2.3,
    difficulty: 'Easy',
    rating: 4.8,
    reviews: 127,
    highlights: [
      { icon: '🌊', text: 'Tide Pools' },
      { icon: '📸', text: 'Photo Spots' },
      { icon: '🦭', text: 'Sea Lions' }
    ],
    waypoints: [
      {
        id: '1',
        title: 'La Jolla Cove',
        description: 'Start at this iconic beach known for crystal-clear waters and friendly sea lions.',
        type: 'beach',
        coordinates: [32.8507, -117.2713]
      },
      {
        id: '2',
        title: 'Ellen Browning Scripps Park',
        description: 'Beautiful clifftop park with panoramic ocean views and perfect picnic spots.',
        type: 'park',
        coordinates: [32.8511, -117.2725]
      },
      {
        id: '3',
        title: 'Coast Walk Trail',
        description: 'Scenic walking path along dramatic cliffs with multiple viewpoints.',
        type: 'viewpoint',
        coordinates: [32.8485, -117.2755]
      },
      {
        id: '4',
        title: 'Shell Beach',
        description: 'Hidden gem perfect for tide pooling and spotting marine life.',
        type: 'beach',
        coordinates: [32.8465, -117.2770]
      }
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80',
        alt: 'La Jolla Cove with sea lions',
        caption: 'Sea lions basking at La Jolla Cove'
      },
      {
        url: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80',
        alt: 'Coastal cliffs view',
        caption: 'Dramatic coastal cliffs and ocean views'
      }
    ],
    featured: true,
    tags: ['coastal', 'wildlife', 'easy', 'family-friendly'],
    seoKeywords: ['La Jolla Cove walk', 'sea lions', 'coastal trail', 'tide pools', 'ocean views']
  },
  {
    id: 'balboa-cultural',
    title: 'Balboa Park Cultural Trail',
    neighborhood: 'Balboa Park',
    description: 'Explore museums, gardens, and stunning Spanish architecture in America\'s cultural crown jewel.',
    duration: 90,
    distance: 3.1,
    difficulty: 'Easy',
    rating: 4.9,
    reviews: 203,
    highlights: [
      { icon: '🏛️', text: 'Museums' },
      { icon: '🌹', text: 'Rose Garden' },
      { icon: '🏰', text: 'Architecture' }
    ],
    waypoints: [
      {
        id: '1',
        title: 'California Building',
        description: 'Iconic Spanish Colonial Revival architecture and Museum of Us.',
        type: 'historic',
        coordinates: [32.7341, -117.1498]
      },
      {
        id: '2',
        title: 'Rose Garden',
        description: 'Beautiful garden with over 1,600 rose bushes in bloom year-round.',
        type: 'park',
        coordinates: [32.7355, -117.1475]
      },
      {
        id: '3',
        title: 'Botanical Building',
        description: 'Historic lath structure housing 2,100 plants and seasonal displays.',
        type: 'park',
        coordinates: [32.7334, -117.1509]
      }
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80',
        alt: 'California Building',
        caption: 'Iconic California Building architecture'
      }
    ],
    featured: true,
    tags: ['cultural', 'museums', 'architecture', 'gardens'],
    seoKeywords: ['Balboa Park tour', 'museum walk', 'Spanish architecture', 'rose garden']
  },
  {
    id: 'coronado-historic',
    title: 'Coronado Historic Walk',
    neighborhood: 'Coronado',
    description: 'Victorian mansions, pristine beaches, and the legendary Hotel del Coronado await on this charming island walk.',
    duration: 60,
    distance: 2.8,
    difficulty: 'Easy',
    rating: 4.7,
    reviews: 156,
    highlights: [
      { icon: '🏨', text: 'Historic Hotel' },
      { icon: '🏖️', text: 'Beach Walk' },
      { icon: '🏘️', text: 'Victorian Homes' }
    ],
    waypoints: [
      {
        id: '1',
        title: 'Hotel del Coronado',
        description: 'Legendary Victorian beachfront resort with rich history and stunning architecture.',
        type: 'historic',
        coordinates: [32.6781, -117.1831]
      },
      {
        id: '2',
        title: 'Coronado Beach',
        description: 'Wide, pristine sandy beach perfect for walking and sunset viewing.',
        type: 'beach',
        coordinates: [32.6785, -117.1845]
      },
      {
        id: '3',
        title: 'Orange Avenue',
        description: 'Charming main street with shops, cafes, and historic buildings.',
        type: 'shop',
        coordinates: [32.6859, -117.1831]
      }
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80',
        alt: 'Hotel del Coronado',
        caption: 'The iconic Hotel del Coronado'
      }
    ],
    featured: false,
    tags: ['historic', 'beach', 'architecture', 'family-friendly'],
    seoKeywords: ['Hotel del Coronado', 'Coronado Beach', 'Victorian architecture', 'island walk']
  },
  {
    id: 'north-park-brewery',
    title: 'North Park Brewery Crawl',
    neighborhood: 'North Park',
    description: 'Hip neighborhood tour featuring craft breweries, street art, and the best local eateries.',
    duration: 120,
    distance: 2.5,
    difficulty: 'Easy',
    rating: 4.6,
    reviews: 98,
    highlights: [
      { icon: '🍺', text: 'Craft Beer' },
      { icon: '🎨', text: 'Street Art' },
      { icon: '🍕', text: 'Local Eats' }
    ],
    waypoints: [
      {
        id: '1',
        title: 'Modern Times Beer',
        description: 'Popular local brewery with innovative craft beers and great atmosphere.',
        type: 'cafe',
        coordinates: [32.7442, -117.1294]
      },
      {
        id: '2',
        title: '30th Street Corridor',
        description: 'Main strip with shops, restaurants, and vibrant street art.',
        type: 'art',
        coordinates: [32.7456, -117.1289]
      },
      {
        id: '3',
        title: 'North Park Observatory',
        description: 'Historic venue for live music and entertainment.',
        type: 'historic',
        coordinates: [32.7445, -117.1302]
      }
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80',
        alt: 'North Park street art',
        caption: 'Colorful street art in North Park'
      }
    ],
    featured: false,
    tags: ['brewery', 'art', 'nightlife', 'local'],
    seoKeywords: ['North Park breweries', 'craft beer tour', 'street art', 'hipster neighborhood']
  }
]

export function getWalksByNeighborhood(neighborhoodId: string): WalkRoute[] {
  return walkRoutes.filter(walk =>
    walk.neighborhood.toLowerCase().replace(/\s+/g, '-') === neighborhoodId
  )
}

export function getFeaturedWalks(): WalkRoute[] {
  return walkRoutes.filter(walk => walk.featured)
}

export function getWalkById(id: string): WalkRoute | undefined {
  return walkRoutes.find(walk => walk.id === id)
}