"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/headings";

interface Props {
  headings: Heading[];
}

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0% -70% 0%" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const items = (
    <ol className="space-y-1">
      {headings.map(({ id, text, level }) => (
        <li key={id} style={{ paddingLeft: level === 3 ? "1rem" : "0" }}>
          <a
            href={`#${id}`}
            onClick={() => setIsOpen(false)}
            className={`block py-1 text-sm leading-snug transition-colors hover:text-amber-700 ${
              activeId === id
                ? "text-amber-700 font-medium"
                : "text-stone-500"
            }`}
          >
            {text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <nav aria-label="Article table of contents">
      {/* Mobile: collapsible accordion */}
      <div className="lg:hidden border border-stone-200 rounded-xl overflow-hidden bg-white">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
          aria-expanded={isOpen}
        >
          <span>Table of Contents</span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="px-4 pb-4 pt-2 border-t border-stone-100">{items}</div>
        )}
      </div>

      {/* Desktop: static list */}
      <div className="hidden lg:block">
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
          On this page
        </p>
        {items}
      </div>
    </nav>
  );
}
