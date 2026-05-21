<script setup lang="ts">
import { CornerRightUpIcon, EllipsisVerticalIcon, PencilIcon, PlusIcon, RefreshCwIcon, TrashIcon, ExternalLinkIcon } from 'lucide-vue-next'
import { usePageStore } from '~/store/page'

useHead({
    title: 'Static Pages'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    permission: [],
    role: 'Admin'
})

const { fetchPages, deletePage } = usePageStore()
const { pages, isLoading } = storeToRefs(usePageStore())
const router = useRouter()

const showDeleteDialog = ref(false)
const selectedPage = ref<any | null>(null)

onMounted(fetchPages)
</script>

<template>
    <div class="flex items-center justify-between mb-12">
        <h1 class="text-2xl">Static Pages</h1>
        <div class="flex gap-2">
            <Button @click="router.push('/dashboard/pages/create')">
                <PlusIcon />
                Add Page
            </Button>
            <Button @click="fetchPages" :disabled="isLoading" modifier="link">
                <RefreshCwIcon />
            </Button>
        </div>
    </div>

    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead class="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="page in pages" :key="page.id">
                <TableCell class="font-medium">
                    <NuxtLink class="cursor-pointer hover:underline" :to="`/dashboard/pages/${page.id}`">
                        {{ page.title }}
                    </NuxtLink>
                </TableCell>
                <TableCell>{{ page.slug }}</TableCell>
                <TableCell>
                    <Badge v-if="page.status === 'published'" variant="default">Published</Badge>
                    <Badge v-else variant="outline">Draft</Badge>
                </TableCell>
                <TableCell>{{ new Date(page.updated_at).toLocaleDateString() }}</TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button modifier="link" size="sm">
                                <EllipsisVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem @click="router.push(`/dashboard/pages/${page.id}`)">
                                <PencilIcon />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem as="a" :href="`/info/${page.slug}`" target="_blank">
                                <ExternalLinkIcon />
                                Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="selectedPage = page; showDeleteDialog = true">
                                <TrashIcon />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <TableRow v-if="!pages.length && !isLoading">
                <TableCell colspan="5" class="text-center py-8 text-muted-foreground">
                    No pages found. Create one to get started.
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>

    <Dialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete Page</DialogTitle>
                <DialogDescription>Are you sure you want to delete this page? This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button modifier="outline" @click="showDeleteDialog = false">Cancel</Button>
                <Button variant="destructive"
                    @click="async () => { await deletePage(selectedPage.id); showDeleteDialog = false }">
                    Delete
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>