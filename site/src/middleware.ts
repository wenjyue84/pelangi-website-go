/**
 * Next.js Middleware
 *
 * 1. WordPress legacy path cleanup — returns 410 Gone for all paths from the
 *    previous WordPress installation. 410 (vs 404) is the fastest signal to
 *    Google that a URL is permanently removed, accelerating de-indexing of
 *    spam/casino pages left over from the old WP site.
 *
 * 2. A/B test flag evaluation — reads the CTA variant flag for /book page
 *    and sets it in response headers for Server Components.
 */

import { NextRequest, NextResponse } from "next/server";
import { getVariant } from "@/lib/flags";

// All path prefixes that belonged to the old WordPress site.
// Any request matching these returns 410 Gone.
const WP_PATH_PREFIXES = [
  "/wp-admin",
  "/wp-content",
  "/wp-includes",
  "/wp-json",
  "/wp-login.php",
  "/wp-cron.php",
  "/xmlrpc.php",
  "/wp-signup.php",
  "/wp-activate.php",
];

// WordPress query params that identify old post/page/archive URLs
// e.g. /?p=123  /?page_id=456  /?cat=7  /?tag=casino
const WP_QUERY_PARAMS = ["p", "page_id", "cat", "tag", "author", "m", "feed", "paged", "s"];

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // --- 1. WordPress legacy paths → 410 Gone ---
  const isWpPath = WP_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );
  if (isWpPath) {
    return new NextResponse(null, {
      status: 410,
      statusText: "Gone",
      headers: { "X-Robots-Tag": "noindex" },
    });
  }

  // WordPress query-param style URLs (/?p=123, /?page_id=456, etc.)
  const isWpQueryUrl = WP_QUERY_PARAMS.some((param) => searchParams.has(param));
  if (isWpQueryUrl) {
    return new NextResponse(null, {
      status: 410,
      statusText: "Gone",
      headers: { "X-Robots-Tag": "noindex" },
    });
  }

  // --- 2. A/B test: CTA variant for /book page ---
  const response = NextResponse.next();

  if (pathname.startsWith("/book")) {
    const variant = await getVariant();
    response.headers.set("x-variant", variant);
    response.cookies.set("x-variant", variant, {
      httpOnly: false, // Allow client JS to read for GA4 tracking
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - public assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
