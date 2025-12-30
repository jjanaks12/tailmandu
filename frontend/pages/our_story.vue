<script lang="js" setup>
import moment from 'moment'
import img01 from '@/assets/images/our-story-img01.jpg'

definePageMeta({
    layout: 'default'
})

useHead({
    title: 'Our Story'
})

const stories = [{
    title: "Foundation",
    subtitle: "Started Our Journey",
    text: "Each of us started our journey from different backgrounds and different ventures before getting in to trail running.",
    date: '2017-01-01 00:00:00'
}, {
    title: "Joined Hands",
    subtitle: "Collaboration",
    text: "All three of us joined hands and started collaborating in different trail running and outdoor events.",
    date: '2019-01-01 00:00:00'
}, {
    title: "Exapansion",
    subtitle: "We are bigger",
    text: "We grew together as a team and decided on forming Trailmandu.",
    date: '2021-01-01 00:00:00'
}, {
    title: "Online",
    subtitle: "We are online!",
    text: "We finally decided to work together as a team and bring out Trailmandu.",
    date: '2023-01-01 00:00:00'
}]
</script>

<template>
    <PageHeader title="Our Story" :pageImage="img01" subtitle="Talent wins games, but teamwork win championships" />
    <section class="py-12">
        <div class="container space-y-[50px] md:space-y-[0]">
            <div :class="{
                'md:flex md:[&>div]:p-[30px] hover:[&>div>time]:text-secondary last:[&>div]:border-b-0': true,
                'flex-row-reverse': index % 2 === 0
            }" v-for="(story, index) in stories">
                <div :class="{
                    'bg-white md:basis-[238px] shrink-0 -mt-[1px] mb-5 md:mb-0': true,
                    'md:border-l': index % 2 === 0,
                    'md:border-r': index % 2 !== 0
                }">
                    <time :datetime="story.date" class="text-gray-700 text-[25px] font-bold">
                        {{ moment(story.date).format('YYYY') }}
                    </time>
                    <strong class="block text-sm">{{ story.title }}</strong>
                </div>
                <div class="grow md:border-b">
                    <em class="text-gray-700 block not-italic text-lg font-bold mb-2">{{ story.subtitle }}</em>
                    <p class="text-primary">{{ story.text }}</p>
                </div>
            </div>
        </div>
    </section>
</template>