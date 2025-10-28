# Waitlist Campaign Infrastructure Checklist
## Weeks 1-4 Implementation Readiness Assessment

**Last Updated:** January 2025
**Status:** 🔄 In Progress (Content complete, infrastructure in progress)
**Target Launch:** Ready for first subscribers within 2 weeks

---

## Executive Summary

### Content Status: ✅ COMPLETE
- Week 1 email: ✅ Written (2 variants)
- Week 2 email: ✅ Written (4 goal-specific variants)
- Week 3 email: ✅ Written (827 lines, production-ready)
- Week 4 email: ✅ Written (v2 with exec summary)
- Week 4 PDF: ✅ Content complete (26 pages)
- Week 4 PDF: 🔄 Design in progress (Canva/Figma, 3-4 hours)

### Infrastructure Status: 🔄 NEEDS BUILD
- **Database Schema:** ⚠️ Partially implemented (needs waitlist columns)
- **Email Automation:** ❌ Not built (Vercel cron needed)
- **Referral System:** ❌ Not built (decide: Prefinery vs custom)
- **Download Tracking:** ❌ Not built (Week 4 PDF analytics)
- **Goal Selection API:** ❌ Not built (Week 1 goal buttons)

---

## Phase 1: Database Infrastructure

### 1.1 Current State Assessment

**✅ What Already Exists:**

```sql
-- From supabase/migrations/003_enhanced_email_newsletter.sql
-- (Already applied to production database)

CREATE TABLE IF NOT EXISTS email_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  confirmed BOOLEAN DEFAULT false,

  -- UTM tracking (for attribution)
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,

  -- Consent & compliance
  consent_given BOOLEAN DEFAULT false,
  ip_address INET,
  user_agent TEXT
);
```

**❌ What's Missing for Waitlist Campaign:**

```sql
-- Need to add these columns to email_subscriptions:

ALTER TABLE email_subscriptions
ADD COLUMN IF NOT EXISTS
  -- Tier progression
  waitlist_tier TEXT DEFAULT 'tier1'
    CHECK (waitlist_tier IN ('tier1', 'tier2', 'tier3')),
  tier2_upgraded_at TIMESTAMPTZ,
  tier3_upgraded_at TIMESTAMPTZ,

  -- Personalization (Week 1 goal selection)
  primary_health_goal TEXT
    CHECK (primary_health_goal IN ('movement', 'sleep', 'stress', 'recovery')),
  goal_selected_at TIMESTAMPTZ,

  -- Referral system
  referral_code TEXT UNIQUE,
  referral_count INT DEFAULT 0,
  referred_by TEXT, -- Links to another user's referral_code

  -- Gamification
  waitlist_position INT,
  engagement_score INT DEFAULT 0,
  badges TEXT[] DEFAULT ARRAY[]::TEXT[],

  -- Founding member
  founding_member BOOLEAN DEFAULT false,
  founding_member_price DECIMAL(10,2),
  founding_member_claimed_at TIMESTAMPTZ,

  -- Engagement tracking
  last_email_opened_at TIMESTAMPTZ,
  total_emails_opened INT DEFAULT 0,
  total_links_clicked INT DEFAULT 0,
  total_emails_sent INT DEFAULT 0,
  last_email_sent_at TIMESTAMPTZ,

  -- Survey tracking (Week 5)
  survey_completed BOOLEAN DEFAULT false,
  survey_completed_at TIMESTAMPTZ,

  -- Week 4 PDF download tracking
  pdf_downloaded BOOLEAN DEFAULT false,
  pdf_downloaded_at TIMESTAMPTZ;

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_waitlist_position
  ON email_subscriptions(waitlist_position);
CREATE INDEX IF NOT EXISTS idx_referral_code
  ON email_subscriptions(referral_code);
CREATE INDEX IF NOT EXISTS idx_primary_health_goal
  ON email_subscriptions(primary_health_goal);
CREATE INDEX IF NOT EXISTS idx_waitlist_tier
  ON email_subscriptions(waitlist_tier);
CREATE INDEX IF NOT EXISTS idx_engagement_score
  ON email_subscriptions(engagement_score DESC);
```

