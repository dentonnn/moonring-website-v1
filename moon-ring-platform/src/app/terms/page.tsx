import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata(
  'Terms of Service | Moon Ring',
  'Moon Ring terms of service - Legal terms and conditions for using our social accountability platform.',
  '/terms'
)

export default function TermsOfService() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-white/60 text-sm">
              Last Updated: January 15, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 sm:p-12 space-y-8">

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
                <p className="text-white/80 leading-relaxed">
                  Welcome to Moon Ring! These Terms of Service ("Terms") govern your access to and use of Moon Ring's
                  website, mobile applications, and services (collectively, the "Services"). By accessing or using our
                  Services, you agree to be bound by these Terms and our Privacy Policy.
                </p>
                <p className="text-white/80 leading-relaxed mt-4">
                  If you do not agree to these Terms, you may not access or use our Services. We reserve the right to
                  update these Terms at any time, and your continued use constitutes acceptance of any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Eligibility</h2>
                <p className="text-white/80 leading-relaxed mb-3">
                  To use Moon Ring, you must:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Be at least 13 years of age (or 16 in the EU)</li>
                  <li>Have the legal capacity to enter into a binding contract</li>
                  <li>Not be prohibited from using the Services under applicable law</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                </ul>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mt-4">
                  <p className="text-white/80 text-sm leading-relaxed">
                    <strong className="text-white">Minors:</strong> If you are under 18, you represent that your
                    parent or legal guardian has reviewed and agreed to these Terms on your behalf.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Account Registration</h2>
                <p className="text-white/80 leading-relaxed mb-3">
                  When you create an account, you agree to:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Keep your password confidential and secure</li>
                  <li>Notify us immediately of any unauthorized account access</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Not share your account with others or create multiple accounts</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-4">
                  We reserve the right to suspend or terminate accounts that violate these Terms or engage in
                  fraudulent, abusive, or illegal activity.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Subscription Plans and Billing</h2>

                <h3 className="text-xl font-semibold text-white mb-3 mt-6">Free Plan</h3>
                <p className="text-white/80 leading-relaxed">
                  Our Free plan provides limited access to Moon Ring features at no cost. We may modify or discontinue
                  the Free plan at any time with reasonable notice.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-6">Paid Subscriptions</h3>
                <p className="text-white/80 leading-relaxed mb-3">
                  Paid subscriptions (Starter and Growth plans) are billed monthly or annually in advance:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li><strong className="text-white">Free Trial:</strong> New subscribers receive a 30-day free trial. You will not be charged until the trial ends unless you cancel.</li>
                  <li><strong className="text-white">Auto-Renewal:</strong> Subscriptions renew automatically unless canceled before the renewal date.</li>
                  <li><strong className="text-white">Payment Method:</strong> You authorize us to charge your payment method on each renewal date.</li>
                  <li><strong className="text-white">Price Changes:</strong> We may adjust pricing with 30 days' notice. Changes apply at your next renewal.</li>
                  <li><strong className="text-white">Taxes:</strong> Prices exclude applicable taxes, which will be added to your bill.</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-6">Cancellation and Refunds</h3>
                <p className="text-white/80 leading-relaxed mb-3">
                  You may cancel your subscription at any time:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Cancellations take effect at the end of your current billing period</li>
                  <li>You retain access to paid features until the period ends</li>
                  <li>We offer a 30-day money-back guarantee for first-time annual subscribers</li>
                  <li>Refunds are not available for monthly subscriptions after the trial period</li>
                  <li>Promotional pricing is non-refundable</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-6">Hardware Purchases</h3>
                <p className="text-white/80 leading-relaxed">
                  Moon Ring hardware (the physical ring device) is a separate one-time purchase. Hardware purchases
                  include lifetime access to software features. Hardware returns and warranty terms are subject to our
                  separate Hardware Warranty Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Acceptable Use</h2>
                <p className="text-white/80 leading-relaxed mb-3">
                  You agree to use Moon Ring responsibly and lawfully. You must NOT:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property or privacy rights of others</li>
                  <li>Harass, abuse, threaten, or bully other users</li>
                  <li>Share inappropriate, offensive, or harmful content</li>
                  <li>Impersonate others or misrepresent your identity</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Reverse engineer, decompile, or hack our Services</li>
                  <li>Use automated tools to scrape or collect data</li>
                  <li>Distribute malware, viruses, or malicious code</li>
                  <li>Spam users or abuse messaging features</li>
                  <li>Use the Services for commercial purposes without permission</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-4">
                  Violations may result in immediate account termination without refund.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Social Accountability Features</h2>
                <p className="text-white/80 leading-relaxed mb-3">
                  Moon Ring facilitates connections between users for mutual accountability:
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">User Interactions</h3>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>You control which users you connect with as accountability partners</li>
                  <li>You decide what commitment data to share with partners</li>
                  <li>You can block or report users who violate community guidelines</li>
                  <li>We are not responsible for interactions between users</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">Community Guidelines</h3>
                <p className="text-white/80 leading-relaxed mb-3">
                  When interacting with accountability partners:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Be respectful, supportive, and encouraging</li>
                  <li>Respect privacy and confidentiality</li>
                  <li>Do not pressure partners into unhealthy behaviors</li>
                  <li>Report abusive or concerning behavior immediately</li>
                  <li>Remember that partners are not professional health advisors</li>
                </ul>

                <div className="rounded-2xl bg-[#FF33BA]/10 border border-[#FF33BA]/20 p-4 mt-4">
                  <p className="text-white/80 text-sm leading-relaxed">
                    <strong className="text-white">Important:</strong> Accountability partners are peers, not licensed
                    professionals. Moon Ring does not provide medical, mental health, or professional advice. Always
                    consult qualified professionals for health concerns.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Health Data and Wearable Devices</h2>
                <p className="text-white/80 leading-relaxed mb-3">
                  Moon Ring connects to wearable devices to track health metrics:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>You authorize data collection from connected devices</li>
                  <li>Data accuracy depends on your wearable device's capabilities</li>
                  <li>Moon Ring is not a medical device and does not diagnose conditions</li>
                  <li>Do not rely solely on our Services for health decisions</li>
                  <li>Consult healthcare professionals before starting new health programs</li>
                </ul>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mt-4">
                  <p className="text-white/80 text-sm leading-relaxed">
                    <strong className="text-white">Medical Disclaimer:</strong> Moon Ring is a behavioral change tool,
                    not a medical service. Our insights are educational and motivational, not clinical advice. Always
                    seek guidance from qualified healthcare providers.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                <p className="text-white/80 leading-relaxed mb-3">
                  Moon Ring and its Services are protected by copyright, trademark, and other intellectual property laws:
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">Our Content</h3>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>All content, features, and functionality are owned by Moon Ring</li>
                  <li>Our trademarks, logos, and brand elements are protected</li>
                  <li>You may not copy, modify, or distribute our content without permission</li>
                  <li>Limited license granted for personal, non-commercial use only</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">Your Content</h3>
                <p className="text-white/80 leading-relaxed mb-3">
                  When you submit content (messages, profile information, feedback):
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>You retain ownership of your content</li>
                  <li>You grant us a license to use, store, and display your content as needed to provide Services</li>
                  <li>You represent that you have rights to share your content</li>
                  <li>You agree not to submit copyrighted material without authorization</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Disclaimers and Limitations of Liability</h2>

                <h3 className="text-xl font-semibold text-white mb-3">Service "As Is"</h3>
                <p className="text-white/80 leading-relaxed mb-3">
                  Moon Ring is provided "as is" and "as available" without warranties of any kind, either express or
                  implied, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Fitness for a particular purpose</li>
                  <li>Merchantability</li>
                  <li>Non-infringement</li>
                  <li>Accuracy or reliability of content</li>
                  <li>Uninterrupted or error-free operation</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-6">Limitation of Liability</h3>
                <p className="text-white/80 leading-relaxed mb-3">
                  To the maximum extent permitted by law, Moon Ring and its affiliates shall not be liable for:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Indirect, incidental, special, or consequential damages</li>
                  <li>Loss of profits, revenue, data, or goodwill</li>
                  <li>Service interruptions or data loss</li>
                  <li>Third-party actions or content</li>
                  <li>Unauthorized access to your account</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-4">
                  Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim,
                  or $100, whichever is greater.
                </p>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mt-4">
                  <p className="text-white/80 text-sm leading-relaxed">
                    Some jurisdictions do not allow limitations on implied warranties or liability for incidental
                    damages. In such jurisdictions, our liability is limited to the greatest extent permitted by law.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Indemnification</h2>
                <p className="text-white/80 leading-relaxed">
                  You agree to indemnify, defend, and hold harmless Moon Ring and its officers, directors, employees,
                  and agents from any claims, liabilities, damages, losses, and expenses (including legal fees) arising
                  from: (a) your use of the Services, (b) your violation of these Terms, (c) your violation of any
                  rights of others, or (d) your content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
                <p className="text-white/80 leading-relaxed mb-3">
                  We may suspend or terminate your account at any time for:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Violation of these Terms</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Abusive behavior toward other users or our team</li>
                  <li>Prolonged inactivity</li>
                  <li>Payment failures or chargebacks</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-4">
                  You may terminate your account at any time through account settings. Upon termination, you lose
                  access to Services, but certain provisions (indemnification, disclaimers, dispute resolution) survive.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Dispute Resolution and Arbitration</h2>

                <h3 className="text-xl font-semibold text-white mb-3">Governing Law</h3>
                <p className="text-white/80 leading-relaxed">
                  These Terms are governed by the laws of the State of California, USA, without regard to conflict
                  of law principles.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">Informal Resolution</h3>
                <p className="text-white/80 leading-relaxed">
                  Before filing a claim, please contact us at{' '}
                  <a href="mailto:legal@moonring.com" className="text-[#FF33BA] hover:text-[#FF9966] transition-colors">
                    legal@moonring.com
                  </a>
                  {' '}to seek informal resolution. We will work in good faith to resolve disputes.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">Binding Arbitration</h3>
                <p className="text-white/80 leading-relaxed mb-3">
                  If informal resolution fails, disputes will be resolved through binding arbitration rather than
                  court litigation, except for:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Small claims court matters (under $10,000)</li>
                  <li>Intellectual property disputes</li>
                  <li>Injunctive relief requests</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-4">
                  Arbitration will be conducted by the American Arbitration Association (AAA) under its Consumer
                  Arbitration Rules. The arbitrator's decision is final and binding.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">Class Action Waiver</h3>
                <p className="text-white/80 leading-relaxed">
                  You agree to resolve disputes individually, not as part of a class action or representative
                  proceeding. You waive the right to participate in class actions against Moon Ring.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">General Provisions</h2>

                <h3 className="text-xl font-semibold text-white mb-3">Changes to Terms</h3>
                <p className="text-white/80 leading-relaxed">
                  We may modify these Terms at any time. Material changes will be communicated via email or in-app
                  notice at least 30 days before taking effect. Your continued use constitutes acceptance.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">Severability</h3>
                <p className="text-white/80 leading-relaxed">
                  If any provision is found invalid or unenforceable, the remaining provisions continue in full effect.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">Entire Agreement</h3>
                <p className="text-white/80 leading-relaxed">
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and
                  Moon Ring regarding the Services.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">No Waiver</h3>
                <p className="text-white/80 leading-relaxed">
                  Our failure to enforce any right or provision does not constitute a waiver of that right or provision.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">Assignment</h3>
                <p className="text-white/80 leading-relaxed">
                  You may not assign these Terms without our consent. We may assign these Terms to any affiliate or
                  successor without restriction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  Questions about these Terms? Contact us:
                </p>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <p className="text-white/80 leading-relaxed">
                    <strong className="text-white block mb-2">Moon Ring, Inc.</strong>
                    Email:{' '}
                    <a href="mailto:legal@moonring.com" className="text-[#FF33BA] hover:text-[#FF9966] transition-colors">
                      legal@moonring.com
                    </a>
                    <br />
                    Support:{' '}
                    <a href="mailto:support@moonring.com" className="text-[#FF33BA] hover:text-[#FF9966] transition-colors">
                      support@moonring.com
                    </a>
                    <br />
                    Address: 123 Innovation Drive, San Francisco, CA 94105
                  </p>
                </div>
              </section>

              <section className="border-t border-white/10 pt-8">
                <p className="text-white/60 text-sm leading-relaxed">
                  By using Moon Ring, you acknowledge that you have read, understood, and agree to be bound by these
                  Terms of Service. Thank you for being part of our accountability community!
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
              <p>&copy; 2025 Moon Ring. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white font-semibold">
                  Terms of Service
                </Link>
                <Link href="/" className="hover:text-white transition-colors">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
