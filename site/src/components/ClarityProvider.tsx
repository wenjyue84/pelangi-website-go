"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const COOKIE_NAME = "pelangi_cookie_consent";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "";

function readConsentCookie(): boolean {
  if (typeof document === "undefined") return false;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)
  );
  return match?.[1] === "accepted";
}

export default function ClarityProvider() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading browser cookie on mount (SSR-safe)
    setConsented(readConsentCookie());

    function handleConsent(e: Event) {
      const value = (e as CustomEvent<{ consent: string }>).detail.consent;
      setConsented(value === "accepted");
    }

    window.addEventListener("cookie-consent", handleConsent);
    return () => window.removeEventListener("cookie-consent", handleConsent);
  }, []);

  if (!consented || !CLARITY_ID) return null;

  return (
    <Script
      id="microsoft-clarity"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${CLARITY_ID}");`,
      }}
    />
  );
}
