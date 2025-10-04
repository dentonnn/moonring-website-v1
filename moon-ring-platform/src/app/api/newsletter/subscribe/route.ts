import { NextResponse } from 'next/server'
import { createServerActionClient } from '@/lib/supabase/server'
import { sendEmail, emailTemplates } from '@/lib/email/brevo'
import type { Database } from '@/types/database'

type EmailSubscriptionInsert = Database['public']['Tables']['email_subscriptions']['Insert']
type EmailSubscriptionUpdate = Database['public']['Tables']['email_subscriptions']['Update']

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
 *   source: 'hero' | 'footer' | 'popup' (required)
 *   utmParams?: { utm_source, utm_medium, utm_campaign, utm_term, utm_content }
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
      referrer,
      landingPage,
    } = body

    // ========================================================================
    // VALIDATION
    // ========================================================================

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

    if (!source || !['hero', 'footer', 'popup'].includes(source)) {
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

    const supabase = await createServerActionClient()

    // Get client IP for GDPR compliance (from headers)
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp = forwardedFor ? forwardedFor.split(',')[0] : null

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
      }

      // Type assertion needed due to Supabase generic inference limitations
      const { error: insertError } = await supabase
        .from('email_subscriptions')
        .insert(insertData as never)

      if (insertError) {
        console.error('Failed to save subscription to database:', insertError)
        throw new Error('Failed to save subscription')
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

    await supabase.from('conversion_events').insert({
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
    })

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
