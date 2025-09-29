'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Check,
  Star,
  Download,
  Headphones,
  MapPin,
  Camera,
  Users,
  Clock,
  CreditCard,
  Shield,
  Zap
} from 'lucide-react'

const pricingPlans = [
  {
    id: 'free',
    name: 'Explorer',
    price: 0,
    originalPrice: null,
    popular: false,
    description: 'Perfect for trying out WalkaboutSD',
    features: [
      'Access to 3 free walking routes',
      'Basic neighborhood guides',
      'Photo spot markers',
      'Community forum access',
      'Mobile-friendly maps'
    ],
    limitations: [
      'Limited route selection',
      'No audio guides',
      'No offline maps'
    ],
    cta: 'Start Free',
    color: 'from-gray-600 to-gray-700'
  },
  {
    id: 'premium',
    name: 'Adventure Seeker',
    price: 15,
    originalPrice: 25,
    popular: true,
    description: 'Complete access to San Diego\'s hidden gems',
    features: [
      'All 50+ walking routes & experiences',
      'Professional audio guides with local stories',
      'Offline maps & GPS navigation',
      'Hidden gems & insider tips',
      'Photo challenges & contests',
      'Priority customer support',
      'Monthly new route additions'
    ],
    limitations: [],
    cta: 'Start Adventure',
    color: 'from-blue-600 to-purple-600'
  },
  {
    id: 'vip',
    name: 'Local Insider',
    price: 45,
    originalPrice: 65,
    popular: false,
    description: 'Ultimate San Diego experience with personalization',
    features: [
      'Everything in Adventure Seeker',
      'Personal guide consultation (30 min)',
      'Custom route creation',
      'Private group experiences (up to 6 people)',
      'Professional photo package',
      'Local restaurant reservations',
      'Exclusive VIP events & meetups',
      'Personal concierge support'
    ],
    limitations: [],
    cta: 'Go VIP',
    color: 'from-purple-600 to-pink-600'
  }
]

const paymentMethods = [
  { name: 'Credit Card', icon: CreditCard, supported: true },
  { name: 'PayPal', icon: Shield, supported: true },
  { name: 'Apple Pay', icon: Zap, supported: true },
  { name: 'Google Pay', icon: Zap, supported: true }
]

export function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState('premium')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    // In real app, this would trigger payment flow
    console.log(`Selected plan: ${planId}`)
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="text-blue-600 font-medium">Premium Experiences</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Choose Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Adventure Level
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From free exploration to VIP experiences, we have the perfect plan to help you
            discover San Diego like a local.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center glass rounded-full p-1 border border-white/20">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                billingCycle === 'annual'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Save 30%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group ${
                plan.popular ? 'lg:-mt-4 lg:mb-4' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`glass-card rounded-3xl p-8 border-2 hover-lift h-full ${
                plan.popular
                  ? 'border-blue-300 glow'
                  : selectedPlan === plan.id
                  ? 'border-blue-200'
                  : 'border-white/20'
              }`}>
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    {plan.price === 0 ? (
                      <div className="text-4xl font-bold text-gray-900">Free</div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        {plan.originalPrice && (
                          <span className="text-2xl text-gray-400 line-through">
                            ${billingCycle === 'annual' ? Math.round(plan.originalPrice * 12 * 0.7) : plan.originalPrice}
                          </span>
                        )}
                        <span className="text-4xl font-bold text-gray-900">
                          ${billingCycle === 'annual' ? Math.round(plan.price * 12 * 0.7) : plan.price}
                        </span>
                        <span className="text-gray-600">/{billingCycle === 'annual' ? 'year' : 'month'}</span>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                        : plan.id === 'free'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}

                  {plan.limitations.map((limitation, idx) => (
                    <div key={idx} className="flex items-start gap-3 opacity-60">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500 text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* Special features for premium plans */}
                {plan.id !== 'free' && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>Instant Access</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        <span>30-Day Guarantee</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Payment Methods & Security */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="glass-card rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Secure Payment & Instant Access
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {paymentMethods.map((method) => (
                <div key={method.name} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <method.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <span className="text-sm text-gray-600">{method.name}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>30-Day Money Back</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-green-500" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-500" />
                <span>Cancel Anytime</span>
              </div>
            </div>

            <p className="text-gray-500 text-sm mt-6">
              All payments are processed securely through Stripe. Your information is never stored on our servers.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}