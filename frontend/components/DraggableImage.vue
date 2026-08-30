<script setup lang="ts">
import { MoveIcon, SaveIcon } from 'lucide-vue-next'
import { useAxios } from '~/services/axios'
import { toast } from 'vue-sonner'
import { showImage } from '~/lib/filters'
import type { Image } from '~/lib/types'
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
    image: Image
    alt?: string
    hasManagePermission?: boolean
    containerClass?: string
    figureClass?: string
}>(), {
    alt: 'Image',
    hasManagePermission: false,
    containerClass: '',
    figureClass: 'aspect-video'
})

const { axios } = useAxios()
const isSavingPosition = ref(false)
const focalPoint = ref({ x: 50, y: 50 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const dragStartFocal = ref({ x: 50, y: 50 })
const imageRef = ref<HTMLElement | null>(null)

watch(() => props.image, (newVal) => {
    if (newVal?.detail?.focal_point) {
        focalPoint.value = newVal.detail.focal_point
    } else {
        focalPoint.value = { x: 50, y: 50 }
    }
}, { immediate: true })

const onDragStart = (e: MouseEvent | TouchEvent) => {
    if (!props.hasManagePermission) return
    isDragging.value = true
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    dragStart.value = { x: clientX, y: clientY }
    dragStartFocal.value = { ...focalPoint.value }
    document.body.style.userSelect = 'none'
}

const onDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.value || !imageRef.value) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    
    const dx = clientX - dragStart.value.x
    const dy = clientY - dragStart.value.y
    
    const rect = imageRef.value.getBoundingClientRect()
    const percentX = (dx / rect.width) * 100
    const percentY = (dy / rect.height) * 100
    
    focalPoint.value.x = Math.max(0, Math.min(100, dragStartFocal.value.x - percentX))
    focalPoint.value.y = Math.max(0, Math.min(100, dragStartFocal.value.y - percentY))
}

const onDragEnd = () => {
    isDragging.value = false
    document.body.style.userSelect = ''
}

const savePosition = async () => {
    if (!props.image) return
    isSavingPosition.value = true
    try {
        const detail = {
            ...(props.image.detail || {}),
            focal_point: focalPoint.value
        }
        await axios.put(`/medias/images/${props.image.id}`, { detail })
        toast.success('Image position saved successfully')
    } catch (e) {
        toast.error('Failed to save image position')
    } finally {
        isSavingPosition.value = false
    }
}

onMounted(() => {
    if (typeof window !== 'undefined') {
        window.addEventListener('mousemove', onDragMove)
        window.addEventListener('mouseup', onDragEnd)
        window.addEventListener('touchmove', onDragMove, { passive: false })
        window.addEventListener('touchend', onDragEnd)
    }
})

onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', onDragMove)
        window.removeEventListener('mouseup', onDragEnd)
        window.removeEventListener('touchmove', onDragMove)
        window.removeEventListener('touchend', onDragEnd)
    }
})
</script>

<template>
    <div :class="['relative group', containerClass]">
        <figure
            ref="imageRef"
            :class="[
                'overflow-hidden shadow-2xl border border-white/10 relative',
                figureClass,
                { 'cursor-grab': hasManagePermission && !isDragging, 'cursor-grabbing': isDragging }
            ]"
            @mousedown="onDragStart"
            @touchstart="onDragStart"
        >
            <img :src="showImage(image.file_name)" :alt="alt"
                class="w-full h-full object-cover"
                :style="{ objectPosition: `${focalPoint.x}% ${focalPoint.y}%` }"
                draggable="false"
            />
            
            <div v-if="hasManagePermission" 
                 class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div class="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2">
                    <MoveIcon class="w-4 h-4" />
                    <span class="text-sm font-medium">Drag to reposition</span>
                </div>
            </div>
        </figure>

        <div v-if="hasManagePermission" 
             class="absolute top-4 right-8 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Button @click="savePosition" size="sm" :loading="isSavingPosition">
                <SaveIcon v-if="!isSavingPosition" class="w-4 h-4 mr-2" />
                Save Position
            </Button>
        </div>
    </div>
</template>
