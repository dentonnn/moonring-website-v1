import { NextResponse } from 'next/server'
import { sendEmail, emailTemplates } from '@/lib/email/brevo'
import { contactLimiter } from '@/lib/rate-limit'
import { verifyTurnstileToken } from '@/lib/bot-protection/turnstile'

export async function POST(request: Request) {
  try {
    const { name, email, subject, message, turnstileToken } = await request.json()

    // Rate limit by IP
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp = forwardedFor ? forwardedFor.split(',')[0] : 'unknown'
    const rate = await contactLimiter(clientIp)
    if (!rate.success) {
      const retrySec = Math.max(1, Math.floor((rate.reset - Date.now()) / 1000))
      return new NextResponse(
        JSON.stringify({ success: false, error: 'Too many requests', retryAfter: retrySec }),
        { status: 429, headers: { 'Retry-After': String(retrySec), 'Content-Type': 'application/json' } }
      )
    }

    // Turnstile verification (required unless disabled)
    const token = turnstileToken || request.headers.get('cf-turnstile-response')
    const verification = await verifyTurnstileToken(String(token || ''), clientIp)
    if (!verification.success) {
      return NextResponse.json(
        { error: 'Bot verification failed', details: verification.errorCodes },
        { status: 400 }
      )
    }

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Send email to support team using Brevo
    const supportTemplate = emailTemplates.contactSupport({
      name,
      email,
      subject,
      message,
    })

    const supportResult = await sendEmail({
      to: 'support@moonring.com',
      subject: supportTemplate.subject,
      html: supportTemplate.html,
      text: supportTemplate.text,
      from: 'support@moonring.com',
      fromName: 'Moon Ring Support',
      replyTo: email,
      replyToName: name,
    })

    if (!supportResult.success) {
      console.error('Failed to send support email:', supportResult.error)
      throw new Error('Failed to send email to support team')
    }

    // Send confirmation email to user
    const confirmTemplate = emailTemplates.contactConfirmation({
      name,
      message,
      appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    })

    const confirmResult = await sendEmail({
      to: email,
      subject: confirmTemplate.subject,
      html: confirmTemplate.html,
      text: confirmTemplate.text,
      from: 'support@moonring.com',
      fromName: 'Moon Ring Support',
    })

    if (!confirmResult.success) {
      console.error('Failed to send confirmation email:', confirmResult.error)
      // Don't throw - support email was sent successfully
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: {
        supportMessageId: supportResult.messageId,
        confirmMessageId: confirmResult.messageId,
      },
    })

  } catch (error: unknown) {
    console.error('Contact form error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json(
      {
        error: 'Failed to send message. Please try again or email support@moonring.com directly.',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}
