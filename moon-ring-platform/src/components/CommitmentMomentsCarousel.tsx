'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Trophy, Heart, Target, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

interface CommitmentMoment {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  partnerAction: string
  partnerName: string
  dayNumber: number
  time: string
  yourMetric: {
    label: string
    value: string
    change: string
  }
  partnerMetric: {
    label: string
    value: string
    change: string
  }
  partnershipSync: number
  emotion: 'motivated' | 'supported' | 'celebrated' | 'rescued' | 'empowered'
  ctaText: string
}

const commitmentMoments: CommitmentMoment[] = [
  {
    id: 'morning-check-in',
    title: 'Morning Accountability Check-In',
    icon: <Target className="w-6 h-6" />,
    description: 'Your ring detected you hit your step goal yesterday. Your partner sees this and gets inspired.',
    partnerAction: '🏃 "Just saw your 12K steps! I\'m hitting the gym in 5 min, let\'s crush it together!"',
    partnerName: 'Marcus',
    dayNumber: 2,
    time: '7:30 AM',
    yourMetric: { label: 'Your Steps', value: '12,342', change: '+8% vs yesterday' },
    partnerMetric: { label: 'Their Motivation', value: 'HIGH', change: 'Your win sparked theirs' },
    partnershipSync: 98,
    emotion: 'motivated',
    ctaText: 'See How Momentum Works',
  },
  {
    id: 'mid-struggle',
    title: 'When You\'re About to Skip',
    icon: <AlertCircle className="w-6 h-6" />,
    description: 'Your ring detects unusual stress patterns and inactivity. Your accountability partner gets an alert.',
    partnerAction: '💪 "Everything okay? I noticed your stress is up. Want to grab a walk and talk?"',
    partnerName: 'Sarah',
    dayNumber: 18,
    time: '2:45 PM',
    yourMetric: { label: 'Stress Level', value: '↑ 45%', change: 'Above normal range' },
    partnerMetric: { label: 'Alert Sent', value: 'YES', change: 'Real-time support activated' },
    partnershipSync: 87,
    emotion: 'supported',
    ctaText: 'Explore Social Rescue',
  },
  {
    id: 'streak-milestone',
    title: 'Celebrating Streak Milestones',
    icon: <Trophy className="w-6 h-6" />,
    description: 'Both of you just hit 30 consecutive days of your commitment. Time to celebrate.',
    partnerAction: '🎉 "WE DID IT! 30 days! 🥳 Pizza night to celebrate our success?"',
    partnerName: 'Jordan',
    dayNumber: 30,
    time: '11:59 PM',
    yourMetric: { label: 'Streak Days', value: '30', change: '✓ Commitment locked' },
    partnerMetric: { label: 'Their Streak', value: '30', change: '✓ Both succeeded together' },
    partnershipSync: 100,
    emotion: 'celebrated',
    ctaText: 'Learn About Streaks',
  },
  {
    id: 'social-rescue',
    title: 'Getting Back on Track',
    icon: <Heart className="w-6 h-6" />,
    description: 'You missed a day. Instead of shame, your partner helps you recover without judgment.',
    partnerAction: '❤️ "Hey, one missed day doesn\'t erase 27. Let\'s just pick it up tomorrow together."',
    partnerName: 'Alex',
    dayNumber: 28,
    time: '9:15 AM',
    yourMetric: { label: 'Missed Days', value: '1', change: 'Streak paused, not broken' },
    partnerMetric: { label: 'Support Score', value: 'A+', change: 'Recovery mode activated' },
    partnershipSync: 92,
    emotion: 'rescued',
    ctaText: 'Discover Social Safety Net',
  },
  {
    id: 'partnership-win',
    title: 'Both Hit Your Goals',
    icon: <CheckCircle className="w-6 h-6" />,
    description: 'Rare moment: you both crushed your goals on the same day. Double the dopamine.',
    partnerAction: '⚡ "BOTH of us hit our targets today! That\'s 47 days in a row for our partnership!"',
    partnerName: 'Casey',
    dayNumber: 47,
    time: '10:00 PM',
    yourMetric: { label: 'Goal Achievement', value: '100%', change: 'Perfect day' },
    partnerMetric: { label: 'Partnership Sync', value: '100%', change: 'In perfect alignment' },
    partnershipSync: 99,
    emotion: 'empowered',
    ctaText: 'Build Your Commitment',
  },
]

