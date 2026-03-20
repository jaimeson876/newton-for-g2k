"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on pointer-fine (mouse) devices — hide on touch entirely
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let revealed = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      gsap.set(dot, { x: mouseX, y: mouseY });

      // Reveal both cursors on first real mouse position — prevents stuck-at-corner artifact
      if (!revealed) {
        revealed = true;
        ringX = mouseX;
        ringY = mouseY;
        gsap.set(ring, { x: ringX, y: ringY });
        gsap.to(dot,  { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(ring, { opacity: 0.55, duration: 0.4, ease: "power2.out" });
        // Now it's safe to hide native cursor
        document.documentElement.classList.add("cursor-ready");
      }
    };

    // Ring lerps behind with RAF
    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);

    // Hover / click states
    const onEnter = () => {
      ring.classList.add("is-hovering");
      gsap.to(ring, { opacity: 0.85, overwrite: "auto" });
    };
    const onLeave = () => {
      ring.classList.remove("is-hovering");
      gsap.to(ring, { opacity: 0.55, overwrite: "auto" });
    };
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
      document.documentElement.classList.remove("cursor-ready");
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
