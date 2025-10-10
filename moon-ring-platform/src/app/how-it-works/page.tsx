import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { ArrowLeft, Heart, Users, CheckCircle, Brain, Target, TrendingUp, Shield, Award, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata(
  'How It Works | Moon Ring - Commitment Psychology Explained',
  'Discover how Moon Ring uses behavioral psychology and social accountability to turn health intentions into lasting commitments.',
  '/how-it-works'
)

export default function HowItWorksPage() {
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

            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Brain className="w-5 h-5 text-[#FF33BA]" />
                <span className="text-white/80 text-sm font-medium">Behavioral Science</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                How{' '}
                <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                  Commitment Psychology
                </span>
                {' '}Works
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Understanding the behavioral science behind turning intentions into unbreakable
                commitments through social accountability.
              </p>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-4xl font-bold text-[#1B023A] mb-6">
                  The Problem: Intentions Don't Stick
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  You set a health goal with genuine intention. Maybe it's sleeping 8 hours, walking 10K steps daily,
                  or meditating every morning. The first week, you are committed. The second week, life gets busy.
                  By week three, the goal is forgotten.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  This isn't a willpower problem—it's a psychology problem. Research shows that <strong>92% of New Year's
                  resolutions fail</strong> because intentions alone aren't enough to drive lasting behavioral change.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Traditional fitness apps try to solve this with gamification, badges, and AI coaching. But these
                  approaches miss the most powerful behavioral change mechanism: <strong>social accountability</strong>.
                </p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-[#1B023A] mb-6 text-center">
                  Why Traditional Approaches Fail
                </h3>
                <div className="space-y-4">
                  {[
                    { problem: 'Self-monitoring alone', stat: '8%', label: 'success rate' },
                    { problem: 'Gamification (badges/points)', stat: '15%', label: 'sustained engagement' },
                    { problem: 'AI coaching only', stat: '23%', label: 'behavior change' },
                    { problem: 'No accountability', stat: '32%', label: 'follow-through' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200">
                      <span className="text-gray-700 font-medium">{item.problem}</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-500">{item.stat}</div>
                        <div className="text-xs text-gray-500">{item.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Science */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                The Science of Commitment Psychology
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Three proven behavioral principles that make Moon Ring effective
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: 'Commitment Contracts',
                  principle: 'Loss Aversion',
                  description: 'Making a public commitment creates psychological "skin in the game." Research shows people are 2-3x more motivated to avoid losing something than to gain it.',
                  evidence: 'Study: Ariely & Wertenbroch (2002)',
                  stat: '+65%',
                  statLabel: 'goal achievement',
                  color: 'from-[#FF33BA] to-[#FF9966]'
                },
                {
                  icon: Users,
                  title: 'Social Accountability',
                  principle: 'Peer Influence',
                  description: 'When someone is counting on you—and you are counting on them—behavioral change becomes a shared responsibility, not an isolated struggle.',
                  evidence: 'Study: Wing & Jeffery (1999)',
                  stat: '+95%',
                  statLabel: 'adherence rate',
                  color: 'from-[#52ACFF] to-[#725CFA]'
                },
                {
                  icon: Brain,
                  title: 'Implementation Intentions',
                  principle: 'If-Then Planning',
                  description: 'Converting abstract goals into specific "if-then" plans creates automatic behavioral triggers that bypass willpower limitations.',
                  evidence: 'Study: Gollwitzer & Sheeran (2006)',
                  stat: '+70%',
                  statLabel: 'success rate',
                  color: 'from-[#F7941D] to-[#FFF200]'
                }
              ].map((science, idx) => (
                <div key={idx} className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${science.color} flex items-center justify-center mb-6`}>
                    <science.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent mb-2">
                    {science.stat}
                  </div>
                  <div className="text-white/60 text-sm mb-4">{science.statLabel}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{science.title}</h3>
                  <div className="text-[#FF33BA] font-semibold text-sm mb-4">{science.principle}</div>
                  <p className="text-white/80 leading-relaxed mb-4">{science.description}</p>
                  <p className="text-white/60 text-xs italic">{science.evidence}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Moon Ring Works */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1B023A] mb-4">
                How Moon Ring Applies the Science
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A step-by-step breakdown of the commitment psychology framework
              </p>
            </div>

            <div className="space-y-12">
              {[
                {
                  step: '1',
                  title: 'Choose Your Health Focus',
                  description: 'Select the health behavior you want to improve—sleep, movement, stress management, or recovery. Moon Ring supports any wearable-trackable metric.',
                  psychology: 'Specificity Principle',
                  why: 'Vague goals ("be healthier") fail. Specific commitments ("8 hours of sleep nightly") activate implementation intentions.',
                  icon: Target,
                  color: 'from-[#FF33BA] to-[#FF9966]'
                },
                {
                  step: '2',
                  title: 'Create Your Commitment Contract',
                  description: 'Set a clear, measurable goal with a defined timeline (e.g., "30 consecutive days of 10K steps"). This creates your public commitment.',
                  psychology: 'Commitment Consistency',
                  why: 'Public commitments trigger loss aversion—breaking a promise to others feels worse than breaking one to yourself.',
                  icon: Shield,
                  color: 'from-[#52ACFF] to-[#725CFA]'
                },
                {
                  step: '3',
                  title: 'Find Your Accountability Partner',
                  description: 'Get matched with someone pursuing a similar goal. You check in daily, share progress, and support each other through challenges.',
                  psychology: 'Social Proof & Reciprocity',
                  why: 'When you commit to supporting someone else, you are more likely to follow through yourself. Accountability becomes mutual.',
                  icon: Users,
                  color: 'from-[#F7941D] to-[#FFF200]'
                },
                {
                  step: '4',
                  title: 'Daily Progress Tracking',
                  description: 'Your wearable data syncs automatically. Both you and your partner see real-time progress, creating transparent accountability.',
                  psychology: 'Progress Monitoring',
                  why: 'Visible progress triggers dopamine release, reinforcing the behavior. Knowing someone else sees your data prevents rationalization.',
                  icon: TrendingUp,
                  color: 'from-[#FF33BA] to-[#FF9966]'
                },
                {
                  step: '5',
                  title: 'Community Rescue System',
                  description: 'When commitments are at risk, the broader community can step in with encouragement, advice, and support.',
                  psychology: 'Collective Efficacy',
                  why: 'Social support buffers against motivation lapses. Community rescue prevents single failures from becoming permanent quit events.',
                  icon: Heart,
                  color: 'from-[#52ACFF] to-[#725CFA]'
                },
                {
                  step: '6',
                  title: 'Sustained Behavior Change',
                  description: 'After 30-90 days of consistent commitment, the behavior becomes habitual. The external accountability internalizes into self-discipline.',
                  psychology: 'Habit Formation',
                  why: 'Research shows it takes 66 days on average to form a habit. Moon Ring accountability structure ensures you reach that threshold.',
                  icon: Award,
                  color: 'from-[#F7941D] to-[#FFF200]'
                }
              ].map((step, idx) => (
                <div key={idx} className="grid lg:grid-cols-2 gap-8 items-start">
                  <div className={`rounded-3xl bg-gradient-to-br ${step.color} p-8 text-white ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                        <p className="text-white/90 leading-relaxed">{step.description}</p>
                      </div>
                      <step.icon className="w-8 h-8 flex-shrink-0" />
                    </div>
                  </div>

                  <div className={`rounded-3xl bg-gray-50 border-2 border-gray-200 p-8 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="w-6 h-6 text-[#FF33BA]" />
                      <h4 className="text-lg font-bold text-[#1B023A]">The Psychology:</h4>
                    </div>
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#FF33BA]/10 text-[#FF33BA] font-semibold text-sm mb-2">
                        {step.psychology}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{step.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Foundation */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Backed by Peer-Reviewed Research
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Every feature in Moon Ring is grounded in published behavioral science
              </p>
              <Link
                href="/research"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
              >
                Explore Research Library
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#1B023A] mb-6">
              Experience Commitment Psychology Yourself
            </h2>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              Understanding how it works is one thing. Experiencing the power of social accountability
              is another. Try creating your first commitment—no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
              >
                Try Interactive Demo
              </Link>
              <Link
                href="/#waitlist"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white border-2 border-gray-300 text-[#1B023A] font-semibold text-lg hover:border-[#FF33BA] transition-colors"
              >
                Start Free Trial
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
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
                <Link href="/research" className="hover:text-white transition-colors">Research</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
