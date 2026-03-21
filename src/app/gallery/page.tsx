"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Video, Tv, FileText, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ArrowMotif from "@/components/shared/ArrowMotif";
gsap.registerPlugin(ScrollTrigger);

const SECTION_NAV = [
  { id: "photos", label: "Photos", Icon: Camera, color: "var(--color-brand-vivid)" },
  { id: "videos", label: "Videos", Icon: Video, color: "var(--color-gold-400)" },
  { id: "appearances", label: "Appearances", Icon: Tv, color: "var(--color-brand-vivid)" },
  { id: "writings", label: "Letters & Writings", Icon: FileText, color: "var(--color-gold-400)" },
];

// span: 2 = tall cell, 1 = standard cell
const PHOTOS = [
  { src: "1B5F4013-1047-4732-AEF8-E83189C7BFEF.jpg", span: 2 },
  { src: "2c280ccf-1535-4f5d-92c0-56727e2206b9.jpg", span: 1 },
  { src: "350cd2f2-1807-4dd4-ab23-3c8497856304.jpg", span: 1 },
  { src: "IMG_0023.jpg", span: 2 },
  { src: "IMG_0767.jpg", span: 1 },
  { src: "IMG_0830.jpg", span: 1 },
  { src: "IMG_1690.jpg", span: 2 },
  { src: "IMG_2304.jpg", span: 1 },
  { src: "IMG_2332.jpg", span: 1 },
  { src: "IMG_2335.jpg", span: 2 },
  { src: "IMG_2337.jpg", span: 1 },
  { src: "IMG_2748.jpg", span: 1 },
  { src: "IMG_3516.jpg", span: 2 },
  { src: "IMG_4708.jpg", span: 1 },
  { src: "IMG_4725.jpg", span: 1 },
  { src: "IMG_5089.jpg", span: 2 },
  { src: "IMG_5094.jpg", span: 1 },
  { src: "IMG_5160.jpg", span: 1 },
  { src: "IMG_5258.jpg", span: 2 },
  { src: "IMG_5324.jpg", span: 1 },
  { src: "IMG_5330.jpg", span: 1 },
  { src: "IMG_5557.jpg", span: 2 },
  { src: "IMG_5988.jpg", span: 1 },
  { src: "IMG_6102.jpg", span: 1 },
  { src: "IMG_6492.JPG", span: 2 },
  { src: "IMG_6735.jpg", span: 1 },
  { src: "IMG_7161.jpg", span: 1 },
  { src: "IMG_7325.jpg", span: 2 },
  { src: "IMG_7568.jpg", span: 1 },
  { src: "IMG_7630.jpg", span: 1 },
  { src: "IMG_7642.jpg", span: 2 },
  { src: "IMG_7735.jpg", span: 1 },
  { src: "IMG_7861.PNG", span: 1 },
  { src: "IMG_8054.jpg", span: 2 },
  { src: "IMG_8794.jpg", span: 1 },
  { src: "IMG_8812.jpg", span: 1 },
  { src: "IMG_8837.JPG", span: 2 },
  { src: "IMG_8864.jpg", span: 1 },
  { src: "IMG_8871.jpg", span: 1 },
  { src: "IMG_8919.jpg", span: 2 },
  { src: "IMG_8925.jpg", span: 1 },
  { src: "IMG_8961.jpg", span: 1 },
  { src: "IMG_8971.jpg", span: 2 },
  { src: "IMG_8973.jpg", span: 1 },
  { src: "IMG_8995.JPG", span: 1 },
  { src: "b94f35f6-724c-4a86-8a61-53dd22b66a47.jpg", span: 2 },
  { src: "d3ca7042-f6a7-4323-a93c-473798d04bbe.jpg", span: 1 },
  { src: "f00e465f-ec89-4807-9879-cd4d353ccba6.jpg", span: 1 },
  { src: "f2eb6b68-d8e1-4c0d-8f41-4b95277eed96.jpg", span: 2 },
];

const DRIVE = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

