/**
 * Meta Conversions API (CAPI) client-side helpers.
 *
 * Sends events to the server-side Route Handler at /api/meta-events,
 * which forwards them to Meta's Conversions API.
 *
 * Each event gets a unique event_id that should also be passed to the
 * browser-side Pixel for deduplication.
 */

type MetaEventName = "PageView" | "ViewContent" | "Contact";

interface MetaEventOptions {
  email?: string;
  phone?: string;
  customData?: Record<string, unknown>;
}

function generateEventId(): string {
  // Crypto-quality UUID for deduplication between browser Pixel and CAPI
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match?.[1];
}

/**
 * Send a Meta CAPI event via the server-side route handler.
 * Returns the event_id so the caller can also fire the matching browser Pixel event.
 */
export async function sendMetaEvent(
  eventName: MetaEventName,
  options: MetaEventOptions = {}
): Promise<string> {
  const eventId = generateEventId();

  const payload = {
    event_name: eventName,
    event_id: eventId,
    event_source_url: typeof window !== "undefined" ? window.location.href : "",
    user_data: {
      ...(options.email ? { em: options.email } : {}),
      ...(options.phone ? { ph: options.phone } : {}),
      fbc: getCookie("_fbc"),
      fbp: getCookie("_fbp"),
    },
    ...(options.customData ? { custom_data: options.customData } : {}),
  };

  // Fire-and-forget — don't block the user experience
  fetch("/api/meta-events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Silently fail — analytics should never break UX
  });

  return eventId;
}

/**
 * Fire the matching browser-side Meta Pixel event for deduplication.
 * Only fires if fbq() is available (Pixel script loaded).
 */
export function firePixelEvent(
  eventName: MetaEventName,
  eventId: string,
  customData?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { fbq?: (...args: unknown[]) => void };
  if (!w.fbq) return;

  w.fbq("track", eventName, customData ?? {}, { eventID: eventId });
}

/**
 * Combined helper: sends CAPI event + fires browser Pixel event with matching event_id.
 */
export async function trackMetaEvent(
  eventName: MetaEventName,
  options: MetaEventOptions = {}
): Promise<void> {
  const eventId = await sendMetaEvent(eventName, options);
  firePixelEvent(eventName, eventId, options.customData);
}
