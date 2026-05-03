<script setup lang="ts">
import { useTrekStore } from '~/store/trek'
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon, CompassIcon, TentIcon, FootprintsIcon } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'

interface Props {
    category: 'Treks' | 'Fastpacking'
    title: string
    description: string
}

const props = defineProps<Props>()

const trekStore = useTrekStore()
const { treks, isLoading, params } = storeToRefs(trekStore)
const { fetchTreks } = trekStore

const searchQuery = ref('')

const handleSearch = () => {
    params.value.current = 1
    fetchTreks(undefined, props.category)
}

const goToPage = (page: number) => {
    params.value.current = page
    fetchTreks(undefined, props.category)
}

onMounted(() => {
    fetchTreks(undefined, props.category)
})

// Watch for category changes if used in a dynamic route
watch(() => props.category, () => {
    params.value.current = 1
    fetchTreks(undefined, props.category)
})
</script>

<template>
    <div class="bg-background-light dark:bg-background-dark min-h-screen">
        <!-- Premium Hero Section -->
        <section class="relative pt-32 pb-20 overflow-hidden">
            <div class="absolute inset-0 z-0">
                <div
                    class="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background-light dark:to-background-dark">
                </div>
                <div
                    class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2">
                </div>
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="flex flex-col items-center text-center">
                    <div
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <component :is="category === 'Treks' ? TentIcon : FootprintsIcon" class="w-4 h-4" />
                        Explore {{ category }}
                    </div>

                    <h1
                        class="text-5xl md:text-7xl font-display font-black tracking-tighter text-slate-900 dark:text-white mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        {{ title }}
                    </h1>

                    <p
                        class="max-w-2xl text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        {{ description }}
                    </p>

                    <!-- Search Bar -->
                    <div class="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                        <div class="relative group">
                            <div
                                class="absolute -inset-1 bg-gradient-to-r from-primary to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200">
                            </div>
                            <div
                                class="relative flex items-center bg-white dark:bg-deep-slate rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                                <div class="pl-6 text-slate-400">
                                    <SearchIcon class="w-5 h-5" />
                                </div>
                                <input v-model="searchQuery" type="text"
                                    placeholder="Search by route, region, or peak..."
                                    class="w-full py-5 px-4 bg-transparent border-none focus:ring-0 font-bold text-slate-900 dark:text-white placeholder:text-slate-400"
                                    @keyup.enter="handleSearch" />
                                <div class="pr-3">
                                    <Button @click="handleSearch"
                                        class="rounded-xl px-8 py-3 font-black uppercase tracking-widest text-xs h-auto">
                                        Search
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Expedition Grid -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div v-for="i in 6" :key="i"
                    class="bg-slate-100 dark:bg-deep-slate rounded-3xl aspect-[4/5] animate-pulse"></div>
            </div>

            <template v-else>
                <div v-if="treks.length === 0"
                    class="text-center py-24 bg-white dark:bg-deep-slate rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl">
                    <div class="mb-6 opacity-20 text-slate-400">
                        <CompassIcon class="w-24 h-24 mx-auto" />
                    </div>
                    <h3 class="text-2xl font-bold mb-2 text-slate-900 dark:text-white">No Adventures Found</h3>
                    <p class="text-slate-500 max-w-sm mx-auto">We couldn't find any {{ category.toLowerCase() }}
                        matching your search. Try adjusting your keywords.</p>
                    <Button modifier="outline" class="mt-8 rounded-xl" @click="searchQuery = ''; handleSearch()">
                        Reset Search
                    </Button>
                </div>

                <div v-else>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <PagesDefaultFastpackingTrekCard v-for="item in treks" :key="item.id" :item="item" />
                    </div>

                    <!-- Premium Pagination -->
                    <div v-if="params.total_page > 1" class="mt-24 flex flex-col items-center gap-8">
                        <div class="flex items-center gap-3">
                            <Button modifier="outline" size="icon" :disabled="params.current === 1"
                                @click="goToPage(params.current - 1)"
                                class="rounded-2xl w-14 h-14 border-slate-200 dark:border-slate-800 hover:border-primary hover:text-primary transition-all">
                                <ChevronLeftIcon class="h-6 w-6" />
                            </Button>

                            <div
                                class="flex items-center px-6 py-3 bg-white dark:bg-deep-slate rounded-2xl border border-slate-100 dark:border-slate-800 shadow-lg gap-4">
                                <span class="text-sm font-black text-slate-400">PAGE</span>
                                <div class="flex items-center gap-1">
                                    <span class="text-lg font-black text-primary">{{ params.current }}</span>
                                    <span class="text-lg font-black text-slate-300">/</span>
                                    <span class="text-lg font-black text-slate-400">{{ params.total_page }}</span>
                                </div>
                            </div>

                            <Button modifier="outline" size="icon" :disabled="params.current === params.total_page"
                                @click="goToPage(params.current + 1)"
                                class="rounded-2xl w-14 h-14 border-slate-200 dark:border-slate-800 hover:border-primary hover:text-primary transition-all">
                                <ChevronRightIcon class="h-6 w-6" />
                            </Button>
                        </div>

                        <p class="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                            Showing {{ treks.length }} of {{ params.total }} Available Expeditions
                        </p>
                    </div>
                </div>
            </template>
        </section>

        <!-- Newsletter / Footer CTA -->
        <PagesDefaultFastpackingTrekNewsletter :topic="category" />
    </div>
</template>

<style scoped>
.font-display {
    font-family: 'Outfit', sans-serif;
}
</style>
