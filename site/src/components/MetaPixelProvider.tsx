"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ?? "";
const COOKIE_NAME = "pelangi_cookie_consent";

function readConsentCookie(): boolean {
  if (typeof document === "undefined") return false;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)
  );
  return match?.[1] === "accepted";
}

export default function MetaPixelProvider() {
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

  if (!consented || !PIXEL_ID) return null;

  return (
    <>
      <Script
        id="meta-pixel-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;t.integrity='sha384-INENpXEM6EBeA8liGpPdxXC6SvTmkZDSYqZLLrkf2WJuDUGxJMqUUrSWtKvqxo83';
            t.crossOrigin='anonymous';s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');`,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
