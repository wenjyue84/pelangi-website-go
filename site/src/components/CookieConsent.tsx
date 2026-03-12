"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_NAME = "pelangi_cookie_consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

type ConsentState = "accepted" | "rejected" | null;

function getConsent(): ConsentState {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)
  );
  if (!match) return null;
  const value = match[1];
  return value === "accepted" || value === "rejected" ? value : null;
}

function setConsent(value: "accepted" | "rejected") {
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

/**
 * Dispatches a custom event so analytics scripts can listen and initialize.
 */
function dispatchConsentEvent(value: "accepted" | "rejected") {
  window.dispatchEvent(
    new CustomEvent("cookie-consent", { detail: { consent: value } })
  );
}

export default function CookieConsent() {
  const [consent, setConsentState] = useState<ConsentState>("accepted"); // default to hide banner during SSR/hydration
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setConsentState(getConsent());
  }, []);

  function handleAccept() {
    setConsent("accepted");
    setConsentState("accepted");
    dispatchConsentEvent("accepted");
  }

  function handleReject() {
    setConsent("rejected");
    setConsentState("rejected");
    dispatchConsentEvent("rejected");
  }

  // Don't render during SSR or if user already made a choice
  if (!mounted || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-consent-description"
      className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-xl border border-stone-200 bg-white p-4 shadow-xl md:p-6">
        <p
          id="cookie-consent-description"
          className="text-sm text-stone-600 md:text-base"
        >
          We use cookies to analyse site traffic and improve your experience. Non-essential
          cookies (analytics) are only loaded with your consent. By clicking
          &ldquo;Accept All&rdquo;, you agree to the use of all cookies. You can
          also reject non-essential cookies. See our{" "}
          <Link
            href="/privacy-policy"
            className="underline text-stone-700 hover:text-stone-900"
          >
            Privacy Policy
          </Link>{" "}
          for details.
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
          <button
            onClick={handleReject}
            className="rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Reject Non-Essential
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
