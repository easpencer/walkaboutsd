export interface InstagramPost {
  id: string
  caption: string
  media_url: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  thumbnail_url?: string
  permalink: string
  timestamp: string
  like_count?: number
  comments_count?: number
  hashtags: string[]
  location?: {
    name: string
    coordinates?: [number, number]
  }
  user_tags?: string[]
  engagement_rate?: number
}

export interface HashtagData {
  tag: string
  count: number
  posts: InstagramPost[]
  trending: boolean
  category: 'neighborhood' | 'activity' | 'food' | 'experience' | 'general'
  relatedExperiences?: string[] // Experience IDs
  color: string
}

// Instagram API Configuration
export const instagramConfig = {
  accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
  userId: process.env.INSTAGRAM_USER_ID,
  fields: 'id,caption,media_url,media_type,thumbnail_url,permalink,timestamp,like_count,comments_count',
  apiUrl: 'https://graph.instagram.com/v18.0',
  webhookUrl: process.env.INSTAGRAM_WEBHOOK_URL,
  refreshInterval: 30 * 60 * 1000, // 30 minutes
}

// Hashtag mapping for organizing content
export const hashtagCategories = {
  neighborhoods: [
    '#lajolla',
    '#balboapark',
    '#gaslampquarter',
    '#northpark',
    '#oceanbeach',
    '#littleitaly',
    '#coronado',
    '#pointloma',
    '#hillcrest',
    '#missionbeach'
  ],
  activities: [
    '#walkingtrour',
    '#walkaboutsd',
    '#beachwalks',
    '#hiking',
    '#bikeandwalk',
    '#sunsetwalks',
    '#dogwalks',
    '#familywalks',
    '#groupwalks',
    '#solotravel'
  ],
  food: [
    '#sandiegofood',
    '#walkandeat',
    '#coffeewalks',
    '#happyhour',
    '#brunch',
    '#localfood',
    '#sandiegoeats',
    '#foodie',
    '#craftbeer',
    '#tacotuesday'
  ],
  experiences: [
    '#sandiegoexperience',
    '#luxurytravel',
    '#walkaboutexperience',
    '#culturalwalk',
    '#nightlife',
    '#datenight',
    '#weekendvibes',
    '#vacationmode',
    '#exploresandiego',
    '#visitsd'
  ]
}

