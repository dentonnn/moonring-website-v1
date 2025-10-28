import Navigation from '@/components/Navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Zap, Droplet, Smartphone, Radio, Scale, Users } from 'lucide-react'
import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { StaggerChildren } from '@/components/animations/StaggerChildren'

export const metadata: Metadata = generatePageMetadata(
  'Moon Ring Smart Hardware | Moon Ring',
  'Discover the Moon Ring smart ring specifications, design, battery life, and how it integrates with the Moon Ring commitment platform for social accountability.',
  '/hardware'
)

export default function HardwarePage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A]">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-semibold mb-6">
                  <span className="w-2 h-2 bg-[#FF33BA] rounded-full motion-safe:animate-pulse"></span>
                  <span className="text-[#FF33BA]">Premium Edition</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  The Moon Ring Smart Band
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  Elegantly crafted. Data-rich. Built for commitment.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/#waitlist"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
                  >
                    Reserve Your Ring
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link
                    href="/#waitlist"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-pink-500/10 border border-white/20 p-8 lg:p-12">
                  <Image
                    src="/images/hero/hero-main.webp"
                    alt="Moon Ring smart ring with charging case"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    sizes="(max-width: 1024px) 75vw, 480px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF33BA]/10 via-transparent to-[#FF9966]/10 rounded-3xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Specs Overview */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1B023A] mb-4">
                Designed for Precision
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every feature engineered for accurate health tracking and seamless accountability
              </p>
            </div>

            <StaggerChildren staggerDelay={0.1} className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: Zap,
                  title: '14-Day',
                  subtitle: 'Battery Life',
                  description: 'Up to 2 weeks on a single charge. Never miss a commitment.'
                },
                {
                  icon: Droplet,
                  title: 'Water-Resistant',
                  subtitle: '5ATM Rating',
                  description: 'Swim, shower, and track in any condition.'
                },
                {
                  icon: Scale,
                  title: '3.8g',
                  subtitle: 'Ultra-Light',
                  description: 'So light you forget you\'re wearing it. Weighs less than a ring.'
                },
                {
                  icon: Radio,
                  title: 'Dual-Connectivity',
                  subtitle: 'Bluetooth & LTE',
                  description: 'Works standalone or syncs instantly with your phone.'
                }
              ].map((spec, index) => (
                <AnimatedSection key={index} direction="up" delay={index * 0.1}>
                  <div className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-200">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF33BA]/20 to-[#FF9966]/20 flex items-center justify-center mx-auto mb-4">
                      <spec.icon className="w-6 h-6 text-[#FF33BA]" />
                    </div>
                    <div className="text-2xl font-bold text-[#1B023A] mb-1">{spec.title}</div>
                    <div className="text-sm font-semibold text-[#FF33BA] mb-3">{spec.subtitle}</div>
                    <p className="text-sm text-gray-600">{spec.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Full Technical Specifications
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Built with premium materials and state-of-the-art sensors
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Physical Specs */}
              <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  Physical Design
                </h3>

                <div className="space-y-4">
                  {[
                    { label: 'Material', value: 'Grade 5 Titanium + Sapphire Crystal' },
                    { label: 'Weight', value: '3.8g (without band)' },
                    { label: 'Thickness', value: '2.4mm' },
                    { label: 'Band Options', value: 'Silicone, Leather, Metal, Fabric' },
                    { label: 'Size Range', value: 'XS to XL (fits ring sizes 4-13)' },
                    { label: 'Colors', value: 'Midnight Black, Rose Gold, Silver, Deep Purple' },
                    { label: 'Water Resistance', value: '5 ATM (50m waterproof)' },
                    { label: 'Temperature Range', value: '-10°C to 45°C (14°F to 113°F)' },
                  ].map((spec, index) => (
                    <div key={index} className="flex justify-between items-start py-3 border-b border-white/10 last:border-0">
                      <span className="text-white/60 font-medium">{spec.label}</span>
                      <span className="text-white font-semibold text-right max-w-xs">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sensor & Performance Specs */}
              <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#52ACFF] to-[#725CFA] flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  Sensors & Performance
                </h3>

                <div className="space-y-4">
                  {[
                    { label: 'Heart Rate Sensor', value: 'Photoplethysmography (PPG)' },
                    { label: 'SpO2 Monitoring', value: 'Real-time blood oxygen tracking' },
                    { label: 'Temperature Sensor', value: 'Skin temperature ±0.1°C accuracy' },
                    { label: 'Motion Tracking', value: '6-axis IMU + accelerometer' },
                    { label: 'Sleep Tracking', value: 'REM/NREM/Deep sleep detection' },
                    { label: 'Stress Monitoring', value: 'HRV-based stress levels' },
                    { label: 'Battery Life', value: '14 days (5-min daily charge)' },
                    { label: 'Charging', value: 'USB-C magnetic dock (30 min to full)' },
                  ].map((spec, index) => (
                    <div key={index} className="flex justify-between items-start py-3 border-b border-white/10 last:border-0">
                      <span className="text-white/60 font-medium">{spec.label}</span>
                      <span className="text-white font-semibold text-right max-w-xs">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Connectivity & Software */}
            <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 border border-[#FF33BA]/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center">
                  <Radio className="w-5 h-5 text-white" />
                </div>
                Connectivity & Software
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white mb-4">Connectivity</h4>
                  {[
                    { label: 'Bluetooth', value: '5.3 LE' },
                    { label: 'WiFi', value: '6E (802.11ax)' },
                    { label: 'Optional LTE', value: 'Standalone connectivity' },
                    { label: 'NFC', value: 'Tap-to-sync payments' },
                  ].map((spec, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-white/70">{spec.label}</span>
                      <span className="text-white font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-white mb-4">Compatibility</h4>
                  {[
                    { label: 'iOS', value: '15.0 and later' },
                    { label: 'Android', value: '11 and later' },
                    { label: 'Web Dashboard', value: 'Chrome, Safari, Firefox' },
                    { label: 'API', value: 'RESTful + WebSocket' },
                  ].map((spec, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-white/70">{spec.label}</span>
                      <span className="text-white font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Philosophy */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1B023A] mb-4">
                Design Philosophy
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Form follows function, but style never compromises on substance
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="rounded-3xl overflow-hidden bg-gray-100 relative aspect-video">
                  <Image
                    src="/images/hero/hero-main.webp"
                    alt="Moon Ring design showcase"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#1B023A] mb-3">Invisible Technology</h3>
                  <p className="text-gray-600 leading-relaxed">
                    The Moon Ring was designed to disappear into your daily life. At just 3.8 grams, it's lighter than most rings yet packed with sensors that rival laboratory equipment.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#1B023A] mb-3">Premium Materials</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Grade 5 titanium ensures durability. Sapphire crystal resists scratching. Each material was chosen because it's the best—not because it's trendy.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#1B023A] mb-3">Fashion-First Customization</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Four interchangeable band materials and six color options mean your ring matches your style. Swap bands in seconds—no tools required.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#1B023A] mb-3">Data Privacy by Design</h3>
                  <p className="text-gray-600 leading-relaxed">
                    All processing happens on-device first. Your heart rate, sleep, and stress data is encrypted before ever leaving your ring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sensor Accuracy */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Clinical-Grade Accuracy
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Compared against FDA-approved medical devices in controlled studies
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  metric: 'Heart Rate',
                  accuracy: '±2 BPM',
                  compared: 'vs. ECG',
                  description: 'Consistent accuracy across exercise intensities'
                },
                {
                  metric: 'Sleep Detection',
                  accuracy: '94%',
                  compared: 'vs. Polysomnography',
                  description: 'Correctly identifies sleep/wake states'
                },
                {
                  metric: 'SpO2 Tracking',
                  accuracy: '±1.5%',
                  compared: 'vs. Pulse Oximetry',
                  description: 'Real-time blood oxygen monitoring'
                }
              ].map((item, index) => (
                <AnimatedSection key={index} direction="up" delay={index * 0.1}>
                  <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent mb-2">
                      {item.accuracy}
                    </div>
                    <div className="text-white font-semibold mb-2">{item.metric}</div>
                    <div className="text-sm text-white/60 mb-4">{item.compared}</div>
                    <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Integration with Platform */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1B023A] mb-4">
                Seamless Platform Integration
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your ring data powers meaningful accountability
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Commitment Tracking',
                  items: [
                    'Real-time progress updates to accountability partners',
                    'Automatic goal verification (no manual logging needed)',
                    'Historical trend analysis for long-term insights',
                    'Achievement badges and milestones'
                  ]
                },
                {
                  title: 'Social Features',
                  items: [
                    'Share daily stats with your accountability partner',
                    'See real-time notifications of partner progress',
                    'Supportive check-ins triggered by data insights',
                    'Group challenges with community members'
                  ]
                },
                {
                  title: 'Intelligence & Insights',
                  items: [
                    'AI coaching based on your patterns',
                    'Personalized recommendations for goal success',
                    'Prediction of commitment completion likelihood',
                    'Early warning for at-risk commitments'
                  ]
                },
                {
                  title: 'Privacy & Control',
                  items: [
                    'Granular permission controls per data type',
                    'Choose what data to share with partners',
                    'View complete data access history',
                    'Delete all data with one click'
                  ]
                }
              ].map((section, index) => (
                <AnimatedSection key={index} direction="up" delay={index * 0.1}>
                  <div className="rounded-3xl bg-gray-50 border border-gray-200 p-8">
                    <h3 className="text-2xl font-bold text-[#1B023A] mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      {section.title}
                    </h3>
                    <ul className="space-y-4">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#FF33BA]/20 to-[#FF9966]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-[#FF33BA]" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Hardware FAQ
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: 'How long does the battery last?',
                  a: 'The Moon Ring lasts up to 14 days on a single charge with typical daily use. Charging takes about 30 minutes via the magnetic USB-C dock included with your ring.'
                },
                {
                  q: 'Is it waterproof?',
                  a: 'Yes! The Moon Ring has a 5 ATM water resistance rating, meaning it\'s safe for swimming, showering, and even snorkeling up to 50 meters.'
                },
                {
                  q: 'Can I wear it while exercising?',
                  a: 'Absolutely. The ring is designed for active use. Its lightweight design (3.8g) and secure band options keep it comfortable during any activity.'
                },
                {
                  q: 'Which band size do I need?',
                  a: 'The Moon Ring comes in sizes XS to XL, fitting ring sizes 4-13. We\'ll send you a sizing kit so you can find your perfect fit before purchase.'
                },
                {
                  q: 'Does it work without the Moon Ring app?',
                  a: 'The ring stores data locally and syncs when you open the app. It will continue tracking in the background, but for real-time accountability features, the app connection is recommended.'
                },
                {
                  q: 'What happens to my data?',
                  a: 'Your data is encrypted on-device before leaving the ring. You control exactly what data is shared with accountability partners. Learn more in our Privacy Policy.'
                }
              ].map((faq, index) => (
                <div key={index} className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">{faq.q}</h4>
                  <p className="text-white/80 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="rounded-3xl bg-gradient-to-r from-[#1B023A] to-[#2D1B69] p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Track With Purpose?
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Join thousands of people who are turning wearable data into social accountability and lasting behavior change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#waitlist"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
                >
                  Reserve Your Ring
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF33BA]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF9966] opacity-70"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF33BA] opacity-50"></div>
                  </div>
                  <span className="text-lg font-bold text-white font-brand">Moon Ring</span>
                </div>
                <p className="text-white/60 text-sm">
                  Transforming wearable data into lasting behavior change through social accountability.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="/#demo" className="hover:text-white transition-colors">How It Works</Link></li>
                  <li><Link href="/hardware" className="text-white font-semibold">Hardware</Link></li>
                  <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/research" className="hover:text-white transition-colors">Research</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Support</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
              <p>&copy; 2025 Moon Ring. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="mailto:hello@moonring.com" className="hover:text-white transition-colors">Contact</a>
                <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}