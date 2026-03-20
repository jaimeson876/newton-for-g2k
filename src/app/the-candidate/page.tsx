import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ImageGallery, { type GalleryImage } from "@/components/shared/ImageGallery";
import { candidate } from "@/content";

export const metadata: Metadata = {
  title: "The Candidate",
  description:
    "Newton Harris — Operational Substance and Verifiable Impact. Five years as Ministerial Advisor, G2K VP since 2018.",
};

// Gallery placeholder — replace src values with actual image paths
const galleryImages: GalleryImage[] = [
  // { src: "/images/candidate-1.jpg", alt: "Newton Harris at UTech Forum 2025", caption: "National Forum at UTech, 2025" },
  // { src: "/images/candidate-2.jpg", alt: "Newton Harris with Kamina Johnson Smith", caption: "Ministerial Advisory work" },
];

export default function TheCandidatePage() {
  return (
    <div>
      {/* Page hero */}
      <section className="bg-[var(--color-brand-900)] py-20 md:py-28">
        <div className="container-site">
          <div className="max-w-3xl space-y-4">
            <span className="badge-green">The Candidate</span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Your Next G2K President
            </h1>
            <div className="section-divider" />
            <p className="text-white/80 text-lg md:text-xl leading-relaxed">
              {candidate.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Professional Edge */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-black text-[var(--color-brand-900)]">
                {candidate.professionalEdge.heading}
              </h2>
              <div className="section-divider" />
              <p className="text-[var(--color-ink)] leading-relaxed text-base md:text-lg">
                {candidate.professionalEdge.body}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink-muted)] mb-4">
                Key Experience Areas
              </p>
              {candidate.professionalEdge.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 mt-0.5 text-[var(--color-brand-600)]"
                  />
                  <p className="text-[var(--color-ink)] font-medium text-sm md:text-base">{h}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Women in Politics */}
      <section className="py-16 md:py-20 bg-[var(--color-surface)]">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--color-brand-900)] mb-2">
              {candidate.womenInPolitics.heading}
            </h2>
            <div className="section-divider" />
            <p className="text-[var(--color-ink-muted)] text-base md:text-lg mb-10">
              {candidate.womenInPolitics.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {candidate.womenInPolitics.leaders.map((leader) => (
                <div
                  key={leader.name}
                  className="bg-white rounded-2xl p-6 border border-[var(--color-border)] hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-brand-900)] flex items-center justify-center mb-4">
                    <span className="text-white font-black text-sm">
                      {leader.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <h3 className="font-black text-[var(--color-brand-900)] text-base mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed">
                    {leader.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* G2K Veteran Timeline */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--color-brand-900)] mb-2">
              {candidate.g2kVeteran.heading}
            </h2>
            <div className="section-divider" />
            <p className="text-[var(--color-ink-muted)] text-base md:text-lg mb-10">
              {candidate.g2kVeteran.intro}
            </p>

            {/* Roles */}
            <div className="flex flex-wrap gap-3 mb-10">
              {candidate.g2kVeteran.roles.map((role) => (
                <div
                  key={role.title}
                  className={`px-4 py-2 rounded-lg font-bold text-sm border ${
                    role.current
                      ? "bg-[var(--color-brand-700)] text-white border-[var(--color-brand-700)]"
                      : "bg-white text-[var(--color-brand-700)] border-[var(--color-brand-300)]"
                  }`}
                >
                  {role.current && (
                    <span className="mr-2 text-[var(--color-gold-400)] text-xs uppercase tracking-wider font-black">
                      Current ·{" "}
                    </span>
                  )}
                  {role.title}
                </div>
              ))}
            </div>

            {/* Achievement rail */}
            <div className="relative pl-6 border-l-2 border-[var(--color-brand-200)] space-y-6">
              {candidate.g2kVeteran.achievements.map((achievement, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[1.625rem] top-1 w-4 h-4 rounded-full bg-[var(--color-brand-700)] border-2 border-white shadow-sm" />
                  <p className="text-[var(--color-ink)] text-base leading-relaxed">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 md:py-20 bg-[var(--color-surface)]">
        <div className="container-site">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-[var(--color-brand-900)] mb-2">
              In the Field
            </h2>
            <div className="section-divider" />
          </div>
          <ImageGallery images={galleryImages} columns={3} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[var(--color-brand-900)]">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-black text-xl md:text-2xl mb-1">
              Convinced by the record?
            </p>
            <p className="text-white/60 text-sm">Explore the mission and three-pillar plan.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/mission"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-gold-400)] text-[var(--color-brand-900)] font-bold rounded-lg hover:bg-[var(--color-gold-300)] transition-colors text-sm"
            >
              Read the Mission <ArrowRight size={14} />
            </Link>
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white font-bold rounded-lg hover:bg-white/5 transition-colors text-sm"
            >
              Explore the Plan <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
