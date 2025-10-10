# Repository Guidelines

## Project Structure & Module Organization
The Next.js app lives in `moon-ring-platform/` using the App Router (`src/app/`). Shared UI sits in `moon-ring-platform/src/components/`, while utilities and configuration are under `moon-ring-platform/src/lib/` and `moon-ring-platform/src/config/`. Static assets belong in `moon-ring-platform/public/`. Project documentation, including deployment and architecture notes, is stored in `docs/`. Treat the repo root as the place for CI, deployment configs, and auxiliary scripts.

## Build, Test, and Development Commands
Run all commands from `moon-ring-platform/`. Use `npm run dev` for Turbopack-powered local development, `npm run build` for a production bundle, and `npm run build:validate` to confirm required env vars via `scripts/validate-env.js` before building. Start the production server with `npm run start`. Lint the codebase using `npm run lint`; address warnings before opening a PR.

## Coding Style & Naming Conventions
Author components with TypeScript and React 19, keeping indentation at two spaces. Components in `src/components/` use PascalCase filenames (e.g., `TestimonialsSection.tsx`), while routes follow the App Router convention with `page.tsx`/`layout.tsx`. Format code via Prettier with `prettier-plugin-tailwindcss` and ensure ESLint rules (`next/core-web-vitals`, `next/typescript`) pass locally. Store environment variables in `.env.local` cloned from `.env.example`; never commit secrets.

## Testing Guidelines
Add unit coverage with Vitest or Jest near the code under test (e.g., `src/lib/foo.test.ts`). E2E coverage should land in `src/app/(e2e)/`, using Playwright to exercise critical flows like checkout and forms. Run suites manually with `npx vitest` or `npx playwright test` until CI automation is added; prioritize smoke coverage of payments and auth paths.

## Commit & Pull Request Guidelines
Write Conventional Commit messages (`feat:`, `fix:`, `docs:`, `chore:`) and branch from `feature/...`, `fix/...`, or `chore/...`. Pull requests must note scope, link related issues, and include UI artifacts (screenshots, videos) for visual work plus Lighthouse diffs for performance changes. Document env or deployment updates in `docs/05-deployment/deployment-sop.md`. Ensure `npm run lint` and `npm run build:validate` succeed before requesting review.

## Security & Configuration Tips
Validate environment setup with `node scripts/validate-env.js` and keep Stripe, Supabase, and Brevo credentials out of version control. Follow README guidance for webhook signatures and review `docs/03-architecture/` for service integration patterns before touching backend communication paths.
