<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAxios } from '~/services/axios'
import { useAuthStore } from '~/store/auth'
import { MessageSquareIcon, StarIcon, ReplyIcon, UserIcon } from 'lucide-vue-next'
import type { BlogComment } from '~/lib/types'
import { showImage } from '~/lib/filters'
import { toast } from 'vue-sonner'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps<{
    slug: string
}>()

const { axios } = useAxios()
const auth = useAuthStore()

const comments = ref<BlogComment[]>([])
const isLoading = ref(true)
const isSubmitting = ref(false)

const rating = ref(0)
const replyingTo = ref<string | null>(null)

const fetchComments = async () => {
    isLoading.value = true
    try {
        const { data } = await axios.get<BlogComment[]>(`/blogs/public/${props.slug}/comments`)
        comments.value = data
    } catch (e) {
        console.error('Failed to fetch comments', e)
    } finally {
        isLoading.value = false
    }
}

const commentSchema = computed(() => {
    return yup.object().shape({
        content: yup.string().required('Review is required'),
        rating: yup.number().min(1, 'Please select a rating').required('Please select a rating'),
        author_name: auth.isLoggedin ? yup.string().nullable() : yup.string().required('Name is required'),
        author_email: auth.isLoggedin ? yup.string().email().nullable() : yup.string().email('Invalid email address').required('Email is required'),
    })
})

const replySchema = computed(() => {
    return yup.object().shape({
        content: yup.string().required('Reply is required'),
        author_name: auth.isLoggedin ? yup.string().nullable() : yup.string().required('Name is required'),
        author_email: auth.isLoggedin ? yup.string().email().nullable() : yup.string().email('Invalid email address').required('Email is required'),
    })
})

const submitComment = async (parentId: string | null, values: any, { resetForm }: any) => {
    const data = {
        content: values.content,
        author_name: auth.isLoggedin ? auth.fullName : values.author_name,
        author_email: auth.isLoggedin ? auth.user?.personal?.email : values.author_email,
        rating: parentId ? null : values.rating,
        parent_id: parentId
    }

    isSubmitting.value = true
    try {
        await axios.post(`/blogs/public/${props.slug}/comments`, data)
        toast.success(parentId ? 'Reply posted!' : 'Comment posted!')

        resetForm()
        if (!parentId) rating.value = 0
        replyingTo.value = null

        await fetchComments()
    } catch (e) {
        toast.error('Failed to post comment')
    } finally {
        isSubmitting.value = false
    }
}

