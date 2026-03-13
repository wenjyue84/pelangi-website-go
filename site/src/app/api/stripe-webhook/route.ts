import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 },
    );
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Webhook signature verification failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      // Log successful FPX payment for booking confirmation
      // In production, this would update a database and send confirmation email/WhatsApp
      console.log(
        `[Stripe] FPX Payment succeeded: ${paymentIntent.id}`,
        `Amount: RM${(paymentIntent.amount / 100).toFixed(2)}`,
        `Guest: ${paymentIntent.metadata.guestName}`,
        `Room: ${paymentIntent.metadata.roomType}`,
        `Check-in: ${paymentIntent.metadata.checkIn}`,
        `Check-out: ${paymentIntent.metadata.checkOut}`,
      );
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(
        `[Stripe] FPX Payment failed: ${paymentIntent.id}`,
        `Guest: ${paymentIntent.metadata.guestName}`,
        `Error: ${paymentIntent.last_payment_error?.message ?? "Unknown"}`,
      );
      break;
    }

    default:
      // Unhandled event type — acknowledge receipt
      break;
  }

  return NextResponse.json({ received: true });
}
