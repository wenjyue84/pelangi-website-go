"use server";

import { updateTag } from "next/cache";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { logServerEvent } from "@/lib/server-analytics";

interface NewsletterResult {
  success: boolean;
  message: string;
  fieldErrors?: {
    name?: string;
    email?: string;
  };
}

export async function subscribeToNewsletter(
  _prevState: NewsletterResult | null,
  formData: FormData
): Promise<NewsletterResult> {
  const email = formData.get("email");
  const name = formData.get("name");

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

  // Server-side validation (per-field for WCAG 2.1 SC 3.3.1)
  const fieldErrors: NonNullable<NewsletterResult["fieldErrors"]> = {};

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    fieldErrors.name = "Please enter your first name.";
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    fieldErrors.email = "Please enter a valid email address (e.g. you@example.com).";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: "Please correct the errors below.",
      fieldErrors,
    };
  }

  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    // Graceful fallback when API key is not configured
    console.error("BREVO_API_KEY is not set in environment variables.");
    return {
      success: false,
      message: "Newsletter signup is temporarily unavailable. Please try again later.",
    };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: (email as string).trim().toLowerCase(),
        attributes: {
          FIRSTNAME: (name as string).trim(),
        },
        updateEnabled: true,
      }),
    });

    if (response.status === 201 || response.status === 204) {
      updateTag("newsletter-subscriptions");
      // Defer analytics logging — runs after response is sent to client (US-100)
      logServerEvent({
        event: "newsletter_subscribe",
        path: "/",
        timestamp: new Date().toISOString(),
      });
      return {
        success: true,
        message: "You're subscribed! Check your inbox for a welcome email.",
      };
    }

    // Handle duplicate contact (Brevo returns 400 with "Contact already exist")
    if (response.status === 400) {
      const errorData = await response.json().catch(() => null);
      if (errorData?.message?.includes("already exist")) {
        return {
          success: true,
          message: "You're already subscribed! We'll keep you updated.",
        };
      }
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  } catch {
    return {
      success: false,
      message: "Could not connect to the newsletter service. Please try again later.",
    };
  }
}
