<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeUnmount, nextTick } from 'vue'
import { Loader2Icon, Expand, Shrink, Maximize } from 'lucide-vue-next'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Place {
    name: string
    lat: number
    lng: number
    elevation?: number
    offRoad?: boolean
    routeType?: 'foot' | 'bike' | 'car' | 'offroad' | 'flight'
    routeToNext?: L.LatLngTuple[]
}

const props = defineProps<{
    routingMode: 'route' | 'direct'
}>()

const itinerary = defineModel<{ day: string, title: string, description: string, places?: Place[] }[]>('itinerary', { required: true, default: () => [] })
const elevationProfile = defineModel<{ lat: number, lng: number, elevation: number }[]>('elevationProfile', { required: true, default: () => [] })
const activeDayIndex = defineModel<number | null>('activeDayIndex', { required: true, default: null })

const emit = defineEmits<{
    (e: 'focusPlace', lat: number, lng: number): void
}>()

// Leaflet Map states
let map: any = null
let polyline: any = null
let polylines: any[] = []
let animatedMarker: any = null
let markers: any[] = []
const markersMap = new Map<string, any>()
let animationFrameId: number | null = null
let nextLegTimeoutId: any = null

const searchQuery = ref('')
const isSearchingLocation = ref(false)
const searchResults = ref<any[]>([])
const isMotionEnabled = ref(false)

const isFullScreen = ref(false)

const toggleFullScreen = () => {
    isFullScreen.value = !isFullScreen.value
    setTimeout(() => {
        if (map) map.invalidateSize()
    }, 300)
}

const fitMap = () => {
    if (!map) return
    const places = itinerary.value.flatMap((day: any) => day.places || [])
    if (places.length > 0) {
        const bounds = L.latLngBounds(places.map((p: any) => [p.lat, p.lng] as L.LatLngTuple))
        map.fitBounds(bounds, { padding: [40, 40] })
    }
}

const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isFullScreen.value) {
        toggleFullScreen()
    }
}

watch(() => props.routingMode, () => {
    drawRoute(false)
})

const hoveredPoint = ref<any | null>(null)
let hoverMarker: any = null
const svgRef = ref<SVGElement | null>(null)

const minElev = computed(() => elevationProfile.value.length ? Math.min(...elevationProfile.value.map(p => p.elevation)) : 0)
const maxElev = computed(() => elevationProfile.value.length ? Math.max(...elevationProfile.value.map(p => p.elevation)) : 100)
const elevRange = computed(() => maxElev.value - minElev.value || 1)

const chartPoints = computed(() => {
    if (elevationProfile.value.length < 2) return []
    const len = elevationProfile.value.length
    return elevationProfile.value.map((p, i) => {
        const x = (i / (len - 1)) * 800
        const y = 120 - ((p.elevation - minElev.value) / elevRange.value) * 100
        return { x, y, ...p }
    })
})

const linePath = computed(() => {
    if (chartPoints.value.length === 0) return ''
    return chartPoints.value.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
})

const areaPath = computed(() => {
    if (chartPoints.value.length === 0) return ''
    const pointsStr = chartPoints.value.map(p => `L ${p.x} ${p.y}`).join(' ')
    return `M 0 130 L 0 ${chartPoints.value[0].y} ${pointsStr} L 800 ${chartPoints.value[chartPoints.value.length - 1].y} L 800 130 Z`
})

const handleMouseMove = (e: MouseEvent) => {
    if (!svgRef.value || chartPoints.value.length === 0) return
    const rect = svgRef.value.getBoundingClientRect()
    const clientX = e.clientX - rect.left
    const percentX = clientX / rect.width
    const targetIdx = Math.max(0, Math.min(chartPoints.value.length - 1, Math.round(percentX * (chartPoints.value.length - 1))))
    hoveredPoint.value = chartPoints.value[targetIdx]
}

const handleMouseLeave = () => {
    hoveredPoint.value = null
}