### 1.2 New Tables Needed

**📊 Referrals Tracking Table:**

```sql
CREATE TABLE IF NOT EXISTS waitlist_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_email TEXT REFERENCES email_subscriptions(email) ON DELETE CASCADE,
  referrer_code TEXT NOT NULL,
  referred_email TEXT NOT NULL,
  referred_name TEXT,
  status TEXT CHECK (status IN ('pending', 'completed', 'invalid')) DEFAULT 'pending',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  -- Attribution tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  landing_page TEXT,
  ip_address INET
);

CREATE INDEX idx_referrer_code ON waitlist_referrals(referrer_code);
CREATE INDEX idx_referred_email ON waitlist_referrals(referred_email);
CREATE INDEX idx_status ON waitlist_referrals(status);
```

**📧 Email Campaign Tracking Table:**

```sql
CREATE TABLE IF NOT EXISTS email_campaign_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT REFERENCES email_subscriptions(email) ON DELETE CASCADE,

  -- Email details
  campaign_week INT NOT NULL CHECK (campaign_week >= 1 AND campaign_week <= 8),
  email_variant TEXT, -- e.g., 'variant-a-curiosity', 'goal-movement'
  subject_line TEXT,

  -- Event tracking
  event_type TEXT CHECK (event_type IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained')) NOT NULL,
  event_data JSONB, -- Stores click URLs, bounce reasons, etc.

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Brevo webhook data (optional)
  brevo_message_id TEXT,
  brevo_event_id TEXT
);

CREATE INDEX idx_email_campaign ON email_campaign_events(email, campaign_week);
CREATE INDEX idx_event_type ON email_campaign_events(event_type);
CREATE INDEX idx_created_at ON email_campaign_events(created_at DESC);
```

**🎯 Micro-Commitments Table (Optional for Future):**

```sql
-- For Week 5-8 engagement tracking (daily check-ins)
CREATE TABLE IF NOT EXISTS micro_commitments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT REFERENCES email_subscriptions(email) ON DELETE CASCADE,
  week INT NOT NULL,
  day INT CHECK (day IN (1, 2, 3)) NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(email, week, day)
);

CREATE INDEX idx_commitment_email_week ON micro_commitments(email, week);
```

### 1.3 Migration File Creation

**File:** `moon-ring-platform/supabase/migrations/004_waitlist_campaign.sql`

