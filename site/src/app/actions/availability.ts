"use server";

import { refresh } from "next/cache";

/**
 * Fetches fresh uncached room availability data without busting the cache.
 * Call this from client components that need to poll or display live
 * availability without a full page reload or cache invalidation.
 *
 * Unlike revalidateTag/revalidatePath which purge the cache entry,
 * refresh() fetches fresh dynamic data for the current render only,
 * leaving the cached version intact for other users.
 */
export async function refreshAvailability(): Promise<void> {
  refresh();
}
