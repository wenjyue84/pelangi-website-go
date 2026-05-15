/**
 * Neon serverless DB client for pelangi-website.
 * Used by /api/mcp for dynamic website data (inquiries, events).
 */
import { neon } from "@neondatabase/serverless";

let _sql: ReturnType<typeof neon> | undefined;

/** Lazy-initialized Neon client — avoids throwing at build time when DATABASE_URL is absent. */
export function getSql() {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is required");
    }
    _sql = neon(process.env.DATABASE_URL);
  }
  return _sql;
}

/**
 * Ensure required tables exist. Call once at startup or on first MCP request.
 */
export async function ensureTables(): Promise<void> {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS website_inquiries (
      id          SERIAL PRIMARY KEY,
      name        TEXT,
      email       TEXT,
      phone       TEXT,
      message     TEXT NOT NULL,
      check_in    DATE,
      check_out   DATE,
      guests      INT,
      session_id  TEXT,
      source      TEXT DEFAULT 'chatbot',
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS website_events (
      id          SERIAL PRIMARY KEY,
      title       TEXT NOT NULL,
      event_date  DATE NOT NULL,
      event_time  TEXT DEFAULT 'All Day',
      description TEXT,
      category    TEXT DEFAULT 'Event',
      location    TEXT,
      is_active   BOOLEAN DEFAULT true,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}
