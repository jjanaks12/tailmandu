<script lang="ts" setup>
    import { formatDate, showImage } from '~/lib/filters'
    import type { TrailRace } from '~/lib/types'
    import { useEventStore } from '~/store/event'

    const route = useRoute()
    const trailRace = ref<TrailRace | null>(null)
    const { getBySlug } = useEventStore()

    useHead({
    })

    useTitle(trailRace.value ? trailRace.value.name : 'Events')

    onBeforeMount(async () => {
        trailRace.value = await getBySlug(route.params.slug as string)
    })
</script>

<template>
    <section class="relative z-[1]" v-if="trailRace">
        <figure class="w-full z-0 sticky top-0">
            <img :src="showImage(trailRace?.thumbnail?.file_name as string)" :alt="trailRace?.name"
                class="w-full h-auto">
        </figure>
        <div class="bg-white container -mt-6 rounded-t-md relative z-[2]">
            <header class="py-8 px-12">
                <h1 class="text-gray-600 text-4xl">{{ trailRace?.name }}</h1>
                <em class="not-italic">
                    Starts {{ formatDate(trailRace.start) }} until {{ formatDate(trailRace.end) }}
                </em>
            </header>
            <div class="flex gap-4">
                <div class="w-2/3">
                    <div class="px-14">
                        <h2 class="text-gray-400 uppercase text-sm mb-4">Event description</h2>
                        <div class="text-gray-500 text__holder" v-html="trailRace.description" />
                    </div>
                </div>
                <div class="w-1/3">
                    <div class="flex gap-2">
                        <NuxtLink :to="{ name: 'races-slug-volunteer', params: { slug: trailRace.slug } }" as-child>
                            <Button variant="volunteer">Apply for volunteers</Button>
                        </NuxtLink>
                        <NuxtLink :to="{ name: 'races-slug-runner', params: { slug: trailRace.slug } }" as-child>
                            <Button variant="runner">Apply as runners</Button>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>