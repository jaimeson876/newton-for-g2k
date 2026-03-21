"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import ArrowMotif from "@/components/shared/ArrowMotif";

// Place poster images at: public/images/posters/{newton,aaliyah,ricardo,juma}.jpg
const team = [
  {
    name: "Newton Harris",
    role: "G2K President",
    tagline: "Tested. Proven. Ready.",
    poster: "/images/newton-hero.png",
    handle: undefined as string | undefined,
    bio: "Newton brings over five years of ministerial experience at the highest levels of Jamaican government, a Jesuit-trained intellectual rigour, and a lifetime of community service. He has been in the room, absorbed the mechanics of governance, and built the relationships that make real change possible. Newton is the strategic backbone of this ticket, ready on day one.",
    accent: "#1DB84B",
  },
  {
    name: "Aaliyah Rodgers",
    role: "G2K Vice President",
    tagline: "Leadership that delivers. Vision that Empowers.",
    poster: "/images/posters/aaliyah.jpg",
    handle: "@aaliyah__liyahh",
    bio: "Aaliyah is a dynamic force with a proven record of mobilising young Jamaicans around shared purpose. Her commitment to empowering every G2K member, with particular focus on women in political and civic leadership, makes her an essential and powerful voice on this ticket.",
    accent: "#1DB84B",
  },
  {
    name: "Ricardo Robinson",
    role: "G2K Vice-President",
    tagline: "Persistent. Effective. Active. Zealous.",
    poster: "/images/posters/ricardo.jpg",
    handle: undefined as string | undefined,
    bio: "Known across the organisation by his acronym PEAZ, Ricardo Robinson embodies the relentless, on-the-ground dedication that G2K demands. Persistent in purpose, effective in execution, and always present when it counts. He is a doer who delivers.",
    accent: "#1DB84B",
  },
  {
    name: "Juma Francis",
    role: "G2K Vice President",
    tagline: "Strengthening The Future. Delivering Results.",
    poster: "/images/posters/juma.jpg",
    handle: undefined as string | undefined,
    bio: "Juma is a dedicated, innovative professional with a clear-eyed vision for G2K's future. He brings strategic clarity, deep community ties, and an unwavering mandate to ensure this organisation strengthens Jamaica from the inside out.",
    accent: "#1DB84B",
  },
];

// Placeholder HUD quality pills per candidate
const HUD_QUALITIES = [
  ["5+ Yrs. Gov't Experience", "Ministerial Advisor", "Debate Champion", "Community Leader"],
  ["Youth Mobiliser", "Empowerment Advocate", "Policy Voice", "Proven Organiser"],
  ["PEAZ: Always Present", "Ground-Level Operator", "Results-Driven", "Relentless"],
  ["Strategic Thinker", "Community-Rooted", "Vision-Led", "Innovative"],
];

// Card dimensions — desktop
const CW = 320;
const CH = 460;
// Card dimensions — mobile (scaled down to fit with pills in one viewport)
const CW_M = 220;
const CH_M = 316;
const N = team.length;

// 3D position config keyed by offset from active (-2..2)
const POSITIONS: Record<string, { ry: number; tz: number; scale: number; opacity: number; zi: number }> = {
  "0":  { ry:  0,   tz:  0,    scale: 1,    opacity: 1,    zi: 10 },
  "1":  { ry: -50,  tz: -170,  scale: 0.8,  opacity: 0.45, zi: 6  },
  "-1": { ry:  50,  tz: -170,  scale: 0.8,  opacity: 0.45, zi: 6  },
  "2":  { ry: -78,  tz: -300,  scale: 0.56, opacity: 0.12, zi: 2  },
  "-2": { ry:  78,  tz: -300,  scale: 0.56, opacity: 0.12, zi: 2  },
};

function getOffset(cardIdx: number, activeIdx: number): number {
  let off = cardIdx - activeIdx;
  if (off > N / 2) off -= N;
  if (off < -N / 2) off += N;
  return Math.max(-2, Math.min(2, off));
}

