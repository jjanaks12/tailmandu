<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'
import moment from 'moment'
import { useEventStore } from '~/store/event'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Virtual, Autoplay } from 'swiper/modules'

const { currentRace } = storeToRefs(useEventStore())
const localePath = useLocalePath()
const breakpoints = useBreakpoints(breakpointsTailwind)

const images = ["/images/home-slider15.jpg", "/images/home-slider01.webp", "/images/home-slider02.webp", "/images/home-slider03.jpg", "/images/home-slider04.webp", "/images/home-slider05.jpg", "/images/home-slider06.webp", "/images/home-slider07.webp", "/images/home-slider08.webp", "/images/home-slider09.jpg", "/images/home-slider10.jpg", "/images/home-slider11.jpg", "/images/home-slider12.jpg", "/images/home-slider13.jpg", "/images/home-slider14.jpg"]

const currentStage = computed(() => currentRace.value?.stages
    .filter((stage) => stage.stage_categories.length > 0)
    .filter((stage) => stage.stage_categories.some((category) => moment.utc(category.start).isAfter(moment.utc())))[0])
</script>

<template>
    <ClientOnly>
        <template v-if="currentRace">
            <section class="relative h-screen flex items-center mountain-bg pt-20 z-[1] overflow-hidden">
                <div class="absolute inset-0 z-[-1]">
                    <Swiper class="h-full" :modules="[Autoplay, Virtual]" loop
                        :autoplay="{ delay: 8000, disableOnInteraction: false }" virtual>
                        <SwiperSlide v-for="(image, index) in images" :key="image" :virtualIndex="index">
                            <img :src="image" alt="" class="w-full h-full object-cover">
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div class="text-white grid lg:grid-cols-2 gap-12 items-center">
                        <div class="mix-blend-lighten">
                            <h1 class="font-display text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                                {{ $t('home.banner.title') }}
                            </h1>
                            <p class="text-xl mb-8 max-w-lg leading-relaxed">{{ $t('home.banner.description') }}</p>
                            <div class="flex space-x-4">
                                <NuxtLink as-child :to="localePath({ name: 'races' })">
                                    <Button :size="breakpoints.md.value ? 'xl' : 'lg'" variant="light">
                                        {{ $t('home.banner.explore_races') }}
                                    </Button>
                                </NuxtLink>
                                <!-- <NuxtLink as-child
                                    :to="localePath({ name: 'races-slug', params: { slug: currentRace.slug } })">
                                    <Button :size="breakpoints.md.value ? 'xl' : 'lg'" variant="light"
                                        modifier="outline">
                                        {{ $t('home.banner.watch_film') }}
                                    </Button>
                                </NuxtLink> -->
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:flex gap-4 items-center">
                <PagesDefaultHomeBannerSlider class="lg:w-2/3" :trail-race="currentRace" :stages="currentRace.stages" />
                <PagesDefaultHomeBannerStats class="hidden lg:block" v-if="currentStage" :stage="currentStage"
                    :slug="currentRace.slug" />
            </div>
        </template>
        <PagesDefaultHomeBannerLoader v-else />
    </ClientOnly>
</template>