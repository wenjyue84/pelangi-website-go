import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MetaEventUserData {
  em?: string; // email (plaintext — will be hashed)
  ph?: string; // phone (plaintext — will be hashed)
  client_ip_address?: string;
  client_user_agent?: string;
  fbc?: string; // Facebook click ID
  fbp?: string; // Facebook browser ID
}

interface MetaEventPayload {
  event_name: string;
  event_id: string;
  event_source_url: string;
  user_data?: MetaEventUserData;
  custom_data?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const PIXEL_ID = process.env.FACEBOOK_PIXEL_ID ?? "";
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN ?? "";
const ALLOWED_EVENTS = ["PageView", "ViewContent", "Contact"] as const;

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function buildServerPayload(
  body: MetaEventPayload,
  ip: string,
  userAgent: string
) {
  const userData: Record<string, string> = {
    client_ip_address: ip,
    client_user_agent: userAgent,
  };

  if (body.user_data?.em) {
    userData.em = sha256(body.user_data.em);
  }
  if (body.user_data?.ph) {
    // Strip non-digit characters before hashing per Meta requirements
    const digits = body.user_data.ph.replace(/\D/g, "");
    if (digits.length > 0) {
      userData.ph = sha256(digits);
    }
  }
  if (body.user_data?.fbc) {
    userData.fbc = body.user_data.fbc;
  }
  if (body.user_data?.fbp) {
    userData.fbp = body.user_data.fbp;
  }

  return {
    data: [
      {
        event_name: body.event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.event_id,
        event_source_url: body.event_source_url,
        action_source: "website",
        user_data: userData,
        ...(body.custom_data ? { custom_data: body.custom_data } : {}),
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Route Handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    // Silently succeed — CAPI is not configured, no point returning 500 to the client
    return NextResponse.json({ success: true, skipped: true });
  }

  let body: MetaEventPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Validate required fields
  if (!body.event_name || !body.event_id || !body.event_source_url) {
    return NextResponse.json(
      { error: "Missing required fields: event_name, event_id, event_source_url" },
      { status: 400 }
    );
  }

  // Only allow known event types
  if (!ALLOWED_EVENTS.includes(body.event_name as typeof ALLOWED_EVENTS[number])) {
    return NextResponse.json(
      { error: `Event name must be one of: ${ALLOWED_EVENTS.join(", ")}` },
      { status: 400 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "0.0.0.0";
  const userAgent = request.headers.get("user-agent") || "";

  const payload = buildServerPayload(body, ip, userAgent);

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[meta-capi] API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Meta API error" },
        { status: 502 }
      );
    }

    const result = await response.json();
    return NextResponse.json({ success: true, events_received: result.events_received });
  } catch (err) {
    console.error("[meta-capi] Network error:", err);
    return NextResponse.json(
      { error: "Failed to send event to Meta" },
      { status: 502 }
    );
  }
}
