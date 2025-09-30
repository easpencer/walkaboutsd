'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Instagram, Shield, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSuperAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          loginMethod: 'credentials'
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Also set session storage for backward compatibility
        sessionStorage.setItem('adminAuth', 'true')
        sessionStorage.setItem('adminUser', JSON.stringify(data.user))

        // Redirect based on role
        if (data.user.role === 'demo') {
          router.push('/explore') // Demo users go to main site
        } else {
          router.push('/explore') // All users go to main site first
        }
      } else {
        setError('Invalid credentials. Please try again.')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }

    setIsLoading(false)
  }

  const handleInstagramLogin = async () => {
    setIsLoading(true)
    setError('')

    // ONLY Danielle Berkely (WalkAboutSD owner) can login via Instagram
    // In production, this would verify Instagram OAuth against whitelist
    const authorizedUsername = 'walkaboutsd' // Owner's Instagram handle

    // Simulate Instagram OAuth verification
    setTimeout(async () => {
      const simulatedUser = prompt('Demo: Enter Instagram username (use "walkaboutsd" for owner access)')

      if (simulatedUser?.toLowerCase() === authorizedUsername) {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: simulatedUser,
              loginMethod: 'instagram'
            }),
          })

          const data = await response.json()

          if (data.success) {
            sessionStorage.setItem('adminAuth', 'true')
            sessionStorage.setItem('adminUser', JSON.stringify(data.user))
            router.push('/explore') // Redirect to main site
          } else {
            setError('Access Denied: Only the WalkAboutSD owner (Danielle Berkely) can access admin via Instagram.')
            setIsLoading(false)
          }
        } catch (error) {
          setError('An error occurred. Please try again.')
          setIsLoading(false)
        }
      } else {
        setError('Access Denied: Only the WalkAboutSD owner (Danielle Susan Berkely) can access admin via Instagram.')
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Logo size="lg" variant="dark" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Access</h1>
          <p className="text-gray-600">Secure access to platform management</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-white/20">
          {/* Instagram Login */}
          <button
            onClick={handleInstagramLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-3 mb-6 disabled:opacity-50"
          >
            <Instagram className="w-6 h-6" />
            {isLoading ? 'Connecting...' : 'Owner Login (Danielle Berkely)'}
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-gray-300 w-full"></div>
            <div className="bg-white px-4 text-sm text-gray-500">or</div>
            <div className="border-t border-gray-300 w-full"></div>
          </div>

          {/* Super Admin Login */}
          <form onSubmit={handleSuperAdminLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Super Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="admin@walkaboutsd.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-12"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              {isLoading ? 'Authenticating...' : 'Super Admin Login'}
            </button>
          </form>


          {/* Security Note */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Secure Access</p>
                <p>This admin panel is restricted. Only authorized administrators can access the management dashboard.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-primary-600 transition-colors text-sm"
          >
            ← Back to WalkaboutSD
          </Link>
        </div>
      </motion.div>
    </div>
  )
}