```sql
-- Migration: Add waitlist campaign infrastructure
-- Date: 2025-01-XX
-- Purpose: Support 8-week behavioral email campaign with referral tracking

BEGIN;

-- 1. Extend email_subscriptions table
ALTER TABLE email_subscriptions
ADD COLUMN IF NOT EXISTS waitlist_tier TEXT DEFAULT 'tier1' CHECK (waitlist_tier IN ('tier1', 'tier2', 'tier3')),
ADD COLUMN IF NOT EXISTS tier2_upgraded_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS tier3_upgraded_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS primary_health_goal TEXT CHECK (primary_health_goal IN ('movement', 'sleep', 'stress', 'recovery')),
ADD COLUMN IF NOT EXISTS goal_selected_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS referral_count INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS referred_by TEXT,
ADD COLUMN IF NOT EXISTS waitlist_position INT,
ADD COLUMN IF NOT EXISTS engagement_score INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS badges TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN IF NOT EXISTS founding_member BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS founding_member_price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS founding_member_claimed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS last_email_opened_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS total_emails_opened INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_links_clicked INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_emails_sent INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_email_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS survey_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS survey_completed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS pdf_downloaded BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS pdf_downloaded_at TIMESTAMPTZ;

-- 2. Create indexes
CREATE INDEX IF NOT EXISTS idx_waitlist_position ON email_subscriptions(waitlist_position);
CREATE INDEX IF NOT EXISTS idx_referral_code ON email_subscriptions(referral_code);
CREATE INDEX IF NOT EXISTS idx_primary_health_goal ON email_subscriptions(primary_health_goal);
CREATE INDEX IF NOT EXISTS idx_waitlist_tier ON email_subscriptions(waitlist_tier);
CREATE INDEX IF NOT EXISTS idx_engagement_score ON email_subscriptions(engagement_score DESC);

-- 3. Create waitlist_referrals table
CREATE TABLE IF NOT EXISTS waitlist_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_email TEXT REFERENCES email_subscriptions(email) ON DELETE CASCADE,
  referrer_code TEXT NOT NULL,
  referred_email TEXT NOT NULL,
  referred_name TEXT,
  status TEXT CHECK (status IN ('pending', 'completed', 'invalid')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  landing_page TEXT,
  ip_address INET
);

CREATE INDEX idx_referrer_code ON waitlist_referrals(referrer_code);
CREATE INDEX idx_referred_email ON waitlist_referrals(referred_email);
CREATE INDEX idx_status ON waitlist_referrals(status);

-- 4. Create email_campaign_events table
CREATE TABLE IF NOT EXISTS email_campaign_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT REFERENCES email_subscriptions(email) ON DELETE CASCADE,
  campaign_week INT NOT NULL CHECK (campaign_week >= 1 AND campaign_week <= 8),
  email_variant TEXT,
  subject_line TEXT,
  event_type TEXT CHECK (event_type IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained')) NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  brevo_message_id TEXT,
  brevo_event_id TEXT
);

CREATE INDEX idx_email_campaign ON email_campaign_events(email, campaign_week);
CREATE INDEX idx_event_type ON email_campaign_events(event_type);
CREATE INDEX idx_created_at ON email_campaign_events(created_at DESC);

-- 5. Generate referral codes for existing subscribers
UPDATE email_subscriptions
SET referral_code = CONCAT(
  SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 4),
  SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 4)
)
WHERE referral_code IS NULL;

-- 6. Calculate initial waitlist positions (FIFO based on subscribed_at)
WITH ranked_subscribers AS (
  SELECT
    email,
    ROW_NUMBER() OVER (ORDER BY subscribed_at ASC) AS position
  FROM email_subscriptions
  WHERE unsubscribed_at IS NULL
)
UPDATE email_subscriptions es
SET waitlist_position = rs.position
FROM ranked_subscribers rs
WHERE es.email = rs.email;

COMMIT;
```

---

## Phase 2: Email Automation Infrastructure

### 2.1 Existing Brevo Integration (✅ Already Built)

**File:** `moon-ring-platform/src/lib/email/brevo.ts`

**What Works:**
- Brevo API client configured
- Email templates for: welcome, contact confirmation, order confirmation
- Newsletter subscription flow (`/api/newsletter/subscribe`)

**What Needs Extension:**
- Add 8-week waitlist email templates to `emailTemplates` object
- Create helper functions for personalization (goal-specific content)

### 2.2 Email Templates to Add

**Update:** `moon-ring-platform/src/lib/email/brevo.ts`

```typescript
// Add to existing emailTemplates object:

export const waitlistEmailTemplates = {
  week1Welcome: (subscriberData: {
    email: string
    name: string
    position: number
    referralLink: string
  }) => ({
    subject: `Welcome to Moon Ring! You're #${subscriberData.position} 🎉`,
    htmlContent: week1WelcomeHTML(subscriberData),
    textContent: week1WelcomeText(subscriberData),
    tags: ['waitlist', 'week1', 'welcome']
  }),

  week2Identity: (subscriberData: {
    email: string
    name: string
    goal: 'movement' | 'sleep' | 'stress' | 'recovery'
  }) => ({
    subject: getWeek2Subject(subscriberData.goal),
    htmlContent: week2IdentityHTML(subscriberData),
    textContent: week2IdentityText(subscriberData),
    tags: ['waitlist', 'week2', 'identity', `goal-${subscriberData.goal}`]
  }),

  // Continue for weeks 3-8...
}

