/**
 * Type definitions for channel manager integration.
 * Supports Beds24 API data structures.
 */

export interface ChannelManagerAvailability {
  roomId: string;
  roomName: string;
  checkin: string; // YYYY-MM-DD
  checkout: string; // YYYY-MM-DD
  available: number;
  total: number;
  rate: number;
  currency: string;
}

export interface ChannelManagerBooking {
  externalBookingId: string;
  roomId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkin: string; // YYYY-MM-DD
  checkout: string; // YYYY-MM-DD
  nights: number;
  adults: number;
  children?: number;
  totalPrice: number;
  currency: string;
  status: "confirmed" | "cancelled" | "pending";
  source: "website" | "booking.com" | "agoda" | "hostelworld";
  createdAt: string; // ISO 8601
}

export interface ChannelManagerWebhookPayload {
  eventType: "availability_update" | "booking_created" | "booking_cancelled";
  timestamp: string;
  data: ChannelManagerAvailability | ChannelManagerBooking;
}

export interface AvailabilityCache {
  roomId: string;
  available: number;
  total: number;
  cachedAt: number; // Unix timestamp
}
