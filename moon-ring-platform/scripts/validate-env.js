#!/usr/bin/env node

/**
 * Environment Variable Validation Script
 *
 * Validates that all required environment variables are present before build.
 * This prevents builds from failing mid-way with cryptic errors.
 *
 * Usage:
 *   node scripts/validate-env.js
 *
 * Exit codes:
 *   0 - All required variables present
 *   1 - Missing required variables
 */

// ============================================================================
// REQUIRED ENVIRONMENT VARIABLES
// ============================================================================

const REQUIRED_VARS = [
  // Supabase (Database) - REQUIRED for all features
  {
    name: 'NEXT_PUBLIC_SUPABASE_URL',
    description: 'Supabase project URL',
    example: 'https://xxxxx.supabase.co',
  },
  {
    name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    description: 'Supabase anonymous key (public)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  },
  {
    name: 'SUPABASE_SERVICE_ROLE_KEY',
    description: 'Supabase service role key (private)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  },

  // Stripe (Payments) - REQUIRED for checkout feature
  {
    name: 'STRIPE_SECRET_KEY',
    description: 'Stripe secret key (server-side)',
    example: 'sk_test_xxxxx or sk_live_xxxxx',
  },
  {
    name: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    description: 'Stripe publishable key (client-side)',
    example: 'pk_test_xxxxx or pk_live_xxxxx',
  },
  {
    name: 'STRIPE_WEBHOOK_SECRET',
    description: 'Stripe webhook secret for event verification',
    example: 'whsec_xxxxx',
  },

  // Brevo (Email) - REQUIRED for contact form and notifications
  {
    name: 'BREVO_API_KEY',
    description: 'Brevo API key for sending emails',
    example: 'xkeysib-xxxxx',
  },
]

// ============================================================================
// OPTIONAL ENVIRONMENT VARIABLES
// ============================================================================

const OPTIONAL_VARS = [
  {
    name: 'NEXT_PUBLIC_GA_ID',
    description: 'Google Analytics tracking ID',
    example: 'G-XXXXXXXXXX',
  },
  {
    name: 'NEXT_PUBLIC_HOTJAR_ID',
    description: 'Hotjar site ID',
    example: '1234567',
  },
  {
    name: 'NEXT_PUBLIC_SENTRY_DSN',
    description: 'Sentry DSN for error monitoring',
    example: 'https://xxxxx@sentry.io/xxxxx',
  },
  {
    name: 'SENTRY_AUTH_TOKEN',
    description: 'Sentry auth token for source map upload',
    example: 'xxxxx',
  },
]

// ============================================================================
// VALIDATION LOGIC
// ============================================================================

function validateEnvironment() {
  console.log('🔍 Validating environment variables...\n')

  const missingRequired = []
  const missingOptional = []
  const presentRequired = []
  const presentOptional = []

  // Check required variables
  REQUIRED_VARS.forEach((varInfo) => {
    if (!process.env[varInfo.name]) {
      missingRequired.push(varInfo)
    } else {
      presentRequired.push(varInfo.name)
    }
  })

  // Check optional variables
  OPTIONAL_VARS.forEach((varInfo) => {
    if (!process.env[varInfo.name]) {
      missingOptional.push(varInfo)
    } else {
      presentOptional.push(varInfo.name)
    }
  })

  // Report present required variables
  if (presentRequired.length > 0) {
    console.log('✅ Required variables configured:')
    presentRequired.forEach((name) => {
      console.log(`  - ${name}`)
    })
    console.log('')
  }

  // Report missing required variables (ERROR)
  if (missingRequired.length > 0) {
    console.error('❌ Missing required environment variables:\n')
    missingRequired.forEach((varInfo) => {
      console.error(`  - ${varInfo.name}`)
      console.error(`    ${varInfo.description}`)
      console.error(`    Example: ${varInfo.example}\n`)
    })

    console.error('💡 To fix this:')
    console.error('  1. Copy .env.example to .env.local')
    console.error('  2. Fill in all required values')
    console.error('  3. Run this script again\n')

    return false
  }

  // Report optional variables (INFO)
  if (missingOptional.length > 0) {
    console.log('ℹ️  Optional features not configured:')
    missingOptional.forEach((varInfo) => {
      console.log(`  - ${varInfo.name} (${varInfo.description})`)
    })
    console.log('')
  }

  if (presentOptional.length > 0) {
    console.log('✅ Optional features configured:')
    presentOptional.forEach((name) => {
      console.log(`  - ${name}`)
    })
    console.log('')
  }

  console.log('✅ All required environment variables are configured!\n')
  return true
}

// ============================================================================
// EXECUTION
// ============================================================================

const isValid = validateEnvironment()

if (!isValid) {
  process.exit(1)
}

process.exit(0)
