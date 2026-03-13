/**
 * GA4 Enhanced Ecommerce event helpers.
 * Pushes structured ecommerce events to the GTM dataLayer.
 * Reference: https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

interface EcommerceItem {
  item_id: string;
  item_name: string;
  item_category: string;
  price: number;
  currency: string;
  quantity?: number;
  index?: number;
}

function pushEcommerceEvent(event: string, ecommerce: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  // Clear previous ecommerce data to prevent carryover
  w.dataLayer.push({ ecommerce: null });
  w.dataLayer.push({ event, ecommerce });
}

/** Fire when a room detail is viewed (e.g. on /rooms page load). */
export function trackViewItem(item: EcommerceItem) {
  pushEcommerceEvent("view_item", {
    items: [{ ...item, quantity: item.quantity ?? 1 }],
  });
}

/** Fire when a specific room type card is clicked from the /rooms listing. */
export function trackSelectItem(item: EcommerceItem, listName: string) {
  pushEcommerceEvent("select_item", {
    item_list_name: listName,
    items: [{ ...item, quantity: item.quantity ?? 1 }],
  });
}

/** Fire when guest initiates booking (clicks Book Now / expands booking section on /book). */
export function trackBeginCheckout(items: EcommerceItem[]) {
  pushEcommerceEvent("begin_checkout", {
    items: items.map((i) => ({ ...i, quantity: i.quantity ?? 1 })),
  });
}

/** Fire on contact form submission. */
export function trackGenerateLead(leadSource: string) {
  pushEcommerceEvent("generate_lead", {
    lead_source: leadSource,
  });
}
