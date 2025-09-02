"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface ContactMapProps {
  apiKey: string
  center: { lat: number; lng: number }
  zoom?: number
  markerTitle?: string
  markerDescription?: string
  className?: string
  height?: string
}

declare global {
  interface Window {
    google: any
  }
}

export function ContactMap({
  apiKey,
  center,
  zoom = 15,
  markerTitle = "Our Location",
  markerDescription,
  className = "",
  height = "400px",
}: ContactMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load Google Maps API
  useEffect(() => {
    if (window.google) {
      setIsLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
    script.async = true
    script.defer = true

    script.onload = () => {
      setIsLoaded(true)
    }

    script.onerror = () => {
      setError("Failed to load Google Maps")
    }

    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [apiKey])

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
        },
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      })

      mapInstanceRef.current = map

      // Add marker
      const marker = new window.google.maps.Marker({
        position: center,
        map: map,
        title: markerTitle,
        animation: window.google.maps.Animation.DROP,
      })

      // Add info window if description is provided
      if (markerDescription) {
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${markerTitle}</h3>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">${markerDescription}</p>
            </div>
          `,
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })

        // Auto-open info window after a short delay
        setTimeout(() => {
          infoWindow.open(map, marker)
        }, 1000)
      }
    } catch (err) {
      setError("Failed to initialize map")
    }
  }, [isLoaded, center, zoom, markerTitle, markerDescription])

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isLoaded) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div ref={mapRef} style={{ height }} className="w-full" />
      </CardContent>
    </Card>
  )
}
