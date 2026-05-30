import { ref, shallowRef } from 'vue'
import L from 'leaflet'

export function useGpxData() {
    const elevationData = ref<[number, number, number, number][]>([]) // [dist, elev, lat, lng]
    const waypointsData = ref<{ dist: number, name: string, lat: number, lng: number }[]>([])
    const totalDistance = ref(0)
    const elevationGain = ref(0)
    const minElevation = ref(0)
    const maxElevation = ref(0)
    
    // Track points for map use if needed
    const startPoint = shallowRef<[number, number, number, number] | null>(null)
    const endPoint = shallowRef<[number, number, number, number] | null>(null)

    const clearData = () => {
        elevationData.value = []
        waypointsData.value = []
        totalDistance.value = 0
        elevationGain.value = 0
        minElevation.value = 0
        maxElevation.value = 0
        startPoint.value = null
        endPoint.value = null
    }

    const parseGpxText = (gpxText: string) => {
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
            
            startPoint.value = points[0]
            endPoint.value = points[points.length - 1]

            // Extract waypoints for elevation graph
            const wpts = Array.from(gpxDoc.querySelectorAll('wpt'))
            const wptList: { dist: number, name: string, lat: number, lng: number }[] = []

            wpts.forEach((wpt) => {
                const lat = parseFloat(wpt.getAttribute('lat') || '0')
                const lng = parseFloat(wpt.getAttribute('lon') || '0')
                const nameEl = wpt.querySelector('name')
                const name = nameEl ? nameEl.textContent || '' : ''

                // Find closest point on the track to get the distance
                let minWptDiff = Infinity
                let closestDist = 0
                for (let pt of points) {
                    const d = L.latLng(lat, lng).distanceTo(L.latLng(pt[2], pt[3]))
                    if (d < minWptDiff) {
                        minWptDiff = d
                        closestDist = pt[0] // distance in km
                    }
                }
                wptList.push({ dist: closestDist, name, lat, lng })
            })
            waypointsData.value = wptList

            // Sum of all positive climbs
            let gain = 0
            for (let i = 1; i < points.length; i++) {
                const diff = points[i][1] - points[i - 1][1]
                if (diff > 0) gain += diff
            }
            elevationGain.value = gain
        }
    }

    return {
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
    }
}
