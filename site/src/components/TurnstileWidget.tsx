"use client";

/**
 * TurnstileWidget — Cloudflare Turnstile CAPTCHA wrapper (US-172)
 *
 * Lazy-loads the Turnstile script only when the user interacts with the
 * enclosing form, preventing it from blocking LCP.
 *
 * Usage:
 *   <TurnstileWidget onVerify={(token) => setTurnstileToken(token)} />
 *   Include a hidden <input name="cf-turnstile-response" value={token} />
 *   to pass the token to the Server Action via FormData.
 */

import { Turnstile } from "@marsidev/react-turnstile";
import { useEffect, useRef, useState } from "react";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  /** ref to the enclosing <form> used for lazy-load detection */
  formRef?: React.RefObject<HTMLFormElement | null>;
}

export default function TurnstileWidget({
  onVerify,
  onExpire,
  formRef,
}: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"; // dummy key for dev
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy-mount: only render the Turnstile widget after the user interacts
  // with the form (focus or click), so it never blocks LCP.
  useEffect(() => {
    const target = formRef?.current ?? containerRef.current;
    if (!target) return;

    function activate() {
      setMounted(true);
    }

    target.addEventListener("focusin", activate, { once: true });
    target.addEventListener("click", activate, { once: true });

    return () => {
      target.removeEventListener("focusin", activate);
      target.removeEventListener("click", activate);
    };
  }, [formRef]);

  return (
    <div ref={containerRef} className="min-h-[65px]">
      {mounted && (
        <Turnstile
          siteKey={siteKey}
          onSuccess={onVerify}
          onExpire={onExpire}
          options={{
            theme: "light",
            size: "normal",
          }}
        />
      )}
    </div>
  );
}
