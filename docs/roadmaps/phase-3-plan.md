# Moon Ring Phase 3: Backend Integration & Production Features

**Status:** Planning Phase
**Timeline:** 2-3 weeks (depending on feature priority)
**Goal:** Transform marketing site into production-ready platform with backend services

---

## 📋 Feature Overview

### Priority 1: Production Blockers
1. **Contact Form Backend** – capture and route support inquiries
2. **Analytics Instrumentation** – understand user behavior from day one
3. **Error Monitoring (Sentry)** – detect and triage production issues

### Priority 2: Stabilization
4. **Performance Optimization** – cache, CDN, and image tuning for Core Web Vitals

### Optional Next
5. **CMS Integration** – manage blog content without code deploys (only after 1-4 ship)

---

## 🛠️ Execution Order

1. **Wire the contact form backend** using Resend, validate dual-email delivery, and document environment requirements.
2. **Enable analytics** (`@vercel/analytics` MVP, GA4 if needed) and verify events in the chosen dashboard.
3. **Install Sentry** via wizard, set DSN tokens, and confirm a captured test error.
4. **Run performance hardening** (Lighthouse baseline → fixes → re-test) to meet the >90 score / <2s LCP targets.
5. **Optional CMS integration** once telemetry and reliability are in place; block scheduling until steps 1-4 are complete.

---

## 🔌 Feature 1: Contact Form Backend Integration

### Current State
- ✅ Contact form UI complete (`/contact` page)
- ❌ No backend - form doesn't submit
- ❌ No email notifications

### Implementation Options

#### **Option A: Resend API (Recommended - Already Configured!)**

**Pros:**
- Already in `.env.local` (`RESEND_API_KEY`)
- Simple API, great for transactional emails
- Free tier: 100 emails/day
- Fast setup (30 minutes)

**Implementation:**

```typescript
// src/app/api/contact/route.ts
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Send email to support team
    const { data, error } = await resend.emails.send({
      from: 'Moon Ring <support@moonring.com>',
      to: ['support@moonring.com'],
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) {
      throw error
    }

    // Send confirmation to user
    await resend.emails.send({
      from: 'Moon Ring <support@moonring.com>',
      to: [email],
      subject: 'We received your message - Moon Ring Support',
      html: `
        <h2>Thanks for contacting Moon Ring!</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and will respond within 24 hours.</p>
        <p>Your message:</p>
        <blockquote>${message.replace(/\n/g, '<br>')}</blockquote>
        <p>Best regards,<br>Moon Ring Team</p>
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
```

**Client-side update:**

```tsx
// src/app/contact/page.tsx - Update form handler
'use client'

const [loading, setLoading] = useState(false)
const [success, setSuccess] = useState(false)

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setLoading(true)

  const formData = new FormData(e.currentTarget)
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error('Failed to send')

    setSuccess(true)
    e.currentTarget.reset()
  } catch (error) {
    alert('Failed to send message. Please email support@moonring.com directly.')
  } finally {
    setLoading(false)
  }
}
```

**Setup Steps:**
1. Verify `RESEND_API_KEY` in `.env.local`
2. Add domain verification in Resend dashboard
3. Create API route (code above)
4. Update contact form component
5. Test with real email
6. Deploy

**Time:** 1-2 hours
**Cost:** Free (100 emails/day)

#### **Option B: Supabase Edge Functions**

**Pros:**
- Already using Supabase for database
- Serverless functions
- Can store contact submissions in DB

**Cons:**
- More complex setup
- Need to configure email service separately

**Time:** 3-4 hours

#### **Option C: Third-party Form Service**

Options: Formspree, Tally, Typeform
- **Pros:** No code required
- **Cons:** Less control, monthly fee, external dependency

#### Definition of Done
- Support mailbox receives the submission email with all fields populated.
- Sender receives confirmation email rendered with submitted message.
- Frontend shows loading, success, and failure states with validation preventing empty submissions.
- `.env.local` and deployment secrets list `RESEND_API_KEY` (and support address) requirements.
- QA notes document the manual test run and expected behavior.

---

## 📊 Feature 2: Analytics Integration

### Option A: Vercel Analytics (Recommended)

**Pros:**
- Built into Vercel deployment
- Zero configuration
- Privacy-friendly (no cookies)
- Real-time metrics
- Core Web Vitals tracking

**Setup:**

```bash
npm install @vercel/analytics
```

```tsx
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Time:** 5 minutes
**Cost:** Free with Vercel deployment

