<script setup lang="ts">
import { MountainIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon, SlidersHorizontalIcon } from 'lucide-vue-next'
import { useEventStore } from '~/store/event'

useSeoMeta({
    title: 'Trail Races in Nepal - Trailmandu Dispatch',
    description: 'Join the most challenging and scenic trail races in Nepal. From short trail runs to multi-stage ultras.',
    ogTitle: 'Trailmandu Races - Challenge Yourself',
    ogDescription: 'Discover upcoming trail races across Nepal\'s stunning landscapes.',
})

const { fetchPublic } = useEventStore()
const { events, params, isLoading } = storeToRefs(useEventStore())

const searchQuery = ref('')

const handleSearch = () => {
    params.value.s = searchQuery.value
    params.value.current = 1
    fetchPublic()
}

const goToPage = (page: number) => {
    params.value.current = page
    fetchPublic()
}

onMounted(() => {
    params.value.current = 1
    fetchPublic()
})
</script>

<template>
    <div class="bg-background-light dark:bg-background-dark min-h-screen pb-24">
        <!-- Hero Section -->
        <section class="relative pt-32 pb-20 overflow-hidden">
            <div class="absolute inset-0 bg-primary/5 -z-10"></div>
            <div class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent -z-10">
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-3xl">
                    <Badge class="mb-6">
                        Epic Trail Adventures
                    </Badge>
                    <h1 class="text-5xl md:text-7xl font-display font-black tracking-tight mb-6">
                        Find Your <span class="text-primary">Race</span>
                    </h1>
                    <p class="text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-10">
                        From the rolling hills of the Kathmandu Valley to the high-altitude passes of the Himalayas,
                        discover races that test your limits.
                    </p>

                    <!-- Search Bar -->
                    <!-- <div class="relative max-w-xl group">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <SearchIcon
                                class="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input v-model="searchQuery" @keyup.enter="handleSearch" type="text"
                            placeholder="Search by race name or location..."
                            class="block w-full pl-12 pr-4 py-4 bg-white dark:bg-deep-slate border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-xl shadow-slate-200/50 dark:shadow-none" />
                        <div class="absolute inset-y-2 right-2">
                            <Button @click="handleSearch" size="sm" class="h-full px-6 rounded-xl">
                                Search
                            </Button>
                        </div>
                    </div> -->
                </div>
            </div>
        </section>

        <!-- Race Grid -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div v-for="i in 6" :key="i"
                    class="bg-slate-200 dark:bg-slate-800 rounded-3xl aspect-[4/5] animate-pulse"></div>
            </div>

            <template v-else>
                <div v-if="events.length === 0" class="text-center py-24">
                    <div class="mb-6 opacity-20 text-slate-400">
                        <MountainIcon class="w-24 h-24 mx-auto" />
                    </div>
                    <h3 class="text-2xl font-bold mb-2 text-slate-600 dark:text-slate-400">No races found</h3>
                    <p class="text-slate-500">We couldn't find any races matching your search. Try another term!</p>
                    <Button modifier="outline" class="mt-8" @click="searchQuery = ''; handleSearch()">
                        Clear Search
                    </Button>
                </div>

                <div v-else>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <PagesDefaultRacesRaceCard v-for="race in events" :key="race.id" :race="race" />
                    </div>

                    <!-- Pagination -->
                    <div v-if="params.total_page > 1" class="mt-20 flex items-center justify-center gap-2">
                        <Button modifier="outline" size="icon" :disabled="params.current === 1"
                            @click="goToPage(params.current - 1)"
                            class="rounded-xl border-slate-200 dark:border-slate-800">
                            <ChevronLeftIcon class="h-5 w-5" />
                        </Button>

                        <div class="flex items-center gap-1">
                            <Button v-for="page in params.total_page" :key="page"
                                :variant="params.current === page ? 'default' : 'ghost'" @click="goToPage(page)"
                                class="w-10 h-10 rounded-xl font-bold p-0">
                                {{ page }}
                            </Button>
                        </div>

                        <Button modifier="outline" size="icon" :disabled="params.current === params.total_page"
                            @click="goToPage(params.current + 1)"
                            class="rounded-xl border-slate-200 dark:border-slate-800">
                            <ChevronRightIcon class="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </template>
        </section>
    </div>
</template>