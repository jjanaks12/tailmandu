<script lang="ts" setup>
import moment from 'moment'
import { paymentStatus, type EventRunner, type PaymentStatus, type Stage, type PaymentType, paymentMethods } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { useRoute } from 'vue-router'
import { watchDebounced } from '@vueuse/core'
import { CommandIcon, DownloadIcon } from 'lucide-vue-next'
import { onKeyStroke } from '@vueuse/core'
import RunnerItem from './RunnerItem.vue'
import { showImage } from '~/lib/filters'
import { toast } from 'vue-sonner'
import bibCard from './bibCard.vue'

interface RunnerListProps {
    stages: Stage[]
}

const emit = defineEmits(['update'])
const { axios } = useAxios()
const route = useRoute()
const props = defineProps<RunnerListProps>()

const isLoading = ref(false)
const runnerDetailDialog = ref(false)
const printDialog = ref(false)
const runnerPaymentDialog = ref(false)
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
                payment_method: paymentTypeOpt.value,
            }
        })
        runners.value = data
        isLoading.value = false
    }
}

const updatePaymentStatus = async (status: string, id: string) => {
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

const downloadCSV = async () => {
    if (runners.value.length === 0) {
        toast.error("No runners to download")
        return
    }

    let CSVContent = "data:text/csv;charset=utf-8,"

    CSVContent += "Name,BIB,email,phone,gender,age,category,stage,country,emergency contact,emergency contact no,want lunch, paid\n"

    runners.value.forEach((runner) => {
        const age = moment().diff(runner.personal.date_of_birth, 'years')
        CSVContent += `${[runner.personal.first_name, runner.personal.middle_name, runner.personal.last_name].join(" ")},${runner.bib},${runner.personal.email},${runner.personal.phone_number},${runner.personal.gender.name},${age},${runner?.stage_category?.name ?? ''},${runner?.stage?.name ?? ''},${runner?.personal?.country?.name ?? ''},${runner?.emergency_contact_name},${runner?.emergency_contact_no},${runner.want_lunch},${runner.payments[0]?.status ?? ''},\n`
    })

    const link = document.createElement('a')
    link.setAttribute('href', encodeURI(CSVContent))
    link.setAttribute('download', 'runners.csv')
    link.click()
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
                <Button variant="secondary" class="rounded-full" @click="downloadCSV">
                    <DownloadIcon />
                    Download CSV
                </Button>
                <!-- <Button variant="destructive" class="rounded-full" @click="printDialog = true">
                    <DownloadIcon />
                    Download BIB PDF
                </Button> -->
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
            <RunnerItem v-for="runner in runners" :runner="runner"
                @show:runner="runnerDetailDialog = true; selectedRunner = runner"
                @show:payment="runnerPaymentDialog = true; selectedRunner = runner"
                @updated:payment="updatePaymentStatus" @fetch="fetch" />
            <TableRow v-if="runners.length === 0">
                <TableCell colspan="6">
                    <span class="text-center block p-3 text-gray-500 bg-accent rounded">
                        No runners found
                    </span>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <Dialog :open="runnerPaymentDialog" @update:open="selectedRunner = null; runnerPaymentDialog = false">
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
                        <span>{{ payment.method }}</span>
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
    <Dialog :open="runnerDetailDialog" @update:open="selectedRunner = null; runnerDetailDialog = false">
        <DialogContent class="max-h-[700px] overflow-y-auto">
            <DialogHeader>
                <DialogTitle class="text-lg">Runner Details</DialogTitle>
                <DialogDescription class="text-base">
                    Runner details for
                    <strong>
                        {{ selectedRunner?.personal.first_name }}
                        {{ selectedRunner?.personal.middle_name }}
                        {{ selectedRunner?.personal.last_name }}
                    </strong>
                </DialogDescription>
            </DialogHeader>
            <div class="space-y-6">
                <strong class="text-gray-300 uppercase tracking-widest font-medium">Personal Information</strong>
                <div class="divide-y divide-gray-200 text-sm [&_div]:py-2">
                    <div class="flex justify-between">
                        <strong>Bib</strong>
                        <span>{{ selectedRunner?.bib }}</span>
                    </div>
                    <div class="flex justify-between">
                        <strong>Name</strong>
                        <span>
                            {{ selectedRunner?.personal.first_name }}
                            {{ selectedRunner?.personal.middle_name }}
                            {{ selectedRunner?.personal.last_name }}
                        </span>
                    </div>
                    <div class="flex justify-between">
                        <strong>Gender</strong>
                        <span>{{ selectedRunner?.personal.gender.name }}</span>
                    </div>
                    <div class="flex justify-between">
                        <strong>Age</strong>
                        <span>{{ moment().diff(moment(selectedRunner?.personal.date_of_birth), 'years') }}</span>
                    </div>
                    <div class="flex justify-between">
                        <strong>Country</strong>
                        <span>{{ selectedRunner?.personal.country.name }}</span>
                    </div>
                    <div class="flex justify-between">
                        <strong>Phone number</strong>
                        <span>{{ selectedRunner?.personal.phone_number }}</span>
                    </div>
                    <div class="flex justify-between">
                        <strong>Email</strong>
                        <span>{{ selectedRunner?.personal.email }}</span>
                    </div>
                    <div class="flex justify-between">
                        <strong>Stage category</strong>
                        <span>{{ selectedRunner?.stage_category?.name }}</span>
                    </div>
                </div>
                <strong class="text-gray-300 uppercase tracking-widest font-medium">Payment Information</strong>
                <div class="divide-y divide-gray-200 text-sm [&_div]:py-2">
                    <div class="flex justify-between">
                        <strong>Method</strong>
                        <span>{{ selectedRunner?.payments[0]?.method }}</span>
                    </div>
                    <div class="flex justify-between">
                        <strong>Status</strong>
                        <span>{{ selectedRunner?.payments[0]?.status }}</span>
                    </div>
                    <div class="flex justify-between">
                        <strong>Amount</strong>
                        <span>{{ selectedRunner?.payments[0]?.amount }}</span>
                    </div>
                    <div class="flex justify-between">
                        <strong>Date</strong>
                        <span>
                            {{ moment(selectedRunner?.payments[0]?.created_at).fromNow() }}
                        </span>
                    </div>
                    <figure class="text-xs border p-1 rounded-sm" v-if="selectedRunner?.payments[0]?.screenshot">
                        <figcaption>Screenshot of payment</figcaption>
                        <img :src="showImage(selectedRunner?.payments[0]?.screenshot?.file_name)">
                    </figure>
                </div>
            </div>
        </DialogContent>
    </Dialog>
    <Dialog :open="printDialog" @update:open="printDialog = false">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Prepare runner BIB card</DialogTitle>
                <DialogDescription>
                    Generate runner BIB card for printing.
                </DialogDescription>
            </DialogHeader>
            <div class="space-y-6">
                <bibCard :runner="runner" v-for="runner in runners" v-if="runners.length > 0" />
                <Alert v-else>
                    <AlertTitle>No runners found</AlertTitle>
                    <AlertDescription>
                        {{ stageID ? 'No runners found for this stage' : 'First select a stage' }}
                    </AlertDescription>
                </Alert>
            </div>
            <div class="flex flex-end">
                <Button>Download</Button>
            </div>
        </DialogContent>
    </Dialog>
</template>