import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, Users, Star, TrendingUp, Sun, Dog, Coffee, Mountain, Camera } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Activities & Experiences | WalkaboutSD',
  description: 'Discover curated walking experiences in San Diego. Beach walks, hiking trails, coffee tours, family adventures, and dog-friendly routes.',
}

const activities = [
  {
    id: 'beach-walks',
    title: 'Beach Walks',
    description: 'Stroll along pristine coastlines with ocean views and sea breeze',
    icon: Sun,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    routes: 12,
    duration: '1-3 hours',
    difficulty: 'Easy',
    featured: true,
  },
  {
    id: 'hiking',
    title: 'Hiking Trails',
    description: 'Explore scenic trails through canyons, hills, and nature reserves',
    icon: Mountain,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    routes: 15,
    duration: '2-5 hours',
    difficulty: 'Moderate',
    featured: true,
  },
  {
    id: 'coffee',
    title: 'Coffee Tours',
    description: 'Discover local roasters and cozy cafes in walkable neighborhoods',
    icon: Coffee,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
    routes: 8,
    duration: '2-3 hours',
    difficulty: 'Easy',
    featured: false,
  },
  {
    id: 'family',
    title: 'Family-Friendly',
    description: 'Fun walks for all ages with playgrounds, attractions, and easy paths',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=800&q=80',
    routes: 10,
    duration: '1-2 hours',
    difficulty: 'Easy',
    featured: true,
  },
  {
    id: 'dog-friendly',
    title: 'Dog-Friendly',
    description: 'Leash-up and explore dog beaches, parks, and pet-friendly trails',
    icon: Dog,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
    routes: 9,
    duration: '1-3 hours',
    difficulty: 'Easy',
    featured: false,
  },
  {
    id: 'photography',
    title: 'Photography Spots',
    description: 'Picture-perfect locations for sunset shots and Instagram moments',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
    routes: 11,
    duration: '2-4 hours',
    difficulty: 'Easy',
    featured: false,
  },
]

const popularWalks = [
  {
    id: 1,
    title: 'Sunset Cliffs Coastal Trail',
    activity: 'Beach Walks',
    duration: '1.5 hours',
    distance: '2.5 miles',
    rating: 4.9,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?w=400&q=80',
  },
  {
    id: 2,
    title: 'Torrey Pines State Reserve',
    activity: 'Hiking Trails',
    duration: '2.5 hours',
    distance: '4 miles',
    rating: 4.8,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80',
  },
  {
    id: 3,
    title: 'North Park Coffee Crawl',
    activity: 'Coffee Tours',
    duration: '2 hours',
    distance: '1.5 miles',
    rating: 4.7,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
  },
]

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/80 to-primary-800/80" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container-wide">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Walking Activities & Experiences
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              From sunrise beach strolls to sunset hikes, discover walking experiences tailored to your interests and fitness level.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600">50+</div>
              <div className="text-gray-600">Curated Routes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">6</div>
              <div className="text-gray-600">Activity Types</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">All Levels</div>
              <div className="text-gray-600">Difficulty Options</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">Year-Round</div>
              <div className="text-gray-600">Perfect Weather</div>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Categories */}
      <section className="py-16">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Adventure</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => {
              const Icon = activity.icon
              return (
                <Link
                  key={activity.id}
                  href={`/activities/${activity.id}`}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {activity.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        Popular
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{activity.title}</h3>
                          <p className="text-sm text-white/80">{activity.routes} routes available</p>
                        </div>
                      </div>
                      <p className="text-white/90 mb-4">{activity.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {activity.duration}
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                          {activity.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular Walks */}
      <section className="py-16 bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-center mb-4">Most Popular This Month</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Join thousands of walkers who have discovered these fan-favorite routes
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {popularWalks.map((walk) => (
              <div key={walk.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={walk.image}
                    alt={walk.title}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{walk.rating}</span>
                      <span className="text-xs text-gray-500">({walk.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-sm text-primary-600 font-medium mb-2">{walk.activity}</div>
                  <h3 className="text-xl font-semibold mb-3">{walk.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {walk.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {walk.distance}
                    </span>
                  </div>
                  <button className="mt-4 w-full btn-primary justify-center">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Decide Where to Start?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Take our quick quiz to get personalized walking route recommendations based on your interests and fitness level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-secondary">
              Take the Quiz
            </button>
            <Link href="/explore" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold py-3 px-8 rounded-lg transition-colors inline-block">
              Browse All Routes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}