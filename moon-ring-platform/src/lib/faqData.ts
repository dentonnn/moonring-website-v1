// FAQ data for Moon Ring platform
// Exported separately so it can be used in both client and server components

export interface FAQ {
  question: string
  answer: string
  category: 'general' | 'pricing' | 'technical' | 'accountability'
}

export const faqs: FAQ[] = [
  {
    question: 'How is Moon Ring different from other fitness apps?',
    answer: 'Most fitness apps rely on gamification (badges, points, streaks). Moon Ring uses evidence-based commitment psychology and real social accountability. You are paired with an actual person who counts on you—and you count on them. Research shows this approach is 3x more effective than working alone.',
    category: 'general'
  },
  {
    question: 'Do I need to buy a new wearable device?',
    answer: 'No! Moon Ring works with the wearable you already own. We support Apple Watch, Fitbit, Garmin, Oura Ring, Whoop, and more. Our platform integrates with your existing device to track your commitments—we don\'t replace your hardware, we make it actually work for behavior change.',
    category: 'technical'
  },
  {
    question: 'How does accountability partner matching work?',
    answer: 'Our algorithm matches you based on: (1) Similar health goals, (2) Compatible time zones, (3) Commitment level preferences, and (4) Personality compatibility (based on a quick survey). You can request a new match anytime if it\'s not a good fit. Most users find their ideal partner within 1-2 matches.',
    category: 'accountability'
  },
  {
    question: 'What happens if my accountability partner quits?',
    answer: 'We have a Community Rescue System. If your partner goes inactive, the broader Moon Ring community can step in to support you temporarily while we find you a new long-term match. You will never be left without accountability—that\'s our promise.',
    category: 'accountability'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! We offer a 30-day free trial with full access to all features. No credit card required to start. After the trial, plans start at $9/month (Starter) or $19/month (Growth) for enhanced features. You can cancel anytime—no long-term commitment required.',
    category: 'pricing'
  },
  {
    question: 'What if I miss a day on my commitment?',
    answer: 'Life happens. Moon Ring is designed for long-term success, not perfection. Missing one day doesn\'t break your streak—we use a "grace window" system. If you miss a day, your partner gets notified and can check in to help you get back on track. The goal is sustained progress, not impossible perfection.',
    category: 'general'
  },
  {
    question: 'Can I have multiple commitments at once?',
    answer: 'Yes! Our Growth plan ($19/month) supports up to 3 concurrent commitments with different partners. However, we recommend starting with one commitment for the first 30 days. Research shows focused commitment leads to higher success rates than spreading yourself thin.',
    category: 'general'
  },
  {
    question: 'How much time does this require daily?',
    answer: 'Less than 5 minutes. Your wearable data syncs automatically, so you don\'t need to manually log anything. Most users spend 2-3 minutes per day checking in with their partner via our app. The accountability is real, but the time commitment is minimal.',
    category: 'general'
  },
  {
    question: 'Is my health data private?',
    answer: 'Absolutely. Your wearable data is encrypted end-to-end and only shared with your chosen accountability partner. We never sell your data to third parties. You control what metrics you share and with whom. HIPAA-compliant data handling for enterprise customers.',
    category: 'technical'
  },
  {
    question: 'Do you offer corporate wellness plans?',
    answer: 'Yes! Moon Ring for Enterprise includes: admin dashboards, team challenges, custom goal templates, white-label options, and dedicated success coaching. We serve companies from 50 to 50,000+ employees. Contact our sales team for custom pricing and implementation support.',
    category: 'pricing'
  },
  {
    question: 'What if I don\'t like my accountability partner?',
    answer: 'Request a rematch anytime—no questions asked. Compatibility is crucial for long-term success, and we want you to find the right fit. Most users settle into a great partnership within 1-2 matches. You can also filter by specific criteria (timezone, goal type, communication style) for better matching.',
    category: 'accountability'
  },
  {
    question: 'Can I use this without a wearable device?',
    answer: 'Yes, but it\'s less effective. You can manually log your progress for commitments that don\'t require wearable data (e.g., "meditate 10 minutes daily"). However, automatic tracking from wearables makes accountability seamless and removes the friction of manual logging.',
    category: 'technical'
  }
]

// Export FAQ data for JSON-LD schema
export function getFAQData() {
  return faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  }))
}
