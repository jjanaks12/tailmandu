<script setup lang="ts">
import { EllipsisVerticalIcon } from 'lucide-vue-next';
import moment from 'moment';
import type { EventRunner } from '~/lib/types';

interface RunnerItemProps {
    runner: EventRunner
}

const emit = defineEmits(['show:runner', 'show:payment', 'updated:payment'])
const props = defineProps<RunnerItemProps>()

const hasPayment = computed(() => props.runner.payments.length > 0)
</script>

<template>
    <TableRow>
        <TableCell>
            <em class="no-italic block">{{ runner.bib }}</em>
            <strong class="block">
                {{ runner.personal.first_name }}
                {{ runner.personal.middle_name }}
                {{ runner.personal.last_name }}
            </strong>
            <Badge>
                {{ moment().diff(moment(runner.personal.date_of_birth), 'years') }}
                {{ runner.personal?.gender?.name.charAt(0).toUpperCase() }}
            </Badge>
        </TableCell>
        <TableCell>
            {{ runner.payments[0]?.status }}
        </TableCell>
        <TableCell>{{ runner.payments[0]?.method }}</TableCell>
        <TableCell class="text-center">
            <div class="block">
                <span :class="{ 'flag': true, ['flag-' + runner.personal.country.abbr]: true }" />
            </div>
            {{ runner.personal?.country?.name }}
        </TableCell>
        <TableCell>{{ runner.personal?.gender?.name }}</TableCell>
        <TableCell class="text-right">
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button size="sm" modifier="link">
                        <EllipsisVerticalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem class="text-gray-500" @click="emit('show:runner')">
                        See runner details
                    </DropdownMenuItem>
                    <template v-if="runner.payments.length > 0">
                        <DropdownMenuItem class="text-gray-500" @click="emit('show:payment')" v-if="hasPayment">
                            See payment details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem class="text-green-500"
                            @click="emit('updated:payment', 'COMPLETED', runner.payments[0].id)">
                            Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem class="text-yellow-500"
                            @click="emit('updated:payment', 'PENDING', runner.payments[0].id)">
                            Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem class="text-red-500"
                            @click="emit('updated:payment', 'FAILED', runner.payments[0].id)">
                            Failed
                        </DropdownMenuItem>
                    </template>
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    </TableRow>
    <TableRow v-if="runner.volunteer_on_checkpoints?.length">
        <TableCell colspan="6">
            <TableBody>
                <TableRow v-for="record in runner.volunteer_on_checkpoints">
                    <TableCell colspan="6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell>Checkpoint</TableCell>
                                    <TableCell>Time</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{{ record?.checkpoint?.name }}</TableCell>
                                    <TableCell>{{ record?.timer }}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableCell>
                </TableRow>
            </TableBody>
        </TableCell>
    </TableRow>
</template>