// Helper: Goal-specific subject lines
function getWeek2Subject(goal: string): string {
  const subjects = {
    movement: "You're a movement-focused behavior changer",
    sleep: "You're a sleep-optimization champion",
    stress: "You're a stress-management leader",
    recovery: "You're a recovery-optimization expert"
  }
  return subjects[goal] || subjects.movement
}
```

### 2.3 Vercel Cron Job for Email Automation

**File:** `moon-ring-platform/vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/cron/waitlist-emails",
      "schedule": "0 9 * * *"
    }
  ]
}
```

**File:** `moon-ring-platform/src/app/api/cron/waitlist-emails/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendWaitlistEmail } from '@/lib/email/waitlist-automation'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  // Verify cron secret (security)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient()
  const now = new Date()

  try {
    // WEEK 1: Send 1 hour after signup
    const week1Candidates = await supabase
      .from('email_subscriptions')
      .select('*')
      .is('unsubscribed_at', null)
      .gte('subscribed_at', new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString())
      .lte('subscribed_at', new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString())
      .eq('total_emails_sent', 0) // Haven't sent Week 1 yet

    for (const subscriber of week1Candidates.data || []) {
      await sendWaitlistEmail(subscriber, 1)
    }

    // WEEK 2: Send 7 days after signup (if goal selected)
    const week2Candidates = await supabase
      .from('email_subscriptions')
      .select('*')
      .is('unsubscribed_at', null)
      .not('primary_health_goal', 'is', null) // Has selected goal
      .gte('subscribed_at', new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000).toISOString())
      .lte('subscribed_at', new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .eq('total_emails_sent', 1) // Only sent Week 1

    for (const subscriber of week2Candidates.data || []) {
      await sendWaitlistEmail(subscriber, 2)
    }

    // WEEK 3: Send 14 days after signup
    const week3Candidates = await supabase
      .from('email_subscriptions')
      .select('*')
      .is('unsubscribed_at', null)
      .gte('subscribed_at', new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000).toISOString())
      .lte('subscribed_at', new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString())
      .eq('total_emails_sent', 2)

    for (const subscriber of week3Candidates.data || []) {
      await sendWaitlistEmail(subscriber, 3)
    }

    // WEEK 4: Send 21 days after signup
    const week4Candidates = await supabase
      .from('email_subscriptions')
      .select('*')
      .is('unsubscribed_at', null)
      .gte('subscribed_at', new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000).toISOString())
      .lte('subscribed_at', new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000).toISOString())
      .eq('total_emails_sent', 3)

    for (const subscriber of week4Candidates.data || []) {
      await sendWaitlistEmail(subscriber, 4)
    }

    return NextResponse.json({ success: true, message: 'Waitlist emails processed' })
  } catch (error) {
    console.error('Waitlist email cron error:', error)
    return NextResponse.json({ error: 'Failed to process emails' }, { status: 500 })
  }
}
```

**File:** `moon-ring-platform/src/lib/email/waitlist-automation.ts`

```typescript
import { BrevoClient } from '@/lib/email/brevo'
import { createClient } from '@/lib/supabase/server'
import { waitlistEmailTemplates } from '@/lib/email/brevo'

