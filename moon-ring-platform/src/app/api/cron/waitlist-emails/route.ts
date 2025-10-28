/**
 * Vercel Cron Job: Waitlist Email Campaign Automation
 *
 * Runs every hour to check for subscribers who need waitlist campaign emails.
 * Sends emails based on time elapsed since signup:
 * - Week 1: 1 hour after signup (viral hook + referral)
 * - Week 2: 7 days after signup (goal selection + tier upgrade)
 * - Week 3: 14 days after signup (social proof + testimonials)
 * - Week 4: 21 days after signup (educational PDF delivery)
 *
 * Vercel Cron Configuration (vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/waitlist-emails",
 *     "schedule": "0 * * * *"
 *   }]
 * }
 *
 * Environment Variables Required:
 * - CRON_SECRET: Secret token to authenticate cron requests
 * - BREVO_API_KEY: Brevo email service API key
 * - NEXT_PUBLIC_APP_URL: Application URL for generating links
 * - SUPABASE_SERVICE_ROLE_KEY: Supabase service role for database access
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEmail, emailTemplates } from '@/lib/email/brevo'

/**
 * GET handler for Vercel Cron Job
 * Triggered automatically every hour by Vercel's cron scheduler
 */
export async function GET(request: NextRequest) {
  try {
    // ============================================================================
    // STEP 1: Authenticate the cron request
    // ============================================================================
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret) {
      console.error('[CRON] CRON_SECRET not configured')
      return NextResponse.json(
        { error: 'Cron secret not configured' },
        { status: 500 }
      )
    }

    if (authHeader !== `Bearer ${cronSecret}`) {
      console.warn('[CRON] Unauthorized cron request attempt')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ============================================================================
    // STEP 2: Initialize Supabase client with service role
    // ============================================================================
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[CRON] Supabase credentials not configured')
      return NextResponse.json(
        { error: 'Database credentials not configured' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const now = new Date()

    // ============================================================================
    // STEP 3: Track email sends for reporting
    // ============================================================================
    const emailsSent: {
      week: number
      subscriberId: string
      email: string
      status: 'sent' | 'failed'
      error?: string
    }[] = []

    // ============================================================================
    // WEEK 1: Send 1 hour after signup (viral hook + referral)
    // ============================================================================
    // Target: Subscribers who signed up 1-2 hours ago and haven't received Week 1
    const week1Start = new Date(now.getTime() - 2 * 60 * 60 * 1000) // 2 hours ago
    const week1End = new Date(now.getTime() - 1 * 60 * 60 * 1000) // 1 hour ago

    const { data: week1Candidates, error: week1Error } = await supabase
      .from('email_subscriptions')
      .select('*')
      .gte('subscribed_at', week1Start.toISOString())
      .lte('subscribed_at', week1End.toISOString())
      .is('week1_sent_at', null)
      .eq('campaign_status', 'active')
      .limit(100) // Process max 100 per run to avoid timeouts

    if (week1Error) {
      console.error('[CRON] Error fetching Week 1 candidates:', week1Error)
    } else if (week1Candidates && week1Candidates.length > 0) {
      console.log(`[CRON] Sending Week 1 emails to ${week1Candidates.length} subscribers`)

      for (const subscriber of week1Candidates) {
        try {
          const referralUrl = `${appUrl}/?ref=${subscriber.referral_code}`
          const emailData = emailTemplates.waitlistWeek1({
            firstName: subscriber.first_name || '',
            waitlistPosition: subscriber.waitlist_position || 0,
            referralCode: subscriber.referral_code || '',
            referralUrl,
            appUrl,
          })

          const result = await sendEmail({
            to: subscriber.email,
            subject: emailData.subject,
            html: emailData.html,
            text: emailData.text,
          })

          if (result.success) {
            // Update subscriber: mark Week 1 sent, increment email counters
            await supabase
              .from('email_subscriptions')
              .update({
                week1_sent_at: now.toISOString(),
                total_emails_sent: (subscriber.total_emails_sent || 0) + 1,
              })
              .eq('id', subscriber.id)

            // Track event in email_campaign_events
            await supabase.from('email_campaign_events').insert({
              subscriber_id: subscriber.id,
              event_type: 'sent',
              email_week: 1,
              subject_line_variant: 'default',
              occurred_at: now.toISOString(),
              brevo_message_id: result.messageId,
            })

            emailsSent.push({
              week: 1,
              subscriberId: subscriber.id,
              email: subscriber.email,
              status: 'sent',
            })
          } else {
            throw new Error('Brevo send failed')
          }
        } catch (error) {
          console.error(
            `[CRON] Failed to send Week 1 email to ${subscriber.email}:`,
            error
          )
          emailsSent.push({
            week: 1,
            subscriberId: subscriber.id,
            email: subscriber.email,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error',
          })
        }
      }
    }

    // ============================================================================
    // WEEK 2: Send 7 days after signup (goal selection + tier upgrade)
    // ============================================================================
    // Target: Subscribers who signed up 7 days ago (+/- 1 hour) and haven't received Week 2
    const week2Start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000)
    const week2End = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000)

    const { data: week2Candidates, error: week2Error } = await supabase
      .from('email_subscriptions')
      .select('*')
      .gte('subscribed_at', week2Start.toISOString())
      .lte('subscribed_at', week2End.toISOString())
      .is('week2_sent_at', null)
      .not('week1_sent_at', 'is', null) // Must have received Week 1
      .eq('campaign_status', 'active')
      .limit(100)

    if (week2Error) {
      console.error('[CRON] Error fetching Week 2 candidates:', week2Error)
    } else if (week2Candidates && week2Candidates.length > 0) {
      console.log(`[CRON] Sending Week 2 emails to ${week2Candidates.length} subscribers`)

      for (const subscriber of week2Candidates) {
        try {
          const goalSelectionUrl = `${appUrl}/waitlist/goal-selection?id=${subscriber.id}`
          const emailData = emailTemplates.waitlistWeek2({
            firstName: subscriber.first_name || '',
            waitlistPosition: subscriber.waitlist_position || 0,
            referralCount: subscriber.referral_count || 0,
            goalSelectionUrl,
            appUrl,
          })

          const result = await sendEmail({
            to: subscriber.email,
            subject: emailData.subject,
            html: emailData.html,
            text: emailData.text,
          })

          if (result.success) {
            await supabase
              .from('email_subscriptions')
              .update({
                week2_sent_at: now.toISOString(),
                total_emails_sent: (subscriber.total_emails_sent || 0) + 1,
              })
              .eq('id', subscriber.id)

            await supabase.from('email_campaign_events').insert({
              subscriber_id: subscriber.id,
              event_type: 'sent',
              email_week: 2,
              subject_line_variant: 'default',
              occurred_at: now.toISOString(),
              brevo_message_id: result.messageId,
            })

            emailsSent.push({
              week: 2,
              subscriberId: subscriber.id,
              email: subscriber.email,
              status: 'sent',
            })
          } else {
            throw new Error('Brevo send failed')
          }
        } catch (error) {
          console.error(
            `[CRON] Failed to send Week 2 email to ${subscriber.email}:`,
            error
          )
          emailsSent.push({
            week: 2,
            subscriberId: subscriber.id,
            email: subscriber.email,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error',
          })
        }
      }
    }

    // ============================================================================
    // WEEK 3: Send 14 days after signup (social proof + testimonials)
    // ============================================================================
    const week3Start = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000)
    const week3End = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000)

    const { data: week3Candidates, error: week3Error } = await supabase
      .from('email_subscriptions')
      .select('*')
      .gte('subscribed_at', week3Start.toISOString())
      .lte('subscribed_at', week3End.toISOString())
      .is('week3_sent_at', null)
      .not('week2_sent_at', 'is', null) // Must have received Week 2
      .eq('campaign_status', 'active')
      .limit(100)

    if (week3Error) {
      console.error('[CRON] Error fetching Week 3 candidates:', week3Error)
    } else if (week3Candidates && week3Candidates.length > 0) {
      console.log(`[CRON] Sending Week 3 emails to ${week3Candidates.length} subscribers`)

      // Get total signup count for social proof
      const { count: totalSignups } = await supabase
        .from('email_subscriptions')
        .select('*', { count: 'exact', head: true })
        .eq('campaign_status', 'active')

      for (const subscriber of week3Candidates) {
        try {
          const emailData = emailTemplates.waitlistWeek3({
            firstName: subscriber.first_name || '',
            waitlistPosition: subscriber.waitlist_position || 0,
            totalSignups: totalSignups || 0,
            appUrl,
          })

          const result = await sendEmail({
            to: subscriber.email,
            subject: emailData.subject,
            html: emailData.html,
            text: emailData.text,
          })

          if (result.success) {
            await supabase
              .from('email_subscriptions')
              .update({
                week3_sent_at: now.toISOString(),
                total_emails_sent: (subscriber.total_emails_sent || 0) + 1,
              })
              .eq('id', subscriber.id)

            await supabase.from('email_campaign_events').insert({
              subscriber_id: subscriber.id,
              event_type: 'sent',
              email_week: 3,
              subject_line_variant: 'default',
              occurred_at: now.toISOString(),
              brevo_message_id: result.messageId,
            })

            emailsSent.push({
              week: 3,
              subscriberId: subscriber.id,
              email: subscriber.email,
              status: 'sent',
            })
          } else {
            throw new Error('Brevo send failed')
          }
        } catch (error) {
          console.error(
            `[CRON] Failed to send Week 3 email to ${subscriber.email}:`,
            error
          )
          emailsSent.push({
            week: 3,
            subscriberId: subscriber.id,
            email: subscriber.email,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error',
          })
        }
      }
    }

    // ============================================================================
    // WEEK 4: Send 21 days after signup (educational PDF delivery)
    // ============================================================================
    const week4Start = new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000)
    const week4End = new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000)

    const { data: week4Candidates, error: week4Error } = await supabase
      .from('email_subscriptions')
      .select('*')
      .gte('subscribed_at', week4Start.toISOString())
      .lte('subscribed_at', week4End.toISOString())
      .is('week4_sent_at', null)
      .not('week3_sent_at', 'is', null) // Must have received Week 3
      .eq('campaign_status', 'active')
      .limit(100)

    if (week4Error) {
      console.error('[CRON] Error fetching Week 4 candidates:', week4Error)
    } else if (week4Candidates && week4Candidates.length > 0) {
      console.log(`[CRON] Sending Week 4 emails to ${week4Candidates.length} subscribers`)

      for (const subscriber of week4Candidates) {
        try {
          const pdfDownloadUrl = `${appUrl}/download/guide/${subscriber.id}`
          const emailData = emailTemplates.waitlistWeek4({
            firstName: subscriber.first_name || '',
            pdfDownloadUrl,
            appUrl,
          })

          const result = await sendEmail({
            to: subscriber.email,
            subject: emailData.subject,
            html: emailData.html,
            text: emailData.text,
          })

          if (result.success) {
            await supabase
              .from('email_subscriptions')
              .update({
                week4_sent_at: now.toISOString(),
                total_emails_sent: (subscriber.total_emails_sent || 0) + 1,
              })
              .eq('id', subscriber.id)

            await supabase.from('email_campaign_events').insert({
              subscriber_id: subscriber.id,
              event_type: 'sent',
              email_week: 4,
              subject_line_variant: 'default',
              occurred_at: now.toISOString(),
              brevo_message_id: result.messageId,
            })

            emailsSent.push({
              week: 4,
              subscriberId: subscriber.id,
              email: subscriber.email,
              status: 'sent',
            })
          } else {
            throw new Error('Brevo send failed')
          }
        } catch (error) {
          console.error(
            `[CRON] Failed to send Week 4 email to ${subscriber.email}:`,
            error
          )
          emailsSent.push({
            week: 4,
            subscriberId: subscriber.id,
            email: subscriber.email,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error',
          })
        }
      }
    }

    // ============================================================================
    // STEP 4: Return summary report
    // ============================================================================
    const successCount = emailsSent.filter((e) => e.status === 'sent').length
    const failureCount = emailsSent.filter((e) => e.status === 'failed').length

    console.log(
      `[CRON] Completed: ${successCount} sent, ${failureCount} failed (total: ${emailsSent.length})`
    )

    return NextResponse.json({
      success: true,
      timestamp: now.toISOString(),
      summary: {
        totalProcessed: emailsSent.length,
        successCount,
        failureCount,
        byWeek: {
          week1: emailsSent.filter((e) => e.week === 1).length,
          week2: emailsSent.filter((e) => e.week === 2).length,
          week3: emailsSent.filter((e) => e.week === 3).length,
          week4: emailsSent.filter((e) => e.week === 4).length,
        },
      },
      details: emailsSent,
    })
  } catch (error) {
    console.error('[CRON] Fatal error in waitlist email cron job:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

/**
 * Disable static optimization for this route
 * Forces dynamic execution for cron jobs
 */
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 60 // 60 seconds max execution time
