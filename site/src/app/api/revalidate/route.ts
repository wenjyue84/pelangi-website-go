import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// ---------------------------------------------------------------------------
// On-demand ISR revalidation webhook
// ---------------------------------------------------------------------------
// POST /api/revalidate
//
// Accepts a JSON body with either `path` or `tag` (or both) and triggers
// Next.js on-demand revalidation. Protected by a shared secret sent in
// the x-revalidate-secret header.
//
// Body shape:
//   { "path": "/rooms" }           — revalidate a specific route
//   { "tag": "rooms" }             — revalidate all fetches tagged "rooms"
//   { "path": "/rooms", "tag": "rooms" } — both
// ---------------------------------------------------------------------------

interface RevalidateBody {
  path?: string;
  tag?: string;
}

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  // If no secret is configured, disable the endpoint entirely
  if (!secret) {
    return NextResponse.json(
      { error: "Revalidation endpoint is not configured" },
      { status: 500 },
    );
  }

  // Authenticate via header
  const provided = request.headers.get("x-revalidate-secret");
  if (provided !== secret) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  // Parse body
  let body: RevalidateBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const { path, tag } = body;

  if (!path && !tag) {
    return NextResponse.json(
      { error: "Request body must include 'path' and/or 'tag'" },
      { status: 400 },
    );
  }

  // Validate path starts with /
  if (path && !path.startsWith("/")) {
    return NextResponse.json(
      { error: "Path must start with '/'" },
      { status: 400 },
    );
  }

  // Perform revalidation
  const result: { revalidated: true; path?: string; tag?: string } = {
    revalidated: true,
  };

  if (path) {
    revalidatePath(path);
    result.path = path;
  }

  if (tag) {
    revalidateTag(tag, 'max');
    result.tag = tag;
  }

  // Notify Rainbow AI to re-sync KB after content revalidation (Phase 5)
  notifyRainbowKbChange().catch(() => {});

  return NextResponse.json(result);
}

// ─── Rainbow AI KB change notification ─────────────────────────────────────
// Fire-and-forget POST to Rainbow AI's knowledge-base sync endpoint.
// Triggers an immediate re-fetch of /api/kb instead of waiting for the 6h interval.
async function notifyRainbowKbChange(): Promise<void> {
  const rainbowUrl = process.env.RAINBOW_API_URL;
  if (!rainbowUrl) return; // Not configured — skip silently

  try {
    const resp = await fetch(`${rainbowUrl}/api/rainbow/knowledge-base/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'revalidate-webhook', ts: new Date().toISOString() }),
      signal: AbortSignal.timeout(5_000),
    });
    if (resp.ok) {
      console.log('[revalidate] Rainbow AI KB sync triggered');
    } else {
      console.warn(`[revalidate] Rainbow AI KB sync failed: HTTP ${resp.status}`);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`[revalidate] Rainbow AI KB sync error: ${message}`);
  }
}
