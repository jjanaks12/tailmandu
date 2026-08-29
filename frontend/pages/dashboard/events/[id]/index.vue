<script lang="ts" setup>
import { MoveLeftIcon, RefreshCwIcon, EraserIcon, ClipboardListIcon, UsersIcon, ImagePlayIcon, MapIcon, HandHeartIcon, SettingsIcon, FlagIcon } from 'lucide-vue-next'
import type { TrailRace } from '~/lib/types'
import { useEventStore } from '~/store/event'
import { formatDate } from '~/lib/filters'
import ClearCacheButton from '@/components/pages/dashboard/event/ClearCacheButton.vue'
import TrailRaceUploadImage from '@/components/pages/dashboard/event/imageUpload.vue'
import TrailMapUploadMap from '@/components/pages/dashboard/event/mapUpload.vue'
import TrailRaceDescription from '@/components/pages/dashboard/event/description.vue'
import EventSidebar from '@/components/pages/dashboard/event/sidebar.vue'

useHead({
    title: 'Event Dashboard'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['event_view']
})

const route = useRoute()
const { get } = useEventStore()

const trailRace = ref<TrailRace | null>(null)
const isLoading = ref(false)

const fetchEventDetail = async () => {
    trailRace.value = await get(route.params.id as string)
}

onBeforeMount(() => {
    isLoading.value = true
    fetchEventDetail()
    isLoading.value = false
})
</script>

<template>
    <template v-if="trailRace">
        <TrailRaceUploadImage :trail-race="trailRace" @update="fetchEventDetail" />
        <div class="bg-white flex items-center gap-4 px-4 pt-4 pb-20 -mt-16 rounded-xl relative z-10">
            <div class="flex-grow flex items-center gap-4">
                <h1 class="text-2xl">{{ trailRace?.name }}</h1>
                <ClearCacheButton :event-id="route.params.id as string" />
            </div>
            <div class="flex gap-2 items-center">
                <Button @click="fetchEventDetail" variant="secondary" modifier="outline" size="icon">
                    <RefreshCwIcon :class="{ 'animate-spin': isLoading }" />
                </Button>
                <Button @click="navigateTo('/dashboard/events')">
                    <MoveLeftIcon />
                    Back
                </Button>
            </div>
        </div>

        <div class="flex flex-col md:flex-row gap-6 mt-4">
            <div class="flex-grow">
                <div class="flex flex-col gap-4">
                    <dl class="text-md">
                        <dt>Starts:</dt>
                        <dd>{{ formatDate(trailRace?.start as string) }}</dd>
                        <dt>Ends:</dt>
                        <dd>{{ formatDate(trailRace?.end as string) }}</dd>
                    </dl>
                    <div class="text">{{ trailRace.excerpt }}</div>
                    <TrailMapUploadMap :trail-race="trailRace" @update="fetchEventDetail" />
                    <TrailRaceDescription :trail-race="trailRace" @update="fetchEventDetail" />
                </div>
            </div>
            
            <EventSidebar />
        </div>
    </template>
</template>
