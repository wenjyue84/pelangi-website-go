"use client";

import { useEffect } from "react";
import { onINP, onLCP, onCLS } from "web-vitals/attribution";

export default function WebVitalsReporter() {
  useEffect(() => {
    // Ensure gtag is available (loaded by AnalyticsProvider)
    if (typeof window !== "undefined" && (window as any).gtag) {
      const gtag = (window as any).gtag;

      // Report INP with attribution breakdown
      onINP((metric) => {
        gtag("event", "web_vitals", {
          metric_name: "INP",
          metric_value: metric.value,
          metric_id: metric.id,
          input_delay: (metric.attribution as any)?.inputDelay ?? 0,
          processing_time: (metric.attribution as any)?.processingDuration ?? 0,
          presentation_delay: (metric.attribution as any)?.presentationDelay ?? 0,
          interaction_target: (metric.attribution as any)?.interactionTarget ?? "",
        });
      });

      // Report LCP
      onLCP((metric) => {
        gtag("event", "web_vitals", {
          metric_name: "LCP",
          metric_value: metric.value,
          metric_id: metric.id,
        });
      });

      // Report CLS
      onCLS((metric) => {
        gtag("event", "web_vitals", {
          metric_name: "CLS",
          metric_value: metric.value,
          metric_id: metric.id,
        });
      });
    }
  }, []);

  return null;
}
