<script setup lang="ts">
import { Loader2Icon, PlusCircleIcon, Trash2Icon, Expand, Shrink, Maximize } from 'lucide-vue-next'
import type { Trek } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { ref, computed, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'

interface Place {
    name: string
    lat: number
    lng: number
    elevation?: number
    offRoad?: boolean
    routeType?: 'foot' | 'bike' | 'car' | 'offroad' | 'flight'
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

const mapRef = ref<any>(null)
const routingMode = ref<'route' | 'direct'>('route')
const elevationProfile = ref<{ lat: number, lng: number, elevation: number }[]>([])

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

const focusOnPlace = (place: Place) => {
    if (mapRef.value) {
        mapRef.value.focusOnPlace(place.lat, place.lng)
    }
}

onMounted(() => {
    if (props.trek.details?.itinerary) {
        itinerary.value = JSON.parse(JSON.stringify(props.trek.details.itinerary))
    }
    if (props.trek.details?.routingMode) {
        routingMode.value = props.trek.details.routingMode
    }
    if (props.trek.details?.elevationProfile) {
        elevationProfile.value = props.trek.details.elevationProfile
    }
    if (itinerary.value.length > 0) {
        activeDayIndex.value = 0
    }
})

watch(() => props.trek, (newTrek) => {
    if (newTrek?.details?.itinerary) {
        itinerary.value = JSON.parse(JSON.stringify(newTrek.details.itinerary))
    }
    if (newTrek?.details?.routingMode) {
        routingMode.value = newTrek.details.routingMode
    }
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
                                        <option value="flight" class="bg-background text-foreground">✈️ Flight</option>
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
            <ItineraryEditorMap
                ref="mapRef"
                v-model:itinerary="itinerary"
                v-model:elevationProfile="elevationProfile"
                v-model:activeDayIndex="activeDayIndex"
                :routing-mode="routingMode"
            />
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
