<script lang="ts" setup>
import moment from 'moment';
import { showImage } from '~/lib/filters'
import type { Stage } from '~/lib/types'

interface CardProps {
    stage: Stage
}

const props = defineProps<CardProps>()
const localePath = useLocalePath()

const showLink = computed(() => props.stage.stage_categories.some((category) => moment.utc(category.start).isAfter(moment.utc())))
</script>

<template>
    <div
        class="group relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 transition-transform hover:-translate-y-2">
        <div class="h-64 overflow-hidden">
            <img alt="Trail Runner on high mountain"
                class="w-full h-full object-cover transition-transform group-hover:scale-110"
                :src="showImage(stage?.thumbnail?.file_name)" />
            <!-- <div class="absolute top-4 left-4">
                <span class="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {{ stage?.difficulty }}
                </span>
            </div> -->
        </div>
        <div class="p-8">
            <h4 class="text-2xl font-display font-bold mb-2">{{ stage.name }}</h4>
            <p class="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                {{ stage.excerpt }}
            </p>
            <div class="flex justify-between items-center text-sm font-semibold">
                <!-- <span class="flex items-center text-primary">
                    <TimerIcon class="mr-1 size-4" />
                    {{ stage.cut_off_time }} Cutoff
                </span> -->
                <NuxtLink class="text-primary hover:text-[#d8561a] underline cursor-pointer" v-if="showLink">
                    {{ $t('home.stage.learn_more') }}
                    →
                </NuxtLink>
                <NuxtLink
                    :to="localePath({ name: 'races-id-stage-stage_id-result', params: { id: stage.event_id, stage_id: stage.id } })"
                    v-else as-child>
                    <Button variant="secondary" modifier="outline">
                        {{ $t('home.stage.see_result') }}
                    </Button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>