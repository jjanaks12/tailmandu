<script setup lang="ts">
import { Loader2Icon, TargetIcon } from 'lucide-vue-next'
import moment from 'moment'
import { ErrorMessage, Field, Form, type FormContext } from 'vee-validate'
import { formatDate } from '~/lib/filters'
import { trailRaceRunner } from '~/lib/schema/event.schema'
import type { EventRunner, TrailRace } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { useAppStore } from '~/store/app'
import { useEventStore } from '~/store/event'

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    role: 'Runner',
    authorization: '*'
})

const route = useRoute()
const { get } = useEventStore()
const trailRace = ref<TrailRace | null>(null)
const form = useTemplateRef<FormContext<any> | null>('form')
const isLoading = ref(false)
const runner = ref<EventRunner | null>(null)
const { axios } = useAxios()


const { company } = storeToRefs(useAppStore())

const stageList = computed(() => trailRace.value?.stages
    .map(stage => stage.stage_categories
        .filter(stage_category => moment.utc(stage_category.end as string).isAfter(moment())).length > 0 ? stage : null)
    .filter(stage => stage !== null))
const availabeStageCategoryList = computed(() => stageList.value?.find(stage => stage.id === form.value?.values.stage_id)?.stage_categories)

const fetchRunnerDetail = async () => {
    const { data } = await axios.get<EventRunner>(`/runners/${route.params.runner_id}`)
    runner.value = data
}

const fetchRaceDetail = async () => {
    trailRace.value = await get(route.params.event_id as string)
}

const handleSubmit = async (values: any) => {
    isLoading.value = true
    await axios.put(`/runners/${route.params.runner_id}`, values)
    isLoading.value = false
    init()
}


const initForm = () => {
    if (runner.value && form.value) {
        const type = form.value?.values.country_id == company.value?.address.country_id ? 'NATIONAL' : 'INTERNATIONAL'

        form.value.setValues({
            stage_id: String(runner.value.stage_id),
            country_id: String(runner.value.personal.country_id),
            date_of_birth: runner.value.personal.date_of_birth,
            email: runner.value.personal.email,
            first_name: runner.value.personal.first_name,
            last_name: runner.value.personal.last_name,
            phone_number: runner.value.personal.phone_number,
            gender_id: String(runner.value.personal.gender_id),
            liabilities: true,
            policies: true,
            payment_method: runner.value.payments[0].method,
            stage_category_id: String(runner.value.stage_category_id),
            description: {
                club_name: runner.value.club_name,
                emergency_contact_name: runner.value.emergency_contact_name,
                emergency_contact_phone: runner.value.emergency_contact_no,
                want_lunch: runner.value.want_lunch
            },
            payment_type: type,
        })
    }
}

const init = async () => {
    await fetchRaceDetail()
    await fetchRunnerDetail()
    initForm()
}

onMounted(init)
</script>

<template>
    <div class="flex gap-8">
        <Form :validation-schema="trailRaceRunner" @submit="handleSubmit" ref="form" class="w-2/3 space-y-8">
            <span class="text-xl font-medium text-gray-700 block">Your BIB no: {{ runner?.bib }}</span>
            <Separator />
            <Field name="stage_id" as="div" v-slot="{ value, handleChange }" class="space-y-2">
                <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <TargetIcon :size="16" class="text-gray-400" />
                    Stage
                </Label>
                <Select :model-value="value" @update:model-value="handleChange" disabled>
                    <SelectTrigger class="w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed">
                        <SelectValue placeholder="Choose your stage" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="s in stageList" :key="s.id" :value="String(s.id)">
                            {{ s.name }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <ErrorMessage name="stage_id" />
            </Field>
            <Field name="stage_category_id" as="div" v-slot="{ value, handleChange }" class="space-y-2">
                <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <TargetIcon :size="16" class="text-gray-400" />
                    Stage Category
                </Label>
                <Select :model-value="value" @update:model-value="handleChange">
                    <SelectTrigger class="w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed">
                        <SelectValue
                            :placeholder="form?.values?.stage_id ? 'Choose your stage catgeory' : 'Select an stage first'" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="sc in availabeStageCategoryList" :key="sc.id" :value="String(sc.id)">
                            {{ sc.name }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <ErrorMessage name="stage_category_id" />
            </Field>
            <Field name="description.club_name" as="div" v-slot="{ field }" class="space-y-2">
                <Label for="rf__description.club_name"
                    class="text-sm font-medium text-gray-700 flex items-center gap-2">
                    Club name
                </Label>
                <Input v-bind="field" id="rf__description.club_name" placeholder="Name of club you belong to" />
                <ErrorMessage name="description.club_name" />
            </Field>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field name="description.emergency_contact_name" as="div" v-slot="{ field }" class="space-y-2">
                    <Label id="rf__emergency_contact_name"
                        class="text-sm font-medium text-gray-700 flex items-center gap-2">
                        Emergency contact name
                    </Label>
                    <Input v-bind="field" placeholder="In case of emergency" />
                    <ErrorMessage name="description.emergency_contact_name" />
                </Field>
                <Field name="description.emergency_contact_phone" as="div" v-slot="{ field }" class="space-y-2">
                    <Label id="rf__emergency_contact_phone"
                        class="text-sm font-medium text-gray-700 flex items-center gap-2">
                        Emergency contact phone
                    </Label>
                    <Input v-bind="field" placeholder="In case of emergency" />
                    <ErrorMessage name="description.emergency_contact_phone" />
                </Field>
            </div>
            <Field name="description.want_lunch" as="div" v-slot="{ value, handleChange }" class="space-y-2">
                <Label id="rf__want_lunch" class="flex items-start gap-2">
                    <Checkbox :model-value="value" @update:model-value="handleChange" :default-value="false" />
                    <div class="grow flex flex-col gap-2">
                        <span class="font-medium text-gray-700">I want to order lunch after race.</span>
                        <em class="text-sm font-light not-italic">Please Note*: Lunch is only provided to
                            those who pre- ordered and pre-paid which is 480 per person and not included in
                            registration fee.</em>
                    </div>
                </Label>
                <ErrorMessage name="description.want_lunch" />
            </Field>
            <div class="text-right">
                <Button variant="secondary" type="submit" class="w-full sm:w-auto px-8 py-3 h-12 text-base font-medium "
                    :disabled="isLoading" :aria-busy="isLoading">
                    <Loader2Icon v-if="isLoading" :size="20" class="animate-spin mr-2" />
                    <span v-if="!isLoading">
                        Update Profile
                    </span>
                    <span v-else>Processing Registration...</span>
                </Button>
            </div>
        </Form>
        <div class="w-1/3">
            <h2 class="text-xl font-bold border-b pb-8 mb-8">Payment Details</h2>
            <dl class="[&_dt]:font-medium [&_dd]:font-light [&_dt]:text-gray-700 [&_dd]:mb-4">
                <dt>Status</dt>
                <dd>{{ runner?.payments[0]?.status }}</dd>
                <dt>Payment Type</dt>
                <dd>{{ runner?.payments[0]?.method }}</dd>
                <dt>Amount</dt>
                <dd>{{ runner?.payments[0]?.amount }}</dd>
                <dt>Payment Date</dt>
                <dd>{{ formatDate(runner?.payments[0]?.created_at as string) }}</dd>
            </dl>
        </div>
    </div>
</template>