import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight, TrendingUp, Heart, MessageSquare, Bookmark } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog & Walking Stories | WalkaboutSD',
  description: 'Discover San Diego through stories, walking tips, neighborhood guides, and local insights from our community of urban explorers.',
}

const featuredPost = {
  id: 'hidden-gems-la-jolla',
  title: '7 Hidden Gems You\'ll Only Find on Foot in La Jolla',
  excerpt: 'Beyond the famous cove and seals, La Jolla hides secret gardens, hidden staircases, and locals-only viewpoints that you\'ll never see from a car.',
  author: 'Sarah Martinez',
  authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  date: 'March 15, 2024',
  readTime: '5 min read',
  category: 'Hidden Gems',
  image: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?w=1200&q=80',
  likes: 342,
  comments: 28,
}

const blogPosts = [
  {
    id: 'balboa-park-museums',
    title: 'Walking Between Museums: The Perfect Balboa Park Day',
    excerpt: 'How to maximize your museum visits with strategic walking routes and hidden shortcuts.',
    author: 'Mike Chen',
    date: 'March 12, 2024',
    readTime: '4 min read',
    category: 'Guides',
    image: 'https://images.unsplash.com/photo-1591737772640-15070b9f1d33?w=400&q=80',
    trending: true,
  },
  {
    id: 'sunrise-walks',
    title: 'The Magic Hour: Best Sunrise Walking Spots in San Diego',
    excerpt: 'Wake up early and discover a different side of San Diego with these spectacular sunrise routes.',
    author: 'Emma Wilson',
    date: 'March 10, 2024',
    readTime: '6 min read',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1495858666316-49520523b12f?w=400&q=80',
    trending: false,
  },
  {
    id: 'dog-beach-guide',
    title: 'Paws & Paths: Ultimate Guide to Dog-Friendly Walks',
    excerpt: 'From off-leash beaches to shaded trails, here\'s where to walk your four-legged friend.',
    author: 'Jessica Park',
    date: 'March 8, 2024',
    readTime: '7 min read',
    category: 'Pet Friendly',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80',
    trending: true,
  },
  {
    id: 'north-park-coffee',
    title: 'Coffee Crawl: Walking North Park\'s Caffeine Scene',
    excerpt: 'A caffeinated journey through San Diego\'s hippest neighborhood, one coffee shop at a time.',
    author: 'Tom Rodriguez',
    date: 'March 5, 2024',
    readTime: '5 min read',
    category: 'Food & Drink',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    trending: false,
  },
  {
    id: 'family-walks',
    title: '10 Stroller-Friendly Walks That Kids Will Love',
    excerpt: 'Family adventures don\'t have to be complicated. These easy walks keep everyone happy.',
    author: 'Lisa Thompson',
    date: 'March 3, 2024',
    readTime: '8 min read',
    category: 'Family',
    image: 'https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=400&q=80',
    trending: false,
  },
  {
    id: 'fitness-walking',
    title: 'Walking Your Way to Fitness: San Diego Edition',
    excerpt: 'Turn your daily walks into effective workouts with these challenging routes and tips.',
    author: 'David Kim',
    date: 'February 28, 2024',
    readTime: '6 min read',
    category: 'Fitness',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80',
    trending: true,
  },
]

const categories = [
  { name: 'All Posts', count: 156, active: true },
  { name: 'Guides', count: 42, active: false },
  { name: 'Hidden Gems', count: 28, active: false },
  { name: 'Photography', count: 24, active: false },
  { name: 'Food & Drink', count: 19, active: false },
  { name: 'Pet Friendly', count: 15, active: false },
  { name: 'Family', count: 18, active: false },
  { name: 'Fitness', count: 10, active: false },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16">
        <div className="container-wide">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Walking Stories & Guides</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Tips, stories, and insights from San Diego's walking community
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container-wide">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="lg:flex">
              <div className="lg:w-3/5 relative h-80 lg:h-auto">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured Story
                </div>
              </div>
              <div className="lg:w-2/5 p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
                    {featuredPost.category}
                  </span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Image
                      src={featuredPost.authorImage}
                      alt={featuredPost.author}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{featuredPost.author}</p>
                      <p className="text-sm text-gray-500">{featuredPost.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500">
                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">{featuredPost.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                      <span className="text-sm">{featuredPost.comments}</span>
                    </button>
                    <button className="hover:text-primary-600 transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  Read Full Story
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-gray-50 sticky top-16 z-40 border-b">
        <div className="container-wide">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category.active
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.id}`} className="block">
                  <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.trending && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-3 text-sm">
                    <span className="text-primary-600 font-medium">{post.category}</span>
                    <span className="text-gray-500">{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-primary">
              Load More Stories
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Walking Tips & Stories Weekly
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 5,000+ San Diego walkers getting the best routes, events, and local insights delivered to their inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button type="submit" className="btn-secondary">
              Subscribe
            </button>
          </form>
          <p className="text-sm text-white/70 mt-4">
            No spam, unsubscribe anytime. Read our <Link href="/privacy" className="underline">privacy policy</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}