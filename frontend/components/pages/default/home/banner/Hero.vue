<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import { useAxios } from '~/services/axios'
import { showImage } from '~/lib/filters'

const localePath = useLocalePath()
const breakpoints = useBreakpoints(breakpointsTailwind)
const { axios } = useAxios()

const images = ref<string[]>(["/images/home-slider01.webp"])

const { data: heroSlider } = await useAsyncData('hero-slider', async () => {
    const { data } = await axios.get('/home/hero-slider')
    return data
})

onMounted(async () => {
    if (heroSlider.value?.length) {
        images.value = heroSlider.value.map((img: { file_name: string }) => showImage(img.file_name))
    }
})
</script>

<template>
    <ClientOnly>
        <section class="relative h-screen flex items-center mountain-bg pt-20 z-[1] overflow-hidden">
            <div class="absolute inset-0 z-[-1]">
                <Swiper class="h-full" :modules="[Autoplay]" loop
                    :autoplay="{ delay: 5000, disableOnInteraction: false }">
                    <SwiperSlide v-for="(image) in images" :key="image">
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
    </ClientOnly>
</template>