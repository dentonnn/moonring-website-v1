# Email Service Migration: Resend → Brevo

**Document Version:** 1.1
**Date:** 2025-10-04
**Status:** Planning (Updated with Senior Engineer Fixes)
**Owner:** Development Team
**Last Updated:** 2025-10-04 - Added database schema fixes and Resend reference cleanup

---

## Executive Summary

This document outlines the complete migration plan from Resend to Brevo for the Moon Ring marketing website's email infrastructure. The migration enables higher email volume (9,000 emails/month vs 3,000), built-in newsletter management, and better marketing features for the pre-launch phase.

**Migration Scope:**
- Contact form emails (existing Resend implementation)
- Newsletter signup welcome emails (new feature)
- Email template system replacement
- Environment configuration updates

**Timeline:** ~75 minutes implementation + 30 minutes testing
**Risk Level:** Low (non-breaking, incremental rollout possible)

---

## Goals & Success Criteria

### Primary Goals

1. **Enable Newsletter Welcome Emails**
   - Users receive welcome email immediately after signup
   - Email contains brand-appropriate messaging
   - Deliverability rate >95% (not landing in spam)

2. **Maintain Contact Form Functionality**
   - Zero downtime during migration
   - Support team receives contact submissions
   - Users receive auto-confirmation emails

3. **Increase Email Capacity**
   - Support up to 9,000 emails/month (3x current limit)
   - No daily sending limits that block critical emails
   - Room for viral growth without immediate upgrade

4. **Improve Marketing Capabilities**
   - Access to Brevo dashboard for campaign management
   - Visual email editor for newsletters
   - Contact list segmentation
   - Built-in unsubscribe handling

### Success Criteria

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Contact form delivery** | 100% within 2 minutes | Test submission → check inbox |
| **Welcome email delivery** | >95% in inbox (not spam) | Test with 10+ email providers |
| **Build passes** | Zero TypeScript/lint errors | `npm run build && npm run lint` |
| **API response time** | <2 seconds for email sends | Monitor API route performance |
| **Email open rate** | >20% for welcome emails | Brevo dashboard analytics |
| **Zero regressions** | All existing features work | Full regression test suite |

---

## Current State Analysis

### Resend Usage Inventory

| Component | File | Status | Email Type | Monthly Volume |
|-----------|------|--------|------------|----------------|
| Contact Form | `src/app/api/contact/route.ts:26` | ✅ Active | Transactional | ~50 emails |
| Contact Reply | `src/app/api/contact/route.ts:61` | ✅ Active | Transactional | ~50 emails |
| Welcome Email | `src/lib/email/resend.ts:56` | ⚠️ Template only | Marketing | Not sent yet |
| Order Confirmation | `src/lib/email/resend.ts:100` | ⚠️ Template only | Transactional | Not used yet |
| Password Reset | `src/lib/email/resend.ts:143` | ⚠️ Template only | Transactional | Not used yet |

