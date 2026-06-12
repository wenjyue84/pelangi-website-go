/**
 * /api/mcp — Pelangi Capsule Hostel MCP Server
 *
 * JSON-RPC 2.0 MCP server for Rainbow AI to query website-specific context:
 * hostel info, rooms, pricing, events, and guest inquiry submission.
 *
 * Used by: Rainbow AI (Lightsail) → calls this as an MCP client to get
 * website context that supplements its internal hostel operation tools.
 *
 * Protocol: MCP 2024-11-05 (JSON-RPC 2.0 over HTTP POST)
 * Auth: Bearer token via MCP_API_KEY env var (optional; skip if unset)
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSql, ensureTables } from "@/lib/db";
import { events as staticEvents } from "@/data/events";

// ─── Tool Definitions ──────────────────────────────────────────────────────

const TOOLS = [
  {
    name: "pelangi_get_hostel_info",
    description:
      "Get Pelangi Capsule Hostel details: address, contact, check-in/out times, WiFi, house rules, amenities, and booking links. Use this to answer basic guest questions.",
    inputSchema: { type: "object" as const, properties: {} },
  },
  {
    name: "pelangi_get_rooms",
    description:
      "Get available room types, bed configurations, capacity, and pricing (RM per night). Use this when guests ask about rooms, prices, or bed types.",
    inputSchema: {
      type: "object" as const,
      properties: {
        room_type: {
          type: "string",
          description: "Optional: filter by room type (male, female, mixed, private)",
        },
      },
    },
  },
  {
    name: "pelangi_get_events",
    description:
      "Get upcoming local events and public holidays near Johor Bahru. Useful for travel planning advice.",
    inputSchema: {
      type: "object" as const,
      properties: {
        limit: {
          type: "number",
          description: "Max events to return (default 10)",
        },
      },
    },
  },
  {
    name: "pelangi_create_inquiry",
    description:
      "Save a guest inquiry or booking request to the website database for staff follow-up. Use when a guest wants to book, ask a detailed question, or leave contact details.",
    inputSchema: {
      type: "object" as const,
      properties: {
        name:      { type: "string", description: "Guest name" },
        email:     { type: "string", description: "Guest email" },
        phone:     { type: "string", description: "Guest phone number" },
        message:   { type: "string", description: "Inquiry or booking request message" },
        check_in:  { type: "string", description: "Check-in date (YYYY-MM-DD)" },
        check_out: { type: "string", description: "Check-out date (YYYY-MM-DD)" },
        guests:    { type: "number", description: "Number of guests" },
        session_id:{ type: "string", description: "Chat session ID for tracking" },
      },
      required: ["message"],
    },
  },
  {
    name: "pelangi_get_booking_link",
    description:
      "Get the direct booking URL and payment instructions for Pelangi Capsule Hostel.",
    inputSchema: { type: "object" as const, properties: {} },
  },
];

// ─── Static Hostel Data ────────────────────────────────────────────────────

const HOSTEL_INFO = {
  name: "Pelangi Capsule Hostel",
  tagline: "Japanese-style capsule accommodation in Johor Bahru",
  address: "Taman Pelangi, Johor Bahru, Johor, Malaysia",
  contact: {
    phone: "+60 12 7088789",
    whatsapp: "https://wa.me/60127088789",
    email: "pelangi.capsulehostel@gmail.com",
    website: "https://pelangicapsulehostel.com",
  },
  hours: {
    checkin: "3:00 PM",
    checkout: "12:00 PM (noon)",
    reception: "24/7 — self check-in available",
  },
  amenities: [
    "Free WiFi (high-speed fibre)",
    "Personal locker with key card",
    "Individual reading light and USB charging port per pod",
    "Privacy curtain in every capsule",
    "Hot shower bathrooms",
    "Air conditioning throughout",
    "Common lounge area",
    "Luggage storage",
  ],
  house_rules: [
    "No smoking inside",
    "Quiet hours: 11 PM – 7 AM",
    "No outside guests in dorm areas",
    "Keep valuables in your locker",
    "Check-out by 12 PM to avoid extra charge",
  ],
  location: {
    nearest_landmark: "Taman Pelangi, JB",
    distance_to_singapore: "~30 minutes to Woodlands Causeway",
    distance_to_jb_sentral: "~10 minutes by Grab",
    nearby: ["AEON Tebrau City", "Paradigm Mall", "Pelangi leisure mall"],
  },
  wifi: {
    available: true,
    speed: "High-speed fibre",
    password: "Ask staff at check-in",
  },
  rating: {
    hostelworld: "3.3/10",
    review_count: 21,
  },
};

const ROOMS = [
  {
    type: "male_dorm",
    label: "Male Dormitory",
    beds: "Capsule pods",
    capacity: "1 per pod",
    gender: "Male only",
    price_per_night: 35,
    currency: "MYR",
    features: ["Individual pod with curtain", "Personal locker", "USB port", "Reading light"],
  },
  {
    type: "female_dorm",
    label: "Female Dormitory",
    beds: "Capsule pods",
    capacity: "1 per pod",
    gender: "Female only",
    price_per_night: 35,
    currency: "MYR",
    features: ["Individual pod with curtain", "Personal locker", "USB port", "Reading light"],
  },
  {
    type: "mixed_dorm",
    label: "Mixed Dormitory",
    beds: "Capsule pods",
    capacity: "1 per pod",
    gender: "Mixed",
    price_per_night: 35,
    currency: "MYR",
    features: ["Individual pod with curtain", "Personal locker", "USB port", "Reading light"],
  },
];

// ─── Tool Handlers ─────────────────────────────────────────────────────────

function handleGetHostelInfo() {
  return { content: [{ type: "text", text: JSON.stringify(HOSTEL_INFO, null, 2) }] };
}

function handleGetRooms(args: Record<string, unknown>) {
  let rooms = ROOMS;
  if (args.room_type) {
    const filter = String(args.room_type).toLowerCase();
    rooms = rooms.filter((r) => r.type.includes(filter) || r.label.toLowerCase().includes(filter));
  }
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            hostel: "Pelangi Capsule Hostel",
            currency: "MYR",
            note: "Prices per pod per night. Book at pelangicapsulehostel.com",
            rooms,
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleGetEvents(args: Record<string, unknown>) {
  const limit = typeof args.limit === "number" ? args.limit : 10;
  const today = new Date().toISOString().split("T")[0];

  // Merge static public holidays with DB events
  let dbEvents: Record<string, unknown>[] = [];
  try {
    const sql = getSql();
    dbEvents = await sql`
      SELECT title, event_date, event_time, description, category, location
      FROM website_events
      WHERE is_active = true AND event_date >= ${today}
      ORDER BY event_date ASC
      LIMIT ${limit}
    ` as Record<string, unknown>[];
  } catch {
    // Table may not exist yet; fall back to static only
  }

  const staticUpcoming = staticEvents
    .filter((e) => e.date >= today)
    .slice(0, limit)
    .map((e) => ({
      title: e.title,
      date: e.date,
      time: e.time,
      description: e.description,
      category: e.category,
      location: e.location || "Nationwide",
      source: "public_holiday",
    }));

  const dbUpcoming = dbEvents.map((e) => ({
    title: String(e.title),
    date: e.event_date instanceof Date ? e.event_date.toISOString().split("T")[0] : String(e.event_date),
    time: String(e.event_time),
    description: String(e.description ?? ""),
    category: String(e.category ?? "Event"),
    location: String(e.location ?? ""),
    source: "local_event",
  }));

  const combined = [...staticUpcoming, ...dbUpcoming]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({ events: combined, total: combined.length }, null, 2),
      },
    ],
  };
}

// ─── ensureTables once-per-process guard ──────────────────────────────────
let tablesReady: Promise<void> | null = null;
function getTablesReady(): Promise<void> {
  if (!tablesReady) {
    tablesReady = ensureTables().catch((err) => {
      // Reset on failure so the next request can retry
      tablesReady = null;
      throw err;
    });
  }
  return tablesReady;
}

// ─── Input validation helpers ──────────────────────────────────────────────
function validateInquiryArgs(args: Record<string, unknown>): string | null {
  if (args.name !== undefined && args.name !== null) {
    if (typeof args.name !== "string" || args.name.length > 100) {
      return "name must be a string of at most 100 characters";
    }
  }
  if (args.email !== undefined && args.email !== null) {
    if (typeof args.email !== "string") return "email must be a string";
    if (args.email.length > 254) return "email must be at most 254 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(args.email)) return "email format is invalid";
  }
  if (args.message !== undefined && args.message !== null) {
    if (typeof args.message !== "string" || args.message.length > 2000) {
      return "message must be a string of at most 2000 characters";
    }
  }
  if (args.phone !== undefined && args.phone !== null) {
    if (typeof args.phone !== "string" || args.phone.length > 50) {
      return "phone must be a string of at most 50 characters";
    }
  }
  if (args.session_id !== undefined && args.session_id !== null) {
    if (typeof args.session_id !== "string" || args.session_id.length > 128) {
      return "session_id must be a string of at most 128 characters";
    }
  }
  return null;
}

async function handleCreateInquiry(args: Record<string, unknown>) {
  if (!args.message) {
    return { content: [{ type: "text", text: "Error: message is required" }], isError: true };
  }

  const validationError = validateInquiryArgs(args);
  if (validationError) {
    return { content: [{ type: "text", text: `Error: ${validationError}` }], isError: true };
  }

  try {
    await getTablesReady();
    const sql = getSql();
    const rows = await sql`
      INSERT INTO website_inquiries (name, email, phone, message, check_in, check_out, guests, session_id)
      VALUES (
        ${(args.name as string) || null},
        ${(args.email as string) || null},
        ${(args.phone as string) || null},
        ${args.message as string},
        ${(args.check_in as string) || null},
        ${(args.check_out as string) || null},
        ${(args.guests as number) || null},
        ${(args.session_id as string) || null}
      )
      RETURNING id, created_at
    ` as Record<string, unknown>[];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            inquiry_id: rows[0].id,
            message: "Inquiry saved. Staff will follow up via WhatsApp or email.",
            created_at: rows[0].created_at,
          }),
        },
      ],
    };
  } catch (err) {
    return {
      content: [{ type: "text", text: `Error saving inquiry: ${err instanceof Error ? err.message : String(err)}` }],
      isError: true,
    };
  }
}

function handleGetBookingLink() {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          booking_url: "https://pelangicapsulehostel.com/book",
          payment_methods: ["FPX online banking (Malaysian banks)", "Credit/debit card via Stripe"],
          currency: "MYR",
          note: "Book directly on our website for the best price. No extra fees.",
          whatsapp_booking: "Send 'BOOK' to +60127088789 for manual booking assistance.",
        }),
      },
    ],
  };
}

// ─── Tool Dispatcher ───────────────────────────────────────────────────────

async function executeTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "pelangi_get_hostel_info":  return handleGetHostelInfo();
    case "pelangi_get_rooms":        return handleGetRooms(args);
    case "pelangi_get_events":       return handleGetEvents(args);
    case "pelangi_create_inquiry":   return handleCreateInquiry(args);
    case "pelangi_get_booking_link": return handleGetBookingLink();
    default:
      return { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true };
  }
}

// ─── Auth ──────────────────────────────────────────────────────────────────

function checkAuth(req: NextRequest): boolean {
  const apiKey = process.env.MCP_API_KEY;
  if (!apiKey) return true; // No key configured = open (dev mode)
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${apiKey}`;
}

// ─── MCP JSON-RPC Handler ──────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { method, params, id: reqId } = body;

    if (method === "initialize") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id: reqId,
        result: {
          protocolVersion: "2024-11-05",
          serverInfo: { name: "pelangi-capsule-hostel", version: "1.0.0" },
          capabilities: { tools: {} },
        },
      });
    }

    if (method === "tools/list") {
      return NextResponse.json({ jsonrpc: "2.0", id: reqId, result: { tools: TOOLS } });
    }

    if (method === "tools/call") {
      const { name, arguments: toolArgs } = params || {};
      if (!name) {
        return NextResponse.json(
          { jsonrpc: "2.0", id: reqId, error: { code: -32602, message: "Tool name required" } },
          { status: 400 }
        );
      }
      const result = await executeTool(name, toolArgs || {});
      return NextResponse.json({ jsonrpc: "2.0", id: reqId, result });
    }

    return NextResponse.json(
      { jsonrpc: "2.0", id: reqId, error: { code: -32601, message: `Unknown method: ${method}` } },
      { status: 400 }
    );
  } catch (err) {
    console.error("[MCP]", err);
    return NextResponse.json(
      { jsonrpc: "2.0", id: null, error: { code: -32603, message: err instanceof Error ? err.message : "Internal error" } },
      { status: 500 }
    );
  }
}

// ─── Discovery GET ─────────────────────────────────────────────────────────

export async function GET() {
  return NextResponse.json({
    name: "Pelangi Capsule Hostel MCP Server",
    description: "Website context tools for Rainbow AI — hostel info, rooms, events, and guest inquiry submission.",
    tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
    protocol: "json-rpc-2.0",
    endpoint: "POST /api/mcp",
  });
}
