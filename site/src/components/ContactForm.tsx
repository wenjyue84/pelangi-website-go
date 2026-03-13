"use client";

import { useActionState, useOptimistic, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { submitContactForm, type ContactFormResult } from "@/app/actions/contact";
import { trackGenerateLead } from "@/lib/gtm-ecommerce";
import { trackMetaEvent } from "@/lib/meta-capi";
import TurnstileWidget from "@/components/TurnstileWidget";

/** SC 3.3.3: Client-side validation with specific error suggestions */
function validateEmail(email: string): string | null {
  if (!email.trim()) return "Please enter your email address (e.g. you@example.com).";
  if (!email.includes("@")) {
    return `It looks like '@' is missing. Did you mean ${email.trim()}@gmail.com?`;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address (e.g. you@example.com).";
  }
  return null;
}

function validatePhone(phone: string): string | null {
  if (!phone.trim()) return null; // optional field
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) {
    return "Please enter a valid phone number with country code (e.g. +60 12-345 6789).";
  }
  return null;
}

function validateDates(checkIn: string, checkOut: string): { checkIn?: string; checkOut?: string } {
  const errors: { checkIn?: string; checkOut?: string } = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkIn) {
    const d = new Date(checkIn);
    if (isNaN(d.getTime())) {
      errors.checkIn = "Please enter a valid date in YYYY-MM-DD format (e.g. 2026-04-01).";
    } else if (d < today) {
      errors.checkIn = "Check-in date cannot be in the past. Please select today or a future date.";
    }
  }
  if (checkOut) {
    const d = new Date(checkOut);
    if (isNaN(d.getTime())) {
      errors.checkOut = "Please enter a valid date in YYYY-MM-DD format (e.g. 2026-04-03).";
    } else if (checkIn && new Date(checkIn) >= d) {
      errors.checkOut = "Check-out date must be after your check-in date.";
    }
  }
  return errors;
}