watch(hoveredPoint, (point) => {
    if (!map) return
    if (hoverMarker) {
        hoverMarker.remove()
        hoverMarker = null
    }
    if (point) {
        const hoverIcon = L.divIcon({
            html: `
                <div style="
                    background-color: #3b82f6;
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    border: 2px solid white;
                    box-shadow: 0 0 8px rgba(59,130,246,0.8);
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-7px, -7px);
                "></div>
            `,
            className: 'custom-hover-icon',
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        })
        hoverMarker = L.marker([point.lat, point.lng], { icon: hoverIcon }).addTo(map)
    }
})

const toggleMotion = () => {
    isMotionEnabled.value = !isMotionEnabled.value
    if (isMotionEnabled.value) {
        drawRoute(false)
    } else {
        stopAnimation()
        if (animatedMarker) {
            animatedMarker.remove()
            animatedMarker = null
        }
    }
}

let hasLoadedInitialData = false

onMounted(async () => {
    await nextTick()
    initMap()
    
    const places = itinerary.value.flatMap((day: any) => day.places || [])
    if (places.length > 0) {
        hasLoadedInitialData = true
    }
    
    drawRoute(true)
    window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    stopAnimation()
    polylines.forEach(p => p.remove())
    polylines = []
    if (map) {
        map.remove()
        map = null
    }
    if (hoverMarker) {
        hoverMarker.remove()
        hoverMarker = null
    }
    window.removeEventListener('keydown', handleKeydown)
})

/**
 * Initializes the Leaflet map and sets the default view.
 * It also attaches a click listener to the map to allow users to add new waypoints.
 */
function initMap() {
    const el = document.getElementById('itinerary-editor-map')
    if (!el) return

    if (map) {
        try {
            map.remove()
        } catch (e) {
            console.error('Error removing map', e)
        }
        map = null
    }

    // Default set view to Nepal region coordinates
    map = L.map(el).setView([28.3949, 84.1240], 7)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    // Click to add coordinates to the active day
    map.on('click', async (e: any) => {
        if (activeDayIndex.value === null) return
        const day = itinerary.value[activeDayIndex.value]
        day.places = day.places || []

        const lat = e.latlng.lat
        const lng = e.latlng.lng
        const name = `Waypoint ${day.places.length + 1}`

        const newPlace: Place = { name, lat, lng }
        day.places.push(newPlace)

        // Fetch elevation and name in background
        fetchPlaceDetails(newPlace)
    })
}

/**
 * Fetches additional metadata for a newly added place.
 * Queries Open-Meteo for the elevation and Nominatim for reverse geocoding (place name).
 */
async function fetchPlaceDetails(place: Place) {
    // Fetch Elevation from Open-Meteo API
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/elevation?latitude=${place.lat}&longitude=${place.lng}`)
        const data = await res.json()
        if (data && data.elevation && data.elevation.length > 0) {
            place.elevation = Math.round(data.elevation[0])
        }
    } catch (err) {
        console.error('Failed to fetch elevation', err)
    }

    // Fetch Name from Nominatim Reverse Geocoding API if name starts with 'Waypoint'
    if (place.name.startsWith('Waypoint')) {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${place.lat}&lon=${place.lng}&format=json&accept-language=en`)
            const data = await res.json()
            const fetchedName = data.name || data.display_name?.split(',')[0]
            if (fetchedName) {
                place.name = fetchedName
            }
        } catch (err) {
            console.error('Failed to reverse geocode', err)
        }
    }
}

function stopAnimation() {
    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
    }
    if (nextLegTimeoutId !== null) {
        clearTimeout(nextLegTimeoutId)
        nextLegTimeoutId = null
    }
}

