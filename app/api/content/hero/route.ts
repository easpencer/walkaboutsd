import { NextResponse } from 'next/server'

// In-memory storage for demo (replace with Supabase when configured)
let heroContent = [
  {
    id: 'main',
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    title: 'Discover San Diego',
    subtitle: 'One Step at a Time',
    description: "Experience the magic of America's Finest City through immersive walking adventures"
  },
  {
    id: 'sunset-cliffs',
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1920&q=80',
    title: 'Sunset Cliffs Natural Park',
    subtitle: 'Dramatic Coastal Bluffs',
    description: 'Walk the rugged clifftops of Point Loma where surfers chase perfect waves below golden sandstone formations'
  },
  {
    id: 'la-jolla-cove',
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c7e?w=1920&q=80',
    title: 'La Jolla Cove Marine Sanctuary',
    subtitle: 'California Sea Lions & Snorkeling',
    description: 'Meet playful sea lions, explore crystal-clear tide pools, and snorkel in this protected marine reserve'
  },
  {
    id: 'balboa-park',
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1580785788792-0e2e3b5c9c0d?w=1920&q=80',
    title: 'Balboa Park Cultural District',
    subtitle: '17 Museums & Spanish Colonial Architecture',
    description: "America's largest urban cultural park featuring world-renowned museums, botanical gardens, and the famous San Diego Zoo"
  },
  {
    id: 'gaslamp-quarter',
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=1920&q=80',
    title: 'Historic Gaslamp Quarter',
    subtitle: '16 Blocks of Victorian Heritage',
    description: "Explore preserved 19th-century architecture, rooftop bars, craft breweries, and award-winning restaurants in downtown's entertainment heart"
  },
  {
    id: 'coronado-beach',
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1920&q=80',
    title: 'Coronado Beach Promenade',
    subtitle: 'Hotel del Coronado & Golden Sand',
    description: 'Walk along one of America\'s best beaches past the iconic Victorian Hotel del Coronado, where Marilyn Monroe filmed "Some Like It Hot"'
  }
]

// Check if user is authenticated from request headers
function isAuthenticated(request: Request) {
  const cookie = request.headers.get('cookie')
  return cookie?.includes('adminAuth=true') || false
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: heroContent
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hero content' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const newSlide = {
      ...body,
      id: body.id || `slide-${Date.now()}`
    }

    heroContent.push(newSlide)

    return NextResponse.json({
      success: true,
      data: newSlide
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create hero slide' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { id, ...updates } = body

    const index = heroContent.findIndex(slide => slide.id === id)
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Slide not found' },
        { status: 404 }
      )
    }

    heroContent[index] = { ...heroContent[index], ...updates }

    return NextResponse.json({
      success: true,
      data: heroContent[index]
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update hero slide' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Slide ID required' },
        { status: 400 }
      )
    }

    const index = heroContent.findIndex(slide => slide.id === id)
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Slide not found' },
        { status: 404 }
      )
    }

    heroContent.splice(index, 1)

    return NextResponse.json({
      success: true,
      message: 'Slide deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete hero slide' },
      { status: 500 }
    )
  }
}