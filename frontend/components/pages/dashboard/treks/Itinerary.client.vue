<script setup lang="ts">
import { Loader2Icon, PlusCircleIcon, Trash2Icon } from 'lucide-vue-next'
import type { Trek } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { ref, computed, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Place {
    name: string
    lat: number
    lng: number
    elevation?: number
    offRoad?: boolean
    routeType?: 'foot' | 'bike' | 'car' | 'offroad'
}

interface Props {
    trek: Trek
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])
const { axios } = useAxios()

const isSaving = ref(false)
const itinerary = ref<{ day: string, title: string, description: string, places?: Place[] }[]>([])
const activeDayIndex = ref<number | null>(null)

const isItineraryDirty = computed(() => {
    return JSON.stringify(itinerary.value) !== JSON.stringify(props.trek.details?.itinerary || [])
})

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
const isMotionEnabled = ref(true)
const routingMode = ref<'route' | 'direct'>('route')

watch(routingMode, () => {
    drawRoute()
})

const elevationProfile = ref<{ lat: number, lng: number, elevation: number }[]>([])
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
        drawRoute()
    } else {
        stopAnimation()
        if (animatedMarker) {
            animatedMarker.remove()
            animatedMarker = null
        }
    }
}

onMounted(async () => {
    if (props.trek.details?.itinerary) {
        itinerary.value = JSON.parse(JSON.stringify(props.trek.details.itinerary))
    }
    if (props.trek.details?.routingMode) {
        routingMode.value = props.trek.details.routingMode
    }
    if (itinerary.value.length > 0) {
        activeDayIndex.value = 0
    }
    await nextTick()
    initMap()
    drawRoute()
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
})

const initMap = () => {
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

const fetchPlaceDetails = async (place: Place) => {
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

const stopAnimation = () => {
    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
    }
    if (nextLegTimeoutId !== null) {
        clearTimeout(nextLegTimeoutId)
        nextLegTimeoutId = null
    }
}

const routeBatch = async (batch: Place[], type: 'foot' | 'bike' | 'car'): Promise<L.LatLngTuple[]> => {
    const fallback = batch.map(p => [p.lat, p.lng] as L.LatLngTuple)
    if (batch.length < 2) return fallback
    const osrmProfile = type === 'car' ? 'driving' : (type === 'bike' ? 'bicycle' : 'foot')
    try {
        const coordString = batch.map(p => `${p.lng},${p.lat}`).join(';')
        const res = await fetch(`https://router.project-osrm.org/route/v1/${osrmProfile}/${coordString}?overview=full&geometries=geojson`)
        const data = await res.json()
        if (data.code === 'Ok' && data.routes?.[0]?.geometry?.coordinates) {
            return data.routes[0].geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]] as L.LatLngTuple)
        }
    } catch (e) {
        console.error(`Failed to fetch ${type} route batch, falling back to straight lines`, e)
    }
    return fallback
}

const sampleCoords = (coords: L.LatLngTuple[], maxPoints = 80): L.LatLngTuple[] => {
    if (coords.length <= maxPoints) return coords
    const sampled: L.LatLngTuple[] = []
    const step = (coords.length - 1) / (maxPoints - 1)
    for (let i = 0; i < maxPoints; i++) {
        sampled.push(coords[Math.round(i * step)])
    }
    return sampled
}

