"use client";

/**
 * WaveDivider — animated organic wave that flows between page sections.
 * Drop it between any two sections; use negative margin to bleed into both.
 *
 * fill  = colour that matches the section ABOVE (the wave reads as that section flowing down)
 * bg    = colour of the section BELOW (shows behind the transparent wave gaps)
 * flip  = reverse the wave so the fill matches the section BELOW instead
 */
export default function WaveDivider({
  fill = "#030C05",
  bg = "transparent",
  flip = false,
  height = 160,
  speed = "slow",
  className = "",
}: {
  fill?: string;
  bg?: string;
  flip?: boolean;
  height?: number;
  speed?: "slow" | "medium" | "fast";
  className?: string;
}) {
  const dur = speed === "slow" ? "24s" : speed === "fast" ? "12s" : "18s";
  const dur2 = speed === "slow" ? "17s" : speed === "fast" ? "9s" : "13s";

  // Two complete wave periods (viewBox 2880 wide) so translateX(-50%) = one seamless loop
  const path1 =
    "M0,90 C200,38 520,38 720,90 C920,142 1240,142 1440,90 C1640,38 1960,38 2160,90 C2360,142 2680,142 2880,90 L2880,160 L0,160 Z";
  const path2 =
    "M0,110 C280,55 560,55 720,110 C880,165 1160,165 1440,110 C1720,55 2000,55 2160,110 C2320,165 2600,165 2880,110 L2880,160 L0,160 Z";

  return (
    <div
      aria-hidden="true"
      className={`relative w-full pointer-events-none select-none overflow-visible ${className}`}
      style={{
        height: `${height}px`,
        background: bg,
        transform: flip ? "scaleY(-1)" : undefined,
        zIndex: 5,
      }}
    >
      {/* Secondary wave — slightly transparent, opposite scroll direction */}
      <svg
        viewBox="0 0 2880 160"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200%",
          height: "100%",
          fill,
          opacity: 0.38,
          animation: `wave-scroll-2 ${dur2} linear infinite reverse`,
          willChange: "transform",
        }}
      >
        <path d={path2} />
      </svg>

      {/* Primary wave — full opacity, scrolls forward */}
      <svg
        viewBox="0 0 2880 160"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200%",
          height: "100%",
          fill,
          opacity: 0.92,
          animation: `wave-scroll-1 ${dur} linear infinite`,
          willChange: "transform",
        }}
      >
        <path d={path1} />
      </svg>
    </div>
  );
}
