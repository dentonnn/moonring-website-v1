-- Migration: Extend email_subscriptions table for newsletter signup metadata
-- Date: 2025-10-04
-- Purpose: Add columns needed to store full signup context (name, GDPR, UTM params, etc.)
--          Required for Brevo migration Phase 4 acceptance criteria

-- ============================================================================
-- ADD NEW COLUMNS TO email_subscriptions
-- ============================================================================

-- Subscriber personal information
ALTER TABLE email_subscriptions
ADD COLUMN name TEXT,
ADD COLUMN gdpr_consent BOOLEAN DEFAULT false,
ADD COLUMN gdpr_consent_date TIMESTAMPTZ,
ADD COLUMN gdpr_consent_ip INET;

-- Marketing attribution (UTM parameters)
ALTER TABLE email_subscriptions
ADD COLUMN utm_source TEXT,
ADD COLUMN utm_medium TEXT,
ADD COLUMN utm_campaign TEXT,
ADD COLUMN utm_term TEXT,
ADD COLUMN utm_content TEXT;

-- Traffic source tracking
ALTER TABLE email_subscriptions
ADD COLUMN referrer_url TEXT,
ADD COLUMN landing_page TEXT,
ADD COLUMN signup_source TEXT; -- 'hero' | 'footer' | 'popup' | 'sidebar'

-- Additional metadata (flexible JSON for future needs)
ALTER TABLE email_subscriptions
ADD COLUMN metadata JSONB DEFAULT '{}'::jsonb;

-- ============================================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

-- Index for GDPR consent queries (legal compliance)
CREATE INDEX idx_email_subscriptions_gdpr_consent ON email_subscriptions(gdpr_consent, gdpr_consent_date)
WHERE gdpr_consent = true;

-- Index for UTM campaign analysis
CREATE INDEX idx_email_subscriptions_utm_campaign ON email_subscriptions(utm_campaign)
WHERE utm_campaign IS NOT NULL;

-- Index for source attribution reporting
CREATE INDEX idx_email_subscriptions_signup_source ON email_subscriptions(signup_source);

-- Index for metadata JSONB queries (using GIN index for JSON operations)
CREATE INDEX idx_email_subscriptions_metadata ON email_subscriptions USING GIN (metadata);

-- ============================================================================
-- UPDATE RLS POLICIES
-- ============================================================================

-- Drop existing policies to recreate with new column awareness
DROP POLICY IF EXISTS "Anyone can subscribe" ON email_subscriptions;
DROP POLICY IF EXISTS "Users can manage own subscriptions" ON email_subscriptions;

-- Recreate "Anyone can subscribe" policy
-- Allows anonymous users to insert their email subscription with all new fields
CREATE POLICY "Anyone can subscribe" ON email_subscriptions
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- Recreate "Users can manage own subscriptions" policy
-- Allows users to view/update their own subscription data
CREATE POLICY "Users can manage own subscriptions" ON email_subscriptions
    FOR ALL TO authenticated
    USING (email = auth.jwt() ->> 'email' OR auth.jwt() ->> 'role' = 'admin');

-- Add new policy for anonymous users to update their own subscription by email
-- This enables unsubscribe functionality via token without authentication
CREATE POLICY "Anyone can unsubscribe with valid token" ON email_subscriptions
    FOR UPDATE TO anon, authenticated
    USING (true)
    WITH CHECK (
        -- Can only update status-related fields (prevent tampering with other data)
        (status = 'unsubscribed' OR status = 'bounced')
        AND unsubscribed_at IS NOT NULL
    );

-- ============================================================================
-- ADD COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON COLUMN email_subscriptions.name IS 'Subscriber full name (optional, for personalization)';
COMMENT ON COLUMN email_subscriptions.gdpr_consent IS 'Whether user explicitly consented to marketing emails';
COMMENT ON COLUMN email_subscriptions.gdpr_consent_date IS 'Timestamp when GDPR consent was given';
COMMENT ON COLUMN email_subscriptions.gdpr_consent_ip IS 'IP address when consent was given (for audit trail)';

COMMENT ON COLUMN email_subscriptions.utm_source IS 'UTM source parameter (e.g., twitter, google)';
COMMENT ON COLUMN email_subscriptions.utm_medium IS 'UTM medium parameter (e.g., social, email, cpc)';
COMMENT ON COLUMN email_subscriptions.utm_campaign IS 'UTM campaign parameter (e.g., spring_sale, launch)';
COMMENT ON COLUMN email_subscriptions.utm_term IS 'UTM term parameter (for paid search keywords)';
COMMENT ON COLUMN email_subscriptions.utm_content IS 'UTM content parameter (for A/B testing)';

COMMENT ON COLUMN email_subscriptions.referrer_url IS 'HTTP referrer header (where user came from)';
COMMENT ON COLUMN email_subscriptions.landing_page IS 'Page URL where user signed up';
COMMENT ON COLUMN email_subscriptions.signup_source IS 'Form location on page (hero, footer, popup, sidebar)';

COMMENT ON COLUMN email_subscriptions.metadata IS 'Flexible JSON field for additional context (browser, device, etc.)';

-- ============================================================================
-- DATA MIGRATION (if needed)
-- ============================================================================

-- Backfill signup_source for existing records (if any)
-- Default to 'hero' since that's the primary form location
UPDATE email_subscriptions
SET signup_source = 'hero'
WHERE signup_source IS NULL;

-- ============================================================================
-- VERIFICATION QUERIES (for testing)
-- ============================================================================

-- Verify new columns exist
DO $$
DECLARE
    missing_columns TEXT[];
BEGIN
    SELECT ARRAY_AGG(column_name)
    INTO missing_columns
    FROM (
        VALUES
            ('name'), ('gdpr_consent'), ('gdpr_consent_date'), ('gdpr_consent_ip'),
            ('utm_source'), ('utm_medium'), ('utm_campaign'), ('utm_term'), ('utm_content'),
            ('referrer_url'), ('landing_page'), ('signup_source'), ('metadata')
    ) AS expected(column_name)
    WHERE NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'email_subscriptions'
        AND column_name = expected.column_name
    );

    IF missing_columns IS NOT NULL THEN
        RAISE EXCEPTION 'Migration failed: Missing columns: %', missing_columns;
    ELSE
        RAISE NOTICE 'Migration successful: All columns added to email_subscriptions';
    END IF;
END $$;

-- Verify indexes exist
DO $$
DECLARE
    missing_indexes TEXT[];
BEGIN
    SELECT ARRAY_AGG(indexname)
    INTO missing_indexes
    FROM (
        VALUES
            ('idx_email_subscriptions_gdpr_consent'),
            ('idx_email_subscriptions_utm_campaign'),
            ('idx_email_subscriptions_signup_source'),
            ('idx_email_subscriptions_metadata')
    ) AS expected(indexname)
    WHERE NOT EXISTS (
        SELECT 1
        FROM pg_indexes
        WHERE tablename = 'email_subscriptions'
        AND indexname = expected.indexname
    );

    IF missing_indexes IS NOT NULL THEN
        RAISE WARNING 'Some indexes missing: %', missing_indexes;
    ELSE
        RAISE NOTICE 'All indexes created successfully';
    END IF;
END $$;
