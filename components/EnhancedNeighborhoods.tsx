'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { MapPin, Clock, Users, Star, ArrowRight, Sparkles, Camera, Coffee, Waves } from 'lucide-react'

const neighborhoods = [
  {
    id: 'la-jolla',
    name: 'La Jolla',
    title: 'Coastal Elegance',
    description: 'Where dramatic cliffs meet pristine beaches, sea lions bask in golden sunlight, and tide pools reveal nature\'s hidden treasures.',
    image: 'https://images.unsplash.com/photo-1582825770113-3ccbf80ed807?w=800&q=80',
    video: '/videos/la-jolla-preview.mp4',
    walkTime: '45-90 min',
    difficulty: 'Easy',
    highlights: [
      { icon: Waves, text: 'Sea Lions', color: 'text-blue-400' },
      { icon: Camera, text: 'Tide Pools', color: 'text-green-400' },
      { icon: Sparkles, text: 'Luxury Shopping', color: 'text-purple-400' }
    ],
    rating: 4.8,
    reviews: 127,
    color: 'from-blue-500/80 to-cyan-400/80',
    featured: true
  },
  {
    id: 'balboa-park',
    name: 'Balboa Park',
    title: 'Cultural Heart',
    description: 'America\'s largest urban cultural park featuring world-class museums, stunning Spanish architecture, and over 1,200 acres of gardens.',
    image: 'https://images.unsplash.com/photo-1591737772640-15070b9f1d33?w=800&q=80',
    walkTime: '60-120 min',
    difficulty: 'Easy',
    highlights: [
      { icon: Sparkles, text: 'Museums', color: 'text-purple-400' },
      { icon: Camera, text: 'Rose Garden', color: 'text-pink-400' },
      { icon: Coffee, text: 'Architecture', color: 'text-orange-400' }
    ],
    rating: 4.9,
    reviews: 203,
    color: 'from-green-500/80 to-emerald-400/80',
    featured: true
  },
  {
    id: 'coronado',
    name: 'Coronado',
    title: 'Victorian Charm',
    description: 'Step into a fairy tale on this enchanting island featuring pristine beaches, Victorian mansions, and the legendary Hotel del Coronado.',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80',
    walkTime: '30-75 min',
    difficulty: 'Easy',
    highlights: [
      { icon: Sparkles, text: 'Historic Hotel', color: 'text-yellow-400' },
      { icon: Waves, text: 'Beach Walk', color: 'text-blue-400' },
      { icon: Camera, text: 'Victorian Homes', color: 'text-red-400' }
    ],
    rating: 4.7,
    reviews: 156,
    color: 'from-orange-500/80 to-red-400/80',
    featured: true
  },
  {
    id: 'north-park',
    name: 'North Park',
    title: 'Hipster Haven',
    description: 'Dive into San Diego\'s most creative neighborhood with craft breweries, vintage boutiques, vibrant street art, and an unmatched local food scene.',
    image: 'https://images.unsplash.com/photo-1571894620470-8a1e7a14301c?w=800&q=80',
    walkTime: '45-90 min',
    difficulty: 'Easy',
    highlights: [
      { icon: Coffee, text: 'Craft Beer', color: 'text-amber-400' },
      { icon: Camera, text: 'Street Art', color: 'text-pink-400' },
      { icon: Sparkles, text: 'Local Eats', color: 'text-green-400' }
    ],
    rating: 4.6,
    reviews: 98,
    color: 'from-purple-500/80 to-pink-400/80',
    featured: false
  },
  {
    id: 'ocean-beach',
    name: 'Ocean Beach',
    title: 'Bohemian Vibes',
    description: 'Experience the laid-back beach culture with the longest pier on the West Coast, eclectic shops, and breathtaking sunset views.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    walkTime: '30-60 min',
    difficulty: 'Easy',
    highlights: [
      { icon: Waves, text: 'Sunset Pier', color: 'text-orange-400' },
      { icon: Sparkles, text: 'Beach Culture', color: 'text-blue-400' },
      { icon: Coffee, text: 'Local Markets', color: 'text-green-400' }
    ],
    rating: 4.5,
    reviews: 142,
    color: 'from-indigo-500/80 to-blue-400/80',
    featured: false
  },
  {
    id: 'little-italy',
    name: 'Little Italy',
    title: 'Mediterranean Flair',
    description: 'Savor authentic Italian culture in this waterfront district with harbor views, Saturday farmers markets, and the finest Italian cuisine.',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&q=80',
    walkTime: '40-75 min',
    difficulty: 'Easy',
    highlights: [
      { icon: Coffee, text: 'Italian Food', color: 'text-red-400' },
      { icon: Waves, text: 'Harbor Views', color: 'text-blue-400' },
      { icon: Sparkles, text: 'Saturday Market', color: 'text-green-400' }
    ],
    rating: 4.7,
    reviews: 189,
    color: 'from-red-500/80 to-orange-400/80',
    featured: false
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

export function EnhancedNeighborhoods() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 mb-8 border border-white/20">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-700 font-medium">Discover Hidden Gems</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 font-serif leading-tight">
            Explore San Diego's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mt-2">
              Best Neighborhoods
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Each neighborhood tells a unique story of culture, beauty, and adventure.
            Discover the character and hidden gems that make San Diego extraordinary.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {neighborhoods.map((neighborhood, index) => (
            <motion.div
              key={neighborhood.id}
              variants={item}
              className={`group ${
                neighborhood.featured && index === 0
                  ? 'lg:col-span-2 xl:col-span-1 xl:row-span-2'
                  : ''
              }`}
            >
              <Link href={`/explore/${neighborhood.id}`}>
                <div className="relative overflow-hidden rounded-3xl hover-lift glow-soft border border-white/20 bg-white/10 backdrop-blur-sm h-full">
                  {/* Image Container */}
                  <div className={`relative overflow-hidden ${
                    neighborhood.featured && index === 0 ? 'h-96' : 'h-80'
                  }`}>
                    {/* Background Image */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${neighborhood.image})` }}
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${neighborhood.color} to-transparent`} />

                    {/* Floating Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                      {neighborhood.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          className="absolute glass-card rounded-full p-3"
                          style={{
                            top: `${20 + idx * 25}%`,
                            right: `${10 + (idx % 2) * 15}%`
                          }}
                          animate={{
                            y: [-10, 10, -10],
                            rotate: [-5, 5, -5]
                          }}
                          transition={{
                            duration: 3 + idx,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <highlight.icon className={`w-5 h-5 ${highlight.color}`} />
                        </motion.div>
                      ))}
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-6 left-6 glass rounded-full px-4 py-2 border border-white/30">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white font-semibold text-sm">
                          {neighborhood.rating}
                        </span>
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {neighborhood.featured && (
                      <div className="absolute top-6 right-6 glass rounded-full px-4 py-2 border border-white/30">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                          <span className="text-white font-semibold text-sm">Featured</span>
                        </div>
                      </div>
                    )}

                    {/* Title Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <motion.h3
                        whileHover={{ y: -5 }}
                        className="text-2xl md:text-3xl font-bold mb-2 text-glow"
                      >
                        {neighborhood.name}
                      </motion.h3>
                      <p className="text-lg font-medium text-white/90 mb-3">
                        {neighborhood.title}
                      </p>

                      {/* Quick Stats */}
                      <div className="flex items-center gap-4 text-sm text-white/80">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{neighborhood.walkTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{neighborhood.reviews} reviews</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 glass-card border-t border-white/10">
                    <p className="text-gray-700 mb-6 leading-relaxed line-clamp-3">
                      {neighborhood.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {neighborhood.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="flex items-center gap-2 glass rounded-full px-4 py-2 border border-white/20 group cursor-pointer"
                        >
                          <highlight.icon className={`w-4 h-4 ${highlight.color} group-hover:scale-110 transition-transform`} />
                          <span className="text-gray-700 text-sm font-medium">
                            {highlight.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-blue-600 font-semibold group"
                      >
                        <span>Explore Walks</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.div>

                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        neighborhood.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {neighborhood.difficulty}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <Link href="/explore">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 glass rounded-full px-8 py-4 text-lg font-semibold text-gray-700 hover-glow border border-white/30 group"
            >
              <MapPin className="w-6 h-6 group-hover:text-blue-600 transition-colors" />
              <span>View All Neighborhoods</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}