"use client";

import { useEffect, useCallback } from "react";
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
  const handleBookNowClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest("a[href*='wa.me'], a[href='#booking'], .btn-primary");
    if (link) {
      trackBeginCheckout(CHECKOUT_ITEMS);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleBookNowClick);
    return () => document.removeEventListener("click", handleBookNowClick);
  }, [handleBookNowClick]);

  return null;
}
