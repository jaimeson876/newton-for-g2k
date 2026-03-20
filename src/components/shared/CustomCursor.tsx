"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on pointer-fine (mouse) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    // Ring lerps behind with RAF
    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);

    // Hover state on all interactive elements
    const onEnter = () => ring.classList.add("is-hovering");
    const onLeave = () => ring.classList.remove("is-hovering");
    const onDown  = () => ring.classList.add("is-clicking");
    const onUp    = () => ring.classList.remove("is-clicking");

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    const targets = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, label, [tabindex]"
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Re-query on DOM changes
    const observer = new MutationObserver(() => {
      document.querySelectorAll(
        "a:not([data-cursor]), button:not([data-cursor]), [role='button']:not([data-cursor])"
      ).forEach((el) => {
        if (!(el as HTMLElement).dataset.cursor) {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
          (el as HTMLElement).dataset.cursor = "1";
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
