<script lang="ts" setup>
import { PencilIcon, TrashIcon } from 'lucide-vue-next'
import type { StageCategory, StageCategoryPayment } from '~/lib/types'
import CheckpointList from '@/components/pages/dashboard/event/checkpoint/list.vue'
import moment from 'moment'
import { useAxios } from '~/services/axios'
import StageCategoryPaymentList from '@/components/pages/dashboard/event/payment/list.vue'

interface StageCategoryItemProps {
    stageCategory: StageCategory
}
const props = defineProps<StageCategoryItemProps>()
const emit = defineEmits(['event_started', 'event_ended', 'update', 'edit', 'delete'])
const { axios } = useAxios()


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
    <div class="space-y-6">
        <Card class="group hover:bg-muted/50 transition-colors shadow-sm">
            <CardHeader class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div class="flex-1 space-y-1">
                    <div class="flex items-baseline gap-2 mb-1">
                        <CardTitle class="text-lg font-headline">{{ stageCategory.name }}</CardTitle>
                        <span class="text-xs text-muted-foreground font-body">BIB range: ({{ stageCategory.bib_range
                            }})</span>
                    </div>
                    <CardDescription class="text-sm leading-relaxed font-body">
                        {{ stageCategory.excerpt }}
                    </CardDescription>
                </div>
                <div class="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="icon" @click="emit('edit')" class="h-8 w-8">
                        <PencilIcon class="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" @click="emit('delete')" class="h-8 w-8">
                        <TrashIcon class="w-4 h-4" />
                    </Button>
                </div>
            </CardHeader>
        </Card>

        <div class="border-t border-dashed pt-4 mb-4" v-if="stageCategory.payment?.length > 0">
            <StageCategoryPaymentList :stage-category-id="stageCategory.id" :payments="stageCategory.payment"
                @update="emit('update')" />
        </div>

        <div class="border-t border-dashed my-8 pt-8">
            <CheckpointList :stage-category-id="stageCategory.id" />
        </div>
    </div>
</template>