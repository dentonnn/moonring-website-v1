'use client'

import Image from 'next/image'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Testimonial {
  name: string
  role: string
  company?: string
  image: string
  rating: number
  quote: string
  result: string
  streak: number
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer',
    company: 'Google',
    image: '/images/testimonials/sarah-chen.svg',
    rating: 5,
    quote: 'I tried every fitness app out there. They all felt like games I eventually got bored of. Moon Ring is different—having someone actually counting on me changed everything.',
    result: '127-day sleep consistency streak',
    streak: 127
  },
  {
    name: 'Marcus Williams',
    role: 'Product Manager',
    company: 'Salesforce',
    image: '/images/testimonials/marcus-williams.svg',
    rating: 5,
    quote: 'My Fitbit collected dust for 9 months. Moon Ring gave me a reason to actually use it. My accountability partner and I have been going strong for 4 months now.',
    result: '10K steps daily for 112 days',
    streak: 112
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    image: '/images/testimonials/emily-rodriguez.svg',
    rating: 5,
    quote: 'The psychology behind this actually works. I\'m not motivated by badges or points—I\'m motivated by not letting down someone who\'s counting on me. Game changer.',
    result: 'Meditation habit: 89 days strong',
    streak: 89
  },
  {
    name: 'David Park',
    role: 'Entrepreneur',
    image: '/images/testimonials/david-park.svg',
    rating: 5,
    quote: 'I\'ve tried accountability coaches ($200/month), habit apps (free), and sheer willpower (failed). Moon Ring costs less than a coffee subscription and actually works.',
    result: 'Lost 23 lbs with movement goal',
    streak: 156
  },
  {
    name: 'Jessica Thompson',
    role: 'Nurse',
    image: '/images/testimonials/jessica-thompson.svg',
    rating: 5,
    quote: 'As a healthcare worker with irregular shifts, consistency was impossible. My accountability partner has the same schedule type—having someone who gets it makes all the difference.',
    result: 'Sleep quality improved 42%',
    streak: 67
  },
  {
    name: 'Alex Kumar',
    role: 'Data Scientist',
    image: '/images/testimonials/alex-kumar.svg',
    rating: 5,
    quote: 'I analyzed my own fitness data for years. Tracking alone doesn\'t create change—accountability does. Moon Ring is the missing piece I didn\'t know I needed.',
    result: 'HRV recovery: 3-month streak',
    streak: 94
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const constraintsRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  // Auto-scroll functionality
  useEffect(() => {
    if (prefersReducedMotion || isDragging) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change card every 5 seconds

    return () => clearInterval(interval)
  }, [prefersReducedMotion, isDragging])

  // Scroll to current index
  useEffect(() => {
    if (!constraintsRef.current) return

    const cardWidth = 420 // Card width + gap
    const targetX = -currentIndex * cardWidth

    x.set(targetX)
  }, [currentIndex, x])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="relative py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 border border-[#FF33BA]/20 mb-6">
            <Quote className="w-5 h-5 text-[#FF33BA]" />
            <span className="text-[#1B023A] text-sm font-medium">Real Stories</span>
          </div>

          <h2 className="text-4xl font-bold text-[#1B023A] mb-4">
            From Abandoned Wearables to Lasting Habits
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Thousands of people have transformed their health through social accountability.
            Here's what they're saying.
          </p>
        </div>

        {/* Horizontal Scrolling Carousel */}
        <div className="relative mb-12">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border-2 border-gray-200 shadow-lg flex items-center justify-center hover:bg-gray-50 hover:border-[#FF33BA] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-[#FF33BA]" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border-2 border-gray-200 shadow-lg flex items-center justify-center hover:bg-gray-50 hover:border-[#FF33BA] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-[#FF33BA]" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden px-16" ref={constraintsRef}>
            <motion.div
              className="flex gap-6"
              drag="x"
              dragConstraints={{ left: -(testimonials.length - 1) * 420, right: 0 }}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              style={{ x }}
              animate={{ x: -currentIndex * 420 }}
              transition={{
                type: prefersReducedMotion ? 'tween' : 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  className="min-w-[400px] rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 p-8 hover:shadow-xl transition-shadow cursor-grab active:cursor-grabbing"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                >
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#FF9966] text-[#FF9966]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Result */}
                  <div className="rounded-2xl bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 border border-[#FF33BA]/20 p-4 mb-6">
                    <div className="text-sm font-semibold text-gray-600 mb-1">Result:</div>
                    <div className="text-[#1B023A] font-bold">{testimonial.result}</div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/60 shadow-sm">
                      <Image
                        src={testimonial.image}
                        alt={`${testimonial.name} avatar illustration`}
                        fill
                        sizes="48px"
                        className="object-cover"
                        priority={idx < 3}
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-[#1B023A]">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">
                        {testimonial.role}
                        {testimonial.company && <span> · {testimonial.company}</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-gradient-to-r from-[#FF33BA] to-[#FF9966] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { number: '4.8/5', label: 'Average Rating' },
            { number: '12,847', label: 'Reviews' },
            { number: '127', label: 'Avg Streak Days' },
            { number: '67%', label: 'Goal Completion Rate' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
