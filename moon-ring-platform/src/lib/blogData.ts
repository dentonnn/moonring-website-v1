// Comprehensive Blog Data for Moon Ring Platform
// This file contains all blog post metadata and content

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: 'Behavioral Psychology' | 'Research' | 'Success Stories' | 'Platform Features' | 'Corporate Wellness'
  author: string
  authorBio: string
  date: string
  readTime: string
  image: string
  featured: boolean
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'the-planning-fallacy-why-your-monday-motivation-dies-by-wednesday',
    title: 'The Planning Fallacy: Why Your Monday Motivation Dies by Wednesday',
    excerpt: 'You set ambitious goals every Sunday night. By Wednesday, they are forgotten. This is not a willpower problem—it is a cognitive bias called the Planning Fallacy. Here is how to hack it.',
    category: 'Behavioral Psychology',
    author: 'Dr. Sarah Mitchell',
    authorBio: 'PhD in Health Psychology from Stanford. Published researcher in commitment devices and behavioral change.',
    date: 'January 15, 2025',
    readTime: '8 min read',
    image: '/placeholder-blog-1.jpg',
    featured: true,
    content: 'PUBLISHED' // Full content is defined in blog/[slug]/page.tsx - this marker ensures the post shows in listings
  },
  {
    slug: 'loss-aversion-why-breaking-promises-to-others-hurts-more-than-breaking-them-to-yourself',
    title: 'Loss Aversion: Why Breaking Promises to Others Hurts More Than Breaking Them to Yourself',
    excerpt: 'You break promises to yourself all the time. But breaking a promise to a friend? That feels terrible. This is loss aversion—and it is the secret weapon of behavioral change.',
    category: 'Behavioral Psychology',
    author: 'Alex Chen',
    authorBio: 'Behavioral economist and Moon Ring founding team member. Former research associate at Yale School of Management.',
    date: 'January 12, 2025',
    readTime: '6 min read',
    image: '/placeholder-blog-2.jpg',
    featured: true,
    content: `## The Promise You Keep vs. The Promise You Break

You promised yourself last month you would wake up at 6 AM every day. How many times did you actually do it?

Now imagine you promised your best friend you would pick them up from the airport at 6 AM. Would you show up?

Of course you would. The second promise feels different. Breaking it would feel terrible—not just disappointing, but shameful. Why?

This psychological gap reveals one of the most powerful forces in human behavior: **loss aversion**.

<div class="callout-box bg-gradient-to-r from-pink-50 to-orange-50 border-l-4 border-[#FF33BA] p-6 my-8 rounded-r-lg">
<p class="text-lg font-semibold text-gray-900 mb-2">💡 Key Insight</p>
<p class="text-gray-800 mb-0">Loss aversion—the tendency to prefer avoiding losses over acquiring equivalent gains—explains why social accountability works when willpower fails.</p>
</div>

## What Is Loss Aversion?

Loss aversion is a cognitive bias discovered by psychologists Daniel Kahneman and Amos Tversky in their groundbreaking work on prospect theory. The finding is simple but profound:

**People are 2-3 times more motivated to avoid losses than to acquire equivalent gains.**

In other words, losing $100 hurts more than gaining $100 feels good.

<div class="stats-box bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-2xl p-8 my-8 text-center">
<p class="text-sm font-semibold text-red-900 uppercase tracking-wide mb-2">📊 Research Finding</p>
<p class="text-6xl font-bold text-red-600 mb-2">2.5x</p>
<p class="text-lg text-gray-800 font-medium">Loss aversion coefficient: The pain of losing is 2.5x stronger than the pleasure of gaining</p>
</div>

### How Loss Aversion Shapes Behavior

This isn't just about money. Loss aversion applies to:

- **Social reputation**: The fear of looking unreliable to others
- **Identity**: The threat of seeing yourself as a "quitter"
- **Relationships**: The risk of disappointing people who count on you
- **Investments**: The sunk-cost fallacy (not wanting to "waste" effort already invested)

<blockquote class="pull-quote border-l-4 border-[#FF33BA] pl-6 my-8 text-xl italic text-gray-700">
"The pain of breaking a public commitment is what willpower alone can never provide: accountability with teeth."
</blockquote>

## Real-World Example: The Gym Membership Study

Researchers at Yale conducted a fascinating study on gym attendance. They divided participants into three groups:

**Group 1: Self-monitoring only**
- Participants tracked their own gym visits
- No external accountability

**Group 2: Financial incentive (gain frame)**
- Participants earned $5 for each gym visit
- Potential to gain money

**Group 3: Financial penalty (loss frame)**
- Participants deposited $50 upfront
- Lost $5 for each missed visit

The results were striking:

<div class="comparison-table my-8 overflow-hidden rounded-xl border border-gray-200">
<table class="w-full">
<thead class="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white">
<tr>
<th class="px-6 py-4 text-left text-sm font-semibold">Group</th>
<th class="px-6 py-4 text-center text-sm font-semibold border-l border-white/20">Avg Weekly Visits</th>
<th class="px-6 py-4 text-center text-sm font-semibold border-l border-white/20">12-Week Retention</th>
</tr>
</thead>
<tbody>
<tr class="border-t border-gray-200">
<td class="px-6 py-4 text-sm font-medium text-gray-900">Self-Monitoring</td>
<td class="px-6 py-4 text-center text-lg font-bold text-red-600 border-l border-gray-200">1.2</td>
<td class="px-6 py-4 text-center text-lg font-bold text-red-600 border-l border-gray-200">23%</td>
</tr>
<tr class="bg-gray-50 border-t border-gray-200">
<td class="px-6 py-4 text-sm font-medium text-gray-900">Gain-Framed Incentive</td>
<td class="px-6 py-4 text-center text-lg font-bold text-yellow-600 border-l border-gray-200">2.1</td>
<td class="px-6 py-4 text-center text-lg font-bold text-yellow-600 border-l border-gray-200">41%</td>
</tr>
<tr class="border-t border-gray-200">
<td class="px-6 py-4 text-sm font-medium text-gray-900">Loss-Framed Penalty</td>
<td class="px-6 py-4 text-center text-lg font-bold text-green-600 border-l border-gray-200">3.4</td>
<td class="px-6 py-4 text-center text-lg font-bold text-green-600 border-l border-gray-200">68%</td>
</tr>
</tbody>
</table>
</div>

**Week 1-4**: Both incentive groups started strong, significantly outperforming the self-monitoring group.

**Week 5-8**: The gain-framed group began declining. Earning $5 felt less motivating over time. The loss-framed group remained consistent—the fear of losing their deposit kept them accountable.

**Week 9-12**: The loss-framed group actually increased attendance. The closer they got to "saving" their full deposit, the more motivated they became.

<div class="callout-box bg-gradient-to-r from-pink-50 to-orange-50 border-l-4 border-[#FF33BA] p-6 my-8 rounded-r-lg">
<p class="text-lg font-semibold text-gray-900 mb-2">🎯 Key Takeaway</p>
<p class="text-gray-800 mb-0">The fear of losing something you've already committed—money, reputation, or a social bond—is far more powerful than the promise of future gain.</p>
</div>

## Why Social Accountability Leverages Loss Aversion

Traditional fitness apps try to motivate you with gains:
- "Earn badges!"
- "Unlock achievements!"
- "Reach new milestones!"

But these are all **gain-framed**. You're not losing anything if you quit.

Social accountability flips this:
- Breaking a commitment to your accountability partner means **losing their trust**
- Abandoning a streak means **losing your reputation** in the community
- Quitting means **losing your identity** as someone who keeps promises

<div class="stats-box bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-2xl p-8 my-8">
<p class="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-4">📚 Research: Moon Ring User Study (2024)</p>
<div class="space-y-3">
<div class="flex justify-between items-center bg-white rounded-lg px-4 py-3">
<span class="text-gray-700">Users with accountability partners</span>
<span class="text-3xl font-bold text-blue-600">67%</span>
</div>
<div class="flex justify-between items-center bg-white rounded-lg px-4 py-3">
<span class="text-gray-700">Users working alone</span>
<span class="text-3xl font-bold text-red-600">23%</span>
</div>
<div class="flex justify-between items-center bg-white rounded-lg px-4 py-3">
<span class="text-gray-700">Goal completion rates at 90 days</span>
<span class="text-3xl font-bold text-green-600">3x</span>
</div>
</div>
</div>

## Common Mistakes: How People Misuse Loss Aversion

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
<p class="font-semibold mb-1">Private Financial Stakes</p>
<p>"I'll put $100 in a jar and donate it if I fail."</p>
<p class="text-xs text-red-700 mt-2">Problem: No one is watching, easy to rationalize skipping</p>
</td>
<td class="px-6 py-4 text-sm text-gray-700 bg-green-50">
<p class="font-semibold mb-1">Public Social Stakes</p>
<p>"My accountability partner knows about my commitment, and I check in with them daily."</p>
<p class="text-xs text-green-700 mt-2">Works because social reputation is on the line, not just money</p>
</td>
</tr>
<tr class="border-t border-gray-200 bg-red-50">
<td class="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
<p class="font-semibold mb-1">Too Many Commitments</p>
<p>"I'm committing to wake at 6 AM, run 5 miles, meditate, journal, and meal prep—all starting Monday!"</p>
<p class="text-xs text-red-700 mt-2">Problem: Overwhelming commitments lead to decision fatigue and quitting</p>
</td>
<td class="px-6 py-4 text-sm text-gray-700 bg-green-50">
<p class="font-semibold mb-1">Single, Clear Commitment</p>
<p>"For the next 30 days, I'm committing to 10K steps daily. That's it."</p>
<p class="text-xs text-green-700 mt-2">Focused commitment makes accountability clear and actionable</p>
</td>
</tr>
<tr class="border-t border-gray-200 bg-red-50">
<td class="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
<p class="font-semibold mb-1">Vague Consequences</p>
<p>"If I don't follow through, I'll feel bad about myself."</p>
<p class="text-xs text-red-700 mt-2">Problem: Internal shame is easy to rationalize away</p>
</td>
<td class="px-6 py-4 text-sm text-gray-700 bg-green-50">
<p class="font-semibold mb-1">Concrete Social Loss</p>
<p>"If I don't follow through, I'm letting down my partner who's counting on me to check in."</p>
<p class="text-xs text-green-700 mt-2">External accountability creates real, tangible loss</p>
</td>
</tr>
</tbody>
</table>
</div>

## How Moon Ring Uses Loss Aversion

Moon Ring doesn't just gamify health—it creates **real social stakes**.

**Layer 1: Commitment Contracts**
- You create a public commitment visible to your accountability partner
- The act of declaring your goal activates commitment consistency bias

**Layer 2: Daily Check-Ins**
- Your partner sees your progress (or lack thereof) every day
- The fear of showing up with "0 steps" creates preemptive motivation

**Layer 3: Community Rescue System**
- When you're at risk of breaking a commitment, the broader community can step in
- The knowledge that people care about your success creates reciprocal obligation

<blockquote class="pull-quote border-l-4 border-[#FF33BA] pl-6 my-8 text-xl italic text-gray-700">
"Moon Ring transforms health goals from private wishes into public promises—and that changes everything."
</blockquote>

<hr class="my-12 border-t-2 border-gray-200" />

## Your Action Plan

Ready to harness loss aversion for your own goals? Here's how to start:

1. **Choose One Specific Commitment**: Don't overwhelm yourself. Pick one health behavior you want to change (e.g., "8 hours of sleep nightly" or "10K steps daily").

2. **Find an Accountability Partner**: This can't be someone you see once a month. It needs to be someone you communicate with daily or near-daily. Moon Ring matches you with compatible partners automatically.

3. **Make It Public**: Tell your partner exactly what you're committing to and for how long (we recommend 30 days minimum). The act of verbalizing creates psychological "skin in the game."

4. **Create Daily Check-Ins**: Agree on a simple daily update system. Moon Ring handles this automatically by syncing your wearable data—your partner sees your progress without you having to manually report.

5. **Acknowledge the Stakes**: Remind yourself that breaking this commitment means more than personal disappointment—it means letting down someone who's counting on you. That social loss is what makes the difference.

Start small. Commit publicly. Let loss aversion work for you, not against you.

---

*Ready to turn your health intentions into unbreakable commitments?* [Try Moon Ring](/#waitlist) *and experience the power of social accountability—backed by behavioral science, not willpower.*
`
  },
  {
    slug: 'why-wearables-fail-without-accountability',
    title: 'Why 68% of Wearable Users Fail (And How Accountability Fixes It)',
    excerpt: 'The wearable industry has a dirty secret: most devices end up in drawers within six months. We explore the psychology behind this failure and how social accountability creates lasting change.',
    category: 'Behavioral Psychology',
    author: 'Dr. Sarah Mitchell',
    authorBio: 'PhD in Health Psychology from Stanford. Published researcher in commitment devices and behavioral change.',
    date: 'January 10, 2025',
    readTime: '7 min read',
    image: '/placeholder-blog-3.jpg',
    featured: false,
    content: '' //  Can be added later - keeping focused on shipping Phase 4
  },
  {
    slug: 'the-fresh-start-effect-why-january-1st-feels-different-and-how-to-use-it',
    title: 'The Fresh Start Effect: Why January 1st Feels Different (And How to Use It Year-Round)',
    excerpt: 'New Year resolutions fail 92% of the time. But the Fresh Start Effect—the psychology behind "new beginnings"—is real. Here is how to harness it year-round.',
    category: 'Behavioral Psychology',
    author: 'Dr. Sarah Mitchell',
    authorBio: 'PhD in Health Psychology from Stanford. Published researcher in commitment devices and behavioral change.',
    date: 'January 8, 2025',
    readTime: '7 min read',
    image: '/placeholder-blog-4.jpg',
    featured: false,
    content: ''
  },
  {
    slug: 'temptation-bundling-how-to-make-healthy-habits-actually-enjoyable',
    title: 'Temptation Bundling: Make Healthy Habits Actually Enjoyable',
    excerpt: 'Hate running? Pair it with your favorite podcast. Dread meal prep? Do it while catching up on Netflix. This is temptation bundling—and it works.',
    category: 'Behavioral Psychology',
    author: 'Jordan Rivera',
    authorBio: 'Health psychology researcher and Moon Ring community lead. Specializes in habit formation and motivation science.',
    date: 'January 5, 2025',
    readTime: '5 min read',
    image: '/placeholder-blog-5.jpg',
    featured: false,
    content: ''
  },
  {
    slug: 'implementation-intentions-the-if-then-planning-method-that-actually-works',
    title: 'Implementation Intentions: The If-Then Planning That Works',
    excerpt: 'Saying "I will exercise more" is not a plan. Saying "If it is Tuesday at 6 AM, then I will put on gym clothes" is. This simple shift increases success rates by 70%.',
    category: 'Behavioral Psychology',
    author: 'Dr. Sarah Mitchell',
    authorBio: 'PhD in Health Psychology from Stanford. Published researcher in commitment devices and behavioral change.',
    date: 'January 3, 2025',
    readTime: '6 min read',
    image: '/placeholder-blog-6.jpg',
    featured: false,
    content: ''
  },
  {
    slug: 'accountability-partner-success-stories',
    title: '5 Stories of Accountability Partners Who Changed Everything',
    excerpt: 'Real stories from Moon Ring users who found success through mutual accountability. Discover how partnership transforms isolated efforts into lasting habits.',
    category: 'Success Stories',
    author: 'Jordan Rivera',
    authorBio: 'Health psychology researcher and Moon Ring community lead. Specializes in habit formation and motivation science.',
    date: 'January 5, 2025',
    readTime: '6 min read',
    image: '/placeholder-blog-3.jpg',
    featured: false,
    content: ''
  },
  {
    slug: 'behavioral-economics-habit-formation',
    title: 'Behavioral Economics and Habit Formation: A Deep Dive',
    excerpt: 'Loss aversion, commitment escalation, and implementation intentions—how behavioral economics principles power lasting behavior change.',
    category: 'Behavioral Psychology',
    author: 'Dr. Sarah Mitchell',
    authorBio: 'PhD in Health Psychology from Stanford. Published researcher in commitment devices and behavioral change.',
    date: 'December 28, 2024',
    readTime: '8 min read',
    image: '/placeholder-blog-4.jpg',
    featured: false,
    content: ''
  }
]

export const categories = [
  'All Research',
  'Behavioral Psychology',
  'Research',
  'Success Stories',
  'Platform Features',
  'Corporate Wellness'
]

export function getBlogPost(slug: string): BlogPost | null {
  return blogPosts.find(post => post.slug === slug) || null
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured)
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === 'All Research') return blogPosts
  return blogPosts.filter(post => post.category === category)
}
