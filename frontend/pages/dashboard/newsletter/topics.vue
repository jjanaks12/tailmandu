<script lang="ts" setup>
import { Loader2Icon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { formatDate } from '~/lib/filters'
import type { NewsletterTopic } from '~/lib/types'
import { useNewsletterTopicStore } from '~/store/newsletterTopic'

useHead({
    title: 'Newsletter Topics'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: '*'
})

const { topics, isLoading } = storeToRefs(useNewsletterTopicStore())
const { fetch, destroy } = useNewsletterTopicStore()

const isModalOpen = ref(false)
const editingTopic = ref<NewsletterTopic | null>(null)

onMounted(fetch)

const openCreateModal = () => {
    editingTopic.value = null
    isModalOpen.value = true
}

const openEditModal = (topic: NewsletterTopic) => {
    editingTopic.value = { ...topic }
    isModalOpen.value = true
}

const isDeleting = ref<string | null>(null)
const deleteTopic = async (id: string) => {
    if (!confirm('Are you sure you want to delete this topic? This action cannot be undone.')) return

    isDeleting.value = id
    try {
        await destroy(id)
        toast.success('Topic Deleted', { description: 'The topic has been removed.' })
    } catch (e: any) {
        toast.error('Delete Failed', {
            description: e.response?.data?.message || 'Something went wrong.'
        })
    } finally {
        isDeleting.value = null
    }
}
</script>

<template>
    <div class="flex items-center justify-between mb-4">
        <h1 class="text-primary text-2xl">Newsletter Topics</h1>
        <Button @click="openCreateModal">
            <PlusIcon class="w-4 h-4 mr-2" />
            Add Topic
        </Button>
    </div>

    <div class="bg-white rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>SN</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Subscribers</TableHead>
                    <TableHead>Created at</TableHead>
                    <TableHead class="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-if="isLoading && topics.length === 0">
                    <TableCell colspan="6" class="text-center py-10 text-muted-foreground">
                        <Loader2Icon class="w-6 h-6 animate-spin mx-auto mb-2" />
                        Loading topics...
                    </TableCell>
                </TableRow>
                <TableRow v-else-if="topics.length === 0">
                    <TableCell colspan="6" class="text-center py-10 text-muted-foreground">
                        No topics found. Create one to get started.
                    </TableCell>
                </TableRow>
                <TableRow v-for="(topic, index) in topics" :key="topic.id">
                    <TableCell>{{ index + 1 }}</TableCell>
                    <TableCell class="font-medium">{{ topic.name }}</TableCell>
                    <TableCell class="max-w-md truncate">{{ topic.description || '-' }}</TableCell>
                    <TableCell>
                        <Badge variant="secondary">
                            {{ (topic as any)._count?.subscribers || 0 }}
                        </Badge>
                    </TableCell>
                    <TableCell>{{ formatDate(topic.created_at) }}</TableCell>
                    <TableCell class="text-right">
                        <div class="flex items-center justify-end gap-2">
                            <Button modifier="outline" size="icon" @click="openEditModal(topic)">
                                <PencilIcon class="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="icon" @click="deleteTopic(topic.id)"
                                :disabled="isDeleting === topic.id">
                                <Loader2Icon v-if="isDeleting === topic.id" class="w-4 h-4 animate-spin" />
                                <TrashIcon v-else class="w-4 h-4" />
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>

    <!-- Create / Edit Dialog -->
    <Dialog :open="isModalOpen" @update:open="isModalOpen = $event">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{{ editingTopic ? 'Edit Topic' : 'Create Topic' }}</DialogTitle>
                <DialogDescription>
                    {{ editingTopic
                        ? 'Update the details for this newsletter topic.'
                        : 'Add a new topic for users to subscribe to.' }}
                </DialogDescription>
            </DialogHeader>

            <PagesDashboardNewsletterTopicFormModal :topic="editingTopic" />
        </DialogContent>
    </Dialog>
</template>