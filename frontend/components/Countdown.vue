<script setup lang="ts">
import { onMounted, ref } from 'vue'
import moment from 'moment'
import { pad } from '~/lib/filters'

interface CountdownProps {
    date: moment.Moment
}

const props = defineProps<CountdownProps>()
const slots = useSlots()

const tileCount = ref(0)

const day = ref(0)
const hour = ref(0)
const minute = ref(0)
const second = ref(0)

onMounted(() => {
    const today = moment()
    const lastDate = props.date

    if (lastDate.diff(today) < 0)
        return

    day.value = (today.diff(lastDate, 'days') * -1)
    setInterval(() => {
        if (day.value == 0)
            day.value = 30

        day.value--
    }, (1000 * 60 * 60))

    hour.value = (today.diff(lastDate, 'hours') * -1) % 24
    setInterval(() => {
        if (hour.value == 0)
            hour.value = 60

        hour.value--
    }, (1000 * 60 * 60))

    minute.value = (today.diff(lastDate, 'minutes') * -1) % 60
    setInterval(() => {
        if (minute.value == 0)
            minute.value = 60

        minute.value--
    }, (1000 * 60))

    second.value = (today.diff(lastDate, 'seconds') * -1) % 60
    setInterval(() => {
        if (second.value == 0)
            second.value = 60

        second.value--
    }, (1000))
})

onMounted(() => {
    const holder = document.querySelectorAll('.countdown__holder .countdown__tile')

    tileCount.value = holder?.length ?? 1
})
</script>

<template>
    <div class="countdown">
        <div class="text" v-if="slots.default">
            <slot />
        </div>
        <div class="countdown__holder">
            <div class="countdown__tile" v-if="day > 0">
                <span v-for="(d, index) in pad(day.toString(), 2).split('')" :key="'day_' + index">
                    {{ d }}
                </span>
                <em>day{{ day > 1 ? 's' : '' }}</em>
            </div>
            <div class="countdown__tile">
                <span v-for="(h, index) in pad(hour.toString(), 2).split('')" :key="'hour_' + index">
                    {{ h }}
                </span>
                <em>hour{{ hour > 1 ? 's' : '' }}</em>
            </div>
            <div class="countdown__tile">
                <span v-for="(m, index) in pad(minute.toString(), 2).toString().split('')" :key="'minute_' + index">
                    {{ m }}
                </span>
                <em>min{{ minute > 1 ? 's' : '' }}</em>
            </div>
            <div class="countdown__tile">
                <span v-for="(s, index) in pad(second.toString(), 2).toString().split('')" :key="'second_' + index">
                    {{ s }}
                </span>
                <em>sec{{ second > 1 ? 's' : '' }}</em>
            </div>
        </div>
    </div>
</template>

<style scoped>
em {
    font-style: normal;
}

.countdown {
    width: 500px;
    margin-left: auto;
    margin-right: auto;
}

.countdown__holder {
    display: flex;
}

.countdown__tile {
    flex: calc(100% / v-bind(tileCount));
    text-align: center;
    display: flex;
    justify-content: end;
    align-items: end;
    flex-wrap: wrap;
    gap: 4px;

    +.countdown__tile::before {
        content: ':';
        align-self: start;
        padding-top: 20px;
    }

    span {
        flex: calc(50% - 8px) 0 0;
        font-size: 40px;
        border: 1px solid #aeaeae;
        border-radius: 4px;
    }

    em {
        flex: 100% 0 0;
    }
}
</style>