"use server";

import { headers } from "next/headers";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ContactFormResult {
  success: boolean;
  message: string;
}

// ---------------------------------------------------------------------------
// In-memory rate limiter (matches middleware pattern)
// Max 3 submissions per IP per hour
// ---------------------------------------------------------------------------

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const rateLimitStore = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;

  let timestamps = rateLimitStore.get(ip);
  if (!timestamps) {
    timestamps = [];
    rateLimitStore.set(ip, timestamps);
  }

  // Evict old entries
  const filtered = timestamps.filter((ts) => ts > windowStart);
  rateLimitStore.set(ip, filtered);

  if (filtered.length >= RATE_LIMIT) {
    return false;
  }

  filtered.push(now);
  return true;
}

// ---------------------------------------------------------------------------
// Email helpers
// ---------------------------------------------------------------------------

function buildAdminEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  message: string;
}): string {
  return `
<div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #292524;">New Contact Inquiry</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; color: #78716c; width: 120px;">Name</td><td style="padding: 8px 0; color: #1c1917;">${data.name}</td></tr>
    <tr><td style="padding: 8px 0; color: #78716c;">Email</td><td style="padding: 8px 0; color: #1c1917;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
    ${data.phone ? `<tr><td style="padding: 8px 0; color: #78716c;">Phone</td><td style="padding: 8px 0; color: #1c1917;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>` : ""}
    ${data.checkIn ? `<tr><td style="padding: 8px 0; color: #78716c;">Check-in</td><td style="padding: 8px 0; color: #1c1917;">${data.checkIn}</td></tr>` : ""}
    ${data.checkOut ? `<tr><td style="padding: 8px 0; color: #78716c;">Check-out</td><td style="padding: 8px 0; color: #1c1917;">${data.checkOut}</td></tr>` : ""}
    ${data.guests ? `<tr><td style="padding: 8px 0; color: #78716c;">Guests</td><td style="padding: 8px 0; color: #1c1917;">${data.guests}</td></tr>` : ""}
  </table>
  <div style="margin-top: 16px; padding: 16px; background: #fafaf9; border-radius: 8px;">
    <p style="margin: 0 0 4px; color: #78716c; font-size: 14px;">Message</p>
    <p style="margin: 0; color: #1c1917; white-space: pre-wrap;">${data.message}</p>
  </div>
</div>`;
}

function buildGuestAutoReplyHtml(name: string): string {
  return `
<div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #1c1917;">
  <div style="text-align: center; padding: 32px 0 24px;">
    <h1 style="margin: 0; font-size: 24px; color: #292524;">Pelangi Capsule Hostel</h1>
    <p style="margin: 8px 0 0; color: #78716c;">Taman Pelangi, Johor Bahru</p>
  </div>
  <div style="padding: 24px; background: #fafaf9; border-radius: 12px;">
    <p>Hi ${name},</p>
    <p>Thank you for reaching out! We've received your inquiry and will get back to you within <strong>24 hours</strong>.</p>
    <p>In the meantime, you can:</p>
    <ul style="padding-left: 20px; line-height: 1.8;">
      <li><a href="https://www.booking.com/hotel/my/pelangi-hostel-capsule.html" style="color: #b45309;">Book directly on Booking.com</a></li>
      <li>WhatsApp us at <a href="https://wa.me/60127088789" style="color: #b45309;">+60 12-708 8789</a></li>
    </ul>
    <p style="margin-bottom: 0;">We look forward to hosting you!</p>
  </div>
  <p style="text-align: center; font-size: 12px; color: #a8a29e; margin-top: 24px;">
    26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, Malaysia
  </p>
</div>`;
}

// ---------------------------------------------------------------------------
// Server Action
// ---------------------------------------------------------------------------

export async function submitContactForm(
  _prevState: ContactFormResult | null,
  formData: FormData
): Promise<ContactFormResult> {
  // --- Honeypot check ---
  const honeypot = formData.get("website");
  if (honeypot) {
    // Bot detected — return fake success to not reveal detection
    return { success: true, message: "Thank you! We'll be in touch soon." };
  }

  // --- Extract fields ---
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const checkIn = formData.get("checkIn");
  const checkOut = formData.get("checkOut");
  const guests = formData.get("guests");
  const message = formData.get("message");

  // --- Server-side validation ---
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return { success: false, message: "Please enter your name." };
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return { success: false, message: "Please enter a message." };
  }

  // --- Rate limiting ---
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return {
      success: false,
      message:
        "You've sent too many inquiries recently. Please try again in an hour.",
    };
  }

  // --- Sanitize data ---
  const data = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: typeof phone === "string" ? phone.trim() : "",
    checkIn: typeof checkIn === "string" ? checkIn.trim() : "",
    checkOut: typeof checkOut === "string" ? checkOut.trim() : "",
    guests: typeof guests === "string" ? guests.trim() : "",
    message: message.trim(),
  };

  // --- Log submission (before email to avoid data loss) ---
  console.log("[contact-form]", JSON.stringify({ ...data, ip, ts: new Date().toISOString() }));

  // --- Send emails via Resend ---
  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!resendApiKey || !adminEmail) {
    console.error("[contact-form] RESEND_API_KEY or ADMIN_EMAIL not configured");
    return {
      success: false,
      message:
        "Our contact form is temporarily unavailable. Please WhatsApp us at +60 12-708 8789.",
    };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendApiKey);

    // Send both emails concurrently
    const [adminResult, guestResult] = await Promise.allSettled([
      resend.emails.send({
        from: "Pelangi Capsule Hostel <noreply@pelangicapsulehostel.com>",
        to: adminEmail,
        subject: `New inquiry from ${data.name}`,
        html: buildAdminEmailHtml(data),
        replyTo: data.email,
      }),
      resend.emails.send({
        from: "Pelangi Capsule Hostel <noreply@pelangicapsulehostel.com>",
        to: data.email,
        subject: "We received your inquiry — Pelangi Capsule Hostel",
        html: buildGuestAutoReplyHtml(data.name),
      }),
    ]);

    // Log any failures but still return success if admin email went through
    if (adminResult.status === "rejected") {
      console.error("[contact-form] Admin email failed:", adminResult.reason);
      return {
        success: false,
        message: "Something went wrong. Please try again or WhatsApp us at +60 12-708 8789.",
      };
    }
    if (guestResult.status === "rejected") {
      console.error("[contact-form] Guest auto-reply failed:", guestResult.reason);
    }

    return {
      success: true,
      message:
        "Thank you! We've received your inquiry and will respond within 24 hours. Check your email for a confirmation.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again or WhatsApp us at +60 12-708 8789.",
    };
  }
}
