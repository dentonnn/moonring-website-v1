# Accessibility & Inclusive Design Log

## 2025-10-04 – Performance & UX Polish Updates

**Reviewed Pages**
- `/` (homepage)
- `/demo`
- `/enterprise`

**Focus Management**
- Added visible `focus-visible` outlines to navigation links, primary CTAs, and mobile menu buttons.
- Verified keyboard navigation order for hero CTA cluster and testimonial cards.

**Reduced Motion**
- Converted animated utilities to `motion-safe` / `motion-reduce` classes for the hero pulse indicator and loading spinners.
- Added global `prefers-reduced-motion` guard to minimize transition and animation durations.
- Hero video now respects motion preference by disabling autoplay and resetting playback when reduction is requested.

**Media Alternatives**
- Replaced single-letter testimonial avatars with descriptive SVG illustrations and alt text.
- Updated hero product image with descriptive alt copy for screen readers.

**Tooling**
- Manual keyboard walkthrough.
- axe DevTools quick scan (no new critical issues detected).

**Next Steps**
- Schedule full axe DevTools run for `/research` and `/blog/[slug]` once remaining imagery is finalized.
- Evaluate contrast ratios for hover/focus states in light mode sections during final design pass.

---
