<script lang="ts" setup>
import moment from 'moment'
import { formatDate, showImage } from '~/lib/filters'
import type { EventRunner, Stage, StageCategory } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { useAppStore } from '~/store/app'

import KVRLogo from '~/assets/images/kvr-summit-logo.png'
import trailmanduLogo from '~/assets/images/logo.png'
import { LoaderIcon, XIcon } from 'lucide-vue-next'
import { getDuration, sortRunner } from '~/lib/filters/runner'

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
const isLoading = ref(false)
const searchText = ref('')

const updatedRunners = computed(() => sortRunner(runners.value))
const filteredRunners = computed(() => updatedRunners.value.filter((runner) =>
    (runner.personal.first_name || '').toLowerCase().includes(searchText.value.toLowerCase())
    || (runner.personal.last_name || '').toLowerCase().includes(searchText.value.toLowerCase())
    || runner.bib.toString().includes(searchText.value))
)

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
    if (!selectStage.value) return

    isLoading.value = true
    const { data } = await axios.get(`/events/${route.params.id as string}/${route.params.stage_id as string}/runners`, {
        params: {
            s: '',
            gender: selectGender.value ? selectGender.value : undefined,
            stage_category: selectStage.value?.id
        }
    })
    runners.value = data
    isLoading.value = false
}

watch([selectGender, selectStage], fetchRunnerList)
onBeforeMount(() => Promise.all([fetchStageCategory(), fetchStage()]))
</script>

<template>
    <section class="result__section bg-black bg-repeat text-white pb-12 w-full min-h-screen relative z-[1]">
        <header class="pt-12 pb-20 relative">
            <strong class="block block--left [--block-bg:var(--color-yellow-400)] [--block-color:var(--color-black)]"
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
                <div class="logo w-[280px] mx-auto">
                    <img :src="KVRLogo" alt="Kathmandu's ultimate five summit challenge">
                </div>
                <div class="flex items-center justify-center gap-4 mb-4">
                    <LoaderIcon class="animate-spin" v-show="isLoading" />
                    <Input v-model="searchText" placeholder="Search" />
                    <Select v-model="selectStage">
                        <SelectTrigger>
                            Distance:
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
                    <Button @click="selectGender = ''" modifier="link" size="sm" v-if="selectGender">
                        <XIcon />
                    </Button>
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
                        <TableHead>Timing</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(runner, index) in filteredRunners" :key="runner.id">
                        <TableCell>{{ index + 1 }}</TableCell>
                        <TableCell>{{ runner.bib }}</TableCell>
                        <TableCell>
                            {{ runner.personal.first_name }}
                            {{ runner.personal.middle_name }}
                            {{ runner.personal.last_name }}
                        </TableCell>
                        <TableCell>{{ runner.personal.gender.name }}</TableCell>
                        <TableCell>{{ runner.personal.country.name }}</TableCell>
                        <TableCell>
                            {{ ['DISQUALIFIED', 'DID_NOT_FINISH'].includes(runner?.status?.status)
                                ? runner?.status?.status
                                : runner.volunteer_on_checkpoints.length > 0
                                    ? runner.volunteer_on_checkpoints[0].checkpoint.is_end
                                        ? getDuration(runner.volunteer_on_checkpoints[0]?.timer, selectStage?.start as string)
                                        : ''
                                    : 'N/A' }}
                        </TableCell>
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
@font-face {
    font-family: 'rockwell_extra_boldregular';
    src: url('/fonts/rockwell_extra_bold_regular.woff2') format('woff2'),
        url('/fonts/rockwell_extra_bold_regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

.result__section {
    background: url('@/assets/images/result-bg.png');

    h1 {
        color: #000;
        font: 32px/1.1 'rockwell_extra_boldregular', sans-serif;
        margin-bottom: 90px;

        @media screen and (min-width: 768px) {
            font-size: 39px;
        }
    }

    header {
        background: url('@/assets/images/result-top-bg.png') repeat-x;
        background-size: auto 280px;

        @media screen and (min-width: 768px) {
            background-size: auto 160px;
        }

        .container {
            padding-bottom: 40px;

            @media screen and (min-width: 768px) {
                padding-bottom: 0;
            }
        }
    }
}

.logo {
    position: relative;

    &::before,
    &::after {
        width: 249px;
        height: 119px;
        position: absolute;
        top: 50%;

        @media screen and (min-width: 768px) {
            content: '';
        }
    }

    &::before {
        background: url('@/assets/images/result-cloud.png');
        right: 100%;
        transform: translateY(-50%) rotateY(180deg);
    }

    &::after {
        background: url('@/assets/images/result-cloud.png');
        left: 100%;
        transform: translateY(-50%);
    }
}

.block {
    background: var(--block-bg);
    color: var(--block-color);
    font-weight: 700;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    min-height: 40px;
    position: absolute;
    bottom: 0;
    transform: translateY(-100%);

    @media screen and (min-width: 768px) {
        font-size: 16px;
    }

    @media screen and (min-width: 1440px) {
        top: 50%;
        bottom: auto;
        transform: translateY(-50%);
    }

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