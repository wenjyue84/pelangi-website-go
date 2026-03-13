"use client";

import { useEffect } from "react";
import { onINP, onLCP, onCLS } from "web-vitals/attribution";

/**
 * Sends a web-vitals event to GA4 via gtag.
 * If gtag hasn't loaded yet (lazyOnload), the event is queued in dataLayer
 * and will be processed once the GA script initialises.
 */
function sendToGA(eventParams: Record<string, string | number>) {
  const w = window as unknown as { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void };
  // Ensure the dataLayer queue exists even before gtag script loads
  w.dataLayer = w.dataLayer || [];
  // gtag() pushes into dataLayer — define it if not yet available
  if (typeof w.gtag !== "function") {
    w.gtag = (...args: unknown[]) => {
      w.dataLayer.push(args);
    };
  }
  w.gtag!("event", "web_vitals", eventParams);
}

export default function WebVitalsReporter() {
  useEffect(() => {
    // Report INP with attribution breakdown
    onINP((metric) => {
      const attr = metric.attribution;
      sendToGA({
        metric_name: "INP",
        metric_value: metric.value,
        metric_id: metric.id,
        input_delay: attr.inputDelay ?? 0,
        processing_time: attr.processingDuration ?? 0,
        presentation_delay: attr.presentationDelay ?? 0,
        interaction_target: attr.interactionTarget ?? "",
      });
    });

    // Report LCP
    onLCP((metric) => {
      sendToGA({
        metric_name: "LCP",
        metric_value: metric.value,
        metric_id: metric.id,
      });
    });

    // Report CLS
    onCLS((metric) => {
      sendToGA({
        metric_name: "CLS",
        metric_value: metric.value,
        metric_id: metric.id,
      });
    });
  }, []);

  return null;
}
