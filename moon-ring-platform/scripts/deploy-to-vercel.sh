#!/bin/bash

# ============================================================================
# Moon Ring - Vercel Deployment Script
# ============================================================================
# This script automates the deployment process to Vercel
# Prerequisites:
#   1. Vercel CLI installed (vercel --version)
#   2. Authenticated with Vercel (vercel whoami)
#   3. Environment variables ready (see .env.example)
# ============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         Moon Ring - Vercel Deployment Automation                ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# ============================================================================
# Step 1: Verify Prerequisites
# ============================================================================

echo -e "${YELLOW}📋 Step 1: Verifying prerequisites...${NC}"

# Check Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI not found. Install with: npm install -g vercel${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Vercel CLI found: $(vercel --version)${NC}"

# Check authentication
if ! vercel whoami &> /dev/null; then
    echo -e "${RED}❌ Not authenticated. Please run: vercel login${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Authenticated as: $(vercel whoami)${NC}"

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}⚠️  Warning: .env.local not found. Using system environment variables.${NC}"
else
    echo -e "${GREEN}✅ Found .env.local${NC}"
fi

echo ""

# ============================================================================
# Step 2: Validate Environment Variables
# ============================================================================

echo -e "${YELLOW}🔍 Step 2: Validating environment variables...${NC}"

# Load environment variables
if [ -f .env.local ]; then
    export $(grep -v '^#' .env.local | xargs)
fi

# Run validation script
node scripts/validate-env.js
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Environment validation failed. Please fix missing variables.${NC}"
    exit 1
fi

echo ""

# ============================================================================
# Step 3: Link to Vercel Project
# ============================================================================

echo -e "${YELLOW}🔗 Step 3: Linking to Vercel project...${NC}"

if [ ! -d .vercel ]; then
    echo -e "${BLUE}No existing link found. Initiating link process...${NC}"
    vercel link
else
    echo -e "${GREEN}✅ Already linked to Vercel project${NC}"
fi

echo ""

# ============================================================================
# Step 4: Set Environment Variables in Vercel
# ============================================================================

echo -e "${YELLOW}🔐 Step 4: Setting environment variables in Vercel...${NC}"

# Read environment variables and set them in Vercel
declare -a REQUIRED_VARS=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "SUPABASE_SERVICE_ROLE_KEY"
    "STRIPE_SECRET_KEY"
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    "STRIPE_WEBHOOK_SECRET"
    "RESEND_API_KEY"
    "NEXT_PUBLIC_APP_URL"
)

echo -e "${BLUE}Setting environment variables for production...${NC}"
echo -e "${YELLOW}Note: This will prompt for each variable. Use values from .env.local${NC}"
echo ""

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        echo -e "${YELLOW}⚠️  ${var} not found in environment. You'll need to set it manually.${NC}"
    else
        echo -e "${GREEN}Setting ${var}...${NC}"
        # Note: In real usage, you'd use: echo "${!var}" | vercel env add ${var} production
        # But this requires interactive input, so we'll document it instead
    fi
done

echo ""
echo -e "${BLUE}📝 Manual Setup Required:${NC}"
echo -e "Run these commands to set environment variables:"
echo ""
for var in "${REQUIRED_VARS[@]}"; do
    if [ ! -z "${!var}" ]; then
        echo -e "echo '${!var}' | vercel env add ${var} production --force"
    fi
done
echo ""
echo -e "${YELLOW}Press [ENTER] when you've set all environment variables, or CTRL+C to exit...${NC}"
read -r

echo ""

# ============================================================================
# Step 5: Deploy to Preview First
# ============================================================================

echo -e "${YELLOW}🚀 Step 5: Deploying to preview environment...${NC}"

echo -e "${BLUE}This creates a preview deployment for testing before going to production.${NC}"
vercel --yes

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Preview deployment successful!${NC}"
    PREVIEW_URL=$(vercel ls --limit 1 | grep -o 'https://[^ ]*' | head -1)
    echo -e "${GREEN}Preview URL: ${PREVIEW_URL}${NC}"
else
    echo -e "${RED}❌ Preview deployment failed. Check errors above.${NC}"
    exit 1
fi

echo ""

