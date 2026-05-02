<script lang="ts" setup>
import {
    CalendarIcon,
    MapPinIcon,
    MountainIcon,
    ZapIcon,
    ChevronRightIcon,
    MapIcon,
    ActivityIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    TimerIcon,
    TrophyIcon,
} from 'lucide-vue-next'
import { formatDate, showImage } from '~/lib/filters'
import type { TrailRace, Stage } from '~/lib/types'
import { useEventStore } from '~/store/event'
import moment from 'moment'

const route = useRoute()
const trailRace = ref<TrailRace | null>(null)
const selectedStage = ref<Stage | null>(null)
const { getBySlug } = useEventStore()

const isFinished = computed(() => moment().isAfter(moment(trailRace.value?.end as string)))
const isUpcoming = computed(() => moment().isBefore(moment(trailRace.value?.start as string)))

const totalDistance = computed(() => {
    if (!trailRace.value?.stages) return 0
    return trailRace.value.stages.reduce((acc, stage) => acc + (parseFloat(stage.distance) || 0), 0)
})

const totalElevationGain = computed(() => {
    if (!trailRace.value?.stages) return 0
    // Assuming we might have elevation data in stage_categories or similar, 
    // but for now let's just use a placeholder or sum from categories if available
    return "8,450" // Placeholder as per design, we can refine this if data is available
})

onBeforeMount(async () => {
    trailRace.value = await getBySlug(route.params.slug as string)
    if (trailRace.value && trailRace.value.stages.length > 0) {
        selectedStage.value = trailRace.value.stages[0]
    }

    if (trailRace.value) {
        useSeoMeta({
            title: trailRace.value.name,
            ogTitle: trailRace.value.name,
            description: trailRace.value.excerpt,
            ogDescription: trailRace.value.excerpt,
            ogImage: trailRace.value.thumbnail ? showImage(trailRace.value.thumbnail.file_name) : undefined
        })
    }
})

const selectedStageStartTime = computed(() => {
    if (!selectedStage.value) return ''
    if (!selectedStage.value.stage_categories?.length) return ''

    const earliestCat = [...selectedStage.value.stage_categories].sort((a, b) =>
        moment(a.start).diff(moment(b.start))
    )[0]

    return formatDate(earliestCat.start, 'MMM D, YYYY • hh:mm A')
})

const selectStage = (stage: Stage) => {
    selectedStage.value = stage
}
</script>

