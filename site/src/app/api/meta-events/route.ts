import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { deferAfterResponse, logServerEvent } from "@/lib/server-analytics";

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

  // Read headers BEFORE calling after() — dynamic APIs must not be used inside after()
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "0.0.0.0";
  const userAgent = request.headers.get("user-agent") || "";

  const payload = buildServerPayload(body, ip, userAgent);

  // Defer the Facebook API call — runs after the response is sent to the client
  deferAfterResponse(async () => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(10000),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[meta-capi] API error:", response.status, errorText);
      }
    } catch (err) {
      console.error("[meta-capi] Network error:", err);
    }
  });

  // Log the event for server-side analytics
  logServerEvent({
    event: body.event_name,
    path: body.event_source_url,
    payload: { event_id: body.event_id },
    timestamp: new Date().toISOString(),
  });

  // Respond immediately — Facebook API call happens after response is sent
  return NextResponse.json({ success: true, deferred: true });
}
