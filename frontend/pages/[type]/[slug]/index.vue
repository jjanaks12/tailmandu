<script setup lang="ts">
import { useElementVisibility, useWindowScroll } from '@vueuse/core'
import type { Trek } from '~/lib/types'
import {
    ActivityIcon, BanIcon, BriefcaseMedicalIcon, ChartNoAxesCombinedIcon, CircleCheckIcon, ClockIcon, DumbbellIcon, StarIcon, Loader2Icon,
    CrossIcon,
    ArrowLeftIcon,
    ArrowRightIcon
} from 'lucide-vue-next'
import { showImage } from '~/lib/filters'
import { useTrekStore } from '~/store/trek'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useAppStore } from '~/store/app'
import { Autoplay, Navigation } from 'swiper/modules'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'

const trekStore = useTrekStore()
const { getTrekBySlug } = trekStore
const { treks } = storeToRefs(trekStore)
const route = useRoute()
const { setImageForPreview } = useAppStore()
const { isLoggedin } = storeToRefs(useAuthStore())

definePageMeta({
    validate: async (route) => {
        return ['treks', 'fastpacking'].includes(route.params.type as string)
    }
})

const type = computed(() => route.params.type as string)

const securityProtocolIconMapping: Record<string, any> = {
    'First Aid Kit': BriefcaseMedicalIcon,
    'Altitude Awareness': ActivityIcon,
    'Physical Prep': DumbbellIcon,
    'Emergency Evacuation': CrossIcon
}

const trek = ref<Trek | null>(null)
const loading = ref(true)

const activeDayKey = ref('item-0')
const activeDayIndex = computed(() => {
    if (!activeDayKey.value) return null
    const parts = activeDayKey.value.split('-')
    return parts.length > 1 ? Number(parts[1]) : null
})

const hasLocations = computed(() => {
    return trek.value?.details?.itinerary?.some((day: any) => day.places && day.places.length > 0) || false
})

const itineraryMapRef = ref<any>(null)
const focusOnPlace = (place: any) => {
    if (itineraryMapRef.value) {
        itineraryMapRef.value.focusOnPlace(place)
    }
}

useHead(() => {
    if (!trek.value) return { title: 'Loading Adventure...' }

    const currentTitle = `${trek.value.name} | Trailmandu`
    const currentDescription = trek.value.excerpt || 'Embark on premium Himalayan treks and fastpacking expeditions with Trailmandu.'
    const canonical = `https://trailmandu.com/${type.value}/${trek.value.slug}`
    const image = trek.value.thumbnail?.file_name
        ? showImage(trek.value.thumbnail.file_name)
        : 'https://trailmandu.com/logo.png'

    return {
        title: currentTitle,
        link: [
            { rel: 'canonical', href: canonical }
        ],
        meta: [
            { name: 'description', content: currentDescription },
            { name: 'keywords', content: `${trek.value.name}, ${type.value} nepal, trekking in nepal, fastpacking route, hike, himalayas` },
            { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
            // Open Graph
            { property: 'og:title', content: currentTitle },
            { property: 'og:description', content: currentDescription },
            { property: 'og:image', content: image },
            { property: 'og:url', content: canonical },
            { property: 'og:type', content: 'website' },
            // Twitter
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: currentTitle },
            { name: 'twitter:description', content: currentDescription },
            { name: 'twitter:image', content: image }
        ],
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'TouristTrip',
                    '@id': `${canonical}#trip`,
                    'name': trek.value.name,
                    'description': currentDescription,
                    'image': image,
                    'touristType': type.value === 'treks' ? 'Trekker' : 'Fastpacker',
                    'provider': {
                        '@type': 'SportsOrganization',
                        '@id': 'https://trailmandu.com/#organization',
                        'name': 'Trailmandu',
                        'logo': {
                            '@type': 'ImageObject',
                            'url': 'https://trailmandu.com/logo.png'
                        }
                    },
                    'offers': {
                        '@type': 'Offer',
                        'price': startingPrice.value,
                        'priceCurrency': 'USD',
                        'url': `${canonical}/booking`,
                        'availability': 'https://schema.org/InStock',
                        'validFrom': new Date().toISOString().split('T')[0]
                    },
                    'itinerary': trek.value.details?.itinerary?.map((day: any, idx: number) => ({
                        '@type': 'ListItem',
                        'position': idx + 1,
                        'name': day.title || `Day ${idx + 1}`,
                        'description': day.description || ''
                    }))
                })
            } as any
        ]
    }
})

