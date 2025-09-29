'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Users, Car, Bus, Star, ChevronRight, Heart, Share2, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { InteractiveLeafletMap } from '@/components/InteractiveLeafletMap'

interface NeighborhoodData {
  id: string
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
  rating: number
  reviews: number
}

interface Walk {
  id: string
  title: string
  duration: string
  distance: string
  description: string
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  image: string
}

const walks: Walk[] = [
  {
    id: '1',
    title: 'Coastal Discovery Walk',
    duration: '2 hours',
    distance: '3.2 miles',
    description: 'Explore stunning coastline with sea caves and tide pools',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
  },
  {
    id: '2',
    title: 'Historic Village Tour',
    duration: '1.5 hours',
    distance: '2 miles',
    description: 'Discover local history through architecture and landmarks',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=80'
  },
  {
    id: '3',
    title: 'Nature & Wildlife Trail',
    duration: '2.5 hours',
    distance: '4 miles',
    description: 'Encounter local wildlife and native plant species',
    difficulty: 'Moderate',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'
  }
]

export function NeighborhoodPageTemplate({ neighborhood }: { neighborhood: NeighborhoodData }) {
  const [selectedWalk, setSelectedWalk] = useState<Walk | null>(null)
  const [isFavorited, setIsFavorited] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'moderate': return 'text-yellow-600 bg-yellow-100'
      case 'challenging': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src={neighborhood.heroImage}
          alt={neighborhood.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="container-wide pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 text-white/80 mb-4">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">San Diego, California</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                {neighborhood.name}
              </h1>
              <p className="text-xl text-white/90 mb-6 max-w-2xl">
                {neighborhood.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(neighborhood.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                  <span className="text-white ml-2">
                    {neighborhood.rating} ({neighborhood.reviews} reviews)
                  </span>
                </div>
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-white'}`} />
                </button>
                <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-8 bg-gray-50">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <Clock className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold">{neighborhood.quickFacts.walkingTime}</p>
            </div>
            <div className="text-center">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${getDifficultyColor(neighborhood.quickFacts.difficulty)}`}>
                {neighborhood.quickFacts.difficulty}
              </div>
              <p className="text-sm text-gray-600">Difficulty</p>
            </div>
            <div className="text-center">
              <Calendar className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Best Time</p>
              <p className="font-semibold text-sm">{neighborhood.quickFacts.bestTime}</p>
            </div>
            <div className="text-center">
              <Car className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Parking</p>
              <p className="font-semibold text-sm">{neighborhood.quickFacts.parking}</p>
            </div>
            <div className="text-center">
              <Bus className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Transit</p>
              <p className="font-semibold text-sm">{neighborhood.quickFacts.publicTransit}</p>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Kid-Friendly</p>
              <p className="font-semibold">{neighborhood.quickFacts.kidFriendly ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Walks & Highlights */}
            <div className="lg:col-span-2 space-y-12">
              {/* Popular Walks */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Popular Walks</h2>
                <div className="grid gap-6">
                  {walks.map((walk) => (
                    <motion.div
                      key={walk.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => setSelectedWalk(walk)}
                    >
                      <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={walk.image}
                          alt={walk.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{walk.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{walk.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-500">
                            <Clock className="w-4 h-4 inline mr-1" />
                            {walk.duration}
                          </span>
                          <span className="text-gray-500">
                            <MapPin className="w-4 h-4 inline mr-1" />
                            {walk.distance}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(walk.difficulty)}`}>
                            {walk.difficulty}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 self-center" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Neighborhood Highlights</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {neighborhood.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-700">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Map & CTAs */}
            <div className="space-y-8">
              {/* Interactive Map */}
              <div className="sticky top-24">
                <h3 className="text-xl font-semibold mb-4">Explore the Area</h3>
                <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
                  <InteractiveLeafletMap
                    neighborhood={neighborhood.id}
                    className="h-full"
                  />
                </div>

                {/* CTA Buttons */}
                <div className="mt-6 space-y-3">
                  <button className="btn-primary w-full justify-center">
                    Start Walking Tour
                  </button>
                  <button className="btn-secondary w-full justify-center">
                    Download Offline Map
                  </button>
                  <Link
                    href="/tours"
                    className="block text-center py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Book Guided Tour
                  </Link>
                </div>

                {/* Local Tips */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Local Tip</h4>
                  <p className="text-sm text-blue-800">
                    Visit during golden hour (1 hour before sunset) for the best photography opportunities and cooler walking conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Walk Detail Modal */}
      {selectedWalk && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedWalk(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <Image
                src={selectedWalk.image}
                alt={selectedWalk.title}
                fill
                className="object-cover rounded-t-2xl"
              />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">{selectedWalk.title}</h2>
              <p className="text-gray-600 mb-6">{selectedWalk.description}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold">{selectedWalk.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Distance</p>
                  <p className="font-semibold">{selectedWalk.distance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Difficulty</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedWalk.difficulty)}`}>
                    {selectedWalk.difficulty}
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="btn-primary flex-1">Start This Walk</button>
                <button
                  className="btn-secondary flex-1"
                  onClick={() => setSelectedWalk(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}