# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Critical Context

**MONOREPO STRUCTURE**: This repository has a specific layout that affects all development and deployment:
- **Repository root** (`moonring-website-v1/`) contains meta-project tooling, documentation, and deployment config
- **Next.js application** lives in `moon-ring-platform/` subdirectory
- **All development commands** must be run from `moon-ring-platform/` directory
- **Deployment** must be triggered from repository root (see Deployment section)

**DO NOT**:
- Run `npm` commands from repository root (except bmad-method tools)
- Deploy from `moon-ring-platform/` subdirectory when Root Directory is configured in Vercel
- Create or edit files outside `moon-ring-platform/` unless working on documentation or deployment config

## Project Purpose

This is the **marketing and conversion website** for Moon Ring - a social accountability platform for wearable device users. The website's primary goals are:

- **High-quality conversion** - Drive visitors to become customers
- **PR and media presence** - Showcase the product professionally
- **Product ordering** - Enable seamless purchase flow via Stripe integration
- **Brand storytelling** - Communicate the value proposition of social accountability for fitness

**IMPORTANT SCOPE CLARIFICATION:**
- This repository builds **ONLY the marketing website** (the storefront/conversion funnel)
- We are NOT building the Moon Ring platform itself (mobile apps, wearable integrations, social features)
- The PRD (`docs/02-requirements/platform-prd.md`) is **reference material** explaining the product we're marketing
- Think: We're building Apple.com, not iOS - the website that sells the product, not the product itself

## Project Structure

- **Root Level**: Meta-project with bmad-method tooling, project documentation, and Vercel config
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
npm install              # Install dependencies (if node_modules missing)
npm run dev              # Start development server with Turbopack
npm run build            # Build for production with Turbopack
npm run build:validate   # Validate environment variables then build
npm run start            # Start production server
npm run lint             # Run ESLint
```

**Additional Commands**:
```bash
ANALYZE=true npm run build  # Analyze bundle size with @next/bundle-analyzer
```

**Note**: No test runner is currently configured in this project. When adding tests, prefer:
- Unit tests (Vitest/Jest) for lib/utils
- E2E tests (Playwright) for critical flows (home, checkout, contact form)
- Colocated test files (e.g., `src/lib/foo.test.ts`)

### Root Level Tools (bmad-method)
The root level contains bmad-method tooling for agent orchestration:

```bash
npm run bmad:refresh     # Refresh bmad-method tooling
npm run bmad:list        # List available agents
npm run bmad:validate    # Validate bmad configuration
```

**What is bmad-method?** A meta-framework for orchestrating development agents and workflows. You generally won't need to interact with it directly - focus on the Next.js app in `moon-ring-platform/`.

## Environment Setup

Before running the development server:

1. Navigate to `moon-ring-platform/` directory
2. Copy `.env.example` to `.env.local`: `cp .env.example .env.local`
3. Configure required environment variables in `.env.local`:
   - **Supabase**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - **Stripe**: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
   - **Email**: `BREVO_API_KEY` (for Brevo email service - get from https://app.brevo.com/settings/keys/api)
   - **App URL**: `NEXT_PUBLIC_APP_URL` (defaults to `http://localhost:3000`)
   - **Analytics** (optional): `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_HOTJAR_ID`
4. Run `npm install` if `node_modules/` is missing
5. Apply database migrations if needed: `./apply-migration.sh` (see Database Management section)

**Important**: Never commit `.env.local` or any files containing API keys. The `.env.example` file is the source of truth for required variables.

## Deployment

**⚠️ CRITICAL: MANDATORY PRE-DEPLOYMENT CHECK**

**BEFORE deploying to Vercel (preview, production, or any environment), you MUST:**

1. **Read and follow** [`docs/05-deployment/deployment-sop.md`](docs/05-deployment/deployment-sop.md) - Comprehensive Standard Operating Procedure
2. **Complete the Pre-Deployment Checklist** in Phase 1 of the SOP
3. **Verify** no stray framework config files exist at repository root
4. **Confirm** Framework Preset is explicitly set to "Next.js" in Vercel dashboard
5. **Ensure** all environment variables are configured before first deployment

**Why this matters**: The deployment SOP was created from a 45-minute debugging session that resolved 404 errors caused by:
- Stray `next.config.js` at repo root confusing framework detection
- Implicit framework detection failing in monorepo structure
- Deploying from wrong directory context
- Missing environment variables causing build failures

Following the SOP prevents these issues and reduces deployment time from 45 minutes to 5 minutes.

**Quick deployment reference** (detailed steps in `docs/05-deployment/deployment-sop.md`):
```bash
# 1. Pre-flight check (from repo root)
find . -maxdepth 1 -name "*.config.*" -type f  # Should be empty

# 2. Verify settings
cat .vercel/project.json | jq '.settings.framework'  # Should be "nextjs"

# 3. Deploy from repo root (NOT subdirectory)
cd /path/to/moonring-website-v1
vercel --prod
```

