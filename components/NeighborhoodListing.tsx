'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { MapPin, Clock, Users, Star, ArrowRight } from 'lucide-react'
import { neighborhoods } from '@/data/neighborhoods'

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

export function NeighborhoodListing() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container-wide">
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
                <div className="glass-card rounded-2xl overflow-hidden hover-lift glow-soft border border-white/20">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${neighborhood.heroImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 border border-white/30">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white font-semibold text-sm">
                          {neighborhood.rating}
                        </span>
                      </div>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{neighborhood.name}</h3>
                      <p className="text-white/90 text-sm">{neighborhood.title}</p>
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
                        <span>{neighborhood.quickFacts.walkingTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{neighborhood.quickFacts.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{neighborhood.reviews} reviews</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-semibold group-hover:text-primary-700 transition-colors flex items-center gap-2">
                        Explore Walks
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        neighborhood.quickFacts.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {neighborhood.quickFacts.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}