"use client";

import { cn } from "@/lib/utils";
import { List, AlignLeft } from "lucide-react";

interface ReadingModeToggleProps {
  mode: "summary" | "detail";
  onChange: (mode: "summary" | "detail") => void;
}

export default function ReadingModeToggle({ mode, onChange }: ReadingModeToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-1">
      <button
        onClick={() => onChange("summary")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all",
          mode === "summary"
            ? "bg-[var(--color-brand-700)] text-white shadow-sm"
            : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
        )}
        aria-pressed={mode === "summary"}
      >
        <List size={13} />
        Summary View
      </button>
      <button
        onClick={() => onChange("detail")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all",
          mode === "detail"
            ? "bg-[var(--color-brand-700)] text-white shadow-sm"
            : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
        )}
        aria-pressed={mode === "detail"}
      >
        <AlignLeft size={13} />
        Full Detail
      </button>
    </div>
  );
}