For additional deployment documentation, see:
- **[`docs/05-deployment/deployment-sop.md`](docs/05-deployment/deployment-sop.md)** - **PRIMARY REFERENCE** - Complete deployment workflow and troubleshooting
- `moon-ring-platform/DEPLOYMENT.md` - Legacy deployment instructions
- `moon-ring-platform/VERCEL_DEPLOYMENT.md` - Vercel-specific deployment guide

These cover:
- Vercel deployment steps and environment variable configuration
- Stripe webhook endpoint setup for production
- Custom domain configuration
- Health check verification (`/api/health`)
- Comprehensive troubleshooting decision trees

## Documentation Structure

The `docs/` directory is organized by purpose. **Start here**: [`docs/00-INDEX.md`](docs/00-INDEX.md) for a complete documentation map.

Quick reference by category:

```
docs/
├── 00-INDEX.md            # 📍 START HERE - Complete documentation navigation guide
├── 01-strategy/           # High-level vision and project briefs
│   └── project-brief.md
├── 02-requirements/       # Product requirements and specifications
│   ├── marketing-website-prd.md    # THIS project's scope
│   └── platform-prd.md              # Reference only (product we're marketing)
├── 03-architecture/       # Technical architecture and design
│   ├── fullstack-architecture.md
│   └── frontend-spec.md
├── 04-implementation/     # Development guides and workflows
│   ├── setup-guide.md
│   ├── development-workflow.md
│   └── stack-guide.md
├── 05-deployment/         # Deployment and operations
│   ├── deployment-sop.md          # ⚠️ MANDATORY before deploying
│   ├── vercel-setup.md
│   └── troubleshooting.md
├── 06-content/            # Content creation and guidelines
│   ├── blog-article-template.md
│   └── asset-guidelines.md
└── 07-archive/            # Completed work and historical reference
```

**Current Work**: Refer to `docs/00-INDEX.md` to find the most relevant documentation for your task.

## Development Best Practices (Summary)

