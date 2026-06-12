import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSql, ensurePaymentTables } from "@/lib/db";

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
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Webhook signature verification failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // If DATABASE_URL is not configured, ack the event so Stripe doesn't retry forever.
  if (!process.env.DATABASE_URL) {
    console.warn("[stripe-webhook] DATABASE_URL not set — skipping persistence for event", event.id);
    return NextResponse.json({ received: true });
  }

  // Ensure the payments table exists (memoized — DDL runs once per process).
  await ensurePaymentTables();

  const sql = getSql();

  // Extract common fields from payment_intent events.
  let paymentIntentId: string | null = null;
  let amount: number | null = null;
  let currency: string | null = null;
  let guestEmail: string | null = null;
  let guestName: string | null = null;
  let status: string | null = null;

  if (
    event.type === "payment_intent.succeeded" ||
    event.type === "payment_intent.payment_failed"
  ) {
    const pi = event.data.object as Stripe.PaymentIntent;
    paymentIntentId = pi.id;
    amount = pi.amount;
    currency = pi.currency;
    guestEmail =
      (pi.metadata?.guestEmail ?? null) ||
      (pi.receipt_email ?? null);
    guestName = pi.metadata?.guestName ?? null;
    status = pi.status;
  }

  // Persist the event row with idempotency guard (ON CONFLICT DO NOTHING).
  let isFirstDelivery = false;
  try {
    const rows = await sql`
      INSERT INTO stripe_payment_events
        (stripe_event_id, event_type, payment_intent_id, amount, currency, guest_email, guest_name, status, raw)
      VALUES
        (${event.id}, ${event.type}, ${paymentIntentId}, ${amount}, ${currency}, ${guestEmail}, ${guestName}, ${status}, ${JSON.stringify(event) as unknown as object})
      ON CONFLICT (stripe_event_id) DO NOTHING
      RETURNING id
    `;
    isFirstDelivery = (rows as unknown[]).length > 0;
  } catch (err) {
    console.error("[stripe-webhook] DB insert failed:", err);
    // Return 500 so Stripe retries.
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  // For payment_intent.succeeded on first delivery: send confirmation email to guest.
  if (event.type === "payment_intent.succeeded" && isFirstDelivery && guestEmail) {
    const pi = event.data.object as Stripe.PaymentIntent;
    const amountRm = ((pi.amount ?? 0) / 100).toFixed(2);
    const checkIn = pi.metadata?.checkIn ?? null;
    const checkOut = pi.metadata?.checkOut ?? null;
    const name = guestName ?? "Guest";

    // Capture env vars before entering after() callback (cannot read request-scoped data inside after).
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = guestEmail;

    after(async () => {
      if (!resendApiKey) {
        console.warn("[stripe-webhook] RESEND_API_KEY not set — skipping confirmation email");
        return;
      }
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendApiKey);
        const stayDetails =
          checkIn && checkOut
            ? `<tr><td style="padding:8px 0;color:#78716c;width:140px;">Stay dates</td><td style="padding:8px 0;color:#1c1917;">${checkIn} → ${checkOut}</td></tr>`
            : "";
        await resend.emails.send({
          from: "Pelangi Capsule Hostel <noreply@pelangicapsulehostel.com>",
          to: recipientEmail,
          subject: "Payment confirmed — Pelangi Capsule Hostel",
          html: `
<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1c1917;">
  <div style="text-align:center;padding:32px 0 24px;">
    <h1 style="margin:0;font-size:24px;color:#292524;">Pelangi Capsule Hostel</h1>
    <p style="margin:8px 0 0;color:#78716c;">26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru</p>
  </div>
  <div style="padding:24px;background:#fafaf9;border-radius:12px;">
    <p>Hi ${name},</p>
    <p>We've received your payment. See details below:</p>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#78716c;width:140px;">Amount paid</td><td style="padding:8px 0;color:#1c1917;font-weight:600;">RM ${amountRm}</td></tr>
      ${stayDetails}
    </table>
    <p style="margin-top:16px;">We look forward to hosting you at <strong>Pelangi Capsule Hostel</strong>!</p>
    <p style="margin-bottom:0;">If you have any questions, WhatsApp us at <a href="https://wa.me/60127088789" style="color:#b45309;">+60 12-708 8789</a>.</p>
  </div>
  <p style="text-align:center;font-size:12px;color:#a8a29e;margin-top:24px;">
    26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, Malaysia
  </p>
</div>`,
        });
      } catch (err) {
        console.error("[stripe-webhook] Confirmation email failed:", err);
      }
    });
  }

  return NextResponse.json({ received: true });
}
