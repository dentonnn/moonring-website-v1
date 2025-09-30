# Moon Ring Development Best Practices

This guide captures the expectations for agents contributing to the Moon Ring platform so work stays aligned with product plans, architecture, and process constraints.

## 1. Know the Sources of Truth
- Always anchor work in `docs/moon-ring-project-prd.md`, `docs/front-end-spec.md`, the assigned story under `docs/stories/`, and the implementation guide `docs/implementation-guide-nextjs-supabase-stripe.md`.
- Treat story files as the canonical assignment; only update the "Dev Agent Record" sections when logging progress.
- Consult the project brief for strategic context before proposing scope changes.

## 2. Branching & Version Control
- Keep `main` production-ready and `dev` integration-ready; create short-lived feature branches (e.g., `feature/auth-login`) for each story.
- Reference the story ID in branch names, commits, and PR titles to maintain traceability.
- Rebase or merge from `dev` frequently to stay current; resolve conflicts locally before opening a PR.

## 3. Environment Setup
- Work inside `moon-ring-platform/`; install dependencies with `npm install` if `node_modules/` is missing.
- Copy `.env.example` (create one if needed) to `.env.local` and populate Supabase and Stripe keys before running the app.
- Start the dev server with `npm run dev` and keep it running while implementing features for fast feedback.

## 4. Implementation Workflow
- Follow the stack decisions in the implementation guide: Next.js 14 App Router, Tailwind CSS 4, Supabase client libs, and Stripe SDKs.
- Extend or add components under `src/app` and `src/components` to match the front-end spec; reuse utility helpers under `src/lib` when available.
- Keep Tailwind utility usage consistent; add shared styles or tokens in `src/app/globals.css` when patterns emerge.
- Document Supabase schema or function updates in the repo (e.g., `supabase/migrations/`) so they can be replayed by others.

## 5. Testing & Quality Gates
- Run `npm run lint` before every commit; fix violations rather than ignoring them.
- Add unit or integration tests alongside new logic when feasible; prefer colocated test files using the chosen test runner.
- Verify accessibility (keyboard navigation, landmarks, color contrast) for UI work and align with the front-end spec.
- Validate any Supabase or Stripe integration against sandbox credentials prior to requesting review.

## 6. Documentation & Communication
- Update or flag discrepancies in project docs when implementation deviates from specifications; coordinate with PM/PO agents if scope must change.
- Capture noteworthy decisions, edge cases, or follow-up tasks in story notes or supplementary docs to preserve context.
- Surface blockers early—link to relevant docs or lines when asking for clarification.

## 7. Command Reference
- `npm run dev` – start the development server (Turbopack).
- `npm run build` – create a production build for verification.
- `npm run lint` – run ESLint across the project.
- `npm install <package>` – add dependencies; prefer npm (not yarn/pnpm) for consistency.

## 8. Final Checks Before PR
- Ensure the feature branch merges cleanly into `dev`.
- Confirm lint/tests pass and the UI matches the approved spec.
- Verify documentation updates are committed and story Dev Agent Record entries are complete.
- Provide clear PR descriptions referencing the story ID, scope, and validation steps performed.

Following these practices keeps the Moon Ring codebase consistent, testable, and ready for handoffs across agents.
