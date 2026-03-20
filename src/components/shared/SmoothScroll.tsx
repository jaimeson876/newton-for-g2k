"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Use native scroll on touch/mobile — Lenis only on pointer:fine (mouse) devices.
    // This ensures swipe gestures feel completely native on iOS/Android.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      // On mobile: just sync ScrollTrigger with native scroll events
      const onScroll = () => {
        ScrollTrigger.update();
        const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
        document.documentElement.style.setProperty("--scroll-progress", String(progress));
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    // Desktop: Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0,   // disable touch on desktop Lenis instance (handled natively)
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", (e: { progress: number }) => {
      ScrollTrigger.update();
      document.documentElement.style.setProperty("--scroll-progress", String(e.progress));
    });

    const gsapTicker = gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(gsapTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
