/**
 * Vercel Feature Flags and flag resolution logic.
 * Reads flags from Edge Config in production, falls back to mock values in local dev.
 * Reference: https://vercel.com/docs/feature-flags
 */

export type CTAVariant = "book-now" | "check-availability" | "best-price-direct";

export interface FlagsConfig {
  "cta-variant": CTAVariant;
}

// Default flags for development / fallback
const DEFAULT_FLAGS: FlagsConfig = {
  "cta-variant": "book-now",
};

/**
 * Get a flag value from Edge Config (production) or mock (local dev).
 * In production with Vercel Edge Config enabled, reads the flag value.
 * In development or when Edge Config is not configured, falls back to environment variable.
 *
 * @param key - The flag key (e.g., 'cta-variant')
 * @param defaultValue - Fallback value if flag is not found
 * @returns The flag value
 */
export async function getFlag<K extends keyof FlagsConfig>(
  key: K,
  defaultValue?: FlagsConfig[K]
): Promise<FlagsConfig[K]> {
  try {
    // In production: Use @vercel/edge-config if available
    if (process.env.EDGE_CONFIG) {
      const { get } = await import("@vercel/edge-config");
      const value = (await get(key)) as FlagsConfig[K] | undefined;
      if (value !== undefined) {
        return value;
      }
    }

    // Fallback to environment variable for local development
    if (key === "cta-variant") {
      const envValue = process.env.NEXT_PUBLIC_FLAG_CTA_VARIANT as CTAVariant | undefined;
      if (envValue) {
        return envValue as FlagsConfig[K];
      }
    }

    // Final fallback to hardcoded defaults
    return defaultValue ?? DEFAULT_FLAGS[key];
  } catch (error) {
    console.error(`[flags] Error reading flag '${key}':`, error);
    return defaultValue ?? DEFAULT_FLAGS[key];
  }
}

/**
 * Get the CTA variant for A/B testing.
 * Evaluates the flag and returns the assigned variant for this session.
 *
 * @returns The assigned variant
 */
export async function getVariant(): Promise<CTAVariant> {
  return getFlag("cta-variant");
}

/**
 * Get the human-readable CTA button text for a given variant.
 */
export function getCTAText(variant: CTAVariant): string {
  const ctaMap: Record<CTAVariant, string> = {
    "book-now": "Book via WhatsApp",
    "check-availability": "Check Availability",
    "best-price-direct": "Get Best Price Direct",
  };
  return ctaMap[variant] ?? "Book via WhatsApp";
}