function sampleCoords(coords: L.LatLngTuple[], maxPoints = 80): L.LatLngTuple[] {
    if (coords.length === 0) return []
    if (coords.length === 1) return coords

    const distances = [0]
    for (let i = 1; i < coords.length; i++) {
        distances.push(distances[i - 1] + L.latLng(coords[i - 1]).distanceTo(L.latLng(coords[i])))
    }
    const totalDist = distances[distances.length - 1]

    if (totalDist === 0) return coords

    const sampled: L.LatLngTuple[] = []
    const step = totalDist / (maxPoints - 1)

    for (let i = 0; i < maxPoints; i++) {
        const targetDist = i * step
        for (let j = 0; j < distances.length - 1; j++) {
            if (targetDist >= distances[j] && (targetDist <= distances[j + 1] || j === distances.length - 2)) {
                const segmentDist = distances[j + 1] - distances[j]
                const fraction = segmentDist === 0 ? 0 : (targetDist - distances[j]) / segmentDist
                const lat = coords[j][0] + (coords[j + 1][0] - coords[j][0]) * fraction
                const lng = coords[j][1] + (coords[j + 1][1] - coords[j][1]) * fraction
                sampled.push([lat, lng])
                break
            }
        }
    }
    return sampled
}

/**
 * Fetches or calculates the elevation profile for the entire route.
 * It first samples coordinates along the route at equal intervals.
 * It attempts to fetch elevations from Open-Meteo, and falls back to local linear interpolation if the API fails.
 */
async function fetchElevationProfile(coords: L.LatLngTuple[]) {
    if (coords.length === 0) return []
    const sampled = sampleCoords(coords, 80)
    try {
        const lats = sampled.map(c => c[0]).join(',')
        const lngs = sampled.map(c => c[1]).join(',')
        const res = await fetch(`https://api.open-meteo.com/v1/elevation?latitude=${lats}&longitude=${lngs}`)
        const data = await res.json()
        if (data && data.elevation) {
            return sampled.map((coord, idx) => ({
                lat: coord[0],
                lng: coord[1],
                elevation: Math.round(data.elevation[idx] || 0)
            }))
        }
    } catch (e) {
        console.warn('Failed to fetch elevation profile, falling back to local interpolation', e)
    }

    // Fallback: Linear interpolation using the places' elevations
    const places = itinerary.value.flatMap((day: any) => day.places || [])
    const validPlaces = places.filter(p => p.elevation !== undefined && p.elevation !== null)
    if (validPlaces.length === 0) {
        return sampled.map(coord => ({ lat: coord[0], lng: coord[1], elevation: 0 }))
    }
    if (validPlaces.length === 1) {
        const elev = validPlaces[0].elevation || 0
        return sampled.map(coord => ({ lat: coord[0], lng: coord[1], elevation: elev }))
    }

    const distances: number[] = [0]
    for (let i = 1; i < sampled.length; i++) {
        const p1 = L.latLng(sampled[i - 1][0], sampled[i - 1][1])
        const p2 = L.latLng(sampled[i][0], sampled[i][1])
        distances.push(distances[i - 1] + p1.distanceTo(p2))
    }
    const totalDistance = distances[distances.length - 1] || 1

    const placePositions: { distance: number, elevation: number }[] = []
    validPlaces.forEach(place => {
        let minDistance = Infinity
        let closestIdx = 0
        const placeLatLng = L.latLng(place.lat, place.lng)

        sampled.forEach((coord, idx) => {
            const dist = L.latLng(coord[0], coord[1]).distanceTo(placeLatLng)
            if (dist < minDistance) {
                minDistance = dist
                closestIdx = idx
            }
        })

        placePositions.push({
            distance: distances[closestIdx],
            elevation: place.elevation || 0
        })
    })

    placePositions.sort((a, b) => a.distance - b.distance)

    if (placePositions[0].distance > 0) {
        placePositions.unshift({ distance: 0, elevation: placePositions[0].elevation })
    }
    if (placePositions[placePositions.length - 1].distance < totalDistance) {
        placePositions.push({ distance: totalDistance, elevation: placePositions[placePositions.length - 1].elevation })
    }

    return sampled.map((coord, idx) => {
        const d = distances[idx]
        let p1 = placePositions[0]
        let p2 = placePositions[placePositions.length - 1]

        for (let i = 0; i < placePositions.length - 1; i++) {
            if (d >= placePositions[i].distance && d <= placePositions[i + 1].distance) {
                p1 = placePositions[i]
                p2 = placePositions[i + 1]
                break
            }
        }

        const segmentLength = p2.distance - p1.distance
        const factor = segmentLength > 0 ? (d - p1.distance) / segmentLength : 0
        const elevation = Math.round(p1.elevation + (p2.elevation - p1.elevation) * factor)

        return {
            lat: coord[0],
            lng: coord[1],
            elevation
        }
    })
}

