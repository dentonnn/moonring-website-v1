import Navigation from '@/components/Navigation'
import EmailCaptureForm from '@/components/forms/EmailCaptureForm'
import Link from 'next/link'
import { CheckCircle, Heart, Users, Zap, Shield, TrendingUp, Star } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          {/* Hero Content */}
          <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left Column: Messaging */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-[#FF33BA] font-semibold text-sm">Behavioral Psychology</span>
                <span className="text-white/60 text-sm">·</span>
                <span className="text-white/80 text-sm">Social Accountability</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Turn your health{' '}
                <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                  intentions
                </span>
                {' '}into unbreakable{' '}
                <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                  commitments
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
                Moon Ring transforms your wearable data into lasting behavior change through
                evidence-based commitment psychology and social accountability.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                    67%
                  </div>
                  <div className="text-sm text-white/60 mt-1">Success Rate</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                    28M+
                  </div>
                  <div className="text-sm text-white/60 mt-1">Users Helped</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                    127
                  </div>
                  <div className="text-sm text-white/60 mt-1">Avg Streak Days</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
                >
                  Start Free Trial
                </a>
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-colors"
                >
                  See How It Works
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-4 pt-6">
                <div className="flex items-center gap-6 text-white/60 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>30-day free trial</span>
                  </div>
                </div>

                {/* Viral Hook */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <Users className="w-4 h-4 text-[#FF9966]" />
                  <span className="text-white/90 text-sm">
                    <strong className="text-white">Bring a friend:</strong> Accountability works best with people you know
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual/App Screenshot Placeholder */}
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                {/* Glass morphism card */}
                <div className="relative rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 shadow-2xl">
                  <div className="space-y-6">
                    {/* Placeholder for app screenshot */}
                    <div className="aspect-[9/16] max-w-[300px] mx-auto rounded-2xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 flex items-center justify-center">
                      <div className="text-center space-y-2 p-6">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-white/60 text-sm">App Screenshot</p>
                        <p className="text-white/40 text-xs">Coming Soon</p>
                      </div>
                    </div>

                    {/* Feature highlights */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-white/80">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Commitment-based goal setting</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/80">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">AI-powered accountability partners</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/80">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Works with any wearable device</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative gradient blur */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br from-[#FF33BA] to-[#FF9966] rounded-full blur-3xl opacity-20 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Path Section - NEW */}
      <section className="relative py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1B023A] mb-4">
              Choose Your Starting Point
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Moon Ring works with any wearable - or none at all. Pick the path that fits your life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Path 1: Existing Wearable */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#52ACFF] to-[#725CFA] rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative rounded-3xl bg-white border-2 border-gray-200 hover:border-[#52ACFF] p-8 transition-all hover:shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52ACFF] to-[#725CFA] flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#1B023A] mb-2">Have a Wearable?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Apple Watch, Fitbit, Garmin, Oura, Whoop, or any fitness tracker
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Most Popular Path</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#52ACFF] flex-shrink-0 mt-0.5" />
                    <span>Connect your existing device instantly</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#52ACFF] flex-shrink-0 mt-0.5" />
                    <span>Use data you're already tracking</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#52ACFF] flex-shrink-0 mt-0.5" />
                    <span>Start with commitment psychology today</span>
                  </li>
                </ul>

                <a
                  href="#pricing"
                  className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-[#52ACFF] to-[#725CFA] text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  See Software Plans
                </a>
                <p className="text-center text-xs text-gray-500 mt-3">From $9/month • 30-day free trial</p>
              </div>
            </div>

            {/* Path 2: No Wearable - Get Moon Ring */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF33BA] to-[#FF9966] rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative rounded-3xl bg-white border-2 border-gray-200 hover:border-[#FF33BA] p-8 transition-all hover:shadow-2xl">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white text-xs font-semibold rounded-full">
                  Complete Solution
                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF33BA] to-[#FF9966] flex items-center justify-center mb-6 mx-auto mt-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#1B023A] mb-2">Need a Wearable?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Get the Moon Ring - sleek, stylish, and built for commitment
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                    <Star className="w-4 h-4" />
                    <span>Hardware + Software</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#FF33BA] flex-shrink-0 mt-0.5" />
                    <span>Beautiful, minimalist form factor</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#FF33BA] flex-shrink-0 mt-0.5" />
                    <span>All health metrics you need</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#FF33BA] flex-shrink-0 mt-0.5" />
                    <span>Lifetime software access included</span>
                  </li>
                </ul>

                <a
                  href="#pricing"
                  className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Pre-Order Moon Ring
                </a>
                <p className="text-center text-xs text-gray-500 mt-3">$299 one-time • Ships Q2 2025</p>
              </div>
            </div>

            {/* Path 3: Freemium - Try First */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F7941D] to-[#FFF200] rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative rounded-3xl bg-white border-2 border-gray-200 hover:border-[#F7941D] p-8 transition-all hover:shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F7941D] to-[#FFF200] flex items-center justify-center mb-6 mx-auto">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#1B023A] mb-2">Not Sure Yet?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Start free with phone step tracking - no wearable needed
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                    <Shield className="w-4 h-4" />
                    <span>100% Free Forever</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#F7941D] flex-shrink-0 mt-0.5" />
                    <span>Track steps with your phone</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#F7941D] flex-shrink-0 mt-0.5" />
                    <span>Experience commitment psychology</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#F7941D] flex-shrink-0 mt-0.5" />
                    <span>Upgrade when you're ready</span>
                  </li>
                </ul>

                <a
                  href="#waitlist"
                  className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-[#F7941D] to-[#FFF200] text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Try Free Now
                </a>
                <p className="text-center text-xs text-gray-500 mt-3">No credit card • No wearable required</p>
              </div>
            </div>
          </div>

          {/* Clarification Note */}
          <div className="mt-12 text-center max-w-3xl mx-auto">
            <p className="text-gray-600 text-sm">
              <strong className="text-[#1B023A]">All paths include commitment psychology:</strong> The science of social accountability works regardless of which option you choose. Your wearable (or lack thereof) just determines what data we track.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="demo" className="relative py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1B023A] mb-4">
              How Commitment Psychology Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Evidence-based behavioral science that transforms intentions into lasting habits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Find Your Partner',
                description: 'Invite friends or get matched with real people who share your goals. Human accountability is 3x more effective than apps alone.',
                color: 'from-[#FF33BA] to-[#FF9966]',
                subtext: 'AI matching helps find compatible humans'
              },
              {
                icon: Heart,
                title: 'Create Commitments',
                description: 'Set clear, measurable goals with commitment contracts backed by behavioral psychology.',
                color: 'from-[#52ACFF] to-[#725CFA]',
                subtext: 'Lock in together for mutual success'
              },
              {
                icon: CheckCircle,
                title: 'Hold Each Other Accountable',
                description: 'Real-time check-ins, encouragement, and social rescue when one of you struggles. Real humans, real support.',
                color: 'from-[#F7941D] to-[#FFF200]',
                subtext: 'Both succeed or both try again'
              }
            ].map((step, index) => (
              <div
                key={index}
                className="relative rounded-3xl bg-gray-50 p-8 hover:shadow-xl transition-shadow group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B023A] mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-3">{step.description}</p>
                <p className="text-sm text-gray-500 italic">{step.subtext}</p>
              </div>
            ))}
          </div>

          {/* Clarification Box */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="rounded-2xl bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 border border-[#FF33BA]/20 p-6">
              <h4 className="font-bold text-[#1B023A] mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#FF33BA]" />
                Real Humans, Real Accountability
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#FF33BA] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Invite Friends:</strong> Best results come from people you know. Send invites directly to friends or family.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#FF33BA] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Community Matching:</strong> No friends available? Our algorithm pairs you with compatible strangers who become accountability allies.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#FF33BA] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>AI Coaching Support:</strong> Can't find a human partner? AI keeps you on track until you're ready to invite someone.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#FF33BA] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Grow the Network:</strong> Every friend you invite strengthens the ecosystem - help us build the accountability revolution!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="stories" className="relative py-20 px-4 bg-gradient-to-b from-[#1B023A] to-[#2D1B69]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Real People, Real Results
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              See how commitment psychology has transformed lives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                achievement: '127-day sleep commitment',
                quote: 'Having an accountability partner made all the difference. We kept each other on track every single night.',
                metric: '8 hours avg',
                improvement: '+43%'
              },
              {
                name: 'Marcus Johnson',
                achievement: '90-day movement goal',
                quote: 'The social pressure (in a good way) kept me honest. Knowing someone was counting on me was game-changing.',
                metric: '12K steps',
                improvement: '+67%'
              },
              {
                name: 'Emily Rodriguez',
                achievement: '60-day stress management',
                quote: 'Meditation felt impossible alone. With my partner checking in daily, I never missed a session.',
                metric: '15 min daily',
                improvement: '+100%'
              }
            ].map((story, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF33BA] to-[#FF9966] flex items-center justify-center text-white font-bold text-xl">
                    {story.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{story.name}</h4>
                    <p className="text-sm text-white/60">{story.achievement}</p>
                  </div>
                </div>
                <p className="text-white/80 mb-6 italic">"{story.quote}"</p>
                <div className="flex gap-4 text-center">
                  <div className="flex-1 rounded-2xl bg-white/5 p-3">
                    <div className="text-2xl font-bold text-[#FF33BA]">{story.metric}</div>
                    <div className="text-xs text-white/60">Average</div>
                  </div>
                  <div className="flex-1 rounded-2xl bg-white/5 p-3">
                    <div className="text-2xl font-bold text-[#FF9966]">{story.improvement}</div>
                    <div className="text-xs text-white/60">Improvement</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Psychology/Research Section */}
      <section id="psychology" className="relative py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1B023A] mb-4">
              Backed by Science
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our approach is grounded in peer-reviewed behavioral psychology research
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-3xl bg-gradient-to-br from-[#52ACFF]/10 to-[#725CFA]/10 border border-[#52ACFF]/20 p-8">
              <h3 className="text-2xl font-bold text-[#1B023A] mb-4">
                Commitment Devices
              </h3>
              <p className="text-gray-600 mb-6">
                Research shows that public commitments increase goal achievement by 65%. Social accountability
                transforms abstract intentions into concrete obligations.
              </p>
              <div className="flex items-center gap-2 text-[#52ACFF] font-semibold">
                <Star className="w-5 h-5" />
                <span>Published in Journal of Behavioral Medicine</span>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-[#FF33BA]/10 to-[#FF9966]/10 border border-[#FF33BA]/20 p-8">
              <h3 className="text-2xl font-bold text-[#1B023A] mb-4">
                Social Accountability
              </h3>
              <p className="text-gray-600 mb-6">
                Studies demonstrate that having an accountability partner increases success rates by up to 95%
                compared to pursuing goals alone.
              </p>
              <div className="flex items-center gap-2 text-[#FF33BA] font-semibold">
                <Star className="w-5 h-5" />
                <span>American Society of Training and Development</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gray-50 p-12 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '67%', label: 'Higher completion rate' },
                { number: '3.2x', label: 'Longer streaks' },
                { number: '89%', label: 'Recommend to friends' },
                { number: '127', label: 'Average streak days' }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-20 px-4 bg-gradient-to-b from-[#1B023A] to-[#2D1B69]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Software Pricing
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Unlock the full power of commitment psychology with a software plan
            </p>
            <p className="text-sm text-white/60 mt-3">
              Works with any wearable device • 30-day money-back guarantee
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Free',
                price: '$0',
                period: '/forever',
                description: 'Experience commitment psychology basics',
                features: [
                  'Phone step tracking only',
                  'One active commitment',
                  'Community matching',
                  'Basic progress tracking',
                  'Email support'
                ],
                cta: 'Start Free',
                popular: false,
                highlight: false
              },
              {
                name: 'Starter',
                price: '$9',
                period: '/month',
                description: 'Perfect for single-goal focus',
                features: [
                  'Connect any wearable',
                  'One active commitment',
                  'One accountability partner',
                  'Full progress analytics',
                  'Priority support',
                  '30-day free trial'
                ],
                cta: 'Start Free Trial',
                popular: false,
                highlight: false
              },
              {
                name: 'Growth',
                price: '$19',
                period: '/month',
                description: 'For multi-dimensional health',
                features: [
                  'Connect any wearable',
                  'Three active commitments',
                  'Multiple partners',
                  'Advanced analytics & insights',
                  'Priority support',
                  'Group challenges',
                  'Custom goals',
                  '30-day free trial'
                ],
                cta: 'Start Free Trial',
                popular: true,
                highlight: true
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-3xl p-8 ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-white/20 to-white/10 border-2 border-[#FF33BA] scale-105'
                    : 'bg-white/10 border border-white/20'
                } backdrop-blur-sm transition-transform hover:scale-105`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 text-sm mb-6 min-h-[40px]">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/60">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 min-h-[200px]">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <CheckCircle className="w-5 h-5 text-[#FF33BA] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`block text-center w-full py-4 rounded-full font-semibold transition-all ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white hover:opacity-90 shadow-lg shadow-pink-500/25'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture/CTA Section */}
      <section id="waitlist" className="relative py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 sm:p-12 text-center shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Join the Waitlist
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Be the first to experience commitment psychology for lasting behavior change.
            </p>
            <EmailCaptureForm />
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
                <li><a href="#demo" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#stories" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Research</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#psychology" className="hover:text-white transition-colors">Behavioral Science</a></li>
                <li><a href="#psychology" className="hover:text-white transition-colors">Clinical Studies</a></li>
                <li><a href="#psychology" className="hover:text-white transition-colors">Research Partners</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="mailto:support@moonring.com" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
            <p>&copy; 2025 Moon Ring. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
