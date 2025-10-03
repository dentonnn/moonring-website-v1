# Quick Deployment Guide - Moon Ring

**Prerequisites**: You must authenticate with Vercel first!

## Step 1: Authenticate with Vercel

Open your browser and visit:
```
https://vercel.com/oauth/device?user_code=RRMV-NDFV
```

Or run in a new terminal:
```bash
vercel login
```

Then press ENTER when prompted to open the browser.

---

## Step 2: Quick Deploy (Manual Method)

Once authenticated, run these commands from the `moon-ring-platform/` directory:

```bash
cd moon-ring-platform

# Link to Vercel project (creates new project if needed)
vercel link

# Deploy to preview environment first
vercel

# After testing preview, deploy to production
vercel --prod
```

---

## Step 3: Automated Deploy (Recommended)

Use our automated deployment script:

```bash
cd moon-ring-platform

# Run the automated deployment script
./scripts/deploy-to-vercel.sh
```

This script will:
1. ✅ Verify prerequisites
2. ✅ Validate environment variables
3. ✅ Link to Vercel project
4. ✅ Guide you through setting env vars
5. ✅ Deploy to preview first
6. ✅ Test the preview
7. ✅ Deploy to production (with confirmation)
8. ✅ Show post-deployment checklist

---

## Step 4: Set Environment Variables

You'll need to set these in Vercel. The easiest way:

### Option A: Via CLI (Interactive)
```bash
# Production environment
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
vercel env add RESEND_API_KEY production
vercel env add NEXT_PUBLIC_APP_URL production
```

When prompted, paste the value from your `.env.local` file.

### Option B: Via Dashboard
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable manually

### Option C: Pull from local (after setting one time)
```bash
# This creates .env.local from Vercel environment
vercel env pull .env.local
```

---

## Step 5: Verify Deployment

After deployment:

```bash
# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Test health endpoint
curl https://your-deployment.vercel.app/api/health
```

Expected health response:
```json
{
  "status": "healthy",
  "services": {
    "database": "operational",
    "stripe": "configured",
    "email": "configured"
  }
}
```

---

## Step 6: Configure Stripe Webhook

After production deployment:

1. Get your production URL from Vercel
2. Go to https://dashboard.stripe.com/webhooks
3. Click "Add endpoint"
4. Endpoint URL: `https://your-domain.vercel.app/api/webhooks/stripe`
5. Events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
6. Copy the webhook signing secret
7. Update `STRIPE_WEBHOOK_SECRET` in Vercel:
   ```bash
   vercel env rm STRIPE_WEBHOOK_SECRET production
   vercel env add STRIPE_WEBHOOK_SECRET production
   # Paste the new webhook secret
   ```
8. Redeploy to apply new secret:
   ```bash
   vercel --prod
   ```

---

## Common Commands Reference

```bash
# Check who you're logged in as
vercel whoami

# List all projects
vercel projects ls

# List deployments
vercel ls

# View project details
vercel inspect [deployment-url]

# Rollback to previous deployment
vercel rollback [deployment-url]

# Remove old deployment
vercel rm [deployment-url]

# View realtime logs
vercel logs [deployment-url] --follow

# Switch teams/accounts
vercel switch

# Logout
vercel logout
```

---

## Troubleshooting

### "No existing credentials found"
**Solution**: Run `vercel login` and authenticate in browser

### "Failed to detect framework"
**Solution**: The `vercel.json` at root should handle this automatically

### "Environment variable not found"
**Solution**: Set env vars using `vercel env add [VAR_NAME] production`

### "Build failed"
**Solution**: Check logs with `vercel logs [url]`. Verify all env vars are set.

### "Health check returns unhealthy"
**Solution**: Check Supabase, Stripe, and Resend credentials are correct

---

## Quick Status Check

```bash
# Are you authenticated?
vercel whoami

# Is project linked?
ls .vercel/

# What's deployed?
vercel ls

# Is it healthy?
curl $(vercel ls --prod | grep -o 'https://[^ ]*' | head -1)/api/health
```

---

## Need More Help?

- **Full deployment guide**: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
- **Build issues**: [BUILD_TROUBLESHOOTING.md](BUILD_TROUBLESHOOTING.md)
- **Pre-deployment audit**: [PRE_DEPLOYMENT_SUMMARY.md](PRE_DEPLOYMENT_SUMMARY.md)
- **Vercel docs**: https://vercel.com/docs/cli
