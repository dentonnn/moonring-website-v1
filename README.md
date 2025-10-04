# Moon Ring Marketing Website

> High-converting marketing and conversion website for Moon Ring - a social accountability platform for wearable device users.

## 🎯 Project Purpose

This repository contains the **marketing website** for Moon Ring, designed to:

- Drive high-quality conversions from visitors to customers
- Showcase the product professionally for PR and media
- Enable seamless product ordering via Stripe integration
- Communicate the value proposition of social accountability for fitness

**Important**: This is the marketing/storefront site, NOT the Moon Ring platform itself (mobile apps, wearable integrations).

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router & Turbopack
- **Frontend**: React 19, TypeScript 5, Tailwind CSS 4
- **Payments**: Stripe integration for product ordering
- **Backend**: Supabase (database, auth, storage)
- **Email**: Resend for transactional emails
- **Monitoring**: Sentry for error tracking, Vercel Analytics for performance
- **Deployment**: Vercel (optimized for Next.js)

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- Supabase account (for database)
- Stripe account (for payments, test mode OK)
- Resend account (for emails)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/dentonnn/moonring-website-v1.git
   cd moonring-website-v1
   ```

2. **Navigate to the Next.js app**
   ```bash
   cd moon-ring-platform
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys (see Environment Variables section)
   ```

5. **Apply database migrations** (if needed)
   ```bash
   ./apply-migration.sh
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Development guide for Claude Code
- **[Development Workflow](./docs/04-implementation/development-workflow.md)** - Coding standards and best practices
- **[Deployment SOP](./docs/05-deployment/deployment-sop.md)** - **MANDATORY** Vercel deployment procedure
- **[Architecture](./docs/03-architecture/fullstack-architecture.md)** - Technical architecture overview
- **[Marketing Website PRD](./docs/02-requirements/marketing-website-prd.md)** - Product requirements
- **[Documentation Index](./docs/00-INDEX.md)** - Complete documentation map


## 📊 Current Status

**~95% complete** - Production-ready marketing website with:

- ✅ Homepage with hero, features, pricing
- ✅ Legal pages (Privacy Policy, Terms of Service)
- ✅ About page with mission and team
- ✅ Blog structure with ISR caching
- ✅ Research library page
- ✅ Contact form with Resend integration
- ✅ Cookie consent (GDPR-compliant)
- ✅ Stripe checkout integration
- ✅ Supabase database with migrations
- ✅ Sentry error monitoring
- ✅ Google Analytics 4 integration
- ✅ Zero TypeScript/lint errors
- ✅ Optimized bundle sizes (~170KB First Load JS)

**Next Phase**: Asset creation and content (Phase 4)

## 🔒 Security Notes

- **Never commit** `.env.local` or any files containing API keys
- Use test mode for Stripe during development
- Supabase RLS policies are enforced on all tables
- Webhook endpoints validate signatures before processing


## 📄 License

Copyright © 2025 Moon Ring. All rights reserved.

---

**Built with** ❤️ **using Next.js 15, React 19, and Claude Code**
