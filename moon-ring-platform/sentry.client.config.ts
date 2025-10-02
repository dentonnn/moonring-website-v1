import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Capture 100% of errors for monitoring
  tracesSampleRate: 1.0,

  // Enable error tracking in production only
  enabled: process.env.NODE_ENV === 'production',

  // Environment tracking (production vs preview vs development)
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',

  // Release tracking (correlate errors with deployments)
  release: process.env.VERCEL_GIT_COMMIT_SHA,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // NOTE: Session Replay features are only available during the 14-day trial
  // or with a paid plan. These are disabled to match the free tier capabilities.
  // If you upgrade to a paid plan, uncomment the following:
  //
  // replaysOnErrorSampleRate: 1.0,
  // replaysSessionSampleRate: 0.1,
  // integrations: [
  //   Sentry.replayIntegration({
  //     maskAllText: true,
  //     blockAllMedia: true,
  //   }),
  // ],
});
