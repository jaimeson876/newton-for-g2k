"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Video, Tv, FileText } from "lucide-react";
import type { Metadata } from "next";

gsap.registerPlugin(ScrollTrigger);

const SECTION_NAV = [
  { id: "photos", label: "Photos", Icon: Camera, color: "var(--color-brand-vivid)" },
  { id: "videos", label: "Videos", Icon: Video, color: "var(--color-gold-400)" },
  { id: "appearances", label: "Appearances", Icon: Tv, color: "var(--color-brand-vivid)" },
  { id: "writings", label: "Letters & Writings", Icon: FileText, color: "var(--color-gold-400)" },
];

const PHOTOS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  rowSpan: [2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2][i],
}));

const VIDEOS = Array.from({ length: 4 }, (_, i) => ({ id: i }));

const APPEARANCES = [
  { id: 0, outlet: "TVJ", title: "Morning Time Interview", date: "Coming Soon" },
  { id: 1, outlet: "CVM TV", title: "Rise Up Jamaica Panel", date: "Coming Soon" },
  { id: 2, outlet: "RJR News", title: "G2K Election Special", date: "Coming Soon" },
  { id: 3, outlet: "Nationwide", title: "All Angles Discussion", date: "Coming Soon" },
];

const WRITINGS = [
  {
    id: 0,
    title: "An Open Letter to G2K",
    excerpt: "A direct message from Newton Harris to every delegate, member, and young Jamaican who believes the next chapter belongs to them.",
    date: "Coming Soon",
  },
  {
    id: 1,
    title: "On the Future of Jamaican Youth",
    excerpt: "Reflections on the role of organised youth movements in shaping national policy and building a more competitive Jamaica.",
    date: "Coming Soon",
  },
  {
    id: 2,
    title: "Why I'm Running",
    excerpt: "The full account of the values, experiences, and sense of duty that brought Newton to this moment of service.",
    date: "Coming Soon",
  },
];

function SectionLabel({
  icon: Icon,
  label,
  color,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <Icon size={18} style={{ color }} />
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: "0.78rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        {label}
      </p>
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
    </div>
  );
}

