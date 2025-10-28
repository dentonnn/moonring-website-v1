# Week 1: Welcome Email + Goal Selection

**Timing:** 1 hour after signup
**Segment:** All Tier 1 subscribers (email only)
**Primary Goal:** Get goal selection (Movement/Sleep/Stress/Recovery)
**Secondary Goal:** Introduce referral mechanism
**Behavioral Tactic:** Foot-in-the-door technique (micro-commitment)

---

## Email A: Standard Welcome (No Referrer)

### Subject Line Options (A/B Test)
- **A (Curiosity):** "You're #{{POSITION}} on the Moon Ring waitlist"
- **B (Social Proof):** "Welcome! Join {{TOTAL_COUNT}} people who are done with wearables that fail"
- **C (Direct):** "Welcome to Moon Ring, {{NAME}}. Quick question inside."

### Plain Text Version

```
Subject: You're #{{POSITION}} on the Moon Ring waitlist

Hi {{NAME}},

You just joined {{PREVIOUS_COUNT}} people who are done with wearables that don't deliver results.

I'm [Founder Name], and I want to personally thank you for signing up.

Here's what happens next:

📊 Over the next 8 weeks, we'll send you exclusive behavioral psychology insights (the science behind why wearables fail—and how we fix it)

🎁 You'll get early access to Moon Ring before anyone else

💎 Founding Members (first 1,000) lock in 50% off for life

But first, a quick question to help us personalize your experience:

**What's your #1 health goal?**

👉 Movement & Steps: {{GOAL_LINK_MOVEMENT}}
👉 Better Sleep: {{GOAL_LINK_SLEEP}}
👉 Stress Management: {{GOAL_LINK_STRESS}}
👉 Recovery Tracking: {{GOAL_LINK_RECOVERY}}

(Takes 1 click. Helps us send you relevant content.)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

YOUR REFERRAL POWER

Want to move up the waitlist faster?

Each friend who joins moves you up 500 positions.

Your unique referral link:
{{REFERRAL_LINK}}

Current position: #{{POSITION}}
Referrals so far: {{REFERRAL_COUNT}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

See you tomorrow,
{{FOUNDER_NAME}}
Founder, Moon Ring

P.S. {{TOTAL_COUNT}} people have joined so far. The first 1,000 get Founding Member status. Share with 3 friends to secure your spot! 🚀
```

