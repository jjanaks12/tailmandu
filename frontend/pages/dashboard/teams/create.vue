<script setup lang="ts">
import { ArrowLeftIcon } from 'lucide-vue-next'

useHead({ title: 'Add Team Member' })

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    role: 'Admin'
})

const router = useRouter()
</script>

<template>
    <div class="mb-12">
        <Button modifier="link" class="mb-4 pl-0" @click="router.back()">
            <ArrowLeftIcon class="w-4 h-4 mr-2" />
            Back to Team Members
        </Button>
        <h1 class="text-2xl">Add Team Member</h1>
    </div>

    <PagesDashboardTeamsForm @success="router.push('/dashboard/teams')" />
</template>