export async function sendWaitlistEmail(subscriber: any, week: number) {
  const supabase = createClient()

  // Select email template based on week
  let emailTemplate
  switch (week) {
    case 1:
      emailTemplate = waitlistEmailTemplates.week1Welcome({
        email: subscriber.email,
        name: subscriber.full_name || 'there',
        position: subscriber.waitlist_position,
        referralLink: `${process.env.NEXT_PUBLIC_APP_URL}/?ref=${subscriber.referral_code}`
      })
      break
    case 2:
      emailTemplate = waitlistEmailTemplates.week2Identity({
        email: subscriber.email,
        name: subscriber.full_name || 'there',
        goal: subscriber.primary_health_goal
      })
      break
    // Cases 3-8...
  }

  // Send via Brevo
  const brevo = new BrevoClient()
  const result = await brevo.sendTransactionalEmail({
    sender: { name: 'Denton from Moon Ring', email: 'denton@moonring.co' },
    to: [{ email: subscriber.email, name: subscriber.full_name }],
    subject: emailTemplate.subject,
    htmlContent: emailTemplate.htmlContent,
    textContent: emailTemplate.textContent,
    tags: emailTemplate.tags
  })

  // Log event to database
  await supabase.from('email_campaign_events').insert({
    email: subscriber.email,
    campaign_week: week,
    email_variant: emailTemplate.tags.find(t => t.startsWith('goal-')) || 'standard',
    subject_line: emailTemplate.subject,
    event_type: 'sent',
    brevo_message_id: result.messageId
  })

  // Update subscriber tracking
  await supabase
    .from('email_subscriptions')
    .update({
      total_emails_sent: week,
      last_email_sent_at: new Date().toISOString()
    })
    .eq('email', subscriber.email)
}
```

---

## Phase 3: Goal Selection API (Week 1 Interaction)

### 3.1 API Route: Set Primary Health Goal

**File:** `moon-ring-platform/src/app/api/waitlist/set-goal/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { email, goal, token } = await request.json()

    // Validate goal
    const validGoals = ['movement', 'sleep', 'stress', 'recovery']
    if (!validGoals.includes(goal)) {
      return NextResponse.json({ error: 'Invalid goal' }, { status: 400 })
    }

    const supabase = createClient()

    // Update subscriber's goal
    const { data, error } = await supabase
      .from('email_subscriptions')
      .update({
        primary_health_goal: goal,
        goal_selected_at: new Date().toISOString(),
        waitlist_tier: 'tier2', // Upgrade to Tier 2
        tier2_upgraded_at: new Date().toISOString(),
        engagement_score: supabase.sql`engagement_score + 10` // Reward engagement
      })
      .eq('email', email)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Goal set to: ${goal}`,
      tier: 'tier2'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set goal' }, { status: 500 })
  }
}
```

---

## Phase 4: PDF Download Tracking (Week 4)

### 4.1 Download Landing Page

**File:** `moon-ring-platform/src/app/download/guide/[subscriber_id]/page.tsx`

```typescript
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function DownloadGuidePage({
  params
}: {
  params: { subscriber_id: string }
}) {
  const supabase = createClient()

  // Fetch subscriber by ID
  const { data: subscriber } = await supabase
    .from('email_subscriptions')
    .select('*')
    .eq('id', params.subscriber_id)
    .single()

  if (!subscriber) {
    return notFound()
  }

  // Track page view
  await supabase.from('email_campaign_events').insert({
    email: subscriber.email,
    campaign_week: 4,
    event_type: 'clicked',
    event_data: { page: 'download-guide' }
  })

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">
          Your Free Guide is Ready, {subscriber.full_name}!
        </h1>

        <p className="text-lg text-gray-300 mb-8">
          The Science of Social Accountability • 23 pages • 15-minute read
        </p>

        <a
          href="/pdfs/accountability-science-guide.pdf"
          download
          onClick={async () => {
            // Track download event
            await fetch('/api/waitlist/track-download', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ subscriber_id: params.subscriber_id })
            })
          }}
          className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg font-bold text-lg hover:shadow-xl transition"
        >
          📥 Download Your Free Guide (PDF)
        </a>

        {/* Table of contents preview */}
        {/* Soft CTA to join Moon Ring waitlist */}
      </div>
    </div>
  )
}
```

### 4.2 Download Tracking API

