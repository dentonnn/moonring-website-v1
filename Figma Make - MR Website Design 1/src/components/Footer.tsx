import { useState } from 'react'
import { Twitter, Instagram, Linkedin, Youtube, CheckCircle } from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const footerSections = {
    product: {
      title: 'Product',
      links: [
        'How It Works',
        'Features',
        'Success Stories',
        'Pricing',
        'Research & Science',
        'Wearable Compatibility'
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        'Help Center',
        'Getting Started Guide',
        'Community Guidelines',
        'Behavioral Psychology 101',
        'API Documentation',
        'Partner With Us'
      ]
    },
    company: {
      title: 'Company',
      links: [
        'About Us',
        'Careers',
        'Press Kit',
        'Blog',
        'Contact',
        'System Status'
      ]
    }
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ]

  const complianceBadges = [
    'HIPAA',
    'SOC2',
    'GDPR'
  ]

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--purple-gradient)' }}>
      {/* Newsletter CTA Section */}
      <div className="border-b border-white/10">
        <div className="container py-16 px-6 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Get <span className="psychology-text">behavioral psychology</span> tips weekly
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join 50,000+ subscribers. No spam, ever.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 h-14 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:border-brand-pink focus:outline-none focus:ring-2 focus:ring-brand-pink/30 transition-all"
                required
              />
              <button 
                type="submit"
                className="h-14 px-8 bg-gradient-to-r from-brand-pink to-brand-orange text-white font-semibold rounded-xl hover:scale-105 transition-transform flex items-center justify-center space-x-2 min-w-[140px]"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-16 px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-brand-pink opacity-80"></div>
                <div className="w-3 h-3 rounded-full bg-brand-orange opacity-60"></div>
                <div className="w-3 h-3 rounded-full bg-brand-pink opacity-40"></div>
              </div>
              <span className="text-xl font-bold text-white">Moon Ring</span>
            </div>
            
            <p className="text-white/80 mb-8 text-sm leading-relaxed">
              <span className="psychology-text">Behavioral psychology</span> for lasting change
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-pink transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-base">{footerSections.product.title}</h4>
            <ul className="space-y-4">
              {footerSections.product.links.slice(0, 4).map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-base">{footerSections.resources.title}</h4>
            <ul className="space-y-4">
              {footerSections.resources.links.slice(0, 4).map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-base">{footerSections.company.title}</h4>
            <ul className="space-y-4">
              {footerSections.company.links.slice(0, 4).map((link) => (
                <li key={link} className="flex items-center space-x-2">
                  <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                  {link === 'Careers' && (
                    <span className="bg-brand-pink text-xs px-2 py-1 rounded-full text-white font-medium">
                      {"We're hiring!"}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10">
        <div className="container py-6 px-6 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-white/50 text-sm">
              © 2025 Moon Ring. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-3">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-white/10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full border border-white/10"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full border border-white/10"></div>
      </div>
    </footer>
  )
}