<template>
    <div v-if="trailRace" class="bg-background-light dark:bg-background-dark min-h-screen">
        <!-- Hero Section -->
        <div class="relative w-full">
            <div class="flex min-h-[500px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-end px-6 lg:px-40 pb-16 relative overflow-hidden"
                :style="{ backgroundImage: `linear-gradient(rgba(16, 24, 34, 0.2) 0%, rgba(16, 24, 34, 0.9) 100%), url(${trailRace.thumbnail ? showImage(trailRace.thumbnail.file_name) : 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80'})` }">

                <div class="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <Badge v-if="isUpcoming"
                        class="bg-primary/20 text-primary border-primary/30 px-4 py-1.5 uppercase tracking-widest font-black w-fit">
                        Upcoming Event
                    </Badge>
                    <Badge v-else-if="!isFinished"
                        class="bg-red-500 text-white border-none px-4 py-1.5 uppercase tracking-widest font-black w-fit animate-pulse">
                        Live Now
                    </Badge>
                    <Badge v-else
                        class="bg-slate-500/50 text-white border-none px-4 py-1.5 uppercase tracking-widest font-black w-fit">
                        Completed
                    </Badge>

                    <h1 class="text-white text-5xl md:text-7xl font-display font-black leading-tight tracking-tight">
                        {{ trailRace.name }}
                    </h1>

                    <div
                        class="flex flex-wrap items-center gap-8 text-slate-300 font-bold uppercase tracking-widest text-sm">
                        <div class="flex items-center gap-2.5" v-if="!isFinished">
                            <CalendarIcon class="w-5 h-5 text-primary" />
                            <span>{{ formatDate(trailRace.start) }} — {{ formatDate(trailRace.end) }}</span>
                        </div>
                        <div class="flex items-center gap-2.5" v-if="trailRace.stages?.length > 0">
                            <MapPinIcon class="w-5 h-5 text-primary" />
                            <span>{{ trailRace.stages[0].location }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-16">
            <!-- Left Content -->
            <div class="flex-1 flex flex-col gap-16">
                <!-- Race Overview -->
                <section>
                    <div class="flex items-center gap-4 mb-10">
                        <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <MountainIcon class="w-6 h-6 text-primary" />
                        </div>
                        <h2 class="text-3xl font-display font-black tracking-tight">Race Overview</h2>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div
                            class="bg-white dark:bg-deep-slate p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col gap-3 group hover:border-primary/50 transition-colors">
                            <span class="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total
                                Distance</span>
                            <div class="flex items-baseline gap-1">
                                <span
                                    class="text-4xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{{
                                        totalDistance }}</span>
                                <span class="text-sm font-bold text-slate-400 uppercase">KM</span>
                            </div>
                        </div>
                        <div
                            class="bg-white dark:bg-deep-slate p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col gap-3 group hover:border-primary/50 transition-colors">
                            <span class="text-slate-400 text-[10px] font-black uppercase tracking-widest">Vert
                                Gain</span>
                            <div class="flex items-baseline gap-1">
                                <span
                                    class="text-4xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{{
                                        totalElevationGain }}</span>
                                <span class="text-sm font-bold text-slate-400 uppercase">M</span>
                            </div>
                        </div>
                        <div
                            class="bg-white dark:bg-deep-slate p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col gap-3">
                            <span
                                class="text-slate-400 text-[10px] font-black uppercase tracking-widest">Difficulty</span>
                            <div class="flex gap-1 pt-2">
                                <ZapIcon v-for="i in 4" :key="i" class="w-5 h-5 fill-primary text-primary" />
                                <ZapIcon class="w-5 h-5 text-slate-200 dark:text-slate-700" />
                            </div>
                        </div>
                    </div>

                    <div class="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-12"
                        v-html="trailRace.description">
                    </div>

                    <!-- Map Section -->
                    <div v-if="trailRace.map_file"
                        class="relative rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xl aspect-video group">
                        <img :src="showImage(trailRace.map_file.file_name)" alt="Race Map"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div
                            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <Button size="lg" class="rounded-2xl gap-3 text-lg font-black px-10 py-8">
                                <MapIcon class="w-6 h-6" />
                                View Full Map
                            </Button>
                        </div>
                    </div>
                </section>

                <!-- Detailed Stage View -->
                <section v-if="selectedStage" class="border-t border-slate-100 dark:border-slate-800 pt-16">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                        <div>
                            <div class="flex items-center gap-3 mb-2">
                                <span
                                    class="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                                    Stage Details
                                </span>
                                <span class="text-slate-400 font-bold">{{ selectedStageStartTime }}</span>
                            </div>
                            <h3 class="text-4xl font-display font-black tracking-tight">{{ selectedStage.name }}</h3>
                        </div>
                        <div class="flex gap-3">
                            <Badge v-if="selectedStage.difficulty === 'difficult'"
                                class="bg-red-500/10 text-red-500 border-none font-bold uppercase tracking-tighter">
                                TECHNICAL
                            </Badge>
                            <Badge class="bg-primary/10 text-primary border-none font-bold uppercase tracking-tighter">
                                HIGH ALTITUDE
                            </Badge>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        <div
                            class="bg-slate-50 dark:bg-deep-slate/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Distance</p>
                            <p class="text-2xl font-black">{{ selectedStage.distance }} KM</p>
                        </div>
                        <div
                            class="bg-slate-50 dark:bg-deep-slate/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vert Gain
                            </p>
                            <p class="text-2xl font-black text-emerald-500 flex items-center gap-1">
                                <ArrowUpIcon class="w-4 h-4" /> 2,150 M
                            </p>
                        </div>
                        <div
                            class="bg-slate-50 dark:bg-deep-slate/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Elevation
                                Loss</p>
                            <p class="text-2xl font-black text-rose-500 flex items-center gap-1">
                                <ArrowDownIcon class="w-4 h-4" /> 1,890 M
                            </p>
                        </div>
                        <div
                            class="bg-slate-50 dark:bg-deep-slate/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Est. Time
                            </p>
                            <p class="text-2xl font-black flex items-center gap-2 text-primary">
                                <TimerIcon class="w-4 h-4" /> 4.5 - 7h
                            </p>
                        </div>
                    </div>

                    <!-- Stage Categories -->
                    <div v-if="selectedStage.stage_categories?.length > 0">
                        <h4 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">Available
                            Categories</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                            <div v-for="cat in selectedStage.stage_categories" :key="cat.id"
                                class="bg-white dark:bg-deep-slate rounded-3xl p-8 border-l-8 border-primary shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-all duration-300">
                                <div class="flex justify-between items-start mb-6">
                                    <h5 class="font-black text-xl">{{ cat.name }}</h5>
                                    <TrophyIcon class="w-5 h-5 text-primary" />
                                </div>
                                <div class="space-y-4">
                                    <div class="flex justify-between text-sm font-bold">
                                        <span class="text-slate-400">Start Time</span>
                                        <span>{{ moment(cat.start).format('hh:mm A') }}</span>
                                    </div>
                                    <div class="flex justify-between text-sm font-bold">
                                        <span class="text-slate-400">Distance</span>
                                        <span>{{ cat.distance }} KM</span>
                                    </div>
                                    <div class="pt-4">
                                        <div
                                            class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                            <div class="bg-primary h-full" style="width: 100%"></div>
                                        </div>
                                        <p
                                            class="text-[10px] mt-2 font-black text-slate-400 uppercase tracking-tighter text-right">
                                            Limited Entries
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Elevation Profile SVG Placeholder (adapted from design) -->
                    <!-- <div
                        class="bg-white dark:bg-deep-slate rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 elevation-grid relative overflow-hidden group">
                        <div class="flex items-center justify-between mb-12">
                            <div class="flex items-center gap-3">
                                <ActivityIcon class="w-5 h-5 text-primary" />
                                <h4 class="font-black text-xl">Elevation Profile</h4>
                            </div>
                            <div
                                class="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <div class="flex items-center gap-2">
                                    <span class="w-3 h-3 bg-primary rounded-full"></span> Ascent
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="w-3 h-3 bg-slate-200 dark:bg-slate-700 rounded-full"></span> Descent
                                </div>
                            </div>
                        </div>
                        <div class="h-64 relative flex items-end mb-4">
                            <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
                                <path
                                    d="M0,100 L100,80 L200,85 L300,40 L400,30 L500,60 L600,10 L700,25 L800,80 L900,90 L1000,100 Z"
                                    fill="rgba(240, 103, 35, 0.1)" stroke="#f06723" stroke-width="3"></path>
                                <circle cx="600" cy="10" fill="white" r="6" stroke="#f06723" stroke-width="3"
                                    class="animate-pulse"></circle>
                            </svg>
                            <div class="absolute left-[60%] -top-12 flex flex-col items-center">
                                <div
                                    class="bg-primary text-white px-4 py-1.5 rounded-xl text-[10px] font-black whitespace-nowrap shadow-lg">
                                    2,540M • KM 18.5
                                </div>
                                <div class="w-0.5 h-16 bg-primary/40 dashed-border"></div>
                            </div>
                        </div>
                        <div
                            class="flex justify-between text-[10px] font-black text-slate-400 px-2 uppercase tracking-widest">
                            <span>Start</span>
                            <span>10 KM</span>
                            <span>20 KM</span>
                            <span>30 KM</span>
                            <span>{{ selectedStage.distance }} KM</span>
                        </div>
                    </div> -->
                </section>
            </div>

            <!-- Sidebar -->
            <aside class="w-full lg:w-96 shrink-0">
                <div class="sticky top-32 flex flex-col gap-8">
                    <!-- Stage Selector -->
                    <div
                        class="bg-white dark:bg-deep-slate p-4 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <h3 class="px-6 pt-6 pb-6 text-xs font-black uppercase tracking-widest text-slate-400">
                            Race Stages
                        </h3>
                        <nav class="flex flex-col gap-2">
                            <button v-for="(stage, index) in trailRace.stages" :key="stage.id"
                                @click="selectStage(stage)" :class="[
                                    'group flex items-center justify-between p-6 rounded-[2rem] transition-all duration-500 border-2',
                                    selectedStage?.id === stage.id
                                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                                        : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-primary'
                                ]">
                                <div class="flex flex-col items-start">
                                    <span :class="[
                                        'text-[10px] font-black uppercase tracking-widest mb-1 transition-colors',
                                        selectedStage?.id === stage.id ? 'text-white/80' : 'text-slate-400'
                                    ]">
                                        Stage {{ index + 1 }}
                                    </span>
                                    <span class="font-black text-lg">{{ stage.name }}</span>
                                </div>
                                <ChevronRightIcon v-if="selectedStage?.id !== stage.id"
                                    class="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                <ActivityIcon v-else class="w-6 h-6 animate-pulse" />
                            </button>
                        </nav>
                    </div>

                    <!-- Registration CTA -->
                    <div
                        class="bg-secondary/10 p-10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl shadow-emerald-950/20">
                        <div
                            class="absolute -right-12 -bottom-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <MountainIcon class="w-64 h-64" />
                        </div>
                        <h4 class="text-3xl font-display font-black mb-4 relative z-10 leading-tight">Ready
                            to Conquer?</h4>
                        <p class="mb-10 relative z-10 leading-relaxed font-medium">
                            Early bird registration is currently open. Secure your bib for the ultimate Himalayan
                            challenge.
                        </p>
                        <Button size="xl" as-child>
                            <NuxtLink
                                :to="$localePath({ name: 'races-slug-runner', params: { slug: route.params.slug }, query: { stage_id: selectedStage?.id } })">
                                Register Now
                            </NuxtLink>
                        </Button>
                    </div>

                    <!-- Organizers Info (Bonus) -->
                    <div class="px-8 py-4 flex items-center gap-4 text-slate-400 opacity-60">
                        <div class="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
                        <p class="text-[10px] font-bold uppercase tracking-widest">
                            Trailmandu Global Events <br />
                            Sanctioned Race 2024
                        </p>
                    </div>
                </div>
            </aside>
        </main>
    </div>
</template>

<style scoped>
.elevation-grid {
    background-image: linear-gradient(rgba(240, 103, 35, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(240, 103, 35, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
}

.dashed-border {
    background-image: linear-gradient(to bottom, #f06723 50%, transparent 50%);
    background-position: left;
    background-size: 2px 10px;
    background-repeat: repeat-y;
}
</style>