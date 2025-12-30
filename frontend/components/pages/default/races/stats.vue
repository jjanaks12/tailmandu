<script setup lang="ts">
import bg01 from '@/assets/images/bg-01.png'
import type { TrailRace } from '~/lib/types'
import { toWords } from 'number-to-words'

interface Props {
    race: TrailRace
}

const props = defineProps<Props>()

const totalDistance = computed(() => props.race.stages
    .map((stage) => stage.stage_categories.map((category) => parseInt(category.distance)))
    .flat()
    .reduce((a, b) => a + b, 0) / 1000)

const checkpoints = computed(() => props.race.stages
    .map((stage) => stage.stage_categories.map(category => category.checkpoints.length))
    .flat()
    .reduce((a, b) => a + b, 0)
)
</script>

<template>
    <section class="relative overflow-hidden z-[1]">
        <figure class="absolute inset-0 z-[-1]">
            <img :src="bg01" class="w-full h-full object-cover filter-[contrast(.5)]" />
        </figure>
        <div class="container text-[#13304a] py-[100px]">
            <ul
                class="flex flex-col md:flex-row justify-between gap-4 lg:gap-12 [&>li>strong]:block [&>li>strong]:text-[25px] [&>li>em]:not-italic [&>li>em]:text-[25px] md:[&>li>em]:text-[40px]">
                <li>
                    <strong>Total Distance</strong>
                    <em>{{ totalDistance }}KM +</em>
                </li>
                <li>
                    <strong class="capitalize">{{ toWords(race.stages.length) }} Different</strong>
                    <em>Places</em>
                </li>
                <li>
                    <strong class="capitalize">{{ toWords(checkpoints) }} Different</strong>
                    <em>Summits</em>
                </li>
                <li>
                    <strong>Grade</strong>
                    <em>Challenging</em>
                </li>
            </ul>
        </div>
    </section>
</template>