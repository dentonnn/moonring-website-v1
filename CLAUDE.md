# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This is the **marketing and conversion website** for Moon Ring - a social accountability platform for wearable device users. The website's primary goals are:

- **High-quality conversion** - Drive visitors to become customers
- **PR and media presence** - Showcase the product professionally
- **Product ordering** - Enable seamless purchase flow via Stripe integration
- **Brand storytelling** - Communicate the value proposition of social accountability for fitness

**IMPORTANT SCOPE CLARIFICATION:**
- This repository builds **ONLY the marketing website** (the storefront/conversion funnel)
- We are NOT building the Moon Ring platform itself (mobile apps, wearable integrations, social features)
- The PRD (`docs/moon-ring-project-prd.md`) is **reference material** explaining the product we're marketing
- Think: We're building Apple.com, not iOS - the website that sells the product, not the product itself

## Project Structure

- **Root Level**: Meta-project with bmad-method tooling and project documentation
- **`moon-ring-platform/`**: Main Next.js 15 marketing website
  - Uses React 19, TypeScript 5, and Tailwind CSS 4
  - App Router structure in `src/app/` with layout.tsx and page.tsx
  - Integrates Stripe for payment processing and order flow
  - Supabase for user data, waitlists, and backend needs
  - Configured for high-performance conversion optimization

## Development Commands

### Primary Development (moon-ring-platform/)
Navigate to `moon-ring-platform/` directory first, then run:

```bash
cd moon-ring-platform
npm install          # Install dependencies (if node_modules missing)
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint
```

**Note**: No test runner is currently configured in this project.

### Root Level Tools
```bash
npm run bmad:refresh     # Refresh bmad-method tooling
npm run bmad:list        # List available agents
npm run bmad:validate    # Validate bmad configuration
```

## Environment Setup

Before running the development server:

1. Navigate to `moon-ring-platform/` directory
2. Copy `.env.example` to `.env.local`: `cp .env.example .env.local`
3. Configure required environment variables in `.env.local`:
   - **Supabase**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - **Stripe**: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
   - **Email**: `RESEND_API_KEY` (for Resend email service)
   - **App URL**: `NEXT_PUBLIC_APP_URL` (defaults to `http://localhost:3000`)
4. Run `npm install` if `node_modules/` is missing

## Development Best Practices (Summary)

- Anchor implementation in `docs/moon-ring-project-prd.md`, `docs/front-end-spec.md`, and the assigned `docs/stories/` file; only edit Dev Agent Record sections.
- Create short-lived feature branches off `dev`, name them after the story, and stay current with rebases before PRs.
- Configure `.env.local`, work from `moon-ring-platform/`, and keep `npm run dev` plus `npm run lint` in regular rotation.
- Adhere to the Next.js 15 + Tailwind + Supabase + Stripe stack decisions; commit Supabase schema updates alongside code.
- Ship tests and accessibility checks with new features and ensure lint/build checks succeed prior to review.
- Record key decisions, coordinate scope changes with PM/PO partners, and capture validation steps in PR descriptions.
- Full guidance lives in `docs/development-best-practices.md`.

## Architecture Overview

**Framework**: Next.js 15 with App Router optimized for marketing sites
- **Styling**: Tailwind CSS 4 with custom design system for brand consistency
- **UI Components**: Lucide React icons, conversion-focused components
- **Payments**: Stripe.js integration for seamless product ordering
- **Backend**: Supabase for user management, waitlists, and analytics
- **TypeScript**: Strict mode with path aliases (`@/*` → `./src/*`)
- **Performance**: Turbopack bundling, optimized for conversion metrics
- **Code Quality**: ESLint (Next.js config) + Prettier with Tailwind plugin

**Key Dependencies**:
- `@stripe/stripe-js` and `stripe` for payment processing and order management
- `@supabase/ssr` and `@supabase/supabase-js` for server-side rendering and user data
- `@tailwindcss/forms` and `@tailwindcss/typography` for polished UI
- `resend` for transactional email
- `lucide-react` for icons
- Custom font loading with next/font (Geist Sans/Mono)

### Source Directory Structure (`moon-ring-platform/src/`)

```
src/
├── app/                    # Next.js 15 App Router pages and layouts
│   ├── api/               # API routes
│   │   ├── checkout/     # Stripe checkout endpoints
│   │   ├── health/       # Health check endpoint
│   │   └── webhooks/     # Webhook handlers (Stripe)
│   ├── layout.tsx        # Root layout with fonts and metadata
│   └── page.tsx          # Homepage
├── components/            # React components
│   └── forms/            # Form components (EmailCaptureForm, etc.)
├── lib/                  # Shared utilities and configurations
│   ├── email/            # Email service utilities (Resend)
│   └── supabase/         # Supabase client and server utilities
└── types/                # TypeScript type definitions
    └── database.ts       # Supabase database types
```

**Supabase**: Database schema migrations are stored in `moon-ring-platform/supabase/migrations/`. When updating the database schema, add migration files here and commit them alongside code changes.

**Current State**: Next.js project with foundational API routes, Supabase integration, Stripe payment flow, and email capture. Ready for building marketing pages, product showcase, pricing, testimonials, and conversion funnels. The goal is creating a high-converting website that communicates Moon Ring's value as a social accountability platform for wearable users.
- memorize this purpose for the website so you don't confuse overbloated features in future