const init = async () => {
    loading.value = true
    try {
        trek.value = await getTrekBySlug(route.params.slug as string)
        if (!trek.value) {
            throw createError({ statusCode: 404, statusMessage: 'Trek not found', fatal: true })
        }
        if (!trek.value.published_at && !isLoggedin.value) {
            trek.value = null
            throw createError({ statusCode: 404, statusMessage: 'Trek not found', fatal: true })
        }
    } catch (err: any) {
        if (err.statusCode) {
            throw err
        }
        throw createError({ statusCode: 404, statusMessage: 'Trek not found', fatal: true })
    } finally {
        loading.value = false
    }
}

const bookingBar = useTemplateRef('booking-bar')
const isBookingBarVisible = useElementVisibility(bookingBar)
const { y: scrollY } = useWindowScroll()

const swiperInstance = ref<any>(null)
const isBeginning = ref(true)
const isEnd = ref(false)

const onSwiper = (swiper: any) => {
    swiperInstance.value = swiper
    isBeginning.value = swiper.isBeginning
    isEnd.value = swiper.isEnd
}

const onSlideChange = (swiper: any) => {
    isBeginning.value = swiper.isBeginning
    isEnd.value = swiper.isEnd
}

const duration = computed(() => {
    return trek.value?.details ? trek.value?.details.itinerary?.length || 0 : 0
})

const startingPrice = computed(() => {
    if (trek.value && trek.value?.details?.pricing?.length > 0) {
        return Math.min(...trek.value.details.pricing.map((p: any) => p.price))
    }
    return Number(trek.value?.price) || 0
})
const hasItineraryMap = computed(() => {
    return trek.value?.details?.itinerary?.some((day: any) => day.places && day.places.length > 0) || false
})
const isScrolled = computed(() => scrollY.value > 20)

const { formatCurrency } = useCurrency()

const categoryName = computed(() => {
    const t = (route.params.type as string || '').toLowerCase()
    return t === 'treks' ? 'Treks' : 'Fastpacking'
})

const recommendedTreks = computed(() => {
    return treks.value
        .filter((t) => t.id !== trek.value?.id)
        .slice(0, 3)
})

onMounted(async () => {
    await init()
    try {
        await trekStore.fetchTreks(false, categoryName.value)
    } catch (e) {
        console.error('Failed to fetch recommended treks', e)
    }
})
</script>

