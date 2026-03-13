"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/contact";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

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
          {state?.success ? `Inquiry Sent! ${state.message}` : ''}
          {isPending ? 'Sending your inquiry…' : ''}
        </div>
        <div role="alert" aria-live="assertive" className="sr-only">
          {state?.message && !state.success ? state.message : ''}
        </div>

        {state?.success ? (
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
            <p className="text-green-700 dark:text-green-400 text-sm">{state.message}</p>
          </div>
        ) : (
          <form action={formAction} className="space-y-6">
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
                  autoComplete="name"
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-stone-500 dark:border-stone-600 bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus-visible:border-amber-500 transition-colors"
                />
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
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-stone-500 dark:border-stone-600 bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus-visible:border-amber-500 transition-colors"
                />
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
                rows={5}
                placeholder="Tell us about your travel plans or any questions you have..."
                className="w-full rounded-xl border border-stone-500 dark:border-stone-600 bg-white dark:bg-stone-800 px-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus-visible:border-amber-500 transition-colors resize-y"
              />
            </div>

            {/* Error message (visual — announcement handled by persistent live region above) */}
            {state?.message && !state.success && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
                {state.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto rounded-xl bg-amber-700 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Sending..." : "Send Inquiry"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
