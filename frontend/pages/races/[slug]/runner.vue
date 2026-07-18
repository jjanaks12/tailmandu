<script lang="ts" setup>
import { ArrowBigLeft } from 'lucide-vue-next'
import { showImage } from '~/lib/filters'
import type { TrailRace } from '~/lib/types'
import { useEventStore } from '~/store/event'

const route = useRoute()
const { getBySlug } = useEventStore()
const trailRace = ref<TrailRace | null>(null)

onBeforeMount(async () => {
    trailRace.value = await getBySlug(route.params.slug as string)
})

useHead(() => {
    if (!trailRace.value) return { title: 'Register - Trailmandu' }

    const currentTitle = `Register for ${trailRace.value.name} - Runner Form | Trailmandu`
    const currentDescription = trailRace.value.excerpt || `Register as a runner for ${trailRace.value.name}. Join this premier trail race organized by Trailmandu.`
    const canonical = `https://trailmandu.com/races/${trailRace.value.slug}/runner`
    const image = trailRace.value.thumbnail?.file_name
        ? showImage(trailRace.value.thumbnail.file_name)
        : 'https://trailmandu.com/logo.png'

    return {
        title: currentTitle,
        link: [
            { rel: 'canonical', href: canonical }
        ],
        meta: [
            { name: 'description', content: currentDescription },
            { name: 'robots', content: 'index, follow' },
            // Open Graph
            { property: 'og:title', content: currentTitle },
            { property: 'og:description', content: currentDescription },
            { property: 'og:image', content: image },
            { property: 'og:url', content: canonical },
            { property: 'og:type', content: 'website' },
            // Twitter
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: currentTitle },
            { name: 'twitter:description', content: currentDescription },
            { name: 'twitter:image', content: image }
        ],
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'RegisterAction',
                    'name': `Register as Runner for ${trailRace.value.name}`,
                    'description': currentDescription,
                    'target': {
                        '@type': 'EntryPoint',
                        'urlTemplate': canonical,
                        'inLanguage': 'en-US',
                        'actionPlatform': [
                            'http://schema.org/DesktopWebPlatform',
                            'http://schema.org/MobileWebPlatform'
                        ]
                    },
                    'object': {
                        '@type': 'SportsEvent',
                        '@id': `https://trailmandu.com/races/${trailRace.value.slug}#event`,
                        'name': trailRace.value.name,
                        'url': `https://trailmandu.com/races/${trailRace.value.slug}`
                    }
                })
            } as any
        ]
    }
})

</script>

<template>
    <section v-if="trailRace" class="overflow-hidden">
        <figure class="fixed inset-0 -z-[1]">
            <img :src="showImage(trailRace.thumbnail?.file_name as string)" :alt="trailRace.name"
                class="size-full object-cover">
        </figure>
        <div class="container">
            <div class="bg-white/90 p-4 md:p-12 -mx-[15px] md:mx-0 mt-12 rounded-tl-2xl rounded-tr-2xl min-h-[70vh]">
                <div class="space-y-4 mb-16">
                    <h1 class="text-primary text-3xl">{{ trailRace?.name }}</h1>
                    <p v-text="trailRace.excerpt" />
                    <div class="flex justify-center">
                        <Button size="lg" as-child>
                            <NuxtLink :to="`/races/${route.params.slug as string}`" as-child>
                                <ArrowBigLeft />
                                Back to main event
                            </NuxtLink>
                        </Button>
                    </div>
                </div>
                <PagesDefaultRacesRegistrationForm :event-id="trailRace.id" :trail-race="trailRace" mode="runner" />
            </div>
        </div>
    </section>
    <div v-else>loading....</div>
</template>