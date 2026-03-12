"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundColor: "#fafaf9",
          color: "#1c1917",
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <span
              style={{
                fontSize: "5rem",
                fontWeight: 700,
                color: "#f59e0b",
                letterSpacing: "-0.02em",
              }}
            >
              Pelangi
            </span>
          </div>

          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "#1c1917",
            }}
          >
            A critical error occurred
          </h1>

          <p
            style={{
              color: "#57534e",
              fontSize: "1.125rem",
              marginBottom: "2.5rem",
              maxWidth: "400px",
            }}
          >
            Something went seriously wrong. Please try again or contact us if
            the problem persists.
          </p>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <button
              onClick={reset}
              style={{
                backgroundColor: "#f59e0b",
                color: "white",
                border: "none",
                borderRadius: "9999px",
                padding: "1rem 2rem",
                fontSize: "1.125rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>

            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- global-error cannot use next/link */}
            <a
              href="/"
              style={{
                backgroundColor: "white",
                color: "#44403c",
                border: "1px solid #e7e5e4",
                borderRadius: "9999px",
                padding: "1rem 2rem",
                fontSize: "1.125rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Return to homepage
            </a>
          </div>

          {error.digest && (
            <p
              style={{
                marginTop: "2rem",
                color: "#a8a29e",
                fontSize: "0.75rem",
                fontFamily: "monospace",
              }}
            >
              Error ID: {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
