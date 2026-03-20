"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--color-brand-950)" }}
    >
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--color-brand-vivid)",
          marginBottom: "1.5rem",
        }}
      >
        Something went wrong
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          color: "#fff",
          letterSpacing: "-0.03em",
          lineHeight: 0.95,
          marginBottom: "1.5rem",
        }}
      >
        Page Error
      </h1>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 300,
          fontSize: "0.95rem",
          color: "rgba(255,255,255,0.4)",
          lineHeight: 1.7,
          maxWidth: "400px",
          marginBottom: "2.5rem",
        }}
      >
        An unexpected error occurred. Try reloading. Newton&apos;s campaign isn&apos;t slowing down.
      </p>
      <button
        onClick={reset}
        className="px-8 py-3.5 rounded-2xl font-bold text-sm transition-all hover:opacity-90 active:scale-95"
        style={{
          background: "var(--color-brand-vivid)",
          color: "#fff",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
        }}
      >
        Reload Page
      </button>
    </div>
  );
}
