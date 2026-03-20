"use client";

import { useState } from "react";
import { ChevronDown, Target, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tactic {
  name: string;
  detail: string;
}

interface Measurement {
  name: string;
  detail: string;
}

interface AccordionModuleProps {
  title: string;
  promise: string;
  tactics: Tactic[];
  measurements: Measurement[];
  summaryMode?: boolean;
  index: number;
}

export default function AccordionModule({
  title,
  promise,
  tactics,
  measurements,
  summaryMode = false,
  index,
}: AccordionModuleProps) {
  const [tacticOpen, setTacticOpen] = useState(false);
  const [measureOpen, setMeasureOpen] = useState(false);

  return (
    <div className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-white transition-shadow hover:shadow-md">
      {/* Module header */}
      <div className="p-5 md:p-7 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-9 h-9 rounded-full bg-[var(--color-brand-700)] text-white flex items-center justify-center font-black text-sm">
            {String.fromCharCode(64 + index)}
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-black text-[var(--color-brand-900)] mb-2">
              {title}
            </h3>
            <p className="text-[var(--color-ink)] leading-relaxed text-sm md:text-base">
              {promise}
            </p>
          </div>
        </div>
      </div>

      {/* Expand panels — hidden in summary mode */}
      {!summaryMode && (
        <div className="divide-y divide-[var(--color-border)]">
          {/* Tactical Strategy */}
          <AccordionPanel
            label="Tactical Strategy"
            sublabel="How to achieve"
            icon={<Lightbulb size={15} className="text-[var(--color-brand-600)]" />}
            open={tacticOpen}
            onToggle={() => setTacticOpen(!tacticOpen)}
          >
            <ul className="space-y-4">
              {tactics.map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 mt-1 w-5 h-5 rounded bg-[var(--color-brand-100)] text-[var(--color-brand-700)] flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-[var(--color-ink)] text-sm">{t.name}</p>
                    <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed mt-0.5">
                      {t.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </AccordionPanel>

          {/* Measurement */}
          <AccordionPanel
            label="Measurement"
            sublabel="What they will be measured against"
            icon={<Target size={15} className="text-[var(--color-gold-600)]" />}
            open={measureOpen}
            onToggle={() => setMeasureOpen(!measureOpen)}
          >
            <ul className="space-y-4">
              {measurements.map((m, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 mt-1 w-2 h-2 rounded-full bg-[var(--color-gold-400)] mt-2" />
                  <div>
                    <p className="font-bold text-[var(--color-ink)] text-sm">{m.name}</p>
                    <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed mt-0.5">
                      {m.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </AccordionPanel>
        </div>
      )}
    </div>
  );
}

// ─── Inner panel ─────────────────────────────────────────────────
function AccordionPanel({
  label,
  sublabel,
  icon,
  open,
  onToggle,
  children,
}: {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 md:px-7 py-4 text-left hover:bg-[var(--color-surface)] transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <span className="font-bold text-sm text-[var(--color-ink)]">{label}</span>
            <span className="text-[var(--color-ink-muted)] text-xs ml-2">({sublabel})</span>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={cn(
            "text-[var(--color-ink-muted)] transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="px-5 md:px-7 pb-6 pt-2 bg-[var(--color-surface)]">
          {children}
        </div>
      )}
    </div>
  );
}
