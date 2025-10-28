'use client'

import Navigation from '@/components/Navigation'
import EmailCaptureForm from '@/components/forms/EmailCaptureForm'
import Link from 'next/link'
import { Smartphone, Apple, PlayCircle, QrCode, CheckCircle, AlertCircle } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'

export default function DownloadPage() {
  // App launch status - toggle this when app is live
  const appLaunched = false

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-[#1B023A] via-[#2D1B69] to-[#1B023A]">

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">

            {!appLaunched ? (
              // Coming Soon State
              <>
                <AnimatedSection direction="up" delay={0.1}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                    <span className="text-white/90 text-sm font-medium">App Launching Soon</span>
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={0.15}>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Get Early Access to the{' '}
                    <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                      Moon Ring App
                    </span>
                  </h1>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={0.2}>
                  <p className="text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                    We're putting the finishing touches on the iOS and Android apps. Join the waitlist to be notified the moment we launch.
                  </p>
                </AnimatedSection>

                {/* Notify Me Form */}
                <AnimatedSection direction="up" delay={0.25}>
                  <div className="max-w-xl bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Notify Me at Launch
                    </h3>
                    <p className="text-white/70 mb-6">
                      We'll email you 48 hours before the app goes live, plus send you exclusive launch day perks.
                    </p>
                    <EmailCaptureForm
                      source="download"
                      showGDPR={true}
                      className="max-w-none"
                    />
                  </div>
                </AnimatedSection>

                {/* What You'll Get */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center flex-shrink-0">
                        <Apple className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">iOS App (iPhone & iPad)</h3>
                        <p className="text-white/70 text-sm">
                          Native iOS experience with seamless Health app integration, Apple Watch sync, and Siri shortcuts.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center flex-shrink-0">
                        <PlayCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Android App (Phone & Wear OS)</h3>
                        <p className="text-white/70 text-sm">
                          Full Android integration with Google Fit, Wear OS sync, and Material Design 3 interface.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // App Live State
              <>
                <AnimatedSection direction="up" delay={0.1}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-white/90 text-sm font-medium">Now Available</span>
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={0.15}>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Download the{' '}
                    <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                      Moon Ring App
                    </span>
                  </h1>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={0.2}>
                  <p className="text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                    Turn your wearable data into unbreakable commitments. Download now for iOS and Android.
                  </p>
                </AnimatedSection>

                {/* Download Buttons */}
                <AnimatedSection direction="up" delay={0.25}>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <a
                      href="https://apps.apple.com/app/moonring"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-black hover:bg-gray-900 rounded-2xl transition-colors"
                    >
                      <Apple className="w-8 h-8 text-white" />
                      <div className="text-left">
                        <div className="text-xs text-white/70">Download on the</div>
                        <div className="text-lg font-semibold text-white">App Store</div>
                      </div>
                    </a>

                    <a
                      href="https://play.google.com/store/apps/details?id=com.moonring"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-black hover:bg-gray-900 rounded-2xl transition-colors"
                    >
                      <PlayCircle className="w-8 h-8 text-white" />
                      <div className="text-left">
                        <div className="text-xs text-white/70">Get it on</div>
                        <div className="text-lg font-semibold text-white">Google Play</div>
                      </div>
                    </a>
                  </div>
                </AnimatedSection>

                {/* QR Code */}
                <AnimatedSection direction="up" delay={0.3}>
                  <div className="inline-flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                    <QrCode className="w-5 h-5 text-white/80" />
                    <span className="text-white/80 text-sm">Scan QR code with your phone camera to download</span>
                  </div>
                </AnimatedSection>
              </>
            )}
          </div>
        </section>

        {/* Prerequisites Section */}
        <section className="relative py-20 px-4 bg-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Before You Download
              </h2>
              <p className="text-white/70 text-lg">
                Make sure you have everything you need
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Compatible Wearable */}
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Compatible Wearable</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Moon Ring works with devices you already own. No additional hardware purchase required.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="w-4 h-4 text-[#FF33BA]" />
                    <span>Apple Watch (Series 3+)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="w-4 h-4 text-[#FF33BA]" />
                    <span>Fitbit (all models)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="w-4 h-4 text-[#FF33BA]" />
                    <span>Garmin (Forerunner, Fenix, Venu)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="w-4 h-4 text-[#FF33BA]" />
                    <span>Oura Ring (Gen 2+)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="w-4 h-4 text-[#FF33BA]" />
                    <span>Whoop (all straps)</span>
                  </div>
                </div>
                <Link
                  href="/hardware"
                  className="inline-flex items-center gap-2 text-[#FF33BA] hover:text-[#FF9966] font-semibold transition-colors"
                >
                  See full compatibility list
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Account Setup */}
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-[#FF9966]" />
                  <h3 className="text-xl font-bold text-white">Account & Setup</h3>
                </div>
                <p className="text-white/70 mb-4">
                  The app will guide you through account creation and wearable connection. Takes about 5 minutes.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF33BA]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#FF33BA] font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Create Account</h4>
                      <p className="text-white/70 text-sm">Sign up with email or social login</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF33BA]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#FF33BA] font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Connect Wearable</h4>
                      <p className="text-white/70 text-sm">Grant permissions to read health data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF33BA]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#FF33BA] font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Find Partner</h4>
                      <p className="text-white/70 text-sm">Get matched with accountability partner</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF33BA]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#FF33BA] font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Create Commitment</h4>
                      <p className="text-white/70 text-sm">Set your first health goal and stakes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Requirements */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">System Requirements</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Apple className="w-6 h-6 text-white" />
                  <h3 className="text-lg font-bold text-white">iOS Requirements</h3>
                </div>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• iOS 14.0 or later</li>
                  <li>• iPhone 8 or newer</li>
                  <li>• ~50MB storage space</li>
                  <li>• Internet connection required</li>
                </ul>
              </div>

              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="w-6 h-6 text-white" />
                  <h3 className="text-lg font-bold text-white">Android Requirements</h3>
                </div>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• Android 8.0 (Oreo) or later</li>
                  <li>• ~60MB storage space</li>
                  <li>• Google Play Services</li>
                  <li>• Internet connection required</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-4 border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help Getting Started?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Check our support resources or contact our team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/support"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
              >
                Visit Support Center
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
              <p>&copy; 2025 Moon Ring. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
