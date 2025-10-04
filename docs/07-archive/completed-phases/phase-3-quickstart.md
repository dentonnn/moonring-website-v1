# Phase 3 Quick Start Guide

**Read this first, then dive into [Phase 3 Plan](phase-3-plan.md) for details**

---

## 🎯 What Phase 3 Adds

Transform your marketing site from static to production-ready:

1. **Working contact form** – capture leads, not just display forms
2. **Analytics telemetry** – see who visits and what they do
3. **Error monitoring** – fix bugs before users complain
4. **Performance optimization** – load faster, rank higher
5. **Optional CMS** – enable no-code blog updates after the blockers ship

---

## ⚡ Quick Wins (Start Here)

### 1. Contact Form (1-2 hours)
**Impact:** High | **Effort:** Low | **Cost:** Free

You already have `RESEND_API_KEY` configured! Just add the API route:

```bash
# Create the endpoint
touch src/app/api/contact/route.ts

# Copy code from phase-3-plan.md → Feature 1
# Update contact form with handleSubmit
# Test and done!
```

### 2. Analytics (5 minutes)
**Impact:** High | **Effort:** Minimal | **Cost:** Free

```bash
npm install @vercel/analytics
# Add one line to layout.tsx (see plan)
# Deploy and you're tracking!
```

### 3. Sentry Error Monitoring (30 minutes)
**Impact:** High | **Effort:** Low | **Cost:** Free

```bash
npx @sentry/wizard@latest -i nextjs
# Follow wizard prompts
# Done!
```

---

## 🎨 Bigger Lifts (When Ready)

### 4. Performance Optimization (Ongoing)
**Impact:** High | **Effort:** Variable | **Cost:** Free

- Start with bundle analysis
- Add caching as needed
- Optimize images (`next/image`, CDN rules)
- Re-run Lighthouse until >90

### 5. CMS Integration (Optional, 4-6 hours)
**Impact:** Medium | **Effort:** Medium | **Cost:** Free

- Recommended: Contentful
- Benefit: Non-devs can update blog
- When: Only after contact form, analytics, Sentry, and performance targets are live

---

## 📊 Feature Priority Matrix

```
High Impact, Low Effort (DO FIRST):
├── Contact Form Backend ⭐⭐⭐
├── Vercel Analytics ⭐⭐⭐
└── Sentry Error Tracking ⭐⭐⭐

High Impact, Medium Effort (DO NEXT):
├── Performance Optimization ⭐⭐
└── Google Analytics (if needed) ⭐⭐

Medium Impact, Medium Effort (OPTIONAL AFTER):
└── CMS Integration ⭐
```

---

## 🚀 Recommended Order

### Week 1: Production Blockers
1. Monday: Contact form backend (Resend) + manual email test
2. Tuesday: Analytics instrumentation (`@vercel/analytics`, optional GA4) + dashboard check
3. Wednesday: Sentry wizard, trigger test error, wire alert channel
4. Thursday: Regression testing + deploy to production
5. Friday: Monitor dashboards, capture validation notes

### Week 2: Performance Hardening
- Run Lighthouse baseline → implement caching/image/bundle fixes → re-test until >90

### Optional Sprint: CMS Integration
- Only schedule after telemetry + performance targets stay green for a full release window

---

## 💰 Cost Breakdown

**Everything is FREE for your current scale:**

| Service | Free Tier | Your Usage | Cost |
|---------|-----------|------------|------|
| Resend | 100 emails/day | ~5-10/day | $0 |
| Vercel Analytics | Unlimited | All traffic | $0 |
| Google Analytics | Unlimited | All traffic | $0 |
| Sentry | 5K errors/month | <100/month | $0 |
| Contentful | 25K records | ~50 posts | $0 |

**Total: $0/month** until you scale significantly

---

## ⚙️ Setup Checklist

```bash
# Prerequisites (you already have these!)
✅ RESEND_API_KEY in .env.local
✅ Supabase configured
✅ Vercel account (or deployment platform)
✅ Working Next.js 15 site

# New accounts needed:
□ Sentry account (sentry.io)
□ Google Analytics (analytics.google.com) - optional
□ Contentful account (contentful.com) - optional, later
```

---

## 🎓 Learning Resources

**Contact Form:**
- [Resend Docs](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

**Analytics:**
- [Vercel Analytics](https://vercel.com/docs/analytics)
- [GA4 Setup Guide](https://developers.google.com/analytics/devguides/collection/ga4)

**Error Monitoring:**
- [Sentry Next.js Guide](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

**CMS:**
- [Contentful Next.js](https://www.contentful.com/developers/docs/javascript/tutorials/integrate-with-nextjs/)

---

## 🐛 Common Issues

### Contact Form Not Sending
- Check `RESEND_API_KEY` is in `.env.local`
- Verify domain in Resend dashboard
- Check browser console for errors

### Analytics Not Tracking
- Ensure `<Analytics />` in layout.tsx
- Deploy to production (doesn't work in localhost)
- Check Vercel dashboard

### Sentry Not Capturing Errors
- Verify `NEXT_PUBLIC_SENTRY_DSN` in env
- Ensure `enabled: process.env.NODE_ENV === 'production'`
- Trigger test error to verify

---

## 📞 Need Help?

1. Check [Phase 3 Plan](phase-3-plan.md) for detailed code
2. Review service documentation (links above)
3. Test in local environment first
4. Deploy incrementally (one feature at a time)

---

## ✅ Success Criteria

You'll know Phase 3 is done when:

- [ ] Contact form sends email to you
- [ ] User receives confirmation email
- [ ] You can see pageviews in Vercel Analytics
- [ ] Errors appear in Sentry dashboard
- [ ] Lighthouse score >90
- [ ] Site loads in <2 seconds
- [ ] (Optional) Blog content is powered by CMS without deploys

---

**Next Step:** Start with the contact form! It's the quickest win and uses infrastructure you already have. Follow the code in [Phase 3 Plan → Feature 1](phase-3-plan.md#feature-1-contact-form-backend-integration).
