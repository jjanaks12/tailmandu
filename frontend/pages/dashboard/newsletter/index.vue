<script lang="ts" setup>
import { formatDate } from '~/lib/filters'
import { useNewsletterStore } from '~/store/newsletter'
import { PencilIcon, RefreshCwIcon } from 'lucide-vue-next'
import type { Newsletter } from '~/lib/types'

useHead({
    title: 'Newsletters'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: '*'
})

const { newsletters, params } = storeToRefs(useNewsletterStore())
const { fetch } = useNewsletterStore()

const isModalOpen = ref(false)
const editingSubscriber = ref<Newsletter | null>(null)

onMounted(fetch)

const openEditModal = (subscriber: Newsletter) => {
    editingSubscriber.value = subscriber
    isModalOpen.value = true
}
</script>

<template>
    <div class="flex">
        <div class="flex-grow">
            <h1 class="text-primary text-2xl mb-4">Newsletters</h1>
        </div>
        <Button variant="secondary" @click="fetch" size="sm">
            <RefreshCwIcon class="size-4 animate-spin" />
            Refresh
        </Button>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subscribed at</TableHead>
                <TableHead>Topics</TableHead>
                <TableHead class="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="(newsletter, index) in newsletters">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>
                    {{ [newsletter.user?.first_name, newsletter.user?.middle_name, newsletter.user?.last_name].join(' ')
                        ?? '-' }}
                </TableCell>
                <TableCell>{{ newsletter.email }}</TableCell>
                <TableCell>{{ formatDate(newsletter.subscribed_at) }}</TableCell>
                <TableCell>
                    <div class="flex flex-wrap gap-2">
                        <Badge v-for="topic in newsletter.topics" :key="topic.id">{{ topic.name }}</Badge>
                    </div>
                </TableCell>
                <TableCell class="text-right">
                    <Button modifier="outline" size="sm" @click="openEditModal(newsletter)">
                        <PencilIcon class="w-4 h-4 mr-2" />
                        Edit Topics
                    </Button>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <div class="flex items-center justify-end space-x-2 py-4" v-if="params.total_page > 1">
        <div class="flex-1 text-sm text-muted-foreground">
            {{ params?.current }} of {{ params?.total_page }} pages
        </div>
        <div class="space-x-2">
            <Pagination v-slot="{ page }" :items-per-page="params.per_page" :total="params.total"
                :default-page="params.current" @update:page="(p) => { params = { ...params, current: p } }">
                <PaginationContent v-slot="{ items }">
                    <PaginationPrevious />
                    <template v-for="(item, index) in items" :key="index">
                        <PaginationItem v-if="item.type === 'page'" :value="item.value"
                            :is-active="item.value === page">
                            {{ item.value }}
                        </PaginationItem>
                    </template>
                    <PaginationEllipsis :index="4" />
                    <PaginationNext />
                </PaginationContent>
            </Pagination>
        </div>
    </div>
    <Dialog :open="isModalOpen" @update:open="isModalOpen = $event">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Manage Subscriptions</DialogTitle>
                <DialogDescription>
                    Update the topic subscriptions for <strong>{{ editingSubscriber?.email }}.</strong>
                </DialogDescription>
            </DialogHeader>
            <PagesDashboardNewsletterEditTopicsModal :subscriber="editingSubscriber" v-model:open="isModalOpen"
                @saved="fetch" />
        </DialogContent>
    </Dialog>
</template>