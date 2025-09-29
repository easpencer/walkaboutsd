'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Calendar, Clock, Users, Star, CheckCircle, Award, Shield } from 'lucide-react'
import { BookingModal } from '../../components/BookingModal'

const tours = [
  {
    id: 'la-jolla-coastal',
    title: 'La Jolla Coastal Discovery',
    description: 'Explore sea caves, tide pools, and meet the famous sea lions',
    image: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&q=80',
    duration: '3 hours',
    groupSize: '12 max',
    price: 89,
    rating: 4.9,
    reviews: 342,
    highlights: ['Sea Lion Colony', 'Sunny Jim Cave', 'Tide Pool Exploration', 'Local History'],
    nextAvailable: 'Tomorrow at 9:00 AM',
    difficulty: 'Easy',
    featured: true,
  },
  {
    id: 'balboa-culture',
    title: 'Balboa Park Cultural Journey',
    description: 'Museums, gardens, and Spanish architecture in America\'s largest urban park',
    image: 'https://images.unsplash.com/photo-1591737772640-15070b9f1d33?w=800&q=80',
    duration: '4 hours',
    groupSize: '15 max',
    price: 79,
    rating: 4.8,
    reviews: 289,
    highlights: ['Spanish Village', 'Botanical Building', 'Museum Quarter', 'Rose Garden'],
    nextAvailable: 'Daily at 10:00 AM',
    difficulty: 'Easy',
    featured: true,
  },
  {
    id: 'sunset-cliffs',
    title: 'Sunset Cliffs Golden Hour',
    description: 'Dramatic coastline views and the best sunset spots in San Diego',
    image: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?w=800&q=80',
    duration: '2 hours',
    groupSize: '10 max',
    price: 59,
    rating: 5.0,
    reviews: 156,
    highlights: ['Sunset Views', 'Photography Tips', 'Local Legends', 'Wine & Cheese'],
    nextAvailable: 'Today at 5:30 PM',
    difficulty: 'Easy',
    featured: false,
  },
  {
    id: 'food-tour',
    title: 'Little Italy Food & Culture Walk',
    description: 'Taste authentic Italian cuisine while exploring the neighborhood\'s rich history',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    duration: '3.5 hours',
    groupSize: '12 max',
    price: 119,
    rating: 4.9,
    reviews: 203,
    highlights: ['5 Food Stops', 'Wine Tasting', 'Local Art', 'Farmers Market'],
    nextAvailable: 'Saturday at 11:00 AM',
    difficulty: 'Easy',
    featured: false,
  },
]

const privateOptions = [
  {
    title: 'Custom Private Tours',
    description: 'Design your perfect walking experience',
    price: 'From $299',
    features: [
      'Choose your neighborhoods',
      'Set your own pace',
      'Pick your interests',
      'Professional photographer available',
    ],
  },
  {
    title: 'Corporate Team Building',
    description: 'Walking tours that bring teams together',
    price: 'From $89/person',
    features: [
      'Groups of 10-50',
      'Team challenges included',
      'Lunch options available',
      'Custom branded materials',
    ],
  },
  {
    title: 'School & Educational',
    description: 'Educational walks for students',
    price: 'From $15/student',
    features: [
      'Age-appropriate content',
      'Curriculum aligned',
      'Interactive activities',
      'Teacher resources provided',
    ],
  },
]

export default function ToursPage() {
  const [selectedTour, setSelectedTour] = useState<any>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const handleBookTour = (tour: any) => {
    setSelectedTour({
      ...tour,
      type: 'tour' as const,
      image: tour.image
    })
    setIsBookingOpen(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1920&q=80"
          alt="San Diego Sunset Cliffs Walking Tours"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />

        <div className="relative z-10 h-full flex items-center">
          <div className="container-wide">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 px-4">
              Guided Walking Tours
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto px-4">
              Join our expert local guides for unforgettable walking adventures through San Diego's most fascinating neighborhoods.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-white">TripAdvisor Top Rated</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-white">100% Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Tours */}
      <section className="py-16">
        <div className="container-wide">
          <h2 className="text-3xl font-bold mb-4">Available Tours</h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            Small groups, expert guides, and authentic experiences. All tours include complimentary water and local snacks.
          </p>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {tours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative h-48 sm:h-56 md:h-auto">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover"
                    />
                    {tour.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="md:w-3/5 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-3 sm:gap-0">
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2">{tour.title}</h3>
                        <p className="text-gray-600 mb-4 text-sm sm:text-base">{tour.description}</p>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0">
                        <div className="text-2xl sm:text-3xl font-bold text-primary-600">${tour.price}</div>
                        <div className="text-sm text-gray-500">per person</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{tour.rating}</span>
                        <span className="text-gray-500">({tour.reviews})</span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{tour.duration}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{tour.groupSize}</span>
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">Tour Highlights:</div>
                      <div className="flex flex-wrap gap-2">
                        {tour.highlights.map((highlight, index) => (
                          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t gap-3 sm:gap-0">
                      <div className="text-sm">
                        <span className="text-gray-500">Next available:</span>
                        <div className="font-medium text-green-600">{tour.nextAvailable}</div>
                      </div>
                      <button
                        onClick={() => handleBookTour(tour)}
                        className="btn-primary w-full sm:w-auto justify-center sm:justify-start"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Tours */}
      <section className="py-16 bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-center mb-4">Private & Custom Tours</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Perfect for special occasions, corporate events, or when you want a more personalized experience.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {privateOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <div className="text-2xl font-bold text-primary-600 mb-6">{option.price}</div>

                <ul className="space-y-3 mb-6">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full btn-secondary">
                  Get Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16">
        <div className="container-wide">
          <div className="bg-primary-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose WalkaboutSD?</h2>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold mb-2">Small Groups</h3>
                <p className="text-sm text-gray-600">Maximum 15 people for intimate experiences</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold mb-2">Expert Guides</h3>
                <p className="text-sm text-gray-600">Local experts with years of experience</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold mb-2">Guaranteed</h3>
                <p className="text-sm text-gray-600">100% satisfaction or your money back</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold mb-2">Flexible Booking</h3>
                <p className="text-sm text-gray-600">Free cancellation up to 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false)
          setSelectedTour(null)
        }}
        item={selectedTour}
      />
    </div>
  )
}