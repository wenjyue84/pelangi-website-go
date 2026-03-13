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
// CSP nonce generation
// ---------------------------------------------------------------------------

function buildCspHeader(nonce: string): string {
  const isDev = process.env.NODE_ENV === "development";

  const directives = [
    "default-src 'self'",
    // Nonce-based script-src with strict-dynamic; URL allowlists kept as fallback for older browsers
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""} https://admin.pelangicapsulehostel.com https://www.googletagmanager.com`,
    // Tailwind CSS-in-JS and Google Fonts stylesheet
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // Self-hosted next/font/google + external Google Fonts CDN fallback
    "font-src 'self' https://fonts.gstatic.com",
    // Images: self, data URIs, blob URLs, TripCdn (hotel photos), admin proxy
    "img-src 'self' blob: data: https://ak-d.tripcdn.com https://admin.pelangicapsulehostel.com https://img.youtube.com",
    // API calls: same-origin rewrites proxy to admin; admin also whitelisted for direct calls
    // Sentry DSN ingestion (error reporting); Google Analytics beacon endpoints
    "connect-src 'self' https://admin.pelangicapsulehostel.com https://*.sentry.io https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
    // Google Maps embeds + YouTube embeds
    "frame-src https://www.google.com https://www.youtube.com",
    // Disallow plugins (Flash etc.)
    "object-src 'none'",
    // Prevent base-tag injection attacks
    "base-uri 'self'",
    // Restrict who can embed this site in an iframe
    "frame-ancestors 'self'",
    // Upgrade any accidental HTTP sub-resource requests to HTTPS
    "upgrade-insecure-requests",
  ];

  // CSP violation reporting: routes violations to Sentry Security Issues.
  // Set SENTRY_CSP_REPORT_URI in environment variables.
  // Format: https://o<org>.ingest.sentry.io/api/<project>/security/?sentry_key=<key>
  // See: https://docs.sentry.io/product/security-policy-reporting/
  const reportUri = process.env.SENTRY_CSP_REPORT_URI;
  if (reportUri) {
    directives.push(`report-uri ${reportUri}`);
  }

  return directives.join("; ");
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

  // Generate a per-request cryptographic nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = buildCspHeader(nonce);

  // Forward the nonce to server components via a request header
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);

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

    const res = NextResponse.next({ request: { headers: requestHeaders } });
    res.headers.set("Content-Security-Policy", cspHeader);
    for (const [k, v] of Object.entries(rateLimitHeaders)) {
      res.headers.set(k, v);
    }
    return res;
  }

  // --- All other routes: set CSP nonce only ---
  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.headers.set("Content-Security-Policy", cspHeader);
  return res;
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
