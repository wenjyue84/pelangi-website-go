import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/server's after() — vi.hoisted ensures the fn is available at hoist time
const mockAfter = vi.hoisted(() => vi.fn((cb: () => void) => cb()));

vi.mock("next/server", () => ({
  after: mockAfter,
  NextResponse: {
    next: vi.fn(() => ({})),
    json: vi.fn((body: unknown) => ({ body })),
  },
}));

import {
  logPageView,
  logServerEvent,
  deferAfterResponse,
  type PageViewEvent,
  type ServerAnalyticsEvent,
} from "../lib/server-analytics";

describe("server-analytics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  describe("logPageView", () => {
    it("calls after() with a callback that logs page view data", () => {
      const event: PageViewEvent = {
        path: "/rooms",
        userAgent: "Mozilla/5.0",
        ip: "1.2.3.4",
        referrer: "https://google.com",
        timestamp: "2026-03-14T00:00:00.000Z",
      };

      logPageView(event);

      expect(mockAfter).toHaveBeenCalledTimes(1);
      expect(mockAfter).toHaveBeenCalledWith(expect.any(Function));

      // Verify the logged data contains correct fields
      expect(console.log).toHaveBeenCalledWith(
        "[page-view]",
        expect.stringContaining("/rooms")
      );
      expect(console.log).toHaveBeenCalledWith(
        "[page-view]",
        expect.stringContaining("1.2.3.4")
      );
    });

    it("includes all required fields in the log output", () => {
      const event: PageViewEvent = {
        path: "/book",
        userAgent: "TestAgent",
        ip: "10.0.0.1",
        referrer: "",
        timestamp: "2026-03-14T12:00:00.000Z",
      };

      logPageView(event);

      const logCall = vi.mocked(console.log).mock.calls[0];
      const logged = JSON.parse(logCall[1] as string);

      expect(logged).toEqual({
        path: "/book",
        ua: "TestAgent",
        ip: "10.0.0.1",
        ref: "",
        ts: "2026-03-14T12:00:00.000Z",
      });
    });
  });

  describe("logServerEvent", () => {
    it("calls after() with a callback that logs server event data", () => {
      const event: ServerAnalyticsEvent = {
        event: "contact_form_submit",
        path: "/contact",
        payload: { name: "Test User" },
        timestamp: "2026-03-14T00:00:00.000Z",
      };

      logServerEvent(event);

      expect(mockAfter).toHaveBeenCalledTimes(1);

      const logCall = vi.mocked(console.log).mock.calls[0];
      const logged = JSON.parse(logCall[1] as string);

      expect(logged.event).toBe("contact_form_submit");
      expect(logged.path).toBe("/contact");
      expect(logged.data).toEqual({ name: "Test User" });
    });

    it("omits payload when not provided", () => {
      const event: ServerAnalyticsEvent = {
        event: "PageView",
        path: "/",
        timestamp: "2026-03-14T00:00:00.000Z",
      };

      logServerEvent(event);

      const logCall = vi.mocked(console.log).mock.calls[0];
      const logged = JSON.parse(logCall[1] as string);

      expect(logged.data).toBeUndefined();
      expect(logged.event).toBe("PageView");
    });
  });

  describe("deferAfterResponse", () => {
    it("passes the callback directly to after()", () => {
      const callback = vi.fn();

      deferAfterResponse(callback);

      expect(mockAfter).toHaveBeenCalledTimes(1);
      // The mock executes the callback synchronously
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("handles async callbacks", async () => {
      let resolved = false;
      const asyncCallback = vi.fn(async () => {
        resolved = true;
      });

      deferAfterResponse(asyncCallback);

      expect(mockAfter).toHaveBeenCalledTimes(1);
      expect(asyncCallback).toHaveBeenCalledTimes(1);
      await vi.waitFor(() => expect(resolved).toBe(true));
    });
  });
});
