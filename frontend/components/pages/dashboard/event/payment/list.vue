<script lang="ts" setup>
import { PencilIcon, PlusIcon } from 'lucide-vue-next'
import type { StageCategoryPayment } from '~/lib/types'
import StageCategoryPaymentForm from '@/components/pages/dashboard/event/payment/form.vue'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PaymentListProps {
    stageCategoryId: string
    payments: StageCategoryPayment[]
}

const emit = defineEmits(['update'])
const props = defineProps<PaymentListProps>()
const showDialog = ref(false)
const stagePayment = ref<StageCategoryPayment | null>(null)

const availablePayments = computed(() => props.payments?.map(payment => payment.type) || [])

</script>

<template>
    <div class="space-y-6">
        <div class="flex justify-between items-center mb-6">
            <h4 class="font-headline font-semibold text-lg text-foreground">Payments</h4>
            <Button variant="ghost" class="text-primary hover:text-primary hover:bg-primary/10"
                @click="showDialog = true" v-if="availablePayments.length < 2">
                <PlusIcon class="w-4 h-4 mr-2" />
                Add payment details
            </Button>
        </div>

        <div class="space-y-2">
            <!-- Payment Items -->
            <Card v-for="payment in payments" :key="payment.id"
                class="group hover:bg-muted/50 transition-colors shadow-none border bg-muted/30 py-0">
                <CardHeader class="flex flex-row items-center justify-between p-4 space-y-0">
                    <div class="flex items-center gap-2">
                        <Badge variant="info">{{ payment.type }}</Badge>
                        <span class="text-sm font-body font-semibold ml-2">Rs.{{ payment.amount }}</span>
                    </div>
                    <div class="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="secondary" size="icon" @click="() => {
                            showDialog = true; 
                            stagePayment = payment;
                        }" class="w-8 h-8">
                            <PencilIcon class="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>
            </Card>
        </div>
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
                :payment="stagePayment" @update="() => {
                    showDialog = false
                    stagePayment = null
                    $emit('update')
                }" />
        </DialogContent>
    </Dialog>
</template>