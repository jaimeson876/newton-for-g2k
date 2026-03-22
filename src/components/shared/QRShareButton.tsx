"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Share2, X, Download, Copy, Check } from "lucide-react";
import QRCode from "qrcode";

// Arrow motif SVG (matches ArrowMotif.tsx viewBox 0 0 988.06 988.06)
const ARROW_SVG = (color: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 988.06 988.06" fill="${color}"><polygon points="864.55 123.51 864.55 119.41 984.21 0 988.06 0 988.06 4.11 868.42 123.51 864.55 123.51"/><polygon points="741.04 123.51 741.04 119.41 860.7 0 864.55 0 864.55 4.11 744.91 123.51 741.04 123.51"/><polygon points="617.54 123.51 617.54 119.41 737.19 0 741.04 0 741.04 4.11 621.41 123.51 617.54 123.51"/><polygon points="494.03 123.51 494.03 119.41 613.69 0 617.54 0 617.54 4.11 497.9 123.51 494.03 123.51"/><polygon points="370.52 123.51 370.52 119.41 490.18 0 494.03 0 494.03 4.11 374.39 123.51 370.52 123.51"/><polygon points="247.02 123.51 247.02 119.41 366.67 0 370.52 0 370.52 4.11 250.88 123.51 247.02 123.51"/><polygon points="123.51 123.51 123.51 119.41 243.16 0 247.02 0 247.02 4.11 127.38 123.51 123.51 123.51"/><polygon points="0 123.51 0 119.41 119.66 0 123.51 0 123.51 4.11 3.87 123.51 0 123.51"/><polygon points="864.55 247.02 864.55 242.92 984.21 123.51 988.06 123.51 988.06 127.62 868.42 247.02 864.55 247.02"/><polygon points="864.55 370.52 864.55 366.43 984.21 247.02 988.06 247.02 988.06 251.13 868.42 370.52 864.55 370.52"/><polygon points="864.55 494.03 864.55 489.94 984.21 370.52 988.06 370.52 988.06 374.63 868.42 494.03 864.55 494.03"/><polygon points="864.55 617.54 864.55 613.44 984.21 494.03 988.06 494.03 988.06 498.14 868.42 617.54 864.55 617.54"/><polygon points="864.55 741.05 864.55 736.95 984.21 617.54 988.06 617.54 988.06 621.65 868.42 741.05 864.55 741.05"/><polygon points="864.55 864.55 864.55 860.46 984.21 741.04 988.06 741.04 988.06 745.16 868.42 864.55 864.55 864.55"/><polygon points="864.55 988.06 864.55 983.97 984.21 864.55 988.06 864.55 988.06 868.66 868.42 988.06 864.55 988.06"/><polygon points="123.51 123.51 123.51 133.54 10.04 247.02 0 247.02 0 236.98 113.47 123.51 123.51 123.51"/><polygon points="247.02 123.51 247.02 132.77 132.77 247.02 123.51 247.02 123.51 237.75 237.75 123.51 247.02 123.51"/><polygon points="370.52 123.51 370.52 132 255.51 247.02 247.02 247.02 247.02 238.52 362.03 123.51 370.52 123.51"/><polygon points="494.03 123.51 494.03 131.23 378.24 247.02 370.52 247.02 370.52 239.29 486.31 123.51 494.03 123.51"/><polygon points="617.54 123.51 617.54 130.46 500.98 247.02 494.03 247.02 494.03 240.07 610.59 123.51 617.54 123.51"/><polygon points="741.04 123.51 741.05 129.68 623.71 247.02 617.54 247.02 617.54 240.84 734.87 123.51 741.04 123.51"/><polygon points="864.55 123.51 864.55 128.91 746.45 247.02 741.05 247.02 741.05 241.61 859.15 123.51 864.55 123.51"/><polygon points="123.51 247.02 123.51 262.46 15.44 370.52 0 370.52 0 355.08 108.07 247.02 123.51 247.02"/><polygon points="247.02 247.02 247.02 260.91 137.4 370.52 123.51 370.52 123.51 356.63 233.12 247.02 247.02 247.02"/><polygon points="370.52 247.02 370.52 259.37 259.37 370.52 247.02 370.52 247.02 358.17 358.17 247.02 370.52 247.02"/><polygon points="494.03 247.02 494.03 257.82 381.33 370.52 370.52 370.52 370.52 359.71 483.22 247.02 494.03 247.02"/><polygon points="617.54 247.02 617.54 256.28 503.29 370.52 494.03 370.52 494.03 361.26 608.27 247.02 617.54 247.02"/><polygon points="741.05 247.02 741.05 254.74 625.26 370.52 617.54 370.52 617.54 362.8 733.32 247.02 741.05 247.02"/><polygon points="864.55 247.02 864.55 253.19 747.22 370.52 741.05 370.52 741.05 364.35 858.38 247.02 864.55 247.02"/><polygon points="494.03 370.52 494.03 384.42 384.42 494.03 370.52 494.03 370.52 480.13 480.13 370.52 494.03 370.52"/><polygon points="617.54 370.52 617.54 382.1 505.61 494.03 494.03 494.03 494.03 482.45 605.96 370.52 617.54 370.52"/><polygon points="741.05 370.52 741.05 379.79 626.8 494.03 617.54 494.03 617.54 484.77 731.78 370.52 741.05 370.52"/><polygon points="864.55 370.52 864.55 377.47 747.99 494.03 741.05 494.03 741.05 487.08 857.6 370.52 864.55 370.52"/><polygon points="370.52 494.03 370.52 514.1 267.09 617.54 247.02 617.54 247.02 597.47 350.45 494.03 370.52 494.03"/><polygon points="494.03 494.03 494.03 511.01 387.51 617.54 370.52 617.54 370.52 600.55 477.05 494.03 494.03 494.03"/><polygon points="617.54 494.03 617.54 507.93 507.93 617.54 494.03 617.54 494.03 603.64 603.64 494.03 617.54 494.03"/><polygon points="741.05 494.03 741.05 504.84 628.35 617.54 617.54 617.54 617.54 606.73 730.24 494.03 741.05 494.03"/><polygon points="864.55 494.03 864.55 501.75 748.77 617.54 741.05 617.54 741.05 609.82 856.83 494.03 864.55 494.03"/><polygon points="247.02 617.54 247.02 645.33 151.3 741.05 123.51 741.05 123.51 713.25 219.22 617.54 247.02 617.54"/><polygon points="370.52 617.54 370.52 641.47 270.95 741.05 247.02 741.05 247.02 717.11 346.59 617.54 370.52 617.54"/><polygon points="494.03 617.54 494.03 637.61 390.59 741.05 370.52 741.05 370.52 720.97 473.96 617.54 494.03 617.54"/><polygon points="741.05 617.54 741.05 629.89 629.89 741.05 617.54 741.05 617.54 728.69 728.69 617.54 741.05 617.54"/><polygon points="864.55 617.54 864.55 626.03 749.54 741.05 741.05 741.05 741.05 732.55 856.06 617.54 864.55 617.54"/><polygon points="123.51 741.05 123.51 778.1 37.05 864.55 0 864.55 0 827.5 86.45 741.05 123.51 741.05"/><polygon points="247.02 741.05 247.02 773.47 155.93 864.55 123.51 864.55 123.51 832.13 214.59 741.05 247.02 741.05"/><polygon points="370.52 741.05 370.52 768.84 274.81 864.55 247.02 864.55 247.02 836.76 342.73 741.05 370.52 741.05"/><polygon points="741.05 741.05 741.05 754.94 631.43 864.55 617.54 864.55 617.54 850.66 727.15 741.05 741.05 741.05"/><polygon points="864.55 741.04 864.55 750.31 750.31 864.55 741.05 864.55 741.05 855.29 855.29 741.04 864.55 741.04"/><polygon points="864.55 864.55 864.55 874.59 751.08 988.06 741.05 988.06 741.05 978.02 854.52 864.55 864.55 864.55"/><polygon points="741.05 864.55 741.05 879.99 632.98 988.06 617.54 988.06 617.54 972.62 725.61 864.55 741.05 864.55"/><polygon points="247.02 864.55 247.02 901.61 160.56 988.06 123.51 988.06 123.51 951.01 209.96 864.55 247.02 864.55"/><polygon points="123.51 864.55 123.51 907.01 42.46 988.06 0 988.06 0 945.6 81.05 864.55 123.51 864.55"/></svg>`;

const SITE_URL = "https://newtonforg2k.info";
const GRAPHIC_SIZE = 1080;
const PAD = 70;

async function loadFontFace(family: string, url: string, weight = "400") {
  if (document.fonts.check(`${weight} 12px '${family}'`)) return;
  const f = new FontFace(family, `url(${url})`, { weight });
  await f.load();
  document.fonts.add(f);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

async function loadSvgImage(svgStr: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = reject;
    img.src = url;
  });
}

