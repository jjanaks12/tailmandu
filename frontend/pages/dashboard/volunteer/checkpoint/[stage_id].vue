<script lang="ts" setup>
    import type { Checkpoint, EventRunner, VolunteerCheckpoint } from '~/lib/types'
    import { useAxios } from '~/services/axios'
    import { useAuthStore } from '~/store/auth'

    useHead({
        title: 'Volunteer'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        role: 'Checkpoint Manager',
        authorization: ['timer_create', 'timer_update', 'timer_view', 'timer_delete']
    })

    const runners = ref<EventRunner[]>([])
    const entryList = ref<VolunteerCheckpoint[]>([])
    const { axios } = useAxios()
    const route = useRoute()
    const { user } = storeToRefs(useAuthStore())

    const checkpoint = computed(() => {
        let foundCheckpoint: Checkpoint | null = null
        for (const volunteer of (user.value?.personal?.volunteers ?? [])) {
            for (const checkpoint of volunteer.checkpoints) {
                if (checkpoint.stage_id == route.params.stage_id)
                    foundCheckpoint = checkpoint
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
        const { data } = await axios.get<EventRunner[]>(`/events/stages/${route.params.stage_id}/runners`)
        runners.value = data

        fetchCheckpointRegister()
    }

    const findEntry = (runner_id: string) => entryList.value.find(entry => entry.runner_id === runner_id) ?? null

    onMounted(() => {
        fetch()
    })
</script>

<template>
    <Button @click="fetch">fetch</Button>
    <div class="flex gap-4">
        <PagesDashboardVolunteerRunner :timer="findEntry(runner.id)?.timer"
            :stage-id="(route.params.stage_id as string)" :runner="runner" v-for="runner in runners" class="w-1/4"
            @update="fetchCheckpointRegister" />
    </div>
</template>