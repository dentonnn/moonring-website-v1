import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(req: NextRequest) {
  try {
    const { size, color, email } = await req.json()

    // Validate input
    if (!size || !color) {
      return NextResponse.json(
        { error: 'Size and color are required' },
        { status: 400 }
      )
    }

    // Calculate price based on color (gold is premium)
    const basePrice = color === 'gold' ? 34900 : 29900

    // Get session tracking IDs from cookies or generate new ones
    const sessionId = req.cookies.get('session_id')?.value || `session_${Date.now()}`
    const visitorId = req.cookies.get('visitor_id')?.value || `visitor_${Date.now()}`

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Moon Ring - ${size.charAt(0).toUpperCase() + size.slice(1)} ${color.charAt(0).toUpperCase() + color.slice(1)}`,
              description: 'Smart ring for behavioral change through social accountability',
              images: [`${process.env.NEXT_PUBLIC_APP_URL}/images/ring-${color}.jpg`],
              metadata: {
                size,
                color,
              },
            },
            unit_amount: basePrice,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/cancel`,
      customer_email: email || undefined,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500,
              currency: 'usd',
            },
            display_name: 'Express Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 2,
              },
              maximum: {
                unit: 'business_day',
                value: 3,
              },
            },
          },
        },
      ],
      metadata: {
        size,
        color,
        session_id: sessionId,
        visitor_id: visitorId,
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      phone_number_collection: {
        enabled: true,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}