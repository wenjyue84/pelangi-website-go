import { after } from "next/server";

// ---------------------------------------------------------------------------
// Server-side deferred analytics using Next.js after() API
// ---------------------------------------------------------------------------
// after() schedules non-blocking work that runs AFTER the HTTP response has
// been sent. This keeps TTFB fast while still capturing server-side events.
//
// IMPORTANT:
// - Do NOT call cookies() or headers() inside after() callbacks.
//   Read request data BEFORE calling after() and close over the values.
// - after() works in Server Components, Server Actions, Route Handlers,
//   and Middleware — NOT in Client Components or "use cache" components.
// ---------------------------------------------------------------------------

export interface PageViewEvent {
  path: string;
  userAgent: string;
  ip: string;
  referrer: string;
  timestamp: string;
}

export interface ServerAnalyticsEvent {
  event: string;
  path: string;
  payload?: Record<string, unknown>;
  timestamp: string;
}

/**
 * Log a page view after the response has been sent.
 * Call this from middleware or Route Handlers — read headers BEFORE calling.
 */
export function logPageView(event: PageViewEvent): void {
  after(() => {
    console.log(
      "[page-view]",
      JSON.stringify({
        path: event.path,
        ua: event.userAgent,
        ip: event.ip,
        ref: event.referrer,
        ts: event.timestamp,
      })
    );
  });
}

/**
 * Log a generic server-side analytics event after the response.
 * Use for form submissions, API calls, etc.
 */
export function logServerEvent(event: ServerAnalyticsEvent): void {
  after(() => {
    console.log(
      "[server-event]",
      JSON.stringify({
        event: event.event,
        path: event.path,
        ...(event.payload ? { data: event.payload } : {}),
        ts: event.timestamp,
      })
    );
  });
}

/**
 * Defer an arbitrary async callback using after().
 * The callback runs after the HTTP response is sent to the client.
 */
export function deferAfterResponse(callback: () => void | Promise<void>): void {
  after(callback);
}
