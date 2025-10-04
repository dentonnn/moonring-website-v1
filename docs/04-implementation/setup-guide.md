# Moon Ring Marketing Website - Environment Setup Guide

## Quick Start Guide

This guide will help you set up the complete development environment for the Moon Ring marketing website, including Supabase, Stripe, email services, and deployment pipeline.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git installed and configured
- Supabase account (free tier works)
- Stripe account (test mode initially)
- Vercel account (for deployment)
- Brevo account (for email - 9,000 emails/month free tier)

## Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone [repository-url]
cd moonring-website-v1

# Navigate to the platform directory
cd moon-ring-platform

# Install dependencies
npm install

# Install Supabase CLI globally (optional but recommended)
npm install -g supabase
```

## Step 2: Supabase Setup

### 2.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a strong database password (save it securely)
3. Select a region close to your target audience
4. Wait for project to initialize (~2 minutes)

### 2.2 Get Supabase Credentials

From your Supabase dashboard:
1. Go to Settings → API
2. Copy the following values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### 2.3 Configure Local Environment

Create `.env.local` in `moon-ring-platform/`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email Service (Brevo)
BREVO_API_KEY=xkeysib-xxxxxxxxxxxx

# Stripe (added in Step 3)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=xxxxxxx
```

### 2.4 Run Database Migrations

```bash
# Link your local project to Supabase
supabase link --project-ref [YOUR-PROJECT-REF]

# Run migrations from Story 1.1
supabase db push

# Or if you have migration files ready:
supabase migration up
```

## Step 3: Stripe Configuration

### 3.1 Get Stripe API Keys

1. Log into [Stripe Dashboard](https://dashboard.stripe.com)
2. Toggle to "Test mode" (important!)
3. Go to Developers → API keys
4. Copy:
   - `Publishable key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `Secret key` → `STRIPE_SECRET_KEY`

### 3.2 Configure Stripe Products

```bash
# Run the Stripe setup script
npm run stripe:setup

# Or manually create in Stripe Dashboard:
# 1. Products → Add Product
# 2. Name: "Moon Ring"
# 3. Add pricing:
#    - One-time: $299 (small), $299 (medium), $299 (large)
#    - Colors as metadata
```

### 3.3 Set Up Stripe Webhooks

1. In Stripe Dashboard → Developers → Webhooks
2. Add endpoint:
   - Endpoint URL: `https://your-domain.com/api/webhooks/stripe`
   - Events to listen:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `checkout.session.completed`
3. Copy the signing secret → `STRIPE_WEBHOOK_SECRET`

## Step 4: Email Service Setup (Brevo)

### 4.1 Create Brevo Account

1. Sign up at [brevo.com](https://www.brevo.com) (free tier: 9,000 emails/month)
2. Verify your email address
3. Get API key from Settings → API Keys → Create new API key
4. Add to `.env.local` as `BREVO_API_KEY`

### 4.2 Configure Email Templates

Create email templates in `src/lib/email/templates/`:
- `welcome.tsx` - Newsletter signup confirmation
- `demo-access.tsx` - Demo registration confirmation
- `order-confirmation.tsx` - Purchase confirmation
- `password-reset.tsx` - Password reset link

## Step 5: Local Development

### 5.1 Start Development Server

```bash
# From moon-ring-platform directory
npm run dev

# Application runs on http://localhost:3000
```

### 5.2 Test Key Features

1. **Database Connection**: Visit `/api/health` → Should return "healthy"
2. **Email Capture**: Test footer newsletter signup
3. **Stripe Checkout**: Use test card `4242 4242 4242 4242`
4. **Demo Registration**: Register at `/demo/register`

## Step 6: Deployment Setup

### 6.1 Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 6.2 Environment Variables in Vercel

1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Set different values for Preview vs Production as needed

### 6.3 Configure Production Domains

1. In Vercel: Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` in production env vars

## Step 7: Monitoring & Analytics

### 7.1 Google Analytics Setup

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local` as `NEXT_PUBLIC_GA_ID`

### 7.2 Conversion Tracking

```javascript
// Tracking is auto-configured in:
// src/lib/analytics/google-analytics.ts
// src/lib/analytics/conversion-events.ts
```

### 7.3 Error Tracking (Optional)

```bash
# Install Sentry
npm install @sentry/nextjs

# Run setup wizard
npx @sentry/wizard -i nextjs
```

## Common Issues & Solutions

### Issue: Supabase connection errors
**Solution**: Check CORS settings in Supabase Dashboard → Settings → API

### Issue: Stripe webhook failures
**Solution**: Ensure webhook endpoint matches your deployment URL

### Issue: Emails not sending
**Solution**: Verify email address in Brevo, check API key is correct (starts with `xkeysib-`), test with Brevo transactional email logs

### Issue: Build errors on Vercel
**Solution**: Ensure all env vars are set, check build logs for missing dependencies

## Security Checklist

- [ ] All API keys are in `.env.local` (never commit!)
- [ ] `.env.local` is in `.gitignore`
- [ ] Service role key only used server-side
- [ ] Stripe webhook signature verification enabled
- [ ] RLS policies enabled in Supabase
- [ ] CORS properly configured
- [ ] Rate limiting implemented on API routes

## Next Steps

1. **Implement Story 1.1**: Run database migrations
2. **Implement Story 1.2**: Set up auth components
3. **Configure Stripe Products**: Add ring variants
4. **Test End-to-End**: Complete purchase flow
5. **Deploy to Staging**: Verify everything works

## Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- Project Slack: #moon-ring-dev
- Technical Lead: [contact info]