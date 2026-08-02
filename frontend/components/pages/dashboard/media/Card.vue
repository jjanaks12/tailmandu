<script setup lang="ts">
import { PencilIcon, SquareCheckIcon, SquareIcon, Loader2Icon, UploadIcon, GripVerticalIcon } from 'lucide-vue-next'
import { showImage } from '~/lib/filters'
import type { Image } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { toast } from 'vue-sonner'

interface MediaItemProps {
    image: Image
    galleryId?: string
}

const emit = defineEmits(['close', 'select', 'unselect', 'update', 'edit-details'])
const props = defineProps<MediaItemProps>()
const selected = defineModel<string | null>('selected', {
    default: null
})
const { axios } = useAxios()
const hasError = ref(false)
const isUpdating = ref(false)
const isDragOver = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

let dragCounter = 0

const handleUpdateClick = () => {
    fileInput.value?.click()
}

const handleFileChange = async (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return
    uploadFile(file)
}

const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
        toast.error('Only image files are allowed')
        return
    }

    const reader = new FileReader()
    reader.onload = async (e) => {
        const base64 = e.target?.result as string
        isUpdating.value = true
        try {
            await axios.put(`/medias/images/${props.image.id}`, {
                image: base64
            })
            toast.success('Image updated successfully')
            emit('update')
            hasError.value = false
        } catch (error) {
            console.error(error)
            toast.error('Failed to update image')
        } finally {
            isUpdating.value = false
            if (fileInput.value) fileInput.value.value = ''
        }
    }
    reader.readAsDataURL(file)
}

const onDragStart = (e: DragEvent) => {
    if (!e.dataTransfer) return
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('application/x-media-image', JSON.stringify({
        imageId: props.image.id,
        sourceGalleryId: props.galleryId || ''
    }))
}

const onDragEnter = (e: DragEvent) => {
    e.preventDefault()
    // Only show file-drop overlay for actual file drags, not card drags
    if (e.dataTransfer?.types.includes('Files')) {
        dragCounter++
        isDragOver.value = true
    }
}

const onDragOver = (e: DragEvent) => {
    e.preventDefault()
}

const onDragLeave = (e: DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer?.types.includes('Files')) {
        dragCounter--
        if (dragCounter <= 0) {
            dragCounter = 0
            isDragOver.value = false
        }
    }
}

const onDrop = (e: DragEvent) => {
    e.preventDefault()
    dragCounter = 0
    isDragOver.value = false

    // Only handle file drops, not card-to-card drops
    if (!e.dataTransfer?.types.includes('Files')) return

    const file = e.dataTransfer?.files?.[0]
    if (!file) return
    uploadFile(file)
}
</script>

<template>
    <div class="group relative aspect-square border-2 rounded-md overflow-hidden [&_img]:w-full [&_img]:h-full [&_img]:object-cover transition-colors cursor-grab active:cursor-grabbing"
        draggable="true" :class="{
            'border-primary': selected,
            'border-primary border-dashed bg-primary/5': isDragOver,
            'border-transparent': !selected && !isDragOver
        }" @dragstart="onDragStart" @dragenter="onDragEnter" @dragover="onDragOver" @dragleave="onDragLeave"
        @drop="onDrop">
        <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileChange" />

        <div v-if="isUpdating" class="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
            <Loader2Icon class="w-6 h-6 animate-spin text-primary" />
        </div>

        <div v-if="isDragOver"
            class="absolute inset-0 bg-primary/10 backdrop-blur-sm flex flex-col items-center justify-center z-20 pointer-events-none">
            <UploadIcon class="w-8 h-8 text-primary mb-2 animate-bounce" />
            <span class="text-xs font-semibold text-primary">Drop to replace</span>
        </div>

        <img v-if="!hasError" :src="showImage(image.file_name)" @error="hasError = true"
            @click="!hasError ? emit('edit-details', image) : null" class="cursor-pointer" />
        <img v-else src="/images/not-found.png" />

        <div v-if="!isDragOver && !isUpdating"
            class="absolute top-1.5 left-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div class="flex items-center gap-0.5 bg-black/60 text-white rounded-full px-1.5 py-0.5">
                <GripVerticalIcon class="w-3 h-3" />
                <span class="text-[10px] font-medium">Drag</span>
            </div>
        </div>

        <div class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none [&>*]:pointer-events-auto"
            :class="{ 'opacity-100': selected, 'invisible': isDragOver }">
            <Button type="button" variant="warning" @click="handleUpdateClick" :disabled="isUpdating">
                <PencilIcon class="w-4 h-4" />
                <span class="ml-2 text-xs">Update</span>
            </Button>
            <Button type="button" variant="light" @click="() => selected = selected == null ? image.id : null"
                :disabled="isUpdating">
                <SquareCheckIcon class="w-4 h-4" v-if="selected != null" />
                <SquareIcon class="w-4 h-4" v-else />
            </Button>
        </div>
    </div>
</template>