import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, Star, DollarSign, Calendar, MapPin, Utensils, Camera, Music, Hotel, Train, Bike, Car, Check, ArrowRight, Sparkles, Crown, Zap } from 'lucide-react'
import { experiences } from '@/data/experiences'

export const metadata: Metadata = {
  title: 'WalkAbout Experiences | Complete San Diego Adventures',
  description: 'Curated multi-day adventures combining walking tours, fine dining, entertainment, and accommodations. Your complete San Diego experience, seamlessly planned.',
}

const experienceTypes = [
  {
    id: 'walkabout',
    name: 'WalkAbout',
    description: 'Focused walking experiences with integrated stops',
    icon: '🚶‍♂️',
    color: 'bg-blue-500'
  },
  {
    id: 'package',
    name: 'Full Package',
    description: 'Complete day experiences with dining & activities',
    icon: '🎯',
    color: 'bg-purple-500'
  },
  {
    id: 'adventure',
    name: 'Adventure',
    description: 'Multi-day experiences with accommodations',
    icon: '🌟',
    color: 'bg-orange-500'
  },
  {
    id: 'immersive',
    name: 'Immersive',
    description: 'Deep cultural experiences with expert curation',
    icon: '👑',
    color: 'bg-green-500'
  }
]

const revenueHighlights = [
  { icon: DollarSign, label: 'Partner Commissions', value: '15-30%' },
  { icon: Users, label: 'Avg Group Size', value: '4.2 people' },
  { icon: Star, label: 'Customer Rating', value: '4.8/5' },
  { icon: Calendar, label: 'Bookings/Month', value: '240+' }
]

export default function ExperiencesPage() {
  const featuredExperience = experiences.find(exp => exp.featured) || experiences[0]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />

        <div className="relative z-10 h-full flex items-center">
          <div className="container-wide">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 glass rounded-full px-4 py-2 border border-white/20">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">Complete Experiences</span>
                </div>
                <div className="flex items-center gap-2 glass rounded-full px-4 py-2 border border-white/20">
                  <Crown className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-medium">Seamlessly Integrated</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif">
                <span className="text-glow">WalkAbout</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mt-2">
                  Experiences
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl leading-relaxed">
                Beyond walking tours. Complete adventures combining walks, dining, entertainment, and stays.
                Every detail planned, every moment curated.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="btn-primary text-lg px-8 py-4">
                  <Calendar className="w-6 h-6" />
                  Book Experience
                </button>
                <button className="glass-dark rounded-full px-8 py-4 text-white font-semibold text-lg hover-lift border border-white/20 flex items-center gap-3">
                  <Zap className="w-6 h-6" />
                  Partner With Us
                </button>
              </div>

              {/* Revenue Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {revenueHighlights.map((stat) => (
                  <div key={stat.label} className="glass-card rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-3 text-white">
                      <stat.icon className="w-6 h-6 text-blue-400" />
                      <div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-white/80">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Types */}
      <section className="py-16 bg-gray-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Experience Types</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From quick walkabouts to multi-day adventures, we create seamless experiences that generate revenue through every touchpoint.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experienceTypes.map((type) => (
              <div key={type.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className={`w-16 h-16 ${type.color} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto`}>
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-3">{type.name}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experience */}
      <section className="py-16">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Experience</h2>
            <p className="text-xl text-gray-600">A perfect example of our complete experience model</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="lg:flex">
              <div className="lg:w-1/2 relative h-96 lg:h-auto">
                <Image
                  src={featuredExperience.image}
                  alt={featuredExperience.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-6 left-6 bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold">
                  Featured Experience
                </div>
                <div className="absolute bottom-6 right-6 glass rounded-full px-4 py-2 border border-white/30">
                  <div className="flex items-center gap-2 text-white">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{featuredExperience.rating}</span>
                    <span className="text-white/80">({featuredExperience.reviewCount})</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    {featuredExperience.type.charAt(0).toUpperCase() + featuredExperience.type.slice(1)}
                  </span>
                  <span className="text-gray-500">{featuredExperience.difficulty}</span>
                </div>

                <h3 className="text-3xl font-bold mb-2">{featuredExperience.title}</h3>
                <p className="text-xl text-gray-600 mb-4">{featuredExperience.subtitle}</p>
                <p className="text-gray-700 mb-6 leading-relaxed">{featuredExperience.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{featuredExperience.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{featuredExperience.groupSize.max} max</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">From ${featuredExperience.price.individual}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{featuredExperience.price.commission}% commission</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">What's Included:</h4>
                  <div className="space-y-2">
                    {featuredExperience.includes.slice(0, 4).map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link
                    href={`/experiences/${featuredExperience.id}`}
                    className="btn-primary flex-1 justify-center"
                  >
                    View Full Experience
                  </Link>
                  <button className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                    <Calendar className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Model Overview */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-purple-50">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Revenue Opportunities</h2>
            <p className="text-xl text-gray-600 mb-12">
              Multiple revenue streams through integrated partnerships and bookings
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <Utensils className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Dining Partners</h3>
                <p className="text-gray-600 mb-4">15-25% commission on restaurant bookings</p>
                <div className="text-2xl font-bold text-orange-500">$45-75</div>
                <div className="text-sm text-gray-500">avg per booking</div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <Hotel className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Accommodation</h3>
                <p className="text-gray-600 mb-4">8-15% commission on stays</p>
                <div className="text-2xl font-bold text-blue-500">$25-60</div>
                <div className="text-sm text-gray-500">per night</div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <Music className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Entertainment</h3>
                <p className="text-gray-600 mb-4">15-25% commission on tickets</p>
                <div className="text-2xl font-bold text-purple-500">$12-35</div>
                <div className="text-sm text-gray-500">per ticket</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Experiences Grid */}
      <section className="py-16">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">All Experiences</h2>
              <p className="text-xl text-gray-600">Curated adventures for every interest and occasion</p>
            </div>
            <Link
              href="/admin/experiences"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Admin Dashboard
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {experiences.map((experience) => (
              <div key={experience.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {experience.type.charAt(0).toUpperCase() + experience.type.slice(1)}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    ${experience.price.individual}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{experience.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {experience.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      {experience.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      {experience.price.commission}%
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/experiences/${experience.id}`}
                      className="flex-1 btn-primary justify-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container-wide text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Partner?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join our network of restaurants, hotels, activities, and entertainment venues.
            Earn revenue while providing exceptional experiences to visitors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Become a Partner
            </button>
            <Link href="/admin" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold py-3 px-8 rounded-lg transition-colors inline-block">
              Access Admin Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}