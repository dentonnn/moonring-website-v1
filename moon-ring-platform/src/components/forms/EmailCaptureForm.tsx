'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface EmailCaptureFormProps {
  source?: 'hero' | 'footer' | 'popup' | 'sidebar'
  showGDPR?: boolean
  onSuccess?: () => void
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

  const supabase = createClient()

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
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search)
      const utmParams = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_term: urlParams.get('utm_term'),
        utm_content: urlParams.get('utm_content'),
      }

      // Insert lead
      const { error: leadError } = await supabase
        .from('leads')
        .insert({
          email,
          name: name || null,
          source: source === 'hero' ? 'organic' : 'direct',
          ...utmParams,
          referrer_url: document.referrer || null,
          landing_page: window.location.pathname,
          gdpr_consent: gdprConsent,
          gdpr_consent_date: gdprConsent ? new Date().toISOString() : null,
        })

      if (leadError) {
        if (leadError.code === '23505') { // Unique violation
          // Email already exists, update the existing lead
          const { error: updateError } = await supabase
            .from('leads')
            .update({
              name: name || null,
              conversion_stage: 'lead',
              updated_at: new Date().toISOString()
            })
            .eq('email', email)

          if (updateError) throw updateError
        } else {
          throw leadError
        }
      }

      // Also add to email subscriptions
      const { error: subError } = await supabase
        .from('email_subscriptions')
        .insert({
          email,
          subscription_types: ['newsletter'],
          status: 'active'
        })

      // Ignore duplicate subscription errors
      if (subError && subError.code !== '23505') {
        console.error('Subscription error:', subError)
      }

      // Track conversion event
      await supabase
        .from('conversion_events')
        .insert({
          session_id: getSessionId(),
          visitor_id: getVisitorId(),
          event_type: 'email_signup',
          event_category: 'conversion',
          event_properties: { source, form_location: source },
          page_url: window.location.href,
          referrer_url: document.referrer || null,
          user_agent: navigator.userAgent
        })

      setSuccess(true)
      setEmail('')
      setName('')
      setGdprConsent(false)

      if (onSuccess) {
        onSuccess()
      }

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)

    } catch (err) {
      console.error('Error capturing lead:', err)
      setError('Something went wrong. Please try again.')
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
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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

// Helper functions for tracking
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('moon_ring_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('moon_ring_session_id', sessionId)
  }
  return sessionId
}

function getVisitorId(): string {
  let visitorId = localStorage.getItem('moon_ring_visitor_id')
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('moon_ring_visitor_id', visitorId)
  }
  return visitorId
}