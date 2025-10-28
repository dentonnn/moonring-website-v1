'use client'

import { useEffect, useState } from 'react'

/**
 * Reading Progress Bar
 * Displays a fixed progress indicator at the top of the page
 * showing how far the user has scrolled through the content
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = (scrollTop / docHeight) * 100
      setProgress(scrollProgress)
    }

    // Initial calculation
    updateProgress()

    // Update on scroll
    window.addEventListener('scroll', updateProgress, { passive: true })

    // Update on resize (content height might change)
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gray-200">
      <div
        className="h-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />
    </div>
  )
}
