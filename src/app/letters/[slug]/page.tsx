import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllLetters, getLetter } from "@/lib/letters";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllLetters().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const letter = getLetter(slug);
  if (!letter) return {};
  return {
    title: `${letter.title} | Newton Harris for G2K President`,
    description: letter.excerpt,
  };
}

// Minimal markdown-to-HTML: paragraphs, bold, line breaks
function renderMarkdown(md: string): string {
  return md
    .trim()
    .split(/\n{2,}/)
    .map((block) => {
      const line = block
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/\n/g, "<br />");
      return `<p>${line}</p>`;
    })
    .join("\n");
}

export default async function LetterPage({ params }: Props) {
  const { slug } = await params;
  const letter = getLetter(slug);
  if (!letter) notFound();

  return (
    <div>
      <section
        className="relative overflow-hidden py-24 md:py-36"
        style={{ background: "var(--color-brand-950)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 30% 50%, rgba(29,184,75,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="container-site relative z-10 max-w-2xl">
          <Link
            href="/letters"
            className="inline-flex items-center gap-2 mb-8 transition-opacity hover:opacity-60"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <ArrowLeft size={13} /> All Letters
          </Link>

          <p
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 700,
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-brand-vivid)",
              marginBottom: "1rem",
            }}
          >
            {new Date(letter.date).toLocaleDateString("en-JM", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 6vw, 4rem)",
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
            }}
          >
            {letter.title}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ background: "var(--color-surface)" }}>
        <div className="container-site max-w-2xl">
          {letter.image && (
            <img
              src={letter.image}
              alt={letter.title}
              className="w-full rounded-2xl mb-10 object-cover"
              style={{ maxHeight: "480px" }}
            />
          )}

          <div
            className="prose-letter"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
              color: "var(--color-ink)",
              lineHeight: 1.85,
            }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(letter.content) }}
          />

          <div
            className="mt-12 pt-8 border-t border-[var(--color-border)]"
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 700,
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-ink-muted)",
            }}
          >
            Newton Harris — G2K Presidential Candidate 2026
          </div>
        </div>
      </section>
    </div>
  );
}
