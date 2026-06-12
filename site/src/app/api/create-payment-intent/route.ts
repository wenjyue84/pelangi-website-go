import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

const ALLOWED_ROOM_TYPES = ["Capsule Pod", "Monthly Capsule Pod"] as const;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_RE = /.+@.+\..+/;
const MAX_AMOUNT_SEN = 500000; // RM5,000 cap

interface CreatePaymentBody {
  amount: number; // amount in cents (sen)
  roomType: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail?: string;
}

export async function POST(request: NextRequest) {
  let body: CreatePaymentBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { amount, roomType, checkIn, checkOut, guestName, guestEmail } = body;

  // Validate amount: integer, > 0, <= 500000 sen
  if (!Number.isInteger(amount) || amount <= 0) {
    return NextResponse.json(
      { error: "amount must be a positive integer (sen)" },
      { status: 400 },
    );
  }
  if (amount > MAX_AMOUNT_SEN) {
    return NextResponse.json(
      { error: `amount must not exceed ${MAX_AMOUNT_SEN} sen (RM5,000)` },
      { status: 400 },
    );
  }

  // Validate checkIn / checkOut: YYYY-MM-DD format, checkOut strictly after checkIn
  if (!checkIn || !DATE_RE.test(checkIn)) {
    return NextResponse.json(
      { error: "checkIn must be a date in YYYY-MM-DD format" },
      { status: 400 },
    );
  }
  if (!checkOut || !DATE_RE.test(checkOut)) {
    return NextResponse.json(
      { error: "checkOut must be a date in YYYY-MM-DD format" },
      { status: 400 },
    );
  }
  if (checkOut <= checkIn) {
    return NextResponse.json(
      { error: "checkOut must be strictly after checkIn" },
      { status: 400 },
    );
  }

  // Validate roomType: allowlist
  if (!ALLOWED_ROOM_TYPES.includes(roomType as (typeof ALLOWED_ROOM_TYPES)[number])) {
    return NextResponse.json(
      { error: `roomType must be one of: ${ALLOWED_ROOM_TYPES.join(", ")}` },
      { status: 400 },
    );
  }

  // Validate guestName: required, max 64 chars
  if (!guestName || typeof guestName !== "string" || guestName.trim().length === 0) {
    return NextResponse.json(
      { error: "guestName is required" },
      { status: 400 },
    );
  }
  if (guestName.length > 64) {
    return NextResponse.json(
      { error: "guestName must be 64 characters or fewer" },
      { status: 400 },
    );
  }

  // Validate email if provided
  if (guestEmail !== undefined && guestEmail !== "" && !EMAIL_RE.test(guestEmail)) {
    return NextResponse.json(
      { error: "guestEmail must be a valid email address" },
      { status: 400 },
    );
  }

  try {
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "myr",
      payment_method_types: ["fpx"],
      metadata: {
        roomType,
        checkIn,
        checkOut,
        guestName,
        ...(guestEmail && { guestEmail }),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create payment intent";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
