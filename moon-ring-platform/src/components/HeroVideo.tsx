'use client'

import { useEffect, useState } from 'react'

export default function HeroVideo() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
      if (mediaQuery.matches) {
        setIsPlaying(false)
      }
    }

    updateMotionPreference()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMotionPreference)
      return () => mediaQuery.removeEventListener('change', updateMotionPreference)
    }

    mediaQuery.addListener(updateMotionPreference)
    return () => mediaQuery.removeListener(updateMotionPreference)
  }, [])

  useEffect(() => {
    const video = document.getElementById('hero-video') as HTMLVideoElement | null
    if (!video) return

    if (prefersReducedMotion) {
      if (!isPlaying) {
        video.pause()
        video.currentTime = 0
      }
      return
    }

    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false))
    } else {
      video.pause()
    }
  }, [prefersReducedMotion, isPlaying])

  const toggleMute = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement
    if (video) {
      video.muted = !video.muted
      setIsMuted(!isMuted)
    }
  }

  const togglePlay = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="relative group">
      {/* Video container - fills most of hero section height */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        {/* 16:9 aspect ratio matching original video, taller container */}
        <div className="relative h-[600px] lg:h-[700px]">
          {/* Brand video - autoplay, loop, muted by default */}
          <video
            autoPlay={!prefersReducedMotion}
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            id="hero-video"
          >
            <source src="/videos/hero-brand-optimized-16x9.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Radial fade to black-purple edges for seamless integration */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_transparent_40%,_rgba(27,2,58,0.4)_70%,_rgba(27,2,58,0.8)_90%,_rgb(27,2,58)_100%)] pointer-events-none" />

          {/* Additional gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B023A]/50 via-transparent to-transparent pointer-events-none" />

          {/* Hover control buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Play/Pause button */}
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                // Pause icon
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                // Play icon
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>

            {/* Audio control button */}
            <button
              onClick={toggleMute}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                // Muted icon
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                // Unmuted icon
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative gradient blur */}
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br from-[#FF33BA] to-[#FF9966] rounded-full blur-3xl opacity-20 -z-10" />
    </div>
  )
}
