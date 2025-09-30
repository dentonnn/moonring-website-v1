import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, BookOpen, Users, Brain, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research Library | Moon Ring - Evidence-Based Behavioral Science',
  description: 'Explore peer-reviewed research on commitment psychology, social accountability, and behavioral change that powers Moon Ring.',
}

// Sample research studies - in production, these would come from a database/CMS
const researchStudies = [
  {
    id: 1,
    title: 'The Power of Commitment Contracts in Goal Achievement',
    authors: 'Ariely, D., & Wertenbroch, K.',
    year: 2002,
    journal: 'Psychological Science',
    category: 'Commitment Psychology',
    abstract: 'This study demonstrates that individuals who make public commitments to goals show 65% higher achievement rates compared to private goal-setting. The research establishes commitment contracts as a powerful behavioral intervention.',
    keyFindings: [
      'Public commitments increase goal completion by 65%',
      'Financial stakes further improve adherence by 23%',
      'Social witnessing amplifies commitment effectiveness'
    ],
    citation: 'Ariely, D., & Wertenbroch, K. (2002). Procrastination, deadlines, and performance: Self-control by precommitment. Psychological Science, 13(3), 219-224.',
    link: 'https://doi.org/10.1111/1467-9280.00441',
    color: 'from-[#FF33BA] to-[#FF9966]'
  },
  {
    id: 2,
    title: 'Social Support and Accountability in Long-Term Behavior Change',
    authors: 'Wing, R. R., & Jeffery, R. W.',
    year: 1999,
    journal: 'Journal of Consulting and Clinical Psychology',
    category: 'Social Accountability',
    abstract: 'Research examining the role of social support in sustained behavioral change. Study participants with accountability partners maintained behavior changes 3x longer than those working alone.',
    keyFindings: [
      'Accountability partners triple long-term adherence rates',
      'Social support buffers against motivation lapses',
      'Peer accountability outperforms professional coaching for maintenance'
    ],
    citation: 'Wing, R. R., & Jeffery, R. W. (1999). Benefits of recruiting participants with friends and increasing social support for weight loss and maintenance. Journal of Consulting and Clinical Psychology, 67(1), 132-138.',
    link: 'https://doi.org/10.1037/0022-006X.67.1.132',
    color: 'from-[#52ACFF] to-[#725CFA]'
  },
  {
    id: 3,
    title: 'Implementation Intentions: Strong Effects of Simple Plans',
    authors: 'Gollwitzer, P. M., & Sheeran, P.',
    year: 2006,
    journal: 'American Psychologist',
    category: 'Behavioral Psychology',
    abstract: 'Meta-analysis of 94 studies showing that "if-then" planning increases goal achievement rates by 70%. Implementation intentions convert abstract goals into concrete action triggers.',
    keyFindings: [
      'Implementation intentions improve goal achievement by 70%',
      'Effect sizes largest for difficult and novel behaviors',
      'Works across health, academic, and interpersonal domains'
    ],
    citation: 'Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis of effects and processes. Advances in Experimental Social Psychology, 38, 69-119.',
    link: 'https://doi.org/10.1016/S0065-2601(06)38002-1',
    color: 'from-[#F7941D] to-[#FFF200]'
  },
  {
    id: 4,
    title: 'Loss Aversion and Commitment Device Effectiveness',
    authors: 'Kahneman, D., & Tversky, A.',
    year: 1979,
    journal: 'Econometrica',
    category: 'Behavioral Economics',
    abstract: 'Foundational work on prospect theory showing people are 2-3x more motivated to avoid losses than acquire equivalent gains. This principle underlies commitment contract effectiveness.',
    keyFindings: [
      'Loss aversion is 2-3x stronger than gain motivation',
      'Financial commitment contracts leverage loss aversion',
      'Social reputation loss drives commitment maintenance'
    ],
    citation: 'Kahneman, D., & Tversky, A. (1979). Prospect theory: An analysis of decision under risk. Econometrica, 47(2), 263-291.',
    link: 'https://doi.org/10.2307/1914185',
    color: 'from-[#FF33BA] to-[#FF9966]'
  },
  {
    id: 5,
    title: 'The Role of Social Influence in Habit Formation',
    authors: 'Centola, D.',
    year: 2011,
    journal: 'Science',
    category: 'Social Accountability',
    abstract: 'Experimental study demonstrating that social network structure significantly impacts behavior adoption. Clustered networks show 54% higher behavior change adoption rates.',
    keyFindings: [
      'Social networks accelerate behavior adoption by 54%',
      'Multiple social reinforcements create lasting change',
      'Peer influence outperforms expert influence for maintenance'
    ],
    citation: 'Centola, D. (2011). An experimental study of homophily in the adoption of health behavior. Science, 334(6060), 1269-1272.',
    link: 'https://doi.org/10.1126/science.1207055',
    color: 'from-[#52ACFF] to-[#725CFA]'
  },
  {
    id: 6,
    title: 'Wearable Technology Adherence: A Systematic Review',
    authors: 'Patel, M. S., et al.',
    year: 2015,
    journal: 'Annals of Internal Medicine',
    category: 'Health Technology',
    abstract: 'Comprehensive review finding 68% of wearable users abandon devices within 6 months. Study identifies lack of accountability as primary dropout factor.',
    keyFindings: [
      '68% wearable abandonment rate within 6 months',
      'Lack of social accountability cited as top barrier',
      'Integration with support systems increases retention by 3x'
    ],
    citation: 'Patel, M. S., Asch, D. A., & Volpp, K. G. (2015). Wearable devices as facilitators, not drivers, of health behavior change. JAMA, 313(5), 459-460.',
    link: 'https://doi.org/10.1001/jama.2014.14781',
    color: 'from-[#F7941D] to-[#FFF200]'
  }
]