// Short clips / social content
const CLIPS = [
  { title: "The Youth Perspective", driveId: "1Fn4S_qIEbAClb-q9Z0U5k79twNRjtqPT" },
  { title: "Young People See The Change", driveId: "138IrnX6kRP20Ut3-5WUM8AsxwLqssnPS" },
  { title: "Youth Opportunities", driveId: "1mwe3aJECXN56WVaMp7YY_t4icbsXIm6T" },
  { title: "The Youth Understand", driveId: "1c41Yq_RJcb802pj_eDquwyN3NE7qKn6U" },
  { title: "Passing Grade For Minister", driveId: "1mRJ2EChkSFNi4HkW6lgj8oZF1fQjZx2X" },
  { title: "The Youth Perspective (Alt)", driveId: "1-dCFUIDaHiP9pIleCGgmr1TSf0uBMSd0" },
];

// CVM TV appearances
const APPEARANCES = [
  { id: 0, outlet: "CVM TV", title: "NHT Role in the Budget", driveId: "1zcClE-qr2GJ8VNYvWzMCEqmGo6bDRClT" },
  { id: 1, outlet: "CVM TV", title: "PM Budget Review", driveId: "1_LJJ7GXs23oia1a-LtToIKoTo-miThTl" },
  { id: 2, outlet: "CVM TV", title: "National Housing Trust", driveId: "1u2pJ8caKu8V5bsBZMsuxSdqnXrAJoihS" },
  { id: 3, outlet: "CVM TV", title: "Budget Presentation Response", driveId: "1PqIIf7bD63atXz-lM3B8bANQdF88F508" },
  { id: 4, outlet: "CVM TV", title: "NaRRA Discussion", driveId: "1OSlp-4lh-sUfkphPwuyPZvEL1e0tGp7L" },
  { id: 5, outlet: "CVM TV", title: "Housing Supply", driveId: "1kDypcCmkuxlM2XoA8PiA8GGq5aiNY1le" },
  { id: 6, outlet: "CVM TV", title: "Strong Economy", driveId: "1cqR2EuZ76WxfYgGNKLhAb3ahSSzmWuIT" },
  { id: 7, outlet: "CVM TV", title: "NHT Policy Analysis", driveId: "1UNyX8uXk4EW6WPWRAcf7Bwc8yeH1t8Iy" },
  { id: 8, outlet: "CVM TV", title: "Cuba Relations", driveId: "1R2zmUJNGOVw8Os6Vi44BWtfj9Y-_QRRT" },
];

const WRITING_PLACEHOLDERS = [
  {
    slug: null,
    title: "An Open Letter to G2K",
    excerpt: "A direct message from Newton Harris to every delegate, member, and young Jamaican who believes the next chapter belongs to them.",
    date: null,
  },
  {
    slug: null,
    title: "On the Future of Jamaican Youth",
    excerpt: "Reflections on the role of organised youth movements in shaping national policy and building a more competitive Jamaica.",
    date: null,
  },
  {
    slug: null,
    title: "Why I'm Running",
    excerpt: "The full account of the values, experiences, and sense of duty that brought Newton to this moment of service.",
    date: null,
  },
];

// ─── Section label ────────────────────────────────────────────────
function SectionLabel({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <Icon size={18} style={{ color }} />
      <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
        {label}
      </p>
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
    </div>
  );
}

