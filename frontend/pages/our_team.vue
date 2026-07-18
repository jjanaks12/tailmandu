<script lang="ts" setup>
import img01 from '@/assets/images/team-img01.jpg'
import * as Icons from 'lucide-vue-next'
import { ExternalLinkIcon } from 'lucide-vue-next'
import { capitalize } from 'vue'
import Icon from '~/components/icon.vue'
import { showImage } from '~/lib/filters'
import { useTeamStore } from '~/store/team'

definePageMeta({
    layout: 'default'
})

useHead(() => {
    const title = 'Our Team | Trailmandu'
    const description = 'Meet the passionate team behind Trailmandu, organizing premier skyrunning events and adventure runs across Nepal.'
    const canonical = 'https://trailmandu.com/our_team'
    const image = img01 || 'https://trailmandu.com/logo.png'

    const members = (teams.value || []).map(member => ({
        '@type': 'OrganizationRole',
        'member': {
            '@type': 'Person',
            'name': member.name,
            'image': member.image ? showImage(member.image.file_name) : undefined,
            'jobTitle': member.positions || [],
            'sameAs': member.social ? Object.values(member.social).filter(Boolean) : []
        },
        'roleName': member.positions?.join(', ') || 'Team Member'
    }))

    return {
        title,
        link: [
            { rel: 'canonical', href: canonical }
        ],
        meta: [
            { name: 'description', content: description },
            { name: 'keywords', content: 'trailmandu team, trail running nepal founders, skyrunning organizers, trailmandu staff' },
            { name: 'robots', content: 'index, follow' },
            // Open Graph
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:image', content: image },
            { property: 'og:url', content: canonical },
            { property: 'og:type', content: 'website' },
            // Twitter
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: image }
        ],
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'AboutPage',
                    '@id': `${canonical}#webpage`,
                    'name': title,
                    'description': description,
                    'url': canonical,
                    'about': {
                        '@type': 'Organization',
                        '@id': 'https://trailmandu.com/#organization',
                        'name': 'Trailmandu',
                        'logo': {
                            '@type': 'ImageObject',
                            'url': 'https://trailmandu.com/logo.png'
                        },
                        'member': members
                    }
                })
            }
        ]
    }
})

const { fetchPublicTeams } = useTeamStore()
const { teams, isLoading } = storeToRefs(useTeamStore())

const socialIcons: Record<string, keyof typeof Icons> = {
    facebook: 'FacebookIcon',
    instagram: 'InstagramIcon',
    youtube: 'YoutubeIcon',
    twitter: 'TwitterIcon',
    linkedin: 'LinkedinIcon',
}

const socialIconsColor: Record<string, string> = {
    facebook: 'bg-[#1877f2]',
    instagram: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]',
    youtube: 'bg-[#ff0000]',
    twitter: 'bg-[#1DA1F2]',
    linkedin: 'bg-[#0077b5]',
}

const getDomainName = (url: string) => {
    try {
        let cleanUrl = url.trim()
        if (!/^https?:\/\//i.test(cleanUrl)) {
            cleanUrl = 'https://' + cleanUrl
        }
        const parsed = new URL(cleanUrl)
        const parts = parsed.hostname.split('.')

        if (parts.length === 1) {
            return parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
        }

        const secondToLast = parts[parts.length - 2]
        const commonSecondLevelTlds = ['co', 'com', 'org', 'edu', 'gov', 'net', 'mil', 'ac']

        let brandName = ''
        if (parts.length >= 3 && commonSecondLevelTlds.includes(secondToLast)) {
            brandName = parts[parts.length - 3]
        } else {
            brandName = parts[parts.length - 2]
        }

        return capitalize(brandName)
    } catch {
        return 'External Link'
    }
}

const formatLink = (url: string) => {
    let cleanUrl = url.trim()
    if (!/^https?:\/\//i.test(cleanUrl)) {
        return 'https://' + cleanUrl
    }
    return cleanUrl
}

onMounted(fetchPublicTeams)
</script>

<template>
    <PageHeader title="Our Team" :pageImage="img01" subtitle="Talent wins games, but teamwork win championships" />

    <section class="py-[120px]">
        <div class="container space-y-16">
            <div v-if="isLoading" class="text-center text-muted-foreground py-20">
                Loading team members...
            </div>

            <div v-else-if="!teams.length" class="text-center text-muted-foreground py-20">
                No team members found.
            </div>

            <div v-for="teamMember in teams" :key="teamMember.id"
                class="flex flex-col md:flex-row gap-8 pb-10 border-b border-border last:border-0">
                <figure class="size-[180px] overflow-hidden rounded-lg shrink-0 bg-muted">
                    <img v-if="teamMember.image" :src="showImage(teamMember.image.file_name)" :alt="teamMember.name"
                        class="w-full h-full object-cover">
                </figure>

                <div class="grow space-y-4">
                    <div>
                        <h2 class="text-2xl text-secondary font-bold">{{ teamMember.name }}</h2>
                        <em class="text-gray-300 block not-italic mt-1">
                            {{ teamMember.positions?.join(', ') }}
                        </em>
                    </div>

                    <ul v-if="teamMember.social" class="flex gap-2">
                        <template v-for="(url, platform) in teamMember.social" :key="platform">
                            <li v-if="url">
                                <Button as-child :class="{
                                    'size-[40px] [&>svg]:size-5': true,
                                    [socialIconsColor[platform]]: true
                                }">
                                    <a :href="url" target="_blank">
                                        <Icon :stroke-width="2" :size="24"
                                            :name="(socialIcons[platform] as keyof typeof Icons)" />
                                    </a>
                                </Button>
                            </li>
                        </template>
                    </ul>

                    <div class="whitespace-pre-wrap" v-html="teamMember.text" />

                    <div v-if="teamMember.links && teamMember.links.length > 0" class="pt-4 flex flex-col gap-2">
                        <p class="font-bold text-sm text-secondary">Read more about {{ teamMember.name }}:</p>
                        <div class="flex flex-wrap gap-2">
                            <Button v-for="(link, index) in teamMember.links" :key="index" modifier="outline" size="sm"
                                as-child>
                                <a :href="formatLink(link)" target="_blank" class="flex items-center gap-2">
                                    <ExternalLinkIcon class="size-3" />
                                    {{ getDomainName(link) }}
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>