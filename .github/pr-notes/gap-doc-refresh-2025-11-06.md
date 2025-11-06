# PR Notes — Gap Analysis Refresh + Roadmap

## Summary
- Cleaned up and modernized `docs/02-requirements/gap-analysis.md` for accuracy and actionability.
- Added `docs/02-requirements/implementation-roadmap.md` with phased, owner-assigned tasks.
- Introduced acceptance criteria (Done When), Owners, and Dependencies for each gap.

## Changes
- A/B testing: Replaced Google Optimize with GrowthBook (OSS), PostHog Experiments, VWO, Optimizely; updated costs/effort.
- Path fixes: Corrected `moon-ring-platform` repo-relative links.
- Standardized roadmap references to `./implementation-roadmap.md`.
- Clarified current state:
  - ROI Calculator: basic interactive calc present; needs PDF export + CRM routing.
  - Demo: commitment builder exists; needs assessment, recommendations, plan preview.
  - Nurture: 4+ email drafts exist; Brevo automation status unknown.
- Performance targets for screenshots: hero LCP ≤100KB; others ≤60–80KB, WebP, lazy-loaded.
- Added Link Health and Change Log sections to the doc.

## Files Modified
- docs/02-requirements/gap-analysis.md
- docs/02-requirements/implementation-roadmap.md (new)

## Testing / Verification
- Verified all internal links resolve relative to repository.
- Cross-checked component/file paths with `moon-ring-platform/src/...`.
- Confirmed acceptance criteria align with PRD sections referenced.

## Risks / Follow-ups
- Select A/B testing platform (GrowthBook OSS vs PostHog vs VWO) — impacts SDK wiring and dashboards.
- Decide CMS (Strapi vs Contentful) — affects content modeling and hosting.
- Create tickets from roadmap (added issue stubs under `docs/02-requirements/issue-stubs/`).

## Checklist
- [x] Update tools and links
- [x] Add owners, dependencies, acceptance criteria
- [x] Add roadmap with estimates
- [x] Provide issue stubs for import into tracker
