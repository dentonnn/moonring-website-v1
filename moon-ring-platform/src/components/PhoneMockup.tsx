'use client'

import { ReactNode } from 'react'
import { Signal, Wifi, Battery } from 'lucide-react'

interface PhoneMockupProps {
  children: ReactNode
  style?: 'ios' | 'android'
}

export default function PhoneMockup({ children, style = 'ios' }: PhoneMockupProps) {
  const isIOS = style === 'ios'

  return (
    <div className="flex items-center justify-center py-8">
      {/* Phone Container with perspective effect */}
      <div className="relative w-full max-w-md">
        {/* Outer shadow/glow effect */}
        <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-purple-500/5 to-pink-500/5 blur-2xl -z-10" />

        {/* iPhone Mockup */}
        <div className="relative rounded-[40px] overflow-hidden bg-black shadow-2xl" style={{ aspectRatio: '9/19' }}>
          {/* Notch (iOS only) */}
          {isIOS && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20 w-40 h-7 bg-black rounded-b-3xl flex items-center justify-center gap-1">
              {/* Notch inner elements */}
              <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
            </div>
          )}

          {/* Status Bar */}
          <div className={`relative z-10 bg-gradient-to-b from-gray-950 to-gray-900 px-6 py-1.5 flex items-center justify-between text-white text-xs font-semibold ${isIOS ? 'pt-10' : 'pt-6'}`}>
            <span className="text-gray-300">9:41</span>
            <div className="flex items-center gap-1">
              <Signal className="w-3 h-3 text-gray-400" />
              <Wifi className="w-3 h-3 text-gray-400" />
              <Battery className="w-3 h-3 text-gray-400" />
            </div>
          </div>

          {/* App Header Bar */}
          <div className="relative z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="text-[#FF33BA] font-semibold text-sm hover:opacity-70 transition-opacity">
                ← Partnerships
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Phone Screen Content */}
          <div className="relative z-10 h-full bg-white overflow-y-auto flex flex-col" style={{ maxHeight: 'calc(100% - 60px - 56px)' }}>
            {children}
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-100 px-6 py-3 flex items-center justify-around">
            {/* Home */}
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#FF33BA] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a3 3 0 013 3v1h2v-1a1 1 0 00-1-1H7v-2h10v2h-1a1 1 0 00-1 1v1h2v-1a3 3 0 013-3v-6.586l.707.707a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="text-xs text-gray-500">Home</span>
            </button>

            {/* Stats */}
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#FF33BA] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h2v8H3V13zm4-8h2v16H7V5zm4-2h2v18h-2V3zm4 4h2v14h-2V7zm4-2h2v16h-2V5z" />
              </svg>
              <span className="text-xs text-gray-500">Stats</span>
            </button>

            {/* Partners (highlighted) */}
            <button className="flex flex-col items-center gap-1 text-[#FF33BA]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.414-1.414L16 6.172l-2.346-2.346a1 1 0 10-1.414 1.414L14.586 7.586 12.24 9.932a1 1 0 101.414 1.414L16 9 18.346 11.346a1 1 0 101.414-1.414L17.414 7.586z" />
              </svg>
              <span className="text-xs">Partners</span>
            </button>

            {/* Settings */}
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#FF33BA] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0-7C6.48 7 2 9.69 2 13s4.48 6 10 6 10-2.69 10-6-4.48-6-10-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              </svg>
              <span className="text-xs text-gray-500">Settings</span>
            </button>
          </div>

          {/* Bezel/Face border */}
          <div className="absolute inset-0 rounded-[40px] border-[12px] border-black pointer-events-none" />
        </div>

        {/* Phone stand shadow */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-black/20 blur-md rounded-full" />
      </div>
    </div>
  )
}