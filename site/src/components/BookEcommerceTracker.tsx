"use client";

import { useEffect, useEffectEvent } from "react";
import { trackBeginCheckout } from "@/lib/gtm-ecommerce";

const CHECKOUT_ITEMS = [
  {
    item_id: "standard-capsule-pod",
    item_name: "Standard Capsule Pod",
    item_category: "accommodation",
    price: 35,
    currency: "MYR",
  },
];

export default function BookEcommerceTracker() {
  // Initialize GA4 custom dimension for A/B test variant on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const variant = document.cookie
      .split("; ")
      .find((row) => row.startsWith("x-variant="))
      ?.split("=")[1] || "book-now";

    // Set custom dimension for variant tracking in GA4
    const w = window as unknown as { dataLayer: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "page_view",
      "dimension_1": variant, // dimension_1 = CTA variant (configure in GA4)
    });
  }, []);

  const handleBookNowClick = useEffectEvent((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest("a[href*='wa.me'], a[href='#booking'], .btn-primary");
    if (link) {
      // Include variant in ecommerce tracking
      const variant = document.cookie
        .split("; ")
        .find((row) => row.startsWith("x-variant="))
        ?.split("=")[1] || "book-now";

      trackBeginCheckout(CHECKOUT_ITEMS);

      // Log CTA click with variant
      const w = window as unknown as { dataLayer: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "cta_click",
        "dimension_1": variant,
      });
    }
  });

  useEffect(() => {
    document.addEventListener("click", handleBookNowClick);
    return () => document.removeEventListener("click", handleBookNowClick);
  }, []);

  return null;
}
