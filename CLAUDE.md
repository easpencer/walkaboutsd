# Claude Development Guide for WalkAboutSD

## Project Overview
WalkAboutSD is a modern web platform for exploring San Diego neighborhoods through immersive walking tours. Built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Key Commands

### Development
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run type-check # Check TypeScript types
```

### Deployment
```bash
./deploy.sh        # Automated Railway deployment
railway up         # Manual Railway deployment
railway logs -f    # View live logs
```

## Project Structure
```
/app              # Next.js 14 App Router pages
  /explore        # Neighborhood exploration pages
  /admin          # Admin dashboard
  /pricing        # Pricing page
/components       # React components
  /admin          # Admin-specific components
/data             # Static data (neighborhoods, walks)
/supabase         # Database schema and migrations
/public           # Static assets
```

## Environment Variables Required
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `NODE_ENV` - Set to "production" for deployment
- See `.env.example` for complete list

## Database Schema
The project uses Supabase with PostGIS for spatial data:
- **profiles** - User profiles extending auth.users
- **neighborhoods** - Neighborhood information with boundaries
- **walks** - Walking routes with GPS coordinates
- **points_of_interest** - Landmarks and attractions
- **reviews** - User reviews and ratings
- **events** - Scheduled tours and events
- **photos** - User-submitted photos
- **analytics_events** - Usage tracking

## Key Features Implemented
✅ Interactive Leaflet maps with custom markers
✅ Neighborhood exploration with filtering
✅ Dynamic routing for neighborhoods
✅ Admin dashboard for content management
✅ Responsive design with Tailwind CSS
✅ Video backgrounds and animations
✅ Newsletter subscription
✅ Photo galleries
✅ Walking route visualization

## Development Notes

### Map Integration
- Uses Leaflet with React-Leaflet wrapper
- Custom markers for different POI types
- Polyline route visualization
- Multiple map styles (streets, satellite, terrain)

### Performance Optimizations
- Dynamic imports for heavy components
- Image optimization with Next.js Image
- Lazy loading for off-screen content
- Efficient database queries with indexes

### State Management
- React hooks for local state
- Context API for global state (if needed)
- Supabase real-time subscriptions ready

## Common Tasks

### Adding a New Neighborhood
1. Add neighborhood data to `/data/neighborhoods.ts`
2. Create page in `/app/explore/[neighborhood-slug]/page.tsx`
3. Add to database via Supabase dashboard or migration
4. Update sitemap if needed

### Modifying Database Schema
1. Create new migration in `/supabase/migrations/`
2. Run `supabase db push` to apply
3. Update TypeScript types accordingly

### Updating Map Markers
Edit `/components/MapComponent.tsx`:
- Modify `createIcon()` for marker styles
- Update waypoint types in `getWaypointIcon()`

### Adding Admin Features
1. Create component in `/components/admin/`
2. Import in `/app/admin/page.tsx`
3. Add necessary API routes if needed

## Troubleshooting

### Map Not Loading
- Check Leaflet CSS is imported
- Verify marker images in `/public/leaflet/`
- Ensure dynamic import with `ssr: false`

### Database Connection Issues
- Verify Supabase credentials
- Check if project is not paused
- Ensure RLS policies are configured

### Build Errors
- Run `npm run type-check` to find TypeScript issues
- Check for missing environment variables
- Ensure all imports are correct

## Testing Checklist
- [ ] All pages load without errors
- [ ] Maps display correctly
- [ ] Navigation works
- [ ] Forms submit properly
- [ ] Responsive on mobile
- [ ] Images load and optimize
- [ ] Database queries work
- [ ] Authentication flows (if implemented)

## Future Enhancements
See ROADMAP.md for planned features and improvements.

## Quick Fixes

### Clear Next.js cache
```bash
rm -rf .next
npm run dev
```

### Reset database
```bash
supabase db reset
supabase db push
supabase db seed
```

### Update dependencies
```bash
npm update
npm audit fix
```

## Important Files
- `/app/layout.tsx` - Root layout with metadata
- `/app/page.tsx` - Homepage
- `/components/EnhancedHero.tsx` - Main hero component
- `/components/InteractiveLeafletMap.tsx` - Map wrapper
- `/components/MapComponent.tsx` - Leaflet implementation
- `/data/neighborhoods.ts` - Static neighborhood data
- `/supabase/migrations/001_initial_schema.sql` - Database schema

## Support Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Leaflet Docs](https://leafletjs.com/reference.html)