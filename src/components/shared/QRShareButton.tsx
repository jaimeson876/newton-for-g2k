"use client";

import { useState, useEffect, useRef } from "react";
import { Share2, X } from "lucide-react";

const SITE_URL = "https://newtonforg2k.info";
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(SITE_URL)}&color=1DB84B&bgcolor=030C05&size=220x220&margin=12&format=png`;

export default function QRShareButton() {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={popoverRef}>
      {/* Popover */}
      {open && (
        <div
          className="fixed z-50 rounded-2xl overflow-hidden"
          style={{
            bottom: "8rem",
            right: "1.5rem",
            width: "232px",
            background: "rgba(3,12,5,0.96)",
            border: "1px solid rgba(29,184,75,0.22)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.65), 0 0 40px rgba(29,184,75,0.1)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <div className="px-5 pt-5 pb-5">
            {/* Label */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-brand-vivid)",
                marginBottom: "0.9rem",
              }}
            >
              Share the Campaign
            </p>

            {/* QR code */}
            <div
              className="w-full rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(29,184,75,0.14)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={QR_SRC}
                alt="QR code — newtonforg2k.info"
                className="w-full h-auto block"
                width={220}
                height={220}
              />
            </div>

            {/* URL hint */}
            <p
              className="mt-3 text-center"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.3)",
                lineHeight: 1.6,
              }}
            >
              Scan to visit{" "}
              <span style={{ color: "rgba(29,184,75,0.65)", fontWeight: 600 }}>
                newtonforg2k.info
              </span>
            </p>

            {/* Divider */}
            <div
              className="my-4"
              style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
            />

            {/* Native share fallback */}
            <button
              onClick={async () => {
                if (navigator.share) {
                  await navigator.share({
                    title: "Newton Harris for G2K President",
                    text: "Tested. Proven. Ready to Lead on Day One.",
                    url: SITE_URL,
                  }).catch(() => undefined);
                } else {
                  await navigator.clipboard.writeText(SITE_URL).catch(() => undefined);
                }
              }}
              className="w-full py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "rgba(29,184,75,0.12)",
                border: "1px solid rgba(29,184,75,0.22)",
                color: "var(--color-brand-vivid)",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.06em",
              }}
            >
              Copy Link
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close share panel" : "Share this campaign"}
        className="fixed z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{
          bottom: "6rem",
          right: "1.5rem",
          background: open ? "var(--color-brand-vivid)" : "rgba(3,12,5,0.88)",
          border: "1px solid rgba(29,184,75,0.38)",
          boxShadow: open
            ? "0 0 28px rgba(29,184,75,0.45)"
            : "0 0 16px rgba(29,184,75,0.18)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition: "all 0.25s ease",
        }}
      >
        {open ? (
          <X size={18} color="#fff" />
        ) : (
          <Share2 size={18} color="#1DB84B" />
        )}
      </button>
    </div>
  );
}
