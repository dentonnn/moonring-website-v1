'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { HTMLMotionProps } from 'framer-motion'

interface AnimatedSectionProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

/**
 * Wrapper component that animates children when they enter the viewport
 * Supports fade + slide animations from different directions
 * Automatically respects prefers-reduced-motion
 */
export function AnimatedSection({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  ...props
}: AnimatedSectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const prefersReducedMotion = useReducedMotion()

  // Direction mappings
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  const offset = directions[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, ...offset }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0 }
          : prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: 0, ...offset }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration: 0.6,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
            }
      }
      {...props}
    >
      {children}
    </motion.div>
  )
}