// Sample Instagram data (this would come from the API)
export const mockInstagramPosts: InstagramPost[] = [
  {
    id: '18123456789012345',
    caption: 'Perfect sunset walk along the cliffs of La Jolla! 🌅 Nothing beats the golden hour views and sea lion spotting. Who else loves these peaceful evening strolls? #lajolla #sunsetwalks #walkaboutsd #sandiegovibes #coastalwalks #sealisonsofinstagram',
    media_url: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?w=800&q=80',
    media_type: 'IMAGE',
    permalink: 'https://www.instagram.com/p/ABC123/',
    timestamp: '2024-03-28T18:30:00+0000',
    like_count: 342,
    comments_count: 28,
    hashtags: ['#lajolla', '#sunsetwalks', '#walkaboutsd', '#sandiegovibes', '#coastalwalks'],
    location: {
      name: 'Sunset Cliffs, La Jolla',
      coordinates: [32.8508, -117.2713]
    },
    engagement_rate: 8.2
  },
  {
    id: '18123456789012346',
    caption: 'Discovered the most amazing coffee shop during our North Park walking tour! ☕️ The murals, the local vibe, the perfect cortado - this is what neighborhood exploration is all about. #northpark #coffeewalks #sandiegocoffee #walkaboutsd #localbusiness #streetart',
    media_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    media_type: 'IMAGE',
    permalink: 'https://www.instagram.com/p/ABC124/',
    timestamp: '2024-03-28T10:15:00+0000',
    like_count: 189,
    comments_count: 15,
    hashtags: ['#northpark', '#coffeewalks', '#sandiegocoffee', '#walkaboutsd', '#localbusiness', '#streetart'],
    location: {
      name: 'North Park, San Diego',
      coordinates: [32.7408, -117.1295]
    },
    engagement_rate: 6.7
  },
  {
    id: '18123456789012347',
    caption: 'Behind the scenes of our Gaslamp Quarter food tour! 🥂 From rooftop cocktails to hidden speakeasies, this night walk was incredible. Thank you to all our amazing restaurant partners! #gaslampquarter #sandiegofood #nightlife #walkaboutsd #partnership #behindthescenes',
    media_url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80',
    media_type: 'VIDEO',
    thumbnail_url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&q=80',
    permalink: 'https://www.instagram.com/p/ABC125/',
    timestamp: '2024-03-27T21:45:00+0000',
    like_count: 567,
    comments_count: 43,
    hashtags: ['#gaslampquarter', '#sandiegofood', '#nightlife', '#walkaboutsd', '#partnership'],
    location: {
      name: 'Gaslamp Quarter, San Diego',
      coordinates: [32.7081, -117.1598]
    },
    engagement_rate: 11.3
  },
  {
    id: '18123456789012348',
    caption: 'Family fun at Balboa Park! 👨‍👩‍👧‍👦 Our family-friendly walks are designed for all ages. Museums, gardens, playgrounds, and ice cream stops - what more could you ask for? #balboapark #familywalks #sandiegokids #walkaboutsd #museumwalks #familyfun',
    media_url: 'https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=800&q=80',
    media_type: 'CAROUSEL_ALBUM',
    permalink: 'https://www.instagram.com/p/ABC126/',
    timestamp: '2024-03-27T14:20:00+0000',
    like_count: 234,
    comments_count: 31,
    hashtags: ['#balboapark', '#familywalks', '#sandiegokids', '#walkaboutsd', '#museumwalks', '#familyfun'],
    location: {
      name: 'Balboa Park, San Diego',
      coordinates: [32.7316, -117.1511]
    },
    engagement_rate: 7.9
  },
  {
    id: '18123456789012349',
    caption: 'Early morning beach walk with the pups! 🐕 Dog-friendly routes are some of our most popular. Ocean Beach off-leash area followed by coffee and treats for both humans and dogs! #dogwalks #oceanbeach #dogfriendly #walkaboutsd #dogsofinstagram #beachwalks',
    media_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
    media_type: 'IMAGE',
    permalink: 'https://www.instagram.com/p/ABC127/',
    timestamp: '2024-03-27T08:30:00+0000',
    like_count: 445,
    comments_count: 52,
    hashtags: ['#dogwalks', '#oceanbeach', '#dogfriendly', '#walkaboutsd', '#dogsofinstagram', '#beachwalks'],
    location: {
      name: 'Ocean Beach Dog Beach',
      coordinates: [32.7503, -117.2511]
    },
    engagement_rate: 9.8
  },
  {
    id: '18123456789012350',
    caption: 'Luxury experience alert! ✨ Our La Jolla premium package includes breakfast at Brockton Villa, private tide pool tour, lunch at Georges, and sunset cocktails. This is how you do San Diego in style! #luxurytravel #lajolla #walkaboutexperience #sandiegoluxury #oceanview',
    media_url: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&q=80',
    media_type: 'IMAGE',
    permalink: 'https://www.instagram.com/p/ABC128/',
    timestamp: '2024-03-26T16:45:00+0000',
    like_count: 678,
    comments_count: 89,
    hashtags: ['#luxurytravel', '#lajolla', '#walkaboutexperience', '#sandiegoluxury', '#oceanview'],
    location: {
      name: 'La Jolla Cove',
      coordinates: [32.8508, -117.2713]
    },
    engagement_rate: 12.1
  }
]

// Organize hashtags by category with counts and metadata
export const processHashtagData = (posts: InstagramPost[]): HashtagData[] => {
  const hashtagMap = new Map<string, HashtagData>()

  // Initialize categories
  Object.entries(hashtagCategories).forEach(([category, tags]) => {
    tags.forEach(tag => {
      hashtagMap.set(tag, {
        tag,
        count: 0,
        posts: [],
        trending: false,
        category: category as any,
        relatedExperiences: [],
        color: getCategoryColor(category)
      })
    })
  })

  // Process posts and count hashtags
  posts.forEach(post => {
    post.hashtags.forEach(hashtag => {
      const existing = hashtagMap.get(hashtag)
      if (existing) {
        existing.count++
        existing.posts.push(post)
      } else {
        // New hashtag not in our categories
        hashtagMap.set(hashtag, {
          tag: hashtag,
          count: 1,
          posts: [post],
          trending: false,
          category: 'general',
          color: '#6b7280'
        })
      }
    })
  })

  // Mark trending hashtags (top 20% by engagement)
  const sorted = Array.from(hashtagMap.values()).sort((a, b) => {
    const aEngagement = a.posts.reduce((sum, p) => sum + (p.engagement_rate || 0), 0)
    const bEngagement = b.posts.reduce((sum, p) => sum + (p.engagement_rate || 0), 0)
    return bEngagement - aEngagement
  })

  const trendingThreshold = Math.ceil(sorted.length * 0.2)
  sorted.slice(0, trendingThreshold).forEach(hashtag => {
    hashtag.trending = true
  })

  return sorted
}

