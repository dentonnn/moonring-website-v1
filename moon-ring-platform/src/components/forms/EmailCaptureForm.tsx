'use client'

import { useState } from 'react'
import { trackConversion } from '@/lib/analytics/events'

interface EmailCaptureFormProps {
  source?: 'hero' | 'footer' | 'popup' | 'waitlist' | 'download'
  showGDPR?: boolean
  onSuccess?: (email: string) => void
  className?: string
}

export default function EmailCaptureForm({
  source = 'hero',
  showGDPR = true,
  onSuccess,
  className = ''
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [gdprConsent, setGdprConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!email) {
      setError('Email is required')
      return
    }

    if (showGDPR && !gdprConsent) {
      setError('Please accept our privacy policy')
      return
    }

    setIsLoading(true)

    try {
      // Get UTM parameters and referral code from URL
      const urlParams = new URLSearchParams(window.location.search)
      const utmParams = {
        utm_source: urlParams.get('utm_source') || undefined,
        utm_medium: urlParams.get('utm_medium') || undefined,
        utm_campaign: urlParams.get('utm_campaign') || undefined,
        utm_term: urlParams.get('utm_term') || undefined,
        utm_content: urlParams.get('utm_content') || undefined,
      }

      // Get referral code from URL (e.g., ?ref=MOONRING-XXXXXXXX)
      const referralCode = urlParams.get('ref') || undefined

      // Call newsletter subscription API
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Id': getSessionId(),
        },
        body: JSON.stringify({
          email,
          name: name || undefined,
          gdprConsent,
          source,
          utmParams,
          referralCode,
          referrer: document.referrer || undefined,
          landingPage: window.location.href,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setSuccess(true)

      // Store email before clearing form
      const submittedEmail = email

      setEmail('')
      setName('')
      setGdprConsent(false)

      trackConversion('generate_lead', {
        method: `email_capture_${source}`,
        location: window.location.pathname,
      })

      if (onSuccess) {
        onSuccess(submittedEmail)
      }

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)

    } catch (err) {
      console.error('Error subscribing to newsletter:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 max-w-md mx-auto ${className}`}>
      {success ? (
        <div className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-white rounded-2xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold">You're on the list!</p>
              <p className="text-sm text-white/80">Check your email for next steps.</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF33BA] focus:border-transparent transition-all"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-pink-500/25 whitespace-nowrap"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="motion-safe:animate-spin motion-reduce:animate-none h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Joining...
                </span>
              ) : (
                'Get Early Access'
              )}
            </button>
          </div>

          {source === 'hero' && (
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF33BA] focus:border-transparent transition-all"
            />
          )}

          {showGDPR && (
            <div className="flex items-start gap-3 text-left">
              <input
                type="checkbox"
                id="gdpr-consent"
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-white/30 bg-white/10 text-[#FF33BA] focus:ring-2 focus:ring-[#FF33BA]"
              />
              <label htmlFor="gdpr-consent" className="text-sm text-white/70 cursor-pointer">
                I agree to receive marketing emails and accept the{' '}
                <a href="/privacy" className="text-[#FF33BA] hover:text-[#FF9966] underline transition-colors">
                  privacy policy
                </a>
              </label>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/30 text-red-200 rounded-2xl text-sm backdrop-blur-sm">
              {error}
            </div>
          )}
        </>
      )}
    </form>
  )
}

// Helper function for session tracking
function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr'

  let sessionId = sessionStorage.getItem('moon_ring_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('moon_ring_session_id', sessionId)
  }
  return sessionId
}
