"use server";

import { headers } from "next/headers";
import { updateTag } from "next/cache";
import crypto from "crypto";
import { deferAfterResponse, logServerEvent } from "@/lib/server-analytics";
import { verifyTurnstileToken } from "@/lib/turnstile";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ContactFormResult {
  success: boolean;
  message: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    phone?: string;
    checkIn?: string;
    checkOut?: string;
    message?: string;
  };
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

  // --- Cloudflare Turnstile verification ---
  const turnstileToken = formData.get("cf-turnstile-response");
  if (!turnstileToken || typeof turnstileToken !== "string") {
    return {
      success: false,
      message: "Please complete the security check before submitting.",
    };
  }
  const isTurnstileValid = await verifyTurnstileToken(turnstileToken);
  if (!isTurnstileValid) {
    return {
      success: false,
      message: "Security check failed. Please refresh the page and try again.",
    };
  }

  // --- Extract fields ---
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const checkIn = formData.get("checkIn");
  const checkOut = formData.get("checkOut");
  const guests = formData.get("guests");
  const message = formData.get("message");

  // --- Server-side validation (per-field for WCAG 2.1 SC 3.3.1 + 2.2 SC 3.3.3) ---
  const fieldErrors: NonNullable<ContactFormResult["fieldErrors"]> = {};

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    fieldErrors.name = "Please enter your full name.";
  }

  // SC 3.3.3: Suggest correction when '@' is missing
  if (!email || typeof email !== "string" || !email.includes("@")) {
    if (email && typeof email === "string" && !email.includes("@")) {
      fieldErrors.email = `It looks like '@' is missing. Did you mean ${email.trim()}@gmail.com?`;
    } else {
      fieldErrors.email = "Please enter a valid email address (e.g. you@example.com).";
    }
  }

  // SC 3.3.3: Phone format suggestion
  if (phone && typeof phone === "string" && phone.trim().length > 0) {
    const digits = phone.toString().replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) {
      fieldErrors.phone = "Please enter a valid phone number with country code (e.g. +60 12-345 6789).";
    }
  }

  // SC 3.3.3: Date validation with suggestions
  if (checkIn && typeof checkIn === "string" && checkIn.trim().length > 0) {
    const checkInDate = new Date(checkIn.toString());
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(checkInDate.getTime())) {
      fieldErrors.checkIn = "Please enter a valid check-in date in YYYY-MM-DD format (e.g. 2026-04-01).";
    } else if (checkInDate < today) {
      fieldErrors.checkIn = "Check-in date cannot be in the past. Please select today or a future date.";
    }
  }
  if (checkOut && typeof checkOut === "string" && checkOut.trim().length > 0) {
    const checkOutDate = new Date(checkOut.toString());
    const checkInDate = checkIn ? new Date(checkIn.toString()) : null;
    if (isNaN(checkOutDate.getTime())) {
      fieldErrors.checkOut = "Please enter a valid check-out date in YYYY-MM-DD format (e.g. 2026-04-03).";
    } else if (checkInDate && !isNaN(checkInDate.getTime()) && checkOutDate <= checkInDate) {
      fieldErrors.checkOut = "Check-out date must be after your check-in date.";
    }
  }

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    fieldErrors.message = "Please enter a message describing your inquiry.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: "Please correct the errors below.",
      fieldErrors,
    };
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

  // --- Sanitize data (safe to cast — validation above guarantees strings) ---
  const data = {
    name: (name as string).trim(),
    email: (email as string).trim().toLowerCase(),
    phone: typeof phone === "string" ? phone.trim() : "",
    checkIn: typeof checkIn === "string" ? checkIn.trim() : "",
    checkOut: typeof checkOut === "string" ? checkOut.trim() : "",
    guests: typeof guests === "string" ? guests.trim() : "",
    message: (message as string).trim(),
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

    // Surface the new submission state immediately for this user (read-your-writes)
    updateTag("contact-submissions");

    // Defer Meta CAPI Contact event and logging — runs after response is sent
    deferAfterResponse(() => {
      sendMetaContactEvent(data.email, data.phone).catch(() => {});
    });

    logServerEvent({
      event: "contact_form_submit",
      path: "/contact",
      payload: { name: data.name, hasPhone: !!data.phone, hasCheckIn: !!data.checkIn },
      timestamp: new Date().toISOString(),
    });

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

// ---------------------------------------------------------------------------
// Meta CAPI — server-side Contact event
// ---------------------------------------------------------------------------

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

async function sendMetaContactEvent(email: string, phone: string): Promise<void> {
  const pixelId = process.env.FACEBOOK_PIXEL_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return;

  const userData: Record<string, string> = {};
  if (email) userData.em = sha256(email);
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (digits.length > 0) userData.ph = sha256(digits);
  }

  const payload = {
    data: [
      {
        event_name: "Contact",
        event_time: Math.floor(Date.now() / 1000),
        event_id: crypto.randomUUID(),
        event_source_url: "https://pelangicapsulehostel.com/contact",
        action_source: "website",
        user_data: userData,
      },
    ],
  };

  const response = await fetch(
    `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    console.error("[meta-capi] Contact event failed:", response.status, text);
  }
}
