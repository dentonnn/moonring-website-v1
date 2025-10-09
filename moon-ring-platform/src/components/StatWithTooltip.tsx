'use client'

import { useState } from 'react'

interface StatWithTooltipProps {
  value: string
  label: string
  source: string
  comparison?: string
  className?: string
}

export default function StatWithTooltip({
  value,
  label,
  source,
  comparison,
  className = '',
}: StatWithTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className={`text-center lg:text-left relative ${className}`}>
      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-sm text-white/60 mt-1 flex items-center gap-1.5 justify-center lg:justify-start">
        <span>{label}</span>
        <button
          onClick={() => setShowTooltip(!showTooltip)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className="w-4 h-4 rounded-full border border-white/40 text-white/60 text-[10px] leading-none hover:bg-white/10 hover:border-white/60 transition-all flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label={`More information about ${label}`}
          type="button"
        >
          <span className="font-semibold" aria-hidden="true">i</span>
        </button>
      </div>

      {showTooltip && (
        <div
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 max-w-[calc(100vw-2rem)] p-4 rounded-xl bg-white text-gray-900 text-sm shadow-2xl border border-gray-200"
          role="tooltip"
        >
          {comparison && (
            <p className="font-semibold text-gray-900 mb-2 text-base">{comparison}</p>
          )}
          <p className="text-gray-600 text-xs leading-relaxed">{source}</p>
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-3 h-3 bg-white border-r border-b border-gray-200 rotate-45"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  )
}

