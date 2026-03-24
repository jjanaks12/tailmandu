<script setup lang="ts">
import { CameraIcon, ImageIcon, PencilIcon, SearchIcon, UploadIcon } from 'lucide-vue-next'
import { showImage } from '~/lib/filters'
import type { MediaState, Trek } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { useMediaStore } from '~/store/media'

interface GalleryProps {
    trek: Trek
}

const route = useRoute()
const props = defineProps<GalleryProps>()
const { media } = storeToRefs(useMediaStore())
const { axios } = useAxios()
const emit = defineEmits(['fetch'])

const openHeroMedia = () => {
    media.value.show = true
    media.value.mode = 'image'
    media.value.isMultiple = false
    media.value.action = async (state: MediaState) => {
        if (state.selectedImages.length > 0) {
            await axios.put(`/treks/${route.params.id}`, {
                image_id: state.selectedImages[0]
            })
            emit('fetch')
        }
    }
}
</script>

<template>
    <div class="bg-card shadow-sm border border-border rounded-lg p-6 mb-4">
        <h4 class="text-xs font-bold text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
            <SearchIcon class="w-4 h-4" /> Trek Thumbnail
        </h4>
        <div
            class="aspect-square w-full bg-muted rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center transition-colors group overflow-hidden">
            <template v-if="trek.thumbnail">
                <img :src="showImage(trek.thumbnail.file_name)" alt="Trek Thumbnail"
                    class="w-full h-full object-cover rounded-lg" />
            </template>
            <template v-else>
                <ImageIcon class="w-8 h-8 text-muted-foreground mb-2 group-hover:text-primary" />
                <p class="text-[10px] font-bold text-foreground text-center">Upload thumbnail</p>
                <p class="text-[9px] text-muted-foreground text-center mt-1">500x500px (Max 1MB)</p>
            </template>
        </div>
        <Button @click="openHeroMedia" modifier="outline"
            class="w-full mt-4 flex items-center justify-center gap-1 border-primary/20 text-primary hover:bg-primary/5">
            <UploadIcon class="w-4 h-4" /> Choose from Media
        </Button>
    </div>
</template>