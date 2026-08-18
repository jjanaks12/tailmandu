<script setup lang="ts">
import { useTrekStore } from '~/store/trek'
import { showImage } from '~/lib/filters'

type FilteredTrek = {
    id: string
    name: string
    price: string
    image: string
    description: string
    distance: string
    duration: string
    elevation: string
    buttonLink: string
    viewItineraryLink: string
}

const { fetchTreksByCategory } = useTrekStore()
const adventureTreks = ref<FilteredTrek[]>([])
const adventureFastPacking = ref<FilteredTrek[]>([])
const isLoading = ref(false)

/* const adventureList = computed(() => {
    // make random sub list maximum of 2
    const shuffled = [...treks.value].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 4).map(trek => ({
        id: trek.id,
        name: trek.name,
        price: trek.price ? `$${trek.price}` : '---',
        image: trek.thumbnail ? showImage(trek.thumbnail.file_name) : '',
        description: trek.excerpt || (trek.description ? trek.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : 'No description available.'),
        distance: trek.details?.stats?.distance || '---',
        duration: trek.details?.itinerary?.length ? `${trek.details.itinerary.length} Days` : '---',
        elevation: trek.details?.stats?.maxElevation || '---',
        buttonLink: `/${trek.category?.name.toLowerCase() || 'fastpacking'}/${trek.slug}/booking`,
        viewItineraryLink: `/${trek.category?.name.toLowerCase() || 'fastpacking'}/${trek.slug}`,
    }))
}) */

onMounted(async () => {
    isLoading.value = true
    const a = await fetchTreksByCategory('Fastpacking')
    adventureFastPacking.value = a.map((trek: any) => ({
        id: trek.id,
        name: trek.name,
        price: trek.price ? `$${trek.price}` : '---',
        image: trek.thumbnail ? showImage(trek.thumbnail.file_name) : '',
        description: trek.excerpt || (trek.description ? trek.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : 'No description available.'),
        distance: trek.details?.stats?.distance || '---',
        duration: trek.details?.itinerary?.length ? `${trek.details.itinerary.length} Days` : '---',
        elevation: trek.details?.stats?.maxElevation || '---',
        buttonLink: `/${trek.category?.name.toLowerCase() || 'fastpacking'}/${trek.slug}/booking`,
        viewItineraryLink: `/${trek.category?.name.toLowerCase() || 'fastpacking'}/${trek.slug}`,
    }))
    const b = await fetchTreksByCategory('Treks')
    adventureTreks.value = b.map((trek: any) => ({
        id: trek.id,
        name: trek.name,
        price: trek.price ? `$${trek.price}` : '---',
        image: trek.thumbnail ? showImage(trek.thumbnail.file_name) : '',
        description: trek.excerpt || (trek.description ? trek.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : 'No description available.'),
        distance: trek.details?.stats?.distance || '---',
        duration: trek.details?.itinerary?.length ? `${trek.details.itinerary.length} Days` : '---',
        elevation: trek.details?.stats?.maxElevation || '---',
        buttonLink: `/${trek.category?.name.toLowerCase() || 'fastpacking'}/${trek.slug}/booking`,
        viewItineraryLink: `/${trek.category?.name.toLowerCase() || 'fastpacking'}/${trek.slug}`,
    }))
    isLoading.value = false
})
</script>

