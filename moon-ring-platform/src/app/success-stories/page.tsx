import Navigation from '@/components/Navigation'
import TestimonialsSection from '@/components/TestimonialsSection'
import Link from 'next/link'
import { ArrowRight, Quote, Sparkles, Users, HeartPulse, MoonStar, Target } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Success Stories | Moon Ring - Accountability In Action',
  description:
    'Discover how Moon Ring members turn abandoned wearables into lasting habits. Read real success stories across sleep, movement, stress, and recovery goals.',
}

const caseStudies = [
  {
    category: 'Sleep',
    gradient: 'from-[#52ACFF] to-[#725CFA]',
    title: 'From 4 hours to 7.5 hours of sleep in 8 weeks',
    summary:
      'Maya paired with a night-shift nurse accountability partner and used Moon Ring nudges to build a consistent wind-down routine.',
    metrics: ['+42% deep sleep', '56-night streak', 'Partner check-ins: nightly'],
    link: '/blog/sleep-accountability-success',
  },
  {
    category: 'Movement',
    gradient: 'from-[#F7941D] to-[#FFF200]',
    title: 'Corporate cohort completes 12-week movement challenge',
    summary:
      'A remote SaaS team ran a Moon Ring accountability league to reverse sedentary habits and hit collective step goals.',
    metrics: ['18% drop in absenteeism', 'Avg streak: 91 days', 'Goal completion: 84%'],
    link: '/blog/corporate-movement-case-study',
  },
  {
    category: 'Stress',
    gradient: 'from-[#FF5A5A] to-[#660000]',
    title: 'Mindfulness practice that finally stuck',
    summary:
      'Darius used commitment contracts with social stakes to maintain daily meditation, supported by biometric feedback from his wearable.',
    metrics: ['12-week meditation streak', '-18% resting HR', 'Mood check-ins up 3x'],
    link: '/blog/stress-accountability-program',
  },
]

const spotlightStats = [
  { label: 'Average streak length', value: '127 days' },
  { label: 'Goal completion rate', value: '67%' },
  { label: 'Accountability partner retention', value: '82%' },
  { label: 'Wearable re-engagement', value: '75%' },
]

export default function SuccessStoriesPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A]">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Quote className="w-5 h-5 text-[#FF33BA]" />
                <span className="text-white/80 text-sm font-medium">Real Accountability Outcomes</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Stories of{' '}
                <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">unbreakable commitments</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                From solo wearable users to corporate wellness teams, Moon Ring members turn accountability into measurable health breakthroughs.
              </p>
            </div>
          </div>
        </section>

        {/* Spotlight stats */}
        <section className="relative py-12 px-4">
          <div className="max-w-6xl mx-auto rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {spotlightStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case studies */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1B023A] mb-4">Across every health focus</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Social accountability adapts to sleep, movement, stress, and recovery goals. Explore how different members made their habits stick.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {caseStudies.map((study) => (
                <div key={study.title} className="rounded-3xl border-2 border-gray-200 p-8 bg-gradient-to-br from-gray-50 to-white h-full flex flex-col">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${study.gradient} text-white text-sm font-semibold mb-5`}>
                    {study.category}
                  </div>
                  <h3 className="text-2xl font-bold text-[#1B023A] mb-3">{study.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-1">{study.summary}</p>
                  <ul className="space-y-2 mb-6">
                    {study.metrics.map((metric) => (
                      <li key={metric} className="text-sm text-gray-700 flex items-center gap-2">
                        <HeartPulse className="w-4 h-4 text-[#FF33BA]" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={study.link}
                    className="inline-flex items-center gap-2 text-[#FF33BA] font-semibold hover:text-[#FF9966] transition-colors"
                  >
                    Read full case study
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials reuse */}
        <TestimonialsSection />

        {/* Community invitation */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A]">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <Users className="w-5 h-5 text-[#FF33BA]" />
              <span className="text-white/80 text-sm font-medium">Accountability Community</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Thousands of partners building streaks together</h2>
            <p className="text-white/70 max-w-3xl mx-auto mb-8">
              Join a community where progress updates replace guilt and accountability partners become lifelong supporters.
            </p>
            <div className="grid gap-8 md:grid-cols-3 mb-12 text-left">
              {[
                {
                  icon: Sparkles,
                  title: 'Behavior-backed results',
                  description: 'Grounded in commitment contracts, social proof, and implementation intentions backed by research.',
                },
                {
                  icon: MoonStar,
                  title: 'Designed for busy lives',
                  description: 'Short daily check-ins, timezone-aware reminders, and support that actually fits your schedule.',
                },
                {
                  icon: Target,
                  title: 'Shared goals, mutual wins',
                  description: 'Every match is calibrated on goals, availability, and motivational style so both partners succeed.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm p-6">
                  <item.icon className="w-7 h-7 text-[#FF33BA] mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                data-analytics-event="view_promotion"
                data-analytics-params={JSON.stringify({ location: 'success_stories_cta', promotion_name: 'interactive_demo' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
              >
                Try the Interactive Demo
              </Link>
              <Link
                href="/contact"
                data-analytics-event="start_trial"
                data-analytics-params={JSON.stringify({ location: 'success_stories_cta' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-colors"
              >
                Join the Waitlist
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
              <p>&copy; {new Date().getFullYear()} Moon Ring. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
