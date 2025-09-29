'use client'

import Link from 'next/link'
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter, Youtube } from 'lucide-react'

const footerLinks = {
  explore: [
    { name: 'La Jolla', href: '/explore/la-jolla' },
    { name: 'Balboa Park', href: '/explore/balboa-park' },
    { name: 'Coronado', href: '/explore/coronado' },
    { name: 'North Park', href: '/explore/north-park' },
    { name: 'Ocean Beach', href: '/explore/ocean-beach' },
    { name: 'All Neighborhoods', href: '/explore' }
  ],
  activities: [
    { name: 'Beach Walks', href: '/activities/beach-walks' },
    { name: 'Hiking Trails', href: '/activities/hiking' },
    { name: 'Coffee Tours', href: '/activities/coffee' },
    { name: 'Family-Friendly', href: '/activities/family' },
    { name: 'Dog-Friendly', href: '/activities/dog-friendly' }
  ],
  guides: [
    { name: '3-Day Itineraries', href: '/guides/3-day-itineraries' },
    { name: 'Weekend Getaways', href: '/guides/weekend' },
    { name: 'Photography Spots', href: '/guides/photography' },
    { name: 'Local Secrets', href: '/guides/secrets' },
    { name: 'Audio Guides', href: '/tours/audio' }
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Guides', href: '/guides-team' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Press', href: '/press' }
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Booking Help', href: '/booking-help' },
    { name: 'Cancellation Policy', href: '/cancellation' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ]
}

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/walkaboutsd' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/walkaboutsd' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/walkaboutsd' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/walkaboutsd' }
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-wide">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">WalkaboutSD</span>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Discover San Diego's hidden gems with expert local guides. Authentic neighborhood experiences and unforgettable walking adventures await.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span>hello@walkaboutsd.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span>(619) 555-WALK</span>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                  <span>San Diego, California</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors group"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Explore */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Explore</h3>
                  <ul className="space-y-3">
                    {footerLinks.explore.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-primary-400 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Activities */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Activities</h3>
                  <ul className="space-y-3">
                    {footerLinks.activities.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-primary-400 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Guides */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Guides</h3>
                  <ul className="space-y-3">
                    {footerLinks.guides.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-primary-400 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company & Support */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Company</h3>
                  <ul className="space-y-3 mb-6">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-primary-400 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold mb-4">Support</h3>
                  <ul className="space-y-3">
                    {footerLinks.support.slice(0, 3).map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-primary-400 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Stay in the Loop</h3>
              <p className="text-gray-300">
                Get weekly insider tips and exclusive walking routes delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 min-w-[300px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} WalkaboutSD. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-primary-400 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-primary-400 transition-colors">
                Accessibility
              </Link>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500 text-center md:text-left">
            WalkaboutSD is a locally-owned San Diego business dedicated to sustainable tourism and supporting local communities.
          </div>
        </div>
      </div>
    </footer>
  )
}