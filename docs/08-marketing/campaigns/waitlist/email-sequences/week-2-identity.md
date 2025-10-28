# Week 2: Identity Priming Email

**Timing:** 7 days after signup (only if `primary_health_goal` is set)
**Segment:** Users who selected their goal in Week 1
**Primary Goal:** Strengthen identity alignment ("You ARE a behavior changer")
**Secondary Goal:** Introduce accountability concept
**Behavioral Tactic:** Identity reinforcement + Social proof through success story

---

## Email Format: 4 Goal-Specific Variants

Each variant follows the same structure but with personalized content based on `primary_health_goal`.

---

## Variant A: Movement & Steps

### Subject Line Options (A/B Test)
- **A (Identity):** "{{NAME}}, you're a movement-focused behavior changer"
- **B (Curiosity):** "Why your step counter isn't working (and what does)"
- **C (Social Proof):** "Meet Sarah: From 2,000 to 15,000 steps in 30 days"

### Plain Text Version

```
Subject: {{NAME}}, you're a movement-focused behavior changer

Hi {{NAME}},

Last week, you told us your #1 goal is Movement & Steps.

That simple choice says something important about you:

You're not just someone trying to move more.

You ARE a movement-focused behavior changer.

There's a difference.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MEET SARAH (MOON RING BETA TESTER)

Sarah had a fancy fitness tracker for 2 years.

Average daily steps: 2,847

Then she joined Moon Ring's beta program.

30 days later: 15,283 average daily steps

What changed?

Not her tracker. Not her willpower. Not "motivation."

Her accountability partner, Marcus, who checked in every morning at 7am.

Sarah's words: "I couldn't let Marcus down. Some days I walked just for him. Then it became a habit."

That's the Moon Ring difference.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHY WILLPOWER FAILS BUT ACCOUNTABILITY WORKS

Stanford research shows:
• Willpower depletes after 3-4 decisions
• Accountability partners increase success by 65%
• Social commitment > personal commitment (5x stronger)

Your fitness tracker measures.
Your accountability partner MOTIVATES.

That's what we're building.

Want to learn more about the science?

👉 Read: "The Psychology of Accountability"
{{BLOG_LINK_ACCOUNTABILITY}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT'S NEXT

Next week, I'll show you:
• The exact accountability framework Sarah used
• Why 10,000 steps is arbitrary (and what matters instead)
• How to choose the right accountability partner

Your position: #{{POSITION}} (moved up {{POSITION_CHANGE}} spots!)
Referrals: {{REFERRAL_COUNT}}

Want to move up faster? Share your link:
{{REFERRAL_LINK}}

See you next week,
{{FOUNDER_NAME}}

P.S. Sarah's accountability partner Marcus? He went from 1,200 steps to 12,500. Accountability works both ways. 💪
```

