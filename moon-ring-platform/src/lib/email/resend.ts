import { Resend } from 'resend'

let resendClient: Resend | undefined

export const getResendClient = () => {
  if (resendClient) return resendClient

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    throw new Error('Resend API key is not configured. Set RESEND_API_KEY in the environment.')
  }

  resendClient = new Resend(apiKey)

  return resendClient
}

export interface EmailOptions {
  to: string | string[]
  subject: string
  html?: string
  react?: React.ReactElement
  text?: string
  from?: string
  replyTo?: string
}

export async function sendEmail(options: EmailOptions) {
  try {
    const resend = getResendClient()
    const { data, error } = await resend.emails.send({
      from: options.from || 'Moon Ring <noreply@moonring.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
      react: options.react,
      text: options.text,
      replyTo: options.replyTo,
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error }
  }
}

// Email templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Welcome to Moon Ring - Your Behavioral Change Journey Begins!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Moon Ring</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Moon Ring!</h1>
            </div>
            <div class="content">
              <p>Hi ${name || 'there'},</p>
              <p>Thank you for joining Moon Ring! You're about to transform your wearable data into lasting behavioral change through the power of social accountability.</p>
              <p>Here's what happens next:</p>
              <ul>
                <li>📱 We'll notify you when our app launches</li>
                <li>💍 You'll get exclusive early-bird pricing on the Moon Ring device</li>
                <li>🎯 Access to our behavioral psychology resources</li>
                <li>👥 Join our founding community of accountability partners</li>
              </ul>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/demo" class="button">Explore Demo</a>
              <div class="footer">
                <p>Questions? Reply to this email and we'll help you out.</p>
                <p>Moon Ring • Transform Data into Change</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  orderConfirmation: (orderNumber: string, productDetails: { size: string; color: string; amount: number }) => ({
    subject: `Order Confirmed: ${orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Order Confirmation</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f3f4f6; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px; }
            .order-details { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmed!</h1>
              <p style="margin: 0; color: #6b7280;">Order #${orderNumber}</p>
            </div>
            <div class="content">
              <p>Thank you for your order! Your Moon Ring is being prepared for shipment.</p>
              <div class="order-details">
                <h3>Order Details:</h3>
                <p><strong>Product:</strong> Moon Ring - ${productDetails.size} ${productDetails.color}</p>
                <p><strong>Price:</strong> $${(productDetails.amount / 100).toFixed(2)}</p>
                <p><strong>Shipping:</strong> 5-7 business days</p>
              </div>
              <p>You'll receive a shipping confirmation with tracking information once your order ships.</p>
              <div class="footer">
                <p>Questions about your order? Contact us at support@moonring.com</p>
                <p>Moon Ring • Transform Data into Change</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  passwordReset: (resetLink: string) => ({
    subject: 'Reset Your Moon Ring Password',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Password Reset</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 10px; }
            .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <h2>Reset Your Password</h2>
              <p>We received a request to reset your Moon Ring account password. Click the button below to create a new password:</p>
              <a href="${resetLink}" class="button">Reset Password</a>
              <p style="font-size: 14px; color: #6b7280;">This link will expire in 1 hour. If you didn't request this reset, you can safely ignore this email.</p>
              <div class="footer">
                <p>Moon Ring • Transform Data into Change</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  })
}
