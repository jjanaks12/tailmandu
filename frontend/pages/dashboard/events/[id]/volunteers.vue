<script lang="ts" setup>
import type { TrailRace } from '~/lib/types'
import { useEventStore } from '~/store/event'
import VolunteerList from '@/components/pages/dashboard/event/volunteer/list.vue'
import EventSidebar from '@/components/pages/dashboard/event/sidebar.vue'

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['event_view']
})

const route = useRoute()
const { get } = useEventStore()
const trailRace = ref<TrailRace | null>(null)

onMounted(async () => {
    trailRace.value = await get(route.params.id as string)
})
</script>

<template>
    <div class="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <NuxtLink to="/dashboard/events" class="hover:text-primary transition-colors">Events</NuxtLink>
        <span>/</span>
        <NuxtLink :to="`/dashboard/events/${route.params.id}`" class="hover:text-primary transition-colors">{{ trailRace?.name || 'Loading...' }}</NuxtLink>
        <span>/</span>
        <span class="text-gray-900 font-medium">Volunteers</span>
    </div>

    <div class="flex flex-col md:flex-row gap-6">
        <div class="flex-grow">
            <template v-if="trailRace">
                <VolunteerList :event-id="(route.params.id as string)" @update="async () => trailRace = await get(route.params.id as string)" />
            </template>
        </div>
        <EventSidebar />
    </div>
</template>
