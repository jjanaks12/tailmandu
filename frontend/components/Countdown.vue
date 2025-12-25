<script setup lang="ts">
import { onMounted, ref } from 'vue'
import moment from 'moment'
import momentTZ from 'moment-timezone'
import { pad } from '~/lib/filters'

interface CountdownProps {
    date: string
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
    const lastDate = momentTZ.tz(props.date, momentTZ.tz.guess())

    if (lastDate.diff(today, 'seconds') <= 0)
        return

    day.value = lastDate.diff(today, 'days')
    let dayTimer = setInterval(() => {
        if (day.value == 0)
            day.value = 30

        day.value--
        if (day.value == 0 && hour.value == 0 && minute.value == 0 && second.value == 0)
            clearInterval(dayTimer)
    }, (1000 * 60 * 60))

    const h = lastDate.diff(today, 'hours')
    hour.value = h > 0 ? h % 24 : 0
    let hourTimer = setInterval(() => {
        if (hour.value == 0)
            hour.value = 60

        hour.value--
        if (day.value == 0 && hour.value == 0 && minute.value == 0 && second.value == 0)
            clearInterval(hourTimer)
    }, (1000 * 60 * 60))

    const m = lastDate.diff(today, 'minutes')
    minute.value = m > 0 ? m % 60 : 0
    let minuteTimer = setInterval(() => {
        if (minute.value == 0)
            minute.value = 60

        minute.value--
        if (day.value == 0 && hour.value == 0 && minute.value == 0 && second.value == 0)
            clearInterval(minuteTimer)
    }, (1000 * 60))

    const s = lastDate.diff(today, 'seconds')
    second.value = s > 0 ? s % 60 : 0
    let secondTimer = setInterval(() => {
        if (second.value == 0)
            second.value = 60

        second.value--
        if (day.value == 0 && hour.value == 0 && minute.value == 0 && second.value == 0)
            clearInterval(secondTimer)
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
    max-width: 500px;
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