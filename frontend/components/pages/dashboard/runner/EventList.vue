<script lang="ts" setup>
import { RefreshCcwIcon } from 'lucide-vue-next'
import moment from 'moment'
import { formatDate } from '~/lib/filters'
import type { EventRunner } from '~/lib/types'
import { useAxios } from '~/services/axios'

const { axios } = useAxios()

const runners = ref<EventRunner[]>([])
const isLoading = ref(false)

const fetch = async () => {
    isLoading.value = true
    const { data } = await axios.get<EventRunner[]>('/runners')

    runners.value = data
    isLoading.value = false
}

onMounted(fetch)
</script>

<template>
    <section class="w-full space-y-4">
        <header class="flex items-center gap-2 pb-4 border-b border-primary">
            <div class="grow">
                <h1 class="text-3xl text-secondary">Your paticipation</h1>
            </div>
            <Button @click="fetch" variant="secondary" modifier="link" :disabled="isLoading">
                <RefreshCcwIcon :class="{ 'animate-spin': isLoading }" />
                fetch
            </Button>
        </header>
        <div class="space-y-2">
            <div class="flex items-center gap-1" v-for="runner in runners" :key="runner.id">
                <div class="grow space-y-2">
                    <em class="text-gray-300 not-italic block uppercase">BIB no.: {{ runner.bib }}</em>
                    <strong class="text-2xl text-gray-500 block">
                        <span class="font-normal">{{ runner.stage.name }}</span> : {{ runner.stage_category.name }}
                    </strong>
                    <time :datetime="formatDate(runner.stage_category.start)">
                        {{ formatDate(runner.stage_category.start) }}
                    </time>
                </div>
                <Button variant="secondary" v-if="moment.utc(runner.stage_category.start).isBefore(moment())"
                    modifier="link" as-child>
                    <NuxtLink :to="`/dashboard/runner/${runner.id}/${runner.stage.event_id}/${runner.stage_id}`">
                        edit your details
                    </NuxtLink>
                </Button>
            </div>
        </div>
    </section>
</template>