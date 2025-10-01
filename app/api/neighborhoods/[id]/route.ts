import { NextResponse } from 'next/server'
import { neighborhoods } from '@/data/neighborhoods'

// GET single neighborhood
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const neighborhood = neighborhoods.find(n => n.id === params.id)

    if (!neighborhood) {
      return NextResponse.json({
        success: false,
        error: 'Neighborhood not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: neighborhood
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch neighborhood'
    }, { status: 500 })
  }
}

// PUT update neighborhood
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // In production, this would update in Supabase
    const updatedNeighborhood = {
      ...body,
      id: params.id
    }

    return NextResponse.json({
      success: true,
      data: updatedNeighborhood,
      message: 'Neighborhood updated successfully (in-memory only - connect Supabase to persist)'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to update neighborhood'
    }, { status: 500 })
  }
}

// DELETE neighborhood
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    return NextResponse.json({
      success: true,
      message: 'Neighborhood deleted successfully (in-memory only - connect Supabase to persist)'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to delete neighborhood'
    }, { status: 500 })
  }
}
