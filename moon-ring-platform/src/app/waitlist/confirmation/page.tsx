'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Calendar, Gift } from 'lucide-react'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [copied, setCopied] = useState(false)
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch the user's actual referral code from the database
  useEffect(() => {
    async function fetchReferralCode() {
      if (!email) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/waitlist/get-referral-code?email=${encodeURIComponent(email)}`)
        const data = await response.json()

        if (data.success && data.referralCode) {
          setReferralCode(data.referralCode)
        }
      } catch (error) {
        console.error('Failed to fetch referral code:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReferralCode()
  }, [email])

  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}`
    : 'https://moonring.com'

  const referralLink = referralCode
    ? `${baseUrl}/waitlist?ref=${referralCode}`
    : `${baseUrl}/waitlist`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    const text = "I just joined the Moon Ring waitlist! Turn your health intentions into unbreakable commitments with real human accountability. 🎯"
    const url = referralLink

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    }

    window.open(urls[platform], '_blank', 'width=600,height=400')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A]">
      <div className="max-w-4xl mx-auto px-4 py-16">

        {/* Success Animation */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            You're on the List! 🎉
          </h1>
          <p className="text-xl text-white/80 mb-2">
            Welcome to the Moon Ring community
          </p>
          {email && (
            <p className="text-white/60">
              Confirmation sent to <strong className="text-white">{email}</strong>
            </p>
          )}
        </div>

        {/* What's Next Timeline */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#FF33BA]" />
            What Happens Next
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center text-white font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Now: Check Your Email</h3>
                <p className="text-white/70">
                  We've sent a confirmation with your waitlist position and tier status. Can't find it? Check spam/promotions folder.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-[#FF9966] flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Week 1: Welcome Guide</h3>
                <p className="text-white/70">
                  Get started with our behavioral psychology primer and see how accountability partners triple success rates.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-[#FF9966] flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Week 2: Goal Selection (Tier 2 Upgrade)</h3>
                <p className="text-white/70">
                  Choose your primary health goal and <strong className="text-[#FF33BA]">move up 100 positions</strong>. This helps us match you with the perfect accountability partner.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-[#FF9966] flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Weekly: Engagement & Learning</h3>
                <p className="text-white/70">
                  Exclusive articles on commitment psychology, success stories, and tips to prepare for your first commitment.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-[#FF9966] flex items-center justify-center text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Access Day: You're In!</h3>
                <p className="text-white/70">
                  We'll email you 48 hours before your access date. Download the app, connect your wearable, and create your first commitment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Program */}
        <div className="rounded-3xl bg-gradient-to-r from-[#FF33BA]/20 to-[#FF9966]/20 border border-[#FF9966]/40 backdrop-blur-sm p-8 mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Skip the Line: Refer Friends
            </h2>
            <p className="text-white/80 mb-1">
              Each friend who joins moves you up <strong className="text-white">100 positions</strong>
            </p>
            <p className="text-white/60 text-sm">
              Refer 3 friends and jump to the front of your tier
            </p>
          </div>

          {/* Referral Link */}
          <div className="bg-white/10 rounded-xl p-4 mb-4">
            <label className="block text-white/70 text-sm mb-2 font-medium">Your Unique Referral Link:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF33BA]"
              />
              <button
                onClick={handleCopyLink}
                className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-semibold hover:bg-white/20 transition-colors"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleShare('twitter')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1DA1F2] hover:bg-[#1a8cd8] rounded-lg text-white font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
              Share on Twitter
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0A66C2] hover:bg-[#094d92] rounded-lg text-white font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Share on LinkedIn
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2] hover:bg-[#1564d6] rounded-lg text-white font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Share on Facebook
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <Link
            href="/blog"
            className="group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 transition-all"
          >
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FF33BA] transition-colors">
              Read Our Blog
            </h3>
            <p className="text-white/70 text-sm">
              Learn about commitment psychology and behavioral science
            </p>
          </Link>

          <Link
            href="/hardware"
            className="group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 transition-all"
          >
            <div className="text-4xl mb-3">⌚</div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FF33BA] transition-colors">
              Check Compatibility
            </h3>
            <p className="text-white/70 text-sm">
              See if your wearable works with Moon Ring
            </p>
          </Link>

          <Link
            href="/about"
            className="group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 transition-all"
          >
            <div className="text-4xl mb-3">👋</div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FF33BA] transition-colors">
              Meet the Team
            </h3>
            <p className="text-white/70 text-sm">
              Learn about the founders and our mission
            </p>
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function WaitlistConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
