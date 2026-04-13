import { NextRequest, NextResponse } from "next/server";
import { logPageView } from "@/lib/server-analytics";

// ---------------------------------------------------------------------------
// In-memory sliding window rate limiter
// Works for single-instance deployments (e.g., Lightsail with `next start`).
// For multi-instance / edge deployments, replace with @upstash/ratelimit.
// ---------------------------------------------------------------------------

interface WindowEntry {
  timestamps: number[];
}

// Module-level Map persists across requests within the same process.
const store = new Map<string, WindowEntry>();

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Sliding window check.
 * @returns allowed, remaining count, and reset time (Unix seconds).
 */
function slidingWindow(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const windowStart = now - windowMs;

  let entry = store.get(key);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(key, entry);
  }

  // Evict timestamps outside the current window
  entry.timestamps = entry.timestamps.filter((ts) => ts > windowStart);

  // Reset is the moment the oldest request in this window expires
  const oldestTs = entry.timestamps[0];
  const reset = oldestTs
    ? Math.ceil((oldestTs + windowMs) / 1000)
    : Math.ceil((now + windowMs) / 1000);

  if (entry.timestamps.length >= limit) {
    return { allowed: false, remaining: 0, reset };
  }

  entry.timestamps.push(now);
  const remaining = limit - entry.timestamps.length;
  return { allowed: true, remaining, reset };
}

// ---------------------------------------------------------------------------
// Rate-limit configuration
// ---------------------------------------------------------------------------

const RATE_LIMIT_ROUTES: Array<{ prefix: string; limit: number }> = [
  { prefix: "/api/public/", limit: 30 },
  { prefix: "/api/chat/", limit: 20 },
];

const WINDOW_MS = 60 * 1000; // 1 minute

// ---------------------------------------------------------------------------
// Proxy (renamed from middleware in Next.js 16)
// ---------------------------------------------------------------------------

export function proxy(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;

  // --- Deferred page view logging (read headers before deferring) ---
  const userAgent = req.headers.get("user-agent") ?? "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "0.0.0.0";
  const referrer = req.headers.get("referer") ?? "";
  logPageView({ path: pathname, userAgent, ip, referrer, timestamp: new Date().toISOString() });

  // --- Rate limiting (API routes only) ---
  const route = RATE_LIMIT_ROUTES.find((r) => pathname.startsWith(r.prefix));

  if (route) {
    const ip = getIp(req);
    const key = `${route.prefix}${ip}`;
    const { allowed, remaining, reset } = slidingWindow(key, route.limit, WINDOW_MS);

    const rateLimitHeaders: Record<string, string> = {
      "X-RateLimit-Limit": route.limit.toString(),
      "X-RateLimit-Remaining": remaining.toString(),
      "X-RateLimit-Reset": reset.toString(),
    };

    if (!allowed) {
      const retryAfter = (reset - Math.floor(Date.now() / 1000)).toString();
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "Content-Type": "text/plain",
          "X-Content-Type-Options": "nosniff",
          "Retry-After": retryAfter,
          ...rateLimitHeaders,
          "X-RateLimit-Remaining": "0",
        },
      });
    }

    const res = NextResponse.next();
    for (const [k, v] of Object.entries(rateLimitHeaders)) {
      res.headers.set(k, v);
    }
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files, images, and Next.js internals
    {
      source: "/((?!_next/static|_next/image|favicon\\.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
