import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Google Hotel free booking link landing handler.
 *
 * Google Hotel Center sends traffic to this URL with query parameters:
 *   - checkin  (YYYY-MM-DD)
 *   - checkout (YYYY-MM-DD)
 *   - guests   (number)
 *   - hotel_id (Google's property ID)
 *
 * This route forwards those params to /book so the BookingForm can pre-fill,
 * and tags the traffic with utm_source=google_hotels for analytics.
 */
export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const forwardParams = new URLSearchParams();

  const checkin = params.get("checkin");
  const checkout = params.get("checkout");
  const guests = params.get("guests");

  if (checkin) forwardParams.set("checkin", checkin);
  if (checkout) forwardParams.set("checkout", checkout);
  if (guests) forwardParams.set("guests", guests);

  // Tag as Google Hotels traffic for GTM/analytics attribution
  forwardParams.set("utm_source", "google_hotels");
  forwardParams.set("utm_medium", "free_booking_link");
  forwardParams.set("utm_campaign", "hotel_center");

  const query = forwardParams.toString();
  const url = new URL(`/book${query ? `?${query}` : ""}`, request.nextUrl.origin);
  return NextResponse.redirect(url, 307);
}
