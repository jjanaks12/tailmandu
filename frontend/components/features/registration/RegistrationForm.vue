<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { Form, Field, ErrorMessage, type FormContext } from "vee-validate";
import { parseDate } from "@internationalized/date";
import { storeToRefs } from "pinia";
import Input from "@/components/ui/input/Input.vue";
import DatePicker from "@/components/DatePicker.vue";
import { useAppStore } from "~/store/app";
import { trailRaceRunner } from "~/lib/schema/event.schema";

const USE_MOCK = true;

const { countries, genders, age_categories } = storeToRefs(useAppStore());

const fallbackCountries = [
  { id: "np", name: "Nepal" },
  { id: "us", name: "United States" },
  { id: "gb", name: "United Kingdom" },
];
const fallbackGenders = [
  { id: "m", name: "Male" },
  { id: "f", name: "Female" },
  { id: "o", name: "Other" },
];
const fallbackAgeCats = [
  { id: "u18", name: "Under 18" },
  { id: "18_29", name: "18–29" },
  { id: "30_39", name: "30–39" },
  { id: "40_49", name: "40–49" },
  { id: "50p", name: "50+" },
];
const sizes = [
  { id: "xs", name: "XS" },
  { id: "s", name: "S" },
  { id: "m", name: "M" },
  { id: "l", name: "L" },
  { id: "xl", name: "XL" },
];

const countryOptions = computed(() =>
  countries.value?.length ? countries.value : fallbackCountries
);
const genderOptions = computed(() =>
  genders.value?.length ? genders.value : fallbackGenders
);
const ageCatOptions = computed(() =>
  age_categories.value?.length ? age_categories.value : fallbackAgeCats
);

const events = [
  { id: "e1", name: "Kathmandu Trail 2025" },
  { id: "e2", name: "Everest Ultra 2025" },
];
const stageMap: Record<string, { id: string; name: string }[]> = {
  e1: [
    { id: "s1", name: "10K Trail" },
    { id: "s2", name: "21K Half Marathon" },
  ],
  e2: [
    { id: "s3", name: "Ultra 30K" },
    { id: "s4", name: "Ultra 60K" },
  ],
};
const stages = computed(() => stageMap[eventId.value] ?? []);

const mode = ref<"personal" | "runner">("personal");

const form = ref<FormContext<any> | null>(null);

const dateOfBirth = ref<any>(undefined);

const eventId = ref<string>("e1");
const stageId = ref<string>("");

const initial = {
  first_name: "Yogesh",
  middle_name: "",
  last_name: "Shrestha",
  email: "yogesh@example.com",
  phone_number: "9800000000",
  country_id: "np",
  gender_id: "m",
  size_id: "m",
  age_category_id: "18_29",
  date_of_birth: "2001-10-21",
  event_id: "e1",
  stage_id: "",
};

function init() {
  if (!form.value) return;
  Object.entries(initial).forEach(([k, v]) =>
    form.value!.setFieldValue(k, v as any)
  );
  dateOfBirth.value = initial.date_of_birth
    ? parseDate(initial.date_of_birth)
    : undefined;
  eventId.value = initial.event_id;
  stageId.value = initial.stage_id;
}

watch(dateOfBirth, (dob) => {
  if (!form.value) return;
  const ymd = dob && typeof dob.toString === "function" ? dob.toString() : "";
  form.value.setFieldValue("date_of_birth", ymd);
  form.value.setFieldValue(
    "age_category_id",
    ymd ? deriveAgeCategoryIdFromYMD(ymd) : ""
  );
});

watch(eventId, (v) => {
  stageId.value = "";
  form.value?.setFieldValue("event_id", v || "");
  form.value?.setFieldValue("stage_id", "");
});
watch(stageId, (v) => {
  form.value?.setFieldValue("stage_id", v || "");
});

onMounted(() => init());

const isLoading = ref(false);
const okMsg = ref("");
const errMsg = ref("");

