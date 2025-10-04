import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { blogPosts } from '@/lib/blogData'

export const metadata: Metadata = {
  title: 'Blog | Moon Ring - Commitment Psychology & Behavioral Science',
  description: 'Explore articles on commitment psychology, social accountability, and evidence-based behavioral change strategies.',
}

// Enable ISR - revalidate every hour (3600 seconds)
export const revalidate = 3600

// Use centralized blog data as single source of truth
// Filter to only show posts with actual content (prevents 404s)
const publishedPosts = blogPosts.filter(post => post.content && post.content.trim() !== '')

export default function BlogPage() {
  const featuredPosts = publishedPosts.filter(post => post.featured)
  const regularPosts = publishedPosts.filter(post => !post.featured)

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
                Evidence-based strategies for turning intentions into lasting behavior change
              </p>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredPosts.length > 0 && (
          <section className="relative py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden hover:bg-white/15 transition-all hover:scale-102"
                  >
                    <div className="aspect-video bg-gradient-to-br from-[#FF33BA]/20 to-[#FF9966]/20 flex items-center justify-center">
                      <span className="text-6xl">📝</span>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 text-white/60 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FF33BA] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-white/80 mb-4 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded-full bg-[#FF33BA]/20 text-[#FF33BA] text-sm font-medium">
                          {post.category}
                        </span>
                        <span className="text-white/60 text-sm">{post.author}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Articles */}
        <section className="relative py-12 px-4 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">All Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden hover:bg-white/15 transition-all"
                >
                  <div className="aspect-video bg-gradient-to-br from-[#FF33BA]/10 to-[#FF9966]/10 flex items-center justify-center">
                    <span className="text-4xl">📄</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-white/60 text-sm mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FF33BA] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-white/80 mb-4 leading-relaxed text-sm line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-col gap-2">
                      <span className="text-[#FF33BA] text-sm font-medium">{post.category}</span>
                      <span className="text-white/60 text-sm">{post.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {publishedPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg">No published articles yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Turn Knowledge into Action?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join thousands using commitment psychology and social accountability to achieve lasting behavior change
            </p>
            <Link
              href="/#waitlist"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
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
