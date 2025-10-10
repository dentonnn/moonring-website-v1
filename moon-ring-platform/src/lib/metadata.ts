// Shared SEO metadata configuration for Moon Ring platform
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://moonring.com'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Moon Ring - Turn Health Intentions into Unbreakable Commitments',
    template: '%s | Moon Ring'
  },
  description: 'Transform your wearable data into lasting behavior change through evidence-based commitment psychology and social accountability. Join 28M+ users achieving their health goals.',
  keywords: [
    'wearable accountability',
    'social fitness tracking',
    'behavior change platform',
    'commitment psychology',
    'health accountability partner',
    'fitness accountability',
    'Apple Watch accountability',
    'Fitbit social features',
    'behavioral change app',
    'habit formation platform'
  ],
  authors: [{ name: 'Moon Ring Team' }],
  creator: 'Moon Ring',
  publisher: 'Moon Ring',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Moon Ring',
    title: 'Moon Ring - Turn Health Intentions into Unbreakable Commitments',
    description: 'Transform your wearable data into lasting behavior change through evidence-based commitment psychology and social accountability.',
    images: [
      {
        url: `${siteUrl}/images/og-images/og-default.png`,
        width: 1200,
        height: 630,
        alt: 'Moon Ring - Commitment Psychology Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moon Ring - Turn Health Intentions into Unbreakable Commitments',
    description: 'Transform your wearable data into lasting behavior change through evidence-based commitment psychology.',
    images: [`${siteUrl}/images/og-images/og-default.png`],
    creator: '@moonringapp',
    site: '@moonringapp',
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: 'health and fitness',
}

// Page-specific metadata generators
export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  imageUrl?: string
): Metadata {
  const url = `${siteUrl}${path}`
  const ogImage = imageUrl || `${siteUrl}/images/og-images/og-default.png`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}

// Structured data generators (JSON-LD)
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Moon Ring',
    url: siteUrl,
    logo: `${siteUrl}/images/logos/moonring-logo-social.png`,
    sameAs: [
      'https://twitter.com/moonringapp',
      'https://linkedin.com/company/moonring',
      'https://facebook.com/moonringapp',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@moonring.com',
      contactType: 'Customer Support',
    },
  }
}

export function generateBlogPostSchema(post: {
  title: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  url: string
  imageUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Moon Ring',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logos/moonring-logo-social.png`,
      },
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
    image: post.imageUrl || `${siteUrl}/images/og-images/og-default.png`,
  }
}

export function generateProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Moon Ring',
    applicationCategory: 'HealthApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: '30-day free trial, then $9/month',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '12847',
    },
    operatingSystem: 'iOS, Android, Web',
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
