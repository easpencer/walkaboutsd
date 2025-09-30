'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  LayoutDashboard, MapPin, Calendar, Users, Settings, LogOut, Menu, X,
  Home, Map, Image, FileText, DollarSign, Shield, ChevronRight
} from 'lucide-react'
import { Logo } from '@/components/Logo'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Hero Editor', href: '/dashboard/content/hero', icon: Image },
  { name: 'Neighborhoods', href: '/dashboard/neighborhoods', icon: MapPin },
  { name: 'Tours & Walks', href: '/dashboard/tours', icon: Map },
  { name: 'Experiences', href: '/dashboard/experiences', icon: Calendar },
  { name: 'Media Library', href: '/dashboard/media', icon: Image },
  { name: 'Content', href: '/dashboard/content', icon: FileText },
  { name: 'Revenue', href: '/dashboard/revenue', icon: DollarSign },
  { name: 'Admin Panel', href: '/admin', icon: Shield },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Get user info from session
    const userData = sessionStorage.getItem('adminUser')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/login', { method: 'DELETE' })
    sessionStorage.removeItem('adminAuth')
    sessionStorage.removeItem('adminUser')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b">
            <Logo size="md" variant="dark" />
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 border-b bg-gray-50">
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-gray-600 capitalize">{user.role}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                WalkAboutSD Management
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Welcome back, {user?.name?.split(' ')[0]}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}