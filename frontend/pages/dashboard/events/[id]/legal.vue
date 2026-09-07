<script lang="ts" setup>
import ClearCacheButton from '@/components/pages/dashboard/event/ClearCacheButton.vue'
import type { TrailRace } from '~/lib/types'
import { useEventStore } from '~/store/event'
import EventSidebar from '@/components/pages/dashboard/event/sidebar.vue'
import TiptapEditor from '~/components/TiptapEditor.vue'
import { ref, onMounted } from 'vue'
import { toast } from 'vue-sonner'
import { useAxios } from '~/services/axios'

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['event_view']
})

const route = useRoute()
const { get } = useEventStore()
const trailRace = ref<TrailRace | null>(null)
const { axios } = useAxios()

const liability_waiver = ref('')
const policies = ref('')
const isSaving = ref(false)

onMounted(async () => {
    trailRace.value = await get(route.params.id as string)
    if (trailRace.value) {
        liability_waiver.value = trailRace.value.liability_waiver || ''
        policies.value = trailRace.value.policies || ''
    }
})

const saveLegal = async () => {
    isSaving.value = true
    try {
        await axios.put(`/api/events/${route.params.id}/update_legal`, {
            liability_waiver: liability_waiver.value,
            policies: policies.value
        })
        toast.success("Legal & Policies saved successfully")
    } catch (error) {
        toast.error("Failed to save Legal & Policies")
    } finally {
        isSaving.value = false
    }
}
</script>

<template>
    <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-2 text-sm text-gray-500">
            <NuxtLink to="/dashboard/events" class="hover:text-primary transition-colors">Events</NuxtLink>
            <span>/</span>
            <NuxtLink :to="`/dashboard/events/${route.params.id}`" class="hover:text-primary transition-colors">{{ trailRace?.name || 'Loading...' }}</NuxtLink>
            <span>/</span>
            <span class="text-gray-900 font-medium">Legal & Policies</span>
        </div>
        <ClearCacheButton :event-id="route.params.id as string" />
    </div>

    <div class="flex flex-col md:flex-row gap-6">
        <div class="flex-grow">
            <Card v-if="trailRace">
                <CardHeader>
                    <CardTitle>Legal & Policies</CardTitle>
                    <CardDescription>Configure the liability waiver and policies for this race.</CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <div>
                        <Label class="text-sm font-medium mb-2 block">Liability Waiver</Label>
                        <div class="border rounded-md">
                            <TiptapEditor v-model="liability_waiver" />
                        </div>
                    </div>
                    <div>
                        <Label class="text-sm font-medium mb-2 block">Policies (Food, Refund, Safety, Transportation)</Label>
                        <div class="border rounded-md">
                            <TiptapEditor v-model="policies" />
                        </div>
                    </div>
                    <Button @click="saveLegal" :disabled="isSaving" class="w-full md:w-auto">
                        <template v-if="isSaving">Saving...</template>
                        <template v-else>Save Changes</template>
                    </Button>
                </CardContent>
            </Card>
        </div>
        <EventSidebar />
    </div>
</template>
