"use server";

interface NewsletterResult {
  success: boolean;
  message: string;
}

export async function subscribeToNewsletter(
  _prevState: NewsletterResult | null,
  formData: FormData
): Promise<NewsletterResult> {
  const email = formData.get("email");
  const name = formData.get("name");

  // Server-side validation
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return { success: false, message: "Please enter your name." };
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
        email: email.trim().toLowerCase(),
        attributes: {
          FIRSTNAME: name.trim(),
        },
        updateEnabled: true,
      }),
    });

    if (response.status === 201 || response.status === 204) {
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
