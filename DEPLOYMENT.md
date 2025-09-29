# WalkAboutSD Deployment Guide

## Prerequisites

1. **GitHub Account**: Required for repository hosting
2. **Railway Account**: Sign up at [railway.app](https://railway.app)
3. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
4. **CLI Tools Installed**:
   - GitHub CLI (`gh`)
   - Railway CLI (`railway`)
   - Supabase CLI (`supabase`)

## Quick Start Deployment

### Step 1: GitHub Setup

```bash
# Authenticate with GitHub
gh auth login

# Create and push repository
gh repo create walkaboutsd --public --source=. --remote=origin --push
```

### Step 2: Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the database migrations:

```bash
# Link to your Supabase project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push
```

3. Copy your project credentials:
   - Project URL: `https://YOUR_PROJECT_REF.supabase.co`
   - Anon Key: Found in Settings > API

### Step 3: Railway Deployment

#### Option A: Automated Deployment Script

```bash
# Run the deployment script
./deploy.sh
```

#### Option B: Manual Deployment

1. **Login to Railway**:
```bash
railway login
```

2. **Create a new project**:
```bash
railway new
```

3. **Link your repository**:
```bash
railway link
```

4. **Set environment variables**:
```bash
# Required variables
railway env:set NODE_ENV=production
railway env:set PORT=3000
railway env:set NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
railway env:set NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional variables (add as needed)
railway env:set NEXTAUTH_SECRET=$(openssl rand -base64 32)
railway env:set NEXT_PUBLIC_APP_URL=https://your-app.railway.app
```

5. **Deploy**:
```bash
railway up
```

6. **Set up custom domain** (optional):
```bash
railway domain
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbG...` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXTAUTH_SECRET` | NextAuth secret key | Random 32-character string |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | `https://walkaboutsd.railway.app` |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox API token | For advanced maps |
| `NEXT_PUBLIC_GA_TRACKING_ID` | Google Analytics ID | `GA-XXXXXXXXX` |
| `STRIPE_SECRET_KEY` | Stripe secret key | For payments |
| `SENDGRID_API_KEY` | SendGrid API key | For emails |

## Database Setup

### Initial Schema

The database schema is located in `supabase/migrations/001_initial_schema.sql` and includes:

- User profiles
- Neighborhoods
- Walking routes
- Points of interest
- Reviews and ratings
- Newsletter subscriptions
- Analytics tracking

### Seed Data

To populate initial data:

```bash
supabase db seed
```

## Monitoring & Maintenance

### View Logs

```bash
# Railway logs
railway logs

# Follow logs in real-time
railway logs -f
```

### Database Backups

```bash
# Create a backup
supabase db dump -f backup.sql

# Restore from backup
supabase db reset
psql -h YOUR_DB_URL -f backup.sql
```

### Performance Monitoring

1. **Railway Dashboard**: Monitor CPU, memory, and network usage
2. **Supabase Dashboard**: Monitor database performance and queries
3. **Application Logs**: Check for errors and performance issues

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node version compatibility (requires Node 18+)
   - Verify all dependencies are installed
   - Check environment variables

2. **Database Connection Issues**
   - Verify Supabase credentials
   - Check connection pooling settings
   - Ensure database is not paused

3. **Performance Issues**
   - Enable Next.js production optimizations
   - Configure proper caching headers
   - Use CDN for static assets

### Debug Commands

```bash
# Check deployment status
railway status

# View environment variables
railway env

# Restart deployment
railway restart

# Connect to production shell
railway run bash
```

## Production Checklist

- [ ] All environment variables set
- [ ] Database migrations applied
- [ ] SSL certificate configured
- [ ] Custom domain set up
- [ ] Error tracking configured
- [ ] Analytics enabled
- [ ] Backups scheduled
- [ ] Monitoring alerts set
- [ ] Rate limiting configured
- [ ] Security headers added

## Support

For deployment issues:
- Railway: [docs.railway.app](https://docs.railway.app)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)

## CI/CD Pipeline (Optional)

For automatic deployments on push:

1. Connect Railway to your GitHub repository
2. Enable automatic deploys in Railway dashboard
3. Configure branch deployments for staging/production

```yaml
# .github/workflows/deploy.yml
name: Deploy to Railway

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: walkaboutsd
```