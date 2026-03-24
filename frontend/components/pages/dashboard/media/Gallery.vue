<script setup lang="ts">
import { CircleCheckIcon, FolderOpenIcon, ImageIcon } from 'lucide-vue-next'
import type { Gallery } from '~/lib/types'

interface Props {
    gallery: Gallery
}

const emit = defineEmits(['selected'])
const props = defineProps<Props>()

const isSelected = defineModel<boolean>('selected', { default: false })
</script>

<template>
    <div class="group relative cursor-pointer rounded-xl transition-all hover:scale-[1.02] border"
        :class="{ 'border-secondary hover:shadow-md': isSelected }" @dblclick="emit('selected')">
        <div class="aspect-[4/3] relative overflow-hidden">
            <div class="size-full flex flex-wrap justify-center p-2.5 gap-2.5">
                <ImageIcon class="size-[calc(50%-10px)]" v-for="index in Math.min(gallery._count.images, 3)"
                    :key="index" />
                <span class="size-1/2 flex items-center justify-center text-4xl border rounded"
                    v-if="gallery._count.images > 3">
                    +{{ gallery._count.images - 3 }}
                </span>
            </div>
            <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors rounded-xl"
                :class="{ 'bg-black/10': isSelected }"></div>
            <div v-if="isSelected"
                class="bg-white absolute top-3 right-3 bg-primary-container text-on-primary rounded-full p-1 shadow-lg">
                <CircleCheckIcon />
            </div>
        </div>
        <div class="p-4 flex gap-2 justify-between items-start">
            <div>
                <h3 class="font-headline font-bold text-on-surface">{{ gallery.name }}</h3>
                <p class="text-xs text-on-surface-variant font-medium">{{ gallery._count.images }} photos</p>
            </div>
            <FolderOpenIcon class="text-on-surface-variant/40 group-hover:text-primary-container transition-colors" />
        </div>
    </div>
</template>