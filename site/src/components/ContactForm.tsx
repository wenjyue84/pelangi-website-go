"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/contact";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="section-padding bg-stone-50"
    >
      <div className="container-custom max-w-2xl">
        <p className="section-label">Get in Touch</p>
        <h2
          id="contact-form-heading"
          className="section-heading mb-4"
        >
          Send Us an Inquiry
        </h2>
        <p className="text-stone-600 mb-10">
          Have questions about rooms, rates, or your stay? Fill out the form
          below and we&apos;ll get back to you within 24 hours.
        </p>

        {state?.success ? (
          <div
            role="status"
            className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
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
            <p className="text-green-800 text-lg font-medium mb-2">
              Inquiry Sent!
            </p>
            <p className="text-green-700 text-sm">{state.message}</p>
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
                  className="block text-sm font-medium text-stone-700 mb-1.5"
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
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-stone-700 mb-1.5"
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
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors"
                />
              </div>
            </div>

            {/* Check-in / Check-out row */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-checkin"
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  Check-in Date
                </label>
                <input
                  id="contact-checkin"
                  name="checkIn"
                  type="date"
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-checkout"
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  Check-out Date
                </label>
                <input
                  id="contact-checkout"
                  name="checkOut"
                  type="date"
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors"
                />
              </div>
            </div>

            {/* Number of guests */}
            <div>
              <label
                htmlFor="contact-guests"
                className="block text-sm font-medium text-stone-700 mb-1.5"
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
                className="w-full sm:w-40 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-stone-700 mb-1.5"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your travel plans or any questions you have..."
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors resize-y"
              />
            </div>

            {/* Error message */}
            {state?.message && !state.success && (
              <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                {state.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto rounded-xl bg-amber-700 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Sending..." : "Send Inquiry"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
