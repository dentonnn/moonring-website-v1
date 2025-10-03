# Build Troubleshooting Guide

This document contains solutions to common build issues encountered during the Moon Ring platform development.

## Issue: Multi-Root Repository Causing Vercel Build Failures ⚠️ CRITICAL

### Problem
```
Vercel detected multiple package.json files
Build failing or using wrong dependencies
Sentry packages installed at wrong level
```

### Root Cause
The repository has **three** `package.json` files:
- `/moonring-website-v1/package.json` (root - bmad-method tooling)
- `/moonring-website-v1/moon-ring-platform/package.json` (actual Next.js app)
- `/moonring-website-v1/Figma Make - MR Website Design 1/package.json` (design system)

Vercel's auto-detection scans from the root and may choose the wrong package.json, causing:
- Wrong dependency installation
- Build commands run in wrong directory
- Package pollution (e.g., Sentry installed at root level)

### Solution

**✅ FIXED**: The root `vercel.json` now explicitly configures the build:

```json
{
  "buildCommand": "cd moon-ring-platform && npm run build",
  "installCommand": "cd moon-ring-platform && npm install",
  "outputDirectory": "moon-ring-platform/.next",
  "framework": null
}
```

**For Vercel Dashboard Configuration:**
1. Leave "Root Directory" as default (repository root)
2. The `vercel.json` handles routing to `moon-ring-platform/`
3. Do NOT manually set root directory to `moon-ring-platform/` (creates path issues)

**Long-term Solution Options:**
- **Option A**: Flatten repository (move everything from `moon-ring-platform/` to root)
- **Option B**: Proper monorepo with workspaces
- **Option C**: Keep current structure with explicit `vercel.json` (current approach)

---

## Issue: Build Failing with Environment Variable Errors

### Problem
```
Error: Neither apiKey nor config.authenticator provided
    at r._setAuthenticator
```

### Root Cause
Next.js doesn't automatically load `.env.local` during `npm run build` in production mode. The build process needs explicit access to environment variables.

### Solution
We've created a custom build script ([build.sh](build.sh)) that loads environment variables and validates them before building:

```bash
# The build.sh script:
# 1. Loads .env.local variables
# 2. Validates all required env vars (scripts/validate-env.js)
# 3. Runs next build --turbopack
# 4. Reports success/failure
```

**The validation script checks:**
- ✅ All required variables (Supabase, Stripe, Resend)
- ℹ️  Optional variables (Analytics, Sentry)
- 📋 Provides clear error messages with examples

**If validation fails, you'll see:**
```
❌ Missing required environment variables:
  - STRIPE_SECRET_KEY
    Stripe secret key (server-side)
    Example: sk_test_xxxxx or sk_live_xxxxx
```

**Usage:**
```bash
npm run build          # Uses build.sh with validation (recommended)
npm run build:direct   # Direct Next.js build (requires system env vars)
```

---

## Issue: NODE_ENV Conflicts During Build

### Problem
```
⚠ You are using a non-standard "NODE_ENV" value in your environment.
Error: <Html> should not be imported outside of pages/_document.
```

### Root Cause
Manually setting `NODE_ENV=development` in `.env.local` causes Next.js to use development mode code paths during production builds, leading to incompatibilities between Pages Router and App Router.

### Solution
**Never set `NODE_ENV` manually in `.env.local`**. Next.js automatically sets it:
- `next dev` → `NODE_ENV=development`
- `next build` → `NODE_ENV=production`
- `next start` → `NODE_ENV=production`

If you see `NODE_ENV` in your `.env.local`, comment it out:
```bash
# NODE_ENV=development  # ❌ Don't set this manually
```

---

## Sentry Integration (Currently Disabled)

### Why Sentry Was Removed
Sentry was temporarily uninstalled because:
1. No Sentry DSN or auth token was configured
2. The `@sentry/nextjs` package injects Pages Router error pages even when disabled
3. This caused App Router builds to fail with `<Html>` import errors

### Re-enabling Sentry

When you're ready to add Sentry back:

#### 1. Get Sentry Credentials
Visit [sentry.io](https://sentry.io) and create/access your project to get:
- `NEXT_PUBLIC_SENTRY_DSN` - Project DSN for error reporting
- `SENTRY_AUTH_TOKEN` - Auth token for uploading source maps

#### 2. Add to Environment Variables
Update `.env.local`:
```bash
# Sentry Error Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
SENTRY_AUTH_TOKEN=your-sentry-auth-token-here
```

#### 3. Reinstall Sentry
```bash
npm install @sentry/nextjs@latest
```

#### 4. Run Sentry Setup Wizard
```bash
npx @sentry/wizard@latest -i nextjs
```

This will:
- Create `sentry.client.config.ts`
- Create `sentry.server.config.ts`
- Create `sentry.edge.config.ts`
- Update `next.config.ts` with Sentry integration

#### 5. Update next.config.ts
The wizard should handle this, but verify [next.config.ts](next.config.ts) looks like:

```typescript
import { withSentryConfig } from "@sentry/nextjs";

// ... your config ...

export default withBundleAnalyzer(withSentryConfig(nextConfig, {
  org: "moon-ring",
  project: "moon-ring-marketing",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: { enabled: true },
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
}));
```

#### 6. Test the Build
```bash
npm run build
```

If successful, Sentry will upload source maps and you'll see confirmation in the build output.

---

## Quick Fixes Checklist

Before debugging complex build issues, verify:

- [ ] `.env.local` exists and has all required variables (see [.env.example](.env.example))
- [ ] `NODE_ENV` is **not** set in `.env.local`
- [ ] Running from `moon-ring-platform/` directory (not root)
- [ ] `node_modules/` exists (run `npm install` if missing)
- [ ] `.next/` directory is clean (delete and rebuild if suspicious)

---

## Build Script Details

### Created Files
- `build.sh` - Custom build script that loads `.env.local`
- Updated `package.json` scripts:
  - `build` → `./build.sh` (loads env vars)
  - `build:direct` → `next build --turbopack` (direct build)

### How It Works
```bash
# 1. Load environment variables
export $(grep -v '^#' .env.local | xargs)

# 2. Run Next.js build
next build --turbopack

# 3. Check exit code and report status
```

### Alternative: Manual Environment Loading
If you prefer not using the script:
```bash
# Load env vars in current shell session
export $(grep -v '^#' .env.local | xargs)

# Then build normally
npm run build:direct
```

---

## Additional Resources

- [Next.js Environment Variables Docs](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
- [Sentry Next.js Setup](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Next.js App Router Migration](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
