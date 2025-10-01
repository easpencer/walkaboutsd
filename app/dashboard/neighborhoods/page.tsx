'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, Star, MapPin, Clock, TrendingUp, Search } from 'lucide-react'
import { Neighborhood } from '@/data/neighborhoods'

export default function NeighborhoodsManagementPage() {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all')
  const [showEditor, setShowEditor] = useState(false)
  const [editingNeighborhood, setEditingNeighborhood] = useState<Neighborhood | null>(null)

  useEffect(() => {
    fetchNeighborhoods()
  }, [])

  const fetchNeighborhoods = async () => {
    try {
      const response = await fetch('/api/neighborhoods')
      const data = await response.json()
      if (data.success) {
        setNeighborhoods(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch neighborhoods:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (neighborhood: Neighborhood) => {
    setEditingNeighborhood(neighborhood)
    setShowEditor(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this neighborhood?')) return

    try {
      const response = await fetch(`/api/neighborhoods/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (data.success) {
        alert(data.message)
        fetchNeighborhoods()
      }
    } catch (error) {
      console.error('Failed to delete neighborhood:', error)
    }
  }

  const filteredNeighborhoods = neighborhoods.filter(n => {
    const matchesSearch = n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         n.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = filterDifficulty === 'all' || n.quickFacts.difficulty === filterDifficulty
    return matchesSearch && matchesDifficulty
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading neighborhoods...</p>
        </div>
      </div>
    )
  }

  if (showEditor) {
    return (
      <NeighborhoodEditor
        neighborhood={editingNeighborhood}
        onClose={() => {
          setShowEditor(false)
          setEditingNeighborhood(null)
        }}
        onSave={() => {
          setShowEditor(false)
          setEditingNeighborhood(null)
          fetchNeighborhoods()
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Neighborhoods</h1>
          <p className="text-gray-600 mt-1">Manage neighborhood listings and content</p>
        </div>
        <button
          onClick={() => setShowEditor(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Neighborhood
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Neighborhoods', value: neighborhoods.length, icon: MapPin, color: 'text-blue-600' },
          { label: 'Featured', value: neighborhoods.filter(n => n.featured).length, icon: Star, color: 'text-yellow-600' },
          { label: 'Avg Rating', value: (neighborhoods.reduce((acc, n) => acc + n.rating, 0) / neighborhoods.length).toFixed(1), icon: TrendingUp, color: 'text-green-600' },
          { label: 'Total Reviews', value: neighborhoods.reduce((acc, n) => acc + n.reviews, 0), icon: Eye, color: 'text-purple-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search neighborhoods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Challenging">Challenging</option>
          </select>
        </div>
      </div>

      {/* Neighborhoods Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-900">Neighborhood</th>
                <th className="text-left p-4 font-semibold text-gray-900">Difficulty</th>
                <th className="text-left p-4 font-semibold text-gray-900">Walk Time</th>
                <th className="text-left p-4 font-semibold text-gray-900">Rating</th>
                <th className="text-left p-4 font-semibold text-gray-900">Reviews</th>
                <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNeighborhoods.map((neighborhood) => (
                <motion.tr
                  key={neighborhood.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                        <img
                          src={neighborhood.heroImage}
                          alt={neighborhood.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{neighborhood.name}</p>
                        <p className="text-sm text-gray-600">{neighborhood.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      neighborhood.quickFacts.difficulty === 'Easy'
                        ? 'bg-green-100 text-green-800'
                        : neighborhood.quickFacts.difficulty === 'Moderate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {neighborhood.quickFacts.difficulty}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {neighborhood.quickFacts.walkingTime}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{neighborhood.rating}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">{neighborhood.reviews}</td>
                  <td className="p-4">
                    {neighborhood.featured ? (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Featured
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(`/explore/${neighborhood.id}`, '_blank')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleEdit(neighborhood)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(neighborhood.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredNeighborhoods.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No neighborhoods found</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Neighborhood Editor Component
function NeighborhoodEditor({
  neighborhood,
  onClose,
  onSave
}: {
  neighborhood: Neighborhood | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState<Partial<Neighborhood>>(
    neighborhood || {
      name: '',
      title: '',
      description: '',
      heroImage: '',
      highlights: [],
      quickFacts: {
        walkingTime: '',
        difficulty: 'Easy',
        bestTime: '',
        parking: '',
        publicTransit: '',
        kidFriendly: true
      },
      seoKeywords: [],
      rating: 0,
      reviews: 0,
      featured: false
    }
  )
  const [highlightInput, setHighlightInput] = useState('')
  const [keywordInput, setKeywordInput] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = neighborhood
        ? `/api/neighborhoods/${neighborhood.id}`
        : '/api/neighborhoods'
      const method = neighborhood ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      if (data.success) {
        alert(data.message || 'Neighborhood saved successfully')
        onSave()
      }
    } catch (error) {
      console.error('Failed to save neighborhood:', error)
      alert('Failed to save neighborhood')
    } finally {
      setSaving(false)
    }
  }

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData({
        ...formData,
        highlights: [...(formData.highlights || []), highlightInput.trim()]
      })
      setHighlightInput('')
    }
  }

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights?.filter((_, i) => i !== index) || []
    })
  }

  const addKeyword = () => {
    if (keywordInput.trim()) {
      setFormData({
        ...formData,
        seoKeywords: [...(formData.seoKeywords || []), keywordInput.trim()]
      })
      setKeywordInput('')
    }
  }

  const removeKeyword = (index: number) => {
    setFormData({
      ...formData,
      seoKeywords: formData.seoKeywords?.filter((_, i) => i !== index) || []
    })
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {neighborhood ? 'Edit Neighborhood' : 'Add New Neighborhood'}
        </h1>
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image URL *</label>
            <input
              type="url"
              required
              value={formData.heroImage}
              onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-700">Featured Neighborhood</span>
            </label>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Quick Facts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Walking Time</label>
              <input
                type="text"
                value={formData.quickFacts?.walkingTime}
                onChange={(e) => setFormData({
                  ...formData,
                  quickFacts: { ...formData.quickFacts!, walkingTime: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="45-90 minutes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={formData.quickFacts?.difficulty}
                onChange={(e) => setFormData({
                  ...formData,
                  quickFacts: { ...formData.quickFacts!, difficulty: e.target.value as 'Easy' | 'Moderate' | 'Challenging' }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Best Time</label>
              <input
                type="text"
                value={formData.quickFacts?.bestTime}
                onChange={(e) => setFormData({
                  ...formData,
                  quickFacts: { ...formData.quickFacts!, bestTime: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parking Info</label>
              <input
                type="text"
                value={formData.quickFacts?.parking}
                onChange={(e) => setFormData({
                  ...formData,
                  quickFacts: { ...formData.quickFacts!, parking: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Public Transit</label>
              <input
                type="text"
                value={formData.quickFacts?.publicTransit}
                onChange={(e) => setFormData({
                  ...formData,
                  quickFacts: { ...formData.quickFacts!, publicTransit: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.quickFacts?.kidFriendly}
                  onChange={(e) => setFormData({
                    ...formData,
                    quickFacts: { ...formData.quickFacts!, kidFriendly: e.target.checked }
                  })}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">Kid Friendly</span>
              </label>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Highlights</h2>

          <div className="flex gap-2">
            <input
              type="text"
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Add a highlight..."
            />
            <button
              type="button"
              onClick={addHighlight}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            {formData.highlights?.map((highlight, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <span className="flex-1 text-gray-700">{highlight}</span>
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="p-1 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Keywords */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">SEO Keywords</h2>

          <div className="flex gap-2">
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Add a keyword..."
            />
            <button
              type="button"
              onClick={addKeyword}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.seoKeywords?.map((keyword, index) => (
              <div key={index} className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                <span className="text-sm">{keyword}</span>
                <button
                  type="button"
                  onClick={() => removeKeyword(index)}
                  className="p-0.5 hover:bg-blue-100 rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg"
          >
            {saving ? 'Saving...' : 'Save Neighborhood'}
          </button>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Changes are currently saved in-memory only. Connect Supabase to persist data across sessions.
          </p>
        </div>
      </form>
    </div>
  )
}
