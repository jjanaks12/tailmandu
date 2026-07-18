<script lang="ts" setup>
import { SearchIcon } from 'lucide-vue-next'
import type { Gallery, WithCount } from '~/lib/types'
import { useAxios } from '~/services/axios'

useHead(() => {
    const title = 'TM Clicks Gallery | Trailmandu'
    const description = 'Browse the official photo gallery of Trailmandu events, capturing stunning trail running, skyrunning, and adventure moments in Nepal.'
    const canonical = 'https://trailmandu.com/tm_clicks'
    const image = 'https://trailmandu.com/logo.png'

    const collections = (galleries.value || []).map(g => ({
        '@type': 'ImageGallery',
        'name': g.name,
        'url': `${canonical}?gallery=${g.id}`,
        'description': `Photo gallery for ${g.name} event containing ${g._count?.images || 0} images.`
    }))

    return {
        title,
        link: [
            { rel: 'canonical', href: canonical }
        ],
        meta: [
            { name: 'description', content: description },
            { name: 'keywords', content: 'trailmandu photo gallery, trail running pictures nepal, skyrunning gallery, nepal running photos, tm clicks' },
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
                    '@type': 'CollectionPage',
                    '@id': `${canonical}#webpage`,
                    'name': title,
                    'description': description,
                    'url': canonical,
                    'hasPart': collections
                })
            }
        ]
    }
})

definePageMeta({
    layout: 'default'
})

const { axios } = useAxios()
const galleries = ref<WithCount<Gallery>[]>([])
const params = useUrlSearchParams('history')

const totalImages = computed(() => galleries.value.reduce((acc, curr) => acc + (curr._count?.images ?? 0), 0))
const filteredCategories = computed(() => galleries.value.filter((gallery) => gallery.name.toLowerCase().includes(((params.s as string ?? '')).toLowerCase() || '')))

const fetch = async () => {
    const { data } = await axios.get('/medias/gallery_name')
    galleries.value = data
}

onMounted(fetch)
</script>

<template>
    <div class="flex flex-col md:flex-row w-full relative pt-[80px]">
        <aside class="w-full md:w-72 flex-shrink-0 bg-gray-200 border-r border-black/10 flex flex-col">
            <div class="p-6 border-b border-black/10">
                <div class="relative group">
                    <SearchIcon
                        class="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 text-sm group-focus-within:text-accent" />
                    <input
                        class="w-full h-12 bg-white border border-black/10 py-2 pl-9 pr-4 text-xs tracking-tight placeholder:text-black/20 focus:border-accent transition-colors"
                        placeholder="Search gallery..." type="text" v-model="params.s" />
                </div>
            </div>
            <div class="flex-1 overflow-y-auto no-scrollbar p-6">
                <nav class="space-y-1">
                    <p class="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] mb-3">Categories</p>
                    <NuxtLink
                        class="default flex items-center justify-between group px-3 py-2 text-black font-bold text-xs"
                        :class="params.gallery === '' ? 'bg-primary text-black' : 'text-black/60 hover:text-black hover:bg-black/5 text-xs transition-colors'"
                        :to="'/tm_clicks?gallery='">
                        <span>All</span>
                        <span class="text-[10px] opacity-80">{{ totalImages }}</span>
                    </NuxtLink>
                    <NuxtLink
                        class="default flex items-center justify-between px-3 py-2 text-black/60 hover:text-black hover:bg-black/5 text-xs transition-colors"
                        :class="params.gallery === gallery.id ? 'bg-primary text-black' : 'text-black/60 hover:text-black hover:bg-black/5 text-xs transition-colors'"
                        v-for="gallery of filteredCategories" :key="gallery.id"
                        :to="`/tm_clicks?gallery=${gallery.id}`">
                        <span>{{ gallery.name }}</span>
                        <span class="text-[10px] text-black/30">{{ gallery._count.images }}</span>
                    </NuxtLink>
                </nav>
            </div>
        </aside>
        <div class="flex-1 flex flex-col min-w-0 px-5 py-12 gap-5">
            <PagesDefaultGalleryList />
        </div>
    </div>
</template>

<style>
.collage-span-2-1 {
    grid-column: span 2;
    grid-row: span 1;
}

.collage-span-1-2 {
    grid-column: span 1;
    grid-row: span 2;
}
</style>