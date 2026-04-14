import { describe, it, expect } from "vitest";
import { GET } from "./route";

describe("GET /feed.json", () => {
  it("returns JSON Feed 1.1 with correct version", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.version).toBe("https://jsonfeed.org/version/1.1");
  });

  it("returns at most 10 items", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.items.length).toBeLessThanOrEqual(10);
  });

  it("each item has required JSON Feed 1.1 fields", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.items.length).toBeGreaterThan(0);
    const item = body.items[0];
    expect(item).toHaveProperty("id");
    expect(item).toHaveProperty("title");
    expect(item).toHaveProperty("content_html");
    expect(item).toHaveProperty("date_published");
    expect(item).toHaveProperty("authors");
    expect(item.authors[0]).toHaveProperty("name");
  });

  it("returns Content-Type application/feed+json", async () => {
    const response = await GET();
    expect(response.headers.get("Content-Type")).toContain("application/feed+json");
  });

  it("items are sorted newest-first", async () => {
    const response = await GET();
    const body = await response.json();
    const dates = body.items.map((item: { date_published: string }) => new Date(item.date_published).getTime());
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i]).toBeLessThanOrEqual(dates[i - 1]);
    }
  });
});
