"use client";

function SocialCard({
  href,
  icon,
  handle,
  label,
  bio,
  cta,
  accentColor,
  avatarStyle,
}: {
  href: string;
  icon: React.ReactNode;
  handle: string;
  label: string;
  bio: string;
  cta: string;
  accentColor: string;
  avatarStyle: React.CSSProperties;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-5 w-full rounded-3xl p-7 transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLElement).style.borderColor = accentColor;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
      }}
    >
      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={avatarStyle}
        >
          {icon}
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>
            Newton Harris
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
            {handle}
          </p>
        </div>
        <div className="ml-auto">
          <span
            className="px-4 py-1.5 rounded-full text-xs font-bold"
            style={{ background: "#fff", color: "#000", fontFamily: "var(--font-sans)" }}
          >
            {label}
          </span>
        </div>
      </div>

      {/* Bio */}
      <p style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 300,
        fontSize: "0.9rem",
        color: "rgba(255,255,255,0.55)",
        lineHeight: 1.7,
      }}>
        {bio}
      </p>

      {/* CTA */}
      <p style={{
        fontFamily: "var(--font-condensed)",
        fontWeight: 700,
        fontSize: "0.65rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: accentColor,
      }}>
        {cta}
      </p>
    </a>
  );
}

export default function TwitterFeed() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SocialCard
        href="https://x.com/NHarrisJM"
        handle="@NHarrisJM"
        label="Follow"
        bio="Candidate for G2K President 2026. Ministerial Advisor. Building the next generation of Jamaican leadership."
        cta="Follow on X for campaign updates"
        accentColor="rgba(255,255,255,0.4)"
        avatarStyle={{ background: "#000", border: "1px solid rgba(255,255,255,0.12)" }}
        icon={
          <svg viewBox="0 0 24 24" fill="white" style={{ width: 16, height: 16 }}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        }
      />
      <SocialCard
        href="https://www.instagram.com/newtonharrisjm/"
        handle="@newtonharrisjm"
        label="Follow"
        bio="Behind-the-scenes of the G2K 2026 campaign. Photos, moments, and updates from Newton Harris."
        cta="Follow on Instagram"
        accentColor="rgba(225,100,180,0.7)"
        avatarStyle={{ background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", border: "none" }}
        icon={
          <svg viewBox="0 0 24 24" fill="white" style={{ width: 16, height: 16 }}>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        }
      />
    </div>
  );
}
