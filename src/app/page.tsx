"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowMotif from "@/components/shared/ArrowMotif";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import KineticText from "@/components/shared/KineticText";
import TwitterFeed from "@/components/shared/TwitterFeed";
import { candidate, mission, pillar1, pillar2, pillar3, messageToG2K } from "@/content";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: 1,
    label: "CHAPTER & MEMBER DEVELOPMENT",
    heading: pillar1.heading,
    href: `/plan/${pillar1.id}`,
    tagline: "Transform every chapter into a professional powerhouse.",
    accent: "var(--color-brand-vivid)",
  },
  {
    number: 2,
    label: "NATIONAL POLICY & THOUGHT LEADERSHIP",
    heading: pillar2.heading,
    href: `/plan/${pillar2.id}`,
    tagline: "Bridge the gap between governance and the people.",
    accent: "var(--color-gold-400)",
  },
  {
    number: 3,
    label: "SUSTAINABLE FINANCING",
    heading: pillar3.heading,
    href: `/plan/${pillar3.id}`,
    tagline: "Build an organisation that funds its own future.",
    accent: "var(--color-brand-300)",
  },
];

const stats = [
  { value: 5, suffix: "+", label: "Years Ministerial Advisor" },
  { value: 2018, suffix: "", label: "G2K Member Since" },
  { value: 2, suffix: "", label: "National Forums Delivered" },
];

