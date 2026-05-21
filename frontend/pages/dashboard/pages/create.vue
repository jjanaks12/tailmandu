<script setup lang="ts">
import { ArrowLeftIcon } from 'lucide-vue-next'

useHead({
    title: 'Create Page'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    permission: [],
    role: 'Admin'
})

const router = useRouter()
</script>

<template>
    <div class="flex items-center gap-4 mb-8">
        <Button modifier="outline" size="icon" @click="router.push('/dashboard/pages')">
            <ArrowLeftIcon class="size-4" />
        </Button>
        <div>
            <h1 class="text-2xl font-bold">Create Page</h1>
            <p class="text-muted-foreground">Add a new static page to your website.</p>
        </div>
    </div>

    <div class="bg-background rounded-xl p-6 border shadow-sm">
        <PagesDashboardPagesForm :page="null" @success="router.push('/dashboard/pages')" />
    </div>
</template>
