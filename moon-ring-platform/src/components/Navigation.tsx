'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Mega-menu structure
const megaMenuLinks = {
  product: [
    { label: 'How It Works', href: '/how-it-works', description: 'See the commitment psychology in action' },
    { label: 'Hardware Compatibility', href: '/hardware', description: 'Check if your wearable works' },
    { label: 'Interactive Demo', href: '/demo', description: 'Try the commitment builder' }
  ],
  company: [
    { label: 'About Us', href: '/about', description: 'Meet the team and our mission' },
    { label: 'Research & Science', href: '/research', description: 'Evidence-based behavioral psychology' },
    { label: 'Success Stories', href: '/success-stories', description: 'Real results from real users' }
  ],
  resources: [
    { label: 'Blog', href: '/blog', description: 'Commitment psychology insights' },
    { label: 'Support & FAQ', href: '/support', description: 'Get help and answers' },
    { label: 'Enterprise Solutions', href: '/enterprise', description: 'Team accountability for organizations' }
  ]
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null)
  const megaMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mega-menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false)
      }
    }

    if (isMegaMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMegaMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/10 backdrop-blur-lg border-b border-white/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Image
              src="/images/logos/moonring-logo-white.png"
              alt="Moon Ring"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-white font-brand">Moon Ring</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/hardware"
              className="text-white/90 hover:text-white font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Hardware
            </Link>
            <a
              href="#pricing"
              className="text-white/90 hover:text-white font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Pricing
            </a>

            {/* More Dropdown (Mega-menu) */}
            <div className="relative" ref={megaMenuRef}>
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className="flex items-center gap-1 text-white/90 hover:text-white font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-expanded={isMegaMenuOpen}
                aria-haspopup="true"
              >
                More
                <ChevronDown className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega-menu Dropdown */}
              {isMegaMenuOpen && (
                <div className="fixed left-1/2 -translate-x-1/2 mt-2 w-[720px] max-w-[90vw] bg-[#0D0221]/95 backdrop-blur-xl border-2 border-white/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-8 animate-fade-in" style={{ top: '5rem' }}>
                  <div className="grid grid-cols-3 gap-8">
                    {/* Product Column */}
                    <div>
                      <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Product</h3>
                      <div className="space-y-3">
                        {megaMenuLinks.product.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="block group"
                          >
                            <div className="text-white font-semibold group-hover:text-[#FF33BA] transition-colors">
                              {link.label}
                            </div>
                            <div className="text-white/60 text-sm">{link.description}</div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Company Column */}
                    <div>
                      <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Company</h3>
                      <div className="space-y-3">
                        {megaMenuLinks.company.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="block group"
                          >
                            <div className="text-white font-semibold group-hover:text-[#FF33BA] transition-colors">
                              {link.label}
                            </div>
                            <div className="text-white/60 text-sm">{link.description}</div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Resources Column */}
                    <div>
                      <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Resources</h3>
                      <div className="space-y-3">
                        {megaMenuLinks.resources.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="block group"
                          >
                            <div className="text-white font-semibold group-hover:text-[#FF33BA] transition-colors">
                              {link.label}
                            </div>
                            <div className="text-white/60 text-sm">{link.description}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#waitlist"
              data-analytics-event="start_trial"
              data-analytics-params={JSON.stringify({ location: 'nav_desktop' })}
              className="px-6 py-2.5 bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold rounded-full hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start Trial
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="md:hidden bg-[#1B023A]/98 backdrop-blur-lg border-t border-white/20 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            {/* Hardware */}
            <Link
              href="/hardware"
              className="block text-white/90 hover:text-white font-medium py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hardware
            </Link>

            {/* Pricing */}
            <a
              href="#pricing"
              className="block text-white/90 hover:text-white font-medium py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </a>

            <div className="border-t border-white/10 my-4" />

            {/* Product Section (Collapsible) */}
            <div>
              <button
                onClick={() => setExpandedMobileSection(expandedMobileSection === 'product' ? null : 'product')}
                className="flex items-center justify-between w-full text-white/90 font-semibold py-2"
              >
                PRODUCT
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobileSection === 'product' ? 'rotate-180' : ''}`} />
              </button>
              {expandedMobileSection === 'product' && (
                <div className="ml-4 mt-2 space-y-2">
                  {megaMenuLinks.product.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-white/70 hover:text-white py-2 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Company Section (Collapsible) */}
            <div>
              <button
                onClick={() => setExpandedMobileSection(expandedMobileSection === 'company' ? null : 'company')}
                className="flex items-center justify-between w-full text-white/90 font-semibold py-2"
              >
                COMPANY
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobileSection === 'company' ? 'rotate-180' : ''}`} />
              </button>
              {expandedMobileSection === 'company' && (
                <div className="ml-4 mt-2 space-y-2">
                  {megaMenuLinks.company.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-white/70 hover:text-white py-2 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Section (Collapsible) */}
            <div>
              <button
                onClick={() => setExpandedMobileSection(expandedMobileSection === 'resources' ? null : 'resources')}
                className="flex items-center justify-between w-full text-white/90 font-semibold py-2"
              >
                RESOURCES
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobileSection === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              {expandedMobileSection === 'resources' && (
                <div className="ml-4 mt-2 space-y-2">
                  {megaMenuLinks.resources.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-white/70 hover:text-white py-2 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 my-4" />

            {/* Start Trial CTA */}
            <div className="flex flex-col gap-3 pt-2">
              <a
                href="#waitlist"
                data-analytics-event="start_trial"
                data-analytics-params={JSON.stringify({ location: 'nav_mobile' })}
                className="block text-center w-full px-6 py-3 bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Trial
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
