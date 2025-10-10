import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const paths = [
    '/',
    '/blog',
    '/about',
    '/privacy',
    '/terms',
    '/contact',
    '/research',
    '/enterprise',
  ]

  const now = new Date().toISOString()

  return paths.map((p) => ({
    url: `${baseUrl}${p}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '/' ? 1 : 0.6,
  }))
}

