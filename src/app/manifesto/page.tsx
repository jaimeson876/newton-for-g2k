import type { Metadata } from "next";
import Link from "next/link";
import { Download, ExternalLink, ArrowRight, BookOpen } from "lucide-react";
import { mission, pillar1, pillar2, pillar3, messageToG2K } from "@/content";

export const metadata: Metadata = {
  title: "Full Manifesto",
  description:
    "The complete Newton Harris G2K Presidential Manifesto covering all three pillars, tactics, and commitments.",
};

const toc = [
  { id: "my-mission", label: "My Mission" },
  { id: "pillar-1", label: "Pillar 1: Chapter & Member Development" },
  { id: "pillar-2", label: "Pillar 2: National Policy & Thought Leadership" },
  { id: "pillar-3", label: "Pillar 3: Sustainable Financing" },
  { id: "message-to-g2k", label: "A Message to G2K" },
];

export default function ManifestoPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--color-brand-900)] py-20 md:py-28">
        <div className="container-site">
          <div className="max-w-3xl space-y-4">
            <span className="badge-green">Full Manifesto</span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Read Every Word.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              The complete, unabridged manifesto for the Newton Harris G2K Presidential campaign.
              Every tactic, every commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="/manifesto.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--color-gold-400)] text-[var(--color-brand-900)] font-bold rounded-lg hover:bg-[var(--color-gold-300)] transition-colors text-sm"
              >
                <Download size={15} /> Download PDF
              </a>
              <a
                href="/manifesto.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-white/30 text-white font-bold rounded-lg hover:bg-white/5 transition-colors text-sm"
              >
                <ExternalLink size={15} /> Open PDF in new tab
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">

          {/* Sticky sidebar TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink-muted)] mb-4">
                Contents
              </p>
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block py-2 px-3 rounded text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-brand-700)] hover:bg-[var(--color-surface)] transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </aside>

          {/* Manifesto body */}
          <article className="max-w-3xl space-y-20 text-[var(--color-ink)]">

            {/* I. My Mission */}
            <ManifestoSection id="my-mission">
              <ManifestoHeading roman="I." text={mission.heading} />
              <BodyText>{mission.body}</BodyText>
              <KeyCommitment>{mission.keyCommitment}</KeyCommitment>
            </ManifestoSection>

            {/* II. Pillar 1 */}
            <ManifestoSection id="pillar-1">
              <PillarBadge number={1} />
              <ManifestoHeading roman="II." text={pillar1.heading} />
              <BodyText>{pillar1.intro}</BodyText>
              <KeyCommitment>{pillar1.promise}</KeyCommitment>
              <ManifestoPillarModules modules={pillar1.modules} />
            </ManifestoSection>

            {/* III. Pillar 2 */}
            <ManifestoSection id="pillar-2">
              <PillarBadge number={2} />
              <ManifestoHeading roman="III." text={pillar2.heading} />
              <BodyText>{pillar2.intro}</BodyText>
              <BoldStatement>{pillar2.boldStatement}</BoldStatement>
              <ManifestoPillarModules modules={pillar2.modules} />
            </ManifestoSection>

            {/* IV. Pillar 3 */}
            <ManifestoSection id="pillar-3">
              <PillarBadge number={3} />
              <ManifestoHeading roman="IV." text={pillar3.heading} />
              <BodyText>
                {pillar3.intro} <strong>{pillar3.boldInline}</strong>
                {pillar3.introEnd}
              </BodyText>
              <ManifestoPillarModules modules={pillar3.modules} />
            </ManifestoSection>

            {/* V. Message to G2K */}
            <ManifestoSection id="message-to-g2k">
              <ManifestoHeading roman="V." text={messageToG2K.heading} />
              <div className="space-y-4">
                {messageToG2K.paragraphs.map((p, i) => (
                  <BodyText key={i}>{p}</BodyText>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-[var(--color-border)] space-y-1">
                <p className="font-black text-[var(--color-brand-900)] text-xl">
                  {messageToG2K.closingLine}
                </p>
                <p className="font-black text-[var(--color-gold-600)] tracking-widest uppercase text-sm">
                  {messageToG2K.closingTagline}
                </p>
              </div>
            </ManifestoSection>

            {/* PDF embed */}
            <div className="border border-[var(--color-border)] rounded-2xl overflow-hidden">
              <div className="p-5 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-[var(--color-brand-600)]" />
                  <p className="font-bold text-[var(--color-ink)] text-sm">
                    Original PDF Document
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href="/manifesto.pdf"
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-brand-700)] text-white font-bold text-xs rounded-lg hover:bg-[var(--color-brand-800)] transition-colors"
                  >
                    <Download size={12} /> Download
                  </a>
                  <a
                    href="/manifesto.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--color-border)] text-[var(--color-ink-muted)] font-bold text-xs rounded-lg hover:bg-[var(--color-surface)] transition-colors"
                  >
                    <ExternalLink size={12} /> Open
                  </a>
                </div>
              </div>
              <iframe
                src="/manifesto.pdf"
                className="w-full h-[70vh] min-h-[500px]"
                title="Newton Harris G2K Manifesto PDF"
              />
            </div>
          </article>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[var(--color-brand-900)] py-12">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white font-black text-xl">Ready to explore interactively?</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-gold-400)] text-[var(--color-brand-900)] font-bold rounded-lg hover:bg-[var(--color-gold-300)] transition-colors text-sm"
            >
              The Interactive Plan <ArrowRight size={14} />
            </Link>
            <Link
              href="/the-candidate"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white font-bold rounded-lg hover:bg-white/5 transition-colors text-sm"
            >
              Meet Newton <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Layout primitives ────────────────────────────────────────────

