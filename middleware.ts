import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { getToken } from 'next-auth/jwt';

// Initialize next-intl middleware
const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  const { pathname, search, origin } = req.nextUrl;

  // Run next-intl middleware for localization
  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }

  // Check authentication for protected routes
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Identify if the path is a protected dashboard route
  const isDashboardRoute = pathname.match(/^\/(vi|en)\/dashboard/);

  if (isDashboardRoute && !token) {
    const loginUrl = new URL('/', origin);
    loginUrl.search = search; // Preserve query parameters if any
    return NextResponse.redirect(loginUrl);
  }

  // Proceed with the request
  return NextResponse.next();
}

// Matcher for localized and protected routes
export const config = {
  matcher: [
    '/',                      // Match home page
    '/(vi|en)/:path*',        // Match all localized paths
  ],
};
