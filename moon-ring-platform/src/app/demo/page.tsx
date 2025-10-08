'use client'

import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { ArrowLeft, Heart, Users, Zap, CheckCircle, ArrowRight, Target, TrendingUp, Award } from 'lucide-react'
import { useState } from 'react'

// Note: Metadata export doesn't work in 'use client' components
// SEO is handled via the parent layout and dynamic metadata generation

const commitmentCategories = [
  {
    id: 'sleep',
    name: 'Sleep',
    icon: '😴',
    color: 'from-[#52ACFF] to-[#725CFA]',
    description: 'Build consistent sleep habits',
    examples: ['8 hours nightly', 'Consistent bedtime', 'Sleep quality']
  },
  {
    id: 'movement',
    name: 'Movement',
    icon: '🏃',
    color: 'from-[#F7941D] to-[#FFF200]',
    description: 'Stay active every day',
    examples: ['10K daily steps', 'Workout 3x/week', 'Morning walks']
  },
  {
    id: 'stress',
    name: 'Stress Management',
    icon: '🧘',
    color: 'from-[#FF5A5A] to-[#660000]',
    description: 'Reduce stress through practice',
    examples: ['Daily meditation', 'Breathing exercises', 'Mindfulness']
  },
  {
    id: 'recovery',
    name: 'Recovery',
    icon: '💪',
    color: 'from-[#2CE6FF] to-[#006699]',
    description: 'Optimize rest and recovery',
    examples: ['HRV tracking', 'Active recovery', 'Rest days']
  }
]

