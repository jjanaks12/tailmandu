<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-gpx'

interface MapProps {
    zoom?: number
    controls?: boolean
    gpxFile: string
}

const props = withDefaults(defineProps<MapProps>(), {
    zoom: 15,
    controls: true
})

const mapEl = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let gpxLayer: any = null
let resizeObserver: ResizeObserver | null = null

// Hover marker on map
let hoverMarker: L.CircleMarker | null = null

// Elevation state
const elevationData = ref<[number, number, number, number][]>([]) // [dist, elev, lat, lng]
const totalDistance = ref(0)
const elevationGain = ref(0)
const minElevation = ref(0)
const maxElevation = ref(0)

// Hover state for chart
const hoverX = ref<number | null>(null) // 0-100 percent
const hoverInfo = ref<{ dist: number; elev: number } | null>(null)
const elevChartEl = ref<SVGElement | null>(null)

const svgPoints = computed(() => {
    if (elevationData.value.length === 0) return ''

    const maxDist = elevationData.value[elevationData.value.length - 1][0] || 1
    const minElev = minElevation.value
    const maxElev = maxElevation.value
    const elevRange = (maxElev - minElev) || 1

    let points = '0,100 ' // Start bottom-left for fill

    elevationData.value.forEach(([dist, elev]) => {
        const x = (dist / maxDist) * 100
        const y = 100 - (((elev - minElev) / elevRange) * 80 + 10)
        points += `${x},${y} `
    })

    points += `100,100` // End bottom-right for fill
    return points
})

// The Y coordinate of the hover line on the SVG (0-100 viewBox)
const hoverLineX = computed(() => {
    if (hoverX.value === null || elevationData.value.length === 0) return null
    return hoverX.value
})

// The Y position of the dot on the chart at hover
const hoverDotY = computed(() => {
    if (hoverX.value === null || elevationData.value.length === 0) return null
    const maxDist = elevationData.value[elevationData.value.length - 1][0] || 1
    const minElev = minElevation.value
    const elevRange = (maxElevation.value - minElev) || 1

    // Find the closest data point by distance fraction
    const targetDist = (hoverX.value / 100) * maxDist
    const closest = findClosestPoint(targetDist)
    if (!closest) return null

    return 100 - (((closest[1] - minElev) / elevRange) * 80 + 10)
})

function findClosestPoint(targetDist: number): [number, number, number, number] | null {
    if (elevationData.value.length === 0) return null
    let closest = elevationData.value[0]
    let minDiff = Math.abs(elevationData.value[0][0] - targetDist)
    for (const point of elevationData.value) {
        const diff = Math.abs(point[0] - targetDist)
        if (diff < minDiff) {
            minDiff = diff
            closest = point
        }
    }
    return closest
}

function onChartMouseMove(e: MouseEvent) {
    if (!elevChartEl.value) return
    const rect = elevChartEl.value.getBoundingClientRect()
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100

    hoverX.value = Math.max(0, Math.min(100, xPercent))

    const maxDist = elevationData.value.length
        ? elevationData.value[elevationData.value.length - 1][0]
        : 1
    const targetDist = (hoverX.value / 100) * maxDist
    const closest = findClosestPoint(targetDist)

    if (closest) {
        hoverInfo.value = { dist: closest[0], elev: closest[1] }

        // Move marker on map
        if (map) {
            const latlng = L.latLng(closest[2], closest[3])
            if (!hoverMarker) {
                hoverMarker = L.circleMarker(latlng, {
                    radius: 8,
                    color: '#f06723',
                    fillColor: '#fff',
                    fillOpacity: 1,
                    weight: 3,
                }).addTo(map)
            } else {
                hoverMarker.setLatLng(latlng)
            }
        }
    }
}

function onChartMouseLeave() {
    hoverX.value = null
    hoverInfo.value = null
    if (hoverMarker && map) {
        map.removeLayer(hoverMarker)
        hoverMarker = null
    }
}

const initMap = () => {
    if (!mapEl.value || map) return

    map = L.map(mapEl.value, {
        zoomControl: props.controls,
        scrollWheelZoom: false,
    })

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> | &copy; <a href="https://carto.com/">CartoDB</a>',
    }).addTo(map)

    // Fix for map inside Dialog: invalidate size when container becomes visible/resizes
    resizeObserver = new ResizeObserver(() => {
        if (map) {
            map.invalidateSize()
        }
    })
    resizeObserver.observe(mapEl.value)

    loadGPX()
}

