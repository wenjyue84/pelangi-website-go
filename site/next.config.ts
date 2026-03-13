import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import bundleAnalyzer from "@next/bundle-analyzer";

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
  experimental: {
    // Control Client Router Cache TTLs (Next.js 15 — staleTimes are in seconds)
    staleTimes: {
      dynamic: 30,   // Dynamic pages: cache prefetched links for 30s
      static: 180,   // Static pages: cache prefetched links for 3 min
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(self)",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // CSP is now set per-request in middleware.ts (nonce-based policy)
        ],
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
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

export default withBundleAnalyzer(withSentryConfig(nextConfig, {
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
}));
