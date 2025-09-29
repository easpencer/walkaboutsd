'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Car, Bus, Clock, Calendar, MapPin, Users, Info, CheckCircle } from 'lucide-react'

interface PracticalInfoProps {
  neighborhood: {
    name: string
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

export function PracticalInfo({ neighborhood }: PracticalInfoProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Info className="w-6 h-6 text-primary-600" />
            <span className="text-primary-600 font-medium">Practical Information</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">
            Plan Your Visit
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know for the perfect {neighborhood.name} walking experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Getting There */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary-600" />
              Getting There
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">By Car</h4>
                  <p className="text-gray-600 mb-2">{neighborhood.quickFacts.parking}</p>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>GPS coordinates provided</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Bus className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Public Transit</h4>
                  <p className="text-gray-600 mb-2">{neighborhood.quickFacts.publicTransit}</p>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Transit app directions included</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* When to Visit */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card rounded-3xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary-600" />
              When to Visit
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Best Time</h4>
                  <p className="text-gray-600 mb-2">{neighborhood.quickFacts.bestTime}</p>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Optimal lighting for photos</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                  <p className="text-gray-600 mb-2">{neighborhood.quickFacts.walkingTime}</p>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Self-paced experience</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glass-card rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">
              {neighborhood.quickFacts.kidFriendly ? 'Family-Friendly' : 'Adult Experience'}
            </h4>
            <p className="text-gray-600 text-sm">
              {neighborhood.quickFacts.kidFriendly
                ? 'Perfect for families with children of all ages'
                : 'Designed for adult walkers and mature teens'
              }
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">What's Included</h4>
            <p className="text-gray-600 text-sm">
              GPS route, audio guide, local tips, and photo spots marked on your map
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">What to Bring</h4>
            <p className="text-gray-600 text-sm">
              Comfortable shoes, water bottle, phone for audio guide, and camera for memories
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}