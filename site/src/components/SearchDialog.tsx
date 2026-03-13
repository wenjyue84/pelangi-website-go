"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Fuse from "fuse.js";
import { useRouter } from "next/navigation";
import { searchIndex, type SearchItem } from "@/data/search-index";

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: "title", weight: 3 },
    { name: "tags", weight: 2 },
    { name: "excerpt", weight: 1 },
  ],
  threshold: 0.4, // allows 1-2 char typos
  includeScore: true,
});

export default function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results: SearchItem[] = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query, { limit: 8 }).map((r) => r.item);
  }, [query]);

  // Reset state when opened
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting state on open prop change
      setQuery("");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveIndex(0);
      // Focus input after render
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.children[activeIndex] as HTMLElement;
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const navigate = useCallback(
    (item: SearchItem) => {
      onClose();
      router.push(item.url);
    },
    [onClose, router]
  );

  // Focus trap
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const focusable = dialog!.querySelectorAll<HTMLElement>(
        'input, button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (results[activeIndex]) navigate(results[activeIndex]);
        break;
      case "Escape":
        e.preventDefault();
        onClose();
        break;
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-start justify-center pt-[15vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" aria-hidden="true" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-label="Site search"
        aria-modal="true"
        className="relative z-10 w-full max-w-lg mx-4 bg-white dark:bg-stone-800 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 overflow-hidden"
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-100 dark:border-stone-700">
          <svg className="w-5 h-5 text-stone-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Search blog posts and guides..."
            className="flex-1 text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-400 bg-transparent outline-hidden"
            aria-autocomplete="list"
            aria-controls="search-results"
            aria-activedescendant={
              results.length > 0 ? `search-result-${activeIndex}` : undefined
            }
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-stone-500 bg-stone-100 dark:bg-stone-700 rounded-sm border border-stone-500 dark:border-stone-600 font-mono">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <div className="px-4 py-8 text-center text-stone-500">
              <p className="text-sm">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1 text-stone-400">Try a different search term</p>
            </div>
          )}

          {results.length > 0 && (
            <ul id="search-results" role="listbox" ref={listRef} className="py-2">
              {results.map((item, i) => (
                <li
                  key={item.url}
                  id={`search-result-${i}`}
                  role="option"
                  aria-selected={i === activeIndex}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    i === activeIndex
                      ? "bg-amber-50 dark:bg-amber-900/20"
                      : "hover:bg-stone-50 dark:hover:bg-stone-700"
                  }`}
                  onClick={() => navigate(item)}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        item.category === "Blog"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-sm font-medium text-stone-900 dark:text-stone-100 line-clamp-1">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-1 pl-[calc(0.375rem+1rem+0.5rem)]">
                    {item.excerpt}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer hint */}
        {results.length > 0 && (
          <div className="px-4 py-2 border-t border-stone-100 dark:border-stone-700 flex items-center gap-4 text-[11px] text-stone-400">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-stone-100 rounded-sm border border-stone-500 font-mono text-[10px]">&uarr;</kbd>
              <kbd className="px-1 py-0.5 bg-stone-100 rounded-sm border border-stone-500 font-mono text-[10px]">&darr;</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-stone-100 rounded-sm border border-stone-500 font-mono text-[10px]">&crarr;</kbd>
              open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-stone-100 rounded-sm border border-stone-500 font-mono text-[10px]">esc</kbd>
              close
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
