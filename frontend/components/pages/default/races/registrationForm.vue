<script setup lang="ts">
import { ref, computed } from "vue"
import { Form, Field, ErrorMessage, type FormContext } from "vee-validate"
import { parseDate } from "@internationalized/date"
import { storeToRefs } from "pinia"
import type { SubmissionHandler } from "vee-validate"
import { User, Mail, Phone, Calendar, Users, Shirt, Flag, Target, Loader2 } from "lucide-vue-next"

import DatePicker from "@/components/DatePicker.vue"
import { useAppStore } from "~/store/app"
import { trailRaceRunner, trailRaceVolunteer } from "~/lib/schema/event.schema"
import type { TrailRace } from "~/lib/types"
import { useEventStore } from "~/store/event"

interface RegistrationFormProps {
    mode: "volunteer" | "runner"
    trailRace: TrailRace
}

const props = defineProps<RegistrationFormProps>()
const { countries, genders, age_categories, shirtSizes } = storeToRefs(useAppStore())
const { saveVoluteer, saveRunner } = useEventStore()
const route = useRoute()

const form = ref<FormContext<any> | null>(null)
const isLoading = ref(false)

const stageList = computed(() => props.trailRace.stages)
const availabelStageCategoryList = computed(() => stageList.value.find(stage => stage.id === form.value?.values.stage_id)?.stage_categories)

const onSubmit: SubmissionHandler = async (values: any) => {
    isLoading.value = true
    if (props.mode == 'volunteer')
        await saveVoluteer(values, props.trailRace.id)
    else
        await saveRunner(values, props.trailRace.id)
    isLoading.value = false
    navigateTo(`/races/${route.params.slug as string}`)
}
</script>

