<script lang="ts" setup>
    import { PencilIcon, PlusIcon, ScanIcon, TrashIcon } from 'lucide-vue-next'

    import TrailMapStageForm from '@/components/pages/dashboard/event/stages/form.vue'
    import { useStageStore } from '~/store/stage'
    import type { Stage } from '~/lib/types'
    import { getGPXFile } from '~/lib/filters'

    interface TrailRaceStageListProps {
        eventId: string
    }

    const emit = defineEmits(['update'])
    const props = defineProps<TrailRaceStageListProps>()
    const { fetch, destory } = useStageStore()
    const { stages } = storeToRefs(useStageStore())

    const showDialog = ref(false)
    const editStage = ref<Stage | null>(null)

    onMounted(async () => {
        await fetch(props.eventId)
    })
</script>

<template>
    <div class="text-right mb-12">
        <Button variant="secondary" @click="showDialog = true">
            <PlusIcon />
            Add stage
        </Button>
    </div>
    <Accordion type="single">
        <AccordionItem :value="stage.id" v-for="stage in stages">
            <AccordionTrigger>
                {{ stage.name }}
                <Badge v-if="stage.runners.length > 0">{{ stage.runners.length }}</Badge>
            </AccordionTrigger>
            <AccordionContent>
                <div class="flex justify-end gap-2 mb-8">
                    <Button variant="destructive" @click="async () => {
                        await destory(stage.id)
                        fetch(eventId)
                    }">
                        <TrashIcon />
                    </Button>
                    <Button size="icon" @click="() => {
                        showDialog = true
                        editStage = stage
                    }">
                        <PencilIcon />
                    </Button>
                </div>
                <!-- <ClientOnly>
                    <Map :gpxFile="getGPXFile(stage.map_file.file_name)" v-if="stage.map_file" />
                </ClientOnly> -->
            </AccordionContent>
        </AccordionItem>
    </Accordion>
    <Dialog :open="showDialog" @update:open="showDialog = false">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Stage form</DialogTitle>
                <DialogDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda, maxime.</DialogDescription>
            </DialogHeader>
            <TrailMapStageForm :event-id="eventId" :stage="editStage" @update="() => {
                showDialog = false
                editStage = null
                fetch(eventId)
                emit('update')
            }" />
        </DialogContent>
    </Dialog>
</template>