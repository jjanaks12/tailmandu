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
const { axios } = useAxios()
const { can } = useAuthorization()

const showDeleteModal = ref(false)
const showTiming = ref(false)
const deleteCheckpointDataID = ref<string | null>(null)

const hasPayment = computed(() => props.runner.payments.length > 0)
const classList = computed(() => ({
    'bg-primary/50 hover:bg-primary/50': props.rank == 1,
    'bg-primary/30 hover:bg-primary/30': props.rank == 2,
    'bg-primary/10 hover:bg-primary/10': props.rank == 3
}))

const { copy, copied } = useClipboard()

const deleteRunner = async () => {
    await axios.delete(`/runners/${props.runner.id}`)
    emit('fetch')
    showDeleteModal.value = false
}
const adjustDateForTimezone = (date: Date) => {
    // Get the timezone offset in minutes for the *current* system
    const timezoneOffsetInMinutes = date.getTimezoneOffset();

    // Create a new Date object (or modify the existing one) by adding the offset
    // Using setMinutes() is a clean way to adjust the time.
    date.setMinutes(date.getMinutes() + timezoneOffsetInMinutes);

    return date;
}

const getDuration = (time: string, started_time: string) => {
    const started = adjustDateForTimezone(new Date(started_time))
    const now = new Date(moment.utc(time).local().toISOString())

    // @ts-expect-error
    const diff = now - started
    return `${((diff / (1000 * 60 * 60)) % 60).toFixed(0)}:${((diff / (1000 * 60)) % 60).toFixed(0)}:${(diff / 1000).toFixed(0)}`
}

const deleteCheckpointEntryData = async (id: string) => {
    await axios.delete(`/checkpoints/${id}`)
    emit('fetch')
    deleteCheckpointDataID.value = null
}
</script>

<template>
    <TableRow class="relative" :class="classList">
        <TableCell>
            <ChevronUpIcon class="inline-block vertical-align-middle" @click="showTiming = !showTiming"
                v-if="runner.volunteer_on_checkpoints?.length > 0" />
            {{ rank }}
        </TableCell>
        <TableCell>
            <em class="not-italic block">#BIB: {{ runner.bib }}</em>
            <strong class="block mb-1">
                {{ runner.personal.first_name }}
                {{ runner.personal.middle_name }}
                {{ runner.personal.last_name }}
            </strong>
            <em class="block mb-1">
                {{ runner.personal.email }}
                <Button size="iconsm" modifier="outline" @click="copy(runner.personal.email)">
                    <CopyIcon class="size-2" v-if="!copied" />
                    <CheckIcon class="size-2" v-else />
                </Button>
            </em>
            <div class="flex gap-2 mb-1">
                <Badge>
                    {{ moment().diff(moment(runner.personal.date_of_birth), 'years') }}
                    {{ runner.personal?.gender?.name.charAt(0).toUpperCase() }}
                </Badge>
                <Badge variant="info">
                    <span class="font-normal opacity-55">Stage Category:</span>
                    {{ runner.stage_category.name }}
                </Badge>
            </div>
            <div class="flex gap-2 items-center">
                <span :class="{ 'flag': true, ['flag-' + runner.personal.country.abbr]: true }" />
                {{ runner.personal?.country?.name }}
            </div>
        </TableCell>
        <TableCell>
            {{ runner.payments[0]?.status }}
        </TableCell>
        <TableCell>{{ runner.payments[0]?.method }}</TableCell>
        <TableCell>{{ runner.want_lunch ? 'Yes' : 'No' }}</TableCell>
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
    <TableRow v-if="runner.volunteer_on_checkpoints?.length && showTiming" :class="classList">
        <TableCell colspan="6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Checkpoint</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell class="text-right">Action</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="record in runner.volunteer_on_checkpoints">
                        <TableCell>
                            {{ record?.checkpoint?.name }}
                        </TableCell>
                        <TableCell>{{ formatDate(record?.timer, 'YYYY-MM-DD HH:mm:ss') }}</TableCell>
                        <TableCell>
                            {{ getDuration(record?.timer, runner.stage_category.start) }}
                        </TableCell>
                        <TableCell class="text-right">
                            <Button @click="deleteCheckpointDataID = record.id" size="sm"
                                modifier="link">Delete</Button>
                        </TableCell>
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
    <Dialog :open="deleteCheckpointDataID != null" @update:open="deleteCheckpointDataID = null">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure you want to delete this checkpoint entry?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button @click="deleteCheckpointDataID = null">Cancel</Button>
                <Button @click="deleteCheckpointEntryData">Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>