/**
 * Hostel review rating constants sourced from Booking.com (best review count).
 * Hostelworld: 3.3/10 (21 reviews) — too few, replaced with Booking.com
 * Booking.com: 146 reviews — most representative score
 * Hostelz aggregate: 4.9/5 (178 reviews)
 * Update quarterly.
 * Last updated: Q2 2026
 */
export const HOSTELWORLD_RATING = {
  ratingValue: "8.2",
  bestRating: "10",
  worstRating: "0",
  reviewCount: 146,
  /** Source platform for transparency */
  source: "Booking.com",
} as const;
