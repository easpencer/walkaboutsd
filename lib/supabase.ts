import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl !== 'https://placeholder.supabase.co' &&
    supabaseAnonKey !== 'placeholder-key'
  )
}

// Database types (we'll generate these from Supabase later)
export type Neighborhood = {
  id: string
  name: string
  slug: string
  description: string
  short_description?: string
  image_url: string
  location: {
    lat: number
    lng: number
  }
  highlights: string[]
  stats?: {
    walks: number
    restaurants: number
    attractions: number
  }
  featured: boolean
  created_at: string
  updated_at: string
}

export type Walk = {
  id: string
  title: string
  neighborhood_id: string
  description: string
  duration_minutes: number
  distance_miles: number
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  price_usd: number
  featured: boolean
  image_url: string
  rating?: number
  review_count?: number
  highlights: string[]
  waypoints: any[]
  created_at: string
  updated_at: string
}

export type Tour = {
  id: string
  title: string
  description: string
  duration: string
  price: {
    individual: number
    couple: number
    group: number
  }
  included: string[]
  image_url: string
  category: string
  featured: boolean
  created_at: string
  updated_at: string
}

export type Experience = {
  id: string
  title: string
  subtitle?: string
  description: string
  type: 'walkabout' | 'package' | 'adventure' | 'immersive'
  duration: string
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  price: {
    individual: number
    couple?: number
    group?: number
    commission?: number
  }
  group_size: {
    min: number
    max: number
  }
  includes: string[]
  image_url: string
  rating?: number
  review_count?: number
  featured: boolean
  created_at: string
  updated_at: string
}