function getPolylineOptions(type: 'foot' | 'bike' | 'car' | 'offroad' | 'flight') {
    switch (type) {
        case 'flight':
            return { color: '#3b82f6', weight: 3, opacity: 0.8, dashArray: '8, 8' }
        case 'bike':
            return { color: '#10b981', weight: 4, opacity: 0.8, dashArray: '5, 8' }
        case 'car':
            return { color: '#64748b', weight: 4, opacity: 0.8 }
        case 'offroad':
            return { color: '#ef4444', weight: 4, opacity: 0.8, dashArray: '6, 12' }
        case 'foot':
        default:
            return { color: '#f06723', weight: 4, opacity: 0.8, dashArray: '4, 6' }
    }
}

function getRouteIcon(type: string) {
    switch (type) {
        case 'flight': return '✈️'
        case 'bike': return '🚴'
        case 'car': return '🚗'
        case 'offroad': return '🚙'
        case 'foot':
        default: return '🚶'
    }
}

/**
 * Fetches the exact route geometry from BRouter (better for hiking/trails).
 * Falls back to a straight line if it fails or if the route detour is absurdly long.
 */
async function fetchRouteGeometry(from: Place, to: Place, type: 'foot' | 'bike' | 'car' | 'offroad' | 'flight'): Promise<L.LatLngTuple[]> {
    if (type === 'flight' || type === 'offroad') {
        return [[from.lat, from.lng], [to.lat, to.lng]]
    }

    const profileMap: Record<string, string> = {
        'foot': 'trekking',
        'bike': 'trekking-bicycle',
        'car': 'car-fast'
    }
    const profile = profileMap[type] || 'trekking'

    try {
        const url = `https://brouter.de/brouter?lonlats=${from.lng},${from.lat}|${to.lng},${to.lat}&profile=${profile}&alternativeidx=0&format=geojson`
        const res = await fetch(url)
        const data = await res.json()

        if (data.features && data.features.length > 0) {
            const feature = data.features[0]
            const trackLength = parseInt(feature.properties['track-length']) || 0
            const straightLineDist = L.latLng(from.lat, from.lng).distanceTo(L.latLng(to.lat, to.lng))

            // Safeguard against absurd routing (e.g. going out of country due to disconnected graphs)
            if (straightLineDist > 500 && (trackLength > straightLineDist * 5 || trackLength < straightLineDist * 0.2)) {
                console.warn(`BRouter route rejected (absurd distance: ${trackLength}m vs ${straightLineDist}m). Falling back to straight line.`)
                return [[from.lat, from.lng], [to.lat, to.lng]]
            }

            return feature.geometry.coordinates.map((c: number[]) => [c[1], c[0]] as L.LatLngTuple)
        }
    } catch (e) {
        console.error('Failed to fetch route from BRouter', e)
    }

    return [[from.lat, from.lng], [to.lat, to.lng]]
}

/**
 * Main rendering function that redraws the entire route on the map.
 * It clears existing layers, draws markers for each place, and draws polylines
 * connecting each place. It also orchestrates fetching the elevation profile and starting the animation.
 */
