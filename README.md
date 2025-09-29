# WalkaboutSD - San Diego Walking Tours & Neighborhood Guides

A modern, SEO-optimized website for discovering San Diego's best neighborhoods through guided walking tours and local experiences.

## 🌟 Features

- **15+ Neighborhood Guides** - Detailed walking routes for La Jolla, Balboa Park, Coronado, and more
- **Interactive Maps** - GPS-enabled walking routes with waypoints and local highlights
- **SEO Optimized** - Built for maximum search visibility and local discovery
- **Mobile-First Design** - Responsive experience across all devices
- **Audio Guides** - Premium downloadable content for enhanced experiences
- **Local Recommendations** - Insider tips for dining, shopping, and hidden gems

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Optimized for Vercel/Netlify

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/walkaboutsd.git
cd walkaboutsd

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

## 📁 Project Structure

```
walkaboutsd/
├── app/                    # Next.js 13+ app directory
│   ├── explore/           # Neighborhood pages
│   ├── walks/             # Individual walk routes
│   ├── blog/              # Content management
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── Header.tsx         # Navigation
│   ├── Hero.tsx           # Homepage hero
│   ├── FeaturedNeighborhoods.tsx
│   └── ...
├── data/                  # Static data and content
│   ├── neighborhoods.ts   # Neighborhood information
│   ├── walks.ts          # Walking route data
│   └── ...
├── lib/                   # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## 🎯 SEO Strategy

### URL Structure
- `/explore/[neighborhood]` - Individual neighborhood pages
- `/walks/[walk-id]` - Specific walking routes
- `/guides/[guide-type]` - Curated guide collections
- `/blog/[post-slug]` - Local content and tips

### Key Features
- **Schema Markup** - Rich snippets for local business and tourism
- **Local SEO** - Google Business Profile optimization
- **Content Strategy** - Neighborhood-focused blog content
- **Image Optimization** - WebP/AVIF with proper alt tags
- **Core Web Vitals** - Optimized for performance scores

## 🗺️ Content Management

### Adding New Neighborhoods

1. Add neighborhood data to `data/neighborhoods.ts`
2. Create page at `app/explore/[neighborhood]/page.tsx`
3. Add walking routes to `data/walks.ts`
4. Include high-quality images in `/public/images/`

### Content Guidelines
- **SEO-focused titles** with local keywords
- **Detailed descriptions** highlighting unique features
- **Practical information** (parking, transit, timing)
- **Local recommendations** for dining and activities

## 📱 Responsive Design

- **Mobile-first** approach with touch-friendly navigation
- **Progressive enhancement** for desktop features
- **Optimized images** with responsive sizing
- **Accessible design** meeting WCAG guidelines

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://walkaboutsd.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### SEO Configuration

Update metadata in `app/layout.tsx` and individual pages for:
- Title templates
- Open Graph images
- Schema markup
- Local business information

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Build Optimization

```bash
# Production build
npm run build

# Test production build locally
npm run start
```

## 📊 Analytics & Tracking

- **Google Analytics 4** - User behavior and conversion tracking
- **Google Search Console** - SEO performance monitoring
- **Core Web Vitals** - Performance metrics
- **Local SEO tracking** - Neighborhood-specific rankings

## 🎨 Design System

### Colors
- **Primary**: Blue tones reflecting San Diego's ocean
- **Secondary**: Warm sunset oranges and purples
- **Accent**: Natural greens for parks and nature

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **UI Elements**: System fonts for performance

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♀️ Support

For questions or support:
- Email: hello@walkaboutsd.com
- Website: [walkaboutsd.com](https://walkaboutsd.com)
- Issues: [GitHub Issues](https://github.com/yourusername/walkaboutsd/issues)

---

Built with ❤️ in San Diego