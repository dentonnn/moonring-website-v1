import { z } from 'zod'

/**
 * Environment Variable Schema
 *
 * This module provides type-safe, validated access to environment variables.
 * Variables are categorized as:
 * - REQUIRED: Must be present for the app to function
 * - OPTIONAL: Provide additional features but app works without them
 */

// ============================================================================
// SCHEMA DEFINITIONS
// ============================================================================

/**
 * Server-side environment variables (not exposed to browser)
 */
const serverSchema = z.object({
  // Database (REQUIRED)
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Supabase service role key is required'),

  // Payment Processing (REQUIRED for checkout features)
  STRIPE_SECRET_KEY: z.string().min(1, 'Stripe secret key is required for checkout'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, 'Stripe webhook secret is required'),

  // Email Service (REQUIRED for contact/notification features)
  BREVO_API_KEY: z.string().min(1, 'Brevo API key is required for email'),

  // Monitoring (OPTIONAL)
  SENTRY_AUTH_TOKEN: z.string().optional(),

  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

/**
 * Client-side environment variables (exposed to browser via NEXT_PUBLIC_ prefix)
 */
const clientSchema = z.object({
  // Application
  NEXT_PUBLIC_APP_URL: z.string().url('Invalid app URL').default('http://localhost:3000'),

  // Database (REQUIRED)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required'),

  // Payment Processing (REQUIRED for checkout)
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1, 'Stripe publishable key is required'),

  // Analytics (OPTIONAL)
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_HOTJAR_ID: z.string().optional(),

  // Monitoring (OPTIONAL)
  NEXT_PUBLIC_SENTRY_DSN: z.string().url('Invalid Sentry DSN').optional().or(z.literal('')),

  // Feature Flags (OPTIONAL)
  NEXT_PUBLIC_ENABLE_DEMO: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
})

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Service-specific validation for optional features
 */
const optionalServiceSchemas = {
  analytics: z.object({
    NEXT_PUBLIC_GA_ID: z.string().min(1),
    NEXT_PUBLIC_ENABLE_ANALYTICS: z.string(),
  }),
  monitoring: z.object({
    NEXT_PUBLIC_SENTRY_DSN: z.string().url(),
    SENTRY_AUTH_TOKEN: z.string().min(1),
  }),
  email: z.object({
    BREVO_API_KEY: z.string().min(1),
  }),
  payments: z.object({
    STRIPE_SECRET_KEY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
  }),
}

// ============================================================================
// ENVIRONMENT VALIDATION
// ============================================================================

/**
 * Validates and parses environment variables
 * @param env - Environment object to validate (defaults to process.env)
 * @param options - Validation options
 * @returns Validated environment object
 * @throws ZodError if validation fails
 */
function validateEnv<T extends z.ZodTypeAny>(schema: T, env = process.env): z.infer<T> {
  try {
    return schema.parse(env)
  } catch (error) {
    if (error instanceof Error && 'issues' in error) {
      const zodError = error as z.ZodError
      const missingVars = zodError.issues
        .map((err) => `  - ${err.path.join('.')}: ${err.message}`)
        .join('\n')

      console.error('❌ Environment variable validation failed:\n' + missingVars)

      // In development, provide helpful guidance
      if (process.env.NODE_ENV !== 'production') {
        console.error('\n💡 Tip: Copy .env.example to .env.local and fill in the required values')
      }

      throw new Error('Invalid environment configuration')
    }
    throw error
  }
}

/**
 * Check if a specific optional service is configured
 */
export function isServiceConfigured(
  service: keyof typeof optionalServiceSchemas,
  env = process.env
): boolean {
  try {
    optionalServiceSchemas[service].parse(env)
    return true
  } catch {
    return false
  }
}

/**
 * Get configuration status for all services
 */
export function getServiceStatus(env = process.env) {
  return {
    analytics: isServiceConfigured('analytics', env),
    monitoring: isServiceConfigured('monitoring', env),
    email: isServiceConfigured('email', env),
    payments: isServiceConfigured('payments', env),
  }
}

// ============================================================================
// EXPORTED ENVIRONMENT OBJECTS
// ============================================================================

/**
 * Validated server-side environment variables
 *
 * Usage:
 * ```ts
 * import { serverEnv } from '@/config/env'
 *
 * const apiKey = serverEnv.RESEND_API_KEY // Type-safe, validated
 * ```
 */
export const serverEnv = validateEnv(serverSchema)

/**
 * Validated client-side environment variables
 *
 * Usage:
 * ```ts
 * import { clientEnv } from '@/config/env'
 *
 * const appUrl = clientEnv.NEXT_PUBLIC_APP_URL // Type-safe, validated
 * ```
 */
export const clientEnv = validateEnv(clientSchema)

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ServerEnv = z.infer<typeof serverSchema>
export type ClientEnv = z.infer<typeof clientSchema>
export type ServiceName = keyof typeof optionalServiceSchemas