async function drawRoute(isInitialLoad = false) {
    if (!L || !map) return

    // Clear old layers
    markers.forEach(m => m.remove())
    markers = []
    markersMap.clear()
    if (polyline) polyline.remove()
    polylines.forEach(p => p.remove())
    polylines = []
    if (animatedMarker) animatedMarker.remove()
    stopAnimation()

    const places = itinerary.value.flatMap((day: any) => day.places || [])
    if (places.length === 0) {
        elevationProfile.value = []
        return
    }

    // Draw static markers
    places.forEach((place: Place) => {
        const customIcon = L.divIcon({
            html: `
                <div style="
                    background-color: #f06723;
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-7px, -7px);
                "></div>
            `,
            className: 'custom-static-icon',
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        })
        const marker = L.marker([place.lat, place.lng], { icon: customIcon })
            .bindPopup(`<b>📍 ${place.name}</b>`)
            .addTo(map)
        markers.push(marker)
        markersMap.set(`${place.lat}-${place.lng}`, marker)
    })

    if (places.length === 1) {
        map.setView([places[0].lat, places[0].lng], 12)
        elevationProfile.value = [{ lat: places[0].lat, lng: places[0].lng, elevation: places[0].elevation || 0 }]
        return
    }

    const getRouteType = (place: Place): 'foot' | 'bike' | 'car' | 'offroad' | 'flight' => {
        if (place.routeType) return place.routeType
        if (place.offRoad) return 'offroad'
        return 'foot'
    }

    let routeCoords: L.LatLngTuple[] = []

    for (let i = 0; i < places.length - 1; i++) {
        const fromPlace = places[i]
        const toPlace = places[i + 1]
        const type = getRouteType(fromPlace)

        let coords: L.LatLngTuple[] = [
            [fromPlace.lat, fromPlace.lng],
            [toPlace.lat, toPlace.lng]
        ]

        if (props.routingMode === 'route') {
            if (isInitialLoad && fromPlace.routeToNext) {
                coords = fromPlace.routeToNext
            } else {
                coords = await fetchRouteGeometry(fromPlace, toPlace, type)
                fromPlace.routeToNext = coords // Cache locally for future redraws
            }
        }

        if (i === 0) {
            routeCoords.push(...coords)
        } else {
            routeCoords.push(...coords.slice(1))
        }

        const p = L.polyline(coords, getPolylineOptions(type as any)).addTo(map)
        polylines.push(p)

        // Add midpoint icon (approximate middle of the segment)
        const midIdx = Math.floor(coords.length / 2)
        const midLat = coords[midIdx][0]
        const midLng = coords[midIdx][1]
        
        // Calculate angle for the arrow
        const lookAhead = Math.min(5, Math.floor(coords.length / 4) || 1)
        const p1 = coords[Math.max(0, midIdx - lookAhead)]
        const p2 = coords[Math.min(coords.length - 1, midIdx + lookAhead)]
        const screenDy = p1[0] - p2[0]
        const screenDx = p2[1] - p1[1]
        const angle = Math.atan2(screenDy, screenDx) * (180 / Math.PI)
        
        const color = getPolylineOptions(type as any).color

        const iconHtml = `
            <div style="
                background: white; 
                border-radius: 12px; 
                padding: 2px 6px;
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-size: 14px; 
                box-shadow: 0 1px 3px rgba(0,0,0,0.3); 
                border: 1px solid #e2e8f0;
                gap: 2px;
            ">
                <span style="line-height: 1;">${getRouteIcon(type)}</span>
                <svg style="transform: rotate(${angle}deg);" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                </svg>
            </div>`

        const midIcon = L.divIcon({
            html: iconHtml,
            className: '',
            iconSize: [40, 24],
            iconAnchor: [20, 12]
        })
        const midMarker = L.marker([midLat, midLng], { icon: midIcon, interactive: false }).addTo(map)
        markers.push(midMarker)
    }

    // Fit map boundaries to contain the path
    if (routeCoords.length > 0) {
        const bounds = L.latLngBounds(routeCoords)
        map.fitBounds(bounds, { padding: [40, 40] })
    }

    // Fetch elevation profile in background
    if (!isInitialLoad || elevationProfile.value.length === 0) {
        elevationProfile.value = await fetchElevationProfile(routeCoords)
    }

    // Create the animated marker with a custom Lucide navigation icon and pulsing effect only if motion is enabled
    if (isMotionEnabled.value) {
        const animatedIcon = L.divIcon({
            html: `
                <div style="position: relative; width: 24px; height: 24px;">
                    <div class="moving-marker-pulse"></div>
                    <div class="moving-marker-icon" style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: #ef4444;
                        color: white;
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        border: 2px solid white;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                        transition: transform 0.1s linear;
                    ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                        </svg>
                    </div>
                </div>
            `,
            className: 'custom-moving-icon',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        })
        animatedMarker = L.marker(routeCoords[0], { icon: animatedIcon }).addTo(map)

        // Start animating
        animateMarker(routeCoords, places)
    }
}