const mockPartners = [
  {
    name: 'Sarah M.',
    goal: 'Sleep consistency',
    compatibility: 95,
    timezone: 'PST',
    streak: 42,
    avatar: 'SM'
  },
  {
    name: 'Mike T.',
    goal: 'Daily movement',
    compatibility: 88,
    timezone: 'EST',
    streak: 67,
    avatar: 'MT'
  },
  {
    name: 'Emma L.',
    goal: 'Stress management',
    compatibility: 92,
    timezone: 'CST',
    streak: 34,
    avatar: 'EL'
  }
]

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [commitmentDays, setCommitmentDays] = useState(30)
  const [selectedPartner, setSelectedPartner] = useState<number | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleNextStep = () => {
    if (currentStep === 3) {
      setShowSuccess(true)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const canProceed = () => {
    if (currentStep === 1) return selectedCategory !== null
    if (currentStep === 2) return commitmentDays >= 7
    if (currentStep === 3) return selectedPartner !== null
    return false
  }

  const resetDemo = () => {
    setCurrentStep(1)
    setSelectedCategory(null)
    setCommitmentDays(30)
    setSelectedPartner(null)
    setShowSuccess(false)
  }

  const selectedCategoryData = commitmentCategories.find(c => c.id === selectedCategory)

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A]">

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Zap className="w-5 h-5 text-[#FF33BA]" />
                <span className="text-white/80 text-sm font-medium">Interactive Experience</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Experience{' '}
                <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                  Commitment Psychology
                </span>
                {' '}in Action
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                See how Moon Ring turns intentions into unbreakable commitments through
                social accountability. Try creating your first commitment below.
              </p>
            </div>
          </div>
        </section>

        {/* Success State */}
        {showSuccess && (
          <section className="relative py-12 px-4">
            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-400/30 p-8 sm:p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Commitment Created! 🎉
                </h2>
                <p className="text-white/80 text-lg mb-6">
                  You just experienced how Moon Ring transforms vague intentions into concrete commitments
                  backed by social accountability. Ready to make it real?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <Link
                    href="/#waitlist"
                    data-analytics-event="start_trial"
                    data-analytics-params={JSON.stringify({ location: 'demo_success_cta' })}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
                  >
                    Start Free Trial
                  </Link>
                  <button
                    onClick={resetDemo}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-colors"
                  >
                    Try Another Commitment
                  </button>
                </div>
                <p className="text-white/60 text-sm">
                  No credit card required • 30-day free trial • Cancel anytime
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Demo Wizard */}
        {!showSuccess && (
          <section className="relative py-12 px-4">
            <div className="max-w-5xl mx-auto">

              {/* Progress Indicator */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        currentStep >= step
                          ? 'bg-gradient-to-r from-[#FF33BA] to-[#FF9966] border-[#FF33BA] text-white'
                          : 'border-white/30 text-white/50'
                      } font-bold transition-all`}>
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`flex-1 h-1 mx-2 ${
                          currentStep > step ? 'bg-gradient-to-r from-[#FF33BA] to-[#FF9966]' : 'bg-white/20'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-white/70">
                  <span className={currentStep === 1 ? 'text-[#FF33BA] font-semibold' : ''}>Choose Focus</span>
                  <span className={currentStep === 2 ? 'text-[#FF33BA] font-semibold' : ''}>Set Commitment</span>
                  <span className={currentStep === 3 ? 'text-[#FF33BA] font-semibold' : ''}>Find Partner</span>
                </div>
              </div>

              {/* Step 1: Choose Category */}
              {currentStep === 1 && (
                <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 sm:p-12">
                  <h2 className="text-3xl font-bold text-white mb-3 text-center">
                    What health area do you want to improve?
                  </h2>
                  <p className="text-white/70 text-center mb-8">
                    Choose the area where you'll make your first commitment
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {commitmentCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`group relative rounded-2xl p-6 text-left transition-all ${
                          selectedCategory === category.id
                            ? `bg-gradient-to-br ${category.color} shadow-lg scale-105`
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="text-4xl">{category.icon}</div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                            <p className="text-white/80 text-sm">{category.description}</p>
                          </div>
                          {selectedCategory === category.id && (
                            <CheckCircle className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {category.examples.map((example, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/90"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNextStep}
                      disabled={!canProceed()}
                      className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all ${
                        canProceed()
                          ? 'bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white hover:opacity-90 shadow-lg shadow-pink-500/25'
                          : 'bg-white/10 text-white/40 cursor-not-allowed'
                      }`}
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Set Commitment */}
              {currentStep === 2 && selectedCategoryData && (
                <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 sm:p-12">
                  <h2 className="text-3xl font-bold text-white mb-3 text-center">
                    Set your {selectedCategoryData.name.toLowerCase()} commitment
                  </h2>
                  <p className="text-white/70 text-center mb-8">
                    Research shows 30-day commitments have the highest success rates
                  </p>

                  {/* App Screenshot Placeholder */}
                  <div className="mb-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 p-6 text-center">
                    <div className="text-white/60 text-sm mb-2">Preview: How this looks in the app</div>
                    <div className="aspect-[9/16] max-w-[280px] mx-auto rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/30 flex items-center justify-center">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${selectedCategoryData.color} flex items-center justify-center text-3xl`}>
                        {selectedCategoryData.icon}
                      </div>
                    </div>
                  </div>

                  {/* Commitment Duration Slider */}
                  <div className="mb-8">
                    <label className="block text-white font-semibold mb-4 text-center">
                      Commitment Duration: <span className="text-[#FF33BA]">{commitmentDays} days</span>
                    </label>
                    <input
                      type="range"
                      min="7"
                      max="90"
                      step="1"
                      value={commitmentDays}
                      onChange={(e) => setCommitmentDays(parseInt(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FF33BA]"
                    />
                    <div className="flex justify-between text-white/60 text-sm mt-2">
                      <span>7 days</span>
                      <span>30 days</span>
                      <span>90 days</span>
                    </div>
                  </div>

                  {/* Commitment Contract Preview */}
                  <div className={`rounded-2xl bg-gradient-to-br ${selectedCategoryData.color} p-6 mb-8`}>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                        {selectedCategoryData.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg mb-1">Your Commitment Contract</h3>
                        <p className="text-white/90 text-sm">
                          "I commit to improving my {selectedCategoryData.name.toLowerCase()} for {commitmentDays} consecutive days,
                          with my accountability partner keeping me on track."
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-2xl font-bold text-white">{commitmentDays}</div>
                        <div className="text-white/80 text-xs">Days</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-2xl font-bold text-white">67%</div>
                        <div className="text-white/80 text-xs">Success Rate</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-2xl font-bold text-white">1</div>
                        <div className="text-white/80 text-xs">Partner</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={handlePrevStep}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      disabled={!canProceed()}
                      className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all ${
                        canProceed()
                          ? 'bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white hover:opacity-90 shadow-lg shadow-pink-500/25'
                          : 'bg-white/10 text-white/40 cursor-not-allowed'
                      }`}
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Partner Matching */}
              {currentStep === 3 && selectedCategoryData && (
                <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 sm:p-12">
                  <h2 className="text-3xl font-bold text-white mb-3 text-center">
                    Find your accountability partner
                  </h2>
                  <p className="text-white/70 text-center mb-8">
                    We matched you with compatible users pursuing similar goals
                  </p>

                  <div className="space-y-4 mb-8">
                    {mockPartners.map((partner, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedPartner(idx)}
                        className={`w-full group relative rounded-2xl p-6 text-left transition-all ${
                          selectedPartner === idx
                            ? 'bg-gradient-to-r from-[#FF33BA] to-[#FF9966] shadow-lg scale-102'
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                            selectedPartner === idx ? 'bg-white/20' : 'bg-gradient-to-r from-[#FF33BA] to-[#FF9966]'
                          }`}>
                            {partner.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-bold text-white">{partner.name}</h3>
                              {selectedPartner === idx && (
                                <CheckCircle className="w-6 h-6 text-white" />
                              )}
                            </div>
                            <p className="text-white/80 text-sm mb-3">Goal: {partner.goal}</p>
                            <div className="flex flex-wrap gap-3 text-sm">
                              <div className="flex items-center gap-1">
                                <Target className="w-4 h-4 text-white/70" />
                                <span className="text-white/90">{partner.compatibility}% match</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4 text-white/70" />
                                <span className="text-white/90">{partner.streak} day streak</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Award className="w-4 h-4 text-white/70" />
                                <span className="text-white/90">{partner.timezone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedPartner !== null && (
                    <div className="rounded-2xl bg-white/5 border border-white/20 p-6 mb-8">
                      <div className="flex items-start gap-3">
                        <Users className="w-6 h-6 text-[#FF33BA] flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-white font-semibold mb-2">How accountability works:</h4>
                          <ul className="space-y-2 text-white/80 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF33BA] mt-2 flex-shrink-0"></span>
                              <span>Daily check-ins keep both of you on track</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF33BA] mt-2 flex-shrink-0"></span>
                              <span>Real-time progress sharing builds mutual motivation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF33BA] mt-2 flex-shrink-0"></span>
                              <span>Community rescue system steps in when either struggles</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button
                      onClick={handlePrevStep}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      disabled={!canProceed()}
                      className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all ${
                        canProceed()
                          ? 'bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white hover:opacity-90 shadow-lg shadow-pink-500/25'
                          : 'bg-white/10 text-white/40 cursor-not-allowed'
                      }`}
                    >
                      Create Commitment
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Why This Works Section */}
        {!showSuccess && (
          <section className="relative py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#1B023A] mb-4">
                  Why Commitment Contracts Work
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  The psychology behind turning intentions into lasting behavior change
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Heart,
                    title: 'Public Commitment',
                    description: 'Making commitments visible to others increases follow-through by 65% compared to private goals.',
                    stat: '+65%',
                    color: 'from-[#FF33BA] to-[#FF9966]'
                  },
                  {
                    icon: Users,
                    title: 'Social Accountability',
                    description: 'Having an accountability partner triples the likelihood of maintaining behavior change long-term.',
                    stat: '3x',
                    color: 'from-[#52ACFF] to-[#725CFA]'
                  },
                  {
                    icon: Target,
                    title: 'Specific Contracts',
                    description: 'Clear, measurable commitments with defined timelines improve success rates by 42%.',
                    stat: '+42%',
                    color: 'from-[#F7941D] to-[#FFF200]'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl bg-white border-2 border-gray-100 p-8 hover:shadow-xl transition-shadow">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent mb-2">
                      {item.stat}
                    </div>
                    <h3 className="text-xl font-bold text-[#1B023A] mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
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
