<script setup lang="ts">
import { ImageIcon, UploadIcon, XIcon } from 'lucide-vue-next'
import { useMediaStore } from '~/store/media'
import { showImage } from '~/lib/filters'

const props = defineProps<{
    value?: string | null
    preview?: string | null
    label?: string
}>()

const emit = defineEmits(['update:value'])

const { media } = storeToRefs(useMediaStore())

const openMediaCenter = () => {
    media.value.show = true
    media.value.mode = 'image'
    media.value.isMultiple = false
    media.value.action = (state: any) => {
        if (state.selectedImages.length > 0) {
            emit('update:value', state.selectedImages[0])
            media.value.show = false
        }
    }
}

const clear = () => {
    emit('update:value', null)
}
</script>

<template>
    <div class="space-y-2">
        <Label v-if="label">{{ label }}</Label>
        <div class="relative aspect-square w-full bg-muted rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center transition-colors group overflow-hidden">
            <template v-if="preview || value">
                <img v-if="preview" :src="showImage(preview)" class="w-full h-full object-cover" />
                <div v-else class="flex items-center justify-center h-full text-muted-foreground p-4 text-center text-[10px]">
                    Image Selected (ID: {{ value }})
                </div>
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-2">
                    <Button size="icon" variant="secondary" @click="openMediaCenter" type="button">
                        <UploadIcon class="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive" @click="clear" type="button">
                        <XIcon class="h-4 w-4" />
                    </Button>
                </div>
            </template>
            <template v-else>
                <div class="flex flex-col items-center p-4 cursor-pointer w-full h-full justify-center" @click="openMediaCenter">
                    <ImageIcon class="w-8 h-8 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                    <p class="text-xs font-medium">Select Image</p>
                </div>
            </template>
        </div>
    </div>
</template>
