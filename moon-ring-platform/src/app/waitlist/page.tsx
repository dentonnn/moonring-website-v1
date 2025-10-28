'use client'

import Navigation from '@/components/Navigation'
import EmailCaptureForm from '@/components/forms/EmailCaptureForm'
import Link from 'next/link'
import { CheckCircle, Users, Clock, TrendingUp, Gift } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AnimatedStats } from '@/components/animations/AnimatedStats'

// Waitlist-specific FAQ data
const waitlistFAQs = [
  {
    question: 'How long is the waitlist?',
    answer: 'Current wait time is 2-4 weeks depending on your tier. Active engagement (goal selection, referrals) moves you up faster. Tier 2 members get priority access.'
  },
  {
    question: 'Can I skip the line?',
    answer: 'Yes! Each friend you refer moves you up 100 positions. Complete your goal selection (sent Week 2) to upgrade to Tier 2 and jump ahead. Enterprise customers get immediate access.'
  },
  {
    question: 'What happens after I join?',
    answer: "You'll receive an instant confirmation email, weekly progress updates, and personalized content based on your health goals. We'll notify you 48 hours before your access date."
  },
  {
    question: 'Do I need special hardware?',
    answer: 'No! Moon Ring works with devices you already own: Apple Watch, Fitbit, Garmin, Oura, Whoop, and more. No additional purchase required.'
  },
  {
    question: 'Is this a paid waitlist?',
    answer: 'No, joining the waitlist is completely free. You can start with our Free tier when your access opens, or choose a paid plan for advanced features.'
  },
  {
    question: 'What data do you collect?',
    answer: 'We only collect your email and optional name to manage the waitlist. Your health data stays private until you create an account. Read our full privacy policy for details.'
  }
]

export default function WaitlistPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A]">

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            {/* Badge */}
            <AnimatedSection direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/90 text-sm font-medium">28,000+ joined this month</span>
              </div>
            </AnimatedSection>

            {/* Main Headline */}
            <AnimatedSection direction="up" delay={0.15}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Join the Waitlist for{' '}
                <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                  Early Access
                </span>
              </h1>
            </AnimatedSection>

            {/* Subheadline */}
            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                Turn your wearable data into lasting behavior change through evidence-based commitment psychology and real human accountability.
              </p>
            </AnimatedSection>

            {/* Social Proof Stats */}
            <AnimatedStats
              stats={[
                {
                  value: '28M+',
                  label: 'Users Waiting',
                  comparison: 'Across 140+ countries',
                  source: 'Total registered waitlist members as of January 2025'
                },
                {
                  value: '67%',
                  label: 'Success Rate',
                  comparison: 'vs. 23% industry avg',
                  source: 'Beta users who completed 80%+ of their commitment with accountability partners'
                },
                {
                  value: '2-4 wks',
                  label: 'Avg Wait Time',
                  comparison: 'Tier 2 gets priority',
                  source: 'Current average from signup to access invitation (Q1 2025)'
                }
              ]}
            />

            {/* Email Capture Form */}
            <AnimatedSection direction="up" delay={0.3}>
              <div className="mt-12 max-w-xl mx-auto">
                <EmailCaptureForm
                  source="waitlist"
                  showGDPR={true}
                  onSuccess={() => {
                    // Redirect to confirmation page
                    if (typeof window !== 'undefined') {
                      const email = new URLSearchParams(window.location.search).get('email')
                      window.location.href = `/waitlist/confirmation${email ? `?email=${email}` : ''}`
                    }
                  }}
                />
                <p className="text-center text-white/60 text-sm mt-4">
                  ✓ Free to join · ✓ No credit card required · ✓ Cancel anytime
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* What Happens Next */}
        <section className="relative py-20 px-4 bg-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                What Happens Next?
              </h2>
              <p className="text-white/70 text-lg">
                Your journey to unbreakable commitments starts immediately
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Now</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Instant confirmation email with your waitlist position and tier status
                </p>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Week 2</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Goal selection invitation—upgrade to Tier 2 and move up 100 positions
                </p>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Weekly</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Progress updates, behavioral psychology insights, and success stories
                </p>
              </div>

              {/* Step 4 */}
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Access Day</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Download the app, create your first commitment, get matched with your partner
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Referral Program CTA */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl bg-gradient-to-r from-[#FF33BA]/20 to-[#FF9966]/20 border border-white/20 backdrop-blur-sm p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center">
                    <Gift className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Skip the Line: Refer Friends
                  </h3>
                  <p className="text-white/80 mb-4">
                    Each friend who joins moves you up <strong className="text-white">100 positions</strong>. Refer 3 friends and jump to the front of your tier.
                  </p>
                  <p className="text-white/60 text-sm">
                    You'll get your unique referral link in your confirmation email
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Now */}
        <section className="relative py-20 px-4 bg-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Why Join the Waitlist Now?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-2">Early Access Perks</h3>
                <p className="text-white/70 leading-relaxed">
                  Founding members get lifetime discounts, exclusive features, and priority partner matching
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">🧪</div>
                <h3 className="text-xl font-bold text-white mb-2">Shape the Product</h3>
                <p className="text-white/70 leading-relaxed">
                  Your feedback directly influences features, integrations, and partner-matching algorithms
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-white mb-2">Best Partner Matches</h3>
                <p className="text-white/70 leading-relaxed">
                  Early members have access to the most engaged accountability partners
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-white/70 text-lg">
                Everything you need to know about the waitlist
              </p>
            </div>

            <div className="space-y-4">
              {waitlistFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-white/60 mb-4">Still have questions?</p>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 text-[#FF33BA] hover:text-[#FF9966] font-semibold transition-colors"
              >
                Visit our Support page
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-20 px-4 border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Make Your Health Goals Stick?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join 28M+ users turning intentions into unbreakable commitments
            </p>
            <a
              href="#top"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
            >
              Join the Waitlist
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
              <p>&copy; 2025 Moon Ring. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
