<script lang="ts" setup>
import moment from 'moment'
import { abbr, showImage } from '~/lib/filters'
import type { EventRunner } from '~/lib/types'
import { useAxios } from '~/services/axios'

interface VolunteerRunnerProps {
    runner: EventRunner
    timer?: string
    checkpointId: string
    enabled: boolean
}

const emit = defineEmits(['update', 'fetch'])
const props = defineProps<VolunteerRunnerProps>()
const { axios } = useAxios()

const showDidnotfinishedDialog = ref(false)

const fullName = computed(() => [props.runner.personal.first_name, props.runner.personal.middle_name, props.runner.personal.last_name].join(' '))

const logTimer = async () => {
    if (props.timer == undefined) {
        await axios.post(`/volunteers/${props.checkpointId}/log_timer/${props.runner.id}`, {
            stage_category_id: props.runner.stage_category_id
        })
        emit('update')
    }
}

const didNotFinishRunner = async () => {
    await axios.put(`/runners/${props.runner.id}/did-not-finish`, {
        checkpoint_id: props.checkpointId
    })
    emit('fetch')
    showDidnotfinishedDialog.value = false
}
</script>

<template>
    <div class="text-center space-y-2">
        <Avatar
            :class="{ 'size-[120px] mx-auto border-4': true, 'border-primary': timer == undefined, 'border-secondary': timer !== undefined }"
            @dblclick="logTimer">
            <AvatarImage :src="showImage(runner.personal?.avatar?.file_name)" :alt="runner.personal.first_name" />
            <AvatarFallback>{{ abbr(fullName.toUpperCase()) }}</AvatarFallback>
        </Avatar>
        <strong class="block">{{ fullName }}</strong>
        <em class="not-italic text-3xl text-black block">{{ runner.bib }}</em>
        <span class="block" v-if="timer">{{ moment(timer).format('YYYY-MM-DD HH:mm:ss') }}</span>
        <span :class="{ 'flag': true, ['flag-' + runner.personal.country.abbr]: true }"></span><br />
        {{ runner.status }}
        <Button variant="destructive" @click="showDidnotfinishedDialog = true" v-if="!runner.status">
            Did not finished
        </Button>
    </div>
    <AlertDialog :open="showDidnotfinishedDialog">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    Runner will be marked as did not finished and will be out of the race.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click="showDidnotfinishedDialog = false">No, Cancel</AlertDialogCancel>
                <AlertDialogAction @click="didNotFinishRunner">Yes, Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>