export default function GalleryPage() {
  const photosRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);
  const appearancesRef = useRef<HTMLDivElement>(null);
  const writingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-card", {
        opacity: 0,
        y: 36,
        scale: 0.96,
        duration: 0.65,
        stagger: 0.045,
        ease: "power3.out",
        scrollTrigger: { trigger: photosRef.current, start: "top 82%", once: true },
      });

      gsap.from(".video-card", {
        opacity: 0,
        y: 28,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: videosRef.current, start: "top 82%", once: true },
      });

      gsap.from(".appearance-card", {
        opacity: 0,
        y: 28,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: appearancesRef.current, start: "top 82%", once: true },
      });

      gsap.from(".writing-card", {
        opacity: 0,
        y: 28,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: writingsRef.current, start: "top 82%", once: true },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: "var(--color-brand-950)", minHeight: "100vh" }}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 text-center px-4">
        <p
          className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          style={{
            background: "rgba(29,184,75,0.12)",
            color: "var(--color-brand-vivid)",
            fontFamily: "var(--font-sans)",
          }}
        >
          Campaign Trail
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(3.2rem, 9vw, 6.5rem)",
            color: "#fff",
            lineHeight: 0.93,
            letterSpacing: "-0.03em",
          }}
        >
          The Gallery
        </h1>
        <p
          className="mt-6 max-w-md mx-auto"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "1rem",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.8,
          }}
        >
          Photos, videos, public appearances, and writings from the movement.
        </p>
      </section>

      {/* ── Section anchor nav ──────────────────────────────────── */}
      <nav
        className="sticky z-40 border-b"
        style={{
          top: "64px",
          background: "rgba(3,12,5,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderColor: "rgba(29,184,75,0.08)",
        }}
      >
        <div className="container-site">
          <div className="flex items-center gap-1 overflow-x-auto py-3" style={{ scrollbarWidth: "none" }}>
            {SECTION_NAV.map(({ id, label, Icon, color }) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all hover:bg-white/8"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.07em",
                }}
                onMouseEnter={(e) => {
                  const icon = e.currentTarget.querySelector("svg");
                  if (icon) icon.style.color = color;
                  e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                }}
                onMouseLeave={(e) => {
                  const icon = e.currentTarget.querySelector("svg");
                  if (icon) icon.style.color = "";
                  e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                }}
              >
                <Icon size={13} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Photos ───────────────────────────────────────────────── */}
      <section id="photos" className="pt-20 pb-24 px-4" ref={photosRef}>
        <div className="container-site">
          <SectionLabel icon={Camera} label="Photos" color="var(--color-brand-vivid)" />
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gridAutoRows: "160px",
            }}
          >
            {PHOTOS.map((photo) => (
              <div
                key={photo.id}
                className="gallery-card rounded-xl overflow-hidden relative cursor-pointer group"
                style={{ gridRow: `span ${photo.rowSpan}` }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(${130 + photo.id * 17}deg, #0e2212 0%, #030C05 55%, rgba(29,184,75,0.04) 100%)`,
                  }}
                />
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{ border: "1px solid rgba(29,184,75,0.09)" }}
                />
                {/* Hover badge */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                    style={{
                      background: "rgba(29,184,75,0.12)",
                      border: "1px solid rgba(29,184,75,0.25)",
                      color: "var(--color-brand-vivid)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    Coming Soon
                  </span>
                </div>
                {/* Ghost number */}
                <div
                  className="absolute bottom-3 right-4 pointer-events-none select-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "2.5rem",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(29,184,75,0.07)",
                    lineHeight: 1,
                  }}
                >
                  {String(photo.id + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Videos ───────────────────────────────────────────────── */}
      <section
        id="videos"
        className="pt-4 pb-24 px-4"
        ref={videosRef}
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="container-site">
          <SectionLabel icon={Video} label="Videos" color="var(--color-gold-400)" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VIDEOS.map((v) => (
              <div
                key={v.id}
                className="video-card rounded-xl overflow-hidden relative cursor-pointer group"
                style={{ aspectRatio: "16/9" }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(${148 + v.id * 22}deg, #0e2212 0%, #030C05 100%)`,
                  }}
                />
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{ border: "1px solid rgba(245,197,24,0.1)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: "rgba(245,197,24,0.1)",
                      border: "1px solid rgba(245,197,24,0.25)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5"
                      style={{ marginLeft: "2px" }}
                    >
                      <path d="M5 3l14 9-14 9V3z" fill="rgba(245,197,24,0.75)" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: "0.58rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(245,197,24,0.4)",
                    }}
                  >
                    Coming Soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Public Appearances ───────────────────────────────────── */}
      <section
        id="appearances"
        className="pt-4 pb-24 px-4"
        ref={appearancesRef}
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="container-site">
          <SectionLabel icon={Tv} label="Public Appearances" color="var(--color-brand-vivid)" />
          <p
            className="mb-12 max-w-lg"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "0.92rem",
              color: "rgba(255,255,255,0.38)",
              lineHeight: 1.85,
            }}
          >
            TV interviews, panel discussions, and media appearances — watch Newton make the
            case for a better G2K.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {APPEARANCES.map((item) => (
              <div
                key={item.id}
                className="appearance-card rounded-2xl overflow-hidden relative cursor-pointer group"
                style={{
                  background: "rgba(13,31,16,0.55)",
                  border: "1px solid rgba(29,184,75,0.1)",
                }}
              >
                {/* Clip preview */}
                <div
                  className="relative w-full"
                  style={{
                    aspectRatio: "16/9",
                    background: "linear-gradient(155deg, #0e2212, #030C05)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: "rgba(29,184,75,0.1)",
                        border: "1px solid rgba(29,184,75,0.22)",
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-4 h-4"
                        style={{ marginLeft: "2px" }}
                      >
                        <path d="M5 3l14 9-14 9V3z" fill="rgba(29,184,75,0.65)" />
                      </svg>
                    </div>
                  </div>
                  {/* Outlet badge */}
                  <div className="absolute top-2 left-2">
                    <span
                      className="px-2 py-0.5 rounded font-bold"
                      style={{
                        background: "var(--color-brand-vivid)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.55rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#fff",
                      }}
                    >
                      {item.outlet}
                    </span>
                  </div>
                </div>
                {/* Meta */}
                <div className="p-4">
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "#fff",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="mt-1"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.68rem",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Letters & Writings ───────────────────────────────────── */}
      <section
        id="writings"
        className="pt-4 pb-32 px-4"
        ref={writingsRef}
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="container-site">
          <SectionLabel icon={FileText} label="Letters &amp; Writings" color="var(--color-gold-400)" />
          <p
            className="mb-12 max-w-lg"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "0.92rem",
              color: "rgba(255,255,255,0.38)",
              lineHeight: 1.85,
            }}
          >
            Open letters, essays, and published writings — Newton in his own words.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WRITINGS.map((piece) => (
              <div
                key={piece.id}
                className="writing-card rounded-2xl overflow-hidden relative cursor-pointer group"
                style={{
                  background: "rgba(13,31,16,0.45)",
                  border: "1px solid rgba(245,197,24,0.1)",
                }}
              >
                {/* Gold top bar */}
                <div
                  className="h-[3px] w-full"
                  style={{
                    background: "linear-gradient(to right, var(--color-gold-400), transparent)",
                  }}
                />
                <div className="p-7">
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: "rgba(245,197,24,0.07)",
                      border: "1px solid rgba(245,197,24,0.14)",
                    }}
                  >
                    <FileText size={18} style={{ color: "var(--color-gold-400)" }} />
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      color: "#fff",
                      lineHeight: 1.2,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {piece.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 300,
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.38)",
                      lineHeight: 1.8,
                    }}
                  >
                    {piece.excerpt}
                  </p>
                  <p
                    className="mt-5"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(245,197,24,0.38)",
                    }}
                  >
                    {piece.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