**Current Monthly Email Volume:** ~100 emails (well under 3,000 limit)
**Projected Post-Launch Volume:** 2,000-5,000 emails/month (would require Brevo's higher limit)

### Dependencies

```json
// Current (package.json)
"resend": "^6.1.0",
"@react-email/render": "^1.3.1"

// After Migration
"@getbrevo/brevo": "^2.x.x"
```

### Environment Variables

```bash
# Current (.env.local)
RESEND_API_KEY=re_abc123...

# After Migration
BREVO_API_KEY=xkeysib-xyz789...
```

---

## Migration Architecture

### Before: Resend Flow

```
┌─────────────────┐
│  User submits   │
│  contact form   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ /api/contact (Route)    │
│  - Validates input      │
│  - Calls Resend API     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Resend Service         │
│  - Sends support email  │
│  - Sends user confirm   │
└─────────────────────────┘
```

**Newsletter Signup (Current):**
```
┌──────────────────┐
│ User signs up    │
│ for newsletter   │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────┐
│ EmailCaptureForm         │
│  - Direct Supabase write │
│  - NO email sent ❌      │
└──────────────────────────┘
```

---

### After: Brevo Flow

```
┌─────────────────┐
│  User submits   │
│  contact form   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ /api/contact (Route)    │
│  - Validates input      │
│  - Calls Brevo API      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Brevo Service          │
│  - Sends support email  │
│  - Sends user confirm   │
│  - Tracks in dashboard  │
└─────────────────────────┘
```

**Newsletter Signup (New):**
```
┌──────────────────┐
│ User signs up    │
│ for newsletter   │
└────────┬─────────┘
         │
         ▼
┌───────────────────────────┐
│ EmailCaptureForm          │
│  - POST to API route      │
└────────┬──────────────────┘
         │
         ▼
┌───────────────────────────┐
│ /api/newsletter/subscribe │
│  - Validates email        │
│  - Saves to Supabase      │
│  - Calls Brevo API        │
└────────┬──────────────────┘
         │
         ▼
┌───────────────────────────┐
│  Brevo Service            │
│  - Sends welcome email ✅ │
│  - Adds to contact list   │
│  - Tracks analytics       │
└───────────────────────────┘
```

---

## Implementation Plan

### Phase 0: Database Schema Extension (15 minutes) ⚠️ **CRITICAL - DO THIS FIRST**

**⚠️ Senior Engineer Note:** The `email_subscriptions` table must be extended before Phase 4 API implementation, or newsletter signups will fail to store required metadata (name, GDPR consent, UTM params).

**Tasks:**
1. Review new migration file: `supabase/migrations/002_extend_email_subscriptions_for_newsletter.sql`
2. Apply migration to local Supabase database
3. Verify all new columns and indexes created
4. Test RLS policies with sample data

**Migration Adds:**
- **Personal Data:** `name`, `gdpr_consent`, `gdpr_consent_date`, `gdpr_consent_ip`
- **UTM Tracking:** `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- **Traffic Attribution:** `referrer_url`, `landing_page`, `signup_source`
- **Flexible Storage:** `metadata` (JSONB for future needs)

**Apply Migration:**
```bash
cd moon-ring-platform

# Method 1: Using apply-migration.sh script
./apply-migration.sh

# Method 2: Manual via Supabase CLI (if installed)
supabase db push

# Method 3: Direct SQL execution via Supabase dashboard
# Copy contents of 002_extend_email_subscriptions_for_newsletter.sql
# Paste into Supabase Dashboard → SQL Editor → Run
```

**Verification Queries:**
```sql
-- Check new columns exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'email_subscriptions'
ORDER BY ordinal_position;

-- Verify indexes created
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'email_subscriptions';

-- Test insert with new fields
INSERT INTO email_subscriptions (
  email, name, gdpr_consent, gdpr_consent_date,
  utm_source, utm_campaign, referrer_url, landing_page, signup_source
) VALUES (
  'test@example.com', 'Test User', true, NOW(),
  'twitter', 'launch_2025', 'https://twitter.com', '/', 'hero'
);

-- Clean up test
DELETE FROM email_subscriptions WHERE email = 'test@example.com';
```

**Acceptance Criteria:**
- [ ] Migration file exists at `supabase/migrations/002_extend_email_subscriptions_for_newsletter.sql`
- [ ] Migration applies without errors
- [ ] All 13 new columns present in `email_subscriptions` table
- [ ] 4 new indexes created successfully
- [ ] RLS policies updated (3 policies total)
- [ ] Test insert succeeds with all new fields
- [ ] Build still passes: `npm run build`

**Rollback (if needed):**
```sql
-- WARNING: This drops all new columns and data
ALTER TABLE email_subscriptions
DROP COLUMN IF EXISTS name,
DROP COLUMN IF EXISTS gdpr_consent,
DROP COLUMN IF EXISTS gdpr_consent_date,
DROP COLUMN IF EXISTS gdpr_consent_ip,
DROP COLUMN IF EXISTS utm_source,
DROP COLUMN IF EXISTS utm_medium,
DROP COLUMN IF EXISTS utm_campaign,
DROP COLUMN IF EXISTS utm_term,
DROP COLUMN IF EXISTS utm_content,
DROP COLUMN IF EXISTS referrer_url,
DROP COLUMN IF EXISTS landing_page,
DROP COLUMN IF EXISTS signup_source,
DROP COLUMN IF EXISTS metadata;

-- Drop indexes
DROP INDEX IF EXISTS idx_email_subscriptions_gdpr_consent;
DROP INDEX IF EXISTS idx_email_subscriptions_utm_campaign;
DROP INDEX IF EXISTS idx_email_subscriptions_signup_source;
DROP INDEX IF EXISTS idx_email_subscriptions_metadata;
```

---

### Phase 1: Setup & Dependencies (10 minutes)

**Tasks:**
1. Sign up for Brevo account (https://www.brevo.com)
2. Generate API key from Brevo dashboard
3. Install Brevo SDK: `npm install @getbrevo/brevo`
4. Remove Resend packages: `npm uninstall resend @react-email/render`
5. Update `.env.local` with `BREVO_API_KEY`
6. Update `.env.example` documentation

**Acceptance Criteria:**
- [ ] Brevo account created and verified
- [ ] API key generated and stored securely
- [ ] `package.json` shows `@getbrevo/brevo` dependency
- [ ] `resend` removed from dependencies
- [ ] `.env.local` contains valid `BREVO_API_KEY`
- [ ] Build succeeds: `npm install && npm run build`

---

### Phase 2: Core Infrastructure (25 minutes)

**Tasks:**
1. Update environment validation in `src/config/env.ts`
2. Create Brevo email helper: `src/lib/email/brevo.ts`
3. Implement email templates (welcome, contact, order confirmation)
4. Add TypeScript types for Brevo responses

**Files Modified:**
- `src/config/env.ts` (lines 28, 87-89)

**Files Created:**
- `src/lib/email/brevo.ts` (~200 lines)

**Acceptance Criteria:**
- [ ] `serverEnv.BREVO_API_KEY` accessible in API routes
- [ ] `getBrevoClient()` function returns initialized client
- [ ] `sendEmail()` helper accepts standard options
- [ ] All email templates maintain brand consistency
- [ ] TypeScript compilation succeeds with strict mode
- [ ] No ESLint errors in new files

**Code Structure:**
```typescript
// src/lib/email/brevo.ts
export const getBrevoClient = () => TransactionalEmailsApi
export const sendEmail = (options: EmailOptions) => Promise<EmailResult>
export const emailTemplates = {
  welcome: (name: string) => EmailTemplate
  contactSupport: (...) => EmailTemplate
  contactConfirmation: (...) => EmailTemplate
  orderConfirmation: (...) => EmailTemplate
}
```

---

### Phase 3: Contact Form Migration (15 minutes)

**Tasks:**
1. Update `/api/contact` route to use Brevo
2. Replace Resend API calls with Brevo helper
3. Maintain exact same email content and functionality
4. Add error handling for Brevo-specific errors

**Files Modified:**
- `src/app/api/contact/route.ts` (lines 1, 26-58, 61-118)

**Acceptance Criteria:**
- [ ] Contact form sends to support@moonring.com via Brevo
- [ ] User receives auto-confirmation email
- [ ] Email content matches previous Resend version
- [ ] Error messages are user-friendly
- [ ] API returns proper HTTP status codes (200, 400, 500)
- [ ] Rate limiting doesn't block legitimate submissions

**Testing:**
```bash
# Test contact form submission
curl -X POST http://localhost:3003/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Test","message":"Hello"}'
```

---

### Phase 4: Newsletter Implementation (25 minutes)

**Tasks:**
1. Create new API route: `/api/newsletter/subscribe`
2. Implement newsletter signup logic (Supabase + Brevo)
3. Update `EmailCaptureForm` component to use API route
4. Add UTM parameter tracking
5. Implement conversion event logging

**Files Created:**
- `src/app/api/newsletter/subscribe/route.ts` (~150 lines)

**Files Modified:**
- `src/components/forms/EmailCaptureForm.tsx` (lines 28-138)

**Acceptance Criteria:**
- [ ] Newsletter signup saves email to `email_subscriptions` table
- [ ] Welcome email sent via Brevo immediately after signup
- [ ] UTM parameters captured from URL and stored
- [ ] GDPR consent properly logged with timestamp
- [ ] Duplicate email submissions handled gracefully
- [ ] Conversion event tracked in `conversion_events` table
- [ ] Form shows success message after email sent
- [ ] Form shows error message if API fails

**API Contract:**
```typescript
// POST /api/newsletter/subscribe
{
  email: string
  name?: string
  gdprConsent: boolean
  source: 'hero' | 'footer' | 'popup'
  utmParams: {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_term?: string
    utm_content?: string
  }
  referrer?: string
  landingPage: string
}

// Response (success)
{ success: true, message: "Welcome email sent" }

// Response (error)
{ success: false, error: "Error message" }
```

---

### Phase 5: Cleanup & Documentation (15 minutes)

**⚠️ Senior Engineer Note:** Several Resend references were missed in the original cleanup list. These must be updated to prevent broken health checks and outdated documentation.

**Tasks:**
1. Remove old Resend helper: `src/lib/email/resend.ts`
2. Update environment validation: `scripts/validate-env.js` ✅ **DONE**
3. Update health check endpoint: `src/app/api/health/route.ts` ✅ **DONE**
4. Update privacy policy: `src/app/privacy/page.tsx` ✅ **DONE**
5. Update deployment scripts (if any mention Resend)
6. Update `CLAUDE.md` with Brevo integration details
7. Update `.env.example` comments
8. Document Brevo dashboard usage for campaigns
9. Search codebase for any remaining "resend" or "Resend" strings

**Files Deleted:**
- `src/lib/email/resend.ts`

**Files Modified:**
- `scripts/validate-env.js` (line 56-61) ✅ **COMPLETED**
- `src/app/api/health/route.ts` (line 21-30) ✅ **COMPLETED**
- `src/app/privacy/page.tsx` (line 147) ✅ **COMPLETED**
- `CLAUDE.md` (email service section)
- `.env.example` (comment on line 16)
- `docs/06-content/email-migration-brevo.md` (this file - mark as completed)

**Comprehensive Search for Resend References:**
```bash
# Search all files for "resend" (case-insensitive)
cd moon-ring-platform
grep -ri "resend" --exclude-dir=node_modules --exclude-dir=.next --exclude="*.md"

# Expected results after cleanup:
# - package-lock.json (dependency history - safe to ignore)
# - No other files should mention Resend
```

**Acceptance Criteria:**
- [ ] No references to Resend in active code files
- [ ] `scripts/validate-env.js` checks for `BREVO_API_KEY`
- [ ] `/api/health` endpoint reports Brevo configuration
- [ ] Privacy policy mentions Brevo (not Resend)
- [ ] Documentation reflects Brevo as email provider
- [ ] `.env.example` has correct Brevo comment
- [ ] Team knows how to access Brevo dashboard
- [ ] Campaign sending process documented
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] Health check returns correct status: `curl http://localhost:3003/api/health`

---

## End-to-End Testing Plan

### Test Suite 1: Contact Form (Critical Path)

**Objective:** Verify contact form emails work identically to Resend version

| Test # | Scenario | Steps | Expected Result | Pass/Fail |
|--------|----------|-------|-----------------|-----------|
| CF-1 | Valid submission | Fill form → Submit | Support receives email within 2 min | ☐ |
| CF-2 | User confirmation | Fill form → Submit | User receives confirmation email | ☐ |
| CF-3 | Email content | Check inbox | Email has correct branding/links | ☐ |
| CF-4 | Reply-to works | Reply to support email | Goes to user's email address | ☐ |
| CF-5 | Invalid email | Submit with bad email | Returns 400 error, no email sent | ☐ |
| CF-6 | Missing fields | Submit incomplete form | Returns 400 error with message | ☐ |
| CF-7 | Rate limiting | Submit 10x in 1 minute | Later requests rate-limited | ☐ |
| CF-8 | HTML rendering | Open in Gmail/Outlook | Renders correctly, no broken styles | ☐ |

**Test Script:**
```bash
# Run from moon-ring-platform directory
npm run dev

# In another terminal, test the API
curl -X POST http://localhost:3003/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "End-to-End Test",
    "email": "your-test-email@gmail.com",
    "subject": "Testing Brevo Migration",
    "message": "This is a test of the contact form after migrating to Brevo."
  }'

# Expected: HTTP 200, check both inboxes within 2 minutes
```

---

### Test Suite 2: Newsletter Signup (New Feature)

**Objective:** Verify newsletter signup flow works end-to-end

| Test # | Scenario | Steps | Expected Result | Pass/Fail |
|--------|----------|-------|-----------------|-----------|
| NS-1 | First-time signup | Enter email → Check GDPR → Submit | Welcome email received | ☐ |
| NS-2 | Database persistence | Check Supabase after signup | Email in `email_subscriptions` table | ☐ |
| NS-3 | Duplicate signup | Sign up twice with same email | Second signup updates record, no error | ☐ |
| NS-4 | Welcome email content | Read welcome email | Personalized with name, correct links | ☐ |
| NS-5 | GDPR validation | Submit without consent checkbox | Form shows error, no submission | ☐ |
| NS-6 | Invalid email format | Submit "notanemail" | Form validation catches it | ☐ |
| NS-7 | UTM tracking | Visit with `?utm_source=twitter` → Sign up | UTM params saved to database | ☐ |
| NS-8 | Conversion tracking | Sign up → Check analytics | Event logged in `conversion_events` | ☐ |
| NS-9 | Success message | Submit valid form | "You're on the list!" message shows | ☐ |
| NS-10 | Form reset | After success message | Form clears, can submit again | ☐ |

**Test Script:**
```javascript
// Manual test: Open http://localhost:3003 in browser
// 1. Scroll to waitlist section
// 2. Fill in email: your-test-email@gmail.com
// 3. Fill in name: "Test User"
// 4. Check GDPR consent box
// 5. Click "Get Early Access"
// 6. Verify success message appears
// 7. Check email inbox for welcome email (within 2 minutes)

// Database verification:
// Check Supabase dashboard → email_subscriptions table
// Should see new row with your email, status='active'
```

---

### Test Suite 3: Email Deliverability (Quality Assurance)

**Objective:** Ensure emails don't land in spam across major providers

| Provider | Contact Form | Welcome Email | Notes | Pass/Fail |
|----------|--------------|---------------|-------|-----------|
| Gmail | Test send | Test send | Check inbox/spam folder | ☐ |
| Outlook.com | Test send | Test send | Microsoft filtering | ☐ |
| Yahoo Mail | Test send | Test send | Check inbox/spam folder | ☐ |
| iCloud Mail | Test send | Test send | Apple filtering | ☐ |
| ProtonMail | Test send | Test send | Privacy-focused provider | ☐ |

**Deliverability Checklist:**
- [ ] SPF record configured in Brevo dashboard
- [ ] DKIM record configured and verified
- [ ] Sender domain verified (moonring.com)
- [ ] From address matches verified domain
- [ ] Reply-to address is valid and monitored
- [ ] Unsubscribe link present in marketing emails
- [ ] Email content passes spam filter tests

**Tools:**
- https://www.mail-tester.com (spam score)
- https://mxtoolbox.com/emailhealth (deliverability check)
- Brevo dashboard → Email validation

---

### Test Suite 4: Integration Testing

**Objective:** Verify all systems work together without conflicts

| Test # | Scenario | Expected Result | Pass/Fail |
|--------|----------|-----------------|-----------|
| INT-1 | Build succeeds | `npm run build` exits 0 | ☐ |
| INT-2 | Lint passes | `npm run lint` exits 0 | ☐ |
| INT-3 | TypeScript strict | No type errors in strict mode | ☐ |
| INT-4 | Environment validation | Missing `BREVO_API_KEY` shows clear error | ☐ |
| INT-5 | Health check | `/api/health` returns email service status | ☐ |
| INT-6 | Error handling | Brevo API down → graceful error message | ☐ |
| INT-7 | Concurrent requests | 5 signups in parallel → all succeed | ☐ |
| INT-8 | Mobile responsive | Test on iPhone/Android → form works | ☐ |

---

### Test Suite 5: Analytics & Monitoring

**Objective:** Verify email tracking and analytics work

| Test # | Scenario | How to Verify | Pass/Fail |
|--------|----------|---------------|-----------|
| AN-1 | Sent emails tracked | Brevo dashboard shows sent count | ☐ |
| AN-2 | Open tracking | Open welcome email → dashboard shows open | ☐ |
| AN-3 | Click tracking | Click link in email → dashboard shows click | ☐ |
| AN-4 | Bounce handling | Send to invalid@invalid.com → logs bounce | ☐ |
| AN-5 | Contact list sync | Signups appear in Brevo contact list | ☐ |

**Brevo Dashboard Checks:**
1. Navigate to https://app.brevo.com
2. Go to **Transactional → Email Activity**
3. Verify recent sends appear with status
4. Check **Statistics** for open/click rates
5. Go to **Contacts** to see subscriber list

---

## Rollback Strategy

### If Migration Fails: Revert to Resend

**Rollback Time:** ~10 minutes

**Steps:**
1. **Restore package dependencies:**
   ```bash
   npm install resend@^6.1.0 @react-email/render@^1.3.1
   npm uninstall @getbrevo/brevo
   ```

2. **Revert environment variables:**
   ```bash
   # .env.local
   RESEND_API_KEY=re_original_key
   # Remove BREVO_API_KEY
   ```

3. **Revert code changes:**
   ```bash
   git checkout src/config/env.ts
   git checkout src/app/api/contact/route.ts
   git checkout src/components/forms/EmailCaptureForm.tsx
   git checkout src/lib/email/resend.ts
   git rm src/lib/email/brevo.ts
   git rm src/app/api/newsletter/subscribe/route.ts
   ```

4. **Verify rollback:**
   ```bash
   npm run build
   npm run lint
   # Test contact form manually
   ```

**Rollback Decision Criteria:**
- Contact form emails not delivering after 1 hour
- >20% of emails landing in spam
- Critical TypeScript/build errors
- API response times >5 seconds
- Brevo service outage >4 hours

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation | Owner |
|------|------------|--------|------------|-------|
| Emails land in spam | Medium | High | SPF/DKIM setup, test across providers | DevOps |
| API rate limits hit | Low | Medium | Monitor Brevo dashboard, alerts at 80% | Dev Team |
| Welcome emails fail silently | Medium | High | Implement retry logic, error monitoring | Dev Team |
| Brevo service outage | Low | High | Queue emails, retry mechanism | Dev Team |
| Build breaks in production | Low | Critical | Staging environment test first | DevOps |
| Data loss during migration | Very Low | Critical | No data migration needed (new feature) | N/A |

---

## Performance Benchmarks

### Target Metrics

| Metric | Target | Acceptable | Unacceptable |
|--------|--------|------------|--------------|
| Email send time (API) | <1 second | <2 seconds | >3 seconds |
| Welcome email delivery | <30 seconds | <2 minutes | >5 minutes |
| Contact form response | <500ms | <1 second | >2 seconds |
| Newsletter API response | <1 second | <2 seconds | >3 seconds |
| Form submission (total) | <2 seconds | <3 seconds | >5 seconds |

### Load Testing

**Scenario:** 100 newsletter signups in 10 minutes (typical launch spike)

**Expected Behavior:**
- All 100 signups processed successfully
- All 100 welcome emails sent
- No API errors or timeouts
- Brevo free tier not exceeded (9,000/month limit)

**Test Command:**
```bash
# Using artillery or similar load testing tool
artillery quick --count 100 --num 10 http://localhost:3003/api/newsletter/subscribe
```

---

## Post-Migration Checklist

### Day 1: Immediate Verification
- [ ] Send test contact form submission → verify received
- [ ] Sign up for newsletter → verify welcome email
- [ ] Check Brevo dashboard for send statistics
- [ ] Monitor error logs for any Brevo-related errors
- [ ] Verify all emails land in inbox (not spam)

### Week 1: Monitoring
- [ ] Track email deliverability rate (target: >95%)
- [ ] Monitor newsletter signup conversion (form submit → email received)
- [ ] Check Brevo usage (should be well under 9,000/month)
- [ ] Review Brevo analytics (open rates, click rates)
- [ ] Collect user feedback on email quality

### Week 2: Optimization
- [ ] A/B test welcome email subject lines (if volume allows)
- [ ] Optimize email templates based on open rates
- [ ] Set up Brevo contact list segments
- [ ] Create first newsletter campaign in Brevo dashboard
- [ ] Document best practices for team

---

## Success Metrics (30-Day Post-Migration)

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Email Deliverability** | >95% inbox delivery | Brevo dashboard |
| **Newsletter Signups** | 500+ subscribers | Supabase `email_subscriptions` count |
| **Welcome Email Opens** | >20% open rate | Brevo analytics |
| **Contact Form Reliability** | 100% delivery | Zero failed sends in logs |
| **Zero Regressions** | No broken features | QA regression tests pass |
| **Cost** | $0 (free tier) | Brevo billing dashboard |
| **Developer Satisfaction** | Positive feedback | Team retro |

---

## Team Responsibilities

| Role | Responsibilities | Contact |
|------|------------------|---------|
| **Lead Developer** | Code implementation, testing, deployment | Development Team |
| **DevOps** | Brevo account setup, DNS/domain verification | DevOps Team |
| **QA** | End-to-end testing, deliverability checks | QA Team |
| **Marketing** | Email content review, campaign planning | Marketing Team |
| **Product Owner** | Prioritization, go/no-go decision | Product Team |

---

## Documentation Updates Required

After migration completion:

1. **CLAUDE.md** - Update email service from Resend to Brevo
2. **README.md** - Update environment variable instructions
3. **.env.example** - Replace `RESEND_API_KEY` with `BREVO_API_KEY`
4. **DEPLOYMENT_SOP.md** - Add Brevo environment variable to deployment checklist
5. **API Documentation** - Document `/api/newsletter/subscribe` endpoint
6. **Team Wiki** - How to send campaigns via Brevo dashboard

---

## Brevo Dashboard Guide

### For Sending Newsletter Campaigns

1. **Access Dashboard:** https://app.brevo.com
2. **Navigate to Campaigns:** Left menu → Campaigns → Create Campaign
3. **Choose Email Campaign:** Select "Email Campaign"
4. **Design Email:**
   - Use visual editor or HTML editor
   - Maintain brand colors (gradient #FF33BA → #FF9966)
   - Include unsubscribe link (automatic)
5. **Select Recipients:**
   - Choose contact list (auto-synced from signups)
   - Or filter by segment
6. **Schedule or Send:**
   - Send immediately
   - Or schedule for specific date/time
7. **Track Results:**
   - Open rates, click rates, unsubscribes
   - Geographic and device data (paid tiers)

### For Managing Contacts

- **View Subscribers:** Contacts → Lists
- **Export List:** Contacts → Export (CSV download)
- **Import Contacts:** Contacts → Import (upload CSV)
- **Segmentation:** Contacts → Segments (create filters)

---

## Appendix A: Brevo API Reference

### Key API Endpoints Used

```typescript
// Send transactional email
TransactionalEmailsApi.sendTransacEmail({
  sender: { email: 'noreply@moonring.com', name: 'Moon Ring' },
  to: [{ email: 'user@example.com', name: 'User Name' }],
  subject: 'Welcome to Moon Ring',
  htmlContent: '<html>...</html>',
  textContent: 'Plain text version',
  replyTo: { email: 'support@moonring.com' }
})

// Get email statistics
TransactionalEmailsApi.getTransacEmailsList({
  startDate: '2025-01-01',
  endDate: '2025-12-31'
})
```

### Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| 400 | Invalid request | Check email format, required fields |
| 401 | Unauthorized | Verify API key in `.env.local` |
| 402 | Account suspended | Check Brevo account status |
| 403 | Forbidden | Verify sender email is verified in dashboard |
| 404 | Not found | Check endpoint URL |
| 429 | Rate limit exceeded | Implement exponential backoff |
| 500 | Server error | Retry with exponential backoff |

---

## Appendix B: Email Templates

### Welcome Email Template

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Welcome to Moon Ring</title>
  </head>
  <body style="font-family: -apple-system, system-ui, sans-serif; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <!-- Header with gradient -->
      <div style="background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%); color: white; padding: 40px 20px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">Welcome to Moon Ring!</h1>
      </div>

      <!-- Content -->
      <div style="background: white; padding: 40px 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="font-size: 16px; color: #1f2937; line-height: 1.6;">Hi {{name}},</p>

        <p style="font-size: 16px; color: #1f2937; line-height: 1.6;">
          Thank you for joining Moon Ring! You're about to transform your wearable data into lasting behavioral change through the power of social accountability.
        </p>

        <p style="font-size: 16px; color: #1f2937; line-height: 1.6; margin-top: 24px;">
          <strong>What happens next:</strong>
        </p>

        <ul style="font-size: 16px; color: #1f2937; line-height: 1.8;">
          <li>📱 We'll notify you when our app launches</li>
          <li>💍 You'll get exclusive early-bird pricing on the Moon Ring device</li>
          <li>🎯 Access to our behavioral psychology resources</li>
          <li>👥 Join our founding community of accountability partners</li>
        </ul>

        <div style="text-align: center; margin: 32px 0;">
          <a href="{{appUrl}}/demo" style="display: inline-block; background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 16px;">
            Explore Demo
          </a>
        </div>

        <!-- Footer -->
        <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
          <p style="font-size: 14px; color: #6b7280; margin: 8px 0;">
            Questions? Reply to this email and we'll help you out.
          </p>
          <p style="font-size: 14px; color: #6b7280; margin: 8px 0;">
            Moon Ring • Transform Data into Change
          </p>
          <p style="font-size: 12px; color: #9ca3af; margin: 16px 0;">
            <a href="{{unsubscribeLink}}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a>
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
```

### Plain Text Version

```
Welcome to Moon Ring!

Hi {{name}},

Thank you for joining Moon Ring! You're about to transform your wearable data into lasting behavioral change through the power of social accountability.

What happens next:
- We'll notify you when our app launches
- You'll get exclusive early-bird pricing on the Moon Ring device
- Access to our behavioral psychology resources
- Join our founding community of accountability partners

Explore our demo: {{appUrl}}/demo

Questions? Reply to this email and we'll help you out.

Moon Ring • Transform Data into Change

Unsubscribe: {{unsubscribeLink}}
```

---

## Appendix C: Migration Command Cheat Sheet

```bash
# === SETUP ===
# Install Brevo SDK
npm install @getbrevo/brevo

# Remove Resend
npm uninstall resend @react-email/render

# === DEVELOPMENT ===
# Start dev server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# === TESTING ===
# Test contact form
curl -X POST http://localhost:3003/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'

# Test newsletter signup
curl -X POST http://localhost:3003/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","gdprConsent":true}'

# === MONITORING ===
# Check Brevo dashboard
open https://app.brevo.com

# View logs
tail -f .next/server.log

# === ROLLBACK (if needed) ===
# Reinstall Resend
npm install resend@^6.1.0 @react-email/render@^1.3.1

# Remove Brevo
npm uninstall @getbrevo/brevo

# Restore files
git checkout src/config/env.ts src/app/api/contact/route.ts
```

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-04 | Development Team | Initial migration plan created |

---

## Sign-Off

**Migration Approved By:**

- [ ] Product Owner: _________________ Date: _______
- [ ] Lead Developer: _________________ Date: _______
- [ ] DevOps Lead: _________________ Date: _______
- [ ] QA Lead: _________________ Date: _______

**Post-Migration Sign-Off:**

- [ ] All tests passed: _________________ Date: _______
- [ ] Production deployment successful: _________________ Date: _______
- [ ] 7-day monitoring complete: _________________ Date: _______
