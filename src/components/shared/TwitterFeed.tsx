"use client";

export default function TwitterFeed() {
  return (
    <a
      href="https://x.com/NHarrisJM"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-5 w-full rounded-3xl p-8 transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(29,184,75,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
      }}
    >
      {/* X logo + handle */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "#000", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <svg viewBox="0 0 24 24" fill="white" style={{ width: 16, height: 16 }}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>
            Newton Harris
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>
            @NHarrisJM
          </p>
        </div>
        <div className="ml-auto">
          <span
            className="px-4 py-1.5 rounded-full text-xs font-bold"
            style={{ background: "#fff", color: "#000", fontFamily: "var(--font-sans)" }}
          >
            Follow
          </span>
        </div>
      </div>

      {/* Bio line */}
      <p style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 300,
        fontSize: "0.9rem",
        color: "rgba(255,255,255,0.55)",
        lineHeight: 1.7,
      }}>
        Candidate for G2K President 2026. Ministerial Advisor. Building the
        next generation of Jamaican leadership.
      </p>

      {/* CTA hint */}
      <p style={{
        fontFamily: "var(--font-condensed)",
        fontWeight: 700,
        fontSize: "0.65rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "var(--color-brand-vivid)",
      }}>
        Follow on X for campaign updates
      </p>
    </a>
  );
}
