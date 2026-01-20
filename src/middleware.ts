import { auth } from '../auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const { pathname } = req.nextUrl;
  
  
  // 로그인 페이지는 누구나 접근 가능
  if (pathname.startsWith('/login')) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
    return NextResponse.next();
  }
  
  // 그 외 모든 페이지는 로그인 필요
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
  
  return NextResponse.next();
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};