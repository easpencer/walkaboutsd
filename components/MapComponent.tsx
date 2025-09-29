'use client'

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { Camera, Play, Star } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in production
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    iconUrl: '/leaflet/marker-icon.png',
    shadowUrl: '/leaflet/marker-shadow.png',
  })
}

interface MapComponentProps {
  center: [number, number]
  zoom: number
  activeStyle: string
  mapStyles: Array<{
    id: string
    name: string
    url: string
    attribution: string
  }>
  demoRoute: number[][]
  waypoints: Array<{
    id: string
    title: string
    description: string
    type: string
    coordinates?: [number, number]
  }>
  activeWaypoint: number | null
  onWaypointClick: (index: number) => void
  getWaypointIcon: (type: string) => string
}

export function MapComponent({
  center,
  zoom,
  activeStyle,
  mapStyles,
  demoRoute,
  waypoints,
  activeWaypoint,
  onWaypointClick,
  getWaypointIcon
}: MapComponentProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const createCustomIcon = (type: string, isActive: boolean = false) => {
    if (typeof window === 'undefined' || !mounted) return undefined

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

  if (!mounted) {
    return null
  }

  const currentStyle = mapStyles.find(s => s.id === activeStyle) || mapStyles[0]

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
      key={`map-${activeStyle}-${Date.now()}`} // Force unique key to prevent container issues
    >
      <TileLayer
        url={currentStyle.url}
        attribution={currentStyle.attribution}
      />

      {/* Walking Route Polyline */}
      <Polyline
        positions={demoRoute as any}
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

        const icon = createCustomIcon(waypoint.type, activeWaypoint === index)

        return (
          <Marker
            key={waypoint.id}
            position={waypoint.coordinates}
            icon={icon}
            eventHandlers={{
              click: () => onWaypointClick(index),
            }}
          >
            <Popup className="custom-popup">
              <div className="p-4 min-w-[250px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
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
                  <button className="bg-blue-600 text-white text-xs py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    Photos
                  </button>
                  <button className="bg-gray-200 text-gray-700 text-xs py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-1">
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
  )
}