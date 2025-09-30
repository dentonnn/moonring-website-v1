import { ArrowRight, ChevronDown, CheckCircle, Flame, LifeBuoy } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function Hero() {
  const socialProofData = [
    {
      icon: CheckCircle,
      number: "92%",
      text: "completion rate with accountability partners",
      color: "text-brand-pink"
    },
    {
      icon: Flame,
      number: "127 days",
      text: "average commitment streak",
      color: "text-brand-orange"
    },
    {
      icon: LifeBuoy,
      number: "89%",
      text: "social rescue success rate",
      color: "text-brand-pink"
    }
  ]

  const communityAvatars = [
    "https://images.unsplash.com/photo-1494790108755-2616b9225c9a?w=64&h=64&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=64&h=64&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=64&h=64&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face"
  ]



  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-[72px]" 
             style={{ background: 'var(--purple-gradient)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-white/20"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 rounded-full border border-white/20"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full border border-white/20"></div>
      </div>

      <div className="container relative z-10 py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline Group */}
          <div className="animate-fade-in mb-12">
            <h1 className="text-white mb-6 max-w-4xl mx-auto">
              Turn your health intentions into unbreakable commitments
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Join 28 million wearable users who have discovered the missing link: 
              <span className="commitment-text"> social accountability</span> that makes your health goals stick
            </p>
          </div>

          {/* Social Proof Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slide-up">
            {socialProofData.map((item, index) => (
              <div key={index} className="glass-card text-center" style={{ animationDelay: `${index * 100}ms` }}>
                <item.icon className="w-8 h-8 mx-auto mb-3 text-white/60" />
                <div className={`text-3xl font-bold mb-2 ${item.color}`}>
                  {item.number}
                </div>
                <p className="text-white/80 text-sm">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mb-16 max-w-2xl mx-auto">
            <div className="flex justify-center">
              <button 
                className="w-full max-w-sm h-14 
                          bg-gradient-to-r from-[#FF33BA] to-[#FF9966] 
                          text-white font-semibold text-base
                          rounded-full border-0
                          hover:scale-105 hover:shadow-[0_8px_32px_rgba(255,51,186,0.3)]
                          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                          flex items-center justify-center gap-2
                          cursor-pointer outline-none"
                style={{ minHeight: '56px' }}
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </button>
            </div>
          </div>

          {/* Floating Community Avatars - Desktop Only */}
          <div className="hidden xl:block absolute inset-0 pointer-events-none">
            {communityAvatars.map((avatar, index) => (
              <div
                key={index}
                className="absolute opacity-40"
                style={{
                  left: `${5 + (index % 4) * 22.5}%`,
                  top: `${15 + Math.floor(index / 4) * 20}%`,
                  animationDelay: `${index * 0.5}s`,
                  zIndex: 1
                }}
              >
                <ImageWithFallback
                  src={avatar}
                  alt={`Community member ${index + 1}`}
                  className="w-10 h-10 rounded-full border-2 border-white/20 animate-float"
                />
                {index < communityAvatars.length - 1 && index % 2 === 0 && (
                  <div className="absolute top-5 left-10 w-6 h-px border-t border-dashed border-white/20"></div>
                )}
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="text-center">
            <p className="text-white/60 text-sm mb-2">Experience commitment psychology</p>
            <ChevronDown className="w-6 h-6 text-white/60 mx-auto animate-bounce" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}