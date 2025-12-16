<script lang="ts" setup>
import { useAxios } from '~/services/axios'
import type { SponsorType } from '~/lib/types'
import { PencilIcon, TrashIcon } from 'lucide-vue-next'
import SponsorTypeForm from '~/components/pages/dashboard/sponsor_type/Form.vue'

const { axios } = useAxios()

const sponsorTypes = ref<SponsorType[]>([])

useHead({
    title: 'Sponsor Type'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    role: 'Admin',
    authorization: ['manage_sponsorType']
})

const showDialog = ref(false)
const editSponsorType = ref<SponsorType | null>(null)

const fetch = async () => {
    const { data } = await axios.get('/sponsor_types')
    sponsorTypes.value = data
}

const deleteSponsorType = async (id: string) => {
    await axios.delete(`/sponsor_types/${id}`)
    fetch()
}

onMounted(fetch)
</script>

<template>
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-primary text-2xl">Sponsor Type</h1>
        <Button type="button" @click="showDialog = true">Add Sponsor Type </Button>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="sponsorType in sponsorTypes" :key="sponsorType.id">
                <TableCell>{{ sponsorType.name }}</TableCell>
                <TableCell class="space-x-2">
                    <Button type="button" modifier="outline" size="icon"
                        @click="showDialog = true; editSponsorType = sponsorType">
                        <PencilIcon class="mr-2 h-4 w-4" />
                    </Button>
                    <Button type="button" variant="secondary" modifier="outline" size="icon"
                        @click="deleteSponsorType(sponsorType.id)">
                        <TrashIcon class="mr-2 h-4 w-4" />
                    </Button>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <Dialog v-model:open="showDialog" @update:open="editSponsorType = null; showDialog = false">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{{ editSponsorType ? 'Edit' : 'Add' }} Sponsor Type</DialogTitle>
                <DialogDescription>
                    This form collects details regarding your chosen sponsorship tier.
                </DialogDescription>
            </DialogHeader>
            <SponsorTypeForm :sponsorType="editSponsorType"
                @close="showDialog = false; editSponsorType = null; fetch()" />
        </DialogContent>
    </Dialog>
</template>