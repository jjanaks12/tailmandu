<script lang="ts" setup>
    import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-vue-next'

    import TrailMapCheckpointForm from '@/components/pages/dashboard/event/checkpoint/form.vue'
    import type { Checkpoint } from '~/lib/types'
    import { useAxios } from '~/services/axios'

    interface TrailRaceStageListProps {
        stageCategoryId: string
    }

    const emit = defineEmits(['update'])
    const props = defineProps<TrailRaceStageListProps>()
    const { axios } = useAxios()

    const checkpoints = ref<Checkpoint[]>([])
    const showDialog = ref(false)
    const editCheckpoint = ref<Checkpoint | null>(null)

    const fetch = async () => {
        const { data } = await axios.get<Checkpoint[]>(`/events/${props.stageCategoryId}/checkpoints`)
        checkpoints.value = data
    }

    const destory = async (checkpointId: string) => {
        await axios.delete(`/events/checkpoints/${checkpointId}`)
    }

    onMounted(async () => {
        await fetch()
    })
</script>

<template>
    <div class="pt-8 pl-8">
        <div class="flex gap-2 pb-4 mb-5 border-b">
            <div class="grow">
                <h3>Checkpoints</h3>
            </div>
            <Button variant="secondary" size="sm" modifier="outline" @click="showDialog = true">
                <PlusIcon />
                Add a Checkpoint
            </Button>
        </div>
        <ul class="divide-y space-y-3">
            <li class="flex gap-2 pb-3" :value="checkpoint.id" v-for="checkpoint in checkpoints">
                <div class="grow space-y-1">
                    <strong class="block">{{ checkpoint.name }}</strong>
                    <Badge variant="outline" v-if="checkpoint.volunteers.length > 0">
                        has {{ checkpoint.volunteers.length }}
                        volunteer{{ checkpoint.volunteers.length > 1 ? 's' : '' }} assigned
                    </Badge>
                </div>
                <div class="flex justify-end gap-2">
                    <Button modifier="outline" variant="destructive" size="icon" @click="async () => {
                        await destory(checkpoint.id)
                        await fetch()
                    }">
                        <TrashIcon />
                    </Button>
                    <Button modifier="outline" size="icon" @click="() => {
                        showDialog = true
                        editCheckpoint = checkpoint
                    }">
                        <PencilIcon />
                    </Button>
                </div>
            </li>
        </ul>
    </div>
    <Dialog :open="showDialog" @update:open="showDialog = false">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Stage form</DialogTitle>
                <DialogDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda, maxime
                    distinctio at facere nesciunt vero eius neque voluptates numquam libero vel provident aliquam,
                    iusto,
                    dolorum non. Laboriosam, eveniet quibusdam.</DialogDescription>
            </DialogHeader>
            <TrailMapCheckpointForm :stageCategoryId="stageCategoryId" :checkpoint="editCheckpoint" @update="() => {
                showDialog = false
                editCheckpoint = null
                fetch()
                emit('update')
            }" />
        </DialogContent>
    </Dialog>
</template>