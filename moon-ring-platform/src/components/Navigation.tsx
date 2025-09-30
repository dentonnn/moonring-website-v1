'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'How It Works', href: '#demo' },
    { label: 'Success Stories', href: '#stories' },
    { label: 'Research', href: '#psychology' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '/about' }
  ]

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
          <Link href="/" className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF33BA]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF9966] opacity-70"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF33BA] opacity-50"></div>
            </div>
            <span className="text-xl font-bold text-white">Moon Ring</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isExternal = item.href.startsWith('#')
              return isExternal ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white/90 hover:text-white font-medium transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white/90 hover:text-white font-medium transition-colors"
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2.5 text-white font-medium hover:bg-white/10 rounded-full transition-colors">
              Sign In
            </button>
            <a
              href="#waitlist"
              className="px-6 py-2.5 bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              Start Trial
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1B023A]/95 backdrop-blur-lg border-t border-white/20">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => {
              const isExternal = item.href.startsWith('#')
              return isExternal ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-white/90 hover:text-white font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-white/90 hover:text-white font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="flex flex-col gap-3 pt-4">
              <button className="w-full px-6 py-3 text-white font-medium border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                Sign In
              </button>
              <a
                href="#waitlist"
                className="block text-center w-full px-6 py-3 bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold rounded-full"
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