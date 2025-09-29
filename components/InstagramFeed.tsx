'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Instagram, Heart, MessageCircle, ExternalLink, Camera } from 'lucide-react'

// Demo Instagram posts data - in real app would fetch from Instagram API
const demoInstagramPosts = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1582825770113-3ccbf80ed807?w=400&q=80',
    caption: 'Golden hour magic at La Jolla Cove 🌅 #WalkaboutSD #LaJolla',
    likes: 247,
    comments: 18,
    timestamp: '2h',
    location: 'La Jolla Cove'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1591737772640-15070b9f1d33?w=400&q=80',
    caption: 'Discovering hidden gardens in Balboa Park 🌺 #BalboaPark #HiddenGems',
    likes: 189,
    comments: 12,
    timestamp: '4h',
    location: 'Balboa Park'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=400&q=80',
    caption: 'Perfect morning for a coastal walk 🚶‍♀️ #CoastalVibes #SanDiego',
    likes: 312,
    comments: 24,
    timestamp: '6h',
    location: 'Coronado Beach'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1571894620470-8a1e7a14301c?w=400&q=80',
    caption: 'Street art discoveries in North Park 🎨 #StreetArt #NorthPark',
    likes: 156,
    comments: 8,
    timestamp: '8h',
    location: 'North Park'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80',
    caption: 'Sunset pier vibes at Ocean Beach 🌊 #OceanBeach #SunsetPier',
    likes: 278,
    comments: 15,
    timestamp: '12h',
    location: 'Ocean Beach'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80',
    caption: 'Fresh pasta and harbor views in Little Italy 🍝 #LittleItaly #Foodie',
    likes: 203,
    comments: 19,
    timestamp: '1d',
    location: 'Little Italy'
  }
]

export function InstagramFeed() {
  const [posts, setPosts] = useState(demoInstagramPosts)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Instagram className="w-8 h-8 text-pink-600" />
            <span className="text-pink-600 font-medium text-lg">@WalkaboutSD</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Share Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              Walking Adventures
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join thousands of walkers sharing their discoveries. Tag your photos with #WalkaboutSD
            to be featured in our community gallery and inspire others to explore.
          </p>

          <motion.a
            href="https://instagram.com/walkaboutsd"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Instagram className="w-6 h-6" />
            <span>Follow @WalkaboutSD</span>
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="glass-card rounded-3xl overflow-hidden hover-lift glow-soft border border-white/20">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <Heart className="w-6 h-6" />
                        <span className="font-semibold">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-6 h-6" />
                        <span className="font-semibold">{post.comments}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Instagram Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="glass rounded-full p-2 border border-white/30">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Post Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-pink-600">{post.location}</span>
                    <span className="text-sm text-gray-500">{post.timestamp}</span>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                    {post.caption}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                    </div>

                    <button className="text-pink-600 hover:text-pink-700 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="glass-card rounded-3xl p-12 border border-white/20 max-w-4xl mx-auto">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Camera className="w-10 h-10 text-white" />
            </motion.div>

            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Share Your Adventure?
            </h3>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Every walk has a story. Share yours with our community and help others discover
              the magic of San Diego through your unique perspective.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-3"
              >
                <Camera className="w-6 h-6" />
                Upload Your Photos
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-pink-500 text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300 flex items-center gap-3"
              >
                <Instagram className="w-6 h-6" />
                Tag #WalkaboutSD
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}