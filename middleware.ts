import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes
const protectedRoutes = ['/dashboard', '/admin', '/explore', '/neighborhoods', '/tours', '/experiences']
const authRoutes = ['/admin/login']

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path starts with any protected route
  const isProtectedRoute = protectedRoutes.some(route =>
    path.startsWith(route)
  )

  // Skip protection for admin login page
  if (authRoutes.includes(path)) {
    return NextResponse.next()
  }

  // Check authentication from cookies (we'll set this after login)
  const isAuthenticated = request.cookies.get('adminAuth')?.value === 'true'

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
}