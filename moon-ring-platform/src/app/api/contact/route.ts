import { NextResponse } from 'next/server'
import { getResendClient } from '@/lib/email/resend'

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

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

    // Send email to support team
    const resend = getResendClient()

    const { data: supportData, error: supportError } = await resend.emails.send({
      from: 'Moon Ring Support <support@moonring.com>',
      to: ['support@moonring.com'],
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1B023A;">New Contact Form Submission</h2>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
          </div>

          <div style="background: white; padding: 20px; border-left: 4px solid #FF33BA; margin: 20px 0;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="color: #666; font-size: 14px;">
            Reply to this email to respond directly to ${name}.
          </p>
        </div>
      `,
    })

    if (supportError) {
      console.error('Failed to send support email:', supportError)
      throw supportError
    }

    // Send confirmation email to user
    const { data: confirmData, error: confirmError } = await resend.emails.send({
      from: 'Moon Ring Support <support@moonring.com>',
      to: [email],
      subject: 'We received your message - Moon Ring Support',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0;">Thanks for reaching out!</h1>
          </div>

          <div style="padding: 30px; background: #f9f9f9;">
            <p style="font-size: 16px; line-height: 1.6;">Hi ${name},</p>

            <p style="font-size: 16px; line-height: 1.6;">
              We've received your message and our team will respond within 24 hours.
            </p>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF33BA;">
              <p style="margin: 0; color: #666; font-size: 14px;"><strong>Your message:</strong></p>
              <p style="margin: 10px 0; font-size: 14px; white-space: pre-wrap;">${message}</p>
            </div>

            <p style="font-size: 16px; line-height: 1.6;">
              In the meantime, you can explore:
            </p>

            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/blog" style="color: #FF33BA; text-decoration: none;">📚 Our Blog</a> - Learn about commitment psychology
              </li>
              <li style="margin: 10px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/research" style="color: #FF33BA; text-decoration: none;">🔬 Research Library</a> - Evidence-based insights
              </li>
              <li style="margin: 10px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/#pricing" style="color: #FF33BA; text-decoration: none;">💰 Pricing</a> - See our plans
              </li>
            </ul>

            <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;">
              Best regards,<br>
              <strong>Moon Ring Team</strong>
            </p>
          </div>

          <div style="padding: 20px; text-align: center; background: #1B023A; color: white; font-size: 12px; border-radius: 0 0 12px 12px;">
            <p style="margin: 0;">Moon Ring - Social Accountability for Health</p>
            <p style="margin: 10px 0 0 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #FF9966; text-decoration: none;">moonring.com</a>
            </p>
          </div>
        </div>
      `,
    })

    if (confirmError) {
      console.error('Failed to send confirmation email:', confirmError)
      // Don't throw - support email was sent successfully
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: { supportData, confirmData }
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
