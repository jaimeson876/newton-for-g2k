"use client";

import { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArrowMotif from "@/components/shared/ArrowMotif";

gsap.registerPlugin(ScrollTrigger);

const globalMoments = [
  {
    year: "2013–14",
    title: "Top Debater",
    detail:
      "World Universities Debating Championships in Malaysia and Chennai. Recognised as Top Debater across Latin America and the Caribbean. National Public Speaking Champion, JCDC 2014.",
  },
  {
    year: "2015",
    title: "Obama's Table",
    detail:
      "Selected for the Young Leaders of the Americas Initiative (YLAI), President Barack Obama's flagship program for the hemisphere's most promising emerging young leaders.",
  },
  {
    year: "2019",
    title: "The Vatican",
    detail:
      "Represented the Antilles Episcopal Conference at the International Youth Forum convened by Pope Francis. Jamaica's voice carried to the Holy See.",
  },
];

const credentials = [
  {
    label: "Ministerial Advisor",
    detail:
      "Five years advising Senator Kamina Johnson Smith at the highest levels of Jamaican government.",
  },
  {
    label: "Legal Administrator",
    detail:
      "Attorney-General's Chambers, where Jamaica's legal framework is built and defended.",
  },
  {
    label: "Business Leader",
    detail:
      "Managed the family hardware business and grew revenue by 25%.",
  },
  {
    label: "Campus Ministry Director",
    detail:
      "Shaped the next generation as Director of Campus Ministry at St. George's College.",
  },
  {
    label: "LL.B. Law",
    detail:
      "University of Technology Jamaica. The academic credential to match the practical one.",
  },
  {
    label: "releaf Project",
    detail:
      "Led a national reforestation and rebuilding initiative. Because leadership is stewardship.",
  },
];

const g2kRecord = [
  "Vice-President, International Relations (current)",
  "Former Deputy Treasurer",
  "Led National Forums at UTech 2025 and UWI 2026",
  "Secured hundreds of hygiene kits and tarps for G2K relief activities",
];

export default function TheCandidatePage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        ".hero-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".hero-headline",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.65 }
      );

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>(".story-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 83%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Credential cards stagger
      gsap.fromTo(
        ".cred-card",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".creds-grid",
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28 md:py-44"
        style={{ background: "var(--color-brand-950)" }}
      >
        {/* Large arrow motif — top-right bleed */}
        <div className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.09]" style={{ transform: "translateY(-15%) translateX(15%)" }}>
          <ArrowMotif size={780} color="var(--color-brand-vivid)" />
        </div>
        {/* Secondary — bottom-left */}
        <div className="absolute bottom-0 left-0 pointer-events-none select-none opacity-[0.05]" style={{ transform: "translateY(25%) translateX(-25%)" }}>
          <ArrowMotif size={500} color="var(--color-gold-400)" />
        </div>

        {/* Candidate portrait */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none select-none hidden md:block"
          style={{
            width: "52vw",
            maxWidth: "820px",
            height: "100%",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 22%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 22%)",
            zIndex: 2,
          }}
        >
          <Image
            src="/images/newton-1.png"
            alt="Newton Harris"
            fill
            priority
            style={{ objectFit: "contain", objectPosition: "bottom center" }}
            sizes="52vw"
          />
        </div>

        <div className="container-site relative z-10">
          <div className="max-w-3xl md:max-w-[46%]">
            <p
              className="hero-label inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                background: "rgba(29,184,75,0.12)",
                color: "var(--color-brand-vivid)",
                fontFamily: "var(--font-sans)",
                opacity: 0,
              }}
            >
              The Candidate
            </p>
            <h1
              className="hero-headline text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(3.2rem, 8vw, 7rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
                opacity: 0,
              }}
            >
              A Life Built<br />
              <span style={{ color: "var(--color-brand-vivid)" }}>For This</span>
              <br />Moment.
            </h1>
            <p
              className="hero-sub mt-8 max-w-xl"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.85,
                opacity: 0,
              }}
            >
              From a hardware store in Brown&apos;s Town to the Vatican. From the Bronx to Barack Obama&apos;s table. Newton Harris didn&apos;t stumble into leadership. He was forged by it.
            </p>
          </div>
        </div>
      </section>

      {/* ── BEAT 1: Hardware Store ──────────────────────────────── */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="container-site">
          <div className="story-reveal grid grid-cols-1 lg:grid-cols-[160px_1fr_340px] gap-10 items-center">
            <p
              className="hidden lg:block leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(4rem, 9vw, 7.5rem)",
                color: "var(--color-brand-vivid)",
                opacity: 0.12,
                letterSpacing: "-0.04em",
              }}
            >
              AGE<br />6
            </p>
            <div className="space-y-5">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
                  color: "var(--color-brand-950)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                He Chased a Customer<br />Down the Street.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "1.05rem",
                  color: "var(--color-ink)",
                  lineHeight: 1.85,
                  maxWidth: "36rem",
                }}
              >
                Newton grew up behind the counter of his family&apos;s hardware store in Brown&apos;s Town. One day, a contractor named Mr. Joseph Brown walked out before being served. Newton didn&apos;t wait. He ran after him. That instinct, that refusal to let anyone walk away unserved, became the foundation of everything that followed.
              </p>
              <blockquote
                style={{
                  borderLeft: "3px solid var(--color-brand-vivid)",
                  paddingLeft: "1.25rem",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "var(--color-brand-vivid)",
                  lineHeight: 1.3,
                }}
              >
                &ldquo;Never let a constituent walk away.&rdquo;
              </blockquote>
            </div>
            {/* Photo — smiling, approachable */}
            <div className="hidden lg:block relative h-[420px] rounded-3xl overflow-hidden" style={{ background: "var(--color-brand-950)" }}>
              <Image src="/images/newton-2.png" alt="Newton Harris" fill style={{ objectFit: "cover", objectPosition: "top center" }} sizes="340px" />
            </div>
          </div>
        </div>
      </section>

      {/* ── BEAT 2: Campion + Jesuit ────────────────────────────── */}
      <section
        className="py-20 md:py-32 overflow-hidden"
        style={{ background: "var(--color-brand-950)" }}
      >
        <div className="container-site">
          <div className="story-reveal grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-10 items-center">
            <p
              className="hidden lg:block leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "var(--color-brand-vivid)",
                opacity: 0.12,
                letterSpacing: "-0.04em",
              }}
            >
              CAM<br />PION
            </p>
            <div className="space-y-5">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
                  color: "#fff",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                Where Rigour<br />Became a Reflex.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.85,
                  maxWidth: "36rem",
                }}
              >
                Campion College sharpened Newton into a thinker. Then came something unexpected: a Jesuit novitiate in Upstate New York. Months of silence, study, and deep discernment. The Jesuit tradition of intellectual rigour pressed into his character. He emerged with a clarity of purpose that has never wavered.
              </p>
              <blockquote
                style={{
                  borderLeft: "3px solid var(--color-brand-vivid)",
                  paddingLeft: "1.25rem",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "var(--color-brand-vivid)",
                  lineHeight: 1.3,
                }}
              >
                Intellectual discipline. Formed by the Jesuits.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEAT 3: Calvary Hospital ─────────────────────────────── */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="container-site">
          <div className="story-reveal grid grid-cols-1 lg:grid-cols-[340px_160px_1fr] gap-10 items-center">
            {/* Photo — close, reflective */}
            <div className="hidden lg:block relative h-[420px] rounded-3xl overflow-hidden" style={{ background: "var(--color-brand-950)" }}>
              <Image src="/images/newton-3.png" alt="Newton Harris" fill style={{ objectFit: "cover", objectPosition: "top center" }} sizes="340px" />
            </div>
            <p
              className="hidden lg:block leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "var(--color-brand-vivid)",
                opacity: 0.12,
                letterSpacing: "-0.04em",
              }}
            >
              THE<br />BRONX
            </p>
            <div className="space-y-5">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
                  color: "var(--color-brand-950)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                Humbled in Ten<br />Million and One Ways.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "1.05rem",
                  color: "var(--color-ink)",
                  lineHeight: 1.85,
                  maxWidth: "36rem",
                }}
              >
                At Calvary Hospital in the Bronx, America&apos;s largest palliative care hospital, Newton worked in hospice. He sat with the dying. He served without an agenda. Most people leave the comforts of home to climb. Newton went to learn how to kneel. That empathy is now embedded in how he leads.
              </p>
              <blockquote
                style={{
                  borderLeft: "3px solid var(--color-brand-vivid)",
                  paddingLeft: "1.25rem",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "var(--color-brand-vivid)",
                  lineHeight: 1.3,
                }}
              >
                &ldquo;Humbled in ten million and one ways.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOBAL STAGE ─────────────────────────────────────────── */}
      <section
        className="py-20 md:py-32"
        style={{ background: "var(--color-brand-900)" }}
      >
        <div className="container-site">
          <div className="story-reveal mb-14">
            <p
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{
                background: "rgba(29,184,75,0.12)",
                color: "var(--color-brand-vivid)",
                fontFamily: "var(--font-sans)",
              }}
            >
              On the World Stage
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "#fff",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
              }}
            >
              From the Caribbean<br />to the World.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {globalMoments.map((item) => (
              <div
                key={item.year}
                className="story-reveal rounded-2xl p-7 flex flex-col gap-4"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(29,184,75,0.15)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    color: "var(--color-brand-vivid)",
                  }}
                >
                  {item.year}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "1.5rem",
                    color: "#fff",
                    lineHeight: 1.1,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.8,
                  }}
                >
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ──────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-site">
          <div className="story-reveal mb-12">
            <p
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{
                background: "rgba(29,184,75,0.1)",
                color: "var(--color-brand-vivid)",
                fontFamily: "var(--font-sans)",
              }}
            >
              The Record
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                color: "var(--color-brand-950)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
              }}
            >
              In the Room.<br />At the Table. On the Ground.
            </h2>
          </div>
          <div className="creds-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {credentials.map((cred, i) => (
              <div
                key={i}
                className="cred-card rounded-2xl p-6 space-y-2"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  opacity: 0,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "1.05rem",
                    color: "var(--color-brand-950)",
                    lineHeight: 1.2,
                  }}
                >
                  {cred.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    fontSize: "0.88rem",
                    color: "var(--color-ink-muted)",
                    lineHeight: 1.75,
                  }}
                >
                  {cred.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROWN'S TOWN ─────────────────────────────────────────── */}
      <section
        className="py-24 md:py-40 overflow-hidden relative"
        style={{ background: "var(--color-brand-950)" }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.035] pointer-events-none">
          <ArrowMotif size={600} color="var(--color-brand-vivid)" />
        </div>
        {/* Newton-4 — aspirational, looking up — right side of dark section */}
        <div className="hidden lg:block absolute bottom-0 right-0 pointer-events-none select-none" style={{ width: "38vw", maxWidth: "580px", height: "100%", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%)", maskImage: "linear-gradient(to right, transparent 0%, black 30%)", zIndex: 1 }}>
          <Image src="/images/newton-4.png" alt="" fill style={{ objectFit: "contain", objectPosition: "bottom right" }} sizes="38vw" />
        </div>
        <div className="container-site relative z-10">
          <div className="story-reveal max-w-3xl">
            <p
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                background: "rgba(29,184,75,0.12)",
                color: "var(--color-brand-vivid)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Roots
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                color: "#fff",
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
              }}
            >
              He Never Forgot<br />
              <span style={{ color: "var(--color-brand-vivid)" }}>
                Where He Came From.
              </span>
            </h2>
            <p
              className="mt-8"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.9,
                maxWidth: "34rem",
              }}
            >
              Newton is the current Chair of the Board of Management of Brown&apos;s Town Infant School, the same community that watched him grow up. He could be anywhere. He chooses to be exactly there, shaping the first chapter of a child&apos;s education, in the town that shaped him.
            </p>
            <p
              className="mt-6"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.15rem",
                color: "var(--color-brand-vivid)",
              }}
            >
              That&apos;s not a credential. That&apos;s a character.
            </p>
          </div>
        </div>
      </section>

      {/* ── G2K RECORD ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-site">
          <div className="story-reveal mb-10">
            <p
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{
                background: "rgba(29,184,75,0.1)",
                color: "var(--color-brand-vivid)",
                fontFamily: "var(--font-sans)",
              }}
            >
              G2K Member Since 2018
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                color: "var(--color-brand-950)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Serving Before Asking.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="story-reveal space-y-4">
              {g2kRecord.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: "var(--color-brand-vivid)", fontFamily: "var(--font-sans)" }}
                  >
                    {i + 1}
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      fontSize: "0.97rem",
                      color: "var(--color-ink)",
                      lineHeight: 1.65,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="story-reveal rounded-2xl p-7 flex flex-col justify-between"
              style={{ background: "var(--color-brand-950)" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "#fff",
                  lineHeight: 1.5,
                }}
              >
                &ldquo;The G2K Presidency is an operational post. G2K deserves performance, not promises.&rdquo;
              </p>
              <p
                className="mt-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  color: "var(--color-brand-vivid)",
                }}
              >
                Newton Harris
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section
        className="py-14"
        style={{ background: "var(--color-brand-900)" }}
      >
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p
              className="text-white font-black text-xl md:text-2xl mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Convinced by the record?
            </p>
            <p
              className="text-white/60 text-sm"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Explore the mission and three-pillar plan.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/mission"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-bold rounded-lg transition-colors text-sm"
              style={{
                background: "var(--color-gold-400)",
                color: "var(--color-brand-950)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Read the Mission <ArrowRight size={14} />
            </Link>
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white font-bold rounded-lg hover:bg-white/5 transition-colors text-sm"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Explore the Plan <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
