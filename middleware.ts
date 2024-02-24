import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = Boolean(token?.accessToken);
  const canAccessThisApp =
    token?.appKey === process.env.APP_KEY ||
    token?.appKey === process.env.ADMIN_APP_KEY;

  if (isAuthenticated && canAccessThisApp) {
    if (
      req.nextUrl.pathname.startsWith('/auth/signin') ||
      req.nextUrl.pathname.startsWith('/auth/signup')
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (
      req.nextUrl.pathname.startsWith('/admin') &&
      token?.user?.role !== 'administrator'
    ) {
      // Sent to 404
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
