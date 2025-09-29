'use client'

import { motion } from 'framer-motion'
import { MapPin, Search, Filter } from 'lucide-react'

export function ExploreHero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-white border border-white/30">
              🗺️ 15+ Unique Neighborhoods
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight font-serif"
          >
            Explore San Diego
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
              Neighborhoods
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            From coastal La Jolla to cultural Balboa Park, discover the unique character and hidden gems of each San Diego neighborhood.
          </motion.p>

          {/* Quick Search */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-lg mx-auto"
          >
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full border border-white/20 p-2">
              <Search className="w-5 h-5 text-white/70 ml-4" />
              <input
                type="text"
                placeholder="Search neighborhoods..."
                className="flex-1 bg-transparent text-white placeholder-white/70 px-4 py-3 focus:outline-none"
              />
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-full transition-colors">
                Explore
              </button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 mt-8 text-white/90"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">15+ Areas</span>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <span className="font-medium">50+ Routes</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              <span className="font-medium">Easy Discovery</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}