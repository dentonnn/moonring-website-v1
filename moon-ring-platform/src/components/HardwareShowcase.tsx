'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Zap, Droplet, Scale, Radio } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { StaggerChildren } from '@/components/animations/StaggerChildren'
import { FloatingElement } from '@/components/animations/FloatingElement'

export default function HardwareShowcase() {
  const features = [
    {
      icon: Zap,
      title: '14-Day Battery',
      description: 'Lasts nearly two weeks on a single charge'
    },
    {
      icon: Droplet,
      title: 'Water-Resistant',
      description: 'Swim, shower, train in any condition'
    },
    {
      icon: Scale,
      title: 'Ultra-Light',
      description: 'Just 3.8g—lighter than most rings'
    },
    {
      icon: Radio,
      title: 'Dual Connectivity',
      description: 'Bluetooth & LTE with offline capabilities'
    }
  ]

  return (
    <section className="relative py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 border border-[#FF33BA]/20 text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-[#FF33BA] rounded-full motion-safe:animate-pulse"></span>
            <span className="text-[#FF33BA]">Premium Hardware</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1B023A] mb-4">
            The Moon Ring Smart Band
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elegantly designed. Packed with sensors. Built to last through your commitments.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Features List */}
          <StaggerChildren staggerDelay={0.1} className="space-y-6">
            {features.map((feature, index) => (
              <AnimatedSection key={index} direction="left" delay={index * 0.1}>
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#FF33BA]/20 to-[#FF9966]/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-[#FF33BA]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1B023A] mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </StaggerChildren>

          {/* Right: Product Image */}
          <FloatingElement floatAmount={12} duration={5}>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 p-8 lg:p-12">
              <div className="relative aspect-square">
                <Image
                  src="/images/hero/hero-main.webp"
                  alt="Moon Ring smart ring with premium design"
                  fill
                  className="object-contain drop-shadow-lg"
                  sizes="(max-width: 1024px) 75vw, 400px"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#FF33BA]/10 to-[#FF9966]/10 rounded-full blur-3xl" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
            </div>
          </FloatingElement>
        </div>

        {/* Specs Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Material', value: 'Grade 5 Titanium' },
            { label: 'Water Proof', value: '5 ATM Rating' },
            { label: 'Battery', value: 'Up to 14 Days' },
            { label: 'Weight', value: '3.8g (Ultra-Light)' }
          ].map((spec, index) => (
            <AnimatedSection key={index} direction="up" delay={index * 0.1}>
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                <div className="text-sm text-gray-600 mb-2">{spec.label}</div>
                <div className="text-xl font-bold text-[#1B023A]">{spec.value}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/hardware"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25 mb-4"
          >
            Explore Full Specifications
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-gray-600 text-sm">
            Learn about sensors, materials, battery life, and how the ring integrates with commitments
          </p>
        </div>
      </div>
    </section>
  )
}