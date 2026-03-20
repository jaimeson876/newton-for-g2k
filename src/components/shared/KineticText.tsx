"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface KineticTextProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  style?: React.CSSProperties;
  /** Seconds before the char stagger reveal begins. */
  delay?: number;
}

/**
 * Splits text into per-character spans and reveals them via an
 * overflow-clipped upward stagger. Each char renders with opacity:0
 * in the initial HTML so there's no SSR flash.
 *
 * After mount, the parent page can query `.kchar` elements and drive
 * mouse-reactive drift via GSAP (x/y translation, overwrite:"auto").
 */
export default function KineticText({
  text,
  tag = "h1",
  className,
  style,
  delay = 0,
}: KineticTextProps) {
  const elRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>(".kchar"));
    if (!chars.length) return;

    const tween = gsap.fromTo(
      chars,
      { opacity: 0, y: "105%" },
      {
        opacity: 1,
        y: "0%",
        duration: 0.7,
        stagger: { amount: 0.42, ease: "power1.inOut" },
        ease: "power4.out",
        delay,
        overwrite: "auto",
      }
    );
    return () => { tween.kill(); };
  }, [delay]);

  const El = tag as React.ElementType;

  // Build an array of word-groups and spaces
  const words = text.split(" ");

  return (
    <El
      ref={(node: HTMLElement | null) => { elRef.current = node; }}
      className={className}
      style={style}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline" }}>
          {/* Word: overflow-clip wrapper so chars animate up from below */}
          <span
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              verticalAlign: "bottom",
              paddingBottom: "0.05em",
              marginBottom: "-0.05em",
            }}
          >
            {Array.from(word).map((char, ci) => (
              <span
                key={ci}
                className="kchar"
                style={{
                  display: "inline-block",
                  opacity: 0, // SSR-safe: chars hidden from first render
                  willChange: "transform, opacity",
                }}
              >
                {char}
              </span>
            ))}
          </span>
          {/* Inter-word space (not clipped) */}
          {wi < words.length - 1 && (
            <span
              aria-hidden="true"
              style={{ display: "inline-block", width: "0.28em" }}
            />
          )}
        </span>
      ))}
    </El>
  );
}
