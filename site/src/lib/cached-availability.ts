import { beds24Client } from "./beds24-client";
import type { ChannelManagerAvailability } from "./channel-manager-types";

/**
 * Module-level Map cache with 5-minute TTL.
 *
 * Delegates to beds24Client.getAvailability() so all Beds24 API logic
 * (auth, base URL, response parsing, fallback) lives in one place.
 *
 * react cache() / cacheSignal() are Server-Component-only APIs and cannot
 * be called from route handlers — replaced with a plain Map cache here.
 */
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: ChannelManagerAvailability[];
  expiresAt: number;
}

const availabilityCache = new Map<string, CacheEntry>();

export async function getCachedAvailability(
  checkin: string,
  checkout: string,
): Promise<ChannelManagerAvailability[]> {
  const cacheKey = `${checkin}::${checkout}`;
  const now = Date.now();

  const existing = availabilityCache.get(cacheKey);
  if (existing && existing.expiresAt > now) {
    return existing.data;
  }

  const data = await beds24Client.getAvailability(checkin, checkout);

  availabilityCache.set(cacheKey, {
    data,
    expiresAt: now + CACHE_TTL_MS,
  });

  return data;
}
