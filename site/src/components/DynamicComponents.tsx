"use client";

import dynamic from "next/dynamic";

// Defer heavy client-only components to reduce initial JS bundle and improve INP
export const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  ssr: false,
  loading: () => (
    <div
      className="fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-stone-200 dark:bg-stone-700 animate-pulse"
      aria-hidden="true"
    />
  ),
});

export const MobileBookingBar = dynamic(() => import("@/components/MobileBookingBar"), {
  ssr: false,
  loading: () => (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden h-[68px] bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-700"
      aria-hidden="true"
    />
  ),
});

export const CookieConsent = dynamic(() => import("@/components/CookieConsent"), {
  ssr: false,
});

export const AnalyticsProvider = dynamic(
  () => import("@/components/AnalyticsProvider"),
  { ssr: false }
);

export const ClarityProvider = dynamic(
  () => import("@/components/ClarityProvider"),
  { ssr: false }
);

export const WebVitalsReporter = dynamic(
  () => import("@/components/WebVitalsReporter"),
  { ssr: false }
);

export const BookingRecoveryBanner = dynamic(
  () => import("@/components/BookingRecoveryBanner"),
  { ssr: false }
);
