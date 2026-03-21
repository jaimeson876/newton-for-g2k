"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function RouteProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const bar = barRef.current;
    if (!bar) return;

    gsap.killTweensOf(bar);
    gsap.fromTo(
      bar,
      { scaleX: 0, opacity: 1, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 0.38,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(bar, { opacity: 0, duration: 0.22, delay: 0.05 });
        },
      }
    );
  }, [pathname]);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "var(--color-brand-vivid)",
        zIndex: 9999,
        opacity: 0,
        transformOrigin: "left center",
        pointerEvents: "none",
      }}
    />
  );
}
