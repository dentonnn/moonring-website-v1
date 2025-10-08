'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { hasAnalyticsConsent } from '@/lib/analytics/consent'
import { trackConversion } from '@/lib/analytics/events'

export default function AnalyticsWrapper() {
  const [shouldLoadGA, setShouldLoadGA] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check consent on client-side only
    setShouldLoadGA(hasAnalyticsConsent())
  }, [])

  const gaId = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    if (!shouldLoadGA || !gaId || typeof window === 'undefined' || typeof window.gtag !== 'function') {
      return
    }

    const query = searchParams?.toString()
    const pagePath = `${pathname}${query ? `?${query}` : ''}`

    window.gtag('config', gaId, {
      page_path: pagePath,
    })
  }, [shouldLoadGA, gaId, pathname, searchParams])

  useEffect(() => {
    if (!shouldLoadGA) {
      return
    }

    const handleClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-analytics-event]')
      if (!target) return

      const eventName = target.dataset.analyticsEvent
      if (!eventName) return

      let params = {}
      const rawParams = target.dataset.analyticsParams

      if (rawParams) {
        try {
          params = JSON.parse(rawParams)
        } catch (err) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('[analytics] failed to parse analytics params', err)
          }
        }
      }

      trackConversion(eventName, params)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [shouldLoadGA])

  if (!gaId || !shouldLoadGA) {
    return null
  }

  return <GoogleAnalytics gaId={gaId} />
}
