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
npm run dev              # Start development server with Turbopack (default: localhost:3000)
npm run build            # Build for production with Turbopack
npm run build:validate   # Validate environment variables then build
npm run start            # Start production server
npm run lint             # Run ESLint
```

**Port Conflicts**: If port 3000 is already in use, Next.js will automatically try port 3001, 3002, etc. You can also specify a custom port:
```bash
PORT=3003 npm run dev    # Run on custom port
```

**Additional Commands**:
```bash
ANALYZE=true npm run build  # Analyze bundle size with @next/bundle-analyzer
                            # Use when: investigating bundle bloat, optimizing imports,
                            # or reducing First Load JS size for performance
```

**Pre-Commit Validation** (always run before git commit):
```bash
npm run lint             # Fix lint violations - never commit with violations
npm run build:validate   # Verify env vars are configured correctly
```

**How `build:validate` works**:
The `build:validate` script (defined in `package.json`) runs `./build.sh`, which performs two critical checks:
1. **Environment Validation**: Runs `node scripts/validate-env.js` to check all required env vars from `.env.example` are present
2. **Production Build**: Runs `next build --turbopack` to verify the code compiles without errors

Both checks must pass before committing. If env validation fails, the build is aborted (prevents broken deployments).

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
3. Configure required environment variables in `.env.local` (in priority order for setup):
   - **Stripe** (payment tests): `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (get from https://dashboard.stripe.com/keys - use test keys)
   - **Supabase** (database): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (get from Supabase Dashboard → Settings → API)
   - **Email**: `BREVO_API_KEY` (for Brevo email service - get from https://app.brevo.com/settings/keys/api)
   - **App URL**: `NEXT_PUBLIC_APP_URL` (defaults to `http://localhost:3000` - only change if running on different port)
   - **Webhooks** (production only): `STRIPE_WEBHOOK_SECRET` (get from Stripe Dashboard → Webhooks after setting up endpoint)
   - **Analytics** (optional): `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_HOTJAR_ID`
4. Run `npm install` if `node_modules/` is missing
5. Validate setup: `npm run build:validate` (checks all required env vars are present)
6. Apply database migrations if needed: `./apply-migration.sh` (see Database Management section)

**Important Notes**:
- Never commit `.env.local` or any files containing API keys
- The `.env.example` file is the source of truth for required variables
- For development: Use Stripe **test mode** keys (start with `pk_test_` and `sk_test_`)
- If Stripe webhook secret is missing, local webhook testing will be skipped (safe for dev)

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
├── 07-archive/            # Completed work and historical reference
└── 08-marketing/          # Marketing campaigns and copy
    ├── campaigns/        # Campaign-specific materials
    └── copy/             # Messaging and copy templates
```

**Current Work**: Refer to `docs/00-INDEX.md` to find the most relevant documentation for your task.

## Development Best Practices (Summary)

- **Working Directory**: All development commands must be run from `moon-ring-platform/` directory
- **Source of Truth**: Anchor implementation in `docs/02-requirements/marketing-website-prd.md`, `docs/03-architecture/frontend-spec.md`, and `docs/04-implementation/development-workflow.md`
- **AI Development**: See [AGENTS.md](AGENTS.md) for coding style, testing guidelines, and commit conventions specific to AI-assisted development
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
  - Email templates: `src/lib/email/brevo.ts` (`emailTemplates` object)
  - Templates include: welcome, contact confirmation, order confirmation
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
│   │   ├── cron/         # Scheduled jobs and background tasks
│   │   │   └── waitlist-emails/  # Automated waitlist nurture emails
│   │   ├── health/       # Health check endpoint
│   │   ├── newsletter/   # Newsletter subscription with Brevo
│   │   │   ├── subscribe/    # Subscribe to newsletter
│   │   │   └── unsubscribe/  # Unsubscribe from newsletter
│   │   ├── waitlist/     # Waitlist conversion endpoints
│   │   │   ├── set-goal/        # Capture user fitness goals
│   │   │   └── track-download/  # Track app download events
│   │   └── webhooks/     # Webhook handlers (Stripe events)
│   ├── blog/              # Blog listing and individual post pages
│   ├── contact/           # Contact page with form
│   ├── demo/              # Interactive demo with commitment builder
│   ├── download/          # App download page (waitlist entry point)
│   ├── enterprise/        # Enterprise offering and B2B sales page
│   ├── hardware/          # Hardware showcase with wearable compatibility
│   ├── hero-mockup-v2/    # Experimental hero section variant (brand color testing)
│   ├── how-it-works/      # Detailed how-it-works flow
│   ├── pricing/           # Standalone pricing page
│   ├── privacy/           # Privacy policy (legal)
│   ├── research/          # Research library page
│   ├── success-stories/   # Testimonials and case studies page
│   ├── support/           # Customer support page
│   ├── terms/             # Terms of service (legal)
│   ├── unsubscribe/       # Newsletter unsubscribe confirmation page
│   ├── waitlist/          # Multi-step waitlist flow
│   │   └── goal-selection/  # Goal selection step in waitlist
│   ├── layout.tsx         # Root layout with fonts and metadata
│   ├── page.tsx           # Homepage with hero, features, pricing
│   ├── error.tsx          # Global error boundary
│   ├── not-found.tsx      # 404 page
│   ├── robots.ts          # Robots.txt configuration
│   └── sitemap.ts         # Sitemap generation
├── components/             # React components
│   ├── animations/        # Animation components (Framer Motion patterns)
│   │   ├── AnimatedSection.tsx      # Fade-in on scroll animations
│   │   ├── AnimatedStats.tsx        # Animated statistics grid
│   │   ├── FloatingElement.tsx      # Floating/hovering animations
│   │   └── StaggerChildren.tsx      # Staggered child animations
│   ├── forms/             # Form components
│   │   └── EmailCaptureForm.tsx  # Email waitlist capture
│   ├── Analytics.tsx      # Analytics wrapper component
│   ├── ChooseYourPathInteractive.tsx  # Interactive path selection with state
│   ├── CommitmentMomentsCarousel.tsx  # Showcase commitment moments
│   ├── ContactForm.tsx    # Contact page form with Brevo integration
│   ├── CookieConsent.tsx  # GDPR cookie banner
│   ├── FAQAccordion.tsx   # Accordion component for FAQ section
│   ├── FAQSection.tsx     # FAQ section wrapper component
│   ├── HardwareShowcase.tsx  # Display wearable device compatibility
│   ├── HeroVideo.tsx      # Hero video component with controls
│   ├── Navigation.tsx     # Main nav with mobile menu (4 items)
│   ├── OptimizedImage.tsx # Image optimization wrapper
│   ├── PhoneMockup.tsx    # Phone screenshot wrapper
│   ├── StatWithTooltip.tsx  # Stat display with source attribution tooltips
│   ├── TestimonialsSection.tsx  # Testimonials grid component
│   └── WearableCarousel.tsx  # Interactive wearable device carousel
├── hooks/                 # Custom React hooks
│   ├── useInView.ts       # Intersection Observer hook for animations
│   └── useReducedMotion.ts # Accessibility hook for reduced motion preference
├── lib/                   # Shared utilities and configurations
│   ├── analytics/         # Analytics utilities and tracking helpers
│   ├── bot-protection/    # Bot detection and protection
│   ├── email/             # Email service utilities
│   │   └── brevo.ts       # Brevo API client and email templates
│   ├── supabase/          # Supabase client and server utilities
│   │   ├── client.ts      # Browser client
│   │   └── server.ts      # Server-side client
│   ├── blogData.ts        # Centralized blog content data
│   ├── faqData.ts         # FAQ content data
│   ├── metadata.ts        # SEO metadata utilities
│   └── rate-limit.ts      # API rate limiting
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

**Current State**: ~99% complete production-ready marketing website. **Recent Development** (feature/wearable-carousel branch): Active development on wearable device compatibility showcase with interactive carousel component, hardware page expansion, and download conversion optimization.

**Completed Features**:
- **Core Pages**: Homepage with hero video, About, Contact, Pricing, How It Works, Success Stories, Support, Enterprise
- **Legal & Compliance**: Privacy Policy, Terms of Service, Cookie Consent (GDPR-compliant)
- **Content Hub**: Blog with ISR caching and internal linking, Research library
- **Conversion Funnels**: Multi-step waitlist flow with goal selection, Download page, Interactive demo with commitment builder
- **Hardware Showcase**: Wearable device compatibility pages with brand logos (Apple, Samsung, Garmin, Fitbit, Oura, Whoop)
- **UX Improvements Phase 1**: All 12 tasks completed (simplified 4-item nav, responsive video, accessible controls, stat tooltips, touch targets, optimized CTAs, video posters)

**Technical Stack**:
- **Infrastructure**: Full Supabase + Stripe + Vercel Analytics + Sentry monitoring integration
- **Email System**: Brevo with transactional emails (contact confirmation, newsletter welcome, waitlist nurture sequences) - 9,000 emails/month capacity
- **Animation System**: Framer Motion patterns with custom hooks (useInView, useReducedMotion) for accessibility-first animations
- **API Layer**: Rate limiting, bot protection, webhook handlers, cron jobs for automated emails
- **Components**: 19 reusable components including WearableCarousel, HardwareShowcase, CommitmentMomentsCarousel, StatWithTooltip, PhoneMockup
- **Data Management**: Centralized content data (blogData.ts, faqData.ts), metadata utilities, analytics tracking helpers

**Code Quality**:
- TypeScript strict mode with zero lint errors
- Build passing with optimized bundle sizes (First Load JS ~170KB homepage)
- WCAG 2.1 AA compliant
- Prettier + ESLint with Tailwind plugin for consistent formatting

**Ready for**: Production deployment, A/B testing, performance optimization, SEO enhancement. The goal is creating a high-converting website that communicates Moon Ring's value as a social accountability platform for wearable users without building the actual platform itself.

## Key Architectural Patterns

**Client vs Server Components** (CRITICAL for performance):
- Use **Server Components by default** (Next.js 15 App Router) - renders on server, reduces JS bundle
- Mark Client Components with `'use client'` directive ONLY for:
  - Forms with state/interactivity (ContactForm, EmailCaptureForm, ChooseYourPathInteractive)
  - Components using browser APIs (localStorage, window object, event handlers)
  - Animation components (Framer Motion)
- **Supabase clients**: Use `lib/supabase/client.ts` in Client Components, `lib/supabase/server.ts` in Server Components
- **Rule of thumb**: If it doesn't need interactivity, keep it a Server Component (better for SEO, faster FCP)

**API Routes** (secure backend operations):
- Checkout flow: `/api/checkout` creates Stripe sessions (validates purchase params server-side)
- Webhooks: `/api/webhooks/stripe` handles payment events (validates webhook signature before processing)
- Contact: `/api/contact` processes form submissions via Brevo (server-side email service)
- Newsletter: `/api/newsletter/subscribe` handles newsletter signups with welcome emails
- Health: `/api/health` checks service connectivity
- **Security pattern**: All API routes validate inputs and authenticate (middleware.ts) before processing

**Data Flow**:
1. Client submits form with validation (Zod schema)
2. Sends POST to API route with structured data
3. API route validates input again server-side (defense in depth)
4. API route calls Stripe/Supabase/Brevo services
5. Response returned to client with status code
6. Webhook handlers (async) update database based on external events

**Styling Approach**:
- Tailwind utility classes for all styling (no component CSS files)
- Glass-morphism design with brand gradient (#FF33BA → #FF9966)
- Mobile-first responsive (320px → 1024px+)
- Custom CSS in `globals.css` only for animations and complex effects
- Prettier with `prettier-plugin-tailwindcss` maintains class order (Tailwind → other utilities)
- **Theme consistency**: Use Tailwind opacity modifiers and gradient stops for brand colors

## Advanced Patterns & Features

### Waitlist Conversion Flow

The waitlist is a critical conversion funnel with multi-step engagement:

**Flow Architecture**:
1. **Entry Point**: User lands on `/download` page or clicks homepage waitlist CTA
2. **Email Capture**: User enters email → captured in Supabase `waitlist_signups` table
3. **Goal Selection**: Redirected to `/waitlist/goal-selection` for fitness goal capture
4. **Goal Submission**: POST to `/api/waitlist/set-goal` → saves goal and preferences to database
5. **Download Tracking**: `/api/waitlist/track-download` records app download events (when available)
6. **Automated Nurture**: `/api/cron/waitlist-emails` sends timed email sequences via Brevo
7. **Unsubscribe**: Users can opt-out via `/api/newsletter/unsubscribe` endpoint

**Key Tables**:
- `waitlist_signups` - Email captures with timestamps
- `waitlist_goals` - User fitness goals and preferences
- `waitlist_downloads` - App download tracking

**Implementation Pattern**:
```typescript
// In API route: Validate → Save to Supabase → Trigger email → Return success
// Example: /api/waitlist/set-goal/route.ts
```

### Custom Hooks

Two custom hooks provide enhanced UX and accessibility:

**`useInView` Hook** (Intersection Observer):
- Triggers animations when elements enter the viewport
- Usage: Import from `@/hooks/useInView` in Client Components
- Powers fade-in, slide-in, and scroll-triggered animations
- Pattern: Returns `ref` and `isInView` boolean

**`useReducedMotion` Hook** (Accessibility):
- Respects user's motion preferences (WCAG 2.1 AA compliance)
- Detects `prefers-reduced-motion` media query
- Usage: Conditionally disable animations for accessibility
- Pattern: Returns boolean indicating if reduced motion is preferred

**Example Usage**:
```typescript
'use client'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function AnimatedComponent() {
  const { ref, isInView } = useInView()
  const prefersReducedMotion = useReducedMotion()

  return (
    <div ref={ref} className={isInView && !prefersReducedMotion ? 'animate-fade-in' : ''}>
      Content
    </div>
  )
}
```

### Rate Limiting & Bot Protection

API routes implement rate limiting and bot detection to prevent abuse:

**Rate Limiting** (`lib/rate-limit.ts`):
- Throttles requests per IP address using Vercel KV or in-memory cache
- Default: 5 requests per minute for form submissions
- Usage: Import and apply at the start of API route handlers

**Bot Protection** (`lib/bot-protection/`):
- Validates request patterns and user agents
- Blocks common bot signatures and suspicious behavior
- Usage: Apply to contact form, newsletter signup, waitlist endpoints

**Implementation Pattern**:
```typescript
// In API route (e.g., /api/contact/route.ts):
import { rateLimit } from '@/lib/rate-limit'
import { detectBot } from '@/lib/bot-protection'

export async function POST(request: Request) {
  // 1. Rate limit check
  const rateLimitResult = await rateLimit(request)
  if (!rateLimitResult.success) {
    return new Response('Too many requests', { status: 429 })
  }

  // 2. Bot detection
  if (detectBot(request)) {
    return new Response('Forbidden', { status: 403 })
  }

  // 3. Process request...
}
```

### Experimental Pages Pattern

**Testing Ground for Hero Variants**:
- `/hero-mockup-v2/` is an experimental page for brand color testing
- **NOT linked in navigation** - accessed via direct URL only
- Purpose: Testing different brand color palettes and visual treatments
- Usage: Compare color variants, gather feedback on visual direction
- **Cleanup**: Move to `/docs/07-archive/` or integrate into main design once color decisions are finalized

**When to use**:
- Testing brand color variations and visual treatments
- Rapid iteration without affecting production homepage
- Collecting stakeholder feedback on design directions

**Important**: This page should not be indexed by search engines (add `noindex` meta tag if not already present).

## Common Issues & Debugging

**"Module not found" or build errors after changing files**:
- Run `npm install` (dependencies may have changed)
- Delete `.next` folder and rebuild: `rm -rf .next && npm run build`
- Check TypeScript errors: `npx tsc --noEmit`

**Stripe webhook not working in development**:
- Webhook secret missing? That's OK - webhooks are skipped locally (safe for dev)
- Use Stripe CLI for local webhook testing (see `docs/05-deployment/troubleshooting.md`)
- In production, webhook secret MUST be configured before deploying

**Supabase database query failures**:
- Check RLS policies are not blocking access: `SELECT * FROM pg_policies WHERE tablename = 'your_table';`
- Verify service role key is configured if using `lib/supabase/server.ts`
- Connection pool exhausted? Restart dev server: `npm run dev`
- For migrations: copy SQL → paste into Supabase SQL Editor → run manually

**Email not sending (Brevo)**:
- Verify `BREVO_API_KEY` is configured in `.env.local`
- Check Brevo dashboard for sender verification (domain/email must be verified)
- Templates: All email templates defined in `src/lib/email/brevo.ts` - verify template names match
- Rate limiting? Brevo free tier allows 9,000 emails/month - check quota

**Performance issues**:
1. **Large bundle size**: Run `ANALYZE=true npm run build` to visualize bundle
2. **Slow page loads**: Check `npm run lint` for unused imports, verify Client Components aren't overused
3. **High CLS (layout shift)**: Add height attributes to images/videos, use Framer Motion animations cautiously
4. **LCP too high**: Move above-fold images to preload in `layout.tsx`, mark hero images as priority

**TypeScript errors**:
- Strict mode is enabled - all types must be explicit
- Check error with `npx tsc --noEmit --pretty` for full error context
- Review `tsconfig.json` for path aliases: `@/*` → `./src/*`

**Lint failures before commit**:
- Run `npm run lint` to see all violations
- Most can be auto-fixed: `npx eslint --fix` (but not all)
- Common issues: unused variables, missing key props in lists, missing alt text on images
- Don't suppress warnings - fix the underlying issue instead

## Code Review Guidelines (for AI development)

When implementing features or fixes, prioritize:

1. **Architecture First**: Does the feature follow established patterns (Server/Client components, API route flow)?
2. **TypeScript Strict**: Are all types explicit? No implicit `any` types?
3. **Component Isolation**: Is state managed at the right level? Can components be reused?
4. **Performance Impact**: Is this adding Client Components where Server Components would work? Check with bundle analyzer.
5. **Security**: Are API routes validating inputs? Are sensitive keys kept in env vars?
6. **Accessibility**: Do forms have labels? Are colors accessible? Do interactive elements have proper ARIA attributes?
7. **Error Handling**: Does the feature handle network failures gracefully? Are error messages user-friendly?
8. **Testing**: Are critical paths covered (checkout, contact form, newsletter signup)?

## Related Configuration Files

- **AGENTS.md** - Additional guidelines for AI development agents (coding style, testing, commits)
- **README.md** - Project overview and quick start guide
- **vercel.json** - Vercel deployment configuration (at repository root)
- **moon-ring-platform/next.config.ts** - Next.js configuration with bundle analyzer and Sentry setup
- **moon-ring-platform/.env.example** - Environment variables template (source of truth)
- **docs/00-INDEX.md** - Complete documentation index and navigation guide
