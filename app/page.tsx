'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

const backgroundImages = [
  'https://images.unsplash.com/photo-1539650116574-75c0c6d73c7e?w=1920&q=80', // La Jolla Cove
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80', // Sunset over ocean
  'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1920&q=80', // Sunset Cliffs
  'https://images.unsplash.com/photo-1606924962241-d924675d3894?w=1920&q=80', // Coastal views
  'https://images.unsplash.com/photo-1609850048142-73e01df7b2d4?w=1920&q=80', // San Diego skyline
]

export default function ComingSoonPage() {
  const [email, setEmail] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [currentBg, setCurrentBg] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Full Page Background Image with Ken Burns effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBg}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${backgroundImages[currentBg]}')` }}
            />
          </motion.div>
          {/* Sophisticated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Logo - smaller and more subtle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mb-16"
        >
          <Logo size="sm" variant="light" showText={false} />
        </motion.div>

        {/* Elegant Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-thin text-white mb-6 tracking-wider">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="block"
            >
              WALKABOUT
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.4 }}
              className="block text-4xl md:text-5xl lg:text-6xl font-light opacity-90"
            >
              SAN DIEGO
            </motion.span>
          </h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1.5, delay: 1.8 }}
            className="h-[1px] bg-white/50 mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
            className="text-xl md:text-2xl text-white/70 font-extralight tracking-[0.3em] uppercase"
          >
            Coming Soon
          </motion.p>
        </motion.div>

        {/* Minimal CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="mt-20"
        >
          {!showForm ? (
            <motion.button
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full" />
              <div className="relative px-12 py-4 text-white font-light tracking-wider uppercase text-sm">
                Be the First
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border border-white/30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          ) : (
            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSubscribed(true)
                    setTimeout(() => {
                      setShowForm(false)
                      setSubscribed(false)
                      setEmail('')
                    }, 3000)
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="px-8 py-4 bg-white/5 backdrop-blur-md text-white placeholder-white/40 border border-white/20 rounded-full focus:outline-none focus:bg-white/10 focus:border-white/40 transition-all text-center font-light"
                    required
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full hover:bg-white/20 transition-all font-light tracking-wider uppercase text-sm"
                  >
                    Notify Me
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-12 py-4 text-white/90 font-light tracking-wider text-center"
                >
                  Welcome to the Journey
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Instagram - bottom left, very subtle */}
        <motion.a
          href="https://instagram.com/walkaboutsd"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="absolute bottom-8 left-8 text-white/50 hover:text-white transition-colors"
        >
          <Instagram className="w-5 h-5" />
        </motion.a>

        {/* Admin Access - bottom right, extremely subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          whileHover={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 3 }}
          className="absolute bottom-8 right-8"
        >
          <Link
            href="/admin/login"
            className="text-white/20 hover:text-white/40 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}