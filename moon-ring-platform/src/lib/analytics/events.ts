"use client"

export type GAEventParams = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/**
 * Safely push an event into GA4 via gtag. No-ops during SSR or when consent isn't granted.
 */
export function trackEvent(eventName: string, params: GAEventParams = {}): void {
  if (typeof window === 'undefined') {
    return
  }

  if (typeof window.gtag !== 'function') {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[analytics] gtag unavailable, skipping event', eventName, params)
    }
    return
  }

  window.gtag('event', eventName, params)
}

/**
 * Convenience helper for GA4 conversion events.
 */
export function trackConversion(eventName: string, params: GAEventParams = {}): void {
  trackEvent(eventName, { ...params, engagement_time_msec: params.engagement_time_msec ?? 1 })
}
