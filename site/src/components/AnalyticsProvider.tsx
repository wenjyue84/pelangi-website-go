"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const COOKIE_NAME = "pelangi_cookie_consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

function readConsentCookie(): boolean {
  if (typeof document === "undefined") return false;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)
  );
  return match?.[1] === "accepted";
}

export default function AnalyticsProvider() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    // Pick up consent already stored from a previous visit
    setConsented(readConsentCookie()); // eslint-disable-line react-hooks/set-state-in-effect -- reads browser cookie on mount

    function handleConsent(e: Event) {
      const value = (e as CustomEvent<{ consent: string }>).detail.consent;
      setConsented(value === "accepted");
    }

    window.addEventListener("cookie-consent", handleConsent);
    return () => window.removeEventListener("cookie-consent", handleConsent);
  }, []);

  if (!consented || !GA_ID) return null;

  return (
    <>
      <Script
        id="_next-ga-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');`,
        }}
      />
      <Script
        id="_next-ga"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        integrity="sha384-VgHGdVW55pNfDcu5KaOcZlNPywG7c5uPZKlJmojJOZ4PYYzq02zAspkU6MVejDTo"
        crossOrigin="anonymous"
      />
    </>
  );
}
