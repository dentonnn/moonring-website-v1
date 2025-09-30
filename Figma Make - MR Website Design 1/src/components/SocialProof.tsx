import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Heart, TrendingUp, Moon, Activity, RotateCcw, Users, ChevronRight } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function SocialProof() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liveStats, setLiveStats] = useState({
    commitments: 2847,
    successRate: 92,
    online: 428
  })

  // Simulate live stats updating
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        commitments: prev.commitments + Math.floor(Math.random() * 3),
        successRate: 92 + (Math.random() * 2 - 1), // fluctuate around 92%
        online: prev.online + Math.floor(Math.random() * 5 - 2)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const featuredStory = {
    name: "Sarah M.",
    category: "Movement",
    categoryColor: "var(--movement-gradient)",
    image: "https://images.unsplash.com/photo-1720874129553-1d2e66076b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHRlc3RpbW9uaWFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4MjczNDczfDA&ixlib=rb-4.1.0&q=80&w=400",
    headline: "From abandoned Fitbit to 180-day movement streak",
    quote: "My accountability partner helped me understand why I was failing. It wasn't willpower, it was strategy. When I wanted to skip my morning run, Alex would text 'Remember why you started.' That simple message has saved my streak 47 times.",
    metrics: [
      { label: "Heart Rate", value: "↓ 15%", color: "text-green-500" },
      { label: "Sleep Quality", value: "↑ 34%", color: "text-green-500" },
      { label: "Consistency", value: "180 days", color: "text-brand-orange" },
      { label: "Community", value: "12 supporters", color: "text-blue-500" }
    ],
    partner: "Alex",
    supporters: 7
  }

  const successStories = [
    {
      name: "Mike R.",
      category: "Sleep",
      categoryColor: "var(--sleep-gradient)",
      streak: 127,
      quote: "Social accountability changed everything. My partner knows when I'm struggling.",
      metric: "2hrs better sleep",
      image: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Jennifer L.",
      category: "Stress",
      categoryColor: "var(--stress-gradient)",
      streak: 89,
      quote: "The psychology approach made it finally click. I understand why I succeed now.",
      metric: "40% stress reduction",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "David K.",
      category: "Recovery",
      categoryColor: "var(--recovery-gradient)",
      streak: 45,
      quote: "Recovery days became non-negotiable when my partner started checking in daily.",
      metric: "Zero injuries",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Lisa T.",
      category: "Movement",
      categoryColor: "var(--movement-gradient)",
      streak: 203,
      quote: "Having someone who cares about my goals as much as I do changed my entire mindset.",
      metric: "Lost 25 lbs",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Tom H.",
      category: "Sleep",
      categoryColor: "var(--sleep-gradient)",
      streak: 92,
      quote: "The social rescue feature literally saved my streak when work got crazy.",
      metric: "Consistent 8hrs",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Amy S.",
      category: "Stress",
      categoryColor: "var(--stress-gradient)",
      streak: 67,
      quote: "Meditation felt impossible until my partner started doing it with me virtually.",
      metric: "Daily mindfulness",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=64&h=64&fit=crop&crop=face"
    }
  ]

  const filters = ['All', 'Sleep', 'Movement', 'Stress', 'Recovery']

  const filteredStories = activeFilter === 'All' 
    ? successStories 
    : successStories.filter(story => story.category === activeFilter)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(filteredStories.length / 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(filteredStories.length / 3)) % Math.ceil(filteredStories.length / 3))
  }

  return (
    <section id="stories" className="py-16 md:py-20 lg:py-24 bg-background-secondary">
      <div className="container px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Real transformations through <span className="psychology-text">behavioral psychology</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Not just fitness wins - lasting behavior change through <span className="commitment-text">accountability</span>
          </p>
        </div>

        {/* Horizontal Scroll Carousel */}
        <div className="relative mb-16">
          {/* Filter Pills - Sticky on scroll */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center sticky top-20 z-10 bg-background/80 backdrop-blur-sm py-4 -mx-6 px-6">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-brand-gradient text-white'
                    : 'bg-white text-muted-foreground hover:bg-muted'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Horizontal Scrolling Container */}
          <div 
            className="overflow-x-auto scrollbar-hide"
            style={{ 
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
              {/* Featured Success Story Slide */}
              <div 
                className="flex-shrink-0 w-[54vw] md:w-[300px] lg:w-[360px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="glass-card bg-white h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <ImageWithFallback
                      src={featuredStory.image}
                      alt={featuredStory.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div 
                        className="inline-block px-2 py-1 rounded text-xs text-white font-medium mb-1"
                        style={{ background: featuredStory.categoryColor }}
                      >
                        {featuredStory.category}
                      </div>
                      <h3 className="font-semibold text-sm leading-tight">
                        {featuredStory.headline}
                      </h3>
                    </div>
                  </div>

                  <blockquote className="mb-4">
                    <div className="text-4xl text-brand-pink/20 font-serif leading-none mb-1">"</div>
                    <p className="text-muted-foreground italic text-sm leading-relaxed line-clamp-4">
                      {featuredStory.quote}
                    </p>
                  </blockquote>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {featuredStory.metrics.map((metric, index) => (
                      <div key={index} className="text-center p-2 bg-background-tertiary rounded-lg">
                        <div className={`font-bold text-sm ${metric.color}`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Partner & Community */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs">
                      <Users className="w-3 h-3 text-brand-pink" />
                      <span>with accountability partner <strong>{featuredStory.partner}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <div className="flex -space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 border border-white" />
                        ))}
                      </div>
                      <span>+{featuredStory.supporters} community members</span>
                    </div>
                    <a href="#" className="text-brand-pink text-xs hover:underline inline-flex items-center">
                      Read full story <ChevronRight className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Success Story Cards as Individual Slides */}
              {filteredStories.map((story, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-[54vw] md:w-[300px] lg:w-[360px]"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="glass-card bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="flex items-center space-x-2 mb-3">
                      <ImageWithFallback
                        src={story.image}
                        alt={story.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-sm">{story.name}</div>
                        <div 
                          className="inline-block px-1 py-0.5 rounded text-xs text-white"
                          style={{ background: story.categoryColor }}
                        >
                          {story.category}
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-xl font-bold text-brand-orange mb-1">
                        {story.streak} days
                      </div>
                      <div className="text-xs text-muted-foreground">streak</div>
                    </div>

                    <blockquote className="text-xs text-muted-foreground italic mb-3 line-clamp-3">
                      "{story.quote}"
                    </blockquote>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-2 gap-1 mb-3">
                      <div className="text-center p-1">
                        <div className="text-green-500 font-bold text-xs">+15%</div>
                        <div className="text-xs text-muted-foreground">Heart Rate</div>
                      </div>
                      <div className="text-center p-1">
                        <div className="text-blue-500 font-bold text-xs">+34%</div>
                        <div className="text-xs text-muted-foreground">Sleep Quality</div>
                      </div>
                      <div className="text-center p-1">
                        <div className="text-orange-500 font-bold text-xs">{story.streak} days</div>
                        <div className="text-xs text-muted-foreground">Consistency</div>
                      </div>
                      <div className="text-center p-1">
                        <div className="text-blue-500 font-bold text-xs">12 supporters</div>
                        <div className="text-xs text-muted-foreground">Community</div>
                      </div>
                    </div>

                    {/* Partner & Community */}
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-xs">
                        <Users className="w-3 h-3 text-brand-pink" />
                        <span>with partner <strong>Alex</strong></span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <div className="flex -space-x-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 border border-white" />
                          ))}
                        </div>
                        <span>+7 community members</span>
                      </div>
                      <a href="#" className="text-brand-pink text-xs hover:underline inline-flex items-center">
                        Read full story <ChevronRight className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {/* Final CTA Slide */}
              <div 
                className="flex-shrink-0 w-[54vw] md:w-[300px] lg:w-[360px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="glass-card h-full flex flex-col items-center justify-center text-center"
                     style={{ background: 'var(--brand-gradient)' }}>
                  <Heart className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-white font-semibold text-sm mb-3">
                    Join the community
                  </h3>
                  <p className="text-white/80 mb-4 text-xs leading-relaxed">
                    Start your transformation journey with 28M+ users who found their accountability
                  </p>
                  <button className="bg-white text-brand-pink hover:bg-white/90 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200">
                    Start Free Trial
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <ArrowLeft className="w-4 h-4" />
              <span>Swipe to explore more stories</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Real-time Social Proof Banner */}
        <div 
          className="glass-card text-white text-center py-6"
          style={{ background: 'var(--brand-gradient)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-2xl font-bold">
                {liveStats.commitments.toLocaleString()}
              </div>
              <div className="text-white/80">commitments started this week</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {Math.round(liveStats.successRate)}%
              </div>
              <div className="text-white/80">average success rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {liveStats.online}
              </div>
              <div className="text-white/80">people online now</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}