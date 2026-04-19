<script setup lang="ts">
import moment from 'moment'
import type { TrailRace } from '~/lib/types'
import { useAxios } from '~/services/axios'

const { axios } = useAxios()
const currentRace = ref<TrailRace>()

const currentStage = computed(() => currentRace.value?.stages
    .filter((stage) => stage.stage_categories.length > 0)
    .filter((stage) => stage.stage_categories.some((category) => moment.utc(category.start).isAfter(moment.utc())))[0])

const init = async () => {
    const { data } = await axios.get<TrailRace>('/events/current')
    currentRace.value = data
}

onMounted(init)
</script>
<template>
    <Button @click="init">Init</Button>
    <ClientOnly>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 space-y-4" v-if="currentRace">
            <div class="lg:flex gap-4 items-center">
                <PagesDefaultHomeRaceSlider class="lg:w-2/3" :trail-race="currentRace" :stages="currentRace.stages" />
                <PagesDefaultHomeRaceStats class="hidden lg:block" v-if="currentStage" :stage="currentStage"
                    :slug="currentRace.slug" />
            </div>
            <div class="text-right">
                <Button as-child modifier="link">
                    <NuxtLink :to="$localePath({ name: 'races-slug', params: { slug: currentRace.slug } })">more
                        details</NuxtLink>
                </Button>
            </div>
        </div>
        <PagesDefaultHomeRaceLoader v-else />
    </ClientOnly>
</template>