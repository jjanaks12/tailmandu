<script lang="ts" setup>
    import { MapIcon } from 'lucide-vue-next';
import { formatDate, showImage } from '~/lib/filters'
    import type { Stage } from '~/lib/types'

    interface StageCardProps {
        stage: Stage,
        raceSlug: string
        raceName: string
    }
    defineProps<StageCardProps>()
</script>

<template>
    <NuxtLink :to="`/races/${raceSlug}/stage/${stage.id}`" class="shadow">
        <figure class="relative">
            <img :src="showImage(stage.thumbnail.file_name)" :alt="stage.name">
            <Badge variant="secondary" class="rounded-xs absolute top-2 left-2">{{ formatDate(stage.start) }}</Badge>
        </figure>
        <div class="px-7 space-y-5 pb-7">
            <ul class="bg-[#13304a] text-white/80 flex gap-4 px-[30px] py-[17px] -mt-4 [&>li>strong]:block [&>li>em]:text-[#4487a0] [&>li>em]:capitalize [&>li>em]:not-italic relative z-[2] rounded-sm">
                <li>
                    <em>{{ stage.distance }}</em>
                    <strong>Distance</strong>
                </li>
                <li>
                    <em>{{ stage.difficulty }}</em>
                    <strong>Difficulty</strong>
                </li>
            </ul>
            <em class="text-[#13304a] text-3xl not-italic block">{{ raceName }}</em>
            <h3 class="text-primary">{{ stage.name }}</h3>
            <address class="not-italic flex items-center gap-2">
                <MapIcon />
                {{ stage.location }}
            </address>
        </div>
    </NuxtLink>
</template>