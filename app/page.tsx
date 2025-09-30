'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

const backgroundImages = [
  'https://images.unsplash.com/photo-1539650116574-75c0c6d73c7e?w=1920&q=80', // La Jolla Cove
  'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1920&q=80', // Sunset Cliffs
  'https://images.unsplash.com/photo-1580785788792-0e2e3b5c9c0d?w=1920&q=80', // Balboa Park
]

export default function ComingSoonPage() {
  const [email, setEmail] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [currentBg, setCurrentBg] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Full Page Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBg}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImages[currentBg]}')` }}
          />
          {/* Elegant overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        </motion.div>
      </AnimatePresence>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`
            }}
            animate={{
              y: [-30, 30, -30],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <Logo size="xl" variant="light" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8 max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide">
            <span className="text-glow">Something Beautiful</span>
            <br />
            <span className="text-3xl md:text-4xl opacity-90">is coming</span>
          </h1>
        </motion.div>

        {/* Minimal tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-white/80 mb-12 font-light tracking-wider"
        >
          San Diego awaits
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {!showForm ? (
            <>
              <button
                onClick={() => setShowForm(true)}
                className="group px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Request Early Access
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </span>
              </button>

              <a
                href="https://instagram.com/walkaboutsd"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white/5 backdrop-blur-md text-white/80 border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                <Instagram className="w-5 h-5" />
                Follow Journey
              </a>
            </>
          ) : (
            <AnimatePresence>
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
                    }, 3000)
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="px-6 py-3 bg-white/10 backdrop-blur-md text-white placeholder-white/50 border border-white/30 rounded-full focus:outline-none focus:bg-white/20 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full hover:bg-white/30 transition-colors"
                  >
                    Join
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-8 py-3 bg-white/20 backdrop-blur-md text-white border border-green-400/50 rounded-full"
                >
                  ✨ You're on the list
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Admin Access - Very Subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 right-8"
        >
          <Link
            href="/admin/login"
            className="text-white/30 hover:text-white/60 text-xs transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}