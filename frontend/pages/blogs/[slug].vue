<script setup lang="ts">
import { CalendarIcon, UserIcon, ArrowLeftIcon, Share2Icon, TwitterIcon, FacebookIcon, LinkedinIcon, TagIcon } from 'lucide-vue-next'
import { useBlogStore } from '~/store/blog'
import { showImage } from '~/lib/filters'

const route = useRoute()
const { getPublicPostBySlug } = useBlogStore()
const post = ref<any>(null)
const isLoading = ref(true)

const init = async () => {
    isLoading.value = true
    try {
        const data = await getPublicPostBySlug(route.params.slug as string)
        post.value = data

        if (data) {
            // Set dynamic SEO meta
            useSeoMeta({
                title: data.seo?.meta_title || data.title,
                description: data.seo?.meta_description || data.excerpt,
                ogTitle: data.seo?.og_title || data.seo?.meta_title || data.title,
                ogDescription: data.seo?.og_description || data.seo?.meta_description || data.excerpt,
                ogImage: data.seo?.og_image ? showImage(data.seo.og_image.file_name) : (data.featured_image ? showImage(data.featured_image.file_name) : undefined),
                twitterCard: 'summary_large_image',
                keywords: data.seo?.meta_keywords,
            })

            if (data.seo?.canonical_url) {
                useHead({
                    link: [
                        { rel: 'canonical', href: data.seo.canonical_url }
                    ]
                })
            }
        }
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
                        Back to Dispatch
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
            <div class="max-w-6xl mx-auto px-4 mb-16">
                <div
                    class="aspect-video lg:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
                    <img :src="post.featured_image ? showImage(post.featured_image.file_name) : 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80'"
                        :alt="post.title" class="w-full h-full object-cover" />
                </div>
            </div>

            <!-- Content Area -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16">
                <!-- Sidebar Left: Social Share -->
                <div class="hidden lg:block w-20 sticky top-32 h-fit">
                    <div class="flex flex-col gap-4 items-center">
                        <span class="text-[10px] font-black uppercase tracking-tighter text-slate-400 mb-2">Share</span>
                        <Button size="icon" modifier="outline"
                            class="rounded-full hover:bg-sky-50 hover:text-sky-500 border-slate-200 dark:border-slate-800">
                            <TwitterIcon class="w-4 h-4" />
                        </Button>
                        <Button size="icon" modifier="outline"
                            class="rounded-full hover:bg-blue-50 hover:text-blue-600 border-slate-200 dark:border-slate-800">
                            <FacebookIcon class="w-4 h-4" />
                        </Button>
                        <Button size="icon" modifier="outline"
                            class="rounded-full hover:bg-indigo-50 hover:text-indigo-600 border-slate-200 dark:border-slate-800">
                            <LinkedinIcon class="w-4 h-4" />
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

                    <div class="space-y-6">
                        <h4 class="font-display font-bold text-xl px-2">Trailmandu Vision</h4>
                        <div class="bg-primary/5 p-8 rounded-[2rem] border border-primary/10">
                            <p class="text-sm text-primary/80 leading-relaxed italic">
                                "Our mission is to bring the wild beauty of Nepal's trails to the world, foster a
                                community of conscious runners, and protect the mountains we call home."
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>

        <div v-else class="pt-48 text-center pb-48">
            <h2 class="text-3xl font-black mb-4">Post Not Found</h2>
            <p class="text-slate-500 mb-8">The story you're looking for has moved to higher altitudes.</p>
            <Button as-child>
                <NuxtLink to="/blogs">Back to Dispatch</NuxtLink>
            </Button>
        </div>
    </div>
</template>