import { test, expect } from "@playwright/test";

const STORAGE_KEY = "pelangi_booking_draft";
const DISMISSED_KEY = "pelangi_booking_draft_dismissed";

test.describe("Booking abandonment recovery", () => {
  test("saves draft to sessionStorage when room is selected on /book", async ({
    page,
  }) => {
    await page.goto("/book");

    // Select a room type (default is already "Capsule Pod")
    await page.selectOption("#room-type", "Monthly Capsule Pod");

    // Set check-in date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const checkInValue = tomorrow.toISOString().split("T")[0];
    await page.fill("#check-in", checkInValue);

    // Verify sessionStorage has the draft
    const draft = await page.evaluate((key) => {
      const raw = sessionStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }, STORAGE_KEY);

    expect(draft).not.toBeNull();
    expect(draft.roomType).toBe("Monthly Capsule Pod");
    expect(draft.checkIn).toBe(checkInValue);
  });

  test("shows recovery banner on home page when draft exists", async ({
    page,
  }) => {
    // Seed a draft in sessionStorage via /book first
    await page.goto("/book");
    await page.selectOption("#room-type", "Capsule Pod");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.fill("#check-in", tomorrow.toISOString().split("T")[0]);

    // Navigate to home page
    await page.goto("/");

    // Wait for recovery banner to appear (800ms delay + render)
    const banner = page.getByRole("status");
    await expect(banner).toBeVisible({ timeout: 5000 });
    await expect(banner).toContainText("Continue your booking");
    await expect(banner).toContainText("Capsule Pod");
  });

  test("banner disappears after dismissal and does not reappear", async ({
    page,
  }) => {
    // Seed a draft
    await page.goto("/book");
    await page.selectOption("#room-type", "Capsule Pod");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.fill("#check-in", tomorrow.toISOString().split("T")[0]);

    // Navigate away to trigger banner
    await page.goto("/");
    const banner = page.getByRole("status");
    await expect(banner).toBeVisible({ timeout: 5000 });

    // Dismiss it
    await page.getByRole("button", { name: /dismiss/i }).click();
    await expect(banner).not.toBeVisible();

    // Navigate to another page — banner should NOT reappear
    await page.goto("/rooms");
    await page.waitForTimeout(1500);
    await expect(page.getByRole("status")).not.toBeVisible();

    // Verify dismissed flag in sessionStorage
    const dismissed = await page.evaluate(
      (key) => sessionStorage.getItem(key),
      DISMISSED_KEY
    );
    expect(dismissed).toBe("true");
  });

  test("no personal data stored in sessionStorage draft", async ({ page }) => {
    await page.goto("/book");
    await page.selectOption("#room-type", "Capsule Pod");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.fill("#check-in", tomorrow.toISOString().split("T")[0]);

    const draft = await page.evaluate((key) => {
      const raw = sessionStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }, STORAGE_KEY);

    expect(draft).not.toBeNull();
    // Only allowed keys: roomType, checkIn, checkOut, savedAt
    const allowedKeys = ["roomType", "checkIn", "checkOut", "savedAt"];
    for (const key of Object.keys(draft)) {
      expect(allowedKeys).toContain(key);
    }
    // Must not contain personal data fields
    expect(draft).not.toHaveProperty("name");
    expect(draft).not.toHaveProperty("email");
    expect(draft).not.toHaveProperty("phone");
  });
});
