<script lang="ts" setup>
import { PlusIcon, TrashIcon, SaveIcon } from 'lucide-vue-next'
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
}

const topics = ref<DetailTopic[]>([])

onMounted(() => {
    initTopics()
})

const initTopics = () => {
    try {
        if (props.trailRace.details) {
            // handle stringified json or raw json depending on prisma/axios
            let parsed = typeof props.trailRace.details === 'string'
                ? JSON.parse(props.trailRace.details)
                : props.trailRace.details

            if (Array.isArray(parsed)) {
                topics.value = parsed
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
        content: ''
    })
}

const removeTopic = (index: number) => {
    topics.value.splice(index, 1)
}

const save = async () => {
    isSaving.value = true
    try {
        const success = await store.saveDetails(props.trailRace.id, topics.value)
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
            <Button @click="save" :disabled="isSaving" class="gap-2">
                <SaveIcon class="w-4 h-4" />
                {{ isSaving ? 'Saving...' : 'Save Changes' }}
            </Button>
        </div>

        <div v-if="topics.length === 0" class="text-center py-10 border rounded-lg border-dashed bg-muted/20">
            <p class="text-muted-foreground mb-4">No topics added yet.</p>
            <Button @click="addTopic" modifier="outline" class="gap-2">
                <PlusIcon class="w-4 h-4" /> Add First Topic
            </Button>
        </div>

        <div class="space-y-8">
            <div v-for="(topic, index) in topics" :key="topic.id"
                class="border rounded-lg p-6 bg-card relative shadow-sm">
                <div class="absolute top-4 right-4">
                    <Button type="button" variant="ghost" size="icon" class="text-destructive hover:bg-destructive/10"
                        @click="removeTopic(index)">
                        <TrashIcon class="w-4 h-4" />
                    </Button>
                </div>

                <div class="space-y-4 max-w-[calc(100%-3rem)]">
                    <div class="space-y-2">
                        <Label class="text-base">Topic Title</Label>
                        <Input v-model="topic.title" placeholder="e.g. Mandatory Gears"
                            class="max-w-md font-medium text-lg h-12" />
                    </div>

                    <div class="space-y-2">
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
