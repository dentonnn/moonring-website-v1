"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { hasAnalyticsConsent } from "@/lib/analytics/consent"
import { trackEvent } from "@/lib/analytics/events"

function UnsubscribeContent() {
  const search = useSearchParams()
  const token = search.get('token') || ''
  const email = search.get('email') || ''

  const [reason, setReason] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (hasAnalyticsConsent()) {
      trackEvent('view_unsubscribe', { has_token: !!token, has_email: !!email })
    }
  }, [token, email])

  const maskedEmail = useMemo(() => {
    if (!email) return ''
    const [name, domain] = email.split('@')
    if (!name || !domain) return email
    const maskedName = name.length <= 2 ? '*'.repeat(name.length) : name[0] + '*'.repeat(name.length - 2) + name.slice(-1)
    return `${maskedName}@${domain}`
  }, [email])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setMessage(null)
    try {
      const res = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, reason }),
      })
      const data = await res.json()
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to unsubscribe')
      }
      setStatus('success')
      if (hasAnalyticsConsent()) {
        trackEvent('unsubscribe_success')
      }
    } catch (err: unknown) {
      setStatus('error')
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again later.'
      setMessage(msg)
      if (hasAnalyticsConsent()) {
        trackEvent('unsubscribe_error')
      }
    }
  }

  const invalid = !token

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1B023A] to-[#120126] text-white flex items-center">
      <div className="max-w-xl mx-auto px-6 py-20 w-full">
        <h1 className="text-3xl sm:text-4xl font-bold">Manage Email Preferences</h1>
        <p className="mt-3 text-white/80">Unsubscribe from Moon Ring updates.</p>

        {invalid ? (
          <div className="mt-8 rounded-lg border border-white/20 bg-white/5 p-6">
            <p className="text-white/80">Missing unsubscribe token. Please use the unsubscribe link from your email, or contact support.</p>
            <div className="mt-6">
              <Link href="/" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] font-semibold hover:opacity-90 transition-opacity">Back Home</Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 rounded-lg border border-white/20 bg-white/5 p-6 space-y-6">
            {email && (
              <p className="text-white/80 text-sm">Email: <span className="font-mono">{maskedEmail}</span></p>
            )}

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-white/90 mb-2">Reason (optional)</label>
              <select
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-[#1B023A] border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <option value="">Select a reason…</option>
                <option value="too_frequent">Emails are too frequent</option>
                <option value="not_relevant">Content is not relevant</option>
                <option value="never_signed_up">I never signed up</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] font-semibold disabled:opacity-60"
              >
                {status === 'submitting' ? 'Unsubscribing…' : 'Unsubscribe'}
              </button>
              <Link href="/" className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 transition-colors">Cancel</Link>
            </div>

            {status === 'success' && (
              <div className="rounded-md border border-green-500/30 bg-green-500/10 p-4 text-sm">You have been unsubscribed. A confirmation has been sent to your email.</div>
            )}
            {status === 'error' && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm">{message}</div>
            )}
          </form>
        )}

        <p className="mt-8 text-white/60 text-sm">Changed your mind? You can re-subscribe anytime from our homepage.</p>
      </div>
    </main>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-gradient-to-b from-[#1B023A] to-[#120126] text-white flex items-center justify-center px-6">Loading…</main>}>
      <UnsubscribeContent />
    </Suspense>
  )
}
// Note: metadata is exported from unsubscribe/layout.tsx since this is a client component
