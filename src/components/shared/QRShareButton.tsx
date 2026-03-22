"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Share2, X, Download, Copy, Check } from "lucide-react";
import QRCode from "qrcode";

const SITE_URL = "https://newtonforg2k.info";
const GRAPHIC_SIZE = 1080;

// ── Canvas graphic generator ───────────────────────────────────────────────
async function generateShareGraphic(): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = GRAPHIC_SIZE;
  canvas.height = GRAPHIC_SIZE;
  const ctx = canvas.getContext("2d")!;

  // Background
  ctx.fillStyle = "#030C05";
  ctx.fillRect(0, 0, GRAPHIC_SIZE, GRAPHIC_SIZE);

  // Green aurora — top-left
  const glow1 = ctx.createRadialGradient(0, 0, 0, 0, 0, 700);
  glow1.addColorStop(0, "rgba(29,184,75,0.18)");
  glow1.addColorStop(1, "transparent");
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, GRAPHIC_SIZE, GRAPHIC_SIZE);

  // Gold aurora — bottom-right
  const glow2 = ctx.createRadialGradient(GRAPHIC_SIZE, GRAPHIC_SIZE, 0, GRAPHIC_SIZE, GRAPHIC_SIZE, 600);
  glow2.addColorStop(0, "rgba(245,197,24,0.10)");
  glow2.addColorStop(1, "transparent");
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, GRAPHIC_SIZE, GRAPHIC_SIZE);

  // Gold top bar
  ctx.fillStyle = "#F5C518";
  ctx.fillRect(0, 0, GRAPHIC_SIZE, 10);

  // Green bottom bar
  ctx.fillStyle = "#1DB84B";
  ctx.fillRect(0, GRAPHIC_SIZE - 10, GRAPHIC_SIZE, 10);

  // ── Name ──────────────────────────────────────────────────────────────
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 96px 'Arial Black', 'Arial Bold', sans-serif";
  ctx.fillText("NEWTON HARRIS", GRAPHIC_SIZE / 2, 150);

  // Gold sub-label
  ctx.fillStyle = "#F5C518";
  ctx.font = "bold 36px Arial, sans-serif";
  ctx.letterSpacing = "8px";
  ctx.fillText("FOR G2K PRESIDENT 2026", GRAPHIC_SIZE / 2, 215);

  // Divider
  ctx.fillStyle = "rgba(29,184,75,0.35)";
  ctx.fillRect(GRAPHIC_SIZE / 2 - 200, 245, 400, 2);

  // ── QR Code ───────────────────────────────────────────────────────────
  const qrCanvas = document.createElement("canvas");
  await QRCode.toCanvas(qrCanvas, SITE_URL, {
    width: 380,
    margin: 2,
    color: { dark: "#030C05", light: "#ffffff" },
  });
  const qrSize = 380;
  const qrX = (GRAPHIC_SIZE - qrSize) / 2;
  const qrY = 285;

  // QR background rounded rect
  const radius = 24;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(qrX - 20 + radius, qrY - 20);
  ctx.lineTo(qrX - 20 + qrSize + 40 - radius, qrY - 20);
  ctx.quadraticCurveTo(qrX - 20 + qrSize + 40, qrY - 20, qrX - 20 + qrSize + 40, qrY - 20 + radius);
  ctx.lineTo(qrX - 20 + qrSize + 40, qrY - 20 + qrSize + 40 - radius);
  ctx.quadraticCurveTo(qrX - 20 + qrSize + 40, qrY - 20 + qrSize + 40, qrX - 20 + qrSize + 40 - radius, qrY - 20 + qrSize + 40);
  ctx.lineTo(qrX - 20 + radius, qrY - 20 + qrSize + 40);
  ctx.quadraticCurveTo(qrX - 20, qrY - 20 + qrSize + 40, qrX - 20, qrY - 20 + qrSize + 40 - radius);
  ctx.lineTo(qrX - 20, qrY - 20 + radius);
  ctx.quadraticCurveTo(qrX - 20, qrY - 20, qrX - 20 + radius, qrY - 20);
  ctx.closePath();
  ctx.fill();

  ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

  // ── URL ───────────────────────────────────────────────────────────────
  ctx.fillStyle = "#1DB84B";
  ctx.font = "bold 38px Arial, sans-serif";
  ctx.fillText("newtonforg2k.info", GRAPHIC_SIZE / 2, 750);

  // ── Tagline ───────────────────────────────────────────────────────────
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "300 32px Arial, sans-serif";
  ctx.fillText("Tested. Proven. Ready to Lead on Day One.", GRAPHIC_SIZE / 2, 815);

  // ── Bottom CTA strip ──────────────────────────────────────────────────
  const stripY = 880;
  const stripH = 130;
  ctx.fillStyle = "rgba(29,184,75,0.12)";
  ctx.strokeStyle = "rgba(29,184,75,0.3)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.rect(60, stripY, GRAPHIC_SIZE - 120, stripH);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 30px Arial, sans-serif";
  ctx.fillText("Vote Newton Harris · G2K Presidential Election 2026", GRAPHIC_SIZE / 2, stripY + 46);
  ctx.fillStyle = "rgba(245,197,24,0.8)";
  ctx.font = "bold 22px Arial, sans-serif";
  ctx.fillText("Jamaica Labour Party Youth Arm · Generation 2000", GRAPHIC_SIZE / 2, stripY + 86);

  return new Promise((resolve) => canvas.toBlob((b) => resolve(b!), "image/png"));
}

