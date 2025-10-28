/**
 * API Route: Waitlist Goal Selection (Tier 2 Upgrade)
 *
 * POST /api/waitlist/set-goal
 *
 * Allows waitlist subscribers to select their primary health goal,
 * which upgrades them from Tier 1 (email only) to Tier 2 (goal + name).
 *
 * This is a key conversion point in the waitlist funnel:
 * - Tier 1 → Tier 2 conversion target: 40-55%
 * - Establishes reciprocity (we gave value, they give data)
 * - Enables personalized accountability partner matching
 *
 * Goal options: movement, sleep, stress, recovery
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * POST handler for goal selection
 */
export async function POST(request: NextRequest) {
  try {
    // ============================================================================
    // STEP 1: Parse and validate request body
    // ============================================================================
    const body = await request.json()
    const { subscriberId, goal, firstName } = body

    // Validate required fields
    if (!subscriberId) {
      return NextResponse.json(
        { error: 'Subscriber ID is required' },
        { status: 400 }
      )
    }

    if (!goal) {
      return NextResponse.json({ error: 'Goal is required' }, { status: 400 })
    }

    // Validate goal is one of the allowed values
    const validGoals = ['movement', 'sleep', 'stress', 'recovery']
    if (!validGoals.includes(goal)) {
      return NextResponse.json(
        {
          error: `Invalid goal. Must be one of: ${validGoals.join(', ')}`,
        },
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
    // STEP 3: Verify subscriber exists and fetch current data
    // ============================================================================
    const { data: subscriber, error: fetchError } = await supabase
      .from('email_subscriptions')
      .select('*')
      .eq('id', subscriberId)
      .single()

    if (fetchError || !subscriber) {
      console.error('[GOAL_SELECTION] Subscriber not found:', fetchError)
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      )
    }

    // Check if already set goal (prevent duplicate submissions)
    if (subscriber.primary_health_goal) {
      return NextResponse.json(
        {
          error: 'Goal already selected',
          currentGoal: subscriber.primary_health_goal,
        },
        { status: 409 }
      )
    }

    // ============================================================================
    // STEP 4: Update subscriber with goal selection (Tier 2 upgrade)
    // ============================================================================
    const now = new Date().toISOString()
    const updateData: {
      primary_health_goal: string
      goal_selected_at: string
      waitlist_tier: string
      tier2_upgraded_at: string
      first_name?: string
      engagement_score: number
    } = {
      primary_health_goal: goal,
      goal_selected_at: now,
      waitlist_tier: 'tier2',
      tier2_upgraded_at: now,
      engagement_score: (subscriber.engagement_score || 0) + 5, // +5 points for micro-commitment
    }

    // Optionally update first name if provided
    if (firstName && firstName.trim()) {
      updateData.first_name = firstName.trim()
    }

    const { data: updatedSubscriber, error: updateError } = await supabase
      .from('email_subscriptions')
      .update(updateData)
      .eq('id', subscriberId)
      .select()
      .single()

    if (updateError) {
      console.error('[GOAL_SELECTION] Update failed:', updateError)
      return NextResponse.json(
        { error: 'Failed to update goal selection' },
        { status: 500 }
      )
    }

    // ============================================================================
    // STEP 5: Track micro-commitment event
    // ============================================================================
    await supabase.from('micro_commitments').insert({
      subscriber_id: subscriberId,
      commitment_type: 'week2_reflection',
      commitment_text: `Primary health goal: ${goal}`,
      committed_at: now,
    })

    // ============================================================================
    // STEP 6: Return success response
    // ============================================================================
    console.log(
      `[GOAL_SELECTION] Subscriber ${subscriberId} selected goal: ${goal} (upgraded to Tier 2)`
    )

    return NextResponse.json({
      success: true,
      subscriber: {
        id: updatedSubscriber.id,
        email: updatedSubscriber.email,
        firstName: updatedSubscriber.first_name,
        goal: updatedSubscriber.primary_health_goal,
        tier: updatedSubscriber.waitlist_tier,
        waitlistPosition: updatedSubscriber.waitlist_position,
        engagementScore: updatedSubscriber.engagement_score,
      },
      message: 'Goal selected successfully! You are now Tier 2.',
    })
  } catch (error) {
    console.error('[GOAL_SELECTION] Unexpected error:', error)
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
 * Force dynamic execution (no static optimization)
 */
export const dynamic = 'force-dynamic'
