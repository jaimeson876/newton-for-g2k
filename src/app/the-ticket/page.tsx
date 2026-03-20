"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

// ── Place poster images at: public/images/posters/{newton,aaliyah,ricardo,juma}.jpg
const team = [
  {
    name: "Newton Harris",
    role: "G2K President",
    tagline: "Tested. Proven. Ready.",
    poster: "/images/posters/newton.jpg",
    handle: undefined as string | undefined,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Newton brings over five years of ministerial experience at the highest levels of Jamaican government, a Jesuit-trained intellectual rigour, and a lifetime of community service. He has been in the room, absorbed the mechanics of governance, and built the relationships that make real change possible. Newton is the strategic backbone of this ticket — ready on day one.",
    accent: "#1DB84B",
  },
  {
    name: "Aaliyah Rodgers",
    role: "G2K Vice President",
    tagline: "Leadership that delivers. Vision that Empowers.",
    poster: "/images/posters/aaliyah.jpg",
    handle: "@aaliyah__liyahh",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aaliyah is a dynamic force with a proven record of mobilising young Jamaicans around shared purpose. Her commitment to empowering every G2K member — particularly women in political and civic leadership — makes her an essential and powerful voice on this ticket.",
    accent: "#1DB84B",
  },
  {
    name: "Ricardo Robinson",
    role: "G2K Vice-President",
    tagline: "Persistent. Effective. Active. Zealous.",
    poster: "/images/posters/ricardo.jpg",
    handle: undefined as string | undefined,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Known across the organisation by his acronym PEAZ, Ricardo Robinson embodies the relentless, on-the-ground dedication that G2K demands. Persistent in purpose, effective in execution, and always present when it counts — he is a doer who delivers.",
    accent: "#1DB84B",
  },
  {
    name: "Juma Francis",
    role: "G2K Vice President",
    tagline: "Strengthening The Future. Delivering Results.",
    poster: "/images/posters/juma.jpg",
    handle: undefined as string | undefined,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Juma is a dedicated, innovative professional with a clear-eyed vision for G2K's future. He brings strategic clarity, deep community ties, and an unwavering mandate to ensure this organisation strengthens Jamaica from the inside out.",
    accent: "#1DB84B",
  },
];