**File:** `moon-ring-platform/src/app/api/waitlist/track-download/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { subscriber_id } = await request.json()
  const supabase = createClient()

  // Mark PDF as downloaded
  await supabase
    .from('email_subscriptions')
    .update({
      pdf_downloaded: true,
      pdf_downloaded_at: new Date().toISOString(),
      engagement_score: supabase.sql`engagement_score + 20` // Reward download
    })
    .eq('id', subscriber_id)

  // Log event
  await supabase.from('email_campaign_events').insert({
    email: (await supabase.from('email_subscriptions').select('email').eq('id', subscriber_id).single()).data.email,
    campaign_week: 4,
    event_type: 'clicked',
    event_data: { action: 'pdf_downloaded' }
  })

  return NextResponse.json({ success: true })
}
```

---

## Phase 5: Referral System Decision

### Option A: Use Prefinery (SaaS, Recommended for Speed)

**Pros:**
- ✅ Ready in 1-2 days (vs 2 weeks custom build)
- ✅ Fraud detection built-in
- ✅ Viral waitlist mechanics proven
- ✅ Social sharing widgets included

**Cons:**
- ❌ $49-69/month cost
- ❌ Less control over UX
- ❌ Webhook integration needed

**Implementation:**
1. Sign up for Prefinery 14-day trial
2. Configure waitlist with Bronze/Silver/Gold tiers
3. Set up webhook → Supabase sync
4. Embed Prefinery widget on post-signup page

---

### Option B: Build Custom (Full Control)

**Pros:**
- ✅ Zero ongoing cost
- ✅ Full UX control
- ✅ Deep Supabase integration

**Cons:**
- ❌ 2 weeks development time
- ❌ Need to build fraud detection
- ❌ More testing required

**Implementation Estimate:**
- Week 1: Referral code generation, tracking API
- Week 2: Position calculation logic, celebration emails, leaderboard page

---

### RECOMMENDATION: **Option A (Prefinery) for Weeks 1-4**

**Rationale:**
1. **Speed matters**: Content is ready, infrastructure is the blocker
2. **Validation first**: Test waitlist mechanics before investing 2 weeks in custom build
3. **Cost is acceptable**: $49-69/mo for 2-3 months ($100-200 total) vs 2 weeks dev time
4. **Can rebuild later**: If waitlist performs well, justify custom rebuild in Month 3-4

---

## Implementation Timeline

### Week 1: Database + Email Infrastructure
**Tasks:**
- [ ] Create migration `004_waitlist_campaign.sql`
- [ ] Apply migration to Supabase (via SQL Editor)
- [ ] Verify all new columns exist
- [ ] Test referral code generation
- [ ] Add waitlist email templates to `brevo.ts`

**Time Estimate:** 8-12 hours

---

### Week 2: Email Automation + APIs
**Tasks:**
- [ ] Build Vercel cron job (`/api/cron/waitlist-emails`)
- [ ] Create `waitlist-automation.ts` helper
- [ ] Build goal selection API (`/api/waitlist/set-goal`)
- [ ] Build download tracking API (`/api/waitlist/track-download`)
- [ ] Test full Week 1-4 email flow with test emails

**Time Estimate:** 12-16 hours

---

### Week 3: PDF + Landing Pages
**Tasks:**
- [ ] Design PDF in Canva (3-4 hours)
- [ ] Export and optimize PDF (<2 MB)
- [ ] Upload to `/public/pdfs/`
- [ ] Build download landing page (`/download/guide/[id]`)
- [ ] Test download tracking end-to-end

**Time Estimate:** 6-8 hours

---

### Week 4: Referral System + Launch Prep
**Tasks:**
- [ ] **Option A**: Set up Prefinery + webhook integration (2 days)
- [ ] **Option B**: Build custom referral system (2 weeks)
- [ ] Test referral flow end-to-end
- [ ] Set up analytics dashboard
- [ ] **LAUNCH**: Begin accepting waitlist signups

**Time Estimate:**
- Option A (Prefinery): 8-12 hours
- Option B (Custom): 40-60 hours

