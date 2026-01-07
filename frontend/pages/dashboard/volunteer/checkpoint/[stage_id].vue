<script lang="ts" setup>
import { CommandIcon, XIcon } from 'lucide-vue-next'
import type { Checkpoint, EventRunner, StageCategory, Volunteer, VolunteerCheckpoint } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { onKeyStroke } from '@vueuse/core'

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    role: 'Checkpoint Manager',
    authorization: ['timer_create', 'timer_edit', 'timer_view', 'timer_delete']
})

const route = useRoute()
const { axios } = useAxios()

const selectedCheckpoint = ref<Checkpoint | null>(null)
const searchText = ref('')
const entryList = ref<VolunteerCheckpoint[]>([])
const stageCategories = ref<StageCategory[]>([])
const volunteer = ref<Volunteer | null>(null)
const runners = ref<EventRunner[]>([])

const filteredList = computed(() => runners.value.filter(runner => runner.bib.includes(searchText.value)))

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
    runners.value = data.map(category => category.runners).flat()
}
const findEntry = (runner_id: string) => entryList.value.find(entry => entry.runner_id === runner_id) ?? null

watch(selectedCheckpoint, () => Promise.all([fetchCheckpointRegister(), fetch()]))

onKeyStroke(['command', '/'], () => {
    nextTick(() => {
        (document.querySelector('.search-input') as HTMLInputElement)?.focus()
    })
})

onMounted(() => {
    Promise.all([
        fetch(),
        getVolunteerCheckpoints()
    ])
})
</script>

<template>
    <div class="space-y-8">
        <div class="space-y-2">
            <h2>Filters:</h2>
            <Badge variant="outline" v-if="selectedCheckpoint">
                {{ selectedCheckpoint.name }}
                (total: {{ runners.length }})
                (remaining: {{runners.length - (entryList.filter(entry => entry.timer !==
                    null).length)}})
            </Badge>
            <div class="flex items-end gap-3">
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
                <Button variant="destructive" modifier="outline" size="icon">
                    <XIcon />
                </Button>
            </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
            v-if="filteredList.length > 0 && selectedCheckpoint">
            <PagesDashboardVolunteerRunner v-for="runner in runners" :key="runner.id"
                :timer="findEntry(runner.id)?.timer" :runner="runner" :checkpoint-id="selectedCheckpoint.id"
                @update="fetchCheckpointRegister" />
        </div>
    </div>
</template>