const emotionColors = {
  motivated: { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-400', accent: 'text-blue-600' },
  supported: { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-400', accent: 'text-purple-600' },
  celebrated: { bg: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-400', accent: 'text-amber-600' },
  rescued: { bg: 'from-rose-500/20 to-pink-500/20', border: 'border-rose-400', accent: 'text-rose-600' },
  empowered: { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-400', accent: 'text-green-600' },
}


function ProgressDots({ currentIndex, total, onSelect }: { currentIndex: number; total: number; onSelect: (index: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onSelect(index)}
          className={`rounded-full transition-all ${
            index === currentIndex
              ? 'bg-gradient-to-r from-[#FF33BA] to-[#FF9966] w-3 h-3'
              : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
          }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Go to moment ${index + 1}`}
          aria-current={index === currentIndex ? 'page' : undefined}
        />
      ))}
    </div>
  )
}

export default function CommitmentMomentsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Autoplay logic
  useEffect(() => {
    if (!autoplay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % commitmentMoments.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [autoplay])

  // Swipe gesture detection for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX)
    handleSwipe()
  }

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrev()
    }
  }

  const current = commitmentMoments[currentIndex]
  const emotion = emotionColors[current.emotion]

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + commitmentMoments.length) % commitmentMoments.length)
        setAutoplay(false)
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % commitmentMoments.length)
        setAutoplay(false)
      } else if (e.key === ' ') {
        e.preventDefault()
        setAutoplay(!autoplay)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [autoplay])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % commitmentMoments.length)
    setAutoplay(false)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + commitmentMoments.length) % commitmentMoments.length)
    setAutoplay(false)
  }

  return (
    <section className="relative py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header with Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 border border-[#FF33BA]/20 mb-4">
              <span className="w-2 h-2 bg-gradient-to-r from-[#FF33BA] to-[#FF9966] rounded-full motion-safe:animate-pulse"></span>
              <span className="text-xs font-semibold text-[#FF33BA]">Interactive Demo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B023A] mb-2">
              Accountability in Action
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Real moments from 28M+ real partnerships. Explore how social accountability transforms good intentions into lasting wins.
            </p>
          </div>

          {/* Autoplay Toggle - Top Right */}
          <motion.button
            onClick={() => setAutoplay(!autoplay)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 border border-[#FF33BA]/20 text-[#FF33BA] font-semibold text-sm hover:bg-gradient-to-r hover:from-[#FF33BA]/20 hover:to-[#FF9966]/20 transition-all whitespace-nowrap"
            aria-label={autoplay ? 'Pause auto-advance' : 'Play auto-advance'}
          >
            {autoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{autoplay ? 'Pause' : 'Play'}</span>
          </motion.button>
        </div>

        {/* Main Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`rounded-3xl bg-gradient-to-br ${emotion.bg} border-2 ${emotion.border} p-6 sm:p-8 lg:p-10 shadow-xl backdrop-blur-sm cursor-grab active:cursor-grabbing`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Section: Context & Title */}
            <div className="mb-6 pb-6 border-b-2 border-gray-200/40">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center text-white shadow-lg`}>
                    {current.icon}
                  </div>
                  <div>
                    <p className={`text-xs font-bold tracking-wide ${emotion.accent} uppercase mb-1`}>
                      Day {current.dayNumber} • {current.time}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1B023A]">
                      {current.title}
                    </h3>
                  </div>
                </div>
                <p className={`text-xs sm:text-sm font-bold tracking-wide ${emotion.accent} uppercase flex-shrink-0`}>
                  Step {currentIndex + 1} of {commitmentMoments.length}
                </p>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Middle Section: Partner Message & Metrics */}
            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              {/* Partner Message - Full Width on Mobile */}
              <div className="lg:col-span-2">
                <div className="bg-white/60 rounded-2xl p-5 border-l-4 border-[#FF33BA] shadow-sm">
                  <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider flex items-center gap-2">
                    <span className="text-lg">💬</span>
                    {current.partnerName}'s Message
                  </p>
                  <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium">
                    {current.partnerAction}
                  </p>
                </div>
              </div>

              {/* Partnership Strength - Visual Focus */}
              <div className="bg-white/60 rounded-2xl p-5 shadow-sm flex flex-col justify-center">
                <p className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">Partnership Sync</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                      {current.partnershipSync}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${current.partnershipSync}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966]"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Connected & aligned</p>
                </div>
              </div>
            </div>

            {/* Bottom Section: Individual Metrics */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6 pb-6 border-b-2 border-gray-200/40">
              {/* Your Metrics */}
              <div className="bg-white/50 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">📊 Your Data</p>
                <p className="text-xs text-gray-600 mb-2">{current.yourMetric.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#1B023A] mb-1">
                  {current.yourMetric.value}
                </p>
                <p className="text-xs font-semibold text-green-600">
                  ✓ {current.yourMetric.change}
                </p>
              </div>

              {/* Partner Metrics */}
              <div className="bg-white/50 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">🤝 Their Impact</p>
                <p className="text-xs text-gray-600 mb-2">{current.partnerMetric.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#1B023A] mb-1">
                  {current.partnerMetric.value}
                </p>
                <p className="text-xs font-semibold text-purple-600">
                  ✓ {current.partnerMetric.change}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.a
              href="/#demo"
              data-analytics-event="accountability_moment_cta"
              data-analytics-params={JSON.stringify({ moment: current.id, step: currentIndex + 1 })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
            >
              {current.ctaText}
              <ChevronRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </AnimatePresence>

        {/* Navigation & Progress Controls */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Previous/Next Navigation */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={goToPrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-[#FF33BA] transition-colors"
              aria-label="Previous moment"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <span className="text-sm font-semibold text-gray-600 min-w-[60px] text-center">
              {currentIndex + 1} / {commitmentMoments.length}
            </span>
            <motion.button
              onClick={goToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-[#FF33BA] transition-colors"
              aria-label="Next moment"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Progress Dots */}
          <ProgressDots
            currentIndex={currentIndex}
            total={commitmentMoments.length}
            onSelect={(index) => {
              setCurrentIndex(index)
              setAutoplay(false)
            }}
          />

          {/* Keyboard Hint */}
          <p className="text-xs text-gray-500 text-center sm:text-right">
            Use <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-mono">← →</kbd> or click dots
          </p>
        </div>

        {/* Educational Note about Product Parity */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-6 max-w-3xl mx-auto">
            <p className="text-xs sm:text-sm font-semibold text-blue-900 mb-2">
              💡 This is a preview of your in-app experience
            </p>
            <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
              Once you create a commitment with Moon Ring, you'll see real-time moments just like these in your app dashboard. Watch as your partnership unfolds day by day—celebrate milestones, get support during struggles, and track how accountability strengthens both of you. Every message, stat, and partnership sync score is powered by actual wearable data and real human connection.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