// ── Platform share helpers ─────────────────────────────────────────────────
const SHARE_TEXT = encodeURIComponent("Newton Harris for G2K President 2026 — Tested. Proven. Ready to Lead on Day One.\n" + SITE_URL);

const platforms = [
  {
    id: "native",
    label: "Share…",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
    color: "#1DB84B",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: "#25D366",
    url: `https://wa.me/?text=${SHARE_TEXT}`,
  },
  {
    id: "twitter",
    label: "X / Twitter",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: "#fff",
    url: `https://twitter.com/intent/tweet?text=${SHARE_TEXT}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: "#1877F2",
    url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`,
  },
];

// ── Component ──────────────────────────────────────────────────────────────
export default function QRShareButton() {
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [graphicBlob, setGraphicBlob] = useState<Blob | null>(null);
  const [graphicUrl, setGraphicUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
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

  // Revoke object URL on unmount
  useEffect(() => () => { if (graphicUrl) URL.revokeObjectURL(graphicUrl); }, [graphicUrl]);

  // Generate graphic when popover opens
  useEffect(() => {
    if (!open || graphicBlob) return;
    setGenerating(true);
    generateShareGraphic().then((blob) => {
      setGraphicBlob(blob);
      setGraphicUrl(URL.createObjectURL(blob));
      setGenerating(false);
    });
  }, [open, graphicBlob]);

  const handlePlatform = useCallback(async (id: string, url?: string) => {
    if (id === "native") {
      if (graphicBlob && navigator.canShare?.({ files: [new File([graphicBlob], "newton-harris-2026.png", { type: "image/png" })] })) {
        const file = new File([graphicBlob], "newton-harris-2026.png", { type: "image/png" });
        await navigator.share({
          files: [file],
          title: "Newton Harris for G2K President 2026",
          text: "Tested. Proven. Ready to Lead on Day One.",
        }).catch(() => undefined);
      } else if (navigator.share) {
        await navigator.share({ title: "Newton Harris for G2K President 2026", text: "Tested. Proven. Ready to Lead on Day One.", url: SITE_URL }).catch(() => undefined);
      }
      return;
    }
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }, [graphicBlob]);

  const handleDownload = useCallback(() => {
    if (!graphicUrl) return;
    const a = document.createElement("a");
    a.href = graphicUrl;
    a.download = "newton-harris-g2k-2026.png";
    a.click();
  }, [graphicUrl]);

  const handleCopyLink = useCallback(async () => {
    await navigator.clipboard.writeText(SITE_URL).catch(() => undefined);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div ref={popoverRef}>
      {/* Popover */}
      {open && (
        <div
          className="fixed z-50 rounded-2xl overflow-hidden"
          style={{
            bottom: "8rem",
            right: "1.5rem",
            width: "280px",
            background: "rgba(3,12,5,0.97)",
            border: "1px solid rgba(29,184,75,0.22)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.65), 0 0 40px rgba(29,184,75,0.1)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <div className="px-5 pt-5 pb-5 space-y-4">
            {/* Header */}
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-brand-vivid)" }}>
              Share the Campaign
            </p>

            {/* Graphic preview */}
            <div className="w-full rounded-xl overflow-hidden relative" style={{ aspectRatio: "1/1", background: "#030C05", border: "1px solid rgba(29,184,75,0.15)" }}>
              {generating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border-2 border-[var(--color-brand-vivid)] border-t-transparent animate-spin" />
                </div>
              )}
              {graphicUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={graphicUrl} alt="Share graphic preview" className="w-full h-full object-cover" />
              )}
            </div>

            {/* Social platform buttons */}
            <div className="grid grid-cols-2 gap-2">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePlatform(p.id, p.url)}
                  disabled={generating}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90 active:scale-95 disabled:opacity-40"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: p.color, fontFamily: "var(--font-sans)" }}
                >
                  {p.icon}
                  {p.label}
                </button>
              ))}
            </div>

            {/* Download + Copy row */}
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                disabled={generating || !graphicUrl}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90 active:scale-95 disabled:opacity-40"
                style={{ background: "rgba(245,197,24,0.12)", border: "1px solid rgba(245,197,24,0.25)", color: "#F5C518", fontFamily: "var(--font-sans)" }}
              >
                <Download size={12} /> Save Image
              </button>
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90 active:scale-95"
                style={{ background: "rgba(29,184,75,0.1)", border: "1px solid rgba(29,184,75,0.22)", color: "var(--color-brand-vivid)", fontFamily: "var(--font-sans)" }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
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
          boxShadow: open ? "0 0 28px rgba(29,184,75,0.45)" : "0 0 16px rgba(29,184,75,0.18)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition: "all 0.25s ease",
        }}
      >
        {open ? <X size={18} color="#fff" /> : <Share2 size={18} color="#1DB84B" />}
      </button>
    </div>
  );
}
