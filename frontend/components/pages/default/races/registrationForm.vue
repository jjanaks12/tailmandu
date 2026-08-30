<script setup lang="ts">
import { ref, computed } from "vue"
import { Form, Field, ErrorMessage, type FormContext } from "vee-validate"
import { parseDate } from "@internationalized/date"
import { storeToRefs } from "pinia"
import type { SubmissionHandler } from "vee-validate"
import { User, Mail, Phone, Calendar, Users, Flag, Target, Loader2, XIcon, InfoIcon, LoaderIcon, ShirtIcon, MountainIcon, ArrowLeft } from "lucide-vue-next"
import * as Y from 'yup'

import DatePicker from "@/components/DatePicker.vue"
import { useAppStore } from "~/store/app"
import { trailRaceRunner, trailRaceVolunteer } from "~/lib/schema/event.schema"
import type { Personal, StageCategoryPayment, TrailRace } from "~/lib/types"
import { useEventStore } from "~/store/event"
import moment from "moment"
import { showImage, showPaymentImage, getGPXFile } from '~/lib/filters'
import { useAxios } from "~/services/axios"

interface RegistrationFormProps {
    eventId: string
    mode: "volunteer" | "runner"
    trailRace: TrailRace
}

const props = defineProps<RegistrationFormProps>()
const { countries, genders, company, shirtSizes } = storeToRefs(useAppStore())
const { saveVoluteer, saveRunner } = useEventStore()
const route = useRoute()
const { axios } = useAxios()
const pastRecord = ref<Personal | null>(null)

const hasEnteredEmail = ref(false)
const form = ref<FormContext<any> | null>(null)
const isLoading = ref(false)
const isLoadingCheckEmail = ref(false)
const showThankyouDialog = ref(false)
const showLiabilitiesDialog = ref(false)
const showPoliciesDialog = ref(false)

// getting list of available stages
const upcomingStages = computed(() => props.trailRace.stages
    .map(stage => stage.stage_categories
        .filter(stage_category => moment(stage_category.end as string).isAfter(moment())).length > 0 ? stage : null)
    .filter(stage => stage !== null))

const stageList = computed(() => {
    if (!upcomingStages.value.length) return []
    return form.value?.values?.is_season_pass ? upcomingStages.value : [upcomingStages.value[0]]
})
// getting stage categories of selected stage
const availabeStageCategoryList = computed(() => {
    if (form.value?.values.is_season_pass) {
        return stageList.value[0]?.stage_categories
    }
    return stageList.value.find(stage => stage.id === form.value?.values.stage_id)?.stage_categories
})
const prices = computed(() => {
    if (form.value?.values.is_season_pass) {
        const categories = form.value?.values.season_pass_categories || []
        if (categories.length > 0) {
            for (const stage of upcomingStages.value) {
                const match = stage.stage_categories.find(c => String(c.id) === String(categories[0]))
                if (match) return match
            }
        }
        return null
    }
    return availabeStageCategoryList.value?.find(stage_category => stage_category.id === form.value?.values.stage_category_id)
})
const payment = computed(() => {
    const type = form.value?.values.country_id == company.value?.address.country_id ? 'NATIONAL' : 'INTERNATIONAL'
    form.value?.setFieldValue('payment_type', type)

    const basePayment = prices.value?.payment.find(payment => payment.type === type)

    if (form.value?.values.is_season_pass) {
        let totalAmount = 0
        const selectedCategories = form.value?.values.season_pass_categories || []

        selectedCategories.forEach((categoryId: string) => {
            if (categoryId) {
                let p = null
                for (const stage of upcomingStages.value) {
                    const matchedCategory = stage.stage_categories.find(c => String(c.id) === String(categoryId))
                    if (matchedCategory) {
                        p = matchedCategory.payment.find(pay => pay.type === type)
                        break
                    }
                }
                if (p) totalAmount += Number(p.amount)
            }
        })
        if (totalAmount > 0) return { ...(basePayment || {}), amount: String(totalAmount) } as StageCategoryPayment
        return {} as StageCategoryPayment
    }

    if (!basePayment) return {} as StageCategoryPayment
    return basePayment
})

