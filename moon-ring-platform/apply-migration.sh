#!/bin/bash
# Apply Supabase migration via SQL Editor

echo "================================================================"
echo "Moon Ring Marketing Website - Database Migration"
echo "================================================================"
echo ""
echo "The Supabase CLI requires your database password which we don't have."
echo "Instead, please apply the migration manually through the Supabase Dashboard:"
echo ""
echo "STEP 1: Open the SQL Editor"
echo "https://supabase.com/dashboard/project/ajnzeboxryqglanepxov/sql/new"
echo ""
echo "STEP 2: Copy the migration SQL"
echo "The migration file is located at:"
echo "$(pwd)/supabase/migrations/001_marketing_database_schema.sql"
echo ""
echo "STEP 3: Run the migration"
echo "- Paste the SQL into the editor"
echo "- Click 'RUN' to execute"
echo ""
echo "STEP 4: Verify tables were created"
echo "- Go to Table Editor: https://supabase.com/dashboard/project/ajnzeboxryqglanepxov/editor"
echo "- You should see: leads, orders, basic_users, email_subscriptions, etc."
echo ""
echo "================================================================"
echo ""
echo "Opening the migration file for you to copy..."
echo ""

# Try to open the file in default editor or cat it
if command -v code &> /dev/null; then
    code supabase/migrations/001_marketing_database_schema.sql
    echo "Opened in VS Code"
elif command -v open &> /dev/null; then
    open supabase/migrations/001_marketing_database_schema.sql
    echo "Opened in default application"
else
    echo "--- Migration SQL (copy everything below) ---"
    echo ""
    cat supabase/migrations/001_marketing_database_schema.sql
fi
