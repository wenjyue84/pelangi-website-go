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
    revalidateTag(tag);
    result.tag = tag;
  }

  return NextResponse.json(result);
}
