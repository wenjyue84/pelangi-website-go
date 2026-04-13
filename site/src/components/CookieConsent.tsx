"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const COOKIE_NAME = "pelangi_cookie_consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

type ConsentValue = "accepted" | "rejected" | null;

/** Bilingual copy keyed by language */
const COPY = {
  en: {
    description:
      "We use cookies to analyse site traffic and improve your experience. Non-essential cookies (analytics) are only loaded with your explicit consent, as required by Malaysia\u2019s Personal Data Protection (Amendment) Act 2024. No boxes are pre-ticked.",
    newsletter:
      "If you subscribe to our newsletter, your email is shared with our email marketing provider (Brevo) under PDPA.",
    dpoContact: "For privacy concerns, contact our Data Protection Officer at dpo@pelangicapsulehostel.com.",
    privacyLink: "Privacy Policy",
    acceptAll: "Accept All",
    rejectAll: "Reject Non-Essential",
    manage: "Manage Preferences",
    savePrefs: "Save Preferences",
    essentialLabel: "Essential Cookies",
    essentialDesc:
      "Required for the website to function (session, language preference). Cannot be disabled.",
    analyticsLabel: "Analytics Cookies",
    analyticsDesc:
      "Help us understand how visitors use the site. Includes Google Analytics and Microsoft Clarity. Only enabled with your consent.",
    alwaysOn: "Always on",
  },
  zh: {
    description:
      "\u6211\u4eec\u4f7f\u7528Cookie\u6765\u5206\u6790\u7f51\u7ad9\u6d41\u91cf\u5e76\u6539\u5584\u60a8\u7684\u4f53\u9a8c\u3002\u6839\u636e\u9a6c\u6765\u897f\u4e9a2024\u5e74\u300a\u4e2a\u4eba\u6570\u636e\u4fdd\u62a4\uff08\u4fee\u6b63\uff09\u6cd5\u4ee4\u300b\uff0c\u975e\u5fc5\u8981Cookie\uff08\u5206\u6790\uff09\u4ec5\u5728\u60a8\u660e\u786e\u540c\u610f\u540e\u52a0\u8f7d\u3002\u6ca1\u6709\u9884\u52fe\u9009\u7684\u590d\u9009\u6846\u3002",
    newsletter:
      "\u5982\u679c\u60a8\u8ba2\u9605\u6211\u4eec\u7684\u7535\u5b50\u901a\u8baf\uff0c\u60a8\u7684\u7535\u5b50\u90ae\u4ef6\u5c06\u6839\u636ePDPA\u4e0e\u6211\u4eec\u7684\u90ae\u4ef6\u8425\u9500\u63d0\u4f9b\u5546\uff08Brevo\uff09\u5171\u4eab\u3002",
    dpoContact: "\u5982\u6709\u9690\u79c1\u7591\u8651\uff0c\u8bf7\u8054\u7cfb\u6570\u636e\u4fdd\u62a4\u5b98\uff1adpo@pelangicapsulehostel.com\u3002",
    privacyLink: "\u9690\u79c1\u653f\u7b56",
    acceptAll: "\u63a5\u53d7\u5168\u90e8",
    rejectAll: "\u62d2\u7edd\u975e\u5fc5\u8981",
    manage: "\u7ba1\u7406\u504f\u597d\u8bbe\u7f6e",
    savePrefs: "\u4fdd\u5b58\u504f\u597d\u8bbe\u7f6e",
    essentialLabel: "\u5fc5\u8981Cookie",
    essentialDesc:
      "\u7f51\u7ad9\u8fd0\u884c\u6240\u5fc5\u9700\uff08\u4f1a\u8bdd\u3001\u8bed\u8a00\u504f\u597d\uff09\u3002\u65e0\u6cd5\u7981\u7528\u3002",
    analyticsLabel: "\u5206\u6790Cookie",
    analyticsDesc:
      "\u5e2e\u52a9\u6211\u4eec\u4e86\u89e3\u8bbf\u5ba2\u5982\u4f55\u4f7f\u7528\u7f51\u7ad9\u3002\u5305\u62ecGoogle Analytics\u548cMicrosoft Clarity\u3002\u4ec5\u5728\u60a8\u540c\u610f\u540e\u542f\u7528\u3002",
    alwaysOn: "\u59cb\u7ec8\u5f00\u542f",
  },
} as const;

