'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Play, MapPin, Clock, Users, Sparkles, Camera, Heart } from 'lucide-react'
import Link from 'next/link'

const heroContent = [
  {
    id: 'main',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    title: 'Discover San Diego',
    subtitle: 'One Step at a Time',
    description: 'Experience the magic of America\'s Finest City through immersive walking adventures'
  },
  {
    id: 'sunset-cliffs',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1920&q=80',
    title: 'Sunset Cliffs Natural Park',
    subtitle: 'Dramatic Coastal Bluffs',
    description: 'Walk the rugged clifftops of Point Loma where surfers chase perfect waves below golden sandstone formations'
  },
  {
    id: 'la-jolla-cove',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c7e?w=1920&q=80',
    title: 'La Jolla Cove Marine Sanctuary',
    subtitle: 'California Sea Lions & Snorkeling',
    description: 'Meet playful sea lions, explore crystal-clear tide pools, and snorkel in this protected marine reserve'
  },
  {
    id: 'balboa-park',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1580785788792-0e2e3b5c9c0d?w=1920&q=80',
    title: 'Balboa Park Cultural District',
    subtitle: '17 Museums & Spanish Colonial Architecture',
    description: 'America\'s largest urban cultural park featuring world-renowned museums, botanical gardens, and the famous San Diego Zoo'
  },
  {
    id: 'gaslamp-quarter',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=1920&q=80',
    title: 'Historic Gaslamp Quarter',
    subtitle: '16 Blocks of Victorian Heritage',
    description: 'Explore preserved 19th-century architecture, rooftop bars, craft breweries, and award-winning restaurants in downtown\'s entertainment heart'
  },
  {
    id: 'coronado-beach',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1920&q=80',
    title: 'Coronado Beach Promenade',
    subtitle: 'Hotel del Coronado & Golden Sand',
    description: 'Walk along one of America\'s best beaches past the iconic Victorian Hotel del Coronado, where Marilyn Monroe filmed "Some Like It Hot"'
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
    }, 6000)

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
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${currentContent.src}')`,
                willChange: 'transform'
              }}
            />
          )}
        </AnimatePresence>

        {/* Enhanced mobile-friendly overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

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
        className="relative z-10 h-full flex items-center justify-center text-center px-4 pt-24 pb-16 md:pt-32"
      >
        <div className="max-w-6xl mx-auto w-full">
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-6 md:mb-8"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 md:px-6 md:py-3 text-white border border-white/20 hover-glow text-sm md:text-base">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" />
              <span className="font-medium">America's Finest City Awaits</span>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse-glow" />
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
              className="mb-6 md:mb-8"
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 md:mb-6 tracking-tight font-serif leading-tight">
                <span className="text-glow drop-shadow-2xl">{currentContent.title}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mt-1 md:mt-2 drop-shadow-lg">
                  {currentContent.subtitle}
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto font-light leading-relaxed px-4 drop-shadow-lg"
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
            className="flex flex-wrap justify-center gap-3 md:gap-6 mb-8 md:mb-12 px-4"
          >
            {[
              { icon: MapPin, label: '15+ Neighborhoods', value: '15+' },
              { icon: Clock, label: '50+ Guided Routes', value: '50+' },
              { icon: Users, label: '10k+ Happy Walkers', value: '10k+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card rounded-xl md:rounded-2xl px-3 py-3 md:px-6 md:py-4 hover-glow group cursor-pointer"
              >
                <div className="flex items-center gap-2 md:gap-3 text-white">
                  <div className="w-8 h-8 md:w-12 md:h-12 glass rounded-full flex items-center justify-center group-hover:glow transition-all duration-300">
                    <stat.icon className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg md:text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs md:text-sm text-white/80 leading-tight">{stat.label}</div>
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
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-8 md:mb-12 px-4"
          >
            <Link
              href="/explore"
              className="group relative overflow-hidden w-full sm:w-auto"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass rounded-full px-6 py-3 md:px-8 md:py-4 text-white font-semibold text-base md:text-lg hover-lift border border-white/30 relative z-10 w-full sm:w-auto"
              >
                <div className="flex items-center justify-center gap-2 md:gap-3">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                  <span>Start Your Adventure</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </Link>

            {currentContent.type === 'video' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleVideoToggle}
                className="glass-dark rounded-full px-6 py-3 md:px-8 md:py-4 text-white font-semibold text-base md:text-lg hover-lift border border-white/20 flex items-center justify-center gap-2 md:gap-3 w-full sm:w-auto"
              >
                <Play className={`w-5 h-5 md:w-6 md:h-6 transition-transform ${!isPlaying ? '' : 'rotate-0'}`} />
                <span className="hidden sm:inline">{isPlaying ? 'Pause Video' : 'Play Video'}</span>
                <span className="sm:hidden">{isPlaying ? 'Pause' : 'Play'}</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-dark rounded-full px-6 py-3 md:px-8 md:py-4 text-white font-semibold text-base md:text-lg hover-lift border border-white/20 flex items-center justify-center gap-2 md:gap-3 w-full sm:w-auto"
            >
              <Camera className="w-5 h-5 md:w-6 md:h-6" />
              <span className="hidden sm:inline">View Gallery</span>
              <span className="sm:hidden">Gallery</span>
            </motion.button>
          </motion.div>

          {/* Featured Experience Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="max-w-lg mx-auto px-4"
          >
            <div className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-8 hover-lift group cursor-pointer border border-white/20">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <Heart className="w-4 h-4 md:w-6 md:h-6 text-red-400" />
                <span className="text-white/80 font-medium text-sm md:text-base">Today's Featured Experience</span>
              </div>
              <h3 className="text-white font-bold text-lg md:text-xl mb-2 md:mb-3 group-hover:text-blue-300 transition-colors">
                {heroContent[1].title}
              </h3>
              <p className="text-white/70 text-sm md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-3">
                {heroContent[1].description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Starting at $25</span>
                <span className="text-blue-300 font-medium group-hover:text-white transition-colors text-sm">
                  Learn More →
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>


      {/* Elegant Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 md:gap-2"
        >
          <span className="text-xs md:text-sm font-medium text-glow">Discover More</span>
          <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="w-0.5 h-2 md:w-1 md:h-3 bg-white/60 rounded-full mt-1 md:mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}