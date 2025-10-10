import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { sendEmail } from '@/lib/email/brevo'
import { newsletterUnsubscribeLimiter } from '@/lib/rate-limit'
import type { Database } from '@/types/database'
type EmailSubscriptionRow = Database['public']['Tables']['email_subscriptions']['Row']
type EmailSubscriptionUpdate = Database['public']['Tables']['email_subscriptions']['Update']

export async function POST(request: Request) {
  try {
    const { email, token, reason } = await request.json()

    // Rate limit by IP (10/hour)
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp = forwardedFor ? forwardedFor.split(',')[0] : 'unknown'
    const rate = await newsletterUnsubscribeLimiter(clientIp)
    if (!rate.success) {
      const retrySec = Math.max(1, Math.floor((rate.reset - Date.now()) / 1000))
      return new NextResponse(
        JSON.stringify({ success: false, error: 'Too many requests', retryAfter: retrySec }),
        { status: 429, headers: { 'Retry-After': String(retrySec), 'Content-Type': 'application/json' } }
      )
    }

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ success: false, error: 'Missing unsubscribe token' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Identify subscription by token (and optionally email)
    let builder = supabase
      .from('email_subscriptions')
      .select('id,status,email,gdpr_consent,gdpr_consent_ip')
      .eq('unsubscribe_token', token)

    if (email && typeof email === 'string') {
      builder = builder.eq('email', email)
    }

    const { data, error: fetchError } = await builder.limit(1).maybeSingle()
    const subscription = data as EmailSubscriptionRow | null

    if (fetchError || !subscription) {
      // Generic response to avoid token/email enumeration
      return NextResponse.json(
        { success: false, error: 'Unable to process unsubscribe request' },
        { status: 400 }
      )
    }

    // Already unsubscribed
    if (subscription.status === 'unsubscribed') {
      return NextResponse.json({ success: true, alreadyUnsubscribed: true })
    }

    // Update status to unsubscribed with audit fields
    const forwardedFor2 = request.headers.get('x-forwarded-for')
    const clientIp2 = forwardedFor2 ? forwardedFor2.split(',')[0] : null

    const update: EmailSubscriptionUpdate = {
      status: 'unsubscribed',
      unsubscribed_at: new Date().toISOString(),
      unsubscribe_reason: typeof reason === 'string' && reason.length ? reason : null,
      gdpr_consent: subscription.gdpr_consent ?? true,
      gdpr_consent_ip: subscription.gdpr_consent_ip ?? clientIp2,
      updated_at: new Date().toISOString(),
    }

    const { error: updateError } = await supabase
      .from('email_subscriptions')
      .update(update as never)
      .eq('id', subscription.id)

    if (updateError) {
      console.error('Unsubscribe update error:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to update subscription' },
        { status: 500 }
      )
    }

    // Send confirmation email via Brevo (best-effort)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const html = `
      <p>You have been unsubscribed from Moon Ring updates.</p>
      <p>If this was a mistake, you can re-subscribe anytime on our website.</p>
      <p><a href="${appUrl}">Return to Moon Ring</a></p>
    `
    await sendEmail({
      to: subscription.email,
      subject: "You've been unsubscribed from Moon Ring updates",
      html,
      text: `You have been unsubscribed from Moon Ring updates. Visit ${appUrl} to re-subscribe.`,
      from: 'noreply@moonring.com',
      fromName: 'Moon Ring',
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Unsubscribe endpoint error:', err)
    return NextResponse.json(
      { success: false, error: 'Unexpected error processing unsubscribe' },
      { status: 500 }
    )
  }
}
