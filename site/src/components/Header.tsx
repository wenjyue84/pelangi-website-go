"use client";

import type { Route } from "next";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import LanguageSwitcher from "./LanguageSwitcher";
import BookNowCTA from "./BookNowCTA";
import InfoPopover from "./InfoPopover";
import {
  SEARCH_ARIA,
  SEARCH_ARIA_DESKTOP,
} from "@/lib/ui-labels";

function pushNavEvent(href: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "nav_click", nav_href: href });
}

const SearchDialog = dynamic(() => import("./SearchDialog"), { ssr: false });

type Locale = "en" | "zh" | "ms";

// Per-locale navigation. Chinese links point to existing /zh pages where present
// (/zh/about, /zh/rooms, /zh/location) and fall back to the /zh homepage or the
// English page otherwise. Malay has only /ms/terma, so its links fall back to
// English root pages (full Malay page tree is out of scope).
const NAV_LINKS: Record<Locale, { href: string; label: string }[]> = {
  en: [
    { href: "/about", label: "About" },
    { href: "/rooms", label: "Rooms" },
    { href: "/#destinations", label: "Destinations" },
    { href: "/gallery", label: "Gallery" },
    { href: "/#community", label: "Community" },
    { href: "/contact", label: "Location" },
    { href: "/check-in", label: "Check-in Guide" },
  ],
  zh: [
    { href: "/zh/about", label: "关于我们" },
    { href: "/zh/rooms", label: "房型" },
    { href: "/zh#destinations", label: "周边景点" },
    { href: "/gallery", label: "相册" },
    { href: "/zh#community", label: "社区" },
    { href: "/zh/location", label: "位置" },
    { href: "/check-in", label: "入住指南" },
  ],
  ms: [
    { href: "/about", label: "Tentang" },
    { href: "/rooms", label: "Bilik" },
    { href: "/#destinations", label: "Destinasi" },
    { href: "/gallery", label: "Galeri" },
    { href: "/#community", label: "Komuniti" },
    { href: "/contact", label: "Lokasi" },
    { href: "/check-in", label: "Panduan Daftar Masuk" },
  ],
};

function localeFromPathname(pathname: string | null): Locale {
  if (pathname?.startsWith("/zh")) return "zh";
  if (pathname?.startsWith("/ms")) return "ms";
  return "en";
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = NAV_LINKS[localeFromPathname(pathname)];

  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  // Cmd/Ctrl+K keyboard shortcut + Escape to close mobile nav
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-md shadow-xs py-3 dark:bg-stone-900/95 dark:shadow-stone-950/50">
      <nav className="container-custom flex items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Pelangi Capsule Hostel - home">
          <svg
            className="h-9 w-9 shrink-0"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="2.5" y="7.5" width="35" height="25" rx="8" stroke="#5BBCE4" strokeWidth="3" />
            <path d="M11 32.5 V20 a9 9 0 0 1 18 0 v12.5" stroke="#5BBCE4" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="20" cy="18.5" r="3" fill="#5BBCE4" />
            <line x1="11" y1="27.5" x2="29" y2="27.5" stroke="#5BBCE4" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col">
            <span className="font-display text-xl font-medium tracking-tight transition-colors duration-300 text-stone-900 dark:text-stone-100">
              Pelangi
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase transition-colors duration-300 text-stone-500 dark:text-stone-400">
              Capsule Hostel
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href as Route}
              className="px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800"
              onNavigate={() => pushNavEvent(link.href)}
            >
              {link.label}
            </Link>
          ))}
          <InfoPopover
            content="Search (Ctrl+K)"
            ariaLabel={SEARCH_ARIA_DESKTOP}
          >
            <span
              role="button"
              tabIndex={0}
              onClick={() => setIsSearchOpen(true)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setIsSearchOpen(true); } }}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800 inline-flex"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </InfoPopover>
          <LanguageSwitcher />
          <BookNowCTA className="ml-4 px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-amber-700 text-white hover:bg-amber-800" />
        </div>

        {/* Mobile Search + Menu Buttons */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            className="p-2 rounded-full transition-colors duration-300 text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
            onClick={() => setIsSearchOpen(true)}
            aria-label={SEARCH_ARIA}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            className="p-2 rounded-full transition-colors duration-300 text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl md:hidden dark:bg-stone-800 dark:shadow-stone-950/50
                     overflow-hidden transition-all duration-300 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
        >
          <div className="py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href as Route}
                className="block px-6 py-3 text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors dark:text-stone-300 dark:hover:bg-stone-700 dark:hover:text-stone-100"
                onClick={() => setIsMenuOpen(false)}
                onNavigate={() => pushNavEvent(link.href)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-6 py-3 border-t border-stone-100 mt-2 dark:border-stone-700">
              <div className="flex items-center justify-center mb-4">
                <LanguageSwitcher />
              </div>
              <BookNowCTA
                className="block w-full text-center bg-amber-700 text-white py-3 rounded-xl font-medium hover:bg-amber-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      </nav>
      <SearchDialog open={isSearchOpen} onClose={closeSearch} />
    </header>
  );
}
