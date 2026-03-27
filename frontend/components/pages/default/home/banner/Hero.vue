<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'
import moment from 'moment'
import { distanceToKm, formatDate, showImage } from '~/lib/filters'
import { useEventStore } from '~/store/event'

const { currentRace } = storeToRefs(useEventStore())
const localePath = useLocalePath()
const breakpoints = useBreakpoints(breakpointsTailwind)

const currentStage = computed(() => currentRace.value?.stages
    .filter((stage) => stage.stage_categories.length > 0)
    .filter((stage) => stage.stage_categories.some((category) => moment.utc(category.start).isAfter(moment.utc())))[0])

const currentStageCategory = computed(() => currentStage.value?.stage_categories
    .sort((a, b) => moment.utc(a.start).diff(moment.utc(b.start)))[0])

const totalDistance = computed(() => currentStage.value?.stage_categories.reduce((total, category) => total + parseInt(category.distance ?? ''), 0))
</script>

<template>
    <ClientOnly>
        <template v-if="currentRace">
            <section class="relative h-screen flex items-center mountain-bg pt-20 z-[1] overflow-hidden">
                <figure class="absolute inset-0 z-[-1] after:absolute" v-if="currentRace.thumbnail">
                    <img :src="showImage(currentRace?.thumbnail?.file_name as string)" :alt="currentRace.name"
                        class="w-full h-full object-cover">
                </figure>
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div class="text-white grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 class="font-display text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                                {{ currentRace.name }}
                            </h1>
                            <p class="text-xl mb-8 max-w-lg leading-relaxed">{{ currentRace.excerpt }}</p>
                            <div class="flex space-x-4">
                                <NuxtLink as-child
                                    :to="localePath({ name: 'races-slug', params: { slug: currentRace.slug } })">
                                    <Button :size="breakpoints.md.value ? 'xl' : 'lg'" variant="light">{{
                                        $t('home.banner.explore_races') }}</Button>
                                </NuxtLink>
                                <NuxtLink as-child
                                    :to="localePath({ name: 'races-slug', params: { slug: currentRace.slug } })">
                                    <Button :size="breakpoints.md.value ? 'xl' : 'lg'" variant="light"
                                        modifier="outline">
                                        {{ $t('home.banner.watch_film') }}
                                    </Button>
                                </NuxtLink>
                            </div>
                        </div>
                        <div class="dark:bg-black/60 bg-white/60 backdrop-blur-[10px] -mx-4 md:mx-0 p-4 md:p-8 rounded-2xl shadow-2xl border border-white/20"
                            v-if="currentStage">
                            <div class="flex flex-col md:flex-row justify-between md:items-start mb-6">
                                <div>
                                    <span
                                        class="bg-primary/20 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                                        {{ $t('home.banner.upcoming_race') }}
                                    </span>
                                    <h3 class="text-xl md:text-3xl font-display font-bold mt-2">{{ currentStage?.name }}
                                    </h3>
                                </div>
                                <div class="text-right">
                                    <span class="text-sm opacity-60">{{ $t('home.banner.starts_in') }}</span>
                                    <Countdown :date="currentStageCategory?.start" variant="compact" />
                                </div>
                            </div>
                            <div class="grid grid-cols-3 gap-4 mb-8">
                                <div class="text-center p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
                                    <div class="text-xl font-bold">{{ distanceToKm(totalDistance) }}</div>
                                    <div class="text-xs uppercase opacity-60">{{ $t('home.banner.distance') }}</div>
                                </div>
                                <div class="text-center p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
                                    <div class="text-xl font-bold">4,380m</div>
                                    <div class="text-xs uppercase opacity-60">{{ $t('home.banner.elevation') }}</div>
                                </div>
                                <div class="text-center p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
                                    <div class="text-xl font-bold">Hard</div>
                                    <div class="text-xs uppercase opacity-60">{{ $t('home.banner.difficulty') }}</div>
                                </div>
                            </div>
                            <NuxtLink as-child
                                :to="localePath({ name: 'races-slug', params: { slug: currentRace.slug } })">
                                <Button size="xl" class="w-full">{{ $t('home.banner.register_now') }}</Button>
                            </NuxtLink>
                            <p class="text-center text-sm mt-4 opacity-60">
                                {{ $t('home.banner.race_ends_in') }}
                                {{ formatDate(currentStageCategory?.end) }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <PagesDefaultHomeBannerSlider :trail-race="currentRace" :stages="currentRace.stages" />
        </template>
        <PagesDefaultHomeBannerLoader v-else />
    </ClientOnly>
</template>