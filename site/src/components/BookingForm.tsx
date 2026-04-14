"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useBookingDraft } from "@/hooks/useBookingDraft";

const WHATSAPP_NUMBER = "60127088789";

function buildWhatsAppUrl(checkIn: string, checkOut: string, roomType: string): string {
  let message: string;
  if (checkIn && checkOut) {
    message = `Hi Pelangi Capsule! I'd like to book ${roomType} from ${checkIn} to ${checkOut}.`;
  } else if (checkIn) {
    message = `Hi Pelangi Capsule! I'd like to book ${roomType} checking in on ${checkIn}.`;
  } else {
    message = "Hi Pelangi Capsule Hostel! I'd like to book a pod. Please confirm availability.";
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** SC 3.3.3: Validate dates with specific suggestions */
function validateBookingDates(checkIn: string, checkOut: string): Record<string, string> {
  const errors: Record<string, string> = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkIn) {
    const d = new Date(checkIn);
    if (isNaN(d.getTime())) {
      errors.checkIn = "Please enter a valid date (e.g. select from the date picker).";
    } else if (d < today) {
      errors.checkIn = "Check-in date cannot be in the past. Please select today or a future date.";
    }
  }
  if (checkOut) {
    const d = new Date(checkOut);
    if (isNaN(d.getTime())) {
      errors.checkOut = "Please enter a valid date (e.g. select from the date picker).";
    } else if (checkIn && new Date(checkIn) >= d) {
      errors.checkOut = "Check-out date must be after your check-in date.";
    }
  }
  return errors;
}

export default function BookingForm() {
  const { draft, saveDraft } = useBookingDraft();
  const searchParams = useSearchParams();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("Capsule Pod");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showReview, setShowReview] = useState(false);

  // Pre-fill from URL params (Google Hotels traffic) or restore from draft
  useEffect(() => {
    const urlCheckin = searchParams.get("checkin");
    const urlCheckout = searchParams.get("checkout");

    if (urlCheckin || urlCheckout) {
      // URL params take priority (e.g. Google Hotel free booking links)
      if (urlCheckin) setCheckIn(urlCheckin);
      if (urlCheckout) setCheckOut(urlCheckout);
    } else if (draft) {
      if (draft.roomType) setRoomType(draft.roomType);
      if (draft.checkIn) setCheckIn(draft.checkIn);
      if (draft.checkOut) setCheckOut(draft.checkOut);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save draft whenever form fields change
  useEffect(() => {
    if (roomType || checkIn || checkOut) {
      saveDraft({ roomType, checkIn, checkOut });
    }
  }, [roomType, checkIn, checkOut, saveDraft]);

  const whatsappUrl = buildWhatsAppUrl(checkIn, checkOut, roomType);

  // Broadcast dynamic link for MobileBookingBar
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("booking-link-update", { detail: whatsappUrl })
    );
  }, [whatsappUrl]);

  // Today's date in YYYY-MM-DD for min attribute
  const today = new Date().toISOString().split("T")[0];

  // Clear errors on field change
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkIn, checkOut]);

  /** SC 3.3.3+3.3.4: Validate and show review before sending */
  function handleBookClick(e: React.MouseEvent) {
    e.preventDefault();
    const dateErrors = validateBookingDates(checkIn, checkOut);
    if (Object.keys(dateErrors).length > 0) {
      setErrors(dateErrors);
      return;
    }
    if (checkIn && checkOut) {
      setShowReview(true);
    } else {
      // No dates selected — open WhatsApp directly (no review needed for generic inquiry)
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  }

  function handleConfirmBooking() {
    setShowReview(false);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-lg border border-stone-100 dark:border-stone-700">
      <h3 className="font-display text-xl font-medium text-stone-900 dark:text-stone-100 mb-6 text-center">
        Quick Book via WhatsApp
      </h3>

      {showReview ? (
        /* SC 3.3.4: Review step before WhatsApp submission */
        <div className="space-y-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
            <p className="text-sm font-medium text-stone-800 dark:text-stone-200 mb-3">
              Please confirm your booking details:
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-stone-500 dark:text-stone-400">Room Type</dt>
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
            </dl>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-800 dark:text-green-300">
              <span className="font-medium">Message to send:</span>{" "}
              &ldquo;Hi Pelangi Capsule! I&apos;d like to book {roomType} from {checkIn} to {checkOut}.&rdquo;
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowReview(false)}
              className="flex-1 rounded-2xl border border-stone-300 dark:border-stone-600 py-3 px-4 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleConfirmBooking}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 text-white rounded-2xl
                         py-3 px-4 font-semibold text-sm hover:bg-green-600 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Confirm &amp; Send
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {/* Room Type */}
            <div>
              <label
                htmlFor="room-type"
                className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
              >
                Room Type
              </label>
              <select
                id="room-type"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="select-base w-full"
              >
                <option value="Capsule Pod">Capsule Pod — RM35–45/night</option>
                <option value="Monthly Capsule Pod">Monthly Capsule Pod — RM594/month</option>
              </select>
            </div>

            {/* Check-in */}
            <div>
              <label
                htmlFor="check-in"
                className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
              >
                Check-in Date
              </label>
              <input
                id="check-in"
                type="date"
                value={checkIn}
                min={today}
                aria-invalid={!!errors.checkIn}
                aria-describedby={errors.checkIn ? "booking-checkin-error" : undefined}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (checkOut && e.target.value > checkOut) setCheckOut("");
                }}
                className={`w-full rounded-xl border bg-stone-50 dark:bg-stone-800
                           text-stone-900 dark:text-stone-100 px-4 py-3 text-sm
                           focus-visible:border-amber-500 ${errors.checkIn ? "border-red-500 dark:border-red-400" : "border-stone-500 dark:border-stone-600"}`}
              />
              {errors.checkIn && (
                <p id="booking-checkin-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.checkIn}
                </p>
              )}
            </div>

            {/* Check-out */}
            <div>
              <label
                htmlFor="check-out"
                className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
              >
                Check-out Date
              </label>
              <input
                id="check-out"
                type="date"
                value={checkOut}
                min={checkIn || today}
                aria-invalid={!!errors.checkOut}
                aria-describedby={errors.checkOut ? "booking-checkout-error" : undefined}
                onChange={(e) => setCheckOut(e.target.value)}
                className={`w-full rounded-xl border bg-stone-50 dark:bg-stone-800
                           text-stone-900 dark:text-stone-100 px-4 py-3 text-sm
                           focus-visible:border-amber-500 ${errors.checkOut ? "border-red-500 dark:border-red-400" : "border-stone-500 dark:border-stone-600"}`}
              />
              {errors.checkOut && (
                <p id="booking-checkout-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.checkOut}
                </p>
              )}
            </div>
          </div>

          {/* Preview message */}
          {checkIn && checkOut && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-6 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-300">
                <span className="font-medium">Your message:</span>{" "}
                &ldquo;Hi Pelangi Capsule! I&apos;d like to book {roomType} from {checkIn} to {checkOut}.&rdquo;
              </p>
            </div>
          )}

          {/* WhatsApp CTA — goes through review step when dates are set */}
          <button
            type="button"
            onClick={handleBookClick}
            className="w-full inline-flex items-center justify-center gap-3 bg-green-500 text-white rounded-2xl
                       py-4 px-8 font-semibold text-lg hover:bg-green-600 transition-all duration-300
                       hover:-translate-y-0.5 hover:shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {checkIn && checkOut ? "Review & Send Booking" : "Book via WhatsApp"}
          </button>

          <p className="text-stone-500 dark:text-stone-400 text-xs text-center mt-3">
            Replies within minutes during 8 AM – 10 PM
          </p>
        </>
      )}
    </div>
  );
}
