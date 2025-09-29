'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ChevronLeft, ChevronRight, Camera, Heart, Download } from 'lucide-react'

interface PhotoGalleryProps {
  neighborhoodId: string
}

const galleryPhotos = {
  'la-jolla': [
    {
      url: 'https://images.unsplash.com/photo-1582825770113-3ccbf80ed807?w=800&q=80',
      alt: 'La Jolla Cove sunset view',
      caption: 'Golden hour magic at La Jolla Cove',
      photographer: 'Sarah Johnson'
    },
    {
      url: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80',
      alt: 'Sea lions on the beach',
      caption: 'Local wildlife enjoying the sunshine',
      photographer: 'Mike Chen'
    },
    {
      url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      alt: 'Coastal trail view',
      caption: 'Dramatic cliffs and endless ocean views',
      photographer: 'Emily Rodriguez'
    },
    {
      url: 'https://images.unsplash.com/photo-1571894620470-8a1e7a14301c?w=800&q=80',
      alt: 'Tide pools exploration',
      caption: 'Hidden tide pools at low tide',
      photographer: 'David Kim'
    },
    {
      url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      alt: 'Local coffee shop',
      caption: 'Perfect pit stop for morning coffee',
      photographer: 'Lisa Park'
    },
    {
      url: 'https://images.unsplash.com/photo-1591737772640-15070b9f1d33?w=800&q=80',
      alt: 'Ocean overlook',
      caption: 'Breathtaking Pacific panorama',
      photographer: 'Tom Wilson'
    }
  ]
}

export function PhotoGallery({ neighborhoodId }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<{photo: any, index: number} | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const photos = galleryPhotos[neighborhoodId as keyof typeof galleryPhotos] || []

  if (photos.length === 0) {
    return null
  }

  const nextPhoto = () => {
    if (selectedPhoto && selectedPhoto.index < photos.length - 1) {
      setSelectedPhoto({
        photo: photos[selectedPhoto.index + 1],
        index: selectedPhoto.index + 1
      })
    }
  }

  const prevPhoto = () => {
    if (selectedPhoto && selectedPhoto.index > 0) {
      setSelectedPhoto({
        photo: photos[selectedPhoto.index - 1],
        index: selectedPhoto.index - 1
      })
    }
  }

  return (
    <>
      <section ref={ref} className="py-20 bg-gray-50">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Camera className="w-6 h-6 text-primary-600" />
              <span className="text-primary-600 font-medium">Photo Gallery</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">
              Capture the Moments
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what awaits you on this incredible journey through stunning photography from our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer hover-lift"
                onClick={() => setSelectedPhoto({ photo, index })}
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

                {/* Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium line-clamp-2">
                    {photo.caption}
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    by {photo.photographer}
                  </p>
                </div>

                {/* Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="glass rounded-full p-3 border border-white/30">
                    <Camera className="w-6 h-6 text-white" />
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
            className="text-center mt-12"
          >
            <div className="glass-card rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto">
              <Camera className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Share Your Photos
              </h3>
              <p className="text-gray-600 mb-6">
                Tag your walkabout photos with #WalkaboutSD to be featured in our community gallery!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors">
                  Upload Photos
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  View on Instagram
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main Image */}
              <img
                src={selectedPhoto.photo.url}
                alt={selectedPhoto.photo.alt}
                className="w-full h-full object-contain rounded-2xl max-h-[80vh]"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 glass rounded-b-2xl p-6 border-t border-white/20">
                <h3 className="text-white text-xl font-bold mb-2">
                  {selectedPhoto.photo.caption}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-white/80">
                    Photo by {selectedPhoto.photo.photographer}
                  </p>
                  <div className="flex items-center gap-3">
                    <button className="glass rounded-full p-2 border border-white/30 hover:bg-white/10 transition-colors">
                      <Heart className="w-5 h-5 text-white" />
                    </button>
                    <button className="glass rounded-full p-2 border border-white/30 hover:bg-white/10 transition-colors">
                      <Download className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              {selectedPhoto.index > 0 && (
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 glass rounded-full p-3 border border-white/30 hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
              )}

              {selectedPhoto.index < photos.length - 1 && (
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 glass rounded-full p-3 border border-white/30 hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 glass rounded-full p-3 border border-white/30 hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 glass rounded-full px-4 py-2 border border-white/30">
                <span className="text-white text-sm font-medium">
                  {selectedPhoto.index + 1} / {photos.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}