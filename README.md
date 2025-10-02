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

## 📁 Project Structure

```
moonring-website-v1/
├── moon-ring-platform/          # Main Next.js application
│   ├── src/
│   │   ├── app/                # Next.js App Router pages
│   │   ├── components/         # React components
│   │   └── lib/                # Utilities and configurations
│   ├── public/                 # Static assets
│   ├── supabase/               # Database migrations
│   └── .env.local              # Environment variables (not committed)
├── docs/                       # Project documentation
│   ├── roadmaps/              # Execution plans and phases
│   ├── stories/               # Feature implementation tasks
│   └── *.md                   # Architecture and guides
└── README.md                   # This file
```

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

### Environment Variables

Required variables in `moon-ring-platform/.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
RESEND_API_KEY=re_...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

See `moon-ring-platform/.env.example` for the complete list.

## 📜 Available Commands

All commands should be run from the `moon-ring-platform/` directory:

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Development guide for Claude Code
- **[Development Best Practices](./docs/development-best-practices.md)** - Coding standards and workflows
- **[Deployment Guide](./moon-ring-platform/DEPLOYMENT.md)** - Vercel deployment instructions
- **[Architecture](./docs/fullstack-architecture.md)** - Technical architecture overview
- **[Phase 3 Plan](./docs/roadmaps/phase-3-plan.md)** - Current development roadmap

## 🚢 Deployment

The site is optimized for deployment on Vercel. See [moon-ring-platform/DEPLOYMENT.md](./moon-ring-platform/DEPLOYMENT.md) for detailed instructions including:

- Environment variable configuration
- Stripe webhook setup
- Custom domain configuration
- Production checklist

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

## 🤝 Contributing

1. Create a feature branch from `dev`: `git checkout -b feature/your-feature-name dev`
2. Make your changes in the `moon-ring-platform/` directory
3. Ensure `npm run lint` and `npm run build` pass
4. Commit following conventional commits style
5. Open a PR against the `dev` branch

## 📄 License

Copyright © 2025 Moon Ring. All rights reserved.

---

**Built with** ❤️ **using Next.js 15, React 19, and Claude Code**
