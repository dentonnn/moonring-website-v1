'use client'

/**
 * PDF Download Landing Page
 *
 * URL: /download/guide/{subscriber_id}
 *
 * This page is linked from Week 4 waitlist email.
 * It tracks downloads and provides the PDF link.
 *
 * Design principles:
 * - Simple, focused on one action (download)
 * - No distractions or navigation
 * - Tracks download before redirecting to PDF
 * - Mobile-first, accessible
 */

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function DownloadGuidePage() {
  const params = useParams()
  const subscriberId = params.subscriber_id as string

  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Track page view on mount
  useEffect(() => {
    if (!subscriberId) {
      setError('Invalid download link. Please use the link from your email.')
    }
  }, [subscriberId])

  const handleDownload = async () => {
    if (!subscriberId) {
      setError('Invalid subscriber ID')
      return
    }

    setIsDownloading(true)
    setError(null)

    try {
      // Track the download
      const response = await fetch('/api/waitlist/track-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriberId,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to track download')
      }

      // Success! Open PDF in new tab
      // TODO: Replace with actual PDF URL when uploaded
      const pdfUrl = '/pdfs/accountability-science-guide.pdf'
      window.open(pdfUrl, '_blank')

      // Show success message
      setIsDownloading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F14] px-4 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 text-6xl">📄</div>
          <h1 className="mb-4 text-4xl font-bold text-white">
            Your Free Guide Is Ready
          </h1>
          <p className="text-xl text-gray-300">
            The Science of Social Accountability
          </p>
          <p className="mt-2 text-sm text-gray-400">
            26 pages • Research-backed strategies for wearable users
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/50 p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="rounded-xl bg-[#1B1B21] p-8 text-white">
          {/* What's Inside Preview */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">
              What&apos;s Inside:
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <span>
                  <strong className="text-white">
                    Implementation Intentions:
                  </strong>{' '}
                  7 ready-to-use &quot;if-then&quot; templates (2-3× more
                  effective than regular goals)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <span>
                  <strong className="text-white">The Goldilocks Zone:</strong>{' '}
                  Find your optimal challenge level (not too easy, not too
                  hard)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <span>
                  <strong className="text-white">
                    Accountability Partners:
                  </strong>{' '}
                  5 contract templates to increase success rate to 95%
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <span>
                  <strong className="text-white">Fresh Start Effect:</strong>{' '}
                  Why Monday works (and how to create your own fresh starts)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <span>
                  <strong className="text-white">
                    Public vs Private Goals:
                  </strong>{' '}
                  When to share, when to keep quiet (with decision tree)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <span>
                  <strong className="text-white">
                    7 Proven Strategies:
                  </strong>{' '}
                  Step-by-step instructions backed by 17 academic citations
                </span>
              </li>
            </ul>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading || !subscriberId}
            className="w-full rounded-lg bg-gradient-to-r from-[#FF33BA] to-[#FF9966] px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDownloading ? 'Opening PDF...' : '📥 Download Free Guide (PDF)'}
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            No signup required • Opens in new tab • 2.1 MB
          </p>

          {/* Social Proof */}
          <div className="mt-8 border-t border-gray-700 pt-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#FF9966]">76%</p>
              <p className="mt-2 text-sm text-gray-400">
                Success rate with accountability partners vs. 8% going solo
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Study: American Society of Training and Development
              </p>
            </div>
          </div>

          {/* Bonus Content */}
          <div className="mt-8 rounded-lg bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 border border-[#FF9966]/30 p-6">
            <h3 className="mb-3 text-lg font-semibold text-white">
              💡 Bonus: Implementation Calendar
            </h3>
            <p className="text-sm text-gray-300">
              Inside the PDF, you&apos;ll find a 2025 Fresh Start Effect
              calendar highlighting the best days to start new habits (based on
              psychology research).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Questions? Reply to your waitlist email and we&apos;ll help you
            out.
          </p>
          <p className="mt-4">
            <Link
              href="/"
              className="text-[#FF9966] hover:underline transition"
            >
              ← Back to Moon Ring
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