<template>
    <section class="max-w-4xl mx-auto p-6 space-y-8">
        <Form ref="form" class="space-y-8" :validation-schema="mode == 'runner' ? trailRaceRunner : trailRaceVolunteer"
            @submit="onSubmit">
            <div
                class="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                            <User :size="20" />
                        </div>
                        <div>
                            <h2 class="text-xl font-semibold text-gray-900">
                                {{ props.mode === 'volunteer' ? 'Volunteer Information' : 'Runner Information' }}
                            </h2>
                            <p class="text-sm text-gray-600">Tell us about yourself</p>
                        </div>
                    </div>
                </div>

                <div class="p-8 space-y-6">
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
                            <ErrorMessage name="first_name" />
                        </Field>

                        <Field name="middle_name" as="div" v-slot="{ field }" class="space-y-2">
                            <Label for="rf__middle_name" class="text-sm font-medium text-gray-700">
                                Middle name <span class="text-gray-400 text-xs">(optional)</span>
                            </Label>
                            <Input id="rf__middle_name" v-bind="field" placeholder="Middle name"
                                class="h-12 text-base" />
                            <ErrorMessage name="middle_name" />
                        </Field>

                        <Field name="last_name" as="div" v-slot="{ field }" class="space-y-2">
                            <Label for="rf__last_name" class="text-sm font-medium text-gray-700">
                                Last name
                            </Label>
                            <Input id="rf__last_name" v-bind="field" placeholder="Enter your last name"
                                autocomplete="family-name" class="h-12 text-base" />
                            <ErrorMessage name="last_name" />
                        </Field>
                    </div>

                    <!-- Contact Fields -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field name="email" as="div" v-slot="{ field }" class="space-y-2">
                            <Label for="rf__email" class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Mail :size="16" class="text-gray-400" />
                                Email address
                            </Label>
                            <Input id="rf__email" type="email" v-bind="field" placeholder="your.email@example.com"
                                autocomplete="email" class="h-12 text-base" />
                            <ErrorMessage name="email" />
                        </Field>

                        <Field name="phone_number" as="div" v-slot="{ field }" class="space-y-2">
                            <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Phone :size="16" class="text-gray-400" />
                                Phone number
                            </Label>
                            <Input type="tel" v-bind="field" placeholder="xxxxxxxxxx" autocomplete="tel"
                                class="h-12 text-base" />
                            <ErrorMessage name="phone_number" />
                        </Field>
                    </div>

                    <!-- Date of Birth -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field name="date_of_birth" as="div" v-slot="{ field }" class="space-y-2">
                            <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Calendar :size="16" class="text-gray-400" />
                                Date of birth
                            </Label>
                            <DatePicker Label="Select your birth date"
                                :model-value="field.value ? parseDate(field.value as string) : undefined"
                                @update:model-value="d => field.onChange(d ? d.toString() : '')" />
                            <ErrorMessage name="date_of_birth" />
                        </Field>
                    </div>

                    <!-- Demographics -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Field name="country_id" as="div" v-slot="{ field }" class="space-y-2">
                            <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Flag :size="16" class="text-gray-400" />
                                Country
                            </Label>
                            <Select :model-value="String(field.value ?? '')"
                                @update:model-value="v => field.onChange(v)">
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
                            <ErrorMessage name="country_id" />
                        </Field>

                        <Field name="gender_id" as="div" v-slot="{ field }" class="space-y-2">
                            <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Users :size="16" class="text-gray-400" />
                                Gender
                            </Label>
                            <Select :model-value="String(field.value ?? '')"
                                @update:model-value="v => field.onChange(v)">
                                <SelectTrigger class="w-full h-12">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="gender in genders" :key="gender.id" :value="String(gender.id)">
                                        {{ gender.name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <ErrorMessage name="gender_id" />
                        </Field>

                        <Field name="size_id" as="div" v-slot="{ field }" class="space-y-2">
                            <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Shirt :size="16" class="text-gray-400" />
                                Shirt size
                            </Label>
                            <Select :model-value="String(field.value ?? '')"
                                @update:model-value="v => field.onChange(v)">
                                <SelectTrigger class="w-full h-12">
                                    <SelectValue placeholder="Size" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="s in shirtSizes" :key="s.id" :value="s.id">
                                        {{ s.name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <ErrorMessage name="size_id" />
                        </Field>

                        <Field name="age_category_id" as="div" v-slot="{ field }" class="space-y-2">
                            <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Users :size="16" class="text-gray-400" />
                                Age group
                            </Label>
                            <Select :model-value="String(field.value ?? '')"
                                @update:model-value="v => field.onChange(v)">
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
                            <ErrorMessage name="age_category_id" />
                        </Field>
                    </div>
                    <div class="flex gap-4">
                        <Field name="stage_id" as="div" v-slot="{ field }"
                            :class="{ 'space-y-2': true, 'w-1/2': mode === 'runner', 'w-full': mode === 'volunteer' }">
                            <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Target :size="16" class="text-gray-400" />
                                Stage
                            </Label>
                            <Select :model-value="String(field.value ?? '')"
                                @update:model-value="v => field.onChange(v)">
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
                        <Field name="stage_category_id" as="div" v-slot="{ field }" class="w-1/2 space-y-2"
                            v-if="mode === 'runner'">
                            <Label class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Target :size="16" class="text-gray-400" />
                                Stage Category
                            </Label>
                            <Select :model-value="String(field.value ?? '')"
                                @update:model-value="v => field.onChange(v)">
                                <SelectTrigger class="w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <SelectValue
                                        :placeholder="form?.values?.stage_id ? 'Choose your stage catgeory' : 'Select an stage first'" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="sc in availabelStageCategoryList" :key="sc.id"
                                        :value="String(sc.id)">
                                        {{ sc.name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <ErrorMessage name="stage_category_id" />
                        </Field>
                    </div>
                    <template v-if="mode == 'runner'">
                        <Field name="description.club_name" as="div" v-slot="{ field }" class="space-y-2">
                            <Label for="rf__description.club_name"
                                class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                Club name
                            </Label>
                            <Input v-bind="field" id="rf__description.club_name"
                                placeholder="Name of club you belong to" />
                            <ErrorMessage name="description.club_name" />
                        </Field>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field name="description.emergency_contact_name" as="div" v-slot="{ field }"
                                class="space-y-2">
                                <Label id="rf__emergency_contact_name"
                                    class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    Emergency contact name
                                </Label>
                                <Input v-bind="field" placeholder="In case of emergency" />
                                <ErrorMessage name="description.emergency_contact_name" />
                            </Field>
                            <Field name="description.emergency_contact_phone" as="div" v-slot="{ field }"
                                class="space-y-2">
                                <Label id="rf__emergency_contact_phone"
                                    class="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    Emergency contact phone
                                </Label>
                                <Input v-bind="field" placeholder="In case of emergency" />
                                <ErrorMessage name="description.emergency_contact_phone" />
                            </Field>
                        </div>
                        <Field name="description.want_lunch" as="div" v-slot="{ value, handleChange }"
                            class="space-y-2">
                            <Label id="rf__want_lunch" class="flex items-start gap-2">
                                <Checkbox :model-value="value" @update:model-value="handleChange"
                                    :default-value="false" />
                                <div class="grow flex flex-col gap-2">
                                    <span class="font-medium text-gray-700">I want to order After Race Lunch.</span>
                                    <em class="text-sm font-light not-italic">Please Note*: Lunch is only provided to
                                        those who pre- ordered and pre-paid which is 480 per person and not included in
                                        registration fee.</em>
                                </div>
                            </Label>
                            <ErrorMessage name="description.want_lunch" />
                        </Field>
                    </template>
                </div>
            </div>

            <div class="bg-white rounded-3xl border border-gray-200 shadow-sm p-8" v-if="mode == 'runner'">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Registration fees</h3>
                Season pass
                or
                only one race
            </div>

            <div class="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
                <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div class="text-center sm:text-left">
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Ready to register?</h3>
                        <p class="text-gray-600 text-sm">
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
    </section>
</template>