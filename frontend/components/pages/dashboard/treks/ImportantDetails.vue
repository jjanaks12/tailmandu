<script setup lang="ts">
import { Loader2Icon, PlusCircleIcon, PlusIcon, Trash2Icon } from 'lucide-vue-next'
import type { Trek } from '~/lib/types'
import { useAxios } from '~/services/axios'

interface Props {
    trek: Trek
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])
const { axios } = useAxios()

const isSaving = ref(false)
const importantDetails = ref<Array<{ title: string, items: Array<{ title: string, description: string }> }>>([])

const isImportantDetailsDirty = computed(() => {
    return JSON.stringify(importantDetails.value) !== JSON.stringify(props.trek.details?.importantDetails || [])
})

onMounted(() => {
    if (props.trek.details?.importantDetails) {
        importantDetails.value = JSON.parse(JSON.stringify(props.trek.details.importantDetails))
    }
})

watch(() => props.trek, (newTrek) => {
    if (newTrek?.details?.importantDetails) {
        importantDetails.value = JSON.parse(JSON.stringify(newTrek.details.importantDetails))
    }
}, { deep: true })

const saveImportantDetails = async () => {
    isSaving.value = true
    try {
        const details = { 
            ...props.trek.details, 
            importantDetails: importantDetails.value 
        }
        await axios.put(`/treks/${props.trek.id}`, { details })
        emit('update')
    } catch (e) {
        console.error('Failed to save important details', e)
    } finally {
        isSaving.value = false
    }
}

const addImportantDetailSection = () => {
    importantDetails.value.push({
        title: 'New Section',
        items: []
    })
}

const removeImportantDetailSection = async (index: number) => {
    importantDetails.value.splice(index, 1)
    await saveImportantDetails()
}

const addImportantDetailItem = (sectionIndex: number) => {
    importantDetails.value[sectionIndex].items.push({
        title: 'New Item',
        description: ''
    })
}

const removeImportantDetailItem = async (sectionIndex: number, itemIndex: number) => {
    importantDetails.value[sectionIndex].items.splice(itemIndex, 1)
    await saveImportantDetails()
}
</script>

<template>
    <!-- Important Details Section -->
    <section class="space-y-6">
        <div class="flex justify-between items-center">
            <div>
                <div class="flex items-center gap-2">
                    <h3 class="text-2xl font-bold text-foreground">Important Details</h3>
                    <Badge v-if="isImportantDetailsDirty" variant="outline" class="border-destructive text-destructive h-5 px-1.5 text-[10px] uppercase">Unsaved</Badge>
                </div>
                <p class="text-sm text-muted-foreground">Information like Food, Water, Toilets, etc.</p>
            </div>
            <div class="flex gap-2">
                <Button v-if="importantDetails.length > 0" variant="ghost" size="sm"
                    @click="saveImportantDetails" :disabled="isSaving || !isImportantDetailsDirty" class="text-primary hover:bg-primary/10">
                    <Loader2Icon v-if="isSaving" class="w-4 h-4 animate-spin mr-2" />
                    Save Changes
                </Button>
                <Button @click="addImportantDetailSection" variant="secondary"
                    class="font-bold text-primary bg-primary/10 hover:bg-primary/20 flex items-center gap-2">
                    <PlusCircleIcon class="w-4 h-4" /> Add Section
                </Button>
            </div>
        </div>

        <div class="space-y-6">
            <div v-for="(section, sectionIndex) in importantDetails"
                :key="sectionIndex" class="bg-card border border-border rounded-lg p-6 shadow-sm group/section">
                <div class="flex justify-between items-center mb-6">
                    <Input v-model="section.title"
                        class="text-lg font-bold border-none bg-transparent focus-visible:ring-0 px-0 h-auto w-full md:w-1/2"
                        placeholder="Section Title (e.g. Food, Water & Toilets)" />
                    <Button variant="ghost" size="icon"
                        @click="removeImportantDetailSection(sectionIndex)"
                        class="text-muted-foreground hover:text-destructive shrink-0">
                        <Trash2Icon class="w-4 h-4" />
                    </Button>
                </div>

                <div class="space-y-4 pl-4 border-l-2 border-border/50">
                    <div v-for="(item, itemIndex) in section.items" :key="itemIndex"
                        class="group/item relative space-y-2 pb-4 mb-4 border-b border-border/50 last:border-0 last:pb-0 last:mb-0">
                        <div class="flex flex-col md:flex-row justify-between gap-4">
                            <div class="flex-1 space-y-2">
                                <Input v-model="item.title" class="font-bold"
                                    placeholder="Item Title (e.g. Food)" />
                                <Textarea v-model="item.description" rows="2" placeholder="Item Description..."
                                    class="resize-none" />
                            </div>
                            <Button variant="ghost" size="icon"
                                @click="removeImportantDetailItem(sectionIndex, itemIndex)"
                                class="opacity-0 group-hover/item:opacity-100 transition-opacity text-muted-foreground hover:text-destructive shrink-0 mt-1 self-end md:self-start">
                                <Trash2Icon class="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <Button @click="addImportantDetailItem(sectionIndex)" variant="ghost"
                        class="w-full text-xs font-bold text-primary hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-center gap-2">
                        <PlusIcon class="w-3.5 h-3.5" /> Add Item
                    </Button>
                </div>
            </div>
        </div>
    </section>
</template>