/**
 * Animates a marker along the drawn route.
 * Uses requestAnimationFrame to smoothly interpolate the marker's position between waypoints.
 */
function animateMarker(points: L.LatLngTuple[], places: Place[]) {
    if (points.length < 2 || !animatedMarker) return

    let currentLeg = 0
    let direction = 1 // 1 for forward, -1 for backward
    let progress = 0 // progress along current leg (0 to 1)
    let lastFrameTime = 0

    // Set the initial position of the marker to the start of the route
    const startPoint = points[0]
    animatedMarker.setLatLng(startPoint)

    const animate = (timestamp: number) => {
        if (!lastFrameTime) {
            lastFrameTime = timestamp
            animationFrameId = requestAnimationFrame(animate)
            return
        }
        const deltaTime = timestamp - lastFrameTime
        lastFrameTime = timestamp

        // If elapsed time is too long, skip to prevent huge jumps
        if (deltaTime > 100) {
            animationFrameId = requestAnimationFrame(animate)
            return
        }

        if (!map) {
            animationFrameId = requestAnimationFrame(animate)
            return
        }

        const startLatLng = L.latLng(direction === 1 ? points[currentLeg] : points[currentLeg + 1])
        const endLatLng = L.latLng(direction === 1 ? points[currentLeg + 1] : points[currentLeg])

        // Convert to screen coordinates to calculate screen speed
        const pStart = map.latLngToContainerPoint(startLatLng)
        const pEnd = map.latLngToContainerPoint(endLatLng)
        const totalPixelDistance = pStart.distanceTo(pEnd)

        // Target screen speed: 100 pixels per second (0.1 pixels per millisecond)
        const speed = 0.1
        const step = speed * deltaTime

        // Calculate progress delta based on screen pixel distance
        const progressDelta = totalPixelDistance > 0 ? (step / totalPixelDistance) : 1
        progress = Math.min(progress + progressDelta, 1)

        // Interpolate LatLng based on progress
        const currentLat = startLatLng.lat + (endLatLng.lat - startLatLng.lat) * progress
        const currentLng = startLatLng.lng + (endLatLng.lng - startLatLng.lng) * progress
        const currentLatLng = L.latLng(currentLat, currentLng)

        animatedMarker.setLatLng(currentLatLng)

        // Rotate the navigation icon to point in the direction of movement
        const angle = Math.atan2(endLatLng.lng - startLatLng.lng, endLatLng.lat - startLatLng.lat) * (180 / Math.PI)
        const element = animatedMarker.getElement()
        if (element) {
            const iconInner = element.querySelector('.moving-marker-icon') as HTMLElement
            if (iconInner) {
                iconInner.style.transform = `rotate(${angle - 45}deg)`
            }
        }

        // Keep map centered on marker if it goes out of bounds
        if (map) {
            const bounds = map.getBounds()
            const allVisible = places.every((p: Place) => bounds.contains(L.latLng(p.lat, p.lng)))
            if (!allVisible) {
                map.setView(currentLatLng, map.getZoom(), { animate: false })
            }
        }

        if (progress < 1) {
            animationFrameId = requestAnimationFrame(animate)
        } else {
            // Check if the node we just reached is one of the user's stopovers (within 25m)
            const reachedUserWaypoint = places.some((p: Place) => endLatLng.distanceTo(L.latLng(p.lat, p.lng)) < 25)

            progress = 0

            // Advance or reverse to the next leg
            if (direction === 1) {
                if (currentLeg < points.length - 2) {
                    currentLeg = currentLeg + 1
                } else {
                    direction = -1
                }
            } else {
                if (currentLeg > 0) {
                    currentLeg = currentLeg - 1
                } else {
                    direction = 1
                }
            }

            if (reachedUserWaypoint) {
                // Pause slightly at stopover before starting next leg
                lastFrameTime = 0
                nextLegTimeoutId = setTimeout(() => {
                    animationFrameId = requestAnimationFrame(animate)
                }, 500)
            } else {
                // Smoothly continue to the next road segment without pausing
                animationFrameId = requestAnimationFrame(animate)
            }
        }
    }

    animationFrameId = requestAnimationFrame(animate)
}

