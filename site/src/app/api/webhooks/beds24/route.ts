import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { beds24Client } from "@/lib/beds24-client";
import { CHANNEL_MANAGER_CONFIG } from "@/config/channel-manager";
import { ensureChannelTables, getSql } from "@/lib/db";
import type { ChannelManagerWebhookPayload } from "@/lib/channel-manager-types";

// Webhook endpoint for Beds24 real-time updates
// Validates signature, then processes availability/booking changes
export async function POST(request: NextRequest) {
  // 503 if webhook secret is not configured
  if (!CHANNEL_MANAGER_CONFIG.webhook.secret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 503 },
    );
  }

  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-beds24-signature");

    if (!beds24Client.validateWebhook(rawBody, signature)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload: ChannelManagerWebhookPayload = JSON.parse(rawBody);

    switch (payload.eventType) {
      case "availability_update": {
        revalidateTag("rooms", "max");
        revalidatePath("/rooms");
        revalidatePath("/book");
        return NextResponse.json({ status: "processed" });
      }

      case "booking_created":
      case "booking_cancelled": {
        if (process.env.DATABASE_URL) {
          const booking = payload.data as unknown as Record<string, unknown>;
          const bookingId =
            (booking.externalBookingId as string | undefined) ?? null;
          const roomId = (booking.roomId as string | undefined) ?? null;
          const status = (booking.status as string | undefined) ?? null;

          await ensureChannelTables();
          const sql = getSql();
          await sql`
            INSERT INTO channel_bookings
              (event_type, booking_id, room_id, status, payload)
            VALUES
              (${payload.eventType}, ${bookingId}, ${roomId}, ${status}, ${JSON.stringify(payload) as unknown as object})
            ON CONFLICT DO NOTHING
          `;
        } else {
          console.warn(
            `[beds24-webhook] DATABASE_URL not set — skipping audit for ${payload.eventType}`,
          );
        }
        return NextResponse.json({ status: "processed" });
      }

      default:
        return NextResponse.json({ status: "processed" });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Processing failed" },
      { status: 500 },
    );
  }
}
