import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { CheckCircle, Shield, Users, Zap, Sparkles, ArrowRight, Building2, BarChart3 } from 'lucide-react'
import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata(
  'Pricing | Moon Ring - Commitment Psychology Plans',
  'Compare Moon Ring pricing plans and choose the commitment psychology platform that matches your health goals. Flexible options for individuals and teams.',
  '/pricing'
)

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '/forever',
    description: 'Try commitment psychology basics with phone tracking.',
    features: [
      'Phone-based activity tracking',
      'Single active commitment',
      'Community accountability partner',
      'Weekly progress emails',
      'Access to public challenges',
    ],
    cta: 'Start Free',
    highlight: false,
  },
  {
    name: 'Starter',
    price: '$12',
    period: '/month',
    description: 'Perfect for staying focused on one health habit at a time.',
    features: [
      'Connect Apple, Fitbit, Garmin, Oura, Whoop',
      'One active commitment with streak protection',
      'Curated accountability partner matching',
      'Behavioral nudges & adaptive reminders',
      'Weekly insights + habit scorecard',
      '30-day free trial',
    ],
    cta: 'Start Free Trial',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$24',
    period: '/month',
    description: 'Everything you need to run multi-goal health programs.',
    features: [
      'Up to five simultaneous commitments',
      'Invite multiple accountability partners',
      'Group challenges & private cohorts',
      'Advanced analytics & habit forecasts',
      'Commitment contract templates',
      'Priority support + onboarding concierge',
    ],
    cta: 'Start Free Trial',
    highlight: true,
  },
]

const comparisonRows = [
  {
    label: 'Wearable integrations',
    free: 'Phone only',
    starter: 'All major wearables',
    growth: 'All integrations + API priority',
  },
  {
    label: 'Active commitments',
    free: '1',
    starter: '1',
    growth: '5',
  },
  {
    label: 'Accountability partners',
    free: 'Community match',
    starter: '1 partner',
    growth: 'Unlimited partners',
  },
  {
    label: 'Commitment contracts',
    free: 'Templates (read-only)',
    starter: 'Single-stake contracts',
    growth: 'Financial + social stakes, automation',
  },
  {
    label: 'Analytics & reporting',
    free: 'Weekly recap email',
    starter: 'Habit scorecard dashboard',
    growth: 'Advanced dashboards + export',
  },
  {
    label: 'Support response time',
    free: '48 hours',
    starter: '24 hours',
    growth: 'Same-day priority',
  },
]

