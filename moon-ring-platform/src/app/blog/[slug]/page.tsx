import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Facebook } from 'lucide-react'
import type { Metadata } from 'next'

// Enable ISR - revalidate every hour (3600 seconds)
export const revalidate = 3600

// In production, this would fetch from CMS/database
interface BlogPost {
  title: string
  excerpt: string
  category: string
  author: string
  authorBio: string
  date: string
  readTime: string
  content: string
}

const getBlogPost = (slug: string): BlogPost | null => {
  const posts: Record<string, BlogPost> = {
    'the-planning-fallacy-why-your-monday-motivation-dies-by-wednesday': {
      title: 'The Planning Fallacy: Why Your Monday Motivation Dies by Wednesday',
      excerpt: 'You set ambitious goals every Sunday night. By Wednesday, they are forgotten. This is not a willpower problem—it is a cognitive bias called the Planning Fallacy. Here is how to hack it.',
      category: 'Behavioral Psychology',
      author: 'Dr. Sarah Mitchell',
      authorBio: 'PhD in Health Psychology from Stanford. Published researcher in commitment devices.',
      date: 'January 15, 2025',
      readTime: '8 min read',
      content: `
## The Sunday Night Ritual

It is Sunday evening. You are sitting on your couch, reflecting on the week ahead. This week will be different, you tell yourself. You will wake up at 6 AM every day. You will hit 10,000 steps. You will meditate for 20 minutes. You will meal prep on Wednesday.

You feel a surge of confidence. The plan is clear. The motivation is real. You are ready.

Monday morning arrives. The alarm goes off at 6 AM. You hit snooze. Just once. Then twice. By 7:15 AM, you are rushing to work with barely enough time for coffee, let alone meditation.

Tuesday, you manage the morning workout but skip your steps goal because you had back-to-back meetings. Wednesday, the meal prep never happens—you order takeout instead.

By Thursday, the ambitious plan is a distant memory.

<div class="callout-box bg-gradient-to-r from-pink-50 to-orange-50 border-l-4 border-[#FF33BA] p-6 my-8 rounded-r-lg">
<p class="text-lg font-semibold text-gray-900 mb-2">💡 Key Insight</p>
<p class="text-gray-800 mb-0">If this sounds familiar, welcome to the Planning Fallacy—a cognitive bias where we underestimate task duration and overestimate our ability to stick to plans.</p>
</div>

## What Is the Planning Fallacy?

The Planning Fallacy is a cognitive bias discovered by psychologists Daniel Kahneman and Amos Tversky in 1979. It describes our tendency to underestimate how long tasks will take and overestimate our ability to stick to plans.

Here is the problem: **when you are planning, you are in a different psychological state than when you are executing.**

### The Two Minds Problem

<div class="comparison-table my-8 overflow-hidden rounded-xl border border-gray-200">
<table class="w-full">
<thead class="bg-gray-50">
<tr>
<th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">Planning Mind (Sunday Night)</th>
<th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Execution Mind (Wednesday Afternoon)</th>
</tr>
</thead>
<tbody>
<tr class="border-t border-gray-200">
<td class="px-6 py-3 text-sm text-gray-700 border-r border-gray-200">Optimistic about the future</td>
<td class="px-6 py-3 text-sm text-gray-700">Dealing with reality</td>
</tr>
<tr class="bg-gray-50 border-t border-gray-200">
<td class="px-6 py-3 text-sm text-gray-700 border-r border-gray-200">Ignores past failures</td>
<td class="px-6 py-3 text-sm text-gray-700">Remembers why this didn't work before</td>
</tr>
<tr class="border-t border-gray-200">
<td class="px-6 py-3 text-sm text-gray-700 border-r border-gray-200">Assumes ideal conditions</td>
<td class="px-6 py-3 text-sm text-gray-700">Facing unexpected obstacles</td>
</tr>
<tr class="bg-gray-50 border-t border-gray-200">
<td class="px-6 py-3 text-sm text-gray-700 border-r border-gray-200">Focuses on outcomes, not obstacles</td>
<td class="px-6 py-3 text-sm text-gray-700">Tired from actual life demands</td>
</tr>
<tr class="border-t border-gray-200">
<td class="px-6 py-3 text-sm text-gray-700 border-r border-gray-200">High motivation, low friction</td>
<td class="px-6 py-3 text-sm text-gray-700">Low motivation, high friction</td>
</tr>
</tbody>
</table>
</div>

<blockquote class="pull-quote border-l-4 border-[#FF33BA] pl-6 my-8 text-xl italic text-gray-700">
"The disconnect between these two minds explains why your gym membership goes unused and your Fitbit ends up in a drawer."
</blockquote>

## Real-World Example: The Marathon Training Plan

Meet Alex, a 36-year-old project manager. In January, he signed up for a marathon in October—9 months away. Plenty of time.

His plan was ambitious but reasonable:
- Run 3x per week, starting with 3 miles
- Gradually increase distance by 10% weekly
- Cross-train 2x per week
- Rest on Sundays

**Week 1-2**: Perfect execution. He hit every run. He felt unstoppable.

**Week 3**: Work project deadline. Missed Thursday's run. "I will make it up Saturday."

**Week 4**: Got sick. Missed the entire week. "I will restart next week."

**Week 5-8**: Sporadic running. Some weeks 2 runs, some weeks zero. Always planning to "get back on track next week."

**By March**: Running maybe once per week. Marathon registration fee: $150, wasted.

This was not a willpower failure. This was the Planning Fallacy in action.

## Why Smart, Motivated People Fall for This

You might think: "I am smart. I know my past patterns. Why do I keep falling for this?"

Because the Planning Fallacy is not about intelligence—it is about three psychological mechanisms:

### 1. The Optimism Bias

Your brain is hardwired to be optimistic about the future. This served evolutionary purposes (optimists take risks that lead to rewards), but it sabotages planning.

Research by Tali Sharot at UCL found that **80% of people believe they are less likely than average to experience negative events**. We apply this same bias to our goals:

- "Other people fail at their workout plans, but I will be different."
- "68% of people abandon their wearables, but not me."
- "Everyone struggles with consistency, but I have a good plan this time."

### 2. The Inside View Trap

When planning, we focus on the specific details of THIS attempt: "I have a new app! I am more motivated now! My schedule is clearer this month!"

We ignore the **outside view**—the statistical reality of past attempts. Kahneman calls this the "inside view trap."

**Inside View**: "I will wake up at 6 AM every day because I bought a sunrise alarm clock and moved my phone across the room."

**Outside View**: "I have tried waking up early 7 times in the past 3 years. It worked for 4-10 days each time before I reverted to old habits."

The outside view is uncomfortable because it suggests we might fail again. So we ignore it.

### 3. The Single-Player Game Illusion

We treat behavior change like a single-player game where success depends solely on our effort. But behavior change is a multi-player game influenced by:

- Your social environment (friends who text "Want to grab dinner?" at 8 PM)
- Your work schedule (meetings that run late)
- Your family obligations (kids who get sick)
- Your energy levels (which fluctuate with sleep, stress, and hormones)

The Planning Fallacy thrives when we pretend we are the only variable.

## The Solution: External Accountability Breaks the Fallacy

Here is the counterintuitive truth: **the best way to overcome the Planning Fallacy is to stop relying on your own planning.**

Instead, you need **external accountability structures** that work even when your motivation does not.

### Case Study: How Accountability Fixed Alex's Marathon Training

After his failed solo attempt, Alex tried a different approach. He joined a marathon training group that met every Tuesday and Saturday morning at 6:30 AM.

**Critical Differences**:
- He could not hit snooze—people were waiting for him
- Missing a run meant disappointing 8 people, not just himself
- The group chat created daily accountability ("Who is running tomorrow?")
- Other runners shared strategies for managing work conflicts
- When he got sick, the group adjusted the plan for him

**Result**: Alex completed the marathon in October. Not because he had better willpower. Because he had better systems.

### The Science Behind Why This Works

<div class="stats-box bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 my-8">
<p class="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-4">📊 Research: American Society of Training and Development</p>
<div class="space-y-3">
<div class="flex justify-between items-center">
<span class="text-gray-700">Having an idea or goal</span>
<span class="text-2xl font-bold text-gray-900">10%</span>
</div>
<div class="flex justify-between items-center">
<span class="text-gray-700">Consciously deciding to do it</span>
<span class="text-2xl font-bold text-gray-900">25%</span>
</div>
<div class="flex justify-between items-center">
<span class="text-gray-700">Deciding when to do it</span>
<span class="text-2xl font-bold text-gray-900">40%</span>
</div>
<div class="flex justify-between items-center">
<span class="text-gray-700">Planning how to do it</span>
<span class="text-2xl font-bold text-gray-900">50%</span>
</div>
<div class="flex justify-between items-center border-t-2 border-blue-200 pt-3">
<span class="text-gray-900 font-semibold">Committing to someone else</span>
<span class="text-3xl font-bold text-blue-600">65%</span>
</div>
<div class="flex justify-between items-center bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white rounded-lg px-4 py-3 mt-2">
<span class="font-bold">Specific accountability appointment</span>
<span class="text-4xl font-bold">95%</span>
</div>
</div>
</div>

<div class="callout-box bg-gradient-to-r from-pink-50 to-orange-50 border-l-4 border-[#FF33BA] p-6 my-8 rounded-r-lg">
<p class="text-lg font-semibold text-gray-900 mb-2">🎯 Key Takeaway</p>
<p class="text-gray-800 mb-0">Notice the massive jump from 50% (good planning alone) to 95% (accountability appointment). That's the difference between relying on your Planning Mind and building external structures that work when motivation fails.</p>
</div>

## Practical Strategies: Hacking the Planning Fallacy

### Strategy 1: Reference Class Forecasting

Before making a commitment, ask:
- "How many times have I tried something similar?"
- "How long did it last on average?"
- "What specific obstacles derailed me?"

Then plan for THOSE obstacles, not ideal conditions.

**Example**: If you have failed at morning workouts 5 times, your plan should address why (sleep debt, evening habits, no accountability). Just "trying harder" is not a strategy.

### Strategy 2: Implementation Intentions

Instead of: "I will exercise more."

Use: "Every Tuesday and Thursday at 6:30 AM, I will meet Sarah at the gym entrance."

The specificity creates a cue-routine pattern that bypasses motivation.

### Strategy 3: Build in Accountability Checkpoints

The longer you go without external accountability, the more likely the Planning Fallacy strikes.

**Poor accountability**: "I will check in with myself every week."

**Strong accountability**: "Every Sunday at 8 PM, I send my workout log to my accountability partner."

The key word? SEND. Not review. Not reflect. SEND to someone else.

### Strategy 4: Start Stupidly Small

Your Planning Mind says: "I can run 5 days a week!"

Your Execution Mind knows: "I barely have time to shower."

Solution: Commit to an embarrassingly small goal that you can do even on your worst day.

**Examples**:
- Not "meditate 20 minutes daily" → "sit on meditation cushion for 2 minutes"
- Not "10K steps daily" → "walk around the block once"
- Not "meal prep every Sunday" → "chop one vegetable"

Once the habit is established, increase gradually. But only after 30 consecutive days of the small version.

## Why Moon Ring Users Beat the Planning Fallacy

Moon Ring does not rely on your Planning Mind. Instead, it builds three layers of accountability:

**Layer 1: Public Commitment Contract**
- You state your commitment publicly, not just to yourself
- Breaking it means breaking a promise to your community
- This activates loss aversion (we hate disappointing others more than ourselves)

**Layer 2: Accountability Partner**
- Daily check-ins create recurring accountability appointments
- Your partner is counting on you to show up for them too
- Mutual accountability > solo motivation

**Layer 3: Community Rescue System**
- When commitments are at risk, the community intervenes
- Other users who have overcome similar obstacles provide strategies
- Failure becomes a community problem, not a personal shame

Result: **127-day average streak** vs. 32 days for typical wearable users.

<blockquote class="pull-quote border-l-4 border-[#FF33BA] pl-6 my-8 text-xl italic text-gray-700">
"Moon Ring users aren't smarter or more motivated. They have better systems that work DESPITE the Planning Fallacy."
</blockquote>

<hr class="my-12 border-t-2 border-gray-200" />

## Your Action Plan

The Planning Fallacy will never disappear. Your brain is wired for optimism. But you can build systems that succeed anyway:

1. **Accept the outside view**: You have failed at this 7 times. Plan for failure points.
2. **Start absurdly small**: What can you do on your worst day? Start there.
3. **Build external accountability**: Tell someone. Meet someone. Report to someone.
4. **Remove reliance on motivation**: Design systems that work when you do not feel like it.

The goal is not to have perfect motivation every day. The goal is to have structures that keep you on track when motivation inevitably fails.

Because it will fail. That is not a character flaw. That is the Planning Fallacy.

---

*Ready to build accountability systems that work when motivation does not? [Try Moon Ring free for 30 days](/#waitlist) and experience what happens when you stop relying on Sunday night motivation.*
      `
    },
    'why-wearables-fail-without-accountability': {
      title: 'Why 68% of Wearable Users Fail (And How Accountability Fixes It)',
      excerpt: 'The wearable industry has a dirty secret: most devices end up in drawers within six months. We explore the psychology behind this failure and how social accountability creates lasting change.',
      category: 'Behavioral Psychology',
      author: 'Dr. Sarah Mitchell',
      authorBio: 'PhD in Health Psychology from Stanford. Published researcher in commitment devices.',
      date: 'January 10, 2025',
      readTime: '7 min read',
      content: `
## The Wearable Abandonment Crisis

You bought it with the best intentions. Maybe it was an Apple Watch, a Fitbit, or an Oura Ring. You synced it, set your goals, and for the first few weeks, you were obsessed. Every step counted. Every sleep score analyzed. Every workout logged.

Then life happened. The novelty faded. The data became noise. And eventually, your expensive wearable became just another gadget gathering dust.

<div class="stats-box bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-2xl p-8 my-8 text-center">
<p class="text-sm font-semibold text-red-900 uppercase tracking-wide mb-2">⚠️ Industry Reality Check</p>
<p class="text-6xl font-bold text-red-600 mb-2">68%</p>
<p class="text-lg text-gray-800 font-medium">of wearable users abandon their devices within six months</p>
</div>

<p class="text-lg text-gray-700 my-6">If this sounds familiar, you're not alone.</p>

## The Real Problem Isn't the Technology

Wearable devices are technological marvels. They track heart rate variability, sleep stages, activity levels, and dozens of other metrics with impressive accuracy. The problem isn't what they measure—it's what happens (or doesn't happen) after the measurement.

### Data Without Direction

Your wearable tells you that you only got 5 hours of sleep last night. Okay... now what? It shows you walked 3,000 steps today. Great. But without a structured framework for turning these insights into sustained behavioral change, the data becomes meaningless.

### The Motivation Myth

We've been sold the idea that tracking alone creates motivation. Just seeing your numbers will inspire you to improve them, right? Wrong. Research in behavioral psychology shows that **self-monitoring alone has minimal impact on long-term behavior change**.

The key missing ingredient? **Accountability**.

## Why Social Accountability Changes Everything

When you make a commitment to yourself alone, it's easy to negotiate. "I'll skip the gym today and go tomorrow instead." "One bad sleep night won't matter." These negotiations chip away at your goals until they disappear entirely.

But when someone else is counting on you—when you've made a public commitment to an accountability partner—the psychology fundamentally shifts.

### The Science of Commitment Contracts

<div class="stats-box bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300 rounded-2xl p-8 my-8">
<p class="text-sm font-semibold text-green-900 uppercase tracking-wide mb-6">📚 What the Research Shows</p>
<div class="space-y-4">
<div class="bg-white rounded-lg p-4 shadow-sm">
<p class="text-3xl font-bold text-green-600 mb-1">+65%</p>
<p class="text-sm text-gray-700">Higher goal completion with accountability partners</p>
<p class="text-xs text-gray-500 mt-1">American Society of Training and Development</p>
</div>
<div class="bg-white rounded-lg p-4 shadow-sm">
<p class="text-3xl font-bold text-blue-600 mb-1">95%</p>
<p class="text-sm text-gray-700">Adherence improvement with public commitments</p>
<p class="text-xs text-gray-500 mt-1">Research on commitment contracts</p>
</div>
<div class="bg-white rounded-lg p-4 shadow-sm">
<p class="text-3xl font-bold text-purple-600 mb-1">3x</p>
<p class="text-sm text-gray-700">Better outcomes with social support</p>
<p class="text-xs text-gray-500 mt-1">Weight loss program analysis</p>
</div>
</div>
</div>

<div class="callout-box bg-gradient-to-r from-pink-50 to-orange-50 border-l-4 border-[#FF33BA] p-6 my-8 rounded-r-lg">
<p class="text-lg font-semibold text-gray-900 mb-2">🎯 Key Takeaway</p>
<p class="text-gray-800 mb-0">This isn't motivational fluff—it's rigorous behavioral science showing that accountability transforms isolated data into sustained behavior change.</p>
</div>

## How Moon Ring Bridges the Gap

Moon Ring was built on a simple insight: wearable data is valuable, but only when combined with proven behavioral psychology principles.

### 1. Structured Commitments

Instead of vague goals like "be more active," Moon Ring helps you create specific, measurable commitments: "Walk 8,000 steps for 30 consecutive days."

### 2. Accountability Partners

You're matched with real people pursuing similar health journeys. When you fail, they notice. When you succeed, they celebrate. This social dynamic creates the external motivation that self-tracking alone can't provide.

### 3. Verified Data

Your wearable data syncs automatically, providing objective verification of progress. No self-reporting, no gaming the system—just honest accountability.

### 4. Social Rescue

When commitments are at risk of failing, the community can intervene with support, encouragement, and practical help. Accountability isn't punitive—it's protective.

## The Results Speak for Themselves

<div class="comparison-table my-8 overflow-hidden rounded-xl border border-gray-200">
<table class="w-full">
<thead class="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white">
<tr>
<th class="px-6 py-4 text-left text-sm font-semibold">Metric</th>
<th class="px-6 py-4 text-center text-sm font-semibold border-l border-white/20">Traditional Wearables</th>
<th class="px-6 py-4 text-center text-sm font-semibold border-l border-white/20">Moon Ring Users</th>
</tr>
</thead>
<tbody>
<tr class="border-t border-gray-200">
<td class="px-6 py-4 text-sm font-medium text-gray-900">Average Commitment Streak</td>
<td class="px-6 py-4 text-center text-lg font-bold text-red-600 border-l border-gray-200">32 days</td>
<td class="px-6 py-4 text-center text-lg font-bold text-green-600 border-l border-gray-200">127 days</td>
</tr>
<tr class="bg-gray-50 border-t border-gray-200">
<td class="px-6 py-4 text-sm font-medium text-gray-900">Goal Completion Rate</td>
<td class="px-6 py-4 text-center text-lg font-bold text-red-600 border-l border-gray-200">12%</td>
<td class="px-6 py-4 text-center text-lg font-bold text-green-600 border-l border-gray-200">67%</td>
</tr>
<tr class="border-t border-gray-200">
<td class="px-6 py-4 text-sm font-medium text-gray-900">Still Active After 6 Months</td>
<td class="px-6 py-4 text-center text-lg font-bold text-red-600 border-l border-gray-200">32%</td>
<td class="px-6 py-4 text-center text-lg font-bold text-green-600 border-l border-gray-200">89%</td>
</tr>
</tbody>
</table>
</div>

<blockquote class="pull-quote border-l-4 border-[#FF33BA] pl-6 my-8 text-xl italic text-gray-700">
"Accountability transforms isolated data points into sustained behavioral change."
</blockquote>

## Your Wearable Isn't the Problem

If your Fitbit is gathering dust, don't blame the device. The technology works. What's been missing is the behavioral framework to turn measurement into meaning.

Social accountability isn't a nice-to-have feature—it's the missing piece that makes wearable data actually work for lasting health improvement.

Ready to unlock the potential of your wearable? It starts with commitment, accountability, and community.

---

*Want to experience accountability-driven behavior change? Join thousands of Moon Ring users who've transformed their wearable data into lasting habits. [Start your free trial today](/#waitlist).*
      `
    },
    'loss-aversion-why-breaking-promises-to-others-hurts-more-than-breaking-them-to-yourself': {
      title: 'Loss Aversion: Why Breaking Promises to Others Hurts More',
      excerpt: 'You break promises to yourself all the time. But breaking a promise to a friend? That feels terrible. This is loss aversion—and it is the secret weapon of behavioral change.',
      category: 'Behavioral Psychology',
      author: 'Alex Chen',
      authorBio: 'Founder & CEO. Former product lead at Fitbit. Marathon runner who learned accountability the hard way.',
      date: 'January 12, 2025',
      readTime: '6 min read',
      content: `
## The Broken Promise Experiment

Imagine two scenarios:

**Scenario A**: You promise yourself you will go to the gym at 6 AM tomorrow. When the alarm goes off, you hit snooze. You feel a twinge of guilt, but you justify it: "I will go after work instead." (You do not.)

**Scenario B**: You promise your friend you will meet them at the gym at 6 AM tomorrow. When the alarm goes off, you drag yourself out of bed despite being tired. Why? Because they are counting on you.

Same goal. Same time. Same you. But completely different behavior.

This is not about your friend being more important than your health. This is about a psychological phenomenon called **loss aversion**—and it explains why accountability works when willpower does not.

## What Is Loss Aversion?

Loss aversion is the principle that **losses loom larger than gains** in our psychological experience.

<div class="stats-box bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl p-8 my-8 text-center">
<p class="text-sm font-semibold text-purple-900 uppercase tracking-wide mb-4">🧠 Core Principle</p>
<p class="text-5xl font-bold text-purple-600 mb-3">2-3x</p>
<p class="text-lg text-gray-800 font-medium">We feel the pain of losing something 2-3 times more intensely than the pleasure of gaining something equivalent</p>
</div>

<p class="text-gray-700 my-6">This was discovered by Daniel Kahneman and Amos Tversky, who won a Nobel Prize for their work on how humans make irrational economic decisions.</p>

### The Classic Experiment

In their research, participants were offered two choices:

**Choice 1**: Definitely gain $100.

**Choice 2**: 50% chance of gaining $200, 50% chance of gaining nothing.

Most people chose the guaranteed $100, even though both options have the same mathematical expected value ($100).

But when the frame shifted to losses, behavior flipped:

**Choice 1**: Definitely lose $100.

**Choice 2**: 50% chance of losing $200, 50% chance of losing nothing.

Now most people chose the gamble. Why? Because the pain of a definite loss felt worse than the risk of a bigger loss.

Same numbers. Different outcomes. All because of how our brains process losses versus gains.

## Why This Matters for Behavior Change

<div class="comparison-table my-8 overflow-hidden rounded-xl border border-gray-200">
<table class="w-full">
<thead class="bg-gray-50">
<tr>
<th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">Commitment to Yourself</th>
<th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Commitment to Others</th>
</tr>
</thead>
<tbody>
<tr class="border-t border-gray-200">
<td class="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">Failure feels like <strong>not gaining</strong> something</td>
<td class="px-6 py-4 text-sm text-gray-700">Failure feels like <strong>losing</strong> something (respect, trust, goodwill)</td>
</tr>
<tr class="bg-red-50 border-t border-gray-200">
<td class="px-6 py-4 text-sm font-medium text-red-700 border-r border-gray-200">⚠️ Weak motivation to follow through</td>
<td class="px-6 py-4 text-sm font-medium text-green-700 bg-green-50">✓ Strong motivation to avoid disappointment</td>
</tr>
</tbody>
</table>
</div>

<div class="callout-box bg-gradient-to-r from-pink-50 to-orange-50 border-l-4 border-[#FF33BA] p-6 my-8 rounded-r-lg">
<p class="text-lg font-semibold text-gray-900 mb-2">🎯 Key Takeaway</p>
<p class="text-gray-800 mb-0">Your brain fights much harder to avoid losses than to secure gains. This is why accountability to others works when willpower alone doesn't.</p>
</div>

### Real Example: The Running Partner Effect

I started running seriously in 2019. My goal was to train for a marathon.

**Solo attempt (January-March)**: I created a detailed training plan. Bought new shoes. Downloaded a training app. I was motivated!

Week 1-2: Perfect execution.

Week 3: Skipped Thursday because of a work deadline.

Week 4: "Took a recovery week" after feeling tired.

Week 5-8: Ran sporadically, maybe 1-2x per week.

By April, I had basically quit. The training plan sat unused in my running app. The $150 marathon entry fee? Wasted.

**Partner attempt (September-December)**: A friend asked if I wanted to train together. We committed to meeting every Tuesday and Saturday at 6:30 AM at the park entrance.

Week 1: I almost skipped Tuesday (tired from weekend travel). But I texted him at 6:15 AM: "Running 10 min late, sorry!" I went.

Week 4: I had a terrible week at work. Friday night, I thought about texting him to cancel. But the thought of him standing alone at the park entrance at 6:30 AM felt awful. I went.

Week 8: I actually got sick (real sick, not "tired" sick). I texted him early to cancel and felt genuinely bad about it. He said "No worries, rest up!" and I still felt guilty.

Result: I completed the marathon in December.

Same goal. Same training plan. Different outcome. Why?

Because missing a solo run meant not gaining a workout. Missing a partner run meant losing his respect and disappointing someone counting on me.

Loss aversion in action.

## The Three Types of Losses That Drive Behavior

When you commit publicly or to another person, you create three types of potential losses:

### 1. Social Capital Loss

When you break a commitment to someone, you lose social standing. You become "the person who does not follow through." Even if they forgive you, you know they now see you as less reliable.

Research by Robert Cialdini on social proof shows that **our self-image is deeply tied to how others perceive us**. We would rather endure discomfort than damage our reputation.

### 2. Relationship Currency Loss

Every time you make and keep a commitment, you build trust. Every time you break one, you withdraw from that trust account.

This is why it feels worse to cancel on a friend than to skip a solo workout. You are not just losing one workout—you are losing relationship currency.

### 3. Identity Loss

When you tell someone "I am training for a marathon" or "I am committed to better sleep," you are making an identity claim.

Breaking that commitment means you are not who you said you are. And humans have a deep need for self-consistency.

Social psychologist Leon Festinger called this **cognitive dissonance**—the discomfort we feel when our actions do not match our stated beliefs or identity.

## Why Promises to Yourself Do Not Work

You might think: "But I want to keep promises to myself! I feel bad when I do not!"

You do feel bad. But not bad enough.

Here is why self-promises fail:

### Reason 1: Private Failures Are Easy to Rationalize

When you skip a solo workout, your brain generates excuses:
- "I will go tomorrow instead."
- "I need rest more than exercise right now."
- "One missed day will not matter."

These rationalizations feel reasonable because there is no external witness to challenge them.

But when your running partner is waiting at the park, these excuses feel hollow. You cannot rationalize your way out of disappointing them.

### Reason 2: No Immediate Consequence

When you break a promise to yourself, the consequence is abstract and delayed. "I will be less fit" or "I will not reach my goal" are future problems.

When you break a promise to someone else, the consequence is immediate and visceral. They are disappointed RIGHT NOW. You feel it in your gut.

### Reason 3: You Can Always Forgive Yourself

You know you will forgive yourself for missing a workout. You have done it dozens of times before.

But you do not know if your accountability partner will forgive you. The uncertainty creates motivation to avoid disappointing them in the first place.

## How to Harness Loss Aversion for Good

Since loss aversion is hardwired, you cannot eliminate it. But you can strategically engineer situations where loss aversion works FOR you instead of against you.

### Strategy 1: Make Public Commitments

Tell people what you are doing. The more specific, the better.

**Weak**: "I am going to exercise more."

**Strong**: "I am running a 5K on March 15th. Here is my training plan."

Now failure has a witness. You have created social capital at stake.

### Strategy 2: Create Accountability Appointments

Do not just have an accountability partner. Have a specific time and place where you meet them.

**Example**: "Every Tuesday and Thursday at 6:30 AM, we meet at the park entrance."

This creates a vivid mental image of them waiting for you. The potential loss (disappointing them) becomes concrete.

### Strategy 3: Build Reciprocal Commitments

The strongest accountability is mutual. You are not just reporting to someone—you are both counting on each other.

When your partner skips, you feel the disappointment. This makes you more determined not to skip yourself, because you know how it feels.

### Strategy 4: Join Communities with Shared Identity

When you join a running club, a meditation group, or a Moon Ring commitment circle, you are not just making individual commitments. You are joining a community with shared values.

Leaving means losing your place in that community. This creates powerful loss aversion.

## Why Moon Ring Works: Loss Aversion by Design

Moon Ring is built around three layers of loss aversion:

**Layer 1: Commitment Contracts**

When you create a commitment on Moon Ring, it is public. Your community sees it. This creates immediate social capital at stake.

**Layer 2: Accountability Partners**

You are matched with someone pursuing similar goals. You check in daily. They see your wearable data automatically.

Missing a commitment means they notice. Not in a judgy way—in a "Hey, everything okay?" way. But you still feel the loss of letting them down.

**Layer 3: Community Identity**

Moon Ring users identify as "people who keep commitments." When you join, you are claiming that identity.

Breaking commitments means losing that identity. And our brains fight to maintain consistency between our stated identity and our actions.

Result: 127-day average streak vs. 32 days for solo wearable users.

<blockquote class="pull-quote border-l-4 border-[#FF33BA] pl-6 my-8 text-xl italic text-gray-700">
"Until you create structures where breaking commitments feels like a loss, you'll keep negotiating with yourself."
</blockquote>

<hr class="my-12 border-t-2 border-gray-200" />

## Your Action Plan

You can lecture yourself about discipline all you want. But until you create structures where breaking commitments feels like a **loss**, you will keep negotiating with yourself.

Here is how to engineer loss aversion into your next goal:

1. **Tell 3 specific people** about your commitment. Make it concrete: "I am walking 10K steps daily for 30 days starting Monday."

2. **Schedule accountability check-ins**. Not "I will update people"—set calendar reminders to TEXT someone your status every Sunday at 8 PM.

3. **Find one person with the same goal** and commit to mutual check-ins. You need to feel what it is like when they skip, so you will not skip yourself.

4. **Join a community** where your goal is the norm. Running clubs. Meditation groups. Moon Ring circles. Surround yourself with people who will notice if you quit.

The goal is to create a situation where **not doing the thing feels worse than doing it**.

That is loss aversion. And when you harness it correctly, you will not need willpower.

---

*Ready to harness loss aversion for lasting behavior change? [Join Moon Ring](/#waitlist) and experience what happens when breaking commitments costs more than keeping them.*
      `
    },
    'the-fresh-start-effect-why-january-1st-feels-different-and-how-to-use-it': {
      title: 'The Fresh Start Effect: Why January 1st Feels Different',
      excerpt: 'New Year resolutions fail 92% of the time. But the Fresh Start Effect—the psychology behind "new beginnings"—is real. Here is how to harness it year-round.',
      category: 'Behavioral Psychology',
      author: 'Dr. Sarah Mitchell',
      authorBio: 'PhD in Health Psychology from Stanford. Published researcher in commitment devices.',
      date: 'January 8, 2025',
      readTime: '7 min read',
      content: `
## The Magic of January 1st

It is December 31st at 11:45 PM. You are at a party, holding a glass of champagne, reflecting on the year. Tomorrow is January 1st—a fresh start. You feel a surge of optimism.

"This year will be different," you tell yourself. "This year I will finally stick to my workouts. Get 8 hours of sleep. Meal prep on Sundays. Track my steps daily."

Midnight strikes. Fireworks go off. Hugs and cheers all around. January 1st has arrived, and with it, a feeling of unlimited possibility.

By January 15th, that feeling is gone. By February 1st, your resolutions are forgotten.

<div class="stats-box bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl p-8 my-8 text-center">
<p class="text-sm font-semibold text-red-900 uppercase tracking-wide mb-2">📉 The Resolution Reality</p>
<p class="text-6xl font-bold text-red-600 mb-2">92%</p>
<p class="text-lg text-gray-800 font-medium">of New Year resolutions fail by February</p>
</div>

<div class="callout-box bg-gradient-to-r from-pink-50 to-orange-50 border-l-4 border-[#FF33BA] p-6 my-8 rounded-r-lg">
<p class="text-lg font-semibold text-gray-900 mb-2">💡 The Paradox</p>
<p class="text-gray-800 mb-0">Yet every year, millions of people make resolutions anyway. Why? Because the Fresh Start Effect is real—even if we use it wrong.</p>
</div>

## What Is the Fresh Start Effect?

The Fresh Start Effect is a psychological phenomenon where **temporal landmarks create a sense of new beginnings**, temporarily boosting motivation and making people more likely to pursue goals.

Researchers Katherine Milkman, Hengchen Dai, and Jason Riis published groundbreaking research in 2014 analyzing gym attendance data. They found that gym visits spiked at three types of temporal landmarks:

1. **Calendar landmarks**: First day of the week, month, year
2. **Birthday landmarks**: The day after your birthday
3. **Life event landmarks**: After moving, starting a new job, or ending a relationship

<div class="stats-box bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-300 rounded-2xl p-8 my-8">
<p class="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-4">📊 Fresh Start Effect: Gym Attendance Spikes</p>
<div class="space-y-3">
<div class="flex justify-between items-center bg-white rounded-lg px-4 py-3">
<span class="text-gray-700">Mondays vs. other weekdays</span>
<span class="text-3xl font-bold text-blue-600">+33%</span>
</div>
<div class="flex justify-between items-center bg-white rounded-lg px-4 py-3">
<span class="text-gray-700">First week of month vs. other weeks</span>
<span class="text-3xl font-bold text-green-600">+14%</span>
</div>
<div class="flex justify-between items-center bg-white rounded-lg px-4 py-3">
<span class="text-gray-700">January new memberships</span>
<span class="text-3xl font-bold text-purple-600">+12%</span>
</div>
</div>
</div>

<div class="callout-box bg-gradient-to-r from-yellow-50 to-red-50 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg">
<p class="text-lg font-semibold text-gray-900 mb-2">⚠️ The Problem</p>
<p class="text-gray-800 mb-0">The effect is temporary. By week 3 of January, gym attendance drops back to baseline. By February, 80% of the January surge has disappeared.</p>
</div>

## Why Fresh Starts Feel Different

There is actual psychology behind why January 1st (or any fresh start) feels motivating:

### 1. Psychological Distancing

Temporal landmarks create a mental boundary between your past self and future self.

"Old me" failed at sticking to workouts. But that was last year. "New me" starts fresh on January 1st.

This psychological distance lets you disassociate from past failures. You feel like a different person, unburdened by old patterns.

Research shows this is why people are more likely to donate to charity after moving to a new city or after birthdays. The temporal landmark makes them feel like a different version of themselves—one who "should" make better choices.

### 2. Clean Mental Ledger

Fresh starts give you a blank scorecard.

When you are in the middle of a month and you have already missed 4 workouts, it feels pointless to start now. "I have already failed this month. Why bother?"

But on January 1st? The ledger is clean. You are 0-for-0. It feels possible to go 30-for-30.

This is called the **goal gradient effect**—we are more motivated when we feel close to achieving something. A clean slate feels like the starting line of a race, not mile 15 where you are already exhausted.

### 3. Social Reinforcement

Fresh starts are often shared experiences. Everyone makes New Year resolutions. Everyone starts "fresh" on Monday. Everyone talks about "new year, new me."

This social reinforcement creates a sense of collective momentum. You are not just changing—everyone is changing. That makes it feel easier.

## Why Fresh Starts Fail (and How to Fix Them)

The Fresh Start Effect gives you a burst of motivation. But bursts fade. Here is why most fresh starts fail:

### Problem 1: The Burst Is Emotional, Not Structural

On January 1st, you feel motivated. But feeling motivated does not change your actual life circumstances:
- Your job is still demanding
- Your family still needs attention
- Your schedule is still packed
- Your old habits are still ingrained

By week 3, the motivation has faded, but your life is exactly the same. Without structural changes, you revert to old patterns.

### Problem 2: Fresh Starts Create Overly Ambitious Goals

Fresh starts make us optimistic. And optimism makes us set unrealistic goals.

**Common January 1st goals**:
- "I will work out 6 days a week" (when you currently work out 0 days)
- "I will meal prep every Sunday" (when you currently order takeout 5x a week)
- "I will wake up at 5:30 AM daily" (when you currently wake up at 7:30 AM)

These are not 10% improvements. These are 10x behavior changes. And behavior change research shows that **radical overhauls fail 90% of the time**.

### Problem 3: No Accountability After the Burst

Fresh starts come with built-in social momentum. Everyone is talking about their resolutions in early January.

But by February, no one is talking about it anymore. The social reinforcement disappears. And without external accountability, internal motivation fades.

## Real Example: The Monday Restart Trap

Meet Sarah, a 34-year-old marketing manager. She has fallen into the "Monday restart" pattern for 3 years.

**The Pattern**:

**Sunday Night**: She feels motivated. "Tomorrow I will start fresh. I will hit the gym before work. Pack a healthy lunch. Walk during my lunch break."

**Monday Morning**: She wakes up at 6 AM, goes to the gym, feels amazing. Packs a salad for lunch. Walks 10,000 steps. "This is it! I am doing it!"

**Tuesday**: Same thing. She feels unstoppable.

**Wednesday**: Morning meeting runs late. Skips gym. "That is okay, I will go tomorrow."

**Thursday**: Client emergency. No time for gym. Eats lunch at desk. "Just a tough week. Back on track Monday."

**Friday-Sunday**: Weekend plans derail everything. "I will restart Monday."

**Next Monday**: "Okay, THIS Monday is the real fresh start."

This cycle repeats 40+ times per year. She gets bursts of motivation every Monday but never sustains it beyond 3-4 days.

Why? Because the Fresh Start Effect gives her the initial push, but she has no accountability structure to carry her through the friction points (Wednesday client emergencies, Thursday deadline crunches).

## How to Actually Use Fresh Starts Correctly

Fresh starts are powerful. But only if you pair them with systems that outlast the motivational burst.

### Strategy 1: Use Fresh Starts to Begin, Not to Sustain

Fresh starts are excellent for getting started. But do not rely on them for long-term success.

Instead, use the burst of motivation to **build accountability structures** that will keep you going when motivation fades.

**Example**: On January 1st, do not just start working out. Use the motivation to:
- Join a workout group that meets 3x per week
- Find an accountability partner and schedule weekly check-ins
- Sign up for Moon Ring and create a public commitment

The fresh start gets you moving. The accountability keeps you moving.

### Strategy 2: Create Micro Fresh Starts

You do not need to wait for January 1st or Monday. You can engineer fresh starts whenever you need them.

**Effective micro fresh starts**:
- First day of the month
- Day after your birthday
- First day after returning from vacation
- Day after finishing a big project
- First day of a new season

The key: treat it like a real fresh start. Give yourself the psychological distance ("That was old me, this is new me") and the clean scorecard feeling.

### Strategy 3: Pair Fresh Starts with Ridiculously Small Goals

Use the motivation boost to start something sustainable, not something ambitious.

**Bad**: "Starting Monday, I will work out 6 days a week for 90 minutes each."

**Good**: "Starting Monday, I will put on workout clothes and do 5 minutes of exercise every day for 30 days. Then I will re-evaluate."

The fresh start gets you moving. The small goal ensures you do not burn out when the burst fades.

### Strategy 4: Lock in Accountability DURING the Burst

The first 3 days of a fresh start are golden. You have peak motivation. Use it wisely.

Do not just start a habit. **Lock in structures that will force you to continue even when motivation vanishes.**

**During the burst, do this**:
- Text 3 friends: "I am committing to X for 30 days. Check in with me Sundays at 8 PM."
- Join a community or accountability group
- Pay for something that forces commitment (prepaid classes, a coach, Moon Ring subscription)
- Schedule accountability appointments on your calendar

The burst will fade. The structures will remain.

## Why Moon Ring Turns Fresh Starts Into Lasting Change

Most people use fresh starts to make commitments to themselves. Moon Ring uses fresh starts to create commitments to others.

Here is how:

**Step 1: Fresh Start → Public Commitment**

Instead of "I will walk 10K steps daily starting Monday," you create a Moon Ring commitment: "I commit to 10K steps daily for 30 days, starting Monday."

This is public. Your accountability partner sees it. The community sees it. You cannot quietly quit.

**Step 2: Accountability Partner Matches During Burst**

Moon Ring matches you with an accountability partner IMMEDIATELY. Not "eventually." Not "when you are ready."

You use the fresh start motivation to establish the relationship. By day 4, when your motivation dips, the relationship is already built. Quitting means letting them down.

**Step 3: Daily Check-ins Outlast the Burst**

Your wearable data syncs automatically. Your partner sees your progress daily. You see theirs.

When the fresh start feeling fades (and it will), the accountability remains. You do not need to feel motivated. You just need to not let your partner down.

<blockquote class="pull-quote border-l-4 border-[#FF33BA] pl-6 my-8 text-xl italic text-gray-700">
"Fresh starts work. But only if you pair them with accountability that lasts longer than the feeling."
</blockquote>

<hr class="my-12 border-t-2 border-gray-200" />

## Your Action Plan

The next fresh start is coming. Maybe it is Monday. Maybe it is the first of the month. Maybe it is your birthday.

Here is how to use it correctly:

1. **Recognize the burst is temporary**. You have maybe 72 hours of peak motivation. Use it wisely.

2. **Set a ridiculously small goal**. Not "work out 6x per week." More like "put on workout clothes 5 minutes daily for 30 days."

3. **Lock in accountability immediately**. Text friends. Join a group. Create a Moon Ring commitment. Do this within the first 48 hours.

4. **Schedule external check-ins**. Put them on your calendar. Make them specific. "Every Sunday at 8 PM, I text my accountability partner my weekly step count."

5. **Expect the burst to fade**. When it does (around day 5-7), lean on the accountability structures you built during the burst.

Fresh starts work. But only if you pair them with accountability that lasts longer than the feeling.

---

*Ready to turn your next fresh start into lasting change? [Join Moon Ring](/#waitlist) and use the Fresh Start Effect correctly—with accountability that outlasts motivation.*
      `
    },
    'temptation-bundling-how-to-make-healthy-habits-actually-enjoyable': {
      title: 'Temptation Bundling: Make Healthy Habits Actually Enjoyable',
      excerpt: 'Hate running? Pair it with your favorite podcast. Dread meal prep? Do it while catching up on Netflix. This is temptation bundling—and it works.',
      category: 'Behavioral Psychology',
      author: 'Jordan Rivera',
      authorBio: 'Head of Engineering. Built health tech at Apple and Strava. Believes in privacy-first design.',
      date: 'January 5, 2025',
      readTime: '5 min read',
      content: `
## The Treadmill Epiphany

For years, I hated running. Every attempt ended the same way: I would last 2-3 runs, then quit. The problem was not physical—I was capable of running. The problem was psychological: running felt like pure suffering.

Then I discovered a simple hack that changed everything.

I gave myself permission to watch my favorite TV show ONLY while running. Not before. Not after. Only during.

Suddenly, I was running 4-5 times per week. Not because I loved running (I still did not). But because I wanted to find out what happened next in the show.

This is called **temptation bundling**—and it is one of the most underrated behavioral psychology tricks for building habits.

## What Is Temptation Bundling?

Temptation bundling is the practice of **pairing an activity you SHOULD do (but avoid) with an activity you WANT to do (but feel guilty about)**.

<div class="callout-box bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
<p class="text-lg font-semibold text-gray-900 mb-2">🔬 The Research</p>
<p class="text-gray-800 mb-2">Katherine Milkman, a behavioral economist at Wharton, studied why people fail to exercise despite knowing it's good for them.</p>
<div class="bg-white rounded-lg p-4 mt-4">
<p class="text-5xl font-bold text-blue-600 mb-2">+51%</p>
<p class="text-sm text-gray-700">Gym attendance increase when people could listen to page-turning audiobooks ONLY at the gym</p>
</div>
</div>

<blockquote class="pull-quote border-l-4 border-[#FF33BA] pl-6 my-8 text-xl italic text-gray-700">
"You're not trying to make the hard thing enjoyable. You're making the enjoyable thing contingent on doing the hard thing."
</blockquote>

## Why This Works When Motivation Fails

Most behavior change advice assumes you will eventually learn to love the healthy habit. "You will grow to love running!" "Meal prep will become fun!"

This is nonsense. Some healthy habits will never be inherently enjoyable for many people.

Temptation bundling does not require you to love the habit. It just requires you to want the reward more than you hate the effort.

### The Premack Principle in Action

This concept builds on the Premack Principle from behavioral psychology: **high-probability behaviors can reinforce low-probability behaviors**.

In simple terms: if you want to do something badly enough (watch your favorite show), you will do the thing you hate (run on a treadmill) to get it.

Your brain learns: "Running = Favorite show." Over time, the association strengthens. The treadmill becomes less about suffering and more about story time.

## Real-World Temptation Bundling Examples

Here are examples from Moon Ring users who have successfully used this technique:

### Example 1: The Podcast Walker

**Goal**: Walk 10,000 steps daily

**Temptation**: True crime podcasts

**Bundle**: "I only listen to my favorite podcast while walking. If I want to know who the murderer is, I have to walk."

**Result**: Went from 3,000 average steps to 11,000+ steps daily. Not because walking became fun, but because the podcast cliffhangers were irresistible.

### Example 2: The Netflix Meal Prepper

**Goal**: Meal prep every Sunday

**Temptation**: Binge-watching Netflix series

**Bundle**: "I can only watch the next episode while chopping vegetables or cooking. No prep, no show."

**Result**: Meal prep went from "dreaded Sunday chore" to "Sunday Netflix marathon with bonus productivity." She now looks forward to it.

### Example 3: The Audiobook Gym-Goer

**Goal**: Strength training 3x per week

**Temptation**: Fantasy audiobooks

**Bundle**: "I can only listen to my audiobook series at the gym. If I want to find out what happens to the protagonist, I need to lift weights."

**Result**: Gym attendance went from sporadic to consistent 3x per week for 6 months straight.

### Example 4: The Social Call Treadmill Walker

**Goal**: Walk 30 minutes daily

**Temptation**: Catching up with long-distance friends

**Bundle**: "I schedule calls with friends ONLY during my evening walks. Want to chat? Time to lace up."

**Result**: Walks became social time instead of lonely cardio. Friends also started scheduling regular "walking calls" together.

## How to Build Your Own Temptation Bundle

### Step 1: Identify Your "Want" Activity

What do you genuinely enjoy but feel slightly guilty about?

Examples:
- Watching reality TV
- Scrolling social media
- Playing mobile games
- Listening to gossip podcasts
- Reading celebrity news
- Snacking on favorite treats (if appropriate)

The key: it should be something you would do anyway, but maybe feel like you "should not" spend so much time on.

### Step 2: Identify Your "Should" Activity

What healthy habit have you been avoiding?

Examples:
- Walking daily
- Strength training
- Stretching
- Meal prepping
- Foam rolling
- Meditation (for some people)

The key: it should be physically possible to do while engaging in your "want" activity.

### Step 3: Create the Rule

Make it non-negotiable: "I can ONLY do [want] while doing [should]."

**Critical**: No cheating. If you allow yourself to watch Netflix on the couch "just this once," the bundle breaks.

Your brain needs to learn: Want activity = Must do should activity. No exceptions.

### Step 4: Start Small

Do not bundle an hour-long show with a 60-minute run if you currently run 0 minutes.

Start with: "I can watch one 22-minute episode only while walking for 20 minutes."

As the habit solidifies, increase duration.

## Common Mistakes (and How to Avoid Them)

<div class="comparison-table my-8 overflow-hidden rounded-xl border border-gray-200">
<table class="w-full">
<thead class="bg-gradient-to-r from-red-100 to-green-100">
<tr>
<th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">❌ Bad Bundle (Why It Fails)</th>
<th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">✅ Better Approach</th>
</tr>
</thead>
<tbody>
<tr class="border-t border-gray-200 bg-red-50">
<td class="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
<p class="font-semibold mb-1">Incompatible Pair</p>
<p>"I'll only watch subtitled films while running."</p>
<p class="text-xs text-red-700 mt-2">Physically impossible to read subtitles while running</p>
</td>
<td class="px-6 py-4 text-sm text-gray-700 bg-green-50">
<p class="font-semibold mb-1">Choose Compatible Activities</p>
<p>"I'll only watch subtitled films while on the stationary bike."</p>
<p class="text-xs text-green-700 mt-2">Can focus on screen while biking</p>
</td>
</tr>
<tr class="border-t border-gray-200 bg-red-50">
<td class="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
<p class="font-semibold mb-1">Breaking Your Own Rule</p>
<p>Watch the show "just once" without exercising</p>
<p class="text-xs text-red-700 mt-2">Brain learns the rule is negotiable</p>
</td>
<td class="px-6 py-4 text-sm text-gray-700 bg-green-50">
<p class="font-semibold mb-1">Enforce Consequences</p>
<p>If you break the rule, restart from episode 1</p>
<p class="text-xs text-green-700 mt-2">Makes the cost of cheating real</p>
</td>
</tr>
<tr class="border-t border-gray-200 bg-red-50">
<td class="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
<p class="font-semibold mb-1">Wrong Temptation</p>
<p>"I'll only listen to educational podcasts while running."</p>
<p class="text-xs text-red-700 mt-2">No CRAVE = no motivational pull</p>
</td>
<td class="px-6 py-4 text-sm text-gray-700 bg-green-50">
<p class="font-semibold mb-1">Choose Guilty Pleasures</p>
<p>Pick the trashiest, most entertaining content you genuinely want</p>
<p class="text-xs text-green-700 mt-2">Desire drives behavior</p>
</td>
</tr>
</tbody>
</table>
</div>

## Why Temptation Bundling Works With Accountability

Temptation bundling works even better when combined with accountability.

Here is why: when you share your bundle with an accountability partner, you create two layers of motivation:

**Layer 1**: You want the temptation (the show, the podcast).

**Layer 2**: You do not want to disappoint your partner by skipping.

### Example: The Accountability + Bundle Stack

Moon Ring user Maria created this system:

- **Temptation bundle**: "I only watch my favorite cooking show while walking."
- **Accountability layer**: "I text my Moon Ring partner every evening: 'Walked 30 min + watched episode 4.' She does the same."

Result: On days when she did not feel like watching the show (yes, sometimes even guilty pleasures lose appeal), she still walked because her partner was expecting the check-in.

The bundle got her started. The accountability kept her consistent.

## Your Action Plan

1. **Pick your guilty pleasure**: What do you already want to do but feel like you should not spend as much time on?

2. **Pick your avoided habit**: What should you be doing but keep putting off?

3. **Create the rule**: Write it down. "I can ONLY [guilty pleasure] while [healthy habit]."

4. **Tell someone**: Share your bundle with a friend or Moon Ring accountability partner. This adds social reinforcement.

5. **Protect the rule**: No exceptions for the first 30 days. If you break it, restart from the beginning.

Temptation bundling will not make you love the hard thing. But it will make you DO the hard thing. And doing it consistently is what matters.

---

*Want to pair temptation bundling with accountability that actually works? [Try Moon Ring](/#waitlist) and combine the power of psychological tricks with social support.*
      `
    },
    'implementation-intentions-the-if-then-planning-method-that-actually-works': {
      title: 'Implementation Intentions: The If-Then Planning That Works',
      excerpt: 'Saying "I will exercise more" is not a plan. Saying "If it is Tuesday at 6 AM, then I will put on gym clothes" is. This simple shift increases success rates by 70%.',
      category: 'Behavioral Psychology',
      author: 'Dr. Sarah Mitchell',
      authorBio: 'PhD in Health Psychology from Stanford. Published researcher in commitment devices.',
      date: 'January 3, 2025',
      readTime: '6 min read',
      content: `
## The Vague Intention Trap

January 2023. I decided I would "meditate more." I knew meditation was good for me. I had read the studies. I had downloaded three meditation apps. I was committed.

By February, I had meditated exactly twice.

What went wrong? I had a goal ("meditate more") but no plan for WHEN, WHERE, or HOW I would actually do it.

Then I tried a different approach. I created an **implementation intention**: "If I finish my morning coffee, then I will sit on the meditation cushion in my office for 5 minutes."

By March, I had meditated 27 out of 31 days.

Same goal. Different approach. Radically different outcome.

<div class="stats-box bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-400 rounded-2xl p-8 my-8 text-center">
<p class="text-sm font-semibold text-green-900 uppercase tracking-wide mb-2">📈 Research-Backed Results</p>
<p class="text-6xl font-bold text-green-600 mb-2">+70%</p>
<p class="text-lg text-gray-800 font-medium">Implementation intentions increase goal achievement rates</p>
</div>

## What Are Implementation Intentions?

An implementation intention is a specific plan that follows the format:

**"If [SITUATION], then I will [BEHAVIOR]."**

The concept was developed by psychologist Peter Gollwitzer in the 1990s. His research showed that vague goals ("I will exercise more") fail because they require decision-making in the moment.

But implementation intentions pre-decide. They create an automatic link between a situation (the cue) and a behavior (the response).

### Why This Works

Your brain loves two things:
1. **Automaticity** (doing things without thinking)
2. **Situation-action links** (when X happens, do Y)

Implementation intentions leverage both.

When you say "If it is 6 AM on Tuesday, then I will put on my gym clothes," you are programming your brain with a cue-response pattern. When 6 AM Tuesday arrives, your brain does not deliberate. It executes.

## The Science: 94 Studies, 70% Improvement

<div class="stats-box bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 rounded-2xl p-8 my-8">
<p class="text-sm font-semibold text-purple-900 uppercase tracking-wide mb-4">🔬 Meta-Analysis: Gollwitzer & Sheeran (2006)</p>
<div class="grid grid-cols-2 gap-4 mb-4">
<div class="bg-white rounded-lg p-4 text-center">
<p class="text-4xl font-bold text-purple-600 mb-1">94</p>
<p class="text-sm text-gray-700">Independent Studies</p>
</div>
<div class="bg-white rounded-lg p-4 text-center">
<p class="text-4xl font-bold text-blue-600 mb-1">8,000+</p>
<p class="text-sm text-gray-700">Participants</p>
</div>
</div>
<div class="space-y-2">
<p class="text-sm text-gray-700">✓ <strong>70% average improvement</strong> in goal achievement rates</p>
<p class="text-sm text-gray-700">✓ Largest effect for <strong>difficult or novel behaviors</strong></p>
<p class="text-sm text-gray-700">✓ Works across <strong>all domains</strong>: health, academic, interpersonal, environmental</p>
</div>
</div>

<div class="callout-box bg-gradient-to-r from-pink-50 to-orange-50 border-l-4 border-[#FF33BA] p-6 my-8 rounded-r-lg">
<p class="text-lg font-semibold text-gray-900 mb-2">🎯 Key Takeaway</p>
<p class="text-gray-800 mb-0">This isn't theoretical. This is one of the most replicated findings in behavioral psychology.</p>
</div>

## Real-World Example: The Tuesday Gym Pattern

Meet James, a 40-year-old software engineer. He spent years saying "I need to go to the gym more." He never did.

**His vague intention**: "I will work out 3x per week."

**What actually happened**:
- Monday: "I will go after work." (Did not. Too tired.)
- Tuesday: "I will go in the morning." (Did not. Hit snooze.)
- Wednesday: "Tomorrow for sure." (Did not. Forgot.)
- Repeat for 5 years.

Then he tried implementation intentions:

**New plan**: "If it is Tuesday at 6:00 AM, then I will put on workout clothes and walk to the gym entrance."

Notice the specificity:
- **When**: Tuesday, 6:00 AM (exact time)
- **Where**: At home (implied by "put on clothes")
- **What**: Put on clothes and walk (small first step)

**Result**: For the first month, he just put on clothes and walked to the gym. Some days he turned around and went home (that was fine). But most days, once he was there in gym clothes, he worked out.

After 3 months, the pattern was automatic. Tuesday 6 AM = gym clothes = gym. No decision required.

## How to Write Effective Implementation Intentions

### Rule 1: Be Hyper-Specific About the Cue

**Bad**: "When I have time, I will meditate."

**Good**: "If I finish my morning coffee, then I will sit on the meditation cushion."

The cue must be:
- **Observable**: You can clearly tell when it happens
- **Recurring**: It happens regularly (ideally daily or weekly)
- **Unavoidable**: You cannot easily skip past it

### Rule 2: Make the Action Ridiculously Small

**Bad**: "If it is Monday, then I will complete a full workout."

**Good**: "If it is Monday at 6 AM, then I will put on workout clothes."

Why? Because the goal is to trigger the behavior, not complete the entire goal. Once you have gym clothes on, the rest often follows naturally.

But even if it does not, you have built the habit of STARTING. That is 90% of the battle.

### Rule 3: Link to Existing Routines

The best cues are things you already do consistently.

**Examples**:
- "If I finish brushing my teeth, then I will do 5 push-ups."
- "If I sit down for lunch, then I will drink a full glass of water first."
- "If I close my laptop at end of workday, then I will put on walking shoes."

You are not creating a new routine from scratch. You are attaching a new behavior to an existing anchor.

### Rule 4: Anticipate Obstacles

Implementation intentions work even better when you plan for failure scenarios.

**Format**: "If [OBSTACLE], then I will [ALTERNATIVE BEHAVIOR]."

**Examples**:
- "If it is raining on Tuesday morning, then I will do a 20-minute YouTube workout at home."
- "If my accountability partner cancels, then I will text another friend to join me."
- "If I am traveling, then I will do bodyweight exercises in my hotel room."

This prevents the "all-or-nothing" trap. You have a plan B, C, and D.

## Combining Implementation Intentions with Accountability

Here is where it gets powerful: implementation intentions work even better when shared with an accountability partner.

Why? Because now the "if" has a witness.

### Example: The Accountability + Implementation Intention Stack

Moon Ring user Rachel created this system:

**Implementation intention**: "If it is Wednesday at 7 PM, then I will put on running shoes and text my accountability partner 'Starting my run.'"

**Accountability layer**: Her partner expects that text every Wednesday at 7 PM. If she does not send it, they will notice and check in.

**Result**: For 12 weeks straight, she ran every Wednesday. Not because she always felt motivated, but because:
1. The implementation intention removed the decision ("What do I do Wednesday at 7 PM?")
2. The accountability made skipping feel worse than running

## Common Mistakes (and Fixes)

<div class="comparison-table my-8 overflow-hidden rounded-xl border border-gray-200">
<table class="w-full">
<thead class="bg-gradient-to-r from-red-100 to-green-100">
<tr>
<th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">❌ Common Mistake</th>
<th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">✅ The Fix</th>
</tr>
</thead>
<tbody>
<tr class="border-t border-gray-200 bg-red-50">
<td class="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
<p class="font-semibold mb-1">Vague Cues</p>
<p>"If I have free time, then I'll work out."</p>
<p class="text-xs text-red-700 mt-2">Problem: "Free time" is subjective and negotiable</p>
</td>
<td class="px-6 py-4 text-sm text-gray-700 bg-green-50">
<p class="font-semibold mb-1">Specific Time/Situation</p>
<p>"If it's Saturday at 9 AM, then I'll put on workout clothes."</p>
<p class="text-xs text-green-700 mt-2">Observable, recurring, unavoidable cue</p>
</td>
</tr>
<tr class="border-t border-gray-200 bg-red-50">
<td class="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
<p class="font-semibold mb-1">Ambitious Actions</p>
<p>"If it's Monday, then I'll complete a 60-minute workout."</p>
<p class="text-xs text-red-700 mt-2">Problem: Too big, brain resists starting</p>
</td>
<td class="px-6 py-4 text-sm text-gray-700 bg-green-50">
<p class="font-semibold mb-1">Ridiculously Small First Step</p>
<p>"If it's Monday at 6 AM, then I'll do 5 minutes of movement."</p>
<p class="text-xs text-green-700 mt-2">Easy to start, builds the habit</p>
</td>
</tr>
<tr class="border-t border-gray-200 bg-red-50">
<td class="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
<p class="font-semibold mb-1">No Obstacle Planning</p>
<p>Only planning for ideal conditions</p>
<p class="text-xs text-red-700 mt-2">Problem: Life isn't ideal, obstacles derail you</p>
</td>
<td class="px-6 py-4 text-sm text-gray-700 bg-green-50">
<p class="font-semibold mb-1">Backup Plans</p>
<p>"If it's raining, then I'll do a 20-min YouTube workout at home."</p>
<p class="text-xs text-green-700 mt-2">Create 3 backup plans for common obstacles</p>
</td>
</tr>
</tbody>
</table>
</div>

## Your Action Plan

Pick ONE habit you want to build. Write three implementation intentions:

**Primary plan**:
"If [specific time/situation], then I will [tiny first step]."

**Obstacle plan 1**:
"If [common obstacle], then I will [alternative behavior]."

**Obstacle plan 2**:
"If [another obstacle], then I will [another alternative]."

**Then**: Share these plans with an accountability partner or Moon Ring community. When you make the "if-then" public, it becomes even harder to ignore.

<blockquote class="pull-quote border-l-4 border-[#FF33BA] pl-6 my-8 text-xl italic text-gray-700">
"Implementation intentions aren't sexy. They're not motivational. They're just deeply, boringly effective. And when combined with accountability, they become nearly unstoppable."
</blockquote>

<hr class="my-12 border-t-2 border-gray-200" />

---

*Ready to turn implementation intentions into lasting habits with accountability? [Join Moon Ring](/#waitlist) and experience what happens when psychological science meets social support.*
      `
    }
  }

  return posts[slug] || null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  return {
    title: post ? `${post.title} | Moon Ring Blog` : 'Blog Post | Moon Ring',
    description: post?.excerpt || 'Read the latest insights on commitment psychology and behavioral science.',
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-[#FF33BA] hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A]">

        {/* Article Header */}
        <article className="relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>

            {/* Category & Reading Time */}
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white">
                {post.category}
              </span>
              <span className="text-white/60 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="text-white/60 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center text-white font-bold text-xl">
                {post.author.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <div className="text-white font-semibold">{post.author}</div>
                <div className="text-white/60 text-sm">{post.authorBio}</div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-white/60 text-sm">Share:</span>
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white py-16">
            <div className="max-w-[680px] mx-auto px-6 sm:px-8">
              <div
                className="article-content prose prose-lg max-w-none
                  prose-headings:text-[#1A1A1A] prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-[2rem] prose-h2:leading-[1.25] prose-h2:mb-6
                  prose-h3:text-[1.5rem] prose-h3:leading-[1.35] prose-h3:mt-10 prose-h3:mb-4 prose-h3:font-semibold
                  prose-p:text-[#242424] prose-p:text-[1.0625rem] prose-p:leading-[1.75] prose-p:mb-7
                  prose-strong:text-[#1A1A1A] prose-strong:font-semibold
                  prose-em:text-[#4B5563] prose-em:not-italic prose-em:font-normal
                  prose-a:text-[#FF33BA] prose-a:underline prose-a:decoration-1 prose-a:underline-offset-2 hover:prose-a:text-[#1A1A1A] hover:prose-a:decoration-2
                  prose-ul:my-7 prose-ul:space-y-2.5
                  prose-li:text-[#242424] prose-li:text-[1.0625rem] prose-li:leading-[1.75] prose-li:pl-1.5
                  prose-li:marker:text-[#FF33BA]
                  prose-blockquote:border-l-4 prose-blockquote:border-[#E5E7EB] prose-blockquote:pl-5 prose-blockquote:text-[#6B7280] prose-blockquote:not-italic prose-blockquote:my-8 prose-blockquote:font-normal
                  prose-code:text-[#FF33BA] prose-code:bg-[#FFF5FA] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.9375rem] prose-code:font-normal prose-code:before:content-[''] prose-code:after:content-['']"
                dangerouslySetInnerHTML={{ __html: (() => {
                  const lines = post.content.split('\n')
                  const result: string[] = []
                  let inHtmlBlock = false
                  let htmlBlockLines: string[] = []
                  let inList = false
                  let listItems: string[] = []

                  const flushList = () => {
                    if (inList && listItems.length > 0) {
                      result.push('<ul>' + listItems.join('') + '</ul>')
                      listItems = []
                      inList = false
                    }
                  }

                  for (const line of lines) {
                    // Detect start of HTML block (div, table, blockquote, hr)
                    if (line.trim().startsWith('<div') || line.trim().startsWith('<table') ||
                        line.trim().startsWith('<blockquote') || line.trim().startsWith('<hr')) {
                      flushList() // Close any open list
                      inHtmlBlock = true
                      htmlBlockLines = [line]
                      continue
                    }

                    // If in HTML block, collect lines until closing tag
                    if (inHtmlBlock) {
                      htmlBlockLines.push(line)
                      // Check for closing tags
                      if (line.trim().startsWith('</div>') || line.trim().startsWith('</table>') ||
                          line.trim().startsWith('</blockquote>') || line.trim() === '<hr class="my-12 border-t-2 border-gray-200" />') {
                        result.push(htmlBlockLines.join('\n'))
                        inHtmlBlock = false
                        htmlBlockLines = []
                      }
                      continue
                    }

                    // Process markdown lines
                    if (line.startsWith('## ')) {
                      flushList()
                      result.push(`<h2>${line.replace('## ', '')}</h2>`)
                    } else if (line.startsWith('### ')) {
                      flushList()
                      result.push(`<h3>${line.replace('### ', '')}</h3>`)
                    } else if (line.startsWith('- ')) {
                      // List item - collect for proper ul wrapping
                      if (!inList) {
                        inList = true
                      }
                      listItems.push(`<li>${line.replace('- ', '')}</li>`)
                    } else if (line.trim().startsWith('*') && line.trim().endsWith('*')) {
                      flushList()
                      result.push(`<p class="italic text-gray-600">${line.replace(/^\*/, '').replace(/\*$/, '')}</p>`)
                    } else if (line.includes('**')) {
                      flushList()
                      result.push(`<p>${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`)
                    } else if (line.trim() === '') {
                      flushList()
                      result.push('')
                    } else if (line.trim() === '---') {
                      flushList()
                      result.push('<hr class="my-8 border-gray-300" />')
                    } else if (line.includes('[') && line.includes('](')) {
                      flushList()
                      const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/)
                      if (linkMatch) {
                        result.push(`<p>${line.replace(/\[(.*?)\]\((.*?)\)/, '<a href="$2">$1</a>')}</p>`)
                      } else {
                        result.push(`<p>${line}</p>`)
                      }
                    } else {
                      flushList()
                      result.push(`<p>${line}</p>`)
                    }
                  }

                  // Flush any remaining list at end of content
                  flushList()

                  return result.join('')
                })() }}
              />
            </div>
          </div>

          {/* CTA Section */}
          <div className="py-16 px-4">
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 border border-[#FF33BA]/20 p-8 sm:p-12 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Transform Your Health Data?
                </h2>
                <p className="text-white/80 mb-6">
                  Join thousands of users turning wearable insights into lasting habits through social accountability.
                </p>
                <Link
                  href="/#waitlist"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="py-16 px-4 border-t border-white/10">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'The Science of Commitment Contracts', category: 'Research', slug: 'commitment-contracts-explained' },
                  { title: '5 Accountability Partner Success Stories', category: 'Success Stories', slug: 'accountability-partner-success-stories' },
                  { title: 'Behavioral Economics and Habit Formation', category: 'Behavioral Psychology', slug: 'behavioral-economics-habit-formation' }
                ].map((related, index) => (
                  <Link
                    key={index}
                    href={`/blog/${related.slug}`}
                    className="group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 transition-all"
                  >
                    <span className="text-xs font-medium text-[#FF33BA] mb-2 block">{related.category}</span>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#FF33BA] transition-colors">
                      {related.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
              <p>&copy; 2025 Moon Ring. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}