<script setup lang="ts">
import { useTrekStore } from '~/store/trek'

useTitle('Fastpacking Trek')

const { treks } = storeToRefs(useTrekStore())
const { fetchTreks, isLoading, params } = useTrekStore()

onMounted(() => {
    fetchTreks()
})
</script>

<template>
    <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen pt-[80px]">
        <div class="relative flex flex-col w-full overflow-x-hidden">
            <main class="max-w-7xl mx-auto w-full px-6 lg:px-20 py-10">
                <Button @click="fetchTreks()">fetch</Button>
                <div class="mb-8 space-y-4">
                    <PagesDefaultFastpackingTrekFilter />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PagesDefaultFastpackingTrekCard v-for="item in treks" :item="item" />
                </div>
                <div class="mt-12 flex flex-col items-center gap-4">
                    <p class="text-slate-500 text-sm font-medium">Showing 4 of 28 available premium treks</p>
                    <button
                        class="px-8 py-3 bg-slate-200 dark:bg-[#271f1c] hover:bg-slate-300 dark:hover:bg-[#392e28] text-slate-900 dark:text-white text-sm font-bold rounded-xl transition-all border border-slate-300 dark:border-border-dark">
                        Load More Expeditions
                    </button>
                </div>
            </main>
            <section class="bg-primary/5 dark:bg-primary/10 border-t border-primary/20 py-16 px-6 lg:px-20 mt-10">
                <div class="max-w-4xl mx-auto text-center space-y-6">
                    <h2 class="text-2xl md:text-3xl font-extrabold">Ready for the adventure of a lifetime?</h2>
                    <p class="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm">Subscribe to get seasonal
                        trail reports, expert packing lists, and exclusive early-bird discounts for the 2024 season.</p>
                    <div class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                        <input
                            class="flex-1 bg-white dark:bg-[#271f1c] border-slate-200 dark:border-border-dark rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 text-sm"
                            placeholder="Your email address" type="email" />
                        <button
                            class="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all text-sm">Subscribe</button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>