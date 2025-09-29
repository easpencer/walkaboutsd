'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Clock, MapPin, Users, Star, Camera, Coffee, Waves } from 'lucide-react'

const walks = [
  {
    id: 'la-jolla-coastal',
    title: 'La Jolla Coastal Walk',
    neighborhood: 'La Jolla',
    description: 'Discover hidden coves, sea lions, and stunning ocean views on this iconic coastal route.',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80',
    duration: 75,
    distance: 2.3,
    difficulty: 'Easy',
    rating: 4.8,
    reviews: 127,
    highlights: [
      { icon: Waves, text: 'Tide Pools' },
      { icon: Camera, text: 'Photo Spots' },
      { icon: Users, text: 'Sea Lions' }
    ],
    featured: true
  },
  {
    id: 'balboa-cultural',
    title: 'Balboa Park Cultural Trail',
    neighborhood: 'Balboa Park',
    description: 'Museums, gardens, and stunning Spanish architecture in America\'s cultural crown jewel.',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80',
    duration: 90,
    distance: 3.1,
    difficulty: 'Easy',
    rating: 4.9,
    reviews: 203,
    highlights: [
      { icon: Camera, text: 'Architecture' },
      { icon: Users, text: 'Museums' },
      { icon: Coffee, text: 'Garden Café' }
    ],
    featured: true
  },
  {
    id: 'coronado-historic',
    title: 'Coronado Historic Walk',
    neighborhood: 'Coronado',
    description: 'Victorian mansions, pristine beaches, and the legendary Hotel del Coronado.',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80',
    duration: 60,
    distance: 2.8,
    difficulty: 'Easy',
    rating: 4.7,
    reviews: 156,
    highlights: [
      { icon: Camera, text: 'Historic Hotel' },
      { icon: Waves, text: 'Beach Walk' },
      { icon: Users, text: 'Victorian Homes' }
    ],
    featured: false
  },
  {
    id: 'north-park-brewery',
    title: 'North Park Brewery Crawl',
    neighborhood: 'North Park',
    description: 'Hip neighborhood tour featuring craft breweries, street art, and local eateries.',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80',
    duration: 120,
    distance: 2.5,
    difficulty: 'Easy',
    rating: 4.6,
    reviews: 98,
    highlights: [
      { icon: Coffee, text: 'Craft Beer' },
      { icon: Camera, text: 'Street Art' },
      { icon: Users, text: 'Local Spots' }
    ],
    featured: false
  },
  {
    id: 'sunset-cliffs',
    title: 'Sunset Cliffs Natural Park',
    neighborhood: 'Ocean Beach',
    description: 'Dramatic cliffs, crashing waves, and the best sunset views in San Diego.',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80',
    duration: 45,
    distance: 1.8,
    difficulty: 'Moderate',
    rating: 4.9,
    reviews: 284,
    highlights: [
      { icon: Camera, text: 'Sunset Views' },
      { icon: Waves, text: 'Dramatic Cliffs' },
      { icon: Users, text: 'Natural Arches' }
    ],
    featured: true
  },
  {
    id: 'little-italy-harbor',
    title: 'Little Italy Harbor Walk',
    neighborhood: 'Little Italy',
    description: 'Waterfront promenade with authentic Italian cuisine and harbor views.',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80',
    duration: 75,
    distance: 2.2,
    difficulty: 'Easy',
    rating: 4.7,
    reviews: 189,
    highlights: [
      { icon: Coffee, text: 'Italian Food' },
      { icon: Waves, text: 'Harbor Views' },
      { icon: Users, text: 'Saturday Market' }
    ],
    featured: false
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
}

export function PopularWalks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const featuredWalks = walks.filter(walk => walk.featured)
  const otherWalks = walks.filter(walk => !walk.featured)

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Most Popular
            <span className="block gradient-text">Walking Experiences</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hand-picked routes that showcase the best of San Diego. Perfect for first-time visitors and locals alike.
          </p>
        </motion.div>

        {/* Featured Walks */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredWalks.map((walk, index) => (
              <motion.div
                key={walk.id}
                variants={item}
                transition={{ duration: 0.6 }}
                className={`group ${index === 0 ? 'lg:col-span-2 xl:col-span-1' : ''}`}
              >
                <Link href={`/explore`}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${walk.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Featured Badge */}
                      <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>

                      {/* Rating */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">
                          {walk.rating}
                        </span>
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-bold mb-1">{walk.title}</h3>
                        <p className="text-white/90 text-sm">{walk.neighborhood}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {walk.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{walk.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{walk.distance} miles</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{walk.reviews} reviews</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mb-4">
                        <div className="flex items-center gap-3">
                          {walk.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-1 text-gray-600">
                              <highlight.icon className="w-4 h-4" />
                              <span className="text-xs">{highlight.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                          Start Walking →
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          walk.difficulty === 'Easy'
                            ? 'bg-green-100 text-green-700'
                            : walk.difficulty === 'Moderate'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {walk.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Other Popular Walks */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {otherWalks.map((walk, index) => (
            <motion.div
              key={walk.id}
              variants={item}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group"
            >
              <Link href={`/explore`}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                  {/* Compact Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${walk.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Rating */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-gray-900">
                        {walk.rating}
                      </span>
                    </div>

                    {/* Quick Stats */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="bg-black/50 rounded-full px-2 py-1">
                        {walk.duration} min
                      </span>
                      <span className="bg-black/50 rounded-full px-2 py-1">
                        {walk.distance} mi
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
                      {walk.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {walk.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex items-center gap-2 mb-3">
                      {walk.highlights.slice(0, 2).map((highlight, idx) => (
                        <span key={idx} className="flex items-center gap-1 text-gray-500">
                          <highlight.icon className="w-3 h-3" />
                          <span className="text-xs">{highlight.text}</span>
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors">
                        Explore →
                      </span>
                      <span className="text-xs text-gray-500">
                        {walk.reviews} reviews
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/explore"
            className="btn-primary text-lg py-4 px-8"
          >
            View All Walks
            <MapPin className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}