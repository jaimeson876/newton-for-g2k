import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { messageToG2K } from "@/content";

export const metadata: Metadata = {
  title: "A Message to G2K",
  description:
    "Fellow delegates, the G2K Presidency is an operational post, not a symbolic milestone. Newton is your solution.",
};

export default function MessageToG2KPage() {
  return (
    <div>
      {/* Sparse hero — matches the emotional weight of the message */}
      <section className="bg-[var(--color-brand-950)] py-24 md:py-36">
        <div className="container-site">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="badge-green">IV.</span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              {messageToG2K.heading}
            </h1>
          </div>
        </div>
      </section>

      {/* Letter */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-site">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-8">
              {messageToG2K.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-[var(--color-ink)] text-lg md:text-xl leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Closing */}
            <div className="mt-16 space-y-3">
              <div className="section-divider" />
              <p className="text-[var(--color-brand-900)] font-black text-2xl md:text-3xl">
                {messageToG2K.closingLine}
              </p>
              <p className="text-[var(--color-gold-600)] font-black text-lg tracking-widest uppercase">
                {messageToG2K.closingTagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
          <p className="text-[var(--color-ink)] font-bold text-lg text-center md:text-left">
            Explore the full plan behind this commitment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-brand-700)] text-white font-bold rounded-lg hover:bg-[var(--color-brand-800)] transition-colors text-sm"
            >
              The Plan <ArrowRight size={14} />
            </Link>
            <Link
              href="/manifesto"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--color-brand-300)] text-[var(--color-brand-700)] font-bold rounded-lg hover:bg-[var(--color-brand-50)] transition-colors text-sm"
            >
              <FileText size={14} /> Full Manifesto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
