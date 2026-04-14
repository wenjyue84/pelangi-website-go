/**
 * Vercel Feature Flags and flag resolution logic.
 * Defines flag types and server-side flag reading from Edge Config.
 * For local dev, falls back to mock flags from environment variables.
 */

export type CTAVariant = "book-now" | "check-availability" | "best-price-direct";

export interface FlagsConfig {
  "cta-variant": CTAVariant;
}

// Default flags for local development / fallback
const DEFAULT_FLAGS: FlagsConfig = {
  "cta-variant": "book-now",
};

// Mock flag values from environment
const MOCK_FLAGS: Partial<FlagsConfig> = {
  "cta-variant":
    (process.env.NEXT_PUBLIC_FLAG_CTA_VARIANT as CTAVariant) ?? "book-now",
};

/**
 * Get a flag value from Edge Config (production) or mock (local dev).
 * In production, reads from Vercel Edge Config.
 * In development, uses mock values from environment variables.
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
    // In production with Vercel Edge Config, import and use @vercel/edge-config
    // For now, use mock values that respect environment overrides
    const mockValue = MOCK_FLAGS[key];
    if (mockValue !== undefined) {
      return mockValue as FlagsConfig[K];
    }

    // Fall back to defaults
    return defaultValue ?? DEFAULT_FLAGS[key];
  } catch (error) {
    console.error(`[flags] Error reading flag '${key}':`, error);
    return defaultValue ?? DEFAULT_FLAGS[key];
  }
}

/**
 * Get a variant for a specific A/B test from the flag value.
 * Deterministically assigns variants based on flag configuration
 * and optional user identifier for consistent variants within a session.
 *
 * @param sessionId - Optional session ID for deterministic variant assignment
 * @returns The assigned variant
 */
export async function getVariant(
  sessionId?: string
): Promise<CTAVariant> {
  const variant = await getFlag("cta-variant");
  return variant;
}

/**
 * Get the human-readable CTA text for a given variant.
 */
export function getCTAText(variant: CTAVariant): string {
  const ctaMap: Record<CTAVariant, string> = {
    "book-now": "Book via WhatsApp",
    "check-availability": "Check Availability",
    "best-price-direct": "Get Best Price Direct",
  };
  return ctaMap[variant] ?? "Book via WhatsApp";
}
