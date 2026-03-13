import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logPageView } from "@/lib/server-analytics";

// ---------------------------------------------------------------------------
// Middleware — deferred page view logging via after()
// ---------------------------------------------------------------------------
// Runs on every matched request. Reads headers synchronously, then defers
// the logging work to after() so it never adds latency to the response.
// ---------------------------------------------------------------------------

export function middleware(request: NextRequest) {
  // Read all request data BEFORE deferring — do not call headers() inside after()
  const path = request.nextUrl.pathname;
  const userAgent = request.headers.get("user-agent") ?? "";
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "0.0.0.0";
  const referrer = request.headers.get("referer") ?? "";
  const timestamp = new Date().toISOString();

  // Defer page view logging — runs after response is sent
  logPageView({ path, userAgent, ip, referrer, timestamp });

  return NextResponse.next();
}

// Only log page views for actual pages, not static assets or API routes
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon|images|icons|fonts|api|feed\\.xml|sitemap\\.xml|image-sitemap\\.xml|llms\\.txt|llms-full\\.txt|\\.well-known).*)",
  ],
};
