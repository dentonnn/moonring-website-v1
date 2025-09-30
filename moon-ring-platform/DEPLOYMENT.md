# Moon Ring Website - Deployment Guide

## Current Implementation Status ✅

### Completed Infrastructure
1. **Database Schema** - Marketing-focused tables created
2. **Email Capture Components** - Ready for lead generation
3. **Stripe Integration** - Checkout and webhook handling
4. **Email Service** - Resend configured with templates
5. **Authentication** - Basic auth for demo access
6. **Middleware** - Session tracking and route protection

## Quick Deployment Steps

### 1. Local Setup & Testing

```bash
# 1. Copy environment variables
cp .env.example .env.local

# 2. Fill in your credentials in .env.local:
#    - Supabase credentials from supabase.com dashboard
#    - Stripe keys from stripe.com dashboard (test mode)
#    - Resend API key from resend.com

# 3. Run database migrations
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push

# 4. Start development server
npm run dev

# 5. Test the setup
# Visit http://localhost:3000/api/health
# Should return: {"status":"healthy","services":...}
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview environment
vercel

# Follow prompts:
# - Link to existing project? No
# - What's your project name? moon-ring-website
# - Which directory is your code in? ./
# - Want to override settings? No

# Deploy to production
vercel --prod
```

### 3. Configure Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all variables from `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   STRIPE_SECRET_KEY
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   STRIPE_WEBHOOK_SECRET
   RESEND_API_KEY
   NEXT_PUBLIC_APP_URL (set to your Vercel URL)
   ```

### 4. Configure Stripe Webhooks

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint:
   - URL: `https://your-vercel-url.vercel.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.payment_failed`, `charge.refunded`
3. Copy the signing secret to `STRIPE_WEBHOOK_SECRET` in Vercel

### 5. Configure Custom Domain (Optional)

1. In Vercel: Settings → Domains
2. Add your domain (e.g., moonring.com)
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` in environment variables

## Available API Endpoints

- `GET /api/health` - Health check
- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/webhooks/stripe` - Stripe webhook handler

## Testing Checklist

- [ ] Email capture form works (footer/hero)
- [ ] Leads are saved to database
- [ ] Stripe checkout flow completes with test card (4242 4242 4242 4242)
- [ ] Order is created in database after payment
- [ ] Health check returns operational status

## Common Issues

### Supabase Connection Issues
- Check CORS settings in Supabase Dashboard → Settings → API
- Ensure RLS policies are enabled
- Verify service role key is correct

### Stripe Webhook Failures
- Webhook endpoint URL must be exact (include /api/webhooks/stripe)
- Signing secret must match exactly
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### Email Not Sending
- Verify domain in Resend dashboard
- Check API key is correct
- Test with Resend playground first

## Next Steps

1. **Add Landing Page Content** - Hero, features, pricing sections
2. **Implement Demo Showcase** - Story 1.3 interactive demo
3. **Add Analytics** - Google Analytics, conversion tracking
4. **SEO Optimization** - Meta tags, sitemap, robots.txt

## Support

- Documentation: `/docs/setup/environment-setup-guide.md`
- Stories: `/docs/stories/`
- Health Check: Visit `/api/health` to verify all services