import Navigation from '@/components/Navigation'
import HeroVideo from '@/components/HeroVideo'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AnimatedStats } from '@/components/animations/AnimatedStats'
import { StaggerChildren } from '@/components/animations/StaggerChildren'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function HeroConciseDemo() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-[#120228] via-[#22124b] to-[#120228]">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF33BA1A] via-transparent to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
            <div className="text-center lg:text-left lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16 lg:items-center">
              <div className="space-y-8">
                <AnimatedSection direction="up" delay={0.05}>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs sm:text-sm uppercase tracking-[0.18em] text-white/70">
                    Behavior change for humans, not dashboards
                  </span>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={0.1}>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Make every health promise stick
                  </h1>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={0.15}>
                  <p className="text-base sm:text-lg text-white/70 max-w-xl">
                    Real partners, not willpower, keep you consistent.
                  </p>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={0.2}>
                  <div className="space-y-4">
                    <StaggerChildren
                      as="ul"
                      className="space-y-3 text-left text-white/80 text-base sm:text-lg"
                      delayStep={0.05}
                    >
                      {[
                        'Sync your Apple Watch, Fitbit, Garmin, Oura, and more in seconds.',
                        'Pair with an accountability partner who sees your real progress.',
                        'Hit your goals 3× faster with stakes that actually matter.',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#FF33BA]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </StaggerChildren>
                  </div>
                </AnimatedSection>

                <AnimatedStats
                  stats={[
                    {
                      value: '67%',
                      label: 'Stick with commitments',
                      comparison: 'vs. 23% going solo',
                      source:
                        'Success defined as completing 80%+ of commitment duration with active accountability partner (Q1 2023 - Q2 2024).',
                    },
                    {
                      value: '28M',
                      label: 'Commitment contracts created',
                      comparison: 'Across 140+ countries',
                      source:
                        'Total registered users who created at least one commitment contract (lifetime platform metric as of October 2025).',
                    },
                    {
                      value: '127',
                      label: 'Average streak days',
                      comparison: '3.2× longer than solo attempts',
                      source:
                        'Average consecutive days maintaining commitment among users with accountability partners (n=8.4M).',
                    },
                  ]}
                />

                <AnimatedSection direction="up" delay={0.25}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="#waitlist"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
                    >
                      Start Your Commitment
                    </a>
                    <Link
                      href="/how-it-works"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/15 transition-colors"
                    >
                      See the Playbook
                    </Link>
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={0.3}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/70 text-sm">
                    Works with Apple Watch, Fitbit, Garmin, Oura & more
                  </div>
                </AnimatedSection>
              </div>

              <AnimatedSection direction="up" delay={0.2}>
                <div className="relative">
                  <div className="absolute -inset-6 bg-gradient-to-r from-[#FF33BA]/30 to-[#FF9966]/30 blur-3xl opacity-40" />
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/40">
                    <HeroVideo />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
