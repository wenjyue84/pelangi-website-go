import { spawnSync } from "node:child_process";
import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import withSerwistInit from "@serwist/next";
import bundleAnalyzer from "@next/bundle-analyzer";

// Serwist: Service Worker for PWA offline fallback (US-121)
const revision = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout?.trim() ?? crypto.randomUUID();
const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  additionalPrecacheEntries: [{ url: "/~offline", revision }],
});

// Bundle analyzer — run with: ANALYZE=true npm run build
// Top 3 JS contributors (measured via ANALYZE=true build, 2026-03-13):
//   1. @sentry/nextjs  — ~120 KB gzip (error monitoring SDK; tree-shaken via disableLogger)
//   2. next (framework) — ~90 KB gzip (React runtime, router, hydration)
//   3. fuse.js          — ~11 KB gzip (fuzzy search on /search page; loaded lazily)
// Sentry tree-shaking: withSentryConfig({ disableLogger: true }) strips all debug/logger
// code from the client bundle — verified via ANALYZE treemap (no sentry/utils/logger node).
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // React Compiler: automatic memoization (top-level in Next.js 16)
  reactCompiler: true,
  // Cache Components: explicit opt-in caching via 'use cache' directive (US-192)
  // Replaces implicit caching; pages use cacheLife/cacheTag for fine-grained control
  cacheComponents: true,
  // Typed routes: stable as of Next.js 15.5 (US-153)
  typedRoutes: true,
  experimental: {
    // View Transitions API for animated soft-navigation between pages (US-126)
    // Enables useViewTransition() hook and viewTransition prop on <Link>
    viewTransition: true,
    // Control Client Router Cache TTLs (staleTimes are in seconds)
    staleTimes: {
      dynamic: 30,   // Dynamic pages: cache prefetched links for 30s
      static: 180,   // Static pages: cache prefetched links for 3 min
    },
    // Turbopack filesystem caching (US-160 initial, US-220 complete)
    // Persists compilation cache on disk between dev/build restarts for 50%+ faster cold starts
    turbopackFileSystemCacheForDev: true,
    turbopackFileSystemCacheForBuild: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(self)",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // CSP is now set per-request in proxy.ts (nonce-based policy)
        ],
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Next.js 16 changed qualities default to [75] — any <Image quality={n}>
    // not listed here is silently coerced to the nearest value. Declare all
    // quality tiers used across the codebase. (US-228)
    qualities: [75, 80, 85],
    // Next.js 16 increased minimumCacheTTL from 60s to 14400s (4h).
    // 1 hour is a good balance: long enough to avoid redundant re-optimisation
    // during traffic spikes, short enough to pick up image replacements
    // (e.g. updated room photos) within a reasonable window. (US-228)
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ak-d.tripcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  async rewrites() {
    const adminHost = "https://admin.pelangicapsulehostel.com";
    // In local dev, set RAINBOW_API_URL=http://localhost:3002 in .env.local
    const rainbowHost = process.env.RAINBOW_API_URL || adminHost;
    return [
      // Proxy the SPA shell (index.html) for the booking page
      { source: "/book", destination: `${adminHost}/book` },
      // Proxy Vite-built JS/CSS chunks (referenced as absolute /assets/ paths in index.html)
      { source: "/assets/:path*", destination: `${adminHost}/assets/:path*` },
      // Proxy the public booking API (availability check + form submission)
      { source: "/api/public/:path*", destination: `${adminHost}/api/public/:path*` },
      // Proxy Rainbow AI public chat API (webchat widget)
      { source: "/api/chat/:path*", destination: `${rainbowHost}/api/chat/:path*` },
    ];
  },
};

export default withSerwist(withBundleAnalyzer(withSentryConfig(nextConfig, {
  // Sentry organisation and project (set via SENTRY_ORG / SENTRY_PROJECT env vars,
  // or override here for CI). These are non-secret build-time values.
  silent: !process.env.CI, // Suppress output locally; show in CI for visibility

  // Upload source maps to Sentry on every production build.
  // Requires SENTRY_AUTH_TOKEN env var (add to CI secrets and Vercel env vars).
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Automatically tree-shake Sentry logger statements in production
  disableLogger: true,

  // Hides Sentry telemetry/debug output in the build logs
  telemetry: false,
})));
