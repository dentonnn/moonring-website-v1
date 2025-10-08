# Performance & UX Polish Implementation Plan

**Status:** In Progress (implementation underway)
**Owner:** Frontend + Growth Engineering
**Last Updated:** 2025-10-04

---

## Objectives
- Improve perceived and measured performance (Core Web Vitals) ahead of final asset delivery.
- Replace placeholder imagery with optimized, production-ready assets while maintaining accessibility.
- Ensure animated elements respect user preferences and do not inflate bundle size.
- Document all findings for deployment readiness and future regression checks.

---

## Prerequisites
- Local environment configured (`npm install` in `moon-ring-platform/`).
- Access to Chrome DevTools Lighthouse, axe DevTools, and analytics dashboards.
- Source assets (hero imagery, testimonial photos) exported in WebP/AVIF + fallback PNG if needed.
- Write access to documentation directories (`docs/05-deployment/`, `docs/06-content/`).

---

## Step-by-Step Plan

### 1. Baseline Audit
1. From `moon-ring-platform/`, run:
   ```bash
   npm run lint
   npm run build
   next build --profile
   ```
2. Capture bundle output (`.next/analyze` or terminal size report).
3. Run Lighthouse (mobile & desktop) in Chrome against local `npm run dev` build, recording:
   - Performance, Accessibility, Best Practices, SEO scores.
   - Core Web Vitals (LCP, CLS, FID/INP proxy).
4. Log all results with timestamps in `docs/05-deployment/performance-report.md` under a new "Baseline – Performance & UX Polish" section.

### 2. Hero LCP Optimization
1. Export hero imagery variants to `moon-ring-platform/public/hero/`:
   - `hero-main@1x.webp`, `hero-main@2x.webp`, optional AVIF equivalents.
2. Update `src/app/page.tsx` hero section to use `next/image` with:
   - `priority` flag for primary asset.
   - Defined `width`/`height` and low-quality placeholder (`blurDataURL`) if possible.
3. Verify responsive behavior on mobile & desktop (DevTools device toolbar).
4. Re-run Lighthouse focusing on LCP metric; append comparison to performance report.

### 3. Image & Asset Sweep
1. Run `npm run lint` and resolve unused imports related to placeholder assets.
2. Replace remaining placeholder art (e.g., testimonials, case studies) with compressed sources in `public/`.
3. Ensure every `next/image` instance sets meaningful `alt` text and, where applicable, `priority` or `loading="lazy"`.
4. Update any asset documentation (e.g., `docs/06-content/asset-guidelines.md`) with new filenames + specs.

### 4. Accessibility QA
1. Install/enable axe DevTools browser extension (or CLI equivalent).
2. Manually keyboard-test primary flows: navigation menu, hero CTAs, demo wizard, footer links.
3. Run axe scans on key pages (`/`, `/demo`, `/enterprise`, `/blog`).
4. Document findings + fixes in `docs/06-content/accessibility-log.md`, including before/after screenshots if relevant.
5. Implement necessary updates:
   - Focus styles (`:focus-visible`) in components or `globals.css`.
   - Semantic adjustments (aria-labels, role attributes) identified during testing.

### 5. Reduced Motion & Animation Audit
1. Inventory components with animations/transitions (navigation blur, CTA hover, testimonial cards).
2. In `globals.css` and component styles, wrap non-essential animations with `@media (prefers-reduced-motion: no-preference)` checks or logical guards.
3. Verify in DevTools by toggling "Emulate CSS prefers-reduced-motion" to ensure animations stop when preference is enabled.
4. Note adjustments in accessibility log for traceability.

### 6. Bundle Trimming & Analysis
1. Run an analyzed build:
   ```bash
   ANALYZE=true npm run build
   ```
2. Inspect output (e.g., `/.next/analyze/client.html`) for largest modules.
3. Implement optimizations:
   - Replace wildcard `lucide-react` imports with explicit icon imports.
   - Remove dead code paths/components.
   - Consider dynamic imports (`next/dynamic`) for rarely visible sections (e.g., Testimonials) while measuring impact.
4. Re-run analyzed build to confirm size reductions; document before/after bundle sizes in performance report.

### 7. Regression Testing & Sign-off
1. Execute `npm run lint` and `npm run build` to ensure no regressions.
2. Run Lighthouse (mobile & desktop) once more; extract updated Core Web Vitals.
3. Update `docs/05-deployment/performance-report.md` with final metrics, optimization summary, and outstanding TODOs (if any).
4. Prepare a concise summary for release notes (include in performance report or sprint doc).

---

## Deliverables Checklist
- [x] Updated hero implementation with optimized assets.
- [x] `public/` contains compressed, documented imagery.
- [ ] `docs/05-deployment/performance-report.md` logs baseline + post-optimization metrics. *(Post-optimization recorded; baseline capture still pending.)*
- [x] `docs/06-content/accessibility-log.md` records accessibility + reduced-motion changes.
- [x] Bundle analysis size notes appended to performance report.
- [x] Regression tests (lint/build) pass without errors.

---

## Open Questions / Dependencies
- Do we have final brand-approved hero and testimonial assets? (Coordinate with design).
  - **Status:** Not yet; assets will be created during this workstream (coordinate with design/content).
- Should we introduce automated Lighthouse CI (e.g., via GitHub Action) after manual optimizations?
  - **Decision:** Yes—add a follow-up task to learn and configure Lighthouse CI once manual fixes land.
- Are there additional analytics requirements tied to performance changes (e.g., tracking LCP via real user monitoring)?
  - **Decision:** Not at the moment; no extra tracking needed beyond existing analytics.

---

**Next Steps:** Review this plan, refine scope if needed, then create implementation tasks for each numbered phase.
