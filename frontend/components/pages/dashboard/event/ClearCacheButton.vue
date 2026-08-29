<script lang="ts" setup>
import { ref } from 'vue'
import { EraserIcon } from 'lucide-vue-next'
import { useAxios } from '~/services/axios'
import { toast } from 'vue-sonner'

interface Props {
    eventId: string
}
const props = defineProps<Props>()

const { axios } = useAxios()
const isClearing = ref(false)

const clearCache = async () => {
    isClearing.value = true
    try {
        await axios.post(`/events/${props.eventId}/clear_cache`)
        toast.success('Cache cleared successfully')
    } catch (e: any) {
        toast.error('Failed to clear cache')
    } finally {
        isClearing.value = false
    }
}
</script>

<template>
    <Button @click="clearCache" variant="destructive" modifier="outline" :loading="isClearing" size="sm">
        <EraserIcon class="w-4 h-4 mr-2" v-if="!isClearing" />
        Clear Cache
    </Button>
</template>
