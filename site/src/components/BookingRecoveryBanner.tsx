"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useBookingDraft } from "@/hooks/useBookingDraft";

export default function BookingRecoveryBanner() {
  const { draft, dismissed, dismiss } = useBookingDraft();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Show banner after a short delay so it doesn't flash on /book navigation
  useEffect(() => {
    if (!draft || dismissed || pathname === "/book") {
      setVisible(false);
      return;
    }

    // Delay appearance so it feels non-intrusive
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, [draft, dismissed, pathname]);

  if (!visible || !draft) return null;

  const roomLabel = draft.roomType || "Capsule Pod";
  const hasDate = Boolean(draft.checkIn);
  const dateInfo = hasDate
    ? ` for ${draft.checkIn}${draft.checkOut ? ` – ${draft.checkOut}` : ""}`
    : "";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 z-50 max-w-sm animate-fade-in"
    >
      <div className="bg-stone-900 dark:bg-stone-800 text-white rounded-2xl shadow-xl p-4 border border-stone-700">
        <p className="text-sm mb-3">
          Continue your booking for{" "}
          <span className="font-semibold text-amber-400">{roomLabel}</span>
          {dateInfo}?
        </p>
        <div className="flex items-center gap-2">
          <a
            href="/book"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-xl px-4 py-2.5 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
            Resume Booking
          </a>
          <button
            type="button"
            onClick={dismiss}
            className="text-stone-400 hover:text-white text-sm px-3 py-2.5 rounded-xl transition-colors"
            aria-label="Dismiss booking reminder"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
