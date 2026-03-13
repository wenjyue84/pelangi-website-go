import React from "react";

/**
 * Wraps Malay-language text with lang="ms" for WCAG 2.2 SC 3.1.2 compliance.
 * Screen readers use this to switch to a Malay TTS voice for correct pronunciation.
 */
export default function LangMs({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span lang="ms" className={className}>
      {children}
    </span>
  );
}

/**
 * Known Malay-language terms that appear on the site.
 * Proper nouns (place names like "Johor Bahru") are excluded — SC 3.1.2 applies
 * to passages of text, not individual proper nouns which retain their original form.
 * Food, cultural, and common Malay terms that a screen reader might mispronounce
 * are included.
 */
const MALAY_TERMS = [
  // Food terms
  "nasi lemak",
  "nasi goreng",
  "roti canai",
  "teh tarik",
  "kopi-O",
  "kopi",
  "mee rebus",
  "laksa",
  "satay",
  "rendang",
  "rojak",
  "kuih",
  "cendol",
  "ikan bakar",
  "sup tulang merah",
  "sup tulang",
  "char kway teow",
  // Cultural/common terms
  "pasar malam",
  "kopitiam",
  "kopitiams",
  "mamak",
  "warung",
  "kampung",
  // Malay holidays and greetings
  "Hari Raya Aidilfitri",
  "Hari Raya Haji",
  "Hari Raya",
  "Selamat Hari Raya",
  "Merdeka",
  "Yang di-Pertuan Agong",
  // Place descriptors (Malay common nouns, not proper names)
  "restoran",
  "kedai",
  "pulau",
  "sungai",
  "pantai",
  "tanjung",
  "jalan",
  "taman",
];

// Sort by length descending so longer terms match first (e.g. "sup tulang merah" before "sup tulang")
const SORTED_TERMS = [...MALAY_TERMS].sort((a, b) => b.length - a.length);

const MALAY_REGEX = new RegExp(
  `(${SORTED_TERMS.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "gi"
);

/**
 * Wraps known Malay terms in a string with <span lang="ms">.
 * Returns a ReactNode array suitable for JSX rendering.
 */
export function annotateMs(text: string): React.ReactNode {
  const parts = text.split(MALAY_REGEX);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    if (SORTED_TERMS.some((t) => t.toLowerCase() === part.toLowerCase())) {
      return (
        <span key={i} lang="ms">
          {part}
        </span>
      );
    }
    return part;
  });
}

/**
 * Wraps known Malay terms in an HTML string with <span lang="ms">.
 * For use with dangerouslySetInnerHTML content (e.g., blog posts).
 * Avoids wrapping terms that are already inside HTML tags or attributes.
 */
export function annotateMsHtml(html: string): string {
  // Only replace terms in text nodes (not inside < > tags)
  return html.replace(
    /(<[^>]*>)|([^<]+)/g,
    (match, tag: string | undefined, text: string | undefined) => {
      if (tag) return tag;
      if (!text) return match;
      return text.replace(MALAY_REGEX, '<span lang="ms">$1</span>');
    }
  );
}
