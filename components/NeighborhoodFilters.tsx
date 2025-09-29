'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, MapPin, Clock, Users, Star } from 'lucide-react'

const filterOptions = {
  difficulty: [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'challenging', label: 'Challenging' }
  ],
  duration: [
    { value: 'all', label: 'Any Duration' },
    { value: 'short', label: 'Under 1 hour' },
    { value: 'medium', label: '1-2 hours' },
    { value: 'long', label: '2+ hours' }
  ],
  type: [
    { value: 'all', label: 'All Types' },
    { value: 'coastal', label: 'Coastal' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'historic', label: 'Historic' },
    { value: 'nightlife', label: 'Nightlife' },
    { value: 'family', label: 'Family-Friendly' }
  ],
  features: [
    { value: 'parking', label: 'Easy Parking' },
    { value: 'transit', label: 'Public Transit' },
    { value: 'kids', label: 'Kid-Friendly' },
    { value: 'dogs', label: 'Dog-Friendly' },
    { value: 'food', label: 'Great Food Scene' },
    { value: 'shopping', label: 'Shopping' }
  ]
}

export function NeighborhoodFilters() {
  const [activeFilters, setActiveFilters] = useState({
    difficulty: 'all',
    duration: 'all',
    type: 'all',
    features: [] as string[]
  })
  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (category: string, value: string) => {
    if (category === 'features') {
      setActiveFilters(prev => ({
        ...prev,
        features: prev.features.includes(value)
          ? prev.features.filter(f => f !== value)
          : [...prev.features, value]
      }))
    } else {
      setActiveFilters(prev => ({
        ...prev,
        [category]: value
      }))
    }
  }

  const clearAllFilters = () => {
    setActiveFilters({
      difficulty: 'all',
      duration: 'all',
      type: 'all',
      features: []
    })
  }

  const activeFilterCount = Object.values(activeFilters).reduce((count, value) => {
    if (Array.isArray(value)) {
      return count + value.length
    }
    return count + (value !== 'all' ? 1 : 0)
  }, 0)

  return (
    <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="container-wide">
        <div className="py-4">
          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="text-sm text-gray-600">
              Showing 15 neighborhoods
            </div>
          </div>

          {/* Filter Panel */}
          <motion.div
            initial={false}
            animate={{
              height: showFilters ? 'auto' : 0,
              opacity: showFilters ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
              {/* Difficulty */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Difficulty Level
                </h3>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.difficulty.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFilterChange('difficulty', option.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilters.difficulty === option.value
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Walking Time
                </h3>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.duration.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFilterChange('duration', option.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilters.duration === option.value
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Experience Type
                </h3>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.type.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFilterChange('type', option.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilters.type === option.value
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Features & Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.features.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFilterChange('features', option.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilters.features.includes(option.value)
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}