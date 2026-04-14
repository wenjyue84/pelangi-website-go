"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { setLanguagePreference } from "@/app/actions/language";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "ms", label: "BM", href: "/ms/terma" },
  { code: "zh", label: "中文", href: "/zh" },
];

export default function LanguageSwitcher() {
  const router = useRouter();

  const handleLanguageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const langCode = e.currentTarget.value;

    // Set the cookie
    await setLanguagePreference(langCode);

    // Navigate to language-specific content page if href is defined
    const lang = LANGUAGES.find((l) => l.code === langCode);
    if (lang && "href" in lang && lang.href) {
      router.push(lang.href as Route);
      return;
    }
  };

  return (
    <div className="ml-4">
      <label htmlFor="language-select" className="sr-only">
        Select language
      </label>
      <select
        id="language-select"
        className="select-base"
        defaultValue="en"
        onChange={handleLanguageChange}
        aria-label="Language selector"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
