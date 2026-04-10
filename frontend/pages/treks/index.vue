<script setup lang="ts">
import { useTrekStore } from '~/store/trek'

useTitle('Treks')

const { treks } = storeToRefs(useTrekStore())
const { fetchTreks, params } = useTrekStore()

onMounted(() => {
    fetchTreks(undefined, 'Treks')
})
</script>

<template>
    <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen pt-[80px]">
        <div class="relative flex flex-col w-full overflow-x-hidden">
            <main class="max-w-7xl mx-auto w-full px-6 lg:px-20 py-10">
                <!-- <div class="mb-8 space-y-4">
                    <PagesDefaultFastpackingTrekFilter />
                </div> -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PagesDefaultFastpackingTrekCard v-for="item in treks" :item="item" />
                </div>
                <div class="mt-12 flex flex-col items-center gap-4" v-if="params.total_page > 1">
                    <p class="text-slate-500 text-sm font-medium">
                        Showing {{ params.current }} of {{ params.total }}
                        available premium treks
                    </p>
                    <Button variant="dark" size="xl" @click="params = { ...params, current: params.current + 1 }">
                        Load More Expeditions
                    </Button>
                </div>
            </main>
            <section class="bg-primary/5 dark:bg-primary/10 border-t border-primary/20 py-16 px-6 lg:px-20 mt-10">
                <div class="max-w-4xl mx-auto text-center space-y-6">
                    <h2 class="text-2xl md:text-3xl font-extrabold">Ready for the adventure of a lifetime?</h2>
                    <p class="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm">Subscribe to get seasonal
                        trail reports, expert packing lists, and exclusive early-bird discounts for the 2024 season.</p>
                    <div class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                        <Input placeholder="Your email address" type="email" class="h-12" />
                        <Button size="lg" class="h-12">Subscribe</Button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>