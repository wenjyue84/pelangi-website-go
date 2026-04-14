/**
 * Next.js Middleware — Evaluates Vercel Feature Flags server-side.
 * Reads CTA variant flag and sets it in response headers for consumption by Server Components.
 * This ensures zero layout shift and no client-side hydration mismatch.
 */

import { NextRequest, NextResponse } from "next/server";
import { getVariant } from "@/lib/flags";

/**
 * Middleware that evaluates A/B test flags for feature flag-controlled pages.
 * Runs before route handlers and Server Components render.
 */
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Evaluate the CTA variant for the /book page
  if (request.nextUrl.pathname.startsWith("/book")) {
    const variant = await getVariant();

    // Pass variant to Server Components via response header
    response.headers.set("x-variant", variant);

    // Also set as cookie for client-side tracking (optional)
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
     * - favicon.ico (favicon file)
     * - public (public assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
