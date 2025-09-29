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
  { id: 'experiences', label: 'Experiences', icon: MapPin },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'content', label: 'Content', icon: Camera },
  { id: 'social', label: 'Instagram', icon: Instagram },
  { id: 'revenue', label: 'Revenue', icon: DollarSign },
  { id: 'users', label: 'Users', icon: Users },
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
          {activeTab === 'experiences' && <ExperiencesTab />}
          {activeTab === 'bookings' && <BookingsTab />}
          {activeTab === 'content' && <ContentTab />}
          {activeTab === 'social' && <SocialTab />}
          {activeTab === 'revenue' && <RevenueTab />}
          {activeTab === 'users' && <UsersTab />}
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

function ExperiencesTab() {
  const experiences = [
    { id: 1, title: 'La Jolla Luxury Day', type: 'immersive', price: 299, commission: 15, bookings: 45, revenue: 13455, status: 'active' },
    { id: 2, title: 'Gaslamp After Dark', type: 'adventure', price: 149, commission: 20, bookings: 67, revenue: 9983, status: 'active' },
    { id: 3, title: 'Balboa Park Cultural', type: 'package', price: 249, commission: 18, bookings: 38, revenue: 9462, status: 'active' },
    { id: 4, title: 'Sunset Cliffs Natural', type: 'walkabout', price: 89, commission: 25, bookings: 89, revenue: 7921, status: 'active' },
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
        <h2 className="text-2xl font-bold text-gray-900">Experience Management</h2>
        <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors">
          <Plus className="w-5 h-5" />
          Create New Experience
        </button>
      </div>

      {/* Experience Types */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { type: 'walkabout', label: 'WalkAbout', count: 12, icon: '🚶‍♂️', color: 'bg-blue-100 text-blue-800' },
          { type: 'package', label: 'Package', count: 8, icon: '🎯', color: 'bg-green-100 text-green-800' },
          { type: 'adventure', label: 'Adventure', count: 6, icon: '🌟', color: 'bg-purple-100 text-purple-800' },
          { type: 'immersive', label: 'Immersive', count: 3, icon: '👑', color: 'bg-yellow-100 text-yellow-800' },
        ].map((type) => (
          <div key={type.type} className="glass-card rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{type.icon}</span>
                  <span className="font-medium text-gray-900">{type.label}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{type.count}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${type.color}`}>
                Active
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Experiences Table */}
      <div className="glass-card rounded-2xl border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Experiences</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Experience</th>
                <th className="text-left p-4 font-medium text-gray-900">Type</th>
                <th className="text-left p-4 font-medium text-gray-900">Price</th>
                <th className="text-left p-4 font-medium text-gray-900">Commission</th>
                <th className="text-left p-4 font-medium text-gray-900">Bookings</th>
                <th className="text-left p-4 font-medium text-gray-900">Revenue</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {experiences.map((exp) => (
                <tr key={exp.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{exp.title}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 capitalize">
                      {exp.type}
                    </span>
                  </td>
                  <td className="p-4 font-medium">${exp.price}</td>
                  <td className="p-4 text-green-600 font-medium">{exp.commission}%</td>
                  <td className="p-4">{exp.bookings}</td>
                  <td className="p-4 font-medium">${exp.revenue.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

function BookingsTab() {
  const bookings = [
    { id: 'B001', experience: 'La Jolla Luxury Day', customer: 'Sarah Johnson', email: 'sarah@email.com', date: '2024-03-20', amount: 299, commission: 45, status: 'confirmed' },
    { id: 'B002', experience: 'Gaslamp After Dark', customer: 'Mike Chen', email: 'mike@email.com', date: '2024-03-21', amount: 149, commission: 30, status: 'pending' },
    { id: 'B003', experience: 'Balboa Park Cultural', customer: 'Emma Wilson', email: 'emma@email.com', date: '2024-03-22', amount: 249, commission: 45, status: 'confirmed' },
    { id: 'B004', experience: 'Sunset Cliffs Natural', customer: 'Tom Rodriguez', email: 'tom@email.com', date: '2024-03-23', amount: 89, commission: 22, status: 'confirmed' },
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
        <h2 className="text-2xl font-bold text-gray-900">Booking Management</h2>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Bookings</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Booking Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: '239', color: 'bg-blue-100 text-blue-800' },
          { label: 'This Month', value: '45', color: 'bg-green-100 text-green-800' },
          { label: 'Pending', value: '12', color: 'bg-yellow-100 text-yellow-800' },
          { label: 'Revenue', value: '$12,450', color: 'bg-purple-100 text-purple-800' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-4 border border-white/20">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="glass-card rounded-2xl border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Booking ID</th>
                <th className="text-left p-4 font-medium text-gray-900">Experience</th>
                <th className="text-left p-4 font-medium text-gray-900">Customer</th>
                <th className="text-left p-4 font-medium text-gray-900">Date</th>
                <th className="text-left p-4 font-medium text-gray-900">Amount</th>
                <th className="text-left p-4 font-medium text-gray-900">Commission</th>
                <th className="text-left p-4 font-medium text-gray-900">Status</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-primary-600">{booking.id}</td>
                  <td className="p-4">{booking.experience}</td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{booking.customer}</p>
                      <p className="text-sm text-gray-600">{booking.email}</p>
                    </div>
                  </td>
                  <td className="p-4">{booking.date}</td>
                  <td className="p-4 font-medium">${booking.amount}</td>
                  <td className="p-4 text-green-600 font-medium">${booking.commission}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

function ContentTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
        <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors">
          <Plus className="w-5 h-5" />
          Create Content
        </button>
      </div>

      {/* Content Types */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { type: 'Blog Posts', count: 24, icon: '📝', color: 'bg-blue-100 text-blue-800', route: '/blog' },
          { type: 'Walking Guides', count: 8, icon: '🗺️', color: 'bg-green-100 text-green-800', route: '/guides' },
          { type: 'Photo Gallery', count: 156, icon: '📸', color: 'bg-purple-100 text-purple-800', route: '/gallery' },
          { type: 'Activities', count: 42, icon: '🎯', color: 'bg-orange-100 text-orange-800', route: '/activities' },
        ].map((type) => (
          <div key={type.type} className="glass-card rounded-xl p-6 border border-white/20 hover-lift cursor-pointer">
            <div className="text-center">
              <div className="text-4xl mb-3">{type.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{type.type}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">{type.count}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${type.color}`}>
                Published
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Editor */}
      <div className="glass-card rounded-2xl border border-white/20">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">New Blog Post</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-green-600" />
              </div>
              <span className="font-medium text-gray-900">Upload Photos</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <span className="font-medium text-gray-900">Create Guide</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function RevenueTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Revenue Analytics</h2>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$47,821', change: '+12%', color: 'text-green-600' },
          { label: 'Commission Earned', value: '$8,562', change: '+15%', color: 'text-blue-600' },
          { label: 'Partner Payouts', value: '$39,259', change: '+11%', color: 'text-purple-600' },
          { label: 'Avg Commission', value: '18.5%', change: '+0.3%', color: 'text-orange-600' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-6 border border-white/20">
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className={`text-sm font-medium ${stat.color}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Revenue by Experience Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl border border-white/20">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Revenue by Experience Type</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { type: 'Immersive', revenue: 18450, percentage: 38.6, color: 'bg-yellow-500' },
                { type: 'Adventure', revenue: 14230, percentage: 29.8, color: 'bg-purple-500' },
                { type: 'Package', revenue: 9680, percentage: 20.2, color: 'bg-green-500' },
                { type: 'WalkAbout', revenue: 5461, percentage: 11.4, color: 'bg-blue-500' },
              ].map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`} />
                    <span className="font-medium text-gray-900">{item.type}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${item.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-white/20">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Experiences</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { name: 'La Jolla Luxury Day', revenue: 13455, bookings: 45 },
                { name: 'Gaslamp After Dark', revenue: 9983, bookings: 67 },
                { name: 'Balboa Park Cultural', revenue: 9462, bookings: 38 },
                { name: 'Sunset Cliffs Natural', revenue: 7921, bookings: 89 },
              ].map((exp, index) => (
                <div key={exp.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{exp.name}</p>
                    <p className="text-sm text-gray-600">{exp.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${exp.revenue.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-lg">#{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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