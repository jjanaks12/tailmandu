<script lang="ts" setup>
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-vue-next'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useAxios } from '~/services/axios'
import type { SeasonPassPayment } from '~/lib/types'
import SeasonPassPaymentForm from './Form.vue'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PaymentListProps {
    seasonPassId: string
    payments: SeasonPassPayment[]
}

const emit = defineEmits(['update'])
const { axios } = useAxios()
const props = defineProps<PaymentListProps>()
const showDialog = ref(false)
const passPayment = ref<SeasonPassPayment | null>(null)

const deletePayment = async (id: string) => {
    await axios.delete(`/events/season-passes/payments/${id}`)
    emit('update')
}

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
                            passPayment = payment;
                        }" class="w-8 h-8">
                            <PencilIcon class="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="icon" class="w-8 h-8">
                                    <TrashIcon class="w-4 h-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete this payment details.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction @click="deletePayment(payment.id)">Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardHeader>
            </Card>
        </div>
    </div>
    <Dialog :open="showDialog" @update:open="showDialog = false; passPayment = null">
        <DialogContent class="sm:max-w-[600px] max-h-full overflow-y-auto">
            <DialogHeader>
                <DialogTitle>
                    {{ passPayment ? 'Edit payment details' : 'Add payment details' }}
                </DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <SeasonPassPaymentForm :available-payments="availablePayments" :season-pass-id="seasonPassId"
                :payment="passPayment" @update="() => {
                    showDialog = false
                    passPayment = null
                    $emit('update')
                }" />
        </DialogContent>
    </Dialog>
</template>
