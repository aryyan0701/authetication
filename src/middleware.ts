import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Middleware Token:", token); // Debug token

  const isLoggedIn = !!token;
  const url = req.nextUrl.clone();

  if (req.nextUrl.pathname.startsWith('/sign-in') && isLoggedIn) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith('/dashboard') && !isLoggedIn) {
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
