<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Maximize } from 'lucide-vue-next'
import { useGpxData } from '../composables/useGpxData'
import { useLeafletMap } from '../composables/useLeafletMap'
import { useElevationChart } from '../composables/useElevationChart'

interface MapProps {
    zoom?: number
    controls?: boolean
    gpxFile: string,
    showElevation?: boolean
}

const props = withDefaults(defineProps<MapProps>(), {
    zoom: 15,
    controls: true,
    showElevation: false
})

const mapEl = ref<HTMLElement | null>(null)
const elevChartEl = ref<SVGElement | null>(null)

// 1. GPX Data Parsing
const {
    elevationData,
    waypointsData,
    totalDistance,
    elevationGain,
    minElevation,
    maxElevation,
    startPoint,
    endPoint,
    parseGpxText,
    clearData
} = useGpxData()

// 2. Leaflet Map
const {
    initMap,
    destroyMap,
    drawCustomMarkers,
    loadGpxTrackLayer,
    fitMap,
    zoomToCheckpoint,
    setHoverMarker,
    clearHoverMarker
} = useLeafletMap(mapEl, props.controls, waypointsData, startPoint, endPoint)

// 3. Elevation Chart
const {
    hoverX,
    hoverInfo,
    svgPoints,
    hoverLineX,
    hoverDotY,
    onChartMouseMove,
    onChartMouseLeave
} = useElevationChart(
    elevChartEl,
    elevationData,
    waypointsData,
    minElevation,
    maxElevation,
    { setHoverMarker, clearHoverMarker }
)

const loadGPX = async () => {
    if (!props.gpxFile) return
    clearData()

    try {
        const response = await fetch(props.gpxFile)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        let gpxText = await response.text()
        gpxText = gpxText.trim()

        if (!gpxText.startsWith('<')) {
            throw new Error('Invalid GPX file format')
        }

        parseGpxText(gpxText, props.showElevation)
        drawCustomMarkers()
        loadGpxTrackLayer(gpxText)

    } catch (error) {
        console.error('Error fetching or loading GPX:', error)
    }
}

watch(() => props.gpxFile, () => {
    loadGPX()
})

onMounted(() => {
    initMap()
    loadGPX()
})

onBeforeUnmount(() => {
    destroyMap()
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
                title="Fit to track">
                <Maximize class="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>
        </div>

        <!-- Elevation Profile -->
        <div v-if="showElevation && elevationData.length > 0"
            class="hidden md:block h-32 lg:h-48 w-full shrink-0 relative bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 select-none py-1 lg:py-2 cursor-crosshair"
            @mousemove="onChartMouseMove" @mouseleave="onChartMouseLeave">

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
            <svg ref="elevChartEl" class="w-full h-full overflow-visible" preserveAspectRatio="none"
                viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="elevationGrad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-color="#f06723" stop-opacity="0.25" />
                        <stop offset="100%" stop-color="#f06723" stop-opacity="0" />
                    </linearGradient>
                </defs>

                <!-- Area fill -->
                <polyline :points="svgPoints" fill="url(#elevationGrad)" stroke="#f06723" stroke-width="1.5"
                    vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" />

                <!-- Checkpoints / Waypoints -->
                <template v-if="elevationData.length > 0">
                    <g v-for="(wpt, index) in waypointsData" :key="'wpt-' + index" class="cursor-pointer"
                        @click.stop="zoomToCheckpoint(wpt)">
                        <line :x1="(wpt.dist / (elevationData[elevationData.length - 1][0] || 1)) * 100" y1="0"
                            :x2="(wpt.dist / (elevationData[elevationData.length - 1][0] || 1)) * 100" y2="100"
                            stroke="transparent" stroke-width="24" vector-effect="non-scaling-stroke" />
                        <line :x1="(wpt.dist / (elevationData[elevationData.length - 1][0] || 1)) * 100" y1="0"
                            :x2="(wpt.dist / (elevationData[elevationData.length - 1][0] || 1)) * 100" y2="100"
                            class="stroke-slate-300 dark:stroke-slate-700" stroke-width="1" stroke-dasharray="2,2"
                            vector-effect="non-scaling-stroke" />
                        <text :x="(wpt.dist / (elevationData[elevationData.length - 1][0] || 1)) * 100 + 0.5" y="15"
                            class="fill-slate-500 dark:fill-slate-400" font-size="3" font-weight="bold">{{ wpt.name
                            }}</text>
                    </g>
                </template>

                <!-- Hover vertical line -->
                <line v-if="hoverLineX !== null" :x1="hoverLineX" y1="0" :x2="hoverLineX" y2="100" stroke="#f06723"
                    stroke-width="0.5" stroke-dasharray="2,2" vector-effect="non-scaling-stroke" />
            </svg>

            <!-- Hover dot -->
            <div v-if="hoverLineX !== null && hoverDotY !== null"
                class="absolute pointer-events-none w-3 h-3 rounded-full bg-[#f06723] border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2"
                :style="{ left: `${hoverX}%`, top: `${hoverDotY}%` }" />

            <!-- Hover Tooltip -->
            <Transition name="fade">
                <div v-if="hoverInfo && hoverX !== null" class="absolute pointer-events-none" :style="{
                    left: `clamp(4px, calc(${hoverX}% - 44px), calc(100% - 92px))`,
                    bottom: '10px'
                }">
                    <div
                        class="bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 text-[10px] font-semibold rounded-lg px-2.5 py-1.5 shadow-xl whitespace-nowrap backdrop-blur-sm flex flex-col items-center">
                        <span v-if="hoverInfo.name" class="text-[#f06723] pb-0.5">{{ hoverInfo.name }}</span>
                        <span v-else-if="hoverInfo.locationName" class="text-slate-300 dark:text-slate-500 pb-0.5">{{
                            hoverInfo.locationName }}</span>
                        <span>📍 {{ hoverInfo.dist.toFixed(2) }} km &nbsp;·&nbsp; {{ hoverInfo.elev.toFixed(0) }}
                            m</span>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style>
.leaflet-container {
    z-index: 10 !important;
}

/* Hide all default Leaflet image markers (and their shadows) since we use custom div-based markers */
img.leaflet-marker-icon,
img.leaflet-marker-shadow {
    display: none !important;
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