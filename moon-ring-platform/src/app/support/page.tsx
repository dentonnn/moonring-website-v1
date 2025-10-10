import Navigation from '@/components/Navigation'
import FAQAccordion from '@/components/FAQAccordion'
import Link from 'next/link'
import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { LifeBuoy, MessageSquare, Clock, CheckCircle, PhoneCall, Shield, ArrowRight } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata(
  'Support & Help Center | Moon Ring',
  'Get help with Moon Ring. Access guides, FAQs, and support resources for commitment psychology, wearable integrations, and corporate programs.',
  '/support'
)

const knowledgeBase = [
  {
    title: 'Getting Started',
    description: 'Create your first commitment, invite a partner, and understand streak protection.',
    link: '/blog/moon-ring-getting-started',
  },
  {
    title: 'Wearable Integrations',
    description: 'Step-by-step instructions for connecting Apple Health, Fitbit, Garmin, Oura, and Whoop.',
    link: '/blog/wearable-integration-guide',
  },
  {
    title: 'Commitment Contracts',
    description: 'How social and financial stakes work plus templates for each plan tier.',
    link: '/blog/commitment-contract-templates',
  },
  {
    title: 'Corporate Admins',
    description: 'Deploy Moon Ring internally, invite teams, and track ROI from the admin dashboard.',
    link: '/enterprise',
  },
]

const quickActions = [
  {
    title: 'Chat with support',
    description: 'Live help weekdays 8am–8pm ET',
    href: 'mailto:support@moonring.com',
    icon: MessageSquare,
    analyticsEvent: 'contact',
    analyticsParams: { method: 'email_link', location: 'support_quick_actions' as const },
  },
  {
    title: 'Status page',
    description: '99.9% uptime • incident history',
    href: 'https://status.moonring.com',
    icon: LifeBuoy,
    analyticsEvent: 'view_promotion',
    analyticsParams: { promotion_name: 'status_page', location: 'support_quick_actions' as const },
  },
  {
    title: 'Schedule onboarding',
    description: 'Concierge setup for Growth & Enterprise',
    href: '/contact',
    icon: PhoneCall,
    analyticsEvent: 'request_quote',
    analyticsParams: { location: 'support_quick_actions', program: 'onboarding_call' as const },
  },
]

const supportFAQ = [
  {
    question: 'How do I connect my wearable device?',
    answer:
      'Open the Moon Ring app, visit Settings → Integrations, and choose your device. Follow the OAuth prompts to grant permission. Growth plan members receive priority integration support if issues arise.',
  },
  {
    question: 'What if my accountability partner goes inactive?',
    answer:
      'You can request a new match at any time. Tap Partner → Request new partner and we\'ll match you within 24 hours. Growth plan members can maintain multiple partners simultaneously.',
  },
  {
    question: 'How are commitment contracts enforced?',
    answer:
      'Commitment stakes are logged in-app with automated reminder schedules. Missed commitments trigger partner notifications and, when enabled, financial stakes via Stripe escrow.',
  },
  {
    question: 'Where can I see my billing history?',
    answer:
      'Go to Settings → Billing to download invoices, update payment methods, or switch plans. Contact billing@moonring.com for corporate invoicing support.',
  },
  {
    question: 'Is my health data secure?',
    answer:
      'All health data is encrypted at rest and in transit. We follow HIPAA-aligned safeguards, granular sharing controls, and never sell or share data without consent.',
  },
]

export default function SupportPage() {
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
                <LifeBuoy className="w-5 h-5 text-[#FF33BA]" />
                <span className="text-white/80 text-sm font-medium">Moon Ring Help Center</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Get the support you need to keep your streaks alive
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Explore guides, troubleshoot integrations, and connect with our team. We\'re available 24/7 via email and offer live chat during business hours.
              </p>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className="relative py-12 px-4">
          <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                data-analytics-event={action.analyticsEvent}
                data-analytics-params={action.analyticsParams ? JSON.stringify(action.analyticsParams) : undefined}
                className="rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm p-6 flex gap-4 hover:bg-white/15 transition-colors"
              >
                <action.icon className="w-8 h-8 text-[#FF33BA]" />
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">{action.title}</h2>
                  <p className="text-white/70 text-sm leading-relaxed">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Knowledge base */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-[#1B023A] mb-3">Browse the knowledge base</h2>
                <p className="text-gray-600 max-w-2xl">
                  Step-by-step guides curated by our behavioral science and support teams. Updated weekly with new playbooks and troubleshooting flows.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold hover:opacity-90 transition-opacity"
              >
                View all resources
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {knowledgeBase.map((article) => (
                <Link
                  key={article.title}
                  href={article.link}
                  className="rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8 hover:border-[#FF33BA]/50 transition-colors"
                >
                  <h3 className="text-2xl font-semibold text-[#1B023A] mb-3">{article.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{article.description}</p>
                  <span className="inline-flex items-center gap-2 text-[#FF33BA] font-semibold">
                    Read guide
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Support commitments */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A]">
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
            {[ 
              {
                icon: Clock,
                title: 'Response within 24 hours',
                description: 'Starter plan and above receive responses within one business day. Growth and Enterprise get same-day priority.',
              },
              {
                icon: CheckCircle,
                title: 'Human accountability coaches',
                description: 'Certified specialists review tough cases and can join partner rescues or escalated commitment planning.',
              },
              {
                icon: Shield,
                title: 'Security-first support',
                description: 'SOC 2 controls, HIPAA-aligned safeguards, and privacy-by-default architecture keep your data protected.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm p-8">
                <item.icon className="w-7 h-7 text-[#FF33BA] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1B023A] mb-4">Frequently asked questions</h2>
              <p className="text-gray-600">
                Still stuck? Check the answers below or reach out to support@moonring.com.
              </p>
            </div>

            <FAQAccordion items={supportFAQ} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Need hands-on help?</h2>
            <p className="text-white/70 text-lg mb-6">
              Our team is on standby to restore streaks, troubleshoot integrations, and onboard your accountability partners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:support@moonring.com"
                data-analytics-event="contact"
                data-analytics-params={JSON.stringify({ method: 'email_link', location: 'support_final_cta' })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Email Support Team
              </Link>
              <Link
                href="/contact"
                data-analytics-event="request_quote"
                data-analytics-params={JSON.stringify({ location: 'support_final_cta', program: 'support_call' })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-colors"
              >
                Book a call
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