---

## Success Metrics Dashboard

### Week 1-4 KPIs to Track

| Metric | Week 1 Target | Week 2 Target | Week 3 Target | Week 4 Target |
|--------|---------------|---------------|---------------|---------------|
| **Total Signups** | 100-200 | 300-500 | 600-1,000 | 1,000-1,500 |
| **Tier 1 → Tier 2** | 35-45% | 40-50% | 40-50% | 45-55% |
| **Email Open Rate** | 65-70% | 60-65% | 55-60% | 50-55% |
| **Email Click Rate** | 40-50% | 25-30% | 20-25% | 12-18% (PDF) |
| **PDF Download Rate** | N/A | N/A | N/A | 25-30% |
| **Referral Rate** | 15-20% | 20-25% | 25-30% | 30-35% |

### Analytics Tools Setup

**Supabase Dashboard Queries:**

```sql
-- Daily snapshot query
SELECT
  COUNT(*) FILTER (WHERE subscribed_at::date = CURRENT_DATE) AS signups_today,
  COUNT(*) FILTER (WHERE waitlist_tier = 'tier2') AS tier2_total,
  COUNT(*) FILTER (WHERE pdf_downloaded = true) AS pdf_downloads,
  AVG(referral_count) AS avg_referrals_per_user,
  COUNT(*) FILTER (WHERE referral_count >= 1) AS users_with_referrals
FROM email_subscriptions
WHERE unsubscribed_at IS NULL;

-- Email performance by week
SELECT
  campaign_week,
  event_type,
  COUNT(*) AS event_count,
  ROUND(100.0 * COUNT(*) / (
    SELECT COUNT(*)
    FROM email_campaign_events e2
    WHERE e2.campaign_week = e1.campaign_week
    AND e2.event_type = 'sent'
  ), 2) AS percentage
FROM email_campaign_events e1
WHERE campaign_week <= 4
GROUP BY campaign_week, event_type
ORDER BY campaign_week, event_type;
```

---

## Final Checklist Before Launch

### Content ✅
- [x] Week 1 email written
- [x] Week 2 email written (4 goal variants)
- [x] Week 3 email written
- [x] Week 4 email written
- [x] Week 4 PDF content complete (26 pages)
- [ ] Week 4 PDF designed (Canva, 3-4 hours) ⏳

### Infrastructure ⚠️
- [ ] Database migration applied
- [ ] Email templates added to `brevo.ts`
- [ ] Vercel cron job deployed
- [ ] Goal selection API built
- [ ] Download tracking API built
- [ ] Download landing page built
- [ ] Referral system (Prefinery or custom)

### Testing ⚠️
- [ ] Send test Week 1-4 emails to yourself
- [ ] Click goal selection buttons (verify API works)
- [ ] Download PDF (verify tracking works)
- [ ] Share referral link (verify attribution)
- [ ] Check database updates after each action

### Go-Live ⏳
- [ ] Deploy all API routes to production
- [ ] Verify cron job runs daily (check Vercel logs)
- [ ] Monitor first 10 signups manually
- [ ] Check email delivery (no bounces/spam)
- [ ] **LAUNCH**: Announce waitlist on social media

---

## Next Actions

**Immediate (This Week):**
1. ✅ Complete PDF design (Canva, 3-4 hours)
2. ⚠️ Create database migration file
3. ⚠️ Apply migration to Supabase
4. ⚠️ Add email templates to `brevo.ts`

**Week 2:**
1. Build Vercel cron job
2. Build goal selection + download APIs
3. Test email automation locally

**Week 3:**
1. Set up Prefinery (or start custom referral build)
2. Deploy all infrastructure to production
3. Test end-to-end with real emails
4. **LAUNCH** 🚀

---

**Status:** 🔄 Ready for infrastructure build (content 100% complete)
**Timeline:** 2-3 weeks to full launch readiness
**Next Milestone:** Database migration + email template integration
