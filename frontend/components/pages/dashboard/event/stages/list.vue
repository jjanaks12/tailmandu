<script lang="ts" setup>
    import { MapIcon, PencilIcon, PlusIcon, ScanIcon, TrashIcon } from 'lucide-vue-next'

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
    const trailRaceStage = ref<Stage | null>(null)
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
    <ul>
        <li v-for="stage in stages" class="flex">
            <div class="flex-grow">
                {{ stage.name }}
                <Badge v-if="stage.runners.length > 0">{{ stage.runners.length }}</Badge>
            </div>
            <div class="flex justify-end gap-2 mb-8">
                <Button variant="runner" size="icon" @click="() => {
                    trailRaceStage = stage
                }">
                    <MapIcon />
                </Button>
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
        </li>
    </ul>
    <Dialog :open="showDialog" @update:open="showDialog = false">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Stage form</DialogTitle>
                <DialogDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda, maxime.
                </DialogDescription>
            </DialogHeader>
            <TrailMapStageForm :event-id="eventId" :stage="editStage" @update="() => {
                showDialog = false
                editStage = null
                fetch(eventId)
                emit('update')
            }" />
        </DialogContent>
    </Dialog>
    <Dialog :open="trailRaceStage != null" @update:open="trailRaceStage = null">
        <DialogContent class="sm:max-w-[1000px]">
            <DialogHeader>
                <DialogTitle>Map</DialogTitle>
                <DialogDescription>Some text</DialogDescription>
            </DialogHeader>
            <Map map-id="someId" :center="[27.756846786775668, 85.3124535214843]"
                :gpxFile="getGPXFile(trailRaceStage?.map_file.file_name as string)" v-if="trailRaceStage" />
        </DialogContent>
    </Dialog>
</template>