'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react'
import { getRelatedNeighborhoods } from '@/data/neighborhoods'

interface RelatedNeighborhoodsProps {
  currentNeighborhood: string
}

export function RelatedNeighborhoods({ currentNeighborhood }: RelatedNeighborhoodsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const relatedNeighborhoods = getRelatedNeighborhoods(currentNeighborhood, 3)

  if (relatedNeighborhoods.length === 0) {
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
            Explore More Neighborhoods
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Continue your San Diego adventure with these equally amazing neighborhoods nearby.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedNeighborhoods.map((neighborhood, index) => (
            <motion.div
              key={neighborhood.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/explore/${neighborhood.id}`}>
                <div className="glass-card rounded-2xl overflow-hidden hover-lift glow-soft border border-white/20 h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${neighborhood.heroImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Rating */}
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
                    <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
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
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-primary-600 font-semibold group"
                      >
                        <span>Explore {neighborhood.name}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                      <span className="text-gray-500 text-sm">
                        {neighborhood.reviews} reviews
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/explore">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
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