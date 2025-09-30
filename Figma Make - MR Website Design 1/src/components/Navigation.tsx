import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'How It Works', href: '#demo' },
    { label: 'Success Stories', href: '#stories' },
    { label: 'Research', href: '#psychology' },
    { label: 'Pricing', href: '#pricing' }
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-card !rounded-none !p-0' : 'bg-transparent'
    }`} style={{ height: '72px' }}>
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-brand-pink opacity-80"></div>
            <div className="w-3 h-3 rounded-full bg-brand-orange opacity-60"></div>
            <div className="w-3 h-3 rounded-full bg-brand-pink opacity-40"></div>
          </div>
          <span className={`text-xl font-bold transition-colors duration-300 ${
            isScrolled ? 'text-foreground' : 'text-white'
          }`}>
            Moon Ring
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`font-medium transition-all duration-200 hover:text-brand-pink hover:underline ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="btn-secondary !min-w-0 !h-11 px-6">
            Sign In
          </button>
          <button className="btn-primary !min-w-0 !h-11 px-6">
            Start Trial
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-12 h-12 flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] glass-card !rounded-none z-40 md:hidden">
          <div className="container py-8">
            <nav className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xl font-medium text-white hover:text-brand-pink transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-4 pt-4">
                <button className="btn-secondary">Sign In</button>
                <button className="btn-primary">Start Trial</button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}