const pricingFAQ = [
  {
    question: 'Do you offer a free trial?',
    answer:
      'Yes. Starter and Growth plans include a 30-day free trial with full feature access. Cancel anytime during the trial and you will not be charged.',
  },
  {
    question: 'Can I switch plans later?',
    answer:
      'You can upgrade or downgrade at any time. Changes take effect at the start of the next billing cycle and any unused credit rolls over automatically.',
  },
  {
    question: 'Do I need a wearable to get value?',
    answer:
      'Moon Ring works with phone-based tracking on the Free plan. Starter and Growth plans unlock integrations with Apple Health, Google Fit, Fitbit, Garmin, Oura, and Whoop.',
  },
  {
    question: 'What payment methods are supported?',
    answer:
      'We accept all major credit cards, Apple Pay, and Google Pay. Invoices can be issued for annual Growth plans and enterprise agreements.',
  },
  {
    question: 'Is there a discount for annual billing?',
    answer:
      'Annual subscriptions include a 20% discount and a 30-day money-back guarantee. Contact our team for corporate volume pricing.',
  },
]

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A]">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Sparkles className="w-5 h-5 text-[#FF33BA]" />
                <span className="text-white/80 text-sm font-medium">Flexible Plans</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Pricing that grows with your{' '}
                <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">commitments</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Start free, stay focused, and scale your health habits with plans built around social accountability.
              </p>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="relative py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl p-8 backdrop-blur-sm transition-transform hover:scale-[1.02] ${
                    plan.highlight
                      ? 'bg-gradient-to-br from-white/20 to-white/10 border-2 border-[#FF33BA] shadow-xl shadow-pink-500/20'
                      : 'bg-white/10 border border-white/20'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white text-sm font-semibold rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
                  <p className="text-white/70 text-sm mb-6 min-h-[44px]">{plan.description}</p>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/60">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8 min-h-[220px]">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-white/80">
                        <CheckCircle className="w-5 h-5 text-[#FF33BA] flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    data-analytics-event="start_trial"
                    data-analytics-params={JSON.stringify({ location: 'pricing_plan', plan: plan.name })}
                    className={`block text-center w-full py-4 rounded-full font-semibold transition-all ${
                      plan.highlight
                        ? 'bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white hover:opacity-90 shadow-lg shadow-pink-500/25'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="relative py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1B023A] mb-4">Compare Plans</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every plan is built on evidence-based behavioral psychology. Choose how deep you want to go with accountability and analytics.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border-2 border-gray-200">
              <div className="grid grid-cols-4 bg-gray-50">
                <div className="p-6" />
                {pricingPlans.map((plan) => (
                  <div key={plan.name} className="p-6 text-center">
                    <div className="text-sm font-semibold text-[#FF33BA]">{plan.name}</div>
                    <div className="text-2xl font-bold text-[#1B023A]">{plan.price}</div>
                    <div className="text-xs text-gray-500">{plan.period}</div>
                  </div>
                ))}
              </div>

              <div className="divide-y divide-gray-200">
                {comparisonRows.map((row) => (
                  <div key={row.label} className="grid grid-cols-4">
                    <div className="p-6 bg-white/80">
                      <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{row.label}</div>
                    </div>
                    <div className="p-6 text-center text-gray-700 bg-white">{row.free}</div>
                    <div className="p-6 text-center text-gray-700 bg-gray-50">{row.starter}</div>
                    <div className="p-6 text-center text-gray-700 bg-white">{row.growth}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className="relative py-16 px-4">
          <div className="max-w-5xl mx-auto rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm p-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <Building2 className="w-5 h-5 text-[#FF33BA]" />
              <span className="text-white/80 text-sm font-medium">Corporate Wellness</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Need accountability for entire teams?</h2>
            <p className="text-white/80 max-w-3xl mx-auto mb-6">
              Our enterprise program includes admin dashboards, ROI reporting, and dedicated success coaching for companies rolling out social accountability across the organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/enterprise"
                data-analytics-event="request_quote"
                data-analytics-params={JSON.stringify({ location: 'pricing_enterprise' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
              >
                Explore Enterprise
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                data-analytics-event="contact"
                data-analytics-params={JSON.stringify({ location: 'pricing_enterprise' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-colors"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing FAQ */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                <Shield className="w-5 h-5 text-[#FF33BA]" />
                <span className="text-white/80 text-sm font-medium">Pricing FAQ</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Answers before you commit</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Everything you need to know about subscriptions, billing, and what happens after your trial.
              </p>
            </div>

            <div className="grid gap-4">
              {pricingFAQ.map((faq) => (
                <div key={faq.question} className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF33BA]/10 border border-[#FF33BA]/20 mb-6">
              <Users className="w-5 h-5 text-[#FF33BA]" />
              <span className="text-[#1B023A] text-sm font-medium">Ready to commit?</span>
            </div>
            <h2 className="text-4xl font-bold text-[#1B023A] mb-4">Join thousands turning intentions into action</h2>
            <p className="text-gray-600 text-lg mb-8">
              Choose a plan, invite an accountability partner, and build your next streak together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                data-analytics-event="start_trial"
                data-analytics-params={JSON.stringify({ location: 'pricing_final_cta' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
              >
                Start Free Trial
                <Zap className="w-5 h-5" />
              </Link>
              <Link
                href="/demo"
                data-analytics-event="view_promotion"
                data-analytics-params={JSON.stringify({ location: 'pricing_final_cta', promotion_name: 'demo_video' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1B023A] text-white font-semibold text-lg hover:bg-[#2D1B69] transition-colors"
              >
                Watch the Demo
              </Link>
            </div>
            <div className="mt-6 text-sm text-gray-500 flex items-center gap-2 justify-center">
              <BarChart3 className="w-4 h-4" />
              <span>30-day free trial • Cancel anytime • Money-back guarantee</span>
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
