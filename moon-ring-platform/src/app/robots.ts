import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const site = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const isProd = process.env.VERCEL_ENV === 'production'

  return {
    rules: isProd
      ? [{ userAgent: '*', allow: '/' }]
      : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${site}/sitemap.xml`,
    host: site,
  }
}