const fetchElevationProfile = async (coords: L.LatLngTuple[]) => {
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

const getPolylineOptions = (type: 'foot' | 'bike' | 'car' | 'offroad') => {
    switch (type) {
        case 'bike':
            return { color: '#10b981', weight: 4, opacity: 0.8, dashArray: '5, 8' }
        case 'car':
            return { color: '#64748b', weight: 4, opacity: 0.8 }
        case 'offroad':
            return { color: '#ef4444', weight: 4, opacity: 0.8, dashArray: '6, 12' }
        case 'foot':
        default:
            return { color: '#f06723', weight: 4, opacity: 0.8 }
    }
}

const drawRoute = async () => {
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
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-6px, -6px);
                "></div>
            `,
            className: 'custom-static-icon',
            iconSize: [12, 12],
            iconAnchor: [6, 6]
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

    const getRouteType = (place: Place): 'foot' | 'bike' | 'car' | 'offroad' => {
        if (place.routeType) return place.routeType
        if (place.offRoad) return 'offroad'
        return 'foot'
    }

    // Try to fetch OSRM route along walking paths, respecting routeType settings
    let routeCoords: L.LatLngTuple[] = []

    if (routingMode.value === 'direct') {
        routeCoords = places.map(p => [p.lat, p.lng] as L.LatLngTuple)
        const p = L.polyline(routeCoords, getPolylineOptions('foot')).addTo(map)
        polylines.push(p)
    } else {
        if (places.length > 1) {
            let currentBatch: Place[] = [places[0]]
            let currentType = getRouteType(places[0])

            const drawSegment = async (batch: Place[], type: 'foot' | 'bike' | 'car' | 'offroad') => {
                let coords: L.LatLngTuple[] = []
                if (type === 'offroad') {
                    coords = batch.map(p => [p.lat, p.lng] as L.LatLngTuple)
                } else {
                    coords = await routeBatch(batch, type)
                }
                if (coords.length > 0) {
                    // Add to overall coordinate tracking for animations and elevations
                    if (routeCoords.length > 0) {
                        routeCoords.push(...coords.slice(1))
                    } else {
                        routeCoords.push(...coords)
                    }
                    // Add as a styled polyline
                    const p = L.polyline(coords, getPolylineOptions(type)).addTo(map)
                    polylines.push(p)
                }
            }

            for (let i = 0; i < places.length - 1; i++) {
                const fromPlace = places[i]
                const toPlace = places[i + 1]
                const type = getRouteType(fromPlace)

                if (type !== currentType) {
                    await drawSegment(currentBatch, currentType)
                    currentBatch = [fromPlace, toPlace]
                    currentType = type
                } else {
                    currentBatch.push(toPlace)
                }
            }

            if (currentBatch.length > 1) {
                await drawSegment(currentBatch, currentType)
            }
        } else {
            routeCoords = [[places[0].lat, places[0].lng]]
        }
    }

    // Fit map boundaries to contain the path
    if (routeCoords.length > 0) {
        const bounds = L.latLngBounds(routeCoords)
        map.fitBounds(bounds, { padding: [40, 40] })
    }

    // Fetch elevation profile in background
    elevationProfile.value = await fetchElevationProfile(routeCoords)

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

const animateMarker = (points: L.LatLngTuple[], places: Place[]) => {
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
watch(() => itinerary.value.map(day => (day.places || []).map(p => `${p.lat},${p.lng},${p.name},${p.offRoad},${p.routeType}`)), () => {
    drawRoute()
}, { deep: true })

const saveItinerary = async () => {
    isSaving.value = true
    try {
        const details = {
            ...props.trek.details,
            itinerary: itinerary.value,
            elevationProfile: elevationProfile.value
        }
        await axios.put(`/treks/${props.trek.id}`, { details })
        emit('update')
    } catch (e) {
        console.error('Failed to save itinerary', e)
    } finally {
        isSaving.value = false
    }
}

const addItineraryDay = () => {
    const nextDay = String(itinerary.value.length + 1).padStart(2, '0')
    itinerary.value.push({
        day: nextDay,
        title: 'New Day',
        description: 'Description of the daily activities.',
        places: []
    })
    // Auto focus the new day
    activeDayIndex.value = itinerary.value.length - 1
}

const removeItineraryDay = async (index: number) => {
    itinerary.value.splice(index, 1)
    itinerary.value.forEach((day, idx) => {
        day.day = String(idx + 1).padStart(2, '0')
    })
    if (activeDayIndex.value === index) {
        activeDayIndex.value = itinerary.value.length > 0 ? 0 : null
    } else if (activeDayIndex.value !== null && activeDayIndex.value > index) {
        activeDayIndex.value = activeDayIndex.value - 1
    }
    await saveItinerary()
}

const removePlace = (dayIndex: number, placeIndex: number) => {
    const day = itinerary.value[dayIndex]
    if (day && day.places) {
        day.places.splice(placeIndex, 1)
    }
}

const movePlace = (dayIndex: number, placeIndex: number, moveDirection: number) => {
    const day = itinerary.value[dayIndex]
    if (day && day.places) {
        const targetIndex = placeIndex + moveDirection
        if (targetIndex >= 0 && targetIndex < day.places.length) {
            const temp = day.places[placeIndex]
            day.places[placeIndex] = day.places[targetIndex]
            day.places[targetIndex] = temp
        }
    }
}

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

const focusOnPlace = (place: Place) => {
    if (!map) return
    map.setView([place.lat, place.lng], 14)
    const marker = markersMap.get(`${place.lat}-${place.lng}`)
    if (marker) {
        marker.openPopup()
    }
}

watch(() => props.trek, (newTrek) => {
    if (newTrek?.details?.itinerary) {
        itinerary.value = JSON.parse(JSON.stringify(newTrek.details.itinerary))
    }
    if (newTrek?.details?.routingMode) {
        routingMode.value = newTrek.details.routingMode
    }
    nextTick(() => {
        drawRoute()
    })
}, { deep: true })
</script>

<template>
    <!-- Interactive Itinerary Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left: Days List Editor (7 cols) -->
        <div class="lg:col-span-7 space-y-6">
            <div class="flex justify-between items-center bg-card p-4 rounded-2xl border border-border/50 shadow-sm">
                <div class="flex items-center gap-2">
                    <h3 class="text-xl font-black tracking-tight text-foreground">Interactive Itinerary</h3>
                    <Badge v-if="isItineraryDirty" variant="outline"
                        class="border-destructive text-destructive h-5 px-1.5 text-[10px] uppercase font-bold">Unsaved
                    </Badge>
                </div>
                <div class="flex gap-2">
                    <Button @click="saveItinerary" :disabled="isSaving || !isItineraryDirty" variant="ghost"
                        class="font-black text-primary hover:bg-primary/5 text-xs uppercase h-9">
                        <Loader2Icon v-if="isSaving" class="w-4 h-4 animate-spin mr-2" />
                        Save Itinerary
                    </Button>
                    <Button @click="addItineraryDay" variant="secondary"
                        class="font-black text-primary bg-primary/10 hover:bg-primary/20 flex items-center gap-2 text-xs uppercase h-9">
                        <PlusCircleIcon class="w-4 h-4" /> Add Day
                    </Button>
                </div>
            </div>

            <div class="space-y-4 max-h-[72vh] overflow-y-auto pr-2">
                <div v-for="(day, index) in itinerary" :key="index" @click="activeDayIndex = index" :class="[
                    'bg-card p-5 rounded-2xl flex gap-5 shadow-sm border border-border border-l-4 transition-all cursor-pointer group',
                    activeDayIndex === index ? 'border-l-primary ring-2 ring-primary/25 bg-primary/[0.01]' : 'border-l-slate-300 dark:border-l-slate-700'
                ]">
                    <div class="flex flex-col items-center justify-start pt-1">
                        <span class="text-[10px] font-black text-primary uppercase tracking-tighter">Day</span>
                        <span class="text-2xl font-black text-foreground">{{ day.day }}</span>
                    </div>
                    <div class="flex-1 space-y-3">
                        <Input v-model="day.title"
                            class="text-lg font-black text-foreground bg-transparent border-none p-0 h-auto focus-visible:ring-0 w-full"
                            type="text" placeholder="Day Title" @click.stop />
                        <Textarea v-model="day.description"
                            class="w-full text-sm text-muted-foreground bg-transparent border-none p-0 focus-visible:ring-0 resize-none min-h-[40px]"
                            rows="2" placeholder="Describe the activities for this day..." @click.stop />

                        <!-- Route Locations/Stopovers -->
                        <div class="pt-3 border-t border-border/50">
                            <label
                                class="text-[9px] font-black text-muted-foreground uppercase tracking-widest block mb-2">Route
                                Stopovers</label>
                            <div class="flex flex-wrap gap-2 items-center">
                                <div v-for="(place, pIdx) in (day.places || [])" :key="pIdx"
                                    class="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold transition-all cursor-pointer hover:bg-primary/20"
                                    @click.stop="focusOnPlace(place)">
                                    <span>📍</span>
                                    <input v-model="place.name" @click.stop
                                        class="bg-transparent border-none p-0 focus:ring-0 w-24 text-xs font-black text-primary focus:outline-none" />
                                     <div class="flex items-center gap-0.5 text-[10px] bg-primary/20 px-1.5 py-0.5 rounded font-black shrink-0">
                                         <input :value="place.elevation !== undefined ? place.elevation : 0"
                                             @change="place.elevation = Number(($event.target as HTMLInputElement).value)"
                                             @click.stop
                                             type="number"
                                             class="bg-transparent border-none p-0 focus:ring-0 w-10 text-[10px] font-black text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-primary" />
                                         <span>m</span>
                                     </div>
                                    <span class="text-[10px] opacity-60 font-medium">({{ place.lat.toFixed(4) }}, {{
                                        place.lng.toFixed(4) }})</span>

                                    <!-- Move Left/Right Buttons -->
                                    <div class="flex items-center gap-1 ml-1 border-l border-primary/20 pl-2 mr-0.5">
                                        <button type="button" @click.stop="movePlace(index, pIdx, -1)"
                                            :disabled="pIdx === 0"
                                            class="text-primary hover:text-primary-hover disabled:opacity-30 p-0.5 text-xs font-black">&larr;</button>
                                        <button type="button" @click.stop="movePlace(index, pIdx, 1)"
                                            :disabled="pIdx === (day.places?.length || 0) - 1"
                                            class="text-primary hover:text-primary-hover disabled:opacity-30 p-0.5 text-xs font-black">&rarr;</button>
                                    </div>

                                    <!-- Routing Mode Selector (only shown if not the last place) -->
                                    <select v-if="pIdx < (day.places?.length || 0) - 1"
                                        :value="place.routeType || (place.offRoad ? 'offroad' : 'foot')"
                                        @change="place.routeType = ($event.target as HTMLSelectElement).value as any"
                                        @click.stop
                                        class="bg-primary/10 border border-primary/20 text-primary text-[10px] font-black rounded px-1.5 py-0.5 focus:ring-0 focus:outline-none cursor-pointer shrink-0 ml-1">
                                        <option value="foot" class="bg-background text-foreground">🚶 Walk</option>
                                        <option value="bike" class="bg-background text-foreground">🚴 Cycle</option>
                                        <option value="car" class="bg-background text-foreground">🚗 Drive</option>
                                        <option value="offroad" class="bg-background text-foreground">📐 Off-road</option>
                                    </select>

                                    <button type="button" @click.stop="removePlace(index, pIdx)"
                                        class="hover:text-destructive text-primary/60 transition-colors font-black ml-1 text-sm">&times;</button>
                                </div>
                                <span v-if="!(day.places?.length)" class="text-xs text-muted-foreground italic">No
                                    stopovers added. Click map to add.</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col justify-start pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button @click.stop="removeItineraryDay(index)" variant="ghost" size="icon"
                            class="text-muted-foreground hover:text-destructive hover:bg-destructive/10 w-8 h-8 rounded-lg">
                            <Trash2Icon class="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right: Map Preview & Control (5 cols) -->
        <div class="lg:col-span-5 space-y-4">
            <div class="bg-card p-5 rounded-2xl border border-border/50 shadow-sm space-y-4 relative">
                <div class="flex items-center justify-between">
                    <h4 class="text-sm font-black text-foreground uppercase tracking-wider">Route Map Preview</h4>
                    <div class="flex items-center gap-2">
                        <!-- Routing Mode Button Group -->
                        <div class="flex items-center bg-muted p-0.5 rounded-lg border border-border/40">
                            <button type="button" @click="routingMode = 'route'"
                                :class="[
                                    routingMode === 'route' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground',
                                    'px-2.5 py-1 rounded-md text-[10px] font-black transition-all flex items-center gap-1'
                                ]">
                                <span>🛣️</span> Route
                            </button>
                            <button type="button" @click="routingMode = 'direct'"
                                :class="[
                                    routingMode === 'direct' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground',
                                    'px-2.5 py-1 rounded-md text-[10px] font-black transition-all flex items-center gap-1'
                                ]">
                                <span>📐</span> Direct
                            </button>
                        </div>
                        <span
                            class="text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-black uppercase tracking-wider">Interactive</span>
                    </div>
                </div>

                <!-- Location Search -->
                <div class="space-y-2 relative">
                    <div class="flex gap-2">
                        <Input v-model="searchQuery" placeholder="Search for a location (e.g. Namche Bazaar)"
                            @keyup.enter="searchLocation" class="bg-muted/10 border-border/50 text-xs h-9 rounded-xl" />
                        <Button @click="searchLocation" :disabled="isSearchingLocation" size="sm"
                            class="font-bold h-9 rounded-xl">
                            <Loader2Icon v-if="isSearchingLocation" class="w-3.5 h-3.5 animate-spin mr-1" />
                            Search
                        </Button>
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
                <div class="h-[480px] rounded-2xl overflow-hidden border border-border shadow-inner relative z-10">
                    <div id="itinerary-editor-map" class="w-full h-full absolute inset-0" />

                    <!-- Toggle Motion Button -->
                    <button @click.stop="toggleMotion"
                        class="absolute top-4 right-4 z-20 bg-background/95 backdrop-blur border border-border p-2 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 hover:bg-muted transition-all"
                        title="Toggle Animation Preview">
                        <span :class="[
                            'w-2 h-2 rounded-full',
                            isMotionEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                        ]"></span>
                        <span>{{ isMotionEnabled ? 'Pause Motion' : 'Play Motion' }}</span>
                    </button>

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
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                stroke-linejoin="round" class="text-primary">
                                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                            </svg>
                            Elevation Profile
                        </h4>
                        <div class="text-[10px] text-muted-foreground font-bold flex gap-3">
                            <span>Min: <span class="text-foreground font-black">{{ minElev }}m</span></span>
                            <span>Max: <span class="text-foreground font-black">{{ maxElev }}m</span></span>
                        </div>
                    </div>

                    <div class="relative h-[90px] w-full">
                        <svg ref="svgRef" viewBox="0 0 800 130" class="w-full h-full overflow-visible select-none"
                            @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
                            <defs>
                                <linearGradient id="elevation-gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stop-color="#f06723" stop-opacity="0.3" />
                                    <stop offset="100%" stop-color="#f06723" stop-opacity="0" />
                                </linearGradient>
                            </defs>

                            <!-- Grid lines -->
                            <line x1="0" y1="10" x2="800" y2="10" stroke="currentColor" stroke-dasharray="4 4"
                                class="text-border/40" />
                            <line x1="0" y1="70" x2="800" y2="70" stroke="currentColor" stroke-dasharray="4 4"
                                class="text-border/40" />
                            <line x1="0" y1="120" x2="800" y2="120" stroke="currentColor" class="text-border/40" />

                            <!-- Shaded Area -->
                            <path :d="areaPath" fill="url(#elevation-gradient)" />

                            <!-- Line Path -->
                            <path :d="linePath" stroke="#f06723" stroke-width="3" fill="none" stroke-linecap="round" />

                            <!-- Hover Indicator -->
                            <g v-if="hoveredPoint">
                                <line :x1="hoveredPoint.x" y1="10" :x2="hoveredPoint.x" y2="120" stroke="#3b82f6"
                                    stroke-width="1.5" stroke-dasharray="3 3" />
                                <circle :cx="hoveredPoint.x" :cy="hoveredPoint.y" r="5" fill="#3b82f6" stroke="#ffffff"
                                    stroke-width="2" />
                            </g>
                        </svg>

                        <!-- Hover Tooltip -->
                        <div v-if="hoveredPoint"
                            class="absolute top-[-30px] bg-background border border-border/80 rounded-lg px-2 py-1 text-[10px] font-black shadow-md pointer-events-none transform -translate-x-1/2"
                            :style="{ left: `${(hoveredPoint.x / 800) * 100}%` }">
                            {{ hoveredPoint.elevation }}m
                        </div>
                    </div>
                </div>

                <div
                    class="text-[11px] text-muted-foreground leading-relaxed bg-muted/10 p-3.5 rounded-xl border border-border/50">
                    <p class="font-bold text-foreground mb-1">💡 How to edit route:</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Click any Day box on the left to select it as the active day.</li>
                        <li><strong>Click anywhere on the map</strong> to drop coordinates into the active day.</li>
                        <li>Type coordinates' names directly in the text input inside the bubbles.</li>
                        <li>Use arrows (<span class="font-bold">&larr; &rarr;</span>) to reorder stopovers, and <span
                                class="font-bold">&times;</span> to delete.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.leaflet-container {
    z-index: 10 !important;
}

@keyframes marker-pulse {
    0% {
        transform: scale(0.8);
        opacity: 0.5;
    }

    100% {
        transform: scale(2.2);
        opacity: 0;
    }
}

.moving-marker-pulse {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    background-color: #ef4444;
    border-radius: 50%;
    animation: marker-pulse 1.8s infinite ease-out;
    pointer-events: none;
    z-index: -1;
}
</style>
