<script lang="ts" setup>
import type { Sponsor } from '~/lib/types'
import { useAxios } from '~/services/axios'
import SponsorForm from './form.vue'
import { showImage } from '~/lib/filters';

interface SponsorProps {
    eventId: string
}

const props = defineProps<SponsorProps>()
const { axios } = useAxios()

const sponsors = ref<Sponsor[]>([])
const showDialog = ref(false)
const editSponsor = ref<Sponsor | null>(null)

const fetch = async () => {
    const { data } = await axios.get(`/events/${props.eventId}/sponsors`)
    sponsors.value = data
}

onMounted(fetch)
</script>

<template>
    <div class="text-right mb-12">
        <Button type="button" @click="showDialog = true">Add Sponsor</Button>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="sponsor in sponsors" :key="sponsor.id">
                <TableCell>
                    <Avatar class="w-12 h-12 inline-block align-middle">
                        <AvatarImage :src="showImage(sponsor.thumbnail.file_name as string)" />
                        <AvatarFallback>{{ sponsor.name.charAt(0).toUpperCase() }}</AvatarFallback>
                    </Avatar>
                    {{ sponsor.name }}
                </TableCell>
                <TableCell>{{ sponsor.description }}</TableCell>
                <TableCell>{{ sponsor.sponsorType.name }}</TableCell>
                <TableCell>{{ sponsor.url }}</TableCell>
                <TableCell>
                    <Button type="button" variant="secondary"
                        @click="editSponsor = sponsor; showDialog = true">Edit</Button>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <Dialog :open="showDialog" @update:open="showDialog = false">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Sponsor</DialogTitle>
                <DialogDescription>
                    Add a new sponsor to the event
                </DialogDescription>
            </DialogHeader>
            <SponsorForm :event-id="props.eventId" :sponsor="editSponsor" @close="showDialog = false; fetch()" />
        </DialogContent>
    </Dialog>
</template>