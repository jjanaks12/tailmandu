<script lang="ts" setup>
import { Trash2Icon, ImagePlusIcon, Edit2Icon, SaveIcon } from 'lucide-vue-next';
import { showImage } from '~/lib/filters';
import { useEventStore } from '~/store/event'
import { useMediaStore } from '~/store/media'
import { storeToRefs } from 'pinia'
import type { TrailRace } from '~/lib/types'

interface TrailRaceGalleryListProps {
    trailRace: TrailRace
}

const props = defineProps<TrailRaceGalleryListProps>()
const emit = defineEmits(['update'])
const { saveGalleryId } = useEventStore()
const { media } = storeToRefs(useMediaStore())

const isLoading = ref(false)
const selectedGalleryId = ref(props.trailRace.gallery_id || '')

const openMediaCenter = () => {
    media.value.show = true
    media.value.mode = 'gallery'
    media.value.isMultiple = false

    // Pre-select if we already have one
    if (selectedGalleryId.value) {
        media.value.selectedGalleries = [selectedGalleryId.value]
    } else {
        media.value.selectedGalleries = []
    }

    media.value.action = async (state: any) => {
        if (state.selectedGalleries && state.selectedGalleries.length > 0) {
            selectedGalleryId.value = state.selectedGalleries[0]

            isLoading.value = true
            await saveGalleryId(props.trailRace.id, selectedGalleryId.value)
            emit('update')
            isLoading.value = false
            media.value.show = false
        }
    }
}

const removeGallery = async () => {
    isLoading.value = true
    selectedGalleryId.value = ''
    await saveGalleryId(props.trailRace.id, '')
    emit('update')
    isLoading.value = false
}

watch(() => props.trailRace.gallery_id, (newVal) => {
    selectedGalleryId.value = newVal || ''
})
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-lg font-medium">Event Gallery</h3>
                <p class="text-sm text-muted-foreground">Link a gallery from the Media Center to display on this event's
                    page.</p>
            </div>
            <div class="flex gap-2">
                <Button v-if="selectedGalleryId" @click="openMediaCenter" modifier="outline" class="gap-2">
                    <Edit2Icon class="w-4 h-4" /> Change Gallery
                </Button>
                <Button v-if="selectedGalleryId" @click="removeGallery" variant="destructive" class="gap-2">
                    <Trash2Icon class="w-4 h-4" /> Unlink Gallery
                </Button>
            </div>
        </div>

        <div v-if="!selectedGalleryId"
            class="text-center py-10 border rounded-lg border-dashed bg-muted/20 cursor-pointer hover:bg-muted/30 transition-colors"
            @click="openMediaCenter">
            <ImagePlusIcon class="w-8 h-8 mx-auto text-muted-foreground mb-4" />
            <p class="text-lg font-medium">No Gallery Linked</p>
            <p class="text-sm text-muted-foreground mb-4">Click here to select a gallery from the Media Center.</p>
            <Button modifier="outline" class="gap-2" :disabled="isLoading">
                <ImagePlusIcon class="w-4 h-4" /> Select Gallery
            </Button>
        </div>

        <div v-else-if="trailRace.gallery && trailRace.gallery.images" class="flex flex-wrap gap-4 mt-6">
            <div class="w-full mb-2 border-b pb-2">
                <h4 class="font-bold text-lg">{{ trailRace.gallery.name }}</h4>
                <p v-if="trailRace.gallery.description" class="text-sm text-muted-foreground">{{
                    trailRace.gallery.description }}</p>
            </div>
            <figure
                class="w-[calc(25%-16px)] h-[250px] p-2 rounded overflow-hidden relative border border-dashed bg-muted/10"
                v-for="image in trailRace.gallery.images" :key="image.id">
                <img :src="showImage(image.file_name)" :alt="image.description || 'Gallery image'"
                    class="w-full h-full object-contain object-center">
            </figure>
            <div v-if="trailRace.gallery.images.length === 0" class="w-full py-8 text-center text-muted-foreground">
                This gallery currently has no images. Open the Media Center to add images to it.
            </div>
        </div>
    </div>
</template>