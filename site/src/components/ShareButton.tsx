"use client";

import { useState, useCallback } from "react";

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showNotification = useCallback((message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }, []);

  const handleShare = useCallback(async () => {
    const shareData = { title, text, url };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        if (navigator.canShare && !navigator.canShare(shareData)) {
          await fallbackCopy(url);
          return;
        }
        await navigator.share(shareData);
        showNotification("Shared successfully!");
      } catch (err) {
        // User cancelled the share — ignore AbortError
        if (err instanceof Error && err.name !== "AbortError") {
          await fallbackCopy(url);
        }
      }
    } else {
      await fallbackCopy(url);
    }
  }, [title, text, url, showNotification]);

  async function fallbackCopy(copyUrl: string) {
    try {
      await navigator.clipboard.writeText(copyUrl);
      showNotification("Link copied to clipboard!");
    } catch {
      showNotification("Could not copy link");
    }
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={handleShare}
        aria-label="Share this article"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        Share
      </button>

      {/* Persistent live region for screen reader announcement */}
      <div role="status" aria-live="polite" className="sr-only">
        {showToast ? toastMessage : ''}
      </div>

      {/* Visual toast notification */}
      {showToast && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-12 whitespace-nowrap px-4 py-2 bg-stone-900 text-white text-sm rounded-lg shadow-lg animate-fade-in"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