// Card dimensions
const CW = 268;
const CH = 374;
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
  const [bioIdx, setBioIdx] = useState(0); // updates mid-transition
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bioRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

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

    // Fade bio out
    gsap.to(bioRef.current, { opacity: 0, y: 8, duration: 0.22, ease: "power2.in" });

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

    // Fade bio in with new content
    gsap.to(bioRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 0.55,
      ease: "power2.out",
      onStart: () => setBioIdx(next),
      onComplete: () => { busy.current = false; },
    });
  }, [activeIdx]);

  const prev = useCallback(() => animateTo((activeIdx - 1 + N) % N), [activeIdx, animateTo]);
  const next = useCallback(() => animateTo((activeIdx + 1) % N), [activeIdx, animateTo]);

  const displayed = team[bioIdx];

  return (
    <div style={{ background: "var(--color-brand-950)", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="pt-24 pb-6 text-center px-4">
        <p
          className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{
            background: "rgba(29,184,75,0.12)",
            color: "var(--color-brand-vivid)",
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
            color: "#fff",
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
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.75,
          }}
        >
          A full slate built on one mission. G2K — led from the front.
        </p>
      </section>

      {/* ── CAROUSEL ─────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center py-10">

        {/* Perspective wrapper */}
        <div
          className="relative flex items-center justify-center w-full"
          style={{ perspective: "1100px", perspectiveOrigin: "50% 50%", height: `${CH + 56}px` }}
        >
          {/* Cards container — preserve-3d so siblings share Z-space */}
          <div
            className="relative"
            style={{
              width: `${CW}px`,
              height: `${CH}px`,
              transformStyle: "preserve-3d",
            }}
          >
            {team.map((member, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="absolute cursor-pointer"
                style={{ width: `${CW}px`, height: `${CH}px`, transformStyle: "preserve-3d" }}
                onClick={() => animateTo(i)}
              >
                {/* Float inner — GSAP controls y on this independently */}
                <div className="float-inner w-full h-full">

                  {/* Card face */}
                  <div
                    className="w-full h-full rounded-2xl overflow-hidden relative"
                    style={{
                      background: "linear-gradient(160deg, #0d1f10 0%, var(--color-brand-950) 100%)",
                      border: `1px solid ${i === activeIdx ? "rgba(29,184,75,0.45)" : "rgba(29,184,75,0.12)"}`,
                      boxShadow: i === activeIdx
                        ? "0 32px 80px rgba(0,0,0,0.75), 0 0 48px rgba(29,184,75,0.18)"
                        : "0 16px 48px rgba(0,0,0,0.55)",
                    }}
                  >
                    {/* Poster image — drop files at public/images/posters/ */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.poster}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />

                    {/* Always-on gradient overlay so text reads even without image */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(3,12,5,0.97) 0%, rgba(3,12,5,0.45) 55%, rgba(3,12,5,0.1) 100%)",
                      }}
                    />

                    {/* Role badge — top left */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-2 py-0.5 rounded text-white font-bold"
                        style={{
                          background: "var(--color-brand-vivid)",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.58rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {i === 0 ? "President" : "Vice President"}
                      </span>
                    </div>

                    {/* Ghost number — top right */}
                    <div
                      className="absolute top-2 right-4 pointer-events-none select-none"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: "4.5rem",
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(29,184,75,0.1)",
                        lineHeight: 1,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Name + info — bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontWeight: 700,
                          fontSize: "0.62rem",
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "var(--color-brand-vivid)",
                          marginBottom: "0.3rem",
                        }}
                      >
                        {member.role}
                      </p>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 900,
                          fontSize: "1.42rem",
                          color: "#fff",
                          lineHeight: 1.0,
                          letterSpacing: "-0.025em",
                        }}
                      >
                        {member.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontWeight: 300,
                          fontSize: "0.7rem",
                          color: "rgba(255,255,255,0.5)",
                          marginTop: "0.35rem",
                          lineHeight: 1.5,
                        }}
                      >
                        {member.tagline}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* ── Arrow buttons ─────────────────────────────────────── */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-4 md:left-12 lg:left-20 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{
              background: "rgba(29,184,75,0.1)",
              border: "1px solid rgba(29,184,75,0.25)",
              color: "#fff",
              zIndex: 20,
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-4 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{
              background: "rgba(29,184,75,0.1)",
              border: "1px solid rgba(29,184,75,0.25)",
              color: "#fff",
              zIndex: 20,
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* ── Dot indicators ────────────────────────────────────── */}
        <div className="flex items-center gap-2.5 mt-7">
          {team.map((_, i) => (
            <button
              key={i}
              onClick={() => animateTo(i)}
              aria-label={`Go to ${team[i].name}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIdx ? "22px" : "8px",
                height: "8px",
                background: i === activeIdx ? "var(--color-brand-vivid)" : "rgba(255,255,255,0.18)",
              }}
            />
          ))}
        </div>

        {/* ── Active name display ───────────────────────────────── */}
        <div className="text-center mt-7 px-4">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {team[activeIdx].name}
          </p>
          <p
            className="mt-1"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-brand-vivid)",
            }}
          >
            {team[activeIdx].role}
          </p>
        </div>
      </section>

      {/* ── BIO ──────────────────────────────────────────────────── */}
      <section className="pb-16">
        <div className="container-site max-w-xl mx-auto text-center">
          <div ref={bioRef}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "0.97rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.9,
              }}
            >
              {displayed.bio}
            </p>
            {displayed.handle && (
              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  color: "var(--color-brand-vivid)",
                  letterSpacing: "0.05em",
                }}
              >
                {displayed.handle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section
        className="py-12"
        style={{ borderTop: "1px solid rgba(29,184,75,0.1)" }}
      >
        <div className="container-site flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/reach-out"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-white transition-all hover:scale-105"
            style={{
              background: "var(--color-brand-vivid)",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              boxShadow: "0 0 22px rgba(29,184,75,0.35)",
            }}
          >
            Get Behind The Ticket <ArrowRight size={14} />
          </Link>
          <Link
            href="/mission"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm border transition-all"
            style={{
              borderColor: "rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
            }}
          >
            Read the Mission <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
