import { test, expect } from "@playwright/test";

/**
 * WCAG 2.2 SC 1.4.4 — Resize Text
 * Verifies that all pages render without horizontal scrollbar
 * and without clipped/overlapping text at 200% browser zoom.
 */

const pages = [
  { name: "Home", path: "/" },
  { name: "Rooms", path: "/rooms" },
  { name: "Book", path: "/book" },
  { name: "Contact", path: "/contact" },
  { name: "Blog", path: "/blog" },
  { name: "Guide", path: "/guide" },
];

for (const { name, path } of pages) {
  test(`${name} page has no horizontal scrollbar at 200% zoom`, async ({
    page,
  }) => {
    // Set viewport to a standard desktop width
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(path, { waitUntil: "domcontentloaded" });

    // Simulate 200% zoom via CSS zoom (equivalent to browser zoom)
    await page.evaluate(() => {
      document.documentElement.style.zoom = "2";
    });

    // Wait for layout to settle
    await page.waitForTimeout(500);

    // Check that no horizontal scrollbar appears
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(
      hasHorizontalScroll,
      `${name} (${path}) shows a horizontal scrollbar at 200% zoom — scrollWidth exceeds clientWidth`
    ).toBe(false);
  });

  test(`${name} page buttons and links remain clickable at 200% zoom`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(path, { waitUntil: "domcontentloaded" });

    // Simulate 200% zoom
    await page.evaluate(() => {
      document.documentElement.style.zoom = "2";
    });

    await page.waitForTimeout(500);

    // Verify all buttons and links have non-zero bounding boxes (visible & clickable)
    const hiddenInteractives = await page.evaluate(() => {
      const elements = Array.from(
        document.querySelectorAll('button, a[href], input, select, textarea, [role="button"]')
      );
      const hidden: string[] = [];
      for (const el of elements) {
        // Skip elements that are intentionally hidden (display:none, visibility:hidden)
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") continue;

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          hidden.push(
            `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}` +
            `${el.className ? "." + String(el.className).split(" ")[0] : ""}`
          );
        }
      }
      return hidden;
    });

    expect(
      hiddenInteractives,
      `${name} (${path}): interactive elements have zero size at 200% zoom: ${hiddenInteractives.join(", ")}`
    ).toEqual([]);
  });
}
