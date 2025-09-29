'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, MapPin, Clock, TrendingUp, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { neighborhoods } from '@/data/neighborhoods'

const popularSearches = [
  { text: 'Beach walks', link: '/explore?filter=beach' },
  { text: 'La Jolla Cove', link: '/explore/la-jolla' },
  { text: 'Sunset views', link: '/explore?filter=sunset' },
  { text: 'Family friendly', link: '/explore?filter=family' },
  { text: 'Dog friendly', link: '/explore?filter=dogs' }
]

const recentSearches = [
  { text: 'Balboa Park museums', link: '/explore/balboa-park' },
  { text: 'North Park breweries', link: '/explore/north-park' },
  { text: 'Ocean Beach pier', link: '/explore/ocean-beach' }
]

export function SearchBar({ variant = 'default' }: { variant?: 'default' | 'hero' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = neighborhoods.filter(n =>
        n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery) {
      router.push(`/explore?search=${encodeURIComponent(searchQuery)}`)
      setIsOpen(false)
      setSearchQuery('')
    }
  }

  const handleResultClick = (neighborhoodId: string) => {
    router.push(`/explore/${neighborhoodId}`)
    setIsOpen(false)
    setSearchQuery('')
  }

  const isHero = variant === 'hero'

  return (
    <div ref={searchRef} className={`relative ${isHero ? 'w-full max-w-2xl mx-auto' : ''}`}>
      <form onSubmit={handleSearch}>
        <div className={`relative ${isHero ? 'group' : ''}`}>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={isHero ? "Search neighborhoods, walks, or activities..." : "Search..."}
            className={`
              w-full pl-12 pr-4 rounded-full border transition-all
              ${isHero
                ? 'py-4 text-lg bg-white/95 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl focus:bg-white'
                : 'py-3 bg-white border-gray-200 shadow-sm hover:shadow-md'
              }
              focus:outline-none focus:ring-2 focus:ring-primary-500
            `}
          />
          <Search className={`absolute left-4 ${isHero ? 'top-5 w-6 h-6' : 'top-3.5 w-5 h-5'} text-gray-400`} />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                inputRef.current?.focus()
              }}
              className={`absolute right-4 ${isHero ? 'top-5' : 'top-3.5'} text-gray-400 hover:text-gray-600`}
            >
              <X className={isHero ? 'w-5 h-5' : 'w-4 h-4'} />
            </button>
          )}
        </div>
      </form>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50
              ${isHero ? 'max-h-[500px]' : 'max-h-[400px]'} overflow-y-auto
            `}
          >
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Neighborhoods
                </h3>
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result.id)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 group-hover:text-primary-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 group-hover:text-primary-600">
                          {result.name}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {result.title} • {result.quickFacts.walkingTime}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            {searchQuery.length === 0 && (
              <>
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          router.push(search.link)
                          setIsOpen(false)
                        }}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                      >
                        {search.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Searches */}
                <div className="p-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Recent Searches
                  </h3>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        router.push(search.link)
                        setIsOpen(false)
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700 group-hover:text-primary-600">
                          {search.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}