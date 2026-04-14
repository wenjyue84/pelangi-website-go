import { cache, cacheSignal } from "react";
import { beds24Client } from "./beds24-client";
import type { ChannelManagerAvailability } from "./channel-manager-types";

/**
 * Cached availability fetch with automatic cleanup via React's cacheSignal().
 *
 * In React 19.2, cache() + cacheSignal() allows in-flight fetch requests to be
 * aborted when the cache entry's lifetime ends. This prevents unnecessary network
 * connections from staying open when the cached result will no longer be used.
 *
 * cacheSignal() fires when:
 * - The cache entry is invalidated mid-request
 * - The Server Component completes rendering
 * - The cache duration expires
 *
 * Pattern: const signal = cacheSignal(); // Inside cache() scope
 *         const res = await fetch(url, { signal });
 */
export const getCachedAvailability = cache(
  async (
    checkin: string,
    checkout: string,
  ): Promise<ChannelManagerAvailability[]> => {
    // Signal that fires when cache entry's lifetime ends, allowing fetch cleanup
    const signal = cacheSignal();

    // Get the base URL from config (same as beds24Client)
    const baseUrl = "https://api.beds24.com/api/v2.1";
    const apiKey = process.env.BEDS24_API_KEY || "";
    const propertyId = process.env.BEDS24_PROPERTY_ID || "";

    if (!apiKey || !propertyId) {
      // Fall back to placeholder if not configured
      return beds24Client.getAvailability(checkin, checkout);
    }

    try {
      const params = new URLSearchParams({
        apiKey,
        propid: propertyId,
        checkin,
        checkout,
      });

      // Pass cacheSignal() as the abort signal so fetch is cleaned up
      // when the cache entry is invalidated or lifetime expires
      const response = await fetch(`${baseUrl}/getAvailability?${params}`, {
        signal,
        cache: "no-store",
      });

      if (!response.ok) {
        console.error("Beds24 API error:", response.statusText);
        return beds24Client.getAvailability(checkin, checkout);
      }

      const data = await response.json();

      // Parse the response using the same logic as beds24Client
      if (!data || typeof data !== "object" || !("roomtypes" in data)) {
        return beds24Client.getAvailability(checkin, checkout);
      }

      const roomData = data as Record<string, unknown>;
      const roomtypes = roomData.roomtypes;

      if (!Array.isArray(roomtypes)) {
        return beds24Client.getAvailability(checkin, checkout);
      }

      return roomtypes
        .map((room: unknown) => {
          if (typeof room !== "object" || !room) return null;
          const r = room as Record<string, unknown>;

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
    } catch (error) {
      console.error("Cached availability fetch failed:", error);
      return beds24Client.getAvailability(checkin, checkout);
    }
  },
);
