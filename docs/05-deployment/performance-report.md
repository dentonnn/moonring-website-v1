# Performance Report

## 2025-10-04 – Performance & UX Polish Pass

**Commands Executed**
- `npm run lint`
- `npm run build`
- `ANALYZE=true npm run build`

**Build Snapshot (Post-optimization)**
- First Load JS (shared): 138 kB (Next.js Turbopack output)
- Homepage bundle: 11.5 kB (page) + shared chunks above
- Static routes generated: 20
- Bundle analyzer reviewed (`.next/analyze/*`) – no oversized modules flagged after avatar/hero updates
- Notes: Next.js warning about `metadataBase` persists (tracked separately)

**Asset Updates**
- Replaced hero hero PNG with optimized WebP/AVIF variants (`/public/images/hero/hero-main.*`).
- Added illustrated testimonial portraits (`/public/images/testimonials/*.svg`).
- Navigation and CTA focus states enhanced for keyboard users.
- Reduced-motion preferences respected across hero video, animated dots, and spinners.

**Outstanding Follow-ups**
- Baseline Lighthouse metrics captured 2025-10-08; rerun post-optimization if deltas are needed.
- Set up automated Lighthouse CI workflow (post-manual verification).

---

## 2025-10-08 – Lighthouse Baseline Audit

**Commands Executed**
- `npm run build`
- `npx @lhci/cli@0.14.0 collect --additive --numberOfRuns=1 --start-server-command="npm run start" --url=http://localhost:3000/ --preset=mobile`
- `npx @lhci/cli@0.14.0 collect --additive --numberOfRuns=1 --start-server-command="npm run start" --url=http://localhost:3000/ --settings.preset=desktop`

**Scores**
| Profile | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Mobile (mobile preset) | 96 | 98 | 96 | 100 |
| Desktop (desktop preset) | 100 | 98 | 96 | 100 |

**Core Metrics**
| Profile | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- |
| Mobile | 0.91 s | 2.74 s | 28 ms | 0.00 |
| Desktop | 0.25 s | 0.64 s | 0 ms | 0.00 |

**Artifacts**
- Mobile report JSON/HTML: `lighthouse/mobile/2025-10-08-home-mobile.(json|html)`
- Desktop report JSON/HTML: `lighthouse/desktop/2025-10-08-home-desktop.(json|html)`

**Notes**
- Lighthouse 12.1.0 did not expose an INP metric for this run; monitor on subsequent audits if the signal becomes available.
- Desktop scores represent the standard Lighthouse desktop preset; mobile uses the default mobile preset.
