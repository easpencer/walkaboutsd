'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Clock, MapPin, Users, Star, Play, Camera, ArrowRight } from 'lucide-react'
import { getWalksByNeighborhood } from '@/data/walks'

interface WalkRoutesProps {
  neighborhoodId: string
}

export function WalkRoutes({ neighborhoodId }: WalkRoutesProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const walks = getWalksByNeighborhood(neighborhoodId)

  if (walks.length === 0) {
    return null
  }

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">
            Walking Routes & Experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully crafted routes, each offering unique perspectives and hidden discoveries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {walks.map((walk, index) => (
            <motion.div
              key={walk.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/explore`}>
                <div className="glass-card rounded-3xl overflow-hidden hover-lift glow-soft border border-white/20 h-full">
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${walk.photos[0]?.url})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Floating Elements */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {walk.featured && (
                        <span className="glass rounded-full px-3 py-1 text-white text-xs font-medium border border-white/30">
                          Featured
                        </span>
                      )}
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        walk.difficulty === 'Easy'
                          ? 'bg-green-500 text-white'
                          : walk.difficulty === 'Moderate'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}>
                        {walk.difficulty}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 border border-white/30">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white font-semibold text-sm">
                          {walk.rating}
                        </span>
                      </div>
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 glass rounded-full flex items-center justify-center border border-white/30"
                      >
                        <Play className="w-6 h-6 text-white ml-1" />
                      </motion.div>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1 text-glow">
                        {walk.title}
                      </h3>
                      <div className="flex items-center gap-4 text-white/80 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{walk.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{walk.distance} miles</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {walk.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {walk.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 glass rounded-full px-3 py-2 border border-white/20">
                          <span className="text-xl">{highlight.icon}</span>
                          <span className="text-gray-700 text-sm font-medium">{highlight.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{walk.reviews} reviews</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Camera className="w-4 h-4" />
                          <span>{walk.waypoints.length} stops</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-primary-600 font-semibold group"
                      >
                        <span>Start Walking</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                      <span className="text-gray-500 text-sm">Free Experience</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA for more walks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/explore">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="inline-flex items-center gap-3 glass rounded-full px-8 py-4 text-lg font-semibold text-gray-700 hover-glow border border-white/30 group"
            >
              <MapPin className="w-6 h-6 group-hover:text-blue-600 transition-colors" />
              <span>Explore All Walks</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}