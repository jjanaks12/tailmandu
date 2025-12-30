<script lang="ts" setup>
import img01 from '@/assets/images/about-img01.jpg'

definePageMeta({
    layout: 'default'
})

useHead({
    title: 'About Us'
})

useSeoMeta({
    title: 'About Us',
    description: 'AboutAs trail runners, mountain adventurers, and outdoor lovers we have spent the past 10 years exploring the hidden trails of Nepal. We have been so enriched by these amazing opportunities that we decided to launch Trailmandu to share our experiences with you.',
    ogTitle: 'About Us',
    ogDescription: 'AboutAs trail runners, mountain adventurers, and outdoor lovers we have spent the past 10 years exploring the hidden trails of Nepal. We have been so enriched by these amazing opportunities that we decided to launch Trailmandu to share our experiences with you.',
    ogImage: img01,
    ogImageAlt: 'About Us',
    ogImageWidth: 1200,
    ogImageHeight: 630,
})
</script>

<template>
    <PageHeader title="About Us" :pageImage="img01" subtitle="From The City To The Mountains" />
    <div class="container">
        <div id="content" class="text-gray-700 py-[100px] text__holder">
            <p>As trail runners, mountain adventurers, and outdoor lovers we have spent the past 10 years exploring the
                hidden trails of Nepal. We have been so enriched by these amazing opportunities that we decided to
                launch Trailmandu to share our experiences with you.</p>
            <p>Our aim is to support you in reaching your personal goal, giving you a more personal experience while
                adventuring our hand picked and tailored wild trails, immersing with the local communities and their
                cultures.</p>
            <p> From running on single tracks to climbing steep high hills, running down technical trails to reaching
                some spiritual and meditative destinations, our vision is to support you in reaching your own summit,
                while having a positive impact on the local communities.</p>
            <p>Trailmandu creates running adventures for runners by the runners. Instead of having to squeeze in a run
                on vacation, your run becomes the vehicle for exploring and learning about a new country, new culture,
                and a new landscape.</p>
        </div>
    </div>
</template>