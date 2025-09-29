import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, Star, DollarSign, Calendar, MapPin, Check, ArrowLeft, Heart, Share2, Camera, Utensils, Train } from 'lucide-react'
import { experiences } from '@/data/experiences'

interface ExperiencePageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  return experiences.map((experience) => ({
    id: experience.id,
  }))
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const experience = experiences.find(exp => exp.id === params.id)

  if (!experience) {
    return {
      title: 'Experience Not Found | WalkaboutSD',
    }
  }

  return {
    title: `${experience.title} | WalkaboutSD Experiences`,
    description: experience.description,
    openGraph: {
      title: experience.title,
      description: experience.description,
      images: [experience.image],
    },
  }
}

export default function ExperiencePage({ params }: ExperiencePageProps) {
  const experience = experiences.find(exp => exp.id === params.id)

  if (!experience) {
    notFound()
  }

  const getTypeIcon = () => {
    switch (experience.type) {
      case 'walkabout': return '🚶‍♂️'
      case 'package': return '🎯'
      case 'adventure': return '🌟'
      case 'immersive': return '👑'
      default: return '📍'
    }
  }

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'walk': return '🚶‍♂️'
      case 'trolley': return '🚊'
      case 'bike': return '🚲'
      case 'rideshare': return '🚗'
      case 'ferry': return '⛴️'
      default: return '🚗'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <div className="absolute top-6 left-6 z-20">
          <Link
            href="/experiences"
            className="flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Experiences</span>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 pb-16 text-white">
          <div className="container-wide">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{getTypeIcon()}</span>
              <div className="flex items-center gap-3">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {experience.type.charAt(0).toUpperCase() + experience.type.slice(1)}
                </span>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{experience.rating}</span>
                  <span className="text-white/80">({experience.reviewCount})</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif">{experience.title}</h1>
            <p className="text-2xl text-white/90 mb-6">{experience.subtitle}</p>
            <p className="text-xl max-w-3xl leading-relaxed">{experience.description}</p>
          </div>
        </div>
      </section>

      {/* Quick Info & Booking */}
      <section className="py-8 bg-white shadow-lg sticky top-16 z-40">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{experience.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="font-medium">Up to {experience.groupSize.max} people</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {experience.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span className="font-medium">{experience.price.commission}% commission</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-bold text-primary-600">
                  ${experience.price.individual}
                </div>
                <div className="text-sm text-gray-500">per person</div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="btn-primary px-8">
                  <Calendar className="w-5 h-5" />
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* What's Included */}
              <div>
                <h2 className="text-3xl font-bold mb-6">What's Included</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {experience.includes.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {experience.itinerary.map((item, index) => (
                    <div key={item.id} className="flex gap-6 p-6 bg-gray-50 rounded-xl">
                      <div className="flex-shrink-0 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                          <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {item.duration} min
                          </span>
                          {item.type === 'food' && <Utensils className="w-5 h-5 text-orange-500" />}
                          {item.type === 'transport' && <Train className="w-5 h-5 text-blue-500" />}
                          {item.type === 'activity' && <Camera className="w-5 h-5 text-purple-500" />}
                        </div>
                        <p className="text-gray-600 mb-3">{item.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{item.location.name}</span>
                        </div>
                        {item.partner && (
                          <div className="mt-3 p-3 bg-white rounded-lg border">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{item.partner.name}</div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-sm">{item.partner.rating}</span>
                                  <span className="text-xs text-gray-500">
                                    {'$'.repeat(item.partner.priceLevel)}
                                  </span>
                                </div>
                              </div>
                              {item.cost && (
                                <div className="text-right">
                                  <div className="font-medium">${item.cost.amount}</div>
                                  <div className="text-xs text-green-600">
                                    ${item.cost.commission} commission
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transportation */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Transportation</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {experience.transportation.map((transport, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <span className="text-2xl">{getTransportIcon(transport.type)}</span>
                      <div>
                        <div className="font-medium capitalize">{transport.type.replace('-', ' ')}</div>
                        <div className="text-sm text-gray-600">
                          {transport.duration} min • {transport.included ? 'Included' : `$${transport.cost}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking & Gallery */}
            <div className="space-y-8">
              {/* Photo Gallery */}
              <div>
                <h3 className="text-xl font-bold mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-2 gap-2">
                  {experience.gallery.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${experience.title} ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Pricing Options</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Individual</span>
                    <span className="font-bold">${experience.price.individual}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Couple (2 people)</span>
                    <span className="font-bold">${experience.price.couple}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Group (4+ people)</span>
                    <span className="font-bold">${experience.price.group} pp</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-green-600">
                      <span>Platform Commission</span>
                      <span className="font-bold">{experience.price.commission}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-3">Cancellation Policy</h3>
                <p className="text-sm text-gray-700">{experience.cancellation.policy}</p>
              </div>

              {/* Reviews Preview */}
              <div>
                <h3 className="text-xl font-bold mb-4">Recent Reviews</h3>
                <div className="space-y-4">
                  {[1, 2].map((review) => (
                    <div key={review} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        "Amazing experience! The guide was knowledgeable and the locations were perfect for photos."
                      </p>
                      <div className="text-sm text-gray-500 mt-2">- Sarah M.</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Experiences */}
      <section className="py-16 bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold mb-8">Similar Experiences</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences
              .filter(exp => exp.id !== experience.id && exp.type === experience.type)
              .slice(0, 3)
              .map((relatedExp) => (
                <Link
                  key={relatedExp.id}
                  href={`/experiences/${relatedExp.id}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedExp.image}
                      alt={relatedExp.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{relatedExp.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{relatedExp.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{relatedExp.rating}</span>
                      </div>
                      <div className="font-bold text-primary-600">
                        ${relatedExp.price.individual}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}