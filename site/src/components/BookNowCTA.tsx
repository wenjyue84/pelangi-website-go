"use client";

import Link, { useLinkStatus } from "next/link";
import type { Route } from "next";
import { BOOK_NOW_LABEL, BOOK_NOW_ARIA } from "@/lib/ui-labels";

/**
 * Inner component that reads useLinkStatus.
 * Must be a descendant of <Link>, not a sibling.
 */
function BookNowInner({ label }: { label?: string }) {
  const { pending } = useLinkStatus();
  return (
    <span className="flex items-center justify-center gap-2">
      {pending && (
        <svg
          className="w-4 h-4 animate-spin shrink-0"
          viewBox="0 0 24 24"
          fill="none"
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
      )}
      {label ?? BOOK_NOW_LABEL}
    </span>
  );
}

interface BookNowCTAProps {
  /** Extra Tailwind classes for the <Link> element. */
  className?: string;
  /** Optional click handler (e.g. to close mobile menu). */
  onClick?: () => void;
  /** Override the button label. Defaults to BOOK_NOW_LABEL. */
  label?: string;
}

/**
 * A "Book Now" CTA that shows a spinner while the /book page is loading.
 * Uses Next.js useLinkStatus (15.3+) for per-link pending state.
 */
export default function BookNowCTA({ className, onClick, label }: BookNowCTAProps) {
  return (
    <Link
      href={"/book" as Route}
      className={className}
      aria-label={BOOK_NOW_ARIA}
      onClick={onClick}
    >
      <BookNowInner label={label} />
    </Link>
  );
}
