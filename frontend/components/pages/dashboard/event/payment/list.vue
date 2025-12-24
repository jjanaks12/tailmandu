<script lang="ts" setup>
import { PencilIcon } from 'lucide-vue-next'
import type { StageCategoryPayment } from '~/lib/types'
import StageCategoryPaymentForm from '@/components/pages/dashboard/event/payment/form.vue'

interface PaymentListProps {
    stageCategoryId: string
    payments: StageCategoryPayment[]
}

const emit = defineEmits(['update'])
const props = defineProps<PaymentListProps>()
const showDialog = ref(false)
const stagePayment = ref<StageCategoryPayment | null>(null)

const availablePayments = computed(() => props.payments.map(payment => payment.type) || [])

</script>

<template>
    <div class="py-8 pl-8 border-b">
        <div class="flex gap-2 pb-4 mb-2 border-b">
            <strong class="grow">Payments:</strong>
            <Button variant="secondary" @click="showDialog = true" v-if="availablePayments.length < 2">
                Add payment details
            </Button>
        </div>
        <ul class="divide-y divide-accent">
            <li v-for="payment in payments" class="flex gap-2 items-center py-2">
                <div class="grow">
                    <Badge variant="info">{{ payment.type }}</Badge>
                    Rs.{{ payment.amount }}
                </div>
                <Button variant="secondary" size="icon" modifier="outline"
                    @click="showDialog = true; stagePayment = payment">
                    <PencilIcon />
                </Button>
            </li>
        </ul>
    </div>
    <Dialog :open="showDialog" @update:open="showDialog = false; stagePayment = null">
        <DialogContent class="sm:max-w-[600px] max-h-full overflow-y-auto">
            <DialogHeader>
                <DialogTitle>
                    {{ stagePayment ? 'Edit payment details' : 'Add payment details' }}
                </DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <StageCategoryPaymentForm :available-payments="availablePayments" :stage-category-id="stageCategoryId"
                :payment="stagePayment" @update="async () => {
                    showDialog = false
                    stagePayment = null
                    emit('update')
                }" />
        </DialogContent>
    </Dialog>
</template>