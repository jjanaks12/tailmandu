<script setup lang="ts">
import { CalendarDaysIcon, MountainIcon } from 'lucide-vue-next';
import type { Item } from '~/pages/fastpacking-trek.vue'

interface FastpackingCardProps {
    item: Item
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
</script>

<template>
    <div
        class="group relative flex flex-col bg-slate-100 dark:bg-[#271f1c] rounded-xl overflow-hidden border border-slate-200 dark:border-border-dark hover:border-primary/50 transition-all duration-300">
        <div class="relative aspect-[4/3] overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10">
            </div>
            <img alt="Everest Base Camp"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa_hoQvSfWc5v2yy6vUA4_T_mZ63I5ZRZ3ax7IF0LsjtWhONFpuw42Q1JaqJaGdL1ZZCJckJKxLiRFJB4AvR0HDufDvpnWdQsxfIk-cT7Ftf0zGCu6QIJErsr2N15EU23rR7aLuCBKsqpuJsYOQe7kT2l8QxrFS3nSONZWROcScfzg9cS_RcG9qsAZiEHItzJ8agybRLfRar23f8sY3rDKGW9u2q39cQmJsS46tNYRfx4kSG-zrJUVUI7E1tbpEIxCCW34bMl7Ee0" />
            <div class="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                <span
                    class="text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm w-fit"
                    v-for="tag in item.tags" :class="tagMapping[tag]">{{ tag }}</span>
            </div>
            <div
                class="absolute top-3 right-3 z-20 bg-primary px-2.5 py-1 rounded-lg text-white font-bold text-sm shadow-lg">
                $2,450
            </div>
            <div class="absolute bottom-4 left-4 right-4 z-20">
                <h3 class="text-xl font-extrabold text-white tracking-tight leading-tight mb-2">Everest
                    Base Camp</h3>
                <div class="flex flex-wrap gap-2">
                    <div
                        class="flex items-center gap-1 text-white/90 text-[10px] font-medium bg-black/40 backdrop-blur-md px-2 py-1 rounded-md">
                        <MountainIcon class="size-3" />
                        {{ $n(item.elevation, 'meter') }}
                    </div>
                    <div
                        class="flex items-center gap-1 text-white/90 text-[10px] font-medium bg-black/40 backdrop-blur-md px-2 py-1 rounded-md">
                        <CalendarDaysIcon class="size-3" />
                        {{ $n(item.duration, 'day') }}
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
                <button
                    class="flex-1 border border-slate-300 dark:border-slate-700 hover:border-primary hover:text-primary transition-all text-xs font-bold py-2 rounded-lg">
                    Details
                </button>
                <button
                    class="flex-[1.5] bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-1.5 transition-all">
                    <span class="material-symbols-outlined text-sm">call</span> Book Call
                </button>
            </div>
        </div>
    </div>
</template>