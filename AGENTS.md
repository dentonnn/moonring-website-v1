# Repository Guidelines

## Project Structure & Module Organization
- App lives in `moon-ring-platform/` using the App Router in `moon-ring-platform/src/app/`.
- Shared UI: `moon-ring-platform/src/components/` (PascalCase files, e.g., `TestimonialsSection.tsx`).
- Utilities & config: `moon-ring-platform/src/lib/`, `moon-ring-platform/src/config/`.
- Static assets: `moon-ring-platform/public/`. Docs: `docs/` (architecture, deployment, SOPs).
- Tests: unit tests colocated near code (e.g., `src/lib/foo.test.ts`). E2E: `moon-ring-platform/src/app/(e2e)/` with Playwright.

## Build, Test, and Development Commands
Run all commands from `moon-ring-platform/`.
- `npm run dev` — Local dev with Turbopack.
- `npm run build:validate` — Verify required env via `scripts/validate-env.js`.
- `npm run build` — Create production bundle.
- `npm run start` — Start production server.
- `npm run lint` — Lint; fix issues before PRs.
- `npx vitest` — Run unit tests. `npx playwright test` — Run E2E suite.

## Coding Style & Naming Conventions
- TypeScript + React 19; 2‑space indentation.
- Components in `src/components/` use PascalCase filenames; routes follow App Router (`page.tsx`, `layout.tsx`).
- Format with Prettier (+ `prettier-plugin-tailwindcss`). ESLint configs: `next/core-web-vitals`, `next/typescript` must pass locally.
- Environment: copy `.env.example` to `.env.local`; never commit secrets.

## Testing Guidelines
- Unit: Vitest or Jest; colocate tests with `*.test.ts`/`*.test.tsx`. Aim for smoke coverage on key utilities.
- E2E: Playwright specs under `src/app/(e2e)/`; cover critical flows (auth, checkout, forms).
- Commands: `npx vitest` and `npx playwright test`. Keep tests deterministic; stub external services.

## Commit & Pull Request Guidelines
- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`). Branch from `feature/...`, `fix/...`, or `chore/...`.
- PRs: describe scope, link issues, include UI artifacts (screenshots/videos) and Lighthouse diffs for perf changes.
- Ensure `npm run lint` and `npm run build:validate` succeed before requesting review. Document env/deploy updates in `docs/05-deployment/deployment-sop.md`.

## Security & Configuration Tips
- Validate env with `node scripts/validate-env.js`. Keep Stripe, Supabase, and Brevo credentials out of VCS; configure webhook signatures per README.
- Review `docs/03-architecture/` for integration patterns before changing backend/service communication.
