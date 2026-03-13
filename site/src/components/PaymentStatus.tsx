"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface PaymentInfo {
  status: "succeeded" | "processing" | "requires_payment_method" | "unknown";
  amount: number | null;
  guestName: string | null;
  roomType: string | null;
  checkIn: string | null;
  checkOut: string | null;
  paymentIntentId: string | null;
}

export default function PaymentStatus() {
  const [info, setInfo] = useState<PaymentInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function retrieve() {
      const params = new URLSearchParams(window.location.search);
      const clientSecret = params.get("payment_intent_client_secret");

      if (!clientSecret) {
        setLoading(false);
        return;
      }

      const stripe = await stripePromise;
      if (!stripe) {
        setLoading(false);
        return;
      }

      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      if (!paymentIntent) {
        setLoading(false);
        return;
      }

      // Stripe.js client PaymentIntent type doesn't expose metadata,
      // but it's present in the response at runtime.
      const meta = (paymentIntent as unknown as { metadata?: Record<string, string> }).metadata;

      setInfo({
        status: paymentIntent.status as PaymentInfo["status"],
        amount: paymentIntent.amount,
        guestName: meta?.guestName ?? null,
        roomType: meta?.roomType ?? null,
        checkIn: meta?.checkIn ?? null,
        checkOut: meta?.checkOut ?? null,
        paymentIntentId: paymentIntent.id,
      });
      setLoading(false);
    }

    retrieve();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-lg border border-stone-100 dark:border-stone-700 text-center">
        <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-700 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone-600 dark:text-stone-400">Confirming your payment...</p>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-lg border border-stone-100 dark:border-stone-700 text-center">
        <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100 mb-2">
          No Payment Found
        </h1>
        <p className="text-stone-500 dark:text-stone-400">
          This page is for payment confirmations. Please start a booking from the{" "}
          <a href="/book" className="text-amber-700 dark:text-amber-400 hover:underline">booking page</a>.
        </p>
      </div>
    );
  }

  const isSuccess = info.status === "succeeded";
  const isProcessing = info.status === "processing";

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-lg border border-stone-100 dark:border-stone-700">
      {/* Status icon */}
      <div className="text-center mb-6">
        {isSuccess ? (
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : isProcessing ? (
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-amber-600 dark:text-amber-400 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}

        <h1 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100 mb-1">
          {isSuccess
            ? "Payment Confirmed!"
            : isProcessing
              ? "Payment Processing"
              : "Payment Failed"}
        </h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm">
          {isSuccess
            ? "Your booking deposit has been received."
            : isProcessing
              ? "Your payment is being processed by the bank. We'll confirm shortly."
              : "The payment could not be completed. Please try again or contact us."}
        </p>
      </div>

      {/* Booking details */}
      {(isSuccess || isProcessing) && (
        <div className="bg-stone-50 dark:bg-stone-800 rounded-xl p-5 border border-stone-200 dark:border-stone-700">
          <dl className="space-y-3 text-sm">
            {info.paymentIntentId && (
              <div className="flex justify-between gap-2">
                <dt className="text-stone-500 dark:text-stone-400">Reference</dt>
                <dd className="font-mono text-xs text-stone-700 dark:text-stone-300 text-right break-all">
                  {info.paymentIntentId.replace("pi_", "").slice(0, 16).toUpperCase()}
                </dd>
              </div>
            )}
            {info.guestName && (
              <div className="flex justify-between">
                <dt className="text-stone-500 dark:text-stone-400">Guest</dt>
                <dd className="font-medium text-stone-900 dark:text-stone-100">{info.guestName}</dd>
              </div>
            )}
            {info.roomType && (
              <div className="flex justify-between">
                <dt className="text-stone-500 dark:text-stone-400">Room</dt>
                <dd className="font-medium text-stone-900 dark:text-stone-100">{info.roomType}</dd>
              </div>
            )}
            {info.checkIn && (
              <div className="flex justify-between">
                <dt className="text-stone-500 dark:text-stone-400">Check-in</dt>
                <dd className="font-medium text-stone-900 dark:text-stone-100">{info.checkIn}</dd>
              </div>
            )}
            {info.checkOut && (
              <div className="flex justify-between">
                <dt className="text-stone-500 dark:text-stone-400">Check-out</dt>
                <dd className="font-medium text-stone-900 dark:text-stone-100">{info.checkOut}</dd>
              </div>
            )}
            {info.amount && (
              <div className="flex justify-between border-t border-stone-200 dark:border-stone-600 pt-3 mt-3">
                <dt className="font-semibold text-stone-800 dark:text-stone-200">Deposit Paid</dt>
                <dd className="font-semibold text-green-700 dark:text-green-400">
                  RM{(info.amount / 100).toFixed(2)}
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}
