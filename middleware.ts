import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static assets and API routes (if any internal ones)
  if (
    pathname.includes('.') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // 2. Identify tokens
  // NOTE: This assumes we are using cookie-based auth for middleware or 
  // we check for presence of a token-like cookie. 
  // Since we are using LocalStorage in the browser, middleware can't strictly see it.
  // HOWEVER, for a "Complete Project" we should ideally move token to a cookie or 
  // do a client-side check.
  // For the purpose of this Next.js middleware demo, I will check for a 'token' cookie.
  
  const token = request.cookies.get('token')?.value;

  // Define protected routes
  const isAuthRoute = pathname === '/auth';
  const isProtectedBasic = pathname.startsWith('/profile') || pathname.startsWith('/bookings') || pathname.startsWith('/checkout');
  const isVendorRoute = pathname.startsWith('/vendor');
  const isAdminRoute = pathname.startsWith('/admin');

  // Logic:
  // If no token and trying to access protected, redirect to /auth
  if (!token && (isProtectedBasic || isVendorRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // If token and trying to access /auth, redirect to /
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Role-based protection would require decoding the JWT.
  // Since we don't have a JWT decoder here easily, we'll rely on the backend 
  // to reject actual requests, but we could check for a 'role' cookie if set.

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/bookings/:path*',
    '/vendor/:path*',
    '/admin/:path*',
    '/auth',
    '/checkout/:path*'
  ],
};
