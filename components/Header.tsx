'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from './Logo'

const navigation = [
  {
    name: 'Explore',
    href: '/explore',
    submenu: [
      { name: 'La Jolla', href: '/explore/la-jolla' },
      { name: 'Balboa Park', href: '/explore/balboa-park' },
      { name: 'Coronado', href: '/explore/coronado' },
      { name: 'North Park', href: '/explore/north-park' },
      { name: 'Ocean Beach', href: '/explore/ocean-beach' },
      { name: 'All Neighborhoods', href: '/explore' }
    ]
  },
  {
    name: 'Activities',
    href: '/activities',
    submenu: [
      { name: 'Beach Walks', href: '/activities/beach-walks' },
      { name: 'Hiking Trails', href: '/activities/hiking' },
      { name: 'Coffee Tours', href: '/activities/coffee' },
      { name: 'Family-Friendly', href: '/activities/family' },
      { name: 'Dog-Friendly', href: '/activities/dog-friendly' }
    ]
  },
  {
    name: 'Guides',
    href: '/guides',
    submenu: [
      { name: '3-Day Itineraries', href: '/guides/3-day-itineraries' },
      { name: 'Weekend Getaways', href: '/guides/weekend' },
      { name: 'Photography Spots', href: '/guides/photography' },
      { name: 'Local Secrets', href: '/guides/secrets' }
    ]
  },
  { name: 'Experiences', href: '/experiences' },
  { name: 'Tours', href: '/tours' },
  { name: 'Blog', href: '/blog' }
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="group">
            <Logo
              size="md"
              variant={scrolled ? 'dark' : 'light'}
              className="group-hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    pathname?.startsWith(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : scrolled
                      ? 'text-gray-700 hover:text-primary-600'
                      : 'text-white hover:text-primary-200'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.submenu && (
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.submenu && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/admin"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              Admin
            </Link>
            <Link
              href="/tours"
              className="btn-primary"
            >
              Book a Tour
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors ${
              scrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 text-base font-medium rounded-md mx-2 transition-colors ${
                        pathname?.startsWith(item.href)
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md mx-2 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-6 py-4">
                  <Link
                    href="/tours"
                    className="btn-primary w-full justify-center"
                  >
                    Book a Tour
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}