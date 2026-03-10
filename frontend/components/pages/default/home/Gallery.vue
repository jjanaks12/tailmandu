<script setup lang="ts">
import { ZoomInIcon } from 'lucide-vue-next'
import { showImage } from '~/lib/filters'
import type { Image } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { useAppStore } from '~/store/app'

const images = ref<Image[]>([])
const { axios } = useAxios()
const { setImageForPreview } = useAppStore()
const localePath = useLocalePath()

const fetch = async () => {
    const { data } = await axios.get('/home/galleries', {
        params: {
            take: 7,
            tags: ['treks', 'trail race']
        }
    })
    images.value = data
}

// const sizeMap = ['col-span-2 row-span-2', 'row-span-1', 'row-span-2', 'row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1']
// const sizeMap = ['col-span-2 row-span-2', 'row-span-1', 'row-span-2', 'row-span-1']
const sizeMap = [
    'col-span-2 row-span-2', 'row-span-1', 'row-span-2', 'row-span-1',
    'row-span-1', 'col-span-2 row-span-2', 'row-span-2', 'col-span-1 row-span-1'
]

onMounted(fetch)
</script>

<template>
    <section class="py-24 bg-white dark:bg-background-dark" id="gallery">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="font-display text-4xl font-bold mb-4">{{ $t('home.gallery.title') }}</h2>
                <p class="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">{{ $t('home.gallery.description') }}</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                <div v-for="(image, index) in images" :key="image.id" class="relative group overflow-hidden rounded-2xl"
                    @click="setImageForPreview(showImage(image.file_name))" :class="sizeMap[index % sizeMap.length]">
                    <img alt="Runner on ridge"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        :src="showImage(image.file_name)" />
                    <div
                        class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomInIcon class="text-white text-4xl" />
                    </div>
                </div>
            </div>
            <div class="mt-12 text-center">
                <button
                    class="bg-deep-slate dark:bg-primary text-white px-10 py-4 rounded-xl font-bold hover:scale-105 transition-all"
                    as-child>
                    <NuxtLink :to="localePath('/tm_clicks')">View Full Gallery</NuxtLink>
                </button>
            </div>
        </div>
    </section>
</template>