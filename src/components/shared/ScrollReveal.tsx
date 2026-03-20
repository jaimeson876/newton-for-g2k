"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Direction = "up" | "left" | "right" | "scale" | "fade";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.85,
  stagger = 0,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger > 0 ? el.children : el;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration,
      ease: "power3.out",
      delay,
      ...(stagger > 0 ? { stagger } : {}),
    };

    if (direction === "up")    { fromVars.y = 52; }
    if (direction === "left")  { fromVars.x = -60; }
    if (direction === "right") { fromVars.x = 60; }
    if (direction === "scale") { fromVars.scale = 0.86; fromVars.y = 20; }

    const tween = gsap.from(targets, {
      ...fromVars,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once,
      },
    });

    return () => { tween.kill(); };
  }, [direction, delay, duration, stagger, once]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
