# Vercel Deployment Checklist

This guide ensures successful deployment of the Moon Ring marketing website to Vercel.

## Prerequisites

- ✅ Vercel account with access to the project
- ✅ All required API credentials (Supabase, Stripe, Resend)
- ✅ Repository pushed to GitHub/GitLab/Bitbucket

---

## 1. Repository Configuration

### ✅ Verify Repository Structure

The repository has multiple `package.json` files. Vercel must use the correct one:

```
moonring-website-v1/                  # ❌ Root (bmad-method tooling only)
├── package.json                      # ❌ DO NOT use this
├── vercel.json                       # ✅ Configured to use moon-ring-platform/
└── moon-ring-platform/               # ✅ The actual Next.js app
    ├── package.json                  # ✅ Use this one
    └── src/                          # Application code
```

**The root `vercel.json` is already configured** to use `moon-ring-platform/` as the build directory.

---

## 2. Vercel Project Settings

### Step 1: Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Select the repository: `moonring-website-v1`

### Step 2: Configure Build Settings

**Framework Preset:** `Next.js`

**Root Directory:**
- ⚠️ **CRITICAL**: Leave as default (repository root)
- The `vercel.json` file handles routing to `moon-ring-platform/`

**Build Command:**
```bash
cd moon-ring-platform && npm run build
```
*(Already configured in `vercel.json`)*

**Install Command:**
```bash
cd moon-ring-platform && npm install
```
*(Already configured in `vercel.json`)*

**Output Directory:**
```bash
moon-ring-platform/.next
```
*(Already configured in `vercel.json`)*

---

## 3. Environment Variables

### Required Variables (Build Will Fail Without These)

Navigate to: **Project Settings** → **Environment Variables**

Copy all values from `moon-ring-platform/.env.local`:

#### Supabase (Database)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Stripe (Payments)
```bash
STRIPE_SECRET_KEY=sk_live_xxxxx  # Use sk_live_ for production!
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx  # Generate from Stripe dashboard
```

#### Resend (Email)
```bash
RESEND_API_KEY=re_xxxxx
```

#### Application
```bash
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app  # Update after deployment
```

### Optional Variables (Features work without these)

#### Analytics (Optional)
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX        # Google Analytics
NEXT_PUBLIC_HOTJAR_ID=xxxxxxx         # Hotjar
NEXT_PUBLIC_ENABLE_ANALYTICS=true     # Enable analytics
```

#### Sentry (Optional - Currently disabled)
```bash
# NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
# SENTRY_AUTH_TOKEN=xxxxx
```
*Note: Sentry is currently disabled. Only add if you want error monitoring.*

#### Feature Flags (Optional)
```bash
NEXT_PUBLIC_ENABLE_DEMO=true          # Enable demo features
```

---

## 4. Environment Variable Validation

The build includes automatic validation. If required variables are missing, you'll see:

```
❌ Missing required environment variables:
  - STRIPE_SECRET_KEY
    Stripe secret key (server-side)
    Example: sk_test_xxxxx or sk_live_xxxxx
```

**All variables must be set** in Vercel for both:
- ✅ **Production** environment
- ✅ **Preview** environment (for PR deployments)

---

## 5. Stripe Webhook Configuration

### Production Webhook Endpoint

Once deployed, configure Stripe webhooks:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **Webhooks**
2. Click "Add endpoint"
3. Set **Endpoint URL**:
   ```
   https://your-domain.vercel.app/api/webhooks/stripe
   ```
4. Select events to listen for:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
5. Copy the **Webhook Signing Secret** (starts with `whsec_`)
6. Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
7. Redeploy the application

---

## 6. Deployment Verification

### Pre-Deployment Checklist

Before triggering a deployment, verify:

- [ ] All required environment variables are set in Vercel
- [ ] Using **live mode** Stripe keys (not test mode) for production
- [ ] `NEXT_PUBLIC_APP_URL` points to your production domain
- [ ] Stripe webhook endpoint is configured
- [ ] Supabase Row Level Security (RLS) policies are enabled

### Post-Deployment Verification

After deployment completes:

1. **Visit the health check endpoint:**
   ```
   https://your-domain.vercel.app/api/health
   ```

   Expected response:
   ```json
   {
     "status": "healthy",
     "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ",
     "services": {
       "database": "operational",
       "stripe": "configured",
       "email": "configured"
     },
     "environment": "production"
   }
   ```

2. **Test key features:**
   - [ ] Homepage loads without errors
   - [ ] Email capture form works (`/`)
   - [ ] Contact form sends emails (`/contact`)
   - [ ] Checkout flow creates sessions (`/#pricing`)
   - [ ] Navigation works (all pages accessible)

