import type { NextConfig } from "next";
// import { withSentryConfig } from "@sentry/nextjs";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

// TODO: Re-enable Sentry once DSN and auth token are configured
// See .env.example for required environment variables:
// - NEXT_PUBLIC_SENTRY_DSN
// - SENTRY_AUTH_TOKEN
//
// Once configured, uncomment the import above and use:
// export default withBundleAnalyzer(withSentryConfig(nextConfig, { /* sentry options */ }));

export default withBundleAnalyzer(nextConfig);
