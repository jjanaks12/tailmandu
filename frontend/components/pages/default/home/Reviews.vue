<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from 'lucide-vue-next'
import { useAxios } from '~/services/axios'
import type { Enquiry } from '~/store/enquiry'

const REVIEW_CATEGORY_NAME = 'Give review'

const { axios } = useAxios()

const reviews = ref<Enquiry[]>([])
const current = ref(0)
const isLoading = ref(true)

const activeReview = computed(() => reviews.value[current.value] ?? null)

const prev = () => { current.value = current.value === 0 ? reviews.value.length - 1 : current.value - 1 }
const next = () => { current.value = current.value === reviews.value.length - 1 ? 0 : current.value + 1 }

const fetchReviews = async () => {
    try {
        isLoading.value = true

        // 1. Find the "Review" enquiry category
        const { data: categories } = await axios.get('/enquiry-categories')
        const reviewCategory = (categories as any[]).find(
            (c: any) => c.name.toLowerCase() === REVIEW_CATEGORY_NAME.toLowerCase()
        )
        if (!reviewCategory) return

        // 2. Fetch enquiries for that category (published ones from the list)
        const { data } = await axios.get('/enquiries', {
            params: { category_id: reviewCategory.id, status: 'RESOLVED' }
        })
        reviews.value = data
    } catch {
        // silently fail on public page
    } finally {
        isLoading.value = false
    }
}

const initials = (name: string) => name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()

const stars = (rating?: number) => Math.round(rating ?? 5)

onMounted(fetchReviews)
</script>

<template>
    <div>
        <h2 class="font-display text-4xl font-bold mb-8">Voices from the Trail</h2>

        <!-- Loading skeleton -->
        <div v-if="isLoading"
            class="bg-white dark:bg-deep-slate p-10 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 animate-pulse">
            <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-6"></div>
            <div class="space-y-3 mb-8">
                <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
            </div>
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                <div class="space-y-2">
                    <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
                    <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
                </div>
            </div>
        </div>

        <!-- No reviews fallback -->
        <div v-else-if="!reviews.length"
            class="bg-white dark:bg-deep-slate p-10 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 italic">
            No reviews yet. Be the first to share your experience!
        </div>

        <!-- Active review card -->
        <div v-else class="relative">
            <Transition name="fade" mode="out-in">
                <div :key="current"
                    class="bg-white dark:bg-deep-slate p-10 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
                    <!-- Star rating -->
                    <div class="flex items-center space-x-1 mb-6">
                        <StarIcon v-for="n in 5" :key="n"
                            :class="['size-5', n <= stars(activeReview!.rating) ? 'text-primary fill-primary' : 'text-slate-300 dark:text-slate-600']" />
                    </div>

                    <!-- Message -->
                    <p class="text-xl italic text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                        "{{ activeReview!.message }}"
                    </p>

                    <!-- Author -->
                    <div class="flex items-center space-x-4">
                        <!-- Avatar initials fallback -->
                        <div
                            class="w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center ring-4 ring-primary/10 shrink-0">
                            {{ initials(activeReview!.name) }}
                        </div>
                        <div>
                            <h4 class="font-bold text-lg">{{ activeReview!.name }}</h4>
                            <p v-if="activeReview!.subject" class="text-sm opacity-60">{{ activeReview!.subject }}</p>
                        </div>
                    </div>
                </div>
            </Transition>

            <!-- Navigation + counter -->
            <div class="flex items-center gap-4 mt-8">
                <button @click="prev"
                    class="w-12 h-12 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                    <ChevronLeftIcon class="size-5" />
                </button>
                <button @click="next"
                    class="w-12 h-12 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                    <ChevronRightIcon class="size-5" />
                </button>
                <span class="text-sm text-muted-foreground ml-2">
                    {{ current + 1 }} / {{ reviews.length }}
                </span>
                <!-- Dot indicators -->
                <div class="flex gap-1.5 ml-auto">
                    <button v-for="(_, i) in reviews" :key="i" @click="current = i"
                        :class="['w-2 h-2 rounded-full transition-all', i === current ? 'bg-primary w-5' : 'bg-slate-300 dark:bg-slate-600']" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateX(16px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateX(-16px);
}
</style>