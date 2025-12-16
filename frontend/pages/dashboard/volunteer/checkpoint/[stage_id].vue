<script lang="ts" setup>
import { RefreshCwIcon, TriangleAlertIcon } from 'lucide-vue-next'
import type { Checkpoint, EventRunner, StageCategory, VolunteerCheckpoint } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { useAuthStore } from '~/store/auth'

useHead({
    title: 'Volunteer'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    role: 'Checkpoint Manager',
    authorization: ['timer_create', 'timer_edit', 'timer_view', 'timer_delete']
})
const { axios } = useAxios()
const route = useRoute()
const { user } = storeToRefs(useAuthStore())

const runners = ref<EventRunner[]>([])
const entryList = ref<VolunteerCheckpoint[]>([])
const searchText = ref('')
const stageCategories = ref<StageCategory[]>([])

const checkpoint = computed(() => {
    let foundCheckpoint: Checkpoint | null = null
    for (const volunteer of (user.value?.personal?.volunteers ?? [])) {
        for (const c of volunteer.checkpoints) {
            if (c.stage_category.stage_id == route.params.stage_id)
                foundCheckpoint = c
        }
    }
    return foundCheckpoint
})

const fetchCheckpointRegister = async () => {
    if (checkpoint.value) {
        const { data } = await axios.get(`/volunteers/checkpoints/${checkpoint.value.id}/entry`)
        entryList.value = data
    }
}

const fetch = async () => {
    const { data } = await axios.get<StageCategory[]>(`/events/stages/${route.params.stage_id}/runners`)
    stageCategories.value = data
    runners.value = data.map(category => category.runners).flat()

    fetchCheckpointRegister()
}

const findEntry = (runner_id: string) => entryList.value.find(entry => entry.runner_id === runner_id) ?? null

const filteredList = computed(() => runners.value.filter(runner => runner.bib.includes(searchText.value)))

onMounted(() => {
    fetch()
})
</script>

<template>
    <div class="flex justify-end items-center gap-4 pb-4 mb-14 border-b">
        <Badge v-for="category in stageCategories" :key="category.id" variant="outline">
            {{ category.name }}
            (total: {{ category.runners.length }})
            (remaining: {{category.runners.length - (entryList.filter(entry => entry.timer !== null).length)}})
        </Badge>
        <Input v-model="searchText" placeholder="Search by BIB ID here..." class="max-w-[280px]" />
        <Button type="button" @click="fetch" size="icon" modifier="outline">
            <RefreshCwIcon />
        </Button>
    </div>
    <div class="flex gap-4" v-if="filteredList.length > 0">
        <template v-for="runner in filteredList">
            <PagesDashboardVolunteerRunner :timer="findEntry(runner.id)?.timer"
                :stage-id="(route.params.stage_id as string)" :runner="runner"
                v-if="checkpoint?.stage_category_id == runner.stage_category_id" class="w-1/2 md:w-1/3 lg:w-1/4"
                @update="fetchCheckpointRegister" />
        </template>
    </div>
    <template v-else>
        <Alert variant="info" v-if="searchText">
            <TriangleAlertIcon />
            <AlertTitle class="text-lg">No runners found!</AlertTitle>
            <AlertDescription>
                <p>Please check on your search, there might be some typo.</p>
            </AlertDescription>
        </Alert>
    </template>
</template>