const setRating = (val: number, setFieldValue: any) => {
    rating.value = val
    setFieldValue('rating', val)
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

onMounted(() => {
    fetchComments()
})
</script>

<template>
    <div class="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
        <h3 class="font-display font-bold text-2xl mb-8 flex items-center gap-2">
            <MessageSquareIcon class="w-6 h-6 text-primary" />
            Reviews & Comments ({{ comments.length }})
        </h3>

        <!-- Main Comment Form -->
        <div class="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl mb-12">
            <h4 class="font-bold mb-4">Leave a review</h4>
            <Form :validation-schema="commentSchema" v-slot="{ setFieldValue }" @submit="(values, actions) => submitComment(null, values, actions)">
                <div class="space-y-4">
                    <div v-if="!auth.isLoggedin" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Field name="author_name" v-slot="{ field }">
                                <Input v-bind="field" placeholder="Your Name" />
                            </Field>
                            <ErrorMessage name="author_name" class="text-xs text-red-500 mt-1" />
                        </div>
                        <div>
                            <Field name="author_email" type="email" v-slot="{ field }">
                                <Input v-bind="field" type="email" placeholder="Your Email" />
                            </Field>
                            <ErrorMessage name="author_email" class="text-xs text-red-500 mt-1" />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-sm font-bold text-slate-500">Rating:</span>
                            <Field name="rating" type="number" class="hidden" v-model="rating" />
                            <div class="flex gap-1 cursor-pointer">
                                <StarIcon v-for="i in 5" :key="i" @click="setRating(i, setFieldValue)" class="w-5 h-5 transition-colors"
                                    :class="rating >= i ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300 dark:text-slate-600'" />
                            </div>
                        </div>
                        <ErrorMessage name="rating" class="text-xs text-red-500" />
                    </div>

                    <div>
                        <Field name="content" v-slot="{ field }">
                            <Textarea v-bind="field" placeholder="Share your thoughts..." class="min-h-[100px] bg-white dark:bg-slate-900" />
                        </Field>
                        <ErrorMessage name="content" class="text-xs text-red-500 mt-1" />
                    </div>

                    <div class="flex justify-end">
                        <Button type="submit" :disabled="isSubmitting">
                            Post Comment
                        </Button>
                    </div>
                </div>
            </Form>
        </div>

        <!-- Comments List -->
        <div v-if="isLoading" class="text-center py-8 text-slate-400">Loading comments...</div>

        <div v-else-if="comments.length === 0" class="text-center py-8 text-slate-400">
            No reviews yet. Be the first to comment!
        </div>

        <div v-else class="space-y-8">
            <div v-for="comment in comments" :key="comment.id" class="flex gap-4">
                <!-- Avatar -->
                <div
                    class="w-10 h-10 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center">
                    <img v-if="comment.user?.personal?.avatar?.file_name"
                        :src="showImage(comment.user.personal.avatar.file_name)" class="w-full h-full object-cover" />
                    <UserIcon v-else class="w-5 h-5 text-slate-400" />
                </div>

                <div class="flex-1 space-y-3">
                    <!-- Header -->
                    <div
                        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl rounded-tl-none">
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="font-bold">{{ comment.user ? (comment.user.personal?.first_name + ' ' + comment.user.personal?.last_name) : comment.author_name || 'Guest' }}</span>
                                <span v-if="comment.rating" class="flex text-yellow-400">
                                    <StarIcon v-for="i in comment.rating" :key="i" class="w-3 h-3 fill-current" />
                                </span>
                            </div>
                            <span class="text-xs text-slate-400">{{ formatDate(comment.created_at) }}</span>
                        </div>
                        <p class="text-sm text-slate-600 dark:text-slate-300">{{ comment.content }}</p>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center gap-4 pl-4">
                        <button @click="replyingTo = replyingTo === comment.id ? null : comment.id"
                            class="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                            <ReplyIcon class="w-3 h-3" /> Reply
                        </button>
                    </div>

                    <!-- Reply Form -->
                    <div v-if="replyingTo === comment.id"
                        class="pl-4 border-l-2 border-slate-100 dark:border-slate-800 space-y-4 py-4">
                        <Form :validation-schema="replySchema" @submit="(values, actions) => submitComment(comment.id, values, actions)">
                            <div class="space-y-4">
                                <div v-if="!auth.isLoggedin" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Field name="author_name" v-slot="{ field }">
                                            <Input v-bind="field" placeholder="Your Name" />
                                        </Field>
                                        <ErrorMessage name="author_name" class="text-xs text-red-500 mt-1" />
                                    </div>
                                    <div>
                                        <Field name="author_email" type="email" v-slot="{ field }">
                                            <Input v-bind="field" type="email" placeholder="Your Email" />
                                        </Field>
                                        <ErrorMessage name="author_email" class="text-xs text-red-500 mt-1" />
                                    </div>
                                </div>

                                <div>
                                    <Field name="content" v-slot="{ field }">
                                        <Textarea v-bind="field" placeholder="Write a reply..." class="min-h-[80px]" />
                                    </Field>
                                    <ErrorMessage name="content" class="text-xs text-red-500 mt-1" />
                                </div>
                                <div class="flex justify-end gap-2">
                                    <Button type="button" variant="ghost" @click="replyingTo = null">Cancel</Button>
                                    <Button type="submit" :disabled="isSubmitting">Post Reply</Button>
                                </div>
                            </div>
                        </Form>
                    </div>

                    <!-- Replies -->
                    <div v-if="comment.replies && comment.replies.length > 0" class="pl-4 space-y-4">
                        <div v-for="reply in comment.replies" :key="reply.id" class="flex gap-4">
                            <div
                                class="w-8 h-8 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center">
                                <img v-if="reply.user?.personal?.avatar?.file_name"
                                    :src="showImage(reply.user.personal.avatar.file_name)"
                                    class="w-full h-full object-cover" />
                                <UserIcon v-else class="w-4 h-4 text-slate-400" />
                            </div>
                            <div class="flex-1 bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl rounded-tl-none">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="font-bold text-sm">{{ reply.user ? (reply.user.personal?.first_name + ' ' + reply.user.personal?.last_name) : reply.author_name || 'Guest' }}</span>
                                    <span v-if="reply.rating" class="flex text-yellow-400">
                                        <StarIcon v-for="i in reply.rating" :key="i" class="w-2.5 h-2.5 fill-current" />
                                    </span>
                                </div>
                                <p class="text-sm text-slate-600 dark:text-slate-300">{{ reply.content }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
