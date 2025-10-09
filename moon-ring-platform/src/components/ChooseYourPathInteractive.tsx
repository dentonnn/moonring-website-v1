'use client'

import Image from 'next/image'
import { CheckCircle, Star, Shield, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export default function ChooseYourPathInteractive() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto md:[&>:first-child]:scale-105">
        {/* Path 1: Existing Wearable (Recommended) */}
        <div
          className={`relative group cursor-pointer ${selectedPath && selectedPath !== 'wearable' ? 'opacity-60' : ''}`}
          role="radio"
          aria-checked={selectedPath === 'wearable'}
          aria-label="Have a wearable device - Recommended option"
          tabIndex={0}
          onClick={() => setSelectedPath('wearable')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setSelectedPath('wearable')
            }
          }}
        >
          {/* Recommended badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <div className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>RECOMMENDED</span>
            </div>
          </div>
          {/* Enhanced glow */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#52ACFF]/20 to-[#725CFA]/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
            aria-hidden="true"
          />

          <div className="relative rounded-3xl bg-white border-2 border-gray-200 hover:border-[#52ACFF] p-8 transition-all hover:shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52ACFF] to-[#725CFA] flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[#1B023A] mb-2">Have a Wearable?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Apple Watch, Fitbit, Garmin, Oura, Whoop, or any fitness tracker
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>Most Popular Path</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#52ACFF] flex-shrink-0 mt-0.5" />
                <span>Connect your existing device instantly</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#52ACFF] flex-shrink-0 mt-0.5" />
                <span>Use data you're already tracking</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#52ACFF] flex-shrink-0 mt-0.5" />
                <span>Start with commitment psychology today</span>
              </li>
            </ul>

            <a
              href="#pricing"
              className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-[#52ACFF] to-[#725CFA] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              See Software Plans
            </a>
            <p className="text-center text-xs text-gray-500 mt-3">From $9/month • 30-day free trial</p>
          </div>
        </div>

        {/* Path 2: No Wearable - Get Moon Ring */}
        <div
          className={`relative group cursor-pointer ${selectedPath && selectedPath !== 'ring' ? 'opacity-60' : ''}`}
          onClick={() => setSelectedPath('ring')}
          role="radio"
          aria-checked={selectedPath === 'ring'}
          aria-label="Need a wearable - Get Moon Ring"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setSelectedPath('ring')
            }
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF33BA]/20 to-[#FF9966]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" aria-hidden="true" />
          <div className="relative rounded-3xl bg-white border-2 border-gray-200 hover:border-[#FF33BA] p-8 transition-all hover:shadow-2xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white text-xs font-semibold rounded-full">
              Complete Solution
            </div>

            <div className="relative w-32 h-32 mx-auto mb-6 mt-4">
              <Image src="/images/product/ring-render-01.png" alt="Moon Ring Device" fill className="object-contain" />
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[#1B023A] mb-2">Need a Wearable?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get the Moon Ring - sleek, stylish, and built for commitment
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                <Star className="w-4 h-4" />
                <span>Hardware + Software</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#FF33BA] flex-shrink-0 mt-0.5" />
                <span>Beautiful, minimalist form factor</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#FF33BA] flex-shrink-0 mt-0.5" />
                <span>All health metrics you need</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#FF33BA] flex-shrink-0 mt-0.5" />
                <span>Lifetime software access included</span>
              </li>
            </ul>

            <a
              href="#pricing"
              className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Pre-Order Moon Ring
            </a>
            <p className="text-center text-xs text-gray-500 mt-3">$299 one-time • Ships Q2 2025</p>
          </div>
        </div>

        {/* Path 3: Freemium - Try First */}
        <div
          className={`relative group cursor-pointer ${selectedPath && selectedPath !== 'free' ? 'opacity-60' : ''}`}
          onClick={() => setSelectedPath('free')}
          role="radio"
          aria-checked={selectedPath === 'free'}
          aria-label="Try for free - No wearable required"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setSelectedPath('free')
            }
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#F7941D]/20 to-[#FFF200]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" aria-hidden="true" />
          <div className="relative rounded-3xl bg-white border-2 border-gray-200 hover:border-[#F7941D] p-8 transition-all hover:shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F7941D] to-[#FFF200] flex items-center justify-center mb-6 mx-auto">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[#1B023A] mb-2">Not Sure Yet?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Start free with phone step tracking - no wearable needed
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                <Shield className="w-4 h-4" />
                <span>100% Free Forever</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#F7941D] flex-shrink-0 mt-0.5" />
                <span>Track steps with your phone</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#F7941D] flex-shrink-0 mt-0.5" />
                <span>Experience commitment psychology</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#F7941D] flex-shrink-0 mt-0.5" />
                <span>Upgrade when you're ready</span>
              </li>
            </ul>

            <a
              href="#waitlist"
              data-analytics-event="start_trial"
              data-analytics-params={JSON.stringify({ location: 'home_pricing_paths_free', variant: 'B', copy: 'build_commitment' })}
              className="block w-full text-center py-3 rounded-full bg-gradient-to-r from-[#F7941D] to-[#FFF200] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Build Your First Commitment
            </a>
            <p className="text-center text-xs text-gray-500 mt-3">No credit card • No wearable required</p>
          </div>
        </div>
      </div>

      {/* Reset choice button */}
      {selectedPath && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setSelectedPath(null)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 border border-gray-300 text-gray-700 hover:text-[#1B023A] hover:bg-gray-200 transition-all text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Compare all options again</span>
          </button>
        </div>
      )}
    </>
  )
}
