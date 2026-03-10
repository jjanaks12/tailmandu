<script lang="ts" setup>
import { Autoplay, Navigation } from 'swiper/modules'
import type { Stage, TrailRace } from '~/lib/types'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

interface SliderProps {
    trailRace: TrailRace
    stages: Stage[]
}

const props = defineProps<SliderProps>()

const swiperRef = ref()
const { next, prev, isEnd, isBeginning } = useSwiper(swiperRef, {
    modules: [Navigation, Autoplay]
})
</script>

<template>
    <section class="py-24 bg-white dark:bg-deep-slate" id="races">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <h2 class="font-display text-4xl font-bold mb-4">
                        <!-- {{ $t('home.stage.title') }} -->
                        {{ trailRace.name }}
                    </h2>
                    <p class="text-slate-500 dark:text-slate-400 max-w-xl">
                        {{ $t('home.stage.description') }}
                    </p>
                </div>
                <div class="flex space-x-2">
                    <Button size="icon" @click="prev()" :disabled="isBeginning" modifier="outline" variant="dark"
                        class="rounded-full">
                        <ChevronLeftIcon />
                    </Button>
                    <Button size="icon" @click="next()" :disabled="isEnd" modifier="outline" variant="dark"
                        class="rounded-full">
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>
            <swiper-container ref="swiperRef" :slides-per-view="3" :space-between="20">
                <swiper-slide v-for="stage in stages">
                    <PagesDefaultHomeBannerCard :stage="stage" />
                </swiper-slide>
            </swiper-container>
        </div>
    </section>
</template>