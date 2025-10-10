"use client"

import Link from "next/link"
import { useEffect } from "react"
import type { Metadata } from "next"
import { hasAnalyticsConsent } from "@/lib/analytics/consent"
import { trackEvent } from "@/lib/analytics/events"

export const metadata: Metadata = {
  title: "Something went wrong | Moon Ring",
}

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (hasAnalyticsConsent()) {
      trackEvent("view_error", { message: error?.message?.slice(0, 100) || "unknown" })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1B023A] to-[#120126] text-white flex items-center">
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-sm uppercase tracking-widest text-white/60">Unexpected Error</p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold">Something went wrong</h1>
        <p className="mt-4 text-white/80">Our team has been notified. You can try again or head back home.</p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] font-semibold hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Back Home
          </Link>
      </div>
      {error?.digest && (
        <p className="mt-6 text-xs text-white/40">Error reference: {error.digest}</p>
      )}
    </div>
  </main>
  )
}

