'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { HTMLMotionProps } from 'framer-motion'

interface FloatingElementProps extends Omit<HTMLMotionProps<'div'>, 'animate'> {
  children: React.ReactNode
  floatAmount?: number
  duration?: number
  className?: string
}

/**
 * Creates a gentle floating/hovering effect
 * Perfect for product images, illustrations, or decorative elements
 * Automatically disabled for users with reduced motion preference
 */
export function FloatingElement({
  children,
  floatAmount = 10,
  duration = 3,
  className = '',
  ...props
}: FloatingElementProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [0, -floatAmount, 0],
            }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
      {...props}
    >
      {children}
    </motion.div>
  )
}
