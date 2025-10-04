'use client'

import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { ArrowLeft, Building2, TrendingUp, Users, Shield, CheckCircle, Calculator, BarChart3, Award, Clock, Target, DollarSign } from 'lucide-react'
import { useState } from 'react'

export default function EnterprisePage() {
  const [employees, setEmployees] = useState(500)
  const [currentEngagement, setCurrentEngagement] = useState(32)
  const [targetEngagement, setTargetEngagement] = useState(80)

  // ROI Calculations with safety guards
  const safeEmployees = Math.max(employees || 0, 10) // Minimum 10 employees for meaningful calculations
  const safeCurrentEngagement = Math.max(Math.min(currentEngagement, 95), 10) // Clamp 10-95%
  const safeTargetEngagement = Math.max(Math.min(targetEngagement, 95), safeCurrentEngagement) // Target must be >= current

  const annualHealthcareCost = safeEmployees * 12000 // $12K per employee average
  const engagementImprovement = safeTargetEngagement - safeCurrentEngagement
  const productivityGain = (engagementImprovement / 100) * safeEmployees * 50000 // $50K avg productivity
  const healthcareReduction = (engagementImprovement / 100) * annualHealthcareCost * 0.15
  const absenteeismReduction = safeEmployees * 2.5 * (engagementImprovement / 100) * 200 // 2.5 days/year, $200/day
  const totalAnnualSavings = productivityGain + healthcareReduction + absenteeismReduction
  const programCost = safeEmployees * 19 * 12 // $19/mo per employee
  const netROI = totalAnnualSavings - programCost

  // Safe ROI multiplier calculation - prevent division by zero
  const roiMultiplier = programCost > 0
    ? (totalAnnualSavings / programCost).toFixed(1)
    : '0.0'

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
                <Building2 className="w-5 h-5 text-[#FF33BA]" />
                <span className="text-white/80 text-sm font-medium">Enterprise Solutions</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transform Employee Wellness{' '}
                <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                  Through Accountability
                </span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                Moon Ring for Enterprise brings evidence-based commitment psychology to your
                workplace wellness program, driving 2.5x higher engagement than traditional approaches.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { number: '80%+', label: 'Engagement Rate' },
                  { number: '3.2x', label: 'ROI Improvement' },
                  { number: '67%', label: 'Goal Completion' },
                  { number: '500K+', label: 'Employees Served' }
                ].map((stat, idx) => (
                  <div key={idx} className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent mb-1">
                      {stat.number}
                    </div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Calculator className="w-6 h-6 text-[#FF33BA]" />
                <h2 className="text-3xl font-bold text-[#1B023A]">Calculate Your ROI</h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See the projected financial impact of implementing Moon Ring at your organization
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 p-8 sm:p-12 mb-8">
              {/* Inputs */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div>
                  <label className="block text-[#1B023A] font-semibold mb-3">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    value={employees}
                    onChange={(e) => setEmployees(Math.max(parseInt(e.target.value) || 10, 10))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF33BA] focus:outline-none text-[#1B023A] font-semibold text-lg"
                    min="10"
                    max="100000"
                  />
                </div>

                <div>
                  <label className="block text-[#1B023A] font-semibold mb-3">
                    Current Engagement Rate
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="10"
                      max="60"
                      value={currentEngagement}
                      onChange={(e) => setCurrentEngagement(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF33BA]"
                    />
                    <div className="mt-2 text-center">
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                        {currentEngagement}%
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[#1B023A] font-semibold mb-3">
                    Target Engagement Rate
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="50"
                      max="95"
                      value={targetEngagement}
                      onChange={(e) => setTargetEngagement(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#52ACFF]"
                    />
                    <div className="mt-2 text-center">
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#52ACFF] to-[#725CFA] bg-clip-text text-transparent">
                        {targetEngagement}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="rounded-2xl bg-gradient-to-br from-[#FF33BA]/10 to-[#FF9966]/10 border border-[#FF33BA]/20 p-8 mb-8">
                <h3 className="text-2xl font-bold text-[#1B023A] mb-6 text-center">
                  Projected Annual Impact
                </h3>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="rounded-xl bg-white p-6 text-center">
                    <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-[#1B023A] mb-1">
                      ${(productivityGain / 1000000).toFixed(2)}M
                    </div>
                    <div className="text-gray-600 text-sm">Productivity Gains</div>
                  </div>

                  <div className="rounded-xl bg-white p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-[#1B023A] mb-1">
                      ${(healthcareReduction / 1000000).toFixed(2)}M
                    </div>
                    <div className="text-gray-600 text-sm">Healthcare Savings</div>
                  </div>

                  <div className="rounded-xl bg-white p-6 text-center">
                    <Clock className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-[#1B023A] mb-1">
                      ${(absenteeismReduction / 1000000).toFixed(2)}M
                    </div>
                    <div className="text-gray-600 text-sm">Reduced Absenteeism</div>
                  </div>
                </div>

                <div className="border-t-2 border-[#FF33BA]/20 pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-xl bg-white p-6">
                      <div className="text-gray-600 mb-2">Total Annual Savings</div>
                      <div className="text-4xl font-bold text-green-600">
                        ${(totalAnnualSavings / 1000000).toFixed(2)}M
                      </div>
                    </div>
                    <div className="rounded-xl bg-white p-6">
                      <div className="text-gray-600 mb-2">Annual Program Cost</div>
                      <div className="text-4xl font-bold text-[#1B023A]">
                        ${(programCost / 1000000).toFixed(2)}M
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-[#FF33BA] to-[#FF9966] p-8 text-center text-white">
                <div className="text-sm font-semibold mb-2">NET ANNUAL ROI</div>
                <div className="text-5xl font-bold mb-3">
                  ${(netROI / 1000000).toFixed(2)}M
                </div>
                <div className="text-white/90 text-lg">
                  <strong>{roiMultiplier}x</strong> return on investment
                </div>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm">
              * Calculations based on industry averages and typical Moon Ring enterprise outcomes.
              Actual results may vary based on organization size, industry, and implementation.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Enterprise Features
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Everything you need to run a successful corporate wellness program
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: BarChart3,
                  title: 'Admin Dashboard',
                  description: 'Real-time analytics on employee engagement, goal completion rates, and ROI tracking across departments.',
                  features: ['Department-level metrics', 'Engagement heatmaps', 'Custom reporting', 'Export capabilities']
                },
                {
                  icon: Shield,
                  title: 'Enterprise Security',
                  description: 'HIPAA-compliant data handling, SSO integration, and granular permission controls for HR teams.',
                  features: ['HIPAA compliance', 'SSO/SAML integration', 'Role-based access', 'Audit logs']
                },
                {
                  icon: Users,
                  title: 'Team Challenges',
                  description: 'Create department-wide or company-wide challenges that build camaraderie and friendly competition.',
                  features: ['Custom challenges', 'Leaderboards', 'Team matching', 'Prize integration']
                },
                {
                  icon: Target,
                  title: 'Goal Templates',
                  description: 'Pre-built commitment templates aligned with your wellness program objectives and company culture.',
                  features: ['Custom templates', 'Department goals', 'Seasonal programs', 'Compliance tracking']
                },
                {
                  icon: Award,
                  title: 'White-Label Option',
                  description: 'Brand the platform with your company identity for seamless integration with existing wellness programs.',
                  features: ['Custom branding', 'Domain mapping', 'Email templates', 'App theming']
                },
                {
                  icon: TrendingUp,
                  title: 'Success Coaching',
                  description: 'Dedicated account manager and implementation support to maximize program adoption and ROI.',
                  features: ['Onboarding support', 'Best practice training', 'Quarterly reviews', 'Priority support']
                }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/80 mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#FF33BA] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1B023A] mb-4">
                Enterprise Success Stories
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See how leading organizations use Moon Ring to transform employee wellness
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  company: 'TechCorp Global',
                  industry: 'Software • 2,500 employees',
                  challenge: 'Only 28% employee engagement in wellness program, high burnout rates',
                  results: [
                    '82% engagement rate after 6 months',
                    '$1.2M in productivity gains annually',
                    '34% reduction in healthcare claims',
                    '4.3x ROI in first year'
                  ],
                  quote: 'Moon Ring transformed our wellness program from a checkbox exercise to a genuine culture shift.',
                  author: 'Sarah Chen, Chief People Officer'
                },
                {
                  company: 'HealthFirst Insurance',
                  industry: 'Healthcare • 5,000 employees',
                  challenge: 'Fragmented wellness initiatives, low participation, high absenteeism',
                  results: [
                    '76% sustained engagement',
                    '$2.8M reduction in absenteeism costs',
                    '89% employee satisfaction score',
                    '5.1x ROI in 18 months'
                  ],
                  quote: 'The social accountability model works. Our employees finally have a wellness program that sticks.',
                  author: 'Michael Torres, VP of Employee Experience'
                }
              ].map((study, idx) => (
                <div key={idx} className="rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#1B023A] mb-2">{study.company}</h3>
                    <p className="text-gray-600 text-sm">{study.industry}</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-600 mb-2">Challenge:</div>
                    <p className="text-gray-700">{study.challenge}</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-600 mb-3">Results:</div>
                    <ul className="space-y-2">
                      {study.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 border border-[#FF33BA]/20 p-6">
                    <p className="text-[#1B023A] italic mb-3">"{study.quote}"</p>
                    <p className="text-gray-600 text-sm font-semibold">— {study.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Process */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Simple Implementation
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                From contract to full rollout in as little as 30 days
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Discovery Call', description: 'Understand your goals, assess needs, and design custom program', duration: 'Week 1' },
                { step: '2', title: 'Platform Setup', description: 'Configure admin dashboard, branding, integrations, and user access', duration: 'Week 2' },
                { step: '3', title: 'Pilot Launch', description: 'Test with 50-100 employees, gather feedback, refine approach', duration: 'Week 3' },
                { step: '4', title: 'Full Rollout', description: 'Company-wide launch with marketing support and training resources', duration: 'Week 4+' }
              ].map((phase, idx) => (
                <div key={idx} className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 text-center hover:bg-white/15 transition-all">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center text-white font-bold text-2xl">
                    {phase.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{phase.description}</p>
                  <div className="text-[#FF33BA] font-semibold text-sm">{phase.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#1B023A] mb-6">
              Ready to Transform Your Wellness Program?
            </h2>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              Schedule a demo with our enterprise team to see Moon Ring in action and discuss
              custom pricing for your organization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
              >
                Schedule a Demo
              </Link>
              <a
                href="mailto:enterprise@moonring.com"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white border-2 border-gray-300 text-[#1B023A] font-semibold text-lg hover:border-[#FF33BA] transition-colors"
              >
                Email Sales Team
              </a>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No long-term contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Dedicated support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Custom pricing</span>
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
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
