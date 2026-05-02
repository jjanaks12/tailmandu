<script setup lang="ts">
definePageMeta({
    validate: async (route) => {
        return ['treks', 'fastpacking'].includes(route.params.type as string)
    }
})

const route = useRoute()
const type = computed(() => route.params.type as string)

const category = computed(() => {
    return type.value === 'treks' ? 'Treks' : 'Fastpacking'
})

const title = computed(() => {
    return category.value === 'Treks' ? 'Himalayan Trekking Expeditions' : 'High-Altitude Fastpacking'
})

const description = computed(() => {
    return category.value === 'Treks' 
        ? 'Journey through legendary trails, ancient cultures, and breathtaking vistas. Our curated treks offer the perfect balance of challenge and serenity.'
        : 'Move fast, travel light. Experience the raw intensity of the mountains with our performance-oriented fastpacking adventures.'
})
</script>

<template>
    <PagesDefaultFastpackingTrekListing 
        :category="category"
        :title="title"
        :description="description"
    />
</template>
