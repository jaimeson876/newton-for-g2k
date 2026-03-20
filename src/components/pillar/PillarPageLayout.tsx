"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AccordionModule from "@/components/shared/AccordionModule";
import StickyPillarNav from "@/components/shared/StickyPillarNav";
import ReadingModeToggle from "@/components/shared/ReadingModeToggle";
import MetricCard from "@/components/shared/MetricCard";
import ImageGallery, { type GalleryImage } from "@/components/shared/ImageGallery";

interface Module {
  id: string;
  title: string;
  promise: string;
  tactics: { name: string; detail: string }[];
  measurements: { name: string; detail: string }[];
}

interface PillarPageLayoutProps {
  pillarNumber: number;
  heading: string;
  intro: string;
  boldStatement?: string;
  keyTargets?: string[];
  modules: Module[];
  prevPillar?: { label: string; href: string };
  nextPillar?: { label: string; href: string };
  galleryImages?: GalleryImage[];
}

export default function PillarPageLayout({
  pillarNumber,
  heading,
  intro,
  boldStatement,
  keyTargets,
  modules,
  prevPillar,
  nextPillar,
  galleryImages = [],
}: PillarPageLayoutProps) {
  const [readingMode, setReadingMode] = useState<"summary" | "detail">("detail");

  const navItems = modules.map((m) => ({ id: m.id, label: m.title }));

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--color-brand-900)] py-20 md:py-28">
        <div className="container-site">
          <div className="max-w-3xl space-y-4">
            <Link
              href="/plan"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm font-medium transition-colors"
            >
              <ArrowLeft size={14} /> The Plan
            </Link>
            <span className="badge-green">Pillar {pillarNumber}</span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              {heading}
            </h1>
            <div className="section-divider" />
            <p className="text-white/75 text-base md:text-lg leading-relaxed">{intro}</p>
            {boldStatement && (
              <p className="text-white font-black text-base md:text-lg">{boldStatement}</p>
            )}
          </div>
        </div>
      </section>

      {/* Key targets sidebar (Pillar 3) */}
      {keyTargets && keyTargets.length > 0 && (
        <section className="bg-[var(--color-brand-950)] py-8">
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <p className="text-[var(--color-gold-400)] font-black text-sm uppercase tracking-widest shrink-0">
                Key Targets:
              </p>
              <div className="flex flex-wrap gap-2">
                {keyTargets.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-white/10 border border-white/20 text-white text-sm rounded-lg font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sticky section nav */}
      <StickyPillarNav items={navItems} />

      {/* Reading mode toggle */}
      <div className="bg-white border-b border-[var(--color-border)] py-3">
        <div className="container-site flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[var(--color-ink-muted)] text-sm">
            {modules.length} initiative{modules.length !== 1 ? "s" : ""} in this pillar
          </p>
          <ReadingModeToggle mode={readingMode} onChange={setReadingMode} />
        </div>
      </div>

      {/* Modules */}
      <section className="py-12 md:py-16 bg-[var(--color-surface)]">
        <div className="container-site space-y-8">
          {modules.map((mod, i) => (
            <div key={mod.id} id={mod.id} className="scroll-mt-32">
              <AccordionModule
                title={mod.title}
                promise={mod.promise}
                tactics={mod.tactics}
                measurements={mod.measurements}
                summaryMode={readingMode === "summary"}
                index={i + 1}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Gallery (if images provided) */}
      {galleryImages.length > 0 && (
        <section className="py-14 bg-white">
          <div className="container-site">
            <h2 className="text-xl font-black text-[var(--color-brand-900)] mb-6">
              Gallery
            </h2>
            <ImageGallery images={galleryImages} />
          </div>
        </section>
      )}

      {/* Pillar nav */}
      <section className="py-10 bg-white border-t border-[var(--color-border)]">
        <div className="container-site flex flex-col sm:flex-row items-stretch gap-4">
          {prevPillar && (
            <Link
              href={prevPillar.href}
              className="flex-1 flex items-center gap-3 p-5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-brand-400)] hover:shadow-md transition-all group"
            >
              <ArrowLeft size={16} className="text-[var(--color-ink-muted)] group-hover:text-[var(--color-brand-700)] transition-colors shrink-0" />
              <div>
                <p className="text-xs text-[var(--color-ink-muted)] mb-0.5">Previous</p>
                <p className="font-bold text-[var(--color-brand-900)] text-sm">{prevPillar.label}</p>
              </div>
            </Link>
          )}
          {nextPillar && (
            <Link
              href={nextPillar.href}
              className="flex-1 flex items-center justify-end gap-3 p-5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-brand-400)] hover:shadow-md transition-all group text-right"
            >
              <div>
                <p className="text-xs text-[var(--color-ink-muted)] mb-0.5">Next</p>
                <p className="font-bold text-[var(--color-brand-900)] text-sm">{nextPillar.label}</p>
              </div>
              <ArrowRight size={16} className="text-[var(--color-ink-muted)] group-hover:text-[var(--color-brand-700)] transition-colors shrink-0" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
