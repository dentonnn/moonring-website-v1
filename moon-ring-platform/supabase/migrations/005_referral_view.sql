-- Migration 005: Create human-readable referral view
-- Purpose: Add a view that shows referrals with email addresses instead of UUIDs
-- Created: 2025-10-28

-- Drop the view if it exists (safe to rerun)
DROP VIEW IF EXISTS referral_tracking;

-- Create a view with human-readable referral data
CREATE OR REPLACE VIEW referral_tracking AS
SELECT 
  wr.id,
  wr.referral_code,
  wr.referred_at,
  wr.position_bonus_applied,
  -- Referrer info
  r.email AS referrer_email,
  r.name AS referrer_name,
  r.referral_count AS referrer_total_referrals,
  r.waitlist_position AS referrer_position,
  -- Referred person info
  d.email AS referred_email,
  d.name AS referred_name,
  d.waitlist_position AS referred_position,
  d.created_at AS referred_signup_date
FROM waitlist_referrals wr
JOIN email_subscriptions r ON wr.referrer_id = r.id
JOIN email_subscriptions d ON wr.referred_id = d.id
ORDER BY wr.referred_at DESC;

-- Grant access to the view
GRANT SELECT ON referral_tracking TO service_role;
GRANT SELECT ON referral_tracking TO anon;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Migration 005 completed successfully!';
  RAISE NOTICE 'Created view: referral_tracking (shows emails instead of UUIDs)';
END $$;
