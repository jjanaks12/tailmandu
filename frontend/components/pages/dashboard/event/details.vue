<script lang="ts" setup>
import { PlusIcon, TrashIcon, SaveIcon, ArrowUpIcon, ArrowDownIcon, ChevronUpIcon, ChevronDownIcon, GripVerticalIcon } from 'lucide-vue-next'
import { useEventStore } from '~/store/event'
import type { TrailRace } from '~/lib/types'
import { ref, watch, onMounted } from 'vue'
import { toast } from 'vue-sonner'

const props = defineProps<{
    trailRace: TrailRace
}>()

const emit = defineEmits(['update'])

const store = useEventStore()
const isSaving = ref(false)

interface DetailTopic {
    id: string
    title: string
    content: string
    collapsed?: boolean
}

const topics = ref<DetailTopic[]>([])

onMounted(() => {
    initTopics()
})

const initTopics = () => {
    try {
        if (props.trailRace.details) {
            let parsed = typeof props.trailRace.details === 'string'
                ? JSON.parse(props.trailRace.details)
                : props.trailRace.details

            if (Array.isArray(parsed)) {
                topics.value = parsed.map(t => ({ ...t, collapsed: true }))
            } else {
                topics.value = []
            }
        } else {
            topics.value = []
        }
    } catch (e) {
        topics.value = []
    }
}

const addTopic = () => {
    topics.value.push({
        id: Math.random().toString(36).substring(2, 9),
        title: '',
        content: '',
        collapsed: false
    })
}

const removeTopic = (index: number) => {
    topics.value.splice(index, 1)
}

const moveUp = (index: number) => {
    if (index > 0) {
        const item = topics.value.splice(index, 1)[0]
        topics.value.splice(index - 1, 0, item)
    }
}

const moveDown = (index: number) => {
    if (index < topics.value.length - 1) {
        const item = topics.value.splice(index, 1)[0]
        topics.value.splice(index + 1, 0, item)
    }
}

const draggedIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

const onDragStart = (e: DragEvent, index: number) => {
    draggedIndex.value = index
    if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move'
    }
}

const onDragOver = (e: DragEvent, index: number) => {
    e.preventDefault()
    dragOverIndex.value = index
}

const onDrop = (e: DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex.value !== null && draggedIndex.value !== index) {
        const item = topics.value.splice(draggedIndex.value, 1)[0]
        topics.value.splice(index, 0, item)
    }
    draggedIndex.value = null
    dragOverIndex.value = null
}

const onDragEnd = () => {
    draggedIndex.value = null
    dragOverIndex.value = null
}

const save = async () => {
    isSaving.value = true
    try {
        // Strip out the 'collapsed' property before saving
        const cleanTopics = topics.value.map(({ id, title, content }) => ({ id, title, content }))
        const success = await store.saveDetails(props.trailRace.id, cleanTopics)
        if (success) {
            toast.success('Details updated successfully')
            emit('update')
        } else {
            toast.error('Failed to update details')
        }
    } catch (error) {
        toast.error('Failed to update details')
    }
    isSaving.value = false
}

// Watch for prop changes in case of parent refresh
watch(() => props.trailRace.details, () => {
    if (!isSaving.value) {
        initTopics()
    }
}, { deep: true })
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-lg font-medium">Event Details & Topics</h3>
                <p class="text-sm text-muted-foreground">Add dynamic topics such as "Mandatory Gears", "What's
                    Included", etc.</p>
            </div>
            <div class="flex gap-2">
                <Button @click="topics.forEach(t => t.collapsed = false)" modifier="outline" size="sm">
                    Expand All
                </Button>
                <Button @click="topics.forEach(t => t.collapsed = true)" modifier="outline" size="sm">
                    Collapse All
                </Button>
                <Button @click="save" :disabled="isSaving" class="gap-2">
                    <SaveIcon class="w-4 h-4" />
                    {{ isSaving ? 'Saving...' : 'Save Changes' }}
                </Button>
            </div>
        </div>

        <div v-if="topics.length === 0" class="text-center py-10 border rounded-lg border-dashed bg-muted/20">
            <p class="text-muted-foreground mb-4">No topics added yet.</p>
            <Button @click="addTopic" modifier="outline" class="gap-2">
                <PlusIcon class="w-4 h-4" /> Add First Topic
            </Button>
        </div>

        <div class="space-y-4">
            <div v-for="(topic, index) in topics" :key="topic.id"
                class="border rounded-lg bg-card shadow-sm transition-all relative group" :class="{
                    'opacity-50': draggedIndex === index,
                    'border-primary border-2': dragOverIndex === index,
                    'p-4': topic.collapsed,
                    'p-6': !topic.collapsed
                }" @dragover="onDragOver($event, index)" @drop="onDrop($event, index)" @dragenter.prevent>

                <div class="absolute top-4 left-2 cursor-grab text-muted-foreground hover:text-primary active:cursor-grabbing p-1 hidden sm:block"
                    draggable="true" @dragstart="onDragStart($event, index)" @dragend="onDragEnd">
                    <GripVerticalIcon class="w-5 h-5" />
                </div>

                <div
                    class="absolute top-4 right-4 flex items-center gap-1 bg-card rounded-md shadow-sm border border-border">
                    <Button type="button" variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground"
                        @click="moveUp(index)" :disabled="index === 0">
                        <ArrowUpIcon class="w-4 h-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground"
                        @click="moveDown(index)" :disabled="index === topics.length - 1">
                        <ArrowDownIcon class="w-4 h-4" />
                    </Button>
                    <div class="w-px h-4 bg-border mx-1"></div>
                    <Button type="button" variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground"
                        @click="topic.collapsed = !topic.collapsed">
                        <ChevronDownIcon v-if="topic.collapsed" class="w-4 h-4" />
                        <ChevronUpIcon v-else class="w-4 h-4" />
                    </Button>
                    <div class="w-px h-4 bg-border mx-1"></div>
                    <Button type="button" variant="ghost" size="icon"
                        class="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        @click="removeTopic(index)">
                        <TrashIcon class="w-4 h-4" />
                    </Button>
                </div>

                <div class="max-w-[calc(100%-12rem)] ml-8">
                    <div class="space-y-2">
                        <Label
                            class="text-base cursor-pointer hover:text-primary transition-colors flex items-center gap-2"
                            @click="topic.collapsed = !topic.collapsed">
                            Topic Title
                            <span v-if="topic.collapsed && !topic.title"
                                class="text-xs text-muted-foreground font-normal italic">(Empty Title)</span>
                        </Label>
                        <Input v-model="topic.title" placeholder="e.g. Mandatory Gears"
                            class="max-w-md font-medium text-lg h-10" />
                    </div>

                    <div v-show="!topic.collapsed" class="space-y-2 mt-4 pt-4 border-t border-border">
                        <Label>Content</Label>
                        <TiptapEditor v-model="topic.content" />
                    </div>
                </div>
            </div>
        </div>

        <div v-if="topics.length > 0" class="flex justify-center pt-4">
            <Button @click="addTopic" modifier="outline" class="gap-2 border-dashed">
                <PlusIcon class="w-4 h-4" /> Add Another Topic
            </Button>
        </div>
    </div>
</template>
