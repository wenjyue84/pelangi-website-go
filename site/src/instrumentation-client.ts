/**
 * instrumentation-client.ts
 *
 * Next.js 15.3+ client instrumentation hook — runs once before React hydration.
 * Centralises Sentry, web-vitals, and Clarity initialisation so that errors
 * and metrics captured during the earliest lifecycle are never missed.
 *
 * IMPORTANT: No React / JSX imports — this file executes before the framework.
 */

import * as Sentry from "@sentry/nextjs";
import { onINP, onLCP, onCLS } from "web-vitals/attribution";

// ---------------------------------------------------------------------------
// 1. Sentry — error monitoring (replaces sentry.client.config.ts)
// ---------------------------------------------------------------------------
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Capture 10 % of transactions for performance monitoring in production
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Replay 10 % of sessions, 100 % of sessions with errors
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Filter known non-actionable browser errors
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed with undelivered notifications",
    "Network request failed",
    "Failed to fetch",
    "Load failed",
    "AbortError",
  ],

  debug: false,
});

// ---------------------------------------------------------------------------
// 2. Web Vitals — INP, LCP, CLS → GA4 via gtag / dataLayer
// ---------------------------------------------------------------------------
interface WindowWithGtag {
  dataLayer: unknown[];
  gtag?: (...args: unknown[]) => void;
}

function sendToGA(eventParams: Record<string, string | number>) {
  const w = window as unknown as WindowWithGtag;
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== "function") {
    w.gtag = (...args: unknown[]) => {
      w.dataLayer.push(args);
    };
  }
  w.gtag!("event", "web_vitals", eventParams);
}

onINP((metric) => {
  const attr = metric.attribution;
  sendToGA({
    metric_name: "INP",
    metric_value: metric.value,
    metric_id: metric.id,
    input_delay: attr.inputDelay ?? 0,
    processing_time: attr.processingDuration ?? 0,
    presentation_delay: attr.presentationDelay ?? 0,
    interaction_target: attr.interactionTarget ?? "",
  });
});

onLCP((metric) => {
  sendToGA({
    metric_name: "LCP",
    metric_value: metric.value,
    metric_id: metric.id,
  });
});

onCLS((metric) => {
  sendToGA({
    metric_name: "CLS",
    metric_value: metric.value,
    metric_id: metric.id,
  });
});

// ---------------------------------------------------------------------------
// 3. Microsoft Clarity — consent-gated heatmap / session recording
// ---------------------------------------------------------------------------
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "";

function initClarity() {
  if (
    !CLARITY_ID ||
    (window as unknown as Record<string, boolean>).__clarityInit
  )
    return;
  (window as unknown as Record<string, boolean>).__clarityInit = true;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  (function (c: any, l: any, a: string, r: string, i: string) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    const t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

function hasConsent(): boolean {
  const match = document.cookie.match(
    /(?:^|; )pelangi_cookie_consent=([^;]*)/
  );
  return match?.[1] === "accepted";
}

// Initialise immediately if consent was already granted in a previous session
if (hasConsent()) {
  initClarity();
}

// Listen for future consent changes (dispatched by <CookieConsent /> component)
window.addEventListener("cookie-consent", (e: Event) => {
  const detail = (e as CustomEvent<{ consent: string }>).detail;
  if (detail.consent === "accepted") {
    initClarity();
  }
});