const onSubmit: SubmissionHandler = async (values: any) => {
    try {
        isLoading.value = true
        if (props.mode == 'volunteer')
            showThankyouDialog.value = await saveVoluteer(values, props.trailRace.id)
        else
            showThankyouDialog.value = await saveRunner(values, props.trailRace.id)
    } catch (error) {
        console.log(error)
    } finally {
        isLoading.value = false
    }
}

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            const result = e.target?.result
            if (result) {
                form.value?.setFieldValue('payment_method', 'QR')
                form.value?.setFieldValue('payment_screenshot', result)
            }
        }
        reader.readAsDataURL(file)
    }
}

const checkEmail = async (email: string) => {
    isLoadingCheckEmail.value = true
    const { data } = await axios.get<Personal>(`/runners/get_by_email/${email}`)
    pastRecord.value = data

    if (!data) {
        nextTick(() => {
            form.value?.setFieldValue('email', email)
        })
    }
    isLoadingCheckEmail.value = false
}

const formSubmitEmailCheck = (values: any) => {
    checkEmail(values.email)
}

watch(pastRecord, () => {
    if (pastRecord.value) {
        setTimeout(() => {
            form.value?.setFieldValue('date_of_birth', moment(pastRecord.value?.date_of_birth).format('YYYY-MM-DD'))

            form.value?.setValues({
                first_name: pastRecord.value?.first_name,
                last_name: pastRecord.value?.last_name,
                email: pastRecord.value?.email,
                phone_number: pastRecord.value?.phone_number,
                gender_id: pastRecord.value?.gender_id,
                country_id: pastRecord.value?.country_id,
                description: (pastRecord.value?.runners || []).length > 0 ? {
                    club_name: pastRecord.value?.runners[0]?.club_name,
                    emergency_contact_name: pastRecord.value?.runners[0]?.emergency_contact_name,
                    emergency_contact_phone: pastRecord.value?.runners[0]?.emergency_contact_no,
                } : {}
            })
        }, 1000)
    }

    hasEnteredEmail.value = true
})

onMounted(() => {
    watch(() => route.query, (query) => {
        if (query.email && !hasEnteredEmail.value) {
            checkEmail(query.email as string)
        }
    }, { immediate: true, deep: true })

    watch(form, (f) => {
        if (f && route.query.stage_id) {
            setTimeout(() => {
                f.setFieldValue('stage_id', route.query.stage_id)
            }, 500)
        }
    }, { immediate: true })
})
</script>

