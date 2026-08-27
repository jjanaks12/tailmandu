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

onMounted(async () => {
    isLoading.value = true
    const a = await fetchTreksByCategory('Fastpacking')
    adventureFastPacking.value = a.map((trek: any) => ({
        id: trek.id,
        name: trek.name,
        price: trek.starting_price ? `$${trek.starting_price}` : '---',
        image: trek.thumbnail ? showImage(trek.thumbnail.file_name) : '',
        description: trek.excerpt || (trek.description ? trek.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : 'No description available.'),
        distance: trek.distance || '---',
        duration: trek.duration || '---',
        elevation: trek.elevation || '---',
        buttonLink: `/${trek.category?.name.toLowerCase() || 'fastpacking'}/${trek.slug}/booking`,
        viewItineraryLink: `/${trek.category?.name.toLowerCase() || 'fastpacking'}/${trek.slug}`,
    }))
    const b = await fetchTreksByCategory('Treks')
    adventureTreks.value = b.map((trek: any) => ({
        id: trek.id,
        name: trek.name,
        price: trek.starting_price ? `$${trek.starting_price}` : '---',
        image: trek.thumbnail ? showImage(trek.thumbnail.file_name) : '',
        description: trek.excerpt || (trek.description ? trek.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : 'No description available.'),
        distance: trek.distance || '---',
        duration: trek.duration || '---',
        elevation: trek.elevation || '---',
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
                <PagesDefaultHomeAdventuresCard 
                    v-for="adventure in adventureTreks" 
                    :key="adventure.id" 
                    :adventure="adventure" />
                <PagesDefaultHomeAdventuresCard 
                    v-for="adventure in adventureFastPacking" 
                    :key="adventure.id" 
                    :adventure="adventure" />
            </div>
            <div class="text-right">
                <Button modifier="link" as-child>
                    <NuxtLink to="/fastpacking">View all</NuxtLink>
                </Button>
            </div>
        </div>
    </section>
</template>