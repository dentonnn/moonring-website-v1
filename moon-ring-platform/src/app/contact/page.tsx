import Navigation from '@/components/Navigation'
import FAQAccordion from '@/components/FAQAccordion'
import Link from 'next/link'
import { ArrowLeft, Mail, MessageSquare, HelpCircle, Send } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Moon Ring Support',
  description: 'Get help with Moon Ring. Browse FAQs, email our support team, or connect with our community for assistance.',
}

const faqItems = [
  {
    question: 'How does Moon Ring work with my existing wearable device?',
    answer: "Moon Ring integrates with all major wearables including Apple Watch, Fitbit, Garmin, Oura Ring, and Whoop. Simply connect your device through our app, and your health data automatically syncs. We use this data to verify your commitment progress and keep your accountability partners informed."
  },
  {
    question: 'What happens if I don\'t have a wearable device?',
    answer: "No problem! You can start with our free tier that tracks steps using your phone's built-in sensors. Many users begin this way to experience commitment psychology before investing in a wearable. You can upgrade and connect a device anytime."
  },
  {
    question: 'How are accountability partners matched?',
    answer: "Our algorithm matches you based on health goals, commitment types, time zones, and compatibility indicators. You can also invite friends directly. We prioritize matching people with similar goals who can support each other effectively."
  },
  {
    question: 'What if my accountability partner stops responding?',
    answer: "You can request a new partner match anytime through your account settings. We also have a community rescue system where other users can step in to provide support when your primary partner is unavailable."
  },
  {
    question: 'Is my health data kept private?',
    answer: "Absolutely. Your health data is encrypted and never sold to third parties. You control exactly what data is shared with accountability partners. We're HIPAA compliant and follow strict privacy standards. Read our Privacy Policy for complete details."
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: "Yes! You can cancel your subscription at any time. Your access continues until the end of your current billing period. We also offer a 30-day money-back guarantee for annual subscriptions if you're not satisfied."
  },
  {
    question: 'What makes Moon Ring different from other fitness apps?',
    answer: "Moon Ring focuses on behavioral psychology and human accountability rather than gamification. Research shows social accountability increases goal achievement by 65-95%, far more effective than badges or points. We connect you with real people, not just algorithms."
  },
  {
    question: 'Do you offer corporate/enterprise plans?',
    answer: "Yes! We have specialized corporate wellness programs with team dashboards, admin controls, and ROI tracking. Contact us at enterprise@moonring.com to discuss custom solutions for your organization."
  },
  {
    question: 'How long does it take to see results?',
    answer: "Most users report improved consistency within the first week of having an accountability partner. Significant behavioral changes typically emerge after 30 days of sustained commitment. Our average user maintains a 127-day commitment streak."
  },
  {
    question: 'What commitments can I make on Moon Ring?',
    answer: "You can create commitments around any measurable health behavior: sleep consistency, daily steps, exercise frequency, meditation practice, heart rate variability, stress management, and more. If your wearable tracks it, you can commit to it."
  }
]

export default function ContactPage() {
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

            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                How Can We{' '}
                <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                  Help You?
                </span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Get support from our team or find answers in our FAQ. We're here to help you succeed
                with commitment psychology and social accountability.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
              <a
                href="mailto:support@moonring.com"
                className="group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition-all text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                <p className="text-white/70 text-sm mb-3">
                  Get help from our team
                </p>
                <p className="text-[#FF33BA] font-semibold text-sm">
                  support@moonring.com
                </p>
              </a>

              <a
                href="mailto:enterprise@moonring.com"
                className="group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition-all text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-[#52ACFF] to-[#725CFA] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Enterprise Sales</h3>
                <p className="text-white/70 text-sm mb-3">
                  Corporate wellness programs
                </p>
                <p className="text-[#52ACFF] font-semibold text-sm">
                  enterprise@moonring.com
                </p>
              </a>

              <Link
                href="/blog"
                className="group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition-all text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-[#F7941D] to-[#FFF200] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Help Center</h3>
                <p className="text-white/70 text-sm mb-3">
                  Articles and guides
                </p>
                <p className="text-[#F7941D] font-semibold text-sm">
                  Visit Blog
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="relative py-12 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1B023A] mb-4">
                Send Us a Message
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#FF33BA] focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#FF33BA] focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#FF33BA] focus:border-transparent outline-none transition-all"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#FF33BA] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us more about your question or feedback..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>

              <p className="text-center text-sm text-gray-500">
                We typically respond within 24 hours. For urgent matters, email us directly at{' '}
                <a href="mailto:support@moonring.com" className="text-[#FF33BA] hover:underline">
                  support@moonring.com
                </a>
              </p>
            </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-white/80">
                Find quick answers to common questions about Moon Ring
              </p>
            </div>

            <FAQAccordion items={faqItems} />
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
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/research" className="hover:text-white transition-colors">Research</Link></li>
                  <li><Link href="/contact" className="text-white font-semibold">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
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
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}