const submitted = ref(false);
const emailOk = computed(() =>
  /.+@.+\..+/.test(form.value?.values?.email || "")
);

/* --- submit handler (vee-validate style) --- */
async function onRegister(values: Record<string, any>) {
  submitted.value = true;
  okMsg.value = "";
  errMsg.value = "";

  // Manual checks (email + runner fields)
  if (!/.+@.+\..+/.test(values.email || "")) {
    errMsg.value = "Enter a valid email.";
    return;
  }
  if (mode.value === "runner") {
    if (!eventId.value) {
      errMsg.value = "Event is required.";
      return;
    }
    if (!stageId.value) {
      errMsg.value = "Stage is required.";
      return;
    }
  }

  isLoading.value = true;
  try {
    if (mode.value === "personal") {
      const payload = {
        first_name: values.first_name || null,
        middle_name: values.middle_name || null,
        last_name: values.last_name || null,
        email: values.email,
        phone_number: values.phone_number || null,
        date_of_birth: isoFromYMD(values.date_of_birth),
        country_id: values.country_id || null,
        gender_id: values.gender_id || null,
        size_id: values.size_id || null,
        age_category_id: values.age_category_id || null,
      };
      if (USE_MOCK) {
        await sleep(400);
        okMsg.value = `Registered as Personal (${payload.email})`;
      } else {
        // await $fetch('/api/personal/register', { method: 'POST', body: payload })
        okMsg.value = "Registered as Personal";
      }
    } else {
      const payload = {
        personal: {
          first_name: values.first_name || null,
          middle_name: values.middle_name || null,
          last_name: values.last_name || null,
          email: values.email,
          phone_number: values.phone_number || null,
          date_of_birth: isoFromYMD(values.date_of_birth),
          country_id: values.country_id || null,
          gender_id: values.gender_id || null,
          size_id: values.size_id || null,
          age_category_id: values.age_category_id || null,
        },
        runner: {
          event_id: eventId.value,
          stage_id: stageId.value,
        },
      };
      if (USE_MOCK) {
        await sleep(400);
        okMsg.value = `Registered as Runner (${payload.personal.email})`;
      } else {
        // await $fetch('/api/register', { method: 'POST', body: payload })
        okMsg.value = "Registered as Runner";
      }
    }
  } catch (e: any) {
    errMsg.value =
      e?.data?.statusMessage || e?.message || "Registration failed";
  } finally {
    isLoading.value = false;
  }
}

/* --- reset (uses form.resetForm, like your example style) --- */
function resetAll() {
  okMsg.value = "";
  errMsg.value = "";
  mode.value = "personal";
  form.value?.resetForm({
    values: {
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
    },
  });
  dateOfBirth.value = undefined;
  eventId.value = "";
  stageId.value = "";
}

/* --- utils --- */
function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
function isoFromYMD(ymd?: string | null) {
  if (!ymd) return null;
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1)).toISOString();
}
function deriveAgeCategoryIdFromYMD(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const dob = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  const today = new Date();
  let age = today.getUTCFullYear() - dob.getUTCFullYear();
  const mo = today.getUTCMonth() - dob.getUTCMonth();
  if (mo < 0 || (mo === 0 && today.getUTCDate() < dob.getUTCDate())) age--;
  if (age < 18) return "u18";
  if (age <= 29) return "18_29";
  if (age <= 39) return "30_39";
  if (age <= 49) return "40_49";
  return "50p";
}
</script>

