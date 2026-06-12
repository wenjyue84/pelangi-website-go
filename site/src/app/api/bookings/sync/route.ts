import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { beds24Client } from "@/lib/beds24-client";
import { ROOM_TYPES } from "@/data/rooms";
import type { ChannelManagerBooking } from "@/lib/channel-manager-types";

// POST: Sync booking to channel manager
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { checkIn, checkOut, roomType, guestName, guestEmail, guestPhone } = body;

    if (!checkIn || !checkOut || !roomType || !guestName || !guestEmail || !guestPhone) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const checkin = new Date(checkIn);
    const checkout = new Date(checkOut);
    if (isNaN(checkin.getTime()) || isNaN(checkout.getTime()) || checkout <= checkin) {
      return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
    }

    const nights = Math.ceil(
      (checkout.getTime() - checkin.getTime()) / (1000 * 60 * 60 * 24),
    );

    // "Premium Capsule Pod" → upper-deck (RM35); everything else → lower-deck (RM45)
    const isPremium = roomType === "Premium Capsule Pod";
    const upperDeck = ROOM_TYPES.find((r) => r.id === "upper-deck-pod");
    const lowerDeck = ROOM_TYPES.find((r) => r.id === "lower-deck-pod");
    const nightlyRate = isPremium
      ? (upperDeck?.nightlyRate ?? 35)
      : (lowerDeck?.nightlyRate ?? 45);
    const booking: Partial<ChannelManagerBooking> = {
      roomId: isPremium ? "premium-capsule" : "standard-capsule",
      guestName,
      guestEmail,
      guestPhone,
      checkin: checkin.toISOString().split("T")[0],
      checkout: checkout.toISOString().split("T")[0],
      nights,
      adults: body.adults || 1,
      totalPrice: nightlyRate * nights,
      currency: "MYR",
      status: "confirmed",
      source: "website",
      createdAt: new Date().toISOString(),
    };

    const synced = await beds24Client.syncBooking(booking);
    return NextResponse.json({ success: true, synced });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// GET: Check availability
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  if (params.get("action") !== "check") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const checkin = params.get("checkin");
  const checkout = params.get("checkout");
  const roomId = params.get("roomId");

  if (!checkin || !checkout || !roomId) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const availability = await beds24Client.getAvailability(checkin, checkout);
  const room = availability.find((a) => a.roomId === roomId);

  if (!room) {
    return NextResponse.json({ available: false }, { status: 404 });
  }

  return NextResponse.json({
    available: room.available > 0,
    availableUnits: room.available,
    totalUnits: room.total,
    rate: room.rate,
    currency: room.currency,
  });
}
