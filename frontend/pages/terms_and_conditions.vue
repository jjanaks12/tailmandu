<script lang="ts" setup>
import img01 from '@/assets/images/our-story-img01.jpg'

useHead({
    title: 'Terms and Conditions'
})

definePageMeta({
    layout: 'default'
})
</script>

<template>
    <PageHeader title="Terms and Conditions" :pageImage="img01" />
    <div class="container">
        <div id="content" class="text-gray-700 py-[100px] text__holder">
            <p></p>
        </div>
    </div>
</template>