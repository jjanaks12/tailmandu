<script lang="ts" setup>
import moment from 'moment'
import { paymentStatus, type EventRunner, type PaymentStatus, type Stage, type PaymentType, paymentMethods } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { useRoute } from 'vue-router'
import { watchDebounced } from '@vueuse/core'
import { CommandIcon } from 'lucide-vue-next'
import { onKeyStroke } from '@vueuse/core'
import RunnerItem from './RunnerItem.vue'
import { showImage } from '~/lib/filters'

interface RunnerListProps {
    stages: Stage[]
}

const emit = defineEmits(['update'])
const { axios } = useAxios()
const route = useRoute()
const props = defineProps<RunnerListProps>()

const isLoading = ref(false)
const runners = ref<EventRunner[]>([])
const stageID = ref<string | null>(null)
const paymentStatusOpt = ref<PaymentStatus | null>(null)
const paymentTypeOpt = ref<PaymentType | null>(null)
const searchText = shallowRef('')
const stageCategoryID = ref<string | null>(null)

const selectedRunner = ref<EventRunner | null>(null)

onKeyStroke(['command', '/'], () => {
    nextTick(() => {
        (document.querySelector('.search-input') as HTMLInputElement)?.focus()
    })
})

const stageCategoryList = computed(() => {
    if (!stageID.value) return []
    return props.stages.find((stage) => stage.id === stageID.value)?.stage_categories || []
})

const fetch = async () => {
    const event_id = route.params.id
    if (event_id && stageID.value) {
        isLoading.value = true
        const stage_id = stageID.value
        const { data } = await axios.get(`/events/${event_id}/${stage_id}/runners`, {
            params: {
                s: searchText.value,
                payment_status: paymentStatusOpt.value,
                stage_category: stageCategoryID.value,
                payment_type: paymentTypeOpt.value,
            }
        })
        runners.value = data
        isLoading.value = false
    }
}

const updatePaymentStatus = async (status: string, id: string) => {
    console.log(status, id);

    await axios.put(`/events/${route.params.id}/payments/${id}`, {
        status
    })
    fetch()
}

const reset = () => {
    stageID.value = null
    searchText.value = ''
    paymentStatusOpt.value = null
    stageCategoryID.value = null
    paymentTypeOpt.value = null

    runners.value = []
    fetch()
}

watch([paymentStatusOpt, stageID, stageCategoryID, paymentTypeOpt], fetch)
watchDebounced(searchText, fetch, { debounce: 1000 })
onMounted(fetch)
</script>

<template>
    <div class="bg-gray-100 space-y-6 mb-12 border border-dashed border-gray-400 p-3 rounded-xl">
        <h2 class="text-xl text-gray-400">Filters:</h2>
        <div class="space-y-3">
            <div class="flex items-center gap-3">
                <Select v-model="stageID" :disabled="isLoading">
                    <SelectTrigger class="w-[200px]" size="sm">
                        Stage:
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="stage in stages" :value="stage.id">{{ stage.name }}</SelectItem>
                    </SelectContent>
                </Select>
                <Select v-model="stageCategoryID" :disabled="isLoading">
                    <SelectTrigger class="w-[200px]" size="sm">
                        Category:
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="category in stageCategoryList" :value="category.id">
                            {{ category.name }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Button size="sm" modifier="link" @click="stageCategoryID = null" v-if="stageCategoryID">X</Button>
                <Select v-model="paymentStatusOpt" :disabled="isLoading">
                    <SelectTrigger class="w-[200px]" size="sm">
                        Payment:
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="status in paymentStatus" :value="status">{{ status }}</SelectItem>
                    </SelectContent>
                </Select>
                <Button size="sm" modifier="link" @click="paymentStatusOpt = null" v-if="paymentStatusOpt">X</Button>
                <Select v-model="paymentTypeOpt" :disabled="isLoading">
                    <SelectTrigger class="w-[200px]" size="sm">
                        Payment Type:
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="type in paymentMethods" :value="type">{{ type }}</SelectItem>
                    </SelectContent>
                </Select>
                <Button size="sm" modifier="link" @click="paymentTypeOpt = null" v-if="paymentTypeOpt">X</Button>
            </div>
            <InputGroup size="sm">
                <InputGroupInput class="search-input" v-model="searchText" placeholder="Search by name or bib" />
                <InputGroupAddon align="inline-end" class="text-gray-300">
                    <CommandIcon /> + /
                </InputGroupAddon>
            </InputGroup>
            <div class="flex justify-end gap-2">
                <Button variant="secondary" size="sm" modifier="link" @click="fetch">reload</Button>
                <Button size="sm" modifier="link" @click="reset" :disabled="isLoading">reset all</Button>
            </div>
        </div>
    </div>
    <span class="text-sm text-gray-300">showing {{ runners.length }} runner{{ runners.length === 1 ? '' : 's' }}</span>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Payment Type</TableHead>
                <TableHead class="text-center">Country</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead class="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <RunnerItem v-for="runner in runners" :runner="runner" @show:payment="selectedRunner = runner"
                @updated:payment="updatePaymentStatus" />
            <TableRow v-if="runners.length === 0">
                <TableCell colspan="6">
                    <span class="text-center block p-3 text-gray-500 bg-accent rounded">
                        No runners found
                    </span>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <Dialog :open="selectedRunner != null" @update:open="selectedRunner = null">
        <DialogContent class="max-h-[600px] overflow-y-auto">
            <DialogHeader>
                <DialogTitle class="text-lg">Payment</DialogTitle>
                <DialogDescription class="text-base">
                    Payment details for
                    <strong>
                        {{ selectedRunner?.personal.first_name }}
                        {{ selectedRunner?.personal.middle_name }}
                        {{ selectedRunner?.personal.last_name }}
                    </strong>
                </DialogDescription>
            </DialogHeader>
            <div class="space-y-4 divide-y divide-gray-200 text-sm">
                <div v-for="payment in selectedRunner?.payments" class="space-y-2 pb-4">
                    <div class="flex justify-between">
                        <span>Payment Type</span>
                        <span>{{ payment.type }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Payment Status</span>
                        <span>{{ payment.status }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Payment Amount</span>
                        <span>{{ payment.amount }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Payment Date</span>
                        <span>
                            {{ moment(payment.created_at).fromNow() }}
                        </span>
                    </div>
                    <figure class="text-xs border p-1 rounded-sm" v-if="payment?.screenshot">
                        <figcaption>Screenshot of payment</figcaption>
                        <img :src="showImage(payment?.screenshot?.file_name)">
                    </figure>
                </div>
                <span class="text-center block p-3 text-gray-500 bg-accent rounded"
                    v-if="selectedRunner?.payments.length === 0">
                    No payments information found for
                    <strong>{{ selectedRunner?.personal.first_name }}</strong>
                </span>
            </div>
        </DialogContent>
    </Dialog>
</template>