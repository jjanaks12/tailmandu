<script setup lang="ts">
import type { Gallery, Image } from '~/lib/types'

interface MediaListProps {
    galleries: Gallery[]
    uncategories: Image[]
}

const props = defineProps<MediaListProps>()
const emit = defineEmits(['edit', 'delete', 'fetch'])
</script>

<template>
    <PagesDashboardMediaItem :gallery="galleryItem" class="mb-12" v-for="(galleryItem, index) in galleries"
        :key="`galleries_${index}`" @edit="emit('edit', galleryItem)" @delete="emit('delete', galleryItem)"
        @fetch="emit('fetch')" />
    <template v-if="uncategories.length > 0">
        <div class="flex items-center justify-between relative">
            <div class="grow">
                <strong class="text-xl">Uncategorised</strong>
            </div>
        </div>
        <div class="grid grid-cols-4 gap-2">
            <PagesDashboardMediaCard v-for="(image, index) in uncategories" :key="`uncategories_${index}`"
                :image="image" />
        </div>
    </template>
</template>