### HTML Version

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%);
      color: white;
      padding: 30px 24px;
      text-align: center;
      border-radius: 12px;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 700;
    }
    .content {
      padding: 32px 0;
    }
    .identity-statement {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 24px;
      border-radius: 12px;
      border-left: 4px solid #FF33BA;
      margin: 24px 0;
      font-size: 18px;
      font-weight: 600;
      font-style: italic;
    }
    .success-story {
      background: #ffffff;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      padding: 24px;
      margin: 32px 0;
    }
    .success-story h3 {
      margin: 0 0 16px 0;
      color: #FF33BA;
      font-size: 20px;
    }
    .stats {
      display: flex;
      justify-content: space-around;
      margin: 24px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .stat-item {
      text-align: center;
    }
    .stat-number {
      display: block;
      font-size: 28px;
      font-weight: 700;
      color: #FF33BA;
    }
    .stat-label {
      display: block;
      font-size: 14px;
      color: #6c757d;
      margin-top: 4px;
    }
    .quote {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 16px 20px;
      margin: 20px 0;
      font-style: italic;
      border-radius: 4px;
    }
    .science-box {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 24px;
      border-radius: 12px;
      margin: 32px 0;
    }
    .science-box h3 {
      margin: 0 0 16px 0;
      font-size: 20px;
    }
    .science-box ul {
      margin: 16px 0;
      padding-left: 20px;
    }
    .science-box li {
      margin: 8px 0;
    }
    .cta-button {
      display: inline-block;
      padding: 16px 32px;
      background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 16px 0;
      transition: transform 0.2s;
    }
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 51, 186, 0.3);
    }
    .progress-box {
      background: #e9ecef;
      padding: 20px;
      border-radius: 8px;
      margin: 24px 0;
    }
    .footer {
      text-align: center;
      padding: 24px 0;
      color: #6c757d;
      font-size: 14px;
      border-top: 1px solid #e9ecef;
      margin-top: 32px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🏃‍♂️ Movement-Focused Behavior Changer</h1>
  </div>

  <div class="content">
    <p>Hi {{NAME}},</p>

    <p>Last week, you told us your #1 goal is <strong>Movement & Steps</strong>.</p>

    <p>That simple choice says something important about you:</p>

    <div class="identity-statement">
      You're not just someone trying to move more.<br><br>
      You ARE a movement-focused behavior changer.
    </div>

    <p>There's a difference.</p>

    <div class="success-story">
      <h3>📖 Meet Sarah (Moon Ring Beta Tester)</h3>

      <p>Sarah had a fancy fitness tracker for 2 years.</p>
      <p><strong>Average daily steps:</strong> 2,847</p>

      <p>Then she joined Moon Ring's beta program.</p>

      <div class="stats">
        <div class="stat-item">
          <span class="stat-number">2,847</span>
          <span class="stat-label">Before</span>
        </div>
        <div class="stat-item">
          <span style="font-size: 40px;">→</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">15,283</span>
          <span class="stat-label">After 30 Days</span>
        </div>
      </div>

      <p><strong>What changed?</strong></p>
      <p>Not her tracker. Not her willpower. Not "motivation."</p>
      <p>Her <strong>accountability partner, Marcus</strong>, who checked in every morning at 7am.</p>

      <div class="quote">
        "I couldn't let Marcus down. Some days I walked just for him. Then it became a habit."
        <div style="margin-top: 8px; font-style: normal; color: #6c757d;">— Sarah, Moon Ring Beta Tester</div>
      </div>

      <p>That's the Moon Ring difference.</p>
    </div>

    <div class="science-box">
      <h3>🧠 Why Willpower Fails But Accountability Works</h3>

      <p><strong>Stanford research shows:</strong></p>
      <ul>
        <li>Willpower depletes after 3-4 decisions</li>
        <li>Accountability partners increase success by <strong>65%</strong></li>
        <li>Social commitment > personal commitment (<strong>5x stronger</strong>)</li>
      </ul>

      <p style="margin-top: 20px; font-size: 18px; font-weight: 600;">
        Your fitness tracker measures.<br>
        Your accountability partner <strong>MOTIVATES</strong>.
      </p>

      <p>That's what we're building.</p>

      <div style="text-align: center;">
        <a href="{{BLOG_LINK_ACCOUNTABILITY}}" class="cta-button">Read: The Psychology of Accountability</a>
      </div>
    </div>

    <div style="background: #f8f9fa; padding: 24px; border-radius: 8px; margin: 32px 0;">
      <h3 style="margin: 0 0 16px 0;">📅 What's Next</h3>
      <p>Next week, I'll show you:</p>
      <ul>
        <li>The exact accountability framework Sarah used</li>
        <li>Why 10,000 steps is arbitrary (and what matters instead)</li>
        <li>How to choose the right accountability partner</li>
      </ul>
    </div>

    <div class="progress-box">
      <strong>Your Progress:</strong><br>
      Position: #{{POSITION}} <span style="color: #28a745;">(↑ moved up {{POSITION_CHANGE}} spots!)</span><br>
      Referrals: {{REFERRAL_COUNT}}<br><br>
      <a href="{{REFERRAL_LINK}}" style="color: #FF33BA;">Want to move up faster? Share your link →</a>
    </div>

    <p>See you next week,<br>
    <strong>{{FOUNDER_NAME}}</strong></p>

    <div style="background: #fff3cd; padding: 16px; border-radius: 8px; margin-top: 24px;">
      <strong>P.S.</strong> Sarah's accountability partner Marcus? He went from 1,200 steps to 12,500. Accountability works both ways. 💪
    </div>
  </div>

  <div class="footer">
    <p><a href="{{UNSUBSCRIBE_LINK}}" style="color: #6c757d;">Unsubscribe</a> | <a href="{{PREFERENCES_LINK}}" style="color: #6c757d;">Email Preferences</a></p>
  </div>
</body>
</html>
```

---

## Variant B: Sleep

### Subject Line
"{{NAME}}, you're a sleep-focused behavior changer"

### Key Content Changes
- **Success Story:** "Meet David: From 4.5 to 7.5 hours of quality sleep"
- **Before/After Stats:** 4.5 hours → 7.5 hours
- **Accountability Partner:** "Rachel, who sent a 'lights out' text every night at 10pm"
- **Quote:** "Knowing Rachel was checking on me made me actually follow through. I couldn't lie about my bedtime."
- **Research Hook:** "Why your sleep tracker makes insomnia worse (paradox of monitoring)"
- **Blog CTA:** "The Social Cure for Sleep Problems"

---

## Variant C: Stress Management

### Subject Line
"{{NAME}}, you're a stress-focused behavior changer"

### Key Content Changes
- **Success Story:** "Meet Julia: From daily stress spikes to calm consistency"
- **Before/After Stats:** 8.2 avg stress score → 4.1 avg stress score
- **Accountability Partner:** "Tom, who did 5-minute breathing exercises with her via video call"
- **Quote:** "I wouldn't do it alone. But knowing Tom was waiting for our 3pm session made me prioritize it."
- **Research Hook:** "Why meditation apps fail 92% of the time (lack of social commitment)"
- **Blog CTA:** "The Accountability Cure for Chronic Stress"

---

## Variant D: Recovery

### Subject Line
"{{NAME}}, you're a recovery-focused behavior changer"

### Key Content Changes
- **Success Story:** "Meet James: From overtraining to optimal recovery"
- **Before/After Stats:** 2 rest days/month → 10 rest days/month, injury-free
- **Accountability Partner:** "Emma, who 'vetoed' his workouts when HRV was too low"
- **Quote:** "Having someone else tell me to rest gave me permission. I couldn't do it for myself."
- **Research Hook:** "Why tracking recovery alone increases overtraining risk"
- **Blog CTA:** "The Social Accountability Approach to Better Recovery"

---

## Variable Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `{{NAME}}` | User's first name | "Sarah" |
| `{{POSITION}}` | Current waitlist position | "2,134" |
| `{{POSITION_CHANGE}}` | Positions moved since Week 1 | "1,713" |
| `{{REFERRAL_COUNT}}` | Number of referrals made | "2" |
| `{{REFERRAL_LINK}}` | Unique referral URL | "https://moonring.app/?ref=..." |
| `{{BLOG_LINK_ACCOUNTABILITY}}` | Blog post URL (goal-specific) | "/blog/movement-accountability-psychology" |
| `{{FOUNDER_NAME}}` | Founder's name | "Alex Johnson" |
| `{{UNSUBSCRIBE_LINK}}` | Unsubscribe URL | "/api/newsletter/unsubscribe?token=..." |
| `{{PREFERENCES_LINK}}` | Email preferences URL | "/email-preferences?token=..." |

---

## Delivery Logic (Pseudocode)

```typescript
// Trigger: 7 days after created_at
// Condition: primary_health_goal IS NOT NULL

const user = await getWaitlistUser(email)

// Skip if no goal selected
if (!user.primary_health_goal) {
  console.log('Skipping Week 2 - no goal selected')
  return
}

// Select variant based on goal
const emailTemplate = {
  movement: waitlistEmails.week2IdentityMovement,
  sleep: waitlistEmails.week2IdentitySleep,
  stress: waitlistEmails.week2IdentityStress,
  recovery: waitlistEmails.week2IdentityRecovery,
}[user.primary_health_goal]

// Calculate position change
const week1Position = await getHistoricalPosition(user.email, 7) // 7 days ago
const positionChange = week1Position - user.waitlist_position

// Populate variables
const emailData = {
  name: user.name || 'there',
  position: user.waitlist_position,
  positionChange: positionChange > 0 ? positionChange : 0,
  referralCount: user.referral_count,
  referralLink: `${APP_URL}/?ref=${user.referral_code}`,
  blogLinkAccountability: getBlogLink(user.primary_health_goal), // Returns goal-specific blog URL
  founderName: 'Alex Johnson',
  unsubscribeLink: `${APP_URL}/api/newsletter/unsubscribe?token=${user.unsubscribe_token}`,
  preferencesLink: `${APP_URL}/email-preferences?token=${user.preferences_token}`,
}

// Send via Brevo
await sendEmail({
  to: user.email,
  subject: renderTemplate(emailTemplate.subject, emailData),
  html: renderTemplate(emailTemplate.html, emailData),
  text: renderTemplate(emailTemplate.text, emailData),
  tags: ['waitlist', 'week-2', `goal-${user.primary_health_goal}`],
})

// Track send
await logEmailSent(user.email, 'week-2-identity', user.primary_health_goal)
```

---

## Success Metrics

| Metric | Target | Week 1 Benchmark |
|--------|--------|------------------|
| **Open Rate** | 55-60% | 65-70% |
| **Click Rate (Blog Link)** | 20-25% | N/A |
| **Referral Link Click** | 15-20% | 25-30% |
| **Reply Rate** | 2-3% | <1% |

**Expected Behavior:**
- Lower open rate than Week 1 (normal decay)
- Higher engagement among those who open (stronger targeting)
- Increased replies (identity resonance creates emotional connection)

---

## A/B Test Ideas

### Test 1: Identity Statement Placement
- **Control:** Identity statement early (after intro)
- **Variant:** Identity statement at end (after success story)
- **Measure:** Blog link click rate

### Test 2: Success Story Format
- **Control:** Narrative format (story-driven)
- **Variant:** Data format (before/after stats only)
- **Measure:** Engagement (time to read, click-through)

### Test 3: Research Depth
- **Control:** Brief mention ("Stanford research shows...")
- **Variant:** Detailed breakdown (study citations, methodology)
- **Measure:** Blog CTA conversion

---

## Content Production Requirements

### Blog Posts Needed (4 variants)
1. **Movement:** "The Psychology of Accountability: Why Step Counters Fail"
2. **Sleep:** "The Social Cure for Sleep Problems (Research-Backed)"
3. **Stress:** "The Accountability Cure for Chronic Stress"
4. **Recovery:** "The Social Accountability Approach to Better Recovery"

### Asset Requirements
- Success story before/after graphics (4 variants)
- Research citation graphics (Stanford, Harvard studies)
- Infographic: "Accountability vs. Willpower Comparison"

---

## Notes for Implementation

1. **Goal-Specific Blog Content:** Create 4 blog posts BEFORE launching email sequence
2. **Success Stories:** Use real beta tester stories if available, or create realistic personas
3. **Position Change Calculation:** Requires historical position tracking (store daily snapshots)
4. **Identity Language:** Use identity-based framing ("You ARE" not "You want to be")
5. **Social Proof:** Use real beta tester names (with permission) or realistic pseudonyms
6. **Research Citations:** Ensure all research claims are accurate and sourced (see `docs/02-requirements/research-sources.md` if available)
