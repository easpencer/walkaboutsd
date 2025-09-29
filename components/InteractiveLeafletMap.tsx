'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { MapPin, Navigation, Layers, Camera, Play, Star } from 'lucide-react'

// Dynamic import to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

const Polyline = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polyline),
  { ssr: false }
)

interface MapProps {
  walkRoute?: {
    id: string
    title: string
    waypoints: Array<{
      id: string
      title: string
      description: string
      type: string
      coordinates?: [number, number]
    }>
  }
  neighborhood?: string
  center?: [number, number]
  zoom?: number
  className?: string
}

// San Diego coordinates
const DEFAULT_CENTER: [number, number] = [32.7157, -117.1611]

// Demo walking route coordinates
const demoRoute = [
  [32.8507, -117.2713], // La Jolla Cove
  [32.8511, -117.2725], // Scripps Park
  [32.8485, -117.2755], // Coast Walk Trail
  [32.8465, -117.2770], // Shell Beach
]

const mapStyles = [
  {
    id: 'streets',
    name: 'Streets',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  {
    id: 'satellite',
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
  },
  {
    id: 'terrain',
    name: 'Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://opentopomap.org/">OpenTopoMap</a>'
  }
]

export function InteractiveLeafletMap({
  walkRoute,
  neighborhood = 'la-jolla',
  center = DEFAULT_CENTER,
  zoom = 13,
  className = ''
}: MapProps) {
  const [mapInstance, setMapInstance] = useState<any | null>(null)
  const [activeStyle, setActiveStyle] = useState('streets')
  const [activeWaypoint, setActiveWaypoint] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Custom icons
  const createCustomIcon = (type: string, isActive: boolean = false) => {
    if (typeof window === 'undefined') return null

    const L = require('leaflet')

    const iconHtml = `
      <div class="custom-marker ${isActive ? 'active' : ''}" style="
        width: 40px;
        height: 40px;
        background: ${isActive ? '#3b82f6' : '#6b7280'};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: ${isActive ? 'scale(1.2)' : 'scale(1)'};
        transition: all 0.3s ease;
      ">
        <span style="color: white; font-weight: bold; font-size: 14px;">
          ${getWaypointIcon(type)}
        </span>
      </div>
    `

    return L.divIcon({
      html: iconHtml,
      className: 'custom-div-icon',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20]
    })
  }

  const getWaypointIcon = (type: string) => {
    switch (type) {
      case 'beach': return '🏖️'
      case 'park': return '🌳'
      case 'viewpoint': return '👁️'
      case 'cafe': return '☕'
      case 'historic': return '🏛️'
      case 'art': return '🎨'
      default: return '📍'
    }
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className={`${className} bg-gray-100 rounded-2xl flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading interactive map...</p>
        </div>
      </div>
    )
  }

  const waypoints = walkRoute?.waypoints || [
    {
      id: '1',
      title: 'La Jolla Cove',
      description: 'Start your journey at this iconic beach known for crystal-clear waters.',
      type: 'beach',
      coordinates: [32.8507, -117.2713] as [number, number]
    },
    {
      id: '2',
      title: 'Scripps Park',
      description: 'Beautiful clifftop park with panoramic ocean views.',
      type: 'park',
      coordinates: [32.8511, -117.2725] as [number, number]
    },
    {
      id: '3',
      title: 'Coast Walk Trail',
      description: 'Scenic walking path along dramatic cliffs.',
      type: 'viewpoint',
      coordinates: [32.8485, -117.2755] as [number, number]
    },
    {
      id: '4',
      title: 'Shell Beach',
      description: 'Hidden gem perfect for tide pooling.',
      type: 'beach',
      coordinates: [32.8465, -117.2770] as [number, number]
    }
  ]

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-xl ${className}`}>
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-[1000] space-y-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-xl p-2 border border-white/20"
        >
          <div className="flex flex-col gap-1">
            {mapStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setActiveStyle(style.id)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeStyle === style.id
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-700 hover:bg-white/50'
                }`}
              >
                {style.name}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-xl p-3 border border-white/20"
        >
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Navigation className="w-4 h-4" />
            <span>Interactive Route</span>
          </div>
        </motion.div>
      </div>

      {/* Waypoint Info Panel */}
      {activeWaypoint !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-4 left-4 right-4 z-[1000] glass rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">{getWaypointIcon(waypoints[activeWaypoint].type)}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">
                {waypoints[activeWaypoint].title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {waypoints[activeWaypoint].description}
              </p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors">
                  <Camera className="w-4 h-4" />
                  <span>Photo Tips</span>
                </button>
                <button className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors">
                  <Play className="w-4 h-4" />
                  <span>Audio Guide</span>
                </button>
              </div>
            </div>
            <button
              onClick={() => setActiveWaypoint(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}

      {/* Map */}
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
        ref={setMapInstance}
      >
        <TileLayer
          url={mapStyles.find(s => s.id === activeStyle)?.url || mapStyles[0].url}
          attribution={mapStyles.find(s => s.id === activeStyle)?.attribution || mapStyles[0].attribution}
        />

        {/* Walking Route Polyline */}
        <Polyline
          positions={demoRoute}
          pathOptions={{
            color: '#3b82f6',
            weight: 4,
            opacity: 0.8,
            dashArray: '10, 5'
          }}
        />

        {/* Waypoint Markers */}
        {waypoints.map((waypoint, index) => {
          if (!waypoint.coordinates) return null

          return (
            <Marker
              key={waypoint.id}
              position={waypoint.coordinates}
              icon={createCustomIcon(waypoint.type, activeWaypoint === index)}
              eventHandlers={{
                click: () => setActiveWaypoint(index),
              }}
            >
              <Popup className="custom-popup">
                <div className="p-4 min-w-[250px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">{getWaypointIcon(waypoint.type)}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{waypoint.title}</h3>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{waypoint.description}</p>
                  <div className="flex gap-2">
                    <button className="btn-primary text-xs py-2 px-4">
                      <Camera className="w-3 h-3" />
                      Photos
                    </button>
                    <button className="btn-secondary text-xs py-2 px-4">
                      <Play className="w-3 h-3" />
                      Audio
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      {/* Map Legend */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute top-4 right-4 z-[1000] glass rounded-xl p-4 border border-white/20"
      >
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Route Guide
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
            <span className="text-gray-700">Walking Route</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🏖️</span>
            <span className="text-gray-700">Beach Access</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">👁️</span>
            <span className="text-gray-700">Viewpoints</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">☕</span>
            <span className="text-gray-700">Refreshments</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}