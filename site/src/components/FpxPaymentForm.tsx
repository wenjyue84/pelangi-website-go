"use client";

import { useState, FormEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

/* ---------- inner checkout form (requires Elements context) ---------- */

function CheckoutForm({
  amount,
  guestName,
  roomType,
  checkIn,
  checkOut,
}: {
  amount: number;
  guestName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Please complete the payment details.");
      setProcessing(false);
      return;
    }

    // Create PaymentIntent on our server
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        roomType,
        checkIn,
        checkOut,
        guestName,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: "Server error" }));
      setError(data.error ?? "Failed to create payment. Please try again.");
      setProcessing(false);
      return;
    }

    const { clientSecret } = await res.json();

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/book/confirmation`,
      },
    });

    // Only reached if an immediate error occurs (e.g. incomplete details).
    // For FPX, the user is typically redirected to the bank page first.
    if (confirmError) {
      setError(
        confirmError.message ?? "Payment failed. Please try again.",
      );
    }

    setProcessing(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />

      {error && (
        <div
          role="alert"
          className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-700 dark:text-red-300"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || processing}
        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-700 text-white
                   py-4 px-8 font-semibold text-lg hover:bg-amber-800 transition-all duration-300
                   hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed
                   disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {processing ? (
          <>
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing...
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Pay RM{(amount / 100).toFixed(2)} via Online Banking
          </>
        )}
      </button>

      <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
        Secured by Stripe. You&apos;ll be redirected to your bank to complete the payment.
      </p>
    </form>
  );
}

/* ---------- outer wrapper (booking details + Elements provider) ---------- */

const DEPOSIT_AMOUNT_SEN = 3780; // RM37.80 deposit (1 night at RM35 + 8% SST)

export default function FpxPaymentForm() {
  const [step, setStep] = useState<"details" | "payment">("details");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("Capsule Pod");

  const today = new Date().toISOString().split("T")[0];

  function handleContinue(e: FormEvent) {
    e.preventDefault();
    setStep("payment");
  }

  if (step === "payment") {
    return (
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-lg border border-stone-100 dark:border-stone-700">
        <h3 className="font-display text-xl font-medium text-stone-900 dark:text-stone-100 mb-2 text-center">
          Pay Booking Deposit
        </h3>
        <p className="text-sm text-stone-500 dark:text-stone-400 text-center mb-6">
          RM{(DEPOSIT_AMOUNT_SEN / 100).toFixed(2)} deposit via FPX Online Banking
        </p>

        {/* Booking summary */}
        <div className="bg-stone-50 dark:bg-stone-800 rounded-xl p-4 mb-6 border border-stone-200 dark:border-stone-700">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-500 dark:text-stone-400">Guest</dt>
              <dd className="font-medium text-stone-900 dark:text-stone-100">{guestName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500 dark:text-stone-400">Room</dt>
              <dd className="font-medium text-stone-900 dark:text-stone-100">{roomType}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500 dark:text-stone-400">Check-in</dt>
              <dd className="font-medium text-stone-900 dark:text-stone-100">{checkIn}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500 dark:text-stone-400">Check-out</dt>
              <dd className="font-medium text-stone-900 dark:text-stone-100">{checkOut}</dd>
            </div>
            <div className="flex justify-between border-t border-stone-200 dark:border-stone-600 pt-2 mt-2">
              <dt className="font-semibold text-stone-800 dark:text-stone-200">Deposit</dt>
              <dd className="font-semibold text-stone-800 dark:text-stone-200">
                RM{(DEPOSIT_AMOUNT_SEN / 100).toFixed(2)}
              </dd>
            </div>
          </dl>
        </div>

        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: DEPOSIT_AMOUNT_SEN,
            currency: "myr",
            paymentMethodTypes: ["fpx"],
            appearance: {
              theme: "stripe",
              variables: {
                colorPrimary: "#92400e",
                borderRadius: "12px",
                fontFamily: "Inter, system-ui, sans-serif",
              },
            },
          }}
        >
          <CheckoutForm
            amount={DEPOSIT_AMOUNT_SEN}
            guestName={guestName}
            roomType={roomType}
            checkIn={checkIn}
            checkOut={checkOut}
          />
        </Elements>

        <button
          type="button"
          onClick={() => setStep("details")}
          className="mt-4 w-full text-center text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
        >
          &larr; Back to booking details
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-lg border border-stone-100 dark:border-stone-700">
      <div className="flex items-center gap-2 justify-center mb-2">
        <svg
          className="w-5 h-5 text-amber-700 dark:text-amber-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
        <h3 className="font-display text-xl font-medium text-stone-900 dark:text-stone-100">
          Pay Online (FPX)
        </h3>
      </div>
      <p className="text-sm text-stone-500 dark:text-stone-400 text-center mb-6">
        Secure your booking with a RM{(DEPOSIT_AMOUNT_SEN / 100).toFixed(2)} deposit via Malaysian online banking
      </p>

      <form onSubmit={handleContinue} className="space-y-4">
        {/* Guest Name */}
        <div>
          <label
            htmlFor="fpx-guest-name"
            className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
          >
            Full Name
          </label>
          <input
            id="fpx-guest-name"
            type="text"
            required
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="As shown on your IC/passport"
            className="w-full rounded-xl border border-stone-500 dark:border-stone-600 bg-stone-50 dark:bg-stone-800
                       text-stone-900 dark:text-stone-100 px-4 py-3 text-sm focus-visible:border-amber-500"
          />
        </div>

        {/* Email (optional) */}
        <div>
          <label
            htmlFor="fpx-guest-email"
            className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
          >
            Email <span className="text-stone-400">(optional)</span>
          </label>
          <input
            id="fpx-guest-email"
            type="email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            placeholder="For payment receipt"
            className="w-full rounded-xl border border-stone-500 dark:border-stone-600 bg-stone-50 dark:bg-stone-800
                       text-stone-900 dark:text-stone-100 px-4 py-3 text-sm focus-visible:border-amber-500"
          />
        </div>

        {/* Room Type */}
        <div>
          <label
            htmlFor="fpx-room-type"
            className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
          >
            Room Type
          </label>
          <select
            id="fpx-room-type"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full rounded-xl border border-stone-500 dark:border-stone-600 bg-stone-50 dark:bg-stone-800
                       text-stone-900 dark:text-stone-100 px-4 py-3 text-sm focus-visible:border-amber-500"
          >
            <option value="Capsule Pod">Capsule Pod — RM35–45/night</option>
            <option value="Monthly Capsule Pod">Monthly Capsule Pod — RM594/month</option>
          </select>
        </div>

        {/* Check-in */}
        <div>
          <label
            htmlFor="fpx-check-in"
            className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
          >
            Check-in Date
          </label>
          <input
            id="fpx-check-in"
            type="date"
            required
            value={checkIn}
            min={today}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOut && e.target.value > checkOut) setCheckOut("");
            }}
            className="w-full rounded-xl border border-stone-500 dark:border-stone-600 bg-stone-50 dark:bg-stone-800
                       text-stone-900 dark:text-stone-100 px-4 py-3 text-sm focus-visible:border-amber-500"
          />
        </div>

        {/* Check-out */}
        <div>
          <label
            htmlFor="fpx-check-out"
            className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
          >
            Check-out Date
          </label>
          <input
            id="fpx-check-out"
            type="date"
            required
            value={checkOut}
            min={checkIn || today}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full rounded-xl border border-stone-500 dark:border-stone-600 bg-stone-50 dark:bg-stone-800
                       text-stone-900 dark:text-stone-100 px-4 py-3 text-sm focus-visible:border-amber-500"
          />
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-700 text-white
                     py-4 px-8 font-semibold text-lg hover:bg-amber-800 transition-all duration-300
                     hover:-translate-y-0.5 hover:shadow-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Continue to Payment
        </button>

        <div className="flex items-center gap-2 justify-center text-xs text-stone-400 dark:text-stone-500">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Powered by Stripe &middot; FPX Online Banking</span>
        </div>
      </form>
    </div>
  );
}
