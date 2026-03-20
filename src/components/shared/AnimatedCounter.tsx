"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  /** Numeric value to animate to */
  value: number;
  /** Optional suffix rendered after the number, e.g. "+" or "%" */
  suffix?: string;
  /** Optional label rendered below the number */
  label?: string;
  className?: string;
}

export default function AnimatedCounter({ value, suffix = "", label, className }: AnimatedCounterProps) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el || value === 0) return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = Math.round(obj.val).toString() + suffix;
      },
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => { tween.kill(); };
  }, [value, suffix]);

  return (
    <div className={className}>
      <span
        ref={numRef}
        className="block leading-none"
        style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
      >
        {suffix ? "0" + suffix : "0"}
      </span>
      {label && (
        <span
          className="block text-sm font-medium mt-1"
          style={{ fontFamily: "var(--font-sans)", color: "var(--color-ink-muted)" }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
