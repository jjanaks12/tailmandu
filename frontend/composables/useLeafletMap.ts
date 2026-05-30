import { shallowRef, type Ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-gpx'

export function useLeafletMap(
    mapEl: Ref<HTMLElement | null>,
    controls: boolean,
    waypointsData: Ref<{ dist: number, name: string, lat: number, lng: number }[]>,
    startPoint: Ref<[number, number, number, number] | null>,
    endPoint: Ref<[number, number, number, number] | null>
) {
    const map = shallowRef<L.Map | null>(null)
    let gpxLayer: L.FeatureGroup | null = null
    let resizeObserver: ResizeObserver | null = null
    
    let startMarker: L.Marker | null = null
    let endMarker: L.Marker | null = null
    let wptMarkers: L.Marker[] = []
    let hoverMarker: L.CircleMarker | null = null

    const initMap = () => {
        if (!mapEl.value || map.value) return

        const m = L.map(mapEl.value, {
            zoomControl: controls,
            scrollWheelZoom: false,
        })
        map.value = m

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> | &copy; <a href="https://carto.com/">CartoDB</a>',
        }).addTo(m)

        // Fix for map inside Dialog: invalidate size when container becomes visible/resizes
        resizeObserver = new ResizeObserver(() => {
            m.invalidateSize()
        })
        resizeObserver.observe(mapEl.value)
    }

    const destroyMap = () => {
        if (resizeObserver) resizeObserver.disconnect()
        if (map.value) {
            map.value.remove()
            map.value = null
        }
    }

    const clearCustomMarkers = () => {
        if (!map.value) return
        if (startMarker) map.value.removeLayer(startMarker)
        if (endMarker) map.value.removeLayer(endMarker)
        if (hoverMarker) map.value.removeLayer(hoverMarker)
        wptMarkers.forEach(m => map.value?.removeLayer(m))
        
        startMarker = null
        endMarker = null
        hoverMarker = null
        wptMarkers = []
    }
    
    const fetchPopupName = async (lat: number, lng: number, fallback: string) => {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=14`)
            if (!res.ok) return fallback
            const data = await res.json()
            let place = data.name
            if (!place && data.address) {
                const a = data.address
                place = a.village || a.town || a.hamlet || a.suburb || a.city || a.municipality || a.county
            }
            return place || fallback
        } catch {
            return fallback
        }
    }

    const createDotIcon = (color: string, size = 16) => L.divIcon({
        className: '',
        html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
    })

    const drawCustomMarkers = () => {
        if (!map.value) return
        clearCustomMarkers()

        // Start Marker
        if (startPoint.value) {
            startMarker = L.marker(L.latLng(startPoint.value[2], startPoint.value[3]), {
                icon: createDotIcon('#10b981', 16),
                zIndexOffset: 1000
            }).addTo(map.value)

            startMarker.on('click', async function (this: L.Marker) {
                const popup = L.popup({ offset: [0, -8], className: 'font-semibold' })
                    .setLatLng(this.getLatLng())
                    .setContent('<div class="animate-pulse">Loading...</div>')
                    .openOn(map.value!)
                const name = await fetchPopupName(startPoint.value![2], startPoint.value![3], 'Start Location')
                popup.setContent(`<div class="text-emerald-600 font-bold text-sm">Start</div><div class="text-[11px] text-slate-500 mt-0.5 leading-tight">${name}</div>`)
            })
        }

        // End Marker
        if (endPoint.value) {
            endMarker = L.marker(L.latLng(endPoint.value[2], endPoint.value[3]), {
                icon: createDotIcon('#ef4444', 16),
                zIndexOffset: 1000
            }).addTo(map.value)

            endMarker.on('click', async function (this: L.Marker) {
                const popup = L.popup({ offset: [0, -8], className: 'font-semibold' })
                    .setLatLng(this.getLatLng())
                    .setContent('<div class="animate-pulse">Loading...</div>')
                    .openOn(map.value!)
                const name = await fetchPopupName(endPoint.value![2], endPoint.value![3], 'Finish Location')
                popup.setContent(`<div class="text-red-500 font-bold text-sm">Finish</div><div class="text-[11px] text-slate-500 mt-0.5 leading-tight">${name}</div>`)
            })
        }

        // Waypoints
        waypointsData.value.forEach((wpt, index) => {
            const marker = L.marker(L.latLng(wpt.lat, wpt.lng), {
                icon: createDotIcon('#3b82f6', 12),
                zIndexOffset: 800
            }).addTo(map.value!)

            marker.on('click', async function (this: L.Marker) {
                const popup = L.popup({ offset: [0, -6], className: 'font-semibold' })
                    .setLatLng(this.getLatLng())
                    .setContent('<div class="animate-pulse">Loading...</div>')
                    .openOn(map.value!)

                let name = wpt.name
                if (!name) {
                    name = await fetchPopupName(wpt.lat, wpt.lng, 'Checkpoint')
                }
                popup.setContent(`<div class="text-blue-500 font-bold text-sm">Checkpoint ${index + 1}</div><div class="text-[11px] text-slate-500 mt-0.5 leading-tight">${name}</div>`)
            })

            wptMarkers.push(marker)
        })
    }

    const loadGpxTrackLayer = (gpxText: string) => {
        if (!map.value) return

        if (gpxLayer) {
            map.value.removeLayer(gpxLayer)
            gpxLayer = null
        }

        gpxLayer = new L.GPX(gpxText, {
            async: true,
            marker_options: {
                startIconUrl: '',
                endIconUrl: '',
                shadowUrl: '',
                wptIconUrls: { '': '', 'Waypoint': '' }
            },
            polyline_options: {
                color: '#f06723',
                weight: 4,
                opacity: 0.9,
                lineCap: 'round',
                lineJoin: 'round'
            }
        }).on('loaded', function (e: any) {
            if (map.value) {
                map.value.fitBounds(e.target.getBounds(), { padding: [50, 50] })
            }
            // Strip out all default leaflet-gpx markers
            e.target.eachLayer((layer: any) => {
                if (layer instanceof L.Marker) {
                    e.target.removeLayer(layer)
                }
            })
        }).on('error', function (e: any) {
            console.error('Failed to load or parse GPX file', e)
        }).addTo(map.value)
    }

    const fitMap = () => {
        if (map.value && gpxLayer) {
            map.value.fitBounds(gpxLayer.getBounds(), { padding: [50, 50] })
        }
    }

    const zoomToCheckpoint = (wpt: { lat: number, lng: number }) => {
        if (map.value) {
            map.value.setView([wpt.lat, wpt.lng], 16, { animate: true })
        }
    }

    const setHoverMarker = (lat: number, lng: number) => {
        if (!map.value) return
        const latlng = L.latLng(lat, lng)
        if (!hoverMarker) {
            hoverMarker = L.circleMarker(latlng, {
                radius: 8,
                color: '#f06723',
                fillColor: '#fff',
                fillOpacity: 1,
                weight: 3,
            }).addTo(map.value)
        } else {
            hoverMarker.setLatLng(latlng)
        }
    }

    const clearHoverMarker = () => {
        if (hoverMarker && map.value) {
            map.value.removeLayer(hoverMarker)
            hoverMarker = null
        }
    }

    return {
        map,
        initMap,
        destroyMap,
        drawCustomMarkers,
        loadGpxTrackLayer,
        fitMap,
        zoomToCheckpoint,
        setHoverMarker,
        clearHoverMarker
    }
}
