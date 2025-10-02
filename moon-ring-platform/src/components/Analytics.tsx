'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import { useEffect, useState } from 'react'
import { hasAnalyticsConsent } from '@/lib/analytics/consent'

export default function AnalyticsWrapper() {
  const [shouldLoadGA, setShouldLoadGA] = useState(false)

  useEffect(() => {
    // Check consent on client-side only
    setShouldLoadGA(hasAnalyticsConsent())
  }, [])

  const gaId = process.env.NEXT_PUBLIC_GA_ID

  if (!gaId || !shouldLoadGA) {
    return null
  }

  return <GoogleAnalytics gaId={gaId} />
}