// Watch places changes to redraw route & animation
watch(() => itinerary.value.map(day => (day.places || []).map(p => `${p.lat},${p.lng},${p.name},${p.offRoad},${p.routeType}`)), (newVal) => {
    const isActuallyPopulated = newVal.flat().length > 0
    if (!hasLoadedInitialData && isActuallyPopulated) {
        hasLoadedInitialData = true
        drawRoute(true)
    } else {
        drawRoute(false)
    }
}, { deep: true })

const searchLocation = async () => {
    if (!searchQuery.value.trim()) return
    isSearchingLocation.value = true
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery.value)}&format=json&limit=5`)
        searchResults.value = await response.json()
    } catch (e) {
        console.error('Failed to search location', e)
    } finally {
        isSearchingLocation.value = false
    }
}

const selectSearchResult = (res: any) => {
    const lat = Number(res.lat)
    const lng = Number(res.lon)
    const name = res.name || res.display_name.split(',')[0]

    if (activeDayIndex.value !== null && map) {
        const day = itinerary.value[activeDayIndex.value]
        day.places = day.places || []
        const newPlace: Place = { name, lat, lng }
        day.places.push(newPlace)

        map.setView([lat, lng], 13)
        searchResults.value = []
        searchQuery.value = ''

        // Fetch elevation in background
        fetchPlaceDetails(newPlace)
    }
}

const focusOnPlace = (lat: number, lng: number) => {
    if (!map) return
    map.setView([lat, lng], 14)
    const marker = markersMap.get(`${lat}-${lng}`)
    if (marker) {
        marker.openPopup()
    }
}

defineExpose({ focusOnPlace })
</script>

<template>
    <div class="bg-card p-5 rounded-2xl border border-border/50 shadow-sm space-y-4 relative">
        <div class="flex items-center justify-between">
            <h4 class="text-sm font-black text-foreground uppercase tracking-wider">Route Map Preview</h4>
            <div class="flex items-center gap-2">
                <span
                    class="text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-black uppercase tracking-wider">Interactive</span>
            </div>
        </div>

        <!-- Location Search -->
        <div class="space-y-2 relative">
            <div class="flex gap-2">
                <input v-model="searchQuery" placeholder="Search for a location (e.g. Namche Bazaar)"
                    @keyup.enter="searchLocation"
                    class="flex-1 bg-muted/10 border border-border/50 text-xs px-3 h-9 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary" />
                <button @click="searchLocation" :disabled="isSearchingLocation"
                    class="bg-primary text-primary-foreground font-bold px-4 h-9 rounded-xl flex items-center justify-center disabled:opacity-50 text-xs hover:bg-primary/90 transition-colors">
                    <Loader2Icon v-if="isSearchingLocation" class="w-3.5 h-3.5 animate-spin mr-1" />
                    Search
                </button>
            </div>
            <div v-if="searchResults.length > 0"
                class="absolute z-30 max-h-36 w-full overflow-y-auto border border-border rounded-xl bg-card shadow-lg divide-y divide-border text-xs mt-1">
                <button v-for="(res, idx) in searchResults" :key="idx" @click="selectSearchResult(res)"
                    class="w-full text-left p-2.5 hover:bg-muted font-medium text-foreground block">
                    {{ res.display_name }}
                </button>
            </div>
        </div>

        <!-- Map Container -->
        <div :class="[
            isFullScreen ? 'fixed inset-0 z-[100] h-screen w-screen rounded-none' : 'h-[480px] rounded-2xl relative',
            'overflow-hidden border border-border shadow-inner z-10 bg-slate-50 dark:bg-slate-900 transition-all duration-300'
        ]">
            <div id="itinerary-editor-map" class="w-full h-full absolute inset-0" />

            <div class="absolute top-4 right-4 z-20 flex items-center gap-2">
                <!-- Toggle Motion Button -->
                <button @click.stop="toggleMotion"
                    class="bg-background/95 backdrop-blur border border-border p-2 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 hover:bg-muted transition-all text-foreground"
                    title="Toggle Animation Preview">
                    <span :class="[
                        'w-2 h-2 rounded-full',
                        isMotionEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                    ]"></span>
                    <span>{{ isMotionEnabled ? 'Pause Motion' : 'Play Motion' }}</span>
                </button>

                <!-- Fit Map Button -->
                <button @click.stop="fitMap"
                    class="bg-background/95 backdrop-blur border border-border p-2 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 hover:bg-muted transition-all text-foreground"
                    title="Fit map">
                    <Maximize class="w-4 h-4" />
                </button>

                <!-- Full Screen Button -->
                <button @click.stop="toggleFullScreen"
                    class="bg-background/95 backdrop-blur border border-border p-2 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 hover:bg-muted transition-all text-foreground"
                    :title="isFullScreen ? 'Exit full screen' : 'Full screen'">
                    <Shrink v-if="isFullScreen" class="w-4 h-4" />
                    <Expand v-else class="w-4 h-4" />
                </button>
            </div>

            <!-- Active Day Indicator Overlay -->
            <div
                class="absolute bottom-4 left-4 z-20 bg-background/95 backdrop-blur border border-border px-3 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-2">
                <span class="relative flex h-2 w-2">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span class="text-foreground">
                    Targeting: <span class="text-primary font-black">Day {{ activeDayIndex !== null ?
                        itinerary[activeDayIndex]?.day : 'None' }}</span>
                </span>
            </div>
        </div>

        <!-- Elevation Profile Chart -->
        <div v-if="elevationProfile.length > 0"
            class="mt-4 p-4 bg-muted/20 border border-border/60 rounded-2xl relative">
            <div class="flex justify-between items-center mb-2">
                <h4
                    class="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                        class="text-primary">
                        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                    </svg>
                    Elevation Profile
                </h4>
                <div class="text-[10px] text-muted-foreground font-bold flex gap-3">
                    <span>Min: <span class="text-foreground font-black">{{ minElev }}m</span></span>
                    <span>Max: <span class="text-foreground font-black">{{ maxElev }}m</span></span>
                </div>
            </div>

            <div class="h-32 w-full relative">
                <!-- SVG Chart -->
                <svg ref="svgRef" viewBox="0 0 800 130" preserveAspectRatio="none"
                    class="w-full h-full cursor-crosshair overflow-visible" @mousemove="handleMouseMove"
                    @mouseleave="handleMouseLeave">
                    <defs>
                        <linearGradient id="elevGradientEditor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3" />
                            <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.0" />
                        </linearGradient>
                    </defs>
                    <path :d="areaPath" fill="url(#elevGradientEditor)" />
                    <path :d="linePath" fill="none" stroke="#3b82f6" stroke-width="2" />

                    <!-- Hover indicator -->
                    <g v-if="hoveredPoint">
                        <line :x1="hoveredPoint.x" y1="0" :x2="hoveredPoint.x" y2="130" stroke="#94a3b8"
                            stroke-width="1" stroke-dasharray="4" />
                        <circle :cx="hoveredPoint.x" :cy="hoveredPoint.y" r="4" fill="#3b82f6" stroke="white"
                            stroke-width="2" />
                    </g>
                </svg>
            </div>

            <!-- Hover details -->
            <div v-if="hoveredPoint"
                class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-lg border border-border pointer-events-none font-bold whitespace-nowrap">
                Elevation: {{ hoveredPoint.elevation }}m
            </div>
        </div>
    </div>
</template>
