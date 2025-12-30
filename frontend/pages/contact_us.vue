<script lang="ts" setup>
import img01 from '@/assets/images/our-story-img01.jpg'

useHead({
    title: 'Contact Us'
})

definePageMeta({
    layout: 'default'
})
</script>

<template>
    <PageHeader title="Contact Us" :pageImage="img01" subtitle="Let's Get Connected" />
</template>