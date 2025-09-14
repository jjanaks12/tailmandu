<script setup lang="ts">
import { ref, computed } from "vue"
import { Form, Field, ErrorMessage, type FormContext } from "vee-validate"
import { parseDate } from "@internationalized/date"
import { storeToRefs } from "pinia"
import type { SubmissionHandler } from "vee-validate"
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  Shirt,
  Trophy,
  Flag,
  Target,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-vue-next"

import DatePicker from "@/components/DatePicker.vue"
import { useAppStore } from "~/store/app"
import { useEventStore } from "~/store/event"
import { useRegistrationStore } from "~/store/registration"
import { trailRaceRunner } from "~/lib/schema/event.schema"

const props = defineProps<{ mode: "volunteer" | "runner" }>()

const app = useAppStore()
const { countries, genders, age_categories } = storeToRefs(app)

const eventStore = useEventStore()
const { events } = storeToRefs(eventStore)

const reg = useRegistrationStore()
const { isLoading, okMsg, errMsg } = storeToRefs(reg)

const form = ref<FormContext<any> | null>(null)

const sizes = [
  { id: "xs", name: "XS" },
  { id: "s", name: "S" },
  { id: "m", name: "M" },
  { id: "l", name: "L" },
  { id: "xl", name: "XL" },
]

const eventOptions = computed(() =>
  (events.value || []).map(e => ({ id: String(e.id), name: e.name }))
)

const stageOptions = computed(() => {
  const selectedId = form.value?.values?.event_id
  const ev = (events.value || []).find(e => String(e.id) === String(selectedId))
  const stages = (ev as any)?.stages ?? (ev as any)?.data?.stages ?? []
  return stages.map((s: any) => ({ id: String(s.id), name: s.name }))
})

const initialValues = {
  first_name: "",
  middle_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  country_id: "",
  gender_id: "",
  size_id: "",
  age_category_id: "",
  date_of_birth: "",
  event_id: "",
  stage_id: "",
}

const onSubmit: SubmissionHandler = async (values) => {
  const result = await reg.submit(props.mode, values)
  console.log(props.mode === "volunteer" ? "VOLUNTEER PAYLOAD" : "RUNNER PAYLOAD", result)
}
</script>

