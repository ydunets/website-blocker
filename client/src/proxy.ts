import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_ROUTES } from "@/shared/constants/routes";

// Define public routes that don't require authentication
const publicRoutes = Object.values([AUTH_ROUTES.SIGN_IN, AUTH_ROUTES.SIGN_UP]);

// Define protected routes
const protectedRoutes = ['/']

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  )

  // Get session cookie (adjust cookie name based on your backend)
  const accessToken = request.cookies.get('access_token')


  console.log('Access Token:', accessToken?.value)

  // If trying to access protected route without session
  if (isProtectedRoute && !accessToken) {
    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // If authenticated user tries to access auth pages, redirect to home
  if (publicRoutes.includes(pathname) && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Configure which routes use this proxy
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
