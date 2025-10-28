# Waitlist Campaign Infrastructure - Deployment Guide

**Status**: ✅ Code Complete (All infrastructure implemented)
**Deployment Status**: ⚠️ Pending (Database + Environment setup required)
**Last Updated**: 2025-01-16

---

## 📋 Overview

This guide walks through deploying the complete waitlist campaign infrastructure for Weeks 1-4. The system automatically sends behavioral psychology-driven email sequences at precise intervals to convert waitlist signups into engaged customers.

**Campaign Flow**:
1. **Week 1** (1 hour after signup): Viral referral hook
2. **Week 2** (7 days): Goal selection (Tier 1→2 upgrade)
3. **Week 3** (14 days): Social proof + testimonials
4. **Week 4** (21 days): Educational PDF delivery

---

## ✅ What's Been Built

### 1. Database Schema (`004_waitlist_campaign.sql`)
**Location**: `/moon-ring-platform/supabase/migrations/004_waitlist_campaign.sql`

**Changes**:
- Extended `email_subscriptions` table with 20+ new columns
- New tables: `waitlist_referrals`, `email_campaign_events`, `micro_commitments`
- Database triggers for auto-generating referral codes
- Helper functions: `calculate_engagement_score()`, `update_waitlist_positions()`
- Analytics views: `waitlist_leaderboard`, `campaign_performance`, `tier_conversion_funnel`

### 2. Email Templates (`brevo.ts`)
**Location**: `/moon-ring-platform/src/lib/email/brevo.ts`

**Added**:
- `waitlistWeek1()` - Viral hook with referral link
- `waitlistWeek2()` - Goal selection with Tier 2 upgrade
- `waitlistWeek3()` - Social proof with testimonials
- `waitlistWeek4()` - PDF delivery with executive summary inline

### 3. Automated Email Cron Job
**Location**: `/moon-ring-platform/src/app/api/cron/waitlist-emails/route.ts`

**Features**:
- Runs every hour (Vercel cron: `0 * * * *`)
- Queries Supabase for candidates based on signup time
- Sends appropriate week's email automatically
- Tracks email events and updates engagement scores
- Processes max 100 emails per run to avoid timeouts

### 4. Goal Selection Flow
**API**: `/moon-ring-platform/src/app/api/waitlist/set-goal/route.ts`
**Page**: `/moon-ring-platform/src/app/waitlist/goal-selection/page.tsx`

**Features**:
- 4 goal options (movement, sleep, stress, recovery)
- Optional name field for personalization
- Upgrades user from Tier 1 to Tier 2
- Awards +5 engagement points
- Mobile-first UI with brand gradient

### 5. PDF Download Tracking
**API**: `/moon-ring-platform/src/app/api/waitlist/track-download/route.ts`
**Page**: `/moon-ring-platform/src/app/download/guide/[subscriber_id]/page.tsx`

**Features**:
- Tracks first-time PDF downloads
- Awards +3 engagement points
- Logs event in `email_campaign_events`
- Clean, distraction-free download page
- Idempotent (allows multiple downloads, tracks first time)

### 6. Vercel Cron Configuration
**Location**: `/vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/cron/waitlist-emails",
      "schedule": "0 * * * *"
    }
  ]
}
```

---

## 🚀 Deployment Steps

### Step 1: Apply Database Migration

**Using Supabase Dashboard** (Recommended):

1. Navigate to Supabase Dashboard → SQL Editor
2. Open migration file: `/moon-ring-platform/supabase/migrations/004_waitlist_campaign.sql`
3. Copy entire SQL content
4. Paste into SQL Editor and click "Run"
5. Verify success with these queries:

```sql
-- Check new columns exist
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'email_subscriptions'
  AND column_name LIKE '%waitlist%';

-- Check new tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_name IN ('waitlist_referrals', 'email_campaign_events', 'micro_commitments');

-- Check referral codes generated for existing subscribers
SELECT COUNT(*) as subscribers_with_codes
FROM email_subscriptions
WHERE referral_code IS NOT NULL;

-- View leaderboard
SELECT * FROM waitlist_leaderboard LIMIT 10;
```

**Using Supabase CLI** (Alternative):