async function generateShareGraphic(): Promise<Blob> {
  // Load site fonts into canvas context
  await Promise.all([
    loadFontFace("Nersans", "/fonts/NersansOne.ttf", "900"),
    loadFontFace("Aloevera", "/fonts/AloeveraDisplay-Medium.otf", "500"),
    loadFontFace("AloeveraCondensed", "/fonts/Aloeveradisplaycondensed-Bold.otf", "700"),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = GRAPHIC_SIZE;
  canvas.height = GRAPHIC_SIZE;
  const ctx = canvas.getContext("2d")!;
  const cx = GRAPHIC_SIZE / 2;

  // ── Background ────────────────────────────────────────────────────────
  ctx.fillStyle = "#030C05";
  ctx.fillRect(0, 0, GRAPHIC_SIZE, GRAPHIC_SIZE);

  // Green aurora top-left
  const g1 = ctx.createRadialGradient(0, 0, 0, 0, 0, 750);
  g1.addColorStop(0, "rgba(29,184,75,0.22)");
  g1.addColorStop(1, "transparent");
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, GRAPHIC_SIZE, GRAPHIC_SIZE);

  // Gold aurora bottom-right
  const g2 = ctx.createRadialGradient(GRAPHIC_SIZE, GRAPHIC_SIZE, 0, GRAPHIC_SIZE, GRAPHIC_SIZE, 650);
  g2.addColorStop(0, "rgba(245,197,24,0.12)");
  g2.addColorStop(1, "transparent");
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, GRAPHIC_SIZE, GRAPHIC_SIZE);

  // ── Arrow motif watermark (bottom-right, clipped) ─────────────────────
  const arrowImg = await loadSvgImage(ARROW_SVG("rgba(29,184,75,1)"));
  ctx.save();
  ctx.globalAlpha = 0.055;
  ctx.drawImage(arrowImg, GRAPHIC_SIZE - 720, GRAPHIC_SIZE - 720, 800, 800);
  ctx.restore();

  // ── Top gold bar ──────────────────────────────────────────────────────
  ctx.fillStyle = "#F5C518";
  ctx.fillRect(0, 0, GRAPHIC_SIZE, 9);

  // ── Header: name ──────────────────────────────────────────────────────
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 92px 'Nersans', sans-serif";
  ctx.fillText("NEWTON HARRIS", cx, 145);

  // Sub-label: role
  ctx.fillStyle = "#F5C518";
  ctx.font = "700 28px 'AloeveraCondensed', sans-serif";
  ctx.letterSpacing = "6px";
  ctx.fillText("FOR G2K PRESIDENT 2026", cx, 195);
  ctx.letterSpacing = "0px";

  // Divider
  ctx.fillStyle = "rgba(29,184,75,0.3)";
  ctx.fillRect(cx - 220, 220, 440, 1.5);

  // ── QR code ───────────────────────────────────────────────────────────
  const qrCanvas = document.createElement("canvas");
  const qrSize = 360;
  await QRCode.toCanvas(qrCanvas, SITE_URL, {
    width: qrSize,
    margin: 1,
    color: { dark: "#030C05", light: "#ffffff" },
  });

  // White card behind QR
  const cardPad = 28;
  const cardSize = qrSize + cardPad * 2;
  const cardX = cx - cardSize / 2;
  const cardY = 240;
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, cardX, cardY, cardSize, cardSize, 22);
  ctx.fill();

  // QR code inside card
  ctx.drawImage(qrCanvas, cardX + cardPad, cardY + cardPad, qrSize, qrSize);

  // ── URL ───────────────────────────────────────────────────────────────
  const urlY = cardY + cardSize + 58;
  ctx.fillStyle = "#1DB84B";
  ctx.font = "500 38px 'Aloevera', sans-serif";
  ctx.fillText("newtonforg2k.info", cx, urlY);

  // ── Tagline ───────────────────────────────────────────────────────────
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "900 54px 'Nersans', sans-serif";
  ctx.fillText("NEWTON IS YOUR SOLUTION", cx, urlY + 80);

  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "500 26px 'Aloevera', sans-serif";
  ctx.fillText("Tested. Proven. Ready to Lead on Day One.", cx, urlY + 130);

  // ── Bottom CTA strip ──────────────────────────────────────────────────
  const stripY = GRAPHIC_SIZE - 175;
  const stripH = 110;
  ctx.fillStyle = "rgba(29,184,75,0.1)";
  roundRect(ctx, PAD, stripY, GRAPHIC_SIZE - PAD * 2, stripH, 16);
  ctx.fill();
  ctx.strokeStyle = "rgba(29,184,75,0.25)";
  ctx.lineWidth = 1.5;
  roundRect(ctx, PAD, stripY, GRAPHIC_SIZE - PAD * 2, stripH, 16);
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "700 27px 'AloeveraCondensed', sans-serif";
  ctx.fillText("Vote Newton Harris · G2K Presidential Election 2026", cx, stripY + 44);

  ctx.fillStyle = "rgba(245,197,24,0.75)";
  ctx.font = "700 21px 'AloeveraCondensed', sans-serif";
  ctx.fillText("Jamaica Labour Party Youth Arm · Generation 2000", cx, stripY + 80);

  // ── Bottom green bar ──────────────────────────────────────────────────
  ctx.fillStyle = "#1DB84B";
  ctx.fillRect(0, GRAPHIC_SIZE - 9, GRAPHIC_SIZE, 9);

  return new Promise((res) => canvas.toBlob((b) => res(b!), "image/png"));
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

  const handlePlatform = useCallback(async (id: string) => {
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
    }
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
              {platforms.map((p) =>
                p.url ? (
                  <a
                    key={p.id}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90 active:scale-95"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: p.color, fontFamily: "var(--font-sans)" }}
                  >
                    {p.icon}
                    {p.label}
                  </a>
                ) : (
                  <button
                    key={p.id}
                    onClick={() => handlePlatform(p.id)}
                    disabled={generating}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90 active:scale-95 disabled:opacity-40"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: p.color, fontFamily: "var(--font-sans)" }}
                  >
                    {p.icon}
                    {p.label}
                  </button>
                )
              )}
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
