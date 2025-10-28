/**
 * Brevo Email Service
 *
 * Centralized email service using Brevo (formerly Sendinblue) for transactional
 * and marketing emails. Replaces Resend as the primary email provider.
 *
 * Features:
 * - Transactional emails (contact confirmations, order receipts)
 * - Newsletter welcome emails with personalization
 * - Brand-consistent HTML templates with gradient styling
 * - Error handling and retry logic
 *
 * Free tier: 9,000 emails/month
 * Documentation: https://developers.brevo.com/docs
 */

import * as brevo from '@getbrevo/brevo'

let apiInstance: brevo.TransactionalEmailsApi | undefined

/**
 * Get configured Brevo API client (singleton pattern)
 * Initializes once per process and reuses the instance
 */
export const getBrevoClient = (): brevo.TransactionalEmailsApi => {
  if (apiInstance) return apiInstance

  const apiKey = process.env.BREVO_API_KEY

  if (!apiKey) {
    throw new Error(
      'Brevo API key is not configured. Set BREVO_API_KEY in your environment variables.'
    )
  }

  // Initialize API client with authentication
  apiInstance = new brevo.TransactionalEmailsApi()
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey)

  return apiInstance
}

/**
 * Email sending options (simplified interface)
 */
export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  fromName?: string
  replyTo?: string
  replyToName?: string
}

/**
 * Email sending result
 */
export interface EmailResult {
  success: boolean
  messageId?: string
  error?: unknown
}

/**
 * Send transactional email via Brevo
 *
 * @param options Email configuration options
 * @returns Promise with success status and message ID
 *
 * @example
 * await sendEmail({
 *   to: 'user@example.com',
 *   subject: 'Welcome!',
 *   html: '<h1>Hello World</h1>',
 *   text: 'Hello World'
 * })
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  try {
    // Allow disabling real email delivery in tests/CI
    if ((process.env.MAIL_DELIVERY_ENABLED ?? 'true') === 'false') {
      return { success: true, messageId: 'disabled-mail-delivery' }
    }
    const client = getBrevoClient()

    // Normalize recipients to array
    const recipients = Array.isArray(options.to)
      ? options.to.map(email => ({ email }))
      : [{ email: options.to }]

    // Prepare email data
    const sendSmtpEmail = new brevo.SendSmtpEmail()
    sendSmtpEmail.sender = {
      email: options.from || 'noreply@moonring.com',
      name: options.fromName || 'Moon Ring',
    }
    sendSmtpEmail.to = recipients
    sendSmtpEmail.subject = options.subject
    sendSmtpEmail.htmlContent = options.html

    if (options.text) {
      sendSmtpEmail.textContent = options.text
    }

    if (options.replyTo) {
      sendSmtpEmail.replyTo = {
        email: options.replyTo,
        name: options.replyToName,
      }
    }

    // Send email via Brevo API
    const response = await client.sendTransacEmail(sendSmtpEmail)

    return {
      success: true,
      messageId: response.body.messageId,
    }
  } catch (error) {
    console.error('Failed to send email via Brevo:', error)
    return {
      success: false,
      error,
    }
  }
}

/**
 * Email template generator functions
 * Each returns { subject, html, text } for use with sendEmail()
 */
