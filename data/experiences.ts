export interface Experience {
  id: string
  title: string
  subtitle: string
  description: string
  type: 'walkabout' | 'package' | 'adventure' | 'immersive'
  duration: string
  totalTime: number // minutes
  price: {
    individual: number
    couple: number
    group: number
    commission: number // our commission percentage
  }
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  groupSize: {
    min: number
    max: number
  }
  image: string
  gallery: string[]
  includes: string[]
  itinerary: ItineraryItem[]
  transportation: TransportOption[]
  bookings: BookingIntegration[]
  cancellation: {
    policy: string
    deadline: number // hours before
  }
  seasonality: string[]
  tags: string[]
  rating: number
  reviewCount: number
  featured: boolean
  revenue: {
    commission: number
    partnerRevenue: number
    platformFee: number
  }
}

export interface ItineraryItem {
  id: string
  time: string
  duration: number // minutes
  type: 'walk' | 'food' | 'activity' | 'transport' | 'accommodation' | 'entertainment'
  title: string
  description: string
  location: {
    name: string
    address: string
    coordinates: [number, number]
  }
  partner?: PartnerBusiness
  booking?: {
    required: boolean
    advanceNotice: number // hours
    cancellable: boolean
  }
  cost?: {
    amount: number
    commission: number
    included: boolean
  }
  alternatives?: string[] // backup options
}

export interface TransportOption {
  type: 'walk' | 'trolley' | 'bike' | 'rideshare' | 'ferry' | 'train'
  duration: number
  cost: number
  provider?: string
  bookingUrl?: string
  included: boolean
}

export interface PartnerBusiness {
  id: string
  name: string
  type: 'restaurant' | 'cafe' | 'bar' | 'activity' | 'hotel' | 'theater' | 'museum' | 'speakeasy'
  rating: number
  priceLevel: 1 | 2 | 3 | 4
  commissionRate: number
  bookingIntegration: 'opentable' | 'resy' | 'direct' | 'api' | 'manual'
  specialOffers?: string[]
  walkaboutPerks?: string[]
}

export interface BookingIntegration {
  type: 'accommodation' | 'restaurant' | 'activity' | 'transportation' | 'entertainment'
  provider: string
  apiKey?: string
  commissionRate: number
  bookingUrl?: string
}

