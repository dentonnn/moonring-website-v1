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
5. Apply database migrations if needed: `./apply-migration.sh`

## Deployment

For production deployment to Vercel, see detailed instructions in `moon-ring-platform/DEPLOYMENT.md`, which covers:
- Vercel deployment steps and environment variable configuration
- Stripe webhook endpoint setup for production
- Custom domain configuration
- Health check verification (`/api/health`)
- Common deployment troubleshooting

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
│   ├── about/             # About page with mission and team
│   ├── api/               # API routes
│   │   ├── checkout/     # Stripe checkout session creation
│   │   ├── contact/      # Contact form submission handler
│   │   ├── health/       # Health check endpoint
│   │   └── webhooks/     # Webhook handlers (Stripe events)
│   ├── blog/              # Blog listing and individual post pages
│   ├── contact/           # Contact page with form
│   ├── privacy/           # Privacy policy (legal)
│   ├── research/          # Research library page
│   ├── terms/             # Terms of service (legal)
│   ├── layout.tsx         # Root layout with fonts and metadata
│   └── page.tsx           # Homepage with hero, features, pricing
├── components/             # React components
│   ├── forms/             # Form components
│   │   └── EmailCaptureForm.tsx  # Email waitlist capture
│   ├── ContactForm.tsx    # Contact page form with Resend integration
│   ├── CookieConsent.tsx  # GDPR cookie banner
│   ├── FAQAccordion.tsx   # Accordion component for FAQ section
│   ├── Navigation.tsx     # Main nav with mobile menu
│   └── OptimizedImage.tsx # Image optimization wrapper
├── lib/                   # Shared utilities and configurations
│   ├── email/             # Email service utilities
│   │   └── resend.ts      # Resend API client
│   └── supabase/          # Supabase client and server utilities
│       ├── client.ts      # Browser client
│       └── server.ts      # Server-side client
├── middleware.ts          # Session tracking and route protection
└── types/                 # TypeScript type definitions
    └── database.ts        # Supabase database types
```

**Database Management**:
- Schema migrations: `moon-ring-platform/supabase/migrations/`
- Apply migrations using `./apply-migration.sh` script (from moon-ring-platform/)
- When updating schema, create migration files and commit with code changes

**Asset Management**:
- Images, fonts, and static files: `moon-ring-platform/public/`
- See `moon-ring-platform/ASSETS_GUIDE.md` for image optimization guidelines

**Current State**: ~85% complete marketing website with homepage, legal pages (privacy/terms), about page, blog structure, research library, contact form, and cookie consent. Supabase + Stripe integration functional. Ready for Phase 3 (backend feature integration) and asset optimization. The goal is creating a high-converting website that communicates Moon Ring's value as a social accountability platform for wearable users without building the actual platform itself.

## Key Architectural Patterns

**Client vs Server Components**:
- Use Server Components by default (Next.js 15 App Router)
- Mark Client Components with `'use client'` directive (e.g., forms, interactive UI)
- Supabase has separate clients: `lib/supabase/client.ts` (browser) and `lib/supabase/server.ts` (server-side)

**API Routes**:
- Checkout flow: `/api/checkout` creates Stripe sessions
- Webhooks: `/api/webhooks/stripe` handles payment events (requires webhook secret)
- Contact: `/api/contact` processes form submissions via Resend
- Health: `/api/health` checks service connectivity

**Data Flow**:
1. User submits form (email capture, contact, checkout)
2. Client-side validation, then API route call
3. API route interacts with Supabase (data) or Stripe/Resend (services)
4. Webhook handlers update database based on external events

**Styling Approach**:
- Tailwind utility classes for all styling
- Glass-morphism design with brand gradient (#FF33BA → #FF9966)
- Mobile-first responsive (320px → 1024px+)
- Custom CSS in `globals.css` only for animations and complex effects