interface ReviewData {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  message: string;
}

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);
  const [optimisticState, addOptimistic] = useOptimistic<ContactFormResult | null, void>(
    state,
    () => ({ success: true, message: "Message sent! We'll respond within 24 hours." })
  );
  const leadTracked = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  // SC 3.3.4: Review step state — user must review before final submission
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  useEffect(() => {
    if (state?.success && !leadTracked.current) {
      leadTracked.current = true;
      trackGenerateLead("contact_form");
      trackMetaEvent("Contact");
    }
    // If server returns errors, go back to form
    if (state && !state.success) {
      setReviewData(null);
    }
  }, [state]);

  /** SC 3.3.3+3.3.4: Validate client-side, then show review step */
  function handleReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = (fd.get("name") as string) || "";
    const email = (fd.get("email") as string) || "";
    const phone = (fd.get("phone") as string) || "";
    const checkIn = (fd.get("checkIn") as string) || "";
    const checkOut = (fd.get("checkOut") as string) || "";
    const guests = (fd.get("guests") as string) || "";
    const message = (fd.get("message") as string) || "";

    // Client-side validation with error suggestions (SC 3.3.3)
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Please enter your full name.";
    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;
    const phoneErr = validatePhone(phone);
    if (phoneErr) errors.phone = phoneErr;
    const dateErrors = validateDates(checkIn, checkOut);
    if (dateErrors.checkIn) errors.checkIn = dateErrors.checkIn;
    if (dateErrors.checkOut) errors.checkOut = dateErrors.checkOut;
    if (!message.trim()) errors.message = "Please enter a message describing your inquiry.";

    if (!turnstileToken) {
      errors.turnstile = "Please complete the security check.";
    }

    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      return;
    }

    setClientErrors({});
    setReviewData({ name, email, phone, checkIn, checkOut, guests, message });
  }

  /** SC 3.3.4: Confirm and submit after review */
  async function handleConfirm() {
    if (!formRef.current || !reviewData) return;
    const fd = new FormData(formRef.current);
    addOptimistic();
    await formAction(fd);
    setReviewData(null);
  }

  // Merge server and client errors for display
  const displayErrors: Record<string, string | undefined> = reviewData ? {} : {
    ...clientErrors,
    ...(optimisticState?.fieldErrors ?? {}),
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="section-padding bg-stone-50 dark:bg-stone-950"
    >
      <div className="container-custom max-w-2xl">
        <p className="section-label">Get in Touch</p>
        <h2
          id="contact-form-heading"
          className="section-heading mb-4"
        >
          Send Us an Inquiry
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-10">
          Have questions about rooms, rates, or your stay? Fill out the form
          below and we&apos;ll get back to you within 24 hours.
        </p>

        {/* Persistent live regions for screen readers */}
        <div role="status" aria-live="polite" className="sr-only">
          {optimisticState?.success ? `Inquiry Sent! ${optimisticState.message}` : ''}
          {isPending ? 'Sending your inquiry\u2026' : ''}
          {reviewData ? 'Please review your inquiry details before submitting.' : ''}
        </div>
        <div role="alert" aria-live="assertive" className="sr-only">
          {optimisticState?.message && !optimisticState.success ? optimisticState.message : ''}
          {Object.keys(clientErrors).length > 0 ? 'Please correct the errors in the form.' : ''}
        </div>

        {optimisticState?.success ? (
          <div
            className="rounded-2xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-green-800 dark:text-green-300 text-lg font-medium mb-2">
              Inquiry Sent!
            </p>
            <p className="text-green-700 dark:text-green-400 text-sm">{optimisticState.message}</p>
          </div>
        ) : reviewData ? (
          /* SC 3.3.4: Review/confirmation step before final submission */
          <div className="rounded-2xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-6 space-y-4">
            <h3 className="font-display text-lg font-medium text-stone-900 dark:text-stone-100 mb-2">
              Review Your Inquiry
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
              Please confirm the details below are correct before submitting.
            </p>
            <dl className="space-y-3 text-sm">
              <div className="flex gap-3">
                <dt className="font-medium text-stone-500 dark:text-stone-400 w-28 shrink-0">Name</dt>
                <dd className="text-stone-900 dark:text-stone-100">{reviewData.name}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="font-medium text-stone-500 dark:text-stone-400 w-28 shrink-0">Email</dt>
                <dd className="text-stone-900 dark:text-stone-100">{reviewData.email}</dd>
              </div>
              {reviewData.phone && (
                <div className="flex gap-3">
                  <dt className="font-medium text-stone-500 dark:text-stone-400 w-28 shrink-0">Phone</dt>
                  <dd className="text-stone-900 dark:text-stone-100">{reviewData.phone}</dd>
                </div>
              )}
              {reviewData.checkIn && (
                <div className="flex gap-3">
                  <dt className="font-medium text-stone-500 dark:text-stone-400 w-28 shrink-0">Check-in</dt>
                  <dd className="text-stone-900 dark:text-stone-100">{reviewData.checkIn}</dd>
                </div>
              )}
              {reviewData.checkOut && (
                <div className="flex gap-3">
                  <dt className="font-medium text-stone-500 dark:text-stone-400 w-28 shrink-0">Check-out</dt>
                  <dd className="text-stone-900 dark:text-stone-100">{reviewData.checkOut}</dd>
                </div>
              )}
              {reviewData.guests && (
                <div className="flex gap-3">
                  <dt className="font-medium text-stone-500 dark:text-stone-400 w-28 shrink-0">Guests</dt>
                  <dd className="text-stone-900 dark:text-stone-100">{reviewData.guests}</dd>
                </div>
              )}
              <div className="flex gap-3">
                <dt className="font-medium text-stone-500 dark:text-stone-400 w-28 shrink-0">Message</dt>
                <dd className="text-stone-900 dark:text-stone-100 whitespace-pre-wrap">{reviewData.message}</dd>
              </div>
            </dl>

            <div className="flex gap-3 pt-4 border-t border-amber-200 dark:border-amber-700">
              <button
                type="button"
                onClick={() => setReviewData(null)}
                className="rounded-xl border border-stone-300 dark:border-stone-600 px-6 py-3 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isPending}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending && (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {isPending ? "Sending..." : "Confirm & Send"}
              </button>
            </div>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleReview} className="space-y-6">
            {/* Honeypot */}
            <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Name + Email row */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={!!displayErrors.name}
                  aria-describedby={displayErrors.name ? "contact-name-error" : undefined}
                  autoComplete="name"
                  placeholder="Your full name"
                  className={`w-full rounded-xl border bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus-visible:border-amber-500 transition-colors ${displayErrors.name ? "border-red-500 dark:border-red-400" : "border-stone-500 dark:border-stone-600"}`}
                />
                {displayErrors.name && (
                  <p id="contact-name-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {displayErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  aria-invalid={!!displayErrors.email}
                  aria-describedby={displayErrors.email ? "contact-email-error" : "contact-email-hint"}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`w-full rounded-xl border bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus-visible:border-amber-500 transition-colors ${displayErrors.email ? "border-red-500 dark:border-red-400" : "border-stone-500 dark:border-stone-600"}`}
                />
                <p id="contact-email-hint" className={`mt-1 text-xs text-stone-400 dark:text-stone-500 ${displayErrors.email ? "hidden" : ""}`}>
                  e.g. name@example.com
                </p>
                {displayErrors.email && (
                  <p id="contact-email-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {displayErrors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="contact-phone"
                className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
              >
                Phone
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                aria-invalid={!!displayErrors.phone}
                aria-describedby={displayErrors.phone ? "contact-phone-error" : "contact-phone-hint"}
                autoComplete="tel"
                placeholder="+60 12-345 6789"
                className={`w-full rounded-xl border bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus-visible:border-amber-500 transition-colors ${displayErrors.phone ? "border-red-500 dark:border-red-400" : "border-stone-500 dark:border-stone-600"}`}
              />
              <p id="contact-phone-hint" className={`mt-1 text-xs text-stone-400 dark:text-stone-500 ${displayErrors.phone ? "hidden" : ""}`}>
                Include country code, e.g. +60 12-345 6789
              </p>
              {displayErrors.phone && (
                <p id="contact-phone-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {displayErrors.phone}
                </p>
              )}
            </div>

            {/* Check-in / Check-out row */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-checkin"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Check-in Date
                </label>
                <input
                  id="contact-checkin"
                  name="checkIn"
                  type="date"
                  min={today}
                  aria-invalid={!!displayErrors.checkIn}
                  aria-describedby={displayErrors.checkIn ? "contact-checkin-error" : "contact-checkin-hint"}
                  autoComplete="off"
                  className={`w-full rounded-xl border bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 focus-visible:border-amber-500 transition-colors ${displayErrors.checkIn ? "border-red-500 dark:border-red-400" : "border-stone-500 dark:border-stone-600"}`}
                />
                <p id="contact-checkin-hint" className={`mt-1 text-xs text-stone-400 dark:text-stone-500 ${displayErrors.checkIn ? "hidden" : ""}`}>
                  Select a date in DD/MM/YYYY format
                </p>
                {displayErrors.checkIn && (
                  <p id="contact-checkin-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {displayErrors.checkIn}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="contact-checkout"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                >
                  Check-out Date
                </label>
                <input
                  id="contact-checkout"
                  name="checkOut"
                  type="date"
                  min={today}
                  aria-invalid={!!displayErrors.checkOut}
                  aria-describedby={displayErrors.checkOut ? "contact-checkout-error" : "contact-checkout-hint"}
                  autoComplete="off"
                  className={`w-full rounded-xl border bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 focus-visible:border-amber-500 transition-colors ${displayErrors.checkOut ? "border-red-500 dark:border-red-400" : "border-stone-500 dark:border-stone-600"}`}
                />
                <p id="contact-checkout-hint" className={`mt-1 text-xs text-stone-400 dark:text-stone-500 ${displayErrors.checkOut ? "hidden" : ""}`}>
                  Must be after your check-in date
                </p>
                {displayErrors.checkOut && (
                  <p id="contact-checkout-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {displayErrors.checkOut}
                  </p>
                )}
              </div>
            </div>

            {/* Number of guests */}
            <div>
              <label
                htmlFor="contact-guests"
                className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
              >
                Number of Guests
              </label>
              <input
                id="contact-guests"
                name="guests"
                type="number"
                min="1"
                max="20"
                placeholder="e.g. 2"
                className="w-full sm:w-40 rounded-xl border border-stone-500 dark:border-stone-600 bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus-visible:border-amber-500 transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                aria-required="true"
                aria-invalid={!!displayErrors.message}
                aria-describedby={displayErrors.message ? "contact-message-error" : undefined}
                rows={5}
                placeholder="Tell us about your travel plans or any questions you have..."
                className={`w-full rounded-xl border bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus-visible:border-amber-500 transition-colors resize-y ${displayErrors.message ? "border-red-500 dark:border-red-400" : "border-stone-500 dark:border-stone-600"}`}
              />
              {displayErrors.message && (
                <p id="contact-message-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {displayErrors.message}
                </p>
              )}
            </div>

            {/* Error summary */}
            {optimisticState?.message && !optimisticState.success && !optimisticState.fieldErrors && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
                {optimisticState.message}
              </p>
            )}

            {/* Cloudflare Turnstile CAPTCHA — lazy-loads on first interaction */}
            <div>
              <TurnstileWidget
                formRef={formRef}
                onVerify={(token) => {
                  setTurnstileToken(token);
                  setClientErrors((prev) => {
                    const next = { ...prev };
                    delete next.turnstile;
                    return next;
                  });
                }}
                onExpire={() => setTurnstileToken("")}
              />
              {/* Hidden input so Server Action receives the token via FormData */}
              <input type="hidden" name="cf-turnstile-response" value={turnstileToken} />
              {displayErrors.turnstile && (
                <p role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {displayErrors.turnstile}
                </p>
              )}
            </div>

            {/* Terms & Conditions agreement */}
            <div className="flex items-start gap-3">
              <input
                id="contact-terms"
                name="terms"
                type="checkbox"
                required
                aria-required="true"
                className="mt-1 h-4 w-4 rounded border-stone-400 dark:border-stone-600 text-amber-700 focus:ring-amber-500 accent-amber-700"
              />
              <label
                htmlFor="contact-terms"
                className="text-sm text-stone-600 dark:text-stone-400"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  target="_blank"
                  className="text-amber-700 dark:text-amber-400 underline hover:text-amber-800 dark:hover:text-amber-300"
                >
                  Terms and Conditions
                </Link>{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Review & Send — SC 3.3.4 requires review before submission */}
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
            >
              Review &amp; Send
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
