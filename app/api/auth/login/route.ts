import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, loginMethod, username } = body

    let authenticated = false
    let userData: any = null

    if (loginMethod === 'credentials') {
      // Superadmin credentials check
      if (email === 'admin@walkaboutsd.com' && password === 'WalkSD2024!') {
        authenticated = true
        userData = {
          email: 'admin@walkaboutsd.com',
          name: 'Super Admin',
          role: 'superadmin',
          loginMethod: 'credentials'
        }
      }
    } else if (loginMethod === 'instagram') {
      // Only Danielle Berkely can login via Instagram
      if (username === 'walkaboutsd') {
        authenticated = true
        userData = {
          username: 'walkaboutsd',
          name: 'Danielle Berkely',
          email: 'DSBerkley@gmail.com',
          role: 'owner',
          loginMethod: 'instagram',
          verified: true
        }
      }
    }

    if (authenticated && userData) {
      // Set authentication cookie
      cookies().set('adminAuth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })

      cookies().set('adminUser', JSON.stringify(userData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })

      return NextResponse.json({
        success: true,
        user: userData
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid credentials'
    }, { status: 401 })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function DELETE() {
  // Logout endpoint
  cookies().delete('adminAuth')
  cookies().delete('adminUser')

  return NextResponse.json({ success: true })
}