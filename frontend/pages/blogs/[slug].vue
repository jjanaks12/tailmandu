<script setup lang="ts">
import { CalendarIcon, UserIcon, ArrowLeftIcon, ArrowRightIcon, Share2Icon, TwitterIcon, FacebookIcon, LinkedinIcon, TagIcon } from 'lucide-vue-next'
import { useBlogStore } from '~/store/blog'
import { showImage } from '~/lib/filters'
import CommentSection from '~/components/pages/blogs/CommentSection.vue'

const route = useRoute()
const { getPublicPostBySlug } = useBlogStore()
const post = ref<any>(null)
const isLoading = ref(true)

useHead(() => {
    if (!post.value) return {}

    const title = post.value.seo?.meta_title || post.value.title
    const description = post.value.seo?.meta_description || post.value.excerpt
    const canonical = post.value.seo?.canonical_url || `https://trailmandu.com/blogs/${post.value.slug}`
    const image = post.value.seo?.og_image
        ? showImage(post.value.seo.og_image.file_name)
        : (post.value.featured_image ? showImage(post.value.featured_image.file_name) : 'https://trailmandu.com/logo.png')

    return {
        title,
        link: [
            { rel: 'canonical', href: canonical }
        ],
        meta: [
            { name: 'description', content: description },
            { name: 'keywords', content: post.value.seo?.meta_keywords || '' },
            { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
            // Open Graph
            { property: 'og:title', content: post.value.seo?.og_title || title },
            { property: 'og:description', content: post.value.seo?.og_description || description },
            { property: 'og:image', content: image },
            { property: 'og:url', content: canonical },
            { property: 'og:type', content: 'article' },
            // Twitter
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: post.value.seo?.og_title || title },
            { name: 'twitter:description', content: post.value.seo?.og_description || description },
            { name: 'twitter:image', content: image }
        ],
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    '@id': `${canonical}#blogposting`,
                    'mainEntityOfPage': canonical,
                    'headline': post.value.title,
                    'description': description,
                    'image': image,
                    'datePublished': post.value.published_at || post.value.created_at,
                    'dateModified': post.value.updated_at || post.value.published_at || post.value.created_at,
                    'author': {
                        '@type': 'Person',
                        'name': post.value.author?.personal?.first_name 
                            ? `${post.value.author.personal.first_name} ${post.value.author.personal.last_name || ''}`.trim()
                            : 'Trailmandu Team'
                    },
                    'publisher': {
                        '@type': 'SportsOrganization',
                        '@id': 'https://trailmandu.com/#organization',
                        'name': 'Trailmandu',
                        'logo': {
                            '@type': 'ImageObject',
                            'url': 'https://trailmandu.com/logo.png'
                        }
                    }
                })
            } as any
        ]
    }
})

