<script setup lang="ts">
import { CameraIcon, PencilIcon } from 'lucide-vue-next'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { showImage } from '~/lib/filters'
import type { Gallery, MediaState } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { useMediaStore } from '~/store/media'

interface GalleryProps {
    gallery: Gallery
}

const route = useRoute()
const props = defineProps<GalleryProps>()
const { media } = storeToRefs(useMediaStore())
const { axios } = useAxios()
const emit = defineEmits(['fetch'])

const openHeroMedia = () => {
    media.value.show = true
    media.value.mode = 'gallery'
    media.value.isMultiple = false
    media.value.action = async (state: MediaState) => {
        if (state.selectedGalleries.length > 0) {
            await axios.put(`/treks/${route.params.id}/add_gallery`, {
                gallery_id: state.selectedGalleries[0]
            })
            emit('fetch')
        }
    }
}
</script>

<template>
    <div
        class="md:col-span-8 bg-card p-4 rounded-lg overflow-hidden shadow-sm group relative border border-border hover:border-primary/40 transition-colors">
        <div v-if="gallery.images && gallery.images.length > 0" class="relative w-full rounded-lg overflow-hidden">
            <Swiper class="overflow-hidden rounded-lg">
                <SwiperSlide v-for="image in gallery.images" :key="image.id" class="swiper-slide">
                    <img :src="showImage(image.file_name)" :alt="gallery.name" class="w-full h-full object-cover" />
                </SwiperSlide>
            </Swiper>
            <div class="flex items-center justify-center pt-4">
                <Button variant="dark" type="button" modifier="outline" @click="openHeroMedia" class="rounded-full">
                    <PencilIcon class="w-4 h-4" /> Change Gallery
                </Button>
            </div>
        </div>
        <div v-else
            class="aspect-video w-full bg-muted flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg group-hover:bg-primary/5 transition-colors">
            <CameraIcon class="w-10 h-10 text-muted-foreground mb-2 group-hover:text-primary" />
            <p class="text-sm font-bold text-foreground">Click to choose trek hero image</p>
            <p class="text-xs text-muted-foreground">Recommended: 1920x1080 (Max 5MB)</p>
        </div>
    </div>
</template>