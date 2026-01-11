<script lang="ts" setup>
import { MapIcon } from 'lucide-vue-next'
import { getGPXFile, showImage } from '~/lib/filters'
import type { Stage } from '~/lib/types'
import { useAxios } from '~/services/axios'
import img01 from '@/assets/images/img01.png'
import img02 from '@/assets/images/img02.jpg'
import moment from 'moment'
import momentTimezone from 'moment-timezone'

const route = useRoute()
const { axios } = useAxios()

const stage = ref<Stage | null>(null)

const init = async () => {
    const { data } = await axios.get<Stage>(`/events/stages/${route.params.id as string}`)
    stage.value = data

    useTitle(data.name)
    useSeoMeta({
        title: stage.value.name,
        ogTitle: stage.value.name,
        description: stage.value.excerpt,
        ogDescription: stage.value.excerpt,
        ogImage: showImage(stage.value.thumbnail?.file_name as string)
    })
}

const starts = computed(() => stage.value?.stage_categories
    .map(category => category.start)
    .map(date => momentTimezone.tz(date, momentTimezone.tz.guess()))
    .sort((a, b) => a.valueOf() - b.valueOf())
)

const ends = computed(() => stage.value?.stage_categories
    .map(category => category.end)
    .map(date => momentTimezone.tz(date, momentTimezone.tz.guess()))
    .sort((a, b) => b.valueOf() - a.valueOf())[0]
)

const hasEnded = computed(() => momentTimezone.tz(momentTimezone.tz.guess()).isAfter((ends.value)?.endOf('day')))
const hasStarted = computed(() => momentTimezone.tz(momentTimezone.tz.guess()).isBefore(starts.value?.[0]))

onBeforeMount(init)
</script>

<template>
    <template v-if="stage">
        <figure class="lg:h-[calc(100vh-82px)] overflow-hidden">
            <img :src="showImage(stage?.thumbnail.file_name as string)" :alt="stage.name"
                class="w-full h-full object-cover">
        </figure>
        <div class="text-[#13304a] container py-[40px] md:py-[80px]">
            <div class="space-y-4 mb-6">
                <div class="space-y-4" v-for="stageCategory in stage.stage_categories">
                    <strong class="block">Overview: {{ stageCategory.name }}</strong>
                    <div class="leading-7 content_editor" v-html="stageCategory.description" />
                </div>
            </div>
            <div class="mb-6 leading-7 content_editor" v-html="stage.description" />
            <NuxtLink
                :to="{ name: 'races-slug-runner', params: { slug: stage.event.slug }, query: { stage_id: stage.id } }"
                v-if="!hasEnded" as-child>
                <Button type="button" variant="secondary">Register for race</Button>
            </NuxtLink>
        </div>
        <section class="bg-gray-200 relative overflow-hidden z-[1]">
            <!-- <figure class="absolute inset-0 z-[-1]">
                <img :src="bg01" />
            </figure> -->
            <div class="container text-[#13304a] py-[100px]">
                <ul
                    class="flex flex-col md:flex-row justify-between gap-4 lg:gap-12 [&>li>strong]:block [&>li>strong]:text-[25px] [&>li>em]:not-italic [&>li>em]:text-[25px] md:[&>li>em]:text-[40px]">
                    <li>
                        <strong>Total Distance</strong>
                        <em>25KM +</em>
                    </li>
                    <li>
                        <strong>Date</strong>
                        <em>{{ moment.utc(starts?.[0]).format('MMM-DD') }}</em>
                    </li>
                    <li>
                        <strong>Elevation</strong>
                        <em>1500m+</em>
                    </li>
                    <li>
                        <strong>Grade</strong>
                        <em>Challenging</em>
                    </li>
                </ul>
            </div>
        </section>
        <div class="container py-[80px]">
            <div class="text-[#13304a] flex flex-col md:flex-row gap-4">
                <div class="md:w-3/5">
                    <div class="mb-6 leading-7 content_editor" v-html="stage.event.description" />
                    <div class="flex items-center gap-1 mb-2" v-for="category of stage.stage_categories">
                        <strong>{{ category.name }} GPX file: </strong>
                        <NuxtLink :to="getGPXFile(category.map_file.file_name as string)">
                            <Button type="button" variant="secondary" class="rounded-full" modifier="outline">
                                <MapIcon />
                                Download GPX
                            </Button>
                        </NuxtLink>
                    </div>
                </div>
                <div class="md:w-2/5">
                    <figure class="rounded-sm overflow-hidden mb-5">
                        <img :src="img01">
                    </figure>
                    <strong class="uppercase tracking-wide text-3xl leading-10 block mb-5">
                        If you are an Elite Athlete, please register for free.
                    </strong>
                    <p class="text-gray-500 mb-1">Eligibility for elite athletes is as follows:</p>
                    <ul class="space-y-3 pb-10 mb-10 border-b-4 border-secondary">
                        <li>Men’s Category: Minimum 750 ITRA points</li>
                        <li>Women’s Category: Minimum 600 ITRA points</li>
                        <li>Please make sure to upload your ITRA profile link in the payment section.</li>
                    </ul>
                    <strong class="tracking-wide text-xl block mb-5">
                        #3 Result will be updated here after the race.
                    </strong>
                </div>
            </div>
        </div>
        <section class="relative z-0 overflow-hidden">
            <figure class="absolute inset-0 -z-[-1]">
                <img :src="img02" class="w-full h-full object-cover">
            </figure>
            <div class="text-white text-center grid place-items-center min-h-[620px] z-[1] relative">
                <div class="container">
                    <template v-if="starts && hasStarted">
                        <Countdown :date="starts?.[0]?.toISOString()" class="mb-3">
                            <em class="not-italic block">Registration opened</em>
                        </Countdown>
                        <NuxtLink
                            :to="{ name: 'races-slug-runner', params: { slug: stage.event.slug }, query: { stage_id: stage.id } }"
                            as-child>
                            <Button type="button" variant="secondary" size="lg" class="w-[200px] rounded-full">
                                Register now
                            </Button>
                        </NuxtLink>
                    </template>
                    <div class="space-y-4" v-else>
                        <strong class="font-normal text-5xl block">Registration closed</strong>
                        <Button as-child>
                            <NuxtLink
                                :to="{ name: 'races-id-stage-stage_id-result', params: { id: stage.event.id, stage_id: stage.id } }">
                                view results
                            </NuxtLink>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    </template>
    <span v-else>loading...</span>
</template>