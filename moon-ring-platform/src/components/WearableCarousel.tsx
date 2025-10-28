"use client"

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

type WearableDevice = {
  name: string
  logo: string
  compatibility?: string
}

interface WearableCarouselProps {
  devices: WearableDevice[]
  ariaLabel?: string
}

export default function WearableCarousel({
  devices,
  ariaLabel = 'Supported wearable devices carousel',
}: WearableCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current
    if (!container) {
      setCanScrollLeft(false)
      setCanScrollRight(false)
      return
    }

    const maxScrollLeft = container.scrollWidth - container.clientWidth
    const buffer = 8

    setCanScrollLeft(container.scrollLeft > buffer)
    setCanScrollRight(container.scrollLeft < maxScrollLeft - buffer)
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    updateScrollState()
    const handleScroll = () => updateScrollState()

    container.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  const scrollBy = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return

    const firstCard = container.querySelector<HTMLElement>('[data-device-card="true"]')
    const cardWidth = firstCard?.getBoundingClientRect().width ?? container.clientWidth

    const gapValue = (() => {
      const gap = window.getComputedStyle(container).gap
      if (!gap) return 0
      const [horizontal] = gap.split(' ')
      const parsed = Number.parseFloat(horizontal)
      return Number.isNaN(parsed) ? 0 : parsed
    })()

    const amount = cardWidth + gapValue
    const multiplier = Math.max(1, Math.floor(container.clientWidth / amount))

    container.scrollBy({
      left: (direction === 'left' ? -1 : 1) * amount * multiplier,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/70 to-transparent pointer-events-none hidden md:block" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/70 to-transparent pointer-events-none hidden md:block" />

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => scrollBy('left')}
          disabled={!canScrollLeft}
          className="hidden md:inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1B023A] shadow-sm transition hover:border-[#FF33BA]/60 hover:text-[#FF33BA] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Scroll supported devices left"
          aria-controls="wearable-carousel"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div
          id="wearable-carousel"
          ref={scrollRef}
          role="region"
          aria-label={ariaLabel}
          className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-4 px-1 [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {devices.map((device) => (
            <div
              key={device.name}
              data-device-card="true"
              className="snap-center shrink-0 w-[220px] sm:w-[240px] lg:w-[260px]"
              aria-label={`${device.name}${device.compatibility ? `, ${device.compatibility}` : ''}`}
            >
              <div className="h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100">
                  <Image
                    src={device.logo}
                    alt={`${device.name} logo`}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-base font-semibold text-[#1B023A]">{device.name}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                    {device.compatibility ?? 'Full compatibility'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollBy('right')}
          disabled={!canScrollRight}
          className="hidden md:inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1B023A] shadow-sm transition hover:border-[#FF33BA]/60 hover:text-[#FF33BA] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Scroll supported devices right"
          aria-controls="wearable-carousel"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2 md:hidden">
        <button
          type="button"
          onClick={() => scrollBy('left')}
          disabled={!canScrollLeft}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1B023A] shadow-sm transition hover:border-[#FF33BA]/60 hover:text-[#FF33BA] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Scroll supported devices left"
          aria-controls="wearable-carousel"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy('right')}
          disabled={!canScrollRight}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1B023A] shadow-sm transition hover:border-[#FF33BA]/60 hover:text-[#FF33BA] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Scroll supported devices right"
          aria-controls="wearable-carousel"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
