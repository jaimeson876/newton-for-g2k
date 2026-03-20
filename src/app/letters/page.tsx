import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllLetters } from "@/lib/letters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Letters & Articles | Newton Harris for G2K President",
  description: "Dispatches and long-form writing from Newton Harris on the future of G2K and Jamaican youth leadership.",
};

export default function LettersPage() {
  const letters = getAllLetters();

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28 md:py-40"
        style={{ background: "var(--color-brand-950)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(29,184,75,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="container-site relative z-10">
          <div className="max-w-3xl space-y-5">
            <span className="badge-green">Letters & Articles</span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
              }}
            >
              Dispatches from
              <br />
              <span style={{ color: "var(--color-brand-vivid)" }}>the campaign.</span>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                maxWidth: "520px",
              }}
            >
              Long-form writing from Newton Harris on leadership, policy, and the
              future of G2K.
            </p>
          </div>
        </div>
      </section>

      {/* ── Letters list ──────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: "var(--color-surface)" }}>
        <div className="container-site">
          {letters.length === 0 ? (
            <div className="text-center py-20">
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "var(--color-ink-muted)",
                }}
              >
                Letters coming soon.
              </p>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto flex flex-col divide-y divide-[var(--color-border)]">
              {letters.map((letter) => (
                <Link
                  key={letter.slug}
                  href={`/letters/${letter.slug}`}
                  className="group py-8 flex flex-col gap-2 hover:opacity-80 transition-opacity"
                >
                  <p
                    style={{
                      fontFamily: "var(--font-condensed)",
                      fontWeight: 700,
                      fontSize: "0.65rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--color-brand-vivid)",
                    }}
                  >
                    {new Date(letter.date).toLocaleDateString("en-JM", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
                      color: "var(--color-brand-900)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                    }}
                  >
                    {letter.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 300,
                      fontSize: "0.95rem",
                      color: "var(--color-ink-muted)",
                      lineHeight: 1.7,
                    }}
                  >
                    {letter.excerpt}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 mt-1"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      color: "var(--color-brand-vivid)",
                    }}
                  >
                    Read <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