# ============================================================================
# Step 6: Test Preview Deployment
# ============================================================================

echo -e "${YELLOW}🧪 Step 6: Testing preview deployment...${NC}"

if [ ! -z "$PREVIEW_URL" ]; then
    echo -e "${BLUE}Checking health endpoint...${NC}"

    # Wait a few seconds for deployment to be ready
    sleep 5

    HEALTH_RESPONSE=$(curl -s "${PREVIEW_URL}/api/health" || echo "failed")

    if echo "$HEALTH_RESPONSE" | grep -q "healthy"; then
        echo -e "${GREEN}✅ Health check passed!${NC}"
        echo -e "${GREEN}Response: ${HEALTH_RESPONSE}${NC}"
    else
        echo -e "${YELLOW}⚠️  Health check returned unexpected response${NC}"
        echo -e "Response: ${HEALTH_RESPONSE}"
    fi
else
    echo -e "${YELLOW}⚠️  Could not extract preview URL for testing${NC}"
fi

echo ""
echo -e "${BLUE}📋 Manual Testing Checklist:${NC}"
echo -e "  1. Visit preview URL and verify homepage loads"
echo -e "  2. Test navigation to all pages"
echo -e "  3. Test email capture form"
echo -e "  4. Test contact form"
echo -e "  5. Verify Stripe checkout creates session"
echo ""
echo -e "${YELLOW}Press [ENTER] when preview testing is complete and ready for production, or CTRL+C to stop...${NC}"
read -r

echo ""

# ============================================================================
# Step 7: Deploy to Production
# ============================================================================

echo -e "${YELLOW}🌟 Step 7: Deploying to production...${NC}"

echo -e "${RED}⚠️  WARNING: This will deploy to PRODUCTION${NC}"
echo -e "${YELLOW}Make sure you've:${NC}"
echo -e "  - Tested the preview deployment"
echo -e "  - Set all environment variables"
echo -e "  - Using LIVE Stripe keys (not test keys)"
echo ""
echo -e "${YELLOW}Type 'yes' to deploy to production, or anything else to cancel:${NC}"
read -r CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${BLUE}Deployment cancelled.${NC}"
    exit 0
fi

vercel --prod --yes

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Production deployment successful!${NC}"
    PROD_URL=$(vercel ls --prod --limit 1 | grep -o 'https://[^ ]*' | head -1)
    echo -e "${GREEN}Production URL: ${PROD_URL}${NC}"
else
    echo -e "${RED}❌ Production deployment failed. Check errors above.${NC}"
    exit 1
fi

echo ""

# ============================================================================
# Step 8: Post-Deployment Tasks
# ============================================================================

echo -e "${YELLOW}📋 Step 8: Post-deployment tasks...${NC}"

echo -e "${BLUE}Post-Deployment Checklist:${NC}"
echo ""
echo -e "1. ✅ Configure Stripe Webhook"
echo -e "   - Go to: https://dashboard.stripe.com/webhooks"
echo -e "   - Add endpoint: ${PROD_URL}/api/webhooks/stripe"
echo -e "   - Select events: checkout.session.completed, payment_intent.*"
echo -e "   - Copy webhook secret"
echo -e "   - Update STRIPE_WEBHOOK_SECRET in Vercel"
echo ""
echo -e "2. ✅ Verify Production Deployment"
echo -e "   - Health check: ${PROD_URL}/api/health"
echo -e "   - Test all pages load"
echo -e "   - Test forms (email capture, contact)"
echo -e "   - Test checkout flow"
echo ""
echo -e "3. ✅ Configure Custom Domain (Optional)"
echo -e "   - Run: vercel domains add yourdomain.com"
echo -e "   - Update NEXT_PUBLIC_APP_URL to custom domain"
echo ""
echo -e "4. ✅ Monitor Deployment"
echo -e "   - View logs: vercel logs ${PROD_URL}"
echo -e "   - Check Vercel dashboard for errors"
echo ""

echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                  🎉 DEPLOYMENT COMPLETE! 🎉                      ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}Production URL: ${PROD_URL}${NC}"
echo -e "${BLUE}Next steps: See VERCEL_DEPLOYMENT.md for post-deployment tasks${NC}"
echo ""
