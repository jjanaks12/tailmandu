<script setup lang="ts">
import { ChevronLeftIcon, CheckIcon } from 'lucide-vue-next'
import { showImage } from '~/lib/filters';
import type { APIParam, Gallery, Image } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { useMediaStore } from '~/store/media'

const props = defineProps<{
    gallery: Gallery
}>()

const { media } = storeToRefs(useMediaStore())
const { axios } = useAxios()

const images = ref<Image[]>([])
const params = ref<APIParam>({
    current: 1,
    per_page: 15,
    total: 0,
    total_page: 0
})

const getImagesFromSelectedGallery = async () => {
    if (media.value.selectedGallery) {
        const { data: { data, ...p } } = await axios.get(`/medias/images/${media.value.selectedGallery.id}`, {
            params: params.value
        })
        images.value = data
        params.value = p
    }
}

const updateSelectedImages = (imageId: string) => {
    if (media.value.isMultiple) {
        if (media.value.selectedImages.includes(imageId)) {
            media.value.selectedImages = media.value.selectedImages.filter((id) => id !== imageId)
        } else {
            media.value.selectedImages.push(imageId)
        }
    } else {
        if (media.value.selectedImages.includes(imageId)) {
            media.value.selectedImages = []
        } else {
            media.value.selectedImages = [imageId]
        }
    }
}

onMounted(getImagesFromSelectedGallery)
</script>

<template>
    <div class="flex-1 overflow-y-auto p-2">
        <div class="mb-6">
            <Button modifier="link" @click="media.selectedGallery = null">
                <ChevronLeftIcon class="w-4 h-4" />
                <span class="font-label text-sm uppercase tracking-wider">Back to Galleries</span>
            </Button>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <!-- Image Card 1 (Selected) -->
            <div v-for="image in images" class="relative aspect-square group cursor-pointer rounded-xl overflow-hidden"
                :class="media.selectedImages.includes(image.id) ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'border border-border'"
                @click="updateSelectedImages(image.id)">
                <img class="w-full h-full object-cover"
                    :class="media.selectedImages.includes(image.id) ? '' : 'transition-transform duration-300 group-hover:scale-105'"
                    :src="showImage(image.file_name)" />
                <div class="absolute"
                    :class="media.selectedImages.includes(image.id) ? 'inset-0 bg-primary/10' : 'top-2 right-2 bg-background/80 backdrop-blur-sm w-6 h-6 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'">
                </div>
                <div v-if="media.selectedImages.includes(image.id)"
                    class="absolute top-2 right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                    <CheckIcon class="w-4 h-4" />
                </div>
            </div>
        </div>
    </div>
</template>