'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Coffee, Utensils, ShoppingBag, Camera, MapPin, Star, ExternalLink } from 'lucide-react'

interface LocalSpotsProps {
  neighborhoodId: string
}

const localSpots = {
  'la-jolla': [
    {
      name: 'The Cottage',
      type: 'restaurant',
      description: 'Beloved breakfast spot with ocean views and fresh California cuisine',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80',
      address: '7702 Fay Ave, La Jolla',
      priceRange: '$$'
    },
    {
      name: 'Warwick\'s Books',
      type: 'shop',
      description: 'Independent bookstore serving the community since 1896',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
      address: '7812 Girard Ave, La Jolla',
      priceRange: '$'
    },
    {
      name: 'Better Buzz Coffee',
      type: 'cafe',
      description: 'Local coffee roaster with excellent beans and coastal vibes',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80',
      address: '1134 Wall St, La Jolla',
      priceRange: '$'
    },
    {
      name: 'La Jolla Cove Overlook',
      type: 'viewpoint',
      description: 'Perfect spot for sunrise photos and sea lion watching',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1582825770113-3ccbf80ed807?w=400&q=80',
      address: 'Coast Blvd, La Jolla',
      priceRange: 'Free'
    }
  ]
}

const typeIcons = {
  restaurant: Utensils,
  cafe: Coffee,
  shop: ShoppingBag,
  viewpoint: Camera
}

const typeColors = {
  restaurant: 'text-red-500',
  cafe: 'text-orange-500',
  shop: 'text-purple-500',
  viewpoint: 'text-blue-500'
}

export function LocalSpots({ neighborhoodId }: LocalSpotsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const spots = localSpots[neighborhoodId as keyof typeof localSpots] || []

  if (spots.length === 0) {
    return null
  }

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">
            Local Favorites & Hidden Gems
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the places locals love - from cozy cafes to secret viewpoints that make this neighborhood special.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {spots.map((spot, index) => {
            const IconComponent = typeIcons[spot.type as keyof typeof typeIcons]
            const iconColor = typeColors[spot.type as keyof typeof typeColors]

            return (
              <motion.div
                key={spot.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="glass-card rounded-2xl overflow-hidden hover-lift glow-soft border border-white/20 h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${spot.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 glass rounded-full p-2 border border-white/30">
                      <IconComponent className={`w-5 h-5 ${iconColor}`} />
                    </div>

                    {/* Rating */}
                    <div className="absolute top-3 right-3 glass rounded-full px-3 py-1 border border-white/30">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white font-semibold text-sm">
                          {spot.rating}
                        </span>
                      </div>
                    </div>

                    {/* External Link Indicator */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="glass rounded-full p-2 border border-white/30">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
                        {spot.name}
                      </h3>
                      <span className="text-sm font-medium text-gray-500 ml-2">
                        {spot.priceRange}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {spot.description}
                    </p>

                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{spot.address}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="glass-card rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              More Local Recommendations
            </h3>
            <p className="text-gray-600 mb-6">
              Our walking guides include even more hidden gems, local shortcuts, and insider tips from neighborhood residents.
            </p>
            <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors">
              Get Premium Guide
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}