```bash
cd moon-ring-platform
supabase db push
```

**Note**: CLI requires database password which we don't store in repo.

### Step 2: Configure Environment Variables

**In Vercel Dashboard** (Production):

1. Go to Project → Settings → Environment Variables
2. Add these new variables:

```bash
# Cron authentication
CRON_SECRET=<generate with: openssl rand -base64 32>

# Already configured (verify they exist):
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
BREVO_API_KEY=xkeysib-your-api-key
NEXT_PUBLIC_APP_URL=https://moonring.com
```

**In `.env.local`** (Development):

```bash
# Copy from .env.example if not already present
CRON_SECRET=dev-secret-for-testing
```

### Step 3: Deploy to Vercel

**From Repository Root**:

```bash
# Ensure you're in the repo root (NOT moon-ring-platform/)
cd /path/to/moonring-website-v1

# Deploy to production
vercel --prod
```

**Verify Deployment**:

1. Check cron job registered:
   - Vercel Dashboard → Project → Settings → Cron Jobs
   - Should see: `/api/cron/waitlist-emails` running hourly

2. Test cron endpoint manually:

```bash
# Get CRON_SECRET from Vercel env vars
curl -X GET https://moonring.com/api/cron/waitlist-emails \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

Expected response:
```json
{
  "success": true,
  "timestamp": "2025-01-16T...",
  "summary": {
    "totalProcessed": 0,
    "successCount": 0,
    "failureCount": 0,
    "byWeek": {
      "week1": 0,
      "week2": 0,
      "week3": 0,
      "week4": 0
    }
  }
}
```

### Step 4: Upload PDF to Public Directory

**Action Required**:

1. Design PDF using Canva/Figma (see `/docs/08-marketing/campaigns/waitlist/lead-magnets/pdf-design-brief.md`)
2. Export as PDF (target: <2 MB)
3. Upload to: `/moon-ring-platform/public/pdfs/accountability-science-guide.pdf`
4. Verify accessible at: `https://moonring.com/pdfs/accountability-science-guide.pdf`

**Note**: Download landing page currently references this path. Update if different.

### Step 5: Test Complete Flow

**Test Scenario** (Use test email):

1. **Sign up for waitlist** via homepage:
   - Navigate to `https://moonring.com/`
   - Enter test email in newsletter form
   - Verify welcome email received

2. **Wait 1 hour** (or manually trigger Week 1):
   - Check email for Week 1 (viral referral hook)
   - Verify referral link format: `https://moonring.com/?ref=MOONRING-XXXXXX`

3. **Click goal selection link** (Week 2):
   - Navigate to: `https://moonring.com/waitlist/goal-selection?id=<subscriber_id>`
   - Select a goal (e.g., "Movement & Activity")
   - Verify tier upgraded to Tier 2

4. **Wait 7 days** (or fast-forward database timestamp):
   ```sql
   -- Fast-forward signup time for testing
   UPDATE email_subscriptions
   SET subscribed_at = NOW() - INTERVAL '7 days'
   WHERE email = 'test@example.com';
   ```
   - Trigger cron manually or wait for hourly run
   - Verify Week 2 email received

5. **Test PDF download** (Week 4):
   - Navigate to: `https://moonring.com/download/guide/<subscriber_id>`
   - Click download button
   - Verify PDF opens in new tab
   - Check database: `pdf_downloaded = true`

---

## 🔧 Configuration Details

### Cron Job Timing

**Schedule**: Every hour at :00 (e.g., 1:00 AM, 2:00 AM, etc.)
**CRON Expression**: `0 * * * *`

**Email Send Windows**:
- **Week 1**: 1-2 hours after signup
- **Week 2**: 7 days ±1 hour
- **Week 3**: 14 days ±1 hour
- **Week 4**: 21 days ±1 hour

**Why hourly?** Balances responsiveness with cost. Week 1 (1 hour window) is most time-sensitive for viral sharing behavior.

### Email Rate Limits

**Brevo Free Tier**:
- 9,000 emails/month
- 300 emails/day

**Calculation**:
- 10,000 signups/month
- 4 emails per subscriber = 40,000 emails/month
- **Exceeds free tier by 4.4×**

