<script setup lang="ts">
import { CalendarIcon, Share2Icon, TwitterIcon, FacebookIcon, LinkedinIcon, ArrowLeftIcon } from 'lucide-vue-next'
import { usePageStore } from '~/store/page'
import { useAuthStore } from '~/store/auth'
import { storeToRefs } from 'pinia'
import { showImage } from '~/lib/filters'

const route = useRoute()
const { getPublicPageBySlug, getPage } = usePageStore()
const { isLoggedin } = storeToRefs(useAuthStore())
const page = ref<any>(null)
const isLoading = ref(true)

const init = async () => {
    isLoading.value = true
    try {
        let data;
        if (route.query.preview === 'true' && route.query.id && isLoggedin.value) {
            data = await getPage(route.query.id as string)
        } else {
            data = await getPublicPageBySlug(route.params.slug as string)
        }
        page.value = data
    } catch (e) {
        console.error(e)
    } finally {
        isLoading.value = false
    }
}

useHead(() => {
    const data = page.value
    if (!data) {
        return {
            title: 'Loading Page | Trailmandu'
        }
    }

    const title = data.seo?.meta_title || data.title || 'Info | Trailmandu'
    const description = data.seo?.meta_description || data.description || 'Information and details from Trailmandu.'
    const canonical = `https://trailmandu.com/info/${route.params.slug}`
    const image = data.seo?.og_image
        ? showImage(data.seo.og_image.file_name)
        : (data.featured_image ? showImage(data.featured_image.file_name) : 'https://trailmandu.com/logo.png')

    return {
        title,
        link: [
            { rel: 'canonical', href: canonical }
        ],
        meta: [
            { name: 'description', content: description },
            { name: 'keywords', content: data.seo?.meta_keywords || 'trailmandu, running, nepal, info' },
            { name: 'robots', content: 'index, follow' },
            // Open Graph
            { property: 'og:title', content: data.seo?.og_title || title },
            { property: 'og:description', content: data.seo?.og_description || description },
            { property: 'og:image', content: image },
            { property: 'og:url', content: canonical },
            { property: 'og:type', content: 'website' },
            // Twitter
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: data.seo?.og_title || title },
            { name: 'twitter:description', content: data.seo?.og_description || description },
            { name: 'twitter:image', content: image }
        ],
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    '@id': `${canonical}#webpage`,
                    'name': title,
                    'description': description,
                    'url': canonical,
                    'image': image,
                    'dateModified': data.updated_at,
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
            }
        ]
    }
})

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

        <div v-else-if="page" class="pb-24">
            <!-- Hero Header -->
            <header class="relative pt-32 pb-16 overflow-hidden text-center">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 class="text-4xl md:text-6xl font-display font-black tracking-tight mb-8 leading-tight">
                        {{ page.title }}
                    </h1>

                    <div class="flex items-center justify-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-400">
                        <div class="flex items-center gap-2">
                            <CalendarIcon class="w-4 h-4" />
                            Last updated: {{ formatDate(page.updated_at) }}
                        </div>
                    </div>
                </div>
            </header>

            <!-- Featured Image -->
            <div class="max-w-6xl mx-auto px-4 mb-16" v-if="page.featured_image">
                <figure class="aspect-video lg:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
                    <img :src="showImage(page.featured_image.file_name)" :alt="page.title" class="w-full h-full object-cover" />
                </figure>
            </div>

            <!-- Content Area -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16 justify-center">
                <!-- Main Article -->
                <article class="flex-1 max-w-4xl">
                    <div class="content_editor">
                        <div v-html="page.body"></div>
                    </div>
                </article>
            </div>
        </div>

        <div v-else class="pt-48 text-center pb-48">
            <h2 class="text-3xl font-black mb-4">Page Not Found</h2>
            <p class="text-slate-500 mb-8">The page you're looking for does not exist or has been removed.</p>
            <Button as-child>
                <NuxtLink to="/">Back to Home</NuxtLink>
            </Button>
        </div>
    </div>
</template>