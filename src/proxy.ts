import { NextResponse, NextRequest } from 'next/server';
import { decrypt } from '@/app/lib/session';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = url;

  // Allow login page and public routes
  if (pathname.startsWith('/admin') && pathname !== '/admin' && pathname !== '/admin/login') {
    const token = request.cookies.get('session')?.value;
    const payload = await decrypt(token);
    if (!payload) {
      // Not authenticated → redirect to login page (public login at /login)
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  // For /admin root, also protect
  if (pathname === '/admin') {
    const token = request.cookies.get('session')?.value;
    const payload = await decrypt(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
};
