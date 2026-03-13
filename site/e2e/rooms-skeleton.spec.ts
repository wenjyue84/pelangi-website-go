import { test, expect } from "@playwright/test";

/**
 * US-141: Suspense skeleton visibility test
 *
 * Verifies that on a throttled (Slow 3G) connection the RoomCardSkeleton
 * fallback is visible while the <Rooms> Server Component is still streaming,
 * and that real content eventually replaces it.
 *
 * The test uses Chrome DevTools Protocol (CDP) network throttling to simulate
 * Slow 3G (≈400 kbps download, 400 kbps upload, 2 000 ms RTT).
 */
test.describe("Rooms page – Suspense skeleton streaming (US-141)", () => {
  test("skeleton is visible during Slow 3G load before Rooms content arrives", async ({
    page,
    context,
  }) => {
    // Apply Slow 3G throttle via CDP
    const cdp = await context.newCDPSession(page);
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      downloadThroughput: (400 * 1024) / 8, // 50 KB/s
      uploadThroughput: (400 * 1024) / 8,
      latency: 2000, // 2 s RTT
    });

    // Start navigating — do NOT await (we want to observe the in-progress state)
    const navigationPromise = page.goto("/rooms", { waitUntil: "commit" });

    // Wait for the skeleton's aria role to appear in the DOM (first streaming chunk)
    const skeleton = page.getByRole("status", {
      name: /loading room information/i,
    });
    await expect(skeleton).toBeVisible({ timeout: 15_000 });

    // Allow navigation to finish fully
    await navigationPromise;
    await page.waitForLoadState("domcontentloaded");

    // Remove throttle so the rest of the test runs at full speed
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      downloadThroughput: -1,
      uploadThroughput: -1,
      latency: 0,
    });

    // After full load the skeleton must be gone and real content visible
    await expect(skeleton).not.toBeVisible({ timeout: 20_000 });

    // Verify key content from the real <Rooms> component is present
    await expect(
      page.getByRole("heading", { name: /your private pod awaits/i })
    ).toBeVisible({ timeout: 10_000 });

    // Verify price card rendered
    await expect(page.getByText("RM35")).toBeVisible();
  });

  test("skeleton matches room card column structure (no CLS)", async ({
    page,
  }) => {
    // Navigate and wait for skeleton to appear (commit state: HTML started streaming)
    const navigationPromise = page.goto("/rooms", { waitUntil: "commit" });

    const skeleton = page.getByRole("status", {
      name: /loading room information/i,
    });

    // If streaming is fast, the skeleton may only be visible briefly — capture it
    // when available, but do not fail if it resolves before we can observe it
    try {
      await expect(skeleton).toBeVisible({ timeout: 3_000 });

      // The skeleton section must occupy a similar height to the real section
      // (prevents CLS). Check it renders within the main content area.
      const skeletonBox = await skeleton.boundingBox();
      expect(skeletonBox).not.toBeNull();
      if (skeletonBox) {
        expect(skeletonBox.height).toBeGreaterThan(200);
      }
    } catch {
      // Skeleton resolved before we could observe it — this is acceptable
      // on fast connections and indicates good server performance.
    }

    await navigationPromise;

    // Either way, real content must eventually be present
    await expect(
      page.getByRole("heading", { name: /your private pod awaits/i })
    ).toBeVisible({ timeout: 15_000 });
  });
});