<template>
    <div class="w-screen flex flex-col md:flex-row relative bg-gray-50" v-if="upcomingStages.length > 0">
        <!-- Left Fixed Panel -->
        <div class="hidden md:flex flex-col w-1/2 h-[calc(100vh-81px)] text-white sticky top-[81px] left-0">
            <img :src="showImage(trailRace.thumbnail?.file_name as string)" :alt="trailRace.name"
                class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent"></div>
            <div class="relative z-10 p-12 flex flex-col h-full justify-center">
                <div>
                    <h1 class="text-5xl font-display font-bold mb-4 leading-tight">{{ trailRace.name }}</h1>
                    <p class="text-gray-200 max-w-lg text-lg">{{ trailRace.excerpt }}</p>
                </div>
            </div>
        </div>

        <!-- Right Scrollable Form -->
        <div class="w-full md:w-1/2 overflow-y-auto bg-gray-50 flex flex-col items-center justify-center py-[90px]">
            <div class="w-full max-w-2xl px-6 py-12 md:py-16">
                <!-- Back & Context -->
                <div class="w-full flex justify-between items-start mb-10">
                    <div>
                        <h2 class="text-3xl font-display font-bold text-gray-900 mb-2">Registration</h2>
                        <p class="text-gray-500 text-sm" v-if="pastRecord">Welcome back, {{ pastRecord?.first_name }}.
                            Ready for the next challenge?</p>
                        <p class="text-gray-500 text-sm" v-else>Register as a {{ mode }} to join the adventure.</p>
                    </div>
                    <NuxtLink :to="`/races/${route.params.slug as string}`"
                        class="hidden md:flex items-center gap-2 px-3 py-1.5 text-gray-500 hover:text-primary transition-colors text-sm rounded-md active:scale-95">
                        <ArrowLeft class="w-4 h-4" />
                        Back
                    </NuxtLink>
                </div>
                <Form v-if="!pastRecord && !hasEnteredEmail && !route.query.email"
                    :validation-schema="Y.object({ email: Y.string().email().required() })"
                    @submit="formSubmitEmailCheck"
                    class="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <div>
                        <h2>Hello there,</h2>
                        <p>First we would like to have your email</p>
                    </div>
                    <Field name="email" v-slot="{ field }" as="div">
                        <Input type="email" v-bind="field" placeholder="Enter your email" />
                        <ErrorMessage class="error__message" name="email" />
                    </Field>
                    <div class="text-right">
                        <Button type="submit" :disabled="isLoadingCheckEmail">
                            <LoaderIcon class="animate-spin" v-if="isLoadingCheckEmail" />
                            Check email
                        </Button>
                    </div>
                </Form>
                <Form ref="form" class="space-y-8"
                    :validation-schema="mode == 'runner' ? trailRaceRunner : trailRaceVolunteer"
                    v-slot="{ values, setFieldValue }" @submit="onSubmit" v-if="hasEnteredEmail">
                    <div
                        class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                        <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                                    <User :size="20" />
                                </div>
                                <div>
                                    <h2 class="text-xl font-semibold text-gray-900">
                                        {{ props.mode === 'volunteer' ? 'Volunteer Information' : 'Runner Information'
                                        }}
                                    </h2>
                                    <p class="text-sm text-gray-600">Tell us about yourself</p>
                                </div>
                            </div>
                        </div>

                        <div class="p-4 md:p-8 space-y-6">
                            <!-- Name Fields -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Field name="first_name" as="div" v-slot="{ field }" class="space-y-2">
                                    <Label for="rf__first_name"
                                        class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <User :size="16" class="text-gray-400" />
                                        First name
                                    </Label>
                                    <Input id="rf__first_name" v-bind="field" placeholder="Enter your first name"
                                        autocomplete="given-name" class="h-12 text-base" />
                                    <ErrorMessage class="error__message" name="first_name" />
                                </Field>

                                <Field name="middle_name" as="div" v-slot="{ field }" class="space-y-2">
                                    <Label for="rf__middle_name" class="text-sm font-medium text-gray-700">
                                        Middle name <span class="text-gray-400 text-xs">(optional)</span>
                                    </Label>
                                    <Input id="rf__middle_name" v-bind="field" placeholder="Middle name"
                                        class="h-12 text-base" />
                                    <ErrorMessage class="error__message" name="middle_name" />
                                </Field>

                                <Field name="last_name" as="div" v-slot="{ field }" class="space-y-2">
                                    <Label for="rf__last_name" class="text-sm font-medium text-gray-700">
                                        Last name
                                    </Label>
                                    <Input id="rf__last_name" v-bind="field" placeholder="Enter your last name"
                                        autocomplete="family-name" class="h-12 text-base" />
                                    <ErrorMessage class="error__message" name="last_name" />
                                </Field>
                            </div>

                            <!-- Contact Fields -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Field name="email" as="div" v-slot="{ field }" class="space-y-2">
                                    <Label for="rf__email"
                                        class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Mail :size="16" class="text-gray-400" />
                                        Email address
                                    </Label>
                                    <Input id="rf__email" type="email" v-bind="field"
                                        placeholder="your.email@example.com" autocomplete="email"
                                        class="h-12 text-base" />
                                    <ErrorMessage class="error__message" name="email" />
                                </Field>

                                <Field name="phone_number" as="div" v-slot="{ field }" class="space-y-2">
                                    <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Phone :size="16" class="text-gray-400" />
                                        Phone number
                                    </Label>
                                    <Input type="tel" v-bind="field" placeholder="xxxxxxxxxx" autocomplete="tel"
                                        class="h-12 text-base" />
                                    <ErrorMessage class="error__message" name="phone_number" />
                                </Field>
                            </div>

                            <!-- Date of Birth and ITRA ID -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Field name="date_of_birth" as="div" v-slot="{ field }" class="space-y-2">
                                    <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Calendar :size="16" class="text-gray-400" />
                                        Date of birth
                                    </Label>
                                    <DatePicker Label="Select your birth date"
                                        :model-value="field.value ? parseDate(field.value as string) : undefined"
                                        @update:model-value="$event ? field.onChange($event.toString()) : undefined" />
                                    <ErrorMessage class="error__message" name="date_of_birth" />
                                </Field>

                                <Field name="itra_id" as="div" v-slot="{ field }" class="space-y-2" v-if="mode === 'runner'">
                                    <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Target :size="16" class="text-gray-400" />
                                        ITRA ID (Optional)
                                    </Label>
                                    <Input v-bind="field" placeholder="Enter your ITRA ID" class="h-12 text-base" />
                                    <ErrorMessage class="error__message" name="itra_id" />
                                </Field>
                            </div>

                            <!-- Demographics -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Field name="country_id" as="div" v-slot="{ value, handleChange }" class="space-y-2">
                                    <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Flag :size="16" class="text-gray-400" />
                                        Country
                                    </Label>
                                    <Select :model-value="String(value ?? '')" @update:model-value="(e) => {
                                        handleChange(e)
                                        const isInternational = e == company?.address.country_id
                                        setFieldValue('payment_method', isInternational ? 'PAY_AT_VENUE' : 'QR')
                                    }">
                                        <SelectTrigger class="w-full h-12">
                                            <SelectValue placeholder="Select country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem v-for="country in countries" :key="country.id"
                                                :value="String(country.id)">
                                                {{ country.name }}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <ErrorMessage class="error__message" name="country_id" />
                                </Field>

                                <Field name="gender_id" as="div" v-slot="{ value, handleChange }" class="space-y-2">
                                    <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Users :size="16" class="text-gray-400" />
                                        Gender
                                    </Label>
                                    <Select :model-value="value" @update:model-value="handleChange">
                                        <SelectTrigger class="w-full h-12">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem v-for="gender in genders" :key="gender.id"
                                                :value="String(gender.id)">
                                                {{ gender.name }}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <ErrorMessage class="error__message" name="gender_id" />
                                </Field>

                                <Field name="size_id" as="div" v-slot="{ value, handleChange }" class="space-y-2">
                                    <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <ShirtIcon :size="16" class="text-gray-400" />
                                        Shirt size
                                    </Label>
                                    <Select :model-value="String(value ?? '')" @update:model-value="handleChange">
                                        <SelectTrigger class="w-full h-12">
                                            <SelectValue placeholder="Size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem v-for="s in shirtSizes" :key="s.id" :value="s.id">
                                                {{ s.name }}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <ErrorMessage class="error__message" name="size_id" />
                                </Field>

                                <!-- <Field name="age_category_id" as="div" v-slot="{ value, handleChange }" class="space-y-2">
                            <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Users :size="16" class="text-gray-400" />
                                Age group
                            </Label>
                            <Select :model-value="value" @update:model-value="handleChange">
                                <SelectTrigger class="w-full h-12">
                                    <SelectValue placeholder="Age group" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="ageCategory in age_categories" :key="ageCategory.id"
                                        :value="String(ageCategory.id)">
                                        {{ ageCategory.name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <ErrorMessage class="error__message" name="age_category_id" />
                        </Field> -->
                            </div>
                            <div class="flex flex-col gap-4">
                                <Field name="is_season_pass" as="div" v-slot="{ value, handleChange }" class="space-y-2"
                                    v-if="mode === 'runner' && upcomingStages.length > 1">
                                    <Label
                                        class="block bg-primary/5 p-5 rounded-xl border relative cursor-pointer hover:bg-primary/10 transition-colors"
                                        :class="value ? 'border-primary' : 'border-primary/20'">
                                        <div
                                            class="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm">
                                            Best Value
                                        </div>
                                        <div class="flex items-center gap-3 mb-3">
                                            <div
                                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <MountainIcon class="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 class="font-bold text-gray-900 text-sm">Season Pass {{ new
                                                    Date(trailRace.start as string).getFullYear() }}</h4>
                                                <p class="text-xs text-gray-500">The ultimate trail experience</p>
                                            </div>
                                        </div>
                                        <div class="flex items-center justify-between mt-2 group">
                                            <span class="font-bold text-sm text-gray-900">Add to Registration</span>
                                            <Checkbox :model-value="value" @update:model-value="(val) => {
                                                handleChange(val);
                                                if (val) {
                                                    const initialCategories = upcomingStages.map(stage => stage.stage_categories[0]?.id)
                                                    form?.setFieldValue('season_pass_categories', initialCategories)
                                                }
                                            }" />
                                        </div>
                                    </Label>
                                    <ErrorMessage class="error__message" name="is_season_pass" />
                                </Field>

                                <div class="flex gap-2 md:gap-4" v-if="!form?.values.is_season_pass">
                                    <Field name="stage_id" as="div" v-slot="{ value, handleChange }"
                                        :class="{ 'space-y-2': true, 'w-1/2': mode === 'runner', 'w-full': mode === 'volunteer' }">
                                        <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Target :size="16" class="text-gray-400" />
                                            Races
                                        </Label>
                                        <Select :model-value="value" @update:model-value="handleChange">
                                            <SelectTrigger
                                                class="w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed">
                                                <SelectValue placeholder="Choose your stage" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem v-for="s in stageList" :key="s.id" :value="String(s.id)">
                                                    {{ s.name }}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <ErrorMessage class="error__message" name="stage_id" />
                                    </Field>
                                    <Field name="stage_category_id" as="div" v-slot="{ value, handleChange }"
                                        :class="{ 'space-y-2': true, 'w-1/2': mode === 'runner' }"
                                        v-if="mode === 'runner'">
                                        <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Target :size="16" class="text-gray-400" />
                                            Distance
                                        </Label>
                                        <Select :model-value="value" @update:model-value="handleChange">
                                            <SelectTrigger
                                                class="w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed">
                                                <SelectValue
                                                    :placeholder="form?.values?.stage_id ? 'Choose your stage category' : 'Select a stage first'" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem v-for="sc in availabeStageCategoryList" :key="sc.id"
                                                    :value="String(sc.id)">
                                                    {{ sc.name }}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <ErrorMessage class="error__message" name="stage_category_id" />
                                    </Field>
                                </div>
                                <div v-else-if="mode === 'runner' && form?.values.is_season_pass" class="space-y-4">
                                    <div v-for="(stage, index) in upcomingStages" :key="stage.id"
                                        class="flex flex-col md:flex-row gap-4 items-end bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        <div class="w-full md:w-1/2">
                                            <Label class="text-sm font-medium text-gray-700">{{ stage.name }}</Label>
                                            <p class="text-xs text-gray-500 mt-1">{{ new
                                                Date(stage.start).toLocaleDateString() }}</p>
                                        </div>
                                        <Field :name="`season_pass_categories[${index}]`" as="div"
                                            v-slot="{ value, handleChange }" class="w-full md:w-1/2 space-y-2">
                                            <Select :model-value="value" @update:model-value="handleChange">
                                                <SelectTrigger class="w-full h-12 bg-white">
                                                    <SelectValue placeholder="Select distance" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem v-for="sc in stage.stage_categories" :key="sc.id"
                                                        :value="String(sc.id)">
                                                        {{ sc.name }}
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <ErrorMessage class="error__message"
                                                :name="`season_pass_categories[${index}]`" />
                                        </Field>
                                    </div>
                                </div>
                            </div>
                            <template v-if="mode == 'runner'">
                                <Field name="description.club_name" as="div" v-slot="{ field }" class="space-y-2">
                                    <Label for="rf__description.club_name"
                                        class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        Club name
                                    </Label>
                                    <Input v-bind="field" id="rf__description.club_name"
                                        placeholder="Name of club you belong to" />
                                    <ErrorMessage class="error__message" name="description.club_name" />
                                </Field>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Field name="description.emergency_contact_name" as="div" v-slot="{ field }"
                                        class="space-y-2">
                                        <Label id="rf__emergency_contact_name"
                                            class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            Emergency contact name
                                        </Label>
                                        <Input v-bind="field" placeholder="In case of emergency" />
                                        <ErrorMessage class="error__message"
                                            name="description.emergency_contact_name" />
                                    </Field>
                                    <Field name="description.emergency_contact_phone" as="div" v-slot="{ field }"
                                        class="space-y-2">
                                        <Label id="rf__emergency_contact_phone"
                                            class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            Emergency contact phone
                                        </Label>
                                        <Input v-bind="field" placeholder="In case of emergency" />
                                        <ErrorMessage class="error__message"
                                            name="description.emergency_contact_phone" />
                                    </Field>
                                </div>
                                <Field name="description.want_lunch" as="div" v-slot="{ value, handleChange }"
                                    class="space-y-2">
                                    <Label id="rf__want_lunch" class="flex items-start gap-2">
                                        <Checkbox :model-value="value" @update:model-value="handleChange"
                                            :default-value="false" />
                                        <div class="grow flex flex-col gap-2">
                                            <span class="font-medium text-gray-700">I want to order lunch after
                                                race.</span>
                                            <em class="text-sm font-light not-italic">Please Note*: Lunch is only
                                                provided to
                                                those who pre- ordered and pre-paid which is 480 per person and not
                                                included in
                                                registration fee.</em>
                                        </div>
                                    </Label>
                                    <ErrorMessage class="error__message" name="description.want_lunch" />
                                </Field>
                            </template>
                        </div>
                    </div>
                    <div class="bg-white text-gray-500 rounded-3xl border border-gray-200 shadow-sm p-4 md:p-8"
                        v-if="mode == 'runner' && Object.keys(payment).length > 0">
                        <h3 class="text-2xl font-light mb-2">
                            Registration fees for
                            <span class="text-primary font-bold">{{ values?.is_season_pass ? 'Season Pass' :
                                prices?.name }}</span>
                        </h3>
                        <div class="md:flex items-center justify-between space-y-6 md:space-y-0 md:gap-6 pb-5">
                            <div class="grow space-y-3">
                                <em class="text-gray-600 block not-italic text-2xl">
                                    NPR
                                    {{ values.description.want_lunch ? Number(payment?.amount) + 480 : payment?.amount
                                    }}
                                </em>
                                <div class="md:flex gap-4">
                                    <div class="grow mb-4 md:mb-0">
                                        <p class="mb-4">Please make payment to this QR code and upload your screenshot.
                                            We verify
                                            from the
                                            screenshot.
                                            We
                                            will
                                            contact you as soon as possible.</p>
                                        <Alert v-if="payment?.description" class="mb-4">
                                            <InfoIcon />
                                            <AlertTitle>{{ payment.description }}</AlertTitle>
                                        </Alert>
                                        <Alert variant="info">
                                            <InfoIcon />
                                            <AlertTitle>If you are having issue with QR code, you can use the following
                                                information to make payment.</AlertTitle>
                                            <AlertDescription>
                                                <dl
                                                    class="pt-4 [&>dd]:pl-4 [&>dt]:uppercase [&>dt]:text-gray-300 [&>dd]:text-gray-600 [&>dd]:mb-2">
                                                    <dt>Company name</dt>
                                                    <dd>Trailmandu Nepal Pvt.Ltd</dd>
                                                    <dt>Address</dt>
                                                    <dd>Ranibon, Nagarjun 03</dd>
                                                    <dt>Account Number</dt>
                                                    <dd>2814150093363002</dd>
                                                    <dt>Swift Code</dt>
                                                    <dd>NICENPKA</dd>
                                                </dl>
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                    <div class="md:w-2/5 shrink-0">
                                        <figure class="text-sm space-y-1 border border-gray-200 p-4 rounded-lg">
                                            <figcaption>Here is the payment QR code</figcaption>
                                            <img :src="showPaymentImage(payment?.screenshot?.file_name as string)"
                                                alt="Payment screenshot" class="w-full h-auto">
                                        </figure>
                                    </div>
                                </div>
                                <label
                                    class="flex items-center gap-2 rounded-lg overflow-hidden border border-gray-200 relative"
                                    :class="{
                                        'border-red-500 text-red-500': form?.errors?.payment_method,
                                        'border-green-500 text-green-500': !form?.errors?.payment_method
                                    }">
                                    <input type="file" @change="handleFileChange" class="hidden"
                                        accept=".jpg,.jpeg,.png" />
                                    <figure v-if="values?.payment_screenshot">
                                        <img :src="values?.payment_screenshot" alt="Payment screenshot"
                                            class="max-w-full h-auto p-2" />
                                        <Button type="button" class="absolute top-2 right-2"
                                            @click="form?.setFieldValue('payment_screenshot', '')">
                                            <XIcon class="w-6 h-6" />
                                        </Button>
                                    </figure>
                                    <div class="w-full flex flex-col gap-2 p-4" v-else>
                                        <span class="text-sm">You can upload your screenshot here...</span>
                                        <p class="text-xs">File size should be less than 2MB</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <ErrorMessage class="error__message" name="payment_method" />
                    </div>

                    <div class="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
                        <div class="flex flex-col mb-4" v-if="mode == 'runner'">
                            <Field name="liabilities" as="div" v-slot="{ value, handleChange }">
                                <Checkbox :model-value="value"
                                    @update:model-value="handleChange($event); if (!value) showLiabilitiesDialog = true;"
                                    :default-value="false" id="rf__liabilities" />
                                <label for="rf__liabilities">
                                    Yes, I agree, I am
                                    <NuxtLink to="/info/liabilities" target="_blank" class="underline text-primary">
                                        liable
                                    </NuxtLink>
                                    to my own action.
                                </label>
                                <ErrorMessage class="error__message" name="liabilities" />
                            </Field>
                            <Field name="policies" as="div" v-slot="{ value, handleChange }">
                                <Checkbox :model-value="value"
                                    @update:model-value="handleChange($event); if (!value) showPoliciesDialog = true;"
                                    :default-value="false" id="rf__policies" />
                                <label for="rf__policies">
                                    Yes, I agree to all the
                                    <NuxtLink to="/info/privacy-policy" target="_blank" class="underline text-primary">
                                        policies
                                    </NuxtLink>
                                    mentioned.
                                </label>
                                <ErrorMessage class="error__message" name="policies" />
                            </Field>
                        </div>
                        <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div class="text-center sm:text-left">
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Ready to register?</h3>
                                <p class="text-gray-600 text-sm mb-6">
                                    {{ props.mode === 'volunteer'
                                        ? 'Complete your volunteer registration and join our team!'
                                        : 'Submit your registration and get ready for the race!'
                                    }}
                                </p>
                            </div>

                            <Button variant="secondary" type="submit"
                                class="w-full sm:w-auto px-8 py-3 h-12 text-base font-medium " :disabled="isLoading"
                                :aria-busy="isLoading">
                                <Loader2 v-if="isLoading" :size="20" class="animate-spin mr-2" />
                                <span v-if="!isLoading">
                                    {{ props.mode === "volunteer" ? "Register as Volunteer" : "Register as Runner" }}
                                </span>
                                <span v-else>Processing Registration...</span>
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </div>
    <div class="bg-gray-50 text-gray-600 text-center border border-gray-300 p-8 rounded-xl" v-else>
        looks like all the stages are completed
    </div>
    <Dialog :open="showThankyouDialog" @update:open="showThankyouDialog = false">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Thank you for registering!</DialogTitle>
                <DialogDescription>
                    You have successfully registered as a {{ mode }}.
                </DialogDescription>
            </DialogHeader>
            <p>Do not forget to check your email for the confirmation email. And if have any issues, please contact us
                at
                <a href="mailto:info@trailmandu.com" class="underline text-primary">info@trailmandu.com</a>
            </p>
            <DialogFooter>
                <Button type="button" as-child @click="showThankyouDialog = false">
                    <NuxtLink :to="`/races/${route.params.slug as string}`">Ok!</NuxtLink>
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    <Dialog :open="showLiabilitiesDialog">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Liabilities</DialogTitle>
                <DialogDescription>
                    Please read the liabilities carefully.
                </DialogDescription>
            </DialogHeader>
            <div id="content" class="text-gray-700 text__holder max-h-[calc(100vh-200px)] overflow-y-auto">
                <p>I understand that participating in the KVR Summit challenge by Trailmandu the Challenge is
                    potentially
                    hazardous, and I should not enter and participate unless I am medically able and properly trained.
                    In
                    consideration of the acceptance of this entry, I assume full and complete responsibility for any
                    injury
                    or accident that may occur while I am travelling to or from the event, during the event, or while I
                    am
                    on the premises.</p>
                <p>I am also aware of and assume all risks associated with participating in this event, including but
                    not
                    limited to falls, contact with other participants, effects of weather, traffic, and conditions of
                    the
                    road. I, for myself and my heirs and executors, hereby waive, release, and forever discharge the
                    event
                    organisers, sponsors, promoters, and each of their agents, representatives, successors, and assigns,
                    as
                    well as all other persons associated with the event, from all liabilities, claims, actions, or
                    damages
                    that I may have against them arising out of or in any way connected with my participation in this
                    event.
                    I understand that this waiver includes any claims, whether caused by negligence, the action or
                    inaction
                    of any of the above parties, or otherwise.</p>
                <p>I hereby grant full permission to any and all of the above parties to use any photographs,
                    videotapes,
                    motion pictures, website images, recordings, or any other record of this event.</p>
            </div>
            <DialogFooter>
                <Button type="button" @click="showLiabilitiesDialog = false">
                    Yes, I have read it and agree
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    <Dialog v-model:open="showPoliciesDialog">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Policies</DialogTitle>
                <DialogDescription>
                    Please read the policies carefully.
                </DialogDescription>
            </DialogHeader>
            <div id="content" class="text-gray-700 text__holder max-h-[calc(100vh-200px)] overflow-y-auto">
                <h2>Food Policy</h2>
                <ul>
                    <li>We provide checkpoint food only.</li>
                    <li>Lunch will be available on a pre-order basis and must be paid and reserve food coupon.</li>
                    <li>Water will be provided at all checkpoints and at the finish line.</li>
                    <li>The primary food served will be Dal-Bhat (pre-paid only) or you can order from menu which will
                        be
                        pay
                        first
                    </li>
                    <li>service by hotel themselves and preparing might take time.</li>
                    <li>If you have purchased a full package, please see the note which doesn't include food and
                        transportation.</li>
                </ul>
                <h2>Refund Policy</h2>
                <ul>
                    <li>Refunds are available until one week before race day (Friday).</li>
                    <li>No refunds will be issued from Saturday one week before the race.</li>
                    <li>No registration transfers are allowed.</li>
                    <li>No refunds for packages.</li>
                </ul>
                <h2>Safety Policy</h2>
                <ul>
                    <li>First aid will be available at specific checkpoints and the finish line.</li>
                    <li>We do not provide personal Insurance.</li>
                    <li>No dashing pushing to others and always respect each other's.</li>
                    <li>Trail running is not a competition it's a family/community so always priorities safety of others
                        too.</li>
                </ul>
                <h2>Transportation Policy</h2>
                <ul>
                    <li>We do not provide transportation.</li>
                    <li>All the Start/Finish points are accessible and easy to get online transportation which is easy
                        to
                        get in
                        and
                        out</li>
                    <li>as per you prefer time so we are not providing Bus service</li>
                    <li>You can use Indrive /Pathao/ Yango or local transportation</li>
                </ul>
            </div>
            <DialogFooter>
                <Button type="button" @click="showPoliciesDialog = false">
                    Yes, I have read it and agree
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>