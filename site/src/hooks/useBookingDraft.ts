"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "pelangi_booking_draft";
const DISMISSED_KEY = "pelangi_booking_draft_dismissed";

export interface BookingDraft {
  roomType: string;
  checkIn: string;
  checkOut: string;
  savedAt: number;
}

function getStorageItem<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function useBookingDraft() {
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [dismissed, setDismissed] = useState(false);

  // Load from sessionStorage on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading sessionStorage on mount (SSR-safe)
    setDraft(getStorageItem<BookingDraft>(STORAGE_KEY));
     
    setDismissed(sessionStorage.getItem(DISMISSED_KEY) === "true");
  }, []);

  const saveDraft = useCallback(
    (data: Omit<BookingDraft, "savedAt">) => {
      // Only save if at least one field has meaningful data
      if (!data.roomType && !data.checkIn && !data.checkOut) return;
      const entry: BookingDraft = { ...data, savedAt: Date.now() };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
      } catch {
        // sessionStorage full or unavailable — silently ignore
      }
      setDraft(entry);
    },
    []
  );

  const clearDraft = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setDraft(null);
  }, []);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(DISMISSED_KEY, "true");
    } catch {
      // ignore
    }
    setDismissed(true);
  }, []);

  return { draft, dismissed, saveDraft, clearDraft, dismiss };
}
