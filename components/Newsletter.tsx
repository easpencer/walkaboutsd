'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, CheckCircle, MapPin, Gift } from 'lucide-react'

const benefits = [
  'Weekly insider tips and hidden gems',
  'Early access to new walking routes',
  'Exclusive discounts on audio guides',
  'Free monthly neighborhood spotlight'
]

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
    setEmail('')
  }

  if (isSubmitted) {
    return (
      <section ref={ref} className="py-20 bg-primary-600">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center text-white"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Welcome to the Adventure!</h2>
            <p className="text-xl text-primary-100 mb-8">
              Check your email for your free La Jolla walking guide and weekly San Diego insider tips.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-primary-200 hover:text-white underline transition-colors"
            >
              Subscribe another email
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-20 bg-primary-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Mail className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
              Get Your Free
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                Walking Guide
              </span>
            </h2>

            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join 5,000+ San Diego explorers and get insider tips, hidden gems, and exclusive walking routes delivered to your inbox.
            </p>
          </div>

          {/* Free Gift Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gift className="w-6 h-6 text-yellow-300" />
              <span className="text-yellow-300 font-semibold text-lg">
                Free Welcome Gift
              </span>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">
              "Hidden Gems of La Jolla" Walking Guide
            </h3>
            <p className="text-primary-100">
              Instant download with secret viewpoints, local photo spots, and insider dining recommendations ($25 value)
            </p>
          </motion.div>

          {/* Email Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2 min-w-[140px] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Get Guide
                    <MapPin className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-primary-100">
                <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* Privacy Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-sm text-primary-200"
          >
            No spam, ever. Unsubscribe anytime. We respect your privacy.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}