### HTML Version

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
      border-radius: 12px 12px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .badge {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      padding: 8px 16px;
      border-radius: 20px;
      display: inline-block;
      margin-top: 12px;
      font-size: 16px;
      font-weight: 600;
    }
    .content {
      padding: 32px 24px;
      background: #ffffff;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 24px;
    }
    .cta-section {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 24px;
      border-radius: 12px;
      margin: 32px 0;
      text-align: center;
    }
    .cta-section h2 {
      margin: 0 0 16px 0;
      font-size: 22px;
      color: #1a1a1a;
    }
    .goal-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 20px;
    }
    .goal-button {
      display: inline-block;
      padding: 16px 24px;
      background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .goal-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 51, 186, 0.3);
    }
    .referral-box {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 24px;
      border-radius: 12px;
      margin: 32px 0;
    }
    .referral-box h3 {
      margin: 0 0 12px 0;
      font-size: 20px;
    }
    .referral-link {
      background: rgba(255, 255, 255, 0.2);
      padding: 12px;
      border-radius: 8px;
      word-break: break-all;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      margin: 16px 0;
    }
    .referral-stats {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
    .stat {
      text-align: center;
    }
    .stat-number {
      font-size: 32px;
      font-weight: 700;
      display: block;
    }
    .stat-label {
      font-size: 14px;
      opacity: 0.9;
    }
    .footer {
      text-align: center;
      padding: 24px;
      color: #6c757d;
      font-size: 14px;
      border-top: 1px solid #e9ecef;
      margin-top: 32px;
    }
    .ps {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 16px;
      margin-top: 24px;
      border-radius: 4px;
      font-style: italic;
    }
    @media (max-width: 600px) {
      .goal-buttons {
        flex-direction: column;
      }
      .referral-stats {
        flex-direction: column;
        gap: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🌙 Welcome to Moon Ring</h1>
    <div class="badge">You're #{{POSITION}} on the waitlist</div>
  </div>

  <div class="content">
    <div class="greeting">
      <p>Hi {{NAME}},</p>
      <p>You just joined <strong>{{PREVIOUS_COUNT}} people</strong> who are done with wearables that don't deliver results.</p>
      <p>I'm {{FOUNDER_NAME}}, and I want to personally thank you for signing up.</p>
    </div>

    <h3>Here's what happens next:</h3>
    <ul>
      <li>📊 Over the next 8 weeks, we'll send you exclusive <strong>behavioral psychology insights</strong> (the science behind why wearables fail—and how we fix it)</li>
      <li>🎁 You'll get <strong>early access to Moon Ring</strong> before anyone else</li>
      <li>💎 <strong>Founding Members</strong> (first 1,000) lock in 50% off for life</li>
    </ul>

    <div class="cta-section">
      <h2>Quick question: What's your #1 health goal?</h2>
      <p style="margin-bottom: 8px; color: #6c757d;">Takes 1 click. Helps us send you relevant content.</p>
      <div class="goal-buttons">
        <a href="{{GOAL_LINK_MOVEMENT}}" class="goal-button">🏃‍♂️ Movement & Steps</a>
        <a href="{{GOAL_LINK_SLEEP}}" class="goal-button">😴 Better Sleep</a>
        <a href="{{GOAL_LINK_STRESS}}" class="goal-button">🧘‍♀️ Stress Management</a>
        <a href="{{GOAL_LINK_RECOVERY}}" class="goal-button">💪 Recovery Tracking</a>
      </div>
    </div>

    <div class="referral-box">
      <h3>🚀 Your Referral Power</h3>
      <p>Want to move up the waitlist faster?</p>
      <p><strong>Each friend who joins moves you up 500 positions.</strong></p>

      <div class="referral-link">
        {{REFERRAL_LINK}}
      </div>

      <div class="referral-stats">
        <div class="stat">
          <span class="stat-number">#{{POSITION}}</span>
          <span class="stat-label">Current Position</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{REFERRAL_COUNT}}</span>
          <span class="stat-label">Referrals So Far</span>
        </div>
      </div>
    </div>

    <div class="ps">
      <strong>P.S.</strong> {{TOTAL_COUNT}} people have joined so far. The first 1,000 get Founding Member status. Share with 3 friends to secure your spot! 🚀
    </div>

    <p style="margin-top: 32px;">
      See you tomorrow,<br>
      <strong>{{FOUNDER_NAME}}</strong><br>
      <span style="color: #6c757d;">Founder, Moon Ring</span>
    </p>
  </div>

  <div class="footer">
    <p>Moon Ring | Making wearables actually work through social accountability</p>
    <p><a href="{{UNSUBSCRIBE_LINK}}" style="color: #6c757d;">Unsubscribe</a> | <a href="{{PREFERENCES_LINK}}" style="color: #6c757d;">Email Preferences</a></p>
  </div>
</body>
</html>
```

---

## Email B: Referred Welcome (User came via referral link)

### Subject Line
"{{REFERRER_NAME}} invited you to Moon Ring. You're in! 🎉"

### Plain Text Version

```
Subject: {{REFERRER_NAME}} invited you to Moon Ring. You're in! 🎉

Hi {{NAME}},

Welcome! {{REFERRER_NAME}} thought you'd be interested in Moon Ring.

Good news: Because {{REFERRER_NAME}} referred you, you automatically started at position #{{POSITION}} (skipping {{SKIP_COUNT}} people).

You just joined {{PREVIOUS_COUNT}} people who are done with wearables that don't deliver results.

Here's what happens next:

📊 Over the next 8 weeks, we'll send you exclusive behavioral psychology insights

🎁 You'll get early access to Moon Ring before anyone else

💎 Founding Members (first 1,000) lock in 50% off for life

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

QUICK QUESTION

To help us personalize your experience, what's your #1 health goal?

👉 Movement & Steps: {{GOAL_LINK_MOVEMENT}}
👉 Better Sleep: {{GOAL_LINK_SLEEP}}
👉 Stress Management: {{GOAL_LINK_STRESS}}
👉 Recovery Tracking: {{GOAL_LINK_RECOVERY}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

YOUR TURN TO REFER

You can move up the waitlist too!

Your unique referral link:
{{REFERRAL_LINK}}

Each friend who joins moves you up 500 positions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

See you tomorrow,
{{FOUNDER_NAME}}
Founder, Moon Ring

P.S. Thanks to {{REFERRER_NAME}}, you're already ahead. Now it's your turn to pay it forward! 🚀
```

---

## Variable Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `{{NAME}}` | User's first name (or "there" if not provided) | "Sarah" |
| `{{POSITION}}` | Current waitlist position | "3847" |
| `{{PREVIOUS_COUNT}}` | Number of people ahead of them | "3846" |
| `{{TOTAL_COUNT}}` | Total waitlist size | "3847" |
| `{{REFERRAL_COUNT}}` | Number of people they've referred | "0" |
| `{{REFERRAL_LINK}}` | Unique referral URL | "https://moonring.app/?ref=a1B2c3D4" |
| `{{GOAL_LINK_MOVEMENT}}` | URL to set goal to "movement" | "/api/waitlist/set-goal?email=...&goal=movement" |
| `{{GOAL_LINK_SLEEP}}` | URL to set goal to "sleep" | "/api/waitlist/set-goal?email=...&goal=sleep" |
| `{{GOAL_LINK_STRESS}}` | URL to set goal to "stress" | "/api/waitlist/set-goal?email=...&goal=stress" |
| `{{GOAL_LINK_RECOVERY}}` | URL to set goal to "recovery" | "/api/waitlist/set-goal?email=...&goal=recovery" |
| `{{FOUNDER_NAME}}` | Founder's name | "Alex" |
| `{{REFERRER_NAME}}` | Name of person who referred them | "Michael" |
| `{{SKIP_COUNT}}` | Positions skipped due to referral | "500" |
| `{{UNSUBSCRIBE_LINK}}` | Unsubscribe URL | "/api/newsletter/unsubscribe?token=..." |
| `{{PREFERENCES_LINK}}` | Email preferences URL | "/email-preferences?token=..." |

---

## Delivery Logic (Pseudocode)

```typescript
// Trigger: 1 hour after email_subscriptions.created_at

const user = await getWaitlistUser(email)

// Check if referred
const isReferred = user.referred_by !== null

// Select email variant
const emailTemplate = isReferred
  ? waitlistEmails.week1ReferredWelcome
  : waitlistEmails.week1StandardWelcome

// Populate variables
const emailData = {
  name: user.name || 'there',
  position: user.waitlist_position,
  previousCount: user.waitlist_position - 1,
  totalCount: await getTotalWaitlistCount(),
  referralCount: user.referral_count,
  referralLink: `${APP_URL}/?ref=${user.referral_code}`,
  goalLinkMovement: `${APP_URL}/api/waitlist/set-goal?email=${user.email}&goal=movement&token=${user.goal_token}`,
  goalLinkSleep: `${APP_URL}/api/waitlist/set-goal?email=${user.email}&goal=sleep&token=${user.goal_token}`,
  goalLinkStress: `${APP_URL}/api/waitlist/set-goal?email=${user.email}&goal=stress&token=${user.goal_token}`,
  goalLinkRecovery: `${APP_URL}/api/waitlist/set-goal?email=${user.email}&goal=recovery&token=${user.goal_token}`,
  founderName: 'Alex Johnson',
  referrerName: user.referred_by ? await getReferrerName(user.referred_by) : null,
  skipCount: 500,
  unsubscribeLink: `${APP_URL}/api/newsletter/unsubscribe?token=${user.unsubscribe_token}`,
  preferencesLink: `${APP_URL}/email-preferences?token=${user.preferences_token}`,
}

// Send via Brevo
await sendEmail({
  to: user.email,
  subject: renderTemplate(emailTemplate.subject, emailData),
  html: renderTemplate(emailTemplate.html, emailData),
  text: renderTemplate(emailTemplate.text, emailData),
})
```

---

## Success Metrics

| Metric | Target | Industry Avg |
|--------|--------|--------------|
| **Open Rate** | 65-70% | 25% |
| **Click Rate (Goal Selection)** | 40-50% | 5% |
| **Referral Link Click** | 25-30% | N/A |
| **Goal Selection Completion** | 35-45% | N/A |

**Why Higher?**
- Sent within 1 hour (high recency)
- Personalized with position (curiosity driver)
- Clear, single CTA (reduce decision paralysis)
- Behavioral hook (foot-in-the-door)

---

## A/B Test Ideas

### Test 1: Subject Line Tone
- **Control:** "You're #{{POSITION}} on the Moon Ring waitlist"
- **Variant A:** "{{NAME}}, welcome to Moon Ring (you're in!)"
- **Variant B:** "🎉 Welcome! Join {{TOTAL_COUNT}} people revolutionizing wearables"
- **Measure:** Open rate

### Test 2: CTA Placement
- **Control:** Goal selection at top, referral at bottom
- **Variant:** Referral at top, goal selection at bottom
- **Measure:** Goal selection rate vs. referral click rate

### Test 3: Goal Button Design
- **Control:** 4 separate buttons (Movement, Sleep, Stress, Recovery)
- **Variant:** Dropdown menu
- **Measure:** Goal selection completion rate

---

## Notes for Implementation

1. **Personalization Token Generation**: Generate `goal_token`, `unsubscribe_token`, and `preferences_token` on signup and store in database
2. **Referral Detection**: Check `referred_by` column to determine email variant
3. **Position Calculation**: Calculate position dynamically or via cron job (see waitlist-strategy.md Phase 5)
4. **Email Client Testing**: Test rendering in Gmail, Outlook, Apple Mail, Mobile
5. **Link Tracking**: Use UTM parameters for referral links: `?ref={{CODE}}&utm_source=email&utm_medium=waitlist&utm_campaign=week1`
