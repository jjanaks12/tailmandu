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
    <div class="space-y-6">
        <div class="flex justify-between items-center mb-6">
            <h4 class="font-headline font-semibold text-lg text-foreground">Checkpoints</h4>
            <Button variant="ghost" class="text-primary hover:text-primary hover:bg-primary/10"
                @click="showDialog = true">
                <PlusIcon class="w-4 h-4 mr-2" />
                Add a Checkpoint
            </Button>
        </div>

        <div class="space-y-2">
            <!-- CP Items -->
            <Card v-for="checkpoint in checkpoints" :key="checkpoint.id"
                class="group hover:bg-muted/50 transition-colors shadow-none border bg-muted/30 py-0">
                <CardHeader class="flex flex-row items-center justify-between p-4 space-y-0">
                    <div class="flex items-center gap-2">
                        <CardTitle class="text-sm font-body font-semibold">{{ checkpoint.name }}</CardTitle>
                        <Badge variant="outline" v-if="checkpoint.volunteers.length > 0"
                            class="ml-2 text-xs bg-background">
                            has {{ checkpoint.volunteers.length }} volunteer{{ checkpoint.volunteers.length > 1 ? 's' :
                            '' }} assigned
                        </Badge>
                    </div>
                    <div class="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="secondary" size="icon" @click="() => {
                            showDialog = true
                            editCheckpoint = checkpoint
                        }" class="w-8 h-8">
                            <PencilIcon class="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="icon" @click="async () => {
                            await destory(checkpoint.id)
                            await fetch()
                        }" class="w-8 h-8">
                            <TrashIcon class="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>
            </Card>
        </div>
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