// ─── Photo lightbox ───────────────────────────────────────────────
function Lightbox({ index, onClose, onPrev, onNext }: { index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (panelRef.current) gsap.fromTo(panelRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.28, ease: "power3.out" });
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (imgRef.current) gsap.fromTo(imgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: "power2.out" });
  }, [index]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  const photo = PHOTOS[index];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: "rgba(3,12,5,0.97)", backdropFilter: "blur(12px)" }} onClick={onClose}>
      <div className="absolute top-5 left-1/2 -translate-x-1/2" style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
        {index + 1} / {PHOTOS.length}
      </div>
      <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10" style={{ color: "rgba(255,255,255,0.6)", zIndex: 10 }} aria-label="Close">
        <X size={20} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:bg-white/10" style={{ color: "rgba(255,255,255,0.7)", zIndex: 10 }} aria-label="Previous photo">
        <ChevronLeft size={24} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:bg-white/10" style={{ color: "rgba(255,255,255,0.7)", zIndex: 10 }} aria-label="Next photo">
        <ChevronRight size={24} />
      </button>
      <div ref={panelRef} className="relative flex items-center justify-center" style={{ maxWidth: "90vw", maxHeight: "88vh", opacity: 0 }} onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imgRef} src={`/images/gallery/photos/${photo.src}`} alt={`Campaign photo ${index + 1}`} style={{ maxWidth: "90vw", maxHeight: "88vh", objectFit: "contain", borderRadius: "16px", boxShadow: "0 32px 96px rgba(0,0,0,0.75)" }} />
        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ border: "1px solid rgba(29,184,75,0.18)" }} />
      </div>
    </div>
  );
}

