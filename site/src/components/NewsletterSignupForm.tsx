"use client";

import { useActionState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export default function NewsletterSignupForm() {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, null);

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="mt-16 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/30 p-8 md:p-10"
    >
      <div className="max-w-xl mx-auto text-center">
        <h2
          id="newsletter-heading"
          className="font-display text-2xl md:text-3xl font-medium text-stone-900 dark:text-stone-100 mb-3"
        >
          Stay in the Loop
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-6">
          Get JB travel tips, local food finds, and hostel deals straight to
          your inbox.
        </p>

        {/* Persistent live regions — always in DOM so screen readers detect changes */}
        <div role="status" aria-live="polite" className="sr-only">
          {state?.success ? state.message : ''}
          {isPending ? 'Subscribing to newsletter…' : ''}
        </div>
        <div role="alert" aria-live="assertive" className="sr-only">
          {state?.message && !state.success ? state.message : ''}
        </div>

        {state?.success ? (
          <div
            className="rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-4 text-green-800 dark:text-green-300 text-sm"
          >
            {state.message}
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
              <div className="flex-1">
                <label
                  htmlFor="newsletter-name"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1 text-left"
                >
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  id="newsletter-name"
                  name="name"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={!!state?.fieldErrors?.name}
                  aria-describedby={state?.fieldErrors?.name ? "newsletter-name-error" : undefined}
                  autoComplete="given-name"
                  placeholder="Your first name"
                  className={`w-full rounded-lg border bg-white dark:bg-stone-800 px-4 py-2.5 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus-visible:border-amber-500 ${state?.fieldErrors?.name ? "border-red-500 dark:border-red-400" : "border-stone-500 dark:border-stone-600"}`}
                />
                {state?.fieldErrors?.name && (
                  <p id="newsletter-name-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400 text-left">
                    {state.fieldErrors.name}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="newsletter-email"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1 text-left"
                >
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  aria-invalid={!!state?.fieldErrors?.email}
                  aria-describedby={state?.fieldErrors?.email ? "newsletter-email-error" : undefined}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border bg-white dark:bg-stone-800 px-4 py-2.5 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus-visible:border-amber-500 ${state?.fieldErrors?.email ? "border-red-500 dark:border-red-400" : "border-stone-500 dark:border-stone-600"}`}
                />
                {state?.fieldErrors?.email && (
                  <p id="newsletter-email-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400 text-left">
                    {state.fieldErrors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Error summary — announcement handled by persistent live region above */}
            {state?.message && !state.success && !state.fieldErrors && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto rounded-lg bg-amber-700 px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Subscribing…" : "Subscribe"}
            </button>

            <p className="text-xs text-stone-500 dark:text-stone-400">
              No spam. Unsubscribe anytime. We respect your privacy under PDPA.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
