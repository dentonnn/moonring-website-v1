'use client'

/**
 * Waitlist Goal Selection Page (Tier 2 Upgrade)
 *
 * Allows waitlist subscribers to select their primary health goal.
 * This is triggered from Week 2 email campaign and upgrades user from Tier 1 to Tier 2.
 *
 * URL: /waitlist/goal-selection?id={subscriber_id}
 *
 * Design:
 * - Mobile-first, accessible, brand-consistent
 * - 4 goal options with icons and descriptions
 * - Optional name field for personalization
 * - Success state with position + tier info
 */
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Goal = 'movement' | 'sleep' | 'stress' | 'recovery'

interface GoalOption {
  value: Goal
  icon: string
  title: string
  description: string
}

const goalOptions: GoalOption[] = [
  {
    value: 'movement',
    icon: '🏃',
    title: 'Movement & Activity',
    description: 'Hit your daily step goals, consistent workouts',
  },
  {
    value: 'sleep',
    icon: '😴',
    title: 'Sleep Quality',
    description: 'Consistent bedtime, better sleep scores',
  },
  {
    value: 'stress',
    icon: '🧘',
    title: 'Stress & Recovery',
    description: 'Manage HRV, meditation, breathwork',
  },
  {
    value: 'recovery',
    icon: '💪',
    title: 'Recovery & Readiness',
    description: 'Optimize recovery scores, avoid burnout',
  },
]

function GoalSelectionContent() {
  const searchParams = useSearchParams()
  const subscriberId = searchParams.get('id')

  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [firstName, setFirstName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [subscriberData, setSubscriberData] = useState<{
    waitlistPosition: number
    tier: string
    engagementScore: number
  } | null>(null)

  // Validate subscriber ID on mount
  useEffect(() => {
    if (!subscriberId) {
      setError('Invalid link. Please use the link from your email.')
    }
  }, [subscriberId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedGoal) {
      setError('Please select a goal')
      return
    }

    if (!subscriberId) {
      setError('Invalid subscriber ID')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/waitlist/set-goal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriberId,
          goal: selectedGoal,
          firstName: firstName.trim() || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save goal')
      }

      // Success!
      setIsSuccess(true)
      setSubscriberData({
        waitlistPosition: data.subscriber.waitlistPosition,
        tier: data.subscriber.tier,
        engagementScore: data.subscriber.engagementScore,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (isSuccess && subscriberData) {
    return (
      <div className="min-h-screen bg-[#0F0F14] px-4 py-16">
        <div className="mx-auto max-w-2xl">
          {/* Success Header */}
          <div className="mb-8 rounded-xl bg-gradient-to-r from-[#FF33BA] to-[#FF9966] p-8 text-center">
            <div className="mb-4 text-6xl">🎉</div>
            <h1 className="text-3xl font-bold text-white">
              You&apos;re All Set!
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Thanks for sharing your goal. We&apos;ll use this to match you
              with the perfect accountability partner.
            </p>
          </div>

          {/* Position Info */}
          <div className="rounded-xl bg-[#1B1B21] p-8 text-white">
            <h2 className="mb-6 text-2xl font-semibold">Your Status</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-[#0F0F14] p-4">
                <div>
                  <p className="text-sm text-gray-400">Waitlist Position</p>
                  <p className="text-2xl font-bold text-[#FF9966]">
                    #{subscriberData.waitlistPosition.toLocaleString()}
                  </p>
                </div>
                <div className="text-4xl">📍</div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-[#0F0F14] p-4">
                <div>
                  <p className="text-sm text-gray-400">Tier Status</p>
                  <p className="text-2xl font-bold text-[#10B981]">
                    {subscriberData.tier === 'tier2'
                      ? 'Tier 2 ✓'
                      : subscriberData.tier.toUpperCase()}
                  </p>
                </div>
                <div className="text-4xl">⭐</div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-[#0F0F14] p-4">
                <div>
                  <p className="text-sm text-gray-400">Engagement Score</p>
                  <p className="text-2xl font-bold text-[#FF33BA]">
                    {subscriberData.engagementScore} points
                  </p>
                </div>
                <div className="text-4xl">🔥</div>
              </div>
            </div>

            {/* What's Next */}
            <div className="mt-8 border-t border-gray-700 pt-8">
              <h3 className="mb-4 text-xl font-semibold">What&apos;s Next?</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-xl">📧</span>
                  <span>
                    We&apos;ll send you weekly updates on your waitlist
                    progress
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">🎯</span>
                  <span>
                    Your goal will help us match you with accountability
                    partners who share your focus
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">🚀</span>
                  <span>
                    Move up faster by sharing your referral link (check your
                    original email)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block rounded-lg bg-gradient-to-r from-[#FF33BA] to-[#FF9966] px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Form state
  return (
    <div className="min-h-screen bg-[#0F0F14] px-4 py-16">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">
            Choose Your Focus
          </h1>
          <p className="text-lg text-gray-300">
            What&apos;s the #1 health metric you want to improve?
          </p>
          <p className="mt-2 text-sm text-gray-400">
            This helps us personalize your experience and match you with the
            right accountability partners.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/50 p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Goal Selection */}
          <div className="space-y-3">
            {goalOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedGoal(option.value)}
                className={`w-full rounded-lg p-6 text-left transition ${
                  selectedGoal === option.value
                    ? 'bg-gradient-to-r from-[#FF33BA]/20 to-[#FF9966]/20 border-2 border-[#FF9966]'
                    : 'bg-[#1B1B21] border-2 border-transparent hover:border-[#FF9966]/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{option.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {option.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      {option.description}
                    </p>
                  </div>
                  {selectedGoal === option.value && (
                    <div className="text-2xl text-[#10B981]">✓</div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Optional Name Field */}
          <div>
            <label
              htmlFor="firstName"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              First Name (Optional)
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="How should we address you?"
              className="w-full rounded-lg bg-[#1B1B21] border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:border-[#FF9966] focus:outline-none focus:ring-2 focus:ring-[#FF9966]/50"
            />
            <p className="mt-2 text-xs text-gray-500">
              We&apos;ll use this to personalize your emails
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedGoal || isSubmitting || !subscriberId}
            className="w-full rounded-lg bg-gradient-to-r from-[#FF33BA] to-[#FF9966] px-6 py-4 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save My Goal'}
          </button>

          <p className="text-center text-xs text-gray-500">
            Takes just 30 seconds • You can update this later
          </p>
        </form>
      </div>
    </div>
  )
}

export default function GoalSelectionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0F0F14] px-4 py-16 text-white">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-lg text-white/80">Loading your goal selection form…</p>
          </div>
        </div>
      }
    >
      <GoalSelectionContent />
    </Suspense>
  )
}
