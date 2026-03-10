<script lang="ts" setup>
import { SearchIcon } from 'lucide-vue-next'
import type { Gallery, WithCount } from '~/lib/types'
import { useAxios } from '~/services/axios'

useHead({
    title: 'Gallery'
})

definePageMeta({
    layout: 'simple'
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
    <div class="flex h-screen w-full overflow-hidden">
        <aside class="w-72 flex-shrink-0 bg-gray-900 border-r border-white/10 flex flex-col z-50">
            <div class="p-6 border-b border-white/10">
                <Brand class="mb-8" />
                <div class="relative group">
                    <SearchIcon
                        class="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm group-focus-within:text-accent" />
                    <input
                        class="w-full bg-gray-900 border border-white/10 py-2 pl-9 pr-4 text-xs tracking-tight placeholder:text-white/20 focus:border-accent transition-colors"
                        placeholder="Search gallery..." type="text" v-model="params.s" />
                </div>
            </div>
            <div class="flex-1 overflow-y-auto no-scrollbar p-6">
                <nav class="space-y-1">
                    <p class="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-3">Categories</p>
                    <NuxtLink
                        class="default flex items-center justify-between group px-3 py-2 text-white font-bold text-xs"
                        :class="params.gallery === '' ? 'bg-primary text-white' : 'text-white/60 hover:text-white hover:bg-white/5 text-xs transition-colors'"
                        :to="'/tm_clicks?gallery='">
                        <span>All</span>
                        <span class="text-[10px] opacity-80">{{ totalImages }}</span>
                    </NuxtLink>
                    <NuxtLink
                        class="default flex items-center justify-between px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 text-xs transition-colors"
                        :class="params.gallery === gallery.id ? 'bg-primary text-white' : 'text-white/60 hover:text-white hover:bg-white/5 text-xs transition-colors'"
                        v-for="gallery of filteredCategories" :key="gallery.id"
                        :to="`/tm_clicks?gallery=${gallery.id}`">
                        <span>{{ gallery.name }}</span>
                        <span class="text-[10px] text-white/30">{{ gallery._count.images }}</span>
                    </NuxtLink>
                </nav>
            </div>
            <div class="p-6 bg-gray-900 text-[9px] text-white/30 uppercase tracking-tighter">
                © 2024 TRAILMANDU DATA CENTER
            </div>
        </aside>
        <div class="flex-1 flex flex-col min-w-0">
            <header class="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-gray-900">
                <div class="flex items-center gap-4">
                    <h1 class="text-xs font-black uppercase tracking-[0.3em] text-white">Gallery
                    </h1>
                </div>
                <div class="flex items-center gap-6">
                    <div class="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
                        <a class="hover:text-accent" href="#">Home</a>
                        <a class="hover:text-accent" href="#">Races</a>
                        <a class="text-accent underline underline-offset-4" href="#">Gallery</a>
                        <a class="hover:text-accent" href="#">About</a>
                    </div>
                </div>
            </header>
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