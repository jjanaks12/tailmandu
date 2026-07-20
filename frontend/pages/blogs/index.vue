<script setup lang="ts">
import { SlidersHorizontalIcon, ChevronRightIcon } from 'lucide-vue-next'
import { showImage } from '~/lib/filters'
import { useBlogStore } from '~/store/blog'

const { t } = useI18n()

const { fetchPublicPosts, fetchCategories } = useBlogStore()
const { posts, categories, isLoading } = storeToRefs(useBlogStore())

useHead(() => {
    const title = t('public_blogs.seo_title') || 'Trailmandu Blogs & Stories'
    const description = t('public_blogs.seo_description') || 'Read the latest updates, guides, and stories about trail running, skyrunning, and fastpacking in Nepal.'
    const canonical = 'https://trailmandu.com/blogs'
    const logoUrl = 'https://trailmandu.com/logo.png'

    return {
        title,
        link: [
            { rel: 'canonical', href: canonical }
        ],
        meta: [
            { name: 'description', content: description },
            { name: 'keywords', content: 'trail running nepal, skyrunning nepal, fastpacking, running blogs, himalayas running' },
            { name: 'robots', content: 'index, follow' },
            // Open Graph
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:image', content: logoUrl },
            { property: 'og:url', content: canonical },
            { property: 'og:type', content: 'website' },
            // Twitter
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: logoUrl }
        ],
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Blog',
                    '@id': `${canonical}/#blog`,
                    'name': title,
                    'description': description,
                    'url': canonical,
                    'publisher': {
                        '@type': 'SportsOrganization',
                        '@id': 'https://trailmandu.com/#organization',
                        'name': 'Trailmandu',
                        'logo': {
                            '@type': 'ImageObject',
                            'url': logoUrl
                        }
                    },
                    'blogPost': posts.value.map(post => ({
                        '@type': 'BlogPosting',
                        '@id': `https://trailmandu.com/blogs/${post.slug}#blogposting`,
                        'headline': post.title,
                        'description': post.excerpt || '',
                        'url': `https://trailmandu.com/blogs/${post.slug}`,
                        'image': post.featured_image ? showImage(post.featured_image.file_name) : logoUrl,
                        'datePublished': post.published_at || post.created_at
                    }))
                })
            } as any
        ]
    }
})

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
                    {{ $t('public_blogs.badge_stories') }}
                </Badge>
                <h1 class="text-5xl md:text-7xl font-display font-black tracking-tight mb-6">
                    {{ $t('public_blogs.hero_title') }} <span class="text-primary">{{ $t('public_blogs.hero_highlight') }}</span>
                </h1>
                <p class="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    {{ $t('public_blogs.hero_desc') }}
                </p>
            </div>
        </section>

        <!-- Categories & Filter -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 mb-16">
            <div class="flex flex-wrap items-center justify-center gap-3">
                <Button @click="filterByCategory(null)" :modifier="!selectedCategory ? 'default' : 'outline'">
                    {{ $t('public_blogs.all_stories') }}
                </Button>
                <Button v-for="category in categories" :key="category.id" @click="filterByCategory(category.slug)"
                    :modifier="selectedCategory === category.slug ? 'default' : 'outline'">
                    {{ category.name }}
                </Button>
            </div>
        </div>

        <!-- Featured Post -->
        <section v-if="featuredPost && !selectedCategory" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div
                class="group relative bg-white dark:bg-deep-slate rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row min-h-[500px]">
                <figure v-if="featuredPost.featured_image" class="lg:w-1/2 relative overflow-hidden">
                    <img :src="showImage(featuredPost.featured_image.file_name)" loading="eager"
                        class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                </figure>
                <div class="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
                    <Badge
                        class="w-fit mb-6 bg-amber-400 text-amber-950 font-black px-4 py-1.5 uppercase tracking-tighter">
                        {{ $t('public_blogs.must_read') }}
                    </Badge>
                    <h2
                        class="text-4xl md:text-5xl font-display font-black mb-6 leading-tight group-hover:text-primary transition-colors">
                        {{ featuredPost.title }}
                    </h2>
                    <p class="text-lg text-slate-500 dark:text-slate-400 mb-10 line-clamp-4 leading-relaxed">
                        {{ featuredPost.excerpt || $t('public_blogs.explore_featured') }}
                    </p>
                    <NuxtLink :to="`/blogs/${featuredPost.slug}`"
                        class="flex items-center gap-3 text-primary font-black text-xl hover:gap-5 transition-all w-fit group/link">
                        {{ $t('public_blogs.read_full_story') }}
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
                    <h3 class="text-2xl font-bold mb-2">{{ $t('public_blogs.no_stories') }}</h3>
                    <p class="text-slate-500">{{ $t('public_blogs.no_stories_desc') }}</p>
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <BlogCard v-for="post in (selectedCategory ? posts : remainingPosts)" :key="post.id" :post="post" />
                </div>
            </template>
        </section>
    </div>
</template>
