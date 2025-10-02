/**
 * Analytics Consent Utility
 *
 * Checks if user has consented to analytics cookies (GA4)
 * Used to conditionally load analytics scripts per GDPR requirements
 */

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') {
    // Server-side: don't load analytics
    return false
  }

  const consent = localStorage.getItem('moonring-cookie-consent')
  return consent === 'accepted'
}

export function getConsentStatus(): 'accepted' | 'declined' | 'pending' {
  if (typeof window === 'undefined') {
    return 'pending'
  }

  const consent = localStorage.getItem('moonring-cookie-consent')
  if (consent === 'accepted') return 'accepted'
  if (consent === 'declined') return 'declined'
  return 'pending'
}
