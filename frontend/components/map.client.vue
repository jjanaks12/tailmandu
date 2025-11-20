<script lang="ts" setup>
    import { Icon, LatLngBounds, Layer, type LeafletEvent } from 'leaflet'
    import { MinusIcon, PlusIcon } from 'lucide-vue-next'

    import type { Leaflet } from '~/lib/types'

    const leaflet: Leaflet = (await import('leaflet')).default
    await import('leaflet-gpx')

    interface MapEmits {
        (e: "ready", L: Leaflet, map: L.Map): void
    }

    interface MapProps {
        zoom?: number
        controls?: boolean
        // center: LatLngTuple
        gpxFile: string
    }

    let map: L.Map
    let center: LatLngBounds

    const emit = defineEmits<MapEmits>()
    const props = withDefaults(defineProps<MapProps>(), {
        zoom: 15,
        controls: true
    })

    const ready = ref(false)
    const mapEl = ref<HTMLElement | null>(null)

    const zoomIn = () => {
        map?.setZoom(map.getZoom() + 1)
    }

    const zoomOut = () => {
        map?.setZoom(map.getZoom() - 1)
    }

    const onMapReady = () => {
        emit("ready", leaflet, map)
        ready.value = true
    }

    const init = () => {
        if (!mapEl.value)
            return

        map = leaflet.map(mapEl.value, {
            worldCopyJump: true,
            scrollWheelZoom: false,
            minZoom: 3,
            zoomControl: false
        })
            .whenReady(onMapReady)

        leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
        })
            .addTo(map)

        if (props.gpxFile) {
            // @ts-expect-error
            new L.GPX(props.gpxFile, {
                async: true,
                polyline_options: {
                    color: '#f06723',
                    weight: 3
                },
                marker_options: {
                    endIconUrl: 'leaf-green.png',
                    startIconUrl: 'leaf-red.png',
                    wptIcons: {

                    }
                },

            })
                .on('loaded', (e) => {
                    center = e.target.getBounds()
                    map.fitBounds(e.target.getBounds())
                })
                .on('layeradd', (e) => {
                    console.log(e.layer._layers);
                })
                .addTo(map)
        }
    }

    watch(() => props.gpxFile, () => {
        init()
    })

    onMounted(async () => {
        init()
    })
</script>

<template>
    <div class="relative overflow-hidden w-full aspect-video">
        <div class="bg-white w-full h-full rounded-md" ref="mapEl" />
        <div class="flex gap-2 p-2 absolute bottom-0 left-1/2 -translate-x-1/2">
            <Button variant="secondary" size="icon" @click="zoomIn">
                <PlusIcon />
            </Button>
            <Button variant="secondary" size="icon" @click="zoomOut">
                <MinusIcon />
            </Button>
        </div>
    </div>
</template>