// ─── Video modal ──────────────────────────────────────────────────
function VideoModal({ src, title, outlet, onClose }: { src: string; title: string; outlet: string; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelRef.current) gsap.fromTo(panelRef.current, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.28, ease: "power3.out" });
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4" style={{ background: "rgba(3,12,5,0.97)", backdropFilter: "blur(12px)" }} onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10" style={{ color: "rgba(255,255,255,0.6)" }} aria-label="Close">
        <X size={20} />
      </button>
      <div ref={panelRef} className="w-full" style={{ maxWidth: "860px", opacity: 0 }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded font-bold text-white" style={{ background: "var(--color-brand-vivid)", fontFamily: "var(--font-sans)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {outlet}
          </span>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "rgba(255,255,255,0.85)" }}>{title}</p>
        </div>
        <video controls autoPlay className="w-full rounded-2xl" style={{ background: "#000", maxHeight: "70vh", boxShadow: "0 32px 96px rgba(0,0,0,0.75)", border: "1px solid rgba(29,184,75,0.15)" }}>
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────
export default function GalleryPage() {
  const photosRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);
  const appearancesRef = useRef<HTMLDivElement>(null);
  const writingsRef = useRef<HTMLDivElement>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoModal, setVideoModal] = useState<{ src: string; title: string; outlet: string } | null>(null);
  const [writings, setWritings] = useState(WRITING_PLACEHOLDERS as { slug: string | null; title: string; excerpt: string; date: string | null }[]);

  useEffect(() => {
    fetch("/api/letters")
      .then((r) => r.json())
      .then((data: { slug: string; title: string; excerpt: string; date: string }[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setWritings(data.slice(0, 3).map((l) => ({ slug: l.slug, title: l.title, excerpt: l.excerpt, date: l.date })));
        }
      })
      .catch(() => {});
  }, []);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() => setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + PHOTOS.length) % PHOTOS.length)), []);
  const nextPhoto = useCallback(() => setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % PHOTOS.length)), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-card", { opacity: 0, y: 36, scale: 0.96, duration: 0.65, stagger: 0.045, ease: "power3.out", scrollTrigger: { trigger: photosRef.current, start: "top 82%", once: true } });
      gsap.from(".video-card", { opacity: 0, y: 28, duration: 0.55, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: videosRef.current, start: "top 82%", once: true } });
      gsap.from(".appearance-card", { opacity: 0, y: 28, duration: 0.55, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: appearancesRef.current, start: "top 82%", once: true } });
      gsap.from(".writing-card", { opacity: 0, y: 28, duration: 0.55, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: writingsRef.current, start: "top 82%", once: true } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: "var(--color-brand-950)", minHeight: "100vh" }}>

      {lightboxIndex !== null && (
        <Lightbox index={lightboxIndex} onClose={closeLightbox} onPrev={prevPhoto} onNext={nextPhoto} />
      )}

      {videoModal && (
        <VideoModal src={videoModal.src} title={videoModal.title} outlet={videoModal.outlet} onClose={() => setVideoModal(null)} />
      )}

      {/* Hero */}
      <section className="relative pt-28 pb-20 text-center px-4 overflow-hidden">
        <div className="absolute right-0 top-0 pointer-events-none select-none opacity-[0.03]">
          <ArrowMotif size={500} color="var(--color-brand-vivid)" />
        </div>
        <p className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6" style={{ background: "rgba(29,184,75,0.12)", color: "var(--color-brand-vivid)", fontFamily: "var(--font-sans)" }}>
          Campaign Trail
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(3.2rem, 9vw, 6.5rem)", color: "#fff", lineHeight: 0.93, letterSpacing: "-0.03em" }}>
          The Gallery
        </h1>
        <p className="mt-6 max-w-md mx-auto" style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>
          Photos, videos, public appearances, and writings from the movement.
        </p>
      </section>

      {/* Section anchor nav */}
      <nav className="sticky z-40 border-b" style={{ top: "64px", background: "rgba(3,12,5,0.92)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderColor: "rgba(29,184,75,0.08)" }}>
        <div className="container-site">
          <div className="flex items-center gap-1 overflow-x-auto py-3" style={{ scrollbarWidth: "none" }}>
            {SECTION_NAV.map(({ id, label, Icon, color }) => (
              <a key={id} href={`#${id}`} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all hover:bg-white/8"
                style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.5)", letterSpacing: "0.07em" }}
                onMouseEnter={(e) => { const icon = e.currentTarget.querySelector("svg"); if (icon) icon.style.color = color; e.currentTarget.style.color = "rgba(255,255,255,0.9)"; }}
                onMouseLeave={(e) => { const icon = e.currentTarget.querySelector("svg"); if (icon) icon.style.color = ""; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
              >
                <Icon size={13} />{label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Photos */}
      <section id="photos" className="pt-20 pb-24 px-4" ref={photosRef}>
        <div className="container-site">
          <SectionLabel icon={Camera} label="Photos" color="var(--color-brand-vivid)" />
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gridAutoRows: "160px" }}>
            {PHOTOS.map((photo, i) => (
              <div key={photo.src} className="gallery-card rounded-xl overflow-hidden relative cursor-pointer group" style={{ gridRow: `span ${photo.span}` }} onClick={() => openLightbox(i)}>
                <div className="absolute inset-0 img-shimmer" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/gallery/photos/${photo.src}`} alt={`Campaign photo ${i + 1}`} className="absolute inset-0 w-full h-full" style={{ objectFit: "cover", opacity: 0, transition: "opacity 0.55s ease" }} loading="lazy" onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; }} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(3,12,5,0.5) 0%, transparent 55%)" }} />
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[500ms]" style={{ background: "rgba(29,184,75,0.10)" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(3,12,5,0.65)", border: "1.5px solid rgba(29,184,75,0.75)", boxShadow: "0 0 20px rgba(29,184,75,0.3)" }}>
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                      <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3m8 0h3a2 2 0 002-2v-3" stroke="rgba(29,184,75,1)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="card-border-ring absolute inset-0 rounded-xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section id="videos" className="pt-4 pb-24 px-4" ref={videosRef} style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container-site">
          <SectionLabel icon={Video} label="Videos" color="var(--color-gold-400)" />

          {/* Campaign launch — featured */}
          <div className="video-card rounded-2xl overflow-hidden relative mb-6" style={{ border: "1px solid rgba(245,197,24,0.14)", background: "#030C05", maxWidth: "860px" }}>
            <div className="px-5 pt-4 pb-2 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded font-bold text-white" style={{ background: "var(--color-gold-400)", color: "var(--color-brand-900)", fontFamily: "var(--font-sans)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Launch
              </span>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Campaign Launch — March 18, 2026</p>
            </div>
            <iframe
              src={DRIVE("1rJkMvqsJLf_cLbfjLBMbQJCRjTDv2Cla")}
              className="w-full block"
              style={{ height: "480px", border: "none", background: "#000" }}
              allow="autoplay"
              allowFullScreen
            />
          </div>

          {/* Short clips grid */}
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>
            Short Clips
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CLIPS.map((clip, i) => (
              <div key={i} className="video-card rounded-xl overflow-hidden" style={{ background: "linear-gradient(148deg, #0e2212, #030C05)", border: "1px solid rgba(245,197,24,0.08)" }}>
                <iframe
                  src={DRIVE(clip.driveId)}
                  className="w-full block"
                  style={{ aspectRatio: "16/9", border: "none", background: "#000" }}
                  allow="autoplay"
                  allowFullScreen
                />
                <div className="px-3 py-2">
                  <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.72rem", color: "rgba(255,255,255,0.6)" }}>{clip.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Public Appearances */}
      <section id="appearances" className="pt-4 pb-24 px-4" ref={appearancesRef} style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container-site">
          <SectionLabel icon={Tv} label="Public Appearances" color="var(--color-brand-vivid)" />
          <p className="mb-12 max-w-lg" style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.92rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.85 }}>
            TV interviews and panel discussions. Watch Newton make the case for a better Jamaica.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {APPEARANCES.map((item) => (
              <div
                key={item.id}
                className="appearance-card rounded-2xl overflow-hidden"
                style={{ background: "rgba(13,31,16,0.55)", border: "1px solid rgba(29,184,75,0.1)" }}
              >
                <iframe
                  src={DRIVE(item.driveId)}
                  className="w-full block"
                  style={{ aspectRatio: "16/9", border: "none", background: "#000" }}
                  allow="autoplay"
                  allowFullScreen
                />
                <div className="px-4 py-3 flex items-center gap-2">
                  <span className="shrink-0 px-2 py-0.5 rounded font-bold" style={{ background: "var(--color-brand-vivid)", fontFamily: "var(--font-sans)", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff" }}>
                    {item.outlet}
                  </span>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem", color: "#fff", lineHeight: 1.2 }}>
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Letters & Writings */}
      <section id="writings" className="pt-4 pb-32 px-4" ref={writingsRef} style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container-site">
          <SectionLabel icon={FileText} label="Letters &amp; Writings" color="var(--color-gold-400)" />
          <p className="mb-12 max-w-lg" style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.92rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.85 }}>
            Open letters, essays, and published writings. Newton in his own words.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {writings.map((piece, i) => (
              <div key={piece.slug ?? i} className="writing-card rounded-2xl overflow-hidden relative" style={{ background: "rgba(13,31,16,0.45)", border: "1px solid rgba(245,197,24,0.1)" }}>
                <div className="h-[3px] w-full" style={{ background: "linear-gradient(to right, var(--color-gold-400), transparent)" }} />
                <div className="p-7">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: "rgba(245,197,24,0.07)", border: "1px solid rgba(245,197,24,0.14)" }}>
                    <FileText size={18} style={{ color: "var(--color-gold-400)" }} />
                  </div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem", color: "#fff", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                    {piece.title}
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "0.85rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.8 }}>
                    {piece.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,197,24,0.38)" }}>
                      {piece.date ? new Date(piece.date).toLocaleDateString("en-JM", { year: "numeric", month: "short", day: "numeric" }) : "Coming Soon"}
                    </p>
                    {piece.slug && (
                      <Link href={`/letters/${piece.slug}`} className="text-xs font-semibold flex items-center gap-1 transition-opacity hover:opacity-70" style={{ color: "var(--color-gold-400)", fontFamily: "var(--font-sans)" }}>
                        Read <ArrowRight size={11} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/letters" className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:opacity-85" style={{ background: "rgba(245,197,24,0.08)", border: "1px solid rgba(245,197,24,0.2)", color: "var(--color-gold-400)", fontFamily: "var(--font-sans)", fontWeight: 600 }}>
              <FileText size={14} />
              Read all letters and articles
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
