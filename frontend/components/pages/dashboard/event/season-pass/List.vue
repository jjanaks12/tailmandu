<script lang="ts" setup>
import { PlusIcon } from 'lucide-vue-next'
import type { TrailRace, SeasonPass } from '~/lib/types'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import SeasonPassItem from './Item.vue'
import SeasonPassForm from './Form.vue'

import { useAxios } from '~/services/axios'

interface SeasonPassListProps {
    eventId: string
}

const props = defineProps<SeasonPassListProps>()
const emit = defineEmits(['update'])

const { axios } = useAxios()
const showDialog = ref(false)
const selectedPass = ref<SeasonPass | null>(null)
const passes = ref<SeasonPass[]>([])

const loadEvent = async () => {
    const { data } = await axios.get(`/events/${props.eventId}/season-passes`)
    passes.value = data
}

onMounted(() => {
    loadEvent()
})

const deletePass = async (id: string) => {
    await axios.delete(`/events/season-passes/${id}`)
    await loadEvent()
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex justify-between items-center mb-6">
            <h2 class="font-headline font-semibold text-2xl text-foreground">Season Passes</h2>
            <Button @click="showDialog = true">
                <PlusIcon class="w-4 h-4 mr-2" />
                Add season pass
            </Button>
        </div>

        <div v-if="passes.length === 0"
            class="text-center py-12 px-4 bg-muted/30 rounded-xl border border-dashed border-border">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <PlusIcon class="w-6 h-6" />
            </div>
            <h3 class="font-headline font-semibold text-lg text-foreground mb-2">No season passes added</h3>
            <p class="text-muted-foreground font-body max-w-sm mx-auto mb-6">Create season passes to allow users to
                register for multiple stages at once with a fixed price.</p>
            <Button @click="showDialog = true" modifier="outline">
                <PlusIcon class="w-4 h-4 mr-2" />
                Add season pass
            </Button>
        </div>

        <div v-else class="space-y-6">
            <template v-for="pass in passes" :key="pass.id">
                <SeasonPassItem :season-pass="pass" @update="loadEvent"
                    @edit="() => { showDialog = true; selectedPass = pass }" @delete="() => deletePass(pass.id)" />
            </template>
        </div>

        <Dialog :open="showDialog" @update:open="showDialog = false; selectedPass = null">
            <DialogContent class="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{{ selectedPass ? 'Edit' : 'Add' }} Season Pass</DialogTitle>
                </DialogHeader>
                <SeasonPassForm :event-id="eventId" :season-pass="selectedPass"
                    @update="() => { showDialog = false; selectedPass = null; loadEvent() }" />
            </DialogContent>
        </Dialog>
    </div>
</template>
