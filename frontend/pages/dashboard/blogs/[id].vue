<script setup lang="ts">
import { ArrowLeftIcon, Loader2Icon, MessageSquareIcon, StarIcon, UserIcon } from 'lucide-vue-next'
import { useBlogStore } from '~/store/blog'
import { showImage } from '~/lib/filters'

const route = useRoute()
const router = useRouter()
const { getPost } = useBlogStore()
const post = ref<any>(null)
const isLoading = ref(true)

const totalCommentsCount = computed(() => {
    if (!post.value?.comments) return 0
    let count = post.value.comments.length
    post.value.comments.forEach((c: any) => {
        if (c.replies) count += c.replies.length
    })
    return count
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['manage_blog'],
    validate: (route) => {
        return !['category', 'categories'].includes(route.params.id as string)
    }
})

const init = async () => {
    isLoading.value = true
    try {
        const data = await getPost(route.params.id as string)
        post.value = data
    } catch (e) {
        console.error(e)
        router.push('/dashboard/blogs')
    } finally {
        isLoading.value = false
    }
}

onMounted(init)
</script>

<template>
    <div class="mb-8">
        <h1 class="text-2xl font-bold">Edit Blog Post</h1>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
        <Loader2Icon class="w-8 h-8 animate-spin text-primary" />
    </div>

    <PagesDashboardBlogsForm v-else-if="post" :post="post" @fetch="init">
        <template #sidebar-start>
            <div class="flex items-center justify-end gap-2">
                <Button modifier="link" size="sm" @click="router.push('/dashboard/blogs')">
                    <ArrowLeftIcon class="w-4 h-4 mr-2" />
                    Back
                </Button>

                <Sheet>
                    <SheetTrigger as-child>
                        <Button modifier="outline" size="sm">
                            <MessageSquareIcon class="w-4 h-4 mr-2" />
                            Comments ({{ totalCommentsCount }})
                        </Button>
                    </SheetTrigger>
                    <SheetContent class="w-full sm:max-w-md overflow-y-auto">
                        <SheetHeader>
                            <div class="flex items-center justify-between">
                                <div>
                                    <SheetTitle>Reviews & Comments</SheetTitle>
                                    <SheetDescription>View comments and reviews left by readers on this blog post.</SheetDescription>
                                </div>
                                <Button variant="ghost" size="icon" @click="init" :disabled="isLoading" title="Refresh Comments">
                                    <Loader2Icon v-if="isLoading" class="w-4 h-4 animate-spin" />
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                                </Button>
                            </div>
                        </SheetHeader>
                        <div class="mt-6 space-y-6">
                            <div v-if="!post.comments?.length" class="text-center py-8 text-slate-500">
                                No comments yet.
                            </div>
                            <div v-for="comment in post.comments" :key="comment.id"
                                class="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div class="flex items-center gap-3 mb-3">
                                    <div
                                        class="w-8 h-8 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center">
                                        <img v-if="comment.user?.personal?.avatar?.file_name"
                                            :src="showImage(comment.user.personal.avatar.file_name)"
                                            class="w-full h-full object-cover" />
                                        <UserIcon v-else class="w-4 h-4 text-slate-400" />
                                    </div>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span class="font-bold text-sm">{{ comment.user ?
                                                (comment.user.personal?.first_name + ' ' +
                                                comment.user.personal?.last_name) : comment.author_name || 'Guest'
                                                }}</span>
                                            <span v-if="comment.rating" class="flex text-yellow-400">
                                                <StarIcon v-for="i in comment.rating" :key="i"
                                                    class="w-3 h-3 fill-current" />
                                            </span>
                                        </div>
                                        <p class="text-[10px] text-slate-400 uppercase tracking-widest">{{ new
                                            Date(comment.created_at).toLocaleDateString() }}</p>
                                    </div>
                                </div>
                                <p class="text-sm text-slate-700 dark:text-slate-300">{{ comment.content }}</p>

                                <!-- Replies -->
                                <div v-if="comment.replies && comment.replies.length > 0"
                                    class="mt-4 pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-4">
                                    <div v-for="reply in comment.replies" :key="reply.id">
                                        <div class="flex items-center gap-2 mb-1">
                                            <div
                                                class="w-5 h-5 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center">
                                                <img v-if="reply.user?.personal?.avatar?.file_name"
                                                    :src="showImage(reply.user.personal.avatar.file_name)"
                                                    class="w-full h-full object-cover" />
                                                <UserIcon v-else class="w-3 h-3 text-slate-400" />
                                            </div>
                                            <span class="font-bold text-xs">{{ reply.user ?
                                                (reply.user.personal?.first_name + ' ' + reply.user.personal?.last_name)
                                                : reply.author_name || 'Guest' }}</span>
                                            <span v-if="reply.rating" class="flex text-yellow-400">
                                                <StarIcon v-for="i in reply.rating" :key="i"
                                                    class="w-2.5 h-2.5 fill-current" />
                                            </span>
                                        </div>
                                        <p class="text-xs text-slate-600 dark:text-slate-400">{{ reply.content }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>

                <Button as-child size="sm">
                    <NuxtLink :to="$localePath(`/blogs/${post.slug}`)" target="_blank">Preview</NuxtLink>
                </Button>
            </div>
        </template>
    </PagesDashboardBlogsForm>
</template>