### Option B: Google Analytics 4

**Setup:**

```bash
npm install @next/third-parties
```

```tsx
// src/app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  )
}
```

**Time:** 30 minutes
**Cost:** Free

### Option C: Mixpanel (Advanced)

**Pros:**
- Event tracking
- User cohorts
- Funnel analysis

**Cons:**
- More complex
- Limited free tier

**Time:** 2-3 hours

#### Definition of Done
- `@vercel/analytics` renders telemetry in the Vercel dashboard for deployed environments.
- Optional GA4 events appear under the configured property when `NEXT_PUBLIC_GA_ID` is supplied.
- Analytics code is gated to avoid duplicate events in local development.
- Documentation or story notes capture dashboard URLs and validation screenshots/IDs.

---

## 🐛 Feature 3: Error Monitoring (Sentry)

### Implementation

**Setup:**

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Configuration (automatic via wizard):**

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  // Only send errors in production
  enabled: process.env.NODE_ENV === 'production',
})
```

```typescript
// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

**Benefits:**
- Real-time error tracking
- Stack traces with source maps
- User context
- Performance monitoring
- Slack/email alerts

**Time:** 30 minutes
**Cost:** Free (5K events/month)

#### Definition of Done
- `NEXT_PUBLIC_SENTRY_DSN` and `SENTRY_AUTH_TOKEN` configured in local and deployment environments.
- Wizard-generated config committed; `sentry-example-page` removed or disabled before merge.
- Intentional error (e.g., `/api/contact` throw) appears in Sentry dashboard with release/environment tags.
- Alert channel (email/Slack) subscribed to the project.
- Validation steps captured in story notes or runbook for future regression testing.

---

## ⚡ Feature 4: Performance Optimization

### A. Enable Caching

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export caching
  output: 'standalone',

  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },

  // Enable compression
  compress: true,

  // Enable strict mode
  reactStrictMode: true,
}

module.exports = nextConfig
```

### B. Database Caching (Supabase)

```typescript
// src/lib/supabase/cache.ts
import { cache } from 'react'

export const getCachedPosts = cache(async () => {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  return data
})
```

### C. Static Generation where possible

```tsx
// Blog list page - Static with ISR
export const revalidate = 3600 // 1 hour

// Blog detail pages - Static with on-demand revalidation
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}
```

### D. Cloudflare CDN (if not using Vercel)

- Add domain to Cloudflare
- Enable caching rules
- Configure page rules for static assets

### E. Optimize Bundle Size

```bash
# Analyze bundle
npm install @next/bundle-analyzer

