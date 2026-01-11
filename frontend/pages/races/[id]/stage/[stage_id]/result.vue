<script lang="ts" setup>
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

const fetchStageCategory = async () => {
    const { data } = await axios.get(`/events/${route.params.stage_id as string}/stage_categories`)
    stageCategoryList.value = data
}

const init = async () => {
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

watch([selectGender, selectStage], init)
onMounted(fetchStageCategory)
</script>

<template>
    <div class="container">
        <h1>Kathmandu's ultimate five summit challenge</h1>
        <div class="flex gap-4">
            <Select v-model="selectStage">
                <SelectTrigger>
                    <SelectValue placeholder="Select a stage" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="stageCategory in stageCategoryList" :key="stageCategory.id"
                        :value="stageCategory.id">{{ stageCategory.name }}</SelectItem>
                </SelectContent>
            </Select>
            <Select v-model="selectGender">
                <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="gender in genders" :value="gender.id">{{ gender.name }}</SelectItem>
                </SelectContent>
            </Select>
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
                <TableRow v-for="(runner, index) in runners" :key="runner.id">
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