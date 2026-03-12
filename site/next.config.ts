import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const cspHeader = [
  "default-src 'self'",
  // Next.js injects inline scripts; Turbopack dev mode requires 'unsafe-eval' for HMR
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ""} https://admin.pelangicapsulehostel.com https://www.googletagmanager.com`,
  // Tailwind CSS-in-JS and Google Fonts stylesheet
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Self-hosted next/font/google + external Google Fonts CDN fallback
  "font-src 'self' https://fonts.gstatic.com",
  // Images: self, data URIs, blob URLs, TripCdn (hotel photos), admin proxy
  "img-src 'self' blob: data: https://ak-d.tripcdn.com https://admin.pelangicapsulehostel.com https://img.youtube.com",
  // API calls: same-origin rewrites proxy to admin; admin also whitelisted for direct calls
  // Sentry DSN ingestion (error reporting)
  "connect-src 'self' https://admin.pelangicapsulehostel.com https://*.sentry.io",
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
].join("; ");

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
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
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

export default withSentryConfig(nextConfig, {
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
});
