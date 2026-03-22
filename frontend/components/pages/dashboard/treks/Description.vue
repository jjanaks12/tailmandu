<script setup lang="ts">
import { LoaderIcon, SaveIcon } from 'lucide-vue-next'
import type { Trek } from '~/lib/types'

import { useTrekStore } from '~/store/trek'

interface TrekDescriptionProps {
    trek: Trek
}

const props = defineProps<TrekDescriptionProps>()
const emit = defineEmits(['update'])
const route = useRoute()
const { saveDescription } = useTrekStore()
const { can } = useAuthorization()

const eventDescription = ref('')
const isLoading = ref(false)
const isSaved = ref(false)

watch(eventDescription, async (newDescription) => {
    const hasChanged = newDescription !== props.trek?.description

    if (hasChanged) {
        isLoading.value = true
        await saveDescription(route.params.id as string, eventDescription.value)
        emit('update')
        isLoading.value = false
        isSaved.value = true
    }
})

watch(() => props.trek, () => {
    if (props.trek)
        eventDescription.value = props.trek.description || ''
})

watch(isSaved, () => {
    if (isSaved.value)
        setTimeout(() => { isSaved.value = false }, 2000)
})

onMounted(() => {
    if (props.trek)
        eventDescription.value = props.trek.description || ''
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
        <TiptapEditor v-model="eventDescription" :disabled="isLoading || !can('trek_edit')" />
    </div>
</template>