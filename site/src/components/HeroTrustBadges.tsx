"use client";

import { useEffect, useRef } from "react";
import InfoPopover from "./InfoPopover";

function pushEvent(eventName: string, params: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: eventName, ...params });
}

export default function HeroTrustBadges() {
  const ref = useRef<HTMLDivElement>(null);
  const tracked = useRef(false);

  // Track impression when badges enter viewport
  useEffect(() => {
    const el = ref.current;
    if (!el || tracked.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          pushEvent("trust_badges_impression", {
            badge_location: "book_hero",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleBadgeClick(badgeName: string) {
    pushEvent("trust_badge_click", {
      badge_name: badgeName,
      badge_location: "book_hero",
    });
  }

  return (
    <div ref={ref} className="mt-6 space-y-4">
      {/* Trust badges row */}
      <div className="flex flex-wrap justify-center gap-2">
        <InfoPopover
          content="Based on 100+ verified guest reviews on Booking.com"
          ariaLabel="Rated 8.4 out of 10 on Booking.com"
        >
          <span
            role="button"
            onClick={() => handleBadgeClick("booking_rating")}
            className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-white/90 border border-white/20 hover:bg-white/25 transition-colors cursor-default"
          >
            <svg className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span><strong>8.4</strong>/10 Booking.com</span>
          </span>
        </InfoPopover>

        <InfoPopover
          content="Welcoming travellers from 30+ countries since 2013"
          ariaLabel="Over 500 guests hosted since 2013"
        >
          <span
            role="button"
            onClick={() => handleBadgeClick("guests_hosted")}
            className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-white/90 border border-white/20 hover:bg-white/25 transition-colors cursor-default"
          >
            <svg className="w-3.5 h-3.5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span><strong>500+</strong> guests hosted</span>
          </span>
        </InfoPopover>

        <InfoPopover
          content="Book direct and save up to RM13/night vs OTA prices"
          ariaLabel="Best price guaranteed when booking direct"
        >
          <span
            role="button"
            onClick={() => handleBadgeClick("best_price")}
            className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-white/90 border border-white/20 hover:bg-white/25 transition-colors cursor-default"
          >
            <svg className="w-3.5 h-3.5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span><strong>Best Price</strong> Guarantee</span>
          </span>
        </InfoPopover>
      </div>

      {/* Compact price comparison */}
      <div className="flex items-center justify-center gap-3 text-xs text-white/80">
        <span className="flex items-center gap-1">
          <span className="font-semibold text-white">From RM35</span>/night direct
        </span>
        <span className="text-white/40">|</span>
        <span className="flex items-center gap-1">
          <span className="line-through text-white/50">RM56+</span>
          <span>on OTAs</span>
        </span>
        <span className="text-white/40">|</span>
        <span className="text-green-300 font-semibold">Save up to RM13</span>
      </div>
    </div>
  );
}
