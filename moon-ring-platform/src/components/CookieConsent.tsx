'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Cookie } from 'lucide-react'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('moonring-cookie-consent')
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('moonring-cookie-consent', 'accepted')
    handleClose()
  }

  const handleDecline = () => {
    localStorage.setItem('moonring-cookie-consent', 'declined')
    handleClose()
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${
        isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl bg-white/95 backdrop-blur-lg border border-gray-200 shadow-2xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            {/* Cookie Icon */}
            <div className="hidden sm:flex w-12 h-12 rounded-xl bg-gradient-to-r from-[#FF33BA] to-[#FF9966] items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#1B023A] mb-2">
                Cookie Preferences
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                We use essential cookies to make our site work. With your consent, we may also use
                non-essential cookies to improve user experience and analyze website traffic. By clicking
                "Accept All," you agree to our use of cookies.{' '}
                <Link
                  href="/privacy"
                  className="text-[#FF33BA] hover:text-[#FF9966] underline font-medium"
                >
                  Learn more in our Privacy Policy
                </Link>
                .
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAccept}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold rounded-full hover:opacity-90 transition-opacity text-sm"
                >
                  Accept All
                </button>
                <button
                  onClick={handleDecline}
                  className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors text-sm"
                >
                  Essential Only
                </button>
                <Link
                  href="/privacy"
                  className="px-6 py-2.5 text-gray-700 font-medium rounded-full hover:bg-gray-100 transition-colors text-sm text-center"
                >
                  Cookie Settings
                </Link>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              aria-label="Close cookie banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}