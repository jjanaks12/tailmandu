<script setup lang="ts">
import { CalendarIcon, MapPinIcon, UsersIcon, ArrowRightIcon, MountainIcon } from 'lucide-vue-next'
import { showImage } from '~/lib/filters'
import type { TrailRace } from '~/lib/types'

const props = defineProps<{
    race: TrailRace
}>()

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

const isLive = computed(() => {
    const now = new Date()
    const start = new Date(props.race.start)
    const end = new Date(props.race.end)
    return now >= start && now <= end
})

const isUpcoming = computed(() => {
    const now = new Date()
    const start = new Date(props.race.start)
    return now < start
})
</script>

<template>
    <div class="group bg-white dark:bg-deep-slate rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800 flex flex-col h-full">
        <!-- Image Container -->
        <figure class="relative aspect-[16/9] overflow-hidden">
            <img v-if="race.thumbnail" :src="showImage(race.thumbnail.file_name)" :alt="race.name"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div v-else class="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <MountainIcon class="w-12 h-12 text-slate-300 dark:text-slate-700" />
            </div>
            
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            </div>

            <!-- Status Badge -->
            <div class="absolute top-4 left-4">
                <Badge v-if="isLive" class="bg-red-500 text-white border-none shadow-lg animate-pulse">
                    Live Now
                </Badge>
                <Badge v-else-if="isUpcoming" class="bg-primary text-white border-none shadow-lg">
                    Upcoming
                </Badge>
                <Badge v-else class="bg-slate-500 text-white border-none shadow-lg">
                    Completed
                </Badge>
            </div>
        </figure>

        <!-- Content -->
        <div class="p-8 flex flex-col flex-1">
            <div class="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                <div class="flex items-center gap-1.5">
                    <CalendarIcon class="w-3.5 h-3.5 text-primary" />
                    {{ formatDate(race.start) }}
                </div>
                <div class="flex items-center gap-1.5" v-if="race._count?.runners">
                    <UsersIcon class="w-3.5 h-3.5 text-primary" />
                    {{ race._count.runners }} Runners
                </div>
            </div>

            <h3 class="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                <NuxtLink :to="`/races/${race.slug}`">{{ race.name }}</NuxtLink>
            </h3>

            <p class="text-slate-500 dark:text-slate-400 mb-8 line-clamp-3 leading-relaxed">
                {{ race.excerpt || 'Experience the ultimate trail running adventure with Trailmandu...' }}
            </p>

            <div class="mt-auto flex items-center justify-between">
                <NuxtLink :to="`/races/${race.slug}`"
                    class="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group/link">
                    Explore Details
                    <ArrowRightIcon class="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </NuxtLink>
                
                <div v-if="race._count?.stages" class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-tighter text-slate-500">
                    {{ race._count.stages }} Stages
                </div>
            </div>
        </div>
    </div>
</template>