<template>
  <section class="max-w-4xl mx-auto p-6 space-y-8">

    <Form ref="form" class="space-y-8" :initial-values="initialValues" :validation-schema="trailRaceRunner"
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
              <Label for="first_name" class="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User :size="16" class="text-gray-400" />
                First name
              </Label>
              <Input id="first_name" v-bind="field" placeholder="Enter your first name" autocomplete="given-name"
                class="h-12 text-base" />
              <ErrorMessage name="first_name" />
            </Field>

            <Field name="middle_name" as="div" v-slot="{ field }" class="space-y-2">
              <Label for="middle_name" class="text-sm font-medium text-gray-700">
                Middle name <span class="text-gray-400 text-xs">(optional)</span>
              </Label>
              <Input id="middle_name" v-bind="field" placeholder="Middle name" class="h-12 text-base" />
              <ErrorMessage name="middle_name" />
            </Field>

            <Field name="last_name" as="div" v-slot="{ field }" class="space-y-2">
              <Label for="last_name" class="text-sm font-medium text-gray-700">
                Last name
              </Label>
              <Input id="last_name" v-bind="field" placeholder="Enter your last name" autocomplete="family-name"
                class="h-12 text-base" />
              <ErrorMessage name="last_name" />
            </Field>
          </div>

          <!-- Contact Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field name="email" as="div" v-slot="{ field }" class="space-y-2">
              <Label for="email" class="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail :size="16" class="text-gray-400" />
                Email address
              </Label>
              <Input id="email" type="email" v-bind="field" placeholder="your.email@example.com" autocomplete="email"
                class="h-12 text-base" />
              <ErrorMessage name="email" />
            </Field>

            <Field name="phone_number" as="div" v-slot="{ field }" class="space-y-2">
              <Label for="phone_number" class="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone :size="16" class="text-gray-400" />
                Phone number
              </Label>
              <Input id="phone_number" type="tel" v-bind="field" placeholder="xxxxxxxxxx" autocomplete="tel"
                class="h-12 text-base" />
              <ErrorMessage name="phone_number" />
            </Field>
          </div>

          <!-- Date of Birth -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field name="date_of_birth" as="div" v-slot="{ field }" class="space-y-2">
              <Label for="date_of_birth" class="text-sm font-medium text-gray-700 flex items-center gap-2">
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
              <Label for="country_id" class="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin :size="16" class="text-gray-400" />
                Country
              </Label>
              <Select id="country_id" :model-value="String(field.value ?? '')"
                @update:model-value="v => field.onChange(v)">
                <SelectTrigger class="w-full h-12">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="country in countries" :key="country.id" :value="String(country.id)">
                    {{ country.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <ErrorMessage name="country_id" />
            </Field>

            <Field name="gender_id" as="div" v-slot="{ field }" class="space-y-2">
              <Label for="gender_id" class="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users :size="16" class="text-gray-400" />
                Gender
              </Label>
              <Select id="gender_id" :model-value="String(field.value ?? '')"
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
              <Label for="size_id" class="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Shirt :size="16" class="text-gray-400" />
                Shirt size
              </Label>
              <Select id="size_id" :model-value="String(field.value ?? '')"
                @update:model-value="v => field.onChange(v)">
                <SelectTrigger class="w-full h-12">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="s in sizes" :key="s.id" :value="String(s.id)">
                    {{ s.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <ErrorMessage name="size_id" />
            </Field>

            <Field name="age_category_id" as="div" v-slot="{ field }" class="space-y-2">
              <Label for="age_category_id" class="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users :size="16" class="text-gray-400" />
                Age group
              </Label>
              <Select id="age_category_id" :model-value="String(field.value ?? '')"
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
          <div v-if="props.mode === 'runner'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field name="event_id" as="div" v-slot="{ field }" class="space-y-2">
              <Label for="event_id" class="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Flag :size="16" class="text-gray-400" />
                Event
              </Label>
              <Select id="event_id" :model-value="String(field.value ?? '')"
                @update:model-value="v => field.onChange(v)">
                <SelectTrigger class="w-full h-12">
                  <SelectValue placeholder="Choose your event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="e in eventOptions" :key="e.id" :value="String(e.id)">
                    {{ e.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <ErrorMessage name="event_id" />
            </Field>

            <Field name="stage_id" as="div" v-slot="{ field }" class="space-y-2">
              <Label for="stage_id" class="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Target :size="16" class="text-gray-400" />
                Stage
              </Label>
              <Select id="stage_id" :disabled="!(form?.values?.event_id)" :model-value="String(field.value ?? '')"
                @update:model-value="v => field.onChange(v)">
                <SelectTrigger class="w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed">
                  <SelectValue :placeholder="form?.values?.event_id ? 'Choose your stage' : 'Select an event first'" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="s in stageOptions" :key="s.id" :value="String(s.id)">
                    {{ s.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <ErrorMessage name="stage_id" />
            </Field>
          </div>
        </div>
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

          <Button variant="default" type="submit" class="w-full sm:w-auto px-8 py-3 h-12 text-base font-medium "
            :disabled="isLoading" :aria-busy="isLoading">
            <Loader2 v-if="isLoading" :size="20" class="animate-spin mr-2" />
            <span v-if="!isLoading">
              {{ props.mode === "volunteer" ? "Register as Volunteer" : "Register as Runner" }}
            </span>
            <span v-else>Processing Registration...</span>
          </Button>
        </div>

        <!-- Status Messages -->
        <div v-if="okMsg || errMsg" class="mt-6 pt-6 border-t border-gray-200">
          <div v-if="okMsg"
            class="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-xl border border-green-200">
            <CheckCircle :size="20" />
            <span class="font-medium">{{ okMsg }}</span>
          </div>
          <div v-if="errMsg"
            class="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
            <AlertCircle :size="20" />
            <span class="font-medium">{{ errMsg }}</span>
          </div>
        </div>
      </div>
    </Form>
  </section>
</template>