<script setup lang="ts">
import { CalendarDaysIcon, MountainIcon, PhoneIcon } from 'lucide-vue-next'
import { showImage } from '~/lib/filters'
import type { Trek } from '~/lib/types'

interface FastpackingCardProps {
    item: Trek
}

const props = defineProps<FastpackingCardProps>()

const tagMapping: Record<string, string> = {
    'featured': 'bg-primary',
    'Optimized Acclimatization': 'bg-blue-600',
    'limited slots': 'bg-slate-800',
    'cultural immersion': 'bg-orange-700',
    'off-beat': 'bg-green-600',
    'samll group': 'bg-yellow-600',
    'easy access': 'bg-indigo-600',
    'short trail': 'bg-primary'
}

const startingPrice = computed(() => {
    if (props.item.details?.pricing?.length > 0) {
        return Math.min(...props.item.details.pricing.map((p: any) => p.price))
    }
    return Number(props.item.price) || 0
})

const duration = computed(() => {
    return props.item.details?.itinerary?.length || 0
})
</script>

<template>
    <div
        class="group relative flex flex-col bg-slate-100 dark:bg-[#271f1c] rounded-xl overflow-hidden border border-slate-200 dark:border-border-dark hover:border-primary/50 transition-all duration-300">
        <div class="relative aspect-[4/3] overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10">
            </div>
            <img :alt="item.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                :src="showImage(item.thumbnail?.file_name)" v-if="item.thumbnail" />
            <div class="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                <span
                    class="text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm w-fit"
                    v-for="tag in item.tags" :class="tagMapping[tag.name] || 'bg-slate-800'">{{ tag.name }}</span>
            </div>
            <div
                class="absolute top-3 right-3 z-20 bg-primary px-2.5 py-1 rounded-lg text-white font-bold text-sm shadow-lg">
                {{ startingPrice > 0 ? `$${startingPrice.toLocaleString()}+` : 'Call for Price' }}
            </div>
            <div class="absolute bottom-4 left-4 right-4 z-20">
                <h3 class="text-xl font-extrabold text-white tracking-tight leading-tight mb-2">
                    {{ item.name }}
                </h3>
                <div class="flex flex-wrap gap-2">
                    <div v-if="item.details?.stats?.maxElevation"
                        class="flex items-center gap-1 text-white/90 text-[10px] font-medium bg-black/40 backdrop-blur-md px-2 py-1 rounded-md">
                        <MountainIcon class="size-3" />
                        {{ item.details.stats.maxElevation }}
                    </div>
                    <div v-if="duration > 0"
                        class="flex items-center gap-1 text-white/90 text-[10px] font-medium bg-black/40 backdrop-blur-md px-2 py-1 rounded-md">
                        <CalendarDaysIcon class="size-3" />
                        {{ duration }} {{ duration === 1 ? 'Day' : 'Days' }}
                    </div>
                </div>
            </div>
        </div>
        <div class="p-5 flex flex-col grow">
            <p
                class="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 transition-all duration-300 mb-4">
                {{ item.excerpt }}
            </p>
            <div class="flex gap-2 mt-auto">
                <Button as-child modifier="outline">
                    <NuxtLink :to="`/fastpacking-trek/${item.slug}`">
                        Details
                    </NuxtLink>
                </Button>
                <Button class="flex-[1.5]">
                    <PhoneIcon class="size-4" />
                    Book Call
                </Button>
            </div>
        </div>
    </div>
</template>