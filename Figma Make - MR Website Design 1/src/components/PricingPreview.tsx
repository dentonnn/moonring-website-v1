import { Check, Star, ChevronRight } from 'lucide-react'

export function PricingPreview() {
  const pricingPlans = [
    {
      name: '14-Day Trial',
      badge: 'Start Here',
      badgeColor: 'bg-green-500',
      price: '$0',
      billing: '',
      features: [
        'Full commitment creation',
        'Partner matching',
        'Community support',
        'All health categories'
      ],
      cta: 'Start Free Trial',
      ctaStyle: 'btn-primary',
      popular: false
    },
    {
      name: 'Individual',
      badge: 'Most Popular',
      badgeColor: 'bg-gradient-to-r from-brand-pink to-brand-orange',
      price: '$12',
      billing: '/month',
      billingNote: 'Billed monthly, cancel anytime',
      features: [
        'Everything in trial, plus:',
        'Unlimited commitments',
        'Advanced analytics',
        'Priority partner matching',
        'Personal success coach (AI)'
      ],
      cta: 'Start Free Trial',
      ctaStyle: 'btn-primary',
      popular: true
    },
    {
      name: 'Teams & Families',
      badge: '',
      badgeColor: '',
      price: 'Custom',
      billing: ' pricing',
      features: [
        'Everything in Individual',
        'Group challenges',
        'Family accountability',
        'Shared dashboards',
        'Volume discounts'
      ],
      cta: 'Contact Sales',
      ctaStyle: 'btn-secondary',
      popular: false
    }
  ]

  const trustBadges = [
    '30-day guarantee',
    'Cancel anytime',
    'No hidden fees'
  ]

  return (
    <section id="pricing" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you see results
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`glass-card bg-white relative transition-all duration-300 hover:shadow-xl ${
                plan.popular ? 'scale-105 ring-2 ring-brand-pink' : 'hover:scale-102'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div 
                  className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm font-medium z-10 ${plan.badgeColor}`}
                >
                  {plan.badge}
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-4 mt-2">
                  {plan.name}
                </h3>
                
                <div className="mb-2">
                  <span className="text-4xl font-bold text-purple-base">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">
                    {plan.billing}
                  </span>
                </div>
                
                {plan.billingNote && (
                  <p className="text-sm text-muted-foreground">
                    {plan.billingNote}
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-brand-pink flex-shrink-0 mt-0.5" />
                    <span className={`text-sm ${
                      feature.includes('Everything in') ? 'font-medium' : ''
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className={`${plan.ctaStyle} w-full`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex items-center space-x-2 text-muted-foreground">
              <Check className="w-4 h-4 text-brand-pink" />
              <span className="text-sm">{badge}</span>
            </div>
          ))}
        </div>

        {/* Link to detailed pricing */}
        <div className="text-center">
          <a 
            href="#" 
            className="text-brand-pink hover:underline inline-flex items-center text-sm"
          >
            View detailed pricing comparison 
            <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </section>
  )
}