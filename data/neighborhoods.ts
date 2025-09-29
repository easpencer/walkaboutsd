export interface Neighborhood {
  id: string
  name: string
  title: string
  description: string
  heroImage: string
  highlights: string[]
  quickFacts: {
    walkingTime: string
    difficulty: 'Easy' | 'Moderate' | 'Challenging'
    bestTime: string
    parking: string
    publicTransit: string
    kidFriendly: boolean
  }
  seoKeywords: string[]
  rating: number
  reviews: number
  featured: boolean
}

export const neighborhoods: Neighborhood[] = [
  {
    id: 'la-jolla',
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
    },
    seoKeywords: ['La Jolla walks', 'coastal tours', 'sea lions', 'tide pools', 'La Jolla Cove', 'San Diego beaches'],
    rating: 4.8,
    reviews: 127,
    featured: true
  },
  {
    id: 'balboa-park',
    name: 'Balboa Park',
    title: 'Cultural Heart',
    description: 'Explore America\'s largest urban cultural park with 15 museums, stunning Spanish architecture, and over 1,200 acres of gardens and green space.',
    heroImage: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=1920&q=80',
    highlights: [
      '15 world-class museums',
      'Spanish Colonial Revival architecture',
      'Rose Garden and Botanical Building',
      'San Diego Zoo (adjacent)',
      'Outdoor organ pavilion',
      'California Building and tower'
    ],
    quickFacts: {
      walkingTime: '60-120 minutes',
      difficulty: 'Easy',
      bestTime: 'Year-round, weekday mornings less crowded',
      parking: 'Multiple free lots available',
      publicTransit: 'Trolley to Park Blvd or bus routes',
      kidFriendly: true
    },
    seoKeywords: ['Balboa Park tours', 'San Diego museums', 'cultural walks', 'Spanish architecture', 'park guide'],
    rating: 4.9,
    reviews: 203,
    featured: true
  },
  {
    id: 'coronado',
    name: 'Coronado',
    title: 'Victorian Charm',
    description: 'Step back in time on this charming island community featuring pristine beaches, Victorian architecture, and the legendary Hotel del Coronado.',
    heroImage: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=1920&q=80',
    highlights: [
      'Hotel del Coronado historic tour',
      'Wide, pristine sandy beaches',
      'Victorian and craftsman homes',
      'Orange Avenue shopping district',
      'Coronado Beach sunset views',
      'Naval Air Station history'
    ],
    quickFacts: {
      walkingTime: '30-75 minutes',
      difficulty: 'Easy',
      bestTime: 'Year-round, sunset walks recommended',
      parking: 'Beach parking lots and street parking',
      publicTransit: 'Bus Route 904 or ferry from downtown',
      kidFriendly: true
    },
    seoKeywords: ['Coronado walks', 'Hotel del Coronado', 'beach walks', 'Victorian architecture', 'island tours'],
    rating: 4.7,
    reviews: 156,
    featured: true
  },
  {
    id: 'north-park',
    name: 'North Park',
    title: 'Hipster Haven',
    description: 'Dive into San Diego\'s trendiest neighborhood with craft breweries, vintage shops, street art, and the best local eats in the city.',
    heroImage: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=1920&q=80',
    highlights: [
      'Craft brewery scene',
      'Vibrant street art and murals',
      'Vintage and thrift shopping',
      'Local coffee roasters',
      'Live music venues',
      'Farmers market on Thursdays'
    ],
    quickFacts: {
      walkingTime: '45-90 minutes',
      difficulty: 'Easy',
      bestTime: 'Evenings and weekends for full experience',
      parking: 'Street parking, some metered areas',
      publicTransit: 'Bus routes along 30th Street',
      kidFriendly: false
    },
    seoKeywords: ['North Park brewery tour', 'hipster neighborhood', 'craft beer', 'street art', 'local culture'],
    rating: 4.6,
    reviews: 98,
    featured: false
  },
  {
    id: 'ocean-beach',
    name: 'Ocean Beach',
    title: 'Bohemian Vibes',
    description: 'Experience the laid-back beach culture with a famous pier, eclectic shops, and some of the best sunset views in San Diego.',
    heroImage: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=1920&q=80',
    highlights: [
      'Ocean Beach Pier (longest on West Coast)',
      'Sunset Cliffs Natural Park',
      'Newport Avenue shopping',
      'Dog Beach (off-leash area)',
      'Wednesday farmers market',
      'Bohemian culture and art'
    ],
    quickFacts: {
      walkingTime: '30-60 minutes',
      difficulty: 'Easy',
      bestTime: 'Sunset for pier and cliffs',
      parking: 'Limited beach parking, arrive early',
      publicTransit: 'Bus Route 35 from downtown',
      kidFriendly: true
    },
    seoKeywords: ['Ocean Beach pier', 'Sunset Cliffs', 'beach culture', 'dog beach', 'sunset walks'],
    rating: 4.5,
    reviews: 142,
    featured: false
  },
  {
    id: 'little-italy',
    name: 'Little Italy',
    title: 'Mediterranean Flair',
    description: 'Savor authentic Italian culture in this waterfront district with harbor views, Saturday farmers market, and some of the best Italian cuisine on the West Coast.',
    heroImage: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=1920&q=80',
    highlights: [
      'Saturday Mercato farmers market',
      'Authentic Italian restaurants',
      'Waterfront harbor views',
      'Contemporary art galleries',
      'Italian cultural festivals',
      'Trolley connection to downtown'
    ],
    quickFacts: {
      walkingTime: '40-75 minutes',
      difficulty: 'Easy',
      bestTime: 'Saturday mornings for market',
      parking: 'Street parking and lots available',
      publicTransit: 'Trolley Blue Line or bus routes',
      kidFriendly: true
    },
    seoKeywords: ['Little Italy San Diego', 'Italian food', 'farmers market', 'harbor views', 'waterfront'],
    rating: 4.7,
    reviews: 189,
    featured: false
  }
]

export function getNeighborhoodById(id: string): Neighborhood | undefined {
  return neighborhoods.find(n => n.id === id)
}

export function getFeaturedNeighborhoods(): Neighborhood[] {
  return neighborhoods.filter(n => n.featured)
}

export function getRelatedNeighborhoods(currentId: string, limit: number = 3): Neighborhood[] {
  return neighborhoods
    .filter(n => n.id !== currentId)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}