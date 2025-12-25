<script lang="ts" setup>
import { MapIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-vue-next'

import TrailMapStageForm from '@/components/pages/dashboard/event/stages/form.vue'
import CategoryList from '@/components/pages/dashboard/event/category/List.vue'

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
    <div class="space-y-4">
        <Tabs orientation="vertical" :default-value="stages[0]?.id" class="flex-row gap-4">
            <TabsList class="flex-col h-full">
                <TabsTrigger v-for="stage in stages" :value="stage.id">{{ stage.name }}</TabsTrigger>
            </TabsList>
            <div class="grow">
                <TabsContent v-for="stage in stages" :value="stage.id">
                    <div class="flex justify-end gap-2 pb-4 mb-8 border-b">
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
                    <div class="space-y-2">
                        <h2 class="text-xl">{{ stage.name }}</h2>
                        <div class="space-x-3">
                            <Badge v-if="stage.runners.length > 0">runners {{ stage.runners.length }}</Badge>
                            <Badge v-if="stage.volunteers.length > 0">volunteers {{ stage.volunteers.length }}</Badge>
                        </div>
                        <p v-text="stage.excerpt" />
                        <CategoryList :stage-id="stage.id" @update="emit('update')" />
                    </div>
                </TabsContent>
            </div>
        </Tabs>
    </div>
    <!-- Showing add / edit form for stage -->
    <Dialog :open="showDialog" @update:open="showDialog = false">
        <DialogContent class="sm:max-w-[1000px] max-h-full overflow-y-auto">
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
    <!-- showing map for stage -->
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