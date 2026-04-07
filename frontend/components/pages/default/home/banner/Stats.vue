<script setup lang="ts">
import type { Stage } from '~/lib/types'
import moment from 'moment'
import { distanceToKm, formatDate } from '~/lib/filters';

interface StatsProps {
    stage: Stage
    slug: string
}

const props = defineProps<StatsProps>()

const currentStageCategory = computed(() => props.stage?.stage_categories
    .sort((a, b) => moment.utc(a.start).diff(moment.utc(b.start)))[0])

const totalDistance = computed(() => props.stage?.stage_categories.reduce((total, category) => total + parseInt(category.distance ?? ''), 0))
</script>

<template>
    <div
        class="dark:bg-black/60 bg-white/60 backdrop-blur-[10px] -mx-4 md:mx-0 p-4 md:p-8 rounded-2xl shadow-2xl border border-white/20">
        <div class="flex flex-col md:flex-row justify-between md:items-start mb-6">
            <div>
                <span class="bg-primary/20 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                    {{ $t('home.banner.upcoming_race') }}
                </span>
                <h3 class="text-xl md:text-3xl font-display font-bold mt-2">{{ stage?.name }}
                </h3>
            </div>
            <div class="text-right">
                <span class="text-sm opacity-60">{{ $t('home.banner.starts_in') }}</span>
                <Countdown v-if="currentStageCategory?.start" :date="currentStageCategory.start" variant="compact" />
            </div>
        </div>
        <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="text-center p-4 bg-slate-100 dark:bg-slate-700/50 text-gray-600 dark:text-white rounded-xl">
                <div class="text-xl font-bold">{{ distanceToKm(totalDistance) }}</div>
                <div class="text-xs uppercase opacity-60">{{ $t('home.banner.distance') }}</div>
            </div>
            <div class="text-center p-4 bg-slate-100 dark:bg-slate-700/50 text-gray-600 dark:text-white rounded-xl">
                <div class="text-xl font-bold">4,380m</div>
                <div class="text-xs uppercase opacity-60">{{ $t('home.banner.elevation') }}</div>
            </div>
            <div class="text-center p-4 bg-slate-100 dark:bg-slate-700/50 text-gray-600 dark:text-white rounded-xl">
                <div class="text-xl font-bold">Hard</div>
                <div class="text-xs uppercase opacity-60">{{ $t('home.banner.difficulty') }}</div>
            </div>
        </div>
        <NuxtLink as-child :to="$localePath({ name: 'races-slug', params: { slug } })">
            <Button size="xl" class="w-full">{{ $t('home.banner.register_now') }}</Button>
        </NuxtLink>
        <p class="text-center text-sm mt-4 opacity-60">
            {{ $t('home.banner.race_ends_in') }}
            {{ formatDate(currentStageCategory?.end) }}
        </p>
    </div>
</template>