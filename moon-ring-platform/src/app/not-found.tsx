"use client"

import Link from "next/link"
import { useEffect } from "react"
import { hasAnalyticsConsent } from "@/lib/analytics/consent"
import { trackEvent } from "@/lib/analytics/events"

export default function NotFound() {
  useEffect(() => {
    if (hasAnalyticsConsent()) {
      trackEvent("view_404", { path: typeof window !== 'undefined' ? window.location.pathname : 'unknown' })
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1B023A] to-[#120126] text-white flex items-center">
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-sm uppercase tracking-widest text-white/60">404 — Page Not Found</p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold">We can’t find that page</h1>
        <p className="mt-4 text-white/80">The page you’re looking for might have been moved or no longer exists.</p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] font-semibold hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Go to Home
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Visit the Blog
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Contact Us
          </Link>
        </div>

        <p className="mt-8 text-white/60">
          Or check our <Link href="/sitemap.xml" className="underline hover:text-white">sitemap</Link>
        </p>
      </div>
    </main>
  )
}

