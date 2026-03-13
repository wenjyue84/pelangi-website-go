export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Convert heading text to a kebab-case id slug */
export function toSlug(text: string): string {
  return text
    .replace(/<[^>]+>/g, "") // strip inner HTML tags
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Extract H2/H3 headings from an HTML string (build-time, no DOM) */
export function extractHeadings(html: string): Heading[] {
  const matches = [...html.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi)];
  return matches.map(([, level, inner]) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    return {
      level: parseInt(level) as 2 | 3,
      text,
      id: toSlug(text),
    };
  });
}

/** Inject id attributes into H2/H3 headings in an HTML string */
export function addHeadingIds(html: string): string {
  return html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_, level, attrs, inner) => {
      if (/\bid=/.test(attrs)) return `<h${level}${attrs}>${inner}</h${level}>`;
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const id = toSlug(text);
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    }
  );
}
