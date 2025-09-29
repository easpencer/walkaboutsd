'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Clock, Users, Star, Calendar, Car, Bus } from 'lucide-react'

interface NeighborhoodHeroProps {
  neighborhood: {
    name: string
    title: string
    description: string
    heroImage: string
    highlights: string[]
    quickFacts: {
      walkingTime: string
      difficulty: string
      bestTime: string
      parking: string
      publicTransit: string
      kidFriendly: boolean
    }
  }
}

export function NeighborhoodHero({ neighborhood }: NeighborhoodHeroProps) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${neighborhood.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center justify-center text-center px-4 pt-20"
      >
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 text-white border border-white/20">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">San Diego Neighborhood</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight font-serif text-glow">
              {neighborhood.name}
            </h1>
            <p className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 font-medium">
              {neighborhood.title}
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {neighborhood.description}
          </motion.p>

          {/* Quick Facts Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="glass-card rounded-2xl p-4 border border-white/20">
              <Clock className="w-6 h-6 text-blue-400 mb-2 mx-auto" />
              <div className="text-white text-sm font-medium">Walk Time</div>
              <div className="text-white/80 text-xs">{neighborhood.quickFacts.walkingTime}</div>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-white/20">
              <Star className="w-6 h-6 text-yellow-400 mb-2 mx-auto" />
              <div className="text-white text-sm font-medium">Difficulty</div>
              <div className="text-white/80 text-xs">{neighborhood.quickFacts.difficulty}</div>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-white/20">
              <Car className="w-6 h-6 text-green-400 mb-2 mx-auto" />
              <div className="text-white text-sm font-medium">Parking</div>
              <div className="text-white/80 text-xs">Available</div>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-white/20">
              <Users className="w-6 h-6 text-purple-400 mb-2 mx-auto" />
              <div className="text-white text-sm font-medium">Family</div>
              <div className="text-white/80 text-xs">
                {neighborhood.quickFacts.kidFriendly ? 'Kid-Friendly' : 'Adults'}
              </div>
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {neighborhood.highlights.slice(0, 6).map((highlight, index) => (
              <span
                key={index}
                className="glass rounded-full px-4 py-2 text-white text-sm border border-white/20"
              >
                {highlight}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}