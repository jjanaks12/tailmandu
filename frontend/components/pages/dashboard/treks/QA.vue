<script setup lang="ts">
import { Loader2Icon, PlusCircleIcon, Trash2Icon } from 'lucide-vue-next'
import type { Trek } from '~/lib/types'
import { useAxios } from '~/services/axios'

interface Props {
    trek: Trek
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])
const { axios } = useAxios()

const isSaving = ref(false)
const qa = ref<Array<{ question: string, answer: string }>>([])

const isQADirty = computed(() => {
    return JSON.stringify(qa.value) !== JSON.stringify(props.trek.details?.qa || [])
})

onMounted(() => {
    if (props.trek.details?.qa) {
        qa.value = JSON.parse(JSON.stringify(props.trek.details.qa))
    }
})

watch(() => props.trek, (newTrek) => {
    if (newTrek?.details?.qa) {
        qa.value = JSON.parse(JSON.stringify(newTrek.details.qa))
    }
}, { deep: true })

const saveQA = async () => {
    isSaving.value = true
    try {
        const details = { 
            ...props.trek.details, 
            qa: qa.value 
        }
        await axios.put(`/treks/${props.trek.id}`, { details })
        emit('update')
    } catch (e) {
        console.error('Failed to save QA details', e)
    } finally {
        isSaving.value = false
    }
}

const addQAItem = () => {
    qa.value.push({ question: 'New Question', answer: 'New Answer' })
}

const removeQAItem = async (index: number) => {
    qa.value.splice(index, 1)
    await saveQA()
}
</script>

<template>
    <!-- Q/A Section -->
    <section class="space-y-6">
        <div class="flex justify-between items-center">
            <div>
                <div class="flex items-center gap-2">
                    <h3 class="text-2xl font-bold text-foreground">Frequently Asked Questions</h3>
                    <Badge v-if="isQADirty" variant="outline" class="border-destructive text-destructive h-5 px-1.5 text-[10px] uppercase">Unsaved</Badge>
                </div>
                <p class="text-sm text-muted-foreground">Add questions and detailed answers for potential travelers.</p>
            </div>
            <div class="flex gap-2">
                <Button v-if="qa.length > 0" variant="ghost" size="sm"
                    @click="saveQA" :disabled="isSaving || !isQADirty" class="text-primary hover:bg-primary/10">
                    <Loader2Icon v-if="isSaving" class="w-4 h-4 animate-spin mr-2" />
                    Save Q&A
                </Button>
                <Button @click="addQAItem" variant="secondary"
                    class="font-bold text-primary bg-primary/10 hover:bg-primary/20 flex items-center gap-2">
                    <PlusCircleIcon class="w-4 h-4" /> Add FAQ
                </Button>
            </div>
        </div>

        <div class="space-y-4">
            <div v-for="(item, index) in qa" :key="index"
                class="bg-card border border-border rounded-lg p-6 shadow-sm group relative">
                <div class="flex justify-between items-start gap-4 mb-4">
                    <div class="flex-1 space-y-4">
                        <div class="space-y-1">
                            <label class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Question</label>
                            <Input v-model="item.question" class="font-bold" placeholder="e.g. Is this trek suitable for beginners?" />
                        </div>
                        <div class="space-y-1">
                            <label class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Answer</label>
                            <Textarea v-model="item.answer" rows="3" class="resize-none" placeholder="Provide a detailed helpful answer..." />
                        </div>
                    </div>
                    <Button variant="ghost" size="icon"
                        @click="removeQAItem(index)"
                        class="text-muted-foreground hover:text-destructive shrink-0 mt-6">
                        <Trash2Icon class="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <div v-if="qa.length === 0" class="text-center py-8 border-2 border-dashed border-border rounded-lg bg-muted/5">
                <p class="text-sm text-muted-foreground">No FAQs added yet. Click "Add FAQ" to get started.</p>
            </div>
        </div>
    </section>
</template>
