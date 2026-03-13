"use client";

import { useState } from "react";
import { setLanguagePreference } from "@/app/actions/language";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
];

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleLanguageChange = async (langCode: string) => {
    setCurrentLanguage(langCode);

    // Set the cookie
    await setLanguagePreference(langCode);

    // Show toast for Chinese language
    if (langCode === "zh") {
      setToastMessage("中文版本即将推出 (Chinese version coming soon)");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
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

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-auto md:right-6 z-60 max-w-sm animate-fade-in">
          <div className="bg-stone-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}
