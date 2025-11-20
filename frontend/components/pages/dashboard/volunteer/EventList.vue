<script lang="ts" setup>
    import { RefreshCcwIcon } from 'lucide-vue-next'
    import moment from 'moment'
    import type { Stage } from '~/lib/types'
    import { useAxios } from '~/services/axios'

    const { axios } = useAxios()

    const stages = ref<Stage[]>([])
    const isLoading = ref(false)

    const fetch = async () => {
        isLoading.value = true
        const { data } = await axios.get<Stage[]>('/volunteers/trail_events')

        stages.value = data
        isLoading.value = false
    }

    onMounted(() => {
        fetch()
    })
</script>

<template>
    <section class="w-full space-y-4">
        <header class="flex items-center gap-2 pb-4 border-b border-primary">
            <div class="grow">
                <h1 class="text-3xl text-secondary">Current events</h1>
            </div>
            <Button @click="fetch" variant="secondary" modifier="link" :disabled="isLoading">
                <RefreshCcwIcon :class="{ 'animate-spin': isLoading }" />
                fetch
            </Button>
        </header>
        <div class="space-y-2">
            <div v-for="stage of stages">
                <h2 class="text-xl text-gray-600">
                    <NuxtLink :to="`/dashboard/volunteer/checkpoint/${stage.id}`">{{ stage.event.name }}</NuxtLink>
                </h2>
                <em class="not-italic">Starts {{ moment(stage.event.start).fromNow() }}</em>
            </div>
        </div>
    </section>
</template>