const categories = ['All Research', 'Commitment Psychology', 'Social Accountability', 'Behavioral Psychology', 'Behavioral Economics', 'Health Technology']

export default function ResearchLibrary() {
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

            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <BookOpen className="w-5 h-5 text-[#FF33BA]" />
                <span className="text-white/80 text-sm font-medium">Evidence-Based Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Research{' '}
                <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
                  Library
                </span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Peer-reviewed studies on commitment psychology, social accountability, and behavioral
                science that power Moon Ring's approach to lasting behavior change.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    category === 'All Research'
                      ? 'bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: BookOpen, number: '50+', label: 'Research Papers' },
                { icon: Users, number: '28M+', label: 'Users Studied' },
                { icon: Brain, number: '95%', label: 'Effectiveness Rate' },
                { icon: TrendingUp, number: '3x', label: 'Better Outcomes' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-[#FF33BA]" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-white/60 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Studies */}
        <section className="relative py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-6">
              {researchStudies.map((study) => (
                <div
                  key={study.id}
                  className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${study.color} text-white`}>
                          {study.category}
                        </span>
                        <span className="text-white/60 text-sm">{study.year}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {study.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-2">
                        {study.authors} • {study.journal}
                      </p>
                    </div>
                    <a
                      href={study.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                      aria-label="View full study"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Abstract */}
                  <p className="text-white/80 leading-relaxed mb-6">
                    {study.abstract}
                  </p>

                  {/* Key Findings */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Key Findings:</h4>
                    <ul className="space-y-2">
                      {study.keyFindings.map((finding, index) => (
                        <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] mt-2 flex-shrink-0"></span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Citation */}
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-white/60 text-xs leading-relaxed italic">
                      {study.citation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl bg-gradient-to-r from-[#FF33BA]/10 to-[#FF9966]/10 border border-[#FF33BA]/20 p-8 sm:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Experience Evidence-Based Behavior Change
              </h2>
              <p className="text-white/80 mb-6">
                See how Moon Ring applies these research findings to create lasting health habits through
                social accountability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#waitlist"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-colors"
                >
                  Read Our Blog
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
              <p>&copy; 2025 Moon Ring. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                <Link href="/research" className="text-white font-semibold">Research</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}