'use client'

import { CountUpStat } from './CountUpStat'
import { AnimatedSection } from './AnimatedSection'

interface AnimatedStatsProps {
  stats: Array<{
    value: string
    label: string
    comparison: string
    source: string
  }>
}

/**
 * Wrapper component that combines CountUpStat animation with StatWithTooltip
 * Extracts the number value and animates it, while preserving tooltip functionality
 */
export function AnimatedStats({ stats }: AnimatedStatsProps) {
  const parseStatValue = (value: string): { number: number; suffix: string } => {
    // Extract number and suffix from strings like "67%", "28M+", "127"
    const match = value.match(/^(\d+(?:\.\d+)?)(.*?)$/)
    if (match) {
      const num = parseFloat(match[1])
      const suffix = match[2]

      // Convert M to actual number for animation
      if (suffix.toLowerCase().includes('m')) {
        return { number: num * 1000000, suffix: 'M' + suffix.slice(1) }
      }

      return { number: num, suffix }
    }
    return { number: 0, suffix: value }
  }

  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4">
      {stats.map((stat, index) => {
        const { number, suffix } = parseStatValue(stat.value)

        return (
          <AnimatedSection key={index} delay={index * 0.1} direction="up">
            <div className="text-center lg:text-left relative">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                <CountUpStat value={number} suffix={suffix} duration={2} />
              </div>

              <div className="text-sm text-white/60 mt-1 flex items-center gap-1.5 justify-center lg:justify-start">
                <span>{stat.label}</span>
                <button
                  className="w-4 h-4 rounded-full border border-white/40 text-white/60 text-[10px] leading-none hover:bg-white/10 hover:border-white/60 transition-all flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={`More information about ${stat.label}`}
                  type="button"
                  onClick={() => {
                    // This will be handled by the parent StatWithTooltip logic if needed
                    // For now, we're replacing the StatWithTooltip with a simpler version
                  }}
                >
                  <span className="font-semibold" aria-hidden="true">
                    i
                  </span>
                </button>
              </div>

              {/* Tooltip - simplified for animation demo */}
              <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 max-w-[calc(100vw-2rem)] p-4 rounded-xl bg-white text-gray-900 text-sm shadow-2xl border border-gray-200 opacity-0 pointer-events-none hover:opacity-100 hover:pointer-events-auto transition-opacity">
                <p className="font-semibold text-gray-900 mb-2 text-base">{stat.comparison}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{stat.source}</p>
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-3 h-3 bg-white border-r border-b border-gray-200 rotate-45"
                  aria-hidden="true"
                />
              </div>
            </div>
          </AnimatedSection>
        )
      })}
    </div>
  )
}
