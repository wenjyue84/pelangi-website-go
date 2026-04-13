"use client";
import { useState } from "react";

type FaqItem = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left"
            aria-expanded={open === i}
          >
            <span className="font-medium text-stone-900 dark:text-stone-100">{item.question}</span>
            <svg className={`w-5 h-5 shrink-0 text-stone-500 transition-transform ${open === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-5 pb-5">
              <p className="text-stone-600 dark:text-stone-400">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