const init = async () => {
    isLoading.value = true
    try {
        const data = await getPublicPostBySlug(route.params.slug as string)
        post.value = data
    } catch (e) {
        console.error(e)
    } finally {
        isLoading.value = false
    }
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const socialLinks = [
    {
        platform: 'facebook',
        icon: FacebookIcon,
        hoverClass: 'hover:bg-blue-50 hover:text-blue-600',
        getShareUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${url}`
    },
    {
        platform: 'linkedin',
        icon: LinkedinIcon,
        hoverClass: 'hover:bg-indigo-50 hover:text-indigo-600',
        getShareUrl: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    }
]

const shareOnSocial = (link: typeof socialLinks[0]) => {
    if (typeof window === 'undefined') return
    const url = encodeURIComponent(window.location.href)
    const shareUrl = link.getShareUrl(url)

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400')
    }
}

onMounted(init)
</script>

<template>
    <div class="bg-background-light dark:bg-background-dark min-h-screen">
        <div v-if="isLoading" class="pt-32 pb-24 max-w-4xl mx-auto px-4">
            <div class="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4 mb-6 animate-pulse"></div>
            <div class="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/4 mb-12 animate-pulse"></div>
            <div class="aspect-video bg-slate-200 dark:bg-slate-800 rounded-[2.5rem] mb-12 animate-pulse"></div>
            <div class="space-y-4">
                <div v-for="i in 10" :key="i" class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full animate-pulse">
                </div>
            </div>
        </div>

        <div v-else-if="post" class="pb-24">
            <!-- Hero Header -->
            <header class="relative pt-32 pb-16 overflow-hidden text-center">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <NuxtLink to="/blogs"
                        class="inline-flex items-center gap-2 text-slate-400 hover:text-primary mb-8 transition-colors group">
                        <ArrowLeftIcon class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        {{ $t('public_blogs.back_to_blogs') }}
                    </NuxtLink>

                    <div v-if="post.category" class="mb-6">
                        <Badge
                            class="bg-primary/10 text-primary border-none font-black uppercase tracking-widest px-4 py-1.5">
                            {{ post.category.name }}
                        </Badge>
                    </div>

                    <h1 class="text-4xl md:text-6xl font-display font-black tracking-tight mb-8 leading-tight">
                        {{ post.title }}
                    </h1>

                    <div
                        class="flex items-center justify-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-400">
                        <div class="flex items-center gap-2">
                            <CalendarIcon class="w-4 h-4" />
                            {{ formatDate(post.published_at || post.created_at) }}
                        </div>
                        <div class="flex items-center gap-2">
                            <UserIcon class="w-4 h-4" />
                            {{ post.author?.personal?.first_name || 'Admin' }}
                        </div>
                    </div>
                </div>
            </header>

            <!-- Featured Image -->
            <div class="max-w-6xl mx-auto px-4 mb-16" v-if="post.featured_image">
                <figure
                    class="aspect-video lg:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
                    <img :src="showImage(post.featured_image.file_name)" :alt="post.title"
                        class="w-full h-full object-cover" />
                </figure>
            </div>

            <!-- Content Area -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16 text-gray-800">
                <!-- Sidebar Left: Social Share -->
                <div class="hidden lg:block w-20 sticky top-32 h-fit">
                    <div class="flex flex-col gap-4 items-center">
                        <span class="text-[10px] font-black uppercase tracking-tighter text-slate-400 mb-2">{{ $t('public_blogs.share') }}</span>
                        <Button v-for="link in socialLinks" :key="link.platform" size="icon" modifier="outline"
                            @click="shareOnSocial(link)"
                            :class="['rounded-full border-slate-200 dark:border-slate-800 transition-colors', link.hoverClass]">
                            <component :is="link.icon" class="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <!-- Main Article -->
                <article class="flex-1 max-w-4xl">
                    <div class="content_editor">
                        <div v-html="post.content"></div>
                    </div>

                    <!-- Tags -->
                    <div v-if="post.tags && post.tags.length > 0"
                        class="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <div class="flex flex-wrap gap-3">
                            <span v-for="tag in post.tags" :key="tag.id"
                                class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-600 dark:text-slate-400">
                                <TagIcon class="w-3 h-3" />
                                {{ tag.name }}
                            </span>
                        </div>
                    </div>

                    <!-- Prev / Next Navigation -->
                    <div v-if="post.prev || post.next" class="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center gap-4">
                        <NuxtLink v-if="post.prev" :to="`/blogs/${post.prev.slug}`" class="group flex flex-col items-start text-left flex-1 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-4 rounded-2xl transition-colors">
                            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                <ArrowLeftIcon class="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                                {{ $t('public_blogs.previous_post') }}
                            </span>
                            <span class="font-display font-bold text-lg leading-tight line-clamp-2 text-primary">{{ post.prev.title }}</span>
                        </NuxtLink>
                        <div v-else class="flex-1"></div>

                        <NuxtLink v-if="post.next" :to="`/blogs/${post.next.slug}`" class="group flex flex-col items-end text-right flex-1 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-4 rounded-2xl transition-colors">
                            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                {{ $t('public_blogs.next_post') }}
                                <ArrowRightIcon class="w-3 h-3 transition-transform group-hover:translate-x-1" />
                            </span>
                            <span class="font-display font-bold text-lg leading-tight line-clamp-2 text-primary">{{ post.next.title }}</span>
                        </NuxtLink>
                        <div v-else class="flex-1"></div>
                    </div>

                    <!-- Recommended Blogs -->
                    <div v-if="post.recommended && post.recommended.length > 0" class="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <h3 class="font-display font-bold text-2xl mb-8">{{ $t('public_blogs.recommended_reading') }}</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <NuxtLink v-for="rec in post.recommended" :key="rec.id" :to="`/blogs/${rec.slug}`" class="group block">
                                <div class="aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 relative">
                                    <img v-if="rec.featured_image" :src="showImage(rec.featured_image.file_name)" :alt="rec.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div class="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
                                </div>
                                <h4 class="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-2">{{ rec.title }}</h4>
                                <p v-if="rec.excerpt" class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{{ rec.excerpt }}</p>
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Reviews & Comments -->
                    <CommentSection :slug="post.slug" />
                </article>

                <!-- Sidebar Right: Author / Related -->
                <aside class="lg:w-80 space-y-12">
                    <!-- <div
                        class="bg-white dark:bg-deep-slate p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl">
                        <h4 class="font-display font-bold text-xl mb-6">About the Author</h4>
                        <div class="flex flex-col items-center text-center">
                            <div
                                class="w-24 h-24 rounded-full bg-primary/10 mb-4 overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg">
                                <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Author" />
                            </div>
                            <h5 class="font-bold text-lg mb-2">{{ post.author?.personal?.first_name || 'Trailmandu Team'
                                }}</h5>
                            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                Passionate mountain runners exploring the limits of human endurance in the Himalayas.
                            </p>
                        </div>
                    </div> -->

                    <!-- Recent Posts Sidebar -->
                    <div v-if="post.recent && post.recent.length > 0" class="space-y-6">
                        <h4 class="font-display font-bold text-xl px-2">{{ $t('public_blogs.recent_posts') }}</h4>
                        <div class="flex flex-col gap-6 p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                            <NuxtLink v-for="recent in post.recent" :key="recent.id" :to="`/blogs/${recent.slug}`" class="group flex gap-4 items-start">
                                <div class="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    <img v-if="recent.featured_image" :src="showImage(recent.featured_image.file_name)" :alt="recent.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div>
                                    <h5 class="font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">{{ recent.title }}</h5>
                                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">{{ formatDate(recent.published_at || recent.created_at) }}</p>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <h4 class="font-display font-bold text-xl px-2">{{ $t('public_blogs.vision_title') }}</h4>
                        <div class="bg-primary/5 p-8 rounded-[2rem] border border-primary/10">
                            <p class="text-sm text-primary/80 leading-relaxed italic">
                                {{ $t('public_blogs.vision_desc') }}
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>

        <div v-else class="pt-48 text-center pb-48">
            <h2 class="text-3xl font-black mb-4">{{ $t('public_blogs.post_not_found') }}</h2>
            <p class="text-slate-500 mb-8">{{ $t('public_blogs.post_not_found_desc') }}</p>
            <Button as-child>
                <NuxtLink to="/blogs">{{ $t('public_blogs.back_to_blogs') }}</NuxtLink>
            </Button>
        </div>
    </div>
</template>