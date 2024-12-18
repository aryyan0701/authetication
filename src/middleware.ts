import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: Request) {
  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    console.error("NEXTAUTH_SECRET is not defined. Check your .env.local file.");
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const { pathname } = new URL(req.url);

  const protectedRoutes = ['/dashboard', '/profile']; 

  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  try {
    const token = await getToken({ req, secret });

    if (token) {
      return NextResponse.next();
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
  }

  return NextResponse.redirect(new URL('/sign-in', req.url));
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], 
};
