import Navigation from '@/components/Navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Heart, Users, Zap, Target, Globe, Award } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Moon Ring',
  description: "Learn about Moon Ring's mission to transform health through social accountability and commitment psychology.",
}

export default function AboutPage() {
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

            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                We believe lasting change happens{' '}
                <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                  together
                </span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Moon Ring exists to make health commitments that stick—by harnessing the power
                of human accountability and behavioral science.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-[#1B023A] mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  We started Moon Ring after watching countless friends buy expensive wearables, track
                  their health religiously for a few weeks, then abandon them in a drawer. The problem
                  wasn't the technology—it was the lack of accountability.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Research shows that <strong>social accountability increases goal achievement by up to 95%</strong>.
                  Yet most health apps focus on gamification, badges, and AI coaching—all of which fade
                  in effectiveness over time.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Moon Ring brings real human connection back into health tracking. When someone is counting
                  on you—and you're counting on them—showing up becomes non-negotiable.
                </p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-[#FF33BA]/10 to-[#FF9966]/10 border border-[#FF33BA]/20 p-8">
                {/* Ecosystem Diagram */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="/images/hero/ecosystem-diagram.png"
                    alt="Moon Ring Ecosystem - How Social Accountability Works"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1B023A] mb-2">Commitment-First</h3>
                      <p className="text-gray-600">
                        We believe in the psychology of public commitments—making promises you're
                        motivated to keep.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#52ACFF] to-[#725CFA] flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1B023A] mb-2">Human Connection</h3>
                      <p className="text-gray-600">
                        Real accountability comes from real people—friends, family, or matched
                        community members.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#F7941D] to-[#FFF200] flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1B023A] mb-2">Evidence-Based</h3>
                      <p className="text-gray-600">
                        Every feature is grounded in peer-reviewed behavioral psychology and
                        commitment research.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-white mb-6">How Moon Ring Began</h2>

              <div className="space-y-6 text-white/80 leading-relaxed">
                <p>
                  Moon Ring was born from a simple observation: <strong className="text-white">wearable devices collect
                  incredible data, but most people stop using them within three months</strong>. The drawer at home is
                  filled with abandoned Fitbits, Apple Watches collecting dust, and Oura Rings forgotten.
                </p>

                <p>
                  Our founder, after countless failed personal health goals, stumbled on a breakthrough during a
                  marathon training program. The only reason he finished the 16-week plan? <strong className="text-white">His
                  running buddy checked in every single morning</strong>. On days when motivation was zero, accountability
                  was everything.
                </p>

                <p>
                  This experience led to months of research into behavioral psychology, commitment devices, and social
                  accountability. The data was clear: <strong className="text-white">having an accountability partner
                  increases goal completion rates by 65-95%</strong>, depending on the study. Yet no major health platform
                  was leveraging this insight at scale.
                </p>

                <p>
                  Moon Ring was built to bridge that gap. We started with a simple prototype—an app that matched
                  users with accountability partners for walking goals. The results were staggering. Users not only
                  completed their commitments at higher rates but stayed engaged for months, not weeks.
                </p>

                <p>
                  Today, Moon Ring connects thousands of people worldwide who are turning health intentions into
                  lasting habits—together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1B023A] mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide every decision we make and every feature we build.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: 'Human-First Design',
                  description: 'Technology should enhance human connection, not replace it. We prioritize real relationships over algorithmic engagement.',
                  color: 'from-[#FF33BA] to-[#FF9966]'
                },
                {
                  icon: Globe,
                  title: 'Inclusive & Accessible',
                  description: 'Health commitments work for everyone. We build features that serve all bodies, all abilities, and all starting points.',
                  color: 'from-[#52ACFF] to-[#725CFA]'
                },
                {
                  icon: Zap,
                  title: 'Privacy & Transparency',
                  description: "Your health data is yours. We're transparent about what we collect, how we use it, and who has access.",
                  color: 'from-[#F7941D] to-[#FFF200]'
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="rounded-3xl bg-white border-2 border-gray-100 p-8 hover:shadow-xl transition-shadow"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1B023A] mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Moon Ring by the Numbers
              </h2>
              <p className="text-white/80 text-lg">
                Our community is growing—and so is the impact.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '28M+', label: 'Users Helped', sublabel: 'Across all platforms' },
                { number: '67%', label: 'Success Rate', sublabel: 'Goal completion' },
                { number: '127', label: 'Avg Streak', sublabel: 'Days maintained' },
                { number: '89%', label: 'User Rating', sublabel: 'Would recommend' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white font-semibold mb-1">{stat.label}</div>
                  <div className="text-white/60 text-sm">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1B023A] mb-4">
                Meet the Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A small, passionate team dedicated to making accountability accessible to everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: 'Alex Chen',
                  role: 'Founder & CEO',
                  bio: 'Former product lead at Fitbit. Marathon runner who learned accountability the hard way.',
                  initials: 'AC'
                },
                {
                  name: 'Dr. Sarah Mitchell',
                  role: 'Head of Behavioral Science',
                  bio: 'PhD in Health Psychology from Stanford. Published researcher in commitment devices.',
                  initials: 'SM'
                },
                {
                  name: 'Jordan Rivera',
                  role: 'Head of Engineering',
                  bio: 'Built health tech at Apple and Strava. Believes in privacy-first design.',
                  initials: 'JR'
                },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF33BA] to-[#FF9966] flex items-center justify-center text-white text-3xl font-bold">
                    {member.initials}
                  </div>
                  <h3 className="text-xl font-bold text-[#1B023A] mb-1">{member.name}</h3>
                  <p className="text-[#FF33BA] font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Join the Movement
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Whether you're looking to improve sleep, increase activity, or build better habits—Moon Ring
                is here to help you commit, connect, and succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#waitlist"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/#demo"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
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
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="/about" className="text-white font-semibold">About Us</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                  <li><a href="mailto:support@moonring.com" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-white/60 text-sm">
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
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}