"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Send, CalendarDays, CheckCircle2 } from "lucide-react";
import ArrowMotif from "@/components/shared/ArrowMotif";

gsap.registerPlugin(ScrollTrigger);

const CALENDAR_LINK = "https://calendar.google.com/calendar/appointments/schedules/YOUR_SCHEDULE_ID";
const CALENDAR_CONFIGURED = !CALENDAR_LINK.includes("YOUR_SCHEDULE_ID");

type FormState = "idle" | "submitting" | "success" | "error";

export default function ReachOutPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", organisation: "", message: "" });

  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        ".reach-hero-text > *",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 }
      );
      // Form reveal
      gsap.fromTo(
        ".reach-form-col",
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".reach-form-col", start: "top 78%", once: true },
        }
      );
      gsap.fromTo(
        ".reach-info-col",
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".reach-info-col", start: "top 78%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setFormState("submitting");

    try {
      // Submit to Netlify Forms (visible in Netlify dashboard under Site > Forms)
      const body = new URLSearchParams({
        "form-name": "reach-out",
        name: form.name,
        email: form.email,
        organisation: form.organisation,
        message: form.message,
      });
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!res.ok) throw new Error("Request failed");
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-28 md:py-40"
        style={{ background: "var(--color-brand-950)" }}
      >
        {/* Arrow motif — top-right background */}
        <div className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.05]">
          <ArrowMotif size={480} color="var(--color-brand-vivid)" />
        </div>
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 30% 50%, rgba(29,184,75,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="container-site relative z-10">
          <div className="reach-hero-text max-w-3xl space-y-5">
            <span className="badge-green">Reach Out</span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
              }}
            >
              Leadership starts
              <br />
              with{" "}
              <span style={{ color: "var(--color-brand-vivid)" }}>listening.</span>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                maxWidth: "520px",
              }}
            >
              Your feedback is crucial to the development of this organisation.
              Every message is read. Every voice matters.
            </p>
          </div>
        </div>
      </section>

      {/* ── Two-column body ─────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: "var(--color-surface)" }}>
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* ── Left: context + schedule ────────────────────── */}
            <div className="reach-info-col lg:col-span-2 space-y-10">
              {/* Quote */}
              <div
                className="rounded-3xl p-8 space-y-4"
                style={{ background: "var(--color-brand-900)" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                    color: "var(--color-gold-400)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  &ldquo;I&apos;d love to hear from you.&rdquo;
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    fontSize: "0.88rem",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.7,
                  }}
                >
                  Whether you have a question about the plan, feedback on our
                  organisation, or just want to connect, Newton reads every
                  message personally.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-brand-vivid)",
                  }}
                >
                  Newton Harris
                </p>
              </div>

              {/* Schedule a call — only shown when CALENDAR_LINK is configured */}
              {CALENDAR_CONFIGURED && <div className="space-y-3">
                <p
                  style={{
                    fontFamily: "var(--font-condensed)",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-muted)",
                  }}
                >
                  Prefer to talk?
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    fontSize: "0.9rem",
                    color: "var(--color-ink)",
                    lineHeight: 1.6,
                  }}
                >
                  Book a time directly on Newton&apos;s calendar. 20-minute
                  slots available for delegates, chapter leaders, and members.
                </p>
                <a
                  href={CALENDAR_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 w-full px-6 py-4 rounded-2xl font-bold transition-all duration-300"
                  style={{
                    background: "var(--color-brand-900)",
                    color: "#fff",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    border: "1.5px solid rgba(29,184,75,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      borderColor: "var(--color-brand-vivid)",
                      boxShadow: "0 0 20px rgba(29,184,75,0.15)",
                      duration: 0.25,
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      borderColor: "rgba(29,184,75,0.25)",
                      boxShadow: "none",
                      duration: 0.25,
                    });
                  }}
                >
                  <CalendarDays size={18} style={{ color: "var(--color-brand-vivid)" }} />
                  <span className="flex-1">Schedule a Call</span>
                  <ArrowRight
                    size={15}
                    className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                  />
                </a>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    fontSize: "0.72rem",
                    color: "var(--color-ink-muted)",
                  }}
                >
                  Powered by Google Calendar. No account required to book.
                </p>
              </div>}
            </div>

            {/* ── Right: contact form ──────────────────────────── */}
            <div className="reach-form-col lg:col-span-3">
              {formState === "success" ? (
                <div
                  className="rounded-3xl p-10 flex flex-col items-center text-center space-y-5"
                  style={{ background: "white", border: "1.5px solid var(--color-border)" }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(29,184,75,0.1)" }}
                  >
                    <CheckCircle2 size={32} style={{ color: "var(--color-brand-vivid)" }} />
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "1.8rem",
                      color: "var(--color-brand-900)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Message received.
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 300,
                      fontSize: "1rem",
                      color: "var(--color-ink-muted)",
                      lineHeight: 1.7,
                      maxWidth: "360px",
                    }}
                  >
                    Thank you for reaching out. Newton will personally review your
                    message and respond shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormState("idle");
                      setForm({ name: "", email: "", organisation: "", message: "" });
                    }}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: "var(--color-brand-700)",
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  name="reach-out"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="rounded-3xl p-8 md:p-10 space-y-5"
                  style={{ background: "white", border: "1.5px solid var(--color-border)" }}
                >
                  <input type="hidden" name="form-name" value="reach-out" />
                  <input type="hidden" name="bot-field" />

                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                        color: "var(--color-brand-900)",
                        letterSpacing: "-0.02em",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Leave a message.
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 300,
                        fontSize: "0.85rem",
                        color: "var(--color-ink-muted)",
                      }}
                    >
                      All fields marked * are required.
                    </p>
                  </div>

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        style={{
                          fontFamily: "var(--font-condensed)",
                          fontWeight: 700,
                          fontSize: "0.65rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--color-ink-muted)",
                          display: "block",
                        }}
                      >
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Newton Harris"
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                        style={{
                          background: "var(--color-surface)",
                          border: "1.5px solid var(--color-border)",
                          fontFamily: "var(--font-sans)",
                          fontWeight: 400,
                          fontSize: "0.9rem",
                          color: "var(--color-ink)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--color-brand-vivid)";
                          e.target.style.boxShadow = "0 0 0 3px rgba(29,184,75,0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--color-border)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        style={{
                          fontFamily: "var(--font-condensed)",
                          fontWeight: 700,
                          fontSize: "0.65rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--color-ink-muted)",
                          display: "block",
                        }}
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                        style={{
                          background: "var(--color-surface)",
                          border: "1.5px solid var(--color-border)",
                          fontFamily: "var(--font-sans)",
                          fontWeight: 400,
                          fontSize: "0.9rem",
                          color: "var(--color-ink)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--color-brand-vivid)";
                          e.target.style.boxShadow = "0 0 0 3px rgba(29,184,75,0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--color-border)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  {/* Organisation */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="organisation"
                      style={{
                        fontFamily: "var(--font-condensed)",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--color-ink-muted)",
                        display: "block",
                      }}
                    >
                      Chapter / Organisation
                    </label>
                    <input
                      id="organisation"
                      name="organisation"
                      type="text"
                      value={form.organisation}
                      onChange={handleChange}
                      placeholder="e.g. Kingston Chapter, UTech"
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                      style={{
                        background: "var(--color-surface)",
                        border: "1.5px solid var(--color-border)",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 400,
                        fontSize: "0.9rem",
                        color: "var(--color-ink)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--color-brand-vivid)";
                        e.target.style.boxShadow = "0 0 0 3px rgba(29,184,75,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--color-border)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      style={{
                        fontFamily: "var(--font-condensed)",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--color-ink-muted)",
                        display: "block",
                      }}
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Share your thoughts, questions, or feedback…"
                      className="w-full px-4 py-3 rounded-xl outline-none resize-none transition-all"
                      style={{
                        background: "var(--color-surface)",
                        border: "1.5px solid var(--color-border)",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 300,
                        fontSize: "0.9rem",
                        color: "var(--color-ink)",
                        lineHeight: 1.65,
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--color-brand-vivid)";
                        e.target.style.boxShadow = "0 0 0 3px rgba(29,184,75,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--color-border)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  {formState === "error" && (
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                        fontSize: "0.83rem",
                        color: "#dc2626",
                      }}
                    >
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="group w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold transition-all duration-300 disabled:opacity-60"
                    style={{
                      background: "var(--color-brand-900)",
                      color: "#fff",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                    onMouseEnter={(e) => {
                      if (formState !== "submitting") {
                        gsap.to(e.currentTarget, {
                          background: "var(--color-brand-vivid)",
                          duration: 0.25,
                        });
                      }
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        background: "var(--color-brand-900)",
                        duration: 0.25,
                      });
                    }}
                  >
                    {formState === "submitting" ? (
                      <>
                        <span
                          className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send
                          size={15}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
