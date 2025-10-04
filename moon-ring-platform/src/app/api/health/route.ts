import { NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    // Test Supabase connection
    const supabase = await createServerComponentClient()
    const { error } = await supabase
      .from('leads')
      .select('count')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned (expected for empty table)
      throw error
    }

    // Test Stripe configuration
    const stripeConfigured = !!process.env.STRIPE_SECRET_KEY

    // Test Brevo configuration
    const brevoConfigured = !!process.env.BREVO_API_KEY

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: error ? 'degraded' : 'operational',
        stripe: stripeConfigured ? 'configured' : 'not configured',
        email: brevoConfigured ? 'configured' : 'not configured',
      },
      environment: process.env.NODE_ENV,
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}