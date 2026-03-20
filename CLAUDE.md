# Newton for G2K — Claude Code Reference

## Project Overview
Campaign website for Newton Harris, G2K Presidential Candidate 2026.
Domain: `newtonforg2k.info` | Host: Netlify | Framework: Next.js 16 (App Router)

## Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first config in `globals.css`) |
| Animation | Framer Motion v11 |
| Icons | Lucide React |
| Deployment | Netlify + `@netlify/plugin-nextjs` |

## Directory Structure
```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Navbar + Footer)
│   ├── page.tsx                # Home
│   ├── the-candidate/page.tsx
│   ├── mission/page.tsx
│   ├── plan/
│   │   ├── page.tsx            # Plan landing
│   │   ├── chapter-and-member-development/page.tsx
│   │   ├── national-policy-and-thought-leadership/page.tsx
│   │   └── sustainable-financing/page.tsx
│   ├── message-to-g2k/page.tsx
│   └── manifesto/page.tsx
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── shared/                 # AccordionModule, ImageGallery, ReadingModeToggle,
│   │                           # StickyPillarNav, MetricCard, PageHeader
│   └── pillar/                 # PillarPageLayout (reused by all 3 pillar pages)
├── content/index.ts            # ALL manifesto text — single source of truth
└── lib/utils.ts                # cn() utility
public/
├── manifesto.pdf               # Original PDF (served directly)
└── images/                     # Campaign photos — add here
```

## Content Rules
- `src/content/index.ts` is the **single source of truth** for all manifesto text
- **DO NOT paraphrase** any text from the PDF in content data
- Nav labels and page titles may be shortened (marked `[NAV]` in content file)
- All images go in `public/images/` with descriptive filenames
- Update `ImageGallery` props on each page once images are available

## Brand Tokens (defined in `globals.css` `@theme inline`)
```
--color-brand-700  #1B5E2D   ← primary green
--color-brand-900  #0D2E1A   ← dark background
--color-brand-950  #061410   ← darkest (footer, hero strips)
--color-gold-400   #F5C518   ← gold accent (CTAs, highlights)
--color-ink        #111111   ← body text
--color-ink-muted  #555555   ← secondary text
--color-surface    #F8FAF9   ← light section background
--color-border     #E2E8E5   ← borders
```

## Styling Conventions
- **Mobile-first** — base styles for mobile, `md:` / `lg:` for larger screens
- Use `container-site` class for all page-level padding (defined in `globals.css`)
- Use brand CSS variables via `var(--color-*)` syntax, NOT Tailwind color classes
- `cn()` from `lib/utils.ts` for conditional class merging
- No dark mode — site is light with explicit dark sections
- Prefer Tailwind utility classes over custom CSS; add to `globals.css` only for global primitives

## Component Patterns
### Adding a new pillar page section
1. Add module data to the relevant pillar in `src/content/index.ts`
2. `PillarPageLayout` renders all modules automatically via `AccordionModule`

### Adding gallery images
```tsx
const galleryImages: GalleryImage[] = [
  { src: "/images/event-name.jpg", alt: "Descriptive alt text", caption: "Optional caption" },
];
```

### AccordionModule behavior
- `summaryMode={true}` — shows only promise statement (Summary View)
- `summaryMode={false}` — shows expand/collapse panels for Tactical Strategy + Measurement
- Controlled by `ReadingModeToggle` state in `PillarPageLayout`

## Deployment (Netlify)
1. Push to GitHub
2. Connect repo to Netlify → Build command: `npm run build` → Publish: `.next`
3. Add domain: `newtonforg2k.info`
4. In GoDaddy DNS: Set nameservers to Netlify's NS records OR add A + CNAME per Netlify instructions

## Environment Variables
None required for current build. If contact form added later:
```
RESEND_API_KEY=...
```

## Dev Commands
```bash
npm run dev       # Local dev server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
```

## Accessibility
- All interactive elements have `aria-label` or visible labels
- Focus ring: `*:focus-visible` styled in `globals.css`
- Images must have meaningful `alt` text
- Color contrast: white on brand-700 passes WCAG AA

## Performance
- Images: use `next/image` with `fill` + `sizes` for all photos
- Hero image: add `priority` prop to above-fold image
- PDF: served from `/public` — no JS required, native browser rendering
- Animation: use GSAP for scroll-driven entrance, counters, hover effects

## Design System (Phase 2 — implemented)

> **Enter design context**: run `/design-mode` to load the full design brief.

### Fonts
| Token | Family | Weights | Usage |
|-------|--------|---------|-------|
| `var(--font-display)` | Nersans Two Slant | 400–900 | All headings h1–h3 |
| `var(--font-sans)` | Aloevera Display | 100–900 + italics | Body, UI, paragraphs |
| `var(--font-condensed)` | Aloevera Condensed | 400, 700, 900 | Labels, badges, tags |

Weight strategy: 300 body · 600–700 emphasis · 800–900 display statements

### Animation Stack
- **GSAP + ScrollTrigger** — scroll entrances, counters, parallax, hover effects
- All GSAP inside `useEffect` with `gsap.context()` cleanup
- `"use client"` required on all animated components

### Key Design Components
| Component | Path |
|-----------|------|
| `ArrowMotif` | `src/components/shared/ArrowMotif.tsx` — brand SVG, GSAP interactive + scroll reveal |
| `AnimatedCounter` | `src/components/shared/AnimatedCounter.tsx` |
| `ScrollReveal` | `src/components/shared/ScrollReveal.tsx` |
| `CustomCursor` | `src/components/shared/CustomCursor.tsx` |

### Arrow Motif Usage
- Max 2–3 per page (background only — opacity 0.04–0.09)
- Hero: large (600–700px), right edge, parallax scroll
- Section dividers: centered, medium (400–500px), `scrollReveal`
- CTA/footer corners: small (280–360px), `interactive`

## What's Not Yet Built (Phase 2)
- [ ] Actual candidate/campaign photos in galleries
- [ ] Favicon and OG image (`public/favicon.ico`, `public/og-image.jpg`)
- [ ] Framer Motion page transitions
- [ ] Contact / support form
- [ ] Social share buttons
- [ ] Analytics (Google Analytics or Plausible)
- [ ] Mobile bottom nav bar (optional)
