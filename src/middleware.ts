import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: Request) {
  // Extract the pathname from the request URL
  const { pathname } = new URL(req.url);

  // Define the protected routes
  const protectedRoutes = ['/dashboard', '/profile']; // Add all protected paths here

  // If the pathname is not in protected routes, allow the request
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get the token using the NextAuth secret
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If token exists, allow the request
  if (token) {
    return NextResponse.next();
  }

  // If no token is found, redirect to the sign-in page
  return NextResponse.redirect(new URL('/sign-in', req.url));
}

// Apply middleware to all routes
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // Add all protected paths here
};
