<script lang="ts" setup>
    import moment from 'moment'
    import { abbr, showImage } from '~/lib/filters'
    import type { EventRunner } from '~/lib/types'
    import { useAxios } from '~/services/axios'

    interface VolunteerRunnerProps {
        runner: EventRunner
        timer?: string
        stageId: string
    }

    const emit = defineEmits(['update'])
    const props = defineProps<VolunteerRunnerProps>()
    const { axios } = useAxios()

    const fullName = computed(() => [props.runner.personal.first_name, props.runner.personal.middle_name, props.runner.personal.last_name].join(' '))

    const logTimer = async () => {
        if (props.timer == undefined) {
            await axios.post(`/volunteers/${props.stageId}/log_timer/${props.runner.id}`)
            emit('update')
        }
    }

</script>

<template>
    <div class="text-center space-y-2">
        <Avatar
            :class="{ 'size-[120px] mx-auto border-4': true, 'border-primary': timer == undefined, 'border-secondary': timer !== undefined }"
            @click="logTimer">
            <AvatarImage :src="showImage(runner.personal?.avatar?.file_name)" :alt="runner.personal.first_name" />
            <AvatarFallback>{{ abbr(fullName) }}</AvatarFallback>
        </Avatar>
        <strong class="block">{{ fullName }}</strong>
        <em class="not-italic text-3xl text-black block">{{ runner.bib }}</em>
        <span class="block" v-if="timer">{{ moment(timer).format('YYYY-MM-DD HH:mm:ss') }}</span>
        <span :class="{ 'flag': true, ['flag-' + runner.personal.country.abbr]: true }"></span>
    </div>
</template>