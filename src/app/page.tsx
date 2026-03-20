import Link from "next/link";
import { ArrowRight, Users, BookOpen, DollarSign, FileText } from "lucide-react";
import { candidate, mission, pillar1, pillar2, pillar3, messageToG2K } from "@/content";

const pillars = [
  {
    number: 1,
    heading: pillar1.heading,
    href: `/plan/${pillar1.id}`,
    icon: <Users size={24} />,
    preview:
      "Transform Chapter meetings into high-level networking hubs. Build the premier credential for young professionals.",
  },
  {
    number: 2,
    heading: pillar2.heading,
    href: `/plan/${pillar2.id}`,
    icon: <BookOpen size={24} />,
    preview:
      "Bridge the gap between governance and the people. Elevate the conversation and edify our fellow citizens.",
  },
  {
    number: 3,
    heading: pillar3.heading,
    href: `/plan/${pillar3.id}`,
    icon: <DollarSign size={24} />,
    preview:
      "Build an organisation that is financially self-sufficient. Fund our future through corporate discipline.",
  },
];

export default function Home() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-[var(--color-brand-900)] overflow-hidden">
        {/* Geometric background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-brand-800)] opacity-50" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[var(--color-brand-800)] -translate-x-1/2 translate-y-1/2 opacity-20" />
          {/* Gold accent dashes */}
          <div className="absolute top-12 right-[8%] flex flex-col gap-3 opacity-50">
            {[80, 64, 48, 36, 24, 14].map((w, i) => (
              <div
                key={i}
                className="h-1.5 bg-[var(--color-gold-400)] rounded-full"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
          <div className="absolute bottom-16 left-[5%] flex flex-col gap-3 opacity-20">
            {[40, 32, 24, 16].map((w, i) => (
              <div
                key={i}
                className="h-1.5 bg-[var(--color-gold-400)] rounded-full"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
        </div>

        <div className="container-site relative z-10 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="space-y-6">
              <span className="badge-green">G2K Presidential Candidate 2026</span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
                NEWTON IS
                <br />
                <span className="text-[var(--color-gold-400)]">YOUR SOLUTION</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl font-semibold tracking-wide uppercase">
                {candidate.subtagline}
              </p>
              <p className="text-white/60 italic text-base md:text-lg">{candidate.era}</p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/the-candidate"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-gold-400)] text-[var(--color-brand-900)] font-bold rounded-lg hover:bg-[var(--color-gold-300)] transition-colors"
                >
                  Meet Newton <ArrowRight size={16} />
                </Link>
                <Link
                  href="/manifesto"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/40 text-white font-bold rounded-lg hover:border-white hover:bg-white/5 transition-colors"
                >
                  <FileText size={16} /> Read the Manifesto
                </Link>
              </div>
            </div>

            {/* Portrait area */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-72 h-96 md:w-80 md:h-[26rem] lg:w-96 lg:h-[30rem]">
                <div className="absolute inset-0 rounded-2xl bg-[var(--color-brand-700)] overflow-hidden border-4 border-[var(--color-gold-400)]/30 flex items-center justify-center">
                  {/* Image will be placed here — replace div with next/image */}
                  <div className="text-center space-y-3 p-6">
                    <div className="w-28 h-28 rounded-full bg-[var(--color-brand-500)] mx-auto flex items-center justify-center">
                      <span className="text-white font-black text-3xl">NH</span>
                    </div>
                    <p className="text-white font-bold text-lg">Newton Harris</p>
                    <p className="text-white/50 text-xs">
                      [Replace with candidate portrait]
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[var(--color-gold-400)] text-[var(--color-brand-900)] px-4 py-2 rounded-lg font-black text-sm uppercase tracking-wide shadow-lg">
                  VP International Relations
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--color-border)] rounded-2xl overflow-hidden border border-[var(--color-border)]">
            {[
              { label: "Years as Ministerial Advisor", value: "5+" },
              { label: "G2K Member Since", value: "2018" },
              { label: "National Forums Delivered", value: "2" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white px-8 py-8 text-center">
                <p className="text-4xl md:text-5xl font-black text-[var(--color-brand-700)]">
                  {stat.value}
                </p>
                <p className="text-[var(--color-ink-muted)] text-sm mt-1 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 max-w-3xl mx-auto text-center">
            <div className="section-divider mx-auto" />
            <p className="text-[var(--color-ink)] text-lg md:text-xl leading-relaxed">
              {candidate.intro}
            </p>
            <Link
              href="/the-candidate"
              className="inline-flex items-center gap-2 mt-6 text-[var(--color-brand-700)] font-bold hover:gap-3 transition-all"
            >
              Learn more about Newton <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Mission excerpt ───────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[var(--color-brand-900)]">
        <div className="container-site">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="badge-green">My Mission</span>
            <p className="text-white text-lg md:text-xl leading-relaxed">{mission.body}</p>
            <div className="inline-block mt-4 px-6 py-3 bg-[var(--color-gold-400)] text-[var(--color-brand-900)] font-black text-xl md:text-2xl rounded-lg tracking-tight">
              {mission.keyCommitment}
            </div>
            <div className="pt-2">
              <Link
                href="/mission"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold transition-colors"
              >
                Read the full mission statement <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Three Pillars ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[var(--color-surface)]">
        <div className="container-site">
          <div className="text-center mb-12 space-y-3">
            <span className="badge-green">The Plan</span>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--color-brand-900)]">
              Three Pillars. One Direction.
            </h2>
            <p className="text-[var(--color-ink-muted)] max-w-xl mx-auto">
              A comprehensive framework to transform G2K into a professional policy powerhouse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <Link
                key={pillar.number}
                href={pillar.href}
                className="group relative bg-white rounded-2xl p-7 border border-[var(--color-border)] hover:border-[var(--color-brand-400)] hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-900)] text-white flex items-center justify-center font-black text-lg mb-5 group-hover:bg-[var(--color-brand-700)] transition-colors">
                  {pillar.number}
                </div>
                <div className="text-[var(--color-brand-600)] mb-3">{pillar.icon}</div>
                <h3 className="text-lg font-black text-[var(--color-brand-900)] mb-3 leading-tight">
                  Pillar {pillar.number}: {pillar.heading}
                </h3>
                <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed flex-1">
                  {pillar.preview}
                </p>
                <div className="mt-5 flex items-center gap-2 text-[var(--color-brand-700)] font-semibold text-sm group-hover:gap-3 transition-all">
                  Explore Pillar {pillar.number} <ArrowRight size={14} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-gold-400)] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-brand-700)] text-[var(--color-brand-700)] font-bold rounded-lg hover:bg-[var(--color-brand-700)] hover:text-white transition-colors"
            >
              View the Full Plan <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Closing message strip ─────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[var(--color-brand-950)]">
        <div className="container-site text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-white/80 text-lg md:text-xl leading-relaxed italic">
            &ldquo;{messageToG2K.paragraphs[0]}&rdquo;
          </p>
          <p className="text-[var(--color-gold-400)] font-black text-2xl md:text-3xl">
            Newton is your solution.
          </p>
          <p className="text-white/60 font-bold tracking-widest uppercase text-sm">
            {messageToG2K.closingTagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link
              href="/message-to-g2k"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-gold-400)] text-[var(--color-brand-900)] font-bold rounded-lg hover:bg-[var(--color-gold-300)] transition-colors"
            >
              Read the Message to G2K <ArrowRight size={16} />
            </Link>
            <Link
              href="/manifesto"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white font-bold rounded-lg hover:bg-white/5 transition-colors"
            >
              <FileText size={16} /> Full Manifesto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
