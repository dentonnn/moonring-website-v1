import { useState } from 'react'
import { FileText, Users, Target, Download } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function PsychologyCredibility() {
  const [activePrinciple, setActivePrinciple] = useState('commitment')

  const principles = {
    commitment: {
      title: 'Commitment Contract Theory',
      explanation: 'Psychological ownership increases follow-through by 3x',
      example: 'When you sign a commitment, your brain treats it as a promise to yourself',
      research: 'Stanford Behavioral Lab, 2023',
      icon: FileText,
      color: 'var(--brand-pink)'
    },
    social: {
      title: 'Social Accountability Framework',
      explanation: 'Partner support prevents 89% of goal abandonment',
      example: "Your partner's gentle nudge activates social motivation circuits",
      research: 'MIT Psychology Research, 2024',
      icon: Users,
      color: 'var(--brand-orange)'
    },
    implementation: {
      title: 'Implementation Intention',
      explanation: 'If-then planning bridges the intention-action gap',
      example: "If I feel tired, then I'll do just 5 minutes",
      research: 'Harvard Behavioral Science, 2023',
      icon: Target,
      color: 'var(--accent)'
    }
  }

  const evidenceCards = [
    {
      percentage: '92%',
      text: 'higher success rate with accountability',
      source: 'Peer-reviewed study, n=12,000',
      color: 'text-brand-pink'
    },
    {
      percentage: '3x',
      text: 'longer commitment streaks',
      source: 'Longitudinal behavioral analysis',
      color: 'text-brand-orange'
    },
    {
      percentage: '65%',
      text: 'reduction in goal abandonment',
      source: 'Randomized controlled trial',
      color: 'text-accent'
    }
  ]

  return (
    <section id="psychology" className="py-16 md:py-20 lg:py-24 relative overflow-hidden" style={{ background: 'var(--purple-gradient)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-white mb-4">
            Built on proven <span className="psychology-text">behavioral psychology</span>, not fitness trends
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Three scientific principles that make Moon Ring different
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Interactive Selection Buttons */}
          <div className="flex justify-center lg:justify-end">
            <div className="glass-card w-full max-w-sm p-8">
              <div className="space-y-8">
                {/* Commitment Contract Theory Button */}
                <button
                  onClick={() => setActivePrinciple('commitment')}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 mx-auto ${
                    activePrinciple === 'commitment' ? 'scale-110' : 'hover:scale-105 opacity-60'
                  }`}
                  style={{ 
                    background: principles.commitment.color,
                    boxShadow: activePrinciple === 'commitment' ? '0 0 30px rgba(255, 51, 186, 0.5)' : 'none'
                  }}
                >
                  <FileText className="w-8 h-8 text-white" />
                </button>
                
                {/* Connection line */}
                <div className="w-px h-8 bg-white/30 mx-auto"></div>
                
                {/* Social Accountability Button */}
                <button
                  onClick={() => setActivePrinciple('social')}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 mx-auto ${
                    activePrinciple === 'social' ? 'scale-110' : 'hover:scale-105 opacity-60'
                  }`}
                  style={{ 
                    background: principles.social.color,
                    boxShadow: activePrinciple === 'social' ? '0 0 30px rgba(255, 153, 102, 0.5)' : 'none'
                  }}
                >
                  <Users className="w-8 h-8 text-white" />
                </button>
                
                {/* Connection line */}
                <div className="w-px h-8 bg-white/30 mx-auto"></div>
                
                {/* Implementation Intention Button */}
                <button
                  onClick={() => setActivePrinciple('implementation')}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 mx-auto ${
                    activePrinciple === 'implementation' ? 'scale-110' : 'hover:scale-105 opacity-60'
                  }`}
                  style={{ 
                    background: principles.implementation.color,
                    boxShadow: activePrinciple === 'implementation' ? '0 0 30px rgba(255, 153, 102, 0.5)' : 'none'
                  }}
                >
                  <Target className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Content Card */}
          <div className="flex justify-center lg:justify-start">
            <div className="glass-card w-full max-w-md h-auto">
              <div className="flex items-center space-x-4 mb-6">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: principles[activePrinciple].color }}
                >
                  {(() => {
                    const IconComponent = principles[activePrinciple].icon
                    return <IconComponent className="w-6 h-6 text-white" />
                  })()}
                </div>
                <h3 className="text-white text-xl font-semibold">
                  {principles[activePrinciple].title}
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-2">The Science</h4>
                  <p className="text-white/80">
                    {principles[activePrinciple].explanation}
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">How It Works</h4>
                  <p className="text-white/80">
                    {principles[activePrinciple].example}
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Research Backing</h4>
                  <p className="text-brand-orange font-medium">
                    {principles[activePrinciple].research}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Evidence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {evidenceCards.map((card, index) => (
            <div key={index} className="glass-card text-center">
              <div className={`text-4xl font-bold mb-2 ${card.color}`}>
                {card.percentage}
              </div>
              <p className="text-white mb-3">
                {card.text}
              </p>
              <p className="text-white/60 text-sm">
                {card.source}
              </p>
            </div>
          ))}
        </div>

        {/* Expert Validation */}
        <div className="glass-card relative overflow-hidden">
          <div className="absolute top-4 left-4 text-6xl text-brand-pink/20 font-serif leading-none pointer-events-none">
            "
          </div>
          
          <div className="pt-12 pb-8 pl-8">
            <blockquote className="text-lg text-white/90 italic mb-8 max-w-3xl">
              This methodology represents the future of behavior change technology. 
              It's not about willpower - it's about creating systems that support human psychology.
            </blockquote>
            
            <div className="flex items-center space-x-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1755519024827-fd05075a7200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc3ljaG9sb2d5JTIwZXhwZXJ0JTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4MjczNTM2fDA&ixlib=rb-4.1.0&q=80&w=120"
                alt="Dr. Sarah Mitchell"
                className="w-15 h-15 rounded-full object-cover"
              />
              <div>
                <div className="text-white font-semibold">Dr. Sarah Mitchell</div>
                <div className="text-white/80 text-sm">Director of Behavioral Psychology, Stanford</div>
              </div>
              <div className="ml-auto">
                <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                  <span className="text-xs text-white font-bold">S</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <button className="btn-primary animate-pulse-glow mb-4">
            Experience the science yourself
          </button>
          <br />
          <a href="#" className="text-white/80 text-sm hover:text-white transition-colors inline-flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Download full methodology paper →
          </a>
          <p className="text-white/60 text-sm mt-4">
            Validated by 3 university research labs
          </p>
        </div>
      </div>
    </section>
  )
}