<script lang="ts" setup>
import { PencilIcon, TrashIcon } from 'lucide-vue-next'
import type { StageCategory } from '~/lib/types'
import CheckpointList from '@/components/pages/dashboard/event/checkpoint/list.vue'
import moment from 'moment'
import { useAxios } from '~/services/axios'
import StageCategoryPaymentForm from '@/components/pages/dashboard/event/payment/form.vue'

interface StageCategoryItemProps {
    stageCategory: StageCategory
}
const props = defineProps<StageCategoryItemProps>()
const emit = defineEmits(['event_started', 'event_ended', 'update'])
const { axios } = useAxios()

const showPaymentDialog = ref(false)

const hasFinished = computed(() => moment().isAfter(moment(props.stageCategory.end, 'YYYY-MM-DDTHH:mm:ss.T').endOf('day')))
const isToday = computed(() => moment().isBetween(
    moment(props.stageCategory.end, 'YYYY-MM-DDTHH:mm:ss.T').startOf('day'),
    moment(props.stageCategory.end, 'YYYY-MM-DDTHH:mm:ss.T').endOf('day')
))
const hasStarted = computed(() => moment(props.stageCategory.end, 'YYYY-MM-DDTHH:mm:ss.T').get('hour') !== 0)

const startEvent = async () => {
    await axios.patch(`/events/stage_categories/${props.stageCategory.id}/start`)
    emit('event_started')
}
const endEvent = async () => {
    await axios.patch(`/events/stage_categories/${props.stageCategory.id}/end`)
    emit('event_ended')
}
</script>

<template>
    <div>
        <Button @click="startEvent" v-if="!hasFinished && isToday">Start</Button>
        <Button @click="endEvent" v-if="hasStarted && !hasFinished">End</Button>
        <div class="flex gap-2">
            <div class="grow">
                <strong>{{ stageCategory.name }}</strong>
                <p class="mb-4" v-text="stageCategory.excerpt" />
            </div>
            <div class="flex gap-2">
                <Button size="sm" modifier="outline" @click="showPaymentDialog = true">
                    {{ stageCategory.payment ? 'Edit payment details' : 'Add payment details' }}
                </Button>
                <Button variant="secondary" size="icon" modifier="outline">
                    <PencilIcon />
                </Button>
                <Button variant="destructive" size="icon" modifier="outline">
                    <TrashIcon />
                </Button>
            </div>
        </div>
        <div class="border-t border-dashed pt-4">
            <CheckpointList :stage-category-id="stageCategory.id" />
        </div>
    </div>
    <Dialog :open="showPaymentDialog" @update:open="showPaymentDialog = false">
        <DialogContent class="sm:max-w-[600px] max-h-full overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Add payment details</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <StageCategoryPaymentForm :stage-category-id="stageCategory.id" :payment="stageCategory.payment" @update="async () => {
                showPaymentDialog = false
                emit('update')
            }" />
        </DialogContent>
    </Dialog>
</template>