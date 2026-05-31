<script setup lang="ts">
import { LoaderIcon, SaveIcon } from 'lucide-vue-next'
import type { TrailRace } from '~/lib/types'

import { useEventStore } from '~/store/event'
import { useDebounceFn } from '@vueuse/core'

interface EventDescriptionProps {
    trailRace: TrailRace
}

const props = defineProps<EventDescriptionProps>()
const emit = defineEmits(['update'])
const route = useRoute()
const { saveDescription } = useEventStore()
const { can } = useAuthorization()

const eventDescription = ref('')
const isLoading = ref(false)
const isSaved = ref(false)
const isInitialized = ref(false)

const debouncedSave = useDebounceFn(async (newDescription: string) => {
    isLoading.value = true
    await saveDescription(route.params.id as string, newDescription)
    emit('update')
    isLoading.value = false
    isSaved.value = true
}, 1000)

watch(eventDescription, (newDescription) => {
    const hasChanged = newDescription !== props.trailRace?.description

    if (hasChanged) {
        debouncedSave(newDescription)
    }
})

watch(() => props.trailRace, () => {
    if (props.trailRace && !isInitialized.value) {
        eventDescription.value = props.trailRace.description || ''
        isInitialized.value = true
    }
}, { immediate: true })

watch(isSaved, () => {
    if (isSaved.value)
        setTimeout(() => { isSaved.value = false }, 2000)
})


</script>

<template>
    <div class="mb-2">
        <div class="flex">
            <h2 class="text-xs uppercase grow mb-2">Description</h2>
            <div class="flex gap-1 text-sm items-center">
                <LoaderIcon class="loading" :size="16" v-if="isLoading" />
                <span class="text-green-700 flex gap-0.5 items-center" v-if="isSaved">
                    <SaveIcon :size="16" />
                    saved
                </span>
            </div>
        </div>
        <TiptapEditor v-model="eventDescription" :disabled="isLoading || !can('event_edit')" />
    </div>
</template>