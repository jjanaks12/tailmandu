<script lang="ts" setup>
    import { ArrowBigLeft } from 'lucide-vue-next'
    import { showImage } from '~/lib/filters'
    import type { TrailRace } from '~/lib/types'
    import { useEventStore } from '~/store/event'

    const route = useRoute()
    const { getBySlug } = useEventStore()
    const trailRace = ref<TrailRace | null>(null)

    onBeforeMount(async () => {
        trailRace.value = await getBySlug(route.params.slug as string)

        useTitle(`${trailRace.value.name} - Runner form`)
    })

</script>

<template>
    <section v-if="trailRace" class="overflow-hidden">
        <figure class="fixed inset-0 -z-[1]">
            <img :src="showImage(trailRace.thumbnail?.file_name as string)" :alt="trailRace.name"
                class="size-full object-cover">
        </figure>
        <div class="container">
            <div class="bg-white/90 p-12 mt-12 rounded-tl-2xl rounded-tr-2xl">
                <div class="space-y-4 mb-16">
                    <h1 class="text-primary text-3xl">{{ trailRace?.name }}</h1>
                    <p v-text="trailRace.excerpt" />
                    <div class="flex justify-center">
                        <Button size="lg" as-child>
                            <NuxtLink :to="`/races/${route.params.slug as string}`" as-child>
                                <ArrowBigLeft />
                                Back to main event
                            </NuxtLink>
                        </Button>
                    </div>
                </div>
                <PagesDashboardEventRacesRegistrationForm :event-id="trailRace.id" :trail-race="trailRace" mode="runner" />
            </div>
        </div>
    </section>
    <div v-else>loading....</div>
</template>