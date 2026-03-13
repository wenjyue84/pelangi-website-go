/**
 * Cloudflare Turnstile server-side token verification (US-172)
 *
 * Verifies a Turnstile challenge token using the Cloudflare siteverify API.
 * Returns true on success, false on failure (including network errors).
 *
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // If no secret is configured, skip verification in non-production environments.
  // In production this will cause all submissions to fail — configure the env var.
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("[turnstile] TURNSTILE_SECRET_KEY is not set in production");
      return false;
    }
    // Dev/preview: allow through so local development works without keys
    return true;
  }

  // Empty / missing token should always fail
  if (!token || token.trim() === "") {
    return false;
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    });

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      }
    );

    if (!res.ok) {
      console.error("[turnstile] siteverify HTTP error:", res.status);
      return false;
    }

    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    if (!data.success) {
      console.warn("[turnstile] verification failed:", data["error-codes"]);
    }
    return data.success === true;
  } catch (err) {
    console.error("[turnstile] network error during verification:", err);
    return false;
  }
}