export default function TheTicketPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [bioIdx, setBioIdx] = useState(0);
  const [hudIdx, setHudIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bioRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const hudMobileRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Set initial 3D positions instantly
  useEffect(() => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const off = getOffset(i, 0);
      const p = POSITIONS[String(off)] ?? { ry: 0, tz: -600, scale: 0.3, opacity: 0, zi: 0 };
      gsap.set(el, { rotateY: p.ry, z: p.tz, scale: p.scale, opacity: p.opacity, zIndex: p.zi });
    });

    // Independent floating on each card's inner element
    cardRefs.current.forEach((el, i) => {
      const inner = el?.querySelector<HTMLElement>(".float-inner");
      if (!inner) return;
      gsap.to(inner, {
        y: -14,
        duration: 3.0 + i * 0.45,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.65,
      });
    });
  }, []);

  const animateTo = useCallback((next: number) => {
    if (busy.current || next === activeIdx) return;
    busy.current = true;

    // Fade bio + HUD out
    gsap.to(bioRef.current, { opacity: 0, y: 8, duration: 0.22, ease: "power2.in" });
    gsap.to([hudRef.current, hudMobileRef.current], { opacity: 0, y: 6, duration: 0.18, ease: "power2.in" });

    // Animate all cards to new positions
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const off = getOffset(i, next);
      const p = POSITIONS[String(off)] ?? { ry: 0, tz: -600, scale: 0.3, opacity: 0, zi: 0 };
      gsap.to(el, {
        rotateY: p.ry,
        z: p.tz,
        scale: p.scale,
        opacity: p.opacity,
        zIndex: p.zi,
        duration: 0.88,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    });

    setActiveIdx(next);

    // Fade bio + HUD back in
    gsap.to(bioRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 0.55,
      ease: "power2.out",
      onStart: () => {
        setBioIdx(next);
        setHudIdx(next);
      },
      onComplete: () => { busy.current = false; },
    });
    gsap.to([hudRef.current, hudMobileRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.35,
      delay: 0.6,
      ease: "power2.out",
    });
  }, [activeIdx]);

  const prev = useCallback(() => animateTo((activeIdx - 1 + N) % N), [activeIdx, animateTo]);
  const next = useCallback(() => animateTo((activeIdx + 1) % N), [activeIdx, animateTo]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only trigger on primarily horizontal swipes (> 40px) that aren't mostly vertical
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) next(); else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }, [next, prev]);

  const displayed = team[bioIdx];
  const hudQualities = HUD_QUALITIES[hudIdx];

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>

      {/* Hero */}
      <section className="relative pt-24 pb-10 text-center px-4 overflow-hidden" style={{ background: "var(--color-brand-50)" }}>
        <div className="absolute left-0 bottom-0 pointer-events-none select-none opacity-[0.08]" style={{ transform: "translateY(25%) translateX(-20%)" }}>
          <ArrowMotif size={600} color="var(--color-brand-vivid)" />
        </div>
        <div className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.06]" style={{ transform: "translateY(-20%) translateX(20%)" }}>
          <ArrowMotif size={500} color="var(--color-gold-400)" />
        </div>
        <p
          className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{
            background: "rgba(29,184,75,0.12)",
            color: "var(--color-brand-700)",
            fontFamily: "var(--font-sans)",
          }}
        >
          Election 2026
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            color: "var(--color-brand-900)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          Who&apos;s On<br />
          <span style={{ color: "var(--color-brand-vivid)" }}>The Ticket.</span>
        </h1>
        <p
          className="mt-5 max-w-lg mx-auto"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "1rem",
            color: "var(--color-ink-muted)",
            lineHeight: 1.75,
          }}
        >
          A full slate built on one mission. G2K, led from the front.
        </p>
      </section>

      {/* Main: card left, info right */}
      <section className="py-6 md:py-20">
        <div className="container-site">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16">

            {/* ── LEFT: card stack ─────────────────────────────────── */}
            <div className="flex-shrink-0 flex flex-col items-center w-full md:w-auto">
              {/* Perspective wrapper */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  perspective: "1100px",
                  perspectiveOrigin: "50% 50%",
                  width: `${(isMobile ? CW_M : CW) + 80}px`,
                  height: `${(isMobile ? CH_M : CH) + 40}px`,
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="relative"
                  style={{ width: `${isMobile ? CW_M : CW}px`, height: `${isMobile ? CH_M : CH}px`, transformStyle: "preserve-3d" }}
                >
                  {team.map((member, i) => {
                    const cw = isMobile ? CW_M : CW;
                    const ch = isMobile ? CH_M : CH;
                    return (
                    <div
                      key={i}
                      ref={(el) => { cardRefs.current[i] = el; }}
                      className="absolute cursor-pointer"
                      style={{ width: `${cw}px`, height: `${ch}px`, transformStyle: "preserve-3d" }}
                      onClick={() => animateTo(i)}
                    >
                      <div className="float-inner w-full h-full">
                        <div
                          className="card-face w-full h-full rounded-3xl overflow-hidden relative"
                          style={{
                            background: "linear-gradient(160deg, #0d1f10 0%, var(--color-brand-950) 100%)",
                            border: `1.5px solid ${i === activeIdx ? "rgba(29,184,75,0.5)" : "rgba(29,184,75,0.1)"}`,
                            boxShadow: i === activeIdx
                              ? "0 28px 64px rgba(0,0,0,0.22), 0 0 0 1px rgba(29,184,75,0.15)"
                              : "0 12px 32px rgba(0,0,0,0.12)",
                          }}
                          onMouseMove={(e) => {
                            const el = e.currentTarget;
                            const rect = el.getBoundingClientRect();
                            const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                            const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
                            el.style.setProperty("--px", px.toFixed(3));
                            el.style.setProperty("--py", py.toFixed(3));
                            el.style.setProperty("--holo-o", "1");
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget;
                            el.style.setProperty("--px", "0");
                            el.style.setProperty("--py", "0");
                            el.style.setProperty("--holo-o", "0");
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={member.poster}
                            alt={member.name}
                            className="absolute inset-0 w-full h-full object-cover object-top"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/newton-hero.png"; }}
                          />
                          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,12,5,0.88) 0%, rgba(3,12,5,0.15) 45%, rgba(3,12,5,0.0) 100%)" }} />
                          <div className="card-refraction" />
                          <div className="card-spotlight" />
                          <div className="holo-shimmer" />

                          {/* Role badge */}
                          <div className="absolute top-4 left-4">
                            <span className="px-2.5 py-1 rounded-lg text-white font-bold" style={{ background: "var(--color-brand-vivid)", fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                              {i === 0 ? "President" : "Vice President"}
                            </span>
                          </div>

                          {/* Ghost number */}
                          <div className="absolute top-2 right-4 pointer-events-none select-none" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "5rem", color: "transparent", WebkitTextStroke: "1px rgba(29,184,75,0.08)", lineHeight: 1 }}>
                            {String(i + 1).padStart(2, "0")}
                          </div>

                          {/* Name at bottom */}
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-brand-vivid)", marginBottom: "0.25rem" }}>{member.role}</p>
                            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.5rem", color: "#fff", lineHeight: 1.0, letterSpacing: "-0.025em" }}>{member.name}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                  })}
                </div>

                {/* Nav arrows beside card */}
                <button onClick={prev} aria-label="Previous" className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95" style={{ background: "white", border: "1.5px solid var(--color-border)", color: "var(--color-brand-700)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", zIndex: 20 }}>
                  <ChevronLeft size={18} />
                </button>
                <button onClick={next} aria-label="Next" className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95" style={{ background: "white", border: "1.5px solid var(--color-border)", color: "var(--color-brand-700)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", zIndex: 20 }}>
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Dot indicators */}
              <div className="flex items-center gap-2.5 mt-4">
                {team.map((_, i) => (
                  <button key={i} onClick={() => animateTo(i)} aria-label={`Go to ${team[i].name}`} className="rounded-full transition-all duration-300" style={{ width: i === activeIdx ? "22px" : "8px", height: "8px", background: i === activeIdx ? "var(--color-brand-vivid)" : "var(--color-border)" }} />
                ))}
              </div>

              {/* Mobile-only: compact name + quality pills (visible without scrolling) */}
              <div ref={hudMobileRef} className="md:hidden mt-4 w-full max-w-sm text-center">
                <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-brand-vivid)", marginBottom: "0.25rem" }}>
                  {team[activeIdx].role}
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.6rem", color: "var(--color-brand-900)", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "0.75rem" }}>
                  {team[activeIdx].name}
                </h2>
                <div className="flex flex-wrap justify-center gap-2">
                  {hudQualities.map((q) => (
                    <span key={q} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "var(--color-brand-50)", border: "1.5px solid var(--color-border)", color: "var(--color-brand-700)", fontFamily: "var(--font-sans)" }}>
                      {q}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs" style={{ color: "var(--color-ink-muted)", fontFamily: "var(--font-sans)" }}>
                  Swipe or use arrows to explore the ticket
                </p>
              </div>
            </div>

            {/* ── RIGHT: info panel (desktop only) ─────────────────── */}
            <div className="hidden md:flex flex-1 min-w-0 flex-col justify-center pt-8">
              {/* Name + role */}
              <div className="mb-2">
                <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-brand-vivid)", marginBottom: "0.5rem" }}>
                  {team[activeIdx].role}
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "var(--color-brand-900)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {team[activeIdx].name}
                </h2>
                <p className="mt-2" style={{ fontFamily: "var(--font-sans)", fontStyle: "italic", fontWeight: 400, fontSize: "1rem", color: "var(--color-ink-muted)" }}>
                  {team[activeIdx].tagline}
                </p>
              </div>

              {/* Divider */}
              <div className="my-5" style={{ height: "1px", background: "var(--color-border)" }} />

              {/* Quality pills */}
              <div ref={hudRef} className="flex flex-wrap gap-2.5 mb-6">
                {hudQualities.map((q) => (
                  <span key={q} className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: "var(--color-brand-50)", border: "1.5px solid var(--color-border)", color: "var(--color-brand-700)", fontFamily: "var(--font-sans)", letterSpacing: "0.02em" }}>
                    {q}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <div ref={bioRef}>
                <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1rem", color: "var(--color-ink)", lineHeight: 1.9 }}>
                  {displayed.bio}
                </p>
                {displayed.handle && (
                  <p className="mt-3" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem", color: "var(--color-brand-vivid)", letterSpacing: "0.05em" }}>
                    {displayed.handle}
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="container-site flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/reach-out" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-white transition-all hover:scale-105" style={{ background: "var(--color-brand-vivid)", fontFamily: "var(--font-sans)", fontWeight: 700, boxShadow: "0 4px 20px rgba(29,184,75,0.25)" }}>
            Get Behind The Ticket <ArrowRight size={14} />
          </Link>
          <Link href="/mission" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm border-2 transition-all" style={{ borderColor: "var(--color-brand-700)", color: "var(--color-brand-700)", fontFamily: "var(--font-sans)", fontWeight: 600 }}>
            Read the Mission <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
