import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, BookOpen, DollarSign } from "lucide-react";
import { pillar1, pillar2, pillar3 } from "@/content";

export const metadata: Metadata = {
  title: "The Plan",
  description:
    "Newton Harris's three-pillar plan: Chapter & Member Development, National Policy & Thought Leadership, Sustainable Financing.",
};

const pillars = [
  {
    ...pillar1,
    icon: <Users size={32} />,
    color: "from-[var(--color-brand-900)] to-[var(--color-brand-700)]",
    modules: pillar1.modules.map((m) => m.title),
  },
  {
    ...pillar2,
    icon: <BookOpen size={32} />,
    color: "from-[var(--color-brand-800)] to-[var(--color-brand-600)]",
    modules: pillar2.modules.map((m) => m.title),
  },
  {
    ...pillar3,
    icon: <DollarSign size={32} />,
    color: "from-[var(--color-brand-950)] to-[var(--color-brand-800)]",
    modules: pillar3.modules.map((m) => m.title),
  },
];

export default function PlanPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--color-brand-900)] py-20 md:py-28">
        <div className="container-site">
          <div className="max-w-3xl space-y-4">
            <span className="badge-green">The Plan</span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Three Pillars.<br />
              <span className="text-[var(--color-gold-400)]">One Direction.</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed">
              A comprehensive, measurable framework to transform G2K into Jamaica's premier
              professional policy powerhouse.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-site space-y-10">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="rounded-2xl border border-[var(--color-border)] overflow-hidden"
            >
              {/* Pillar header */}
              <div className={`bg-gradient-to-r ${pillar.color} p-7 md:p-10 text-white`}>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">
                      Pillar {pillar.number}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-black">{pillar.heading}</h2>
                  </div>
                  <Link
                    href={`/plan/${pillar.id}`}
                    className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-gold-400)] text-[var(--color-brand-900)] font-bold rounded-lg hover:bg-[var(--color-gold-300)] transition-colors text-sm whitespace-nowrap"
                  >
                    Explore in full <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Pillar body */}
              <div className="p-7 md:p-10 bg-[var(--color-surface)]">
                <p className="text-[var(--color-ink)] leading-relaxed mb-6">
                  {"intro" in pillar ? pillar.intro : ""}
                </p>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink-muted)] mb-3">
                    Key Initiatives
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pillar.modules.map((m) => (
                      <span
                        key={m}
                        className="px-3 py-1.5 bg-white border border-[var(--color-border)] text-[var(--color-ink)] text-sm rounded-lg font-medium"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[var(--color-brand-950)]">
        <div className="container-site text-center space-y-4 max-w-xl mx-auto">
          <p className="text-white font-black text-2xl">Read every detail.</p>
          <p className="text-white/60">The full manifesto contains every tactic and measurement target.</p>
          <Link
            href="/manifesto"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-gold-400)] text-[var(--color-brand-900)] font-bold rounded-lg hover:bg-[var(--color-gold-300)] transition-colors"
          >
            Read the Full Manifesto <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