- **Working Directory**: All development commands must be run from `moon-ring-platform/` directory
- **Source of Truth**: Anchor implementation in `docs/02-requirements/marketing-website-prd.md`, `docs/03-architecture/frontend-spec.md`, and `docs/04-implementation/development-workflow.md`
- **Branching**: Create short-lived feature branches off `dev`, name them `feature/`, `fix/`, or `chore/` prefixes
- **Commits**: Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`)
- **Environment**: Configure `.env.local` in `moon-ring-platform/` directory and validate with `npm run build:validate`
- **Code Quality**: Run `npm run lint` before every commit; fix violations rather than ignoring them
- **Tech Stack**: Next.js 15 + React 19 + TypeScript 5 + Tailwind CSS 4 + Supabase + Stripe + Brevo
- **Formatting**: Prettier with `prettier-plugin-tailwindcss`, 2-space indent
- **Components**: PascalCase files in `src/components/` (e.g., `TestimonialsSection.tsx`)
- **PRs**: Include clear summary, screenshots for UI changes, notes on env/config changes
- Full guidance lives in `docs/04-implementation/development-workflow.md`

## Architecture Overview

**Framework**: Next.js 15 with App Router optimized for marketing sites
- **Styling**: Tailwind CSS 4 with custom design system for brand consistency
- **UI Components**: Lucide React icons, conversion-focused components
- **Payments**: Stripe.js integration for seamless product ordering
- **Backend**: Supabase for user management, waitlists, and analytics
- **Email**: Brevo for transactional and marketing emails (9,000 emails/month free tier)
- **TypeScript**: Strict mode with path aliases (`@/*` → `./src/*`)
- **Performance**: Turbopack bundling, optimized for conversion metrics
- **Code Quality**: ESLint (Next.js config) + Prettier with Tailwind plugin
- **Monitoring**: Vercel Analytics for performance, Sentry for error tracking (optional)
- **Analytics**: Google Analytics 4 and Hotjar (optional)

**Key Dependencies**:
- `@stripe/stripe-js` and `stripe` for payment processing and order management
- `@supabase/ssr` and `@supabase/supabase-js` for server-side rendering and user data
- `@tailwindcss/forms` and `@tailwindcss/typography` for polished UI
- `@getbrevo/brevo` for transactional and marketing emails
- `lucide-react` for icons
- `@vercel/analytics` for performance monitoring
- `@sentry/nextjs` for error tracking (currently commented out in next.config.ts)
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
│   │   ├── newsletter/   # Newsletter subscription with Brevo
│   │   └── webhooks/     # Webhook handlers (Stripe events)
│   ├── blog/              # Blog listing and individual post pages
│   ├── contact/           # Contact page with form
│   ├── privacy/           # Privacy policy (legal)
│   ├── research/          # Research library page
│   ├── terms/             # Terms of service (legal)
│   ├── layout.tsx         # Root layout with fonts and metadata
│   └── page.tsx           # Homepage with hero, features, pricing
├── components/             # React components
│   ├── animations/        # Animation components (Framer Motion patterns)
│   │   ├── AnimatedSection.tsx      # Fade-in on scroll animations
│   │   ├── AnimatedStats.tsx        # Animated statistics grid
│   │   ├── FloatingElement.tsx      # Floating/hovering animations
│   │   └── StaggerChildren.tsx      # Staggered child animations
│   ├── forms/             # Form components
│   │   └── EmailCaptureForm.tsx  # Email waitlist capture
│   ├── ChooseYourPathInteractive.tsx  # Interactive path selection with state
│   ├── ContactForm.tsx    # Contact page form with Brevo integration
│   ├── CookieConsent.tsx  # GDPR cookie banner
│   ├── FAQAccordion.tsx   # Accordion component for FAQ section
│   ├── FAQSection.tsx     # FAQ section wrapper component
│   ├── HeroVideo.tsx      # Hero video component with controls
│   ├── Navigation.tsx     # Main nav with mobile menu (4 items)
│   ├── OptimizedImage.tsx # Image optimization wrapper
│   ├── StatWithTooltip.tsx  # Stat display with source attribution tooltips
│   └── TestimonialsSection.tsx  # Testimonials grid component
├── lib/                   # Shared utilities and configurations
│   ├── email/             # Email service utilities
│   │   └── brevo.ts       # Brevo API client and email templates
│   └── supabase/          # Supabase client and server utilities
│       ├── client.ts      # Browser client
│       └── server.ts      # Server-side client
├── middleware.ts          # Session tracking and route protection
└── types/                 # TypeScript type definitions
    └── database.ts        # Supabase database types
```

**Database Management**:
- Schema migrations: `moon-ring-platform/supabase/migrations/`
- **Migration Script**: `./apply-migration.sh` (from `moon-ring-platform/` directory)
  - **Note**: This script is a **helper/guide**, not an automatic migrator
  - It opens migration SQL files and provides instructions for manual application via Supabase Dashboard
  - **Why manual?** Supabase CLI requires database password which we don't store in the repo
  - **Process**: Copy SQL from migration files → Paste into Supabase SQL Editor → Run
  - **Order matters**: Run migrations in sequence (001 → 002) to avoid failures
- When updating schema, create migration files and commit with code changes
- Verify migrations with: `SELECT column_name FROM information_schema.columns WHERE table_name = 'your_table';`

**Asset Management**:
- Images, fonts, and static files: `moon-ring-platform/public/`
- See `docs/06-content/asset-guidelines.md` for image optimization guidelines

**Current State**: ~98% complete production-ready marketing website with full feature parity. **UX Improvements Phase 1 completed** (all 12 tasks: simplified 4-item navigation, responsive video heights, accessible video controls, enhanced demo previews, stat tooltips with sources, improved pricing badges, proper touch targets, path selection hierarchy, deduplicated footer, optimized CTA copy, video poster images). Includes homepage with hero video, legal pages (privacy/terms), about page, blog structure with ISR caching, research library, contact form (Brevo integration with welcome emails), interactive demo page, cookie consent, and testimonials. Full Supabase + Stripe + Vercel Analytics + Sentry monitoring stack integrated. Newsletter signup sends personalized welcome emails via Brevo (9,000 emails/month capacity). Animation system built with Framer Motion patterns for polished interactions. StatWithTooltip component adds data credibility with source attribution. ChooseYourPathInteractive provides guided user segmentation. TypeScript strict mode with zero lint errors. Build passing with optimized bundle sizes (First Load JS ~170KB homepage). WCAG 2.1 AA compliant. Ready for production deployment. The goal is creating a high-converting website that communicates Moon Ring's value as a social accountability platform for wearable users without building the actual platform itself.

## Key Architectural Patterns

**Client vs Server Components**:
- Use Server Components by default (Next.js 15 App Router)
- Mark Client Components with `'use client'` directive (e.g., forms, interactive UI)
- Supabase has separate clients: `lib/supabase/client.ts` (browser) and `lib/supabase/server.ts` (server-side)

**API Routes**:
- Checkout flow: `/api/checkout` creates Stripe sessions
- Webhooks: `/api/webhooks/stripe` handles payment events (requires webhook secret)
- Contact: `/api/contact` processes form submissions via Brevo
- Newsletter: `/api/newsletter/subscribe` handles newsletter signups with welcome emails
- Health: `/api/health` checks service connectivity

**Data Flow**:
1. User submits form (email capture, contact, checkout)
2. Client-side validation, then API route call
3. API route interacts with Supabase (data) or Stripe/Brevo (services)
4. Webhook handlers update database based on external events

**Styling Approach**:
- Tailwind utility classes for all styling
- Glass-morphism design with brand gradient (#FF33BA → #FF9966)
- Mobile-first responsive (320px → 1024px+)
- Custom CSS in `globals.css` only for animations and complex effects
- Prettier with `prettier-plugin-tailwindcss` maintains class order consistency

## Related Configuration Files

- **AGENTS.md** - Additional guidelines for AI development agents (coding style, testing, commits)
- **README.md** - Project overview and quick start guide
- **vercel.json** - Vercel deployment configuration (at repository root)
- **moon-ring-platform/next.config.ts** - Next.js configuration with bundle analyzer and Sentry setup
- **moon-ring-platform/.env.example** - Environment variables template (source of truth)
- **docs/00-INDEX.md** - Complete documentation index and navigation guide
