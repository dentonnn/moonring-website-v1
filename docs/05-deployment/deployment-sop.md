# Vercel Deployment SOP - Next.js Monorepo

**Created**: 2025-10-03
**Last Updated**: 2025-10-03
**Applies To**: Moon Ring Platform (Next.js 15 in monorepo structure)

## Purpose

This Standard Operating Procedure documents critical learnings from deployment debugging to prevent future 404 errors, build failures, and configuration issues when deploying Next.js applications in monorepo structures to Vercel.

---

## Critical Lessons Learned

### Root Cause of Initial 404 Deployment Failure

Our deployment failed with 404 errors due to a **cascading failure pattern** with 3 compounding issues:

1. **Stray Configuration Files** (Primary): `next.config.js` at repo root confused Vercel's auto-detection
2. **Framework Detection Failure** (Secondary): Vercel couldn't identify the Next.js app location
3. **Environment Variables Missing** (Tertiary): Once detected, the build failed without API keys

**Key Insight**: Vercel's framework detection prioritizes files in parent directories. Even with `rootDirectory: "moon-ring-platform"` set, a root `next.config.js` was detected first, causing Vercel to look for Next.js at root (where none exists), resulting in "Build Completed in 6ms" with no output.

---

## Phase 1: Pre-Deployment Repository Audit

### 1.1 Verify Clean Repository Structure (Monorepo)

```bash
cd /path/to/repo-root
```

### 1.2 Check for Conflicting Framework Files at Root

```bash
find . -maxdepth 1 \( -name "next.config.*" -o -name "nuxt.config.*" -o -name "gatsby-config.*" \) -type f
```

**Expected**: NONE (all framework configs should be in subdirectory)

**Action if found**: Remove stray config files
```bash
git rm next.config.js  # Or other framework configs
git commit -m "chore: remove stray framework config from root"
```

### 1.3 Identify Next.js App Location

```bash
find . -name "package.json" -exec grep -l '"next"' {} \;
```

**Expected**: `./moon-ring-platform/package.json` ONLY

### 1.4 Verify .gitignore Excludes Sensitive Files

```bash
cat .gitignore | grep -E "\.env\.local|\.vercel|node_modules"
```

**Expected**: All three present

### 1.5 Check for Multiple vercel.json Files

```bash
find . -name "vercel.json" -type f
```

**Expected**: Either ONE at root OR ONE in app subdirectory (not both)

**Action if multiple found**: Keep only the one at root level, remove from subdirectories
```bash
git rm moon-ring-platform/vercel.json  # If exists
```

---

## Phase 2: Vercel Project Configuration (Dashboard)

### 2.1 Create/Select Project in Vercel Dashboard

- URL: https://vercel.com/dashboard
- Click "New Project" or select existing project

### 2.2 Configure General Settings (CRITICAL - Do Before First Deployment)

Navigate to: **Settings → General**

Set the following (exact values matter):

| Setting | Value | Notes |
|---------|-------|-------|
| **Framework Preset** | `Next.js` | ⚠️ EXPLICIT - never leave as "(None)" or rely on auto-detect |
| **Root Directory** | `moon-ring-platform` | For monorepo structure; empty `""` for single-app |
| **Build Command** | Leave empty | Auto-detected from package.json |
| **Output Directory** | Leave empty | Auto-detected (.next) |
| **Install Command** | Leave empty | Auto-detected (npm install) |
| **Node.js Version** | `20.x` or `22.x` | Match your local development version |

### 2.3 Verify Settings via CLI

```bash
vercel pull --environment=production
cat .vercel/project.json | jq '.settings'
```

**Expected output**:
```json
{
  "framework": "nextjs",              // ⚠️ NOT null
  "rootDirectory": "moon-ring-platform",  // Matches your structure
  "buildCommand": null,               // Auto-detected is fine
  "outputDirectory": null,            // Auto-detected is fine
  "nodeVersion": "22.x"
}
```

**If `framework` is `null`**: Go back to dashboard and explicitly set Framework Preset to "Next.js"

---

## Phase 3: Environment Variables Setup

### 3.1 Create Checklist from .env.example

```bash
cd moon-ring-platform  # Or your app directory
cat .env.example | grep "^[A-Z]" | cut -d= -f1 > env-vars-checklist.txt
cat env-vars-checklist.txt
```

