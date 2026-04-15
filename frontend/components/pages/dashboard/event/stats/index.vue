<script lang="ts" setup>
import moment from 'moment'
import { useAxios } from '~/services/axios'

const { axios } = useAxios()

const selectedYear = ref(moment().format('YYYY'))
const selectedEvent = ref('')
const stats = ref<{
    runners: Record<string, Record<string, number>>,
    total_volunteers: number,
    total_checkpoints: number,
    total_stages: number,
}>({
    runners: {},
    total_volunteers: 0,
    total_checkpoints: 0,
    total_stages: 0,
})

const total_runners = computed(() => Object.keys(stats.value.runners).reduce((acc: any, month: string) => acc + Object.values(stats.value.runners[month]).reduce((a: number, val: number) => a + val, 0), 0))

const fetch = async () => {
    const { data: { runners, total_volunteers, total_checkpoints, total_stages } } = await axios.get('/events/stats', {
        params: {
            year: selectedYear.value,
            event_id: selectedEvent.value
        }
    })

    stats.value = { runners: runners, total_volunteers, total_checkpoints, total_stages }
}

const init = async () => {
    await fetch()
}

watch(selectedEvent, fetch)
watch(selectedYear, fetch)
onMounted(init)
</script>

<template>
    <!-- <Button @click="fetch">fetch</Button> -->
    <div class="w-full grid grid-cols-4 gap-4">
        <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="text-sm uppercase">Total Runners</h3>
            <p class="text-black text-4xl font-bold">{{ total_runners }}</p>
        </div>
        <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="text-sm uppercase">Total Volunteers</h3>
            <p class="text-black text-4xl font-bold">{{ stats.total_volunteers }}</p>
        </div>
        <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="text-sm uppercase">Total Checkpoints</h3>
            <p class="text-black text-4xl font-bold">{{ stats.total_checkpoints }}</p>
        </div>
        <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="text-sm uppercase">Total Stages</h3>
            <p class="text-black text-4xl font-bold">{{ stats.total_stages }}</p>
        </div>
    </div>
    <PagesDashboardEventStatsRunner :runners="stats.runners" v-model:year="selectedYear"
        v-model:event="selectedEvent" />
</template>