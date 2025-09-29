import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Download, Share2, BookOpen, Award, Star, Check, Filter } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Walking Guides & Resources | WalkaboutSD',
  description: 'Free downloadable walking guides, maps, and resources for exploring San Diego neighborhoods on foot.',
}

const guides = [
  {
    id: 'ultimate-la-jolla',
    title: 'Ultimate La Jolla Walking Guide',
    description: 'Complete guide to La Jolla\'s beaches, coves, tide pools, and hidden gems. Includes 5 mapped routes.',
    category: 'Neighborhood',
    difficulty: 'All Levels',
    pages: 28,
    downloads: 1543,
    rating: 4.9,
    updated: 'March 2024',
    image: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=600&q=80',
    features: [
      '5 detailed walking routes',
      'Tide pool guide & schedule',
      'Wildlife spotting tips',
      'Restaurant recommendations',
      'Parking & transit info',
      'Photography spots'
    ],
    featured: true,
  },
  {
    id: 'balboa-park-explorer',
    title: 'Balboa Park Explorer\'s Handbook',
    description: 'Navigate museums, gardens, and hidden paths in America\'s largest urban cultural park.',
    category: 'Parks',
    difficulty: 'Easy',
    pages: 32,
    downloads: 1287,
    rating: 4.8,
    updated: 'February 2024',
    image: 'https://images.unsplash.com/photo-1591737772640-15070b9f1d33?w=600&q=80',
    features: [
      'Museum walking routes',
      'Garden discovery paths',
      'Architecture highlights',
      'Free activity guide',
      'Event calendar',
      'Accessibility info'
    ],
    featured: true,
  },
  {
    id: 'beach-walkers',
    title: 'Beach Walker\'s Complete Guide',
    description: 'From Torrey Pines to Imperial Beach, discover 20+ miles of coastal walking routes.',
    category: 'Coastal',
    difficulty: 'Easy-Moderate',
    pages: 36,
    downloads: 2104,
    rating: 5.0,
    updated: 'March 2024',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    features: [
      '12 beach routes',
      'Tide charts & safety',
      'Sunrise/sunset times',
      'Beach access points',
      'Dog-friendly beaches',
      'Surf spot guide'
    ],
    featured: false,
  },
  {
    id: 'urban-hiking',
    title: 'Urban Hiking San Diego',
    description: 'Challenging walks and urban hikes through canyons, hills, and neighborhoods.',
    category: 'Hiking',
    difficulty: 'Moderate-Hard',
    pages: 24,
    downloads: 876,
    rating: 4.7,
    updated: 'January 2024',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
    features: [
      '8 challenging routes',
      'Elevation profiles',
      'Trail difficulty ratings',
      'Water fountain locations',
      'Fitness tips',
      'Safety guidelines'
    ],
    featured: false,
  },
  {
    id: 'family-walks',
    title: 'Family-Friendly Walking Adventures',
    description: 'Easy walks perfect for strollers, kids, and multi-generational groups.',
    category: 'Family',
    difficulty: 'Easy',
    pages: 20,
    downloads: 1455,
    rating: 4.9,
    updated: 'March 2024',
    image: 'https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=600&q=80',
    features: [
      '10 easy routes',
      'Playground locations',
      'Restroom maps',
      'Snack spot guide',
      'Nature scavenger hunts',
      'Educational activities'
    ],
    featured: false,
  },
  {
    id: 'dog-walking',
    title: 'Dog Walker\'s San Diego',
    description: 'The complete guide to dog-friendly walks, beaches, and trails in San Diego County.',
    category: 'Pet Friendly',
    difficulty: 'All Levels',
    pages: 22,
    downloads: 1823,
    rating: 4.8,
    updated: 'February 2024',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
    features: [
      'Off-leash areas',
      'Dog beach guide',
      'Water bowl locations',
      'Pet store stops',
      'Vet emergency info',
      'Dog park maps'
    ],
    featured: false,
  }
]

const quickGuides = [
  {
    title: 'First Timer\'s Guide',
    description: 'New to San Diego? Start here',
    icon: '🌟',
    link: '/guides/first-timer'
  },
  {
    title: 'Photography Walks',
    description: 'Best spots for Instagram & photos',
    icon: '📸',
    link: '/guides/photography'
  },
  {
    title: 'Sunrise & Sunset',
    description: 'Golden hour walking routes',
    icon: '🌅',
    link: '/guides/golden-hour'
  },
  {
    title: 'Coffee & Walk',
    description: 'Combine caffeine with cardio',
    icon: '☕',
    link: '/guides/coffee-walks'
  },
]

const categories = [
  'All Guides',
  'Neighborhood',
  'Coastal',
  'Parks',
  'Hiking',
  'Family',
  'Pet Friendly'
]

export default function GuidesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1580785788792-0e2e3b5c9c0d?w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-800/90" />
        <div className="container-wide relative z-10">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Free Downloadable Guides</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Walking Guides & Resources</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Everything you need to explore San Diego on foot. Download our free guides and start your adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-12 bg-gray-50">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickGuides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.link}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group"
              >
                <div className="text-4xl mb-3">{guide.icon}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-600">{guide.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 sticky top-16 z-40 bg-white border-b">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Browse Guides</h2>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-12">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <div key={guide.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover"
                  />
                  {guide.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      Featured
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{guide.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-sm">
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded font-medium">
                      {guide.category}
                    </span>
                    <span className="text-gray-500">{guide.difficulty}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{guide.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {guide.pages} pages
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {guide.downloads.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {guide.updated}
                    </span>
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Includes:</p>
                    <ul className="space-y-1">
                      {guide.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {guide.features.length > 3 && (
                      <p className="text-sm text-gray-500 mt-2">
                        +{guide.features.length - 3} more features
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 btn-primary justify-center">
                      <Download className="w-4 h-4" />
                      Download Free
                    </button>
                    <button className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Tips Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How to Use Our Guides</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary-600">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Download & Save</h3>
                  <p className="text-gray-600">
                    All guides are PDF format. Save them to your phone for offline access during your walks.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary-600">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Interactive Maps</h3>
                  <p className="text-gray-600">
                    Each guide includes QR codes that link to interactive maps on your phone.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary-600">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Local Insights</h3>
                  <p className="text-gray-600">
                    Written by locals who walk these routes regularly, with insider tips and updates.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary-600">4</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Share & Connect</h3>
                  <p className="text-gray-600">
                    Share guides with friends and join our community walks to meet other explorers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Create Your Custom Walking Guide
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Build a personalized guide based on your interests, fitness level, and favorite neighborhoods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-secondary">
              Create Custom Guide
            </button>
            <Link href="/tours" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold py-3 px-8 rounded-lg transition-colors inline-block">
              Book a Guided Tour
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}