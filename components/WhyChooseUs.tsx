'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Users, Clock, Star, Smartphone, Heart } from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Local Expert Guides',
    description: 'Our guides are San Diego natives who know every hidden gem, local secret, and best photo spot in the city.',
    stats: '10+ Years Experience'
  },
  {
    icon: MapPin,
    title: 'Authentic Experiences',
    description: 'Skip the tourist traps. We take you where locals go for the real San Diego experience.',
    stats: '15+ Neighborhoods'
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Self-paced walks or guided tours available 7 days a week. Start when it works for you.',
    stats: '50+ Time Slots/Week'
  },
  {
    icon: Smartphone,
    title: 'Digital Audio Guides',
    description: 'High-quality audio narration with GPS triggers for seamless, hands-free exploration.',
    stats: 'Works Offline'
  },
  {
    icon: Star,
    title: 'Highly Rated',
    description: 'Join thousands of happy walkers who\'ve discovered San Diego\'s best-kept secrets with us.',
    stats: '4.8/5 Average Rating'
  },
  {
    icon: Heart,
    title: 'Satisfaction Guaranteed',
    description: 'Not completely satisfied? We\'ll make it right or refund your money. Your happiness is our priority.',
    stats: '100% Money Back'
  }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'San Francisco, CA',
    text: 'The La Jolla walk was absolutely perfect! Our guide showed us spots I never would have found on my own.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b8-7cd9?w=100&q=80'
  },
  {
    name: 'Mike Chen',
    location: 'Los Angeles, CA',
    text: 'Best way to explore San Diego. The audio guide was so informative and the routes were perfectly planned.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
  },
  {
    name: 'Emily Rodriguez',
    location: 'Phoenix, AZ',
    text: 'WalkaboutSD made our vacation special. We saw amazing places and learned so much about the city\'s history.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
}

export function WhyChooseUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Why Choose
            <span className="block gradient-text">WalkaboutSD?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another tour company. We're passionate locals who want to share the San Diego we love with you.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <span className="text-sm font-semibold text-primary-600">
                    {feature.stats}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                10k+
              </div>
              <div className="text-gray-600 font-medium">Happy Walkers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                50+
              </div>
              <div className="text-gray-600 font-medium">Guided Routes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                4.8
              </div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                15+
              </div>
              <div className="text-gray-600 font-medium">Neighborhoods</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            What Our Walkers Say
          </h3>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Discover San Diego?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied walkers who've discovered San Diego's hidden gems with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg py-4 px-8">
                Start Your Adventure
                <MapPin className="w-5 h-5" />
              </button>
              <button className="btn-secondary text-lg py-4 px-8">
                View Sample Route
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}