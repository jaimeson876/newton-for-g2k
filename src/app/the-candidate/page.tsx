"use client";

import { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArrowMotif from "@/components/shared/ArrowMotif";

gsap.registerPlugin(ScrollTrigger);

const globalVoice = [
  {
    year: "2015",
    title: "President Obama's Townhall in Kingston",
    detail:
      "Selected to participate as one of Jamaica's most promising young leaders. His questions resulted in comprehensive exchanges between interested governments.",
  },
  {
    year: "2013–14",
    title: "World Class Advocate",
    detail:
      "Recognised as the Top Debater in Latin America and the Caribbean at the World Universities Debating Championships.",
  },
  {
    year: "National",
    title: "National Representation",
    detail:
      "From Rome to Chennai, he has ensured that Jamaica is heard in the rooms where global decisions are made.",
  },
];

const record = [
  {
    label: "Ministerial Advisor",
    detail:
      "Five years advising Senator the Hon. Kamina Johnson Smith on foreign policy and parliamentary business.",
  },
  {
    label: "Legal Frameworks",
    detail:
      "Worked within the Attorney-General's Chambers to help build the structures that protect our legal interests.",
  },
  {
    label: "Proven Management",
    detail:
      "Managed a commercial business to 25% revenue growth, proving his grasp of the practical economy.",
  },
];

export default function TheCandidatePage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        ".record-card",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".record-grid",
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
        <div className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.09]" style={{ transform: "translateY(-15%) translateX(15%)" }}>
          <ArrowMotif size={780} color="var(--color-brand-vivid)" />
        </div>
        <div className="absolute bottom-0 left-0 pointer-events-none select-none opacity-[0.05]" style={{ transform: "translateY(25%) translateX(-25%)" }}>
          <ArrowMotif size={500} color="var(--color-gold-400)" />
        </div>

        {/* Portrait */}
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
            src="/images/newton-2.png"
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
              A Legacy of<br />
              <span style={{ color: "var(--color-brand-vivid)" }}>Service.</span>
              <br />A Future of Action.
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
              Newton Harris did not find his leadership in a boardroom. It was formed on the floor of a rural hardware store, in the hospice wards of the Bronx, and through his years of service for the party. For Newton, leadership is not about the seat you hold. It is about the people you serve.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE INSTINCT ─────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="container-site">
          <div className="story-reveal grid grid-cols-1 lg:grid-cols-[160px_1fr_340px] gap-10 items-center">
            <p
              className="hidden lg:block leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2rem, 5vw, 4rem)",
                color: "var(--color-brand-vivid)",
                opacity: 0.12,
                letterSpacing: "-0.04em",
              }}
            >
              THE<br />INSTINCT
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
                Chasing the Need:<br />A Lesson in Representation.
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
                Growing up in his family&apos;s hardware shop, a six-year-old Newton watched a regular customer turn to leave because the shop was too crowded to be seen. Without waiting for permission or a second thought, he sprinted out the door and into the street to bring that customer back.
              </p>
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
                He understood even then that no one should walk away unheard. That same instinct drives him today. Whether he is navigating high-level national policy or addressing the individual concern of a G2K member, Newton&apos;s standard remains the same: No one is left unserved.
              </p>
            </div>
            {/* Photo */}
            <div className="hidden lg:block relative h-[420px] rounded-3xl overflow-hidden" style={{ background: "var(--color-brand-vivid)" }}>
              <Image src="/images/newton-2.png" alt="Newton Harris" fill style={{ objectFit: "cover", objectPosition: "top center" }} sizes="340px" />
            </div>
          </div>
        </div>
      </section>

      {/* ── THE DISCIPLINE ───────────────────────────────────────── */}
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
                fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                color: "var(--color-brand-vivid)",
                opacity: 0.12,
                letterSpacing: "-0.04em",
              }}
            >
              THE<br />DISCIPLINE
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
                A Mind Focused<br />on Solutions.
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
                Newton chose a path of discipline to sharpen his capacity for leadership. During a dedicated period of intensive formation and service with his church, he embraced a tradition of deep study and purposeful focus.
              </p>
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
                He did not do this for a title. He did it to ensure that when he speaks on behalf of the people, he does so with a mind that is sharp, prepared, and ready to act. Clear thinking is a tool for achieving real results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE REALITY ──────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="container-site">
          <div className="story-reveal grid grid-cols-1 lg:grid-cols-[340px_160px_1fr] gap-10 items-center">
            {/* Photo */}
            <div className="hidden lg:block relative h-[420px] rounded-3xl overflow-hidden" style={{ background: "var(--color-gold-400)" }}>
              <Image src="/images/newton-3.png" alt="Newton Harris" fill style={{ objectFit: "cover", objectPosition: "top center" }} sizes="340px" />
            </div>
            <p
              className="hidden lg:block leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                color: "var(--color-brand-vivid)",
                opacity: 0.12,
                letterSpacing: "-0.04em",
              }}
            >
              THE<br />REALITY
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
                Service Without<br />an Agenda.
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
                At Calvary Hospital in the Bronx, Newton swapped a suit for scrubs. In a high-pressure palliative care environment, he provided the most basic, essential care for the terminally ill. He bathed, fed, and sat with those who could give him nothing in return.
              </p>
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
                While many climb to avoid hard work, Newton went to the Bronx to find it. That experience taught him a vital truth: If you are not willing to perform the humblest tasks for another human being, you have no right to lead them.
              </p>
              <blockquote
                style={{
                  borderLeft: "3px solid var(--color-brand-vivid)",
                  paddingLeft: "1.25rem",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--color-brand-vivid)",
                  lineHeight: 1.4,
                }}
              >
                &ldquo;True leadership happens when no one is watching. If you cannot wash the feet of those you lead, you cannot carry their burdens.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE GLOBAL VOICE ─────────────────────────────────────── */}
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
              The Global Voice
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
              Jamaica&apos;s Voice<br />on the World Stage.
            </h2>
            <p
              className="mt-5 max-w-2xl"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.85,
              }}
            >
              Newton has represented Jamaica before presidents and international bodies, always maintaining his local roots and values. He travels as an ambassador, not a spectator.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {globalVoice.map((item) => (
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
                    fontSize: "1.35rem",
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

      {/* ── THE RECORD ───────────────────────────────────────────── */}
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
              Prepared For Performance.
            </h2>
            <p
              className="mt-5 max-w-2xl"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "1.05rem",
                color: "var(--color-ink)",
                lineHeight: 1.85,
              }}
            >
              Newton combines legal training with high-level government experience and a history of grassroots action.
            </p>
          </div>
          <div className="record-grid grid grid-cols-1 md:grid-cols-3 gap-5">
            {record.map((item, i) => (
              <div
                key={i}
                className="record-card rounded-2xl p-6 space-y-2"
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
                  {item.label}
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
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROOTS ────────────────────────────────────────────────── */}
      <section
        className="py-24 md:py-40 overflow-hidden relative"
        style={{ background: "var(--color-brand-950)" }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.035] pointer-events-none">
          <ArrowMotif size={600} color="var(--color-brand-vivid)" />
        </div>
        {/* Newton-4 — aspirational, looking up */}
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
              Invested in the Town<br />
              <span style={{ color: "var(--color-brand-vivid)" }}>
                That Shaped Him.
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
              Newton is the current Chair of the Board of Management for Brown&apos;s Town Infant School, the same community that watched him grow up. He could be anywhere, yet he chooses to be exactly there, shaping the first chapter of a child&apos;s education in the town that shaped him.
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
              That is not a credential. That is character.
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
              A Record of Reliability.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="story-reveal">
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "1.05rem",
                  color: "var(--color-ink)",
                  lineHeight: 1.85,
                }}
              >
                Newton joined G2K to work. As a former Deputy Treasurer and the current VP of International Relations, he has focused on results. He has secured relief kits for members and led major national forums at our universities. His stance is clear:
              </p>
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
                &ldquo;The G2K Presidency is an operational role. Our members deserve performance over promises. I am not asking for the job to start serving. I am asking because service is what I do.&rdquo;
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
              Join a Movement Built on Substance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-bold rounded-lg transition-colors text-sm"
              style={{
                background: "var(--color-gold-400)",
                color: "var(--color-brand-950)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Explore the Plan <ArrowRight size={14} />
            </Link>
            <Link
              href="/reach-out"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white font-bold rounded-lg hover:bg-white/5 transition-colors text-sm"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Join the Movement <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