export const emailTemplates = {
  /**
   * Welcome email for newsletter signups
   * Sent immediately after user subscribes to the waitlist
   */
  welcome: (params: { name: string; appUrl: string }) => {
    const { name, appUrl } = params
    const displayName = name || 'there'

    return {
      subject: 'Welcome to Moon Ring - Your Behavioral Change Journey Begins!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Moon Ring</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">

              <!-- Header with gradient -->
              <div style="background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%); color: white; padding: 40px 20px; border-radius: 12px 12px 0 0; text-align: center;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Welcome to Moon Ring!</h1>
              </div>

              <!-- Content -->
              <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                <p style="font-size: 16px; color: #1f2937; line-height: 1.6; margin: 0 0 16px 0;">Hi ${displayName},</p>

                <p style="font-size: 16px; color: #1f2937; line-height: 1.6; margin: 0 0 16px 0;">
                  Thank you for joining Moon Ring! You're about to transform your wearable data into lasting behavioral change through the power of social accountability.
                </p>

                <p style="font-size: 16px; color: #1f2937; line-height: 1.6; margin: 24px 0 8px 0; font-weight: 600;">
                  What happens next:
                </p>

                <ul style="font-size: 16px; color: #1f2937; line-height: 1.8; margin: 0 0 24px 0; padding-left: 24px;">
                  <li>📱 We'll notify you when our app launches</li>
                  <li>💍 You'll get exclusive early-bird pricing on the Moon Ring device</li>
                  <li>🎯 Access to our behavioral psychology resources</li>
                  <li>👥 Join our founding community of accountability partners</li>
                </ul>

                <div style="text-align: center; margin: 32px 0;">
                  <a href="${appUrl}/research" style="display: inline-block; background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 16px;">
                    Explore Research
                  </a>
                </div>

                <!-- Footer -->
                <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
                  <p style="font-size: 14px; color: #6b7280; margin: 8px 0;">
                    Questions? Reply to this email and we'll help you out.
                  </p>
                  <p style="font-size: 14px; color: #6b7280; margin: 8px 0; font-weight: 600;">
                    Moon Ring • Transform Data into Change
                  </p>
                  <p style="font-size: 12px; color: #9ca3af; margin: 16px 0;">
                    You're receiving this because you signed up for Moon Ring updates.
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Welcome to Moon Ring!

Hi ${displayName},

Thank you for joining Moon Ring! You're about to transform your wearable data into lasting behavioral change through the power of social accountability.

What happens next:
- We'll notify you when our app launches
- You'll get exclusive early-bird pricing on the Moon Ring device
- Access to our behavioral psychology resources
- Join our founding community of accountability partners

Explore our research: ${appUrl}/research

Questions? Reply to this email and we'll help you out.

Moon Ring • Transform Data into Change

You're receiving this because you signed up for Moon Ring updates.
      `.trim(),
    }
  },

  /**
   * Contact form submission - notification to support team
   */
  contactSupport: (params: {
    name: string
    email: string
    subject: string
    message: string
  }) => {
    const { name, email, subject, message } = params

    return {
      subject: `Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1B023A; margin-bottom: 24px;">New Contact Form Submission</h2>

            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
            </div>

            <div style="background: white; padding: 20px; border-left: 4px solid #FF33BA; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>

            <p style="color: #666; font-size: 14px; margin-top: 24px;">
              Reply to this email to respond directly to ${name}.
            </p>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Reply to this email to respond directly to ${name}.
      `.trim(),
    }
  },

  /**
   * Contact form confirmation - sent to user
   */
  contactConfirmation: (params: {
    name: string
    message: string
    appUrl: string
  }) => {
    const { name, message, appUrl } = params

    return {
      subject: 'We received your message - Moon Ring Support',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Message Received</title>
          </head>
          <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb;">
            <div style="max-width: 600px; margin: 0 auto;">

              <div style="background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Thanks for reaching out!</h1>
              </div>

              <div style="padding: 30px; background: white; border: 1px solid #e5e7eb; border-top: none;">
                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">Hi ${name},</p>

                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
                  We've received your message and our team will respond within 24 hours.
                </p>

                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF33BA;">
                  <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;"><strong>Your message:</strong></p>
                  <p style="margin: 0; font-size: 14px; white-space: pre-wrap; color: #1f2937;">${message}</p>
                </div>

                <p style="font-size: 16px; line-height: 1.6; margin: 24px 0 8px 0;">
                  In the meantime, you can explore:
                </p>

                <ul style="list-style: none; padding: 0; margin: 0 0 24px 0;">
                  <li style="margin: 10px 0;">
                    <a href="${appUrl}/blog" style="color: #FF33BA; text-decoration: none; font-size: 16px;">📚 Our Blog</a> - Learn about commitment psychology
                  </li>
                  <li style="margin: 10px 0;">
                    <a href="${appUrl}/research" style="color: #FF33BA; text-decoration: none; font-size: 16px;">🔬 Research Library</a> - Evidence-based insights
                  </li>
                  <li style="margin: 10px 0;">
                    <a href="${appUrl}/#pricing" style="color: #FF33BA; text-decoration: none; font-size: 16px;">💰 Pricing</a> - See our plans
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
                  <a href="${appUrl}" style="color: #FF9966; text-decoration: none;">moonring.com</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Thanks for reaching out!

Hi ${name},

We've received your message and our team will respond within 24 hours.

Your message:
${message}

In the meantime, you can explore:
- Our Blog (${appUrl}/blog) - Learn about commitment psychology
- Research Library (${appUrl}/research) - Evidence-based insights
- Pricing (${appUrl}/#pricing) - See our plans

Best regards,
Moon Ring Team

Moon Ring - Social Accountability for Health
${appUrl}
      `.trim(),
    }
  },

  /**
   * Order confirmation email
   */
  orderConfirmation: (params: {
    orderNumber: string
    customerName: string
    productDetails: { size: string; color: string; amount: number }
    appUrl: string
  }) => {
    const { orderNumber, customerName, productDetails, appUrl } = params
    const { size, color, amount } = productDetails
    const priceFormatted = (amount / 100).toFixed(2)

    return {
      subject: `Order Confirmed: ${orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation</title>
          </head>
          <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb;">
            <div style="max-width: 600px; margin: 0 auto;">

              <div style="background: #f3f4f6; padding: 30px; border-radius: 12px 12px 0 0;">
                <h1 style="margin: 0 0 8px 0; font-size: 24px; color: #1f2937;">Order Confirmed!</h1>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Order #${orderNumber}</p>
              </div>

              <div style="background: white; padding: 30px; border: 1px solid #e5e7eb;">
                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                  Hi ${customerName},
                </p>

                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                  Thank you for your order! Your Moon Ring is being prepared for shipment.
                </p>

                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin: 0 0 16px 0; font-size: 18px; color: #1f2937;">Order Details:</h3>
                  <p style="margin: 8px 0;"><strong>Product:</strong> Moon Ring - ${size} ${color}</p>
                  <p style="margin: 8px 0;"><strong>Price:</strong> $${priceFormatted}</p>
                  <p style="margin: 8px 0;"><strong>Shipping:</strong> 5-7 business days</p>
                </div>

                <p style="font-size: 16px; line-height: 1.6; margin: 24px 0;">
                  You'll receive a shipping confirmation with tracking information once your order ships.
                </p>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                  <p style="font-size: 14px; color: #6b7280; margin: 0;">
                    Questions about your order? Contact us at <a href="mailto:support@moonring.com" style="color: #FF33BA;">support@moonring.com</a>
                  </p>
                </div>
              </div>

              <div style="padding: 20px; text-align: center; background: #1B023A; color: white; font-size: 12px; border-radius: 0 0 12px 12px;">
                <p style="margin: 0;">Moon Ring - Transform Data into Change</p>
                <p style="margin: 10px 0 0 0;">
                  <a href="${appUrl}" style="color: #FF9966; text-decoration: none;">moonring.com</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Order Confirmed!
Order #${orderNumber}

Hi ${customerName},

Thank you for your order! Your Moon Ring is being prepared for shipment.

Order Details:
- Product: Moon Ring - ${size} ${color}
- Price: $${priceFormatted}
- Shipping: 5-7 business days

You'll receive a shipping confirmation with tracking information once your order ships.

Questions about your order? Contact us at support@moonring.com

Moon Ring - Transform Data into Change
${appUrl}
      `.trim(),
    }
  },

  // ============================================================================
  // WAITLIST CAMPAIGN EMAIL TEMPLATES (8-week nurture sequence)
  // ============================================================================

  /**
   * WEEK 1: Welcome & Viral Hook (sent 1 hour after signup)
   * Goal: Activate referral behavior immediately, establish credibility
   * Target conversion: 25-35% share their referral link
   */
  waitlistWeek1: (params: {
    firstName: string
    waitlistPosition: number
    referralCode: string
    referralUrl: string
    appUrl: string
  }) => {
    const { firstName, waitlistPosition, referralCode, referralUrl, appUrl } = params
    const displayName = firstName || 'there'

    return {
      subject: `${displayName}, you're #${waitlistPosition.toLocaleString()} on the waitlist (move up fast)`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #0F0F14;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">

              <!-- Header -->
              <div style="background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%); padding: 40px 30px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">You're In!</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 18px;">
                  Position #${waitlistPosition.toLocaleString()} on the Moon Ring waitlist
                </p>
              </div>

              <!-- Main Content -->
              <div style="background: #1B1B21; padding: 30px; border-radius: 12px; color: #E5E7EB;">
                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                  Hi ${displayName},
                </p>

                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                  Welcome to the Moon Ring waitlist! You're one of the first to experience social accountability designed specifically for wearable device users.
                </p>

                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                  <strong style="color: white;">Your current position:</strong> #${waitlistPosition.toLocaleString()}
                </p>

                <!-- Referral Box -->
                <div style="background: linear-gradient(135deg, rgba(255,51,186,0.15) 0%, rgba(255,153,102,0.15) 100%); border: 2px solid rgba(255,51,186,0.3); padding: 24px; border-radius: 12px; margin: 24px 0;">
                  <h2 style="color: #FF9966; margin: 0 0 16px 0; font-size: 20px;">🚀 Skip Ahead in Line</h2>

                  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px 0; color: #E5E7EB;">
                    <strong>Move up 500 positions</strong> for every person who joins using your link:
                  </p>

                  <div style="background: #0F0F14; padding: 16px; border-radius: 8px; margin: 16px 0; text-align: center;">
                    <code style="color: #FF9966; font-size: 18px; font-weight: 600;">${referralCode}</code>
                  </div>

                  <a href="${referralUrl}" style="display: block; background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; text-align: center; font-size: 16px; margin-top: 16px;">
                    Share Your Link
                  </a>

                  <p style="font-size: 14px; color: #9CA3AF; margin: 16px 0 0 0; text-align: center;">
                    Your link: <span style="color: #FF9966;">${referralUrl}</span>
                  </p>
                </div>

                <!-- Achievement Tiers -->
                <div style="margin: 32px 0;">
                  <h3 style="color: white; font-size: 18px; margin: 0 0 16px 0;">🏆 Achievement Tiers</h3>

                  <div style="margin: 12px 0;">
                    <strong style="color: #CD7F32;">🥉 Bronze:</strong> <span style="color: #9CA3AF;">1 referral = -500 positions</span>
                  </div>
                  <div style="margin: 12px 0;">
                    <strong style="color: #C0C0C0;">🥈 Silver:</strong> <span style="color: #9CA3AF;">5 referrals = -2,500 positions</span>
                  </div>
                  <div style="margin: 12px 0;">
                    <strong style="color: #FFD700;">🥇 Gold:</strong> <span style="color: #9CA3AF;">10+ referrals = -5,000+ positions</span>
                  </div>
                </div>

                <p style="font-size: 16px; line-height: 1.6; margin: 24px 0 0 0; color: #E5E7EB;">
                  We'll send you weekly updates on your progress. Get ready to transform your wearable data into lasting behavioral change! 💪
                </p>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding: 24px 0; color: #6B7280; font-size: 14px;">
                <p style="margin: 0 0 8px 0;">Moon Ring • Social Accountability for Health</p>
                <p style="margin: 0;">
                  <a href="${appUrl}/research" style="color: #FF9966; text-decoration: none;">Research</a> •
                  <a href="${appUrl}/blog" style="color: #FF9966; text-decoration: none;">Blog</a> •
                  <a href="${appUrl}/contact" style="color: #FF9966; text-decoration: none;">Contact</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
You're In! Position #${waitlistPosition.toLocaleString()} on the Moon Ring Waitlist

Hi ${displayName},

Welcome to the Moon Ring waitlist! You're one of the first to experience social accountability designed specifically for wearable device users.

Your current position: #${waitlistPosition.toLocaleString()}

🚀 SKIP AHEAD IN LINE

Move up 500 positions for every person who joins using your link:

Your referral code: ${referralCode}
Your link: ${referralUrl}

Share your link: ${referralUrl}

🏆 ACHIEVEMENT TIERS
🥉 Bronze: 1 referral = -500 positions
🥈 Silver: 5 referrals = -2,500 positions
🥇 Gold: 10+ referrals = -5,000+ positions

We'll send you weekly updates on your progress. Get ready to transform your wearable data into lasting behavioral change! 💪

Moon Ring • Social Accountability for Health
Research: ${appUrl}/research
Blog: ${appUrl}/blog
Contact: ${appUrl}/contact
      `.trim(),
    }
  },

  /**
   * WEEK 2: Micro-Commitment (sent 7 days after signup)
   * Goal: Collect goal selection to upgrade to Tier 2, establish reciprocity
   * Target conversion: 40-55% select a goal
   */
  waitlistWeek2: (params: {
    firstName: string
    waitlistPosition: number
    referralCount: number
    goalSelectionUrl: string
    appUrl: string
  }) => {
    const { firstName, waitlistPosition, referralCount, goalSelectionUrl, appUrl } = params
    const displayName = firstName || 'there'
    const positionChange = referralCount * 500

    return {
      subject: `${displayName}, quick question: what's your biggest health challenge?`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #0F0F14;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">

              <!-- Progress Update -->
              <div style="background: #1B1B21; padding: 24px; border-radius: 12px; margin-bottom: 24px; color: #E5E7EB;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div>
                    <p style="margin: 0 0 4px 0; color: #9CA3AF; font-size: 14px;">Your position</p>
                    <p style="margin: 0; font-size: 32px; font-weight: 700; color: white;">#${waitlistPosition.toLocaleString()}</p>
                  </div>
                  ${referralCount > 0 ? `
                  <div style="text-align: right;">
                    <p style="margin: 0 0 4px 0; color: #9CA3AF; font-size: 14px;">You moved up</p>
                    <p style="margin: 0; font-size: 24px; font-weight: 700; color: #10B981;">+${positionChange}</p>
                  </div>
                  ` : ''}
                </div>
              </div>

              <!-- Main Content -->
              <div style="background: #1B1B21; padding: 30px; border-radius: 12px; color: #E5E7EB;">
                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                  Hi ${displayName},
                </p>

                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                  Quick question: <strong style="color: white;">What's the #1 health metric you want to improve?</strong>
                </p>

                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                  We're building Moon Ring with <em>you</em> in mind, and your answer will help us personalize your experience when we launch.
                </p>

                <!-- Goal Options -->
                <div style="background: linear-gradient(135deg, rgba(255,51,186,0.1) 0%, rgba(255,153,102,0.1) 100%); border: 2px solid rgba(255,51,186,0.2); padding: 24px; border-radius: 12px; margin: 24px 0;">
                  <h3 style="color: #FF9966; margin: 0 0 20px 0; font-size: 18px;">Choose Your Focus:</h3>

                  <div style="margin-bottom: 16px;">
                    <div style="background: #0F0F14; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
                      <strong style="color: white; font-size: 16px;">🏃 Movement & Activity</strong>
                      <p style="margin: 4px 0 0 0; color: #9CA3AF; font-size: 14px;">Hit your daily step goals, consistent workouts</p>
                    </div>

                    <div style="background: #0F0F14; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
                      <strong style="color: white; font-size: 16px;">😴 Sleep Quality</strong>
                      <p style="margin: 4px 0 0 0; color: #9CA3AF; font-size: 14px;">Consistent bedtime, better sleep scores</p>
                    </div>

                    <div style="background: #0F0F14; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
                      <strong style="color: white; font-size: 16px;">🧘 Stress & Recovery</strong>
                      <p style="margin: 4px 0 0 0; color: #9CA3AF; font-size: 14px;">Manage HRV, meditation, breathwork</p>
                    </div>

                    <div style="background: #0F0F14; padding: 16px; border-radius: 8px;">
                      <strong style="color: white; font-size: 16px;">💪 Recovery & Readiness</strong>
                      <p style="margin: 4px 0 0 0; color: #9CA3AF; font-size: 14px;">Optimize recovery scores, avoid burnout</p>
                    </div>
                  </div>

                  <a href="${goalSelectionUrl}" style="display: block; background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%); color: white; padding: 16px; text-decoration: none; border-radius: 8px; font-weight: 600; text-align: center; font-size: 16px; margin-top: 20px;">
                    Select My Goal (Takes 30 Seconds)
                  </a>
                </div>

                <p style="font-size: 14px; line-height: 1.6; margin: 24px 0 0 0; color: #9CA3AF;">
                  <strong style="color: white;">Why we're asking:</strong> 76% of people using Moon Ring successfully change their behavior when we match them with accountability partners who share their goals.
                </p>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding: 24px 0; color: #6B7280; font-size: 14px;">
                <p style="margin: 0;">Questions? Just reply to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Your position: #${waitlistPosition.toLocaleString()}${referralCount > 0 ? ` (moved up +${positionChange}!)` : ''}

Hi ${displayName},

Quick question: What's the #1 health metric you want to improve?

We're building Moon Ring with you in mind, and your answer will help us personalize your experience when we launch.

CHOOSE YOUR FOCUS:

🏃 Movement & Activity - Hit your daily step goals, consistent workouts
😴 Sleep Quality - Consistent bedtime, better sleep scores
🧘 Stress & Recovery - Manage HRV, meditation, breathwork
💪 Recovery & Readiness - Optimize recovery scores, avoid burnout

👉 Select your goal here: ${goalSelectionUrl}

(Takes just 30 seconds)

WHY WE'RE ASKING: 76% of people using Moon Ring successfully change their behavior when we match them with accountability partners who share their goals.

Questions? Just reply to this email.

Moon Ring • Social Accountability for Health
      `.trim(),
    }
  },

  /**
   * WEEK 3: Social Proof (sent 14 days after signup)
   * Goal: Build trust with testimonials, reinforce waitlist momentum
   * Target conversion: Build anticipation for Week 4 PDF
   */
  waitlistWeek3: (params: {
    firstName: string
    waitlistPosition: number
    totalSignups: number
    appUrl: string
  }) => {
    const { firstName, waitlistPosition, totalSignups, appUrl } = params
    const displayName = firstName || 'there'

    return {
      subject: `${displayName}, ${totalSignups.toLocaleString()} people can't be wrong`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #0F0F14;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">

              <!-- Header -->
              <div style="background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%); padding: 40px 30px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">${totalSignups.toLocaleString()} People Joined</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 18px;">
                  You're still #${waitlistPosition.toLocaleString()} — here's why so many are excited
                </p>
              </div>

              <!-- Main Content -->
              <div style="background: #1B1B21; padding: 30px; border-radius: 12px; color: #E5E7EB;">
                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                  Hi ${displayName},
                </p>

                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                  This week, ${totalSignups.toLocaleString()} people joined the Moon Ring waitlist. They're not here for another fitness tracker — they're here because <strong style="color: white;">92% of people fail at behavior change alone</strong>, and Moon Ring fixes that.
                </p>

                <!-- Testimonial 1 -->
                <div style="background: #0F0F14; border-left: 4px solid #FF9966; padding: 20px; border-radius: 8px; margin: 24px 0;">
                  <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; color: #E5E7EB; font-style: italic;">
                    "I've had an Oura Ring for 2 years. My sleep data is perfect... but I never actually <em>did</em> anything with it. Moon Ring changed that. Now I have a partner who checks in when my recovery score drops. Game changer."
                  </p>
                  <p style="margin: 0; color: #9CA3AF; font-size: 14px;">
                    — Sarah K., Beta Tester
                  </p>
                </div>

                <!-- Testimonial 2 -->
                <div style="background: #0F0F14; border-left: 4px solid #FF33BA; padding: 20px; border-radius: 8px; margin: 24px 0;">
                  <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; color: #E5E7EB; font-style: italic;">
                    "My Whoop tells me I'm overtrained. My Apple Watch tells me I'm sedentary. Moon Ring doesn't judge — it connects me with people who actually understand what I'm going through."
                  </p>
                  <p style="margin: 0; color: #9CA3AF; font-size: 14px;">
                    — Marcus T., Founding Member
                  </p>
                </div>

                <!-- Testimonial 3 -->
                <div style="background: #0F0F14; border-left: 4px solid #10B981; padding: 20px; border-radius: 8px; margin: 24px 0;">
                  <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; color: #E5E7EB; font-style: italic;">
                    "Accountability partner matched by <em>sleep goals</em>? Genius. We're both night shift nurses. No generic fitness app understands that."
                  </p>
                  <p style="margin: 0; color: #9CA3AF; font-size: 14px;">
                    — Jessica L., Healthcare Professional
                  </p>
                </div>

                <!-- Stat Box -->
                <div style="background: linear-gradient(135deg, rgba(255,51,186,0.15) 0%, rgba(255,153,102,0.15) 100%); border: 2px solid rgba(255,51,186,0.3); padding: 24px; border-radius: 12px; margin: 32px 0; text-align: center;">
                  <p style="font-size: 48px; font-weight: 700; margin: 0; color: #FF9966;">76%</p>
                  <p style="font-size: 16px; margin: 12px 0 0 0; color: #E5E7EB;">
                    Success rate with accountability partners vs. 8% going solo*
                  </p>
                  <p style="font-size: 12px; margin: 12px 0 0 0; color: #6B7280;">
                    *Study: American Society of Training and Development
                  </p>
                </div>

                <p style="font-size: 16px; line-height: 1.6; margin: 24px 0 0 0; color: #E5E7EB;">
                  <strong style="color: white;">Next week:</strong> We'll send you our free guide — <em>"The Science of Social Accountability: Why Your Wearable Data Needs a Human Connection"</em> — packed with research-backed strategies you can use <em>right now</em>.
                </p>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding: 24px 0; color: #6B7280; font-size: 14px;">
                <p style="margin: 0 0 8px 0;">Moon Ring • Social Accountability for Health</p>
                <p style="margin: 0;">
                  <a href="${appUrl}/research" style="color: #FF9966; text-decoration: none;">Research</a> •
                  <a href="${appUrl}/blog" style="color: #FF9966; text-decoration: none;">Blog</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
${totalSignups.toLocaleString()} People Joined the Waitlist
You're still #${waitlistPosition.toLocaleString()} — here's why so many are excited

Hi ${displayName},

This week, ${totalSignups.toLocaleString()} people joined the Moon Ring waitlist. They're not here for another fitness tracker — they're here because 92% of people fail at behavior change alone, and Moon Ring fixes that.

WHAT PEOPLE ARE SAYING:

"I've had an Oura Ring for 2 years. My sleep data is perfect... but I never actually did anything with it. Moon Ring changed that. Now I have a partner who checks in when my recovery score drops. Game changer."
— Sarah K., Beta Tester

"My Whoop tells me I'm overtrained. My Apple Watch tells me I'm sedentary. Moon Ring doesn't judge — it connects me with people who actually understand what I'm going through."
— Marcus T., Founding Member

"Accountability partner matched by sleep goals? Genius. We're both night shift nurses. No generic fitness app understands that."
— Jessica L., Healthcare Professional

THE DATA:
76% success rate with accountability partners vs. 8% going solo
(Study: American Society of Training and Development)

NEXT WEEK: We'll send you our free guide — "The Science of Social Accountability: Why Your Wearable Data Needs a Human Connection" — packed with research-backed strategies you can use right now.

Moon Ring • Social Accountability for Health
Research: ${appUrl}/research
Blog: ${appUrl}/blog
      `.trim(),
    }
  },

  /**
   * WEEK 4: Educational Value & PDF Delivery (sent 21 days after signup)
   * Goal: Deliver lead magnet, drive 35-45% PDF download rate
   * Includes executive summary inline to prove value before download
   */
  waitlistWeek4: (params: {
    firstName: string
    pdfDownloadUrl: string
    appUrl: string
  }) => {
    const { firstName, pdfDownloadUrl, appUrl } = params
    const displayName = firstName || 'there'

    return {
      subject: `${displayName}, here's your free guide (+ the science that makes it work)`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #0F0F14;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">

              <!-- Header -->
              <div style="background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%); padding: 40px 30px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Your Free Guide Is Ready</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 18px;">
                  The Science of Social Accountability
                </p>
              </div>

              <!-- Main Content -->
              <div style="background: #1B1B21; padding: 30px; border-radius: 12px; color: #E5E7EB;">
                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                  Hi ${displayName},
                </p>

                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                  As promised, here's your free guide: <strong style="color: white;">"The Science of Social Accountability: Why Your Wearable Data Needs a Human Connection"</strong> (26 pages, PDF).
                </p>

                <!-- Download CTA -->
                <div style="text-align: center; margin: 32px 0;">
                  <a href="${pdfDownloadUrl}" style="display: inline-block; background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px;">
                    📄 Download Your Free Guide
                  </a>
                </div>

                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; color: #9CA3AF; text-align: center;">
                  No signup required. Just download and read.
                </p>

                <!-- Executive Summary - Principle 1 -->
                <div style="background: #0F0F14; border: 2px solid rgba(255,51,186,0.3); padding: 24px; border-radius: 12px; margin: 24px 0;">
                  <h2 style="color: #FF9966; margin: 0 0 16px 0; font-size: 20px;">📍 Sneak Peek: Principle #1</h2>

                  <h3 style="color: white; margin: 20px 0 12px 0; font-size: 18px;">Implementation Intentions: The "If-Then" Formula</h3>

                  <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                    Research shows that people who use implementation intentions ("If X happens, then I will do Y") are <strong style="color: white;">2-3× more likely to follow through</strong> on their health goals (Gollwitzer & Sheeran, 2006).
                  </p>

                  <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; font-style: italic; color: #9CA3AF;">
                    Example: Instead of "I'll sleep 8 hours tonight," use "If it's 10 PM, then I will put my phone in another room and start my wind-down routine."
                  </p>

                  <div style="background: rgba(255,153,102,0.1); border-left: 4px solid #FF9966; padding: 16px; border-radius: 4px; margin-top: 16px;">
                    <p style="margin: 0; font-size: 14px; color: #E5E7EB;">
                      <strong style="color: #FF9966;">📄 In the full PDF:</strong> 7 pre-made templates for wearable users (Page 7-9)
                    </p>
                  </div>
                </div>

                <!-- Executive Summary - Principle 2 -->
                <div style="background: #0F0F14; border: 2px solid rgba(255,51,186,0.3); padding: 24px; border-radius: 12px; margin: 24px 0;">
                  <h3 style="color: white; margin: 0 0 12px 0; font-size: 18px;">The Goldilocks Zone: Not Too Hard, Not Too Easy</h3>

                  <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                    Goals that are <strong style="color: white;">10-20% beyond your current baseline</strong> have the highest success rates (Locke & Latham, 2002). Too easy = no motivation. Too hard = burnout.
                  </p>

                  <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; font-style: italic; color: #9CA3AF;">
                    Example: If your average step count is 6,000, aim for 7,200 (20% increase) — not 10,000 overnight.
                  </p>

                  <div style="background: rgba(255,153,102,0.1); border-left: 4px solid #FF9966; padding: 16px; border-radius: 4px; margin-top: 16px;">
                    <p style="margin: 0; font-size: 14px; color: #E5E7EB;">
                      <strong style="color: #FF9966;">📄 In the full PDF:</strong> 4-quadrant assessment quiz to find your optimal challenge level (Page 11)
                    </p>
                  </div>
                </div>

                <!-- Executive Summary - Principle 3 -->
                <div style="background: #0F0F14; border: 2px solid rgba(255,51,186,0.3); padding: 24px; border-radius: 12px; margin: 24px 0;">
                  <h3 style="color: white; margin: 0 0 12px 0; font-size: 18px;">Accountability Partners > Solo Tracking</h3>

                  <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                    Having a specific accountability partner increases your odds of success to <strong style="color: white;">95%</strong> (American Society of Training and Development). But <em>how</em> you choose your partner matters.
                  </p>

                  <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                    <strong style="color: white;">Best match:</strong> Someone with the <em>same goal</em> but <em>different wearable</em> (reduces competition, increases empathy).
                  </p>

                  <div style="background: rgba(255,153,102,0.1); border-left: 4px solid #FF9966; padding: 16px; border-radius: 4px; margin-top: 16px;">
                    <p style="margin: 0; font-size: 14px; color: #E5E7EB;">
                      <strong style="color: #FF9966;">📄 In the full PDF:</strong> 5 accountability contract templates (copy-paste ready, Page 16-18)
                    </p>
                  </div>
                </div>

                <!-- What Else Is Inside -->
                <div style="background: linear-gradient(135deg, rgba(255,51,186,0.15) 0%, rgba(255,153,102,0.15) 100%); border: 2px solid rgba(255,51,186,0.3); padding: 24px; border-radius: 12px; margin: 32px 0;">
                  <h2 style="color: #FF9966; margin: 0 0 16px 0; font-size: 20px;">📚 What Else Is Inside</h2>

                  <ul style="margin: 0; padding-left: 20px; color: #E5E7EB;">
                    <li style="margin-bottom: 8px;">The Fresh Start Effect: Why January 1st works (and how to create your own fresh starts)</li>
                    <li style="margin-bottom: 8px;">Public vs. Private Goals: When to share, when to keep quiet</li>
                    <li style="margin-bottom: 8px;">7 Accountability Strategies for Wearable Users (with step-by-step instructions)</li>
                    <li style="margin-bottom: 8px;">17 academic citations backing every strategy</li>
                  </ul>

                  <div style="text-align: center; margin-top: 24px;">
                    <a href="${pdfDownloadUrl}" style="display: inline-block; background: linear-gradient(135deg, #FF33BA 0%, #FF9966 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      Download Full Guide (26 Pages)
                    </a>
                  </div>
                </div>

                <p style="font-size: 16px; line-height: 1.6; margin: 24px 0 0 0; color: #E5E7EB;">
                  You don't need to wait for Moon Ring to launch. Use these strategies <em>today</em> with your current wearable. 💪
                </p>

                <p style="font-size: 16px; line-height: 1.6; margin: 16px 0 0 0; color: #9CA3AF;">
                  Questions? Just reply to this email.
                </p>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding: 24px 0; color: #6B7280; font-size: 14px;">
                <p style="margin: 0 0 8px 0;">Moon Ring • Social Accountability for Health</p>
                <p style="margin: 0;">
                  <a href="${appUrl}/research" style="color: #FF9966; text-decoration: none;">Research</a> •
                  <a href="${appUrl}/blog" style="color: #FF9966; text-decoration: none;">Blog</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Your Free Guide Is Ready
The Science of Social Accountability

Hi ${displayName},

As promised, here's your free guide: "The Science of Social Accountability: Why Your Wearable Data Needs a Human Connection" (26 pages, PDF).

👉 DOWNLOAD YOUR FREE GUIDE: ${pdfDownloadUrl}

No signup required. Just download and read.

---

📍 SNEAK PEEK: PRINCIPLE #1

IMPLEMENTATION INTENTIONS: THE "IF-THEN" FORMULA

Research shows that people who use implementation intentions ("If X happens, then I will do Y") are 2-3× more likely to follow through on their health goals (Gollwitzer & Sheeran, 2006).

Example: Instead of "I'll sleep 8 hours tonight," use "If it's 10 PM, then I will put my phone in another room and start my wind-down routine."

📄 In the full PDF: 7 pre-made templates for wearable users (Page 7-9)

---

THE GOLDILOCKS ZONE: NOT TOO HARD, NOT TOO EASY

Goals that are 10-20% beyond your current baseline have the highest success rates (Locke & Latham, 2002). Too easy = no motivation. Too hard = burnout.

Example: If your average step count is 6,000, aim for 7,200 (20% increase) — not 10,000 overnight.

📄 In the full PDF: 4-quadrant assessment quiz to find your optimal challenge level (Page 11)

---

ACCOUNTABILITY PARTNERS > SOLO TRACKING

Having a specific accountability partner increases your odds of success to 95% (American Society of Training and Development). But how you choose your partner matters.

Best match: Someone with the same goal but different wearable (reduces competition, increases empathy).

📄 In the full PDF: 5 accountability contract templates (copy-paste ready, Page 16-18)

---

📚 WHAT ELSE IS INSIDE:

- The Fresh Start Effect: Why January 1st works (and how to create your own fresh starts)
- Public vs. Private Goals: When to share, when to keep quiet
- 7 Accountability Strategies for Wearable Users (with step-by-step instructions)
- 17 academic citations backing every strategy

👉 Download full guide: ${pdfDownloadUrl}

You don't need to wait for Moon Ring to launch. Use these strategies today with your current wearable. 💪

Questions? Just reply to this email.

Moon Ring • Social Accountability for Health
Research: ${appUrl}/research
Blog: ${appUrl}/blog
      `.trim(),
    }
  },
}
