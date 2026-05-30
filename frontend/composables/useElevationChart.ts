import { ref, computed, type Ref } from 'vue'

export function useElevationChart(
    elevChartEl: Ref<SVGElement | null>,
    elevationData: Ref<[number, number, number, number][]>,
    waypointsData: Ref<{ dist: number, name: string, lat: number, lng: number }[]>,
    minElevation: Ref<number>,
    maxElevation: Ref<number>,
    callbacks: {
        setHoverMarker: (lat: number, lng: number) => void
        clearHoverMarker: () => void
    }
) {
    const hoverX = ref<number | null>(null) // 0-100 percent
    const hoverInfo = ref<{ dist: number; elev: number; name?: string; locationName?: string } | null>(null)
    
    let geocodeTimeout: any = null
    let currentGeocodeTarget = { lat: 0, lng: 0 }

    const fetchLocationName = (lat: number, lng: number) => {
        if (geocodeTimeout) clearTimeout(geocodeTimeout)
        currentGeocodeTarget = { lat, lng }

        if (hoverInfo.value) {
            hoverInfo.value.locationName = undefined
        }

        geocodeTimeout = setTimeout(async () => {
            if (currentGeocodeTarget.lat !== lat || currentGeocodeTarget.lng !== lng) return
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=14`)
                if (!res.ok) return
                const data = await res.json()
                if (currentGeocodeTarget.lat !== lat) return

                let place = data.name
                if (!place && data.address) {
                    const a = data.address
                    place = a.village || a.town || a.hamlet || a.suburb || a.city || a.municipality || a.county
                }

                if (hoverInfo.value && place) {
                    hoverInfo.value.locationName = place
                }
            } catch (e) {
                console.error("Geocoding failed", e)
            }
        }, 800)
    }

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

    const hoverLineX = computed(() => {
        if (hoverX.value === null || elevationData.value.length === 0) return null
        return hoverX.value
    })

    const hoverDotY = computed(() => {
        if (hoverX.value === null || elevationData.value.length === 0) return null
        const maxDist = elevationData.value[elevationData.value.length - 1][0] || 1
        const minElev = minElevation.value
        const elevRange = (maxElevation.value - minElev) || 1

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
        let xPercent = ((e.clientX - rect.left) / rect.width) * 100
        xPercent = Math.max(0, Math.min(100, xPercent))

        const maxDist = elevationData.value.length
            ? elevationData.value[elevationData.value.length - 1][0]
            : 1

        let snappedName = ''
        for (const wpt of waypointsData.value) {
            const wptPercent = (wpt.dist / maxDist) * 100
            if (Math.abs(xPercent - wptPercent) < 2) { // 2% snap threshold
                xPercent = wptPercent
                snappedName = wpt.name
                break
            }
        }

        hoverX.value = Math.max(0, Math.min(100, xPercent))

        const targetDist = (hoverX.value / 100) * maxDist
        const closest = findClosestPoint(targetDist)

        if (closest) {
            hoverInfo.value = { dist: closest[0], elev: closest[1], name: snappedName || undefined }

            if (snappedName) {
                if (geocodeTimeout) clearTimeout(geocodeTimeout)
            } else {
                fetchLocationName(closest[2], closest[3])
            }

            callbacks.setHoverMarker(closest[2], closest[3])
        }
    }

    function onChartMouseLeave() {
        hoverX.value = null
        hoverInfo.value = null
        callbacks.clearHoverMarker()
    }

    return {
        hoverX,
        hoverInfo,
        svgPoints,
        hoverLineX,
        hoverDotY,
        onChartMouseMove,
        onChartMouseLeave
    }
}
