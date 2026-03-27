<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'
import type { Trek } from '~/lib/types'
import {
    ActivityIcon, BanIcon, BriefcaseMedicalIcon,
    ChartNoAxesCombinedIcon, CircleCheckIcon, ClockIcon,
    DumbbellIcon, StarIcon, TriangleAlertIcon, Loader2Icon,
    CrossIcon
} from 'lucide-vue-next'
import { showImage } from '~/lib/filters'
import { useTrekStore } from '~/store/trek'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useAppStore } from '~/store/app'

const { getTrekBySlug } = useTrekStore()
const route = useRoute()
const { setImageForPreview } = useAppStore()

const securityProtocolIconMapping: Record<string, any> = {
    'First Aid Kit': BriefcaseMedicalIcon,
    'Altitude Awareness': ActivityIcon,
    'Physical Prep': DumbbellIcon,
    'Emergency Evacuation': CrossIcon
}

const trek = ref<Trek | null>(null)
const loading = ref(true)

const init = async () => {
    loading.value = true
    try {
        trek.value = await getTrekBySlug(route.params.id as string)
    } finally {
        loading.value = false
    }
}

const bookingBar = useTemplateRef('booking-bar')
const isBookingBarVisible = useElementVisibility(bookingBar)

const duration = computed(() => {
    return trek.value?.details ? trek.value?.details.itinerary?.length || 0 : 0
})

const startingPrice = computed(() => {
    if (trek.value && trek.value?.details?.pricing?.length > 0) {
        return Math.min(...trek.value.details.pricing.map((p: any) => p.price))
    }
    return Number(trek.value?.price) || 0
})

onMounted(init)
</script>

