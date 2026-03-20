# Design Mode — Newton for G2K

You are now in **Design Mode** for the Newton for G2K campaign website.

## Your Design Brief

This is a vivid, modern campaign website for Newton Harris — G2K Presidential Candidate 2026. Every design decision must feel premium, intentional, and politically bold.

---

## Brand Palette (globals.css `@theme inline`)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-brand-vivid` | `#1DB84B` | Primary green — CTAs, highlights, motif color |
| `--color-brand-900` | `#081508` | Dark section backgrounds |
| `--color-brand-950` | `#030C05` | Darkest — hero, footer |
| `--color-gold-400` | `#F5C518` | Gold accent — key statements, closing messages |
| `--color-surface` | `#F3F7F4` | Light section bg |
| `--color-ink` | `#0D0D0D` | Body text |
| `--color-ink-muted` | `#4A4A4A` | Secondary text |

**Rule:** Always use `var(--color-*)` syntax. Never use Tailwind color classes like `text-green-500`.

---

## Typography System

| Role | Font | Tailwind Class / CSS |
|------|------|---------------------|
| Display / Headings | **Nersans Two Slant** | `font-family: var(--font-display)` or `.font-display` |
| Body copy | **Aloevera Display** (100–900) | `font-family: var(--font-sans)` — default on `body` |
| Labels / Tags | **Aloevera Condensed** | `font-family: var(--font-condensed)` or `.font-condensed` |

### Weight Strategy
- **300 (Light)** — body paragraphs, relaxed reads
- **400 (Regular)** — general UI text
- **600 (SemiBold)** — sub-labels, nav items
- **700 (Bold)** — CTAs, strong statements
- **900 (Black)** — hero headlines (via `font-display`), pull quotes, big numbers

### Emphasis Technique
Use weight + color combos to punch key messages:
```tsx
<p style={{ fontWeight: 300 }}>
  Newton has served as{" "}
  <strong style={{ fontWeight: 800, color: "var(--color-brand-vivid)" }}>
    Ministerial Advisor for 5+ years
  </strong>
  {" "}and knows how government works.
</p>
```

---

## Arrow Motif — `ArrowMotif` Component

Located at `src/components/shared/ArrowMotif.tsx`.

```tsx
import ArrowMotif from "@/components/shared/ArrowMotif";

<ArrowMotif
  size={400}               // px, square
  color="var(--color-brand-vivid)"
  opacity={0.07}           // subtle for backgrounds
  interactive={true}       // GSAP polygon scatter on hover
  scrollReveal={true}      // GSAP entrance on scroll
  stagger={0.008}          // entrance stagger speed
  className="..."
/>
```

### Usage Patterns
| Context | Size | Opacity | Settings |
|---------|------|---------|----------|
| Hero background (right edge) | 600–700px | 0.06–0.09 | parallax scroll |
| Section divider (centered bg) | 400–500px | 0.05–0.07 | `scrollReveal` |
| CTA corner watermark | 280–360px | 0.03–0.05 | `interactive` |
| Footer watermark | 200–280px | 0.04 | static |

---

## Animation Conventions

### GSAP Setup
- All GSAP code goes inside `useEffect` with `gsap.context()` for cleanup
- Components using GSAP must be `"use client"` with `gsap.registerPlugin(ScrollTrigger)` at module level
- Use `scrollTrigger: { start: "top 80%", once: true }` for one-shot reveals

### ScrollReveal Utility
For simple text reveals, add class `scroll-reveal` — the home page GSAP context picks these up automatically. For complex sequences, build a timeline.

### AnimatedCounter
```tsx
import AnimatedCounter from "@/components/shared/AnimatedCounter";

<AnimatedCounter value={5} suffix="+" className="text-[var(--color-brand-700)]" />
```

---

## Component & Layout Rules

- **Rounded corners**: All cards/buttons use `rounded-2xl` (16px) or `rounded-3xl` (24px). No sharp corners.
- **Container**: Always use `className="container-site"` for page-level horizontal padding.
- **Hover interactions**: Use GSAP `onMouseEnter` / `onMouseLeave` for fluid hover states — not just CSS transitions.
- **Dark sections**: `var(--color-brand-900)` or `var(--color-brand-950)` background with white text at reduced opacity (`rgba(255,255,255,0.7)` body, `rgba(255,255,255,0.4)` secondary).
- **Light sections**: `white` or `var(--color-surface)` with `var(--color-ink)` text.

---

## Key Components

| Component | Path | Purpose |
|-----------|------|---------|
| `ArrowMotif` | `src/components/shared/ArrowMotif.tsx` | Brand arrow SVG with GSAP |
| `AnimatedCounter` | `src/components/shared/AnimatedCounter.tsx` | GSAP scroll counter |
| `ScrollReveal` | `src/components/shared/ScrollReveal.tsx` | GSAP ScrollTrigger wrapper |
| `CustomCursor` | `src/components/shared/CustomCursor.tsx` | GSAP custom cursor |
| `PillarPageLayout` | `src/components/pillar/PillarPageLayout.tsx` | Reusable pillar page |
| `AccordionModule` | `src/components/shared/AccordionModule.tsx` | Expand/collapse plan sections |

---

## Content Source

All manifesto text lives in `src/content/index.ts`. Import what you need:

```tsx
import { candidate, mission, pillar1, pillar2, pillar3, messageToG2K } from "@/content";
```

**Never paraphrase** manifesto content — use the exact strings from this file.

---

## Checklist Before Shipping a Design Change

- [ ] Used Nersans for all `h1`–`h3` display headings
- [ ] Used Aloevera weights (300 body, 600–700 emphasis, 800–900 bold statements)
- [ ] Color values use `var(--color-*)` syntax
- [ ] Dark sections use opacity-reduced white text
- [ ] All cards/CTAs use `rounded-2xl` or `rounded-3xl`
- [ ] Arrow motif used tastefully (not overloaded — max 2–3 per page)
- [ ] GSAP animations are inside `useEffect` with `gsap.context()` cleanup
- [ ] Mobile-first: base styles mobile, `md:` / `lg:` for larger
- [ ] Images use `next/image` with `fill` + `sizes` props