function getCategoryColor(category: string): string {
  const colors = {
    neighborhoods: '#3b82f6', // blue
    activities: '#10b981',    // emerald
    food: '#f59e0b',         // amber
    experiences: '#8b5cf6',   // violet
    general: '#6b7280'       // gray
  }
  return colors[category as keyof typeof colors] || colors.general
}

// Instagram API integration functions
export class InstagramService {
  private accessToken: string
  private userId: string

  constructor() {
    this.accessToken = instagramConfig.accessToken || ''
    this.userId = instagramConfig.userId || ''
  }

  async fetchRecentPosts(limit: number = 25): Promise<InstagramPost[]> {
    try {
      const url = `${instagramConfig.apiUrl}/${this.userId}/media?fields=${instagramConfig.fields}&limit=${limit}&access_token=${this.accessToken}`

      const response = await fetch(url)
      const data = await response.json()

      if (data.error) {
        throw new Error(`Instagram API Error: ${data.error.message}`)
      }

      return data.data.map((post: any) => this.processPost(post))
    } catch (error) {
      console.error('Error fetching Instagram posts:', error)
      // Return mock data in development
      return mockInstagramPosts
    }
  }

  async fetchPostsByHashtag(hashtag: string, limit: number = 10): Promise<InstagramPost[]> {
    // Note: Instagram Basic Display API doesn't support hashtag search
    // This would require Instagram Graph API with business account
    const allPosts = await this.fetchRecentPosts(50)
    return allPosts
      .filter(post => post.hashtags.includes(hashtag))
      .slice(0, limit)
  }

  private processPost(rawPost: any): InstagramPost {
    const caption = rawPost.caption || ''
    const hashtags = this.extractHashtags(caption)

    return {
      id: rawPost.id,
      caption: caption,
      media_url: rawPost.media_url,
      media_type: rawPost.media_type,
      thumbnail_url: rawPost.thumbnail_url,
      permalink: rawPost.permalink,
      timestamp: rawPost.timestamp,
      like_count: rawPost.like_count,
      comments_count: rawPost.comments_count,
      hashtags: hashtags,
      engagement_rate: this.calculateEngagementRate(rawPost)
    }
  }

  private extractHashtags(caption: string): string[] {
    const hashtagRegex = /#[a-zA-Z0-9_]+/g
    const matches = caption.match(hashtagRegex)
    return matches ? matches.map(tag => tag.toLowerCase()) : []
  }

  private calculateEngagementRate(post: any): number {
    // Simple engagement rate calculation
    // In real implementation, you'd need follower count
    const likes = post.like_count || 0
    const comments = post.comments_count || 0
    const totalEngagement = likes + (comments * 3) // Weight comments more

    // Assume average follower engagement for calculation
    const estimatedReach = 1000 // This would be actual follower count
    return (totalEngagement / estimatedReach) * 100
  }
}

// Experience mapping based on hashtags
export const mapHashtagsToExperiences = (hashtags: string[]): string[] => {
  const experienceMap = {
    '#lajolla': ['la-jolla-luxury-day'],
    '#gaslampquarter': ['gaslamp-nightlife-adventure'],
    '#balboapark': ['balboa-culture-immersion'],
    '#luxurytravel': ['la-jolla-luxury-day'],
    '#nightlife': ['gaslamp-nightlife-adventure'],
    '#familywalks': ['balboa-culture-immersion'],
    '#dogwalks': [], // Would map to dog-friendly experiences
    '#coffeewalks': [], // Would map to coffee tour experiences
  }

  const experiences: string[] = []
  hashtags.forEach(tag => {
    const mapped = experienceMap[tag as keyof typeof experienceMap]
    if (mapped) {
      experiences.push(...mapped)
    }
  })

  return [...new Set(experiences)] // Remove duplicates
}