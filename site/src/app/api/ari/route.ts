import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROOM_TYPES, PROPERTY } from "@/data/rooms";
import { getCachedAvailability } from "@/lib/cached-availability";

/**
 * ARI (Availability, Rates, Inventory) endpoint for connectivity partners.
 *
 * Google Free Booking Links require a connectivity partner (e.g., Beds24,
 * Cloudbeds, RoomRaccoon) to pull live rates and availability. This endpoint
 * exposes the hostel's ARI data in a standard JSON format that partners can
 * consume via their pull-based integration.
 *
 * Pulls real-time data from the configured channel manager (Beds24).
 * Falls back to local room data if channel manager is not configured.
 *
 * Query params:
 *   - checkin  (YYYY-MM-DD, required)
 *   - checkout (YYYY-MM-DD, required)
 *   - currency (default: MYR)
 *
 * Authentication: API key via x-api-key header (set ARI_API_KEY env var).
 */
export async function GET(request: NextRequest) {
  const apiKey = process.env.ARI_API_KEY;
  if (apiKey) {
    const provided = request.headers.get("x-api-key");
    if (provided !== apiKey) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }
  }

  const params = request.nextUrl.searchParams;
  const checkin = params.get("checkin");
  const checkout = params.get("checkout");
  // Only MYR is supported — normalize any other value to MYR
  const rawCurrency = params.get("currency");
  const currency = rawCurrency && rawCurrency.toUpperCase() === "MYR" ? "MYR" : "MYR";

  if (!checkin || !checkout) {
    return NextResponse.json(
      { error: "checkin and checkout query parameters are required (YYYY-MM-DD)" },
      { status: 400 },
    );
  }

  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);

  if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
    return NextResponse.json(
      { error: "Invalid date format. Use YYYY-MM-DD." },
      { status: 400 },
    );
  }

  if (checkoutDate <= checkinDate) {
    return NextResponse.json(
      { error: "checkout must be after checkin" },
      { status: 400 },
    );
  }

  const nights = Math.ceil(
    (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Fetch live availability from channel manager (with cache() + cacheSignal() for cleanup)
  const channelAvailability = await getCachedAvailability(checkin, checkout);

  // Map to ARI response format
  const rooms = ROOM_TYPES.map((room) => {
    const channelRoom = channelAvailability.find((r) => r.roomId === room.id);
    const availableUnits = channelRoom?.available ?? room.totalUnits;
    const totalInventory = channelRoom?.total ?? room.totalUnits;

    return {
      room_id: room.id,
      room_name: room.name,
      description: room.description,
      max_occupancy: room.maxOccupancy,
      total_inventory: totalInventory,
      available_units: Math.max(0, availableUnits),
      rate: {
        nightly: room.nightlyRate,
        total: room.nightlyRate * nights,
        currency,
      },
      amenities: room.amenities,
    };
  });

  const response = {
    property_id: PROPERTY.id,
    property_name: PROPERTY.name,
    checkin,
    checkout,
    nights,
    currency,
    timezone: PROPERTY.timezone,
    checkin_time: PROPERTY.checkinTime,
    checkout_time: PROPERTY.checkoutTime,
    rooms,
    booking_url: `https://pelangicapsulehostel.com/book?checkin=${checkin}&checkout=${checkout}`,
    updated_at: new Date().toISOString(),
  };

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
