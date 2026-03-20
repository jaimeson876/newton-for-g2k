import { cn } from "@/lib/utils";

interface PageHeaderProps {
  badge?: string;
  heading: string;
  subheading?: string;
  center?: boolean;
  light?: boolean; // white text on dark bg
}

export default function PageHeader({
  badge,
  heading,
  subheading,
  center = false,
  light = false,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", center && "text-center")}>
      {badge && (
        <span className={cn("badge-green", light && "bg-white/20 text-white border border-white/30")}>
          {badge}
        </span>
      )}
      <h1
        className={cn(
          "text-3xl md:text-5xl lg:text-6xl font-black tracking-tight",
          light ? "text-white" : "text-[var(--color-brand-900)]"
        )}
      >
        {heading}
      </h1>
      {subheading && (
        <p
          className={cn(
            "text-base md:text-xl leading-relaxed max-w-2xl",
            center && "mx-auto",
            light ? "text-white/80" : "text-[var(--color-ink-muted)]"
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
