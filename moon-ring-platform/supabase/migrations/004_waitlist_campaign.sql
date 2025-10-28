-- Migration 004: Waitlist Campaign Infrastructure
-- Purpose: Extend email_subscriptions table and add tracking tables for 8-week waitlist campaign
-- Dependencies: 001_initial_schema.sql (email_subscriptions table must exist)
-- Created: 2025-01-16

-- ============================================================================
-- PART 1: Extend email_subscriptions table
-- ============================================================================

-- Add waitlist tier tracking columns
ALTER TABLE email_subscriptions
ADD COLUMN IF NOT EXISTS waitlist_tier TEXT DEFAULT 'tier1' CHECK (waitlist_tier IN ('tier1', 'tier2', 'tier3')),
ADD COLUMN IF NOT EXISTS tier2_upgraded_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS tier3_upgraded_at TIMESTAMPTZ;

-- Add goal selection columns (Tier 2)
ALTER TABLE email_subscriptions
ADD COLUMN IF NOT EXISTS primary_health_goal TEXT CHECK (primary_health_goal IN ('movement', 'sleep', 'stress', 'recovery')),
ADD COLUMN IF NOT EXISTS goal_selected_at TIMESTAMPTZ;

-- Add referral tracking columns
ALTER TABLE email_subscriptions
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS referral_count INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS referred_by_code TEXT,
ADD COLUMN IF NOT EXISTS waitlist_position INT;

-- Add engagement scoring columns
ALTER TABLE email_subscriptions
ADD COLUMN IF NOT EXISTS engagement_score INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_email_opened_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS last_email_clicked_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS total_emails_sent INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_emails_opened INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_emails_clicked INT DEFAULT 0;

-- Add PDF download tracking
ALTER TABLE email_subscriptions
ADD COLUMN IF NOT EXISTS pdf_downloaded BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS pdf_downloaded_at TIMESTAMPTZ;

-- Add micro-commitment tracking
ALTER TABLE email_subscriptions
ADD COLUMN IF NOT EXISTS week2_commitment_made BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS week2_commitment_text TEXT,
ADD COLUMN IF NOT EXISTS week2_commitment_at TIMESTAMPTZ;

-- Add campaign status tracking
ALTER TABLE email_subscriptions
ADD COLUMN IF NOT EXISTS campaign_status TEXT DEFAULT 'active' CHECK (campaign_status IN ('active', 'paused', 'completed', 'unsubscribed')),
ADD COLUMN IF NOT EXISTS week1_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS week2_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS week3_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS week4_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS week5_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS week6_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS week7_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS week8_sent_at TIMESTAMPTZ;

-- Add indexes for query performance
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_waitlist_tier ON email_subscriptions(waitlist_tier);
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_referral_code ON email_subscriptions(referral_code);
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_waitlist_position ON email_subscriptions(waitlist_position);
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_campaign_status ON email_subscriptions(campaign_status);
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_week1_sent_at ON email_subscriptions(week1_sent_at);

-- Add comment explaining schema
COMMENT ON COLUMN email_subscriptions.waitlist_tier IS 'Tier 1 = email only, Tier 2 = goal + name, Tier 3 = Founding Member';
COMMENT ON COLUMN email_subscriptions.engagement_score IS 'Calculated from: opens (1pt), clicks (3pts), referrals (10pts), micro-commitments (5pts)';
COMMENT ON COLUMN email_subscriptions.referral_code IS 'Unique 8-character code for sharing (e.g., MOONRING-A1B2C3D4)';
COMMENT ON COLUMN email_subscriptions.waitlist_position IS 'Current position in waitlist queue (lower = better). Improves by -500 per referral.';

-- ============================================================================
-- PART 2: Create waitlist_referrals tracking table
-- ============================================================================