function ManifestoSection({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-5">
      {children}
    </section>
  );
}

function PillarBadge({ number }: { number: number }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-100)]">
      <span className="w-4 h-4 rounded-full bg-[var(--color-brand-700)] flex items-center justify-center text-white text-[9px] font-black">
        {number}
      </span>
      <span className="text-[var(--color-brand-700)] text-xs font-black uppercase tracking-widest">
        Pillar {number}
      </span>
    </div>
  );
}

function ManifestoHeading({ roman, text }: { roman: string; text: string }) {
  return (
    <div className="space-y-1 pb-4 border-b-2 border-[var(--color-border)]">
      <p className="text-[var(--color-ink-muted)] text-xs font-bold uppercase tracking-widest">
        {roman}
      </p>
      <h2 className="text-2xl md:text-3xl font-black text-[var(--color-brand-900)] leading-tight">
        {text}
      </h2>
    </div>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="leading-relaxed text-[var(--color-ink)] text-base">{children}</p>
  );
}

function KeyCommitment({ children }: { children: React.ReactNode }) {
  return (
    <div className="pl-4 border-l-4 border-[var(--color-gold-400)] py-1">
      <p className="font-black text-[var(--color-brand-900)] text-lg leading-snug">
        {children}
      </p>
    </div>
  );
}

function BoldStatement({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-bold text-[var(--color-brand-800)] text-base leading-relaxed">
      {children}
    </p>
  );
}

// ─── Pillar modules ───────────────────────────────────────────────

function ManifestoPillarModules({
  modules,
}: {
  modules: { id?: string; title: string; promise: string; tactics: { name: string; detail: string }[] }[];
}) {
  return (
    <div className="space-y-0 mt-2">
      {modules.map((mod, idx) => (
        <div key={mod.id ?? mod.title}>
          <div className="py-6">
            {/* Module header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="shrink-0 w-7 h-7 rounded-full bg-[var(--color-brand-700)] text-white flex items-center justify-center font-black text-xs mt-0.5">
                {String.fromCharCode(64 + idx + 1)}
              </div>
              <h3 className="font-black text-[var(--color-brand-900)] text-base leading-snug">
                {mod.title}
              </h3>
            </div>

            {/* Promise */}
            <p className="text-[var(--color-ink)] text-sm leading-relaxed mb-5 pl-10">
              {mod.promise}
            </p>

            {/* Tactics */}
            <div className="pl-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-muted)] mb-3">
                Tactical Strategy
              </p>
              <ul className="space-y-3">
                {mod.tactics.map((t, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded bg-[var(--color-brand-100)] text-[var(--color-brand-700)] flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </span>
                    <span>
                      <span className="font-bold text-[var(--color-ink)]">{t.name}: </span>
                      <span className="text-[var(--color-ink-muted)] leading-relaxed">{t.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {idx < modules.length - 1 && (
            <div className="border-b border-[var(--color-border)]" />
          )}
        </div>
      ))}
    </div>
  );
}
