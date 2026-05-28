<script setup lang="ts">
import { ArrowLeftIcon } from 'lucide-vue-next'
import { useAxios } from '~/services/axios'

useHead({ title: 'Edit Team Member' })

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    role: 'Admin'
})

const route = useRoute()
const router = useRouter()
const teamMember = ref<any>(null)
const { axios } = useAxios()

onMounted(async () => {
    try {
        const { data } = await axios.get(`/teams/${route.params.id}`)
        teamMember.value = data
    } catch (e) {
        console.error(e)
        router.push('/dashboard/teams')
    }
})
</script>

<template>
    <div class="mb-12">
        <Button modifier="link" class="mb-4 pl-0" @click="router.back()">
            <ArrowLeftIcon class="w-4 h-4 mr-2" />
            Back to Team Members
        </Button>
        <h1 class="text-2xl">Edit Team Member</h1>
    </div>

    <PagesDashboardTeamsForm v-if="teamMember" :teamMember="teamMember" @success="router.push('/dashboard/teams')" />
    <div v-else class="text-center py-20 text-muted-foreground">Loading team member...</div>
</template>