# Run analysis
ANALYZE=true npm run build
```

**Target Metrics:**
- First Contentful Paint: <1.8s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.8s
- Total Bundle Size: <500KB (initial)

#### Definition of Done
- Lighthouse performance score ≥90 on desktop and mobile for core marketing pages.
- Recorded metrics (FCP, LCP, TTI, CLS) shared in QA log with before/after comparison.
- `next/image` and caching configuration committed with notes on CDN settings.
- Bundle analysis report archived (screenshot/link) to track future regressions.

---

## 📝 Feature 5 (Optional): CMS Integration for Blog

> Schedule only after Features 1-4 are deployed and monitored for at least one release.

### Current State
- ✅ Blog UI complete with 6 sample posts
- ❌ Content hardcoded in `page.tsx`
- ❌ No admin interface to add/edit posts

### Recommended Path: Contentful
1. **Provision space & tokens** – create a free Contentful space, generate Content Delivery & Preview tokens, store as `CONTENTFUL_SPACE_ID`/`CONTENTFUL_ACCESS_TOKEN`/`CONTENTFUL_PREVIEW_TOKEN`.
2. **Model content** – configure `Blog Post`, `Author`, and `Category` content types matching current UI needs (title, slug, author ref, hero image, excerpt, rich text body, read time).
3. **Install SDK & client** – `npm install contentful` and create `src/lib/contentful.ts` helper using `createClient()` for delivery and preview clients.
4. **Swap data layer** – update `src/app/blog/page.tsx` and `[slug]/page.tsx` to fetch from Contentful, replacing hardcoded arrays with server-side fetch + ISR (`export const revalidate = 3600`).
5. **Add preview + revalidation** – implement `/api/revalidate` webhook handler and preview route so editors can trigger updates without deploys.
6. **Migrate seed content** – recreate the six sample posts within Contentful and verify rendering matches the existing design system.

**Time:** 4-6 hours (including migration)
**Cost:** Free tier (25K records, 3 users)

### Alternative Options
- **Sanity CMS** – real-time collaboration, more setup (~6-8 hrs).
- **Notion API** – leverages existing workspace, limited modeling (~3-4 hrs).

#### Definition of Done
- Marketing blog pages render exclusively from the chosen CMS in production.
- Editors can add/edit posts without code changes and see updates after ISR/preview refresh.
- On-demand revalidation endpoint secured (secret token) and documented.
- Fallback content strategy defined for CMS outages (e.g., cached ISR, graceful error state).
- Authoring guide committed for future contributors.

---

## 📅 Implementation Roadmap

### Week 1: Production Blockers
- [ ] Day 1-2: Contact form backend (Resend API) wired, validated, documented
- [ ] Day 3: Analytics instrumentation deployed (Vercel, optional GA4) with dashboards verified
- [ ] Day 4: Sentry wizard + test error + alert channel configured
- [ ] Day 5: Regression testing, QA notes, and deployment sign-off

### Week 2: Performance Hardening
- [ ] Day 1-2: Caching setup and `next/image` audit
- [ ] Day 3: Image optimization + CDN rules validated
- [ ] Day 4: Bundle analysis and reduction tasks completed
- [ ] Day 5: Lighthouse re-run with metrics logged (>90 score target)

### Optional Sprint: CMS Integration (Schedule After Telemetry Stabilizes)
- [ ] Day 1-2: CMS space provisioning + content modeling
- [ ] Day 3: Data layer swap + ISR/preview wiring
- [ ] Day 4: Content migration + editor walkthrough
- [ ] Day 5: Documentation + handoff to marketing

---

## 🛠️ Tech Stack Summary

| Feature | Service | Reason | Cost |
|---------|---------|--------|------|
| Contact Form | Resend | Already configured, simple | Free (100/day) |
| CMS (optional) | Contentful | Industry standard | Free (25K records) |
| Analytics | Vercel + GA4 | Built-in + Standard | Free |
| Error Monitoring | Sentry | Best in class | Free (5K events) |
| CDN | Vercel Edge | Automatic with hosting | Free |
| Image Optimization | Next.js Image | Built-in | Free |

**Total Monthly Cost:** $0 (all free tiers sufficient for MVP)

---

## 📋 Environment Variables Needed

```bash
# Already have (from Phase 1):
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=

# New for Phase 3 (production blockers):
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# Optional (CMS sprint):
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_TOKEN=
```

---

## ✅ Acceptance Criteria

### Contact Form
- [ ] Form submits successfully
- [ ] User receives confirmation email
- [ ] Support team receives inquiry
- [ ] Error handling works
- [ ] Loading states display

### Analytics
- [ ] Vercel Analytics tracking pageviews
- [ ] Google Analytics receiving events
- [ ] Core Web Vitals reporting
- [ ] Real User Monitoring active

### Error Monitoring
- [ ] Sentry capturing errors
- [ ] Source maps uploading
- [ ] Alerts configured
- [ ] Team can view errors

### Performance
- [ ] Lighthouse score >90
- [ ] First Contentful Paint <1.8s
- [ ] Bundle size <500KB initial
- [ ] All images optimized

### CMS (Optional)
- [ ] Blog posts load from Contentful
- [ ] New posts appear without code deploy
- [ ] Images optimize correctly
- [ ] ISR revalidation works
- [ ] Admin can edit content

---

## 🚀 Deployment Checklist

- [ ] All environment variables set in production
- [ ] Domain verified for Resend (Contentful once CMS enabled)
- [ ] Sentry source maps uploaded
- [ ] Analytics tracking verified
- [ ] Error monitoring tested
- [ ] Performance metrics baseline captured
- [ ] CDN caching configured
- [ ] HTTPS enabled
- [ ] robots.txt configured
- [ ] Sitemap generated

---

## 📚 Documentation to Create

- [ ] CMS content guidelines
- [ ] API documentation
- [ ] Deployment runbook
- [ ] Monitoring alerts setup
- [ ] Performance benchmarks

---

**Next Step:** Review this plan and prioritize features. Start with Contact Form (easiest, immediate value), then Analytics and Sentry (critical for production), follow with Performance hardening, and only then consider CMS as an optional sprint.
