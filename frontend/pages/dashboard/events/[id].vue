<script lang="ts" setup>
import { MoveLeftIcon, RefreshCwIcon } from 'lucide-vue-next'

import type { TrailRace } from '~/lib/types'
import { useEventStore } from '~/store/event'
import { formatDate } from '~/lib/filters'

import TrailRaceUploadImage from '@/components/pages/dashboard/event/imageUpload.vue'
import TrailRaceDescription from '@/components/pages/dashboard/event/description.vue'
import TrailMapUploadMap from '@/components/pages/dashboard/event/mapUpload.vue'
import TrailRaceStageList from '@/components/pages/dashboard/event/stages/list.vue'
import TrailRaceGallery from '@/components/pages/dashboard/event/gallery/list.vue'
import VolunteerList from '@/components/pages/dashboard/event/volunteer/list.vue'
import RunnerList from '@/components/pages/dashboard/event/runner/list.vue'
import TrailRaceSponsorList from '@/components/pages/dashboard/event/sponsor/list.vue'
import TrailRaceSettings from '@/components/pages/dashboard/event/settings/list.vue'
import TrailRacePaymentList from '@/components/pages/dashboard/event/payment/list.vue'

useHead({
    title: 'Events'
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
            <div class="flex-grow">
                <h1 class="text-2xl">{{ trailRace?.name }}</h1>
            </div>
            <div class="flex gap-2 items-center">
                <Button @click="fetchEventDetail" variant="secondary" modifier="outline" size="icon">
                    <RefreshCwIcon :class="{ 'animate-spin': isLoading }" />
                </Button>
                <Button @click="navigateTo({ name: 'dashboard-events' })">
                    <MoveLeftIcon />
                    Back
                </Button>
            </div>
        </div>
        <Tabs default-value="detail" class="text-gray-600">
            <TabsList class="uppercase">
                <TabsTrigger value="detail">
                    Details
                </TabsTrigger>
                <TabsTrigger value="stages">
                    Stages
                </TabsTrigger>
                <TabsTrigger value="runners">
                    Runners
                </TabsTrigger>
                <TabsTrigger value="volunteers">
                    Volunteers
                </TabsTrigger>
                <TabsTrigger value="gallery">
                    Galleries
                </TabsTrigger>
                <TabsTrigger value="sponsor">
                    Sponsors
                </TabsTrigger>
                <TabsTrigger value="settings">
                    Settings
                </TabsTrigger>
            </TabsList>
            <TabsContent value="detail">
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
            </TabsContent>
            <TabsContent value="stages">
                <TrailRaceStageList :event-id="(route.params.id as string)" @update="fetchEventDetail" />
            </TabsContent>
            <TabsContent value="runners">
                <RunnerList :stages="trailRace.stages" @update="fetchEventDetail" />
            </TabsContent>
            <TabsContent value="volunteers">
                <VolunteerList :stages="trailRace.stages" @update="fetchEventDetail" />
            </TabsContent>
            <TabsContent value="gallery">
                <TrailRaceGallery :event-id="(route.params.id as string)" />
            </TabsContent>
            <TabsContent value="sponsor">
                <TrailRaceSponsorList :event-id="(route.params.id as string)" />
            </TabsContent>
            <TabsContent value="settings">
                <TrailRaceSettings :event-id="(route.params.id as string)" />
            </TabsContent>
        </Tabs>
    </template>
</template>