const marqueeItems = [
  "Newton for G2K",
  "Chapter Development",
  "Thought Leadership",
  "Sustainable Financing",
  "Newton is Your Solution",
  "G2K 2026",
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroArrowRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Track hero listener cleanup outside the gsap.context callback so we
    // don't access `ctx` before it's assigned (temporal dead zone).
    let cleanupHeroListeners: (() => void) | undefined;

    const ctx = gsap.context(() => {
      // ── Hero entrance timeline ─────────────────────────────────
      // KineticText handles hero-line-1 (delay 0.25) and hero-line-2 (delay 0.65).
      // hero-sub / hero-ctas are timed to follow the last char reveal (~1.75s total).
      if (heroTextRef.current) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(".hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 })
          .fromTo(".hero-sub",  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, "2.0")
          .fromTo(".hero-ctas", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3");
      }

      // ── Hero mouse drift — chars attract toward cursor ─────────
      const heroEl = heroRef.current;
      if (heroEl) {
        const onMove = (e: MouseEvent) => {
          const chars = heroEl.querySelectorAll<HTMLElement>(".kchar");
          chars.forEach((char) => {
            const rect = char.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const str = Math.max(0, 1 - Math.hypot(dx, dy) / 300);
            gsap.to(char, {
              x: dx * str * 0.07,
              y: dy * str * 0.035,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
        };
        const onLeave = () => {
          const chars = heroEl.querySelectorAll<HTMLElement>(".kchar");
          gsap.to(chars, {
            x: 0,
            y: 0,
            duration: 0.85,
            ease: "elastic.out(1, 0.5)",
            stagger: 0.007,
            overwrite: "auto",
          });
        };
        heroEl.addEventListener("mousemove", onMove, { passive: true });
        heroEl.addEventListener("mouseleave", onLeave);
        // Assign to outer variable — NOT ctx, which is still in TDZ here
        cleanupHeroListeners = () => {
          heroEl.removeEventListener("mousemove", onMove);
          heroEl.removeEventListener("mouseleave", onLeave);
        };
      }

      // ── Arrow motif parallax ───────────────────────────────────
      if (heroArrowRef.current) {
        gsap.fromTo(
          heroArrowRef.current,
          { y: 0, opacity: 0, scale: 0.85 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
            delay: 0.5,
          }
        );
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          onUpdate: (self) => {
            gsap.set(heroArrowRef.current, {
              y: self.progress * 120,
              rotation: self.progress * -8,
            });
          },
        });
      }

      // ── Pillar cards stagger ───────────────────────────────────
      if (pillarsRef.current) {
        gsap.fromTo(
          ".pillar-card",
          { opacity: 0, y: 48, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 78%",
              once: true,
            },
          }
        );
      }

      // ── Section text reveals ───────────────────────────────────
      gsap.utils.toArray<Element>(".scroll-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              once: true,
            },
          }
        );
      });
    });

    return () => {
      cleanupHeroListeners?.();
      ctx.revert();
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: "linear-gradient(150deg, #c8f0d4 0%, #e4f8ea 28%, #f5fdf7 58%, #ffffff 100%)",
        }}
      >
        {/* Aurora blob 1 — vivid green, top-left */}
        <div
          className="absolute pointer-events-none aurora-1"
          style={{
            top: "-10%",
            left: "-10%",
            width: "70vw",
            height: "70vw",
            background: "radial-gradient(ellipse at center, rgba(29,184,75,0.22) 0%, transparent 65%)",
          }}
        />
        {/* Aurora blob 2 — gold, bottom-right */}
        <div
          className="absolute pointer-events-none aurora-2"
          style={{
            bottom: "-10%",
            right: "-5%",
            width: "55vw",
            height: "55vw",
            background: "radial-gradient(ellipse at center, rgba(245,197,24,0.14) 0%, transparent 65%)",
          }}
        />
        {/* Ghost stroke text */}
        <div
          className="absolute bottom-0 right-0 overflow-hidden pointer-events-none select-none"
          style={{ zIndex: 1 }}
          aria-hidden="true"
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(6rem, 22vw, 20rem)",
              WebkitTextStroke: "2px rgba(27,94,45,0.08)",
              color: "transparent",
              letterSpacing: "-0.05em",
              lineHeight: 0.85,
              userSelect: "none",
              transform: "translateY(18%)",
            }}
          >
            HARRIS
          </p>
        </div>

        {/* Arrow motif — hero background, right edge */}
        <div
          ref={heroArrowRef}
          className="absolute right-0 top-0 pointer-events-none select-none"
          style={{ opacity: 0 }}
        >
          <ArrowMotif
            size={720}
            color="var(--color-brand-vivid)"
            opacity={0.11}
            className="translate-x-1/4 -translate-y-1/4"
          />
        </div>

        {/* Portrait — mobile only: right-aligned, lower half of hero */}
        <div
          className="md:hidden absolute bottom-0 right-0 pointer-events-none select-none"
          style={{
            width: "65vw",
            height: "100%",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 18%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 18%)",
            zIndex: 1,
            opacity: 0.85,
          }}
        >
          <Image
            src="/images/newton-2.png"
            alt=""
            fill
            priority
            style={{ objectFit: "contain", objectPosition: "bottom right" }}
            sizes="65vw"
          />
        </div>

        {/* Portrait — desktop */}
        <div
          ref={heroImgRef}
          className="hidden md:block absolute bottom-0 right-0 pointer-events-none select-none"
          style={{
            width: "52vw",
            maxWidth: "820px",
            height: "100%",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 22%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 22%)",
            zIndex: 2,
            opacity: 0,
          }}
        >
          <Image
            src="/images/newton-2.png"
            alt="Newton Harris, G2K Presidential Candidate 2026"
            fill
            priority
            style={{ objectFit: "contain", objectPosition: "bottom center" }}
            sizes="52vw"
            onLoad={() => {
              if (heroImgRef.current) {
                gsap.to(heroImgRef.current, { opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.1 });
              }
            }}
          />
        </div>

        <div className="container-site relative z-10 py-28 md:py-36">
          <div ref={heroTextRef} className="max-w-[60vw] sm:max-w-[55vw] md:max-w-[48%]">
            <div className="hero-badge mb-6 opacity-0">
              <span className="badge-green">G2K Presidential Candidate 2026</span>
            </div>

            <div style={{ lineHeight: 1, display: "block" }}>
              <KineticText
                text="NEWTON"
                tag="h1"
                className="hero-line-1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3.8rem, 10vw, 8.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: "var(--color-brand-900)",
                  lineHeight: 0.95,
                  display: "block",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
                delay={0.25}
              />
              <KineticText
                text="IS YOUR"
                tag="h1"
                className="hero-line-2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3.8rem, 10vw, 8.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: "var(--color-brand-vivid)",
                  lineHeight: 0.95,
                  display: "block",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
                delay={0.55}
              />
              <KineticText
                text="SOLUTION"
                tag="h1"
                className="hero-line-3 mb-8"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3.8rem, 10vw, 8.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: "var(--color-brand-vivid)",
                  lineHeight: 0.95,
                  display: "block",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
                delay={0.75}
              />
            </div>

            <div className="hero-sub opacity-0 space-y-3 mb-10">
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                  color: "var(--color-ink-muted)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                {candidate.subtagline}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "clamp(0.85rem, 1.8vw, 1rem)",
                  color: "var(--color-ink-muted)",
                }}
              >
                {candidate.era}
              </p>
            </div>

            <div className="hero-ctas opacity-0 flex flex-wrap gap-3">
              <Link
                href="/the-candidate"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300"
                style={{
                  background: "var(--color-brand-vivid)",
                  color: "#fff",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                }}
              >
                Meet Newton
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/manifesto"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm border-2 transition-all duration-300"
                style={{
                  borderColor: "var(--color-brand-700)",
                  color: "var(--color-brand-700)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                }}
              >
                <FileText size={15} /> Read the Manifesto
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }}
        />
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────── */}
      {/* Strip 1 — green, runs left */}
      <div
        className="overflow-hidden py-3.5"
        style={{ background: "var(--color-brand-vivid)" }}
      >
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="shrink-0 text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "1.05rem",
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                paddingInline: "2.5rem",
              }}
            >
              {item}
              <span className="mx-6 opacity-40" style={{ fontSize: "0.5rem", verticalAlign: "middle" }}>▶</span>
            </span>
          ))}
        </div>
      </div>
      {/* Strip 2 — dark, runs right */}
      <div
        className="overflow-hidden py-3"
        style={{ background: "var(--color-brand-950)", borderBottom: "1px solid rgba(29,184,75,0.15)" }}
      >
        <div className="marquee-track-reverse">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="shrink-0"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(29,184,75,0.55)",
                paddingInline: "2.5rem",
              }}
            >
              {item}
              <span className="mx-6 opacity-40" style={{ fontSize: "0.45rem", verticalAlign: "middle" }}>◀</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ───────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "var(--color-brand-50)" }}>
        <div className="absolute bottom-0 left-0 pointer-events-none select-none opacity-[0.06]" style={{ transform: "translateY(25%) translateX(-25%)" }}>
          <ArrowMotif size={700} color="var(--color-brand-vivid)" />
        </div>
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 rounded-3xl overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
            {stats.map((s, i) => (
              <div
                key={i}
                className="px-10 py-12 text-center relative"
                style={{
                  borderRight: i < stats.length - 1 ? "1px solid var(--color-border)" : "none",
                  background: i % 2 === 1 ? "rgba(29,184,75,0.05)" : "white",
                }}
              >
                <div
                  className="text-5xl md:text-6xl mb-2"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
                >
                  <AnimatedCounter
                    value={s.value}
                    suffix={s.suffix}
                    className="text-[var(--color-brand-700)]"
                  />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    fontSize: "0.8rem",
                    color: "var(--color-ink-muted)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Intro blurb */}
          <div className="mt-16 max-w-2xl mx-auto text-center scroll-reveal">
            <div className="section-divider mx-auto" style={{ background: "var(--color-brand-vivid)" }} />
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
                color: "var(--color-ink)",
                lineHeight: 1.75,
              }}
            >
              {candidate.intro}
            </p>
            <Link
              href="/the-candidate"
              className="group inline-flex items-center gap-2 mt-6 font-bold transition-all"
              style={{ color: "var(--color-brand-700)", fontFamily: "var(--font-sans)", fontWeight: 700 }}
            >
              Learn more about Newton
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MISSION ─────────────────────────────────────────────── */}
      <section
        className="relative py-20 md:py-32 overflow-hidden"
        style={{ background: "var(--color-brand-900)" }}
      >
        {/* Arrow motif — bottom-left */}
        <div className="absolute bottom-0 left-0 pointer-events-none select-none opacity-[0.07]" style={{ transform: "translateY(20%) translateX(-20%)" }}>
          <ArrowMotif size={600} color="var(--color-brand-vivid)" scrollReveal={false} />
        </div>
        {/* Arrow motif — top-right */}
        <div className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.05]" style={{ transform: "translateY(-20%) translateX(20%)" }}>
          <ArrowMotif size={500} color="var(--color-gold-400)" scrollReveal={false} />
        </div>
        <div className="container-site relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 scroll-reveal">
            <span className="badge-green">My Mission</span>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)",
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.8,
              }}
            >
              {mission.body}
            </p>

            <div
              className="inline-block px-8 py-4 rounded-2xl"
              style={{ background: "rgba(245,197,24,0.1)", border: "1.5px solid var(--color-gold-400)" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
                  color: "var(--color-gold-400)",
                  letterSpacing: "-0.01em",
                }}
              >
                {mission.keyCommitment}
              </p>
            </div>

            <Link
              href="/mission"
              className="group inline-flex items-center gap-2 font-semibold transition-all"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sans)" }}
            >
              Read the full mission statement
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PILLARS ─────────────────────────────────────────────── */}
      <section
        ref={pillarsRef}
        className="relative py-20 md:py-32 overflow-hidden"
        style={{ background: "var(--color-surface)" }}
      >
        <div className="container-site">
          <div className="text-center mb-14 scroll-reveal">
            <span className="badge-green">The Plan</span>
            <h2
              className="mt-4"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--color-brand-900)",
                letterSpacing: "-0.03em",
              }}
            >
              Three Pillars.
              <br />
              <span style={{ color: "var(--color-brand-vivid)" }}>One Direction.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pillars.map((pillar) => (
              <Link
                key={pillar.number}
                href={pillar.href}
                className="pillar-card group relative flex flex-col rounded-3xl p-8 overflow-hidden transition-all duration-400 opacity-0"
                style={{
                  background: "white",
                  border: "1.5px solid var(--color-border)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    y: -6,
                    boxShadow: "0 20px 48px rgba(0,0,0,0.12)",
                    borderColor: pillar.accent,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                  gsap.to(e.currentTarget.querySelector(".pillar-num"), {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "back.out(2)",
                  });
                  gsap.to(e.currentTarget.querySelector(".pillar-arrow"), {
                    x: 6,
                    opacity: 1,
                    duration: 0.3,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    y: 0,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    borderColor: "var(--color-border)",
                    duration: 0.4,
                    ease: "power2.out",
                  });
                  gsap.to(e.currentTarget.querySelector(".pillar-num"), {
                    scale: 1,
                    duration: 0.4,
                    ease: "back.out(1.5)",
                  });
                  gsap.to(e.currentTarget.querySelector(".pillar-arrow"), {
                    x: 0,
                    opacity: 0.5,
                    duration: 0.3,
                  });
                }}
              >
                {/* Pillar number */}
                <div
                  className="pillar-num w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6"
                  style={{
                    background: "var(--color-brand-900)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "1.4rem",
                  }}
                >
                  {pillar.number}
                </div>

                {/* Label */}
                <p
                  style={{
                    fontFamily: "var(--font-condensed)",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-muted)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {pillar.label}
                </p>

                {/* Heading */}
                <h3
                  className="mb-3 flex-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
                    color: "var(--color-brand-900)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                  }}
                >
                  {pillar.heading}
                </h3>

                <p
                  className="mb-6"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    color: "var(--color-ink-muted)",
                    lineHeight: 1.7,
                  }}
                >
                  {pillar.tagline}
                </p>

                <div
                  className="pillar-arrow inline-flex items-center gap-2 font-bold text-sm"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    color: pillar.accent,
                    opacity: 0.5,
                  }}
                >
                  Explore Pillar {pillar.number} <ArrowRight size={13} />
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-3xl"
                  style={{ background: pillar.accent, opacity: 0.3 }}
                />
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 scroll-reveal">
            <Link
              href="/plan"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm border-2 transition-all duration-300"
              style={{
                borderColor: "var(--color-brand-700)",
                color: "var(--color-brand-700)",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  background: "var(--color-brand-700)",
                  color: "#fff",
                  duration: 0.25,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  background: "transparent",
                  color: "var(--color-brand-700)",
                  duration: 0.25,
                });
              }}
            >
              View the Full Plan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ARROW FEATURE DIVIDER ───────────────────────────────── */}
      <div
        className="relative py-16 overflow-hidden"
        style={{ background: "var(--color-brand-800)" }}
      >
        {/* Large centered arrow motif */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <ArrowMotif
            size={500}
            color="var(--color-brand-vivid)"
            opacity={0.06}
            scrollReveal
            stagger={0.005}
          />
        </div>
        <div className="container-site relative z-10 text-center scroll-reveal">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(1.2rem, 3.5vw, 2rem)",
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-0.02em",
            }}
          >
            The G2K Presidency is{" "}
            <span style={{ color: "var(--color-brand-vivid)" }}>an operational post,</span>
            <br className="hidden sm:block" />
            {" "}not a symbolic milestone.
          </p>
        </div>
      </div>

      {/* ── PRESENCE ───────────────────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: "white" }}
      >
        <div className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.05]" style={{ transform: "translateY(-30%) translateX(30%)" }}>
          <ArrowMotif size={680} color="var(--color-brand-vivid)" />
        </div>
        <div className="container-site">
          <div className="text-center mb-12 scroll-reveal">
            <span className="badge-green">Presence</span>
            <h2
              className="mt-4"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                color: "var(--color-brand-900)",
                letterSpacing: "-0.03em",
              }}
            >
              Follow the campaign.
            </h2>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "0.95rem",
                color: "var(--color-ink-muted)",
              }}
            >
              Real-time updates from Newton Harris on X.
            </p>
          </div>

          <div className="max-w-lg mx-auto scroll-reveal">
            <TwitterFeed />
          </div>

        </div>
      </section>

      {/* ── CLOSING MESSAGE ─────────────────────────────────────── */}
      <section
        className="relative py-20 md:py-32 overflow-hidden"
        style={{ background: "var(--color-brand-950)" }}
      >
        {/* Arrow motif — corner watermark */}
        <div
          className="absolute top-0 right-0 pointer-events-none select-none"
          style={{ opacity: 0.035 }}
        >
          <ArrowMotif size={360} color="var(--color-gold-400)" interactive />
        </div>

        <div className="container-site relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-6 scroll-reveal">
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
              }}
            >
              &ldquo;{messageToG2K.paragraphs[0]}&rdquo;
            </p>

            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                color: "var(--color-gold-400)",
                letterSpacing: "-0.02em",
              }}
            >
              Newton is your solution.
            </p>

            <p
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {messageToG2K.closingTagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link
                href="/message-to-g2k"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all"
                style={{
                  background: "var(--color-gold-400)",
                  color: "var(--color-brand-900)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                }}
              >
                Read the Message to G2K
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/manifesto"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm border transition-all"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                }}
              >
                <FileText size={14} /> Full Manifesto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
