import { NextResponse } from 'next/server'
import { neighborhoods } from '@/data/neighborhoods'

// GET all neighborhoods
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: neighborhoods
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch neighborhoods'
    }, { status: 500 })
  }
}

// POST create new neighborhood
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // In production, this would save to Supabase
    // For now, we'll return success with the data
    const newNeighborhood = {
      id: body.id || `neighborhood-${Date.now()}`,
      ...body,
      rating: body.rating || 0,
      reviews: body.reviews || 0,
      featured: body.featured || false
    }

    return NextResponse.json({
      success: true,
      data: newNeighborhood,
      message: 'Neighborhood created successfully (in-memory only - connect Supabase to persist)'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to create neighborhood'
    }, { status: 500 })
  }
}
