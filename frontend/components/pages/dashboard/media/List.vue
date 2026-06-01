<script setup lang="ts">
import type { Gallery, Image } from '~/lib/types'

interface MediaListProps {
    galleries: Gallery[]
}

const props = defineProps<MediaListProps>()
const emit = defineEmits(['edit', 'delete', 'fetch'])
</script>

<template>
    <PagesDashboardMediaItem :gallery="galleryItem" class="mb-12" v-for="(galleryItem, index) in galleries"
        :show-actions="true" :key="`galleries_${index}`" @edit="emit('edit', galleryItem)"
        @delete="emit('delete', galleryItem)" @fetch="emit('fetch')" />
    <PagesDashboardMediaUncategorized @refresh="emit('fetch')" />
</template>