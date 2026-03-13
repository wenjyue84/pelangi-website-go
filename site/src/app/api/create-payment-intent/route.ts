import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

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

  if (!amount || amount < 100) {
    return NextResponse.json(
      { error: "Amount must be at least RM1.00 (100 sen)" },
      { status: 400 },
    );
  }

  if (!roomType || !checkIn || !checkOut || !guestName) {
    return NextResponse.json(
      { error: "roomType, checkIn, checkOut, and guestName are required" },
      { status: 400 },
    );
  }

  try {
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
