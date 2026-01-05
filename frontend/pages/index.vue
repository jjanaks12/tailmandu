<script lang="ts" setup>
import HomeBanner from '@/components/pages/default/home/banner.vue'
import Newsletter from '@/components/pages/default/newsletter.vue'
import img01 from '@/assets/images/review-img01.jpg'

definePageMeta({
    layout: 'default'
})

useHead({
    meta: [{
        name: 'description',
        content: "From the City to the Peaks: Trailmandu’s Adventure Runs in Nepal's Natural Scenic Routes"
    }]
})

useSeoMeta({
    title: 'Trailmandu - From The City To The Mountains',
    description: "From the City to the Peaks: Trailmandu’s Adventure Runs in Nepal's Natural Scenic Routes",
    ogTitle: 'Trailmandu - From The City To The Mountains',
    ogDescription: "From the City to the Peaks: Trailmandu’s Adventure Runs in Nepal's Natural Scenic Routes",
    ogImage: img01
})

onMounted(() => {
    useTitle('Trailmandu - From The City To The Mountains')
})
</script>

<template>
    <HomeBanner />
    <Newsletter />
    <!-- Sponsors -->
    <!-- footer -->
</template>