<template>
    <section class="py-24 bg-background-light dark:bg-background-dark overflow-hidden" id="adventures">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mb-12">
                <h2 class="font-display text-4xl font-bold mb-4">
                    {{ $t('home.adventures.title') }}
                </h2>
                <p class="text-slate-500 dark:text-slate-400 max-w-xl">
                    {{ $t('home.adventures.description') }}
                </p>
            </div>
            <div v-if="isLoading" class="flex justify-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
                <div class="group bg-white dark:bg-deep-slate rounded-3xl overflow-hidden flex flex-col shadow-xl hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-800"
                    v-for="adventure in adventureTreks" :key="adventure.id">
                    <div class="relative overflow-hidden h-64 sm:h-72">
                        <img :alt="adventure.name"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            :src="adventure.image" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div class="p-6 md:p-8 flex flex-col justify-between flex-grow">
                        <div>
                            <div class="flex justify-between items-start mb-4">
                                <h3 class="text-3xl font-display font-bold">
                                    {{ adventure.name }}
                                </h3>
                                <span class="text-primary font-bold text-2xl font-display">
                                    {{ adventure.price }}
                                </span>
                            </div>
                            <p class="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                                {{ adventure.description }}
                            </p>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                                <div class="flex items-center space-x-3">
                                    <IconsDistance class="text-primary" />
                                    <div>
                                        <p class="text-xs uppercase opacity-60 font-bold">Distance</p>
                                        <p class="font-bold">{{ adventure.distance }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <IconsSchedule class="text-primary" />
                                    <div>
                                        <p class="text-xs uppercase opacity-60 font-bold">Duration</p>
                                        <p class="font-bold">{{ adventure.duration }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <IconsTerrain class="text-primary" />
                                    <div>
                                        <p class="text-xs uppercase opacity-60 font-bold">Elevation</p>
                                        <p class="font-bold">{{ adventure.elevation }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex space-x-4">
                            <Button size="xl" as-child>
                                <NuxtLink :to="adventure.buttonLink">
                                    {{ $t('home.adventures.book_adventure') }}
                                </NuxtLink>
                            </Button>
                            <Button variant="light" modifier="outline" size="xl"
                                class="text-slate-900 dark:text-slate-100 border-slate-200 dark:hover:bg-slate-800"
                                as-child>
                                <NuxtLink :to="adventure.viewItineraryLink">
                                    {{ $t('home.adventures.view_itinerary') }}
                                </NuxtLink>
                            </Button>
                        </div>
                    </div>
                </div>
                <div class="group bg-white dark:bg-deep-slate rounded-3xl overflow-hidden flex flex-col shadow-xl hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-800"
                    v-for="adventure in adventureFastPacking" :key="adventure.id">
                    <div class="relative overflow-hidden h-64 sm:h-72">
                        <img :alt="adventure.name"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            :src="adventure.image" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div class="p-6 md:p-8 flex flex-col justify-between flex-grow">
                        <div>
                            <div class="flex justify-between items-start mb-4">
                                <h3 class="text-3xl font-display font-bold">
                                    {{ adventure.name }}
                                </h3>
                                <span class="text-primary font-bold text-2xl font-display">
                                    {{ adventure.price }}
                                </span>
                            </div>
                            <p class="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                                {{ adventure.description }}
                            </p>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                                <div class="flex items-center space-x-3">
                                    <IconsDistance class="text-primary" />
                                    <div>
                                        <p class="text-xs uppercase opacity-60 font-bold">Distance</p>
                                        <p class="font-bold">{{ adventure.distance }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <IconsSchedule class="text-primary" />
                                    <div>
                                        <p class="text-xs uppercase opacity-60 font-bold">Duration</p>
                                        <p class="font-bold">{{ adventure.duration }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <IconsTerrain class="text-primary" />
                                    <div>
                                        <p class="text-xs uppercase opacity-60 font-bold">Elevation</p>
                                        <p class="font-bold">{{ adventure.elevation }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex space-x-4">
                            <Button size="xl" as-child>
                                <NuxtLink :to="adventure.buttonLink">
                                    {{ $t('home.adventures.book_adventure') }}
                                </NuxtLink>
                            </Button>
                            <Button variant="light" modifier="outline" size="xl"
                                class="text-slate-900 dark:text-slate-100 border-slate-200 dark:hover:bg-slate-800"
                                as-child>
                                <NuxtLink :to="adventure.viewItineraryLink">
                                    {{ $t('home.adventures.view_itinerary') }}
                                </NuxtLink>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-right">
                <Button modifier="link" as-child>
                    <NuxtLink to="/fastpacking">View all</NuxtLink>
                </Button>
            </div>
        </div>
    </section>
</template>