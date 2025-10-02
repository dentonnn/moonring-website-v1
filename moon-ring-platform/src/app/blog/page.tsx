import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Moon Ring - Commitment Psychology & Behavioral Science',
  description: 'Explore articles on commitment psychology, social accountability, and evidence-based behavioral change strategies.',
}

// Enable ISR - revalidate every hour (3600 seconds)
export const revalidate = 3600

// Sample blog posts - in production, these would come from a CMS or database
const blogPosts = [
  {
    slug: 'why-wearables-fail-without-accountability',
    title: 'Why 68% of Wearable Users Fail (And How Accountability Fixes It)',
    excerpt: 'The wearable industry has a dirty secret: most devices end up in drawers within six months. We explore the psychology behind this failure and how social accountability creates lasting change.',
    category: 'Behavioral Psychology',
    author: 'Dr. Sarah Mitchell',
    date: 'January 10, 2025',
    readTime: '7 min read',
    image: '/placeholder-blog-1.jpg',
    featured: true
  },
  {
    slug: 'commitment-contracts-explained',
    title: 'The Science of Commitment Contracts: Why Public Promises Work',
    excerpt: 'Research shows public commitments increase goal achievement by 65%. Learn how commitment contract theory can transform your health journey.',
    category: 'Research',
    author: 'Alex Chen',
    date: 'January 8, 2025',
    readTime: '5 min read',
    image: '/placeholder-blog-2.jpg',
    featured: true
  },
  {
    slug: 'accountability-partner-success-stories',
    title: '5 Stories of Accountability Partners Who Changed Everything',
    excerpt: 'Real stories from Moon Ring users who found success through mutual accountability. Discover how partnership transforms isolated efforts into lasting habits.',
    category: 'Success Stories',
    author: 'Jordan Rivera',
    date: 'January 5, 2025',
    readTime: '6 min read',
    image: '/placeholder-blog-3.jpg',
    featured: false
  },
  {
    slug: 'behavioral-economics-habit-formation',
    title: 'Behavioral Economics and Habit Formation: A Deep Dive',
    excerpt: 'Loss aversion, commitment escalation, and implementation intentions—how behavioral economics principles power lasting behavior change.',
    category: 'Behavioral Psychology',
    author: 'Dr. Sarah Mitchell',
    date: 'December 28, 2024',
    readTime: '8 min read',
    image: '/placeholder-blog-4.jpg',
    featured: false
  },
  {
    slug: 'social-rescue-system-explained',
    title: "How Moon Ring's Social Rescue System Saves Failing Commitments",
    excerpt: 'When motivation fails, community steps in. Learn how our social rescue feature turns individual struggles into collective support.',
    category: 'Platform Features',
    author: 'Jordan Rivera',
    date: 'December 20, 2024',
    readTime: '4 min read',
    image: '/placeholder-blog-5.jpg',
    featured: false
  },
  {
    slug: 'corporate-wellness-accountability',
    title: 'Why Corporate Wellness Programs Need Accountability (Not Just Perks)',
    excerpt: "Most employee wellness programs see 32% engagement. Companies using accountability-based approaches achieve 80%+ participation. Here's why.",
    category: 'Corporate Wellness',
    author: 'Alex Chen',
    date: 'December 15, 2024',
    readTime: '6 min read',
    image: '/placeholder-blog-6.jpg',
    featured: false
  },
]

const categories = ['All', 'Behavioral Psychology', 'Research', 'Success Stories', 'Platform Features', 'Corporate Wellness']

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A]">

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Commitment Psychology{' '}
                <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                  Insights
                </span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Evidence-based behavioral science, real success stories, and the latest research
                on social accountability for lasting health change.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    category === 'All'
                      ? 'bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="relative py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966]"></span>
              Featured Articles
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden hover:bg-white/15 transition-all"
                >
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-[#FF33BA]/20 to-[#FF9966]/20 flex items-center justify-center">
                    <div className="text-white/60 text-sm">Featured Image</div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white">
                        {post.category}
                      </span>
                      <span className="text-white/60 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FF33BA] transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-white/70 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-white/60">
                      <div className="flex items-center gap-3">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#FF33BA] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Regular Posts */}
        <section className="relative py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#52ACFF] to-[#725CFA]"></span>
              Latest Articles
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden hover:bg-white/15 transition-all"
                >
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-[#52ACFF]/20 to-[#725CFA]/20 flex items-center justify-center">
                    <div className="text-white/60 text-xs">Article Image</div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80">
                        {post.category}
                      </span>
                      <span className="text-white/60 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FF33BA] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="relative py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 border border-[#FF33BA]/20 p-8 sm:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated on Commitment Psychology
              </h2>
              <p className="text-white/80 mb-6">
                Get weekly insights on behavioral science, accountability strategies, and success stories
                delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF33BA]"
                />
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
              <p className="text-white/60 text-xs mt-4">
                No spam. Unsubscribe anytime. Read our <Link href="/privacy" className="underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF33BA]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF9966] opacity-70"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF33BA] opacity-50"></div>
                  </div>
                  <span className="text-lg font-bold text-white">Moon Ring</span>
                </div>
                <p className="text-white/60 text-sm">
                  Transforming wearable data into lasting behavior change through social accountability.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="/#demo" className="hover:text-white transition-colors">How It Works</Link></li>
                  <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="/#stories" className="hover:text-white transition-colors">Success Stories</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/blog" className="text-white font-semibold">Blog</Link></li>
                  <li><a href="mailto:support@moonring.com" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
              <p>&copy; 2025 Moon Ring. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}