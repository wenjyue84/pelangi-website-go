import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { beds24Client } from "@/lib/beds24-client";
import type { ChannelManagerWebhookPayload } from "@/lib/channel-manager-types";

// Webhook endpoint for Beds24 real-time updates
// Validates signature, then processes availability/booking changes
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-beds24-signature");

    if (!beds24Client.validateWebhook(rawBody, signature)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload: ChannelManagerWebhookPayload = JSON.parse(rawBody);

    switch (payload.eventType) {
      case "availability_update": {
        // Handle availability updates from OTAs
        const availability = payload.data as any;
        console.info(
          `Availability update: Room ${availability.roomId} - ${availability.available}/${availability.total} units available`,
        );
        // In production, update local database with new availability
        // Example: await db.roomInventory.update(...)
        return NextResponse.json({ status: "processed" });
      }

      case "booking_created": {
        // Handle new booking from OTA
        const booking = payload.data as any;
        console.info(
          `New booking from ${booking.source}: ${booking.guestName} for ${booking.checkin} to ${booking.checkout}`,
        );
        // In production, create booking record and reduce availability
        // Example: await db.bookings.create({...})
        // Example: await beds24Client.updateAvailability(...)
        return NextResponse.json({ status: "processed" });
      }

      case "booking_cancelled": {
        // Handle cancelled booking from OTA
        const booking = payload.data as any;
        console.info(
          `Booking cancelled: ${booking.externalBookingId} from ${booking.source}`,
        );
        // In production, mark booking as cancelled and restore availability
        // Example: await db.bookings.update({...})
        // Example: await beds24Client.restoreAvailability(...)
        return NextResponse.json({ status: "processed" });
      }

      default:
        return NextResponse.json(
          { error: "Unknown event type" },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Processing failed" },
      { status: 500 },
    );
  }
}
