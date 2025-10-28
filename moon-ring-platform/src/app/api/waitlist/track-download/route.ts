/**
 * API Route: PDF Download Tracking
 *
 * POST /api/waitlist/track-download
 *
 * Tracks when a subscriber downloads the lead magnet PDF.
 * Updates engagement score and pdf_downloaded flag.
 *
 * Called by the download landing page when user clicks download button.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    // ============================================================================
    // STEP 1: Parse and validate request
    // ============================================================================
    const body = await request.json()
    const { subscriberId } = body

    if (!subscriberId) {
      return NextResponse.json(
        { error: 'Subscriber ID is required' },
        { status: 400 }
      )
    }

    // ============================================================================
    // STEP 2: Initialize Supabase client
    // ============================================================================
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Database credentials not configured' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // ============================================================================
    // STEP 3: Verify subscriber exists
    // ============================================================================
    const { data: subscriber, error: fetchError } = await supabase
      .from('email_subscriptions')
      .select('*')
      .eq('id', subscriberId)
      .single()

    if (fetchError || !subscriber) {
      console.error('[PDF_DOWNLOAD] Subscriber not found:', fetchError)
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      )
    }

    // Check if already downloaded (idempotency - allow multiple downloads but track first time)
    if (subscriber.pdf_downloaded) {
      return NextResponse.json({
        success: true,
        message: 'Download tracked (already downloaded previously)',
        alreadyDownloaded: true,
      })
    }

    // ============================================================================
    // STEP 4: Update subscriber with download tracking
    // ============================================================================
    const now = new Date().toISOString()

    const { error: updateError } = await supabase
      .from('email_subscriptions')
      .update({
        pdf_downloaded: true,
        pdf_downloaded_at: now,
        engagement_score: (subscriber.engagement_score || 0) + 3, // +3 points for PDF download
      })
      .eq('id', subscriberId)

    if (updateError) {
      console.error('[PDF_DOWNLOAD] Update failed:', updateError)
      return NextResponse.json(
        { error: 'Failed to track download' },
        { status: 500 }
      )
    }

    // ============================================================================
    // STEP 5: Track click event in email_campaign_events
    // ============================================================================
    await supabase.from('email_campaign_events').insert({
      subscriber_id: subscriberId,
      event_type: 'clicked',
      email_week: 4, // Week 4 email delivers the PDF
      link_clicked: '/download/guide/' + subscriberId,
      occurred_at: now,
    })

    // ============================================================================
    // STEP 6: Return success response
    // ============================================================================
    console.log(
      `[PDF_DOWNLOAD] Subscriber ${subscriberId} downloaded PDF (first time)`
    )

    return NextResponse.json({
      success: true,
      message: 'Download tracked successfully',
      alreadyDownloaded: false,
    })
  } catch (error) {
    console.error('[PDF_DOWNLOAD] Unexpected error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * Force dynamic execution
 */
export const dynamic = 'force-dynamic'
