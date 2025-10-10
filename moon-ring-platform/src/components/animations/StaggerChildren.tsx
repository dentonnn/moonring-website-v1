'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { HTMLMotionProps } from 'framer-motion'

interface StaggerChildrenProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}

/**
 * Container that staggers the entrance animation of its children
 * Each child appears with a slight delay after the previous one
 * Creates a cascading effect for lists or grids
 */
export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  className = '',
  ...props
}: StaggerChildrenProps) {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Child item variant to use with StaggerChildren
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}
