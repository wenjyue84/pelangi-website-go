"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import LanguageSwitcher from "./LanguageSwitcher";

const SearchDialog = dynamic(() => import("./SearchDialog"), { ssr: false });

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  // Cmd/Ctrl+K keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/rooms", label: "Rooms" },
    { href: "/#destinations", label: "Destinations" },
    { href: "/gallery", label: "Gallery" },
    { href: "/#community", label: "Community" },
    { href: "/contact", label: "Location" },
    { href: "/check-in", label: "Check-in Guide" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-md shadow-sm py-3">
      <nav className="container-custom flex items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <Image
              src="/images/logo.png"
              alt="Pelangi Capsule Hostel Logo - Budget accommodation in Johor Bahru"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-medium tracking-tight transition-colors duration-300 text-stone-900">
              Pelangi
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase transition-colors duration-300 text-stone-500">
              Capsule Hostel
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Search site (Ctrl+K)"
            title="Search (Ctrl+K)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <LanguageSwitcher />
          <Link
            href="/book"
            className="ml-4 px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 bg-amber-700 text-white hover:bg-amber-800"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Search + Menu Buttons */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            className="p-2 rounded-full transition-colors duration-300 text-stone-700 hover:bg-stone-100"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search site"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            className="p-2 rounded-full transition-colors duration-300 text-stone-700 hover:bg-stone-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
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
          className={`absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl md:hidden
                     overflow-hidden transition-all duration-300 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
        >
          <div className="py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-6 py-3 text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-6 py-3 border-t border-stone-100 mt-2">
              <div className="flex items-center justify-center mb-4">
                <LanguageSwitcher />
              </div>
              <Link
                href="/book"
                className="block w-full text-center bg-amber-700 text-white py-3 rounded-xl font-medium
                         hover:bg-amber-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <SearchDialog open={isSearchOpen} onClose={closeSearch} />
    </header>
  );
}