// Sample Experiences Data
export const experiences: Experience[] = [
  {
    id: 'la-jolla-luxury-day',
    title: 'La Jolla Luxury WalkAbout',
    subtitle: 'Coastal Elegance with Fine Dining',
    description: 'A full day of coastal walking, luxury shopping, fine dining, and sunset cocktails in La Jolla\'s most exclusive spots.',
    type: 'package',
    duration: 'Full Day (8 hours)',
    totalTime: 480,
    price: {
      individual: 299,
      couple: 549,
      group: 199, // per person for 4+
      commission: 25
    },
    difficulty: 'Easy',
    groupSize: { min: 1, max: 8 },
    image: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      'https://images.unsplash.com/photo-1520942702018-0862200e6873?w=800&q=80'
    ],
    includes: [
      'Professional local guide',
      'Welcome breakfast at Brockton Villa',
      'Reserved lunch at George\'s at the Cove',
      'Private tide pool tour',
      'Sunset cocktails at Marine Room',
      'Transportation between locations',
      'Exclusive shopping discounts'
    ],
    itinerary: [
      {
        id: 'breakfast',
        time: '9:00 AM',
        duration: 60,
        type: 'food',
        title: 'Welcome Breakfast',
        description: 'Start with ocean-view breakfast and local coffee',
        location: {
          name: 'Brockton Villa Restaurant',
          address: '1235 Coast Blvd, La Jolla, CA 92037',
          coordinates: [32.8508, -117.2713]
        },
        partner: {
          id: 'brockton-villa',
          name: 'Brockton Villa Restaurant',
          type: 'restaurant',
          rating: 4.3,
          priceLevel: 3,
          commissionRate: 15,
          bookingIntegration: 'opentable',
          walkaboutPerks: ['Priority seating', '10% discount on additional items']
        },
        booking: {
          required: true,
          advanceNotice: 24,
          cancellable: true
        },
        cost: {
          amount: 45,
          commission: 7,
          included: true
        }
      },
      {
        id: 'coastal-walk',
        time: '10:00 AM',
        duration: 90,
        type: 'walk',
        title: 'Coastal Cliff Walk',
        description: 'Guided walk along dramatic coastline with sea lion viewing',
        location: {
          name: 'La Jolla Cove to Children\'s Pool',
          address: 'Coast Walk Trail, La Jolla, CA',
          coordinates: [32.8508, -117.2713]
        },
        cost: {
          amount: 0,
          commission: 0,
          included: true
        }
      },
      {
        id: 'shopping',
        time: '11:30 AM',
        duration: 60,
        type: 'activity',
        title: 'Luxury Shopping Experience',
        description: 'Curated shopping at boutiques with exclusive WalkAbout discounts',
        location: {
          name: 'Prospect Street Shopping District',
          address: 'Prospect St, La Jolla, CA 92037',
          coordinates: [32.8459, -117.2748]
        },
        cost: {
          amount: 0,
          commission: 10,
          included: false
        }
      },
      {
        id: 'lunch',
        time: '1:00 PM',
        duration: 120,
        type: 'food',
        title: 'Fine Dining Lunch',
        description: 'Award-winning oceanfront restaurant with panoramic views',
        location: {
          name: 'George\'s at the Cove',
          address: '1250 Prospect St, La Jolla, CA 92037',
          coordinates: [32.8459, -117.2748]
        },
        partner: {
          id: 'georges-cove',
          name: 'George\'s at the Cove',
          type: 'restaurant',
          rating: 4.6,
          priceLevel: 4,
          commissionRate: 20,
          bookingIntegration: 'resy',
          walkaboutPerks: ['Guaranteed ocean-view table', 'Complimentary appetizer']
        },
        booking: {
          required: true,
          advanceNotice: 48,
          cancellable: true
        },
        cost: {
          amount: 85,
          commission: 17,
          included: true
        }
      }
    ],
    transportation: [
      {
        type: 'walk',
        duration: 30,
        cost: 0,
        included: true
      },
      {
        type: 'rideshare',
        duration: 10,
        cost: 15,
        provider: 'Uber/Lyft',
        included: true
      }
    ],
    bookings: [
      {
        type: 'restaurant',
        provider: 'OpenTable',
        commissionRate: 15,
        bookingUrl: 'https://opentable.com/partner-api'
      },
      {
        type: 'activity',
        provider: 'GetYourGuide',
        commissionRate: 20,
        bookingUrl: 'https://getyourguide.com/affiliate'
      }
    ],
    cancellation: {
      policy: 'Free cancellation up to 24 hours before experience',
      deadline: 24
    },
    seasonality: ['year-round'],
    tags: ['luxury', 'food', 'coastal', 'shopping', 'couples', 'special-occasion'],
    rating: 4.8,
    reviewCount: 127,
    featured: true,
    revenue: {
      commission: 74.75, // 25% of 299
      partnerRevenue: 45.50, // from restaurant commissions
      platformFee: 15.00
    }
  },
  {
    id: 'gaslamp-nightlife-adventure',
    title: 'Gaslamp After Dark',
    subtitle: 'Speakeasies, Rooftops & Hidden Bars',
    description: 'An evening walking adventure through downtown\'s historic Gaslamp Quarter, featuring craft cocktails, hidden speakeasies, and rooftop views.',
    type: 'walkabout',
    duration: 'Evening (4 hours)',
    totalTime: 240,
    price: {
      individual: 149,
      couple: 279,
      group: 119,
      commission: 30
    },
    difficulty: 'Easy',
    groupSize: { min: 2, max: 12 },
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80',
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
      'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=800&q=80'
    ],
    includes: [
      'Expert nightlife guide',
      'Access to 4 exclusive venues',
      'Welcome cocktail at rooftop bar',
      'Speakeasy reservations',
      'Late-night food recommendations',
      'Group photos at iconic spots'
    ],
    itinerary: [
      {
        id: 'rooftop-start',
        time: '6:00 PM',
        duration: 45,
        type: 'entertainment',
        title: 'Rooftop Welcome Drinks',
        description: 'Start with sunset cocktails and city views',
        location: {
          name: 'Altitude Sky Lounge',
          address: '660 K St, San Diego, CA 92101',
          coordinates: [32.7157, -117.1611]
        },
        partner: {
          id: 'altitude-sky',
          name: 'Altitude Sky Lounge',
          type: 'bar',
          rating: 4.4,
          priceLevel: 3,
          commissionRate: 25,
          bookingIntegration: 'direct',
          walkaboutPerks: ['Reserved VIP section', 'Complimentary welcome cocktail']
        },
        cost: {
          amount: 18,
          commission: 4.50,
          included: true
        }
      },
      {
        id: 'historic-walk',
        time: '7:00 PM',
        duration: 30,
        type: 'walk',
        title: 'Historic Gaslamp Stroll',
        description: 'Walking tour of Victorian architecture and hidden stories',
        location: {
          name: 'Gaslamp Quarter Historic District',
          address: '5th Ave & Market St, San Diego, CA',
          coordinates: [32.7081, -117.1598]
        },
        cost: {
          amount: 0,
          commission: 0,
          included: true
        }
      },
      {
        id: 'speakeasy',
        time: '7:30 PM',
        duration: 60,
        type: 'entertainment',
        title: 'Hidden Speakeasy Experience',
        description: 'Secret entrance to prohibition-era style cocktail lounge',
        location: {
          name: 'Noble Experiment',
          address: '777 G St, San Diego, CA 92101',
          coordinates: [32.7142, -117.1594]
        },
        partner: {
          id: 'noble-experiment',
          name: 'Noble Experiment',
          type: 'speakeasy',
          rating: 4.7,
          priceLevel: 4,
          commissionRate: 20,
          bookingIntegration: 'direct',
          walkaboutPerks: ['Guaranteed reservations', 'Skip the line access']
        },
        booking: {
          required: true,
          advanceNotice: 48,
          cancellable: true
        },
        cost: {
          amount: 22,
          commission: 4.40,
          included: false
        }
      }
    ],
    transportation: [
      {
        type: 'walk',
        duration: 20,
        cost: 0,
        included: true
      },
      {
        type: 'trolley',
        duration: 15,
        cost: 5,
        provider: 'MTS Trolley',
        included: true
      }
    ],
    bookings: [
      {
        type: 'entertainment',
        provider: 'Eventbrite',
        commissionRate: 25,
        bookingUrl: 'https://eventbrite.com/api'
      }
    ],
    cancellation: {
      policy: 'Free cancellation up to 12 hours before experience',
      deadline: 12
    },
    seasonality: ['year-round'],
    tags: ['nightlife', 'bars', 'speakeasy', 'historic', 'couples', 'groups', 'adults-only'],
    rating: 4.9,
    reviewCount: 89,
    featured: true,
    revenue: {
      commission: 44.70,
      partnerRevenue: 25.80,
      platformFee: 10.00
    }
  },
  {
    id: 'balboa-culture-immersion',
    title: 'Balboa Park Cultural Immersion',
    subtitle: 'Museums, Gardens & Theater Package',
    description: 'A sophisticated day exploring world-class museums, botanical gardens, with reserved theater seating and gourmet dining.',
    type: 'immersive',
    duration: 'Full Day (7 hours)',
    totalTime: 420,
    price: {
      individual: 249,
      couple: 459,
      group: 189,
      commission: 22
    },
    difficulty: 'Easy',
    groupSize: { min: 1, max: 6 },
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
      'https://images.unsplash.com/photo-1591737772640-15070b9f1d33?w=800&q=80',
      'https://images.unsplash.com/photo-1594736797933-d0300d516701?w=800&q=80'
    ],
    includes: [
      'Skip-the-line museum passes',
      'Private botanical garden tour',
      'Lunch at Panama 66',
      'Reserved theater tickets',
      'Expert art & culture guide',
      'Transportation within park'
    ],
    itinerary: [
      {
        id: 'museum-morning',
        time: '10:00 AM',
        duration: 120,
        type: 'activity',
        title: 'San Diego Museum of Art',
        description: 'Guided tour of contemporary and classic collections',
        location: {
          name: 'San Diego Museum of Art',
          address: '1450 El Prado, San Diego, CA 92101',
          coordinates: [32.7316, -117.1511]
        },
        partner: {
          id: 'sdma',
          name: 'San Diego Museum of Art',
          type: 'museum',
          rating: 4.5,
          priceLevel: 2,
          commissionRate: 15,
          bookingIntegration: 'api',
          walkaboutPerks: ['Skip-the-line entry', 'Exclusive docent tour']
        },
        cost: {
          amount: 25,
          commission: 3.75,
          included: true
        }
      }
    ],
    transportation: [
      {
        type: 'walk',
        duration: 45,
        cost: 0,
        included: true
      },
      {
        type: 'trolley',
        duration: 20,
        cost: 5,
        provider: 'Balboa Park Tram',
        included: true
      }
    ],
    bookings: [
      {
        type: 'entertainment',
        provider: 'Old Globe Theatre',
        commissionRate: 18,
        bookingUrl: 'https://oldglobe.org/tickets'
      },
      {
        type: 'activity',
        provider: 'San Diego Museums',
        commissionRate: 15,
        bookingUrl: 'https://sandiegomuseums.org'
      }
    ],
    cancellation: {
      policy: 'Free cancellation up to 48 hours before experience',
      deadline: 48
    },
    seasonality: ['year-round'],
    tags: ['culture', 'museums', 'theater', 'gardens', 'educational', 'art', 'sophisticated'],
    rating: 4.7,
    reviewCount: 156,
    featured: false,
    revenue: {
      commission: 54.78,
      partnerRevenue: 32.50,
      platformFee: 12.00
    }
  }
]

// Revenue Models & Monetization Strategies
export const revenueStreams = {
  commissions: {
    restaurants: { rate: '15-25%', avgBooking: 75 },
    hotels: { rate: '8-15%', avgBooking: 200 },
    activities: { rate: '20-30%', avgBooking: 45 },
    transportation: { rate: '10-20%', avgBooking: 25 },
    entertainment: { rate: '15-25%', avgBooking: 60 }
  },
  platform: {
    bookingFee: { rate: '3-5%', perTransaction: true },
    premiumMembership: { price: 29.99, period: 'monthly' },
    corporatePackages: { starting: 2500, period: 'per event' }
  },
  partnerships: {
    exclusiveVenues: { rate: '30-40%', premium: true },
    brandSponsorship: { rate: 'variable', type: 'featured content' },
    dataInsights: { price: 'custom', type: 'business intelligence' }
  }
}