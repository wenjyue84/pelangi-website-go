/**
 * Channel Manager Configuration
 * Supports Beds24 (recommended for small hostels)
 *
 * Required environment variables:
 *   - CHANNEL_MANAGER_PROVIDER: "beds24" (required)
 *   - BEDS24_API_KEY: Beds24 API key (required if using Beds24)
 *   - BEDS24_PROPERTY_ID: Beds24 property ID (required if using Beds24)
 *   - WEBHOOK_SECRET: Shared secret for webhook validation (required)
 */

export const CHANNEL_MANAGER_CONFIG = {
  provider: (process.env.CHANNEL_MANAGER_PROVIDER || "beds24") as "beds24",
  beds24: {
    apiKey: process.env.BEDS24_API_KEY || "",
    propertyId: process.env.BEDS24_PROPERTY_ID || "",
    apiBaseUrl: "https://api.beds24.com/json",
  },
  webhook: {
    secret: process.env.WEBHOOK_SECRET || "",
    endpoint: "/api/webhooks/beds24",
  },
  syncInterval: 300000, // 5 minutes
  cacheTimeout: 60000, // 1 minute
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
};

export function isChannelManagerConfigured(): boolean {
  return (
    CHANNEL_MANAGER_CONFIG.beds24.apiKey !== "" &&
    CHANNEL_MANAGER_CONFIG.beds24.propertyId !== "" &&
    CHANNEL_MANAGER_CONFIG.webhook.secret !== ""
  );
}
