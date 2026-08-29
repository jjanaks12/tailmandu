<script lang="ts" setup>
import ClearCacheButton from '@/components/pages/dashboard/event/ClearCacheButton.vue'
import type { TrailRace } from '~/lib/types'
import { useEventStore } from '~/store/event'
import EventSidebar from '@/components/pages/dashboard/event/sidebar.vue'
import { ChevronRightIcon } from 'lucide-vue-next'

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
    <div class="flex justify-between items-center mb-6">
    <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <NuxtLink to="/dashboard/events" class="hover:text-primary transition-colors">Events</NuxtLink>
        <ChevronRightIcon />
        <NuxtLink :to="`/dashboard/events/${route.params.id}`" class="hover:text-primary transition-colors">{{
            trailRace?.name || 'Loading...' }}</NuxtLink>
        <ChevronRightIcon />
        <span class="text-foreground font-semibold">Stages</span>
    </div>
    <ClearCacheButton :event-id="route.params.id as string" />
</div>

    <div class="flex flex-col lg:flex-row gap-6">
        <div class="flex-grow min-w-0">
            <template v-if="trailRace">
                <PagesDashboardEventStagesList :event-id="(route.params.id as string)"
                    @update="async () => trailRace = await get(route.params.id as string)" />
            </template>
        </div>
        <div class="w-full lg:w-64 shrink-0">
            <EventSidebar />
        </div>
    </div>
</template>
