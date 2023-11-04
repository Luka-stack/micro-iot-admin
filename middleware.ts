import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = Boolean(token?.accessToken);

  if (isAuthenticated) {
    if (
      req.nextUrl.pathname.startsWith('/auth/signin') ||
      req.nextUrl.pathname.startsWith('/auth/signup')
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else if (req.nextUrl.pathname.startsWith('/auth/signup')) {
    return NextResponse.next();
  }

  const authMiddleware = await withAuth({
    pages: {
      signIn: `/auth/signin`,
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}
