<script setup lang="ts">
import { showImage } from '~/lib/filters'
import type { Image } from '~/lib/types'
import { useAppStore } from '~/store/app'

interface ImageGalleryCardProps {
    image: Image
}

const props = defineProps<ImageGalleryCardProps>()
const { setImageForPreview } = useAppStore()
</script>

<template>
    <div class="collage-span-2-2 group relative overflow-hidden bg-gray-900 cursor-pointer">
        <img alt="Runner on a ridge"
            class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
            :src="showImage(image.file_name)" @click="setImageForPreview(showImage(image.file_name))" />
    </div>
</template>