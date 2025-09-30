import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerComponentClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  const supabase = await createServerComponentClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Extract order metadata
        const metadata = session.metadata || {}
        const productVariant = {
          size: metadata.size || 'medium',
          color: metadata.color || 'black',
        }

        // Create order in database
        const { error: orderError } = await supabase
          .from('orders')
          .insert({
            customer_email: session.customer_email!,
            customer_name: session.customer_details?.name || null,
            stripe_payment_intent_id: session.payment_intent as string,
            stripe_customer_id: session.customer as string,
            product_variant: productVariant,
            amount_cents: session.amount_total || 0,
            currency: session.currency || 'usd',
            status: 'paid',
            shipping_address: session.shipping_details?.address || session.customer_details?.address,
            billing_address: session.customer_details?.address,
            metadata: {
              stripe_session_id: session.id,
              ...metadata
            }
          })

        if (orderError) {
          console.error('Error creating order:', orderError)
          throw orderError
        }

        // Update lead status if exists
        await supabase
          .from('leads')
          .update({ conversion_stage: 'customer' })
          .eq('email', session.customer_email!)

        // Track conversion event
        await supabase
          .from('conversion_events')
          .insert({
            session_id: metadata.session_id || 'unknown',
            visitor_id: metadata.visitor_id || null,
            event_type: 'purchase_complete',
            event_category: 'conversion',
            event_properties: {
              amount: session.amount_total,
              currency: session.currency,
              product_variant: productVariant
            },
            created_at: new Date().toISOString()
          })

        // Update inventory
        const sku = `MR-${(metadata.size || 'MD').substr(0, 2).toUpperCase()}-${(metadata.color || 'BLK').substr(0, 3).toUpperCase()}`
        await supabase.rpc('decrement_inventory', {
          p_sku: sku,
          p_quantity: 1
        })

        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Update order status if exists
        await supabase
          .from('orders')
          .update({
            status: 'cancelled',
            metadata: {
              failure_reason: paymentIntent.last_payment_error?.message
            }
          })
          .eq('stripe_payment_intent_id', paymentIntent.id)

        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge

        // Update order status to refunded
        await supabase
          .from('orders')
          .update({
            status: 'refunded',
            metadata: {
              refund_amount: charge.amount_refunded,
              refund_date: new Date().toISOString()
            }
          })
          .eq('stripe_payment_intent_id', charge.payment_intent)

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Disable body parsing to receive raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
}