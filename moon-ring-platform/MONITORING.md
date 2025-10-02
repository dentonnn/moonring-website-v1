# Monitoring & Analytics Guide

This document outlines the monitoring, analytics, and observability tools configured for the Moon Ring marketing website.

## Overview

The website uses a comprehensive monitoring stack to track performance, errors, and user analytics:

- **Vercel Analytics** - Web vitals and performance metrics
- **Sentry** - Error tracking and application monitoring
- **Bundle Analyzer** - Build-time bundle size analysis

## Vercel Analytics

### Setup

Vercel Analytics is integrated via the `@vercel/analytics` package and automatically tracks:

- Core Web Vitals (LCP, FID, CLS, TTFB, FCP)
- Page views
- Custom events (can be added as needed)

### Implementation

Located in: `src/app/layout.tsx`

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Access

- **Production Dashboard**: Accessible via Vercel project dashboard → Analytics tab
- **Metrics Available**:
  - Real User Monitoring (RUM) data
  - Performance Score
  - Web Vitals breakdown
  - Top Pages by traffic
  - Geographic distribution

## Sentry Error Monitoring

### Setup

Sentry is configured for comprehensive error tracking across client, server, and edge runtimes.

### Configuration Files

- `sentry.client.config.ts` - Client-side error tracking
- `sentry.server.config.ts` - Server-side error tracking
- `sentry.edge.config.ts` - Edge runtime error tracking

### Environment Variables

Required in `.env.local` and Vercel production environment:

```bash
# Sentry Error Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
SENTRY_AUTH_TOKEN=your-sentry-auth-token-here
```

### Features Enabled

- **Error Tracking**: Automatic capture of unhandled errors and promise rejections
- **Performance Monitoring**: Transaction tracing with 100% sample rate (adjust in production)
- **Session Replay**:
  - 100% of error sessions captured
  - 10% of normal sessions captured (configurable)
  - Privacy: All text masked, all media blocked
- **Breadcrumbs**: Automatic logging of user actions before errors
- **React Component Annotations**: Component names in stack traces
- **Tunnel Route**: `/monitoring` route to bypass ad-blockers

### Access

- **Dashboard**: Create project at [sentry.io](https://sentry.io/)
- **Organization**: `moon-ring`
- **Project**: `moon-ring-marketing`

### Configuration in next.config.ts

```typescript
export default withSentryConfig(nextConfig, {
  org: "moon-ring",
  project: "moon-ring-marketing",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: { enabled: true },
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
});
```

## Bundle Analyzer

### Setup

Bundle Analyzer is configured to run on-demand for bundle size optimization.

### Usage

Run bundle analysis:

```bash
ANALYZE=true npm run build
```

This will:
1. Build the production bundle
2. Open interactive treemap visualizations in your browser
3. Show client and server bundle breakdowns

### Analyzing Results

Look for:
- **Large Dependencies**: Consider alternatives or code-splitting
- **Duplicate Modules**: Check for multiple versions of same package
- **Unused Code**: Opportunities for tree-shaking improvements
- **Route-specific Bundles**: Ensure code-splitting is working correctly

### Configuration

In `next.config.ts`:

```typescript
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(/* ... other config ... */);
```

## Performance Optimization Features

### Image Optimization

Configured in `next.config.ts`:

```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}
```

### Incremental Static Regeneration (ISR)

Blog pages are configured with ISR to balance performance and freshness:

- **Revalidate Interval**: 1 hour (3600 seconds)
- **Files**: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`

```typescript
export const revalidate = 3600; // Revalidate every hour
```

## Health Check Endpoint

### Endpoint: `/api/health`

Monitors service connectivity:

```bash
curl https://your-domain.com/api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "services": {
    "database": "operational",
    "stripe": "configured",
    "email": "configured"
  },
  "environment": "production"
}
```

### Status Indicators

- `healthy` / `unhealthy` - Overall service health
- `database` - Supabase connection status
- `stripe` - Stripe API key configured
- `email` - Resend API key configured

## Monitoring Best Practices

### Error Rate Monitoring

1. Set up Sentry alerts for:
   - Error rate spikes (> 1% of requests)
   - New error types
   - Performance degradation (P75 > 3s)

2. Review Sentry dashboard weekly for:
   - Unresolved issues
   - Trending errors
   - Performance bottlenecks

### Performance Monitoring

1. **Vercel Analytics**:
   - Monitor Core Web Vitals scores
   - Target: LCP < 2.5s, FID < 100ms, CLS < 0.1
   - Review geographic performance for CDN optimization

2. **Bundle Size**:
   - Run analysis before major releases
   - Track First Load JS (currently ~170 kB homepage)
   - Monitor for bundle size regressions

### User Experience Metrics

Track via Vercel Analytics:
- Bounce rate by page
- Time to Interactive (TTI)
- Geographic distribution of users
- Device/browser distribution

## Troubleshooting

### Sentry Not Capturing Errors

1. Verify `NEXT_PUBLIC_SENTRY_DSN` is set in environment
2. Check Sentry dashboard for project configuration
3. Ensure `disableLogger` is `false` during debugging
4. Check browser console for Sentry initialization errors

### Analytics Not Appearing

1. Verify deployment on Vercel (Analytics only works on Vercel)
2. Check Analytics is enabled in Vercel project settings
3. Allow 24-48 hours for initial data population
4. Ensure `@vercel/analytics` package is installed

### Bundle Analyzer Not Opening

1. Verify `ANALYZE=true` is set before build command
2. Check that `@next/bundle-analyzer` is installed
3. Ensure port 8888 and 8889 are not in use
4. Try clearing `.next` directory and rebuilding

## Related Documentation

- [Performance Optimization Guide](../docs/front-end-spec.md#performance-requirements)
- [Deployment Guide](./DEPLOYMENT.md)
- [Environment Setup](../docs/setup/environment-setup-guide.md)
- [Development Best Practices](../docs/development-best-practices.md)

## Summary

The Moon Ring marketing website is equipped with production-grade monitoring:

- ✅ Real-time error tracking (Sentry)
- ✅ Performance metrics (Vercel Analytics)
- ✅ Bundle size optimization (Analyzer)
- ✅ Service health monitoring (/api/health)
- ✅ ISR for content freshness
- ✅ Image optimization

All tools are configured and ready for production deployment. Remember to:
1. Set up Sentry project and add DSN to environment variables
2. Enable Vercel Analytics in project settings
3. Run bundle analysis before major releases
4. Monitor health check endpoint post-deployment
