<script lang="ts" setup>
import { CommandIcon, XIcon } from 'lucide-vue-next'
import moment from 'moment'
import type { Checkpoint, StageCategory, Volunteer, VolunteerCheckpoint } from '~/lib/types'
import { useAxios } from '~/services/axios'

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    role: 'Checkpoint Manager',
    authorization: ['timer_create', 'timer_edit', 'timer_view', 'timer_delete']
})

useTitle('Checkpoint Entry')

const route = useRoute()
const { axios } = useAxios()

const selectedCheckpoint = ref<Checkpoint | null>(null)
const searchText = ref('')
const entryList = ref<VolunteerCheckpoint[]>([])
const stageCategories = ref<StageCategory[]>([])
const volunteer = ref<Volunteer | null>(null)

const runners = computed(() => stageCategories.value.find(category => category.id === selectedCheckpoint.value?.stage_category_id)?.runners ?? [])
const filteredList = computed(() => runners.value.filter(runner => runner.bib.includes(searchText.value)))
const recordedRunner = computed(() => entryList.value.filter(entry => entry.timer).length)
const remainingRunners = computed(() => Math.max(0, runners.value.length - recordedRunner.value))
const hasEventStarted = computed(() => stageCategories.value[0]?.start ? moment().isAfter(moment.utc(stageCategories.value[0]?.start)) : false)

const getVolunteerCheckpoints = async () => {
    const { data } = await axios.get(`/volunteers/checkpoints`)
    volunteer.value = data
}

const fetchCheckpointRegister = async () => {
    if (selectedCheckpoint.value) {
        const { data } = await axios.get(`/volunteers/checkpoints/${selectedCheckpoint.value.id}/entry`)
        entryList.value = data
    }
}
const fetch = async () => {
    const { data } = await axios.get<StageCategory[]>(`/events/stages/${route.params.stage_id}/runners`)
    stageCategories.value = data
}
const findEntry = (runner_id: string) => entryList.value.find(entry => entry.runner_id === runner_id) ?? null

const reset = () => {
    searchText.value = ''
}

watch(selectedCheckpoint, fetchCheckpointRegister)

onKeyStroke(['command', '/'], () => {
    nextTick(() => {
        (document.querySelector('.search-input') as HTMLInputElement)?.focus()
    })
})

onMounted(() => {
    Promise.all([
        fetch(),
        getVolunteerCheckpoints(),
    ])
})
</script>

<template>
    <div class="space-y-8 relative">
        <Button @click="fetch">fetch</Button>
        <div class="bg-white py-3 space-y-2 sticky top-[83px] z-10">
            <h2>Filters:</h2>
            <Badge variant="outline" v-if="selectedCheckpoint">
                {{ selectedCheckpoint.name }}
                (total: {{ runners.length }})
                (recorded: {{ recordedRunner }})
                (remaining: {{ remainingRunners }})
            </Badge>
            <div class="flex flex-col md:flex-row items-end gap-3">
                <Select v-model="selectedCheckpoint">
                    <SelectTrigger class="w-full" size="sm">
                        <SelectValue placeholder="Select a checkpoint" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="checkpoint in volunteer?.checkpoints" :value="checkpoint"
                            :key="checkpoint.id">
                            {{ checkpoint.name }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <InputGroup>
                    <InputGroupInput class="search-input" v-model="searchText" placeholder="Search by BIB here..." />
                    <InputGroupAddon align="inline-end" class="text-gray-300">
                        <CommandIcon /> + /
                    </InputGroupAddon>
                </InputGroup>
                <Button type="button" variant="destructive" modifier="outline" size="icon" @click="reset">
                    <XIcon />
                </Button>
            </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8"
            v-if="filteredList.length > 0 && selectedCheckpoint">
            <PagesDashboardVolunteerRunner v-for="runner in filteredList" :key="runner.id"
                :timer="findEntry(runner.id)?.timer" :runner="runner" :checkpoint-id="selectedCheckpoint.id"
                @update="fetchCheckpointRegister" :enabled="hasEventStarted" @fetch="fetch" />
        </div>
    </div>
</template>