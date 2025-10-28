'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Dual Ring Connection Animation
 * Shows two rings moving together with a "connection spark" effect
 * Represents partnership and accountability
 */
export function DualRingConnection() {
  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true })
  const prefersReducedMotion = useReducedMotion()

  // Connection spark line animation
  const sparkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: [0, 1, 1, 0],
      transition: {
        pathLength: { duration: 1.5, ease: 'easeInOut' },
        opacity: { duration: 2, ease: 'easeInOut' },
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
  }

  // Left ring animation - slides in from left
  const leftRingVariants = {
    hidden: { x: -60, opacity: 0, scale: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  }

  // Right ring animation - slides in from right
  const rightRingVariants = {
    hidden: { x: 60, opacity: 0, scale: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.2,
      },
    },
  }

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className="relative flex justify-center items-center gap-8 py-12">
        {/* Left Ring */}
        <div className="relative w-24 h-24">
          <Image
            src="/images/hero/hero-main.webp"
            alt="Moon Ring 1"
            fill
            className="object-contain"
          />
        </div>
        {/* Right Ring */}
        <div className="relative w-24 h-24">
          <Image
            src="/images/hero/hero-main.webp"
            alt="Moon Ring 2"
            fill
            className="object-contain"
          />
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className="relative flex justify-center items-center gap-8 py-12">
      {/* Left Ring - slides in from left */}
      <motion.div
        className="relative w-24 h-24"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={leftRingVariants}
        whileHover="animate"
      >
        <Image
          src="/images/hero/hero-main.webp"
          alt="Moon Ring accountability partner 1"
          fill
          className="object-contain drop-shadow-lg"
        />
      </motion.div>

      {/* Connection Spark - SVG line with glow effect */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <motion.svg
          className="absolute inset-0"
          viewBox="0 0 64 64"
          preserveAspectRatio="xMidYMid meet"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Glow effect */}
          <defs>
            <filter id="spark-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection line with gradient */}
          <motion.line
            x1="8"
            y1="32"
            x2="56"
            y2="32"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#spark-glow)"
            variants={sparkVariants}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF33BA" />
              <stop offset="50%" stopColor="#FF9966" />
              <stop offset="100%" stopColor="#FF33BA" />
            </linearGradient>
          </defs>

          {/* Animated spark particles */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`spark-${i}`}
              cx={16 + i * 16}
              cy="32"
              r="3"
              fill="#FF33BA"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? {
                opacity: [1, 0],
                scale: [1, 0],
                y: [-6, 6],
              } : { opacity: 0 }}
              transition={{
                duration: 1.2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 0.8,
              }}
            />
          ))}
        </motion.svg>

        {/* Centered text indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs font-semibold text-[#FF33BA] whitespace-nowrap">
            Stronger Together
          </div>
        </div>
      </div>

      {/* Right Ring - slides in from right */}
      <motion.div
        className="relative w-24 h-24"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={rightRingVariants}
        whileHover="animate"
      >
        <Image
          src="/images/hero/hero-main.webp"
          alt="Moon Ring accountability partner 2"
          fill
          className="object-contain drop-shadow-lg"
        />
      </motion.div>
    </div>
  )
}
