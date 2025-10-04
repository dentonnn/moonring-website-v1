# Deployment & Operations

This section contains deployment procedures, monitoring setup, and operational guides.

## Documents

### [Deployment SOP](deployment-sop.md) ⚠️ **MANDATORY**
**Purpose**: Standard Operating Procedure for deploying to Vercel

**IMPORTANT**: This SOP was created after a 45-minute debugging session. Following it reduces deployment time from 45 minutes to 5 minutes.

**When to read**: **BEFORE EVERY DEPLOYMENT** to production or preview environments

### [Vercel Setup](vercel-setup.md)
**Purpose**: Vercel configuration and troubleshooting

**Covers**: Project settings, environment variables, build configuration, custom domains

**When to read**: First deployment, or when debugging Vercel issues

### [Monitoring](monitoring.md)
**Purpose**: Sentry error tracking and analytics setup

**Covers**: Sentry configuration, error handling, performance monitoring, alerts

**When to read**: After first deployment, before going to production

### [Troubleshooting](troubleshooting.md)
**Purpose**: Common deployment issues and solutions

**Covers**: Build errors, 404s, framework detection, environment variables, database connections

**When to read**: When deployments fail or when debugging production issues

---

## Critical Pre-Deployment Checklist

**Before deploying, verify:**

- [ ] Read [Deployment SOP](deployment-sop.md) - **MANDATORY**
- [ ] No stray `*.config.*` files at repo root (causes 404s)
- [ ] Framework Preset = "Next.js" in Vercel dashboard
- [ ] Root Directory = `moon-ring-platform`
- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Build passes locally (`npm run build`)

## Deployment Workflow

### First-Time Deployment

1. **Read the SOP** → [deployment-sop.md](deployment-sop.md)
2. **Configure Vercel** → [vercel-setup.md](vercel-setup.md)
3. **Set up monitoring** → [monitoring.md](monitoring.md)
4. **Deploy from repo root**:
   ```bash
   cd /path/to/moonring-website-v1
   vercel --prod
   ```

### Subsequent Deployments

1. **Quick pre-flight check** (from repo root):
   ```bash
   # Should return nothing
   find . -maxdepth 1 -name "*.config.*" -type f

   # Should show "nextjs"
   cat .vercel/project.json | jq '.settings.framework'
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Verify**:
   - Check `/api/health` endpoint
   - Test key user flows
   - Check Sentry for errors

---

## Monitoring & Alerts

### Sentry
- **Error tracking**: Automatic error capture
- **Performance monitoring**: Page load times, API response times
- **Alerts**: Configured for critical errors

### Vercel Analytics
- **Page views**: Traffic patterns
- **Web Vitals**: Core performance metrics
- **Conversion events**: Custom tracking

**Dashboard access**: See [Monitoring guide](monitoring.md)

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| **404 on all pages** | Check for stray config files at root → [Troubleshooting](troubleshooting.md) |
| **Build fails** | Check build logs, verify dependencies → [Troubleshooting](troubleshooting.md) |
| **Environment variables missing** | Configure in Vercel dashboard → [Vercel Setup](vercel-setup.md) |
| **Database connection fails** | Check Supabase credentials, IP allowlist → [Troubleshooting](troubleshooting.md) |
| **Stripe webhook errors** | Update webhook endpoint URL → [Vercel Setup](vercel-setup.md) |

---

## Emergency Procedures

### Rollback
```bash
# Rollback to previous deployment
vercel rollback
```

### Hotfix
1. Create hotfix branch from `main`
2. Fix the issue
3. Test locally
4. Deploy to preview (`vercel`)
5. Verify fix
6. Deploy to production (`vercel --prod`)
7. Merge to `main`

---

## Related Documentation

- [Stack Guide](../04-implementation/stack-guide.md) - Understanding the technical stack
- [Fullstack Architecture](../03-architecture/fullstack-architecture.md) - System design
- [Setup Guide](../04-implementation/setup-guide.md) - Local environment setup
