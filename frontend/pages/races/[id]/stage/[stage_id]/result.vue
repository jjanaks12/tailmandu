<script lang="ts" setup>
import moment from 'moment'
import type { EventRunner, Stage, StageCategory } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { useAppStore } from '~/store/app'

const { genders } = storeToRefs(useAppStore())
const { axios } = useAxios()
const route = useRoute()

const runners = ref<EventRunner[]>([])
const stageCategoryList = ref<StageCategory[]>([])
const selectGender = ref<string>('')
const selectStage = ref<string>('')

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

const fetchRunnerList = async () => {
    if (!selectGender.value && selectStage.value) return

    const { data } = await axios.get(`/events/${route.params.id as string}/${route.params.stage_id as string}/runners`, {
        params: {
            s: '',
            gender: selectGender.value,
            stage_category: selectStage.value
        }
    })
    runners.value = data
}

watch([selectGender, selectStage], fetchRunnerList)
onMounted(fetchStageCategory)
</script>

<template>
    <div class="container">
        <div class="py-12 space-y-3">
            <h1 class="text-4xl font-bold text-center">Kathmandu's ultimate five summit challenge</h1>
            <div class="flex justify-center gap-4 mb-4">
                <Select v-model="selectStage">
                    <SelectTrigger>
                        Stage:
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="stageCategory in stageCategoryList" :key="stageCategory.id"
                            :value="stageCategory.id">{{ stageCategory.name }}</SelectItem>
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
</template>