3. **Check Vercel logs:**
   - Go to **Deployments** → Select deployment → **Runtime Logs**
   - Verify no errors during page generation

---

## 7. Domain Configuration

### Adding a Custom Domain

1. Go to **Project Settings** → **Domains**
2. Add your custom domain (e.g., `moonring.com`)
3. Configure DNS records as instructed by Vercel
4. Update environment variable:
   ```bash
   NEXT_PUBLIC_APP_URL=https://moonring.com
   ```
5. Redeploy to apply the new URL

---

## 8. Common Deployment Issues

### Issue: Build fails with "Missing required environment variables"

**Solution:**
- Check all required vars are set in Vercel
- Ensure no typos in variable names
- Verify values are not empty strings

### Issue: Vercel uses wrong package.json (root instead of moon-ring-platform)

**Solution:**
- Verify `vercel.json` exists at repository root
- Contains correct `buildCommand` and `installCommand`
- Check Vercel build logs to confirm commands

### Issue: Runtime crashes with "apiKey not provided"

**Solution:**
- Service credentials not set in Vercel environment variables
- Go to **Project Settings** → **Environment Variables**
- Add missing credentials and redeploy

### Issue: Stripe webhooks not working

**Solution:**
- Verify webhook endpoint URL is correct
- Check `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Confirm webhook is listening to correct events
- Check Vercel function logs for errors

---

## 9. Rollback Procedure

If a deployment fails:

1. Go to **Deployments** tab
2. Find the last successful deployment
3. Click **•••** (three dots) → **Promote to Production**
4. Instant rollback to previous working version

---

## 10. Environment-Specific Notes

### Preview Deployments (Pull Requests)

- Use **test mode** credentials for preview deployments
- Set preview-specific env vars in Vercel:
  - `STRIPE_SECRET_KEY=sk_test_xxxxx` (test mode)
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx`
  - `NEXT_PUBLIC_APP_URL=<auto-generated-preview-url>`

### Production Deployments

- Use **live mode** Stripe keys
- Enable all security features (HTTPS, CSP headers)
- Configure custom domain
- Set up monitoring (optional: Sentry, LogRocket)

---

## 11. Security Checklist

Before going live:

- [ ] All API keys use **production** credentials (not test)
- [ ] Supabase RLS policies are enabled and tested
- [ ] Stripe webhook secret is configured
- [ ] `.env.local` is in `.gitignore` (never commit secrets)
- [ ] CORS is configured properly in Supabase
- [ ] Rate limiting enabled for API routes (if applicable)

---

## 12. Quick Deploy Command

For manual deployments:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

---

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

---

## Checklist Summary

**Pre-Deployment:**
- [ ] Root `vercel.json` configured
- [ ] All required environment variables set in Vercel
- [ ] Stripe webhook endpoint created
- [ ] Supabase RLS policies enabled

**Post-Deployment:**
- [ ] Health check endpoint returns "healthy"
- [ ] All pages load without errors
- [ ] Email form works
- [ ] Checkout flow functional
- [ ] Custom domain configured (if applicable)

**Production Readiness:**
- [ ] Using live Stripe keys
- [ ] Production Supabase project
- [ ] Monitoring configured (optional)
- [ ] Backup/rollback plan in place
