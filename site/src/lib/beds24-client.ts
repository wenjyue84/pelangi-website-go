import { createHmac } from "crypto";
import { CHANNEL_MANAGER_CONFIG } from "@/config/channel-manager";
import type { ChannelManagerAvailability, ChannelManagerBooking } from "./channel-manager-types";

export class Beds24Client {
  private apiKey: string;
  private propertyId: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = CHANNEL_MANAGER_CONFIG.beds24.apiKey;
    this.propertyId = CHANNEL_MANAGER_CONFIG.beds24.propertyId;
    this.baseUrl = CHANNEL_MANAGER_CONFIG.beds24.apiBaseUrl;
  }

  async getAvailability(
    checkin: string,
    checkout: string,
  ): Promise<ChannelManagerAvailability[]> {
    if (!this.isConfigured()) {
      return this.placeholderAvailability(checkin, checkout);
    }

    try {
      const params = new URLSearchParams({
        apiKey: this.apiKey,
        propid: this.propertyId,
        checkin,
        checkout,
      });

      const response = await fetch(`${this.baseUrl}/getAvailability?${params}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        console.error("Beds24 API error:", response.statusText);
        return this.placeholderAvailability(checkin, checkout);
      }

      const data = await response.json();
      return this.parseAvailabilityResponse(data, checkin, checkout);
    } catch (error) {
      console.error("Beds24 fetch failed:", error);
      return this.placeholderAvailability(checkin, checkout);
    }
  }

  private parseAvailabilityResponse(
    data: unknown,
    checkin: string,
    checkout: string,
  ): ChannelManagerAvailability[] {
    // Beds24 API returns an object with 'roomtypes' key containing array of room availability
    if (!data || typeof data !== "object" || !("roomtypes" in data)) {
      return this.placeholderAvailability(checkin, checkout);
    }

    const roomData = data as Record<string, unknown>;
    const roomtypes = roomData.roomtypes;

    if (!Array.isArray(roomtypes)) {
      return this.placeholderAvailability(checkin, checkout);
    }

    return roomtypes
      .map((room: unknown) => {
        if (typeof room !== "object" || !room) return null;
        const r = room as Record<string, unknown>;

        // Extract data from Beds24 response structure
        const roomId = String(r.id || r.roomId || "");
        const roomName = String(r.name || r.roomName || "");
        const available = Number(r.available || 0);
        const total = Number(r.totalInventory || r.total || 0);
        const rate = Number(r.rate || 0);

        return {
          roomId,
          roomName,
          checkin,
          checkout,
          available,
          total,
          rate,
          currency: "MYR",
        };
      })
      .filter((r): r is ChannelManagerAvailability => r !== null && r.roomId !== "");
  }

  async syncBooking(booking: Partial<ChannelManagerBooking>): Promise<boolean> {
    if (!this.isConfigured()) return false;

    try {
      const response = await fetch(`${this.baseUrl}/putBooking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: this.apiKey,
          propid: this.propertyId,
          guestName: booking.guestName,
          guestEmail: booking.guestEmail,
          guestPhone: booking.guestPhone,
          checkin: booking.checkin,
          checkout: booking.checkout,
          roomId: booking.roomId,
          noOfGuests: booking.adults || 1,
          status: "confirmed",
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Booking sync failed:", error);
      return false;
    }
  }

  validateWebhook(payload: string, signature: string | null): boolean {
    if (!signature) return false;
    const hmac = createHmac("sha256", CHANNEL_MANAGER_CONFIG.webhook.secret);
    hmac.update(payload);
    return hmac.digest("hex") === signature;
  }

  private isConfigured(): boolean {
    return this.apiKey !== "" && this.propertyId !== "";
  }

  private placeholderAvailability(
    checkin: string,
    checkout: string,
  ): ChannelManagerAvailability[] {
    const nights = Math.ceil(
      (new Date(checkout).getTime() - new Date(checkin).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    return [
      {
        roomId: "standard-capsule",
        roomName: "Standard Capsule Pod",
        checkin,
        checkout,
        available: 18,
        total: 18,
        rate: 35 * nights,
        currency: "MYR",
      },
      {
        roomId: "premium-capsule",
        roomName: "Premium Capsule Pod",
        checkin,
        checkout,
        available: 6,
        total: 6,
        rate: 45 * nights,
        currency: "MYR",
      },
    ];
  }
}

export const beds24Client = new Beds24Client();
