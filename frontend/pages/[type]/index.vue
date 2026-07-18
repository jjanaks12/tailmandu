<script setup lang="ts">
import { showImage } from '~/lib/filters'
import { useTrekStore } from '~/store/trek'
import { storeToRefs } from 'pinia'

definePageMeta({
    validate: async (route) => {
        return ['treks', 'fastpacking'].includes(route.params.type as string)
    }
})

const route = useRoute()
const type = computed(() => route.params.type as string)

const category = computed(() => {
    return type.value === 'treks' ? 'Treks' : 'Fastpacking'
})

const title = computed(() => {
    return category.value === 'Treks' ? 'Himalayan Trekking Expeditions' : 'High-Altitude Fastpacking'
})

const description = computed(() => {
    return category.value === 'Treks' 
        ? 'Journey through legendary trails, ancient cultures, and breathtaking vistas. Our curated treks offer the perfect balance of challenge and serenity.'
        : 'Move fast, travel light. Experience the raw intensity of the mountains with our performance-oriented fastpacking adventures.'
})

const trekStore = useTrekStore()
const { treks } = storeToRefs(trekStore)

useHead(() => {
    const currentTitle = title.value
    const currentDescription = description.value
    const canonical = `https://trailmandu.com/${type.value}`
    const logoUrl = 'https://trailmandu.com/logo.png'

    return {
        title: currentTitle,
        link: [
            { rel: 'canonical', href: canonical }
        ],
        meta: [
            { name: 'description', content: currentDescription },
            { name: 'keywords', content: `${type.value} nepal, trekking, fastpacking, mountain runs, himalayas` },
            { name: 'robots', content: 'index, follow' },
            // Open Graph
            { property: 'og:title', content: currentTitle },
            { property: 'og:description', content: currentDescription },
            { property: 'og:image', content: logoUrl },
            { property: 'og:url', content: canonical },
            { property: 'og:type', content: 'website' },
            // Twitter
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:title', content: currentTitle },
            { name: 'twitter:description', content: currentDescription },
            { name: 'twitter:image', content: logoUrl }
        ],
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'ItemList',
                    'name': currentTitle,
                    'description': currentDescription,
                    'url': canonical,
                    'numberOfItems': treks.value.length,
                    'itemListElement': treks.value.map((item, index) => ({
                        '@type': 'ListItem',
                        'position': index + 1,
                        'item': {
                            '@type': 'TouristTrip',
                            '@id': `https://trailmandu.com/${type.value}/${item.slug}#trip`,
                            'name': item.name,
                            'description': item.excerpt || item.description || '',
                            'url': `https://trailmandu.com/${type.value}/${item.slug}`,
                            'image': item.thumbnail ? showImage(item.thumbnail.file_name) : logoUrl
                        }
                    }))
                })
            } as any
        ]
    }
})
</script>

<template>
    <PagesDefaultFastpackingTrekListing 
        :category="category"
        :title="title"
        :description="description"
    />
</template>
