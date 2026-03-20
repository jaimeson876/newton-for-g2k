"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { X, Send, MessageCircle, Loader } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What is Newton's key commitment to members?",
  "What are the three pillars of Newton's plan?",
  "How will Newton improve G2K's finances?",
  "What is Newton's professional background?",
];

export default function ManifestoChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");

  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom — use scrollTop directly so Lenis doesn't interfere
  const scrollToBottom = useCallback(() => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText, scrollToBottom]);

  // Panel open/close animation
  useEffect(() => {
    if (!panelRef.current) return;
    if (open) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
      );
      setTimeout(() => inputRef.current?.focus(), 350);
    } else {
      gsap.to(panelRef.current, {
        opacity: 0, y: 16, scale: 0.97,
        duration: 0.2, ease: "power2.in"
      });
    }
  }, [open]);

  // Button pulse on mount
  useEffect(() => {
    if (!buttonRef.current) return;
    gsap.fromTo(
      buttonRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", delay: 2 }
    );
  }, []);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setStreamingText("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              setMessages((prev) => [
                ...prev,
                { role: "assistant", content: accumulated },
              ]);
              setStreamingText("");
              setLoading(false);
              return;
            }
            try {
              const parsed = JSON.parse(data) as { text: string };
              accumulated += parsed.text;
              setStreamingText(accumulated);
            } catch {
              // ignore parse errors on partial chunks
            }
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again.",
        },
      ]);
      setLoading(false);
      setStreamingText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* ── Floating Button ─────────────────────────────────────── */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Ask Newton's AI"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95"
        style={{
          background: "var(--color-brand-vivid)",
          boxShadow: "0 8px 32px rgba(29,184,75,0.45)",
          opacity: 0,
        }}
      >
        {open
          ? <X size={20} color="#fff" />
          : <MessageCircle size={20} color="#fff" />
        }
      </button>

      {/* ── Chat Panel ──────────────────────────────────────────── */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-24 right-6 z-50 flex flex-col rounded-3xl overflow-hidden shadow-2xl"
          style={{
            width: "min(92vw, 400px)",
            height: "min(80vh, 560px)",
            background: "var(--color-brand-950)",
            border: "1px solid rgba(29,184,75,0.2)",
            opacity: 0,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-5 py-4 shrink-0"
            style={{ borderBottom: "1px solid rgba(29,184,75,0.12)" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0"
              style={{ background: "var(--color-brand-vivid)" }}
            >
              <MessageCircle size={14} />
            </div>
            <div>
              <p
                className="text-white leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                }}
              >
                Ask Newton&apos;s Campaign
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  fontSize: "0.68rem",
                  color: "rgba(255,255,255,0.4)",
                  marginTop: "2px",
                }}
              >
                Answers strictly from the manifesto
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-white/40 hover:text-white/80 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages — data-lenis-prevent stops Lenis from blocking this scroll */}
          <div
            ref={messagesContainerRef}
            data-lenis-prevent
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide"
          >
            {messages.length === 0 && !loading && (
              <div className="space-y-3">
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.6,
                  }}
                >
                  I can answer questions about Newton&apos;s manifesto, his three-pillar plan, background, and vision for G2K.
                </p>
                <div className="flex flex-col gap-2 pt-1">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="text-left px-3 py-2 rounded-xl border transition-colors text-sm"
                      style={{
                        borderColor: "rgba(29,184,75,0.25)",
                        color: "rgba(255,255,255,0.65)",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 400,
                        fontSize: "0.78rem",
                        lineHeight: 1.45,
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] px-4 py-2.5 rounded-2xl"
                  style={
                    m.role === "user"
                      ? {
                          background: "var(--color-brand-vivid)",
                          color: "#fff",
                          fontFamily: "var(--font-sans)",
                          fontWeight: 500,
                          fontSize: "0.83rem",
                          lineHeight: 1.55,
                        }
                      : {
                          background: "rgba(255,255,255,0.06)",
                          color: "rgba(255,255,255,0.85)",
                          fontFamily: "var(--font-sans)",
                          fontWeight: 300,
                          fontSize: "0.83rem",
                          lineHeight: 1.65,
                        }
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Streaming response */}
            {(loading || streamingText) && (
              <div className="flex justify-start">
                <div
                  className="max-w-[85%] px-4 py-2.5 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    fontSize: "0.83rem",
                    lineHeight: 1.65,
                  }}
                >
                  {streamingText || (
                    <span className="flex items-center gap-1.5 text-white/40">
                      <Loader size={12} className="animate-spin" />
                      <span style={{ fontSize: "0.75rem" }}>Thinking…</span>
                    </span>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Input */}
          <div
            className="shrink-0 px-3 pb-3 pt-2"
            style={{ borderTop: "1px solid rgba(29,184,75,0.1)" }}
          >
            <div
              className="flex items-end gap-2 rounded-2xl px-4 py-2"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Newton's plan…"
                rows={1}
                className="flex-1 bg-transparent resize-none outline-none placeholder:text-white/25"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  fontSize: "0.83rem",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.5,
                  maxHeight: "80px",
                  overflowY: "auto",
                }}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                style={{ background: "var(--color-brand-vivid)" }}
              >
                <Send size={13} color="#fff" />
              </button>
            </div>
            <p
              className="text-center mt-2"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "0.6rem",
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.04em",
              }}
            >
              Answers are strictly based on Newton&apos;s manifesto
            </p>
          </div>
        </div>
      )}
    </>
  );
}