const loadGPX = async () => {
    if (!map) return

    // Remove existing layer if changing races
    if (gpxLayer) {
        map.removeLayer(gpxLayer)
        gpxLayer = null
    }

    // Remove hover marker too
    if (hoverMarker && map) {
        map.removeLayer(hoverMarker)
        hoverMarker = null
    }

    elevationData.value = []

    if (!props.gpxFile) return

    try {
        const response = await fetch(props.gpxFile)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        let gpxText = await response.text()
        gpxText = gpxText.trim()

        if (!gpxText.startsWith('<')) {
            throw new Error('Invalid GPX file format')
        }

        // --- Parse GPX XML directly for accurate lat/lng/elevation per track point ---
        const parser = new DOMParser()
        const gpxDoc = parser.parseFromString(gpxText, 'application/xml')
        const trkpts = Array.from(gpxDoc.querySelectorAll('trkpt'))

        if (trkpts.length > 0) {
            let cumulativeDist = 0
            const points: [number, number, number, number][] = []

            trkpts.forEach((pt, i) => {
                const lat = parseFloat(pt.getAttribute('lat') || '0')
                const lng = parseFloat(pt.getAttribute('lon') || '0')
                const eleEl = pt.querySelector('ele')
                const elev = eleEl ? parseFloat(eleEl.textContent || '0') : 0

                if (i > 0 && points.length > 0) {
                    const prev = points[i - 1]
                    cumulativeDist += L.latLng(prev[2], prev[3]).distanceTo(L.latLng(lat, lng)) / 1000 // km
                }

                points.push([cumulativeDist, elev, lat, lng])
            })

            elevationData.value = points
            totalDistance.value = cumulativeDist * 1000 // meters

            const elevs = points.map(p => p[1])
            minElevation.value = Math.min(...elevs)
            maxElevation.value = Math.max(...elevs)

            // Sum of all positive climbs
            let gain = 0
            for (let i = 1; i < points.length; i++) {
                const diff = points[i][1] - points[i - 1][1]
                if (diff > 0) gain += diff
            }
            elevationGain.value = gain
        }

        gpxLayer = new L.GPX(gpxText, {
            async: true,
            marker_options: {
                startIconUrl: '',
                endIconUrl: '',
                shadowUrl: '',
                wptIconUrls: {}
            },
            polyline_options: {
                color: '#f06723',
                weight: 4,
                opacity: 0.9,
                lineCap: 'round',
                lineJoin: 'round'
            }
        }).on('loaded', function (e: any) {
            if (map) {
                map.fitBounds(e.target.getBounds(), { padding: [50, 50] })
            }
        }).on('error', function (e: any) {
            console.error('Failed to load or parse GPX file', e)
        }).addTo(map)
    } catch (error) {
        console.error('Error fetching or loading GPX:', error)
    }
}

watch(() => props.gpxFile, () => {
    loadGPX()
})

onMounted(() => {
    initMap()
})

onBeforeUnmount(() => {
    if (resizeObserver) {
        resizeObserver.disconnect()
    }
    if (map) {
        map.remove()
    }
})
</script>

<template>
    <div
        class="relative w-full h-full min-h-[400px] flex flex-col bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
        <!-- Map Container -->
        <div class="flex-1 relative min-h-[300px]">
            <div ref="mapEl" class="w-full h-full absolute inset-0 z-10" />
        </div>

        <!-- Elevation Profile -->
        <div v-if="elevationData.length > 0"
            class="h-32 lg:h-48 w-full shrink-0 relative bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 select-none">
            <!-- Stats -->
            <div class="absolute top-3 left-5 z-20 flex gap-6 pointer-events-none">
                <div class="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-tight">
                    Distance <br>
                    <span class="text-sm text-slate-800 dark:text-slate-200">{{ (totalDistance / 1000).toFixed(1) }}
                        km</span>
                </div>
                <div class="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-tight">
                    Elevation Gain <br>
                    <span class="text-sm text-slate-800 dark:text-slate-200">{{ elevationGain.toFixed(0) }} m</span>
                </div>
                <div
                    class="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-tight hidden sm:block">
                    Peak <br>
                    <span class="text-sm text-slate-800 dark:text-slate-200">{{ maxElevation.toFixed(0) }} m</span>
                </div>
            </div>

            <!-- SVG Chart with hover interaction -->
            <svg ref="elevChartEl" class="w-full h-full cursor-crosshair" preserveAspectRatio="none"
                viewBox="0 0 100 100" @mousemove="onChartMouseMove" @mouseleave="onChartMouseLeave">
                <defs>
                    <linearGradient id="elevationGrad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-color="#f06723" stop-opacity="0.25" />
                        <stop offset="100%" stop-color="#f06723" stop-opacity="0" />
                    </linearGradient>
                </defs>

                <!-- Area fill -->
                <polyline :points="svgPoints" fill="url(#elevationGrad)" stroke="#f06723" stroke-width="1.5"
                    vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" />

                <!-- Hover vertical line -->
                <line v-if="hoverLineX !== null" :x1="hoverLineX" y1="0" :x2="hoverLineX" y2="100" stroke="#f06723"
                    stroke-width="0.5" stroke-dasharray="2,2" vector-effect="non-scaling-stroke" />

                <!-- No circle here — rendered as a real div below to avoid viewBox distortion -->
            </svg>

            <!-- Hover dot — real CSS circle to avoid SVG aspect-ratio distortion -->
            <div v-if="hoverLineX !== null && hoverDotY !== null"
                class="absolute pointer-events-none w-3 h-3 rounded-full bg-[#f06723] border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2"
                :style="{ left: `${hoverX}%`, top: `${hoverDotY}%` }" />

            <!-- Hover Tooltip — placed AFTER svg so it renders on top -->
            <Transition name="fade">
                <div v-if="hoverInfo && hoverX !== null" class="absolute pointer-events-none" :style="{
                    left: `clamp(4px, calc(${hoverX}% - 44px), calc(100% - 92px))`,
                    bottom: '10px'
                }">
                    <div
                        class="bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 text-[10px] font-semibold rounded-lg px-2.5 py-1 shadow-xl whitespace-nowrap backdrop-blur-sm">
                        📍 {{ hoverInfo.dist.toFixed(2) }} km &nbsp;·&nbsp; {{ hoverInfo.elev.toFixed(0) }} m
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style>
/* Leaflet uses z-index heavily, ensuring it doesn't overlap dialog close button */
.leaflet-container {
    z-index: 10 !important;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>