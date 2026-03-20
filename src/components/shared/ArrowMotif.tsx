"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ArrowMotifProps {
  /** Overall size in px (square). Default 400. */
  size?: number;
  /** Fill color for all polygons. Default: currentColor. */
  color?: string;
  /** Base opacity. Default 1. */
  opacity?: number;
  /** Additional class names. */
  className?: string;
  /** Enable GSAP hover interaction — individual polygon scatter on hover. */
  interactive?: boolean;
  /** Enable GSAP scroll-driven entrance. */
  scrollReveal?: boolean;
  /** Stagger delay for scroll entrance. Default 0.008. */
  stagger?: number;
}

export default function ArrowMotif({
  size = 400,
  color = "currentColor",
  opacity = 1,
  className = "",
  interactive = false,
  scrollReveal = false,
  stagger = 0.008,
}: ArrowMotifProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const polygonsRef = useRef<SVGPolygonElement[]>([]);

  useEffect(() => {
    if (!svgRef.current) return;
    const polygons = Array.from(svgRef.current.querySelectorAll("polygon"));
    polygonsRef.current = polygons as SVGPolygonElement[];

    // Track only the timeline created by this instance (if any)
    let tl: gsap.core.Timeline | null = null;

    // ── Scroll reveal entrance ──────────────────────────────────────
    if (scrollReveal) {
      gsap.set(polygons, { opacity: 0, scale: 0.7, transformOrigin: "center center" });
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 85%",
          once: true,
        },
      });
      tl.to(polygons, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: {
          amount: stagger * polygons.length * 60,
          from: "start",
        },
      });
    }

    // ── Interactive hover: individual polygon micro-scatter ─────────
    if (interactive) {
      const handleMouseEnter = () => {
        gsap.to(polygons, {
          x: () => gsap.utils.random(-6, 6),
          y: () => gsap.utils.random(-6, 6),
          rotation: () => gsap.utils.random(-4, 4),
          opacity: () => gsap.utils.random(0.5, 1),
          duration: 0.5,
          ease: "power2.out",
          stagger: { amount: 0.3, from: "random" },
        });
      };
      const handleMouseLeave = () => {
        gsap.to(polygons, {
          x: 0, y: 0, rotation: 0, opacity: 1,
          duration: 0.7,
          ease: "elastic.out(1, 0.75)",
          stagger: { amount: 0.25, from: "random" },
        });
      };

      const el = svgRef.current;
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        tl?.kill();
      };
    }

    return () => {
      tl?.kill();
    };
  }, [interactive, scrollReveal, stagger]);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 988.06 988.06"
      width={size}
      height={size}
      fill={color}
      style={{ opacity, display: "block" }}
      className={className}
      aria-hidden="true"
    >
      <polygon points="864.55 123.51 864.55 119.41 984.21 0 988.06 0 988.06 4.11 868.42 123.51 864.55 123.51"/>
      <polygon points="741.04 123.51 741.04 119.41 860.7 0 864.55 0 864.55 4.11 744.91 123.51 741.04 123.51"/>
      <polygon points="617.54 123.51 617.54 119.41 737.19 0 741.04 0 741.04 4.11 621.41 123.51 617.54 123.51"/>
      <polygon points="494.03 123.51 494.03 119.41 613.69 0 617.54 0 617.54 4.11 497.9 123.51 494.03 123.51"/>
      <polygon points="370.52 123.51 370.52 119.41 490.18 0 494.03 0 494.03 4.11 374.39 123.51 370.52 123.51"/>
      <polygon points="247.02 123.51 247.02 119.41 366.67 0 370.52 0 370.52 4.11 250.88 123.51 247.02 123.51"/>
      <polygon points="123.51 123.51 123.51 119.41 243.16 0 247.02 0 247.02 4.11 127.38 123.51 123.51 123.51"/>
      <polygon points="0 123.51 0 119.41 119.66 0 123.51 0 123.51 4.11 3.87 123.51 0 123.51"/>
      <polygon points="864.55 247.02 864.55 242.92 984.21 123.51 988.06 123.51 988.06 127.62 868.42 247.02 864.55 247.02"/>
      <polygon points="864.55 370.52 864.55 366.43 984.21 247.02 988.06 247.02 988.06 251.13 868.42 370.52 864.55 370.52"/>
      <polygon points="864.55 494.03 864.55 489.94 984.21 370.52 988.06 370.52 988.06 374.63 868.42 494.03 864.55 494.03"/>
      <polygon points="864.55 617.54 864.55 613.44 984.21 494.03 988.06 494.03 988.06 498.14 868.42 617.54 864.55 617.54"/>
      <polygon points="864.55 741.05 864.55 736.95 984.21 617.54 988.06 617.54 988.06 621.65 868.42 741.05 864.55 741.05"/>
      <polygon points="864.55 864.55 864.55 860.46 984.21 741.04 988.06 741.04 988.06 745.16 868.42 864.55 864.55 864.55"/>
      <polygon points="864.55 988.06 864.55 983.97 984.21 864.55 988.06 864.55 988.06 868.66 868.42 988.06 864.55 988.06"/>
      <polygon points="123.51 123.51 123.51 133.54 10.04 247.02 0 247.02 0 236.98 113.47 123.51 123.51 123.51"/>
      <polygon points="247.02 123.51 247.02 132.77 132.77 247.02 123.51 247.02 123.51 237.75 237.75 123.51 247.02 123.51"/>
      <polygon points="370.52 123.51 370.52 132 255.51 247.02 247.02 247.02 247.02 238.52 362.03 123.51 370.52 123.51"/>
      <polygon points="494.03 123.51 494.03 131.23 378.24 247.02 370.52 247.02 370.52 239.29 486.31 123.51 494.03 123.51"/>
      <polygon points="617.54 123.51 617.54 130.46 500.98 247.02 494.03 247.02 494.03 240.07 610.59 123.51 617.54 123.51"/>
      <polygon points="741.04 123.51 741.05 129.68 623.71 247.02 617.54 247.02 617.54 240.84 734.87 123.51 741.04 123.51"/>
      <polygon points="864.55 123.51 864.55 128.91 746.45 247.02 741.05 247.02 741.05 241.61 859.15 123.51 864.55 123.51"/>
      <polygon points="123.51 247.02 123.51 262.46 15.44 370.52 0 370.52 0 355.08 108.07 247.02 123.51 247.02"/>
      <polygon points="247.02 247.02 247.02 260.91 137.4 370.52 123.51 370.52 123.51 356.63 233.12 247.02 247.02 247.02"/>
      <polygon points="370.52 247.02 370.52 259.37 259.37 370.52 247.02 370.52 247.02 358.17 358.17 247.02 370.52 247.02"/>
      <polygon points="494.03 247.02 494.03 257.82 381.33 370.52 370.52 370.52 370.52 359.71 483.22 247.02 494.03 247.02"/>
      <polygon points="617.54 247.02 617.54 256.28 503.29 370.52 494.03 370.52 494.03 361.26 608.27 247.02 617.54 247.02"/>
      <polygon points="741.05 247.02 741.05 254.74 625.26 370.52 617.54 370.52 617.54 362.8 733.32 247.02 741.05 247.02"/>
      <polygon points="864.55 247.02 864.55 253.19 747.22 370.52 741.05 370.52 741.05 364.35 858.38 247.02 864.55 247.02"/>
      <polygon points="494.03 370.52 494.03 384.42 384.42 494.03 370.52 494.03 370.52 480.13 480.13 370.52 494.03 370.52"/>
      <polygon points="617.54 370.52 617.54 382.1 505.61 494.03 494.03 494.03 494.03 482.45 605.96 370.52 617.54 370.52"/>
      <polygon points="741.05 370.52 741.05 379.79 626.8 494.03 617.54 494.03 617.54 484.77 731.78 370.52 741.05 370.52"/>
      <polygon points="864.55 370.52 864.55 377.47 747.99 494.03 741.05 494.03 741.05 487.08 857.6 370.52 864.55 370.52"/>
      <polygon points="370.52 494.03 370.52 514.1 267.09 617.54 247.02 617.54 247.02 597.47 350.45 494.03 370.52 494.03"/>
      <polygon points="494.03 494.03 494.03 511.01 387.51 617.54 370.52 617.54 370.52 600.55 477.05 494.03 494.03 494.03"/>
      <polygon points="617.54 494.03 617.54 507.93 507.93 617.54 494.03 617.54 494.03 603.64 603.64 494.03 617.54 494.03"/>
      <polygon points="741.05 494.03 741.05 504.84 628.35 617.54 617.54 617.54 617.54 606.73 730.24 494.03 741.05 494.03"/>
      <polygon points="864.55 494.03 864.55 501.75 748.77 617.54 741.05 617.54 741.05 609.82 856.83 494.03 864.55 494.03"/>
      <polygon points="247.02 617.54 247.02 645.33 151.3 741.05 123.51 741.05 123.51 713.25 219.22 617.54 247.02 617.54"/>
      <polygon points="370.52 617.54 370.52 641.47 270.95 741.05 247.02 741.05 247.02 717.11 346.59 617.54 370.52 617.54"/>
      <polygon points="494.03 617.54 494.03 637.61 390.59 741.05 370.52 741.05 370.52 720.97 473.96 617.54 494.03 617.54"/>
      <polygon points="741.05 617.54 741.05 629.89 629.89 741.05 617.54 741.05 617.54 728.69 728.69 617.54 741.05 617.54"/>
      <polygon points="864.55 617.54 864.55 626.03 749.54 741.05 741.05 741.05 741.05 732.55 856.06 617.54 864.55 617.54"/>
      <polygon points="123.51 741.05 123.51 778.1 37.05 864.55 0 864.55 0 827.5 86.45 741.05 123.51 741.05"/>
      <polygon points="247.02 741.05 247.02 773.47 155.93 864.55 123.51 864.55 123.51 832.13 214.59 741.05 247.02 741.05"/>
      <polygon points="370.52 741.05 370.52 768.84 274.81 864.55 247.02 864.55 247.02 836.76 342.73 741.05 370.52 741.05"/>
      <polygon points="741.05 741.05 741.05 754.94 631.43 864.55 617.54 864.55 617.54 850.66 727.15 741.05 741.05 741.05"/>
      <polygon points="864.55 741.04 864.55 750.31 750.31 864.55 741.05 864.55 741.05 855.29 855.29 741.04 864.55 741.04"/>
      <polygon points="864.55 864.55 864.55 874.59 751.08 988.06 741.05 988.06 741.05 978.02 854.52 864.55 864.55 864.55"/>
      <polygon points="741.05 864.55 741.05 879.99 632.98 988.06 617.54 988.06 617.54 972.62 725.61 864.55 741.05 864.55"/>
      <polygon points="247.02 864.55 247.02 901.61 160.56 988.06 123.51 988.06 123.51 951.01 209.96 864.55 247.02 864.55"/>
      <polygon points="123.51 864.55 123.51 907.01 42.46 988.06 0 988.06 0 945.6 81.05 864.55 123.51 864.55"/>
    </svg>
  );
}
