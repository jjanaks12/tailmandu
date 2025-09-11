<script lang="ts" setup>
    import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-vue-next'

    import TrailMapCheckpointForm from '@/components/pages/dashboard/event/checkpoint/form.vue'
    import type { Checkpoint } from '~/lib/types'
    import { useCheckpointStore } from '~/store/checkpoint'

    interface TrailRaceStageListProps {
        eventId: string
    }

    const emit = defineEmits(['update'])
    const props = defineProps<TrailRaceStageListProps>()
    const { fetch, destory } = useCheckpointStore()
    const { checkpoints } = storeToRefs(useCheckpointStore())

    const showDialog = ref(false)
    const editCheckpoint = ref<Checkpoint | null>(null)

    onMounted(async () => {
        await fetch(props.eventId)
    })
</script>

<template>
    <div class="text-right mb-12">
        <Button variant="secondary" @click="showDialog = true">
            <PlusIcon />
            Add Checkpoint
        </Button>
    </div>
    <Accordion type="single">
        <AccordionItem :value="checkpoint.id" v-for="checkpoint in checkpoints">
            <AccordionTrigger>
                {{ checkpoint.name }}
            </AccordionTrigger>
            <AccordionContent>
                <div class="flex justify-end gap-2 mb-8">
                    <Button variant="destructive" @click="async () => {
                        await destory(checkpoint.id)
                        await fetch(eventId)
                    }">
                        <TrashIcon />
                    </Button>
                    <Button size="icon" @click="() => {
                        showDialog = true
                        editCheckpoint = checkpoint
                    }">
                        <PencilIcon />
                    </Button>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
    <Dialog :open="showDialog" @update:open="showDialog = false">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Stage form</DialogTitle>
                <DialogDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda, maxime
                    distinctio at facere nesciunt vero eius neque voluptates numquam libero vel provident aliquam,
                    iusto,
                    dolorum non. Laboriosam, eveniet quibusdam.</DialogDescription>
            </DialogHeader>
            <TrailMapCheckpointForm :event-id="eventId" :checkpoint="editCheckpoint" @update="() => {
                showDialog = false
                editCheckpoint = null
                fetch(eventId)
                emit('update')
            }" />
        </DialogContent>
    </Dialog>
</template>