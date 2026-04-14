"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "";
const COOKIE_NAME = "pelangi_cookie_consent";

function readConsentCookie(): boolean {
  if (typeof document === "undefined") return false;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)
  );
  return match?.[1] === "accepted";
}

/**
 * Generate a unique event ID for deduplication between browser pixel and Events API.
 * Uses crypto.randomUUID when available, falls back to timestamp + random.
 */
function generateEventId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * SHA-256 hash a string value (browser-side, using SubtleCrypto).
 * Returns the hex digest. Used to hash PII before sending to Events API.
 */
async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Send a server-side TikTok event for dual-signal deduplication.
 */
async function sendServerEvent(
  eventName: string,
  eventId: string,
  url: string,
  userData?: { em?: string; ph?: string }
): Promise<void> {
  try {
    const hashedUser: Record<string, string> = {};
    if (userData?.em) {
      hashedUser.em = await sha256(userData.em);
    }
    if (userData?.ph) {
      const digits = userData.ph.replace(/\D/g, "");
      if (digits.length > 0) {
        hashedUser.ph = await sha256(digits);
      }
    }

    await fetch("/api/tiktok-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: eventName,
        event_id: eventId,
        url,
        user_data: Object.keys(hashedUser).length > 0 ? hashedUser : undefined,
      }),
    });
  } catch {
    // Silently fail — analytics should never block user experience
  }
}

/**
 * TikTok Pixel + Events API dual-signal provider.
 * Loads the TikTok Pixel base code via lazyOnload and fires browser-side events.
 * For server-side deduplication, sends matching events to /api/tiktok-events.
 *
 * Tracked events:
 * - ViewContent: room pages
 * - Contact: contact form submission
 * - Search: blog/guide search
 */
export default function TikTokPixelProvider() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(readConsentCookie());

    function handleConsent(e: Event) {
      const value = (e as CustomEvent<{ consent: string }>).detail.consent;
      setConsented(value === "accepted");
    }

    window.addEventListener("cookie-consent", handleConsent);
    return () => window.removeEventListener("cookie-consent", handleConsent);
  }, []);

  // Register global event handler for TikTok tracking events
  useEffect(() => {
    if (!consented || !PIXEL_ID) return;

    function handleTikTokEvent(e: Event) {
      const detail = (e as CustomEvent<{
        event: string;
        url?: string;
        user_data?: { em?: string; ph?: string };
      }>).detail;

      const eventId = generateEventId();
      const url = detail.url || window.location.href;

      // Browser-side pixel event
      if (typeof window !== "undefined" && (window as Record<string, unknown>).ttq) {
        const ttq = (window as Record<string, unknown>).ttq as {
          track: (event: string, props?: Record<string, unknown>, opts?: Record<string, unknown>) => void;
        };
        ttq.track(detail.event, {}, { event_id: eventId });
      }

      // Server-side Events API (deduplication via matching event_id)
      sendServerEvent(detail.event, eventId, url, detail.user_data);
    }

    window.addEventListener("tiktok-track", handleTikTokEvent);
    return () => window.removeEventListener("tiktok-track", handleTikTokEvent);
  }, [consented]);

  if (!consented || !PIXEL_ID) return null;

  return (
    <Script
      id="tiktok-pixel-init"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
          ttq.methods=["page","track","identify","instances","debug","on","off",
          "once","ready","alias","group","enableCookie","disableCookie","holdConsent",
          "revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=
          function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
          for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
          ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;
          n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){
          var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
          ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},
          ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
          var a=d.createElement("script");a.type="text/javascript";a.async=!0;
          a.src=r+"?sdkid="+e+"&lib="+t;a.integrity="sha384-/E3jBC6DCAnSa2DwyCpJnCEamCjN6/yPUQ1A2C+uHvW66ROgKjnhkL0M2h4iTyxT";a.crossOrigin="anonymous";var s=d.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(a,s)};
          ttq.load('${PIXEL_ID}');
          ttq.page();
          }(window,document,'ttq');`,
      }}
    />
  );
}
