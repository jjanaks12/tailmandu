<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { Maximize } from 'lucide-vue-next'
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
    itinerary?: any[]
    elevationProfile?: any[]
    routingMode?: 'route' | 'direct'
    activeDayIndex?: number | null
}

const props = defineProps<Props>()

const mapEl = ref<HTMLElement | null>(null)
let map: any = null
let polyline: any = null
let polylines: any[] = []
let animatedMarker: any = null
let markers: any[] = []
const markersMap = new Map<string, any>()
let animationFrameId: number | null = null
let nextLegTimeoutId: any = null

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

onMounted(() => {
    initMap()
    drawRoute()
    if (props.activeDayIndex !== null && props.activeDayIndex !== undefined) {
        focusOnDay(props.activeDayIndex)
    }
})

onBeforeUnmount(() => {
    stopAnimation()
    destroyMap()
    polylines.forEach(p => p.remove())
    polylines = []
    if (hoverMarker) {
        hoverMarker.remove()
        hoverMarker = null
    }
})

const initMap = () => {
    if (!L || !mapEl.value) return
    map = L.map(mapEl.value).setView([27.7172, 85.3240], 8)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)
}

const destroyMap = () => {
    if (map) {
        map.remove()
        map = null
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
    const places = (props.itinerary || []).flatMap((day: any) => day.places || [])
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
        const p1 = L.latLng(sampled[i-1][0], sampled[i-1][1])
        const p2 = L.latLng(sampled[i][0], sampled[i][1])
        distances.push(distances[i-1] + p1.distanceTo(p2))
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
            if (d >= placePositions[i].distance && d <= placePositions[i+1].distance) {
                p1 = placePositions[i]
                p2 = placePositions[i+1]
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

    const places = (props.itinerary || []).flatMap((day: any) => day.places || [])
    if (places.length === 0) {
        elevationProfile.value = []
        return
    }

    // Draw static markers for all locations using custom divIcon to avoid global image-hiding CSS
    places.forEach((place: Place, index: number) => {
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

    const getRouteType = (place: Place): 'foot' | 'bike' | 'car' | 'offroad' => {
        if (place.routeType) return place.routeType
        if (place.offRoad) return 'offroad'
        return 'foot'
    }

    // Try to fetch OSRM route along walking paths, respecting routeType settings
    let routeCoords: L.LatLngTuple[] = []

    if (props.routingMode === 'direct') {
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
        map.fitBounds(bounds, { padding: [50, 50] })
    }

    // Fetch elevation profile in background if not already pre-saved in the database
    if (props.elevationProfile && props.elevationProfile.length > 0) {
        elevationProfile.value = props.elevationProfile
    } else {
        elevationProfile.value = await fetchElevationProfile(routeCoords)
    }

    // Create the animated marker with a custom Lucide navigation icon and pulsing effect
    const animatedIcon = L.divIcon({
        html: `
            <div style="position: relative; width: 24px; height: 24px;">
                <div class="moving-marker-pulse"></div>
                <div class="moving-marker-icon" style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #44859d;
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

        // If the elapsed time is too long, skip to prevent huge jumps
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

        // Interpolate LatLng based on progress to ensure it stays exactly on the path
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

        // Keep map centered on the marker only if not all places are currently visible in the viewport
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

            // Leg completed! Reset progress
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
                lastFrameTime = 0 // Reset frame time so we don't have a jump
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

watch(() => [props.itinerary, props.routingMode], () => {
    drawRoute()
}, { deep: true })

const focusOnDay = (dayIndex: number) => {
    if (!map || !props.itinerary) return
    const day = props.itinerary[dayIndex]

    if (day && day.places && day.places.length > 0) {
        if (day.places.length > 1) {
            const bounds = L.latLngBounds(day.places.map((p: Place) => [p.lat, p.lng] as L.LatLngTuple))
            map.fitBounds(bounds, { padding: [100, 100], maxZoom: 12 })
        } else {
            const firstPlace = day.places[0]
            map.setView([firstPlace.lat, firstPlace.lng], 12)
        }

        // Open popup of the first place of this day
        const firstPlace = day.places[0]
        const marker = markersMap.get(`${firstPlace.lat}-${firstPlace.lng}`)
        if (marker) {
            setTimeout(() => {
                if (marker) marker.openPopup()
            }, 200)
        }
    }
}

watch(() => props.activeDayIndex, (newVal) => {
    if (newVal === null || newVal === undefined) return
    focusOnDay(newVal)
})

const fitMap = () => {
    if (map && polyline) {
        map.fitBounds(polyline.getBounds(), { padding: [50, 50] })
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

defineExpose({
    focusOnPlace
})
</script>

<template>
    <div
        class="relative w-full h-full min-h-[400px] flex flex-col bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
        <!-- Map Container -->
        <div class="flex-1 relative min-h-[300px]">
            <div ref="mapEl" class="w-full h-full absolute inset-0 z-10" />
            <button @click="fitMap"
                class="absolute top-4 right-4 z-20 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                title="Fit map">
                <Maximize class="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>
        </div>

        <!-- Elevation Profile Chart -->
        <div v-if="elevationProfile.length > 0" class="p-4 bg-muted/20 border-t border-border/40 relative">
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

            <div class="relative h-[80px] w-full">
                <svg ref="svgRef" viewBox="0 0 800 130" class="w-full h-full overflow-visible select-none"
                    @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
                    <defs>
                        <linearGradient id="elevation-gradient-client" x1="0" y1="0" x2="0" y2="1">
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
                    <path :d="areaPath" fill="url(#elevation-gradient-client)" />

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
