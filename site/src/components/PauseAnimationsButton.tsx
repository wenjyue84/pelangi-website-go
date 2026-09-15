"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pelangi-animations-paused";

/**
 * WCAG 2.1 SC 2.2.2 — Visible in-page control to pause all continuous
 * CSS animations (pulse, bounce, shimmer) that run longer than 5 seconds.
 * Distinct from prefers-reduced-motion which is an OS-level preference.
 */
export default function PauseAnimationsButton() {
  // Lazy initialiser reads localStorage once at mount (client-only; no SSR
  // window access because this component is 'use client').
  const [paused, setPaused] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "true";
  });

  // Sync the DOM class to match the initial persisted state on mount.
  useEffect(() => {
    if (paused) {
      document.documentElement.classList.add("animations-paused");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggle() {
    const next = !paused;
    setPaused(next);
    if (next) {
      document.documentElement.classList.add("animations-paused");
    } else {
      document.documentElement.classList.remove("animations-paused");
    }
    localStorage.setItem(STORAGE_KEY, String(next));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={paused ? "Resume animations" : "Pause animations"}
      aria-pressed={paused}
      className="fixed bottom-20 left-4 z-50 flex items-center gap-1.5 rounded-full
                 bg-stone-800/80 px-3 py-2 text-xs font-medium text-white
                 shadow-lg backdrop-blur-sm transition-colors
                 hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2
                 focus-visible:outline-amber-500
                 md:bottom-4"
    >
      {paused ? (
        <svg
          className="h-3.5 w-3.5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      ) : (
        <svg
          className="h-3.5 w-3.5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      )}
      <span>{paused ? "Play" : "Pause"}</span>
    </button>
  );
}
