import { NextResponse } from 'next/server'
import { createServerActionClient, createServiceRoleClient } from '@/lib/supabase/server'
import { newsletterSubscribeLimiter } from '@/lib/rate-limit'
import { sendEmail, emailTemplates } from '@/lib/email/brevo'
import type { Database } from '@/types/database'

type EmailSubscriptionInsert = Database['public']['Tables']['email_subscriptions']['Insert']
type EmailSubscriptionUpdate = Database['public']['Tables']['email_subscriptions']['Update']
type ConversionEventInsert = Database['public']['Tables']['conversion_events']['Insert']

/**
 * Newsletter Subscription API
 *
 * POST /api/newsletter/subscribe
 *
 * Handles newsletter signups with:
 * - Email validation and duplicate detection
 * - Supabase storage with UTM tracking and GDPR consent
 * - Brevo welcome email delivery
 * - Conversion event tracking
 *
 * Request body:
 * {
 *   email: string (required)
 *   name?: string
 *   gdprConsent: boolean (required)
 *   source: 'hero' | 'footer' | 'popup' | 'waitlist' | 'download' (required)
 *   utmParams?: { utm_source, utm_medium, utm_campaign, utm_term, utm_content }
 *   referralCode?: string (e.g., MOONRING-XXXXXXXX)
 *   referrer?: string
 *   landingPage: string (required)
 * }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      email,
      name,
      gdprConsent,
      source,
      utmParams = {},
      referralCode,
      referrer,
      landingPage,
    } = body

    // ========================================================================
    // VALIDATION
    // ========================================================================

    // Rate limit by IP (3/hour)
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp = forwardedFor ? forwardedFor.split(',')[0] : 'unknown'
    const rate = await newsletterSubscribeLimiter(clientIp)
    if (!rate.success) {
      const retrySec = Math.max(1, Math.floor((rate.reset - Date.now()) / 1000))
      return new NextResponse(
        JSON.stringify({ success: false, error: 'Too many requests', retryAfter: retrySec }),
        { status: 429, headers: { 'Retry-After': String(retrySec), 'Content-Type': 'application/json' } }
      )
    }

    // Validate required fields
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email address is required' },
        { status: 400 }
      )
    }

    if (!gdprConsent) {
      return NextResponse.json(
        {
          success: false,
          error: 'GDPR consent is required to subscribe to our newsletter',
        },
        { status: 400 }
      )
    }

    if (!source || !['hero', 'footer', 'popup', 'waitlist', 'download'].includes(source)) {
      return NextResponse.json(
        { success: false, error: 'Invalid signup source' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // ========================================================================
    // DATABASE: SAVE SUBSCRIPTION
    // ========================================================================

    // Use service role client to bypass RLS policies for inserts/updates
    const supabase = createServiceRoleClient()

    // Check if email already subscribed
    const { data: existingSubscription, error: fetchError } = await supabase
      .from('email_subscriptions')
      .select('id, status')
      .eq('email', email)
      .maybeSingle()

    // Type guard: narrow the type by checking for specific properties
    type SubscriptionRecord = { id: string; status: string }

    if (existingSubscription && !fetchError && 'status' in existingSubscription) {
      const subscription = existingSubscription as SubscriptionRecord

      // Email already exists
      if (subscription.status === 'active') {
        return NextResponse.json({
          success: true,
          message: "You're already subscribed! Check your inbox for our welcome email.",
          alreadySubscribed: true,
        })
      }

      // Reactivate if previously unsubscribed
      if (subscription.status === 'unsubscribed') {
        const updateData: EmailSubscriptionUpdate = {
          status: 'active',
          name: name || null,
          gdpr_consent: true,
          gdpr_consent_date: new Date().toISOString(),
          gdpr_consent_ip: clientIp,
          utm_source: utmParams.utm_source || null,
          utm_medium: utmParams.utm_medium || null,
          utm_campaign: utmParams.utm_campaign || null,
          utm_term: utmParams.utm_term || null,
          utm_content: utmParams.utm_content || null,
          referrer_url: referrer || null,
          landing_page: landingPage,
          signup_source: source,
          updated_at: new Date().toISOString(),
        }

        // Type assertion needed due to Supabase generic inference limitations
        const { error: updateError } = await supabase
          .from('email_subscriptions')
          .update(updateData as never)
          .eq('id', subscription.id)

        if (updateError) {
          console.error('Failed to reactivate subscription:', updateError)
          throw new Error('Failed to update subscription')
        }
      }
    } else {
      // New subscription - insert record
      const insertData: EmailSubscriptionInsert = {
        email,
        name: name || null,
        status: 'active',
        subscription_types: ['newsletter'],
        gdpr_consent: true,
        gdpr_consent_date: new Date().toISOString(),
        gdpr_consent_ip: clientIp,
        utm_source: utmParams.utm_source || null,
        utm_medium: utmParams.utm_medium || null,
        utm_campaign: utmParams.utm_campaign || null,
        utm_term: utmParams.utm_term || null,
        utm_content: utmParams.utm_content || null,
        referrer_url: referrer || null,
        landing_page: landingPage,
        signup_source: source,
        referred_by_code: referralCode || null,
      }

      // Type assertion needed due to Supabase generic inference limitations
      const { data: newSubscription, error: insertError } = await supabase
        .from('email_subscriptions')
        .insert(insertData as never)
        .select('id')
        .single()

      if (insertError) {
        console.error('Failed to save subscription to database:', insertError)
        throw new Error('Failed to save subscription')
      }

      // Process referral if referral code was provided
      if (referralCode && newSubscription) {
        await processReferral(referralCode, newSubscription.id, email)
      }
    }

    // ========================================================================
    // EMAIL: SEND WELCOME EMAIL VIA BREVO
    // ========================================================================

    const welcomeTemplate = emailTemplates.welcome({
      name: name || '',
      appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    })

    const emailResult = await sendEmail({
      to: email,
      subject: welcomeTemplate.subject,
      html: welcomeTemplate.html,
      text: welcomeTemplate.text,
      from: 'noreply@moonring.com',
      fromName: 'Moon Ring',
      replyTo: 'support@moonring.com',
      replyToName: 'Moon Ring Support',
    })

    if (!emailResult.success) {
      console.error('Failed to send welcome email:', emailResult.error)
      // Don't throw - subscription was saved successfully
      // Return partial success
      return NextResponse.json({
        success: true,
        message: "You're subscribed! However, we had trouble sending the welcome email. Please contact support if you don't receive it.",
        emailSent: false,
      })
    }

    // ========================================================================
    // ANALYTICS: TRACK CONVERSION EVENT
    // ========================================================================

    // Track newsletter signup as a conversion event
    const sessionId = request.headers.get('x-session-id') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const conversionEvent: ConversionEventInsert = {
      session_id: sessionId,
      event_type: 'newsletter_signup',
      event_category: 'conversion',
      event_properties: {
        source,
        email,
        has_name: !!name,
        utm_params: utmParams,
      },
      page_url: landingPage,
      referrer_url: referrer || null,
      user_agent: userAgent,
      ip_address: clientIp,
    }

    await supabase
      .from('conversion_events')
      .insert(conversionEvent as never)

    // ========================================================================
    // SUCCESS RESPONSE
    // ========================================================================

    return NextResponse.json({
      success: true,
      message: "Welcome to Moon Ring! Check your email for what's next.",
      emailSent: true,
      messageId: emailResult.messageId,
    })
  } catch (error: unknown) {
    console.error('Newsletter subscription error:', error)

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process subscription. Please try again or contact support@moonring.com',
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}

/**
 * Process referral relationship
 * - Find the referrer by their referral code
 * - Create entry in waitlist_referrals table
 * - Increment referrer's referral_count
 * - Update waitlist positions (referrer moves up 500 positions)
 */
