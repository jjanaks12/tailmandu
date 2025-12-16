<script lang="ts" setup>
import type { TrailRace } from '~/lib/types';
import { useAxios } from '~/services/axios';


interface PaymentListProps {
    eventId: string
}

const props = defineProps<PaymentListProps>()
const { axios } = useAxios()

const event = ref<TrailRace | null>(null)

const fetchPayments = async () => {
    const { data } = await axios.get(`/events/${props.eventId}/payments`)
    event.value = data
}

onMounted(fetchPayments)  
</script>

<template>
    <Accordion collapsible :default-value="event.stages[0].id" v-if="event">
        <AccordionItem :value="stage.id" v-for="stage in event.stages">
            <AccordionTrigger>{{ stage.name }}</AccordionTrigger>
            <AccordionContent v-for="stageCategory in stage.stage_categories">
                <strong class="block mb-4">{{ stageCategory.name }}</strong>
                <Table class="mb-8">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="payment in stageCategory.payments">
                            <TableCell>{{ payment.runner.personal.first_name }}</TableCell>
                            <TableCell>{{ payment.amount }}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
</template>