<template>
    <div v-if="loading"
        class="flex justify-center items-center min-h-[500px] text-xl font-bold uppercase tracking-widest text-[#1A1A1A]">
        <Loader2Icon class="w-8 h-8 animate-spin mr-3 text-primary" />
        Loading Trek...
    </div>
    <template v-else-if="trek">
        <section class="relative w-full overflow-hidden">
            <Swiper :modules="[Autoplay]" class="h-screen" :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
            }">
                <SwiperSlide v-for="image in trek.gallery?.images">
                    <img alt="Forest trail" class="w-full h-full rounded-sm object-cover border border-black/5"
                        :src="showImage(image.file_name)" />
                </SwiperSlide>
            </Swiper>
            <div class="pb-[200px] absolute bottom-0 left-0 right-0 text-white z-20 max-w-4xl px-4">
                <span v-for="tag in trek.tags" :key="tag.id"
                    class="inline-block px-2 py-1 border border-primary text-sm font-black uppercase tracking-[0.2em] mb-4 mr-2">
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
                <div class="bg-white border border-black/5 p-1 shadow-xl -mt-[100px] transition-opacity"
                    :class="isScrolled ? 'opacity-100' : 'opacity-0'">
                    <div class="md:flex divide-y md:divide-y-0 md:divide-x divide-black/5">
                        <div class="md:w-1/3 p-8 space-y-6">
                            <h3 class="text-primary font-black uppercase tracking-widest flex items-center gap-2">
                                <ChartNoAxesCombinedIcon />
                                Vital Stats
                            </h3>
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <p class="text-sm uppercase text-text-muted font-bold mb-1">Duration</p>
                                    <p class="text-xl font-black">{{ duration }} {{ duration === 1 ? 'Day' : 'Days' }}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-sm uppercase text-text-muted font-bold mb-1">Max Altitude</p>
                                    <p class="text-xl font-black">{{ trek.details?.stats?.maxElevation || '---' }}</p>
                                </div>
                                <div>
                                    <p class="text-sm uppercase text-text-muted font-bold mb-1">Difficulty</p>
                                    <p class="text-xl font-black capitalize">{{ trek.details?.stats?.grade || 'Moderate'
                                    }}</p>
                                </div>
                                <div>
                                    <p class="text-sm uppercase text-text-muted font-bold mb-1">Distance</p>
                                    <p class="text-xl font-black lowercase">{{ trek.details?.stats?.distance || '---' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="p-8 space-y-6 bg-black/[0.01]">
                            <h3 class="text-primary font-black uppercase tracking-widest flex items-center gap-2">
                                <StarIcon />
                                Trip Highlights
                            </h3>
                            <ul class="space-y-3 columns-2">
                                <li v-for="(day, index) in (trek.details?.highlights as Array<any>)" :key="index"
                                    class="flex items-start gap-3 text-sm font-bold">
                                    <span class="text-primary font-black">
                                        {{ index + 1 < 10 ? `0${index + 1}` : index + 1 }} </span>
                                            {{ day }}
                                </li>
                            </ul>
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
                            <Swiper @swiper="onSwiper" @slideChange="onSlideChange" :modules="[Navigation]"
                                :slides-per-view="2.2" :space-between="10">
                                <template v-slot:container-start>
                                    <Button variant="light" size="icon" @click="swiperInstance?.slidePrev()"
                                        :disabled="isBeginning" class="absolute top-1/2 left-2 -translate-y-1/2 z-10">
                                        <ArrowLeftIcon />
                                    </Button>
                                </template>
                                <template v-slot:container-end>
                                    <Button variant="light" size="icon" @click="swiperInstance?.slideNext()"
                                        :disabled="isEnd" class="absolute top-1/2 right-2 -translate-y-1/2 z-10">
                                        <ArrowRightIcon />
                                    </Button>
                                </template>
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
                                <p class="text-text-muted font-bold uppercase tracking-widest mt-1">Starting
                                    from <span class="text-primary">{{ formatCurrency(startingPrice) }}</span> per
                                    person</p>
                            </div>
                        </div>

                        <!-- Pricing Tiers Table -->
                        <div v-if="trek.details?.pricing?.length"
                            class="overflow-hidden border border-black/5 bg-white shadow-sm">
                            <table class="w-full text-left border-collapse">
                                <thead class="bg-black text-white text-sm font-black uppercase tracking-widest">
                                    <tr>
                                        <th class="px-6 py-4">Group Size</th>
                                        <th class="px-6 py-4 text-right">Price Per Person</th>
                                    </tr>
                                </thead>
                                <tbody class="font-bold text-[#1A1A1A]">
                                    <tr v-for="(tier, index) in trek.details.pricing" :key="index"
                                        class="border-t border-black/5 hover:bg-primary/5 transition-colors">
                                        <td class="px-6 py-4 flex items-center gap-3">
                                            <div
                                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                                                {{ tier.min }}-{{ tier.max }}
                                            </div>
                                            <span>{{ tier.min }}{{ tier.max ? `-${tier.max}` : '+' }} Persons</span>
                                        </td>
                                        <td class="px-6 py-4 text-right text-primary font-black">
                                            {{ formatCurrency(tier.price) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="space-y-4">
                            <div v-if="trek.details?.included?.length"
                                class="bg-white border border-black/5 p-8 shadow-sm">
                                <h3
                                    class="text-primary font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <CircleCheckIcon class="text-primary" />
                                    What's Included
                                </h3>
                                <ul
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold tracking-tight text-[#1A1A1A]">
                                    <li v-for="(item, index) in trek.details.included" :key="index"
                                        class="flex items-center gap-3">
                                        <span class="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span> {{ item }}
                                    </li>
                                </ul>
                            </div>
                            <div v-if="trek.details?.excluded?.length"
                                class="bg-black/[0.02] border border-black/5 p-8">
                                <h3
                                    class="text-text-muted font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <BanIcon class="text-text-muted" />
                                    What's Not Included
                                </h3>
                                <ul
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold tracking-tight text-text-muted">
                                    <li v-for="(item, index) in trek.details.excluded" :key="index"
                                        class="flex items-center gap-3">
                                        <span class="w-1.5 h-1.5 bg-black/20 rounded-full shrink-0"></span> {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <!-- Important Details -->
                    <section v-if="trek.details?.importantDetails?.length"
                        class="space-y-6 pt-12 border-t border-black/5" id="important-details">
                        <h2 class="text-3xl font-black uppercase tracking-tighter text-[#1A1A1A]">
                            Important Details
                        </h2>
                        <div class="grid grid-cols-1 gap-8">
                            <div v-for="(section, index) in trek.details.importantDetails as any[]" :key="index"
                                class="bg-white border border-black/5 p-8 shadow-sm">
                                <h3 class="text-primary text-[16px] font-black uppercase tracking-widest mb-6 border-b border-black/5 pb-4"
                                    v-if="trek.details.importantDetails?.items?.length === 1">
                                    {{ section.title }}
                                </h3>
                                <div class="space-y-6">
                                    <div v-for="(item, itemIndex) in section.items" :key="itemIndex">
                                        <h4 class="font-bold uppercase text-[#1A1A1A] mb-1">
                                            {{ item.title }}
                                        </h4>
                                        <p class="text-text-muted leading-relaxed">
                                            {{ item.description }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                        <div class="bg-primary/[0.08] border-l-4 border-primary p-5"
                            v-for="(protocol) in trek?.details?.securityProtocols">
                            <div class="flex items-center gap-2 mb-2">
                                <component :is="securityProtocolIconMapping[protocol.title]" class="text-primary" />
                                <h4 class="font-black uppercase tracking-widest text-[#1A1A1A]">
                                    {{ protocol.title }}
                                </h4>
                            </div>
                            <p class="text-text-muted text-sm">{{ protocol.description }}</p>
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-5 space-y-8">
                    <div class="sticky top-28 space-y-8">

                        <!-- Gear -->
                        <section v-if="trek.details?.mandatoryGear?.length || trek.details?.optionalGear?.length"
                            class="space-y-4">
                            <h3 class="font-black uppercase tracking-widest text-primary">Gear Checklist
                            </h3>
                            <Tabs default-value="mandatory" class="w-full">
                                <TabsList>
                                    <TabsTrigger value="mandatory" class="font-bold">
                                        Mandatory Gear
                                    </TabsTrigger>
                                    <TabsTrigger value="optional" class="font-bold">
                                        Recommended Gear
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent v-if="trek.details?.mandatoryGear?.length" value="mandatory" class="mt-4">
                                    <ul class="bg-white border border-black/5 shadow-sm divide-y divide-black/5">
                                        <li v-for="(gear, index) in trek.details.mandatoryGear as any[]" :key="index"
                                            class="p-4 flex items-center gap-3">
                                            <span
                                                class="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
                                                <span class="w-2.5 h-2.5 bg-primary rounded-full"></span>
                                            </span>
                                            <span class="text-[#1A1A1A]">{{ gear.title }}</span>
                                        </li>
                                    </ul>
                                </TabsContent>
                                <TabsContent v-if="trek.details?.optionalGear?.length" value="optional" class="mt-4">
                                    <ul class="bg-white border border-black/5 shadow-sm divide-y divide-black/5">
                                        <li v-for="(gear, index) in trek.details.optionalGear as any[]" :key="index"
                                            class="p-4 flex items-center gap-3">
                                            <span
                                                class="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0">
                                                <span class="w-2.5 h-2.5 bg-slate-300 rounded-full"></span>
                                            </span>
                                            <span class="text-[#1A1A1A]">{{ gear.title }}</span>
                                        </li>
                                    </ul>
                                </TabsContent>
                            </Tabs>
                        </section>

                        <!-- Weather Widget -->
                        <section v-if="trek.details?.weather?.embedCode" class="space-y-4">
                            <h3 class="font-black uppercase tracking-widest text-primary">
                                Live Weather {{ trek.details.weather.location ? `at ${trek.details.weather.location}` :
                                    '' }}
                            </h3>
                            <div
                                class="bg-white border border-black/5 p-4 shadow-sm rounded-lg overflow-hidden flex justify-center items-center">
                                <div class="w-full" v-html="trek.details.weather.embedCode"></div>
                            </div>
                        </section>

                        <!-- Safety & Risk -->
                        <!-- <section v-if="trek.details?.securityProtocols?.length" class="space-y-4">
                            <h3 class="font-black uppercase tracking-widest text-primary">Security Protocols
                            </h3>
                            <div v-for="(protocol, index) in trek.details.securityProtocols as any[]" :key="index"
                                class="bg-white border border-black/5 p-6 shadow-sm">
                                <div class="flex items-center gap-3 mb-4">
                                    <component :is="index % 2 === 0 ? TriangleAlertIcon : BriefcaseMedicalIcon"
                                        class="text-primary size-5" />
                                    <h4 class="font-black uppercase tracking-widest text-[#1A1A1A]">
                                        {{ protocol.title }}
                                    </h4>
                                </div>
                                <p class="text-text-muted leading-relaxed">{{ protocol.description }}</p>
                            </div>
                        </section> -->
                    </div>
                </div>
            </div>
            <!-- Detailed Itinerary & Route Map -->
            <section v-if="trek.details?.itinerary?.length" class="mb-24 pt-16 border-t border-black/5">
                <div class="mb-12">
                    <span class="text-primary font-black uppercase tracking-[0.2em] text-xs block mb-3">Interactive
                        Route &
                        Timeline</span>
                    <h2 class="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#1A1A1A]">Detailed
                        Itinerary</h2>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <!-- Left: Itinerary Timeline Accordion -->
                    <div :class="[hasLocations ? 'lg:col-span-6' : 'lg:col-span-12', 'space-y-6']">
                        <Accordion type="single" collapsible class="w-full" v-model="activeDayKey">
                            <div class="max-h-[550px] overflow-y-auto pr-4 border-l-2 border-primary/20 relative">
                                <AccordionItem v-for="(day, index) in trek.details.itinerary as any[]" :key="index"
                                    :value="`item-${index}`" class="relative pl-8 border-none pb-6 last:pb-0">
                                    <span :class="[
                                        'absolute left-[-9px] top-6 w-4 h-4 rounded-full z-10 transition-all duration-300',
                                        activeDayIndex === index ? 'bg-primary ring-4 ring-primary/20 scale-125' : 'bg-white border-2 border-primary/50'
                                    ]"></span>
                                    <AccordionTrigger class="py-4 hover:no-underline text-left group">
                                        <div class="flex-1 pr-4">
                                            <p class="text-sm font-black uppercase text-primary mb-1">Day {{ index + 1 <
                                                10 ? `0${index + 1}` : index + 1 }} </p>
                                                    <h4
                                                        class="font-black tracking-tight text-[#1A1A1A] text-lg transition-colors group-hover:text-primary">
                                                        {{ day.title }}
                                                    </h4>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div class="space-y-4 pb-4">
                                            <p class="text-text-muted leading-relaxed">
                                                {{ day.description }}
                                            </p>

                                            <!-- Stopovers / Checkpoints Badges -->
                                            <div v-if="day.places?.length"
                                                class="space-y-2 pt-3 border-t border-black/5">
                                                <span
                                                    class="text-[9px] font-black text-primary/70 uppercase tracking-widest block">Route
                                                    Checkpoints</span>
                                                <div class="flex flex-wrap gap-2">
                                                    <button v-for="(place, pIdx) in day.places" :key="pIdx"
                                                        @click="focusOnPlace(place)"
                                                        class="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold transition-all">
                                                        <span>📍</span>
                                                        <span>{{ place.name }}</span>
                                                        <span v-if="place.elevation"
                                                            class="text-[10px] bg-primary/15 px-1 py-0.5 rounded font-black">{{
                                                                place.elevation }}m</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </div>
                        </Accordion>
                    </div>

                    <!-- Right: Itinerary Map -->
                    <div v-if="hasLocations"
                        class="lg:col-span-6 h-[550px] overflow-hidden shadow-md border border-black/5 bg-slate-50 relative rounded-[2.5rem]">
                        <ItineraryMap ref="itineraryMapRef" :itinerary="trek.details.itinerary"
                            :routing-mode="trek.details.routingMode || 'route'"
                            :elevation-profile="trek.details.elevationProfile" :active-day-index="activeDayIndex" />
                    </div>
                </div>
            </section>

            <!-- FAQs Section -->
            <section v-if="trek.details?.qa?.length" class="mb-24 pt-16 border-t border-black/5">
                <div class="mb-12">
                    <span class="text-primary font-black uppercase tracking-[0.2em] text-xs block mb-3">Questions &
                        Answers</span>
                    <h2 class="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#1A1A1A]">Frequently Asked
                        Questions
                    </h2>
                </div>
                <div class="max-w-4xl">
                    <Accordion type="single" collapsible class="w-full space-y-4">
                        <AccordionItem v-for="(item, index) in trek.details.qa as any[]" :key="index"
                            :value="`faq-${index}`"
                            class="border border-black/5 bg-white px-8 py-2 shadow-sm rounded-xl">
                            <AccordionTrigger
                                class="py-4 hover:no-underline text-left font-black tracking-tight text-lg text-[#1A1A1A] hover:text-primary">
                                {{ item.question }}
                            </AccordionTrigger>
                            <AccordionContent
                                class="text-text-muted leading-relaxed text-md pt-2 pb-6 border-t border-black/5 mt-2">
                                {{ item.answer }}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>

            <!-- Recommended Treks Section -->
            <section v-if="recommendedTreks.length > 0" class="mb-24 py-12 border-t border-black/5">
                <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <span class="text-primary font-black uppercase tracking-[0.2em] text-xs block mb-3">More
                            Adventures</span>
                        <h2 class="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#1A1A1A]">Recommended
                            for you</h2>
                    </div>
                    <p class="text-text-muted max-w-sm mt-4 md:mt-0 font-medium text-sm leading-relaxed">
                        Explore other premium {{ categoryName.toLowerCase() }} in the Himalayas curated by our mountain
                        experts.
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <PagesDefaultFastpackingTrekCard v-for="item in recommendedTreks" :key="item.id" :item="item" />
                </div>
            </section>
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
                        <NuxtLink :to="`/${type}/${trek.slug}/booking`"
                            class="bg-primary text-center text-white px-10 py-5 font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
                            Secure Your Spot
                        </NuxtLink>
                        <button
                            class="border border-black/20 text-[#1A1A1A] px-10 py-5 font-black uppercase tracking-[0.2em] hover:bg-black/5 transition-all">Talk
                            to an Expert</button>
                    </div>
                </div>
            </section>
        </main>
        <div :class="[
            'fixed bottom-0 left-0 w-full bg-white border-t border-black/10 z-[50] transform transition-all duration-500',
            (!isBookingBarVisible && scrollY > 300) ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        ]">
            <div class="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
                <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-6">
                    <h3 class="md:text-lg font-black uppercase tracking-tight text-text-main">
                        {{ trek.name }}
                    </h3>
                    <div class="flex items-center gap-2 text-text-muted">
                        <ClockIcon />
                        <span class="text-sm md:font-bold uppercase tracking-widest">
                            {{ duration }} {{ duration === 1 ? 'Day' : 'Days' }}
                        </span>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <NuxtLink :to="`/${type}/${trek.slug}/booking`"
                        class="bg-primary text-white px-6 md:px-10 py-3 rounded-sm font-black text-sm md:uppercase tracking-widest hover:bg-black transition-all shadow-md">
                        Secure Your Spot
                    </NuxtLink>
                </div>
            </div>
        </div>
    </template>
</template>