async function processReferral(
  referralCode: string,
  referredId: string,
  referredEmail: string
) {
  try {
    console.log(`[processReferral] Processing referral for code: ${referralCode}, referred email: ${referredEmail}`)

    // Use service role client to bypass RLS
    const supabase = createServiceRoleClient()

    // 1. Find the referrer by their referral code
    const { data: referrer, error: referrerError } = await supabase
      .from('email_subscriptions')
      .select('id, email, referral_count')
      .eq('referral_code', referralCode)
      .single()

    if (referrerError || !referrer) {
      console.error('[processReferral] Referrer not found:', referrerError)
      return // Don't throw - just log and continue
    }

    console.log(`[processReferral] Found referrer: ${referrer.email} (id: ${referrer.id})`)

    // 2. Create entry in waitlist_referrals table
    const { error: relationshipError } = await supabase
      .from('waitlist_referrals')
      .insert({
        referrer_id: referrer.id,
        referred_id: referredId,
        referral_code: referralCode,
        position_bonus_applied: true,
      })

    if (relationshipError) {
      console.error('[processReferral] Failed to create referral relationship:', relationshipError)
      return
    }

    console.log(`[processReferral] Created referral relationship`)

    // 3. Increment referrer's referral_count
    const newReferralCount = (referrer.referral_count || 0) + 1
    const { error: updateError } = await supabase
      .from('email_subscriptions')
      .update({ referral_count: newReferralCount })
      .eq('id', referrer.id)

    if (updateError) {
      console.error('[processReferral] Failed to update referral count:', updateError)
      return
    }

    console.log(`[processReferral] Updated referral count to ${newReferralCount}`)

    // 4. Recalculate waitlist positions (trigger will handle this)
    // The database trigger `trigger_update_positions` will automatically
    // update all waitlist positions when referral_count changes

    console.log(`[processReferral] Referral processed successfully!`)
  } catch (error) {
    console.error('[processReferral] Unexpected error:', error)
    // Don't throw - we don't want to fail the subscription if referral processing fails
  }
}
