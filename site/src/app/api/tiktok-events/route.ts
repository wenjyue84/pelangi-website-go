import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { deferAfterResponse, logServerEvent } from "@/lib/server-analytics";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TikTokEventPayload {
  event: string;
  event_id: string;
  url: string;
  user_data?: {
    em?: string; // pre-hashed email (SHA-256 hex)
    ph?: string; // pre-hashed phone (SHA-256 hex)
  };
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const PIXEL_CODE = process.env.TIKTOK_PIXEL_ID ?? "";
const ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN ?? "";
const ALLOWED_EVENTS = ["ViewContent", "Contact", "Search"] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sha256(value: string): string {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

function buildPayload(
  body: TikTokEventPayload,
  ip: string,
  userAgent: string
) {
  const context: Record<string, unknown> = {
    user_agent: userAgent,
    ip: ip,
    page: {
      url: body.url,
    },
  };

  // User data — values are already SHA-256 hashed from the client
  const user: Record<string, string> = {};
  const SHA256_HEX_RE = /^[a-f0-9]{64}$/i;
  if (body.user_data?.em) {
    // Pass through if already a valid SHA-256 hex digest; otherwise hash it.
    // Using a strict regex prevents arbitrary 64-char junk from bypassing hashing.
    user.email = SHA256_HEX_RE.test(body.user_data.em)
      ? body.user_data.em
      : sha256(body.user_data.em);
  }
  if (body.user_data?.ph) {
    user.phone_number = SHA256_HEX_RE.test(body.user_data.ph)
      ? body.user_data.ph
      : sha256(body.user_data.ph);
  }

  return {
    pixel_code: PIXEL_CODE,
    event: body.event,
    event_id: body.event_id,
    timestamp: new Date().toISOString(),
    context,
    ...(Object.keys(user).length > 0 ? { user } : {}),
  };
}

// ---------------------------------------------------------------------------
// Route Handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  if (!PIXEL_CODE || !ACCESS_TOKEN) {
    // Silently succeed — TikTok Events API is not configured
    return NextResponse.json({ success: true, skipped: true });
  }

  let body: TikTokEventPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Validate required fields
  if (!body.event || !body.event_id || !body.url) {
    return NextResponse.json(
      { error: "Missing required fields: event, event_id, url" },
      { status: 400 }
    );
  }

  // Only allow known event types
  if (!ALLOWED_EVENTS.includes(body.event as typeof ALLOWED_EVENTS[number])) {
    return NextResponse.json(
      { error: `Event must be one of: ${ALLOWED_EVENTS.join(", ")}` },
      { status: 400 }
    );
  }

  // Read headers BEFORE calling after() — dynamic APIs must not be used inside after()
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "0.0.0.0";
  const userAgent = request.headers.get("user-agent") || "";

  const payload = buildPayload(body, ip, userAgent);

  // Defer the TikTok API call — runs after the response is sent to the client
  deferAfterResponse(async () => {
    try {
      const response = await fetch(
        "https://business-api.tiktok.com/open_api/v1.3/event/track/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Token": ACCESS_TOKEN,
          },
          body: JSON.stringify({ data: [payload] }),
          signal: AbortSignal.timeout(10000),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[tiktok-events] API error:", response.status, errorText);
      }
    } catch (err) {
      console.error("[tiktok-events] Network error:", err);
    }
  });

  // Log the event for server-side analytics
  logServerEvent({
    event: `tiktok:${body.event}`,
    path: body.url,
    payload: { event_id: body.event_id },
    timestamp: new Date().toISOString(),
  });

  // Respond immediately — TikTok API call happens after response is sent
  return NextResponse.json({ success: true, deferred: true });
}
