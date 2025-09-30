import { useState, useEffect } from 'react'
import { ChevronDown, Star, Shield, Zap, Clock, Check, X } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function FinalConversion() {
  const [email, setEmail] = useState('')
  const [challenge, setChallenge] = useState("I start strong but can't stay consistent")
  const [wearables, setWearables] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Real-time activity feed
  const [activities, setActivities] = useState([
    { name: 'Sarah from NYC', action: 'started a sleep commitment', time: '2 min ago' },
    { name: 'Mike from Austin', action: 'completed 45-day streak', time: '5 min ago' },
    { name: 'Jennifer from Seattle', action: 'found accountability partner', time: '8 min ago' },
    { name: 'David from Miami', action: 'joined recovery challenge', time: '12 min ago' },
    { name: 'Lisa from Portland', action: 'celebrated 100 days', time: '15 min ago' }
  ])

  const testimonials = [
    {
      quote: "Finally, something that makes my goals stick. My Apple Watch data shows the difference - 127 days of consistent sleep.",
      name: "Sarah M.",
      role: "Product Manager, San Francisco",
      metrics: "127-day streak • 89% consistency",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9225c9a?w=64&h=64&fit=crop&crop=face"
    },
    {
      quote: "My accountability partner saved my fitness streak 3 times. This isn't just an app - it's a support system.",
      name: "Mike R.",
      role: "Software Engineer, Austin",
      metrics: "Lost 15 lbs • 200+ day streak",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
    },
    {
      quote: "I thought I tried everything. The psychology approach finally made it click. I understand why I succeed now.",
      name: "Jennifer L.",
      role: "Teacher, Seattle",
      metrics: "Stress down 40% • Sleep up 2 hrs",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
  ]

  const challengeOptions = [
    "I start strong but can't stay consistent",
    'I lose motivation when life gets busy',
    "I don't have anyone to keep me accountable",
    "I've tried everything and nothing sticks"
  ]

  const wearableOptions = [
    { name: 'Apple Watch', icon: '⌚' },
    { name: 'Fitbit', icon: '📱' },
    { name: 'Oura Ring', icon: '💍' },
    { name: 'Garmin', icon: '⌚' },
    { name: 'Other wearable', icon: '📱' },
    { name: 'No wearable yet', icon: '📱' }
  ]

  const trustIndicators = [
    { icon: Shield, text: 'HIPAA Compliant' },
    { icon: Star, text: '4.8/5 Average Rating' },
    { icon: Zap, text: '92% Success Rate' },
    { icon: Check, text: 'Research-Backed' },
    { icon: Shield, text: '30-Day Guarantee' },
    { icon: Clock, text: 'Cancel Anytime' }
  ]

  const faqItems = [
    {
      question: 'How does the free trial work?',
      answer: 'Get full access for 14 days, no credit card required. Experience all features before deciding.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, cancel with one click anytime. No questions asked, no penalties.'
    },
    {
      question: 'Is my wearable data secure?',
      answer: "Your data is encrypted and never shared. We're HIPAA compliant and take privacy seriously."
    },
    {
      question: "What if I don't have a wearable?",
      answer: "No problem! Manual tracking works great too. Many successful users don't use wearables."
    }
  ]

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Update activity feed
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => {
        const newActivity = {
          name: ['Alex from LA', 'Sam from Chicago', 'Taylor from Boston', 'Jordan from Denver'][Math.floor(Math.random() * 4)],
          action: ['started a commitment', 'found a partner', 'completed a streak', 'joined community'][Math.floor(Math.random() * 4)],
          time: 'just now'
        }
        return [newActivity, ...prev.slice(0, 4)]
      })
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [showExitIntent])

  const handleWearableToggle = (wearable: string) => {
    setWearables(prev => 
      prev.includes(wearable) 
        ? prev.filter(w => w !== wearable)
        : [...prev, wearable]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success state
    setIsSubmitting(false)
    alert('Welcome to Moon Ring! Check your email for next steps.')
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden" style={{ background: 'var(--purple-gradient)' }}>
      <div className="container px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Social Proof */}
          <div className="order-2 lg:order-1">
            {/* Real-time Activity Feed */}
            <div className="glass-card mb-8">
              <h3 className="text-white font-semibold mb-4">Live Activity</h3>
              <div className="space-y-3 max-h-48 overflow-hidden">
                {activities.map((activity, index) => (
                  <div 
                    key={`${activity.name}-${index}`}
                    className={`flex items-center space-x-3 transition-all duration-500 ${
                      index === 0 ? 'opacity-100' : 'opacity-70'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></div>
                    <p className="text-white/80 text-sm">
                      <strong>{activity.name}</strong> {activity.action}
                    </p>
                    <span className="text-white/40 text-xs ml-auto">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Carousel */}
            <div className="glass-card mb-8 relative min-h-[200px]">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-500 ${
                    index === currentTestimonial ? 'opacity-100 relative' : 'opacity-0 absolute inset-0'
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-white font-medium">{testimonial.name}</div>
                      <div className="text-white/60 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  <blockquote className="text-white/90 italic mb-3">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="text-brand-orange text-sm font-medium">
                    {testimonial.metrics}
                  </p>
                </div>
              ))}
              
              {/* Testimonial indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-brand-pink' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="glass-card !p-3 flex items-center space-x-3">
                  <indicator.icon className="w-5 h-5 text-brand-orange" />
                  <span className="text-white text-sm font-medium">{indicator.text}</span>
                </div>
              ))}
            </div>

            {/* Community Preview */}
            <div className="glass-card">
              <p className="text-white mb-4">
                Join these <span className="commitment-text">accountability partners</span> near you:
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 border-2 border-white/20"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <span className="text-brand-orange font-medium">+2,847 more this week</span>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="order-1 lg:order-2">
            <div className="glass-card">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-white">Ready to make commitments that stick?</h2>
                </div>
                <p className="text-white/80 mb-2">
                  Join thousands transforming intentions into lasting habits
                </p>
                <div className="w-full bg-white/20 rounded-full h-1 mb-4">
                  <div className="bg-brand-gradient h-1 rounded-full w-1/2"></div>
                </div>
                <p className="text-white/60 text-sm">Step 1 of 2</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Your best email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="form-input pl-10"
                      required
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-brand-pink">@</span>
                    </div>
                    {email.includes('@') && (
                      <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>

                {/* Challenge Dropdown */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    What's your biggest challenge?
                  </label>
                  <select
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    className="form-input"
                  >
                    {challengeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Wearable Selection */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Which wearable do you use? (optional)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {wearableOptions.map((wearable) => (
                      <label
                        key={wearable.name}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                          wearables.includes(wearable.name)
                            ? 'bg-brand-pink/20 border border-brand-pink'
                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={wearables.includes(wearable.name)}
                          onChange={() => handleWearableToggle(wearable.name)}
                          className="sr-only"
                        />
                        <span className="text-lg">{wearable.icon}</span>
                        <span className="text-white text-sm">{wearable.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start space-x-3 text-sm">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-1 rounded border-white/20 bg-white/10 text-brand-pink focus:ring-brand-pink"
                  />
                  <span className="text-white/80">
                    I agree to the{' '}
                    <a href="#" className="text-brand-pink hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-brand-pink hover:underline">Privacy Policy</a>
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating your account...</span>
                    </>
                  ) : (
                    <span>Start My Free 14-Day Trial</span>
                  )}
                </button>

                {/* Trust Text */}
                <div className="space-y-1 text-center">
                  {[
                    'No credit card required',
                    '14-day free trial',
                    'Cancel anytime',
                    'Your data is always private'
                  ].map((text) => (
                    <p key={text} className="text-white/60 text-sm flex items-center justify-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{text}</span>
                    </p>
                  ))}
                </div>

                {/* Social Login */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-white/60">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {['Google', 'Apple', 'Facebook'].map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      className="btn-secondary !h-12 !min-w-0 text-sm"
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </form>

              {/* FAQ Accordion */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <h4 className="text-white font-medium mb-4">Quick Questions</h4>
                <div className="space-y-2">
                  {faqItems.map((faq, index) => (
                    <details key={index} className="group">
                      <summary className="flex items-center justify-between text-white/80 text-sm cursor-pointer hover:text-white">
                        {faq.question}
                        <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform" />
                      </summary>
                      <p className="text-white/60 text-sm mt-2 pl-4">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Intent Popup */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full text-center">
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-white text-xl font-semibold mb-4">
              Wait! Get 30% off your first month
            </h3>
            <p className="text-white/80 mb-6">
              Don't leave without experiencing the psychology that makes commitments stick.
            </p>
            <button 
              onClick={() => setShowExitIntent(false)}
              className="btn-primary w-full mb-4"
            >
              Claim 30% Discount
            </button>
            <button 
              onClick={() => setShowExitIntent(false)}
              className="text-white/60 text-sm hover:text-white"
            >
              No thanks, I'll pay full price
            </button>
          </div>
        </div>
      )}
    </section>
  )
}