#!/bin/bash

# WalkAboutSD Deployment Script
# This script handles the complete deployment process to Railway

set -e

echo "🚂 Starting WalkAboutSD deployment to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI is not installed. Please install it first:"
    echo "brew install railway"
    exit 1
fi

# Check if authenticated with Railway
echo "📝 Checking Railway authentication..."
if ! railway whoami &> /dev/null; then
    echo "🔐 Please authenticate with Railway:"
    railway login
fi

# Function to set environment variables
set_env_vars() {
    echo "🔧 Setting environment variables..."

    # Core environment variables
    railway env:set NODE_ENV=production
    railway env:set PORT=3000

    # Prompt for critical environment variables if not set
    if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
        read -p "Enter your Supabase URL: " SUPABASE_URL
        railway env:set NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
    fi

    if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
        read -p "Enter your Supabase Anon Key: " SUPABASE_ANON
        railway env:set NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON
    fi

    echo "✅ Environment variables set successfully"
}

# Function to link to existing project or create new one
setup_project() {
    echo "🔗 Setting up Railway project..."

    # Check if already linked to a project
    if railway status &> /dev/null; then
        echo "✅ Already linked to a Railway project"
    else
        echo "Creating new Railway project..."
        railway link
    fi
}

# Main deployment process
main() {
    # 1. Setup project
    setup_project

    # 2. Set environment variables
    set_env_vars

    # 3. Deploy to Railway
    echo "🚀 Deploying to Railway..."
    railway up

    # 4. Get deployment URL
    echo "🌐 Getting deployment URL..."
    DEPLOYMENT_URL=$(railway domain)

    if [ -n "$DEPLOYMENT_URL" ]; then
        echo "✅ Deployment successful!"
        echo "🔗 Your app is live at: https://$DEPLOYMENT_URL"
    else
        echo "⚠️  Deployment completed but no domain found."
        echo "Please set up a domain in your Railway dashboard."
    fi

    # 5. Show logs
    echo "📜 Showing deployment logs (press Ctrl+C to exit)..."
    railway logs
}

# Run main deployment
main