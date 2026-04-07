<script setup lang="ts">
import { useTrekStore } from '~/store/trek'
import { showImage } from '~/lib/filters'
import { storeToRefs } from 'pinia'

const { fetchTreks } = useTrekStore()
const { treks, isLoading } = storeToRefs(useTrekStore())

const adventureList = computed(() => {
    // make random sub list maximum of 2
    const shuffled = [...treks.value].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 2).map(trek => ({
        id: trek.id,
        name: trek.name,
        price: trek.price ? `$${trek.price}` : '---',
        image: trek.thumbnail ? showImage(trek.thumbnail.file_name) : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDGQ1o7fn6qVhEaeZFJS8cc8Mgbm36hpWCT66_l6mUYsZwyGQ4mSiBkkRhXGJgYE3K5icooXK5JVwt93yiQbZyn0xtj4SATTYoU59P5JdpFDUmobsJu5XUlzuzAgM3xKUW9PLzM0AGlrfQ_AfT5BtnRb6P4lHl1LYq0TEhSunOAbXQHR-tqoVPFek2DYeq1fYvzYRnafbMYLMdSQJwMLUuVEfanhObN8icE49f1VHNztwjC0byYH9gDDoccOeC_nz-9xPUFl-_8JY',
        description: trek.excerpt || (trek.description ? trek.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : 'No description available.'),
        distance: trek.details?.stats?.distance || '---',
        duration: trek.details?.itinerary?.length ? `${trek.details.itinerary.length} Days` : '---',
        elevation: trek.details?.stats?.maxElevation || '---',
        buttonLink: `/fastpacking/${trek.slug}/booking`,
        viewItineraryLink: `/fastpacking/${trek.slug}`,
    }))
})

onMounted(async () => {
    await fetchTreks()
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
            <div v-else class="space-y-8">
                <div class="group bg-white dark:bg-deep-slate rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-xl hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-800"
                    v-for="adventure in adventureList" :key="adventure.id">
                    <div class="md:w-2/5 relative overflow-hidden">
                        <img :alt="adventure.name"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            :src="adventure.image" />
                        <div class="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                    </div>
                    <div class="md:w-3/5 p-10 flex flex-col justify-between">
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
                <div class="text-right">
                    <Button modifier="link" as-child>
                        <NuxtLink to="/fastpacking">view all</NuxtLink>
                    </Button>
                </div>
            </div>
        </div>
    </section>
</template>