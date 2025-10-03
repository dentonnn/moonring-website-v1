#!/bin/bash

# Load environment variables from .env.local if it exists
if [ -f .env.local ]; then
  echo "📦 Loading environment variables from .env.local..."
  export $(grep -v '^#' .env.local | xargs)
else
  echo "⚠️  Warning: .env.local not found. Using system environment variables."
fi

# Validate environment variables before building
echo ""
node scripts/validate-env.js
if [ $? -ne 0 ]; then
  echo "❌ Environment validation failed. Cannot proceed with build."
  exit 1
fi

# Run the Next.js build
echo "🚀 Starting Next.js production build with Turbopack..."
next build --turbopack

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "✅ Build completed successfully!"
else
  echo "❌ Build failed. Check the error messages above."
  exit 1
fi