CREATE TABLE IF NOT EXISTS waitlist_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES email_subscriptions(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES email_subscriptions(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL,
  referred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  position_bonus_applied BOOLEAN DEFAULT false,

  -- Prevent duplicate referrals
  CONSTRAINT unique_referral UNIQUE (referrer_id, referred_id)
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_waitlist_referrals_referrer_id ON waitlist_referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_referrals_referred_id ON waitlist_referrals(referred_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_referrals_referral_code ON waitlist_referrals(referral_code);

-- Add RLS policies
ALTER TABLE waitlist_referrals ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own referrals
CREATE POLICY "Users can view their own referrals"
  ON waitlist_referrals
  FOR SELECT
  USING (
    referrer_id IN (
      SELECT id FROM email_subscriptions
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Service role can manage all referrals
CREATE POLICY "Service role can manage referrals"
  ON waitlist_referrals
  FOR ALL
  USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- ============================================================================
-- PART 3: Create email_campaign_events tracking table
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_campaign_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id UUID NOT NULL REFERENCES email_subscriptions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'unsubscribed', 'complained')),
  email_week INT NOT NULL CHECK (email_week BETWEEN 1 AND 8),
  subject_line_variant TEXT, -- A, B, C, or D for A/B testing
  link_clicked TEXT, -- URL clicked if event_type = 'clicked'
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  brevo_message_id TEXT, -- Brevo's unique message ID for correlation
  user_agent TEXT, -- Browser/device info for analytics
  ip_address TEXT -- IP address for geo-analytics (anonymize after 30 days)
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_email_campaign_events_subscriber_id ON email_campaign_events(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_email_campaign_events_event_type ON email_campaign_events(event_type);
CREATE INDEX IF NOT EXISTS idx_email_campaign_events_email_week ON email_campaign_events(email_week);
CREATE INDEX IF NOT EXISTS idx_email_campaign_events_occurred_at ON email_campaign_events(occurred_at);

-- Add RLS policies
ALTER TABLE email_campaign_events ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own events
CREATE POLICY "Users can view their own email events"
  ON email_campaign_events
  FOR SELECT
  USING (
    subscriber_id IN (
      SELECT id FROM email_subscriptions
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Service role can manage all events
CREATE POLICY "Service role can manage email events"
  ON email_campaign_events
  FOR ALL
  USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- ============================================================================
-- PART 4: Create micro_commitments tracking table
-- ============================================================================

CREATE TABLE IF NOT EXISTS micro_commitments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id UUID NOT NULL REFERENCES email_subscriptions(id) ON DELETE CASCADE,
  commitment_type TEXT NOT NULL CHECK (commitment_type IN ('week2_reflection', 'week5_accountability', 'week7_challenge')),
  commitment_text TEXT NOT NULL,
  committed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reminder_sent_at TIMESTAMPTZ,
  follow_up_response TEXT, -- Optional: response to reminder email
  responded_at TIMESTAMPTZ
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_micro_commitments_subscriber_id ON micro_commitments(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_micro_commitments_commitment_type ON micro_commitments(commitment_type);
CREATE INDEX IF NOT EXISTS idx_micro_commitments_committed_at ON micro_commitments(committed_at);

-- Add RLS policies
ALTER TABLE micro_commitments ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own commitments
CREATE POLICY "Users can view their own commitments"
  ON micro_commitments
  FOR SELECT
  USING (
    subscriber_id IN (
      SELECT id FROM email_subscriptions
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Users can create their own commitments
CREATE POLICY "Users can create their own commitments"
  ON micro_commitments
  FOR INSERT
  WITH CHECK (
    subscriber_id IN (
      SELECT id FROM email_subscriptions
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Service role can manage all commitments
CREATE POLICY "Service role can manage commitments"
  ON micro_commitments
  FOR ALL
  USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- ============================================================================
-- PART 5: Create helper functions
-- ============================================================================

-- Function: Generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    -- Generate 8-character alphanumeric code (e.g., MOONRING-A1B2C3D4)
    code := 'MOONRING-' || upper(substr(md5(random()::text), 1, 8));

    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM email_subscriptions WHERE referral_code = code) INTO exists;

    EXIT WHEN NOT exists;
  END LOOP;

  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Function: Calculate engagement score
CREATE OR REPLACE FUNCTION calculate_engagement_score(subscriber_uuid UUID)
RETURNS INT AS $$
DECLARE
  score INT := 0;
  opens INT;
  clicks INT;
  referrals INT;
  commitments INT;
BEGIN
  -- Get subscriber data
  SELECT
    total_emails_opened,
    total_emails_clicked,
    referral_count
  INTO opens, clicks, referrals
  FROM email_subscriptions
  WHERE id = subscriber_uuid;

  -- Count micro-commitments
  SELECT COUNT(*) INTO commitments
  FROM micro_commitments
  WHERE subscriber_id = subscriber_uuid;

  -- Calculate score
  score := (COALESCE(opens, 0) * 1) +
           (COALESCE(clicks, 0) * 3) +
           (COALESCE(referrals, 0) * 10) +
           (COALESCE(commitments, 0) * 5);

  RETURN score;
END;
$$ LANGUAGE plpgsql;

-- Function: Update waitlist positions based on referrals
CREATE OR REPLACE FUNCTION update_waitlist_positions()
RETURNS void AS $$
BEGIN
  -- Recalculate positions for all active subscribers
  -- Base position = signup order, then subtract 500 per referral
  WITH ranked_subscribers AS (
    SELECT
      id,
      ROW_NUMBER() OVER (ORDER BY created_at ASC) - (referral_count * 500) AS new_position
    FROM email_subscriptions
    WHERE campaign_status = 'active'
  )
  UPDATE email_subscriptions es
  SET waitlist_position = rs.new_position
  FROM ranked_subscribers rs
  WHERE es.id = rs.id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- PART 6: Create triggers
-- ============================================================================

-- Trigger: Auto-generate referral code on signup
CREATE OR REPLACE FUNCTION auto_generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := generate_referral_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_referral_code
  BEFORE INSERT ON email_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_referral_code();

-- Trigger: Update engagement score when events occur
CREATE OR REPLACE FUNCTION update_engagement_score_on_event()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE email_subscriptions
  SET engagement_score = calculate_engagement_score(NEW.subscriber_id)
  WHERE id = NEW.subscriber_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_engagement_score
  AFTER INSERT ON email_campaign_events
  FOR EACH ROW
  EXECUTE FUNCTION update_engagement_score_on_event();

-- Trigger: Update waitlist positions when referral count changes
CREATE OR REPLACE FUNCTION update_positions_on_referral()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM update_waitlist_positions();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_positions
  AFTER INSERT OR UPDATE OF referral_count ON email_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_positions_on_referral();

-- ============================================================================
-- PART 7: Initialize data for existing subscribers
-- ============================================================================

-- Generate referral codes for existing subscribers without one
UPDATE email_subscriptions
SET referral_code = generate_referral_code()
WHERE referral_code IS NULL;

-- Calculate initial waitlist positions
SELECT update_waitlist_positions();

-- Calculate initial engagement scores for existing subscribers
UPDATE email_subscriptions
SET engagement_score = calculate_engagement_score(id)
WHERE engagement_score = 0;

-- ============================================================================
-- PART 8: Add analytics views
-- ============================================================================

-- View: Waitlist leaderboard (top referrers)
CREATE OR REPLACE VIEW waitlist_leaderboard AS
SELECT
  id,
  email,
  name AS first_name,
  referral_code,
  referral_count,
  waitlist_position,
  engagement_score,
  waitlist_tier,
  created_at AS subscribed_at,
  CASE
    WHEN referral_count >= 10 THEN 'Gold'
    WHEN referral_count >= 5 THEN 'Silver'
    WHEN referral_count >= 1 THEN 'Bronze'
    ELSE 'None'
  END AS achievement_tier
FROM email_subscriptions
WHERE campaign_status = 'active'
ORDER BY waitlist_position ASC
LIMIT 100;

-- View: Campaign performance metrics
CREATE OR REPLACE VIEW campaign_performance AS
SELECT
  email_week,
  subject_line_variant,
  COUNT(*) FILTER (WHERE event_type = 'sent') AS total_sent,
  COUNT(*) FILTER (WHERE event_type = 'delivered') AS total_delivered,
  COUNT(*) FILTER (WHERE event_type = 'opened') AS total_opened,
  COUNT(*) FILTER (WHERE event_type = 'clicked') AS total_clicked,
  COUNT(*) FILTER (WHERE event_type = 'bounced') AS total_bounced,
  COUNT(*) FILTER (WHERE event_type = 'unsubscribed') AS total_unsubscribed,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE event_type = 'opened') /
    NULLIF(COUNT(*) FILTER (WHERE event_type = 'delivered'), 0),
    2
  ) AS open_rate_pct,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE event_type = 'clicked') /
    NULLIF(COUNT(*) FILTER (WHERE event_type = 'opened'), 0),
    2
  ) AS click_through_rate_pct
FROM email_campaign_events
GROUP BY email_week, subject_line_variant
ORDER BY email_week, subject_line_variant;

-- View: Tier conversion funnel
CREATE OR REPLACE VIEW tier_conversion_funnel AS
SELECT
  COUNT(*) FILTER (WHERE waitlist_tier = 'tier1') AS tier1_count,
  COUNT(*) FILTER (WHERE waitlist_tier = 'tier2') AS tier2_count,
  COUNT(*) FILTER (WHERE waitlist_tier = 'tier3') AS tier3_count,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE waitlist_tier = 'tier2') /
    NULLIF(COUNT(*) FILTER (WHERE waitlist_tier = 'tier1'), 0),
    2
  ) AS tier1_to_tier2_conversion_pct,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE waitlist_tier = 'tier3') /
    NULLIF(COUNT(*) FILTER (WHERE waitlist_tier = 'tier2'), 0),
    2
  ) AS tier2_to_tier3_conversion_pct
FROM email_subscriptions
WHERE campaign_status IN ('active', 'completed');

-- ============================================================================
-- PART 9: Grant permissions
-- ============================================================================

-- Grant service role access to all tables
GRANT ALL ON email_subscriptions TO service_role;
GRANT ALL ON waitlist_referrals TO service_role;
GRANT ALL ON email_campaign_events TO service_role;
GRANT ALL ON micro_commitments TO service_role;

-- Grant anon role limited access (for public API endpoints)
GRANT SELECT ON waitlist_leaderboard TO anon;
GRANT INSERT ON micro_commitments TO anon;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Verification queries (run these after migration):
-- 1. Check new columns exist:
--    SELECT column_name FROM information_schema.columns WHERE table_name = 'email_subscriptions' AND column_name LIKE '%waitlist%';
--
-- 2. Check new tables exist:
--    SELECT table_name FROM information_schema.tables WHERE table_name IN ('waitlist_referrals', 'email_campaign_events', 'micro_commitments');
--
-- 3. Check referral codes generated:
--    SELECT COUNT(*) FROM email_subscriptions WHERE referral_code IS NOT NULL;
--
-- 4. Check leaderboard view:
--    SELECT * FROM waitlist_leaderboard LIMIT 10;
