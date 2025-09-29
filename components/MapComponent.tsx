'use client'

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

// Fix for default markers in production
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
})

interface WaypointData {
  id: string
  title: string
  description: string
  coordinates: [number, number]
  type: 'landmark' | 'viewpoint' | 'restaurant' | 'parking'
  image?: string
}

interface MapComponentProps {
  walkRoute?: {
    waypoints: WaypointData[]
  }
  selectedSpot?: any
  center?: [number, number]
  zoom?: number
}

function MapController({ center, zoom }: { center?: [number, number], zoom?: number }) {
  const map = useMap()

  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 14)
    }
  }, [center, zoom, map])

  return null
}

export function MapComponent({ walkRoute, selectedSpot, center = [32.8328, -117.2713], zoom = 14 }: MapComponentProps) {
  const routeCoordinates = walkRoute?.waypoints.map(wp => wp.coordinates) || []

  const createIcon = (type: string) => {
    const colors: Record<string, string> = {
      landmark: '#10b981',
      viewpoint: '#3b82f6',
      restaurant: '#f59e0b',
      parking: '#6b7280'
    }

    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${colors[type] || '#6b7280'};
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    })
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full rounded-2xl"
      zoomControl={true}
      style={{ minHeight: '500px' }}
    >
      <MapController center={selectedSpot?.coordinates || center} zoom={selectedSpot ? 16 : zoom} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {walkRoute && routeCoordinates.length > 1 && (
        <Polyline
          pathOptions={{ color: '#3b82f6', weight: 4, opacity: 0.7 }}
          positions={routeCoordinates}
        />
      )}

      {walkRoute?.waypoints.map((waypoint) => (
        <Marker
          key={waypoint.id}
          position={waypoint.coordinates}
          icon={createIcon(waypoint.type)}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-gray-900">{waypoint.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{waypoint.description}</p>
              {waypoint.image && (
                <img
                  src={waypoint.image}
                  alt={waypoint.title}
                  className="mt-2 rounded w-full h-24 object-cover"
                />
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {selectedSpot && (
        <Marker
          position={selectedSpot.coordinates}
          icon={createIcon(selectedSpot.type || 'landmark')}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-gray-900">{selectedSpot.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedSpot.description}</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}