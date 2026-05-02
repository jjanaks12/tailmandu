<script setup lang="ts">
import { ArrowLeftIcon, Loader2Icon } from 'lucide-vue-next'
import { useBlogStore } from '~/store/blog'

const route = useRoute()
const router = useRouter()
const { getPost } = useBlogStore()
const post = ref<any>(null)
const isLoading = ref(true)

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['manage_user']
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
                <Button as-child>
                    <NuxtLink :to="$localePath(`/blogs/${post.slug}`)" target="_blank">Preview</NuxtLink>
                </Button>
            </div>
        </template>
    </PagesDashboardBlogsForm>
</template>