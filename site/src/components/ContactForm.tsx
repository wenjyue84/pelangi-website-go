"use client";

import { useActionState, useOptimistic, useEffect, useRef } from "react";
import Link from "next/link";
import { submitContactForm, type ContactFormResult } from "@/app/actions/contact";
import { trackGenerateLead } from "@/lib/gtm-ecommerce";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);
  const [optimisticState, addOptimistic] = useOptimistic<ContactFormResult | null, void>(
    state,
    () => ({ success: true, message: "Message sent! We'll respond within 24 hours." })
  );
  const leadTracked = useRef(false);

  useEffect(() => {
    if (state?.success && !leadTracked.current) {
      leadTracked.current = true;
      trackGenerateLead("contact_form");
    }
  }, [state]);

  async function handleSubmit(formData: FormData) {
    addOptimistic();
    await formAction(formData);
  }

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

        {/* Persistent live regions — always in DOM so screen readers detect changes */}
        <div role="status" aria-live="polite" className="sr-only">
          {optimisticState?.success ? `Inquiry Sent! ${optimisticState.message}` : ''}
          {isPending ? 'Sending your inquiry…' : ''}
        </div>
        <div role="alert" aria-live="assertive" className="sr-only">
          {optimisticState?.message && !optimisticState.success ? optimisticState.message : ''}
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
        ) : (
          <form action={handleSubmit} className="space-y-6">
            {/* Honeypot — hidden from real users, filled by bots */}
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
                  aria-invalid={!!optimisticState?.fieldErrors?.name}
                  aria-describedby={optimisticState?.fieldErrors?.name ? "contact-name-error" : undefined}
                  autoComplete="name"
                  placeholder="Your full name"
                  className={`w-full rounded-xl border bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus-visible:border-amber-500 transition-colors ${optimisticState?.fieldErrors?.name ? "border-red-500 dark:border-red-400" : "border-stone-500 dark:border-stone-600"}`}
                />
                {optimisticState?.fieldErrors?.name && (
                  <p id="contact-name-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {optimisticState.fieldErrors.name}
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
                  aria-invalid={!!optimisticState?.fieldErrors?.email}
                  aria-describedby={optimisticState?.fieldErrors?.email ? "contact-email-error" : undefined}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`w-full rounded-xl border bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus-visible:border-amber-500 transition-colors ${optimisticState?.fieldErrors?.email ? "border-red-500 dark:border-red-400" : "border-stone-500 dark:border-stone-600"}`}
                />
                {optimisticState?.fieldErrors?.email && (
                  <p id="contact-email-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {optimisticState.fieldErrors.email}
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
                autoComplete="tel"
                placeholder="+60 12-345 6789"
                className="w-full rounded-xl border border-stone-500 dark:border-stone-600 bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus-visible:border-amber-500 transition-colors"
              />
            </div>

            {/* Check-in / Check-out row — distinct data types, no redundant entry (WCAG 2.2 SC 3.3.7) */}
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
                  autoComplete="off"
                  className="w-full rounded-xl border border-stone-500 dark:border-stone-600 bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 focus-visible:border-amber-500 transition-colors"
                />
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
                  autoComplete="off"
                  className="w-full rounded-xl border border-stone-500 dark:border-stone-600 bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 focus-visible:border-amber-500 transition-colors"
                />
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
                aria-invalid={!!optimisticState?.fieldErrors?.message}
                aria-describedby={optimisticState?.fieldErrors?.message ? "contact-message-error" : undefined}
                rows={5}
                placeholder="Tell us about your travel plans or any questions you have..."
                className={`w-full rounded-xl border bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus-visible:border-amber-500 transition-colors resize-y ${optimisticState?.fieldErrors?.message ? "border-red-500 dark:border-red-400" : "border-stone-500 dark:border-stone-600"}`}
              />
              {optimisticState?.fieldErrors?.message && (
                <p id="contact-message-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {optimisticState.fieldErrors.message}
                </p>
              )}
            </div>

            {/* Error summary (visual — announcement handled by persistent live region above) */}
            {optimisticState?.message && !optimisticState.success && !optimisticState.fieldErrors && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
                {optimisticState.message}
              </p>
            )}

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

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {isPending ? "Sending..." : "Send Inquiry"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
