<script setup lang="ts">
import { CheckIcon, ChevronUpIcon, CopyIcon, EllipsisVerticalIcon } from 'lucide-vue-next'
import moment from 'moment'
import { formatDate } from '~/lib/filters'
import type { EventRunner } from '~/lib/types'
import { useAxios } from '~/services/axios'

interface RunnerItemProps {
    rank: number
    runner: EventRunner
}

const emit = defineEmits(['show:runner', 'show:payment', 'updated:payment', 'fetch'])
const props = defineProps<RunnerItemProps>()
const showDeleteModal = ref(false)
const showTiming = ref(false)
const { axios } = useAxios()
const { can } = useAuthorization()

const hasPayment = computed(() => props.runner.payments.length > 0)

const { copy, copied } = useClipboard()

const deleteRunner = async () => {
    await axios.delete(`/runners/${props.runner.id}`)
    emit('fetch')
    showDeleteModal.value = false
}
</script>

<template>
    <TableRow>
        <TableCell>
            <ChevronUpIcon class="inline-block vertical-align-middle" @click="showTiming = !showTiming"
                v-if="runner.volunteer_on_checkpoints?.length > 0" />
            {{ rank }}
        </TableCell>
        <TableCell>
            <em class="no-italic block">{{ runner.bib }}</em>
            <strong class="block">
                {{ runner.personal.first_name }}
                {{ runner.personal.middle_name }}
                {{ runner.personal.last_name }}
            </strong>
            <em>
                {{ runner.personal.email }}
                <Button size="icon" modifier="outline" @click="copy(runner.personal.email)">
                    <CopyIcon class="size-4" v-if="!copied" />
                    <CheckIcon class="size-4" v-else />
                </Button>
            </em>
            <div class="flex gap-2">
                <Badge>
                    {{ moment().diff(moment(runner.personal.date_of_birth), 'years') }}
                    {{ runner.personal?.gender?.name.charAt(0).toUpperCase() }}
                </Badge>
                <Badge variant="outline">
                    <span class="font-normal text-gray-400">Stage Category:</span>
                    {{ runner.stage_category.name }}
                </Badge>
            </div>
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
                        <DropdownMenuLabel>Payment Actions</DropdownMenuLabel>
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
                    <template v-if="can('runner_delete')">
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Runner Actions</DropdownMenuLabel>
                        <DropdownMenuItem class="text-red-500" @click="showDeleteModal = true">
                            Delete
                        </DropdownMenuItem>
                    </template>
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    </TableRow>
    <TableRow v-if="runner.volunteer_on_checkpoints?.length && showTiming" class="bg-primary/5">
        <TableCell colspan="7">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Checkpoint</TableCell>
                        <TableCell>Time</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="record in runner.volunteer_on_checkpoints">
                        <TableCell>{{ record.id }} {{ record?.checkpoint?.name }}</TableCell>
                        <TableCell>{{ formatDate(record?.timer, 'YYYY-MM-DD HH:mm:ss') }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableCell>
    </TableRow>
    <Dialog :open="showDeleteModal" @update:open="showDeleteModal = false">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure you want to delete this runner?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button @click="showDeleteModal = false">Cancel</Button>
                <Button @click="deleteRunner">Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>