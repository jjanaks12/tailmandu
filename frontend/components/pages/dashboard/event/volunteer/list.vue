<script lang="ts" setup>
import { CheckIcon, CopyIcon } from 'lucide-vue-next'
import type { Checkpoint, Stage, Volunteer } from '~/lib/types'
import { useAxios } from '~/services/axios'

interface VolunteerListProps {
    stages: Stage[]
}

const emit = defineEmits(['update'])
defineProps<VolunteerListProps>()

const selectedVolunteer = ref<Volunteer | null>(null)
const checkpoints = ref<Checkpoint[]>([])
const showDeleteModal = ref(false)
const showAssignModal = ref(false)

const { copy, copied } = useClipboard()
const { axios } = useAxios()

const deleteVolunteer = async () => {
    await axios.delete(`/volunteers/${selectedVolunteer.value?.id}`)
    emit('update')
    showDeleteModal.value = false
    selectedVolunteer.value = null
}
</script>

<template>
    <ul class="divide-y space-y-4 [&>li]:pb-4">
        <template v-for="stage in stages">
            <li v-for="volunteer in stage.volunteers" class="flex gap-2 items-center">
                <div class="grow space-y-1">
                    <strong class="text-lg block">
                        {{ volunteer.personal.first_name }}
                        {{ volunteer.personal.middle_name }}
                        {{ volunteer.personal.last_name }}
                    </strong>
                    <em>
                        {{ volunteer.personal.email }}
                        <Button size="icon" modifier="outline" @click="copy(volunteer.personal.email)">
                            <CopyIcon class="size-4" v-if="!copied" />
                            <CheckIcon class="size-4" v-else />
                        </Button>
                    </em> <br />
                    <Badge variant="outline">{{volunteer.stages.map(s => s.name).join(', ')}}</Badge>
                    <p v-if="volunteer?.checkpoints.length > 0">
                        <span class="font-semibold text-xs uppercase text-gray-300">Assigned to:</span>
                        {{volunteer?.checkpoints.map(checkpoint => checkpoint.name).join(', ')}}
                    </p>
                </div>
                <div class="flex gap-2">
                    <Button variant="secondary" modifier="outline" @click="() => {
                        selectedVolunteer = volunteer
                        checkpoints = stage.stage_categories
                            .map(sc => sc.checkpoints)
                            .reduce((acc, curr) => ([...acc, ...curr]), [])
                        showAssignModal = true
                    }" v-if="volunteer.checkpoints.length == 0">Assign to checkpoint</Button>
                    <Button variant="destructive"
                        @click="showDeleteModal = true; selectedVolunteer = volunteer">Delete</Button>
                </div>
            </li>
        </template>
    </ul>
    <Dialog :open="showAssignModal" @update:open="showAssignModal = false; selectedVolunteer = null"
        v-if="selectedVolunteer">
        <DialogContent>
            <DialogHeader>
                <DialogTitle class="text-2xl">Assign volunteers to checkpoint</DialogTitle>
                <DialogDescription>You can indiviually assign volunteers to the available checkpoints
                </DialogDescription>
            </DialogHeader>
            <PagesDashboardEventVolunteerAssignCheckpointForm :volunteer="selectedVolunteer" :checkpoints="checkpoints"
                @update="() => {
                    selectedVolunteer = null
                    emit('update')
                }" />
        </DialogContent>
    </Dialog>
    <Dialog :open="showDeleteModal" @update:open="showDeleteModal = false">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure you want to delete this volunteer?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button @click="showDeleteModal = false">Cancel</Button>
                <Button @click="deleteVolunteer">Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>