### 3.2 Add Each Variable to Vercel

**Dashboard Method (Recommended for Security)**:

1. Navigate to: **Settings → Environment Variables**
2. For EACH variable in your checklist:
   - Click "Add New"
   - **Key**: Exact name from `.env.example` (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - **Value**: Copy from your local `.env.local` file
   - **Environments**: ✅ Check ALL three (Production, Preview, Development)
   - Click "Save"

**Required Variables for Moon Ring Platform**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `BREVO_API_KEY`
- `NEXT_PUBLIC_APP_URL` (set to production URL, e.g., `https://moonring.vercel.app`)

### 3.3 Verify All Variables Are Set

```bash
vercel env pull .env.vercel.local
diff <(cat .env.example | grep "^[A-Z]" | cut -d= -f1 | sort) \
     <(cat .env.vercel.local | grep "^[A-Z]" | cut -d= -f1 | sort)
```

**Expected**: No differences (or only optional vars like `NEXT_PUBLIC_HOTJAR_ID` missing)

### 3.4 CRITICAL: Update Production URL

In Vercel dashboard, ensure:
```
NEXT_PUBLIC_APP_URL = https://your-production-domain.vercel.app
```

This ensures API routes, redirects, and webhooks point to the correct domain.

---

## Phase 4: Local Build Verification

### 4.1 Test Build Locally with Production Environment

```bash
cd moon-ring-platform
npm run build  # Should complete without errors
```

### 4.2 Check Build Output for Issues

**Look for success indicators**:
- ✅ `✓ Compiled successfully`
- ✅ `✓ Generating static pages (X/X)`
- ✅ `✓ Finalizing page optimization`

**Avoid error indicators**:
- ❌ `Error: [anything]`
- ⚠️ `Missing environment variables`
- ⚠️ `Neither apiKey nor config.authenticator provided`

### 4.3 Test Production Server Locally

```bash
npm run start
curl http://localhost:3000 | grep "<title>"
```

**Expected**: Your page title (not error page)

---

## Phase 5: First Deployment

### 5.1 Deploy from Repository Root (For Monorepo)

```bash
cd /path/to/moonring-website-v1  # Repository ROOT, not subdirectory
vercel --prod
```

⚠️ **IMPORTANT**: Deploy from root when `rootDirectory` is set in dashboard. Deploying from `moon-ring-platform/` subdirectory with `rootDirectory: "moon-ring-platform"` causes double-nesting (`moon-ring-platform/moon-ring-platform/`).

### 5.2 Monitor Deployment Logs in Real-Time

```bash
vercel inspect <deployment-url> --logs
```

### 5.3 Check for Success Indicators

**Build logs should show**:
- ✅ `Detected Next.js version: X.X.X`
- ✅ `Compiled successfully in Xs`
- ✅ `Generating static pages (X/X)`
- ✅ `Build Completed in /vercel/output [30s+]` (Should be 30s+, NOT <10s)
- ✅ `Deployment completed`
- ✅ `status ● Ready`

**Red flags (indicates failure)**:
- ❌ `Build Completed in [6ms]` → Framework not detected
- ❌ `No Next.js version detected` → Root Directory mismatch
- ❌ `no files prepared` → Build didn't actually run

### 5.4 Test Deployment URL

```bash
curl -I <deployment-url>
```

**Expected**: `HTTP/2 200` (or `401` if Deployment Protection enabled)

---

## Phase 6: Post-Deployment Configuration

### 6.1 Disable Deployment Protection (For Public Sites)

Navigate to: **Dashboard → Settings → Deployment Protection**

**Options**:
- **Standard Protection**: Turn OFF (recommended for marketing sites)
- **Or**: Protection Bypass for Automation: Enable with token

**Why**: Marketing websites need to be publicly accessible for SEO, social media previews, and direct visitor access.

### 6.2 Verify Public Accessibility

```bash
curl <deployment-url> | grep "<title>"
```

**Expected**: Your page title (HTML content, not authentication page)

### 6.3 Update External Webhooks (If Applicable)

Update webhook URLs in external services:

- **Stripe webhooks**:
  1. Go to Stripe Dashboard → Webhooks
  2. Update URL to: `https://your-domain.vercel.app/api/webhooks/stripe`
  3. Update webhook secret in Vercel env vars if changed

- **Other webhook providers**: Update to production URLs

### 6.4 Configure Custom Domain (Optional)

Navigate to: **Dashboard → Settings → Domains**

1. Click "Add"
2. Enter your domain (e.g., `moonring.com`)
3. Update DNS records as instructed by Vercel
4. Wait for SSL certificate provisioning (usually 1-2 minutes)

---

## Phase 7: Troubleshooting Decision Tree

### Issue: Deployment Shows "404 Not Found"

```bash
# Step 1: Check HTTP status
curl -I <deployment-url>
```

**If HTTP 401 Unauthorized**:
- **Cause**: Deployment Protection enabled
- **Fix**: Dashboard → Settings → Deployment Protection → Turn OFF

**If HTTP 404 Not Found**:

```bash
# Step 2: Check build logs
vercel inspect <deployment-url> --logs | grep "Build Completed"
```

**If shows "Build Completed in [<10ms]"**:
- **Cause**: Framework not detected
- **Fix**: Dashboard → Settings → General → Framework Preset → Set to "Next.js"
- **Redeploy**: `vercel --prod`

**If still 404**:
- **Cause**: Root Directory mismatch
- **Check**: `cat .vercel/project.json | jq '.settings.rootDirectory'`
- **Fix**: Ensure Root Directory points to directory containing `package.json` with Next.js dependency

### Issue: "Error: No Next.js version detected"

```bash
# Step 1: Verify Root Directory setting
cat .vercel/project.json | jq '.settings.rootDirectory'
```

**Expected**: `"moon-ring-platform"` (matches your app location)

```bash
# Step 2: Verify package.json exists at that path
ls moon-ring-platform/package.json
```

**If file not found**:
- **Fix**: Update Root Directory in Dashboard → Settings → General
- **Correct value**: Path from repo root to directory containing `package.json`

### Issue: Build Fails with "Neither apiKey nor config.authenticator provided"

**Cause**: Missing environment variables

**Fix**:
1. Go to Dashboard → Settings → Environment Variables
2. Add all required env vars (see Phase 3.2)
3. Ensure "Production" environment is checked
4. Redeploy: `vercel --prod --force`

### Issue: Build Completes in <10 Seconds with "no files prepared"

**Cause**: Framework not detected correctly (usually due to conflicting config files)

**Fix**:
```bash
# Step 1: Check for conflicting config files at repo root
find . -maxdepth 1 -name "*.config.*"

# Step 2: Remove conflicting files
git rm next.config.js  # Or other stray configs
git commit -m "fix: remove conflicting framework config from root"

# Step 3: Set Framework Preset explicitly
# Dashboard → Settings → General → Framework Preset → "Next.js"

# Step 4: Redeploy
vercel --prod
```

---

## Common Pitfalls & Solutions

### Pitfall 1: Deploying from Wrong Directory

**Problem**: Deploying from `moon-ring-platform/` with Root Directory set to `moon-ring-platform`

**Result**: Vercel looks for `moon-ring-platform/moon-ring-platform/package.json` (double-nesting)

**Solution**: Deploy from **repo root** when Root Directory is set
```bash
cd /path/to/moonring-website-v1  # Root, not subdirectory
vercel --prod
```

### Pitfall 2: Relying on Auto-Detection

**Problem**: Leaving Framework Preset as "(None)" and expecting auto-detection to work

**Result**: Silent failure, builds complete in <10ms with no output

**Solution**: **Always** explicitly set Framework Preset to "Next.js" in dashboard

### Pitfall 3: Multiple vercel.json Files

**Problem**: Having `vercel.json` at both root and in `moon-ring-platform/`

**Result**: Conflicting configurations, unpredictable behavior

**Solution**: Keep ONE `vercel.json` at root only
```bash
git rm moon-ring-platform/vercel.json
```

### Pitfall 4: Environment Variables Added After Deployment

**Problem**: Deploying first, then adding env vars

**Result**: Build fails during page data collection (API routes import services without credentials)

**Solution**: Add ALL environment variables BEFORE first deployment (see Phase 3)

### Pitfall 5: Stray Framework Config Files

**Problem**: Old `next.config.js` at repo root from previous setups (e.g., Sentry)

**Result**: Vercel detects Next.js at root instead of subdirectory

**Solution**: Regular repository audits to remove stray configs
```bash
find . -maxdepth 1 -name "*.config.*" -type f
# Should return NONE at root level
```

---

## Deployment Checklist (Use This Every Time)

### Pre-Deployment
- [ ] Clean repository root of framework config files (`next.config.*`, `vercel.json`, etc.)
- [ ] Verify only ONE `package.json` with Next.js dependency exists at intended app location
- [ ] Ensure `.gitignore` excludes `.env.local`, `.vercel`, `node_modules`
- [ ] Verify no duplicate `vercel.json` files (only one at root OR in subdirectory, not both)

### Vercel Dashboard Configuration
- [ ] Framework Preset explicitly set to "Next.js" (NOT auto-detect)
- [ ] Root Directory set to `moon-ring-platform` (for monorepo)
- [ ] Node.js version matches local development (20.x or 22.x)
- [ ] All environment variables added with Production, Preview, Development checked
- [ ] `NEXT_PUBLIC_APP_URL` set to production domain

### Local Verification
- [ ] `npm run build` completes successfully locally
- [ ] `npm run start` works and serves pages correctly
- [ ] No environment variable errors in build output

### Deployment
- [ ] Deploy from **repository root** (not subdirectory)
- [ ] Monitor deployment logs for success indicators (30s+ build time, "Compiled successfully")
- [ ] Verify deployment URL returns HTTP 200 (not 401/404)

### Post-Deployment
- [ ] Disable Deployment Protection (Settings → Deployment Protection → OFF)
- [ ] Verify site loads publicly without authentication
- [ ] Update external webhooks (Stripe, etc.) to production URLs
- [ ] Configure custom domain if needed

---

## Emergency Rollback Procedure

If deployment fails catastrophically:

```bash
# Step 1: List recent deployments
vercel ls --yes

# Step 2: Identify last working deployment
# Look for "● Ready" status

# Step 3: Promote previous deployment to production
vercel promote <previous-deployment-url> --yes

# Step 4: Debug current deployment locally
# Fix issues, then redeploy
```

---

## Key Takeaways

1. **Explicit Configuration > Auto-Detection**: Never rely on auto-detection for production deployments in monorepos

2. **Clean Repository Hygiene**: Stray config files from previous setups are deployment landmines

3. **Context Awareness**: Deploy from root when Root Directory is set; deploy from subdirectory when Root Directory is empty

4. **Environment Variables First**: Configure ALL env vars before first deployment to avoid build-time failures

5. **Systematic Debugging**: Change ONE variable at a time, verify result, document what actually fixed the issue

6. **Read Build Logs**: 6ms build = detection failed; 30s+ build = Next.js compiled successfully

7. **Monorepos Need Explicit Config**: Single-app repos "just work" with auto-detection; monorepos require explicit Framework Preset and Root Directory settings

---

## Document Maintenance

**When to Update This SOP**:
- After encountering a new deployment issue
- When Vercel changes deployment behavior or dashboard UI
- When adding new environment variables or external integrations
- After major Next.js version upgrades

**How to Update**:
1. Document the issue and resolution in the Troubleshooting section
2. Update the checklist if new steps are required
3. Add to Common Pitfalls if it's a recurring pattern
4. Update "Last Updated" date at top of document

---

## Related Documentation

- [DEPLOYMENT.md](moon-ring-platform/DEPLOYMENT.md) - Original deployment instructions
- [VERCEL_DEPLOYMENT.md](moon-ring-platform/VERCEL_DEPLOYMENT.md) - Vercel-specific deployment guide
- [.env.example](moon-ring-platform/.env.example) - Environment variables reference
- [Vercel Docs: Monorepos](https://vercel.com/docs/deployments/monorepos)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

---

**Created from real debugging session on 2025-10-03**
**Deployment Issue**: 404 errors due to framework detection failure in monorepo
**Root Cause**: Stray `next.config.js` at repo root + implicit framework detection + deployment from wrong directory
**Resolution Time**: ~45 minutes (would have been 5 minutes with this SOP)
