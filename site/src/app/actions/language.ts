"use server";

import { cookies } from "next/headers";

export async function setLanguagePreference(languageCode: string) {
  const cookieStore = await cookies();

  // Set NEXT_LOCALE cookie with SameSite=Lax per Next.js i18n documentation
  cookieStore.set("NEXT_LOCALE", languageCode, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });

  return { success: true, language: languageCode };
}
