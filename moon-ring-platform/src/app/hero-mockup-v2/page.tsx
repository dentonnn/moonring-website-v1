import Image from 'next/image'

export default function HeroMockupV2() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFF5F5] via-[#FFF0F5] to-[#F8F0FF]">
      {/* Navigation */}
      <nav className="border-b border-pink-100/50 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Image
                src="/images/logos/moonring-logo-black.png"
                alt="Moon Ring"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
                <a href="#" className="hover:text-[#FF33BA] transition-colors">How It Works</a>
                <a href="#" className="hover:text-[#FF33BA] transition-colors">Try Demo</a>
                <a href="#" className="hover:text-[#FF33BA] transition-colors">For Companies</a>
                <a href="#" className="hover:text-[#FF33BA] transition-colors">Pricing</a>
                <a href="#" className="hover:text-[#FF33BA] transition-colors">Blog</a>
                <a href="#" className="hover:text-[#FF33BA] transition-colors">About</a>
                <a href="#" className="hover:text-[#FF33BA] transition-colors">Contact</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm font-medium text-gray-700 hover:text-[#FF33BA] transition-colors">
                Sign In
              </button>
              <button className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all">
                Start Trial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Option 4: Split Layout */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Column: Text Content */}
            <div className="space-y-8">
              {/* Category Tags */}
              <div className="flex gap-3">
                <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 text-[#FF33BA] border border-[#FF33BA]/20">
                  Behavioral Psychology
                </span>
                <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/60 text-gray-600 border border-gray-200">
                  Social Accountability
                </span>
              </div>

              {/* Headline - Improved Contrast */}
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Turn your health </span>
                <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                  intentions
                </span>
                <span className="text-gray-900"> into unbreakable </span>
                <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                  commitments
                </span>
              </h1>

              {/* Subheadline - Better Readability */}
              <p className="text-xl text-gray-700 leading-relaxed max-w-xl">
                Moon Ring transforms your wearable data into lasting behavior change through evidence-based commitment psychology and social accountability.
              </p>

              {/* Stats - Subtle Cards */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-2xl bg-white/60 border border-pink-100/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">67%</div>
                  <div className="text-sm text-gray-600 mt-1">Success Rate</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/60 border border-pink-100/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">28M+</div>
                  <div className="text-sm text-gray-600 mt-1">Users Helped</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/60 border border-pink-100/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">127</div>
                  <div className="text-sm text-gray-600 mt-1">Avg Streak Days</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold hover:shadow-2xl hover:scale-105 transition-all">
                  Start Free Trial
                </button>
                <button className="px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-[#FF33BA] hover:text-[#FF33BA] hover:bg-white/80 transition-all">
                  See How It Works
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>30-day free trial</span>
                </div>
              </div>

              {/* Social Proof Callout */}
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100/50">
                <svg className="w-5 h-5 text-[#FF33BA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  <strong className="text-[#FF33BA]">Bring a friend:</strong> Accountability works best with people you know
                </span>
              </div>
            </div>

            {/* Right Column: Premium Product Photography (Full Height) */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white to-pink-50/30 border border-pink-100/50 p-12 lg:p-16 shadow-xl">
                <div className="relative aspect-square">
                  <Image
                    src="/images/product/ring-product-01.png"
                    alt="Moon Ring - Premium Smart Ring"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />

                  {/* Subtle Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF33BA]/5 via-transparent to-[#FF9966]/5 rounded-3xl" />

                  {/* Product Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-pink-200/50 shadow-lg">
                    <span className="text-xs font-semibold bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                      Premium Edition
                    </span>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#FF33BA]/10 to-[#FF9966]/10 rounded-full blur-2xl" />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Video Section - Dedicated Full Width */}
      <section className="py-16 lg:py-20 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 text-[#FF33BA] border border-[#FF33BA]/20 text-sm font-semibold">
              <span className="w-2 h-2 bg-[#FF33BA] rounded-full motion-safe:animate-pulse"></span>
              See It In Action
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Experience Moon Ring
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Watch how social accountability transforms daily intentions into lasting commitments
            </p>
          </div>

          {/* Video Container */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            {/* Video aspect ratio container */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800">

              {/* Placeholder for actual video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-6 p-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-white">
                      Brand Video Preview
                    </p>
                    <p className="text-sm text-gray-300 max-w-md mx-auto">
                      Showcase how Moon Ring uses behavioral psychology and social connections to drive lasting behavior change
                    </p>
                  </div>
                </div>
              </div>

              {/* Video would go here - uncomment when ready */}
              {/*
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/hero-brand-optimized-16x9.mp4" type="video/mp4" />
              </video>
              */}

              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
            </div>

            {/* Video duration badge */}
            <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white text-sm font-medium">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                0:35
              </span>
            </div>

            {/* Call-to-action overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                <button className="px-6 py-3 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-all pointer-events-auto">
                  Watch Full Demo
                </button>
              </div>
            </div>
          </div>

          {/* Feature callouts below video */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 rounded-2xl bg-white/60 border border-pink-100/50">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FF33BA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Evidence-Based</h3>
              <p className="text-sm text-gray-600">Built on proven commitment psychology and behavioral science</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/60 border border-pink-100/50">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FF33BA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Social First</h3>
              <p className="text-sm text-gray-600">Accountability works best with people you already know and trust</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/60 border border-pink-100/50">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FF33BA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Setup</h3>
              <p className="text-sm text-gray-600">Connect your wearable and start your first commitment in under 2 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Note for comparison */}
      <div className="fixed bottom-4 right-4 max-w-xs p-4 rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl z-50">
        <p className="text-xs font-semibold text-gray-900 mb-2">🎨 Mockup v2 - Updated</p>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>✓ Warm wellness palette</li>
          <li>✓ Hero: Product-only focus</li>
          <li>✓ Video: Dedicated section below</li>
          <li>✓ High text contrast</li>
          <li>✓ Premium materials feel</li>
        </ul>
        <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
          Visit: <code className="text-[#FF33BA]">/hero-mockup-v2</code>
        </p>
      </div>
    </main>
  )
}