<template>
    <div v-if="loading"
        class="flex justify-center items-center min-h-[500px] text-xl font-bold uppercase tracking-widest text-[#1A1A1A]">
        <Loader2Icon class="w-8 h-8 animate-spin mr-3 text-primary" />
        Loading Trek...
    </div>
    <template v-else-if="trek">
        <section class="relative w-full overflow-hidden flex flex-col justify-end">
            <div class="inset-0 z-0">
                <div
                    class="absolute inset-0 bg-gradient-to-t from-background-light via-transparent to-transparent z-10">
                </div>
                <img :alt="trek.name" class="w-full h-auto object-cover shadow-2xl"
                    :src="showImage(trek.thumbnail?.file_name)" v-if="trek.thumbnail" />
            </div>
            <div class="pb-[200px] absolute bottom-0 left-0 right-0 text-white z-20 max-w-4xl px-4">
                <span v-for="tag in trek.tags" :key="tag.id"
                    class="inline-block px-2 py-1 border border-primary text-[12px] font-black uppercase tracking-[0.2em] mb-4 mr-2">
                    {{ tag.name }}
                </span>
                <h1 class="text-4xl md:text-6xl lg:text-7xl font-black leading-none uppercase mb-2">
                    {{ trek.name }}
                </h1>
                <p class="text-xl md:text-2xl font-bold tracking-tight">
                    {{ trek.excerpt }}
                </p>
            </div>
        </section>
        <main class="max-w-7xl mx-auto px-6 md:px-10">
            <!-- Hero Section -->
            <!-- Quick Facts Bar -->
            <section class="relative z-30 mb-16">
                <div class="bg-white border border-black/5 p-1 shadow-xl -mt-[50px]">
                    <div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/5">
                        <div class="p-8 space-y-6">
                            <h3
                                class="text-primary text-[14px] font-black uppercase tracking-widest flex items-center gap-2">
                                <ChartNoAxesCombinedIcon />
                                Vital Stats
                            </h3>
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <p class="text-[12px] uppercase text-text-muted font-bold mb-1">Duration</p>
                                    <p class="text-xl font-black">{{ duration }} {{ duration === 1 ? 'Day' : 'Days' }}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-[12px] uppercase text-text-muted font-bold mb-1">Max Altitude</p>
                                    <p class="text-xl font-black">{{ trek.details?.stats?.maxElevation || '---' }}</p>
                                </div>
                                <div>
                                    <p class="text-[12px] uppercase text-text-muted font-bold mb-1">Difficulty</p>
                                    <p class="text-xl font-black capitalize">{{ trek.details?.stats?.grade || 'Moderate'
                                        }}</p>
                                </div>
                                <div>
                                    <p class="text-[12px] uppercase text-text-muted font-bold mb-1">Distance</p>
                                    <p class="text-xl font-black lowercase">{{ trek.details?.stats?.distance || '---' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="p-8 space-y-6 bg-black/[0.01]">
                            <h3
                                class="text-primary text-[14px] font-black uppercase tracking-widest flex items-center gap-2">
                                <StarIcon />
                                Trip Highlights
                            </h3>
                            <ul class="space-y-3">
                                <li v-for="(day, index) in (trek.details?.itinerary as Array<any>)?.slice(0, 3)"
                                    :key="index" class="flex items-center gap-3 text-[14px] font-bold">
                                    <span class="text-primary font-black">
                                        {{ index + 1 < 10 ? `0${index + 1}` : index + 1 }} </span>
                                            {{ day.title }}
                                </li>
                                <li v-if="(trek.details?.itinerary || []).length > 3"
                                    class="text-[12px] text-text-muted font-bold uppercase tracking-widest mt-2 pl-8">
                                    & {{ (trek.details?.itinerary || []).length - 3 }} More Days...
                                </li>
                            </ul>
                        </div>
                        <div class="p-8 flex flex-col justify-center gap-4">
                            <Button as-child size="xl">
                                <NuxtLink :to="`/fastpacking-trek/${trek.slug}/booking`">
                                    Secure Your Spot
                                </NuxtLink>
                            </Button>
                            <!-- <Button variant="dark" modifier="outline" size="xl">Download Brochure</Button> -->
                        </div>
                    </div>
                </div>
            </section>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                <div class="lg:col-span-7 space-y-16">
                    <!-- Trek Overview -->
                    <section id="overview">
                        <h2
                            class="text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4 text-[#1A1A1A]">
                            <span class="w-12 h-1 bg-primary"></span> Trek Overview
                        </h2>
                        <div class="prose max-w-none text-text-muted space-y-6 text-[16px] leading-relaxed">
                            <div v-html="trek.description" class="tiptap-content" />

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                                <div class="bg-primary/[0.08] border-l-4 border-primary p-5"
                                    v-for="(protocol) in trek?.details?.securityProtocols">
                                    <div class="flex items-center gap-2 mb-2">
                                        <component :is="securityProtocolIconMapping[protocol.title]"
                                            class="text-primary" />
                                        <h4 class="text-[14px] font-black uppercase tracking-widest text-[#1A1A1A]">
                                            {{ protocol.title }}
                                        </h4>
                                    </div>
                                    <p class="text-[14px] text-text-muted">{{ protocol.description }}</p>
                                </div>
                            </div>
                            <Swiper :slides-per-view="2" :space-between="10">
                                <SwiperSlide v-for="image in trek.gallery?.images"
                                    @click="setImageForPreview(showImage(image.file_name))">
                                    <img alt="Forest trail"
                                        class="w-full h-48 rounded-sm object-cover border border-black/5"
                                        :src="showImage(image.file_name)" />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </section>
                    <!-- Pricing Section -->
                    <section class="space-y-6" id="pricing">
                        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h2 class="text-3xl font-black uppercase tracking-tighter text-[#1A1A1A]">
                                    Trip packages
                                </h2>
                                <p class="text-text-muted font-bold text-[14px] uppercase tracking-widest mt-1">Starting
                                    from <span class="text-primary">NPR{{ startingPrice }}</span> per person</p>
                            </div>
                        </div>

                        <!-- Pricing Tiers Table -->
                        <div v-if="trek.details?.pricing?.length"
                            class="overflow-hidden border border-black/5 bg-white shadow-sm">
                            <table class="w-full text-left border-collapse">
                                <thead class="bg-black text-white text-[12px] font-black uppercase tracking-widest">
                                    <tr>
                                        <th class="px-6 py-4">Group Size</th>
                                        <th class="px-6 py-4 text-right">Price Per Person</th>
                                    </tr>
                                </thead>
                                <tbody class="text-[14px] font-bold text-[#1A1A1A]">
                                    <tr v-for="(tier, index) in trek.details.pricing" :key="index"
                                        class="border-t border-black/5 hover:bg-primary/5 transition-colors">
                                        <td class="px-6 py-4 flex items-center gap-3">
                                            <div
                                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[12px]">
                                                {{ tier.min }}-{{ tier.max }}
                                            </div>
                                            <span>{{ tier.min }}{{ tier.max ? `-${tier.max}` : '+' }} Persons</span>
                                        </td>
                                        <td class="px-6 py-4 text-right text-primary font-black">
                                            ${{ tier.price }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="space-y-4">
                            <div v-if="trek.details?.included?.length"
                                class="bg-white border border-black/5 p-8 shadow-sm">
                                <h3
                                    class="text-primary text-[14px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <CircleCheckIcon class="text-primary" />
                                    What's Included
                                </h3>
                                <ul
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] font-bold uppercase tracking-tight text-[#1A1A1A]">
                                    <li v-for="(item, index) in trek.details.included" :key="index"
                                        class="flex items-center gap-3">
                                        <span class="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span> {{ item }}
                                    </li>
                                </ul>
                            </div>
                            <div v-if="trek.details?.excluded?.length"
                                class="bg-black/[0.02] border border-black/5 p-8">
                                <h3
                                    class="text-text-muted text-[14px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <BanIcon class="text-text-muted" />
                                    What's Not Included
                                </h3>
                                <ul
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] font-bold uppercase tracking-tight text-text-muted">
                                    <li v-for="(item, index) in trek.details.excluded" :key="index"
                                        class="flex items-center gap-3">
                                        <span class="w-1.5 h-1.5 bg-black/20 rounded-full shrink-0"></span> {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="lg:col-span-5 space-y-8">
                    <div class="sticky top-28 space-y-8">
                        <!-- Detailed Itinerary -->
                        <section v-if="trek.details?.itinerary?.length">
                            <h3 class="text-[14px] font-black uppercase tracking-widest text-primary mb-6">
                                Itinerary Timeline
                            </h3>
                            <div
                                class="max-h-[500px] overflow-y-auto pr-4 border-l-2 border-primary/20 space-y-8 relative">
                                <div v-for="(day, index) in trek.details.itinerary as any[]" :key="index"
                                    class="relative pl-8">
                                    <span :class="[
                                        'absolute left-[-9px] top-0 w-4 h-4 rounded-full',
                                        index === 0 ? 'bg-primary ring-4 ring-primary/20' : 'bg-white border-2 border-primary/50'
                                    ]"></span>
                                    <p class="text-[12px] font-black uppercase text-primary mb-1">
                                        Day {{ index + 1 < 10 ? `0${index + 1}` : index + 1 }} </p>
                                            <h4
                                                class="text-[14px] font-black uppercase tracking-tight mb-2 text-[#1A1A1A]">
                                                {{ day.title }}
                                            </h4>
                                            <p class="text-[14px] text-text-muted leading-relaxed">{{ day.description }}
                                            </p>
                                </div>
                            </div>
                        </section>
                        <!-- Safety & Risk -->
                        <section v-if="trek.details?.securityProtocols?.length" class="space-y-4">
                            <h3 class="text-[14px] font-black uppercase tracking-widest text-primary">Security Protocols
                            </h3>
                            <div v-for="(protocol, index) in trek.details.securityProtocols as any[]" :key="index"
                                class="bg-white border border-black/5 p-6 shadow-sm">
                                <div class="flex items-center gap-3 mb-4">
                                    <component :is="index % 2 === 0 ? TriangleAlertIcon : BriefcaseMedicalIcon"
                                        class="text-primary size-5" />
                                    <h4 class="text-[14px] font-black uppercase tracking-widest text-[#1A1A1A]">
                                        {{ protocol.title }}
                                    </h4>
                                </div>
                                <p class="text-[14px] text-text-muted leading-relaxed">{{ protocol.description }}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <section class="mb-24 py-20 border-t-2 border-primary" ref="booking-bar">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2
                            class="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6 text-[#1A1A1A]">
                            Ready for the {{ trek.name }}?</h2>
                        <p class="text-text-muted text-lg">Join our next fixed departure or customize your private
                            journey
                            today. Expert guides, premium gear, and unforgettable views await.</p>
                    </div>
                    <div class="flex flex-col gap-4">
                        <NuxtLink :to="`/fastpacking-trek/${trek.slug}/booking`"
                            class="bg-primary text-center text-white px-10 py-5 font-black text-[14px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
                            Secure Your Spot
                        </NuxtLink>
                        <button
                            class="border border-black/20 text-[#1A1A1A] px-10 py-5 font-black text-[14px] uppercase tracking-[0.2em] hover:bg-black/5 transition-all">Talk
                            to an Expert</button>
                    </div>
                </div>
            </section>
        </main>
        <div :class="[
            'sticky bottom-0 left-0 w-full bg-white border-t border-black/10 z-[50] transform transition-all duration-500',
            !isBookingBarVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        ]">
            <div class="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
                <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-6">
                    <h3 class="text-[14px] md:text-lg font-black uppercase tracking-tight text-text-main">
                        {{ trek.name }}
                    </h3>
                    <div class="flex items-center gap-2 text-text-muted">
                        <ClockIcon />
                        <span class="text-[12px] md:text-[14px] font-bold uppercase tracking-widest">
                            {{ duration }} {{ duration === 1 ? 'Day' : 'Days' }}
                        </span>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <NuxtLink :to="`/fastpacking-trek/${trek.slug}/booking`"
                        class="bg-primary text-white px-6 md:px-10 py-3 rounded-sm font-black text-[12px] md:text-[14px] uppercase tracking-widest hover:bg-black transition-all shadow-md">
                        Secure Your Spot
                    </NuxtLink>
                </div>
            </div>
        </div>
    </template>
</template>