import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/server'

/**
 * GET /api/waitlist/get-referral-code
 *
 * Fetches the referral code for a given email address
 * Used by the confirmation page to display the user's unique referral link
 *
 * Query params:
 * - email: The user's email address
 *
 * Response:
 * {
 *   success: boolean
 *   referralCode?: string
 *   error?: string
 * }
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    console.log('[get-referral-code] Request received for email:', email)

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    // Use service role client to bypass RLS policies
    const supabase = createServiceRoleClient()

    // Fetch the referral code for this email
    const { data, error } = await supabase
      .from('email_subscriptions')
      .select('referral_code')
      .eq('email', email)
      .single()

    console.log('[get-referral-code] Query result:', { data, error })

    if (error || !data) {
      console.log('[get-referral-code] Email not found or error:', error)
      return NextResponse.json(
        { success: false, error: 'Email not found in waitlist' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      referralCode: data.referral_code
    })

  } catch (error) {
    console.error('Error fetching referral code:', error)

    return NextResponse.json(
      { success: false, error: 'Failed to fetch referral code' },
      { status: 500 }
    )
  }
}
