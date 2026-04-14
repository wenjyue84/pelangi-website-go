"use client";

import { useEffect, useEffectEvent } from "react";
import { trackViewItem, trackSelectItem } from "@/lib/gtm-ecommerce";
import { trackMetaEvent } from "@/lib/meta-capi";

const ROOM_ITEMS = [
  {
    item_id: "standard-capsule-pod",
    item_name: "Standard Capsule Pod",
    item_category: "accommodation",
    price: 35,
    currency: "MYR",
  },
  {
    item_id: "premium-capsule-pod",
    item_name: "Premium Capsule Pod",
    item_category: "accommodation",
    price: 45,
    currency: "MYR",
  },
] as const;

export default function RoomsEcommerceTracker() {
  // useEffectEvent: stable analytics callback — always reads latest state
  // without causing the Effect to re-run when function identity changes
  const handleClick = useEffectEvent((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // "Book Your Pod Now" CTA links to #booking
    const link = target.closest("a[href='#booking'], .btn-primary");
    if (link) {
      trackSelectItem(ROOM_ITEMS[0], "Rooms Page");
    }
  });

  useEffect(() => {
    for (const item of ROOM_ITEMS) {
      trackViewItem(item);
    }

    // Meta CAPI ViewContent event for room page
    trackMetaEvent("ViewContent", {
      customData: {
        content_name: "Capsule Pod Rooms",
        content_category: "accommodation",
        content_ids: ROOM_ITEMS.map((r) => r.item_id),
        currency: "MYR",
        value: 35,
      },
    });

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []); // handleClick is an Effect Event — not a dependency

  return null;
}
