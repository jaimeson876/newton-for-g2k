import type { Metadata } from "next";
import Link from "next/link";
import { Download, ExternalLink, ArrowRight, BookOpen } from "lucide-react";
import { candidate, mission, pillar1, pillar2, pillar3, messageToG2K } from "@/content";

export const metadata: Metadata = {
  title: "Full Manifesto",
  description:
    "The complete Newton Harris G2K Presidential Manifesto covering all three pillars, tactics, and measurement targets.",
};

// Table of contents anchor items
const toc = [
  { id: "cover", label: "Cover" },
  { id: "the-candidate", label: "The Candidate" },
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
              Every tactic, every target, every commitment.
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
          {/* Table of contents — sticky sidebar on desktop */}
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
          <article className="max-w-3xl space-y-16 text-[var(--color-ink)]">
            {/* I. Cover */}
            <ManifestoSection id="cover">
              <ManifestoHeading roman="I." text="Cover Page" />
              <div className="mt-6 p-8 bg-[var(--color-brand-900)] rounded-2xl text-white text-center space-y-3">
                <p className="text-3xl md:text-4xl font-black">{candidate.tagline.toUpperCase()}</p>
                <p className="font-bold text-[var(--color-gold-400)] tracking-wide uppercase">
                  {candidate.subtagline}
                </p>
                <p className="text-white/70 italic">{candidate.era}</p>
              </div>
            </ManifestoSection>

            {/* II. The Candidate */}
            <ManifestoSection id="the-candidate">
              <ManifestoHeading roman="II." text="Your Next G2K President" />
              <BodyText>{candidate.intro}</BodyText>

              <SubHeading>{candidate.professionalBackground.heading}</SubHeading>
              <BodyText>{candidate.professionalBackground.body}</BodyText>

              <SubHeading>{candidate.g2kVeteran.heading}</SubHeading>
              <BodyText>{candidate.g2kVeteran.intro}</BodyText>
              <BulletList items={candidate.g2kVeteran.achievements} />

              <SubHeading>{candidate.womenInPolitics.heading}</SubHeading>
              <BodyText>{candidate.womenInPolitics.intro}</BodyText>
              <ul className="mt-3 space-y-2 list-none">
                {candidate.womenInPolitics.leaders.map((l) => (
                  <li key={l.name} className="flex gap-2">
                    <span className="font-bold">{l.name}:</span>
                    <span className="text-[var(--color-ink-muted)]">{l.detail}</span>
                  </li>
                ))}
              </ul>
              <BulletList items={candidate.womenInPolitics.commitments} />
            </ManifestoSection>

            {/* III. My Mission */}
            <ManifestoSection id="my-mission">
              <ManifestoHeading roman="III." text={mission.heading} />
              <BodyText>{mission.body}</BodyText>

              <SubHeading>Pillar 1: {pillar1.heading}</SubHeading>
              <BodyText>{pillar1.intro}</BodyText>
              <ManifestoPillarModules modules={pillar1.modules} />

              <SubHeading>Pillar 2: {pillar2.heading}</SubHeading>
              <BodyText>{pillar2.intro}</BodyText>
              <BoldPara>{pillar2.boldStatement}</BoldPara>
              <ManifestoPillarModules modules={pillar2.modules} />

              <SubHeading>Pillar 3: {pillar3.heading}</SubHeading>
              <BodyText>
                {pillar3.intro} <strong>{pillar3.boldInline}</strong>
                {pillar3.introEnd}
              </BodyText>
              <ManifestoPillarModules modules={pillar3.modules} />
            </ManifestoSection>

            {/* IV. Message to G2K */}
            <ManifestoSection id="message-to-g2k">
              <ManifestoHeading roman="IV." text={messageToG2K.heading} />
              {messageToG2K.paragraphs.map((p, i) => (
                <BodyText key={i}>{p}</BodyText>
              ))}
              <div className="mt-6 space-y-1">
                <p className="font-black text-[var(--color-brand-900)] text-lg">
                  {messageToG2K.closingLine}
                </p>
                <p className="font-black text-[var(--color-gold-600)] tracking-widest uppercase">
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
                src="/manifesto.pdf#toolbar=1"
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

// ─── Manifesto typography primitives ─────────────────────────────

function ManifestoSection({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      {children}
    </section>
  );
}

function ManifestoHeading({ roman, text }: { roman: string; text: string }) {
  return (
    <div className="space-y-1 pb-3 border-b-2 border-[var(--color-border)]">
      <p className="text-[var(--color-ink-muted)] text-sm font-bold uppercase tracking-widest">
        {roman}
      </p>
      <h2 className="text-2xl md:text-3xl font-black text-[var(--color-brand-900)]">{text}</h2>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg md:text-xl font-black text-[var(--color-brand-800)] mt-8 mb-2">
      {children}
    </h3>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return <p className="leading-relaxed text-[var(--color-ink)]">{children}</p>;
}

function BoldPara({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-bold text-[var(--color-ink)]">{children}</p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-[var(--color-ink)]">
          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-brand-600)] mt-2.5" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ManifestoPillarModules({
  modules,
}: {
  modules: { id?: string; title: string; promise: string; tactics: { name: string; detail: string }[] }[];
}) {
  return (
    <div className="space-y-6 mt-4">
      {modules.map((mod) => (
        <div key={mod.id ?? mod.title} className="border-l-4 border-[var(--color-brand-200)] pl-5 space-y-3">
          <p className="font-black text-[var(--color-brand-900)]">{mod.title}</p>
          <p className="text-[var(--color-ink)] text-sm leading-relaxed">{mod.promise}</p>
          <div>
            <p className="font-bold text-xs uppercase tracking-widest text-[var(--color-ink-muted)] mt-3 mb-2">
              Tactical Strategy
            </p>
            <ul className="space-y-1.5">
              {mod.tactics.map((t, i) => (
                <li key={i} className="text-sm text-[var(--color-ink)]">
                  <span className="font-bold">{t.name}:</span>{" "}
                  <span className="text-[var(--color-ink-muted)]">{t.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
