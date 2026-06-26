# Nexaro — Next-Gen AI Data Automation Platform

A premium, responsive landing page for an AI-driven data automation platform.
Built for the Hackathon Phase 1 Speed Run.

**Live URL:** _replace with Vercel deployment_
**Demo Video:** _replace with drive link_

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript |
| Styling | Tailwind v4 + CSS custom variables |
| 3D | three.js (explicitly permitted) |
| Animation | Native CSS + WAAPI (no Framer Motion / Radix / Shadcn / HeadlessUI) |
| Fonts | `next/font/google` — JetBrains Mono + Inter |

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

Deploy with `npx vercel --prod`.

---

## How the scoring criteria are met

### Feature 1 — Matrix-Driven Pricing & Performance-Isolated Currency Switcher (30 pts)

- All pricing values are derived from `lib/pricingMatrix.ts`, a single multi-dimensional config:
  - `tiers[].baseUSD` × `billingMultipliers[billing]` × `regionalTariffs[currency].multiplier`
  - **Zero hardcoded UI prices.**
- `components/Pricing.tsx` holds active `billing` and `currency` in `useRef` (NOT `useState`).
- On toggle/switch, each `<span>` price node is updated via direct `textContent` mutation — no React re-render of the parent or sibling cards.
- A subtle WAAPI (`element.animate`) fade transitions the price swap. No CSS-in-JS animation engine.
- Visual button-active classes are toggled via `classList.toggle()`, not state.

> **Verification:** Open Chrome DevTools → Performance → record while toggling currency and billing. The flame chart shows only text-node mutations — no component remounts, no layout/style cascades into siblings.

### Feature 2 — Bento ↔ Accordion with Context Lock (10 pts)

- `components/BentoFeatures.tsx` renders a CSS-Grid bento on ≥768px and a pure-CSS accordion on <768px (`<details>`-free; CSS `max-height` transitions).
- The active index lives in `activeIndexRef.current`. A `ResizeObserver` watches the document; on breakpoint crossing it transfers the active index by mutating DOM classes directly (`openAccordionPanel` / `activateBentoCard`).
- **Zero external libraries** — verify `package.json`: no Framer Motion, Radix, Shadcn, HeadlessUI, Tailwind UI.

### State isolation guardrail (15 pts)

- Pricing and Bento components do not call `setState` on user interaction. All visual changes are direct DOM mutations.
- The intersection-observer reveal pattern uses `classList.add('visible')` — also no state.

### Semantic DOM (15 pts)

- `<header>` (Navbar), `<main id="main-content">`, `<section>` per fold, `<article>` for cards/case studies, `<footer>`.
- Single `<h1>` in Hero. Section `<h2>`s. Card `<h3>`s.
- Skip-link `<a href="#main-content">` for keyboard users.

### SEO hygiene (10 pts)

- `app/layout.tsx` exports `metadata` with title, description, keywords, canonical, OG, Twitter card, JSON-LD structured data.
- `viewport` and `themeColor` exported via the `viewport` field (Next 16 convention).
- All `<img>` tags have `alt` attributes. SVG icons use empty `alt=""` (decorative) as per WAI-ARIA guidance.
- All meaningful text in crawlable DOM nodes — no image-baked prices.

### Loading performance (5 pts)

- Fonts loaded via `next/font/google` with `display: 'swap'` and CSS variables.
- Hero entry uses staggered CSS keyframes totalling ~480ms — under the 500ms TTI budget.
- 3D sphere dynamically imported (`next/dynamic` with `ssr: false`) so it never blocks LCP.
- IntersectionObserver lazy-reveals below-the-fold sections (no scripts run for offscreen work).

### Asset compliance (15 pts)

All 14 provided SVGs are referenced in the DOM (verify with: `for f in public/svgs/*.svg; do echo "$f: $(grep -rc $(basename $f) components/ app/)"; done`).

Both fonts (JetBrains Mono mono header, Inter body) loaded via `next/font/google`.

All 6 hex colors from `colorPallet.pdf` are wired as CSS custom properties (see `app/globals.css` — `--arctic-powder`, `--mystic-mint`, `--forsythia`, `--deep-saffron`, `--nocturnal`, `--oceanic-noir`) and used across the page.

### Breakpoint fluidity (10 pts)

- Mobile (<480px), tablet (<768px), desktop (≥768px) overrides in `app/globals.css`.
- Hero grid stacks, Case Studies row simplifies, Footer compresses to two columns, Bento switches to accordion.
- `overflow-x: hidden` on `body` plus fluid `clamp()` typography prevents horizontal clipping.

### Motion accuracy (5 pts)

| Interaction | Duration | Easing |
|---|---|---|
| Hover | 150–200ms | `ease-out` |
| Accordion | 350ms | `ease-in-out` |
| Bento card highlight | 200ms | `ease-out` |
| Section entry | 400ms | `ease-out` |
| Hero entry | <500ms total | `ease-out` |
| Currency swap | 150ms | `ease-out` (WAAPI) |
| Logo ticker | 28s infinite | `linear` |

`prefers-reduced-motion: reduce` shortens all transitions to 0.01ms for accessibility.

---

## Project layout

```
app/
  layout.tsx       Fonts, meta, OG, JSON-LD
  page.tsx         Page assembly
  globals.css      Design tokens, animations, responsive overrides
components/
  Navbar.tsx       Sticky nav, search icon, hamburger
  Hero.tsx         Headline + CTA + 3D sphere + brand ticker
  HeroSphere.tsx   three.js wireframe sphere
  Stats.tsx        Three-metric strip
  CaseStudies.tsx  Cigna / Aetna / Anthem
  FeatureShowcase.tsx  "Build logic at scale" + 4 features
  Performance.tsx  Gauges + Growth Vector wave chart
  BentoFeatures.tsx    FEATURE 2 — bento↔accordion + context lock
  Integrations.tsx Connector grid
  Pricing.tsx      FEATURE 1 — matrix-driven, state-isolated
  FAQ.tsx          Accordion
  Footer.tsx       Newsletter, links, giant wordmark, scroll-top
lib/
  pricingMatrix.ts Single source of truth for pricing
public/svgs/       All 14 supplied SVGs
```