type Lang = keyof typeof COPY;

function getConsent(): ConsentValue {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)
  );
  if (!match) return null;
  const value = match[1];
  return value === "accepted" || value === "rejected" ? value : null;
}

function setConsentCookie(value: "accepted" | "rejected") {
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function updateConsentMode(granted: boolean) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
      functionality_storage: granted ? "granted" : "denied",
      security_storage: "granted",
    });
  }
}

function dispatchConsentEvent(value: "accepted" | "rejected") {
  updateConsentMode(value === "accepted");
  window.dispatchEvent(
    new CustomEvent("cookie-consent", { detail: { consent: value } })
  );
}

/** Read NEXT_LOCALE cookie to determine banner language */
function detectLanguage(): Lang {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
  return match?.[1] === "zh" ? "zh" : "en";
}

export default function CookieConsent() {
  const [consent, setConsentState] = useState<ConsentValue>("accepted"); // hide during SSR
  const [mounted, setMounted] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false); // NOT pre-ticked
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR hydration: read browser-only state on mount
    setMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsentState(getConsent());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLang(detectLanguage());
  }, []);

  const handleAccept = useCallback(() => {
    setConsentCookie("accepted");
    setConsentState("accepted");
    dispatchConsentEvent("accepted");
  }, []);

  const handleReject = useCallback(() => {
    setConsentCookie("rejected");
    setConsentState("rejected");
    dispatchConsentEvent("rejected");
  }, []);

  const handleSavePrefs = useCallback(() => {
    if (analyticsChecked) {
      handleAccept();
    } else {
      handleReject();
    }
  }, [analyticsChecked, handleAccept, handleReject]);

  // Don't render during SSR or if user already made a choice
  if (!mounted || consent !== null) return null;

  const t = COPY[lang];

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-consent-description"
      className="fixed bottom-0 left-0 right-0 z-60 p-4 md:p-6 entry-fade-up"
      style={{
        transitionBehavior: 'allow-discrete',
      } as React.CSSProperties}
    >
      <div className="mx-auto max-w-3xl rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 p-4 shadow-xl md:p-6">
        <p
          id="cookie-consent-description"
          className="text-sm text-stone-600 dark:text-stone-400 md:text-base"
        >
          {t.description}{" "}
          {t.newsletter}{" "}
          {t.dpoContact}{" "}
          <Link
            href="/privacy-policy"
            className="underline text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
          >
            {t.privacyLink}
          </Link>
        </p>

        {/* Manage Preferences panel */}
        {showPrefs && (
          <div className="mt-4 space-y-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 p-4">
            {/* Essential — always on */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                  {t.essentialLabel}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {t.essentialDesc}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-stone-200 dark:bg-stone-700 px-2.5 py-1 text-xs font-medium text-stone-600 dark:text-stone-400">
                {t.alwaysOn}
              </span>
            </div>

            {/* Analytics — opt-in toggle (NOT pre-ticked) */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                  {t.analyticsLabel}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {t.analyticsDesc}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={analyticsChecked}
                aria-label={t.analyticsLabel}
                onClick={() => setAnalyticsChecked((v) => !v)}
                className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 ${
                  analyticsChecked
                    ? "bg-amber-700"
                    : "bg-stone-500 dark:bg-stone-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    analyticsChecked ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <button
              onClick={handleSavePrefs}
              className="mt-2 w-full rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 sm:w-auto"
            >
              {t.savePrefs}
            </button>
          </div>
        )}

        {/* Action buttons */}
        {!showPrefs && (
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
            <button
              onClick={() => setShowPrefs(true)}
              className="rounded-lg border border-stone-500 dark:border-stone-600 bg-white dark:bg-stone-700 px-5 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-300 transition-colors hover:bg-stone-50 dark:hover:bg-stone-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
            >
              {t.manage}
            </button>
            <button
              onClick={handleReject}
              className="rounded-lg border border-stone-500 dark:border-stone-600 bg-white dark:bg-stone-700 px-5 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-300 transition-colors hover:bg-stone-50 dark:hover:bg-stone-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
            >
              {t.rejectAll}
            </button>
            <button
              onClick={handleAccept}
              className="rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
            >
              {t.acceptAll}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
