import axios from 'axios'

interface Place {
    name: string
    lat: number
    lng: number
    elevation?: number
    offRoad?: boolean
    routeType?: 'foot' | 'bike' | 'car' | 'offroad' | 'flight'
    routeToNext?: [number, number][]
}

export class MapService {
    // Haversine distance in meters
    private static distance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371e3 // metres
        const φ1 = lat1 * Math.PI / 180
        const φ2 = lat2 * Math.PI / 180
        const Δφ = (lat2 - lat1) * Math.PI / 180
        const Δλ = (lon2 - lon1) * Math.PI / 180

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

        return R * c
    }

    private static sampleCoords(coords: [number, number][], maxPoints = 80): [number, number][] {
        if (coords.length === 0) return []
        if (coords.length === 1) return coords

        const distances = [0]
        for (let i = 1; i < coords.length; i++) {
            distances.push(distances[i - 1] + this.distance(coords[i - 1][0], coords[i - 1][1], coords[i][0], coords[i][1]))
        }
        const totalDist = distances[distances.length - 1]

        if (totalDist === 0) return coords

        const sampled: [number, number][] = []
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

    private static getRouteType(place: Place): 'foot' | 'bike' | 'car' | 'offroad' | 'flight' | 'none' {
        if (place.routeType) return place.routeType as any
        if (place.offRoad) return 'offroad'
        return 'foot'
    }

    private static async fetchRouteGeometry(from: Place, to: Place, type: 'foot' | 'bike' | 'car' | 'offroad' | 'flight' | 'none'): Promise<[number, number][]> {
        if (type === 'flight' || type === 'offroad' || type === 'none') {
            return [[from.lat, from.lng], [to.lat, to.lng]]
        }

        const profileMap: Record<string, string> = {
            'foot': 'trekking',
            'bike': 'trekking-bicycle',
            'car': 'car-fast'
        }
        const profile = profileMap[type] || 'trekking'

        // For long car routes, use OSRM as it's faster and has higher limits than BRouter
        if (type === 'car') {
            try {
                const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`
                const { data: osrmData } = await axios.get(osrmUrl, { timeout: 10000 })
                if (osrmData.code === 'Ok' && osrmData.routes.length > 0) {
                    return osrmData.routes[0].geometry.coordinates.map((c: number[]) => [c[1], c[0]])
                }
            } catch (e) {
                console.error('OSRM failed on backend, falling back to BRouter', e)
            }
        }

        try {
            const url = `https://brouter.de/brouter?lonlats=${from.lng},${from.lat}|${to.lng},${to.lat}&profile=${profile}&alternativeidx=0&format=geojson`
            const { data } = await axios.get(url, { timeout: 10000 })

            if (data.features && data.features.length > 0) {
                const feature = data.features[0]
                const trackLength = parseInt(feature.properties['track-length']) || 0
                const straightLineDist = this.distance(from.lat, from.lng, to.lat, to.lng)

                // Relaxed safeguard for mountain routes which can zigzag heavily
                if (straightLineDist > 2000 && (trackLength > straightLineDist * 15 || trackLength < straightLineDist * 0.2)) {
                    console.warn(`BRouter route rejected (absurd distance: ${trackLength}m vs ${straightLineDist}m). Falling back to straight line.`)
                    return [[from.lat, from.lng], [to.lat, to.lng]]
                }

                // BRouter returns [lng, lat], map to [lat, lng]
                return feature.geometry.coordinates.map((c: number[]) => [c[1], c[0]])
            }
        } catch (e) {
            console.error('Failed to fetch route from BRouter on backend', e)
        }

        return [[from.lat, from.lng], [to.lat, to.lng]]
    }

    private static async fetchElevationProfile(coords: [number, number][], validPlaces: Place[]) {
        if (coords.length === 0) return []
        const sampled = this.sampleCoords(coords, 80)
        
        try {
            const lats = sampled.map(c => c[0]).join(',')
            const lngs = sampled.map(c => c[1]).join(',')
            const url = `https://api.open-meteo.com/v1/elevation?latitude=${lats}&longitude=${lngs}`
            const { data } = await axios.get(url, { timeout: 10000 })
            
            if (data && data.elevation) {
                return sampled.map((coord, idx) => ({
                    lat: coord[0],
                    lng: coord[1],
                    elevation: Math.round(data.elevation[idx] || 0)
                }))
            }
        } catch (e) {
            console.warn('Failed to fetch elevation profile from Open-Meteo on backend, falling back to local interpolation', e)
        }

        // Fallback: Linear interpolation using the places' elevations
        if (validPlaces.length === 0) {
            return sampled.map(coord => ({ lat: coord[0], lng: coord[1], elevation: 0 }))
        }
        if (validPlaces.length === 1) {
            const elev = validPlaces[0].elevation || 0
            return sampled.map(coord => ({ lat: coord[0], lng: coord[1], elevation: elev }))
        }

        const distances: number[] = [0]
        for (let i = 1; i < sampled.length; i++) {
            distances.push(distances[i - 1] + this.distance(sampled[i - 1][0], sampled[i - 1][1], sampled[i][0], sampled[i][1]))
        }
        const totalDistance = distances[distances.length - 1] || 1

        const placePositions: { distance: number, elevation: number }[] = []
        validPlaces.forEach(place => {
            let minDistance = Infinity
            let closestIdx = 0

            sampled.forEach((coord, idx) => {
                const dist = this.distance(coord[0], coord[1], place.lat, place.lng)
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

    public static async enrichTrekDetails(details: any) {
        if (!details || !details.itinerary || !Array.isArray(details.itinerary)) {
            return details
        }

        const routingMode = details.routingMode || 'route'
        const places = details.itinerary.flatMap((day: any) => day.places || []) as Place[]
        
        if (places.length === 0) {
            details.elevationProfile = []
            return details
        }

        if (places.length === 1) {
            details.elevationProfile = [{ lat: places[0].lat, lng: places[0].lng, elevation: places[0].elevation || 0 }]
            return details
        }

        let routeCoords: [number, number][] = []

        // Extract route geometry for each segment
        for (let i = 0; i < places.length - 1; i++) {
            const fromPlace = places[i]
            const toPlace = places[i + 1]
            const type = this.getRouteType(fromPlace)

            let coords: [number, number][] = [
                [fromPlace.lat, fromPlace.lng],
                [toPlace.lat, toPlace.lng]
            ]

            if (routingMode === 'route') {
                coords = await this.fetchRouteGeometry(fromPlace, toPlace, type)
            }

            // Save this segment's geometry on the fromPlace to pass it to the frontend
            fromPlace.routeToNext = coords

            // Append to overall route for elevation profiling
            if (i === 0) {
                routeCoords.push(...coords)
            } else {
                routeCoords.push(...coords.slice(1)) // avoid duplicating the waypoint
            }
        }

        // Add back routeToNext to the original itinerary structure
        let placeCounter = 0
        for (const day of details.itinerary) {
            if (day.places) {
                for (let j = 0; j < day.places.length; j++) {
                    day.places[j].routeToNext = places[placeCounter].routeToNext
                    placeCounter++
                }
            }
        }

        const validPlaces = places.filter(p => p.elevation !== undefined && p.elevation !== null)
        details.elevationProfile = await this.fetchElevationProfile(routeCoords, validPlaces)

        return details
    }
}
