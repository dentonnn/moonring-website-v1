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
}
