"use client";

import { useId } from "react";

interface InfoPopoverProps {
  /** The trigger element (usually a button or badge) */
  children: React.ReactNode;
  /** Content shown inside the popover */
  content: React.ReactNode;
  /** Additional className for the trigger wrapper */
  className?: string;
  /** aria-label for the trigger button */
  ariaLabel?: string;
}

/**
 * Native HTML Popover API component with CSS Anchor Positioning.
 * Provides keyboard navigation, Escape dismissal, and focus management
 * via the platform — zero JavaScript positioning logic.
 *
 * - popover="auto" → light-dismiss (click outside closes)
 * - popovertarget → declarative trigger binding
 * - CSS anchor-name / position-anchor → tethering without JS
 * - @supports fallback for browsers without anchor positioning
 */
export default function InfoPopover({
  children,
  content,
  className = "",
  ariaLabel,
}: InfoPopoverProps) {
  const id = useId();
  // Sanitize React's useId output (e.g. ":r0:") into a valid CSS ident
  const safeId = id.replace(/[^a-zA-Z0-9-]/g, "");
  const popoverId = `popover-${safeId}`;
  const anchorName = `--anchor-${safeId}`;

  return (
    <span className={`info-popover-anchor ${className}`}>
      <button
        type="button"
        popoverTarget={popoverId}
        className="info-popover-trigger"
        aria-label={ariaLabel}
        style={{ anchorName } as React.CSSProperties}
      >
        {children}
      </button>
      <div
        id={popoverId}
        popover="auto"
        className="info-popover"
        role="status"
        style={{ positionAnchor: anchorName } as React.CSSProperties}
      >
        {content}
      </div>
    </span>
  );
}