<template>
  <section class="max-w-3xl mx-auto p-5 space-y-6">
    <h2 class="text-2xl font-bold">Registration</h2>

    <!-- Mode -->
    <div class="flex gap-3 items-center">
      <span class="text-sm text-neutral-600">Register as:</span>
      <label class="inline-flex items-center gap-2 text-sm">
        <input
          type="radio"
          class="accent-blue-600"
          value="personal"
          v-model="mode"
        />
        <span>Personal</span>
      </label>
      <label class="inline-flex items-center gap-2 text-sm">
        <input
          type="radio"
          class="accent-blue-600"
          value="runner"
          v-model="mode"
        />
        <span>Runner</span>
      </label>
    </div>

    <Form
      ref="form"
      method="post"
      class="flex flex-col space-y-6"
      @submit="onRegister"
      :validation-schema="trailRaceRunner"
    >
      <!-- Personal block -->
      <div class="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
        <h3 class="text-lg font-semibold">Personal details</h3>

        <div class="grid md:grid-cols-2 gap-3">
          <Field name="first_name" v-slot="{ field }">
            <label
              for="first_name"
              class="block text-sm font-medium text-neutral-700"
              >First name</label
            >
            <Input
              id="first_name"
              v-bind="field"
              placeholder="First name"
              autocomplete="given-name"
            />
            <ErrorMessage class="text-xs text-red-600" name="first_name" />
          </Field>

          <Field name="middle_name">
            <template #default="{ field }">
              <label
                for="middle_name"
                class="block text-sm font-medium text-neutral-700"
                >Middle name</label
              >
              <Input
                id="middle_name"
                v-bind="field"
                placeholder="Middle name"
              />
              <ErrorMessage class="text-xs text-red-600" name="middle_name" />
            </template>
          </Field>

          <Field name="last_name">
            <template #default="{ field }">
              <label
                for="last_name"
                class="block text-sm font-medium text-neutral-700"
                >Last name</label
              >
              <Input
                id="last_name"
                v-bind="field"
                placeholder="Last name"
                autocomplete="family-name"
              />
              <ErrorMessage class="text-xs text-red-600" name="last_name" />
            </template>
          </Field>

          <Field name="email">
            <template #default="{ field }">
              <label
                for="email"
                class="block text-sm font-medium text-neutral-700"
              >
                Email <span class="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                v-bind="field"
                placeholder="Email"
                autocomplete="email"
                :aria-invalid="submitted && !emailOk"
                data-error="true"
              />
              <ErrorMessage class="text-xs text-red-600" name="email" />
              <p v-if="submitted && !emailOk" class="text-xs text-red-600 mt-1">
                Enter a valid email.
              </p>
            </template>
          </Field>

          <Field name="phone_number">
            <template #default="{ field }">
              <label
                for="phone_number"
                class="block text-sm font-medium text-neutral-700"
                >Phone</label
              >
              <Input
                id="phone_number"
                type="tel"
                v-bind="field"
                placeholder="98xxxxxxxx"
                autocomplete="tel"
              />
              <ErrorMessage class="text-xs text-red-600" name="phone_number" />
            </template>
          </Field>

          <!-- Date of birth like your example -->
          <Field name="date_of_birth">
            <template #default="{}">
              <label
                class="block text-sm font-medium text-neutral-700"
                for="date_of_birth"
                >Date of birth</label
              >
              <DatePicker
                label="Date of Birth"
                :model-value="dateOfBirth"
                @update:model-value="(dob) => (dateOfBirth = dob)"
              />
              <ErrorMessage class="text-xs text-red-600" name="date_of_birth" />
            </template>
          </Field>
        </div>

        <div class="grid md:grid-cols-2 gap-3">
          <Field name="country_id">
            <template #default="{ field }">
              <label
                for="country_id"
                class="block text-sm font-medium text-neutral-700"
                >Country</label
              >
              <select
                id="country_id"
                class="h-12 w-full rounded-md border bg-white px-3 text-sm"
                v-bind="field"
              >
                <option value="">Select…</option>
                <option v-for="c in countryOptions" :key="c.id" :value="c.id">
                  {{ c.name }}
                </option>
              </select>
              <ErrorMessage class="text-xs text-red-600" name="country_id" />
            </template>
          </Field>

          <Field name="gender_id">
            <template #default="{ field }">
              <label
                for="gender_id"
                class="block text-sm font-medium text-neutral-700"
                >Gender</label
              >
              <select
                id="gender_id"
                class="h-12 w-full rounded-md border bg-white px-3 text-sm"
                v-bind="field"
              >
                <option value="">Select…</option>
                <option v-for="g in genderOptions" :key="g.id" :value="g.id">
                  {{ g.name }}
                </option>
              </select>
              <ErrorMessage class="text-xs text-red-600" name="gender_id" />
            </template>
          </Field>

          <Field name="size_id">
            <template #default="{ field }">
              <label
                for="size_id"
                class="block text-sm font-medium text-neutral-700"
                >Shirt size</label
              >
              <select
                id="size_id"
                class="h-12 w-full rounded-md border bg-white px-3 text-sm"
                v-bind="field"
              >
                <option value="">Select…</option>
                <option v-for="s in sizes" :key="s.id" :value="s.id">
                  {{ s.name }}
                </option>
              </select>
              <ErrorMessage class="text-xs text-red-600" name="size_id" />
            </template>
          </Field>

          <Field name="age_category_id">
            <template #default="{ field }">
              <label
                for="age_category_id"
                class="block text-sm font-medium text-neutral-700"
                >Age category</label
              >
              <select
                id="age_category_id"
                class="h-12 w-full rounded-md border bg-white px-3 text-sm"
                v-bind="field"
              >
                <option value="">Select…</option>
                <option v-for="a in ageCatOptions" :key="a.id" :value="a.id">
                  {{ a.name }}
                </option>
              </select>
              <ErrorMessage
                class="text-xs text-red-600"
                name="age_category_id"
              />
            </template>
          </Field>
        </div>
      </div>

      <div
        v-if="mode === 'runner'"
        class="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5"
      >
        <h3 class="text-lg font-semibold">Runner details</h3>
        <div class="grid md:grid-cols-2 gap-3">
          <Field name="event_id">
            <template #default="{}">
              <label
                for="event_id"
                class="block text-sm font-medium text-neutral-700"
              >
                Event <span class="text-red-500">*</span>
              </label>
              <select
                id="event_id"
                class="h-12 w-full rounded-md border bg-white px-3 text-sm"
                v-model="eventId"
              >
                <option value="">Select…</option>
                <option v-for="e in events" :key="e.id" :value="e.id">
                  {{ e.name }}
                </option>
              </select>
              <ErrorMessage class="text-xs text-red-600" name="event_id" />
            </template>
          </Field>

          <Field name="stage_id">
            <template #default="{}">
              <label
                for="stage_id"
                class="block text-sm font-medium text-neutral-700"
              >
                Stage <span class="text-red-500">*</span>
              </label>
              <select
                id="stage_id"
                class="h-12 w-full rounded-md border bg-white px-3 text-sm disabled:opacity-60"
                :disabled="!eventId"
                v-model="stageId"
              >
                <option value="">
                  {{ eventId ? "Select…" : "Select an event first…" }}
                </option>
                <option v-for="s in stages" :key="s.id" :value="s.id">
                  {{ s.name }}
                </option>
              </select>
              <ErrorMessage class="text-xs text-red-600" name="stage_id" />
            </template>
          </Field>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-2">
        <button
          type="button"
          class="h-10 px-4 rounded-md border border-neutral-300"
          @click="resetAll"
        >
          Reset
        </button>
        <button
          type="submit"
          class="h-10 px-4 rounded-md bg-blue-600 text-white disabled:opacity-60"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">{{
            mode === "personal" ? "Register as Personal" : "Register as Runner"
          }}</span>
          <span v-else>Processing…</span>
        </button>
      </div>

      <p v-if="okMsg" class="text-green-600 text-sm">{{ okMsg }}</p>
      <p v-if="errMsg" class="text-red-600 text-sm">{{ errMsg }}</p>
    </Form>
  </section>
</template>
