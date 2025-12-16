<script lang="ts" setup>
    import HomeBanner from '@/components/pages/default/home/banner.vue'
    import Newsletter from '@/components/pages/default/newsletter.vue'

    definePageMeta({
        layout: 'default'
    })

    useHead({
        meta: [{
            name: 'description',
            content: 'This is a description of my awesome page.'
        }]
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