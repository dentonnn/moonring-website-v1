import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { CommitmentDemo } from './components/CommitmentDemo'
import { SocialProof } from './components/SocialProof'
import { PsychologyCredibility } from './components/PsychologyCredibility'
import { PricingPreview } from './components/PricingPreview'
import { FinalConversion } from './components/FinalConversion'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="relative">
        <Hero />
        <div className="space-y-20 md:space-y-24 lg:space-y-32">
          <CommitmentDemo />
          <SocialProof />
          <PsychologyCredibility />
          <PricingPreview />
          <FinalConversion />
        </div>
        <Footer />
      </main>
    </div>
  )
}