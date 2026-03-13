"use client";

import { useEffect, useRef, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/60127088789?text=Hi%20Pelangi%20Capsule%20Hostel!%20I'd%20like%20to%20book%20early%20check-in%20at%2011%20AM.%20Please%20advise%20availability.";
const SESSION_KEY = "exit-intent-shown";

export default function ExitIntentOverlay() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Desktop-only (> 1024px), once per session
    if (
      typeof window === "undefined" ||
      window.innerWidth <= 1024 ||
      sessionStorage.getItem(SESSION_KEY)
    ) {
      return;
    }

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY < 5) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setVisible(true);
      }
    }

    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setVisible(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    // Move focus to overlay on open
    overlayRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      ref={overlayRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-stone-900/60 backdrop-blur-sm
                 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setVisible(false);
      }}
    >
      <div className="bg-white dark:bg-stone-900 rounded-3xl shadow-2xl max-w-md w-full p-8 relative
                      animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800
                     flex items-center justify-center text-stone-500 hover:text-stone-800
                     dark:text-stone-400 dark:hover:text-stone-200 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center
                        justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Offer text */}
        <h2
          id="exit-intent-title"
          className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100 text-center mb-2"
        >
          Wait — Early Check-in on Us
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-center mb-1">
          Book direct via WhatsApp today and we&apos;ll throw in{" "}
          <strong className="text-amber-700 dark:text-amber-400">early check-in at 11 AM</strong> — free.
        </p>
        <p className="text-stone-500 dark:text-stone-400 text-sm text-center mb-8">
          No OTA fees. Instant confirmation. Just mention this offer.
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setVisible(false)}
            className="flex items-center justify-center gap-3 bg-green-500 text-white rounded-2xl
                       py-4 px-6 font-semibold hover:bg-green-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Book via WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="flex items-center justify-center py-3 px-6 rounded-2xl font-medium
                       text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800
                       transition-colors"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
