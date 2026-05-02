<script setup lang="ts">
import { SearchIcon, SlidersHorizontalIcon, ChevronRightIcon } from 'lucide-vue-next'
import { showImage } from '~/lib/filters'
import { useBlogStore } from '~/store/blog'

useSeoMeta({
    title: 'Trailmandu Blog - Himalayan Stories & Trail Insights',
    description: 'Explore deep insights into Nepal\'s trails, ultra-running tips, and stories from the heart of the Himalayas.',
    ogTitle: 'Trailmandu Blog - Stories from the Trail',
    ogDescription: 'Experience the magic of Nepal through our curated trail stories and running guides.',
})

const { fetchPublicPosts, fetchCategories } = useBlogStore()
const { posts, categories, isLoading } = storeToRefs(useBlogStore())

const selectedCategory = ref<string | null>(null)

const filterByCategory = (slug: string | null) => {
    selectedCategory.value = slug
    fetchPublicPosts(slug || undefined)
}

const featuredPost = computed(() => posts.value.find(p => p.is_featured) || posts.value[0])
const remainingPosts = computed(() => posts.value.filter(p => p.id !== featuredPost.value?.id))

onMounted(async () => {
    await Promise.all([
        fetchPublicPosts(),
        fetchCategories()
    ])
})
</script>

<template>
    <div class="bg-background-light dark:bg-background-dark min-h-screen pb-24">
        <!-- Hero Section -->
        <section class="relative pt-32 pb-20 overflow-hidden">
            <div class="absolute inset-0 bg-primary/5 -z-10"></div>
            <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent -z-10">
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Badge variant="outline"
                    class="mb-6 border-primary/20 text-primary font-bold uppercase tracking-widest px-4 py-1">
                    Stories from the heights
                </Badge>
                <h1 class="text-5xl md:text-7xl font-display font-black tracking-tight mb-6">
                    Trailmandu <span class="text-primary">Stories</span>
                </h1>
                <p class="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Gear reviews, race reports, and deep dives into the culture of Himalayan mountain running.
                </p>
            </div>
        </section>

        <!-- Categories & Filter -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 mb-16">
            <div class="flex flex-wrap items-center justify-center gap-3">
                <button @click="filterByCategory(null)" :class="[
                    'px-6 py-2.5 rounded-full text-sm font-bold transition-all border',
                    !selectedCategory ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-deep-slate border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/50'
                ]">
                    All Stories
                </button>
                <button v-for="category in categories" :key="category.id" @click="filterByCategory(category.slug)"
                    :class="[
                        'px-6 py-2.5 rounded-full text-sm font-bold transition-all border',
                        selectedCategory === category.slug ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-deep-slate border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/50'
                    ]">
                    {{ category.name }}
                </button>
            </div>
        </div>

        <!-- Featured Post -->
        <section v-if="featuredPost && !selectedCategory" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div
                class="group relative bg-white dark:bg-deep-slate rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row min-h-[500px]">
                <div class="lg:w-1/2 relative overflow-hidden">
                    <img :src="featuredPost.featured_image ? showImage(featuredPost.featured_image.file_name) : 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80'"
                        class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                </div>
                <div class="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
                    <Badge
                        class="w-fit mb-6 bg-amber-400 text-amber-950 font-black px-4 py-1.5 uppercase tracking-tighter">
                        Must Read
                    </Badge>
                    <h2
                        class="text-4xl md:text-5xl font-display font-black mb-6 leading-tight group-hover:text-primary transition-colors">
                        {{ featuredPost.title }}
                    </h2>
                    <p class="text-lg text-slate-500 dark:text-slate-400 mb-10 line-clamp-4 leading-relaxed">
                        {{ featuredPost.excerpt || 'Explore this featured story from Trailmandu...' }}
                    </p>
                    <NuxtLink :to="`/blogs/${featuredPost.slug}`"
                        class="flex items-center gap-3 text-primary font-black text-xl hover:gap-5 transition-all w-fit group/link">
                        Read the full story
                        <ChevronRightIcon class="w-6 h-6 transition-transform group-hover/link:translate-x-2" />
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Post Grid -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div v-for="i in 6" :key="i"
                    class="bg-slate-200 dark:bg-slate-800 rounded-3xl aspect-[4/5] animate-pulse"></div>
            </div>

            <template v-else>
                <div v-if="posts.length === 0" class="text-center py-24">
                    <div class="mb-6 opacity-20">
                        <SlidersHorizontalIcon class="w-24 h-24 mx-auto" />
                    </div>
                    <h3 class="text-2xl font-bold mb-2">No stories found</h3>
                    <p class="text-slate-500">Try checking back later or exploring another category.</p>
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <BlogCard v-for="post in (selectedCategory ? posts : remainingPosts)" :key="post.id" :post="post" />
                </div>
            </template>
        </section>
    </div>
</template>
