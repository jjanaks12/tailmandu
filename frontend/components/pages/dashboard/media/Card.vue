<script setup lang="ts">
import { PencilIcon, SquareCheckIcon, SquareIcon } from 'lucide-vue-next'
import { showImage } from '~/lib/filters'
import type { Image } from '~/lib/types'
import { useAppStore } from '~/store/app'

interface MediaItemProps {
    image: Image
}

const emit = defineEmits(['close', 'select', 'unselect'])
const props = defineProps<MediaItemProps>()
const selected = defineModel<string | null>('selected', {
    default: null
})
const { setImageForPreview } = useAppStore()
const hasError = ref(false)
</script>

<template>
    <div class="relative aspect-square border rounded-md overflow-hidden [&_img]:w-full [&_img]:h-full [&_img]:object-cover"
        :class="{
            'border-primary': selected
        }">
        <img v-if="!hasError" :src="showImage(image.file_name)" @error="hasError = true"
            @click="!hasError ? setImageForPreview(showImage(image.file_name)) : null" />
        <img v-else src="/images/not-found.png" />
        <div class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none [&>*]:pointer-events-auto"
            :class="{ 'opacity-100': selected }">
            <Button type="button" variant="warning" v-if="hasError">
                <PencilIcon class="w-4 h-4" />
                update image
            </Button>
            <Button type="button" variant="light" @click="() => selected = selected == null ? image.id : null">
                <SquareCheckIcon class="w-4 h-4" v-if="selected != null" />
                <SquareIcon class="w-4 h-4" v-else />
            </Button>
        </div>
    </div>
</template>