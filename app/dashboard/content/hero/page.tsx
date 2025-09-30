'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, Image, Video, Eye, EyeOff, MoveUp, MoveDown } from 'lucide-react'

interface HeroSlide {
  id: string
  type: 'image' | 'video'
  src: string
  poster?: string
  title: string
  subtitle: string
  description: string
}

export default function HeroContentEditor() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/content/hero')
      const data = await response.json()
      if (data.success) {
        setSlides(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch slides:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (slide: HeroSlide) => {
    try {
      const isNew = !slides.find(s => s.id === slide.id)
      const response = await fetch('/api/content/hero', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slide)
      })

      if (response.ok) {
        await fetchSlides()
        setEditingSlide(null)
        setIsCreating(false)
      }
    } catch (error) {
      console.error('Failed to save slide:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slide?')) return

    try {
      const response = await fetch(`/api/content/hero?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchSlides()
      }
    } catch (error) {
      console.error('Failed to delete slide:', error)
    }
  }

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...slides]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= slides.length) return

    [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]]
    setSlides(newSlides)
  }

  const SlideForm = ({ slide, onSave, onCancel }: {
    slide: HeroSlide | null
    onSave: (slide: HeroSlide) => void
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState<HeroSlide>(
      slide || {
        id: `slide-${Date.now()}`,
        type: 'image',
        src: '',
        poster: '',
        title: '',
        subtitle: '',
        description: ''
      }
    )

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-6"
      >
        <h3 className="text-lg font-bold mb-4">
          {slide ? 'Edit Slide' : 'Create New Slide'}
        </h3>

        <div className="grid gap-4">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slide Type
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'image' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  formData.type === 'image'
                    ? 'bg-primary-100 border-primary-500 text-primary-700'
                    : 'bg-white border-gray-300'
                }`}
              >
                <Image className="w-5 h-5" />
                Image
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'video' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  formData.type === 'video'
                    ? 'bg-primary-100 border-primary-500 text-primary-700'
                    : 'bg-white border-gray-300'
                }`}
              >
                <Video className="w-5 h-5" />
                Video
              </button>
            </div>
          </div>

          {/* Source URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.type === 'video' ? 'Video URL' : 'Image URL'}
            </label>
            <input
              type="url"
              value={formData.src}
              onChange={(e) => setFormData({ ...formData, src: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://..."
              required
            />
          </div>

          {/* Poster URL (for video) */}
          {formData.type === 'video' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Poster Image URL (optional)
              </label>
              <input
                type="url"
                value={formData.poster}
                onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Discover San Diego"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., One Step at a Time"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Brief description of the slide..."
              required
            />
          </div>

          {/* Preview */}
          {formData.src && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div className="relative h-64 rounded-lg overflow-hidden bg-gray-100">
                {formData.type === 'image' ? (
                  <img
                    src={formData.src}
                    alt={formData.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={formData.src}
                    poster={formData.poster}
                    className="w-full h-full object-cover"
                    muted
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold">{formData.title}</h4>
                  <p className="text-sm">{formData.subtitle}</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => onSave(formData)}
              className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              Save
            </button>
            <button
              onClick={onCancel}
              className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading slides...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hero Content Editor</h1>
        <p className="text-gray-600">Manage the hero carousel slides on the homepage</p>
      </div>

      {/* Add New Button */}
      {!isCreating && !editingSlide && (
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mb-6"
        >
          <Plus className="w-5 h-5" />
          Add New Slide
        </button>
      )}

      {/* Create/Edit Form */}
      {(isCreating || editingSlide) && (
        <SlideForm
          slide={editingSlide}
          onSave={handleSave}
          onCancel={() => {
            setIsCreating(false)
            setEditingSlide(null)
          }}
        />
      )}

      {/* Slides List */}
      <div className="space-y-4">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="flex items-center gap-4 p-4">
              {/* Thumbnail */}
              <div className="w-32 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {slide.type === 'image' ? (
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <Video className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{slide.title}</h3>
                <p className="text-gray-600 text-sm">{slide.subtitle}</p>
                <p className="text-gray-500 text-xs mt-1 line-clamp-1">{slide.description}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => moveSlide(index, 'up')}
                  disabled={index === 0}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MoveUp className="w-5 h-5" />
                </button>
                <button
                  onClick={() => moveSlide(index, 'down')}
                  disabled={index === slides.length - 1}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MoveDown className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setEditingSlide(slide)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(slide.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {slides.length === 0 && !isCreating && (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <p className="text-gray-600 mb-4">No slides yet. Create your first slide to get started.</p>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create First Slide
          </button>
        </div>
      )}
    </div>
  )
}