<script setup lang="ts">
import { CalendarIcon, UserIcon, ArrowRightIcon } from 'lucide-vue-next'
import type { BlogPost } from '~/lib/types'
import { showImage } from '~/lib/filters'

defineProps<{
    post: BlogPost
}>()

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
</script>

<template>
    <div
        class="group bg-white dark:bg-deep-slate rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800 flex flex-col h-full">
        <!-- Image Container -->
        <figure class="relative aspect-[16/9] overflow-hidden">
            <img v-if="post.featured_image" :src="showImage(post.featured_image.file_name)" :alt="post.title"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            </div>

            <!-- Category Badge -->
            <div v-if="post.category" class="absolute top-4 left-4">
                <Badge class="bg-primary hover:bg-primary/90 text-white border-none shadow-lg">
                    {{ post.category.name }}
                </Badge>
            </div>

            <!-- Featured Badge -->
            <div v-if="post.is_featured" class="absolute top-4 right-4">
                <Badge variant="secondary" class="bg-amber-400 text-amber-950 border-none shadow-lg font-bold">
                    Featured
                </Badge>
            </div>
        </figure>

        <!-- Content -->
        <div class="p-8 flex flex-col flex-1">
            <div class="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                <div class="flex items-center gap-1.5">
                    <CalendarIcon class="w-3.5 h-3.5" />
                    {{ formatDate(post.published_at || post.created_at) }}
                </div>
                <div class="flex items-center gap-1.5">
                    <UserIcon class="w-3.5 h-3.5" />
                    {{ post.author?.personal?.first_name || 'Admin' }}
                </div>
            </div>

            <h3 class="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                <NuxtLink :to="`/blogs/${post.slug}`">{{ post.title }}</NuxtLink>
            </h3>

            <p class="text-slate-500 dark:text-slate-400 mb-8 line-clamp-3 leading-relaxed">
                {{ post.excerpt || (post.content?.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...') }}
            </p>

            <div class="mt-auto">
                <NuxtLink :to="`/blogs/${post.slug}`"
                    class="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group/link">
                    Read More
                    <ArrowRightIcon class="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
