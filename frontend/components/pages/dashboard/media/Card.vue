<script setup lang="ts">
import { PencilIcon, SquareCheckIcon, SquareIcon, Loader2Icon } from 'lucide-vue-next'
import { showImage } from '~/lib/filters'
import type { Image } from '~/lib/types'
import { useAppStore } from '~/store/app'
import { useAxios } from '~/services/axios'
import { toast } from 'vue-sonner'

interface MediaItemProps {
    image: Image
}

const emit = defineEmits(['close', 'select', 'unselect', 'update'])
const props = defineProps<MediaItemProps>()
const selected = defineModel<string | null>('selected', {
    default: null
})
const { axios } = useAxios()
const { setImageForPreview } = useAppStore()
const hasError = ref(false)
const isUpdating = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const handleUpdateClick = () => {
    fileInput.value?.click()
}

const handleFileChange = async (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return

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
</script>

<template>
    <div class="relative aspect-square border rounded-md overflow-hidden [&_img]:w-full [&_img]:h-full [&_img]:object-cover"
        :class="{
            'border-primary': selected
        }">
        <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileChange" />

        <div v-if="isUpdating" class="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
            <Loader2Icon class="w-6 h-6 animate-spin text-primary" />
        </div>

        <img v-if="!hasError" :src="showImage(image.file_name)" @error="hasError = true"
            @click="!hasError ? setImageForPreview(showImage(image.file_name)) : null" />
        <img v-else src="/images/not-found.png" />

        <div class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none [&>*]:pointer-events-auto"
            :class="{ 'opacity-100': selected }">
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