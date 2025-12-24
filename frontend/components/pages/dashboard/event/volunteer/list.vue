<script lang="ts" setup>
import type { Checkpoint, Stage, Volunteer } from '~/lib/types'

interface VolunteerListProps {
    stages: Stage[]
}

const emit = defineEmits(['update'])
defineProps<VolunteerListProps>()

const selectedVolunteer = ref<Volunteer | null>(null)
const checkpoints = ref<Checkpoint[]>([])
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
                    <Badge variant="outline">{{volunteer.stages.map(s => s.name).join(', ')}}</Badge>
                    <p v-if="volunteer?.checkpoints.length > 0">
                        <span class="font-semibold text-xs uppercase text-gray-300">Assigned to:</span>
                        {{volunteer?.checkpoints.map(checkpoint => checkpoint.name).join(', ')}}
                    </p>
                </div>
                <Button variant="secondary" modifier="outline" @click="() => {
                    selectedVolunteer = volunteer
                    checkpoints = stage.stage_categories
                        .map(sc => sc.checkpoints)
                        .reduce((acc, curr) => ([...acc, ...curr]), [])
                }" v-if="volunteer.checkpoints.length == 0">Assign to checkpoint</Button>
            </li>
        </template>
    </ul>
    <Dialog :open="selectedVolunteer != null" @update:open="selectedVolunteer = null" v-if="selectedVolunteer">
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
</template>