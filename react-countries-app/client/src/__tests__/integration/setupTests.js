// src/__tests__/integration/setupTests.js
import { vi } from 'vitest'

// 1) mock leaflet’s reliance on window
vi.mock('leaflet', () => ({
    MapContainer: () => null,
    TileLayer:   () => null,
    Marker:      () => null,
    Popup:       () => null,
}))

// 2) mock react-leaflet to render nothing
vi.mock('react-leaflet', () => ({
    MapContainer: () => null,
    TileLayer:    () => null,
    Marker:       () => null,
    Popup:        () => null,
}))
