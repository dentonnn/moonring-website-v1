'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface CountUpStatProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

/**
 * Animated counter component that counts up from 0 to target value
 * Triggers animation when element enters viewport
 * Supports suffixes like %, M+, etc.
 */
export function CountUpStat({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: CountUpStatProps) {
  const [ref, isInView] = useInView({ threshold: 0.5, triggerOnce: true })
  const prefersReducedMotion = useReducedMotion()
  const [hasAnimated, setHasAnimated] = useState(false)

  // Spring animation for smooth counting
  const spring = useSpring(0, {
    damping: 30,
    stiffness: 50,
    duration: prefersReducedMotion ? 0 : duration * 1000,
  })

  const display = useTransform(spring, (current) => {
    // Format number based on value
    if (value >= 1000000) {
      // For millions (e.g., 28M+)
      return `${Math.floor(current / 1000000)}M${suffix}`
    } else if (value >= 1000) {
      // For thousands with comma
      return Math.floor(current).toLocaleString() + suffix
    } else {
      return Math.floor(current) + suffix
    }
  })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      if (prefersReducedMotion) {
        spring.set(value)
      } else {
        spring.set(value)
      }
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated, value, spring, prefersReducedMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
    </span>
  )
}
