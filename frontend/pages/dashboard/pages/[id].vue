<script setup lang="ts">
import { ArrowLeftIcon } from 'lucide-vue-next'
import { usePageStore } from '~/store/page'

useHead({
    title: 'Edit Page'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    permission: [],
    role: 'Admin'
})

const route = useRoute()
const router = useRouter()
const { getPage } = usePageStore()

const page = ref<any>(null)
const isLoading = ref(true)

const fetchPage = async () => {
    isLoading.value = true
    try {
        page.value = await getPage(route.params.id as string)
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
}

onMounted(fetchPage)
</script>

<template>
    <div class="flex items-center gap-4 mb-8">
        <Button modifier="outline" size="icon" @click="router.push('/dashboard/pages')">
            <ArrowLeftIcon class="size-4" />
        </Button>
        <div>
            <h1 class="text-2xl font-bold">Edit Page</h1>
            <p class="text-muted-foreground">Modify the content and SEO properties of this static page.</p>
        </div>
    </div>

    <div v-if="isLoading" class="p-8 text-center text-muted-foreground">
        Loading page details...
    </div>

    <div v-else-if="page" class="bg-background rounded-xl p-6 border shadow-sm">
        <PagesDashboardPagesForm :page="page" @success="router.push('/dashboard/pages')" />
    </div>

    <div v-else class="p-8 text-center text-red-500">
        Page not found.
    </div>
</template>
