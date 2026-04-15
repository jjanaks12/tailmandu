<script lang="ts" setup>
import { BarController, BarElement, CategoryScale, Chart, LinearScale, Tooltip } from 'chart.js'
import { XIcon } from 'lucide-vue-next';
import { useEventStore } from '~/store/event';

interface Props {
    runners: any
}

const props = defineProps<Props>()
let chart: Chart
const runnerChart = useTemplateRef('runner-chart')
const { events } = storeToRefs(useEventStore())

const selectedYear = defineModel('year', {
    default: ''
})
const selectedEvent = defineModel('event', {
    default: ''
})

const initRunnerChart = () => {
    Chart.register([BarElement, BarController, CategoryScale, LinearScale, Tooltip])

    if (!runnerChart.value)
        return

    if (!chart)
        chart = new Chart(runnerChart.value, {
            type: 'bar',
            data: {
                labels: Object.keys(props.runners ?? {}),
                datasets: [
                    {
                        label: 'Total',
                        data: Object.values(props.runners ?? {}).map((stat: any) => Object.values(stat).reduce((acc: number, key) => acc + Number(key), 0)),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                hover: {
                    mode: 'index',
                    intersect: false
                }
            }
        })
    else {
        chart.data.datasets[0].data = Object.values(props.runners ?? {}).map((stat: any) => Object.values(stat).reduce((acc: number, key) => acc + Number(key), 0))
        chart.update()
    }
}

watch(props, () => {
    selectedYear.value = Object.keys(props.runners)[0]
    initRunnerChart()
}, { deep: true })
</script>

<template>
    <div class="w-full flex flex-col items-end gap-4">
        <!-- <Select v-model="selectedYear">
            <SelectTrigger>
                <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="year in Object.keys(runners)" :value="year">{{ year }}</SelectItem>
            </SelectContent>
        </Select> -->
        <div class="flex gap-2 items-center justify-end">
            <Select v-model="selectedEvent">
                <SelectTrigger>
                    <SelectValue placeholder="Select a event" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="event in events" :value="event.id">{{ event.name }}</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" @click="selectedEvent = ''">
                <XIcon />
            </Button>
        </div>
        <canvas ref="runner-chart" />
    </div>
</template>