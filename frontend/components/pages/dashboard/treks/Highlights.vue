<script setup lang="ts">
import { Loader2Icon, PlusIcon, SparklesIcon, Trash2Icon } from 'lucide-vue-next'
import type { Trek } from '~/lib/types'
import { useAxios } from '~/services/axios'

interface Props {
    trek: Trek
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])
const { axios } = useAxios()

const isSaving = ref(false)
const highlights = ref<string[]>([])

const isHighlightsDirty = computed(() => {
    return JSON.stringify(highlights.value) !== JSON.stringify(props.trek.details?.highlights || [])
})

onMounted(() => {
    if (props.trek.details?.highlights) {
        highlights.value = JSON.parse(JSON.stringify(props.trek.details.highlights))
    }
})

watch(() => props.trek, (newTrek) => {
    if (newTrek?.details?.highlights) {
        highlights.value = JSON.parse(JSON.stringify(newTrek.details.highlights))
    }
}, { deep: true })

const saveHighlights = async () => {
    isSaving.value = true
    try {
        const details = { 
            ...props.trek.details, 
            highlights: highlights.value 
        }
        await axios.put(`/treks/${props.trek.id}`, { details })
        emit('update')
    } catch (e) {
        console.error('Failed to save highlights', e)
    } finally {
        isSaving.value = false
    }
}

const addHighlightItem = () => {
    highlights.value.push('')
}

const removeHighlightItem = async (index: number) => {
    highlights.value.splice(index, 1)
    await saveHighlights()
}
</script>

<template>
    <!-- Trip Highlights -->
    <section class="space-y-6">
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
                <h3 class="text-2xl font-bold text-foreground">Trip Highlights</h3>
                <Badge v-if="isHighlightsDirty" variant="outline" class="border-destructive text-destructive h-5 px-1.5 text-[10px] uppercase">Unsaved</Badge>
            </div>
            <Button v-if="highlights.length > 0" variant="ghost" size="sm" @click="saveHighlights"
                :disabled="isSaving || !isHighlightsDirty" class="text-primary hover:bg-primary/10">
                <Loader2Icon v-if="isSaving" class="w-4 h-4 animate-spin mr-2" />
                Save Highlights
            </Button>
        </div>
        <div class="bg-card rounded-lg p-6 border border-border shadow-sm">
            <div class="space-y-3">
                <div v-for="(highlight, index) in highlights" :key="index"
                    class="flex items-center gap-3 group relative">
                    <SparklesIcon class="w-4 h-4 text-primary shrink-0" />
                    <Input v-model="highlights[index]" type="text" class="flex-1"
                        placeholder="A key highlight of the trip..." />
                    <Button variant="ghost" size="icon" @click="removeHighlightItem(index)"
                        class="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive shrink-0">
                        <Trash2Icon class="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <Button @click="addHighlightItem" variant="ghost"
                class="w-full mt-4 text-xs font-bold text-primary hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-center gap-2">
                <PlusIcon class="w-3.5 h-3.5" /> Add Highlight
            </Button>
        </div>
    </section>
</template>
