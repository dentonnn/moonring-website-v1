import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Moon Ring',
  description: 'Moon Ring privacy policy - How we collect, use, and protect your personal information and health data.',
}

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            <p className="text-white/60 text-sm">
              Last Updated: January 15, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 sm:p-12 space-y-8">

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                <p className="text-white/80 leading-relaxed">
                  Moon Ring ("we," "our," or "us") is committed to protecting your privacy and handling your
                  data transparently. This Privacy Policy explains how we collect, use, share, and protect your
                  personal information when you use our website, mobile applications, and services (collectively,
                  the "Services").
                </p>
                <p className="text-white/80 leading-relaxed mt-4">
                  By using Moon Ring, you agree to the collection and use of information in accordance with this policy.
                  If you do not agree with our policies and practices, please do not use our Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>

                <h3 className="text-xl font-semibold text-white mb-3 mt-6">Personal Information</h3>
                <p className="text-white/80 leading-relaxed mb-3">
                  When you create an account or use our Services, we may collect:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Name and email address</li>
                  <li>Account credentials (username and encrypted password)</li>
                  <li>Profile information (age, gender, location - optional)</li>
                  <li>Payment information (processed securely through Stripe)</li>
                  <li>Communication preferences</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-6">Health and Wearable Data</h3>
                <p className="text-white/80 leading-relaxed mb-3">
                  With your explicit consent, we collect health and fitness data from your connected wearable devices:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Activity metrics (steps, distance, active minutes)</li>
                  <li>Sleep data (duration, quality, patterns)</li>
                  <li>Heart rate and heart rate variability</li>
                  <li>Exercise and workout information</li>
                  <li>Other health metrics supported by your device</li>
                </ul>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mt-4">
                  <p className="text-white/80 text-sm leading-relaxed">
                    <strong className="text-white">Important:</strong> You control which wearable devices connect
                    to Moon Ring. You can disconnect devices or revoke data access at any time through your account
                    settings.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 mt-6">Usage and Technical Data</h3>
                <p className="text-white/80 leading-relaxed mb-3">
                  We automatically collect certain information about your device and usage:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Device type, operating system, and browser information</li>
                  <li>IP address and general location (city/country level)</li>
                  <li>App usage patterns and feature interactions</li>
                  <li>Performance data and error logs</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-6">Social Accountability Data</h3>
                <p className="text-white/80 leading-relaxed mb-3">
                  When you participate in accountability partnerships:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Commitment goals and progress updates</li>
                  <li>Messages and check-ins with accountability partners</li>
                  <li>Group challenge participation and results</li>
                  <li>Achievement badges and milestone data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                <p className="text-white/80 leading-relaxed mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li><strong className="text-white">Provide and improve our Services:</strong> Track your commitments, connect with accountability partners, analyze progress</li>
                  <li><strong className="text-white">Personalize your experience:</strong> Tailor recommendations, match compatible partners, customize insights</li>
                  <li><strong className="text-white">Communicate with you:</strong> Send progress updates, partner messages, product announcements, and support responses</li>
                  <li><strong className="text-white">Process payments:</strong> Handle subscriptions and transactions securely</li>
                  <li><strong className="text-white">Ensure security:</strong> Detect and prevent fraud, abuse, and security issues</li>
                  <li><strong className="text-white">Conduct research:</strong> Analyze aggregate data to improve behavioral science features (always anonymized)</li>
                  <li><strong className="text-white">Comply with legal obligations:</strong> Meet regulatory requirements and enforce our Terms of Service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">How We Share Your Information</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  We respect your privacy and do not sell your personal information. We may share your data in the following limited circumstances:
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">With Your Accountability Partners</h3>
                <p className="text-white/80 leading-relaxed mb-3">
                  When you create commitments with accountability partners, relevant progress data is shared to enable
                  mutual support. You control what is shared through your privacy settings.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">With Service Providers</h3>
                <p className="text-white/80 leading-relaxed mb-3">
                  We work with trusted third-party providers who help us operate our Services:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Cloud hosting and infrastructure (AWS, Vercel)</li>
                  <li>Payment processing (Stripe)</li>
                  <li>Email delivery (Resend)</li>
                  <li>Analytics and performance monitoring</li>
                  <li>Customer support tools</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-3">
                  These providers are contractually obligated to protect your data and use it only for specified purposes.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">For Legal Reasons</h3>
                <p className="text-white/80 leading-relaxed">
                  We may disclose your information if required by law, legal process, or to protect the rights,
                  property, or safety of Moon Ring, our users, or others.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">Business Transfers</h3>
                <p className="text-white/80 leading-relaxed">
                  If Moon Ring is involved in a merger, acquisition, or sale of assets, your information may be
                  transferred. We will notify you before your data becomes subject to a different privacy policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                <p className="text-white/80 leading-relaxed mb-3">
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Encryption of data in transit (TLS/SSL) and at rest</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Secure authentication and access controls</li>
                  <li>Monitoring for suspicious activity and vulnerabilities</li>
                  <li>Employee training on data protection best practices</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-4">
                  While we strive to protect your data, no method of transmission over the Internet or electronic
                  storage is 100% secure. We cannot guarantee absolute security but remain committed to protecting
                  your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Your Privacy Rights</h2>
                <p className="text-white/80 leading-relaxed mb-3">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li><strong className="text-white">Access:</strong> Request a copy of your personal information</li>
                  <li><strong className="text-white">Correction:</strong> Update or correct inaccurate data</li>
                  <li><strong className="text-white">Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong className="text-white">Portability:</strong> Receive your data in a machine-readable format</li>
                  <li><strong className="text-white">Objection:</strong> Object to certain data processing activities</li>
                  <li><strong className="text-white">Restriction:</strong> Request limited processing of your data</li>
                  <li><strong className="text-white">Withdrawal:</strong> Withdraw consent for data collection at any time</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-4">
                  To exercise any of these rights, contact us at{' '}
                  <a href="mailto:privacy@moonring.com" className="text-[#FF33BA] hover:text-[#FF9966] transition-colors">
                    privacy@moonring.com
                  </a>
                  . We will respond within 30 days.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
                <p className="text-white/80 leading-relaxed">
                  We retain your information for as long as necessary to provide our Services and comply with legal
                  obligations. When you delete your account, we will delete or anonymize your personal data within
                  90 days, except where we must retain it for legal, tax, or security purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
                <p className="text-white/80 leading-relaxed">
                  Moon Ring is not intended for children under 13 years of age. We do not knowingly collect personal
                  information from children under 13. If you believe we have collected information from a child under 13,
                  please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">International Data Transfers</h2>
                <p className="text-white/80 leading-relaxed">
                  Your information may be transferred to and processed in countries other than your own. We ensure
                  appropriate safeguards are in place, such as Standard Contractual Clauses, to protect your data
                  in compliance with GDPR and other data protection regulations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-white/80 leading-relaxed mb-3">
                  We use cookies and similar technologies to improve your experience:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li><strong className="text-white">Essential cookies:</strong> Required for the Services to function</li>
                  <li><strong className="text-white">Analytics cookies:</strong> Help us understand how you use our Services</li>
                  <li><strong className="text-white">Preference cookies:</strong> Remember your settings and choices</li>
                </ul>
                <p className="text-white/80 leading-relaxed mt-4">
                  You can control cookies through your browser settings. Note that disabling certain cookies may
                  limit your ability to use some features of our Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
                <p className="text-white/80 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of material changes by
                  email or through a prominent notice in our Services. Your continued use of Moon Ring after changes
                  become effective constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <p className="text-white/80 leading-relaxed">
                    <strong className="text-white block mb-2">Moon Ring, Inc.</strong>
                    Email:{' '}
                    <a href="mailto:privacy@moonring.com" className="text-[#FF33BA] hover:text-[#FF9966] transition-colors">
                      privacy@moonring.com
                    </a>
                    <br />
                    Address: 123 Innovation Drive, San Francisco, CA 94105
                  </p>
                </div>
              </section>

              <section className="border-t border-white/10 pt-8">
                <h2 className="text-2xl font-bold text-white mb-4">Regional Notices</h2>

                <h3 className="text-xl font-semibold text-white mb-3">California Residents (CCPA)</h3>
                <p className="text-white/80 leading-relaxed mb-4">
                  California residents have additional rights under the California Consumer Privacy Act (CCPA).
                  You may request information about data collection, opt-out of data sales (we do not sell data),
                  and exercise other CCPA rights by contacting us.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">European Union Residents (GDPR)</h3>
                <p className="text-white/80 leading-relaxed">
                  EU residents have rights under the General Data Protection Regulation (GDPR), including the right
                  to access, rectify, erase, restrict processing, data portability, and object to processing. You
                  also have the right to lodge a complaint with your local data protection authority.
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
                <Link href="/privacy" className="text-white font-semibold">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
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