**Solutions**:
1. **Upgrade Brevo** to Lite plan ($25/mo for 20k emails)
2. **Stagger launches** (release to 2,000 users at a time)
3. **Skip inactive users** (don't send Week 2-4 if Week 1 not opened)

**Monitoring**:
```sql
-- Check emails sent today
SELECT COUNT(*)
FROM email_campaign_events
WHERE event_type = 'sent'
  AND occurred_at > CURRENT_DATE;
```

### Engagement Scoring

**Point System**:
- Email open: +1 point
- Email click: +3 points
- Goal selection (Tier 2): +5 points
- PDF download: +3 points
- Referral (per person): +10 points

**Usage**:
- Segment high-engagement users for Tier 3 (Founding Member) invites
- Prioritize engaged users for customer support
- A/B test subject lines based on engagement level

---

## 📊 Monitoring & Analytics

### Key Metrics Dashboard

**SQL Queries** (Run in Supabase SQL Editor):

```sql
-- Campaign performance by week
SELECT * FROM campaign_performance ORDER BY email_week, subject_line_variant;

-- Tier conversion funnel
SELECT * FROM tier_conversion_funnel;

-- Top referrers (leaderboard)
SELECT * FROM waitlist_leaderboard LIMIT 50;

-- Email delivery success rate (last 24 hours)
SELECT
  COUNT(*) FILTER (WHERE event_type = 'sent') AS sent,
  COUNT(*) FILTER (WHERE event_type = 'delivered') AS delivered,
  COUNT(*) FILTER (WHERE event_type = 'bounced') AS bounced,
  ROUND(100.0 * COUNT(*) FILTER (WHERE event_type = 'delivered') /
    NULLIF(COUNT(*) FILTER (WHERE event_type = 'sent'), 0), 2) AS delivery_rate_pct
FROM email_campaign_events
WHERE occurred_at > NOW() - INTERVAL '24 hours';

-- PDF download rate (Week 4 engagement)
SELECT
  COUNT(*) FILTER (WHERE week4_sent_at IS NOT NULL) AS week4_sent,
  COUNT(*) FILTER (WHERE pdf_downloaded = true) AS pdf_downloaded,
  ROUND(100.0 * COUNT(*) FILTER (WHERE pdf_downloaded = true) /
    NULLIF(COUNT(*) FILTER (WHERE week4_sent_at IS NOT NULL), 0), 2) AS download_rate_pct
FROM email_subscriptions;
```

### Expected Conversion Rates

| Metric | Target | Calculation |
|--------|--------|-------------|
| Week 1 → Referral Share | 25-35% | `referral_count > 0 / week1_sent` |
| Week 2 → Goal Selection (Tier 2) | 40-55% | `tier2_upgraded / week2_sent` |
| Week 3 → Email Open | 30-45% | `opened_week3 / week3_sent` |
| Week 4 → PDF Download | 35-45% | `pdf_downloaded / week4_sent` |

**Red Flags**:
- Week 1 share rate < 15% → Referral incentive not compelling
- Week 2 conversion < 30% → Goal selection too complex or email unclear
- Week 4 download < 25% → PDF value not communicated, exec summary failed

---

## 🐛 Troubleshooting

### Issue: Cron job not running

**Check**:
```bash
# Verify cron is registered in Vercel
vercel env ls | grep CRON_SECRET

# Check Vercel deployment logs
vercel logs --follow
```

**Common causes**:
- `CRON_SECRET` not set in Vercel env vars
- Cron path typo in `vercel.json`
- API route has runtime error (check logs)

### Issue: Emails not sending

**Check**:
1. Brevo API key valid: https://app.brevo.com/settings/keys/api
2. Sender domain verified in Brevo
3. Email rate limit not exceeded (9,000/month free tier)
4. Check Brevo dashboard → Transactional → Real-time stats

**Debug**:
```sql
-- Find subscribers who should have received Week 1 but didn't
SELECT * FROM email_subscriptions
WHERE subscribed_at < NOW() - INTERVAL '2 hours'
  AND week1_sent_at IS NULL
  AND campaign_status = 'active'
LIMIT 10;
```

### Issue: PDF download not working

**Check**:
1. PDF exists at `/moon-ring-platform/public/pdfs/accountability-science-guide.pdf`
2. File size < 2 MB (Vercel Edge function limit: 4.5 MB)
3. Browser console for errors (F12 → Console)

**Test manually**:
```bash
curl -I https://moonring.com/pdfs/accountability-science-guide.pdf
# Should return: HTTP/2 200
```

### Issue: Database migration failed

**Symptom**: Error like `column "waitlist_tier" does not exist`

**Fix**:
1. Check migration was applied: `SELECT * FROM information_schema.columns WHERE table_name = 'email_subscriptions' AND column_name = 'waitlist_tier';`
2. If not found, re-run migration SQL
3. Check for syntax errors in migration file

---

## 🔒 Security Considerations

### 1. CRON_SECRET Protection

- **Never commit** `CRON_SECRET` to git
- Use strong random value: `openssl rand -base64 32`
- Rotate monthly (update in Vercel env vars)

### 2. Subscriber ID Exposure

- Subscriber IDs are UUIDs (non-sequential, hard to guess)
- Download URLs (`/download/guide/{id}`) are not indexed by search engines
- No sensitive data exposed on download page (email not shown)

### 3. Rate Limiting

**Consider adding** (not currently implemented):

```typescript
// In /api/waitlist/set-goal/route.ts
const rateLimitKey = `goal-selection:${subscriberId}`
const attempts = await redis.incr(rateLimitKey)
await redis.expire(rateLimitKey, 3600) // 1 hour

if (attempts > 5) {
  return NextResponse.json({ error: 'Too many attempts' }, { status: 429 })
}
```

---

## 📈 Next Steps (Future Enhancements)

### Phase 2: Weeks 5-8 (Not Yet Built)

- **Week 5**: Accountability partner matching preview
- **Week 6**: Beta tester invitation (Tier 2→3 upgrade)
- **Week 7**: 7-day challenge micro-commitment
- **Week 8**: Pre-launch countdown + exclusive pricing

### Phase 3: Referral System

**Decision Point**: Prefinery (SaaS) vs. Custom Build

**Prefinery** ($49-69/mo):
- ✅ Viral waitlist with gamification
- ✅ Email integration (via webhook)
- ✅ Leaderboard widget
- ❌ Monthly cost
- ❌ External dependency

**Custom Build** (2 weeks dev):
- ✅ No monthly cost
- ✅ Full control
- ✅ Database schema already supports it
- ❌ More dev time
- ❌ Need to build referral landing page

**Recommendation**: Start with Prefinery, migrate to custom if successful.

### Phase 4: A/B Testing

**Already prepared**:
- Subject line variants in email templates
- `subject_line_variant` column in `email_campaign_events`

**To implement**:
1. Randomly assign variant A/B/C/D to each subscriber
2. Track open rates by variant
3. Use winner for future sends

---

## 📞 Support

**Questions?**
- Check `/docs/08-marketing/campaigns/waitlist/infrastructure-checklist.md` for detailed architecture
- Review email content: `/docs/08-marketing/campaigns/waitlist/email-sequences/`
- PDF design specs: `/docs/08-marketing/campaigns/waitlist/lead-magnets/pdf-design-brief.md`

**Deployment Issues?**
- Supabase Discord: https://discord.supabase.com
- Vercel Support: https://vercel.com/support
- Brevo Support: https://help.brevo.com

---

## ✅ Deployment Checklist

- [ ] Database migration applied successfully
- [ ] Verified new columns/tables exist
- [ ] `CRON_SECRET` added to Vercel env vars
- [ ] Vercel deployment complete
- [ ] Cron job shows in Vercel dashboard
- [ ] PDF uploaded to `/public/pdfs/`
- [ ] Test email flow (signup → Week 1 → goal selection)
- [ ] Monitoring queries bookmarked in Supabase
- [ ] Brevo sender domain verified
- [ ] Rate limits understood and planned for

**Estimated Time**: 2-3 hours (assuming Supabase/Vercel already configured)

---

**Status**: Ready for deployment pending database migration and PDF upload.
