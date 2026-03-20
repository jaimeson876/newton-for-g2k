import { cn } from "@/lib/utils";

interface MetricCardProps {
  metric: string;
  className?: string;
}

export default function MetricCard({ metric, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg bg-white border border-[var(--color-border)]",
        className
      )}
    >
      <span className="shrink-0 mt-1 w-3 h-3 rounded-full bg-[var(--color-gold-400)]" />
      <p className="text-sm text-[var(--color-ink)] font-medium leading-relaxed">{metric}</p>
    </div>
  );
}
