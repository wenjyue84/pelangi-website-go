import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { name: "Home", path: "/" },
  { name: "Rooms", path: "/rooms" },
  { name: "Book", path: "/book" },
  { name: "Contact", path: "/contact" },
  { name: "Blog", path: "/blog" },
  { name: "Guide", path: "/guide" },
];

for (const { name, path } of pages) {
  test(`${name} page (${path}) has no WCAG 2.1 A/AA violations`, async ({
    page,
  }) => {
    await page.goto(path, { waitUntil: "networkidle" });

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const violations = results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      helpUrl: v.helpUrl,
      nodes: v.nodes.map((n) => n.target.join(", ")),
    }));

    if (violations.length > 0) {
      const table = violations
        .map(
          (v) =>
            `| ${v.id} | ${v.impact} | ${v.description} | ${v.nodes.join("; ")} | ${v.helpUrl} |`
        )
        .join("\n");

      console.log(`\n## Accessibility violations on ${name} (${path})\n`);
      console.log("| Rule | Impact | Description | Elements | Help URL |");
      console.log("|------|--------|-------------|----------|----------|");
      console.log(table);
    }

    expect(
      violations,
      `${violations.length} accessibility violation(s) found on ${name} (${path}):\n${JSON.stringify(violations, null, 2)}`
    ).toEqual([]);
  });
}
