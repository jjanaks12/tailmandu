<script setup lang="ts">
import { useEventStore } from '~/store/event'

const { currentRace, currentStage } = storeToRefs(useEventStore())
const { fetchCurrentRace } = useEventStore()

onMounted(fetchCurrentRace)
</script>
<template>
    <ClientOnly>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 space-y-4" v-if="currentRace">
            <div class="lg:flex gap-4 items-center">
                <PagesDefaultHomeRaceStageSlider :class="{ 'lg:w-2/3': Boolean(currentStage) }"
                    :trail-race="currentRace" :stages="currentRace.stages" />
                <PagesDefaultHomeRaceStats class="hidden lg:block" v-if="currentStage" :stage="currentStage"
                    :slug="currentRace.slug" />
            </div>
            <div class="text-right">
                <Button as-child modifier="link">
                    <NuxtLink :to="$localePath({ name: 'races-slug', params: { slug: currentRace.slug } })">
                        more details
                    </NuxtLink>
                </Button>
            </div>
        </div>
        <PagesDefaultHomeRaceLoader v-else />
    </ClientOnly>
</template>