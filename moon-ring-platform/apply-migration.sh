#!/bin/bash
# Apply Supabase migrations via SQL Editor
# IMPORTANT: Run migrations in order (001 → 002) or the newsletter API will fail!

echo "================================================================"
echo "Moon Ring Marketing Website - Database Migrations"
echo "================================================================"
echo ""
echo "⚠️  CRITICAL: You must run BOTH migrations in order!"
echo ""
echo "The Supabase CLI requires your database password which we don't have."
echo "Instead, please apply migrations manually through the Supabase Dashboard:"
echo ""
echo "────────────────────────────────────────────────────────────────"
echo "MIGRATION 001: Base Schema (leads, orders, subscriptions tables)"
echo "────────────────────────────────────────────────────────────────"
echo ""
echo "STEP 1: Open the SQL Editor"
echo "https://supabase.com/dashboard/project/ajnzeboxryqglanepxov/sql/new"
echo ""
echo "STEP 2: Copy migration 001"
echo "File: $(pwd)/supabase/migrations/001_marketing_database_schema.sql"
echo ""
echo "STEP 3: Run the migration"
echo "- Paste the SQL into the editor"
echo "- Click 'RUN' to execute"
echo "- Verify success: Should see 'CREATE TABLE' output"
echo ""
echo "────────────────────────────────────────────────────────────────"
echo "MIGRATION 002: Newsletter Extensions (GDPR, UTM, RLS policies)"
echo "────────────────────────────────────────────────────────────────"
echo ""
echo "STEP 4: Clear the SQL editor (select all, delete)"
echo ""
echo "STEP 5: Copy migration 002"
echo "File: $(pwd)/supabase/migrations/002_extend_email_subscriptions_for_newsletter.sql"
echo ""
echo "STEP 6: Run the migration"
echo "- Paste the SQL into the editor"
echo "- Click 'RUN' to execute"
echo "- Verify success: Should see 'Migration successful: All columns added to email_subscriptions'"
echo ""
echo "────────────────────────────────────────────────────────────────"
echo "FINAL VERIFICATION"
echo "────────────────────────────────────────────────────────────────"
echo ""
echo "Run this query in the SQL Editor to verify all columns exist:"
echo ""
echo "  SELECT column_name FROM information_schema.columns"
echo "  WHERE table_name = 'email_subscriptions'"
echo "  ORDER BY ordinal_position;"
echo ""
echo "Expected columns: id, email, subscription_types, status, unsubscribe_token,"
echo "unsubscribed_at, unsubscribe_reason, bounce_count, last_email_sent_at,"
echo "created_at, updated_at, name, gdpr_consent, gdpr_consent_date,"
echo "gdpr_consent_ip, utm_source, utm_medium, utm_campaign, utm_term,"
echo "utm_content, referrer_url, landing_page, signup_source, metadata"
echo ""
echo "================================================================"
echo ""
echo "Opening migration files for you to copy..."
echo ""

# Try to open both migration files
if command -v code &> /dev/null; then
    code supabase/migrations/001_marketing_database_schema.sql
    code supabase/migrations/002_extend_email_subscriptions_for_newsletter.sql
    echo "✅ Opened both migrations in VS Code"
    echo "   - Run 001 first, then 002"
elif command -v open &> /dev/null; then
    open supabase/migrations/001_marketing_database_schema.sql
    open supabase/migrations/002_extend_email_subscriptions_for_newsletter.sql
    echo "✅ Opened both migrations in default application"
    echo "   - Run 001 first, then 002"
else
    echo "--- Migration 001: Base Schema (copy everything below) ---"
    echo ""
    cat supabase/migrations/001_marketing_database_schema.sql
    echo ""
    echo "--- Migration 002: Newsletter Extensions (copy everything below) ---"
    echo ""
    cat supabase/migrations/002_extend_email_subscriptions_for_newsletter.sql
fi
