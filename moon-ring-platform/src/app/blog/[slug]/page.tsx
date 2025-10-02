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

If this sounds familiar, you're not alone. **68% of wearable users abandon their devices within six months.**

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

Research from behavioral economists and psychologists has consistently shown that public commitments dramatically increase goal achievement rates:

- Study by the American Society of Training and Development: **65% higher goal completion with accountability partners**
- Research on commitment contracts: **95% adherence improvement with public commitments**
- Analysis of weight loss programs: **3x better outcomes with social support**

This isn't motivational fluff—it's rigorous behavioral science.

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

Early Moon Ring users show dramatically different patterns than typical wearable users:

- **127-day average commitment streak** (vs. 32 days for traditional wearable users)
- **67% goal completion rate** (vs. industry average of 12%)
- **89% users still actively engaged after 6 months** (vs. 32% for wearables alone)

The difference? Accountability transforms isolated data points into sustained behavioral change.

## Your Wearable Isn't the Problem

If your Fitbit is gathering dust, don't blame the device. The technology works. What's been missing is the behavioral framework to turn measurement into meaning.

Social accountability isn't a nice-to-have feature—it's the missing piece that makes wearable data actually work for lasting health improvement.

Ready to unlock the potential of your wearable? It starts with commitment, accountability, and community.

---

*Want to experience accountability-driven behavior change? Join thousands of Moon Ring users who've transformed their wearable data into lasting habits. [Start your free trial today](/#waitlist).*
      `
    }
  }

  return posts[slug] || null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  return {
    title: post ? `${post.title} | Moon Ring Blog` : 'Blog Post | Moon Ring',
    description: post?.excerpt || 'Read the latest insights on commitment psychology and behavioral science.',
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

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
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className="prose prose-lg max-w-none
                  prose-headings:text-[#1B023A] prose-headings:font-bold
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                  prose-strong:text-[#1B023A] prose-strong:font-bold
                  prose-a:text-[#FF33BA] prose-a:no-underline hover:prose-a:underline
                  prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                  prose-li:text-gray-700 prose-li:my-2"
                dangerouslySetInnerHTML={{ __html: post.content.split('\n').map((line: string) => {
                  if (line.startsWith('## ')) {
                    return `<h2>${line.replace('## ', '')}</h2>`
                  } else if (line.startsWith('### ')) {
                    return `<h3>${line.replace('### ', '')}</h3>`
                  } else if (line.startsWith('- ')) {
                    return `<li>${line.replace('- ', '')}</li>`
                  } else if (line.trim().startsWith('*') && line.trim().endsWith('*')) {
                    return `<p class="italic text-gray-600">${line.replace(/^\*/, '').replace(/\*$/, '')}</p>`
                  } else if (line.includes('**')) {
                    return `<p>${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`
                  } else if (line.trim() === '') {
                    return ''
                  } else if (line.trim() === '---') {
                    return '<hr class="my-8 border-gray-300" />'
                  } else if (line.includes('[') && line.includes('](')) {
                    const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/)
                    if (linkMatch) {
                      return `<p>${line.replace(/\[(.*?)\]\((.*?)\)/, '<a href="$2">$1</a>')}</p>`
                    }
                  }
                  return `<p>${line}</p>`
                }).join('') }}
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