import { useState } from 'react'
import { Moon, Activity, Heart, RotateCcw, Check, ArrowRight, Users, MessageCircle, Calendar, LifeBuoy } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function CommitmentDemo() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [commitmentText, setCommitmentText] = useState('')
  const [duration, setDuration] = useState(7)

  const categories = [
    {
      id: 'sleep',
      icon: Moon,
      name: 'Sleep',
      description: 'Better rest & recovery',
      gradient: 'var(--sleep-gradient)',
      defaultCommitment: 'I commit to 8 hours of sleep',
      suggestions: ['8 hours nightly', 'No screens after 10pm', 'Consistent bedtime']
    },
    {
      id: 'movement',
      icon: Activity,
      name: 'Movement',
      description: 'Daily activity & exercise',
      gradient: 'var(--movement-gradient)',
      defaultCommitment: 'I commit to 10,000 steps daily',
      suggestions: ['10,000 steps', '30min exercise', 'Morning yoga']
    },
    {
      id: 'stress',
      icon: Heart,
      name: 'Stress',
      description: 'Mental wellness & calm',
      gradient: 'var(--stress-gradient)',
      defaultCommitment: 'I commit to 5 minutes of meditation',
      suggestions: ['5min meditation', 'Breathing exercises', 'Journaling']
    },
    {
      id: 'recovery',
      icon: RotateCcw,
      name: 'Recovery',
      description: 'Rest days & restoration',
      gradient: 'var(--recovery-gradient)',
      defaultCommitment: 'I commit to one full rest day weekly',
      suggestions: ['Rest day weekly', 'Stretching routine', 'Massage scheduled']
    }
  ]

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category.id)
    setCommitmentText(category.defaultCommitment)
    setCurrentStep(2)
  }

  const handleStepComplete = (step: number) => {
    if (step < 3) {
      setCurrentStep(step + 1)
    }
  }

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory)

  return (
    <section id="demo" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4 text-purple-base">
            Try Creating Your First Commitment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the <span className="psychology-text">psychology</span> that makes commitments unbreakable
          </p>
        </div>

        {/* Step Progress Indicator */}
        <div className="flex items-center justify-center max-w-md mx-auto mb-16">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step <= currentStep
                    ? 'bg-brand-pink text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step < currentStep ? <Check className="w-5 h-5" /> : step}
                </div>
                <div className="text-sm mt-3 text-center whitespace-nowrap">
                  {step === 1 && 'Choose Focus'}
                  {step === 2 && 'Set Commitment'}
                  {step === 3 && 'Find Partner'}
                </div>
              </div>
              {step < 3 && (
                <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                  step < currentStep ? 'bg-brand-pink' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Choose Your Focus */}
          {currentStep >= 1 && (
            <div className={`mb-16 transition-all duration-500 ${currentStep === 1 ? 'opacity-100' : 'opacity-50'}`}>
              <div className="text-center mb-8">
                <h3 className="mb-2">Step 1: Choose Your Focus</h3>
                <p className="text-muted-foreground">What area of your health needs accountability?</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    disabled={currentStep !== 1}
                    className={`relative w-40 h-28 md:w-44 md:h-32 rounded-2xl flex flex-col items-center justify-center p-4 text-white transition-all duration-300 cursor-pointer ${
                      selectedCategory === category.id 
                        ? 'ring-4 ring-brand-pink scale-110 shadow-2xl' 
                        : 'hover:scale-105 hover:shadow-xl'
                    }`}
                    style={{ background: category.gradient }}
                  >
                    <category.icon className="w-8 h-8 mb-2 drop-shadow-sm" />
                    <div className="text-center">
                      <div className="text-lg font-bold leading-tight mb-1">{category.name}</div>
                      <div className="text-xs opacity-90 leading-tight px-1 font-medium">{category.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Create Your Commitment */}
          {currentStep >= 2 && selectedCategoryData && (
            <div className={`mb-16 transition-all duration-500 ${currentStep === 2 ? 'opacity-100' : 'opacity-50'}`}>
              <div className="text-center mb-8">
                <h3 className="mb-2">Step 2: Set Your Commitment Contract</h3>
                <p className="text-muted-foreground">Make it specific, measurable, and time-bound</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Commitment Builder */}
                <div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Your Commitment</label>
                    <input
                      type="text"
                      value={commitmentText}
                      onChange={(e) => setCommitmentText(e.target.value)}
                      className="form-input text-xl"
                      placeholder="I commit to..."
                      disabled={currentStep !== 2}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Duration: {duration} days
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      disabled={currentStep !== 2}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, var(--brand-pink) 0%, var(--brand-pink) ${(duration / 30) * 100}%, var(--muted) ${(duration / 30) * 100}%, var(--muted) 100%)`
                      }}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>1 day</span>
                      <span>30 days</span>
                    </div>
                  </div>

                  {/* Smart Suggestions */}
                  <div>
                    <p className="text-sm font-medium mb-3">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategoryData.suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setCommitmentText(`I commit to ${suggestion.toLowerCase()}`)}
                          disabled={currentStep !== 2}
                          className="px-3 py-1 text-sm border border-brand-pink text-brand-pink rounded-full hover:bg-brand-pink hover:text-white transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Commitment Preview */}
                <div className="glass-card bg-white/50">
                  <h4 className="font-semibold mb-4">Your Commitment Contract</h4>
                  <div className="space-y-3 text-sm">
                    <p>
                      <strong>I, [Your Name], commit to</strong> {commitmentText.replace('I commit to ', '')} <strong>for {duration} days</strong>
                    </p>
                    <p className="text-muted-foreground">
                      I understand this is a promise to myself and my accountability partner
                    </p>
                    <p className="text-muted-foreground">
                      I will check in daily and ask for help when needed
                    </p>
                    <div className="pt-4 border-t border-muted">
                      <p className="text-brand-pink font-medium">Sign with conviction</p>
                      <div className="h-px bg-muted mt-2"></div>
                    </div>
                  </div>
                  
                  {currentStep === 2 && (
                    <button
                      onClick={() => handleStepComplete(2)}
                      className="btn-primary !min-w-0 w-full mt-4"
                    >
                      Create Commitment Contract
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Find Accountability */}
          {currentStep >= 3 && (
            <div className="transition-all duration-500">
              <div className="text-center mb-8">
                <h3 className="mb-2">Step 3: Experience Social Accountability</h3>
                <p className="text-muted-foreground">Your success rate triples with the right partner</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Partner Matching Preview */}
                <div className="glass-card bg-white/50">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-brand-pink to-brand-orange rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">Perfect Match Found!</h4>
                    <div className="flex items-center justify-center space-x-4">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1494790108755-2616b9225c9a?w=64&h=64&fit=crop&crop=face"
                        alt="Sarah M. - Accountability Partner"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="text-left">
                        <p className="font-medium">Sarah M.</p>
                        <p className="text-sm text-brand-pink">94% compatibility</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-brand-pink" />
                      <span>Also committed to better sleep</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-brand-pink" />
                      <span>89% commitment completion rate</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-brand-pink" />
                      <span>Available for daily check-ins</span>
                    </div>
                  </div>
                </div>

                {/* Community Support */}
                <div>
                  <div className="glass-card bg-white/50 mb-6">
                    <p className="text-center mb-4">
                      Join <strong className="commitment-text">127 others</strong> in your area working on sleep this week
                    </p>
                    <div className="flex justify-center space-x-2 mb-4">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"
                        />
                      ))}
                      <div className="flex items-center text-sm text-muted-foreground">
                        +117 more
                      </div>
                    </div>
                  </div>

                  {/* Accountability Features */}
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { icon: Calendar, title: 'Daily Check-ins', desc: 'Simple daily progress updates' },
                      { icon: LifeBuoy, title: 'Social Rescue', desc: 'Community support when struggling' },
                      { icon: MessageCircle, title: 'Partner Chat', desc: 'Private encouragement channel' }
                    ].map((feature) => (
                      <div key={feature.title} className="flex items-center space-x-3 p-3 rounded-lg bg-white/50">
                        <feature.icon className="w-6 h-6 text-brand-pink" />
                        <div>
                          <p className="font-medium text-sm">{feature.title}</p>
                          <p className="text-xs text-muted-foreground">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Final CTA */}
              <div className="text-center mt-12">
                <button className="btn-primary flex items-center space-x-2 mx-auto animate-pulse-glow">
                  <span>Create Your First Real Commitment</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-sm text-muted-foreground mt-4">
                  Join <strong>15,847 people</strong> who made commitments this week
                </p>
                <a href="#psychology" className="text-brand-pink text-sm hover:underline">
                  Learn more about our methodology →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}