<script setup lang="ts">
import { CornerRightUpIcon, EllipsisVerticalIcon, PencilIcon, PlusIcon, RefreshCwIcon, SearchIcon, SlidersVerticalIcon, TrashIcon } from 'lucide-vue-next'
import { Field, Form } from 'vee-validate'
import type { BlogPost } from '~/lib/types'
import { useBlogStore } from '~/store/blog'

useHead({
    title: 'Blogs'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['manage_user'] // Assuming this permission for now
})

const router = useRouter()
const { fetchPosts, togglePublish, deletePost } = useBlogStore()
const { posts, params, isLoading } = storeToRefs(useBlogStore())

const showForm = ref(false)
const showDeleteDialog = ref(false)
const selectedPost = ref<BlogPost | null>(null)

onMounted(() => fetchPosts(true))
</script>

<template>
    <div class="flex items-center justify-between mb-12">
        <h1 class="text-2xl">{{ $t('dashboard.blogs.title') }}</h1>
        <div class="flex gap-2">
            <Button @click="selectedPost = null; showForm = true">
                <PlusIcon />
                {{ $t('dashboard.blogs.add_btn') }}
            </Button>
            <Button @click="fetchPosts(true)" :disabled="isLoading" modifier="link">
                <RefreshCwIcon />
            </Button>
        </div>
    </div>

    <div class="flex gap-4 mb-20">
        <div class="flex-grow">
            <div class="flex gap-2 mb-4">
                <SlidersVerticalIcon />
                {{ $t('header.filter_title') }}
            </div>
        </div>
        <Form class="max-w-[320px] w-full flex items-center gap-2">
            <Field name="search" v-slot="{ field }">
                <Input v-bind="field" :placeholder="$t('header.search_placeholder', { name: 'blogs' })" />
            </Field>
            <Button variant="secondary" size="lg">
                <SearchIcon />
            </Button>
        </Form>
    </div>

    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>{{ $t('dashboard.blogs.listing.table.title') }}</TableHead>
                <TableHead>{{ $t('dashboard.blogs.listing.table.category') }}</TableHead>
                <TableHead>{{ $t('dashboard.blogs.listing.table.author') }}</TableHead>
                <TableHead>{{ $t('dashboard.blogs.listing.table.status') }}</TableHead>
                <TableHead class="text-right">{{ $t('dashboard.treks.listing.table.action') }}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="post in posts" :key="post.id">
                <TableCell class="font-medium">
                    <NuxtLink :to="`/dashboard/blogs/${post.id}`">
                        {{ post.title }}
                    </NuxtLink>
                    <Badge v-if="post.is_featured" variant="secondary" class="ml-2">Featured</Badge>
                </TableCell>
                <TableCell>{{ post.category?.name || 'Uncategorized' }}</TableCell>
                <TableCell>{{ post.author?.personal?.first_name }} {{ post.author?.personal?.last_name }}</TableCell>
                <TableCell>
                    <Badge v-if="post.published_at" variant="default">Published</Badge>
                    <Badge v-else variant="outline">Draft</Badge>
                </TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button modifier="link" size="sm">
                                <EllipsisVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem @click="router.push(`/dashboard/blogs/${post.id}`)">
                                <PencilIcon />
                                {{ $t('dashboard.blogs.listing.table.edit') }}
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="selectedPost = post; showDeleteDialog = true">
                                <TrashIcon />
                                {{ $t('dashboard.blogs.listing.table.delete') }}
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="togglePublish(post.id)">
                                <CornerRightUpIcon />
                                {{ post.published_at ? 'Unpublish' : 'Publish' }}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>

    <Dialog :open="showForm" @update:open="showForm = $event">
        <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>
                    {{ $t('dashboard.blogs.modal.add.title') }}
                </DialogTitle>
                <DialogDescription>
                    {{ $t('dashboard.blogs.modal.add.description') }}
                </DialogDescription>
            </DialogHeader>
            <PagesDashboardBlogsMinimalForm @fetch="fetchPosts(true)"
                @success="(post) => { showForm = false; router.push(`/dashboard/blogs/${post.id}`) }" />
        </DialogContent>
    </Dialog>

    <Dialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{{ $t('dashboard.blogs.modal.delete.title') }}</DialogTitle>
                <DialogDescription>{{ $t('dashboard.blogs.modal.delete.description') }}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button modifier="outline" @click="showDeleteDialog = false">{{
                    $t('dashboard.blogs.modal.delete.cancel') }}</Button>
                <Button variant="destructive"
                    @click="async () => { await deletePost(selectedPost!.id); showDeleteDialog = false }">
                    {{ $t('dashboard.blogs.modal.delete.confirm') }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
