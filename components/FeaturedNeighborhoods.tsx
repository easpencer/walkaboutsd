'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { MapPin, Clock, Users, Star } from 'lucide-react'

const neighborhoods = [
  {
    id: 'la-jolla',
    name: 'La Jolla',
    title: 'Coastal Elegance',
    description: 'Stunning coastline, upscale shops, and world-class dining with dramatic ocean views.',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=600&q=80',
    walkTime: '45-90 min',
    difficulty: 'Easy',
    highlights: ['Sea Lions', 'Tide Pools', 'Luxury Shopping'],
    rating: 4.8,
    reviews: 127,
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'balboa-park',
    name: 'Balboa Park',
    title: 'Cultural Heart',
    description: 'Museums, gardens, and Spanish architecture in America\'s largest urban cultural park.',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=600&q=80',
    walkTime: '60-120 min',
    difficulty: 'Easy',
    highlights: ['Museums', 'Rose Garden', 'Architecture'],
    rating: 4.9,
    reviews: 203,
    color: 'from-green-500 to-emerald-400'
  },
  {
    id: 'coronado',
    name: 'Coronado',
    title: 'Victorian Charm',
    description: 'Historic island community with pristine beaches and the iconic Hotel del Coronado.',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=600&q=80',
    walkTime: '30-75 min',
    difficulty: 'Easy',
    highlights: ['Historic Hotel', 'Beach Walk', 'Victorian Homes'],
    rating: 4.7,
    reviews: 156,
    color: 'from-orange-500 to-red-400'
  },
  {
    id: 'north-park',
    name: 'North Park',
    title: 'Hipster Haven',
    description: 'Trendy neighborhood with craft breweries, vintage shops, and vibrant street art.',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=600&q=80',
    walkTime: '45-90 min',
    difficulty: 'Easy',
    highlights: ['Craft Beer', 'Street Art', 'Local Eats'],
    rating: 4.6,
    reviews: 98,
    color: 'from-purple-500 to-pink-400'
  },
  {
    id: 'ocean-beach',
    name: 'Ocean Beach',
    title: 'Bohemian Vibes',
    description: 'Laid-back beach town with a famous pier, eclectic shops, and sunset views.',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=600&q=80',
    walkTime: '30-60 min',
    difficulty: 'Easy',
    highlights: ['Sunset Pier', 'Beach Culture', 'Local Markets'],
    rating: 4.5,
    reviews: 142,
    color: 'from-indigo-500 to-blue-400'
  },
  {
    id: 'little-italy',
    name: 'Little Italy',
    title: 'Mediterranean Flair',
    description: 'Waterfront district with authentic Italian cuisine, farmers markets, and harbor views.',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=600&q=80',
    walkTime: '40-75 min',
    difficulty: 'Easy',
    highlights: ['Italian Food', 'Harbor Views', 'Saturday Market'],
    rating: 4.7,
    reviews: 189,
    color: 'from-red-500 to-orange-400'
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

export function FeaturedNeighborhoods() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Explore San Diego's
            <span className="block gradient-text">Best Neighborhoods</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Each neighborhood tells a unique story. Discover the character, culture, and hidden gems that make San Diego special.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {neighborhoods.map((neighborhood, index) => (
            <motion.div
              key={neighborhood.id}
              variants={item}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <Link href={`/explore/${neighborhood.id}`}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${neighborhood.image})` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${neighborhood.color} opacity-60`} />

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">
                        {neighborhood.rating}
                      </span>
                    </div>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                      <h3 className="text-2xl font-bold mb-2">{neighborhood.name}</h3>
                      <p className="text-lg font-medium opacity-90">{neighborhood.title}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {neighborhood.description}
                    </p>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{neighborhood.walkTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{neighborhood.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{neighborhood.reviews} reviews</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {neighborhood.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                        Explore Walks →
                      </span>
                      <div className="text-right text-sm text-gray-500">
                        <div>{neighborhood.reviews} reviews</div>
                      </div>
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
            View All Neighborhoods
            <MapPin className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}