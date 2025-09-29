'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown, Play, MapPin, Clock, Users, Sparkles, Camera, Heart } from 'lucide-react'
import Link from 'next/link'

const heroContent = [
  {
    id: 'main',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1920&q=80',
    poster: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1920&q=80',
    title: 'Discover San Diego',
    subtitle: 'One Step at a Time',
    description: 'Experience the magic of America\'s Finest City through immersive walking adventures'
  },
  {
    id: 'la-jolla',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1582825770113-3ccbf80ed807?w=1920&q=80',
    title: 'La Jolla Coastal Walk',
    subtitle: 'Where Sea Lions Play',
    description: 'Stunning coastline meets marine wildlife in this unforgettable coastal journey'
  },
  {
    id: 'balboa',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1591737772640-15070b9f1d33?w=1920&q=80',
    title: 'Balboa Park Discovery',
    subtitle: 'Cultural Heart of the City',
    description: 'Museums, gardens, and Spanish architecture in America\'s largest urban cultural park'
  }
]

export function EnhancedHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [])

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const currentContent = heroContent[currentSlide]

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Media */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 -z-10"
      >
        <AnimatePresence mode="wait">
          {currentContent.type === 'video' ? (
            <motion.video
              key="video"
              ref={videoRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="video-background"
              autoPlay
              muted
              loop
              playsInline
              poster={currentContent.poster}
            >
              <source src={currentContent.src} type="video/mp4" />
            </motion.video>
          ) : (
            <motion.div
              key={currentContent.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${currentContent.src}')`
              }}
            />
          )}
        </AnimatePresence>

        {/* Elegant Overlay */}
        <div className="video-overlay" />

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center justify-center text-center px-4"
      >
        <div className="max-w-5xl mx-auto">
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 text-white border border-white/20 hover-glow">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="font-medium">America's Finest City Awaits</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-glow" />
            </div>
          </motion.div>

          {/* Main Title with Animated Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentContent.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight font-serif">
                <span className="text-glow">{currentContent.title}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mt-2">
                  {currentContent.subtitle}
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed"
              >
                {currentContent.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {[
              { icon: MapPin, label: '15+ Neighborhoods', value: '15+' },
              { icon: Clock, label: '50+ Guided Routes', value: '50+' },
              { icon: Users, label: '10k+ Happy Walkers', value: '10k+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card rounded-2xl px-6 py-4 hover-glow group cursor-pointer"
              >
                <div className="flex items-center gap-3 text-white">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:glow transition-all duration-300">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <Link
              href="/explore"
              className="group relative overflow-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="glass rounded-full px-8 py-4 text-white font-semibold text-lg hover-lift border border-white/30 relative z-10"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6" />
                  <span>Start Your Adventure</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </Link>

            {currentContent.type === 'video' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleVideoToggle}
                className="glass-dark rounded-full px-8 py-4 text-white font-semibold text-lg hover-lift border border-white/20 flex items-center gap-3"
              >
                <Play className={`w-6 h-6 transition-transform ${!isPlaying ? '' : 'rotate-0'}`} />
                <span>{isPlaying ? 'Pause Video' : 'Play Video'}</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="glass-dark rounded-full px-8 py-4 text-white font-semibold text-lg hover-lift border border-white/20 flex items-center gap-3"
            >
              <Camera className="w-6 h-6" />
              <span>View Gallery</span>
            </motion.button>
          </motion.div>

          {/* Featured Experience Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="max-w-md mx-auto"
          >
            <div className="glass-card rounded-3xl p-8 hover-lift group cursor-pointer border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-red-400" />
                <span className="text-white/80 font-medium">Today's Featured Experience</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-3 group-hover:text-blue-300 transition-colors">
                {heroContent[1].title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                A perfect introduction to San Diego's coastal beauty and marine wildlife encounters.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Starting at $25</span>
                <span className="text-blue-300 font-medium group-hover:text-white transition-colors">
                  Learn More →
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-white scale-125 glow'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm font-medium text-glow">Discover More</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}