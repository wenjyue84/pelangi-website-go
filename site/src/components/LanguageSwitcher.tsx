"use client";

import type { Route } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setLanguagePreference } from "@/app/actions/language";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "ms", label: "BM", href: "/ms/terma" },
  { code: "zh", label: "中文", href: "/zh" },
];

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const router = useRouter();

  const handleLanguageChange = async (langCode: string) => {
    setCurrentLanguage(langCode);

    // Set the cookie
    await setLanguagePreference(langCode);

    // Navigate to BM content page
    const lang = LANGUAGES.find((l) => l.code === langCode);
    if (lang && "href" in lang && lang.href) {
      router.push(lang.href as Route);
      return;
    }

  };

  return (
    <div className="flex items-center gap-1 ml-4">
      <nav
        className="flex gap-1 bg-stone-100 dark:bg-stone-800 rounded-full p-1"
        aria-label="Language selector"
      >
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`min-h-6 min-w-6 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
              currentLanguage === lang.code
                ? "bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs"
                : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
            }`}
            aria-pressed={currentLanguage === lang.code}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.label}
          </button>
        ))}
      </nav>

    </div>
  );
}
