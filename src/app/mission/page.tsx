import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mission, pillar1, pillar2, pillar3 } from "@/content";

export const metadata: Metadata = {
  title: "My Mission",
  description:
    "Newton Harris's mission: build a G2K that supports and facilitates your ambition with real solutions.",
};

const pillars = [
  { number: 1, heading: pillar1.heading, href: `/plan/${pillar1.id}`, intro: pillar1.intro },
  { number: 2, heading: pillar2.heading, href: `/plan/${pillar2.id}`, intro: pillar2.intro },
  { number: 3, heading: pillar3.heading, href: `/plan/${pillar3.id}`, intro: "To achieve our mission, G2K needs a financial plan, not just ad hoc fundraising." },
];

export default function MissionPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--color-brand-900)] py-20 md:py-28">
        <div className="container-site">
          <div className="max-w-3xl">
            <span className="badge-green">My Mission</span>
            <h1 className="mt-4 text-4xl md:text-6xl font-black text-white leading-tight">
              A G2K Built For You.
            </h1>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <div className="section-divider" />
            <p className="text-[var(--color-ink)] text-xl md:text-2xl leading-relaxed font-medium">
              {mission.body}
            </p>

            {/* Key commitment */}
            <div className="mt-12 p-8 md:p-10 bg-[var(--color-brand-900)] rounded-2xl text-center space-y-3">
              <p className="text-white/70 text-sm uppercase tracking-widest font-bold">
                The Promise
              </p>
              <p className="text-[var(--color-gold-400)] font-black text-2xl md:text-4xl tracking-tight">
                {mission.keyCommitment}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bridge to the three pillars */}
      <section className="py-16 md:py-24 bg-[var(--color-surface)]">
        <div className="container-site">
          <div className="text-center mb-12 space-y-3">
            <span className="badge-green">How We Get There</span>
            <h2 className="text-2xl md:text-3xl font-black text-[var(--color-brand-900)]">
              The Three Pillars of the Plan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <Link
                key={pillar.number}
                href={pillar.href}
                className="group bg-white rounded-2xl p-7 border border-[var(--color-border)] hover:border-[var(--color-brand-400)] hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[var(--color-brand-900)] text-white flex items-center justify-center font-black text-sm group-hover:bg-[var(--color-brand-700)] transition-colors">
                    {pillar.number}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink-muted)]">
                    Pillar {pillar.number}
                  </p>
                </div>
                <h3 className="text-lg font-black text-[var(--color-brand-900)] mb-3 leading-tight">
                  {pillar.heading}
                </h3>
                <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed flex-1">
                  {pillar.intro.length > 140
                    ? pillar.intro.slice(0, 140) + "..."
                    : pillar.intro}
                </p>
                <div className="mt-5 flex items-center gap-2 text-[var(--color-brand-700)] font-semibold text-sm group-hover:gap-3 transition-all">
                  Explore <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-brand-700)] text-white font-bold rounded-lg hover:bg-[var(--color-brand-800)] transition-colors"
            >
              View the Full Plan <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
