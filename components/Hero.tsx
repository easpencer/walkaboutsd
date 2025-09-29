'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Play, MapPin, Clock, Users } from 'lucide-react'
import Link from 'next/link'

const heroImages = [
  {
    url: '/images/hero-la-jolla.jpg',
    alt: 'La Jolla Cove scenic coastline',
    title: 'La Jolla Coastal Walk'
  },
  {
    url: '/images/hero-balboa-park.jpg',
    alt: 'Balboa Park architecture and gardens',
    title: 'Balboa Park Discovery'
  },
  {
    url: '/images/hero-coronado.jpg',
    alt: 'Coronado Beach and Hotel del Coronado',
    title: 'Coronado Beach Stroll'
  }
]

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentImage === index ? 1 : 0,
              scale: currentImage === index ? 1.05 : 1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%), url('https://images.unsplash.com/photo-1579463472563-d6926e62aa8b?w=1920&q=80')`
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center justify-center text-center px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-white border border-white/30">
              🌊 America's Finest City
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight font-serif"
          >
            Discover San Diego
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              One Step at a Time
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-light"
          >
            Expert local guides reveal hidden gems, secret viewpoints, and authentic experiences in San Diego's most beautiful neighborhoods.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 mb-8 text-white/90"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">15+ Neighborhoods</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Clock className="w-5 h-5" />
              <span className="font-medium">50+ Guided Routes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5" />
              <span className="font-medium">10k+ Happy Walkers</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/explore"
              className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-full transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Exploring
              <MapPin className="w-5 h-5" />
            </Link>

            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-full transition-all duration-300 inline-flex items-center gap-2 backdrop-blur-sm">
              <Play className="w-5 h-5" />
              Watch Preview
            </button>
          </motion.div>

          {/* Featured Walk Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12"
          >
            <p className="text-white/70 text-sm mb-4">Featured Walk:</p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-md mx-auto">
              <h3 className="text-white font-semibold text-lg mb-2">
                {heroImages[currentImage].title}
              </h3>
              <p className="text-white/80 text-sm mb-4">
                A perfect introduction to San Diego's coastal beauty and neighborhood charm.
              </p>
              <Link
                href="/explore/la-jolla"
                className="text-white hover:text-blue-300 text-sm font-medium inline-flex items-center gap-2 transition-colors"
              >
                Learn More →
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm font-medium">Explore Below</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Image Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentImage === index
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}