<script lang="ts" setup>
import moment from 'moment'
import { formatDate, showImage } from '~/lib/filters'
import type { EventRunner, Stage, StageCategory } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { useAppStore } from '~/store/app'

import KVRLogo from '~/assets/images/kvr-summit-logo.png'
import trailmanduLogo from '~/assets/images/logo.png'
import cloudImage from '~/assets/images/cloud.png'

definePageMeta({
    layout: 'simple'
})

const { genders } = storeToRefs(useAppStore())
const { axios } = useAxios()
const route = useRoute()

const runners = ref<EventRunner[]>([])
const stage = ref<Stage | null>(null)
const stageCategoryList = ref<StageCategory[]>([])
const selectGender = ref<string>('')
const selectStage = ref<StageCategory | null>(null)

const updatedRunners = computed(() => {
    return runners.value.sort((a, b) => {
        const alastCheckpoint = a.volunteer_on_checkpoints.find(checkpoint => checkpoint.checkpoint.is_end)
        const blastCheckpoint = b.volunteer_on_checkpoints.find(checkpoint => checkpoint.checkpoint.is_end)

        if (alastCheckpoint && blastCheckpoint)
            return moment(alastCheckpoint.timer).diff(moment(blastCheckpoint.timer))

        if (alastCheckpoint && !blastCheckpoint)
            return -1

        return 1
    })
})

const fetchStageCategory = async () => {
    const { data } = await axios.get(`/events/${route.params.stage_id as string}/stage_categories`)
    stageCategoryList.value = data
}

const fetchStage = async () => {
    const { data } = await axios.get<Stage>(`/events/stages/${route.params.stage_id as string}`)
    stage.value = data

    useSeoMeta({
        title: `${data.name} :: Result`,
        description: data.description,
        ogTitle: data.name,
        ogDescription: data.description,
        ogImage: showImage(data.thumbnail?.file_name),
    })
}

const fetchRunnerList = async () => {
    if (!selectGender.value && selectStage.value) return

    const { data } = await axios.get(`/events/${route.params.id as string}/${route.params.stage_id as string}/runners`, {
        params: {
            s: '',
            gender: selectGender.value,
            stage_category: selectStage.value?.id
        }
    })
    runners.value = data
}

watch([selectGender, selectStage], fetchRunnerList)
onBeforeMount(() => Promise.all([fetchStageCategory(), fetchStage()]))
</script>

<template>
    <section class="bg-black bg-repeat text-white pb-12 w-full min-h-screen relative z-[1]">
        <ClientOnly>
            <div :style="{
                backgroundImage: `url(${cloudImage})`,
                backgroundRepeat: 'repeat',
                opacity: 0.1,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1
            }" />
        </ClientOnly>
        <header class="py-12 relative">
            <strong
                class="block block--left text-lg [--block-bg:var(--color-yellow-400)] [--block-color:var(--color-black)]"
                v-if="selectStage">
                {{ selectStage?.name }}
            </strong>
            <strong
                class="block block--left [--block-bg:var(--color-blue-400)] [--block-color:var(--color-white)] translate-y-full">Chandragiri</strong>
            <time :datetime="selectStage?.start"
                class="block block--right text-lg [--block-bg:var(--color-yellow-400)] [--block-color:var(--color-black)]"
                v-if="selectStage">
                {{ formatDate(selectStage?.start as string, 'MMM D, YYYY') }}
            </time>
            <span
                class="font-bold block block--right translate-y-full  [--block-bg:var(--color-blue-400)] [--block-color:var(--color-white)]">#KVRSUMMITCHALLENGE</span>
            <div class="container space-y-3">
                <h1 class="text-4xl uppercase font-bold text-center">Kathmandu's ultimate five summit challenge</h1>
                <div class="w-[280px] mx-auto">
                    <img :src="KVRLogo" alt="Kathmandu's ultimate five summit challenge">
                </div>
                <div class="flex justify-center gap-4 mb-4">
                    <Select v-model="selectStage">
                        <SelectTrigger>
                            Stage:
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="stageCategory in stageCategoryList" :key="stageCategory.id"
                                :value="stageCategory">{{ stageCategory.name }}</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select v-model="selectGender">
                        <SelectTrigger>
                            Gender:
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="gender in genders" :value="gender.id">{{ gender.name }}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </header>
        <div class="container">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>BIB</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Country</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(runner, index) in updatedRunners" :key="runner.id">
                        <TableCell>{{ index + 1 }}</TableCell>
                        <TableCell>{{ runner.bib }}</TableCell>
                        <TableCell>
                            {{ runner.personal.first_name }}
                            {{ runner.personal.middle_name }}
                            {{ runner.personal.last_name }}
                        </TableCell>
                        <TableCell>{{ runner.personal.gender.name }}</TableCell>
                        <TableCell>{{ runner.personal.country.name }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        <footer class="text-center py-12">
            <div class="w-[200px] mx-auto">
                <img :src="trailmanduLogo" alt="Trailmandu Nepal">
            </div>
        </footer>
    </section>
</template>

<style scoped>
.block {
    background: var(--block-bg);
    color: var(--block-color);
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    min-height: 40px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    &::after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
    }
}

.block--left {
    left: 0;

    &:after {
        left: 100%;
        border-style: solid;
        border-width: 40px 0 0 15px;
        border-color: transparent transparent transparent var(--block-bg);
    }
}

.block--right {
    right: 0;

    &:after {
        right: 100%;
        border-style: solid;
        border-width: 40px 15px 0 0;
        border-color: transparent var(--block-bg) transparent;
    }
}
</style>