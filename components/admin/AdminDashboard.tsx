'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  DollarSign,
  MapPin,
  Users,
  Settings,
  Instagram,
  CreditCard,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Calendar,
  Camera,
  Star
} from 'lucide-react'

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'walkabouts', label: 'Walkabouts', icon: MapPin },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'social', label: 'Social Media', icon: Instagram },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings }
]

const recentWalkabouts = [
  { id: 1, title: 'La Jolla Coastal Walk', status: 'active', bookings: 42, revenue: 1260 },
  { id: 2, title: 'Balboa Park Cultural Tour', status: 'active', bookings: 38, revenue: 1140 },
  { id: 3, title: 'Coronado Historic Walk', status: 'draft', bookings: 0, revenue: 0 },
  { id: 4, title: 'North Park Brewery Crawl', status: 'active', bookings: 25, revenue: 875 }
]

const stats = [
  { title: 'Total Revenue', value: '$12,450', change: '+12%', icon: DollarSign, color: 'text-green-600' },
  { title: 'Active Walkabouts', value: '15', change: '+3', icon: MapPin, color: 'text-blue-600' },
  { title: 'Total Bookings', value: '342', change: '+18%', icon: Users, color: 'text-purple-600' },
  { title: 'Avg Rating', value: '4.8', change: '+0.2', icon: Star, color: 'text-yellow-600' }
]

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your WalkaboutSD business</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-xl p-1 mb-8 shadow-lg border border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'walkabouts' && <WalkaboutsTab />}
          {activeTab === 'pricing' && <PricingTab />}
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'social' && <SocialTab />}
          {activeTab === 'payments' && <PaymentsTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </AnimatePresence>
      </div>
    </div>
  )
}

function OverviewTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 hover-lift border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Walkabouts</h3>
          <div className="space-y-4">
            {recentWalkabouts.map((walkabout) => (
              <div key={walkabout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-medium text-gray-900">{walkabout.title}</h4>
                  <p className="text-sm text-gray-600">{walkabout.bookings} bookings • ${walkabout.revenue}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  walkabout.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {walkabout.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-200">
              <Plus className="w-8 h-8 text-blue-600" />
              <span className="font-medium text-blue-900">New Walkabout</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-200">
              <Camera className="w-8 h-8 text-purple-600" />
              <span className="font-medium text-purple-900">Upload Photos</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-200">
              <DollarSign className="w-8 h-8 text-green-600" />
              <span className="font-medium text-green-900">Set Pricing</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all duration-200">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <span className="font-medium text-orange-900">View Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function WalkaboutsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Walkabouts</h2>
        <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors">
          <Plus className="w-5 h-5" />
          Create New Walkabout
        </button>
      </div>

      <div className="glass-card rounded-2xl border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Walkabouts</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentWalkabouts.map((walkabout) => (
              <div key={walkabout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{walkabout.title}</h4>
                    <p className="text-sm text-gray-600">{walkabout.bookings} bookings this month</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    walkabout.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {walkabout.status}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PricingTab() {
  const pricingTiers = [
    { name: 'Basic Walk', price: 25, features: ['2-hour guided walk', 'Local insights', 'Photo spots'] },
    { name: 'Premium Experience', price: 45, features: ['3-hour experience', 'Audio guide', 'Food tastings', 'Priority booking'] },
    { name: 'VIP Tour', price: 75, features: ['Private guide', 'Custom route', 'Transportation', 'Professional photos'] }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Pricing Management</h2>
        <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Pricing Tier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingTiers.map((tier, index) => (
          <div key={tier.name} className="glass-card rounded-2xl p-6 border border-white/20 hover-lift">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
              <div className="text-4xl font-bold text-primary-600 mb-1">${tier.price}</div>
              <p className="text-gray-600">per person</p>
            </div>
            <ul className="space-y-3 mb-6">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              Edit Pricing
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function UsersTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      <div className="glass-card rounded-2xl p-6 border border-white/20">
        <p className="text-gray-600">User management features coming soon...</p>
      </div>
    </motion.div>
  )
}

function SocialTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">Social Media Integration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <Instagram className="w-8 h-8 text-pink-600" />
            <h3 className="text-xl font-bold text-gray-900">Instagram</h3>
          </div>
          <p className="text-gray-600 mb-4">Connect your Instagram account to automatically share walkabout photos</p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium">
            Connect Instagram
          </button>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Auto-Post Settings</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-700">Auto-post new walkabouts</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-700">Share customer photos (with permission)</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-700">Post weekly highlights</span>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PaymentsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">Payment Processing</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Stripe Integration</h3>
          <p className="text-gray-600 mb-4">Connect your Stripe account for secure payment processing</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
            Connect Stripe
          </button>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Processing Fee</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="2.9%" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SettingsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      <div className="glass-card rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 mb-6">General Settings</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" defaultValue="WalkaboutSD" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" defaultValue="hello@walkaboutsd.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option>Pacific Time (PT)</option>
              <option>Mountain Time (MT)</option>
              <option>Central Time (CT)</option>
              <option>Eastern Time (ET)</option>
            </select>
          </div>
          <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </motion.div>
  )
}