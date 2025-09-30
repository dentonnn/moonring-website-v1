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

    // Test Resend configuration
    const resendConfigured = !!process.env.RESEND_API_KEY

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: error ? 'degraded' : 'operational',
        stripe: stripeConfigured ? 'configured' : 'not configured',
        email: resendConfigured ? 'configured' : 'not configured',
      },
      environment: process.env.NODE_ENV,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}