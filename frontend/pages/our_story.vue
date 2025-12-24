<script lang="js" setup>
import moment from 'moment';

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
    <div class="bg-gray-600 uppercase py-20 border-b">
        <div class="container">
            <h1 class="text-4xl font-bold">Our Story</h1>
            <em class="text-xl not-italic">Talent wins games, but teamwork win championships</em>
        </div>
    </div>
    <section class="py-12">
        <div class="container">
            <div v-for="story in stories">
                <strong>{{ story.title }}</strong>
                <p>{{ story.text }}</p>
                <time :datetime="story.date">{{ moment(story.date).format('YYYY') }}</time>
            </div>
        </div>
    </section>
</template>