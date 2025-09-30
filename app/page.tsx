'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Instagram, Mail, Bell, Sparkles, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

export default function ComingSoonPage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-300 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-200 rounded-full opacity-10 blur-3xl" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i % 3) * 30}%`
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl w-full"
      >
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="lg" variant="dark" />
          </div>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-6 py-2 shadow-lg">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Coming Soon</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              <span className="gradient-text">WalkAboutSD</span>
            </h1>
            <p className="text-xl text-gray-700 mb-2">
              Discover San Diego, One Step at a Time
            </p>
            <p className="text-gray-600 max-w-lg mx-auto">
              We're crafting immersive walking experiences that showcase the best of America's Finest City.
              From hidden coastal gems to vibrant neighborhoods, your next adventure awaits.
            </p>
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="glass-card rounded-xl p-4 text-center">
              <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">50+ Curated Routes</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Guided Experiences</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Local Insights</p>
            </div>
          </motion.div>

          {/* Email Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-8"
          >
            {!subscribed ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubscribed(true)
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for early access"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary justify-center"
                >
                  <Bell className="w-5 h-5" />
                  Notify Me
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
              >
                <p className="text-green-700 font-medium">
                  ✨ Thank you! We'll notify you when we launch.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-gray-600 text-sm">Follow our journey</p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/walkaboutsd"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-full p-3 hover:scale-110 transition-transform"
              >
                <Instagram className="w-6 h-6 text-gray-700" />
              </a>
            </div>
          </motion.div>

          {/* Admin Link (subtle) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-8 text-center"
          >
            <Link
              href="/admin/login"
              className="text-gray-400 hover:text-gray-600 text-xs transition-colors inline-flex items-center gap-1"
            >
              <span>Admin Access</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </div>

        {/* Launch Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-center text-gray-600"
        >
          <p className="text-sm">
            Expected Launch: <span className="font-semibold text-gray-800">Spring 2025</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}