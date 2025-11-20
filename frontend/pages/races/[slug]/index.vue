<script lang="ts" setup>
    import { formatDate, showImage } from '~/lib/filters'
    import type { TrailRace } from '~/lib/types'
    import { useEventStore } from '~/store/event'
    import StageCard from '@/components/pages/default/home/card.vue'
    import bg01 from '@/assets/images/bg-01.png'

    const route = useRoute()
    const trailRace = ref<TrailRace | null>(null)
    const { getBySlug } = useEventStore()

    onBeforeMount(async () => {
        trailRace.value = await getBySlug(route.params.slug as string)
        useTitle(trailRace.value ? trailRace.value.name : 'Events')
        useSeoMeta({
            title: trailRace.value.name,
            ogTitle: trailRace.value.name,
            description: trailRace.value.excerpt,
            ogDescription: trailRace.value.excerpt,
            ogImage: showImage(trailRace.value.thumbnail?.file_name as string)
        })
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
        <section class="relative overflow-hidden z-[1]">
            <figure class="absolute inset-0 z-[-1]">
                <img :src="bg01" />
            </figure>
            <div class="container text-[#13304a] py-[100px]">
                <ul
                    class="flex gap-12 [&>li>strong]:block [&>li>strong]:text-[25px] [&>li>em]:not-italic [&>li>em]:text-[40px]">
                    <li>
                        <strong>Total Distance</strong>
                        <em>100KM +</em>
                    </li>
                    <li>
                        <strong>Five Different</strong>
                        <em>Places</em>
                    </li>
                    <li>
                        <strong>Five Different</strong>
                        <em>Summits</em>
                    </li>
                    <li>
                        <strong>Grade</strong>
                        <em>Challenging</em>
                    </li>
                </ul>
            </div>
        </section>
        <section class="bg-white py-12 relative z-[2]" v-if="trailRace.stages.length > 0">
            <div class="container">
                <h2 class="text-2xl mb-7">Stages</h2>
                <div class="flex gap-4">
                    <StageCard class="w-1/3" v-for="(stage, index) in trailRace.stages" :race-slug="trailRace.slug"
                        :stage="stage" :race-name="`${trailRace.name} ${index + 1}`" />
                </div>
            </div>
        </section>
    </section>
</template>