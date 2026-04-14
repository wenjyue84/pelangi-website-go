import { cache } from "react";
import { cacheSignal } from "react";

/**
 * Creates a cached fetch function that aborts in-flight requests when
 * the cache entry's lifetime ends. This uses React 19.2's cacheSignal()
 * to receive an AbortSignal that fires when cache invalidation occurs.
 *
 * Usage:
 * const data = await getCachedData(url);
 */
export const getCachedData = cache(async (url: string) => {
  const signal = cacheSignal();
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}: ${response.status}`);
  }
  return response.json();
});

/**
 * Example: Fetch room availability from an external API with cacheSignal.
 * When the cache entry expires, the fetch is automatically aborted,
 * preventing hung connections and unnecessary resource usage.
 */
export const getCachedRoomAvailability = cache(async (roomId: string) => {
  const signal = cacheSignal();
  const apiUrl = `https://api.example.com/availability/${roomId}`;

  try {
    const response = await fetch(apiUrl, {
      signal, // AbortSignal that fires when cache lifetime ends
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      // Cache was invalidated mid-request — abort signal fired
      console.log(`Fetch for room ${roomId} was aborted by cache invalidation`);
      throw error;
    }
    throw error;
  }
});
