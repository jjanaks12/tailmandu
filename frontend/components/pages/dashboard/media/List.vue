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
        :show-actions="true" :key="`galleries_${index}`" @edit="emit('edit', galleryItem)"
        @delete="emit('delete', galleryItem)" @fetch="emit('fetch')" />
    <PagesDashboardMediaUncategorized :uncategories="uncategories" v-if="uncategories.length > 0"
        @refresh="emit('fetch')" />
</template>