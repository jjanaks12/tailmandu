<script lang="ts" setup>
import img01 from '@/assets/images/team-img01.jpg'
import jeevan from '@/assets/images/jeevan.jpg'
import rasila from '@/assets/images/rasila.jpg'
import aashish from '@/assets/images/aashish.jpg'
import * as Icons from 'lucide-vue-next'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from 'lucide-vue-next'
import Icon from '~/components/icon.vue'

definePageMeta({
    layout: 'default'
})

useHead({
    title: 'Our Team'
})

type Team = {
    name: string
    position: string[]
    image: string
    social: Record<string, string>
    text?: string
    links?: string[]
}

const socialIcons: Record<string, keyof typeof Icons> = {
    facebook: 'FacebookIcon',
    instagram: 'InstagramIcon',
    youtube: 'YoutubeIcon'
}
const socialIconsColor: Record<string, string> = {
    facebook: 'bg-[#1877f2]',
    instagram: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]',
    youtube: 'bg-[#ff0000]'
}

const team: Team[] = [{
    name: 'Jeevan Lama',
    position: ['Ultra Trail Runner ', 'Guide ', 'Photoghapher'],
    image: jeevan,
    social: {
        facebook: 'https://www.facebook.com/jeevan.lama2',
        instagram: 'https://www.instagram.com/adventureaddict2ad/',
        youtube: 'https://www.youtube.com/@jeevan8666/videos'
    },
    text: "Hello I'm Jeevan.\n\nI was born and raised in Kathmandu Valley. As a child I always used to be a bit more active and passionate about sports and outdoor activities. But unfortunately growing up as a teenager things took a bad turn for me and I got into drug addiction. For years I spent in recovery and tried really hard to bring my life back to track. During this period I even tried my luck living abroad for a few years.\n\nIn 2018, I finally decided to come back to Nepal and start a new life and to follow my childhood dream. I wanted to get back to my passion and wanted to do what I loved the most: outdoor sports. At first I started running around a bit and then slowly started exploring the nearby hills. I started participating in local races and then into various National and International Level Trail Races.\n\nThen due my passion and love for the sport, I slowly started winning medals and prizes too in many National and International Level Trail Races. And when I was not running or participating in races, I also started working as a freelance running guide, a photographer and as well as a videographer in various trail races & events.\n\nYou can click on the link below to know little bit more about me.",
    links: ['https://english.onlinekhabar.com/jeevan-lama-trail-runner-nepal.html']
}, {
    name: 'Rasila Tamang',
    position: ['Ultra Trail Runner', 'Climber', 'Guide'],
    image: rasila,
    social: {
        facebook: 'https://www.facebook.com/rashila.tamang.946',
        instagram: 'https://www.instagram.com/rashila.tamang/'
    },
    text: "Hello I'm Rashila.\n\nI was born and grew up in small village at Dhading district near the Kathmandu valley. My early years went in helping my mother and family in the daily household chores and farming.\n\nI then came to Kathmandu and started participating in small races since 2016. After years of training and learning I have become a proficient mountain climber as well.\n\nI have participated in many National and International Trail Races and have won many medals and titles till date.\n\nNow I can proudly say that I am a passionate and professional Ultra Trail Runner and a Mountain Climber as well.\n\nYou can click on the link below to know little bit more about me.",
    links: ['https://english.onlinekhabar.com/rashila-tamang-trail-and-ultrarunning.html']
}, {
    name: 'Aashish Mishra',
    position: ['Ultra Trail Explorer', 'Guide', 'Photographer'],
    image: aashish,
    social: {
        facebook: 'https://www.facebook.com/aashish.mishra.9256028',
        instagram: 'https://www.instagram.com/irun4change/'
    },
    text: "Hello I'm Aashish.\n\nI was born and raised in a small village in the Eastern region of Nepal called Panchthar.\n\nI came to Kathmandu for my studies and after a few years I started my job in an INGO. In 2016, I quit my job and started working  as a race coordinator / trail explorer and also as a trail running guide with various organizations like the Mira Rai Initiative, Trail Running Nepal, Kathmandu Trail Series, Snail Trail series, Dharma Adventure, Great Himalayan Mandala and many more.\n\nYou can click on the link below to know little bit more about me."
}]
</script>

<template>
    <PageHeader title="Our Team" :pageImage="img01" subtitle="Talent wins games, but teamwork win championships" />
    <section class="py-[120px]">
        <div class="container space-y-10">
            <div v-for="teamMember in team" class="flex flex-col md:flex-row gap-8">
                <figure class="size-[180px] overflow-hidden rounded-lg shrink-0">
                    <img :src="teamMember.image" :alt="teamMember.name">
                </figure>
                <div class="grow space-y-2">
                    <h2 class="text-2xl text-secondary font-bold">{{ teamMember.name }}</h2>
                    <em class="text-gray-300 block not-italic">
                        {{ teamMember.position.join(', ') }}
                    </em>
                    <ul class="flex gap-2 mb-6">
                        <li v-for="(social, platform) in teamMember.social">
                            <Button as-child :class="{
                                'size-[40px] [&>svg]:size-5': true,
                                [socialIconsColor[platform]]: true
                            }">
                                <a :href="social" target="_blank">
                                    <Icon :stroke-width="2" :size="24"
                                        :name="(socialIcons[platform] as keyof typeof Icons)" />
                                </a>
                            </Button>
                        </li>
                    </ul>
                    <div class="whitespace-pre-wrap" v-html="teamMember.text" />
                </div>
            </div>
        </div>
    </section>
</template>