import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Capture 10% of transactions for performance monitoring in production
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Replay 10% of sessions, 100% of sessions with errors
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Filter known non-actionable browser errors
  ignoreErrors: [
    // ResizeObserver loop errors — harmless browser noise
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed with undelivered notifications",
    // Network errors from user connectivity issues
    "Network request failed",
    "Failed to fetch",
    "Load failed",
    // Cancelled navigation
    "AbortError",
  ],

  debug: false,
});
